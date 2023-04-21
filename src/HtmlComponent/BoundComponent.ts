import { createElement, createFragment } from '../Html/CreateElement';
import { elementType } from '../Html/ElementType';
import { escapeHtml } from '../Html/EscapeHtml';
import { extractNodeContent } from '../Html/ExtractNodeContent';
import { FormFieldValue, getFormFieldValue } from '../Html/FormFieldValue';
import { nodeListSelector, nodeListSelectorAll } from '../Html/QuerySelectorNodeList';
import { observableCheck } from '../Observable/IObservable';
import { observablePropertyCheck } from '../Observable/ObservableProperty';
import { observableStateCheck } from '../Observable/ObservableState';
import { Constructable, constructorTypeGuard } from '../System/Types/Constructable';
import { isNone, None } from '../System/Types/NoneType';
import { Component } from './Component';
import { ComponentMap, getComponent } from './ComponentMap';
import { IView } from './Contract/IView';
import { IInnerHtmlOptions } from './Options/IInnerHtmlOptions';
import { IExistingElementOptions } from './Options/IExistingElementOptions';
import { IExistingLookupOptions } from './Options/IExistingLookupOptions';
import { IOuterHtmlOptions } from './Options/IOuterHtmlOptions';
import { IComponentBindingOptions } from './Options/IComponentBindingOptions';
import { Kwarg, kw } from '../System/Types/KeywordArguments';
import { e_ } from '../System/Utility/Elvis';
import { EventHub } from '../System/EventHandler/EventHub';
import { AttributeValue } from './Internal/AttributeValue';
import { ReplacementValue } from './Internal/ReplacementValue';

// This is only passed by loopPostProcess(), unless you write your own component class that does differently.
export interface ILoopParent<TParent extends BoundComponent<HTMLElement, any> = BoundComponent<HTMLElement, any>> {
    loopParent?: TParent;
}

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
    loopParent?: TParent; // only sent when this is a component child creted by loopPostProcess
    paused = false;

    private _id?: string;
    private _attributeBindings: Array<AttributeValue> = [];
    private _valueAttribute?: { source: string, otherComponentId?: string };
    private _writeTargets: string[] = []; // Can only write to THIS component
    private _cssClasses?: { cssClass: string, otherComponentId?: string };
    private _cssClassSwitches: Array<{ class: string, source: string, negative: boolean, otherComponentId?: string }> = [];
    private _cssStyle?: { style: string, otherComponentId?: string };
    private _cssDisplay?: { source: string, negative: boolean, otherComponentId?: string };
    private _previousCssDisplaySetting?: string;
    private _loop?: { source: string, postProcess: boolean, fragment: DocumentFragment, otherComponentId?: string };
    private _loopItemClass: Constructable<BoundComponent>;
    private _replacements: Array<ReplacementValue> = [];
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

        // Defined the default component class for the default loopPostProcess() method
        if (options.loopItemClass) {
            if (!constructorTypeGuard(options.loopItemClass)) {
                throw new Error('loopItemClass is not a constructor');
            }
            if (!(options.loopItemClass instanceof BoundComponent.constructor)) {
                throw new Error('loopItemClass is not an bound component');
            }
        }

        // TODO: Remove this. Use eval-based logic to refer to parent data
        this.loopParent = options.loopParent; // undefined in most cases

        // TODO: Remove the whole loop + inject concept
        this._loopItemClass = options.loopItemClass || BoundComponent;

        this._configureComponentBindings();

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

    write(evt: Event): void {
        if (!this._writeTargets.length) {
            return;
        }
        const element = evt.currentTarget as HTMLElement;
        if (!element) {
            return;
        }
        const value = getFormFieldValue(element);

        // There are two cases where value is undefined. Either the element is not a form element or it's an unnamed radio button
        // that is not selected. In both cases, we don't want to update the model with undefined, which is useless.
        // TODO: Is this justification valid?
        if (value === undefined) {
            return;
        }

        // WARN: Cannot type check this dynamically. TypeScript is build-time checking only. Runtime code can't even see the type.
        // If you want to be precise, all properties in _writeBindings should be FormItemValue, but as _writeBindings is populated
        // via string, there's no way to enforce that. So if you fill a string value from a multiple select, it'll produce bugs.
        // So be careful. It's on you.
        for (const bind of this._writeTargets) {
            if (bind.startsWith('this.')) {
                const target = (this as Record<string, any>)[bind.slice(5)];
                writeValue(target, () => (this as Record<string, any>)[bind.slice(5)] = value, this);
            } else if (bind === '.') {
                if (observableStateCheck<any>(this.viewModel)) {
                    this.viewModel.value = value;
                } else {
                    // Assume that the view model is either FormFieldValue or a function that takes one.
                    writeValue(this.viewModel, () => this.viewModel = value as any, this.viewModel);
                }
            } else if (bind.startsWith('^') && e_(this.loopParent).viewModel && typeof this.loopParent!.viewModel === 'object') {
                // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
                // an object or an iterable, not really something you'll read or write to directly.
                // Might do a shortcut to the parent component's 'this'
                writeToViewModelObject(this.loopParent!, bind.slice(1));
            } else if (typeof this.viewModel === 'object') {
                writeToViewModelObject(this, bind);
            }
        }

        function writeValue(target: any, writeToProperty: () => void, thisArg: any) {
            if (typeof target === 'function') {
                target.call(thisArg, value);
                return;
            }
            if (observablePropertyCheck<FormFieldValue>(target)) {
                target.value = value;
                return;
            }
            // This needs to be a function to be flexible, because if target is a value type or immutable, writing
            // it directly replaces only the value without updating the model.
            writeToProperty();
        }

        function writeToViewModelObject(comp: BoundComponent, property: string) {
            if (observableStateCheck<any>(comp.viewModel)) {
                // With observable state, we need to get the state, update it, and write the whole thing back.
                // While it is possible to update a single property in some cases, it doesn't allow reuse of already-working code.
                const tmp = comp.viewModel.value;
                const target = tmp[property];
                writeValue(target, () => tmp[property] = value, tmp);
                comp.viewModel.value = tmp;

            } else {
                const target = (comp.viewModel as Record<string, any>)[property];
                writeValue(target, () => (comp.viewModel as Record<string, any>)[property] = value, comp.viewModel);
            }
        }
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

        if (this._valueAttribute) {
            // Calls setFormFieldValue behind the scenes.
            this.value = this._getUntypedValue(this._valueAttribute.source, this._valueAttribute.otherComponentId);
        }

        if (this._cssClasses) {
            this.content.className = this._getStringValue(this._cssClasses.cssClass, false, this._cssClasses.otherComponentId) || '';
        }

        for (const item of this._cssClassSwitches) {
            // If truthy, add class, else delete it.
            let val = !!this._getUntypedValue(item.source, item.otherComponentId);
            if (item.negative) {
                val = !val;
            }
            if (val) {
                this.content.classList.add(item.class);
            } else {
                this.content.classList.remove(item.class);
            }
        }

        if (this._cssStyle) {
            const val = this._getStringValue(this._cssStyle.style, false, this._cssStyle.otherComponentId) || '';
            this.content.style.cssText = val;
            if (val && !this.content.style.cssText) {
                // tslint:disable-next-line:no-console
                console.warn(`Invalid style text in component: ${val}`);
            }
        }

        if (this._loop) {
            const iterable = this._getUntypedValue(this._loop.source, this._loop.otherComponentId);
            if (iterable && typeof iterable[Symbol.iterator] === 'function') {
                const previousContent = extractNodeContent(this.content);
                for (const row of iterable) {
                    const clone = document.importNode(this._loop.fragment, true);
                    // As soon as we add the clone to content, childNodes loses reference to its child nodes, so copy it.
                    const nodes = Array.from(clone.childNodes).slice();
                    this.content.appendChild(clone);
                    if (this._loop.postProcess) {
                        this.loopPostProcess(row, nodes, iterable, previousContent);
                    }
                }
            }
        }

        if (this._cssDisplay) {
            // If falsy, set display: none (saving previous value). If truthy, restore previous value (if block, flex, but not if none)
            let val = this._getUntypedValue(this._cssDisplay.source, this._cssDisplay.otherComponentId);
            if (this._cssDisplay.negative) {
                val = !val;
            }
            if (val) {
                this.content.style.setProperty('display', this._previousCssDisplaySetting || '');
            } else {
                if (this.content.style.display !== 'none') {
                    this._previousCssDisplaySetting = this.content.style.display || undefined;
                }
                this.content.style.setProperty('display', 'none');
            }
        }

        this._updateHtmlReplacements();
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

        // Working on a clone here, so we don't see the body being built step by step in the browser.
        for (const repl of clone.querySelectorAll('i-v')) {

            // Allow 3 ways to reference a component, either by #id (for people who like quickness), by component (for people who like
            // compliance), or by data-component (for people who REALLY like compliance)
            let relatedComponentId = '';
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < repl.attributes.length; i++) {
                const tmpName = repl.attributes[i].nodeName;
                if (tmpName.startsWith('#')) {
                    relatedComponentId = tmpName.slice(1);
                    break;
                }
            }
            if (!relatedComponentId && repl.hasAttribute('component')) {
                relatedComponentId = (repl.getAttribute('component') || '');
            }
            if (!relatedComponentId) {
                relatedComponentId = (repl as HTMLElement).dataset.component || '';
            }

            // If component is specified, this component must have that as an id
            if (this._id && relatedComponentId && relatedComponentId.toLowerCase() !== this._id.toLowerCase()) {
                continue;
            }

            const noescape = repl.hasAttribute('noescape') && repl.getAttribute('noescape') !== 'false';
            const otherComponentId = repl.getAttribute('i5_source') || repl.getAttribute('source') || (repl as HTMLElement).dataset.i5_source || (repl as HTMLElement).dataset.source || repl.getAttribute(':source');
            this._replacements.push(new ReplacementValue(this, this.viewModel, repl as HTMLElement, repl.innerHTML, noescape, otherComponentId));
        }

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
            this._updateHtmlReplacements();
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

    setLoop(source: string = '.', fragment: DocumentFragment | string, skipPostProcess: boolean = false, update: boolean = false, otherComponentId?: string): this {
        if (!source || !fragment) {
            throw new Error('Invalid arguments');
        }
        if (typeof fragment === 'string') {
            fragment = createFragment(fragment);
        }
        this._loop = { source, postProcess: !skipPostProcess, fragment, otherComponentId };
        if (update) { this.render(); }
        return this;
    }

    removeLoop(update: boolean = false): this {
        this._loop = undefined;
        if (update) { this.render(); }
        return this;
    }

    setValueAttribute(source: string | undefined = '.', update: boolean = false, otherComponentId?: string): this {
        this._valueAttribute = { source, otherComponentId };
        if (update) { this.render(); }
        return this;
    }

    setVisibility(source: string | undefined = '.', negative: boolean = false, update: boolean = false, otherComponentId?: string): this {
        if (!source) {
            this._cssDisplay = undefined;
        } else {
            this._cssDisplay = { source, negative, otherComponentId };
        }
        if (update) { this.render(); }
        return this;
    }

    setCssClass(cls: string | undefined = '.', update: boolean = false, otherComponentId?: string): this {
        this._cssClasses = { cssClass: cls, otherComponentId };
        if (update) { this.render(); }
        return this;
    }

    setCssStyle(style: string | undefined = '.', update: boolean = false, otherComponentId?: string): this {
        this._cssStyle = { style, otherComponentId };
        if (update) { this.render(); }
        return this;
    }

    addCssClassSwitch(cls: string, source: string = '.', negative: boolean = false, update: boolean = false, otherComponentId?: string): this {
        if (!cls || !source) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._cssClassSwitches.find(f => f.class === cls)) {
            this._cssClassSwitches.push({ class: cls, source, negative, otherComponentId });
        }

        if (update) { this.render(); }
        return this;
    }

    removeCssClassSwitch(cls: string, update: boolean = false): this {
        if (!cls) {
            throw new Error('Invalid argument');
        }
        const filtered = this._cssClassSwitches.filter(f => f.class !== cls);
        this._cssClassSwitches.length = 0;
        this._cssClassSwitches.push(...filtered);
        if (update) { this.render(); }
        return this;
    }

    addWriteEvent(): this {
        this.content.addEventListener('input', this.write.bind(this));
        return this;
    }

    addWriteTarget(target: string = '.', update: boolean = false): this {
        if (!target) {
            throw new Error('Invalid argument');
        }
        // Don't bind a single property to multiple things
        if (!this._writeTargets.find(f => f === target)) {
            this._writeTargets.push(target);
        }
        if (update) { this.render(); }
        return this;
    }

    removeWriteTarget(target: string, update: boolean = false): this {
        if (!target) {
            throw new Error('Invalid argument');
        }
        const filtered = this._writeTargets.filter(f => f !== target);
        this._writeTargets.length = 0;
        this._writeTargets.push(...filtered);
        if (update) { this.render(); }
        return this;
    }

    /**
     * 
     * Auto-Inject calls the default injectBind() on the default BoundComponent class, with no options except selector.
     * If you pass no inputs, it seeks out all child elements that have at least one ichigo custom property. Keep in mind
     * that when you have nested objects, this will usually mean something will blow up because you tried to bind an element 
     * twice. It also will perform much worse.
     * 
     * If you pass a selector, it acts the same as BoundComponent.injectBind() with that selector.
     * 
     * In my experience, this is almost completely useless. Either the lack of options breaks it (pretty useless if you can't
     * observe an observable) or the simple act of binding breaks stuff.
     */
    autoInject(selector?: string): this {
        if (selector) {
            BoundComponent.injectBind(this.viewModel, selector, { parent: this.content });
        } else {
            for (const e of this.content.querySelectorAll<HTMLElement>('*')) {
                for (const attr of Array.from(e.attributes)) {
                    if (attr.name.startsWith('i5_') || attr.name.startsWith(':') || attr.name.startsWith('data-i5_')) {
                        BoundComponent.injectBind(this.viewModel, e);
                        break;
                    }
                }
            }
        }

        return this;
    }

    /**
     * Override this method to unbind a view from an observable.
     */
    dispose(): void {
        if (ComponentMap.components) {
            ComponentMap.components.delete(this.content);
        }
    }

    /**
     * Override this if you need to do something else after the loop is added to the DOM.
     */
    protected loopPostProcess(row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment): void {
        if (!addedContent.length) {
            return;
        }

        // If the typescript part of the following were important, this would be a problem
        // if this were a derived class.
        const thisclass = this;
        const nodes = nodeListSelectorAll(addedContent, '[i5_item], [\\00003Aitem], [data-i5_item]');

        // If no i5_item matches, then grab the first element.
        if (!nodes.length) {
            const firstNode = nodeListSelector(addedContent, '*');
            if (firstNode) {
                nodes.push(firstNode);
            }
        }

        if (!nodes.length) {
            return;
        }

        (this._loopItemClass as typeof BoundComponent).injectBind(row, nodes, {
            replace: false,
            loopParent: this,
            async: this._async
        } as IComponentBindingOptions & ILoopParent<typeof thisclass>);
    }

    private _getStringValue(name: string, skipEscape: boolean = false, sourceComponentId?: string): string | None {
        const value = this._getUntypedValue(name, sourceComponentId);
        if (isNone(value)) {
            return value;
        } else if (typeof value === 'string') {
            return skipEscape ? value : escapeHtml(value);
        } else {
            return skipEscape ? value.toString() : escapeHtml(value.toString());
        }
    }

    private _getUntypedValue(name: string, sourceComponentId?: string): any {
        let component: any = this;
        let source: any;

        if (sourceComponentId) {
            component = getComponent(sourceComponentId) || component;
        }

        // I'm pretty sure this is being validated during construction but be safe
        if (!name) {
            return;
        }

        let thisArg: any = component.viewModel;

        // If VM is a state, get the current state value.
        if (observableStateCheck<any>(thisArg)) {
            thisArg = thisArg.value;
        }

        if (name.startsWith('this.')) {
            thisArg = component;
            name = name.slice(5);
            if (!(name in component)) {
                // tslint:disable-next-line:no-console
                console.warn(`this.${name} does not exist on view.`);
                return;
            }
            source = (component as Record<string, any>)[name];

        } else if (name.startsWith('^') && e_(component.loopParent).viewModel && typeof e_(component.loopParent).viewModel === 'object') {
            // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
            // an object or an iterable, not really something you'll read or write to directly.
            // Might do a shortcut to the parent component's 'this'

            thisArg = component.loopParent!.viewModel;

            if (!(name.slice(1) in thisArg)) {
                // tslint:disable-next-line:no-console
                console.warn(`${name} does not exist on viewModel parent view model.`);
                return {};
            }
            source = thisArg[name.slice(1)];

        } else if (name === '.') {
            source = thisArg;

        } else if (typeof thisArg === 'object') {
            if (!(name in thisArg)) {
                // tslint:disable-next-line:no-console
                console.warn(`this.${name} does not exist on viewModel.`);
                return {};
            }
            source = thisArg[name];

        }

        // CONSIDER: Consider adding custom attributes to allow executing method with string parameters. i5_param01="val 1", i5_param02="val 2"
        if (typeof source === 'function') {
            return source.call(thisArg);
        } else if (observablePropertyCheck<FormFieldValue>(source)) {
            return source.value;
        } else {
            return source;
        }
    }

    private _updateHtmlReplacements(): void {
        for (const repl of this._replacements) {
            repl.render();
        }
    }

    private _configureComponentBindings() {
        const currentAttributes = Array.from(this.content.attributes)
            .filter(f => f.value || f.name === 'i5_input' || f.name === ':input')
            .map(m => ({
                name: m.name,
                value: m.value || ''
            }));

        // Technically it's invalid to add custom attributes to regular elements, so technically <replace-me :switch:redtext="warning">
        // is legal but if if it were a div, that would be illegal. So we'll allow <div data-i5_switch_redtext="warning">.
        // Note that the weird name handling of data attributes could break your code if you try to use this. You may need to do extra
        // work to make your code work, all in the name of strict adherence to standards. It's up to you.
        for (const attr of Object.getOwnPropertyNames(this.content.dataset)) {
            const value = this.content.dataset[attr];
            if (value || attr === 'i5_input') {
                currentAttributes.push({ name: attr, value: value || '' });
            }
        }

        // Get the alternate source Id
        const otherComponentId: string = e_(currentAttributes.find(f => f.name === 'i5_source' || f.name === ':source')).value;

        let textHtmlSet = false;
        for (const prop of currentAttributes) {
            const result = AttributeValue.add(this, this.content, this.viewModel, this._attributeBindings, prop.name, prop.value, otherComponentId); // || NextValue.add() || NextValue.add();

            // TODO: Remove "this." bindings
            deferIfNeeded.call(this);

            // TODO: for now, continue with legacy additions until all logic moved to objects
            if (result) {
                continue;
            }

            const type = this._parseAttributeName(prop.name);
            let negative = false;
            // Regular attributes will all match this.
            if (!type) {
                continue;
            }
            switch (type.type) {
                case "switchClassNegative":
                    negative = true;
                // fall through
                case "switchClass":
                    if (!type.detail) { throw new Error('Programming error'); }
                    this.addCssClassSwitch(type.detail, prop.value, negative, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
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
                case "value":
                    this.setValueAttribute(prop.value, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "ifNegative":
                    negative = true;
                // fall through
                case "if":
                    this.setVisibility(prop.value, negative, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "style":
                    this.setCssStyle(prop.value, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "class":
                    this.setCssClass(prop.value, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "input":
                    this.addWriteEvent();
                    if (!prop.value) {
                        break;
                        // Else fall through, using the value of the input attribute as a target attribute
                        // Shortcut i5_input_foo is the same as i5_target="foo" i5_value="foo"
                        // But only write to the local view model, not another component's
                    } else if (type.detail) {
                        this.setValueAttribute(prop.value, false);
                    }
                case "target":
                    this.addWriteTarget(prop.value, false);
                    deferIfNeeded.call(this);
                    break;
                case "loop":
                    // Grab the base content for the loop, pulling it out of the DOM.
                    this.setLoop(prop.value, extractNodeContent(this.content), type.detail === 'null', false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "item":
                    // Only used as a selector. Has no functionality
                    break;
                default:
                    throw new Error("Not Implemented Ichigo attribute: " + type.type);
            }

            function deferIfNeeded(this: BoundComponent) {
                this._defer = this._defer || prop.value.startsWith('this.');
            }
        }
    }

    private _parseAttributeName(name: string): { type: string, detail?: string } | undefined {
        if (name.startsWith(':')) {
            // General ichigo shortcut
            name = 'i5_' + name.slice(1);
        }
        if (name === 'i5_item') {
            // This is used to indicate an item component, nothing else.
            return;
        } else if (name === 'i5_source') {
            // This is used to indicate a source component. It's read separately.
            return;
        }
        else if (name === 'i5_event') {
            // This is used only in Component.addInlineEventListeners().
            return;
        } else if (!name.startsWith('i5_')) {
            return;
        }

        if (name.startsWith('i5_switch')) {
            let negative = false;
            if (name[9] !== ':' && name[9] !== '_' && name[9] !== '-' && name[9] !== '0') {
                throw new Error('Invalid switch binding syntax');
            }
            if (name[9] === '-' || name[9] === '0') {
                negative = true;
                name = name.slice(0, 9) + name.slice(10);
            }
            if (name.length < 11) {
                throw new Error("Class switch name is missing.");
            }
            return { type: negative ? 'switchClassNegative' : 'switchClass', detail: name.slice(10) };

        } else if (name.startsWith('i5_if')) {
            let negative = false;
            if (name.slice(-1) === '-' || name.slice(-1) === '0') {
                negative = true;
            }
            return { type: negative ? 'ifNegative' : 'if' };

        } else if (name.startsWith('i5_loop')) {
            if (name === 'i5_loop:null') {
                return { type: 'loop', detail: 'null' };
            }
            return { type: 'loop' };

        } else if (name.startsWith('i5_target')) {
            return ({ type: 'target' });

        } else if (name.startsWith('i5_input')) {
            const twoWay = name.endsWith('_value') || name.endsWith(':');
            return ({ type: 'input', detail: twoWay ? '2way' : '' });

        }

        return { type: name.slice(3) };
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
