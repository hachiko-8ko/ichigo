import { createElement, div } from '../Html/CreateElement';
import { elementType } from '../Html/ElementType';
import { FormFieldValue, getFormFieldValue, setFormFieldValue } from '../Html/FormFieldValue';
import { nodeListSelectorAll } from '../Html/QuerySelectorNodeList';
import { Constructable } from '../System/Types/Constructable';
import { Kwarg } from '../System/Types/KeywordArguments';
import { getUniqueId } from '../System/Utility/GetUniqueId';
import { ComponentMap, getComponent } from './ComponentMap';
import { IContent } from './Contract/IContent';
import { IExistingElementOptions } from './Options/IExistingElementOptions';
import { IExistingLookupOptions } from './Options/IExistingLookupOptions';
import { IInnerHtmlOptions } from './Options/IInnerHtmlOptions';
import { IOuterHtmlOptions } from './Options/IOuterHtmlOptions';

export type InjectOptions = (
    { replace?: false } |
    ({ replace: true } & (IInnerHtmlOptions | IOuterHtmlOptions)) |
    string // Shortcut for { replace: true, outerHtml: 'something' }
);

/**
 * A class with a content property that points to something on the page, along with some of helper methods.
 *
 * This class is intended to be used as a base class for other classes, so it's marked abstract. It just doesn't
 * make sense to me to create Component with nothing customized. Just create an HTMLElement. The helpers aren't really
 * that impressive, when you consider that the tradeoff is having to reference obj.content to modify the DOM.
 */
export abstract class Component<TElement extends HTMLElement = HTMLElement> implements IContent<TElement> {
    /**
     * Use this to convert elements to components. It's most useful for custom tags, for example, <my-component></my-component>.
     * It will become <div id="foo">Whatever the component content is</div>.
     *
     * It doesn't have to be a custom tag. It could be a class, like <p class='bind-to-model"> (selector='.bind-to-model')
     * or <p ichigo> (selector='[ichigo]').
     *
     * To completely replace the existing element (copying existing attributes) send the relevant options, plus {replace: true}.
     *
     * Accepts Keyword Arguments.
     */
    static inject<TElement extends HTMLElement>(
        selector: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[] | { parent?: Element, selector: string } = '[ichigo]',
        options?: InjectOptions | undefined,
        constructor?: Constructable<Component<TElement>>
    ): Array<Component<TElement>> {
        ({ selector = '[ichigo]', options, constructor } = Kwarg.parseArgs({ selector, options, constructor })); // kwargline

        const newConstructor: Constructable<Component<TElement>> = constructor || this as any;
        const opt = this._getOptions(options);

        const replacerFunction = (element: HTMLElement) => {
            return this._replaceElementWithComponent(element, opt, newConstructor);
        };
        const converterFunction = (element: HTMLElement) => {
            return this._convertElementToComponent(element, newConstructor);
        };

        return this._inject(selector, opt, replacerFunction, converterFunction);
    }

    protected static _inject<T extends Component<HTMLElement>>(
        selector: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[] | { parent?: Element, selector: string } = '[ichigo]',
        options: Record<string, any>,
        replacerFunction: (element: HTMLElement) => T,
        converterFunction: (element: HTMLElement) => T
    ): T[] {
        const results: T[] = [];
        const containers = this._lookUpContainersToInject(selector);
        for (const container of containers) {
            if (options.replace) {
                // Can't have dupe IDs being created if there are multiple containers. There are 3 places where ID can be set.
                if (containers.length > 1) {
                    delete options.id;
                    if ('properties' in options) {
                        delete options.properties.id; // DOM property
                    }
                    if ('attributes' in options) {
                        delete options.attributes.id; // HTML attribute
                    }
                }
                results.push(replacerFunction(container));

            } else {
                results.push(converterFunction(container));
            }
        }

        return results;
    }

    protected static _mergePropertiesAndAttributes(existingElement: HTMLElement, options: Record<string, any>): Record<string, any> {
        // This attempts to preserve the attributes set on the replaced element. That opens an ugly can of worms,
        // but it should make replacement components more useful because it allows them to vary.
        // It does make a brutal juggling act:
        // If the existing element has innerHTML, we want to take it.
        // If outerHTML is provided, the outerHTML's innerHTML should override the existing element's.
        // If the existing element has attributes, we want to take them.
        // If outerHTML is provided, the outerHTML's attributes should override them.
        // For any attributes passed in OPTIONS, they should override anything that came before.
        // For any properties passed in OPTIONS, they should override anything that came before.
        // Only the last 2 are handled in the component constructor. And if we're not careful, we could break them.

        const properties = { innerHTML: existingElement.innerHTML };
        const attributes: Record<string, any> = {};
        for (const attr of Array.from(existingElement.attributes)) {
            (attributes as Record<string, any>)[attr.name] = attr.value;
        }

        const opt = Object.assign({}, options);

        // This is ugly because it happens again in the constructor. No other clean way to parse the element attributes, though.
        if ((opt as IOuterHtmlOptions).outerHtml) {
            const tmp = div((opt as IOuterHtmlOptions).outerHtml.trim());
            if (tmp.childNodes.length !== 1 || !tmp.firstElementChild) {
                throw new Error('OuterHtml must contain exactly one HTMLElement');
            }
            const tmp2 = tmp.firstElementChild as HTMLElement;

            // The outer HTML attributes get picked up automatically when added to the DOM, so we really
            // just need to discard the matching properties and attributes of the existing element.
            delete properties.innerHTML;
            for (const attr of Array.from(tmp2.attributes)) {
                if (attr.name in attributes) {
                    delete attributes[attr.name];
                }
            }
        }

        opt.properties = Object.assign(properties, opt.properties);
        opt.attributes = Object.assign(attributes, opt.attributes);

        return opt;
    }

    protected static _getOptions(options?: string | Record<string, any>): Record<string, any> {
        let opt: Record<string, any>;
        if (options && typeof options === 'string') {
            // Shortcut for replacing the outer HTML
            opt = { replace: true, outerHtml: options };
        } else if (options) {
            // Typescript doesn't know that options !== 'string' (can't read "else if" clause)
            opt = options as any;
        } else {
            opt = { replace: false };
        }
        return opt;
    }

    protected static _replaceElement(existingElement: HTMLElement, component: Component<HTMLElement>): void {
        if (existingElement.parentNode) {
            existingElement.parentNode.replaceChild(component.content, existingElement);
        } else {
            document.replaceChild(component.content, existingElement);
        }
    }

    private static _replaceElementWithComponent<TElement extends HTMLElement>(
        existingElement: HTMLElement,
        options: IInnerHtmlOptions | IOuterHtmlOptions,
        constructor: Constructable<Component<TElement>>
    ): Component<TElement> {
        const opt = this._mergePropertiesAndAttributes(existingElement, options);
        const component = new constructor(options);
        this._replaceElement(existingElement, component);
        return component;
    }

    private static _convertElementToComponent<TElement extends HTMLElement>(
        existingElement: HTMLElement,
        constructor: Constructable<Component<TElement>>
    ): Component<TElement> {
        return new constructor({ element: existingElement as TElement });
    }

    private static _lookUpContainersToInject(
        selector: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[] | { parent?: Element, selector: string } = '[ichigo]'
    ): HTMLElement[] {
        if (selector === null) {
            // I've done this myself, which results in a silent failure if accidental.
            // tslint:disable-next-line:no-console
            console.warn('Injection selector is null.');
        }
        selector = selector || '[ichigo]';

        // Look up the elements to either replace or convert
        let containers: HTMLElement[];
        if (typeof selector === 'string') {
            containers = Array.from(document.querySelectorAll(selector));
        } else if (selector instanceof NodeList) {
            containers = Array.from(selector);
        } else if (Array.isArray(selector)) {
            containers = selector;
        } else if (typeof selector === 'object' && 'selector' in selector) {
            const parent = selector.parent || document;
            containers = Array.from(parent.querySelectorAll(selector.selector));
        } else {
            containers = [selector];
        }

        return containers;
    }

    content: TElement;

    get id(): string {
        return this.content.id;
    }
    set id(value) {
        this.content.id = value;
    }
    get innerHTML(): string {
        return this.content.innerHTML;
    }
    set innerHTML(value) {
        this.content.innerHTML = value;
    }

    get value(): FormFieldValue {
        // Will return undefined if content is not a form field type
        return getFormFieldValue(this.content);
    }

    set value(value: FormFieldValue) {
        // Will log a warning if content is not a form field type
        setFormFieldValue(this.content, value);
    }

    get className(): string {
        return this.content.className;
    }
    set className(value) {
        this.content.className = value;
    }

    get classList(): DOMTokenList {
        return this.content.classList;
    }

    get style(): CSSStyleDeclaration {
        return this.content.style;
    }

    /**
     * Creates an instance of Component. Many options:
     * No arguments - Create a basic DIV
     * IExistingLookupOptions - Look up an existing element in the DOM and convert it to a component
     * IExistingElementOptions - Take an existing element and convert it to a component
     * IInnerHtmlOptions - Create a new component setting the inner HTML
     * IOuterHtmlOptions - Create a new component setting the outer HTML (including the tag for the component itself)
     * string - Create a new component setting the outer HTML to the string
     */
    constructor();
    constructor(lookupExistingElement: IExistingLookupOptions);
    constructor(existingElement: IExistingElementOptions<TElement>);
    constructor(newElement: IInnerHtmlOptions);
    constructor(newElement: IOuterHtmlOptions);
    constructor(newElement: string);
    constructor(args?: any) {
        // Typescript doesn't understand that this.content is set in ALL of the private ctor functions.
        this.content = null as any;

        if (args && typeof args === 'string') {
            _ctor_string.call(this, args);
        } else if (args && args.selector) {
            _ctor_lookup.call(this, args);
        } else if (!args) {
            _ctor_empty.call(this);
        } else if (args.element) {
            _ctor_existingElement.call(this, args);
        } else if (args.outerHtml) {
            _ctor_outerHtml.call(this, args);
        } else {
            _ctor_innerHtml.call(this, args);
        }

        this.mapComponent();

        function _ctor_empty(this: Component<TElement>): void {
            // No arguments
            // This is fine as long as TElement is DIV. No way to verify that as it's a typescript illusion. JS doesn't see type parameters.
            this.content = createElement<TElement>(elementType.HTMLDivElement, { id: getUniqueId() });
        }

        function _ctor_lookup(this: Component<TElement>, existingElement: IExistingLookupOptions): void {
            // Shortcut for existingElement.
            // The main reason it exists is that document.getElementById doesn't return the correct type (it's not generic),
            // so typescript freaks out and thinks it should be a STRING, in spite of the type definition not being anything
            // like that. It's just easier to use this than to remember "oh, right, i have to use document.querySelector(), which is generic".

            const element = (existingElement.parent || document).querySelector(existingElement.selector);
            if (!element) {
                throw new Error('Element selector could not find element.');
            }

            _ctor_existingElement.call(this, { element } as any);
        }

        function _ctor_existingElement(this: Component<TElement>, existingElement: IExistingElementOptions<TElement>): void {
            this.content = existingElement.element;

            // First try attributes (which are the initial values)
            if (existingElement.attributes) {
                for (const attr of Object.getOwnPropertyNames(existingElement.attributes)) {
                    this.content.setAttribute(attr, existingElement.attributes[attr]);
                }
            }

            // Then overwrite with properties (which are current)
            if (existingElement.properties) {
                Object.assign(this.content, existingElement.properties);
            }
        }

        function _ctor_innerHtml(this: Component<TElement>, newElement: IInnerHtmlOptions): void {
            // New element. User specifies the inner HTML for the content.
            // This could be an empty object like {}, practically the same as calling it with no args
            const props: Record<string, any> = { innerHTML: newElement.innerHtml || '' };
            Object.assign(props, newElement.properties);

            this.content = createElement<TElement>(newElement.type || elementType.HTMLDivElement, props, newElement.attributes);

            if (newElement.id) {
                this.content.id = newElement.id;
            } else if (!this.content.id) {
                this.content.id = getUniqueId();
            }
        }

        function _ctor_outerHtml(this: Component<TElement>, newElement: IOuterHtmlOptions): void {
            // User specifies the full HTML for the content.
            // Note that it can't be type checked. JS can't see what TElement is.
            const tmpdiv = div(newElement.outerHtml.trim());
            if (tmpdiv.childNodes.length !== 1 || !tmpdiv.firstElementChild) {
                throw new Error('OuterHtml must contain exactly one HTMLElement');
            }
            this.content = tmpdiv.firstElementChild as TElement;

            // First try attributes (which are the initial values)
            if (newElement.attributes) {
                for (const attr of Object.getOwnPropertyNames(newElement.attributes)) {
                    this.content.setAttribute(attr, newElement.attributes[attr]);
                }
            }

            // Then overwrite with properties (which are current)
            if (newElement.properties) {
                Object.assign(this.content, newElement.properties);
            }

            // Specified ID takes precedence
            if (newElement.id) {
                this.content.id = newElement.id;
            }
        }

        function _ctor_string(this: Component<TElement>, newElement: string): void {
            // String by itself is a shortcut for outerHtml
            _ctor_outerHtml.call(this, { outerHtml: newElement });
        }
    }

    /**
     * Add an HTML event listener on the Component content. Fluent.
     */
    addEventListener(eventType: string, event: (evt: Event) => any, options?: AddEventListenerOptions): this {
        this.content.addEventListener(eventType, event, options);
        return this;
    }

    /**
     * Search the HTML for i5_event or :event attributes and add event listeners according to inline custom attributes.
     * Filter by matching the componentFilter input with an attribute like component="componentFilter".
     * Enclose the event type in parentheses, and for the value, enter the name of a method in this component.
     * Example: <form :event (click)="submitTheForm"></form>
     * This is also allowed: <form :event _click_="submitTheForm"></form>
     */
    addInlineEventListeners(componentFilter?: string): this {
        // It would be nice if we could skip this initial filter, like angular does. But there is no CSS selector for
        // attribute name begins with or ends with. [attr^=] is for the VALUE beginning with something.
        // This includes the content itself in its check.
        for (const ele of nodeListSelectorAll([this.content], '[i5_event], [\\00003Aevent], [data-i5_event]')) {
            if (componentFilter && ele.getAttribute('component') !== componentFilter) {
                continue;
            }

            const currentAttributes = Array.from(ele.attributes);
            let eventDefinition = currentAttributes.find(f => f.name.startsWith('(') && f.name.endsWith(')') && f.name.length > 2);
            if (!eventDefinition) {
                // Try to find by alternate syntax. This one works better with setAttribute().
                eventDefinition = currentAttributes.find(f => f.name.startsWith('_') && f.name.endsWith('_') && f.name.length > 2);
            }
            if (!eventDefinition || !eventDefinition.value) {
                throw new Error(`Event definition not declared for element ${ele.id || ele.tagName}`);
            }

            const method = (this as Record<string, any>)[eventDefinition.value];
            if (typeof method !== 'function') {
                throw new Error(`Handler method for element ${ele.id || ele.tagName} ${eventDefinition.value} does not exist`);
            }

            ele.addEventListener(eventDefinition.name.slice(1, -1), method.bind(this));
        }

        return this;
    }

    /**
     * Add a child to content. Child can be a node or IContent. Fluent.
     */
    append<T extends HTMLElement>(childComponent: IContent<T>): this;
    append<T extends Node>(newChild: T): this;
    append<T extends HTMLElement>(newChild: T | IContent<T>): this {
        if (guard(newChild)) {
            this.content.appendChild(newChild.content);
        } else {
            this.content.appendChild(newChild);
        }
        return this;

        function guard(obj: T | IContent<T>): obj is IContent<T> {
            return obj && 'content' in obj && obj.content instanceof Node;
        }
    }

    /**
     * Add a child to content. Child can be a node or IContent. Returns the child.
     */
    appendChild<T extends HTMLElement>(childComponent: IContent<T>): T;
    appendChild<T extends Node>(newChild: T): T;
    appendChild<T extends HTMLElement>(newChild: T | IContent<T>): T {
        if (guard(newChild)) {
            return this.content.appendChild(newChild.content);
        } else {
            return this.content.appendChild(newChild);
        }

        function guard(obj: T | IContent<T>): obj is IContent<T> {
            return obj && 'content' in obj && obj.content instanceof Node;
        }
    }

    /**
     * Add the current component container to the DOM inside the parent element provided.
     * Parent can be a node or IContent. Fluent.
     */
    appendToParent<T extends HTMLElement>(parent: IContent<T>): this;
    appendToParent<T extends Node>(parent: T): this;
    appendToParent<T extends HTMLElement>(parent: T | IContent<T>): this {
        if (guard(parent)) {
            parent.content.appendChild(this.content);
        } else {
            parent.appendChild(this.content);
        }
        return this;

        function guard(obj: T | IContent<T>): obj is IContent<T> {
            return obj && 'content' in obj && obj.content instanceof Node;
        }
    }

    /**
     * Add the component to ComponentMap.
     */
    mapComponent(): this {
        // Throw an error if the content has already been related to a different component
        if (getComponent(this.content)) {
            throw new Error('Content already referenced by a component');
        }

        ComponentMap.components.set(this.content, this);
        return this;
    }

    /**
     * Remove the component from ComponentMap. Sometimes you might need to use this. But hopefully rarely, because it's using a WeakMap,
     */
    unmapComponent(): this {
        ComponentMap.components.delete(this.content);
        return this;
    }

    /**
     * Return a list of components that are nested inside this component.
     */
    *getAllChildComponents(): IterableIterator<IContent> {
        for (const e of this.content.querySelectorAll('*')) {
            const component = getComponent(e as HTMLElement);
            if (component) {
                yield component;
            }
        }
    }

    /**
     * Set CSS style on the Component content. Fluent.
     */
    setStyle(property: string, value: string): this;
    setStyle(style: Record<string, string>): this;
    setStyle(property: Record<string, string> | string, value?: string) {
        if (typeof property === 'string' && value) { // Overload 1
            this.content.style.setProperty(property, value);
        } else {
            for (const prop of Object.getOwnPropertyNames(property)) { // Overload 2
                // TS just forgot that property is Record<string, string>.
                const val = (property as Record<string, string>)[prop];
                this.content.style.setProperty(prop, val);
            }
        }

        return this;
    }

    /**
     * Add CSS classes on the component content. Fluent.
     */
    addClass(className: string): this;
    addClass(classNames: string[]): this;
    addClass(classNames: string | string[]): this {
        if (!classNames) {
            return this;
        }
        if (typeof classNames === "string" && classNames.includes(" ")) {
            classNames = classNames.split(" ").filter(q => q !== "");
        } else if (typeof classNames === "string") {
            classNames = [classNames];
        }
        for (const name of classNames as string[]) {
            this.content.classList.add(name);
        }
        return this;
    }
}
