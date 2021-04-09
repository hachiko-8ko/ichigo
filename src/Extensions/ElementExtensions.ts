import { createElement } from '../Html/CreateElement';

/**
 * This script contains extensions to make (mostly) fluent manipulation of the DOM easier. They are focused around things
 * that you would use when creating a page, because that's where fluent methods are helpful. You don't often need
 * chained modifications when removing classes, for example, so element.classList.remove(foo) works fine.
 *
 * In your main process, import this script (import '/path/to/Ichigo/Extensions/ElementExtensions') to add
 * these fluent extensions to the prototypes.
 */

// I wanted to have separate d.ts files, but that breaks VSCode. Though I have an identical project (old version of this project)
// where d.ts files work fine. If I explicitly import the d.ts file, fine, but browserify doesn't understand that syntax, so can't use it.
// Only in this, not the old version. FML Microsoft.
declare global {
    // tslint:disable-next-line:interface-name
    interface HTMLElement {
        appendToParent(parent: HTMLElement): this;
        appendChildFluent<T extends Node>(child: T): this;
        appendSibling<T extends Node>(next: T): T;
        appendSiblingFluent<T extends Node>(next: T): this;
        replaceWith<T extends Node>(newElement: T): T;
        swap<T extends Node>(element: T): T;
        extract(): this;
        addEventListenerFluent(eventType: string, event: (evt: Event) => any, options?: AddEventListenerOptions): this;
        addStyle(property: string, value: string): this;
        addClass(classNames: string | string[]): this;
    }

    // tslint:disable-next-line:interface-name
    interface DocumentFragment {
        createElement<TElement extends HTMLElement>(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): TElement;
        createElementFluent(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): this;
        appendToParent<TElement extends HTMLElement>(parent: TElement): TElement;
    }
}

/**
 * Set the parent for an element (join the parent's family as a new child), the opposite of appendChild. Fluent, for chaining, so
 * it's not a perfect analog (appendChild returns the argument while this returns the extended object ... though both are the child).
 */
HTMLElement.prototype.appendToParent = function _appendToParent<TElement extends HTMLElement>(this: TElement, parent: HTMLElement): TElement {
    parent.appendChild(this);
    return this;
};

/**
 * Fluent version of appendChild, which returns the parent, not the child (the argument).
 */
HTMLElement.prototype.appendChildFluent = function _appendChildFluent<T extends Node>(this: HTMLElement, child: T): HTMLElement {
    this.appendChild(child);
    return this;
};

/**
 * Add the element after the current item, at the same level. Not fluent, so this is the same pattern as appendChild.
 */
HTMLElement.prototype.appendSibling = function _appendSibling<T extends Node>(this: HTMLElement, next: T): T {
    const parent = this.parentNode || document;
    return parent.appendChild(next);
};

/**
 * Add the element after the current item, at the same level. Fluent.
 */
HTMLElement.prototype.appendSiblingFluent = function _appendSiblingFluent<T extends Node>(this: HTMLElement, next: T): HTMLElement {
    const parent = this.parentNode || document;
    parent.appendChild(next);
    return this;
};

/**
 * Replace the element. Not fluent, so this is the same pattern as appendChild. There is no fluent version because
 * this is deleting the extended object.
 */
HTMLElement.prototype.replaceWith = function _replaceWith<T extends Node>(this: HTMLElement, newElement: T): T {
    const parent = this.parentNode || document;
    parent.replaceChild(newElement, this);
    return newElement;
};

/**
 * Swap two elements from their places in the DOM, returning the argument.
 */
HTMLElement.prototype.swap = function _swap<T extends Node>(this: HTMLElement, element: T): T {
    const parent = this.parentNode || document;
    const elementParent = element.parentNode || document;
    const placeHolder = document.createElement('span');

    elementParent.replaceChild(placeHolder, element);
    parent.replaceChild(element, this);
    elementParent.replaceChild(this, placeHolder);

    return element;
};

/**
 * A wrapper around document.removeChild that uses the same API as the other functions here.
 * Included for the sake of consistency.
 */
HTMLElement.prototype.extract = function _extract(this: HTMLElement): HTMLElement {
    const parent = this.parentNode || document;
    return parent.removeChild(this);
};

/**
 * Fluent version of addEventListener.
 */
HTMLElement.prototype.addEventListenerFluent = function _addEventListenerFluent<TElement extends HTMLElement>(this: TElement, eventType: string, event: (evt: Event) => any, options?: AddEventListenerOptions): TElement {
    this.addEventListener(eventType, event, options);
    return this;
};

/**
 * Fluent style adder.
 */
HTMLElement.prototype.addStyle = function _addStyle<TElement extends HTMLElement>(this: TElement, property: string, value: string): TElement {
    this.style.setProperty(property, value);
    return this;
};

/**
 * Fluent class adder.
 */
HTMLElement.prototype.addClass = function _addClass<TElement extends HTMLElement>(this: TElement, classNames: string | string[]): TElement {
    if (!Array.isArray(classNames)) {
        classNames = [classNames];
    }
    // Need to also allow classes in the "class1 class2" format
    for (const c of ([] as string[]).concat(...classNames
        .map(q => q.split(' '))
        .filter(q => q))) {
        this.classList.add(c);
    }
    return this;
};

/**
 * Create an element using the createElement helper function and add it to the fragment, returning the new element.
 */
DocumentFragment.prototype.createElement = function _createElement<TElement extends HTMLElement>(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): TElement {
    const element = createElement(tagName, properties);
    this.appendChild(element);
    return element as TElement;
};

/**
 * Create an element using the createElement helper function and add it to the fragment. Fluent version, so it's easy to quickly add
 * a bunch of elements to the fragment.
 */
DocumentFragment.prototype.createElementFluent = function _createElementFluent<TElement extends HTMLElement>(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): DocumentFragment {
    const element = createElement(tagName, properties);
    this.appendChild(element);
    return this;
};

/**
 * Take a document fragment and add its contents to a parent element. Cannot be fluent because at this point, the fragment is empty and 
 * pretty useless, so this returns the parent argument (as good as any other option).
 */
DocumentFragment.prototype.appendToParent = function _appendToParent<TElement extends HTMLElement>(this: DocumentFragment, parent: TElement): TElement {
    parent.appendChild(this);
    return parent;
};
