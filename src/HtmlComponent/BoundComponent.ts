import { createElement, createFragment } from '../Html/CreateElement';
import { elementType } from '../Html/ElementType';
import { escapeHtml } from '../Html/EscapeHtml';
import { extractNodeContent } from '../Html/ExtractNodeContent';
import { FormFieldValue, getFormFieldValue } from '../Html/FormFieldValue';
import { nodeListSelector, nodeListSelectorAll } from '../Html/QuerySelectorNodeList';
import { observableCheck } from '../Observable/IObservable';
import { observablePropertyCheck } from '../Observable/ObservableProperty';
import { observableStateCheck } from '../Observable/ObservableState';
import { EventHub } from '../System/EventHandler/EventHub';
import { Constructable, constructorTypeGuard } from '../System/Types/Constructable';
import { Kwarg } from '../System/Types/KeywordArguments';
import { isNone, None } from '../System/Types/NoneType';
import { e_ } from '../System/Utility/Elvis';
import { Component } from './Component';
import { ComponentMap, getComponent } from './ComponentMap';
import { IView } from './Contract/IView';
import { AttributeValue } from './Internal/AttributeValue';
import { ClassValue } from './Internal/ClassValue';
import { ConditionalDisplayValue } from './Internal/ConditionalDisplayValue';
import { FormInputValue } from './Internal/FormInputValue';
import { LoopValue } from './Internal/LoopValue';
import { ReplacementValue } from './Internal/ReplacementValue';
import { StyleValue } from './Internal/StyleValue';
import { IComponentBindingOptions } from './Options/IComponentBindingOptions';
import { IExistingElementOptions } from './Options/IExistingElementOptions';
import { IExistingLookupOptions } from './Options/IExistingLookupOptions';
import { IInnerHtmlOptions } from './Options/IInnerHtmlOptions';
import { IOuterHtmlOptions } from './Options/IOuterHtmlOptions';

export type BoundInjectOptions<TModel = any, TItem extends BoundComponent<HTMLElement, any> = BoundComponent<HTMLElement, any>> = IComponentBindingOptions<TModel, TItem> &
    (
        { replace?: false, parent?: Element } |
        ({ replace: true, parent?: Element } & (IInnerHtmlOptions | IOuterHtmlOptions)) |
        string // Shortcut for { replace: true, outerHtml: 'something' }
    );

/**
 * A super-basic component that allows configuration of data-binding functions using specially-named HTML attributes, as in Angular
 * or Vue.
 */
export class BoundComponent<TElement extends HTMLElement = HTMLElement, TModel = any, TParent extends BoundComponent = any>
    extends Component<TElement> implements IView<TElement, TModel> {

    /**
     * Use this to convert elements to components. It's most useful for custom tags, for example, <my-component></my-component>.
     * It will become <div id="foo">Whatever the component content is</div>.
     * To replace the element (copying existing attributes) send the relevant options, plus {replace: true}.
     *
     * In almost every case, viewModel should be set. But it's not possible to change that and still be compatible with the base
     * class inject(). This is a typescript-only issue but it makes things ugly.
     *
     * Accepts Keyword Arguments. And practically demands their use to set viewModel.
     */
    static inject<TElement extends HTMLElement, TModel>(
        selector: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[] = '[ichigo]',
        options?: BoundInjectOptions<TModel>,
        constructor?: Constructable<BoundComponent<TElement, TModel>>,
        viewModel?: TModel
    ): Array<BoundComponent<TElement, TModel>> {
        ({ selector = '[ichigo]', options, constructor, viewModel } = Kwarg.parseArgs({ selector, options, constructor, viewModel })); // kwargline

        const newConstructor: Constructable<BoundComponent<TElement>> = constructor || this as any;
        const opt = this._getOptions(options || {});

        const replacerFunction = (element: HTMLElement) => {
            return this._replaceElementWithBoundComponent(element, viewModel, opt, newConstructor);
        };
        const converterFunction = (element: HTMLElement) => {
            return this._convertElementToBoundComponent(element, viewModel, opt, newConstructor);
        };

        return this._inject(selector, opt, replacerFunction, converterFunction);
    }

    /**
     * Call to inject() with a cleaner argument order.
     */
    static injectBind<TElement extends HTMLElement, TModel>(
        viewModel?: TModel,
        selector: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[] = '[ichigo]',
        options?: BoundInjectOptions<TModel>,
        constructor?: Constructable<BoundComponent<TElement, TModel>>
    ): Array<BoundComponent<TElement, TModel>> {
        ({ selector = '[ichigo]', options, constructor, viewModel } = Kwarg.parseArgs({ selector, options, constructor, viewModel })); // kwargline
        return this.inject(selector, options, constructor, viewModel);
    }

    private static _replaceElementWithBoundComponent<TElement extends HTMLElement, TModel extends any>(
        existingElement: HTMLElement,
        viewModel: TModel,
        options: (IInnerHtmlOptions | IOuterHtmlOptions) & IComponentBindingOptions,
        constructor: Constructable<BoundComponent<TElement, TModel>>
    ): BoundComponent<TElement, TModel> {
        const opt = this._mergePropertiesAndAttributes(existingElement, options);
        const component = new constructor(viewModel, opt);
        this._replaceElement(existingElement, component);
        return component;
    }

    private static _convertElementToBoundComponent<TElement extends HTMLElement, TModel extends any>(
        existingElement: HTMLElement,
        viewModel: TModel,
        options: IComponentBindingOptions,
        constructor: Constructable<BoundComponent<TElement, TModel>>
    ): BoundComponent<TElement, TModel> {
        // WARN: This cast may not be true. There's no way to check that the tags match.
        const opt: (IComponentBindingOptions & IExistingElementOptions<TElement>) = Object.assign({ element: existingElement as TElement }, options);
        return new constructor(viewModel, opt);
    }

    viewModel: TModel;
    paused = false;
    // TODO: Remove this and the TParent type. Use eval-based logic to refer to parent data
    loopParent?: TParent; // only sent when this is a component child creted by loopPostProcess

    private _id?: string;
    private _attributeBindings: AttributeValue[] = [];
    private _cssClasses: ClassValue[] = [];
    private _cssStyle?: StyleValue;
    private _conditionalDisplay?: ConditionalDisplayValue;
    private _formInputValue?: FormInputValue;
    private _loop?: LoopValue;
    private _replacements: ReplacementValue[] = [];

    private _async = false;
    private _defer = false;
    private _initialized = false;

    /**
     * Creates an instance of BoundComponent. Many options:
     * No arguments beyond viewModel - Create a basic DIV
     * IExistingLookupOptions - Look up an existing element in the DOM and convert it to a component
     * IExistingElementOptions - Take an existing element and convert it to a component
     * IInnerHtmlOptions - Create a new component setting the inner HTML
     * IOuterHtmlOptions - Create a new component setting the outer HTML (including the tag for the component itself)
     * string - Create a new component setting the outer HTML to the string
     */
    constructor(viewModel: TModel, options?: IComponentBindingOptions);
    constructor(viewModel: TModel, existingElement: IExistingElementOptions<TElement> & IComponentBindingOptions);
    constructor(viewModel: TModel, existingElement: IExistingLookupOptions & IComponentBindingOptions);
    constructor(viewModel: TModel, newElement: IInnerHtmlOptions & IComponentBindingOptions);
    constructor(viewModel: TModel, outerElement: IOuterHtmlOptions & IComponentBindingOptions);
    constructor(viewModel: TModel, newElement: string);
    constructor(viewModel: TModel, args?: any) {
        super(args);

        this.viewModel = viewModel;

        try {
            if (!window.customElements.get('i-v')) {
                window.customElements.define('i-v', TemplateReplacementValue);
            }
        } catch (err) {
            // customElements isn't officially part of an ES version yet so won't work even in some recent-ish browsers
        }

        const options = args || {} as IComponentBindingOptions;

        this._async = options.async || false;
        this._defer = options.defer || false;
        this._id = this.content.id;

        // TODO: Remove this. Use eval-based logic to refer to parent data
        this.loopParent = options.loopParent; // undefined in most cases

        if (options.loopPostProcess) {
            options.loopPostProcess = options.loopPostProcess.bind(this);
        }
        this._configureComponentBindings(options.loopItemClass, options.loopPostProcess);

        this.setTemplate(this.content.innerHTML); // InnerHTML is currently only parsed and then the original text is thrown away.

        if (!options.doNotSubscribe) {
            this.observe(this.viewModel, true);
        }
        if (this._async) {
            setTimeout(() => this.render(), 0);
        } else {
            this.render();
        }

        // Constructor initialization is done.
        this._initialized = true;
    }

    /**
     * Bind this.render() to the model passed in. There is no option to use the viewModel because that would require
     * the user to pass in doNotSubscribe = true and then subscribe it to the exact same thing. It'd be stupid.
     *
     * If useCurrentChannel is true, then if the model isn't an observable,
     * the current channel is used instead.
     */
    observe(model: any, useCurrentChannel: boolean = false): this {
        // If the view model is observable, sub to its channel. Otherwise, sub to the current/main channel.
        if (observableCheck(model)) {
            model.subscribe(this.render, this);
        } else if (useCurrentChannel) {
            EventHub.subscribe(this.render, this);
        }

        return this;
    }

    /**
     * Bind this.render() to all observable properties found in the model passed in, or the viewModel if none.
     *
     * If useCurrentChannel is true, then if the model isn't an observable,
     * the current channel is used instead.
     */
    observeAll(model?: any, useCurrentChannel: boolean = false): this {
        model = model || this.viewModel;

        if (!model) {
            return this;
        }
        this.observe(model, useCurrentChannel);
        for (const m of Object.getOwnPropertyNames(model)) {
            this.observe(model[m], useCurrentChannel);
        }

        return this;
    }

    render(): this {
        // If we pause rendering, then nothing happens.
        if (this.paused) {
            return this;
        }

        // See if we need to defer rendering until after initialization
        if (this._defer && !this._initialized) {
            return this;
        }

        for (const item of this._attributeBindings) {
            item.render();
        }

        if (this._formInputValue) {
            this._formInputValue.render();
        }

        // To let className string and boolean switches to play together, set the className first and then modify using switches
        for (const item of this._cssClasses.filter(f => f.baseClass).concat(this._cssClasses.filter(f => !f.baseClass))) {
            item.render();
        }

        if (this._cssStyle) {
            this._cssStyle.render();
        }

        if (this._loop) {
            this._loop.render();
        }

        if (this._conditionalDisplay) {
            this._conditionalDisplay.render();
        }

        for (const repl of this._replacements) {
            repl.render();
        }
        return this;
    }

    setTemplate(templateText: string, update: boolean = false): this {
        if (!templateText) {
            return this;
        }

        // This method is executed in the constructor. The update param should not be set.
        if (update && !this._initialized) {
            throw new Error('Update should not be true when called internally.');
        }

        // Since we're creating an element that's not on the page, we probably could avoid using a fragment,
        // but this is what fragments are for.
        const template = createElement(elementType.HTMLTemplateElement);
        template.innerHTML = templateText;
        const clone = document.importNode(template.content, true);

        // If this is used to replace the existing template, we need to wipe out the previous values
        this._replacements.length = 0;

        ReplacementValue.add(this, clone, this.viewModel, this._replacements, this._id);

        // In the original build of the object, if any replacements start with "this." we need to defer.
        // TODO: This probably needs to be expanded to eval() based sources too
        if (!this._initialized && !this._defer) {
            this._defer = this._defer || !!this._replacements.find(f => f.source.startsWith('this.'));
        }

        // See if we need to defer rendering until after initialization.
        // Note that this will lead to a FOUC, maybe milliseconds, maybe longer.
        if (!this._defer || this._initialized) {
            // Replace the completed values before adding to the visible page. This is slightly redundant, because this happens in the render()
            // step, but I hate it when I see a flash of unreplaced content on sites.
            // The reason this works is because _replacements references clone, which isn't visible until almost the last line.
            for (const repl of this._replacements) {
                repl.render();
            }
        }

        // Populate the front-end text. Only do this if there is at least one thing to replace. Otherwise, you're just wiping out perfectly
        // valid HTML5 references for no reason.
        if (this._replacements.length) {
            this.content.innerHTML = '';
            this.content.appendChild(clone);
        }

        // Do a full update if requested to
        if (update) { this.render(); }

        return this;
    }

    setHtmlTemplate(templateProperty: string = '.', update: boolean = false): this {
        return this.setTemplate('<i-v noescape>' + templateProperty + '</i-v>', update);
    }

    setTextTemplate(templateProperty: string = '.', update: boolean = false): this {
        return this.setTemplate('<i-v>' + templateProperty + '</i-v>', update);
    }

    /**
     * Override this method to unbind a view from an observable.
     */
    dispose(): void {
        if (ComponentMap.components) {
            ComponentMap.components.delete(this.content);
        }
    }

    // TODO: Remove loopParent. Use eval-based logic to refer to parent data
    // TODO: Remove the whole loop + inject concept
    // TODO: Remove TParent
    private _configureComponentBindings(loopItemClass?: Constructable<BoundComponent>, loopPostProcess?: (row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment) => void) {
        const currentAttributes = Array.from(this.content.attributes)
            .filter(f => f.name.startsWith(':') || f.name.startsWith('i5_'))
            .filter(f => f.value || f.name === ':input' || f.name === 'i5_input')
            .map(m => ({
                name: m.name,
                value: m.value || ''
            }));

        // It's often easier to add properties than attributes (just because this library is property-centric) but props don't appear
        // in this.content.attributes.
        for (const propName of Object.getOwnPropertyNames(this.content).filter(f => f.startsWith(':') || f.startsWith('i5_'))) {
            const value = (this.content as any)[propName];
            if (value || propName === ':input' || propName === 'i5_input') {
                currentAttributes.push({ name: propName, value: value || '' });
            }
        }

        // Technically it's invalid to add custom attributes to regular elements, so technically <replace-me :class:redtext="warning">
        // is legal but if if it were a div, that would be illegal. So we'll allow <div data-i5_class_redtext="warning">.
        // Note that the weird name handling of data attributes could break your code if you try to use this. You may need to do extra
        // work to make your code work, all in the name of strict adherence to standards. It's up to you.
        for (const attr of Object.getOwnPropertyNames(this.content.dataset).filter(f => f.startsWith(':') || f.startsWith('i5_'))) {
            const value = this.content.dataset[attr];
            if (value || attr === 'i5_input') {
                currentAttributes.push({ name: attr, value: value || '' });
            }
        }

        // Get the alternate source Id
        const otherComponentId: string = e_(currentAttributes.find(f => f.name === 'i5_source' || f.name === ':source')).value;

        let textHtmlSet = false;
        for (const prop of currentAttributes) {
            const result = AttributeValue.add(this, this.content, this.viewModel, prop.name, prop.value, otherComponentId, this._attributeBindings) ||
                ClassValue.add(this, this.content, this.viewModel, prop.name, prop.value, otherComponentId, this._cssClasses) ||
                StyleValue.add(this, this.content, this.viewModel, prop.name, prop.value, otherComponentId, () => this._cssStyle, (val: StyleValue) => this._cssStyle = val) ||
                ConditionalDisplayValue.add(this, this.content, this.viewModel, prop.name, prop.value, otherComponentId, () => this._conditionalDisplay, (val: ConditionalDisplayValue) => this._conditionalDisplay = val) ||
                FormInputValue.add(this, this.content, this.viewModel, prop.name, prop.value, otherComponentId, () => this._formInputValue, (val: FormInputValue) => this._formInputValue = val) ||
                LoopValue.add(this, this.content, this.viewModel, prop.name, prop.value, loopItemClass, otherComponentId, () => this._loop, (val: LoopValue) => this._loop = val, loopPostProcess);

            // TODO: Remove "this." bindings
            deferIfNeeded.call(this);

            // TODO: for now, continue with legacy additions until all logic moved to objects
            if (result) {
                continue;
            }

            if (prop.name.startsWith(':')) {
                // General ichigo shortcut
                prop.name = 'i5_' + prop.name.slice(1);
            }
            const type = prop.name.slice(3);
            // Regular attributes will all match this.
            if (!type) {
                continue;
            }
            switch (type) {
                case "text":
                    if (textHtmlSet) { throw new Error("Can't set i5_text and i5_html at same time"); }
                    textHtmlSet = true;
                    this.content.innerHTML = `<i-v>${prop.value}</i-v>`; // Use this as the template
                    deferIfNeeded.call(this);
                    break;
                case "html":
                    if (textHtmlSet) { throw new Error("Can't set i5_text and i5_html at same time"); }
                    textHtmlSet = true;
                    this.content.innerHTML = `<i-v noescape>${prop.value}</i-v>`; // Use this as the template
                    deferIfNeeded.call(this);
                    break;
            }

            function deferIfNeeded(this: BoundComponent) {
                this._defer = this._defer || prop.value.startsWith('this.');
            }
        }
    }
}

// Use a custom element to create a replacement tag that is not limited, as span is, to containing no block elements.
// No logic, no special display details.
// tslint:disable-next-line:max-classes-per-file
export class TemplateReplacementValue extends HTMLElement {
    constructor() {
        super();
    }
}
