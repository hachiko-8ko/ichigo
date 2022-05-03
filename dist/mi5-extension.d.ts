import { IContent } from '../src/HtmlComponent/Contract/IContent';
import { BoundComponent } from '../src/HtmlComponent/BoundComponent';
import { ObservableProperty } from '../src/Observable/ObservableProperty';

declare global {
    // tslint:disable-next-line:interface-name
    interface HTMLElement {
        getComponent(this: HTMLElement): IContent | undefined;
        bindComponent<TElement extends HTMLElement = HTMLElement, TModel = any>(this: TElement, viewModel: TModel): BoundComponent<TElement, TModel>;
        deleteComponent(): void;
    }

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

    // tslint:disable-next-line:interface-name
    interface Object {
        toObservable<T>(name?: string): ObservableProperty<T>;
    }
    // tslint:disable-next-line:interface-name
    interface String {
        toObservable(name?: string): ObservableProperty<string>;
    }
    // tslint:disable-next-line:interface-name
    interface Number {
        toObservable(name?: string): ObservableProperty<number>;
    }
    // tslint:disable-next-line:interface-name
    interface Boolean {
        toObservable(name?: string): ObservableProperty<boolean>;
    }
}
