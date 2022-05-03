import { elementType } from '../src/Html/ElementType';
import { FormFieldValue } from '../src/Html/FormFieldValue';
import { BoundComponent } from '../src/HtmlComponent/BoundComponent';
import { Component } from '../src/HtmlComponent/Component';
import { ComponentMap } from '../src/HtmlComponent/ComponentMap';
import { IContent } from '../src/HtmlComponent/Contract/IContent';
import { ObservableProperty } from '../src/Observable/ObservableProperty';
import { ObservableProxy } from '../src/Observable/ObservableProxy';
import { ObservableState } from '../src/Observable/ObservableState';
import { PageRouter } from '../src/Router/PageRouter';
import { DeferredPromise } from '../src/System/Async/DeferredPromise';
import { RepeatablePromise } from '../src/System/Async/RepeatablePromise';
import { ArrayChangedEventArgs } from '../src/System/EventHandler/ArrayChangedEventArgs';
import { EventHandler } from '../src/System/EventHandler/EventHandler';
import { PropertyChangedEventArgs } from '../src/System/EventHandler/PropertyChangedEventArgs';
import { Kwarg } from '../src/System/Types/KeywordArguments';
import { None, Nullable } from '../src/System/Types/NoneType';
import { RecursiveArray } from '../src/System/Types/RecursiveArray';

interface IComponent {
    Component: Component;
    BoundComponent: BoundComponent;
    ComponentMap: ComponentMap;
    getComponent(element: HTMLElement): IContent<HTMLElement>;
}

interface IObservable {
    EventHandler: EventHandler;
    observableAssign(target: any, ...sources: any[]): any;
    ObservableProxy: ObservableProxy;
    ObservableProperty: ObservableProperty<PropertyChangedEventArgs>;
    ObservableState: ObservableState;
    ArrayChangedEventArgs: ArrayChangedEventArgs;
    PropertyChangedEventArgs: PropertyChangedEventArgs;
}

interface IPromise {
    DeferredPromise: DeferredPromise;
    RepeatablePromise: RepeatablePromise;
}

interface IRouter {
    PageRouter: PageRouter;
}

interface IHtml {
    anchor(innerHtml: string, href: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLAnchorElement;
    anchor(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLAnchorElement;
    anchor(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLAnchorElement;
    button(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLButtonElement;
    button(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLButtonElement;
    createElement<T extends HTMLAnchorElement>(tagName: elementType.HTMLAnchorElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLAreaElement>(tagName: elementType.HTMLAreaElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLAudioElement>(tagName: elementType.HTMLAudioElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLBRElement>(tagName: elementType.HTMLBRElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLBaseFontElement>(tagName: elementType.HTMLBaseFontElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLQuoteElement>(tagName: elementType.HTMLBlockQuoteElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLButtonElement>(tagName: elementType.HTMLButtonElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLCanvasElement>(tagName: elementType.HTMLCanvasElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLDataElement>(tagName: elementType.HTMLDataElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLDataListElement>(tagName: elementType.HTMLDataListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLDialogElement>(tagName: elementType.HTMLDialogElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLDivElement>(tagName: elementType.HTMLDivElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLDListElement>(tagName: elementType.HTMLDListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLEmbedElement>(tagName: elementType.HTMLEmbedElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLFieldSetElement>(tagName: elementType.HTMLFieldSetElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLFormElement>(tagName: elementType.HTMLFormElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading1Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading2Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading3Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading4Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading5Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading6Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLHRElement>(tagName: elementType.HTMLHRElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLImageElement>(tagName: elementType.HTMLImageElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLInputElement>(tagName: elementType.HTMLInputElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLLabelElement>(tagName: elementType.HTMLLabelElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLLegendElement>(tagName: elementType.HTMLLegendElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLLIElement>(tagName: elementType.HTMLLIElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLLinkElement>(tagName: elementType.HTMLLinkElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLMapElement>(tagName: elementType.HTMLMapElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLMeterElement>(tagName: elementType.HTMLMeterElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLModElement>(tagName: elementType.HTMLModDelElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLModElement>(tagName: elementType.HTMLModInsElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLOListElement>(tagName: elementType.HTMLOListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLObjectElement>(tagName: elementType.HTMLObjectElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLOptGroupElement>(tagName: elementType.HTMLOptGroupElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLOptionElement>(tagName: elementType.HTMLOptionElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLOutputElement>(tagName: elementType.HTMLOutputElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLParagraphElement>(tagName: elementType.HTMLParagraphElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLParamElement>(tagName: elementType.HTMLParamElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLPictureElement>(tagName: elementType.HTMLPictureElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLPreElement>(tagName: elementType.HTMLPreElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLProgressElement>(tagName: elementType.HTMLProgressElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLQuoteElement>(tagName: elementType.HTMLQuoteElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLScriptElement>(tagName: elementType.HTMLScriptElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLSelectElement>(tagName: elementType.HTMLSelectElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLSourceElement>(tagName: elementType.HTMLSourceElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLSpanElement>(tagName: elementType.HTMLSpanElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLStyleElement>(tagName: elementType.HTMLStyleElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableCaptionElement>(tagName: elementType.HTMLTableCaptionElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableDataCellElement>(tagName: elementType.HTMLTableDataCellElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableHeaderCellElement>(tagName: elementType.HTMLTableHeaderCellElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableColElement>(tagName: elementType.HTMLTableColElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableColElement>(tagName: elementType.HTMLTableColGroupElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableRowElement>(tagName: elementType.HTMLTableRowElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableSectionElement>(tagName: elementType.HTMLTableSectionBodyElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableSectionElement>(tagName: elementType.HTMLTableSectionFooterElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTableSectionElement>(tagName: elementType.HTMLTableSectionHeaderElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTemplateElement>(tagName: elementType.HTMLTemplateElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTextAreaElement>(tagName: elementType.HTMLTextAreaElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTimeElement>(tagName: elementType.HTMLTimeElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLTrackElement>(tagName: elementType.HTMLTrackElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLUListElement>(tagName: elementType.HTMLUListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLVideoElement>(tagName: elementType.HTMLVideoElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createElement<T extends HTMLElement>(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): T;
    createHtml(html: string, inline?: boolean): HTMLElement;
    createFragment(html: string): DocumentFragment;
    deleteNodeContent(node: Node): void;
    div(innerElement: HTMLElement, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLDivElement;
    div(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLDivElement;
    div(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLDivElement;
    escapeHtml(input: string): string;
    escapeHtml(input: Nullable<string>): Nullable<string>;
    extractNodeContent(node: Node): DocumentFragment;
    findIndexInParent(element: Element): Nullable<number>;
    getFormFieldValue(element: HTMLElement): FormFieldValue;
    paragraph(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLParagraphElement;
    paragraph(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLParagraphElement;
    nodeListSelector(nodes: NodeList | Node[], selector: string): HTMLElement | undefined;
    nodeListSelectorAll(nodes: NodeList | Node[], selector: string): HTMLElement[];
    setFormFieldValue(element: HTMLElement, value: FormFieldValue): void;
    span(element: HTMLElement, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLSpanElement;
    span(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLSpanElement;
    span(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLSpanElement;
    validateUniqueDomIds(): void;
}

interface IArray {
    cartesian<T1, T2>(a: T1[], b: T2[]): Array<[T1, T2]>;
    range(length: number): number[];
    traverse<T>(arr: T | T[] | RecursiveArray<T>): IterableIterator<T>;
    zip<T1, T2>(a: T1[], b: T2[]): Array<[T1, T2]>;
}

interface IUtil {
    array: IArray;
    cloneDeep<T>(obj: T): T;
    cloneObject<T extends Record<string, any>>(obj: T): T | undefined;
    delay(time: number): (result: any) => PromiseLike<any>;
    getUniqueId(): string;
    html: IHtml;
    isNone(test: any): test is None;
    isPositiveIntegerString(str: any): boolean;
    kw<T>(name: string, b?: T): any;
    kw<T>(arr: [string, T]): any;
    kw<T>(map: Record<string, T>): any;
    Kwarg: Kwarg;
    kwargsToObject<TOutput extends Record<string, any>>(arr: Kwarg<any>[]): TOutput;
    objectFullAssign<T>(target: any, source: any, returnClone?: boolean): T;
    orderBy<T>(propertyFn: (value: T) => any): (a: T, b: T) => number;
}

interface IMi5 {
    component: IComponent;
    observable: IObservable;
    promise: IPromise;
    router: IRouter;
    html: IHtml;
    util: IUtil;
}

declare var mi5: IMi5;
declare function using(lib: any, alias: string): void;
