import { ITreeNode } from './Internal/ITreeNode';
import { observableCheck } from '../Observable/IObservable';
import { EventHub } from '../System/EventHandler/EventHub';
import { Constructable } from '../System/Types/Constructable';
import { Kwarg } from '../System/Types/KeywordArguments';
import { Component } from './Component';
import { ComponentMap } from './ComponentMap';
import { IView } from './Contract/IView';
import { RenderContainer } from './Internal/RenderContainer';
import { IComponentBindingOptions } from './Options/IComponentBindingOptions';
import { IExistingElementOptions } from './Options/IExistingElementOptions';
import { IExistingLookupOptions } from './Options/IExistingLookupOptions';
import { IInnerHtmlOptions } from './Options/IInnerHtmlOptions';
import { IOuterHtmlOptions } from './Options/IOuterHtmlOptions';
import { LoopValue } from './Internal/LoopValue';
import { getCustomAttributes } from './Internal/GetCustomAttributes';
import { convertElementToTemplate } from '../Html/ConvertElementToTemplate';

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

    private _renderer!: RenderContainer;
    // TODO: Remove _id, which is used only for related component
    private _id?: string;
    private _asyncStartup = false;

    // TODO: Remove these. They only exist because "this." could reference a property that isn't set until
    // the constructor of the derived class. If no "this." then no need.
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

        const options = args || {} as IComponentBindingOptions;

        this._asyncStartup = options.asyncStartup || false;
        this._defer = options.defer || false;
        this._id = this.content.id;

        // TODO: Remove this. Use eval-based logic to refer to parent data
        this.loopParent = options.loopParent; // undefined in most cases

        // TODO: Remove this
        if (options.loopPostProcess) {
            options.loopPostProcess = options.loopPostProcess.bind(this);
        }

        this._configure(options.loopItemClass, options.loopPostProcess);

        if (!options.doNotSubscribe) {
            this.observe(this.viewModel, true);
        }

        // Do the first rendering
        if (this._asyncStartup) {
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
            // Only use the model's channel. The current channel is redundant (already would have been used)
            this.observe(model[m], false);
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

        this._renderer.render();

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

    // TODO: Remove loopParent. Use eval-based logic to refer to parent data
    // TODO: Remove the whole loop + inject concept
    // TODO: Remove TParent
    private _configure(loopItemClass?: Constructable<BoundComponent>, loopPostProcess?: (row: any, addedContent: HTMLElement, allRows: Iterable<any>, previousContent: DocumentFragment) => void) {
        const loopRegex = /^(?:i5_|\:)loop[:_]?/;

        const childElements = Array.from(this.content.querySelectorAll('*'))
            .map(e => ({ element: e as HTMLElement, customAttributes: getCustomAttributes(e as HTMLElement) }))
            .filter(e => e.customAttributes.find((f: { name: string, value: string }) => f.name.startsWith(':') || f.name.startsWith('i5_')));

        // We will use this attribute for DOM searches. Much easier.
        const topAttributes = getCustomAttributes(this.content);
        if (topAttributes.find(f => loopRegex.test(f.name))) {
            // TODO: The check for i5=loop can be removed once postProcessing is gone.
            // It's only here because when it's post-processed, changing i5=loop back to i5=loop_convert causes it be converted again.
            const i5attr = this.content.attributes.getNamedItem('i5');
            if (!i5attr || i5attr.value !== 'loop') {
                this.content.setAttribute('i5', 'loop_convert');
            }
        } else {
            this.content.setAttribute('i5', 'component');
        }

        for (const item of childElements) {
            if (item.customAttributes.find(f => loopRegex.test(f.name))) {
                // TODO: The check for i5=loop can be removed once postProcessing is gone.
                // It's only here because when it's post-processed, changing i5=loop back to i5=loop_convert causes it be converted again.
                const i5attr = item.element.attributes.getNamedItem('i5');
                if (!i5attr || i5attr.value !== 'loop') {
                    item.element.setAttribute('i5', 'loop_convert');
                }
            } else {
                item.element.setAttribute('i5', 'child');
            }
        }

        // One thing that will make this quicker is to short-circuit nested loops. We need a way so that when searching for properties, you
        // don't grab elements that are inside nested loops.
        // I see three ways to do this:
        // 1) Check to see if you're inside a loop and if so, stop. This is time-consuming.
        // 2) Do what Vue does and require loop content to always be inside a template. DOM queries don't go into templates (which do a
        // bit of extremely simple misdirection to hide their content). This requires the dev to add a new element.
        // 3) Convert loops to templates. This should be quick, stops querySelectorAll's greedy search, and the dev doesn't do anything.
        // I like 3.
        if (this.content.attributes.getNamedItem('i5').value === 'loop_convert') {
            const loopTemplate = convertElementToTemplate(this.content);
            convertLoop(loopTemplate!.content);
        } else {
            convertLoop(this.content);
        }

        // Now that all loops have gone from <tag :loop:something="else"><other></other></tag> to
        // <tag :loop:something="else"><template><other></other></template></tag>,
        // nothing inside "template" will show up on any DOM queries.

        // We need to build a tree of renderers, to handle loop elements where the i-v tags need to be tracked with the loop they are inside.
        // It also will help us in passing the parent scope to children, in the case of (gak) nested loops.

        // The method being used to build the tree here is probably not ideal for performance (one DOM query per renderers), as opposed to
        // iterating the DOM recursively once from top to bottom, but this shouldn't hit the recursion limit (no recursion is happening).
        const renderTree: ITreeNode[] = Array.from(this.content.querySelectorAll('[i5]'))
            .map(e => ({ element: e as HTMLElement, children: [] }));

        for (const treeItem of renderTree) {
            try {
                const myParent = treeItem.element.parentElement!.closest('[i5]');
                const parentTree = renderTree.find(f => f.element === myParent);
                if (parentTree) {
                    treeItem.parent = parentTree;
                    parentTree.children.push(treeItem);
                }
            } catch {
                // when element has no parent (should never happen)
            }
        }

        this._renderer = new RenderContainer(this, this.viewModel, this.content, renderTree.filter(f => !f.parent), this._id, loopItemClass, loopPostProcess, true);
    }
}

function convertLoop(element: Element | DocumentFragment): void {
    while (true) {
        const loop: Element = element.querySelector('[i5=loop_convert]') as Element;
        if (!loop) {
            // No more loops
            return;
        }
        const loopTemplate = convertElementToTemplate(loop)!;
        // Now we need to search for loops nested inside this loop.
        // Select queries will return null because the content has been moved to .content. So search there.
        convertLoop(loopTemplate.content);
    }
}
