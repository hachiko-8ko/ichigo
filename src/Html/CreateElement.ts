import { Kwarg } from '../System/Types/KeywordArguments';
import { elementType } from './ElementType';
import { extractNodeContent } from './ExtractNodeContent';

/**
 * Helper function to make it easy to add elements to the page, since you can't create a new HtmlElement().
 * Accepts Keyword Arguments.
 */
export function createElement<T extends HTMLAnchorElement>(tagName: elementType.HTMLAnchorElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLAreaElement>(tagName: elementType.HTMLAreaElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLAudioElement>(tagName: elementType.HTMLAudioElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLBRElement>(tagName: elementType.HTMLBRElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLBaseFontElement>(tagName: elementType.HTMLBaseFontElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLQuoteElement>(tagName: elementType.HTMLBlockQuoteElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLButtonElement>(tagName: elementType.HTMLButtonElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLCanvasElement>(tagName: elementType.HTMLCanvasElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLDataElement>(tagName: elementType.HTMLDataElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLDataListElement>(tagName: elementType.HTMLDataListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLDialogElement>(tagName: elementType.HTMLDialogElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLDivElement>(tagName: elementType.HTMLDivElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLDListElement>(tagName: elementType.HTMLDListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLEmbedElement>(tagName: elementType.HTMLEmbedElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLFieldSetElement>(tagName: elementType.HTMLFieldSetElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLFormElement>(tagName: elementType.HTMLFormElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading1Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading2Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading3Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading4Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading5Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHeadingElement>(tagName: elementType.HTMLHeading6Element, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLHRElement>(tagName: elementType.HTMLHRElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLImageElement>(tagName: elementType.HTMLImageElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLInputElement>(tagName: elementType.HTMLInputElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLLabelElement>(tagName: elementType.HTMLLabelElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLLegendElement>(tagName: elementType.HTMLLegendElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLLIElement>(tagName: elementType.HTMLLIElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLLinkElement>(tagName: elementType.HTMLLinkElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLMapElement>(tagName: elementType.HTMLMapElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLMeterElement>(tagName: elementType.HTMLMeterElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLModElement>(tagName: elementType.HTMLModDelElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLModElement>(tagName: elementType.HTMLModInsElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLOListElement>(tagName: elementType.HTMLOListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLObjectElement>(tagName: elementType.HTMLObjectElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLOptGroupElement>(tagName: elementType.HTMLOptGroupElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLOptionElement>(tagName: elementType.HTMLOptionElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLOutputElement>(tagName: elementType.HTMLOutputElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLParagraphElement>(tagName: elementType.HTMLParagraphElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLParamElement>(tagName: elementType.HTMLParamElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLPictureElement>(tagName: elementType.HTMLPictureElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLPreElement>(tagName: elementType.HTMLPreElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLProgressElement>(tagName: elementType.HTMLProgressElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLQuoteElement>(tagName: elementType.HTMLQuoteElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLScriptElement>(tagName: elementType.HTMLScriptElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLSelectElement>(tagName: elementType.HTMLSelectElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLSourceElement>(tagName: elementType.HTMLSourceElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLSpanElement>(tagName: elementType.HTMLSpanElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLStyleElement>(tagName: elementType.HTMLStyleElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableCaptionElement>(tagName: elementType.HTMLTableCaptionElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableDataCellElement>(tagName: elementType.HTMLTableDataCellElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableHeaderCellElement>(tagName: elementType.HTMLTableHeaderCellElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableColElement>(tagName: elementType.HTMLTableColElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableColElement>(tagName: elementType.HTMLTableColGroupElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableRowElement>(tagName: elementType.HTMLTableRowElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableSectionElement>(tagName: elementType.HTMLTableSectionBodyElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableSectionElement>(tagName: elementType.HTMLTableSectionFooterElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTableSectionElement>(tagName: elementType.HTMLTableSectionHeaderElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTemplateElement>(tagName: elementType.HTMLTemplateElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTextAreaElement>(tagName: elementType.HTMLTextAreaElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTimeElement>(tagName: elementType.HTMLTimeElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLTrackElement>(tagName: elementType.HTMLTrackElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLUListElement>(tagName: elementType.HTMLUListElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLVideoElement>(tagName: elementType.HTMLVideoElement, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLElement>(tagName: string, properties?: Record<string, any>, attributes?: Record<string, any>): T;
export function createElement<T extends HTMLElement>(tagName: string, properties: Record<string, any> = {}, attributes?: Record<string, any>): T {
    ({ tagName, properties = {}, attributes } = Kwarg.parseArgs({ tagName, properties, attributes })); // kwargline

    // Allow attributes to be sent on properties, providing a cleaner interface.
    // It allows you to send createElement('div', {attributes: { class: 'foo' }}) instead of createElement('div', null, { class: 'foo' });
    // Another option is to use Kwargs, but not everyone wants to.
    if (properties && 'attributes' in properties) {
        attributes = Object.assign(attributes || {}, properties.attributes);
        delete properties.attributes;
    }

    return create<T>(tagName, properties, attributes);
}

function create<T extends HTMLElement>(tag: string, properties: Record<string, any> = {}, attributes?: Record<string, any>): T {
    const element: any = (document.createElement(tag)) as T;
    if (attributes) {
        for (const attr of Object.getOwnPropertyNames(attributes)) {
            element.setAttribute(attr, attributes[attr]);
        }
    }
    // DOM properties take precedence over attributes, because in some cases, they override the initial value.
    Object.assign(element, properties);
    return element;
}

/**
 * Quick helper to create HTML from any HTML element provided.
 * Use like const div = createHtml<HTMLDivElement>("<div>Something</div>") or const custom = createHtml("<some-tag></some-tag>").
 * If multiple elements or a plain text string with no HTML is provided, then it will be wrapped in a div, so it can keep
 * returning an HTMLElement
 */
export function createHtml(html: string, inline = false): HTMLElement {
    let wrapper;
    if (inline) {
        wrapper = span((html || '').trim());
    } else {
        wrapper = div((html || '').trim());
    }
    const nodes = wrapper.childNodes;

    // Multiple nodes, return the wrapping div
    // e.g. "This is a <em>test</em>" or "<div>Hello</div><div>World</div>"
    if (nodes.length !== 1) {
        return wrapper;
    }

    // If just a textnode (or empty), return a span. Text is incompatible with HTMLElement so can't return that
    // e.g. "Hello world"
    if (!wrapper.firstElementChild) {
        if (inline) {
            return wrapper; // This is a span
        } else {
            return span(wrapper.innerHTML);
        }
    }

    // Else return the single child.
    // e.g. "<div><div>Hello</div><div>World</div></div>"
    return wrapper.firstElementChild as HTMLElement;
}

/**
 * Quick helper to create a document fragment with any html.
 */
export function createFragment(html: string): DocumentFragment {
    const wrapper = div((html || '').trim());
    return extractNodeContent(wrapper);
}

/**
 * Quick helper to create DIVs because they're just so common. Most common element in all DIVSOUP-- er, HTML.
 * Accepts Keyword Arguments.
 */
export function div(innerElement: HTMLElement, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLDivElement;
export function div(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLDivElement;
export function div(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLDivElement;
export function div(htmlOrProperties: any = "", propertiesOrAttributes: Record<string, any> = {}, attributes?: Record<string, any>): HTMLDivElement {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline

    return _internal<HTMLDivElement>(elementType.HTMLDivElement, htmlOrProperties, propertiesOrAttributes, attributes);
}

/**
 * Quick helper to create SPANs because they're just so common.
 * Accepts Keyword Arguments.
 */
export function span(element: HTMLElement, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLSpanElement;
export function span(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLSpanElement;
export function span(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLSpanElement;
export function span(htmlOrProperties: any = "", propertiesOrAttributes: Record<string, any> = {}, attributes?: Record<string, any>): HTMLSpanElement {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline

    return _internal<HTMLSpanElement>(elementType.HTMLSpanElement, htmlOrProperties, propertiesOrAttributes, attributes);
}

/**
 * Quick helper to create Ps because they're just so common.
 * Accepts Keyword Arguments.
 */
export function paragraph(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLParagraphElement;
export function paragraph(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLParagraphElement;
export function paragraph(htmlOrProperties: any = "", propertiesOrAttributes: Record<string, any> = {}, attributes?: Record<string, any>): HTMLParagraphElement {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline

    return _internal<HTMLParagraphElement>(elementType.HTMLParagraphElement, htmlOrProperties, propertiesOrAttributes, attributes);
}

/**
 * Quick helper to create As because you can't spell HTML without A.
 * Accepts Keyword Arguments.
 */
export function anchor(innerHtml: string, href: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLAnchorElement;
export function anchor(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLAnchorElement;
export function anchor(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLAnchorElement;
export function anchor(htmlOrProperties: any = "", hrefOrProperties: any = {}, propertiesOrAttributes: Record<string, any> = {}, attributes?: Record<string, any>): HTMLAnchorElement {
    ({ htmlOrProperties = "", hrefOrProperties = {}, propertiesOrAttributes = {}, attributes } = Kwarg.parseArgs({ htmlOrProperties, hrefOrProperties, propertiesOrAttributes, attributes })); // kwargline

    const tmp = _internal<HTMLAnchorElement>(elementType.HTMLAnchorElement, htmlOrProperties, propertiesOrAttributes, attributes);
    if (typeof hrefOrProperties === 'string') {
        tmp.href = String(hrefOrProperties || '');
    }
    return tmp;
}

/**
 * Quick helper for buttons because they're common enough.
 * Accepts Keyword Arguments.
 */
export function button(innerHtml: string, properties?: Record<string, any>, attributes?: Record<string, any>): HTMLButtonElement;
export function button(properties?: Record<string, any>, attributes?: Record<string, any>): HTMLButtonElement;
export function button(htmlOrProperties: any = "", propertiesOrAttributes: Record<string, any> = {}, attributes?: Record<string, any>): HTMLButtonElement {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline

    return _internal<HTMLButtonElement>(elementType.HTMLButtonElement, htmlOrProperties, propertiesOrAttributes, attributes);
}

// Common private functions for overloads. Prevents lots of copypasta.
// This works for everything because TypeScript is keeping the types valid. In pure JS, bugs could be created (for example, passing an inner
// element to a paragraph ... disallowed by TS but the code is there in the JS)
function _internal<T>(type: elementType, htmlOrProperties: any = "", propertiesOrAttributes: Record<string, any> = {}, attributes?: Record<string, any>): T {
    if (htmlOrProperties instanceof HTMLElement) {
        return _ovr1<T>(type, htmlOrProperties, propertiesOrAttributes, attributes);
    } else if (typeof htmlOrProperties === "object") {
        return _ovr3<T>(type, htmlOrProperties, propertiesOrAttributes);
    }
    else {
        return _ovr2<T>(type, String(htmlOrProperties || ''), propertiesOrAttributes, attributes);
    }
}
function _ovr1<T>(type: elementType, innerElement: HTMLElement, props?: Record<string, any>, attrs?: Record<string, any>): T {
    const e = createElement(type, props, attrs);
    e.appendChild(innerElement);
    return e as any;
}
function _ovr2<T>(type: elementType, innerHtml: string, props?: Record<string, any>, attrs?: Record<string, any>): T {
    props = props || {};
    props.innerHTML = innerHtml;
    return createElement(type, props, attrs) as any;
}
function _ovr3<T>(type: elementType, props?: Record<string, any>, attrs?: Record<string, any>): T {
    props = props || {};
    props.innerHTML = props.innerHTML || '';
    return createElement(type, props, attrs) as any;
}
