(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../src/ExtensionLoader");
const CreateElement_1 = require("../src/Html/CreateElement");
const DeleteNodeContent_1 = require("../src/Html/DeleteNodeContent");
const EscapeHtml_1 = require("../src/Html/EscapeHtml");
const ExtractNodeContent_1 = require("../src/Html/ExtractNodeContent");
const FindIndexInParent_1 = require("../src/Html/FindIndexInParent");
const FormFieldValue_1 = require("../src/Html/FormFieldValue");
const QuerySelectorNodeList_1 = require("../src/Html/QuerySelectorNodeList");
const ValidateUniqueDomIds_1 = require("../src/Html/ValidateUniqueDomIds");
const BoundComponent_1 = require("../src/HtmlComponent/BoundComponent");
const Component_1 = require("../src/HtmlComponent/Component");
const ComponentMap_1 = require("../src/HtmlComponent/ComponentMap");
const ObservableAssign_1 = require("../src/Observable/ObservableAssign");
const ObservableProperty_1 = require("../src/Observable/ObservableProperty");
const ObservableProxy_1 = require("../src/Observable/ObservableProxy");
const ObservableState_1 = require("../src/Observable/ObservableState");
const PageRouter_1 = require("../src/Router/PageRouter");
const DeferredPromise_1 = require("../src/System/Async/DeferredPromise");
const Delay_1 = require("../src/System/Async/Delay");
const RepeatablePromise_1 = require("../src/System/Async/RepeatablePromise");
const ArrayUtilities_1 = require("../src/System/Collections/ArrayUtilities");
const OrderBy_1 = require("../src/System/Collections/OrderBy");
const ArrayChangedEventArgs_1 = require("../src/System/EventHandler/ArrayChangedEventArgs");
const EventHandler_1 = require("../src/System/EventHandler/EventHandler");
const PropertyChangedEventArgs_1 = require("../src/System/EventHandler/PropertyChangedEventArgs");
const KeywordArguments_1 = require("../src/System/Types/KeywordArguments");
const NoneType_1 = require("../src/System/Types/NoneType");
const CloneDeep_1 = require("../src/System/Utility/CloneDeep");
const CloneObject_1 = require("../src/System/Utility/CloneObject");
const GetUniqueId_1 = require("../src/System/Utility/GetUniqueId");
const IsInteger_1 = require("../src/System/Utility/IsInteger");
const ObjectFullAssign_1 = require("../src/System/Utility/ObjectFullAssign");
(function main() {
    // This is not mini, but it is everything that's in any of the mini-ichigo
    // scripts combined into one. Because there is a bit of overlap, the size
    // is less than the size of all the other scripts put together, IF you want
    // everything.
    // This also can be used as an easy template if you want to make your own
    // build. Just delete what you don't want and run the gulp scripts.
    const component = {
        Component: Component_1.Component,
        BoundComponent: BoundComponent_1.BoundComponent,
        ComponentMap: ComponentMap_1.ComponentMap,
        getComponent: ComponentMap_1.getComponent,
    };
    const observable = {
        EventHandler: EventHandler_1.EventHandler,
        observableAssign: ObservableAssign_1.observableAssign,
        ObservableProperty: ObservableProperty_1.ObservableProperty,
        ObservableProxy: ObservableProxy_1.ObservableProxy,
        ObservableState: ObservableState_1.ObservableState,
        ArrayChangedEventArgs: ArrayChangedEventArgs_1.ArrayChangedEventArgs,
        PropertyChangedEventArgs: PropertyChangedEventArgs_1.PropertyChangedEventArgs,
    };
    const promise = {
        DeferredPromise: DeferredPromise_1.DeferredPromise,
        RepeatablePromise: RepeatablePromise_1.RepeatablePromise
    };
    const router = {
        PageRouter: PageRouter_1.PageRouter
    };
    const html = {
        anchor: CreateElement_1.anchor,
        button: CreateElement_1.button,
        createElement: CreateElement_1.createElement,
        createHtml: CreateElement_1.createHtml,
        createFragment: CreateElement_1.createFragment,
        deleteNodeContent: DeleteNodeContent_1.deleteNodeContent,
        div: CreateElement_1.div,
        escapeHtml: EscapeHtml_1.escapeHtml,
        extractNodeContent: ExtractNodeContent_1.extractNodeContent,
        findIndexInParent: FindIndexInParent_1.findIndexInParent,
        getFormFieldValue: FormFieldValue_1.getFormFieldValue,
        paragraph: CreateElement_1.paragraph,
        nodeListSelector: QuerySelectorNodeList_1.nodeListSelector,
        nodeListSelectorAll: QuerySelectorNodeList_1.nodeListSelectorAll,
        setFormFieldValue: FormFieldValue_1.setFormFieldValue,
        span: CreateElement_1.span,
        validateUniqueDomIds: ValidateUniqueDomIds_1.validateUniqueDomIds,
    };
    const array = {
        cartesian: ArrayUtilities_1.cartesian,
        range: ArrayUtilities_1.range,
        traverse: ArrayUtilities_1.traverse,
        zip: ArrayUtilities_1.zip
    };
    const util = {
        array,
        cloneDeep: CloneDeep_1.cloneDeep,
        cloneObject: CloneObject_1.cloneObject,
        delay: Delay_1.delay,
        getUniqueId: GetUniqueId_1.getUniqueId,
        html,
        isNone: NoneType_1.isNone,
        isPositiveIntegerString: IsInteger_1.isPositiveIntegerString,
        kw: KeywordArguments_1.kw,
        Kwarg: KeywordArguments_1.Kwarg,
        objectFullAssign: ObjectFullAssign_1.objectFullAssign,
        orderBy: OrderBy_1.orderBy,
    };
    window.mi5 = window.mi5 || {};
    window.mi5.component = Object.assign(window.mi5.component || {}, component);
    window.mi5.observable = Object.assign(window.mi5.observable || {}, observable);
    window.mi5.promise = Object.assign(window.mi5.promise || {}, promise);
    window.mi5.router = Object.assign(window.mi5.router || {}, router);
    window.mi5.html = Object.assign(window.mi5.html || {}, html);
    window.mi5.util = Object.assign(window.mi5.util || {}, util);
    /**
     * This slightly simplifes the process of referencing mini-ichigo components without the full namespace.
     * It requires two arguments, unfortunately, because it's not possible in many cases to determine the
     * class or function name. Often the 'name' property has only the minified name, a random letter.
     */
    window.mi5.using = function using(lib, alias) {
        if (!lib || !alias) {
            throw new Error('NullArgument');
        }
        window.eval.call(window, '(function (arg) { window.' + alias + ' = arg; })')(lib);
    };
})();

},{"../src/ExtensionLoader":2,"../src/Html/CreateElement":6,"../src/Html/DeleteNodeContent":7,"../src/Html/EscapeHtml":9,"../src/Html/ExtractNodeContent":10,"../src/Html/FindIndexInParent":11,"../src/Html/FormFieldValue":12,"../src/Html/QuerySelectorNodeList":13,"../src/Html/ValidateUniqueDomIds":14,"../src/HtmlComponent/BoundComponent":15,"../src/HtmlComponent/Component":16,"../src/HtmlComponent/ComponentMap":17,"../src/Observable/ObservableAssign":24,"../src/Observable/ObservableProperty":26,"../src/Observable/ObservableProxy":27,"../src/Observable/ObservableState":28,"../src/Router/PageRouter":29,"../src/System/Async/DeferredPromise":30,"../src/System/Async/Delay":31,"../src/System/Async/RepeatablePromise":32,"../src/System/Collections/ArrayUtilities":33,"../src/System/Collections/OrderBy":34,"../src/System/EventHandler/ArrayChangedEventArgs":35,"../src/System/EventHandler/EventHandler":37,"../src/System/EventHandler/PropertyChangedEventArgs":38,"../src/System/Types/KeywordArguments":40,"../src/System/Types/NoneType":41,"../src/System/Utility/CloneDeep":42,"../src/System/Utility/CloneObject":43,"../src/System/Utility/GetUniqueId":44,"../src/System/Utility/IsInteger":45,"../src/System/Utility/ObjectFullAssign":47}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This script contains extensions to provide additional functions used by Ichigo.
 * In your main process, import this script (import '/path/to/Ichigo/IchigoExtensionLoader') to add
 * these extensions to prototypes.
 */
require("./Extensions/ObservableExtensions");
require("./Extensions/ComponentExtensions");
require("./Extensions/ElementExtensions");

},{"./Extensions/ComponentExtensions":3,"./Extensions/ElementExtensions":4,"./Extensions/ObservableExtensions":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IComponentBindingOptions_1 = require("../HtmlComponent/Options/IComponentBindingOptions");
const BoundComponent_1 = require("../HtmlComponent/BoundComponent");
const ComponentMap_1 = require("../HtmlComponent/ComponentMap");
HTMLElement.prototype.getComponent = function _getComponent() {
    return ComponentMap_1.ComponentMap.components.get(this);
};
HTMLElement.prototype.bindComponent = function _bind(viewModel) {
    return new BoundComponent_1.BoundComponent(viewModel, new IComponentBindingOptions_1.ExistingElementBindingOptions({ element: this }));
};
HTMLElement.prototype.deleteComponent = function _deleteComponent() {
    const component = ComponentMap_1.ComponentMap.components.get(this);
    if (!component) {
        // tslint:disable-next-line:no-console
        console.error('Not a component');
        return;
    }
    if (component instanceof BoundComponent_1.BoundComponent) {
        component.dispose();
    }
    const parent = this.parentNode || document;
    parent.removeChild(this);
};

},{"../HtmlComponent/BoundComponent":15,"../HtmlComponent/ComponentMap":17,"../HtmlComponent/Options/IComponentBindingOptions":18}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateElement_1 = require("../Html/CreateElement");
/**
 * Set the parent for an element (join the parent's family as a new child), the opposite of appendChild. Fluent, for chaining, so
 * it's not a perfect analog (appendChild returns the argument while this returns the extended object ... though both are the child).
 */
HTMLElement.prototype.appendToParent = function _appendToParent(parent) {
    parent.appendChild(this);
    return this;
};
/**
 * Fluent version of appendChild, which returns the parent, not the child (the argument).
 */
HTMLElement.prototype.appendChildFluent = function _appendChildFluent(child) {
    this.appendChild(child);
    return this;
};
/**
 * Add the element after the current item, at the same level. Not fluent, so this is the same pattern as appendChild.
 */
HTMLElement.prototype.appendSibling = function _appendSibling(next) {
    const parent = this.parentNode || document;
    return parent.appendChild(next);
};
/**
 * Add the element after the current item, at the same level. Fluent.
 */
HTMLElement.prototype.appendSiblingFluent = function _appendSiblingFluent(next) {
    const parent = this.parentNode || document;
    parent.appendChild(next);
    return this;
};
/**
 * Replace the element. Not fluent, so this is the same pattern as appendChild. There is no fluent version because
 * this is deleting the extended object.
 */
HTMLElement.prototype.replaceWith = function _replaceWith(newElement) {
    const parent = this.parentNode || document;
    parent.replaceChild(newElement, this);
    return newElement;
};
/**
 * Swap two elements from their places in the DOM, returning the argument.
 */
HTMLElement.prototype.swap = function _swap(element) {
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
HTMLElement.prototype.extract = function _extract() {
    const parent = this.parentNode || document;
    return parent.removeChild(this);
};
/**
 * Fluent version of addEventListener.
 */
HTMLElement.prototype.addEventListenerFluent = function _addEventListenerFluent(eventType, event, options) {
    this.addEventListener(eventType, event, options);
    return this;
};
/**
 * Fluent style adder.
 */
HTMLElement.prototype.addStyle = function _addStyle(property, value) {
    this.style.setProperty(property, value);
    return this;
};
/**
 * Fluent class adder.
 */
HTMLElement.prototype.addClass = function _addClass(classNames) {
    if (!Array.isArray(classNames)) {
        classNames = [classNames];
    }
    // Need to also allow classes in the "class1 class2" format
    for (const c of [].concat(...classNames
        .map(q => q.split(' '))
        .filter(q => q))) {
        this.classList.add(c);
    }
    return this;
};
/**
 * Create an element using the createElement helper function and add it to the fragment, returning the new element.
 */
DocumentFragment.prototype.createElement = function _createElement(tagName, properties, attributes) {
    const element = CreateElement_1.createElement(tagName, properties);
    this.appendChild(element);
    return element;
};
/**
 * Create an element using the createElement helper function and add it to the fragment. Fluent version, so it's easy to quickly add
 * a bunch of elements to the fragment.
 */
DocumentFragment.prototype.createElementFluent = function _createElementFluent(tagName, properties, attributes) {
    const element = CreateElement_1.createElement(tagName, properties);
    this.appendChild(element);
    return this;
};
/**
 * Take a document fragment and add its contents to a parent element. Cannot be fluent because at this point, the fragment is empty and
 * pretty useless, so this returns the parent argument (as good as any other option).
 */
DocumentFragment.prototype.appendToParent = function _appendToParent(parent) {
    parent.appendChild(this);
    return parent;
};

},{"../Html/CreateElement":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableProperty_1 = require("../Observable/ObservableProperty");
/**
 * Quickly convert an object to a ObservableProperty.
 */
Object.prototype.toObservable = function (name) {
    return new ObservableProperty_1.ObservableProperty(this, { name });
};
/**
 * Quickly convert a string to an ObservableProperty.
 */
String.prototype.toObservable = function (name) {
    return new ObservableProperty_1.ObservableProperty(this, { name });
};
/**
 * Quickly convert a number to a ObservableProperty.
 */
Number.prototype.toObservable = function (name) {
    return new ObservableProperty_1.ObservableProperty(this, { name });
};
/**
 * Quickly convert a bool to a ObservableProperty.
 */
Boolean.prototype.toObservable = function (name) {
    return new ObservableProperty_1.ObservableProperty(this, { name });
};

},{"../Observable/ObservableProperty":26}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeywordArguments_1 = require("../System/Types/KeywordArguments");
const ElementType_1 = require("./ElementType");
const ExtractNodeContent_1 = require("./ExtractNodeContent");
function createElement(tagName, properties = {}, attributes) {
    ({ tagName, properties = {}, attributes } = KeywordArguments_1.Kwarg.parseArgs({ tagName, properties, attributes })); // kwargline
    // Allow attributes to be sent on properties, providing a cleaner interface.
    // It allows you to send createElement('div', {attributes: { class: 'foo' }}) instead of createElement('div', null, { class: 'foo' });
    // Another option is to use Kwargs, but not everyone wants to.
    if (properties && 'attributes' in properties) {
        attributes = Object.assign(attributes || {}, properties.attributes);
        delete properties.attributes;
    }
    return create(tagName, properties, attributes);
}
exports.createElement = createElement;
function create(tag, properties = {}, attributes) {
    const element = (document.createElement(tag));
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
function createHtml(html, inline = false) {
    let wrapper;
    if (inline) {
        wrapper = span((html || '').trim());
    }
    else {
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
        }
        else {
            return span(wrapper.innerHTML);
        }
    }
    // Else return the single child.
    // e.g. "<div><div>Hello</div><div>World</div></div>"
    return wrapper.firstElementChild;
}
exports.createHtml = createHtml;
/**
 * Quick helper to create a document fragment with any html.
 */
function createFragment(html) {
    const wrapper = div((html || '').trim());
    return ExtractNodeContent_1.extractNodeContent(wrapper);
}
exports.createFragment = createFragment;
function div(htmlOrProperties = "", propertiesOrAttributes = {}, attributes) {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = KeywordArguments_1.Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline
    return _internal(ElementType_1.elementType.HTMLDivElement, htmlOrProperties, propertiesOrAttributes, attributes);
}
exports.div = div;
function span(htmlOrProperties = "", propertiesOrAttributes = {}, attributes) {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = KeywordArguments_1.Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline
    return _internal(ElementType_1.elementType.HTMLSpanElement, htmlOrProperties, propertiesOrAttributes, attributes);
}
exports.span = span;
function paragraph(htmlOrProperties = "", propertiesOrAttributes = {}, attributes) {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = KeywordArguments_1.Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline
    return _internal(ElementType_1.elementType.HTMLParagraphElement, htmlOrProperties, propertiesOrAttributes, attributes);
}
exports.paragraph = paragraph;
function anchor(htmlOrProperties = "", hrefOrProperties = {}, propertiesOrAttributes = {}, attributes) {
    ({ htmlOrProperties = "", hrefOrProperties = {}, propertiesOrAttributes = {}, attributes } = KeywordArguments_1.Kwarg.parseArgs({ htmlOrProperties, hrefOrProperties, propertiesOrAttributes, attributes })); // kwargline
    const tmp = _internal(ElementType_1.elementType.HTMLAnchorElement, htmlOrProperties, propertiesOrAttributes, attributes);
    if (typeof hrefOrProperties === 'string') {
        tmp.href = String(hrefOrProperties || '');
    }
    return tmp;
}
exports.anchor = anchor;
function button(htmlOrProperties = "", propertiesOrAttributes = {}, attributes) {
    ({ htmlOrProperties = "", propertiesOrAttributes = {}, attributes } = KeywordArguments_1.Kwarg.parseArgs({ htmlOrProperties, propertiesOrAttributes, attributes })); // kwargline
    return _internal(ElementType_1.elementType.HTMLButtonElement, htmlOrProperties, propertiesOrAttributes, attributes);
}
exports.button = button;
// Common private functions for overloads. Prevents lots of copypasta.
// This works for everything because TypeScript is keeping the types valid. In pure JS, bugs could be created (for example, passing an inner
// element to a paragraph ... disallowed by TS but the code is there in the JS)
function _internal(type, htmlOrProperties = "", propertiesOrAttributes = {}, attributes) {
    if (htmlOrProperties instanceof HTMLElement) {
        return _ovr1(type, htmlOrProperties, propertiesOrAttributes, attributes);
    }
    else if (typeof htmlOrProperties === "object") {
        return _ovr3(type, htmlOrProperties, propertiesOrAttributes);
    }
    else {
        return _ovr2(type, String(htmlOrProperties || ''), propertiesOrAttributes, attributes);
    }
}
function _ovr1(type, innerElement, props, attrs) {
    const e = createElement(type, props, attrs);
    e.appendChild(innerElement);
    return e;
}
function _ovr2(type, innerHtml, props, attrs) {
    props = props || {};
    props.innerHTML = innerHtml;
    return createElement(type, props, attrs);
}
function _ovr3(type, props, attrs) {
    props = props || {};
    props.innerHTML = props.innerHTML || '';
    return createElement(type, props, attrs);
}

},{"../System/Types/KeywordArguments":40,"./ElementType":8,"./ExtractNodeContent":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Delete the contents of any html node.
 */
function deleteNodeContent(node) {
    const range = document.createRange();
    range.selectNodeContents(node);
    range.deleteContents();
}
exports.deleteNodeContent = deleteNodeContent;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A helper for CreateElement, roughly mapping to HtmlElement types, but not perfectly because it's impossible
 * (there's no perfect 1:1 relationship).
 */
var elementType;
(function (elementType) {
    elementType["HTMLAnchorElement"] = "a";
    elementType["HTMLAreaElement"] = "area";
    elementType["HTMLAudioElement"] = "audio";
    elementType["HTMLBRElement"] = "br";
    elementType["HTMLBaseFontElement"] = "basefont";
    elementType["HTMLBlockQuoteElement"] = "blockquote";
    elementType["HTMLButtonElement"] = "button";
    elementType["HTMLCanvasElement"] = "canvas";
    elementType["HTMLDataElement"] = "data";
    elementType["HTMLDataListElement"] = "datalist";
    elementType["HTMLDialogElement"] = "dialog";
    elementType["HTMLDivElement"] = "div";
    elementType["HTMLDListElement"] = "dl";
    elementType["HTMLEmbedElement"] = "embed";
    elementType["HTMLFieldSetElement"] = "fieldset";
    elementType["HTMLFormElement"] = "form";
    elementType["HTMLHeading1Element"] = "h1";
    elementType["HTMLHeading2Element"] = "h2";
    elementType["HTMLHeading3Element"] = "h3";
    elementType["HTMLHeading4Element"] = "h4";
    elementType["HTMLHeading5Element"] = "h5";
    elementType["HTMLHeading6Element"] = "h6";
    elementType["HTMLHRElement"] = "hr";
    elementType["HTMLImageElement"] = "image";
    elementType["HTMLInputElement"] = "input";
    elementType["HTMLLabelElement"] = "label";
    elementType["HTMLLegendElement"] = "legend";
    elementType["HTMLLIElement"] = "li";
    elementType["HTMLLinkElement"] = "link";
    elementType["HTMLMapElement"] = "map";
    elementType["HTMLMeterElement"] = "meter";
    elementType["HTMLModDelElement"] = "del";
    elementType["HTMLModInsElement"] = "ins";
    elementType["HTMLOListElement"] = "ol";
    elementType["HTMLObjectElement"] = "object";
    elementType["HTMLOptGroupElement"] = "optgroup";
    elementType["HTMLOptionElement"] = "option";
    elementType["HTMLOutputElement"] = "output";
    elementType["HTMLParagraphElement"] = "p";
    elementType["HTMLParamElement"] = "param";
    elementType["HTMLPictureElement"] = "picture";
    elementType["HTMLPreElement"] = "pre";
    elementType["HTMLProgressElement"] = "progress";
    elementType["HTMLQuoteElement"] = "q";
    elementType["HTMLScriptElement"] = "script";
    elementType["HTMLSelectElement"] = "select";
    elementType["HTMLSourceElement"] = "source";
    elementType["HTMLSpanElement"] = "span";
    elementType["HTMLStyleElement"] = "style";
    elementType["HTMLTableCaptionElement"] = "caption";
    elementType["HTMLTableDataCellElement"] = "td";
    elementType["HTMLTableHeaderCellElement"] = "th";
    elementType["HTMLTableColElement"] = "col";
    elementType["HTMLTableColGroupElement"] = "colgroup";
    elementType["HTMLTableElement"] = "table";
    elementType["HTMLTableRowElement"] = "tr";
    elementType["HTMLTableSectionBodyElement"] = "tbody";
    elementType["HTMLTableSectionFooterElement"] = "tfoot";
    elementType["HTMLTableSectionHeaderElement"] = "thead";
    elementType["HTMLTemplateElement"] = "template";
    elementType["HTMLTextAreaElement"] = "textarea";
    elementType["HTMLTimeElement"] = "time";
    elementType["HTMLTrackElement"] = "track";
    elementType["HTMLUListElement"] = "ul";
    elementType["HTMLVideoElement"] = "video";
})(elementType = exports.elementType || (exports.elementType = {}));

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escapeHtml(input) {
    // There isn't a built-in way to do this, still, so we need a helper function.
    // The article "You are probably misusing DOM text methods" convinced me to do it this way,
    // vs. createTextNode. Though createTextNode would probably work fine for setting innerHTML.
    if (!input) {
        return input;
    }
    const escapes = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "/": "&#x2F;",
        "=": "&#x3D;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#x60;"
    };
    return input.replace(/[&<>"'`=\/]/g, s => escapes[s]);
}
exports.escapeHtml = escapeHtml;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the contents of any html node as a DocumentFragment.
 */
function extractNodeContent(node) {
    const range = document.createRange();
    range.selectNodeContents(node);
    return range.extractContents();
}
exports.extractNodeContent = extractNodeContent;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findIndexInParent(element) {
    const parent = element.parentElement;
    if (parent) {
        return Array.from(parent.children).indexOf(element);
    }
}
exports.findIndexInParent = findIndexInParent;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NoneType_1 = require("../System/Types/NoneType");
/**
 * HTML is inconsistent. Getting the value of form fields is a bit complicated, not always element.value,
 * so here's a helper to make it easier.
 */
function getFormFieldValue(element) {
    // It would be really nice at this point if JS could see generic parameters.
    // If it could, then the code could say "if (input.type === 'checkbox' && TOutput !== boolean) throw new Error()"
    if (element.tagName.toLowerCase() === 'input') {
        const input = element;
        if (input.type.toLowerCase() === 'checkbox') {
            return getCheckboxValue(input);
        }
        if (input.type.toLowerCase() === 'number') {
            return getNumberInputValue(input);
        }
        else if (input.type.toLowerCase() === 'radio') {
            return getRadioValue(input);
        }
        else {
            return input.value;
        }
    }
    else if (element.tagName.toLowerCase() === 'select') {
        return getSelectValue(element);
    }
    else if (element.tagName.toLowerCase() === 'textarea') {
        return element.value;
    }
}
exports.getFormFieldValue = getFormFieldValue;
function getCheckboxValue(input) {
    return !!input.checked;
}
exports.getCheckboxValue = getCheckboxValue;
function getNumberInputValue(input) {
    if (input.value) {
        return Number(input.value);
    }
}
exports.getNumberInputValue = getNumberInputValue;
function getRadioValue(input) {
    // Radio buttons are weird. We want them to appear to be more normal.
    if (input.name) {
        return (document.querySelector(`input[name="${input.name}"]:checked`) || {}).value;
    }
    // If no name, fall back to this
    if (input.checked) {
        return input.value;
    }
}
exports.getRadioValue = getRadioValue;
function getSelectValue(select) {
    if (select.multiple) {
        return getMultiSelectValue(select);
    }
    else {
        return select.value;
    }
}
exports.getSelectValue = getSelectValue;
function getMultiSelectValue(select) {
    return Array.from(select.selectedOptions).filter(f => f.value).map(m => m.value);
}
exports.getMultiSelectValue = getMultiSelectValue;
// This is almost pointless. Just here for consistency.
function getSimpleFormValue(input) {
    if (input.tagName.toLowerCase() === 'select') {
        if (input.multiple) {
            throw new Error('Not valid for multi-selects');
        }
    }
    return input.value;
}
exports.getSimpleFormValue = getSimpleFormValue;
/**
 * Setting values is just as complicated as getting them, because HTML is inconsistent. You can't just say element.value = foo.
 * Here's a helper to make it easier.
 */
function setFormFieldValue(element, value) {
    // Here you can validate the type before setting or do some kind of conversion.
    // For multi-selects, can auto-wrap value in string.
    if (NoneType_1.isNone(value)) {
        value = '';
    }
    const stringValue = value.toString(); // used in most of the cases
    if (element.tagName.toLowerCase() === 'input') {
        const input = element;
        const type = input.type.toLowerCase();
        if (type === 'checkbox') {
            input.checked = value === true || stringValue.toLowerCase() === 'true';
        }
        else if (type === 'radio') {
            input.checked = stringValue === input.value;
        }
        else if (type === 'date') {
            if (!value) {
                return;
            }
            input.value = toDateString(new Date(stringValue));
        }
        else if (type === 'datetime' || type === 'datetime-local') {
            if (!value) {
                return;
            }
            const date = new Date(stringValue);
            if (isNaN(date.valueOf())) {
                return;
            }
            input.value = `${toDateString(date)}T${toTimeString(date)}`;
        }
        else {
            input.value = stringValue;
        }
    }
    else if (element.tagName.toLowerCase() === 'select') {
        const select = element;
        const options = Array.from(select.options);
        if (select.multiple) {
            if (!Array.isArray(value)) {
                checkOption(options, value);
                select.value = stringValue; // treating it like a non-multiple works
                return;
            }
            // Nonexistent options cannot be set. We should let the programmer know. Even though this takes CPU cycles.
            value.map(m => {
                checkOption(options, m);
            });
            for (const opt of options) {
                opt.selected = value.map(m => m.toString()).indexOf(opt.value) > -1;
            }
        }
        else {
            checkOption(options, value);
            select.value = stringValue;
        }
    }
    else if (element.tagName.toLowerCase() === 'textarea') {
        element.value = stringValue;
    }
    else {
        // tslint:disable-next-line:no-console
        console.warn(`Called setFormFieldValue on non-form field ${element.tagName} ${element.id || ''}`);
    }
    function checkOption(options, val) {
        // If you set the value of a select to something that is not an available option, nothing will happen.
        const hasOption = options.map(m => m.value).indexOf(val.toString()) > -1;
        if (!hasOption) {
            // tslint:disable-next-line:no-console
            console.warn(`Called setFormFieldValue with nonexistent option ${val.toString()} on select ${element.id}`);
        }
    }
    // These could be readable oneliners if we had padStart() but it's not worth bumping to ES2017 for one method
    function toDateString(date) {
        if (!isNaN(date.valueOf())) {
            return '';
        }
        const month = ('0' + (date.getUTCMonth() + 1).toString()).slice(-2);
        const day = ('0' + date.getUTCDate().toString()).slice(-2);
        return `${date.getUTCFullYear()}-${month}-${day}`;
    }
    function toTimeString(date) {
        if (!isNaN(date.valueOf())) {
            return '';
        }
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        return `${hour}:${minute}`;
    }
}
exports.setFormFieldValue = setFormFieldValue;

},{"../System/Types/NoneType":41}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Here's a helper for one of the places where HTML5 falls over. If you get some html like <div id="1"></div><div id="2"></div>, it becomes
 * a NodeList. HTML5 by default does not provide a way to search this for a selector.
 */
function nodeListSelector(nodes, selector) {
    for (const node of nodes) {
        if (!('matches' in node)) {
            // Filter out text nodes
            continue;
        }
        if (node.matches(selector)) {
            return node;
        }
        const search = node.querySelector(selector);
        if (search) {
            return search;
        }
    }
}
exports.nodeListSelector = nodeListSelector;
/**
 * Here's a helper for one of the places where HTML5 falls over. If you get some html like <div id="1"></div><div id="2"></div>, it becomes
 * a NodeList. HTML5 by default does not provide a way to search this for a selector.
 */
function nodeListSelectorAll(nodes, selector) {
    // Because the browser can lose references when moving nodes, this can also take a regular array.
    // Because HTML5 has totally fallen over, it's not possible for the fixed nodeListSelectorAll
    // to match the output signature of querySelectorAll (NodeListOf<Element> instead of array).
    const results = [];
    for (const node of nodes) {
        if (!('matches' in node)) {
            // Filter out text nodes
            continue;
        }
        if (node.matches(selector)) {
            results.push(node);
        }
        const search = node.querySelectorAll(selector);
        results.push(...Array.from(search));
    }
    return results;
}
exports.nodeListSelectorAll = nodeListSelectorAll;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * If the document contains any duplicate IDs, throw an exception.
 */
function validateUniqueDomIds() {
    const ids = new Set();
    let i = 0;
    for (const foo of document.querySelectorAll('*[id]')) {
        ids.add(foo.id);
        i++;
        if (ids.size !== i) {
            throw new Error(`Duplicate DOM IDs found. The first duplicate id is ${foo}.`);
        }
    }
}
exports.validateUniqueDomIds = validateUniqueDomIds;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateElement_1 = require("../Html/CreateElement");
const ElementType_1 = require("../Html/ElementType");
const EscapeHtml_1 = require("../Html/EscapeHtml");
const ExtractNodeContent_1 = require("../Html/ExtractNodeContent");
const FormFieldValue_1 = require("../Html/FormFieldValue");
const QuerySelectorNodeList_1 = require("../Html/QuerySelectorNodeList");
const IObservable_1 = require("../Observable/IObservable");
const ObservableProperty_1 = require("../Observable/ObservableProperty");
const ObservableState_1 = require("../Observable/ObservableState");
const Constructable_1 = require("../System/Types/Constructable");
const NoneType_1 = require("../System/Types/NoneType");
const Component_1 = require("./Component");
const ComponentMap_1 = require("./ComponentMap");
const KeywordArguments_1 = require("../System/Types/KeywordArguments");
/**
 * A super-basic component that allows configuration of data-binding functions using specially-named HTML attributes, as in Angular
 * or Vue.
 */
class BoundComponent extends Component_1.Component {
    constructor(viewModel, args) {
        super(args);
        this._attributeBindings = [];
        this._writeTargets = [];
        this._cssClassSwitches = [];
        this._replacements = [];
        this._async = false;
        this._defer = false;
        this._initialized = false;
        this.viewModel = viewModel;
        try {
            if (!window.customElements.get('i-v')) {
                window.customElements.define('i-v', TemplateReplacementValue);
            }
        }
        catch (err) {
            // customElements isn't officially part of an ES version yet so won't work even in some recent-ish browsers
        }
        const options = args || {};
        this._async = options.async || false;
        this._defer = options.defer || false;
        this._name = options.name;
        // Defined the default component class for the default loopPostProcess() method
        if (options.loopItemClass) {
            if (!Constructable_1.constructorTypeGuard(options.loopItemClass)) {
                throw new Error('loopItemClass is not a constructor');
            }
            if (!(options.loopItemClass instanceof BoundComponent.constructor)) {
                throw new Error('loopItemClass is not an bound component');
            }
        }
        this._loopItemClass = options.loopItemClass || BoundComponent;
        this._configureComponentBindings();
        this.setTemplate(this.content.innerHTML); // InnerHTML is currently only parsed and then the original text is thrown away.
        // Auto-add subscriptions based on settings.
        if (options.observeAllViewModel) {
            this.observeAll();
        }
        else if (options.observeViewModel) {
            this.observe();
        }
        if (options.observeTargets) {
            for (const tgt of options.observeTargets) {
                this.observe(tgt);
            }
        }
        if (options.observeAllTargets) {
            for (const tgt of options.observeAllTargets) {
                this.observeAll(tgt);
            }
        }
        if (this._async) {
            setTimeout(() => this.render(), 0);
        }
        else {
            this.render();
        }
        // Constructor initialization is done.
        this._initialized = true;
    }
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
    static inject(selector = '[ichigo]', options, constructor, viewModel) {
        ({ selector = '[ichigo]', options, constructor, viewModel } = KeywordArguments_1.Kwarg.parseArgs({ selector, options, constructor, viewModel })); // kwargline
        const newConstructor = constructor || this;
        const opt = this._getOptions(options || {});
        const replacerFunction = (element) => {
            return this._replaceElementWithBoundComponent(element, viewModel, opt, newConstructor);
        };
        const converterFunction = (element) => {
            return this._convertElementToBoundComponent(element, viewModel, opt, newConstructor);
        };
        return this._inject(selector, opt, replacerFunction, converterFunction);
    }
    /**
     * Call to inject() with a cleaner argument order.
     */
    static injectBind(viewModel, selector = '[ichigo]', options, constructor) {
        ({ selector = '[ichigo]', options, constructor, viewModel } = KeywordArguments_1.Kwarg.parseArgs({ selector, options, constructor, viewModel })); // kwargline
        return this.inject(selector, options, constructor, viewModel);
    }
    static _replaceElementWithBoundComponent(existingElement, viewModel, options, constructor) {
        const opt = this._mergePropertiesAndAttributes(existingElement, options);
        const component = new constructor(viewModel, opt);
        this._replaceElement(existingElement, component);
        return component;
    }
    static _convertElementToBoundComponent(existingElement, viewModel, options, constructor) {
        // WARN: This cast may not be true. There's no way to check that the tags match.
        const opt = Object.assign({ element: existingElement }, options);
        return new constructor(viewModel, opt);
    }
    write(evt) {
        if (!this._writeTargets.length) {
            return;
        }
        const element = evt.currentTarget;
        if (!element) {
            return;
        }
        const value = FormFieldValue_1.getFormFieldValue(element);
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
                const target = this[bind];
                writeValue(target, () => this[bind] = value, this);
            }
            else if (bind === '.') {
                if (ObservableState_1.observableStateCheck(this.viewModel)) {
                    this.viewModel.value = value;
                }
                else {
                    // Assume that the view model is either FormFieldValue or a function that takes one.
                    writeValue(this.viewModel, () => this.viewModel = value, this.viewModel);
                }
            }
            else if (typeof this.viewModel === 'object') {
                if (ObservableState_1.observableStateCheck(this.viewModel)) {
                    // With observable state, we need to get the state, update it, and write the whole thing back.
                    // While it is possible to update a single property in some cases, it doesn't allow reuse of already-working code.
                    const tmp = this.viewModel.value;
                    const target = tmp[bind];
                    writeValue(target, () => tmp[bind] = value, tmp);
                    this.viewModel.value = tmp;
                }
                else {
                    const target = this.viewModel[bind];
                    writeValue(target, () => this.viewModel[bind] = value, this.viewModel);
                }
            }
        }
        function writeValue(target, writeToProperty, thisArg) {
            if (typeof target === 'function') {
                target.call(thisArg, value);
                return;
            }
            if (ObservableProperty_1.observablePropertyCheck(target)) {
                target.value = value;
                return;
            }
            // This needs to be a function to be flexible, because if target is a value type or immutable, writing
            // it directly replaces only the value without updating the model.
            writeToProperty();
        }
    }
    /**
     * Bind this.render() to the model passed in, or the view model if none passed in.
     */
    observe(model) {
        model = model || this.viewModel;
        if (IObservable_1.observableCheck(model)) {
            model.subscribe(this.render, this);
        }
        return this;
    }
    /**
     * Bind this.render() to all observable properties found in the model passed in,
     * or the view model if none passed in. This only goes one level deep, so it
     * won't pick up nested objects, but it's probably good enough in 60% of cases.
     */
    observeAll(model) {
        model = model || this.viewModel;
        if (!model) {
            return this;
        }
        this.observe(model);
        for (const m of Object.getOwnPropertyNames(model)) {
            this.observe(model[m]);
        }
        return this;
    }
    render() {
        // See if we need to defer rendering until after initialization
        if (this._defer && !this._initialized) {
            return this;
        }
        for (const item of this._attributeBindings) {
            if (item.bool) {
                // For boolean attributes, the very existence of the attribute means it is considered to be true.
                let val = this._getUntypedValue(item.source);
                if (item.negative) {
                    val = !val;
                }
                else {
                    val = !!val;
                }
                if (val) {
                    this.content.setAttribute(item.attribute, val);
                }
                else {
                    this.content.removeAttribute(item.attribute);
                }
            }
            else {
                this.content.setAttribute(item.attribute, this._getStringValue(item.source) || '');
            }
        }
        if (this._valueAttribute) {
            // Calls setFormFieldValue behind the scenes.
            this.value = this._getUntypedValue(this._valueAttribute);
        }
        if (this._cssClasses) {
            this.content.className = this._getStringValue(this._cssClasses) || '';
        }
        for (const item of this._cssClassSwitches) {
            // If truthy, add class, else delete it.
            let val = !!this._getUntypedValue(item.source);
            if (item.negative) {
                val = !val;
            }
            if (val) {
                this.content.classList.add(item.class);
            }
            else {
                this.content.classList.remove(item.class);
            }
        }
        if (this._cssStyle) {
            const val = this._getStringValue(this._cssStyle) || '';
            this.content.style.cssText = val;
            if (val && !this.content.style.cssText) {
                // tslint:disable-next-line:no-console
                console.warn(`Invalid style text in component: ${val}`);
            }
        }
        if (this._loop) {
            const iterable = this._getUntypedValue(this._loop.source);
            if (iterable && typeof iterable[Symbol.iterator] === 'function') {
                const previousContent = ExtractNodeContent_1.extractNodeContent(this.content);
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
            let val = this._getUntypedValue(this._cssDisplay.source);
            if (this._cssDisplay.negative) {
                val = !val;
            }
            if (val) {
                this.content.style.setProperty('display', this._previousCssDisplaySetting || '');
            }
            else {
                if (this.content.style.display !== 'none') {
                    this._previousCssDisplaySetting = this.content.style.display || undefined;
                }
                this.content.style.setProperty('display', 'none');
            }
        }
        this._updateHtmlReplacements();
        return this;
    }
    setTemplate(templateText, update = false) {
        if (!templateText) {
            return this;
        }
        // This method is executed in the constructor. The update param should not be set.
        if (update && !this._initialized) {
            throw new Error('Update should not be true when called internally.');
        }
        // Since we're creating an element that's not on the page, we probably could avoid using a fragment,
        // but this is what fragments are for.
        const template = CreateElement_1.createElement(ElementType_1.elementType.HTMLTemplateElement);
        template.innerHTML = templateText;
        const clone = document.importNode(template.content, true);
        // If this is used to replace the existing template, we need to wipe out the previous values
        this._replacements.length = 0;
        // Working on a clone here, so we don't see the body being built step by step in the browser.
        for (const repl of clone.querySelectorAll('i-v')) {
            // This is a possible error scenario: Attribute does not have a name but contains possibly named i-v tags.
            // It's only "possible" because there could be other reasons for it (such as 'disabled').
            // To try and filter out the obvious cases, such as class and style, don't count non-boolean attributes that have values.
            if (!this._name && repl.attributes.length > 0 && Array.from(repl.attributes).filter(f => f.name !== 'noescape' && !f.value).length) {
                // tslint:disable-next-line:no-console
                console.warn(`Unnamed component #${this.content.id} contains possibly named I-V replacement intended for another component: <i-v ${Array.from(repl.attributes).filter(f => f.name !== 'noescape' && !f.value)[0].name}>${repl.innerHTML}</i-v>`);
            }
            // If name is specified, i-v tag MUST have that as a tag.
            if (this._name && !repl.hasAttribute(this._name)) {
                continue;
            }
            const noescape = repl.hasAttribute('noescape') && repl.getAttribute('noescape') !== 'false';
            this._replacements.push({
                element: repl,
                source: repl.innerHTML,
                noescape: noescape
            });
        }
        // In the original build of the object, f any replacements start with "this." we need to defer.
        if (!this._initialized && !this._defer) {
            this._defer = this._defer || !!this._replacements.find(f => f.source.startsWith("this."));
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
        if (update) {
            this.render();
        }
        return this;
    }
    setHtmlTemplate(templateProperty = '.', update = false) {
        return this.setTemplate('<i-v noescape>' + templateProperty + '</i-v>', update);
    }
    setTextTemplate(templateProperty = '.', update = false) {
        return this.setTemplate('<i-v>' + templateProperty + '</i-v>', update);
    }
    setLoop(source = '.', fragment, skipPostProcess = false, update = false) {
        if (!source || !fragment) {
            throw new Error('Invalid arguments');
        }
        if (typeof fragment === 'string') {
            fragment = CreateElement_1.createFragment(fragment);
        }
        this._loop = { source, postProcess: !skipPostProcess, fragment };
        if (update) {
            this.render();
        }
        return this;
    }
    removeLoop(update = false) {
        this._loop = undefined;
        if (update) {
            this.render();
        }
        return this;
    }
    setValueAttribute(source = '.', update = false) {
        this._valueAttribute = source;
        if (update) {
            this.render();
        }
        return this;
    }
    setVisibility(source = '.', negative = false, update = false) {
        if (!source) {
            this._cssDisplay = undefined;
        }
        else {
            this._cssDisplay = { source, negative };
        }
        if (update) {
            this.render();
        }
        return this;
    }
    addAttributeMapping(attribute, source = '.', update = false) {
        if (!source || !attribute) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._attributeBindings.find(f => f.attribute === attribute)) {
            this._attributeBindings.push({ attribute, source, bool: false, negative: false });
        }
        if (update) {
            this.render();
        }
        return this;
    }
    addBooleanAttributeMapping(attribute, source = '.', negative = false, update = false) {
        if (!source || !attribute) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._attributeBindings.find(f => f.attribute === attribute)) {
            this._attributeBindings.push({ attribute, source, bool: true, negative });
        }
        if (update) {
            this.render();
        }
        return this;
    }
    removeAttributeMapping(attribute, update = false) {
        if (!attribute) {
            throw new Error('Invalid argument');
        }
        const filtered = this._attributeBindings.filter(f => f.attribute !== attribute);
        this._attributeBindings.length = 0;
        this._attributeBindings.push(...filtered);
        if (update) {
            this.render();
        }
        return this;
    }
    setCssClass(cls = '.', update = false) {
        this._cssClasses = cls;
        if (update) {
            this.render();
        }
        return this;
    }
    setCssStyle(style = '.', update = false) {
        this._cssStyle = style;
        if (update) {
            this.render();
        }
        return this;
    }
    addCssClassSwitch(cls, source = '.', negative = false, update = false) {
        if (!cls || !source) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._cssClassSwitches.find(f => f.class === cls)) {
            this._cssClassSwitches.push({ class: cls, source, negative });
        }
        if (update) {
            this.render();
        }
        return this;
    }
    removeCssClassSwitch(cls, update = false) {
        if (!cls) {
            throw new Error('Invalid argument');
        }
        const filtered = this._cssClassSwitches.filter(f => f.class !== cls);
        this._cssClassSwitches.length = 0;
        this._cssClassSwitches.push(...filtered);
        if (update) {
            this.render();
        }
        return this;
    }
    addWriteEvent() {
        this.content.addEventListener('input', this.write.bind(this));
        return this;
    }
    addWriteTarget(target = '.', update = false) {
        if (!target) {
            throw new Error('Invalid argument');
        }
        // Don't bind a single property to multiple things
        if (!this._writeTargets.find(f => f === target)) {
            this._writeTargets.push(target);
        }
        if (update) {
            this.render();
        }
        return this;
    }
    removeWriteTarget(target, update = false) {
        if (!target) {
            throw new Error('Invalid argument');
        }
        const filtered = this._writeTargets.filter(f => f !== target);
        this._writeTargets.length = 0;
        this._writeTargets.push(...filtered);
        if (update) {
            this.render();
        }
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
    autoInject(selector) {
        if (selector) {
            BoundComponent.injectBind(this.viewModel, selector, { parent: this.content });
        }
        else {
            for (const e of this.content.querySelectorAll('*')) {
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
    dispose() {
        if (ComponentMap_1.ComponentMap.components) {
            ComponentMap_1.ComponentMap.components.delete(this.content);
        }
    }
    /**
     * Override this if you need to do something else after the loop is added to the DOM.
     */
    loopPostProcess(row, addedContent, allRows, previousContent) {
        // If the typescript part of the following were important, this would be a problem
        // if this were a derived class.
        const thisclass = this;
        this._loopItemClass.injectBind(row, QuerySelectorNodeList_1.nodeListSelectorAll(addedContent, '[i5_item], [\\00003Aitem], [data-i5_item]'), {
            replace: false,
            loopParent: this,
            async: this._async
        });
    }
    _getStringValue(name, skipEscape = false) {
        const value = this._getUntypedValue(name);
        if (NoneType_1.isNone(value)) {
            return value;
        }
        else if (typeof value === 'string') {
            return skipEscape ? value : EscapeHtml_1.escapeHtml(value);
        }
        else {
            return skipEscape ? value.toString() : EscapeHtml_1.escapeHtml(value.toString());
        }
    }
    _getUntypedValue(name) {
        let source;
        // I'm pretty sure this is being validated during construction but be safe
        if (!name) {
            return;
        }
        let thisArg = this.viewModel;
        // If VM is a state, get the current state value.
        if (ObservableState_1.observableStateCheck(thisArg)) {
            thisArg = thisArg.value;
        }
        if (name.startsWith("this.")) {
            thisArg = this;
            name = name.slice(5);
            if (!(name in this)) {
                // tslint:disable-next-line:no-console
                console.warn(`this.${name} does not exist on view.`);
                return;
            }
            source = this[name];
        }
        else if (name === '.') {
            source = thisArg;
        }
        else if (typeof thisArg === 'object') {
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
        }
        else if (ObservableProperty_1.observablePropertyCheck(source)) {
            return source.value;
        }
        else {
            return source;
        }
    }
    _updateHtmlReplacements() {
        for (const repl of this._replacements) {
            const newValue = this._getStringValue(repl.source, repl.noescape) || '';
            const element = repl.element;
            const currentValue = element.innerHTML;
            if (newValue !== currentValue) {
                element.innerHTML = newValue;
            }
        }
    }
    _configureComponentBindings() {
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
        let textHtmlSet = false;
        for (const prop of currentAttributes) {
            const type = this._parseAttributeName(prop.name);
            let negative = false;
            // Regular attributes will all match this.
            if (!type) {
                continue;
            }
            switch (type.type) {
                case "name":
                    this._name = this._name || prop.value;
                    break;
                case "boolNegative":
                    negative = true;
                // fall through
                case "bool":
                    if (!type.detail) {
                        throw new Error('Programming error');
                    }
                    this.addBooleanAttributeMapping(type.detail, prop.value, negative);
                    deferIfNeeded.call(this);
                    break;
                case "attr":
                    if (!type.detail) {
                        throw new Error('Programming error');
                    }
                    this.addAttributeMapping(type.detail, prop.value);
                    deferIfNeeded.call(this);
                    break;
                case "switchClassNegative":
                    negative = true;
                // fall through
                case "switchClass":
                    if (!type.detail) {
                        throw new Error('Programming error');
                    }
                    this.addCssClassSwitch(type.detail, prop.value, negative);
                    deferIfNeeded.call(this);
                    break;
                case "text":
                    if (textHtmlSet) {
                        throw new Error("Can't set i5_text and i5_html at same time");
                    }
                    textHtmlSet = true;
                    this.content.innerHTML = `<i-v>${prop.value}</i-v>`; // Use this as the template
                    deferIfNeeded.call(this);
                    break;
                case "html":
                    if (textHtmlSet) {
                        throw new Error("Can't set i5_text and i5_html at same time");
                    }
                    textHtmlSet = true;
                    this.content.innerHTML = `<i-v noescape>${prop.value}</i-v>`; // Use this as the template
                    deferIfNeeded.call(this);
                    break;
                case "value":
                    this.setValueAttribute(prop.value);
                    deferIfNeeded.call(this);
                    break;
                case "ifNegative":
                    negative = true;
                // fall through
                case "if":
                    this.setVisibility(prop.value, negative);
                    deferIfNeeded.call(this);
                    break;
                case "style":
                    this.setCssStyle(prop.value);
                    deferIfNeeded.call(this);
                    break;
                case "class":
                    this.setCssClass(prop.value);
                    deferIfNeeded.call(this);
                    break;
                case "input":
                    this.addWriteEvent();
                    if (!prop.value) {
                        break;
                        // Else fall through, using the value of the input attribute as a target attribute
                    }
                    else if (type.detail) {
                        this.setValueAttribute(prop.value);
                    }
                case "target":
                    this.addWriteTarget(prop.value);
                    deferIfNeeded.call(this);
                    break;
                case "loop":
                    // Grab the base content for the loop, pulling it out of the DOM.
                    this.setLoop(prop.value, ExtractNodeContent_1.extractNodeContent(this.content), type.detail === 'null');
                    deferIfNeeded.call(this);
                    break;
                case "item":
                    // Only used as a selector. Has no functionality
                    break;
                default:
                    throw new Error("Not Implemented Ichigo attribute: " + type.type);
            }
            function deferIfNeeded() {
                this._defer = this._defer || prop.value.startsWith('this.');
            }
        }
    }
    _parseAttributeName(name) {
        if (name.startsWith(':')) {
            // General ichigo shortcut
            name = 'i5_' + name.slice(1);
        }
        else if (name === 'i5_item') {
            // This is used to indicate an item component, nothing else.
            return;
        }
        else if (name === 'i5_event') {
            // This is used only in Component.addInlineEventListeners().
            return;
        }
        else if (!name.startsWith('i5_')) {
            return;
        }
        if (name.startsWith('i5_attr')) {
            if (name[7] !== ':' && name[7] !== '_') {
                throw new Error('Invalid attribute binding syntax');
            }
            if (name.length < 9) {
                throw new Error("Binding attribute name is missing.");
            }
            return { type: 'attr', detail: name.slice(8) };
        }
        else if (name.startsWith('i5_bool')) {
            let negative = false;
            if (name[7] !== ':' && name[7] !== '_' && name[7] !== '-' && name[7] !== '0') {
                throw new Error('Invalid attribute binding syntax');
            }
            if (name[7] === '-' || name[7] === '0') {
                negative = true;
                name = name.slice(0, 7) + name.slice(8);
            }
            if (name.length < 9) {
                throw new Error("Binding attribute name is missing.");
            }
            return { type: negative ? 'boolNegative' : 'bool', detail: name.slice(8) };
        }
        else if (name.startsWith('i5_switch')) {
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
        }
        else if (name.startsWith('i5_if')) {
            let negative = false;
            if (name.slice(-1) === '-' || name.slice(-1) === '0') {
                negative = true;
            }
            return { type: negative ? 'ifNegative' : 'if' };
        }
        else if (name.startsWith('i5_loop')) {
            if (name === 'i5_loop:null') {
                return { type: 'loop', detail: 'null' };
            }
            return { type: 'loop' };
        }
        else if (name.startsWith('i5_target')) {
            return ({ type: 'target' });
        }
        else if (name.startsWith('i5_input')) {
            const twoWay = name.endsWith('_value') || name.endsWith(':');
            return ({ type: 'input', detail: twoWay ? '2way' : '' });
        }
        return { type: name.slice(3) };
    }
}
exports.BoundComponent = BoundComponent;
// Use a custom element to create a replacement tag that is not limited, as span is, to containing no block elements.
// No logic, no special display details.
// tslint:disable-next-line:max-classes-per-file
class TemplateReplacementValue extends HTMLElement {
    constructor() {
        super();
    }
}
exports.TemplateReplacementValue = TemplateReplacementValue;

},{"../Html/CreateElement":6,"../Html/ElementType":8,"../Html/EscapeHtml":9,"../Html/ExtractNodeContent":10,"../Html/FormFieldValue":12,"../Html/QuerySelectorNodeList":13,"../Observable/IObservable":19,"../Observable/ObservableProperty":26,"../Observable/ObservableState":28,"../System/Types/Constructable":39,"../System/Types/KeywordArguments":40,"../System/Types/NoneType":41,"./Component":16,"./ComponentMap":17}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateElement_1 = require("../Html/CreateElement");
const ElementType_1 = require("../Html/ElementType");
const FormFieldValue_1 = require("../Html/FormFieldValue");
const QuerySelectorNodeList_1 = require("../Html/QuerySelectorNodeList");
const KeywordArguments_1 = require("../System/Types/KeywordArguments");
const GetUniqueId_1 = require("../System/Utility/GetUniqueId");
const ComponentMap_1 = require("./ComponentMap");
/**
 * A class with a content property that points to something on the page, along with some of helper methods.
 *
 * This class is intended to be used as a base class for other classes, so it's marked abstract. It just doesn't
 * make sense to me to create Component with nothing customized. Just create an HTMLElement. The helpers aren't really
 * that impressive, when you consider that the tradeoff is having to reference obj.content to modify the DOM.
 */
class Component {
    constructor(args) {
        // Typescript doesn't understand that this.content is set in ALL of the private ctor functions.
        this.content = null;
        if (args && typeof args === 'string') {
            _ctor_string.call(this, args);
        }
        else if (args && args.selector) {
            if (args.innerHtml) {
                args.properties = Object.assign(args.properties || {}, { innerHTML: args.innerHtml });
            }
            _ctor_lookup.call(this, args);
        }
        else if (!args) {
            _ctor_empty.call(this);
        }
        else if (args.element) {
            if (args.innerHtml) {
                args.properties = Object.assign(args.properties || {}, { innerHTML: args.innerHtml });
            }
            _ctor_existingElement.call(this, args);
        }
        else if (args.outerHtml) {
            _ctor_outerHtml.call(this, args);
        }
        else {
            _ctor_innerHtml.call(this, args);
        }
        this._checkInlineEventListeners();
        // Angular material does something like this. In this case, there's no functionality behind it, but it does make it
        // useful for a developer to see that an element is a component and what type it is.
        try {
            const snake_case = 'iv_' + this.constructor.name.charAt(0).toLowerCase() + this.constructor.name.slice(1)
                .replace(/\W+/g, ' ')
                .replace(/([a-z])([A-Z])([a-z])/g, "$1 $2$3")
                .split(/\B(?=[A-Z]{2,})/)
                .join(' ')
                .split(' ')
                .join('_')
                .toLowerCase();
            this.content.setAttribute(snake_case, '');
        }
        catch (err) {
            // If the component has some weird name, no problem. This is just an info field anyway.
        }
        this.mapComponent();
        function _ctor_empty() {
            // No arguments
            // This is fine as long as TElement is DIV. No way to verify that as it's a typescript illusion. JS doesn't see type parameters.
            this.content = CreateElement_1.createElement(ElementType_1.elementType.HTMLDivElement, { id: GetUniqueId_1.getUniqueId() });
        }
        function _ctor_lookup(existingElement) {
            // Shortcut for existingElement.
            // The main reason it exists is that document.getElementById doesn't return the correct type (it's not generic),
            // so typescript freaks out and thinks it should be a STRING, in spite of the type definition not being anything
            // like that. It's just easier to use this than to remember "oh, right, i have to use document.querySelector(), which is generic".
            const element = (existingElement.parent || document).querySelector(existingElement.selector);
            if (!element) {
                throw new Error('Element selector could not find element.');
            }
            // This is nasty but it makes TypeScript happy without creating a new object copy
            existingElement.element = element;
            _ctor_existingElement.call(this, existingElement);
        }
        function _ctor_existingElement(existingElement) {
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
        function _ctor_innerHtml(newElement) {
            // New element. User specifies the inner HTML for the content.
            // This could be an empty object like {}, practically the same as calling it with no args
            const props = { innerHTML: newElement.innerHtml || '' };
            Object.assign(props, newElement.properties);
            this.content = CreateElement_1.createElement(newElement.type || ElementType_1.elementType.HTMLDivElement, props, newElement.attributes);
            if (newElement.id) {
                this.content.id = newElement.id;
            }
            else if (!this.content.id) {
                this.content.id = GetUniqueId_1.getUniqueId();
            }
        }
        function _ctor_outerHtml(newElement) {
            // User specifies the full HTML for the content.
            // Note that it can't be type checked. JS can't see what TElement is.
            const tmpdiv = CreateElement_1.div(newElement.outerHtml.trim());
            if (tmpdiv.childNodes.length !== 1 || !tmpdiv.firstElementChild) {
                throw new Error('OuterHtml must contain exactly one HTMLElement');
            }
            this.content = tmpdiv.firstElementChild;
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
        function _ctor_string(newElement) {
            // String by itself is a shortcut for outerHtml
            _ctor_outerHtml.call(this, { outerHtml: newElement });
        }
    }
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
    static inject(selector = '[ichigo]', options, constructor) {
        ({ selector = '[ichigo]', options, constructor } = KeywordArguments_1.Kwarg.parseArgs({ selector, options, constructor })); // kwargline
        const newConstructor = constructor || this;
        const opt = this._getOptions(options);
        const replacerFunction = (element) => {
            return this._replaceElementWithComponent(element, opt, newConstructor);
        };
        const converterFunction = (element) => {
            return this._convertElementToComponent(element, newConstructor);
        };
        return this._inject(selector, opt, replacerFunction, converterFunction);
    }
    static _inject(selector = '[ichigo]', options, replacerFunction, converterFunction) {
        const results = [];
        const containers = this._lookUpContainersToInject(selector, options.parent);
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
            }
            else {
                results.push(converterFunction(container));
            }
        }
        return results;
    }
    static _mergePropertiesAndAttributes(existingElement, options) {
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
        const attributes = {};
        for (const attr of Array.from(existingElement.attributes)) {
            attributes[attr.name] = attr.value;
        }
        const opt = Object.assign({}, options);
        // This is ugly because it happens again in the constructor. No other clean way to parse the element attributes, though.
        if (opt.outerHtml) {
            const tmp = CreateElement_1.div(opt.outerHtml.trim());
            if (tmp.childNodes.length !== 1 || !tmp.firstElementChild) {
                throw new Error('OuterHtml must contain exactly one HTMLElement');
            }
            const tmp2 = tmp.firstElementChild;
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
    static _getOptions(options) {
        let opt;
        if (options && typeof options === 'string') {
            // Shortcut for replacing the outer HTML
            opt = { replace: true, outerHtml: options };
        }
        else if (options) {
            // Typescript doesn't know that options !== 'string' (can't read "else if" clause)
            opt = options;
        }
        else {
            opt = { replace: false };
        }
        return opt;
    }
    static _replaceElement(existingElement, component) {
        if (existingElement.parentNode) {
            existingElement.parentNode.replaceChild(component.content, existingElement);
        }
        else {
            document.replaceChild(component.content, existingElement);
        }
    }
    static _replaceElementWithComponent(existingElement, options, constructor) {
        const opt = this._mergePropertiesAndAttributes(existingElement, options);
        const component = new constructor(options);
        this._replaceElement(existingElement, component);
        return component;
    }
    static _convertElementToComponent(existingElement, constructor) {
        return new constructor({ element: existingElement });
    }
    static _lookUpContainersToInject(selector = '[ichigo]', parent) {
        if (selector === null) {
            // I've done this myself, which results in a silent failure if accidental.
            // tslint:disable-next-line:no-console
            console.warn('Injection selector is null.');
        }
        selector = selector || '[ichigo]';
        // Look up the elements to either replace or convert
        let containers;
        if (parent && typeof selector === 'string') {
            parent = parent || document;
            containers = Array.from(parent.querySelectorAll(selector));
        }
        else if (typeof selector === 'string') {
            containers = Array.from(document.querySelectorAll(selector));
        }
        else if (selector instanceof NodeList) {
            containers = Array.from(selector);
        }
        else if (Array.isArray(selector)) {
            containers = selector;
        }
        else {
            containers = [selector];
        }
        return containers;
    }
    get id() {
        return this.content.id;
    }
    set id(value) {
        this.content.id = value;
    }
    get innerHTML() {
        return this.content.innerHTML;
    }
    set innerHTML(value) {
        this.content.innerHTML = value;
    }
    get value() {
        // Will return undefined if content is not a form field type
        return FormFieldValue_1.getFormFieldValue(this.content);
    }
    set value(value) {
        // Will log a warning if content is not a form field type
        FormFieldValue_1.setFormFieldValue(this.content, value);
    }
    get className() {
        return this.content.className;
    }
    set className(value) {
        this.content.className = value;
    }
    get classList() {
        return this.content.classList;
    }
    get style() {
        return this.content.style;
    }
    /**
     * Add an HTML event listener on the Component content. Fluent.
     */
    addEventListener(eventType, event, options) {
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
    addInlineEventListeners(componentFilter) {
        // It would be nice if we could skip this initial filter, like angular does. But there is no CSS selector for
        // attribute name begins with or ends with. [attr^=] is for the VALUE beginning with something.
        // This includes the content itself in its check.
        for (const ele of QuerySelectorNodeList_1.nodeListSelectorAll([this.content], '[i5_event], [\\00003Aevent], [data-i5_event]')) {
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
            const method = this[eventDefinition.value];
            if (typeof method !== 'function') {
                throw new Error(`Handler method for element ${ele.id || ele.tagName} ${eventDefinition.value} does not exist`);
            }
            ele.addEventListener(eventDefinition.name.slice(1, -1), method.bind(this));
        }
        return this;
    }
    append(newChild) {
        if (guard(newChild)) {
            this.content.appendChild(newChild.content);
        }
        else {
            this.content.appendChild(newChild);
        }
        return this;
        function guard(obj) {
            return obj && 'content' in obj && obj.content instanceof Node;
        }
    }
    appendChild(newChild) {
        if (guard(newChild)) {
            return this.content.appendChild(newChild.content);
        }
        else {
            return this.content.appendChild(newChild);
        }
        function guard(obj) {
            return obj && 'content' in obj && obj.content instanceof Node;
        }
    }
    appendToParent(parent) {
        if (guard(parent)) {
            parent.content.appendChild(this.content);
        }
        else {
            parent.appendChild(this.content);
        }
        return this;
        function guard(obj) {
            return obj && 'content' in obj && obj.content instanceof Node;
        }
    }
    /**
     * Add the component to ComponentMap.
     */
    mapComponent() {
        // Throw an error if the content has already been related to a different component
        if (ComponentMap_1.getComponent(this.content)) {
            throw new Error('Content already referenced by a component');
        }
        ComponentMap_1.ComponentMap.components.set(this.content, this);
        return this;
    }
    /**
     * Remove the component from ComponentMap. Sometimes you might need to use this. But hopefully rarely, because it's using a WeakMap,
     */
    unmapComponent() {
        ComponentMap_1.ComponentMap.components.delete(this.content);
        return this;
    }
    /**
     * Return a list of components that are nested inside this component.
     */
    *getAllChildComponents() {
        for (const e of this.content.querySelectorAll('*')) {
            const component = ComponentMap_1.getComponent(e);
            if (component) {
                yield component;
            }
        }
    }
    setStyle(property, value) {
        if (typeof property === 'string' && value) {
            this.content.style.setProperty(property, value);
        }
        else {
            for (const prop of Object.getOwnPropertyNames(property)) {
                // TS just forgot that property is Record<string, string>.
                const val = property[prop];
                this.content.style.setProperty(prop, val);
            }
        }
        return this;
    }
    addClass(classNames) {
        if (!classNames) {
            return this;
        }
        if (typeof classNames === "string" && classNames.includes(" ")) {
            classNames = classNames.split(" ").filter(q => q !== "");
        }
        else if (typeof classNames === "string") {
            classNames = [classNames];
        }
        for (const name of classNames) {
            this.content.classList.add(name);
        }
        return this;
    }
    /**
     * Because addInlineEventListeners() searches all the way down, into nested components, it can't be called
     * by default. It just throws errors on all but simple test cases. But because these events almost always exist
     * internal to the component (e.g. on buttons), it can't be limited. This can be confusing without some kind of
     * message.
     */
    _checkInlineEventListeners() {
        for (const ele of QuerySelectorNodeList_1.nodeListSelectorAll([this.content], '[i5_event], [\\00003Aevent], [data-i5_event]')) {
            if (!window.__event_warning__) {
                // tslint:disable-next-line:no-console
                console.info('Inline event listeners are configured. Remember to call addInlineEventListeners().');
                window.__event_warning__ = true;
            }
            setTimeout(() => delete window.__event_warning__, 1000);
        }
    }
}
exports.Component = Component;

},{"../Html/CreateElement":6,"../Html/ElementType":8,"../Html/FormFieldValue":12,"../Html/QuerySelectorNodeList":13,"../System/Types/KeywordArguments":40,"../System/Utility/GetUniqueId":44,"./ComponentMap":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The question needs to be asked: if you can add a component to a page by doing element.appendChild(component.content),
 * how do you do from document.getElementById('foo') and get to component, not component.content? This is how.
 *
 * var component = ComponentMap.components.get(document.getElementById('foo'));
 *
 * This will work as long as ComponentMap.components.set(content, component) has been called at some point.
 *
 * This is the approved way of doing it. Another possible solution would be the use of expando properties,
 * for example document.getElementById('foo').relatedComponent = component. This works and it's super simple,
 * but seems to be frowned upon ... it has been known to create memory leaks in the past. WeakMap is the object
 * specifically created for this use case, so that is used here.
 *
 * If extension methods are loaded, you can use the element.getComponent() shortcut.
 */
class ComponentMap {
}
ComponentMap.components = new WeakMap();
exports.ComponentMap = ComponentMap;
function getComponent(element) {
    if (typeof element === 'string') {
        const e = document.getElementById(element);
        if (!e) {
            return;
        }
        return ComponentMap.components.get(e);
    }
    else {
        return ComponentMap.components.get(element);
    }
}
exports.getComponent = getComponent;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class ComponentBindingOptions {
    constructor(opt) {
        Object.assign(this, opt);
    }
}
exports.ComponentBindingOptions = ComponentBindingOptions;
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class ExistingElementBindingOptions extends ComponentBindingOptions {
    constructor(opt) {
        super(opt);
        Object.assign(this, opt);
        this.element = opt.element;
    }
}
exports.ExistingElementBindingOptions = ExistingElementBindingOptions;
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class ExistingLookupBindingOptions extends ComponentBindingOptions {
    constructor(opt) {
        super(opt);
        Object.assign(this, opt);
        this.selector = opt.selector;
    }
}
exports.ExistingLookupBindingOptions = ExistingLookupBindingOptions;
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class InnerHtmlBindingOptions extends ComponentBindingOptions {
    constructor(opt) {
        super(opt);
        Object.assign(this, opt);
    }
}
exports.InnerHtmlBindingOptions = InnerHtmlBindingOptions;
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class OuterHtmlBindingOptions extends ComponentBindingOptions {
    constructor(opt) {
        super(opt);
        Object.assign(this, opt);
        this.outerHtml = opt.outerHtml;
    }
}
exports.OuterHtmlBindingOptions = OuterHtmlBindingOptions;

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
function observableCheck(obj) {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && 'changeHandler' in obj && obj.changeHandler instanceof EventHandler_1.EventHandler;
}
exports.observableCheck = observableCheck;

},{"../System/EventHandler/EventHandler":37}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayChangedEventArgs_1 = require("../../System/EventHandler/ArrayChangedEventArgs");
const ObjectFullAssign_1 = require("../../System/Utility/ObjectFullAssign");
const ObservableBase_1 = require("../ObservableBase");
class TraitSource extends ObservableBase_1.ObservableBase {
    constructor(disableAsync) {
        super({ name: 'ArrayProxy', disableAsync });
    }
}
// tslint:disable-next-line:max-classes-per-file
class ArrayObservable extends Array {
    constructor(...args) {
        super(...args);
    }
    static getMergedObservable(args, disableAsync) {
        // This is where I really need multiple inheritance. This needs to inherit from Array
        // because it's extending a built-in class. It also needs to inherit from ObservableBase.
        // Three choices:
        // 1) 50 lines of clipboard inheritance.
        // 2) Cheat heavily by taking a trait approach. This means hackery to make TS happy.
        // 3) Do the same as 2 with the built-in Array class. Not a problem but with #2 the class name acts
        // as a hint that it's not a default array, which is better.
        // #2 wins.
        const arr = new ArrayObservable(...args);
        const result = ObjectFullAssign_1.objectFullAssign(arr, new TraitSource(disableAsync));
        Object.defineProperty(result, 'changeHandler', { enumerable: false });
        return result;
    }
    // Objects created through map, filter, etc, should be generic arrays.
    static get [Symbol.species]() {
        return Array;
    }
    // Needs to be public so the proxy can call it, but should not be called outside the API. Imagine it's internal.
    publishCollectionChanged(type, propertyName, args, oldValue, newValue, sender) {
        // This requires a cheat. It will fail if the object is created with new();
        this.changeHandler.invoke(new ArrayChangedEventArgs_1.ArrayChangedEventArgs({ type, propertyName, args, oldValue, newValue, sender }));
    }
    toJSON() {
        return this.slice();
    }
}
exports.ArrayObservable = ArrayObservable;

},{"../../System/EventHandler/ArrayChangedEventArgs":35,"../../System/Utility/ObjectFullAssign":47,"../ObservableBase":25}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsInteger_1 = require("../../System/Utility/IsInteger");
class ArrayProxyHandler {
    get(target, key, proxy) {
        if (key in target) {
            const methodCalled = Reflect.get(target, key, proxy);
            // Silent pass-through of other methods
            if (ArrayProxyHandler.methodsToWatch.indexOf(key.toString()) === -1) {
                return methodCalled;
            }
            return (...args) => {
                // TODO: Need to evaluate performance of copies
                const before = target.slice(); // This could be useful but it could also be a performance problem.
                const returnVal = methodCalled.apply(target, args);
                const after = target.slice(); // This could be useful but it could also be a performance problem.
                target.publishCollectionChanged('call', key, args, before, after, proxy);
                return returnVal;
            };
        }
    }
    set(target, key, value, proxy) {
        // Problem: We want to capture only length and [indexer] calls, but JS has no consistent
        // way of defining [indexer]. What makes it worse is that if a string is an integer, it is
        // converted to a number. And JS does not include a built-in way to test if a number is an integer.
        // Solution: A regex-based check. Ick. Way to remind me I'm using JS.
        if (key && (key.toString() === 'length' || typeof key === 'number' || IsInteger_1.isPositiveIntegerString(key))) {
            // TODO: Need to evaluate performance of copies
            const before = target.slice(); // This could be useful but it could also be a performance problem.
            Reflect.set(target, key, value, proxy);
            const after = target.slice(); // This could be useful but it could also be a performance problem.
            target.publishCollectionChanged('set', key, [value], before, after, proxy);
            return true;
        }
        else {
            Reflect.set(target, key, value, proxy);
            return true;
        }
    }
    deleteProperty(target, key) {
        const before = target.slice(); // This could be useful but it could also be a performance problem.
        Reflect.deleteProperty(target, key);
        const after = target.slice(); // This could be useful but it could also be a performance problem.
        // Cannot report proxy as sender because proxy not sent to this method
        target.publishCollectionChanged('delete', key, [], before, after, null);
        return true;
    }
}
// These are all the methods, not counting custom setters, that mutate an array.
ArrayProxyHandler.methodsToWatch = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
exports.ArrayProxyHandler = ArrayProxyHandler;

},{"../../System/Utility/IsInteger":45}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyChangedEventArgs_1 = require("../../System/EventHandler/PropertyChangedEventArgs");
const ObservableBase_1 = require("../ObservableBase");
const ObjectFullAssign_1 = require("../../System/Utility/ObjectFullAssign");
class ObjectObservable extends ObservableBase_1.ObservableBase {
    /**
     * This is the only way to produce an object observable, for reasons of safety.
     */
    static getMergedObservable(data, disableAsync) {
        // We need something with all the properties of the input object merged with the properties of this.
        // I don't want to actually modify the input object. Even though it SHOULD be throwaway, I don't know.
        // And I don't want to take the risk that something in the input, an unknown factor, will make this blow up.
        // I know that this class has only 2 levels of inheritance (currently) and contains nothing very complex at any level.
        const result = ObjectFullAssign_1.objectFullAssign(data, new ObjectObservable(disableAsync), true);
        Object.defineProperty(result, 'changeHandler', { enumerable: false });
        return result;
    }
    constructor(disableAsync) {
        super({ name: "ObjectProxy", disableAsync });
    }
    // Needs to be public so the proxy can call it, but should not be called outside the API. Imagine it's internal.
    publishPropertyChanged(type, propertyName, oldValue, newValue, sender) {
        this.changeHandler.invoke(new PropertyChangedEventArgs_1.PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
    toJSON() {
        // This filters out the troublesome changeHandler field.
        return super.toJSON();
    }
}
exports.ObjectObservable = ObjectObservable;

},{"../../System/EventHandler/PropertyChangedEventArgs":38,"../../System/Utility/ObjectFullAssign":47,"../ObservableBase":25}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectProxyHandler {
    constructor(_methodsToWatch, _watchSet, _watchDelete, _triggerOnlyOnChange) {
        this._methodsToWatch = _methodsToWatch;
        this._watchSet = _watchSet;
        this._watchDelete = _watchDelete;
        this._triggerOnlyOnChange = _triggerOnlyOnChange;
    }
    get(target, key, proxy) {
        if (key in target) {
            const methodCalled = Reflect.get(target, key, proxy);
            // Silent pass-through of non-watched methods
            if (this._methodsToWatch.indexOf(key.toString()) === -1 || typeof methodCalled !== 'function') {
                return methodCalled;
            }
            // Return a wrapper around the method that publishes the change
            return (...args) => {
                const returnVal = methodCalled.apply(target, args);
                target.publishPropertyChanged('call', key, undefined, args, proxy);
                return returnVal;
            };
        }
    }
    set(target, key, value, proxy) {
        if (this._watchSet) {
            const oldValue = Reflect.get(target, key, proxy);
            Reflect.set(target, key, value, proxy);
            // If to be triggered only on change, check oldValue and newValue
            if (this._triggerOnlyOnChange && oldValue === value) {
                return true;
            }
            target.publishPropertyChanged('set', key, oldValue, value, proxy);
            return true;
        }
        else {
            Reflect.set(target, key, value, proxy);
            return true;
        }
    }
    deleteProperty(target, key) {
        if (this._watchDelete) {
            const oldValue = Reflect.get(target, key);
            Reflect.deleteProperty(target, key);
            // Cannot report proxy as sender because proxy not sent to this method
            target.publishPropertyChanged('delete', key, oldValue, undefined, null);
            return true;
        }
        else {
            Reflect.deleteProperty(target, key);
            return true;
        }
    }
}
exports.ObjectProxyHandler = ObjectProxyHandler;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableProperty_1 = require("./ObservableProperty");
/**
 * This is a simple implementation of Object.assign() that understands ObservableProperty,
 * so that it can update the value of the property without wiping out references to the
 * existing property with that key (which is what would happen if you used regular Object.assign()
 * on a non-proxied object).  It can also be used to read the value of an ObservableProperty.
 */
function observableAssign(target, ...sources) {
    target = target || {};
    for (const src of sources) {
        for (const key of Object.getOwnPropertyNames(src)) {
            const sprop = src[key];
            const tprop = target[key];
            let val;
            if (ObservableProperty_1.observablePropertyCheck(sprop)) {
                val = sprop.value;
            }
            else {
                val = sprop;
            }
            if (ObservableProperty_1.observablePropertyCheck(tprop)) {
                tprop.value = val;
            }
            else {
                target[key] = val;
            }
        }
    }
}
exports.observableAssign = observableAssign;

},{"./ObservableProperty":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
/**
 * Common logic between the different observable classes. These implement IObservable. The invocation itself varies from class to class.
 */
class ObservableBase {
    constructor({ name, forwardTo, bubbleFrom, disableAsync } = {}) {
        this.changeHandler = new EventHandler_1.EventHandler();
        if (disableAsync) {
            this.changeHandler = new EventHandler_1.EventHandler(true);
        }
        if (forwardTo) {
            this.sendChangeEventsTo(forwardTo);
        }
        if (bubbleFrom) {
            for (const child of bubbleFrom) {
                this.receiveChangeEventsFrom(child);
            }
        }
        this.tagDelegate(name);
    }
    subscribe(callback, thisArg) {
        // Typescript has forgotten that EventHandler can accept an array.
        // In spite if the fact that this signature is identical.
        return this.changeHandler.subscribe(callback, thisArg);
    }
    /**
     * Subscribe the input's delegate to this object's changes.
     */
    sendChangeEventsTo(forwardTo) {
        // Join the other event handler to this, so that when this is invoked, so is the other.
        this.subscribe(forwardTo.changeHandler.delegate);
    }
    /**
     * Subscribe this object's delegate to the input object's changes.
     */
    receiveChangeEventsFrom(bubbleFrom) {
        // Subscribe to events raised on the other handler, so that when that is invoked, so is this
        // The same as forwardChangeEventsTo except that this is the target, not the source.
        bubbleFrom.subscribe(this.changeHandler.delegate);
    }
    unsubscribeCallback(callback) {
        return this.changeHandler.unsubscribeCallback(callback);
    }
    unsubscribeSender(sender) {
        return this.changeHandler.unsubscribeListener(sender);
    }
    unsubscribeDelegate(delegate) {
        return this.changeHandler.unsubscribeDelegate(delegate);
    }
    /**
     * This is probably frowned upon (see how TS doesn't like it), but it's valid JS.
     * It's only intended for troubleshooting, not real logic. There are times when you're
     * trying to identify exactly which delegates are subscribed, and this is really hard when
     * nothing has human-readable names.
     */
    tagDelegate(name) {
        if (name) {
            this.changeHandler.delegate._tag = name;
        }
    }
    dispose() {
        this.changeHandler.dispose();
    }
    toJSON() {
        const result = {};
        for (const x in this) {
            if (x !== "changeHandler" && x !== "privateProperty2") {
                result[x] = this[x];
            }
        }
        return result;
    }
}
exports.ObservableBase = ObservableBase;

},{"../System/EventHandler/EventHandler":37}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EscapeHtml_1 = require("../Html/EscapeHtml");
const PropertyChangedEventArgs_1 = require("../System/EventHandler/PropertyChangedEventArgs");
const NoneType_1 = require("../System/Types/NoneType");
const IsPrimitive_1 = require("../System/Utility/IsPrimitive");
const IObservable_1 = require("./IObservable");
const ObservableBase_1 = require("./ObservableBase");
/**
 * An ObservableProperty is a property that automatically raises a PropertyChanged event when it is modified. This is more
 * convenient than having to do it manually every time you need it.
 */
class ObservableProperty extends ObservableBase_1.ObservableBase {
    constructor(value, options = {}) {
        super(options);
        this.propertyName = "";
        this._triggerOnlyOnChange = false;
        options = options || {};
        this._value = value;
        this.propertyName = options.name || '';
        this._triggerOnlyOnChange = options.onlyWhenChanged || false;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const old = this._value;
        this._value = value;
        if (this._triggerOnlyOnChange && old === value) {
            return;
        }
        this.publishPropertyChanged('set', this.propertyName, old, value, this);
    }
    /**
     * Get the value (if a string) that has had special HTML characters escaped.
     */
    get safeValue() {
        if (NoneType_1.isNone(this._value) || !IsPrimitive_1.isPrimitive(this._value)) {
            return "";
        }
        return EscapeHtml_1.escapeHtml(String(this._value));
    }
    toString() {
        return JSON.stringify(this._value);
    }
    toJSON() {
        return this._value;
    }
    publishPropertyChanged(type, propertyName, oldValue, newValue, sender) {
        this.changeHandler.invoke(new PropertyChangedEventArgs_1.PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
}
exports.ObservableProperty = ObservableProperty;
function observablePropertyCheck(obj) {
    if (!IObservable_1.observableCheck(obj)) {
        return false;
    }
    // I don't like this because it should be checking if value is a setter,
    // and it isn't, because there is no way to check.
    // Object.getOwnPropertyDescriptor() doesn't catch inherited properties, of
    // which this is almost always one.
    // I have to fall back to a basic instance check.
    return obj && obj instanceof ObservableProperty;
}
exports.observablePropertyCheck = observablePropertyCheck;

},{"../Html/EscapeHtml":9,"../System/EventHandler/PropertyChangedEventArgs":38,"../System/Types/NoneType":41,"../System/Utility/IsPrimitive":46,"./IObservable":19,"./ObservableBase":25}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayObservable_1 = require("./Internal/ArrayObservable");
const ArrayProxyHandler_1 = require("./Internal/ArrayProxyHandler");
const ObjectObservable_1 = require("./Internal/ObjectObservable");
const ObjectProxyHandler_1 = require("./Internal/ObjectProxyHandler");
class ObservableProxy {
    static proximate(model, disableAsync, onlyIfChanged) {
        if (typeof model === 'function') {
            // We can't do functions, not that they would be very useful.
            // Yes, technically you should be able to define properties on a function. They are actual
            // objects.  In practice, however, Object.defineProperty() still makes them undefined.
            throw new Error('Unsupported type: function');
        }
        else if (Array.isArray(model)) {
            // An array proxy allows changes to an array to be observed. The down-side is that performance
            // is an order of magnitude slower than using an ObservableList.  The up-side is that it uses
            // more than an order of magnitude less code.
            return this.proximateArray(model, disableAsync, onlyIfChanged);
        }
        else if (typeof model === 'object') {
            return this.proximateObject(model, disableAsync, onlyIfChanged);
        }
        else {
            // If a simple value is returned, return a proxy having a value property.
            return this.proximateObject({ value: model }, disableAsync, onlyIfChanged);
        }
    }
    /**
     * A configurable version of proximate() called on an object. By making it generalized and configurable, this allows the caller to
     * track methods that are called, based on a configurable list.
     *
     * If the object is a complex object, where child objects are modified, not the main object, changes would not be caught.
     * One way to handle that is to make the child object a proxy. Another way is to access the child object only through methods
     * and use this.
     */
    static proximateObject(model, disableAsync, onlyIfChanged, methodsToWatch = [], watchSet = true, watchDelete = true) {
        if (typeof model === 'function') {
            // We can't do functions, not that they would be very useful.
            // Yes, technically you should be able to define properties on a function. They are actual
            // objects.  In practice, however, Object.defineProperty() still makes them undefined.
            throw new Error('Unsupported type: function');
        }
        // Add IObservable methods to the model so that it can raise events.
        // We must extend the original class (or at least the object).
        const target = ObjectObservable_1.ObjectObservable.getMergedObservable(model, disableAsync);
        const handler = new ObjectProxyHandler_1.ObjectProxyHandler(methodsToWatch || [], watchSet || false, watchDelete || false, onlyIfChanged || false);
        const proxy = new Proxy(target, handler);
        ObservableProxy._models.set(proxy, target);
        return proxy;
    }
    /**
     * Proximate an array.
     */
    static proximateArray(model, disableAsync, onlyIfChanged) {
        // Add IObservable methods to the model so that it can raise events.
        // We must extend the original array class (or at least the array object).
        const target = ArrayObservable_1.ArrayObservable.getMergedObservable(model, disableAsync);
        // The type here isn't accurate, but I have no good way to pass the key type without making this class only work for arrays.
        const handler = new ArrayProxyHandler_1.ArrayProxyHandler();
        const proxy = new Proxy(target, handler);
        ObservableProxy._models.set(proxy, target);
        return proxy;
    }
}
// The original target object needs to be stored somewhere so that the proxy can work.
// There's no reason that the user can't keep a copy but we shouldn't force that.
ObservableProxy._models = new WeakMap();
exports.ObservableProxy = ObservableProxy;

},{"./Internal/ArrayObservable":20,"./Internal/ArrayProxyHandler":21,"./Internal/ObjectObservable":22,"./Internal/ObjectProxyHandler":23}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EscapeHtml_1 = require("../Html/EscapeHtml");
const PropertyChangedEventArgs_1 = require("../System/EventHandler/PropertyChangedEventArgs");
const NoneType_1 = require("../System/Types/NoneType");
const CloneDeep_1 = require("../System/Utility/CloneDeep");
const IsPrimitive_1 = require("../System/Utility/IsPrimitive");
const IObservable_1 = require("./IObservable");
const ObservableBase_1 = require("./ObservableBase");
/**
 * An observable state that should only be accessed using the relevant methods, allowing atomic changes to multiple properties
 * in multiple objects, raising a single event.
 */
class ObservableState extends ObservableBase_1.ObservableBase {
    constructor(value, options = {}) {
        super(options);
        this.propertyName = "";
        if (value instanceof ObservableState) {
            this._value = CloneDeep_1.cloneDeep(value.value);
        }
        else {
            this._value = CloneDeep_1.cloneDeep(value);
        }
        options = options || {};
        this.propertyName = options.name || 'setState';
    }
    get value() {
        // I would prefer that this return Readonly<T> but getter and setter have to be the same type.
        // That means you would have to cast any value you set as a readonly, which is a PITA.
        return CloneDeep_1.cloneDeep(this._value);
    }
    /**
     * Overwrites the entire value.
     */
    set value(value) {
        this.setState(value, true);
    }
    getSafeValue(property) {
        // If value is primitive, then call this with no arguments.
        // That is the only case where it is allowed.
        if (!property) {
            if (!NoneType_1.isNone(this._value) && IsPrimitive_1.isPrimitive(this._value)) {
                return EscapeHtml_1.escapeHtml(String(this._value));
            }
            return "";
        }
        const tmp = this.value[property];
        if (NoneType_1.isNone(tmp) || !IsPrimitive_1.isPrimitive(tmp)) {
            return "";
        }
        return EscapeHtml_1.escapeHtml(String(tmp));
    }
    getValue(property) {
        // If value is primitive, then call this with no arguments.
        // That is the only case where it is allowed.
        if (!property) {
            if (!NoneType_1.isNone(this._value) && IsPrimitive_1.isPrimitive(this._value)) {
                return CloneDeep_1.cloneDeep(this._value);
            }
            return undefined;
        }
        return this.value[property];
    }
    getState() {
        return this.value;
    }
    setState(value, overWriteAll = false) {
        const oldValue = CloneDeep_1.cloneDeep(this._value);
        let newValue;
        let returnValue;
        // If the type is primitive, then a full overwrite is allowed
        if (IsPrimitive_1.isPrimitive(this._value)) {
            // Functions will execute but they won't change the value. The reason is the same reason that this makes no permanent change to bar:
            // var foo = function(str) { str = str.toUpperCase(); }; var bar = 'abc'; foo(bar); console.log(bar === 'abc');
            if (typeof value === 'function') {
                throw new Error('Cannot call setState with a function if state is primitive.');
            }
            overWriteAll = true;
        }
        if (overWriteAll) {
            newValue = _ovr1_overwriteAll.call(this, value);
        }
        else if (typeof value === 'function') {
            [newValue, returnValue] = _ovr3_functionArg.call(this, value);
        }
        else {
            if (!value || typeof value !== 'object') {
                throw new Error('value is not a partial state or a function');
            }
            newValue = _ovr2_partial.call(this, value);
        }
        this.publishPropertyChanged('call', this.propertyName, oldValue, newValue, this);
        return { oldValue, newValue, returnValue };
        function _ovr1_overwriteAll(_value) {
            // Overwrite the entire object.
            this._value = CloneDeep_1.cloneDeep(_value);
            return _value;
        }
        function _ovr2_partial(_value) {
            // Partial object: Overwrite only the keys provided
            const tmp = CloneDeep_1.cloneDeep(this._value);
            for (const key of Object.getOwnPropertyNames(_value)) {
                tmp[key] = _value[key];
            }
            this._value = CloneDeep_1.cloneDeep(tmp);
            return tmp;
        }
        function _ovr3_functionArg(_value) {
            // Execute the function provided and update the object as dictated
            // Maybe unnecessary but we want to avoid the caller exfiltrating the state using a function,
            // by accident. Of course, they can just access _value by casting as any,
            // but that's not accidental.
            const tmp = CloneDeep_1.cloneDeep(this._value);
            const _returnValue = _value.call(tmp, tmp);
            this._value = CloneDeep_1.cloneDeep(tmp);
            return [tmp, _returnValue];
        }
    }
    toString() {
        return JSON.stringify(this._value);
    }
    toJSON() {
        return this.value;
    }
    publishPropertyChanged(type, propertyName, oldValue, newValue, sender) {
        this.changeHandler.invoke(new PropertyChangedEventArgs_1.PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
}
exports.ObservableState = ObservableState;
function observableStateCheck(obj) {
    if (!IObservable_1.observableCheck(obj)) {
        return false;
    }
    // I don't know if I should check for this or for getState() and setState()
    return obj && obj instanceof ObservableState;
}
exports.observableStateCheck = observableStateCheck;

},{"../Html/EscapeHtml":9,"../System/EventHandler/PropertyChangedEventArgs":38,"../System/Types/NoneType":41,"../System/Utility/CloneDeep":42,"../System/Utility/IsPrimitive":46,"./IObservable":19,"./ObservableBase":25}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateElement_1 = require("../Html/CreateElement");
const DeleteNodeContent_1 = require("../Html/DeleteNodeContent");
const ElementType_1 = require("../Html/ElementType");
const ArrayUtilities_1 = require("../System/Collections/ArrayUtilities");
const Constructable_1 = require("../System/Types/Constructable");
const KeywordArguments_1 = require("../System/Types/KeywordArguments");
const NoneType_1 = require("../System/Types/NoneType");
/**
 * If you click a link in a real web site, the browser asks the server for a page and it routes you to the relevant
 * page. But if you have a single page app running on a file, with no web server, like the one this framework
 * was built for, you need something to simulate that.
 *
 * This class clears the route container, which is expected to be a static container in the wrapper HTML page, or the body.
 * When you give it the relevant route, it executes the callback or returns the view/HTML element you defined for the route,
 * and sticks it inside the container. The element returned can be wrapped in a layout view, like in ASP.Net.
 *
 * This is a simple version, without the recursive routes found in the advanced router. It was based more on ASP.Net or node.js
 * routing, where you have a flat set of routes and once you find a route, you're done.
 */
class PageRouter {
    static get allRoutes() {
        return this._routes;
    }
    static get matchedRoute() {
        return this._matchedRoute || { route: '', params: new Map(), config: { route: '' } };
    }
    static get params() {
        return this.matchedRoute.params;
    }
    static get historyMaxLength() {
        return this._historyMaxLength;
    }
    static set historyMaxLength(value) {
        if (this._history.length > value) {
            this._history.length = value;
        }
        this._historyMaxLength = value;
    }
    static get history() {
        return this._history;
    }
    static set notFound(value) {
        this._notFound = value;
    }
    /**
     * This must be called first before using it, because JS doesn't have static constructors like C#. It sets up the
     * route container, custom elements, and also allows one-step configuration of several other properties.
     *
     * Accepts Keyword Arguments.
     */
    static configure(routes = [], defaultLayout, defaultStaticLayout, notFound, defaultRoute, urlRoutingEnabled = true) {
        ({ routes, defaultLayout, defaultStaticLayout, notFound, defaultRoute, urlRoutingEnabled = true } = KeywordArguments_1.Kwarg.parseArgs({ routes, defaultLayout, defaultStaticLayout, notFound, defaultRoute, urlRoutingEnabled })); // kwargline
        this._configured = true;
        if (notFound) {
            this._notFound = notFound;
        }
        for (const rte of routes) {
            if (defaultLayout) {
                rte.layout = rte.layout || defaultLayout;
            }
            if (!NoneType_1.isNone(defaultStaticLayout) && NoneType_1.isNone(rte.staticLayout)) {
                rte.staticLayout = defaultStaticLayout;
            }
            this.addRoute(rte);
        }
        if (urlRoutingEnabled) {
            // By default, allows going to a new page by changing the URL instead of having to issue route() commands.
            this.turnOnUrlRouting();
        }
        this.routeContainer = document.querySelector('page-router') || document.body;
        try {
            if (!window.customElements.get('page-router')) {
                window.customElements.define('page-router', DivPage, { extends: 'div' });
            }
            if (!window.customElements.get('layout-body')) {
                window.customElements.define('layout-body', DivLayout, { extends: 'div' });
            }
            if (!window.customElements.get('not-found')) {
                window.customElements.define('not-found', DivNotFound, { extends: 'div' });
            }
        }
        catch (err) {
            // customElements isn't officially part of an ES version yet so won't work even in some recent-ish browsers
        }
        if (defaultRoute) {
            this.defaultRoute(defaultRoute);
        }
    }
    // Note: there is no removeRoute. There could be, but it's never needed.
    static addRoute(route) {
        let routes;
        if (Array.isArray(route.route)) {
            routes = route.route;
        }
        else {
            routes = [route.route];
        }
        for (const rte of routes) {
            if (this._routes.find(q => q.route === rte)) {
                throw new Error("Route already exists.");
            }
            const tmp = Object.assign({}, route);
            tmp.route = rte;
            this._routes.push(tmp);
        }
    }
    /**
     * If linked to a particular page (on the hash), go to it. Else, go to the route specified.
     */
    static defaultRoute(route) {
        if (window.location.hash) {
            PageRouter.route();
        }
        else {
            PageRouter.route(route);
        }
    }
    static route(route, updateUrl = true) {
        if (!this._configured) {
            throw new Error('PageRouter not configured. Call configure() first.');
        }
        if (!route) {
            // Allow actual links via the hash. Hash links don't force a page reload and they work w/o a web server.
            // To avoid having to call route() manually, you must call turnOnUrlRouting();
            route = window.location.hash.slice(1);
            // There is a problem, which is that setting the hash will trigger ANOTHER route chainge via the hashchange operation.
            // Removing the hash change and then restoring it later does nothing. It's still triggered.
            // This requires hackwork. Even the simple router has more hacks than I like.
            // If this was triggered by a hash change and the route is the same, then don't do anything.
            // Clear the last route so that it doesn't interfere with the next hash change.
            if (route === this._lastRoute) {
                this._lastRoute = undefined;
                return;
            }
        }
        else if (updateUrl) {
            // If a route is sent in, then set the hash.
            window.location.hash = route;
            this._lastRoute = route;
        }
        else {
            this._lastRoute = route;
        }
        let match;
        let searchResult = false;
        for (const rte of this._routes) {
            searchResult = this._testRoute(rte.route, route || '');
            if (searchResult) {
                match = rte;
                break;
            }
        }
        if (!match) {
            // tslint:disable-next-line:no-console
            console.log(`Route ${route} not found.`);
            this._renderNotFound();
            return;
        }
        const previousRoute = (this._matchedRoute || {}).config;
        this._matchedRoute = { route, params: searchResult || new Map(), config: match };
        // Add route to history if it's different from the previous latest history
        if (this.history.length === 0 || this.history[this.history.length - 1] !== route) {
            this._history.push(route);
        }
        if (this.history.length > this.historyMaxLength) {
            this._history.shift();
        }
        let routeGuards = [];
        if (Array.isArray(match.routeGuards)) {
            routeGuards = match.routeGuards;
        }
        else if (match.routeGuards) {
            routeGuards.push(match.routeGuards);
        }
        for (const rg of routeGuards) {
            const test = rg.checkValid(match);
            if (test === false) {
                // tslint:disable-next-line:no-console
                console.warn('Route permission denied');
                return;
            }
        }
        this._renderRoute(match, previousRoute);
    }
    static back() {
        // If there isn't any history to go back to, don't go back.
        if (this.history.length < 2) {
            return;
        }
        this._history.pop(); // Current route sits at the top of the stack
        const route = this._history.pop(); // previous route
        if (route !== undefined) {
            this.route(route);
        }
    }
    static turnOnUrlRouting() {
        this._hashChange = (evt) => { this.route(); };
        window.addEventListener('hashchange', this._hashChange);
    }
    static _testRoute(routeString, urlString) {
        const params = new Map();
        if (!routeString || !urlString) {
            return false;
        }
        routeString = routeString.toLowerCase();
        if (routeString.endsWith('/')) {
            routeString = routeString.slice(0, -1);
        }
        if (urlString.endsWith('/')) {
            urlString = urlString.slice(0, -1);
        }
        const routeArray = routeString.split('/');
        const urlArray = urlString.split('/');
        // Same number of / characters required.
        if (routeArray.length !== urlArray.length) {
            return false;
        }
        for (const [routeSegment, urlSegment] of ArrayUtilities_1.zip(routeArray, urlArray)) {
            // Parameters are allowed. Optional parameters are not.
            // The reason for no optional parameters is that finding a match between /a/:?param/b and /a/b is too complex.
            // Is 'b' a param value or part of the route. Basically, optional parameters only work at the route end.
            // I noticed that ASP.NET works that way and I found it confusing that optional parameters only work at the end.
            // Just create a new route with the optional param left out.
            if (routeSegment.startsWith(':')) {
                let name = routeSegment.slice(1);
                if (!name.includes('=')) {
                    if (params.has(name)) {
                        throw new Error(`Route ${routeString} contains duplicates of the same parameter.`);
                    }
                    params.set(name, urlSegment);
                }
                else {
                    // Handle the mapped static param case.
                    const val = name.split('=')[1];
                    name = name.split('=')[0];
                    if (val !== urlSegment) {
                        return false;
                    }
                    if (params.has(name)) {
                        throw new Error(`Route ${routeString} contains duplicates of the same parameter.`);
                    }
                    params.set(name, urlSegment);
                }
            }
            else if (routeSegment !== urlSegment.toLowerCase()) {
                return false;
            }
        }
        return params;
    }
    static _renderRoute(route, previous) {
        // Calling PageRouter.route('the same url') will reload the contents from scratch.
        // Adjusting window.location will do nothing if the route is the same.
        // I think this is fine, after struggling in angular to reload the page and finding
        // it much harder.
        // Note if you change the location bar, Chrome forces a reload of Program.ts, nothing you can do
        // about it because Chrome is the one that discarded your state.
        let container = this.routeContainer;
        const keepLayout = route.layout && previous && route.staticLayout && route.layout === previous.layout;
        if (!keepLayout) {
            // Delete contents of page-router
            DeleteNodeContent_1.deleteNodeContent(container);
        }
        if (keepLayout) {
            container = document.querySelector('layout-body');
            if (!container) {
                throw new Error('<layout-body> element not found');
            }
        }
        else if (route.layout) {
            let layoutView;
            if (Constructable_1.constructorTypeGuard(route.layout)) {
                layoutView = new route.layout();
            }
            else if (route.payload) {
                layoutView = route.layout();
            }
            if (layoutView && viewTypeGuard(layoutView)) {
                container.appendChild(layoutView.content);
            }
            else if (layoutView) {
                container.appendChild(layoutView);
            }
            container = document.querySelector('layout-body');
            if (!container) {
                throw new Error('<layout-body> element not found');
            }
        }
        if (keepLayout) {
            // Delete contents of layout-body (but keep layout)
            DeleteNodeContent_1.deleteNodeContent(container);
        }
        let view;
        if (Constructable_1.constructorTypeGuard(route.payload)) {
            view = new route.payload();
        }
        else if (typeof route.payload === 'function') {
            view = route.payload();
        }
        else if (route.payload) {
            view = route.payload.cloneNode(true);
        }
        if (view && viewTypeGuard(view)) {
            container.appendChild(view.content);
        }
        else if (view) {
            container.appendChild(view);
        }
        function viewTypeGuard(test) {
            if ("content" in test && test.content instanceof HTMLElement) {
                return true;
            }
            return false;
        }
    }
    static _renderNotFound() {
        DeleteNodeContent_1.deleteNodeContent(this.routeContainer);
        this.routeContainer.appendChild(CreateElement_1.createElement(ElementType_1.elementType.HTMLDivElement, { id: 'not-found', innerHTML: this._notFound || "Quoth the Raven, 404" }));
    }
}
PageRouter.routeContainer = document.body;
PageRouter._configured = false;
PageRouter._routes = [];
PageRouter._history = [];
PageRouter._historyMaxLength = 50;
exports.PageRouter = PageRouter;
// tslint:disable:max-classes-per-file
// A class is required but you're not allowed to use the existing class because it can't
// be constructed (invalid constructor). And you are ONLY allowed to extend HTMLElement.
// AND they must be unique.
class DivPage extends HTMLElement {
    constructor() {
        super();
    }
}
class DivLayout extends HTMLElement {
    constructor() {
        super();
    }
}
class DivNotFound extends HTMLElement {
    constructor() {
        super();
    }
}

},{"../Html/CreateElement":6,"../Html/DeleteNodeContent":7,"../Html/ElementType":8,"../System/Collections/ArrayUtilities":33,"../System/Types/Constructable":39,"../System/Types/KeywordArguments":40,"../System/Types/NoneType":41}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A deferred promise is a wrapper around a promise that allows it to be triggered later. In pure JS, this is harder
 * than it needs to be, and it takes a weird hack to make it work. This class is little more than a wrapper around
 * said hack.
 *
 * Otherwise, this uses a real promise internally, so aside from the wrapping object, it has no special logic. I chose
 * not to re-implement the Promise API synchronously, so it uses the same microtask queue.
 *
 * The wrapping API is tweaked a little to avoid some common pitfalls that are caused by flaws in the Promise
 * design. For example, having onfulfilled and onrejected in the same step means that errors in the fulfilled
 * half will not be caught by the error handler.  Rather than say "don't use that input" like most instructors,
 * I just got rid of it (it's still accessible on the output property, if you want to use it ... but don't).
 */
class DeferredPromise {
    constructor(onfulfilled, throwOnUnhandledError = false) {
        this.throwOnUnhandledError = throwOnUnhandledError;
        /** Use this to invoke the callback */
        // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
        this.resolve = function _dummy() { };
        /** Use this to reject the promise right out. Which is probably useless but you never know. */
        // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
        this.reject = function _dummy() { };
        // This is the weird hack that is the basis of this class. It's a closure, but reversed, as the
        // enclosed property is an internal reference accessed outside rather than an outside reference
        // accessed inside.
        this._promise = new Promise((_resolve, _reject) => {
            this.resolve = _resolve;
            this.reject = _reject;
        });
        // Make sure that there is always something at the first level, even if it's just returning the result.
        // We want the default behavior to allow the following:
        // const waitable = new DeferredPromise(); event.subscribe(waitable.resolve); const r = await waitable.output; console.log(r);
        // If you leave out the initial callback, you'll get undefined instead of what the event sends.
        if (onfulfilled) {
            this.then(onfulfilled, throwOnUnhandledError);
        }
        else {
            this.then(res => res, throwOnUnhandledError);
        }
    }
    /**
     * Use in async/await code. The following will work if a result is returned.
     * const result = await deferred.output;
     * console.log(result);
     */
    get output() {
        return this._promise;
    }
    /** Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback. */
    then(onfulfilled, throwOnUnhandledError = this.throwOnUnhandledError) {
        if (onfulfilled) {
            this._promise = this._promise.then(onfulfilled);
        }
        // This is to keep a promise from, by default, eating up all errors. It's ugly.
        // It means a lot of extra steps. It makes sure that by default, the last step is always a catch.
        if (throwOnUnhandledError) {
            this._promise = this._promise.catch(err => { throw (err); });
        }
        return this;
    }
    catch(onrejected, throwOnUnhandledError = this.throwOnUnhandledError) {
        if (onrejected) {
            this._promise = this._promise.catch(onrejected);
        }
        // Again this is a mess, but the catch handler above could throw
        if (throwOnUnhandledError) {
            this._promise = this._promise.catch(err => { throw (err); });
        }
        return this;
    }
}
exports.DeferredPromise = DeferredPromise;

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(time) {
    return (result) => new Promise(resolve => setTimeout(() => resolve(result), time));
}
exports.delay = delay;

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeferredPromise_1 = require("./DeferredPromise");
/**
 * The promise API is nice, mostly, but the main thing preventing use of a promise as an event handler is that
 * it only executes once. After that point, it is resolved, and there is no way to flip it back.
 *
 * The repeatable promise keeps the promise API and creates the illusion that the promise is repeated by
 * rebuilding the chain each time. It's really a deferred factory but it pretends to be a deferred. I'm sure
 * this has a performance penalty.
 *
 * You should not attach actual promises into the then() chain, because they can't be repeated. The Promise type isn't
 * allowed but there are ways to get around the TS compiler. The TS type definition for Promise and PromiseLike isn't
 * completely correct, anyway, so it's easy to get used to using the any type and make broken code.
 *
 * You cannot async/await a repeatable promise itself but you can await a single resolution. Async/await is sugar that
 * creates a regular, non-repeatable, promise.
 */
class RepeatablePromise {
    constructor(onfulfilled, onUnhandledError, // This adds a callback at the end (or 2nd from the end, see next option)
    throwOnUnhandledError = false // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
    ) {
        this.onUnhandledError = onUnhandledError;
        this.throwOnUnhandledError = throwOnUnhandledError; // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
        this.callbacks = [];
        // Make sure that there is always something at the first level, even if it's just returning the result. Useful for async/await code.
        if (onfulfilled) {
            this.then(onfulfilled);
        }
        else {
            this.then(res => res);
        }
    }
    // The following should work:
    // const repeatable = new RepeatablePromise(); const r = await repeatable.resolve(); console.log(r);
    resolve(args) {
        const promise = this.build();
        promise.resolve(args);
        return promise.output;
    }
    reject(args) {
        const promise = this.build();
        promise.reject(args);
        return promise.output;
    }
    // Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback.
    then(onfulfilled) {
        this.callbacks.push({ onfulfilled: onfulfilled });
        return this;
    }
    catch(onrejected) {
        this.callbacks.push({ onrejected: onrejected });
        return this;
    }
    build() {
        let promise;
        for (const cb of this.callbacks) {
            if (!promise) {
                // We know that the first is always onfulfilled and is never undefined
                if (!cb.onfulfilled) {
                    throw new Error("Bug in RepeatablePromise constructor. First onfulfilled is null.");
                }
                promise = new DeferredPromise_1.DeferredPromise(cb.onfulfilled, false);
            }
            else if (cb.onfulfilled) {
                promise.then(cb.onfulfilled);
            }
            else if (cb.onrejected) {
                promise.catch(cb.onrejected);
            }
        }
        if (!promise) {
            throw new Error("Bug in RepeatablePromise constructor. No callbacks, not even the default first onfulfilled.");
        }
        if (this.onUnhandledError) {
            promise.catch(this.onUnhandledError);
        }
        if (this.throwOnUnhandledError) {
            promise.catch(err => { throw (err); });
        }
        return promise;
    }
}
exports.RepeatablePromise = RepeatablePromise;

},{"./DeferredPromise":30}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return elements of array a lined up with elements of array b. Both arrays don't have to be the same length.
 */
function zip(a, b) {
    if (a.length >= b.length) {
        return a.map((element, index) => [element, b[index]]);
    }
    else {
        return b.map((element, index) => [a[index], b]);
    }
}
exports.zip = zip;
/**
 * Return a cartesian join (cross join) between arrays a and b.
 */
function cartesian(a, b) {
    /// typescript prevents a direct use of concat, so do this manually with a loop
    const results = [];
    for (const item of a) {
        results.push(...b.map(q => [item, q]));
    }
    return results;
}
exports.cartesian = cartesian;
/**
 * Generate a range of integers, counting up by 1, for the given length. Stolen from Python.
 */
function range(length) {
    return Array.from({ length: length }, (value, key) => key);
}
exports.range = range;
/**
 * Given an array of items and other arrays, flatten them out into a single array.
 */
function* traverse(arr) {
    if (!Array.isArray(arr)) {
        yield arr;
    }
    else {
        for (const row of arr) {
            yield* traverse(row);
        }
    }
}
exports.traverse = traverse;

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Make it easier to create simple comparison functions on (possibly complex) objects. Typical use: arr.sort(orderBy(o => o.id))
 */
function orderBy(propertyFn) {
    return function (first, second) {
        const firstValue = propertyFn(first);
        const secondValue = propertyFn(second);
        if (firstValue < secondValue) {
            return -1;
        }
        if (firstValue > secondValue) {
            return 1;
        }
        return 0;
    };
}
exports.orderBy = orderBy;

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayChangedEventArgs {
    constructor(args) {
        /**
         * The type of operation (method, set, delete)
         */
        this.type = '';
        this.propertyName = '';
        this.args = [];
        Object.assign(this, args);
    }
}
exports.ArrayChangedEventArgs = ArrayChangedEventArgs;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepeatablePromise_1 = require("../Async/RepeatablePromise");
/**
 * A delegate object is used by the EventHandler. It contains enough information to execute a callback synchronously or asynchronously
 * (using a promise). It also adds some strings to help in troubleshooting, because searching a recursive array of complex objects can make
 * it a bear to find out why a callback isn't being executed.
 */
class Delegate {
    constructor(callback, thisArg) {
        // In many cases (for example, when using fat arrow functions), thisArg is
        // not needed. But in most others, it is an annoying bug that requires troubleshooting
        // to figure out what the caller forgot. I've wavered between making it required and not.
        if (!thisArg) {
            // tslint:disable-next-line:no-console
            console.warn('Delegate created without thisArg. Did you mean to?');
        }
        this.thisArg = thisArg;
        if (thisArg && typeof thisArg === 'object' && 'constructor' in thisArg) {
            this.callbackOwnerName = thisArg.constructor.name;
        }
        if (!callback) {
            throw new Error("callback is required");
        }
        // The typescript compiler should handle this check but can't at runtime.
        if (typeof callback !== 'function') {
            throw new Error("callback must be a callback function");
        }
        this.callback = callback;
        this.callbackName = callback.name;
        if (this.callbackOwnerName && this.callbackName) {
            this.name = `${this.callbackOwnerName}.${this.callbackName}()`;
        }
        else if (this.callbackName) {
            this.name = this.callbackName + '()';
        }
        else if (this.callbackOwnerName) {
            this.name = this.callbackOwnerName + '.__lambda__()';
        }
        this.promise = new RepeatablePromise_1.RepeatablePromise(callback.bind(thisArg));
    }
}
exports.Delegate = Delegate;

},{"../Async/RepeatablePromise":32}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtilities_1 = require("../Collections/ArrayUtilities");
const Delegate_1 = require("./Delegate");
/**
 * I chose to use C# style events, not JS/TS, because the JS/TS way of doing delegates/custom events is a NIGHTMARE. Sure,
 * CustomEvent works, but on the TS side the code required to make TSC happy with valid javascript is awful and non-intuitive.
 * On the JS side, you have the problem that every handler picks it up, not just the ones that are bound to the relevant HTML
 * element, so elements need to pass the source as an argument and check it (like jquery and $(document).on()).
 *
 * After getting it working, all I could think about was how bad the code was, so I rewrote it avoiding the JS pattern entirely.
 *
 * This can be synchronous (callbacks) or asynchronous (promises).  When it is async, the code executes after the current synchronous
 * events run to completion. This could create bugs in synchronous code, but is best for browser events. This handler is primarily used for
 * browser events, so async is default.
 *
 * But if you're triggering async events in code and stepping through it in Chrome, what you see won't make sense, because the async
 * events won't occur until right away. It can be hard to troubleshoot.
 */
// tslint:disable-next-line:ban-types
class EventHandler {
    constructor(_disableAsync = false) {
        this._disableAsync = _disableAsync;
        this.delegate = [];
    }
    subscribe(callback, thisArg) {
        // If this receives a delegate (which is an array of delegates), add it.
        // When this is invoked, that delegate will also be invoked.
        if (Array.isArray(callback)) {
            _ovr1_delegate.call(this, callback);
            return;
        }
        // Got a single callback
        // Only allow a single instance of the same callback.
        if (this.find({ callback, thisArg, firstMatch: true }).length) {
            return;
        }
        const newDele = new Delegate_1.Delegate(callback, thisArg);
        this.delegate.push(newDele);
        // IF this is asynchronous, return the promise so it can be chained.
        // Chaining won't work on sync code, so do not in that case.
        if (!this._disableAsync) {
            return newDele.promise;
        }
        function _ovr1_delegate(delegate) {
            // Only allow a single instance of the same delegate.
            if (this.delegate.find(q => q === delegate)) {
                return;
            }
            this.delegate.push(delegate);
            return;
        }
    }
    unsubscribeCallback(callback) {
        // Only searches non-delegates
        const index = this.delegate.findIndex(q => !Array.isArray(q) && q.callback === callback);
        if (index >= 0) {
            this.delegate.splice(index, 1);
        }
    }
    unsubscribeListener(sender) {
        // First try to unsubscribe the default delegate. Can't do anything if it has a different name, though.
        if ("delegate" in sender) {
            this.unsubscribeDelegate(sender.delegate);
        }
        // Only searches non-delegates
        let index = 0;
        while (index >= 0) {
            index = this.delegate.findIndex(q => !Array.isArray(q) && q.thisArg === sender);
            if (index >= 0) {
                this.delegate.splice(index, 1);
            }
        }
    }
    unsubscribeDelegate(delegate) {
        let index = 0;
        while (index >= 0) {
            index = this.delegate.findIndex(q => q === delegate);
            if (index >= 0) {
                this.delegate.splice(index, 1);
            }
        }
    }
    invoke(args) {
        for (const listener of ArrayUtilities_1.traverse(this.delegate)) {
            if (!this._disableAsync) {
                // Async version. Does not work well with the chrome debugger.
                listener.promise.resolve(args);
            }
            else {
                listener.callback.call(listener.thisArg, args);
            }
        }
    }
    find({ callback, thisArg, firstMatch } = {}) {
        const results = [];
        for (const listener of ArrayUtilities_1.traverse(this.delegate)) {
            if (match(listener)) {
                results.push(listener);
                if (firstMatch) {
                    break;
                }
            }
        }
        return results;
        function match(listener) {
            if (callback && thisArg) {
                return listener.callback === callback && listener.thisArg === thisArg;
            }
            if (callback) {
                return listener.callback === callback;
            }
            if (thisArg) {
                return listener.thisArg === thisArg;
            }
            return true;
        }
    }
    clear() {
        this.delegate.length = 0;
    }
    dispose() {
        this.clear(); // Clears the delegate
        this.delegate = undefined; // Makes sure this can't be used again
    }
}
exports.EventHandler = EventHandler;

},{"../Collections/ArrayUtilities":33,"./Delegate":36}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Event arguments expected on any Change event.
 */
class PropertyChangedEventArgs {
    constructor(args) {
        /**
         * The type of change operation (set, delete) (potentially method)
         */
        this.type = '';
        Object.assign(this, args);
    }
}
exports.PropertyChangedEventArgs = PropertyChangedEventArgs;

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determine if an object is a constructor that is newable.
 * THIS CANNOT DETECT ANONYMOUS CLASSES. Sorry, but JS doesn't have a non-destructive way
 * to check if any function is a constructor other than to try to new() it and blow up/not blow up.
 * This function depends on there being a prototype with a named constructor.
 */
function constructorTypeGuard(obj) {
    return obj && obj.prototype && obj.prototype.constructor.name;
}
exports.constructorTypeGuard = constructorTypeGuard;

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsInteger_1 = require("../Utility/IsInteger");
/**
 * This module provides an implementation of keyword arguments, as seen in Python and C#. It makes configurable
 * functions so much quicker and easier than flat arguments (forcing you to put undefined manually in different
 * slots) or options objects (takes more time to produce, especially if you need to new it up).
 *
 * Call functions having keyword arguments using this syntax:
 * callme(arg1, arg2, kw('something', kw1), kw('somethingElse', kw2))
 *
 * To make them work, in the function itself, you need to copy and paste. For example:
 * ({ arg1, arg2, something, somethingElse } = Kwarg.parse({ arg1, arg2, something, somethingElse }));
 */
class Kwarg {
    constructor(a, b) {
        if (!a) {
            throw new Error('Argument null exception');
        }
        this.name = a;
        this.value = b;
    }
    /**
     * Remember this template:
     * ({ } = Kwarg.parseArgs({ }));
     * Include default values in the first object, not the second.
     *
     * If you want to capture rest parameters, use this:
     * ({ $rest$ } = Kwarg.parseArgs({ , ...rest }));
     *
     * If you want allowUnknownKeyword to be true, use this:
     * ({ $$kw$$ } = Kwarg.parseArgs({ }, true));
     */
    static parseArgs(args, allowUnknownKeyword = false) {
        // It would be nice if this could take the arguments object, but sadly arguments stores only an array of values,
        // no keys. If JS were sane, it would be a Map, not an array. Two steps forward, one step back.
        // Parsing the string definition for the function is not my cup of tea, so just no.
        const obj = {};
        const names = Object.getOwnPropertyNames(args);
        // Get data by argument order
        for (const arg of names) {
            if (args[arg] instanceof Kwarg) {
                obj[arg] = undefined;
            }
            else {
                obj[arg] = args[arg];
            }
        }
        const kwvar = {};
        obj['$$kw$$'] = kwvar;
        // Check for rest parameters.
        // I was going to have this on/off configurable, but it shouldn't hurt performance.
        const arr = [];
        obj['$rest$'] = arr;
        // Rest parameters are stored as array keys, { '0': a, '1': b, 'nonRest': 'something else'}
        for (const arg of Object.getOwnPropertyNames(args).filter(f => IsInteger_1.isPositiveIntegerString(f))) {
            if (!(args[arg] instanceof Kwarg)) {
                arr.push(args[arg]);
            }
        }
        const keywordsUsed = {};
        // Get data by keyword name
        // Have to iterate the list twice, to avoid wiping out data if the order is swapped
        for (const arg of names) {
            if (args[arg] instanceof Kwarg) {
                const tmp = args[arg];
                if (tmp.name in obj) {
                    obj[tmp.name] = tmp.value;
                }
                else {
                    if (allowUnknownKeyword) {
                        kwvar[tmp.name] = tmp.value;
                    }
                    else {
                        throw new Error(`Got an unexpected keyword argument '${tmp.name}'`);
                    }
                }
                if (tmp.name in keywordsUsed) {
                    throw new Error(`Got multiple values for keyword argument + '${tmp.name}'`);
                }
                keywordsUsed[tmp.name] = true;
            }
        }
        return obj;
    }
    // Turn an object into an array of keyword arguments.
    // Needs to return any[] because it's going to be shoved into arbitrary argument lists
    static unpack(args) {
        const results = [];
        for (const arg of Object.getOwnPropertyNames(args)) {
            results.push(kw(arg, args[arg]));
        }
        return results;
    }
    isMatch(key) {
        return this.name === key;
    }
}
exports.Kwarg = Kwarg;
function kw(a, b) {
    if (!a) {
        throw new Error('Argument null exception');
    }
    if (typeof a === 'string') {
        // Overload 1
        return new Kwarg(a, b);
    }
    else if (Array.isArray(a)) {
        // Overload 2
        return new Kwarg(a[0], a[1]);
    }
    else {
        // Overload 3
        // This should be an object with only one key/value pair.
        const props = Object.getOwnPropertyNames(a);
        if (!props.length) {
            throw new Error('Argument null exception');
        }
        if (props.length > 1) {
            throw new Error('Invalid map object: multiple keys');
        }
        return new Kwarg(props[0], a[props[0]]);
    }
}
exports.kw = kw;
function kwargsToObject(arr) {
    const options = {};
    for (const arg of arr) {
        options[arg.name] = options[arg.value];
    }
    return options;
}
exports.kwargsToObject = kwargsToObject;

},{"../Utility/IsInteger":45}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneDeep(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) {
        return obj; // primitive types
    }
    if (hash.has(obj)) {
        return hash.get(obj); // reference to object previously seen
    }
    let result;
    if (obj instanceof Set) {
        result = new Set();
        Array.from(obj, val => result.add(cloneDeep(val, hash)));
    }
    else if (obj instanceof Map) {
        result = new Map();
        Array.from(obj, ([key, val]) => result.add(cloneDeep(key, hash), cloneDeep(val, hash)));
    }
    else if (Array.isArray(obj)) {
        result = Array.from(obj);
    }
    else if (obj instanceof Date) {
        result = new Date(obj);
    }
    else if (obj instanceof RegExp) {
        result = new RegExp(obj.source, obj.flags);
    }
    else if (typeof obj === 'function') {
        // This is awful code, but it's the only way to clone a standalone function (vs a method which has a descriptor).
        // In general, you probably don't want to use cloneDeep on functions. You'll see it's NOT used on internal methods.
        result = new Function('return ' + obj.toString())();
    }
    else if (Object.getPrototypeOf(obj)) {
        result = Object.create(Object.getPrototypeOf(obj));
    }
    else {
        result = Object.create(null);
    }
    hash.set(obj, result); // Keep track of objects previously cloned
    for (const key of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor && descriptor.writable === false) {
            continue;
        }
        if (typeof obj[key] === 'function' && !(key in result)) {
            // Handle methods that aren't in the prototype.
            // This doesn't recursively follow because there's nothing recursive to do.
            if (descriptor) {
                Object.defineProperty(result, key, descriptor);
                hash.set(obj[key], result[key]);
                // NOTE that cloneDeep is NOT called recursively here. It all ends at the method.
                // If extra keys are thrown onto a function, they probably will not be cloned.
                // In my experience, extra keys on functions didn't work right, so no big loss.
            }
        }
        else if (descriptor && (descriptor.get || descriptor.set)) {
            // Handle custom getters/setters. These are local and hopefully work just like methods.
            // In many cases, this is redundant with Object.create(), but is necessary to allow objects with manually-added custom getters.
            Object.defineProperty(result, key, descriptor);
            // NOTE that cloneDeep is NOT called recursively here. It all ends at the getter/setter.
            // ALSO hash not updated; this is not possible, because it will map the value it gets, not the getter.
        }
        else {
            result[key] = cloneDeep(obj[key], hash);
        }
    }
    return result;
}
exports.cloneDeep = cloneDeep;

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// I don't know for sure if this will work in all cases.
// It gets deeper into the guts of JS object than I have experience with.
function cloneObject(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    const result = Object.create(Object.getPrototypeOf(obj));
    for (const key of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
            Object.defineProperty(result, key, descriptor);
        }
    }
    return result;
}
exports.cloneObject = cloneObject;

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtilities_1 = require("../Collections/ArrayUtilities");
/**
 * A pseudo-random prefix plus the number of seconds since the unix epoch. The random part should be random enough to cover
 * multiple ids created in a millisecond.
 */
function getUniqueId() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    let result = 'u' + String(new Date().getTime()) + '-';
    for (const _ of ArrayUtilities_1.range(8)) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
exports.getUniqueId = getUniqueId;

},{"../Collections/ArrayUtilities":33}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tell if a given string is a positive integer.
 * Use for detecting array keys.
 */
function isPositiveIntegerString(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    if (str === '0') {
        return true;
    }
    return /^[1-9]\d*$/.test(str);
}
exports.isPositiveIntegerString = isPositiveIntegerString;

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I don't know how accurate this is but it seems pretty good
 */
function isPrimitive(obj) {
    return Object(obj) !== obj;
}
exports.isPrimitive = isPrimitive;

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CloneObject_1 = require("./CloneObject");
const NoneType_1 = require("../Types/NoneType");
/**
 * Object.assign() can be used for simple copies of properties, but it misses getters,
 * setters, and inherited properties. It only gets the local values.
 *
 * This should hopefully resolve that, but I don't know for sure. This is very sketchy.
 * The results are completely flat, because you can't have multiple inheritance hierarchy
 * in a language without multiple inheritance. Because this flattens objects, it is guaranteed
 * to break anything that makes super calls.
 *
 * If returnClone is true, a clone of the target object will be modified and returned, leaving
 * the original untouched.
 */
function objectFullAssign(target, source, returnClone = false) {
    if (NoneType_1.isNone(target)) {
        target = {};
    }
    if (!source || typeof source !== 'object' || typeof target !== 'object') {
        return target;
    }
    if (returnClone) {
        target = CloneObject_1.cloneObject(target);
    }
    const names = Array.from(new Set(findThePropertyNames(source)));
    for (const key of names) {
        const descriptor = findThePropertyDescriptor(source, key);
        if (descriptor) {
            Object.defineProperty(target, key, descriptor);
        }
    }
    return target;
    function findThePropertyNames(obj) {
        const result = [];
        result.push(...Object.getOwnPropertyNames(obj).filter(f => f !== 'constructor'));
        const proto = Object.getPrototypeOf(obj);
        if (proto && proto.constructor.name !== 'Object') {
            result.push(...findThePropertyNames(proto));
        }
        return result;
    }
    function findThePropertyDescriptor(obj, key) {
        const result = Object.getOwnPropertyDescriptor(obj, key);
        if (result) {
            return result;
        }
        const proto = Object.getPrototypeOf(obj);
        if (proto && proto.constructor.name !== 'Object') {
            return findThePropertyDescriptor(proto, key);
        }
    }
}
exports.objectFullAssign = objectFullAssign;

},{"../Types/NoneType":41,"./CloneObject":43}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9GdWxsLmpzIiwic3JjL0V4dGVuc2lvbkxvYWRlci5qcyIsInNyYy9FeHRlbnNpb25zL0NvbXBvbmVudEV4dGVuc2lvbnMuanMiLCJzcmMvRXh0ZW5zaW9ucy9FbGVtZW50RXh0ZW5zaW9ucy5qcyIsInNyYy9FeHRlbnNpb25zL09ic2VydmFibGVFeHRlbnNpb25zLmpzIiwic3JjL0h0bWwvQ3JlYXRlRWxlbWVudC5qcyIsInNyYy9IdG1sL0RlbGV0ZU5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRmluZEluZGV4SW5QYXJlbnQuanMiLCJzcmMvSHRtbC9Gb3JtRmllbGRWYWx1ZS5qcyIsInNyYy9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdC5qcyIsInNyYy9IdG1sL1ZhbGlkYXRlVW5pcXVlRG9tSWRzLmpzIiwic3JjL0h0bWxDb21wb25lbnQvQm91bmRDb21wb25lbnQuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnQuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRNYXAuanMiLCJzcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lDb21wb25lbnRCaW5kaW5nT3B0aW9ucy5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXIuanMiLCJzcmMvT2JzZXJ2YWJsZS9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnbi5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVCYXNlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3h5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlLmpzIiwic3JjL1JvdXRlci9QYWdlUm91dGVyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlbGF5LmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnkuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lT2JqZWN0LmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZS5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCIuLi9zcmMvRXh0ZW5zaW9uTG9hZGVyXCIpO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBEZWxldGVOb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0RlbGV0ZU5vZGVDb250ZW50XCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBFeHRyYWN0Tm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5jb25zdCBGaW5kSW5kZXhJblBhcmVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0ZpbmRJbmRleEluUGFyZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbC9Gb3JtRmllbGRWYWx1ZVwiKTtcbmNvbnN0IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IFZhbGlkYXRlVW5pcXVlRG9tSWRzXzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvVmFsaWRhdGVVbmlxdWVEb21JZHNcIik7XG5jb25zdCBCb3VuZENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUFzc2lnbl8xID0gcmVxdWlyZShcIi4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVBc3NpZ25cIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJveHlfMSA9IHJlcXVpcmUoXCIuLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJveHlcIik7XG5jb25zdCBPYnNlcnZhYmxlU3RhdGVfMSA9IHJlcXVpcmUoXCIuLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBQYWdlUm91dGVyXzEgPSByZXF1aXJlKFwiLi4vc3JjL1JvdXRlci9QYWdlUm91dGVyXCIpO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2VcIik7XG5jb25zdCBEZWxheV8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vQXN5bmMvRGVsYXlcIik7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIik7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBPcmRlckJ5XzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Db2xsZWN0aW9ucy9PcmRlckJ5XCIpO1xuY29uc3QgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENsb25lRGVlcF8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIik7XG5jb25zdCBDbG9uZU9iamVjdF8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZU9iamVjdFwiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKTtcbihmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vIFRoaXMgaXMgbm90IG1pbmksIGJ1dCBpdCBpcyBldmVyeXRoaW5nIHRoYXQncyBpbiBhbnkgb2YgdGhlIG1pbmktaWNoaWdvXG4gICAgLy8gc2NyaXB0cyBjb21iaW5lZCBpbnRvIG9uZS4gQmVjYXVzZSB0aGVyZSBpcyBhIGJpdCBvZiBvdmVybGFwLCB0aGUgc2l6ZVxuICAgIC8vIGlzIGxlc3MgdGhhbiB0aGUgc2l6ZSBvZiBhbGwgdGhlIG90aGVyIHNjcmlwdHMgcHV0IHRvZ2V0aGVyLCBJRiB5b3Ugd2FudFxuICAgIC8vIGV2ZXJ5dGhpbmcuXG4gICAgLy8gVGhpcyBhbHNvIGNhbiBiZSB1c2VkIGFzIGFuIGVhc3kgdGVtcGxhdGUgaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIG93blxuICAgIC8vIGJ1aWxkLiBKdXN0IGRlbGV0ZSB3aGF0IHlvdSBkb24ndCB3YW50IGFuZCBydW4gdGhlIGd1bHAgc2NyaXB0cy5cbiAgICBjb25zdCBjb21wb25lbnQgPSB7XG4gICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50XzEuQ29tcG9uZW50LFxuICAgICAgICBCb3VuZENvbXBvbmVudDogQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCxcbiAgICAgICAgQ29tcG9uZW50TWFwOiBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAsXG4gICAgICAgIGdldENvbXBvbmVudDogQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50LFxuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHtcbiAgICAgICAgRXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIsXG4gICAgICAgIG9ic2VydmFibGVBc3NpZ246IE9ic2VydmFibGVBc3NpZ25fMS5vYnNlcnZhYmxlQXNzaWduLFxuICAgICAgICBPYnNlcnZhYmxlUHJvcGVydHk6IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSxcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5OiBPYnNlcnZhYmxlUHJveHlfMS5PYnNlcnZhYmxlUHJveHksXG4gICAgICAgIE9ic2VydmFibGVTdGF0ZTogT2JzZXJ2YWJsZVN0YXRlXzEuT2JzZXJ2YWJsZVN0YXRlLFxuICAgICAgICBBcnJheUNoYW5nZWRFdmVudEFyZ3M6IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xLkFycmF5Q2hhbmdlZEV2ZW50QXJncyxcbiAgICAgICAgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzOiBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MsXG4gICAgfTtcbiAgICBjb25zdCBwcm9taXNlID0ge1xuICAgICAgICBEZWZlcnJlZFByb21pc2U6IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZSxcbiAgICAgICAgUmVwZWF0YWJsZVByb21pc2U6IFJlcGVhdGFibGVQcm9taXNlXzEuUmVwZWF0YWJsZVByb21pc2VcbiAgICB9O1xuICAgIGNvbnN0IHJvdXRlciA9IHtcbiAgICAgICAgUGFnZVJvdXRlcjogUGFnZVJvdXRlcl8xLlBhZ2VSb3V0ZXJcbiAgICB9O1xuICAgIGNvbnN0IGh0bWwgPSB7XG4gICAgICAgIGFuY2hvcjogQ3JlYXRlRWxlbWVudF8xLmFuY2hvcixcbiAgICAgICAgYnV0dG9uOiBDcmVhdGVFbGVtZW50XzEuYnV0dG9uLFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudCxcbiAgICAgICAgY3JlYXRlSHRtbDogQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUh0bWwsXG4gICAgICAgIGNyZWF0ZUZyYWdtZW50OiBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQsXG4gICAgICAgIGRlbGV0ZU5vZGVDb250ZW50OiBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50LFxuICAgICAgICBkaXY6IENyZWF0ZUVsZW1lbnRfMS5kaXYsXG4gICAgICAgIGVzY2FwZUh0bWw6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sLFxuICAgICAgICBleHRyYWN0Tm9kZUNvbnRlbnQ6IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCxcbiAgICAgICAgZmluZEluZGV4SW5QYXJlbnQ6IEZpbmRJbmRleEluUGFyZW50XzEuZmluZEluZGV4SW5QYXJlbnQsXG4gICAgICAgIGdldEZvcm1GaWVsZFZhbHVlOiBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlLFxuICAgICAgICBwYXJhZ3JhcGg6IENyZWF0ZUVsZW1lbnRfMS5wYXJhZ3JhcGgsXG4gICAgICAgIG5vZGVMaXN0U2VsZWN0b3I6IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3IsXG4gICAgICAgIG5vZGVMaXN0U2VsZWN0b3JBbGw6IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwsXG4gICAgICAgIHNldEZvcm1GaWVsZFZhbHVlOiBGb3JtRmllbGRWYWx1ZV8xLnNldEZvcm1GaWVsZFZhbHVlLFxuICAgICAgICBzcGFuOiBDcmVhdGVFbGVtZW50XzEuc3BhbixcbiAgICAgICAgdmFsaWRhdGVVbmlxdWVEb21JZHM6IFZhbGlkYXRlVW5pcXVlRG9tSWRzXzEudmFsaWRhdGVVbmlxdWVEb21JZHMsXG4gICAgfTtcbiAgICBjb25zdCBhcnJheSA9IHtcbiAgICAgICAgY2FydGVzaWFuOiBBcnJheVV0aWxpdGllc18xLmNhcnRlc2lhbixcbiAgICAgICAgcmFuZ2U6IEFycmF5VXRpbGl0aWVzXzEucmFuZ2UsXG4gICAgICAgIHRyYXZlcnNlOiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlLFxuICAgICAgICB6aXA6IEFycmF5VXRpbGl0aWVzXzEuemlwXG4gICAgfTtcbiAgICBjb25zdCB1dGlsID0ge1xuICAgICAgICBhcnJheSxcbiAgICAgICAgY2xvbmVEZWVwOiBDbG9uZURlZXBfMS5jbG9uZURlZXAsXG4gICAgICAgIGNsb25lT2JqZWN0OiBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0LFxuICAgICAgICBkZWxheTogRGVsYXlfMS5kZWxheSxcbiAgICAgICAgZ2V0VW5pcXVlSWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQsXG4gICAgICAgIGh0bWwsXG4gICAgICAgIGlzTm9uZTogTm9uZVR5cGVfMS5pc05vbmUsXG4gICAgICAgIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nOiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyxcbiAgICAgICAga3c6IEtleXdvcmRBcmd1bWVudHNfMS5rdyxcbiAgICAgICAgS3dhcmc6IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZyxcbiAgICAgICAgb2JqZWN0RnVsbEFzc2lnbjogT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24sXG4gICAgICAgIG9yZGVyQnk6IE9yZGVyQnlfMS5vcmRlckJ5LFxuICAgIH07XG4gICAgd2luZG93Lm1pNSA9IHdpbmRvdy5taTUgfHwge307XG4gICAgd2luZG93Lm1pNS5jb21wb25lbnQgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUuY29tcG9uZW50IHx8IHt9LCBjb21wb25lbnQpO1xuICAgIHdpbmRvdy5taTUub2JzZXJ2YWJsZSA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5vYnNlcnZhYmxlIHx8IHt9LCBvYnNlcnZhYmxlKTtcbiAgICB3aW5kb3cubWk1LnByb21pc2UgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUucHJvbWlzZSB8fCB7fSwgcHJvbWlzZSk7XG4gICAgd2luZG93Lm1pNS5yb3V0ZXIgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUucm91dGVyIHx8IHt9LCByb3V0ZXIpO1xuICAgIHdpbmRvdy5taTUuaHRtbCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5odG1sIHx8IHt9LCBodG1sKTtcbiAgICB3aW5kb3cubWk1LnV0aWwgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUudXRpbCB8fCB7fSwgdXRpbCk7XG4gICAgLyoqXG4gICAgICogVGhpcyBzbGlnaHRseSBzaW1wbGlmZXMgdGhlIHByb2Nlc3Mgb2YgcmVmZXJlbmNpbmcgbWluaS1pY2hpZ28gY29tcG9uZW50cyB3aXRob3V0IHRoZSBmdWxsIG5hbWVzcGFjZS5cbiAgICAgKiBJdCByZXF1aXJlcyB0d28gYXJndW1lbnRzLCB1bmZvcnR1bmF0ZWx5LCBiZWNhdXNlIGl0J3Mgbm90IHBvc3NpYmxlIGluIG1hbnkgY2FzZXMgdG8gZGV0ZXJtaW5lIHRoZVxuICAgICAqIGNsYXNzIG9yIGZ1bmN0aW9uIG5hbWUuIE9mdGVuIHRoZSAnbmFtZScgcHJvcGVydHkgaGFzIG9ubHkgdGhlIG1pbmlmaWVkIG5hbWUsIGEgcmFuZG9tIGxldHRlci5cbiAgICAgKi9cbiAgICB3aW5kb3cubWk1LnVzaW5nID0gZnVuY3Rpb24gdXNpbmcobGliLCBhbGlhcykge1xuICAgICAgICBpZiAoIWxpYiB8fCAhYWxpYXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTnVsbEFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmV2YWwuY2FsbCh3aW5kb3csICcoZnVuY3Rpb24gKGFyZykgeyB3aW5kb3cuJyArIGFsaWFzICsgJyA9IGFyZzsgfSknKShsaWIpO1xuICAgIH07XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoaXMgc2NyaXB0IGNvbnRhaW5zIGV4dGVuc2lvbnMgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIGZ1bmN0aW9ucyB1c2VkIGJ5IEljaGlnby5cbiAqIEluIHlvdXIgbWFpbiBwcm9jZXNzLCBpbXBvcnQgdGhpcyBzY3JpcHQgKGltcG9ydCAnL3BhdGgvdG8vSWNoaWdvL0ljaGlnb0V4dGVuc2lvbkxvYWRlcicpIHRvIGFkZFxuICogdGhlc2UgZXh0ZW5zaW9ucyB0byBwcm90b3R5cGVzLlxuICovXG5yZXF1aXJlKFwiLi9FeHRlbnNpb25zL09ic2VydmFibGVFeHRlbnNpb25zXCIpO1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9Db21wb25lbnRFeHRlbnNpb25zXCIpO1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9FbGVtZW50RXh0ZW5zaW9uc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9PcHRpb25zL0lDb21wb25lbnRCaW5kaW5nT3B0aW9uc1wiKTtcbmNvbnN0IEJvdW5kQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4uL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmdldENvbXBvbmVudCA9IGZ1bmN0aW9uIF9nZXRDb21wb25lbnQoKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldCh0aGlzKTtcbn07XG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYmluZENvbXBvbmVudCA9IGZ1bmN0aW9uIF9iaW5kKHZpZXdNb2RlbCkge1xuICAgIHJldHVybiBuZXcgQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCh2aWV3TW9kZWwsIG5ldyBJQ29tcG9uZW50QmluZGluZ09wdGlvbnNfMS5FeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyh7IGVsZW1lbnQ6IHRoaXMgfSkpO1xufTtcbkhUTUxFbGVtZW50LnByb3RvdHlwZS5kZWxldGVDb21wb25lbnQgPSBmdW5jdGlvbiBfZGVsZXRlQ29tcG9uZW50KCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldCh0aGlzKTtcbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgYSBjb21wb25lbnQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbi8qKlxuICogU2V0IHRoZSBwYXJlbnQgZm9yIGFuIGVsZW1lbnQgKGpvaW4gdGhlIHBhcmVudCdzIGZhbWlseSBhcyBhIG5ldyBjaGlsZCksIHRoZSBvcHBvc2l0ZSBvZiBhcHBlbmRDaGlsZC4gRmx1ZW50LCBmb3IgY2hhaW5pbmcsIHNvXG4gKiBpdCdzIG5vdCBhIHBlcmZlY3QgYW5hbG9nIChhcHBlbmRDaGlsZCByZXR1cm5zIHRoZSBhcmd1bWVudCB3aGlsZSB0aGlzIHJldHVybnMgdGhlIGV4dGVuZGVkIG9iamVjdCAuLi4gdGhvdWdoIGJvdGggYXJlIHRoZSBjaGlsZCkuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRUb1BhcmVudCA9IGZ1bmN0aW9uIF9hcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBGbHVlbnQgdmVyc2lvbiBvZiBhcHBlbmRDaGlsZCwgd2hpY2ggcmV0dXJucyB0aGUgcGFyZW50LCBub3QgdGhlIGNoaWxkICh0aGUgYXJndW1lbnQpLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGRGbHVlbnQgPSBmdW5jdGlvbiBfYXBwZW5kQ2hpbGRGbHVlbnQoY2hpbGQpIHtcbiAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEFkZCB0aGUgZWxlbWVudCBhZnRlciB0aGUgY3VycmVudCBpdGVtLCBhdCB0aGUgc2FtZSBsZXZlbC4gTm90IGZsdWVudCwgc28gdGhpcyBpcyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGFwcGVuZENoaWxkLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kU2libGluZyA9IGZ1bmN0aW9uIF9hcHBlbmRTaWJsaW5nKG5leHQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChuZXh0KTtcbn07XG4vKipcbiAqIEFkZCB0aGUgZWxlbWVudCBhZnRlciB0aGUgY3VycmVudCBpdGVtLCBhdCB0aGUgc2FtZSBsZXZlbC4gRmx1ZW50LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kU2libGluZ0ZsdWVudCA9IGZ1bmN0aW9uIF9hcHBlbmRTaWJsaW5nRmx1ZW50KG5leHQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG5leHQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogUmVwbGFjZSB0aGUgZWxlbWVudC4gTm90IGZsdWVudCwgc28gdGhpcyBpcyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGFwcGVuZENoaWxkLiBUaGVyZSBpcyBubyBmbHVlbnQgdmVyc2lvbiBiZWNhdXNlXG4gKiB0aGlzIGlzIGRlbGV0aW5nIHRoZSBleHRlbmRlZCBvYmplY3QuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIF9yZXBsYWNlV2l0aChuZXdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWxlbWVudCwgdGhpcyk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuLyoqXG4gKiBTd2FwIHR3byBlbGVtZW50cyBmcm9tIHRoZWlyIHBsYWNlcyBpbiB0aGUgRE9NLCByZXR1cm5pbmcgdGhlIGFyZ3VtZW50LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIF9zd2FwKGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgY29uc3QgZWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBjb25zdCBwbGFjZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBlbGVtZW50UGFyZW50LnJlcGxhY2VDaGlsZChwbGFjZUhvbGRlciwgZWxlbWVudCk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChlbGVtZW50LCB0aGlzKTtcbiAgICBlbGVtZW50UGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLCBwbGFjZUhvbGRlcik7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIGRvY3VtZW50LnJlbW92ZUNoaWxkIHRoYXQgdXNlcyB0aGUgc2FtZSBBUEkgYXMgdGhlIG90aGVyIGZ1bmN0aW9ucyBoZXJlLlxuICogSW5jbHVkZWQgZm9yIHRoZSBzYWtlIG9mIGNvbnNpc3RlbmN5LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuZXh0cmFjdCA9IGZ1bmN0aW9uIF9leHRyYWN0KCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICByZXR1cm4gcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbi8qKlxuICogRmx1ZW50IHZlcnNpb24gb2YgYWRkRXZlbnRMaXN0ZW5lci5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJGbHVlbnQgPSBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lckZsdWVudChldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IHN0eWxlIGFkZGVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkU3R5bGUgPSBmdW5jdGlvbiBfYWRkU3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IGNsYXNzIGFkZGVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiBfYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjbGFzc05hbWVzKSkge1xuICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgIH1cbiAgICAvLyBOZWVkIHRvIGFsc28gYWxsb3cgY2xhc3NlcyBpbiB0aGUgXCJjbGFzczEgY2xhc3MyXCIgZm9ybWF0XG4gICAgZm9yIChjb25zdCBjIG9mIFtdLmNvbmNhdCguLi5jbGFzc05hbWVzXG4gICAgICAgIC5tYXAocSA9PiBxLnNwbGl0KCcgJykpXG4gICAgICAgIC5maWx0ZXIocSA9PiBxKSkpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjcmVhdGVFbGVtZW50IGhlbHBlciBmdW5jdGlvbiBhbmQgYWRkIGl0IHRvIHRoZSBmcmFnbWVudCwgcmV0dXJuaW5nIHRoZSBuZXcgZWxlbWVudC5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjcmVhdGVFbGVtZW50IGhlbHBlciBmdW5jdGlvbiBhbmQgYWRkIGl0IHRvIHRoZSBmcmFnbWVudC4gRmx1ZW50IHZlcnNpb24sIHNvIGl0J3MgZWFzeSB0byBxdWlja2x5IGFkZFxuICogYSBidW5jaCBvZiBlbGVtZW50cyB0byB0aGUgZnJhZ21lbnQuXG4gKi9cbkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnRGbHVlbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudEZsdWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBUYWtlIGEgZG9jdW1lbnQgZnJhZ21lbnQgYW5kIGFkZCBpdHMgY29udGVudHMgdG8gYSBwYXJlbnQgZWxlbWVudC4gQ2Fubm90IGJlIGZsdWVudCBiZWNhdXNlIGF0IHRoaXMgcG9pbnQsIHRoZSBmcmFnbWVudCBpcyBlbXB0eSBhbmRcbiAqIHByZXR0eSB1c2VsZXNzLCBzbyB0aGlzIHJldHVybnMgdGhlIHBhcmVudCBhcmd1bWVudCAoYXMgZ29vZCBhcyBhbnkgb3RoZXIgb3B0aW9uKS5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuYXBwZW5kVG9QYXJlbnQgPSBmdW5jdGlvbiBfYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMpO1xuICAgIHJldHVybiBwYXJlbnQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbi8qKlxuICogUXVpY2tseSBjb252ZXJ0IGFuIG9iamVjdCB0byBhIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuT2JqZWN0LnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4vKipcbiAqIFF1aWNrbHkgY29udmVydCBhIHN0cmluZyB0byBhbiBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBudW1iZXIgdG8gYSBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBib29sIHRvIGEgT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5Cb29sZWFuLnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4vRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgLy8gQWxsb3cgYXR0cmlidXRlcyB0byBiZSBzZW50IG9uIHByb3BlcnRpZXMsIHByb3ZpZGluZyBhIGNsZWFuZXIgaW50ZXJmYWNlLlxuICAgIC8vIEl0IGFsbG93cyB5b3UgdG8gc2VuZCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7YXR0cmlidXRlczogeyBjbGFzczogJ2ZvbycgfX0pIGluc3RlYWQgb2YgY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCwgeyBjbGFzczogJ2ZvbycgfSk7XG4gICAgLy8gQW5vdGhlciBvcHRpb24gaXMgdG8gdXNlIEt3YXJncywgYnV0IG5vdCBldmVyeW9uZSB3YW50cyB0by5cbiAgICBpZiAocHJvcGVydGllcyAmJiAnYXR0cmlidXRlcycgaW4gcHJvcGVydGllcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzIHx8IHt9LCBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBkZWxldGUgcHJvcGVydGllcy5hdHRyaWJ1dGVzO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpKTtcbiAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIERPTSBwcm9wZXJ0aWVzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGF0dHJpYnV0ZXMsIGJlY2F1c2UgaW4gc29tZSBjYXNlcywgdGhleSBvdmVycmlkZSB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIEhUTUwgZnJvbSBhbnkgSFRNTCBlbGVtZW50IHByb3ZpZGVkLlxuICogVXNlIGxpa2UgY29uc3QgZGl2ID0gY3JlYXRlSHRtbDxIVE1MRGl2RWxlbWVudD4oXCI8ZGl2PlNvbWV0aGluZzwvZGl2PlwiKSBvciBjb25zdCBjdXN0b20gPSBjcmVhdGVIdG1sKFwiPHNvbWUtdGFnPjwvc29tZS10YWc+XCIpLlxuICogSWYgbXVsdGlwbGUgZWxlbWVudHMgb3IgYSBwbGFpbiB0ZXh0IHN0cmluZyB3aXRoIG5vIEhUTUwgaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSB3cmFwcGVkIGluIGEgZGl2LCBzbyBpdCBjYW4ga2VlcFxuICogcmV0dXJuaW5nIGFuIEhUTUxFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUh0bWwoaHRtbCwgaW5saW5lID0gZmFsc2UpIHtcbiAgICBsZXQgd3JhcHBlcjtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgIHdyYXBwZXIgPSBzcGFuKChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZXMgPSB3cmFwcGVyLmNoaWxkTm9kZXM7XG4gICAgLy8gTXVsdGlwbGUgbm9kZXMsIHJldHVybiB0aGUgd3JhcHBpbmcgZGl2XG4gICAgLy8gZS5nLiBcIlRoaXMgaXMgYSA8ZW0+dGVzdDwvZW0+XCIgb3IgXCI8ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PlwiXG4gICAgaWYgKG5vZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgLy8gSWYganVzdCBhIHRleHRub2RlIChvciBlbXB0eSksIHJldHVybiBhIHNwYW4uIFRleHQgaXMgaW5jb21wYXRpYmxlIHdpdGggSFRNTEVsZW1lbnQgc28gY2FuJ3QgcmV0dXJuIHRoYXRcbiAgICAvLyBlLmcuIFwiSGVsbG8gd29ybGRcIlxuICAgIGlmICghd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjsgLy8gVGhpcyBpcyBhIHNwYW5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcGFuKHdyYXBwZXIuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFbHNlIHJldHVybiB0aGUgc2luZ2xlIGNoaWxkLlxuICAgIC8vIGUuZy4gXCI8ZGl2PjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+PC9kaXY+XCJcbiAgICByZXR1cm4gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbn1cbmV4cG9ydHMuY3JlYXRlSHRtbCA9IGNyZWF0ZUh0bWw7XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB3aXRoIGFueSBodG1sLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudChodG1sKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICByZXR1cm4gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHdyYXBwZXIpO1xufVxuZXhwb3J0cy5jcmVhdGVGcmFnbWVudCA9IGNyZWF0ZUZyYWdtZW50O1xuZnVuY3Rpb24gZGl2KGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmRpdiA9IGRpdjtcbmZ1bmN0aW9uIHNwYW4oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxTcGFuRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnNwYW4gPSBzcGFuO1xuZnVuY3Rpb24gcGFyYWdyYXBoKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MUGFyYWdyYXBoRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnBhcmFncmFwaCA9IHBhcmFncmFwaDtcbmZ1bmN0aW9uIGFuY2hvcihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBocmVmT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgY29uc3QgdG1wID0gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEFuY2hvckVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIGlmICh0eXBlb2YgaHJlZk9yUHJvcGVydGllcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdG1wLmhyZWYgPSBTdHJpbmcoaHJlZk9yUHJvcGVydGllcyB8fCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB0bXA7XG59XG5leHBvcnRzLmFuY2hvciA9IGFuY2hvcjtcbmZ1bmN0aW9uIGJ1dHRvbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEJ1dHRvbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5idXR0b24gPSBidXR0b247XG4vLyBDb21tb24gcHJpdmF0ZSBmdW5jdGlvbnMgZm9yIG92ZXJsb2Fkcy4gUHJldmVudHMgbG90cyBvZiBjb3B5cGFzdGEuXG4vLyBUaGlzIHdvcmtzIGZvciBldmVyeXRoaW5nIGJlY2F1c2UgVHlwZVNjcmlwdCBpcyBrZWVwaW5nIHRoZSB0eXBlcyB2YWxpZC4gSW4gcHVyZSBKUywgYnVncyBjb3VsZCBiZSBjcmVhdGVkIChmb3IgZXhhbXBsZSwgcGFzc2luZyBhbiBpbm5lclxuLy8gZWxlbWVudCB0byBhIHBhcmFncmFwaCAuLi4gZGlzYWxsb3dlZCBieSBUUyBidXQgdGhlIGNvZGUgaXMgdGhlcmUgaW4gdGhlIEpTKVxuZnVuY3Rpb24gX2ludGVybmFsKHR5cGUsIGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoaHRtbE9yUHJvcGVydGllcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfb3ZyMSh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGh0bWxPclByb3BlcnRpZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIzKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9vdnIyKHR5cGUsIFN0cmluZyhodG1sT3JQcm9wZXJ0aWVzIHx8ICcnKSwgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX292cjEodHlwZSwgaW5uZXJFbGVtZW50LCBwcm9wcywgYXR0cnMpIHtcbiAgICBjb25zdCBlID0gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xuICAgIGUuYXBwZW5kQ2hpbGQoaW5uZXJFbGVtZW50KTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIF9vdnIyKHR5cGUsIGlubmVySHRtbCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBpbm5lckh0bWw7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbmZ1bmN0aW9uIF9vdnIzKHR5cGUsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gcHJvcHMuaW5uZXJIVE1MIHx8ICcnO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGVsZXRlIHRoZSBjb250ZW50cyBvZiBhbnkgaHRtbCBub2RlLlxuICovXG5mdW5jdGlvbiBkZWxldGVOb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xufVxuZXhwb3J0cy5kZWxldGVOb2RlQ29udGVudCA9IGRlbGV0ZU5vZGVDb250ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgaGVscGVyIGZvciBDcmVhdGVFbGVtZW50LCByb3VnaGx5IG1hcHBpbmcgdG8gSHRtbEVsZW1lbnQgdHlwZXMsIGJ1dCBub3QgcGVyZmVjdGx5IGJlY2F1c2UgaXQncyBpbXBvc3NpYmxlXG4gKiAodGhlcmUncyBubyBwZXJmZWN0IDE6MSByZWxhdGlvbnNoaXApLlxuICovXG52YXIgZWxlbWVudFR5cGU7XG4oZnVuY3Rpb24gKGVsZW1lbnRUeXBlKSB7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQW5jaG9yRWxlbWVudFwiXSA9IFwiYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFyZWFFbGVtZW50XCJdID0gXCJhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXVkaW9FbGVtZW50XCJdID0gXCJhdWRpb1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJSRWxlbWVudFwiXSA9IFwiYnJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCYXNlRm9udEVsZW1lbnRcIl0gPSBcImJhc2Vmb250XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmxvY2tRdW90ZUVsZW1lbnRcIl0gPSBcImJsb2NrcXVvdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCdXR0b25FbGVtZW50XCJdID0gXCJidXR0b25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxDYW52YXNFbGVtZW50XCJdID0gXCJjYW52YXNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhRWxlbWVudFwiXSA9IFwiZGF0YVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFMaXN0RWxlbWVudFwiXSA9IFwiZGF0YWxpc3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaWFsb2dFbGVtZW50XCJdID0gXCJkaWFsb2dcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaXZFbGVtZW50XCJdID0gXCJkaXZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxETGlzdEVsZW1lbnRcIl0gPSBcImRsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRW1iZWRFbGVtZW50XCJdID0gXCJlbWJlZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZpZWxkU2V0RWxlbWVudFwiXSA9IFwiZmllbGRzZXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGb3JtRWxlbWVudFwiXSA9IFwiZm9ybVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcxRWxlbWVudFwiXSA9IFwiaDFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMkVsZW1lbnRcIl0gPSBcImgyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzNFbGVtZW50XCJdID0gXCJoM1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc0RWxlbWVudFwiXSA9IFwiaDRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNUVsZW1lbnRcIl0gPSBcImg1XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzZFbGVtZW50XCJdID0gXCJoNlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhSRWxlbWVudFwiXSA9IFwiaHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbWFnZUVsZW1lbnRcIl0gPSBcImltYWdlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW5wdXRFbGVtZW50XCJdID0gXCJpbnB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExhYmVsRWxlbWVudFwiXSA9IFwibGFiZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMZWdlbmRFbGVtZW50XCJdID0gXCJsZWdlbmRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMSUVsZW1lbnRcIl0gPSBcImxpXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGlua0VsZW1lbnRcIl0gPSBcImxpbmtcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNYXBFbGVtZW50XCJdID0gXCJtYXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNZXRlckVsZW1lbnRcIl0gPSBcIm1ldGVyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kRGVsRWxlbWVudFwiXSA9IFwiZGVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kSW5zRWxlbWVudFwiXSA9IFwiaW5zXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT0xpc3RFbGVtZW50XCJdID0gXCJvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9iamVjdEVsZW1lbnRcIl0gPSBcIm9iamVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdEdyb3VwRWxlbWVudFwiXSA9IFwib3B0Z3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRpb25FbGVtZW50XCJdID0gXCJvcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPdXRwdXRFbGVtZW50XCJdID0gXCJvdXRwdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhZ3JhcGhFbGVtZW50XCJdID0gXCJwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYW1FbGVtZW50XCJdID0gXCJwYXJhbVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBpY3R1cmVFbGVtZW50XCJdID0gXCJwaWN0dXJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJlRWxlbWVudFwiXSA9IFwicHJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJvZ3Jlc3NFbGVtZW50XCJdID0gXCJwcm9ncmVzc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFF1b3RlRWxlbWVudFwiXSA9IFwicVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNjcmlwdEVsZW1lbnRcIl0gPSBcInNjcmlwdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNlbGVjdEVsZW1lbnRcIl0gPSBcInNlbGVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNvdXJjZUVsZW1lbnRcIl0gPSBcInNvdXJjZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNwYW5FbGVtZW50XCJdID0gXCJzcGFuXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3R5bGVFbGVtZW50XCJdID0gXCJzdHlsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnRcIl0gPSBcImNhcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFwiXSA9IFwidGRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50XCJdID0gXCJ0aFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sRWxlbWVudFwiXSA9IFwiY29sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xHcm91cEVsZW1lbnRcIl0gPSBcImNvbGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVFbGVtZW50XCJdID0gXCJ0YWJsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlUm93RWxlbWVudFwiXSA9IFwidHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Cb2R5RWxlbWVudFwiXSA9IFwidGJvZHlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Gb290ZXJFbGVtZW50XCJdID0gXCJ0Zm9vdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkhlYWRlckVsZW1lbnRcIl0gPSBcInRoZWFkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGVtcGxhdGVFbGVtZW50XCJdID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRleHRBcmVhRWxlbWVudFwiXSA9IFwidGV4dGFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUaW1lRWxlbWVudFwiXSA9IFwidGltZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRyYWNrRWxlbWVudFwiXSA9IFwidHJhY2tcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxVTGlzdEVsZW1lbnRcIl0gPSBcInVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVmlkZW9FbGVtZW50XCJdID0gXCJ2aWRlb1wiO1xufSkoZWxlbWVudFR5cGUgPSBleHBvcnRzLmVsZW1lbnRUeXBlIHx8IChleHBvcnRzLmVsZW1lbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChpbnB1dCkge1xuICAgIC8vIFRoZXJlIGlzbid0IGEgYnVpbHQtaW4gd2F5IHRvIGRvIHRoaXMsIHN0aWxsLCBzbyB3ZSBuZWVkIGEgaGVscGVyIGZ1bmN0aW9uLlxuICAgIC8vIFRoZSBhcnRpY2xlIFwiWW91IGFyZSBwcm9iYWJseSBtaXN1c2luZyBET00gdGV4dCBtZXRob2RzXCIgY29udmluY2VkIG1lIHRvIGRvIGl0IHRoaXMgd2F5LFxuICAgIC8vIHZzLiBjcmVhdGVUZXh0Tm9kZS4gVGhvdWdoIGNyZWF0ZVRleHROb2RlIHdvdWxkIHByb2JhYmx5IHdvcmsgZmluZSBmb3Igc2V0dGluZyBpbm5lckhUTUwuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGVzY2FwZXMgPSB7XG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICAgICAgXCI9XCI6IFwiJiN4M0Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXG4gICAgICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gICAgfTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBzID0+IGVzY2FwZXNbc10pO1xufVxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUgYXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xufVxuZXhwb3J0cy5leHRyYWN0Tm9kZUNvbnRlbnQgPSBleHRyYWN0Tm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGZpbmRJbmRleEluUGFyZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmluZGV4T2YoZWxlbWVudCk7XG4gICAgfVxufVxuZXhwb3J0cy5maW5kSW5kZXhJblBhcmVudCA9IGZpbmRJbmRleEluUGFyZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogSFRNTCBpcyBpbmNvbnNpc3RlbnQuIEdldHRpbmcgdGhlIHZhbHVlIG9mIGZvcm0gZmllbGRzIGlzIGEgYml0IGNvbXBsaWNhdGVkLCBub3QgYWx3YXlzIGVsZW1lbnQudmFsdWUsXG4gKiBzbyBoZXJlJ3MgYSBoZWxwZXIgdG8gbWFrZSBpdCBlYXNpZXIuXG4gKi9cbmZ1bmN0aW9uIGdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpIHtcbiAgICAvLyBJdCB3b3VsZCBiZSByZWFsbHkgbmljZSBhdCB0aGlzIHBvaW50IGlmIEpTIGNvdWxkIHNlZSBnZW5lcmljIHBhcmFtZXRlcnMuXG4gICAgLy8gSWYgaXQgY291bGQsIHRoZW4gdGhlIGNvZGUgY291bGQgc2F5IFwiaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgJiYgVE91dHB1dCAhPT0gYm9vbGVhbikgdGhyb3cgbmV3IEVycm9yKClcIlxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDaGVja2JveFZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldE51bWJlcklucHV0VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJhZGlvVmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0VmFsdWUoZWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Rm9ybUZpZWxkVmFsdWUgPSBnZXRGb3JtRmllbGRWYWx1ZTtcbmZ1bmN0aW9uIGdldENoZWNrYm94VmFsdWUoaW5wdXQpIHtcbiAgICByZXR1cm4gISFpbnB1dC5jaGVja2VkO1xufVxuZXhwb3J0cy5nZXRDaGVja2JveFZhbHVlID0gZ2V0Q2hlY2tib3hWYWx1ZTtcbmZ1bmN0aW9uIGdldE51bWJlcklucHV0VmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihpbnB1dC52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXROdW1iZXJJbnB1dFZhbHVlID0gZ2V0TnVtYmVySW5wdXRWYWx1ZTtcbmZ1bmN0aW9uIGdldFJhZGlvVmFsdWUoaW5wdXQpIHtcbiAgICAvLyBSYWRpbyBidXR0b25zIGFyZSB3ZWlyZC4gV2Ugd2FudCB0aGVtIHRvIGFwcGVhciB0byBiZSBtb3JlIG5vcm1hbC5cbiAgICBpZiAoaW5wdXQubmFtZSkge1xuICAgICAgICByZXR1cm4gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9XCIke2lucHV0Lm5hbWV9XCJdOmNoZWNrZWRgKSB8fCB7fSkudmFsdWU7XG4gICAgfVxuICAgIC8vIElmIG5vIG5hbWUsIGZhbGwgYmFjayB0byB0aGlzXG4gICAgaWYgKGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0UmFkaW9WYWx1ZSA9IGdldFJhZGlvVmFsdWU7XG5mdW5jdGlvbiBnZXRTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICBpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiBnZXRNdWx0aVNlbGVjdFZhbHVlKHNlbGVjdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZWN0LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U2VsZWN0VmFsdWUgPSBnZXRTZWxlY3RWYWx1ZTtcbmZ1bmN0aW9uIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2VsZWN0LnNlbGVjdGVkT3B0aW9ucykuZmlsdGVyKGYgPT4gZi52YWx1ZSkubWFwKG0gPT4gbS52YWx1ZSk7XG59XG5leHBvcnRzLmdldE11bHRpU2VsZWN0VmFsdWUgPSBnZXRNdWx0aVNlbGVjdFZhbHVlO1xuLy8gVGhpcyBpcyBhbG1vc3QgcG9pbnRsZXNzLiBKdXN0IGhlcmUgZm9yIGNvbnNpc3RlbmN5LlxuZnVuY3Rpb24gZ2V0U2ltcGxlRm9ybVZhbHVlKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgaWYgKGlucHV0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCB2YWxpZCBmb3IgbXVsdGktc2VsZWN0cycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbn1cbmV4cG9ydHMuZ2V0U2ltcGxlRm9ybVZhbHVlID0gZ2V0U2ltcGxlRm9ybVZhbHVlO1xuLyoqXG4gKiBTZXR0aW5nIHZhbHVlcyBpcyBqdXN0IGFzIGNvbXBsaWNhdGVkIGFzIGdldHRpbmcgdGhlbSwgYmVjYXVzZSBIVE1MIGlzIGluY29uc2lzdGVudC4gWW91IGNhbid0IGp1c3Qgc2F5IGVsZW1lbnQudmFsdWUgPSBmb28uXG4gKiBIZXJlJ3MgYSBoZWxwZXIgdG8gbWFrZSBpdCBlYXNpZXIuXG4gKi9cbmZ1bmN0aW9uIHNldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgLy8gSGVyZSB5b3UgY2FuIHZhbGlkYXRlIHRoZSB0eXBlIGJlZm9yZSBzZXR0aW5nIG9yIGRvIHNvbWUga2luZCBvZiBjb252ZXJzaW9uLlxuICAgIC8vIEZvciBtdWx0aS1zZWxlY3RzLCBjYW4gYXV0by13cmFwIHZhbHVlIGluIHN0cmluZy5cbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTsgLy8gdXNlZCBpbiBtb3N0IG9mIHRoZSBjYXNlc1xuICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gdmFsdWUgPT09IHRydWUgfHwgc3RyaW5nVmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBzdHJpbmdWYWx1ZSA9PT0gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0b0RhdGVTdHJpbmcobmV3IERhdGUoc3RyaW5nVmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZXRpbWUnIHx8IHR5cGUgPT09ICdkYXRldGltZS1sb2NhbCcpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc3RyaW5nVmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gYCR7dG9EYXRlU3RyaW5nKGRhdGUpfVQke3RvVGltZVN0cmluZyhkYXRlKX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IEFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpO1xuICAgICAgICBpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlOyAvLyB0cmVhdGluZyBpdCBsaWtlIGEgbm9uLW11bHRpcGxlIHdvcmtzXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm9uZXhpc3RlbnQgb3B0aW9ucyBjYW5ub3QgYmUgc2V0LiBXZSBzaG91bGQgbGV0IHRoZSBwcm9ncmFtbWVyIGtub3cuIEV2ZW4gdGhvdWdoIHRoaXMgdGFrZXMgQ1BVIGN5Y2xlcy5cbiAgICAgICAgICAgIHZhbHVlLm1hcChtID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCBtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHQgb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9wdC5zZWxlY3RlZCA9IHZhbHVlLm1hcChtID0+IG0udG9TdHJpbmcoKSkuaW5kZXhPZihvcHQudmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZWxlY3QudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICBlbGVtZW50LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oYENhbGxlZCBzZXRGb3JtRmllbGRWYWx1ZSBvbiBub24tZm9ybSBmaWVsZCAke2VsZW1lbnQudGFnTmFtZX0gJHtlbGVtZW50LmlkIHx8ICcnfWApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja09wdGlvbihvcHRpb25zLCB2YWwpIHtcbiAgICAgICAgLy8gSWYgeW91IHNldCB0aGUgdmFsdWUgb2YgYSBzZWxlY3QgdG8gc29tZXRoaW5nIHRoYXQgaXMgbm90IGFuIGF2YWlsYWJsZSBvcHRpb24sIG5vdGhpbmcgd2lsbCBoYXBwZW4uXG4gICAgICAgIGNvbnN0IGhhc09wdGlvbiA9IG9wdGlvbnMubWFwKG0gPT4gbS52YWx1ZSkuaW5kZXhPZih2YWwudG9TdHJpbmcoKSkgPiAtMTtcbiAgICAgICAgaWYgKCFoYXNPcHRpb24pIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENhbGxlZCBzZXRGb3JtRmllbGRWYWx1ZSB3aXRoIG5vbmV4aXN0ZW50IG9wdGlvbiAke3ZhbC50b1N0cmluZygpfSBvbiBzZWxlY3QgJHtlbGVtZW50LmlkfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZXNlIGNvdWxkIGJlIHJlYWRhYmxlIG9uZWxpbmVycyBpZiB3ZSBoYWQgcGFkU3RhcnQoKSBidXQgaXQncyBub3Qgd29ydGggYnVtcGluZyB0byBFUzIwMTcgZm9yIG9uZSBtZXRob2RcbiAgICBmdW5jdGlvbiB0b0RhdGVTdHJpbmcoZGF0ZSkge1xuICAgICAgICBpZiAoIWlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vbnRoID0gKCcwJyArIChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgICAgIGNvbnN0IGRheSA9ICgnMCcgKyBkYXRlLmdldFVUQ0RhdGUoKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHtkYXRlLmdldFVUQ0Z1bGxZZWFyKCl9LSR7bW9udGh9LSR7ZGF5fWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvVGltZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaG91ciA9ICgnMCcgKyBkYXRlLmdldEhvdXJzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgbWludXRlID0gKCcwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHtob3VyfToke21pbnV0ZX1gO1xuICAgIH1cbn1cbmV4cG9ydHMuc2V0Rm9ybUZpZWxkVmFsdWUgPSBzZXRGb3JtRmllbGRWYWx1ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBIZXJlJ3MgYSBoZWxwZXIgZm9yIG9uZSBvZiB0aGUgcGxhY2VzIHdoZXJlIEhUTUw1IGZhbGxzIG92ZXIuIElmIHlvdSBnZXQgc29tZSBodG1sIGxpa2UgPGRpdiBpZD1cIjFcIj48L2Rpdj48ZGl2IGlkPVwiMlwiPjwvZGl2PiwgaXQgYmVjb21lc1xuICogYSBOb2RlTGlzdC4gSFRNTDUgYnkgZGVmYXVsdCBkb2VzIG5vdCBwcm92aWRlIGEgd2F5IHRvIHNlYXJjaCB0aGlzIGZvciBhIHNlbGVjdG9yLlxuICovXG5mdW5jdGlvbiBub2RlTGlzdFNlbGVjdG9yKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2g7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3IgPSBub2RlTGlzdFNlbGVjdG9yO1xuLyoqXG4gKiBIZXJlJ3MgYSBoZWxwZXIgZm9yIG9uZSBvZiB0aGUgcGxhY2VzIHdoZXJlIEhUTUw1IGZhbGxzIG92ZXIuIElmIHlvdSBnZXQgc29tZSBodG1sIGxpa2UgPGRpdiBpZD1cIjFcIj48L2Rpdj48ZGl2IGlkPVwiMlwiPjwvZGl2PiwgaXQgYmVjb21lc1xuICogYSBOb2RlTGlzdC4gSFRNTDUgYnkgZGVmYXVsdCBkb2VzIG5vdCBwcm92aWRlIGEgd2F5IHRvIHNlYXJjaCB0aGlzIGZvciBhIHNlbGVjdG9yLlxuICovXG5mdW5jdGlvbiBub2RlTGlzdFNlbGVjdG9yQWxsKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIC8vIEJlY2F1c2UgdGhlIGJyb3dzZXIgY2FuIGxvc2UgcmVmZXJlbmNlcyB3aGVuIG1vdmluZyBub2RlcywgdGhpcyBjYW4gYWxzbyB0YWtlIGEgcmVndWxhciBhcnJheS5cbiAgICAvLyBCZWNhdXNlIEhUTUw1IGhhcyB0b3RhbGx5IGZhbGxlbiBvdmVyLCBpdCdzIG5vdCBwb3NzaWJsZSBmb3IgdGhlIGZpeGVkIG5vZGVMaXN0U2VsZWN0b3JBbGxcbiAgICAvLyB0byBtYXRjaCB0aGUgb3V0cHV0IHNpZ25hdHVyZSBvZiBxdWVyeVNlbGVjdG9yQWxsIChOb2RlTGlzdE9mPEVsZW1lbnQ+IGluc3RlYWQgb2YgYXJyYXkpLlxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKCEoJ21hdGNoZXMnIGluIG5vZGUpKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IHRleHQgbm9kZXNcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLkFycmF5LmZyb20oc2VhcmNoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5ub2RlTGlzdFNlbGVjdG9yQWxsID0gbm9kZUxpc3RTZWxlY3RvckFsbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJZiB0aGUgZG9jdW1lbnQgY29udGFpbnMgYW55IGR1cGxpY2F0ZSBJRHMsIHRocm93IGFuIGV4Y2VwdGlvbi5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVVbmlxdWVEb21JZHMoKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGZvbyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqW2lkXScpKSB7XG4gICAgICAgIGlkcy5hZGQoZm9vLmlkKTtcbiAgICAgICAgaSsrO1xuICAgICAgICBpZiAoaWRzLnNpemUgIT09IGkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIERPTSBJRHMgZm91bmQuIFRoZSBmaXJzdCBkdXBsaWNhdGUgaWQgaXMgJHtmb299LmApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVVuaXF1ZURvbUlkcyA9IHZhbGlkYXRlVW5pcXVlRG9tSWRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2ktdicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaS12JywgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICB0aGlzLl9hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gb3B0aW9ucy5kZWZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgLy8gRGVmaW5lZCB0aGUgZGVmYXVsdCBjb21wb25lbnQgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IGxvb3BQb3N0UHJvY2VzcygpIG1ldGhvZFxuICAgICAgICBpZiAob3B0aW9ucy5sb29wSXRlbUNsYXNzKSB7XG4gICAgICAgICAgICBpZiAoIUNvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb29wSXRlbUNsYXNzIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShvcHRpb25zLmxvb3BJdGVtQ2xhc3MgaW5zdGFuY2VvZiBCb3VuZENvbXBvbmVudC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGFuIGJvdW5kIGNvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MgPSBvcHRpb25zLmxvb3BJdGVtQ2xhc3MgfHwgQm91bmRDb21wb25lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCk7XG4gICAgICAgIHRoaXMuc2V0VGVtcGxhdGUodGhpcy5jb250ZW50LmlubmVySFRNTCk7IC8vIElubmVySFRNTCBpcyBjdXJyZW50bHkgb25seSBwYXJzZWQgYW5kIHRoZW4gdGhlIG9yaWdpbmFsIHRleHQgaXMgdGhyb3duIGF3YXkuXG4gICAgICAgIC8vIEF1dG8tYWRkIHN1YnNjcmlwdGlvbnMgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMub2JzZXJ2ZVZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGd0IG9mIG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUodGd0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcigpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0b3IgaW5pdGlhbGl6YXRpb24gaXMgZG9uZS5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKiBUbyByZXBsYWNlIHRoZSBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogSW4gYWxtb3N0IGV2ZXJ5IGNhc2UsIHZpZXdNb2RlbCBzaG91bGQgYmUgc2V0LiBCdXQgaXQncyBub3QgcG9zc2libGUgdG8gY2hhbmdlIHRoYXQgYW5kIHN0aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgYmFzZVxuICAgICAqIGNsYXNzIGluamVjdCgpLiBUaGlzIGlzIGEgdHlwZXNjcmlwdC1vbmx5IGlzc3VlIGJ1dCBpdCBtYWtlcyB0aGluZ3MgdWdseS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuIEFuZCBwcmFjdGljYWxseSBkZW1hbmRzIHRoZWlyIHVzZSB0byBzZXQgdmlld01vZGVsLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQm91bmRDb21wb25lbnQoZWxlbWVudCwgdmlld01vZGVsLCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Cb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbCB0byBpbmplY3QoKSB3aXRoIGEgY2xlYW5lciBhcmd1bWVudCBvcmRlci5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0QmluZCh2aWV3TW9kZWwsIHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKTtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIHZpZXdNb2RlbCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAvLyBXQVJOOiBUaGlzIGNhc3QgbWF5IG5vdCBiZSB0cnVlLiBUaGVyZSdzIG5vIHdheSB0byBjaGVjayB0aGF0IHRoZSB0YWdzIG1hdGNoLlxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgb3B0KTtcbiAgICB9XG4gICAgd3JpdGUoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIGNhc2VzIHdoZXJlIHZhbHVlIGlzIHVuZGVmaW5lZC4gRWl0aGVyIHRoZSBlbGVtZW50IGlzIG5vdCBhIGZvcm0gZWxlbWVudCBvciBpdCdzIGFuIHVubmFtZWQgcmFkaW8gYnV0dG9uXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IHNlbGVjdGVkLiBJbiBib3RoIGNhc2VzLCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSB0aGUgbW9kZWwgd2l0aCB1bmRlZmluZWQsIHdoaWNoIGlzIHVzZWxlc3MuXG4gICAgICAgIC8vIFRPRE86IElzIHRoaXMganVzdGlmaWNhdGlvbiB2YWxpZD9cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXQVJOOiBDYW5ub3QgdHlwZSBjaGVjayB0aGlzIGR5bmFtaWNhbGx5LiBUeXBlU2NyaXB0IGlzIGJ1aWxkLXRpbWUgY2hlY2tpbmcgb25seS4gUnVudGltZSBjb2RlIGNhbid0IGV2ZW4gc2VlIHRoZSB0eXBlLlxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB0byBiZSBwcmVjaXNlLCBhbGwgcHJvcGVydGllcyBpbiBfd3JpdGVCaW5kaW5ncyBzaG91bGQgYmUgRm9ybUl0ZW1WYWx1ZSwgYnV0IGFzIF93cml0ZUJpbmRpbmdzIGlzIHBvcHVsYXRlZFxuICAgICAgICAvLyB2aWEgc3RyaW5nLCB0aGVyZSdzIG5vIHdheSB0byBlbmZvcmNlIHRoYXQuIFNvIGlmIHlvdSBmaWxsIGEgc3RyaW5nIHZhbHVlIGZyb20gYSBtdWx0aXBsZSBzZWxlY3QsIGl0J2xsIHByb2R1Y2UgYnVncy5cbiAgICAgICAgLy8gU28gYmUgY2FyZWZ1bC4gSXQncyBvbiB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYmluZCBvZiB0aGlzLl93cml0ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGlmIChiaW5kLnN0YXJ0c1dpdGgoJ3RoaXMuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW2JpbmRdO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzW2JpbmRdID0gdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIHZpZXcgbW9kZWwgaXMgZWl0aGVyIEZvcm1GaWVsZFZhbHVlIG9yIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBvbmUuXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGhpcy52aWV3TW9kZWwsICgpID0+IHRoaXMudmlld01vZGVsID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIG9ic2VydmFibGUgc3RhdGUsIHdlIG5lZWQgdG8gZ2V0IHRoZSBzdGF0ZSwgdXBkYXRlIGl0LCBhbmQgd3JpdGUgdGhlIHdob2xlIHRoaW5nIGJhY2suXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoaWxlIGl0IGlzIHBvc3NpYmxlIHRvIHVwZGF0ZSBhIHNpbmdsZSBwcm9wZXJ0eSBpbiBzb21lIGNhc2VzLCBpdCBkb2Vzbid0IGFsbG93IHJldXNlIG9mIGFscmVhZHktd29ya2luZyBjb2RlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZpZXdNb2RlbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG1wW2JpbmRdO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gdG1wW2JpbmRdID0gdmFsdWUsIHRtcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdG1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy52aWV3TW9kZWxbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzLnZpZXdNb2RlbFtiaW5kXSA9IHZhbHVlLCB0aGlzLnZpZXdNb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlVmFsdWUodGFyZ2V0LCB3cml0ZVRvUHJvcGVydHksIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRvIGJlIGZsZXhpYmxlLCBiZWNhdXNlIGlmIHRhcmdldCBpcyBhIHZhbHVlIHR5cGUgb3IgaW1tdXRhYmxlLCB3cml0aW5nXG4gICAgICAgICAgICAvLyBpdCBkaXJlY3RseSByZXBsYWNlcyBvbmx5IHRoZSB2YWx1ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBtb2RlbC5cbiAgICAgICAgICAgIHdyaXRlVG9Qcm9wZXJ0eSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byB0aGUgbW9kZWwgcGFzc2VkIGluLCBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi5cbiAgICAgKi9cbiAgICBvYnNlcnZlKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmIChJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhtb2RlbCkpIHtcbiAgICAgICAgICAgIG1vZGVsLnN1YnNjcmliZSh0aGlzLnJlbmRlciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byBhbGwgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIGZvdW5kIGluIHRoZSBtb2RlbCBwYXNzZWQgaW4sXG4gICAgICogb3IgdGhlIHZpZXcgbW9kZWwgaWYgbm9uZSBwYXNzZWQgaW4uIFRoaXMgb25seSBnb2VzIG9uZSBsZXZlbCBkZWVwLCBzbyBpdFxuICAgICAqIHdvbid0IHBpY2sgdXAgbmVzdGVkIG9iamVjdHMsIGJ1dCBpdCdzIHByb2JhYmx5IGdvb2QgZW5vdWdoIGluIDYwJSBvZiBjYXNlcy5cbiAgICAgKi9cbiAgICBvYnNlcnZlQWxsKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbCk7XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtb2RlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbFttXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gU2VlIGlmIHdlIG5lZWQgdG8gZGVmZXIgcmVuZGVyaW5nIHVudGlsIGFmdGVyIGluaXRpYWxpemF0aW9uXG4gICAgICAgIGlmICh0aGlzLl9kZWZlciAmJiAhdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYm9vbCkge1xuICAgICAgICAgICAgICAgIC8vIEZvciBib29sZWFuIGF0dHJpYnV0ZXMsIHRoZSB2ZXJ5IGV4aXN0ZW5jZSBvZiB0aGUgYXR0cmlidXRlIG1lYW5zIGl0IGlzIGNvbnNpZGVyZWQgdG8gYmUgdHJ1ZS5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gISF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUsIHRoaXMuX2dldFN0cmluZ1ZhbHVlKGl0ZW0uc291cmNlKSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAvLyBDYWxscyBzZXRGb3JtRmllbGRWYWx1ZSBiZWhpbmQgdGhlIHNjZW5lcy5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fdmFsdWVBdHRyaWJ1dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzQ2xhc3NlcykgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMpIHtcbiAgICAgICAgICAgIC8vIElmIHRydXRoeSwgYWRkIGNsYXNzLCBlbHNlIGRlbGV0ZSBpdC5cbiAgICAgICAgICAgIGxldCB2YWwgPSAhIXRoaXMuX2dldFVudHlwZWRWYWx1ZShpdGVtLnNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHRoaXMuX2Nzc1N0eWxlKSB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5jc3NUZXh0ID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCAmJiAhdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW52YWxpZCBzdHlsZSB0ZXh0IGluIGNvbXBvbmVudDogJHt2YWx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZXJhYmxlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2xvb3Auc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVyYWJsZSAmJiB0eXBlb2YgaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLl9sb29wLmZyYWdtZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXMgc29vbiBhcyB3ZSBhZGQgdGhlIGNsb25lIHRvIGNvbnRlbnQsIGNoaWxkTm9kZXMgbG9zZXMgcmVmZXJlbmNlIHRvIGl0cyBjaGlsZCBub2Rlcywgc28gY29weSBpdC5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGNsb25lLmNoaWxkTm9kZXMpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wLnBvc3RQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb3BQb3N0UHJvY2Vzcyhyb3csIG5vZGVzLCBpdGVyYWJsZSwgcHJldmlvdXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzRGlzcGxheSkge1xuICAgICAgICAgICAgLy8gSWYgZmFsc3ksIHNldCBkaXNwbGF5OiBub25lIChzYXZpbmcgcHJldmlvdXMgdmFsdWUpLiBJZiB0cnV0aHksIHJlc3RvcmUgcHJldmlvdXMgdmFsdWUgKGlmIGJsb2NrLCBmbGV4LCBidXQgbm90IGlmIG5vbmUpXG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2Nzc0Rpc3BsYXkuc291cmNlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5Lm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCB0aGlzLl9wcmV2aW91c0Nzc0Rpc3BsYXlTZXR0aW5nIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgPSB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGVtcGxhdGUodGVtcGxhdGVUZXh0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgdXBkYXRlIHBhcmFtIHNob3VsZCBub3QgYmUgc2V0LlxuICAgICAgICBpZiAodXBkYXRlICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgc2hvdWxkIG5vdCBiZSB0cnVlIHdoZW4gY2FsbGVkIGludGVybmFsbHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2Ugd2UncmUgY3JlYXRpbmcgYW4gZWxlbWVudCB0aGF0J3Mgbm90IG9uIHRoZSBwYWdlLCB3ZSBwcm9iYWJseSBjb3VsZCBhdm9pZCB1c2luZyBhIGZyYWdtZW50LFxuICAgICAgICAvLyBidXQgdGhpcyBpcyB3aGF0IGZyYWdtZW50cyBhcmUgZm9yLlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlVGV4dDtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHVzZWQgdG8gcmVwbGFjZSB0aGUgZXhpc3RpbmcgdGVtcGxhdGUsIHdlIG5lZWQgdG8gd2lwZSBvdXQgdGhlIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gV29ya2luZyBvbiBhIGNsb25lIGhlcmUsIHNvIHdlIGRvbid0IHNlZSB0aGUgYm9keSBiZWluZyBidWlsdCBzdGVwIGJ5IHN0ZXAgaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpLXYnKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhIHBvc3NpYmxlIGVycm9yIHNjZW5hcmlvOiBBdHRyaWJ1dGUgZG9lcyBub3QgaGF2ZSBhIG5hbWUgYnV0IGNvbnRhaW5zIHBvc3NpYmx5IG5hbWVkIGktdiB0YWdzLlxuICAgICAgICAgICAgLy8gSXQncyBvbmx5IFwicG9zc2libGVcIiBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyIHJlYXNvbnMgZm9yIGl0IChzdWNoIGFzICdkaXNhYmxlZCcpLlxuICAgICAgICAgICAgLy8gVG8gdHJ5IGFuZCBmaWx0ZXIgb3V0IHRoZSBvYnZpb3VzIGNhc2VzLCBzdWNoIGFzIGNsYXNzIGFuZCBzdHlsZSwgZG9uJ3QgY291bnQgbm9uLWJvb2xlYW4gYXR0cmlidXRlcyB0aGF0IGhhdmUgdmFsdWVzLlxuICAgICAgICAgICAgaWYgKCF0aGlzLl9uYW1lICYmIHJlcGwuYXR0cmlidXRlcy5sZW5ndGggPiAwICYmIEFycmF5LmZyb20ocmVwbC5hdHRyaWJ1dGVzKS5maWx0ZXIoZiA9PiBmLm5hbWUgIT09ICdub2VzY2FwZScgJiYgIWYudmFsdWUpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBVbm5hbWVkIGNvbXBvbmVudCAjJHt0aGlzLmNvbnRlbnQuaWR9IGNvbnRhaW5zIHBvc3NpYmx5IG5hbWVkIEktViByZXBsYWNlbWVudCBpbnRlbmRlZCBmb3IgYW5vdGhlciBjb21wb25lbnQ6IDxpLXYgJHtBcnJheS5mcm9tKHJlcGwuYXR0cmlidXRlcykuZmlsdGVyKGYgPT4gZi5uYW1lICE9PSAnbm9lc2NhcGUnICYmICFmLnZhbHVlKVswXS5uYW1lfT4ke3JlcGwuaW5uZXJIVE1MfTwvaS12PmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgbmFtZSBpcyBzcGVjaWZpZWQsIGktdiB0YWcgTVVTVCBoYXZlIHRoYXQgYXMgYSB0YWcuXG4gICAgICAgICAgICBpZiAodGhpcy5fbmFtZSAmJiAhcmVwbC5oYXNBdHRyaWJ1dGUodGhpcy5fbmFtZSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vZXNjYXBlID0gcmVwbC5oYXNBdHRyaWJ1dGUoJ25vZXNjYXBlJykgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ25vZXNjYXBlJykgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogcmVwbCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHJlcGwuaW5uZXJIVE1MLFxuICAgICAgICAgICAgICAgIG5vZXNjYXBlOiBub2VzY2FwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW4gdGhlIG9yaWdpbmFsIGJ1aWxkIG9mIHRoZSBvYmplY3QsIGYgYW55IHJlcGxhY2VtZW50cyBzdGFydCB3aXRoIFwidGhpcy5cIiB3ZSBuZWVkIHRvIGRlZmVyLlxuICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkICYmICF0aGlzLl9kZWZlcikge1xuICAgICAgICAgICAgdGhpcy5fZGVmZXIgPSB0aGlzLl9kZWZlciB8fCAhIXRoaXMuX3JlcGxhY2VtZW50cy5maW5kKGYgPT4gZi5zb3VyY2Uuc3RhcnRzV2l0aChcInRoaXMuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIHdpbGwgbGVhZCB0byBhIEZPVUMsIG1heWJlIG1pbGxpc2Vjb25kcywgbWF5YmUgbG9uZ2VyLlxuICAgICAgICBpZiAoIXRoaXMuX2RlZmVyIHx8IHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb21wbGV0ZWQgdmFsdWVzIGJlZm9yZSBhZGRpbmcgdG8gdGhlIHZpc2libGUgcGFnZS4gVGhpcyBpcyBzbGlnaHRseSByZWR1bmRhbnQsIGJlY2F1c2UgdGhpcyBoYXBwZW5zIGluIHRoZSByZW5kZXIoKVxuICAgICAgICAgICAgLy8gc3RlcCwgYnV0IEkgaGF0ZSBpdCB3aGVuIEkgc2VlIGEgZmxhc2ggb2YgdW5yZXBsYWNlZCBjb250ZW50IG9uIHNpdGVzLlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiB0aGlzIHdvcmtzIGlzIGJlY2F1c2UgX3JlcGxhY2VtZW50cyByZWZlcmVuY2VzIGNsb25lLCB3aGljaCBpc24ndCB2aXNpYmxlIHVudGlsIGFsbW9zdCB0aGUgbGFzdCBsaW5lLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBvcHVsYXRlIHRoZSBmcm9udC1lbmQgdGV4dC4gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSB0aGluZyB0byByZXBsYWNlLiBPdGhlcndpc2UsIHlvdSdyZSBqdXN0IHdpcGluZyBvdXQgcGVyZmVjdGx5XG4gICAgICAgIC8vIHZhbGlkIEhUTUw1IHJlZmVyZW5jZXMgZm9yIG5vIHJlYXNvbi5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gYSBmdWxsIHVwZGF0ZSBpZiByZXF1ZXN0ZWQgdG9cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SHRtbFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12IG5vZXNjYXBlPicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldFRleHRUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdj4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRMb29wKHNvdXJjZSA9ICcuJywgZnJhZ21lbnQsIHNraXBQb3N0UHJvY2VzcyA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3AgPSB7IHNvdXJjZSwgcG9zdFByb2Nlc3M6ICFza2lwUG9zdFByb2Nlc3MsIGZyYWdtZW50IH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUxvb3AodXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmFsdWVBdHRyaWJ1dGUoc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl92YWx1ZUF0dHJpYnV0ZSA9IHNvdXJjZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmlzaWJpbGl0eShzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHsgc291cmNlLCBuZWdhdGl2ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiBmYWxzZSwgbmVnYXRpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogdHJ1ZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbHRlcihmID0+IGYuYXR0cmlidXRlICE9PSBhdHRyaWJ1dGUpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzQ2xhc3MoY2xzID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jc3NDbGFzc2VzID0gY2xzO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NTdHlsZShzdHlsZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY3NzU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ3NzQ2xhc3NTd2l0Y2goY2xzLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghY2xzIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmluZChmID0+IGYuY2xhc3MgPT09IGNscykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCh7IGNsYXNzOiBjbHMsIHNvdXJjZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ3NzQ2xhc3NTd2l0Y2goY2xzLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbHRlcihmID0+IGYuY2xhc3MgIT09IGNscyk7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy53cml0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlVGFyZ2V0KHRhcmdldCA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmZpbmQoZiA9PiBmID09PSB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZVdyaXRlVGFyZ2V0KHRhcmdldCwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fd3JpdGVUYXJnZXRzLmZpbHRlcihmID0+IGYgIT09IHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXV0by1JbmplY3QgY2FsbHMgdGhlIGRlZmF1bHQgaW5qZWN0QmluZCgpIG9uIHRoZSBkZWZhdWx0IEJvdW5kQ29tcG9uZW50IGNsYXNzLCB3aXRoIG5vIG9wdGlvbnMgZXhjZXB0IHNlbGVjdG9yLlxuICAgICAqIElmIHlvdSBwYXNzIG5vIGlucHV0cywgaXQgc2Vla3Mgb3V0IGFsbCBjaGlsZCBlbGVtZW50cyB0aGF0IGhhdmUgYXQgbGVhc3Qgb25lIGljaGlnbyBjdXN0b20gcHJvcGVydHkuIEtlZXAgaW4gbWluZFxuICAgICAqIHRoYXQgd2hlbiB5b3UgaGF2ZSBuZXN0ZWQgb2JqZWN0cywgdGhpcyB3aWxsIHVzdWFsbHkgbWVhbiBzb21ldGhpbmcgd2lsbCBibG93IHVwIGJlY2F1c2UgeW91IHRyaWVkIHRvIGJpbmQgYW4gZWxlbWVudFxuICAgICAqIHR3aWNlLiBJdCBhbHNvIHdpbGwgcGVyZm9ybSBtdWNoIHdvcnNlLlxuICAgICAqXG4gICAgICogSWYgeW91IHBhc3MgYSBzZWxlY3RvciwgaXQgYWN0cyB0aGUgc2FtZSBhcyBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKCkgd2l0aCB0aGF0IHNlbGVjdG9yLlxuICAgICAqXG4gICAgICogSW4gbXkgZXhwZXJpZW5jZSwgdGhpcyBpcyBhbG1vc3QgY29tcGxldGVseSB1c2VsZXNzLiBFaXRoZXIgdGhlIGxhY2sgb2Ygb3B0aW9ucyBicmVha3MgaXQgKHByZXR0eSB1c2VsZXNzIGlmIHlvdSBjYW4ndFxuICAgICAqIG9ic2VydmUgYW4gb2JzZXJ2YWJsZSkgb3IgdGhlIHNpbXBsZSBhY3Qgb2YgYmluZGluZyBicmVha3Mgc3R1ZmYuXG4gICAgICovXG4gICAgYXV0b0luamVjdChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQodGhpcy52aWV3TW9kZWwsIHNlbGVjdG9yLCB7IHBhcmVudDogdGhpcy5jb250ZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbShlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUuc3RhcnRzV2l0aCgnaTVfJykgfHwgYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJzonKSB8fCBhdHRyLm5hbWUuc3RhcnRzV2l0aCgnZGF0YS1pNV8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCh0aGlzLnZpZXdNb2RlbCwgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gdW5iaW5kIGEgdmlldyBmcm9tIGFuIG9ic2VydmFibGUuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5kZWxldGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGlmIHlvdSBuZWVkIHRvIGRvIHNvbWV0aGluZyBlbHNlIGFmdGVyIHRoZSBsb29wIGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICovXG4gICAgbG9vcFBvc3RQcm9jZXNzKHJvdywgYWRkZWRDb250ZW50LCBhbGxSb3dzLCBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICAgICAgLy8gSWYgdGhlIHR5cGVzY3JpcHQgcGFydCBvZiB0aGUgZm9sbG93aW5nIHdlcmUgaW1wb3J0YW50LCB0aGlzIHdvdWxkIGJlIGEgcHJvYmxlbVxuICAgICAgICAvLyBpZiB0aGlzIHdlcmUgYSBkZXJpdmVkIGNsYXNzLlxuICAgICAgICBjb25zdCB0aGlzY2xhc3MgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sb29wSXRlbUNsYXNzLmluamVjdEJpbmQocm93LCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKGFkZGVkQ29udGVudCwgJ1tpNV9pdGVtXSwgW1xcXFwwMDAwM0FpdGVtXSwgW2RhdGEtaTVfaXRlbV0nKSwge1xuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICAgICAgICBsb29wUGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgYXN5bmM6IHRoaXMuX2FzeW5jXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U3RyaW5nVmFsdWUobmFtZSwgc2tpcEVzY2FwZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKG5hbWUpO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZSA6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBza2lwRXNjYXBlID8gdmFsdWUudG9TdHJpbmcoKSA6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRVbnR5cGVkVmFsdWUobmFtZSkge1xuICAgICAgICBsZXQgc291cmNlO1xuICAgICAgICAvLyBJJ20gcHJldHR5IHN1cmUgdGhpcyBpcyBiZWluZyB2YWxpZGF0ZWQgZHVyaW5nIGNvbnN0cnVjdGlvbiBidXQgYmUgc2FmZVxuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGhpc0FyZyA9IHRoaXMudmlld01vZGVsO1xuICAgICAgICAvLyBJZiBWTSBpcyBhIHN0YXRlLCBnZXQgdGhlIGN1cnJlbnQgc3RhdGUgdmFsdWUuXG4gICAgICAgIGlmIChPYnNlcnZhYmxlU3RhdGVfMS5vYnNlcnZhYmxlU3RhdGVDaGVjayh0aGlzQXJnKSkge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXNBcmcudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aChcInRoaXMuXCIpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpcztcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDUpO1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlldy5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICcuJykge1xuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpc0FyZykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXdNb2RlbC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIENPTlNJREVSOiBDb25zaWRlciBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gYWxsb3cgZXhlY3V0aW5nIG1ldGhvZCB3aXRoIHN0cmluZyBwYXJhbWV0ZXJzLiBpNV9wYXJhbTAxPVwidmFsIDFcIiwgaTVfcGFyYW0wMj1cInZhbCAyXCJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UuY2FsbCh0aGlzQXJnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayhzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIHRoaXMuX3JlcGxhY2VtZW50cykge1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZShyZXBsLnNvdXJjZSwgcmVwbC5ub2VzY2FwZSkgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVwbC5lbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20odGhpcy5jb250ZW50LmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gZi52YWx1ZSB8fCBmLm5hbWUgPT09ICdpNV9pbnB1dCcgfHwgZi5uYW1lID09PSAnOmlucHV0JylcbiAgICAgICAgICAgIC5tYXAobSA9PiAoe1xuICAgICAgICAgICAgbmFtZTogbS5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IG0udmFsdWUgfHwgJydcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBUZWNobmljYWxseSBpdCdzIGludmFsaWQgdG8gYWRkIGN1c3RvbSBhdHRyaWJ1dGVzIHRvIHJlZ3VsYXIgZWxlbWVudHMsIHNvIHRlY2huaWNhbGx5IDxyZXBsYWNlLW1lIDpzd2l0Y2g6cmVkdGV4dD1cIndhcm5pbmdcIj5cbiAgICAgICAgLy8gaXMgbGVnYWwgYnV0IGlmIGlmIGl0IHdlcmUgYSBkaXYsIHRoYXQgd291bGQgYmUgaWxsZWdhbC4gU28gd2UnbGwgYWxsb3cgPGRpdiBkYXRhLWk1X3N3aXRjaF9yZWR0ZXh0PVwid2FybmluZ1wiPi5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSB3ZWlyZCBuYW1lIGhhbmRsaW5nIG9mIGRhdGEgYXR0cmlidXRlcyBjb3VsZCBicmVhayB5b3VyIGNvZGUgaWYgeW91IHRyeSB0byB1c2UgdGhpcy4gWW91IG1heSBuZWVkIHRvIGRvIGV4dHJhXG4gICAgICAgIC8vIHdvcmsgdG8gbWFrZSB5b3VyIGNvZGUgd29yaywgYWxsIGluIHRoZSBuYW1lIG9mIHN0cmljdCBhZGhlcmVuY2UgdG8gc3RhbmRhcmRzLiBJdCdzIHVwIHRvIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuY29udGVudC5kYXRhc2V0KSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRlbnQuZGF0YXNldFthdHRyXTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCBhdHRyID09PSAnaTVfaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEF0dHJpYnV0ZXMucHVzaCh7IG5hbWU6IGF0dHIsIHZhbHVlOiB2YWx1ZSB8fCAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgdGV4dEh0bWxTZXQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIGN1cnJlbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5fcGFyc2VBdHRyaWJ1dGVOYW1lKHByb3AubmFtZSk7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFJlZ3VsYXIgYXR0cmlidXRlcyB3aWxsIGFsbCBtYXRjaCB0aGlzLlxuICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hbWUgPSB0aGlzLl9uYW1lIHx8IHByb3AudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImF0dHJcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQXR0cmlidXRlTWFwcGluZyh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJzd2l0Y2hDbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDc3NDbGFzc1N3aXRjaCh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12PiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dEh0bWxTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldCBpNV90ZXh0IGFuZCBpNV9odG1sIGF0IHNhbWUgdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0SHRtbFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBgPGktdiBub2VzY2FwZT4ke3Byb3AudmFsdWV9PC9pLXY+YDsgLy8gVXNlIHRoaXMgYXMgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdHRyaWJ1dGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlmTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkocHJvcC52YWx1ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzc1N0eWxlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzc0NsYXNzKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsc2UgZmFsbCB0aHJvdWdoLCB1c2luZyB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGF0dHJpYnV0ZSBhcyBhIHRhcmdldCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0dHJpYnV0ZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0YXJnZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXcml0ZVRhcmdldChwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9vcFwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBHcmFiIHRoZSBiYXNlIGNvbnRlbnQgZm9yIHRoZSBsb29wLCBwdWxsaW5nIGl0IG91dCBvZiB0aGUgRE9NLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvb3AocHJvcC52YWx1ZSwgRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCksIHR5cGUuZGV0YWlsID09PSAnbnVsbCcpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgdXNlZCBhcyBhIHNlbGVjdG9yLiBIYXMgbm8gZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWQgSWNoaWdvIGF0dHJpYnV0ZTogXCIgKyB0eXBlLnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZGVmZXJJZk5lZWRlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWZlciA9IHRoaXMuX2RlZmVyIHx8IHByb3AudmFsdWUuc3RhcnRzV2l0aCgndGhpcy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfcGFyc2VBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgICAvLyBHZW5lcmFsIGljaGlnbyBzaG9ydGN1dFxuICAgICAgICAgICAgbmFtZSA9ICdpNV8nICsgbmFtZS5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnaTVfaXRlbScpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBpbmRpY2F0ZSBhbiBpdGVtIGNvbXBvbmVudCwgbm90aGluZyBlbHNlLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9ldmVudCcpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCBvbmx5IGluIENvbXBvbmVudC5hZGRJbmxpbmVFdmVudExpc3RlbmVycygpLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoJ2k1XycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYXR0cicpKSB7XG4gICAgICAgICAgICBpZiAobmFtZVs3XSAhPT0gJzonICYmIG5hbWVbN10gIT09ICdfJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5kaW5nIGF0dHJpYnV0ZSBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2F0dHInLCBkZXRhaWw6IG5hbWUuc2xpY2UoOCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2Jvb2wnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZVs3XSAhPT0gJzonICYmIG5hbWVbN10gIT09ICdfJyAmJiBuYW1lWzddICE9PSAnLScgJiYgbmFtZVs3XSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVbN10gPT09ICctJyB8fCBuYW1lWzddID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgNykgKyBuYW1lLnNsaWNlKDgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdib29sTmVnYXRpdmUnIDogJ2Jvb2wnLCBkZXRhaWw6IG5hbWUuc2xpY2UoOCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X3N3aXRjaCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzldICE9PSAnOicgJiYgbmFtZVs5XSAhPT0gJ18nICYmIG5hbWVbOV0gIT09ICctJyAmJiBuYW1lWzldICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3dpdGNoIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs5XSA9PT0gJy0nIHx8IG5hbWVbOV0gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA5KSArIG5hbWUuc2xpY2UoMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgMTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGFzcyBzd2l0Y2ggbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ3N3aXRjaENsYXNzTmVnYXRpdmUnIDogJ3N3aXRjaENsYXNzJywgZGV0YWlsOiBuYW1lLnNsaWNlKDEwKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaWYnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICctJyB8fCBuYW1lLnNsaWNlKC0xKSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnaWZOZWdhdGl2ZScgOiAnaWYnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9sb29wJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSAnaTVfbG9vcDpudWxsJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdsb29wJywgZGV0YWlsOiAnbnVsbCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdsb29wJyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfdGFyZ2V0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAoeyB0eXBlOiAndGFyZ2V0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2lucHV0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHR3b1dheSA9IG5hbWUuZW5kc1dpdGgoJ192YWx1ZScpIHx8IG5hbWUuZW5kc1dpdGgoJzonKTtcbiAgICAgICAgICAgIHJldHVybiAoeyB0eXBlOiAnaW5wdXQnLCBkZXRhaWw6IHR3b1dheSA/ICcyd2F5JyA6ICcnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHR5cGU6IG5hbWUuc2xpY2UoMykgfTtcbiAgICB9XG59XG5leHBvcnRzLkJvdW5kQ29tcG9uZW50ID0gQm91bmRDb21wb25lbnQ7XG4vLyBVc2UgYSBjdXN0b20gZWxlbWVudCB0byBjcmVhdGUgYSByZXBsYWNlbWVudCB0YWcgdGhhdCBpcyBub3QgbGltaXRlZCwgYXMgc3BhbiBpcywgdG8gY29udGFpbmluZyBubyBibG9jayBlbGVtZW50cy5cbi8vIE5vIGxvZ2ljLCBubyBzcGVjaWFsIGRpc3BsYXkgZGV0YWlscy5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuY2xhc3MgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmV4cG9ydHMuVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlID0gVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBHZXRVbmlxdWVJZF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG4vKipcbiAqIEEgY2xhc3Mgd2l0aCBhIGNvbnRlbnQgcHJvcGVydHkgdGhhdCBwb2ludHMgdG8gc29tZXRoaW5nIG9uIHRoZSBwYWdlLCBhbG9uZyB3aXRoIHNvbWUgb2YgaGVscGVyIG1ldGhvZHMuXG4gKlxuICogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgYmFzZSBjbGFzcyBmb3Igb3RoZXIgY2xhc3Nlcywgc28gaXQncyBtYXJrZWQgYWJzdHJhY3QuIEl0IGp1c3QgZG9lc24ndFxuICogbWFrZSBzZW5zZSB0byBtZSB0byBjcmVhdGUgQ29tcG9uZW50IHdpdGggbm90aGluZyBjdXN0b21pemVkLiBKdXN0IGNyZWF0ZSBhbiBIVE1MRWxlbWVudC4gVGhlIGhlbHBlcnMgYXJlbid0IHJlYWxseVxuICogdGhhdCBpbXByZXNzaXZlLCB3aGVuIHlvdSBjb25zaWRlciB0aGF0IHRoZSB0cmFkZW9mZiBpcyBoYXZpbmcgdG8gcmVmZXJlbmNlIG9iai5jb250ZW50IHRvIG1vZGlmeSB0aGUgRE9NLlxuICovXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IHVuZGVyc3RhbmQgdGhhdCB0aGlzLmNvbnRlbnQgaXMgc2V0IGluIEFMTCBvZiB0aGUgcHJpdmF0ZSBjdG9yIGZ1bmN0aW9ucy5cbiAgICAgICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgaWYgKGFyZ3MgJiYgdHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBfY3Rvcl9zdHJpbmcuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzICYmIGFyZ3Muc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmlubmVySHRtbCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oYXJncy5wcm9wZXJ0aWVzIHx8IHt9LCB7IGlubmVySFRNTDogYXJncy5pbm5lckh0bWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfY3Rvcl9sb29rdXAuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghYXJncykge1xuICAgICAgICAgICAgX2N0b3JfZW1wdHkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmlubmVySHRtbCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oYXJncy5wcm9wZXJ0aWVzIHx8IHt9LCB7IGlubmVySFRNTDogYXJncy5pbm5lckh0bWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfY3Rvcl9leGlzdGluZ0VsZW1lbnQuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLm91dGVySHRtbCkge1xuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfY3Rvcl9pbm5lckh0bWwuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGVja0lubGluZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIC8vIEFuZ3VsYXIgbWF0ZXJpYWwgZG9lcyBzb21ldGhpbmcgbGlrZSB0aGlzLiBJbiB0aGlzIGNhc2UsIHRoZXJlJ3Mgbm8gZnVuY3Rpb25hbGl0eSBiZWhpbmQgaXQsIGJ1dCBpdCBkb2VzIG1ha2UgaXRcbiAgICAgICAgLy8gdXNlZnVsIGZvciBhIGRldmVsb3BlciB0byBzZWUgdGhhdCBhbiBlbGVtZW50IGlzIGEgY29tcG9uZW50IGFuZCB3aGF0IHR5cGUgaXQgaXMuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzbmFrZV9jYXNlID0gJ2l2XycgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoMSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxXKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pKFthLXpdKS9nLCBcIiQxICQyJDNcIilcbiAgICAgICAgICAgICAgICAuc3BsaXQoL1xcQig/PVtBLVpdezIsfSkvKVxuICAgICAgICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgICAgIC5qb2luKCdfJylcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoc25ha2VfY2FzZSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgaGFzIHNvbWUgd2VpcmQgbmFtZSwgbm8gcHJvYmxlbS4gVGhpcyBpcyBqdXN0IGFuIGluZm8gZmllbGQgYW55d2F5LlxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwQ29tcG9uZW50KCk7XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2VtcHR5KCkge1xuICAgICAgICAgICAgLy8gTm8gYXJndW1lbnRzXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGZpbmUgYXMgbG9uZyBhcyBURWxlbWVudCBpcyBESVYuIE5vIHdheSB0byB2ZXJpZnkgdGhhdCBhcyBpdCdzIGEgdHlwZXNjcmlwdCBpbGx1c2lvbi4gSlMgZG9lc24ndCBzZWUgdHlwZSBwYXJhbWV0ZXJzLlxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgeyBpZDogR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCgpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2xvb2t1cChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciBleGlzdGluZ0VsZW1lbnQuXG4gICAgICAgICAgICAvLyBUaGUgbWFpbiByZWFzb24gaXQgZXhpc3RzIGlzIHRoYXQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgZG9lc24ndCByZXR1cm4gdGhlIGNvcnJlY3QgdHlwZSAoaXQncyBub3QgZ2VuZXJpYyksXG4gICAgICAgICAgICAvLyBzbyB0eXBlc2NyaXB0IGZyZWFrcyBvdXQgYW5kIHRoaW5rcyBpdCBzaG91bGQgYmUgYSBTVFJJTkcsIGluIHNwaXRlIG9mIHRoZSB0eXBlIGRlZmluaXRpb24gbm90IGJlaW5nIGFueXRoaW5nXG4gICAgICAgICAgICAvLyBsaWtlIHRoYXQuIEl0J3MganVzdCBlYXNpZXIgdG8gdXNlIHRoaXMgdGhhbiB0byByZW1lbWJlciBcIm9oLCByaWdodCwgaSBoYXZlIHRvIHVzZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCksIHdoaWNoIGlzIGdlbmVyaWNcIi5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSAoZXhpc3RpbmdFbGVtZW50LnBhcmVudCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihleGlzdGluZ0VsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IHNlbGVjdG9yIGNvdWxkIG5vdCBmaW5kIGVsZW1lbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIGlzIG5hc3R5IGJ1dCBpdCBtYWtlcyBUeXBlU2NyaXB0IGhhcHB5IHdpdGhvdXQgY3JlYXRpbmcgYSBuZXcgb2JqZWN0IGNvcHlcbiAgICAgICAgICAgIGV4aXN0aW5nRWxlbWVudC5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIF9jdG9yX2V4aXN0aW5nRWxlbWVudC5jYWxsKHRoaXMsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfZXhpc3RpbmdFbGVtZW50KGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gZXhpc3RpbmdFbGVtZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAvLyBGaXJzdCB0cnkgYXR0cmlidXRlcyAod2hpY2ggYXJlIHRoZSBpbml0aWFsIHZhbHVlcylcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShhdHRyLCBleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlbiBvdmVyd3JpdGUgd2l0aCBwcm9wZXJ0aWVzICh3aGljaCBhcmUgY3VycmVudClcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfaW5uZXJIdG1sKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIE5ldyBlbGVtZW50LiBVc2VyIHNwZWNpZmllcyB0aGUgaW5uZXIgSFRNTCBmb3IgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAvLyBUaGlzIGNvdWxkIGJlIGFuIGVtcHR5IG9iamVjdCBsaWtlIHt9LCBwcmFjdGljYWxseSB0aGUgc2FtZSBhcyBjYWxsaW5nIGl0IHdpdGggbm8gYXJnc1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB7IGlubmVySFRNTDogbmV3RWxlbWVudC5pbm5lckh0bWwgfHwgJycgfTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMsIG5ld0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChuZXdFbGVtZW50LnR5cGUgfHwgRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgcHJvcHMsIG5ld0VsZW1lbnQuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IG5ld0VsZW1lbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5jb250ZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX291dGVySHRtbChuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBVc2VyIHNwZWNpZmllcyB0aGUgZnVsbCBIVE1MIGZvciB0aGUgY29udGVudC5cbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCBpdCBjYW4ndCBiZSB0eXBlIGNoZWNrZWQuIEpTIGNhbid0IHNlZSB3aGF0IFRFbGVtZW50IGlzLlxuICAgICAgICAgICAgY29uc3QgdG1wZGl2ID0gQ3JlYXRlRWxlbWVudF8xLmRpdihuZXdFbGVtZW50Lm91dGVySHRtbC50cmltKCkpO1xuICAgICAgICAgICAgaWYgKHRtcGRpdi5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMSB8fCAhdG1wZGl2LmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXRlckh0bWwgbXVzdCBjb250YWluIGV4YWN0bHkgb25lIEhUTUxFbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0bXBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAvLyBGaXJzdCB0cnkgYXR0cmlidXRlcyAod2hpY2ggYXJlIHRoZSBpbml0aWFsIHZhbHVlcylcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobmV3RWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHIsIG5ld0VsZW1lbnQuYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlbiBvdmVyd3JpdGUgd2l0aCBwcm9wZXJ0aWVzICh3aGljaCBhcmUgY3VycmVudClcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudCwgbmV3RWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNwZWNpZmllZCBJRCB0YWtlcyBwcmVjZWRlbmNlXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IG5ld0VsZW1lbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3Jfc3RyaW5nKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFN0cmluZyBieSBpdHNlbGYgaXMgYSBzaG9ydGN1dCBmb3Igb3V0ZXJIdG1sXG4gICAgICAgICAgICBfY3Rvcl9vdXRlckh0bWwuY2FsbCh0aGlzLCB7IG91dGVySHRtbDogbmV3RWxlbWVudCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKlxuICAgICAqIEl0IGRvZXNuJ3QgaGF2ZSB0byBiZSBhIGN1c3RvbSB0YWcuIEl0IGNvdWxkIGJlIGEgY2xhc3MsIGxpa2UgPHAgY2xhc3M9J2JpbmQtdG8tbW9kZWxcIj4gKHNlbGVjdG9yPScuYmluZC10by1tb2RlbCcpXG4gICAgICogb3IgPHAgaWNoaWdvPiAoc2VsZWN0b3I9J1tpY2hpZ29dJykuXG4gICAgICpcbiAgICAgKiBUbyBjb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIGVsZW1lbnQgKGNvcHlpbmcgZXhpc3RpbmcgYXR0cmlidXRlcykgc2VuZCB0aGUgcmVsZXZhbnQgb3B0aW9ucywgcGx1cyB7cmVwbGFjZTogdHJ1ZX0uXG4gICAgICpcbiAgICAgKiBBY2NlcHRzIEtleXdvcmQgQXJndW1lbnRzLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQ29tcG9uZW50KGVsZW1lbnQsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydEVsZW1lbnRUb0NvbXBvbmVudChlbGVtZW50LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3Qoc2VsZWN0b3IsIG9wdCwgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pO1xuICAgIH1cbiAgICBzdGF0aWMgX2luamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgY29uc3QgY29udGFpbmVycyA9IHRoaXMuX2xvb2tVcENvbnRhaW5lcnNUb0luamVjdChzZWxlY3Rvciwgb3B0aW9ucy5wYXJlbnQpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiBjb250YWluZXJzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FuJ3QgaGF2ZSBkdXBlIElEcyBiZWluZyBjcmVhdGVkIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBjb250YWluZXJzLiBUaGVyZSBhcmUgMyBwbGFjZXMgd2hlcmUgSUQgY2FuIGJlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmlkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3Byb3BlcnRpZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnByb3BlcnRpZXMuaWQ7IC8vIERPTSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgnYXR0cmlidXRlcycgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0cmlidXRlcy5pZDsgLy8gSFRNTCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVwbGFjZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjb252ZXJ0ZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgc3RhdGljIF9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAvLyBUaGlzIGF0dGVtcHRzIHRvIHByZXNlcnZlIHRoZSBhdHRyaWJ1dGVzIHNldCBvbiB0aGUgcmVwbGFjZWQgZWxlbWVudC4gVGhhdCBvcGVucyBhbiB1Z2x5IGNhbiBvZiB3b3JtcyxcbiAgICAgICAgLy8gYnV0IGl0IHNob3VsZCBtYWtlIHJlcGxhY2VtZW50IGNvbXBvbmVudHMgbW9yZSB1c2VmdWwgYmVjYXVzZSBpdCBhbGxvd3MgdGhlbSB0byB2YXJ5LlxuICAgICAgICAvLyBJdCBkb2VzIG1ha2UgYSBicnV0YWwganVnZ2xpbmcgYWN0OlxuICAgICAgICAvLyBJZiB0aGUgZXhpc3RpbmcgZWxlbWVudCBoYXMgaW5uZXJIVE1MLCB3ZSB3YW50IHRvIHRha2UgaXQuXG4gICAgICAgIC8vIElmIG91dGVySFRNTCBpcyBwcm92aWRlZCwgdGhlIG91dGVySFRNTCdzIGlubmVySFRNTCBzaG91bGQgb3ZlcnJpZGUgdGhlIGV4aXN0aW5nIGVsZW1lbnQncy5cbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGF0dHJpYnV0ZXMsIHdlIHdhbnQgdG8gdGFrZSB0aGVtLlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBhdHRyaWJ1dGVzIHNob3VsZCBvdmVycmlkZSB0aGVtLlxuICAgICAgICAvLyBGb3IgYW55IGF0dHJpYnV0ZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIEZvciBhbnkgcHJvcGVydGllcyBwYXNzZWQgaW4gT1BUSU9OUywgdGhleSBzaG91bGQgb3ZlcnJpZGUgYW55dGhpbmcgdGhhdCBjYW1lIGJlZm9yZS5cbiAgICAgICAgLy8gT25seSB0aGUgbGFzdCAyIGFyZSBoYW5kbGVkIGluIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IuIEFuZCBpZiB3ZSdyZSBub3QgY2FyZWZ1bCwgd2UgY291bGQgYnJlYWsgdGhlbS5cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHsgaW5uZXJIVE1MOiBleGlzdGluZ0VsZW1lbnQuaW5uZXJIVE1MIH07XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20oZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICAvLyBUaGlzIGlzIHVnbHkgYmVjYXVzZSBpdCBoYXBwZW5zIGFnYWluIGluIHRoZSBjb25zdHJ1Y3Rvci4gTm8gb3RoZXIgY2xlYW4gd2F5IHRvIHBhcnNlIHRoZSBlbGVtZW50IGF0dHJpYnV0ZXMsIHRob3VnaC5cbiAgICAgICAgaWYgKG9wdC5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENyZWF0ZUVsZW1lbnRfMS5kaXYob3B0Lm91dGVySHRtbC50cmltKCkpO1xuICAgICAgICAgICAgaWYgKHRtcC5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMSB8fCAhdG1wLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXRlckh0bWwgbXVzdCBjb250YWluIGV4YWN0bHkgb25lIEhUTUxFbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0bXAyID0gdG1wLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gVGhlIG91dGVyIEhUTUwgYXR0cmlidXRlcyBnZXQgcGlja2VkIHVwIGF1dG9tYXRpY2FsbHkgd2hlbiBhZGRlZCB0byB0aGUgRE9NLCBzbyB3ZSByZWFsbHlcbiAgICAgICAgICAgIC8vIGp1c3QgbmVlZCB0byBkaXNjYXJkIHRoZSBtYXRjaGluZyBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzIG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuaW5uZXJIVE1MO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20odG1wMi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1thdHRyLm5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvcHQucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgb3B0LnByb3BlcnRpZXMpO1xuICAgICAgICBvcHQuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgb3B0LmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX2dldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgb3B0O1xuICAgICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciByZXBsYWNpbmcgdGhlIG91dGVyIEhUTUxcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogdHJ1ZSwgb3V0ZXJIdG1sOiBvcHRpb25zIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IGtub3cgdGhhdCBvcHRpb25zICE9PSAnc3RyaW5nJyAoY2FuJ3QgcmVhZCBcImVsc2UgaWZcIiBjbGF1c2UpXG4gICAgICAgICAgICBvcHQgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0ID0geyByZXBsYWNlOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3RvcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBzdGF0aWMgX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0pO1xuICAgIH1cbiAgICBzdGF0aWMgX2xvb2tVcENvbnRhaW5lcnNUb0luamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIHBhcmVudCkge1xuICAgICAgICBpZiAoc2VsZWN0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEkndmUgZG9uZSB0aGlzIG15c2VsZiwgd2hpY2ggcmVzdWx0cyBpbiBhIHNpbGVudCBmYWlsdXJlIGlmIGFjY2lkZW50YWwuXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdJbmplY3Rpb24gc2VsZWN0b3IgaXMgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8ICdbaWNoaWdvXSc7XG4gICAgICAgIC8vIExvb2sgdXAgdGhlIGVsZW1lbnRzIHRvIGVpdGhlciByZXBsYWNlIG9yIGNvbnZlcnRcbiAgICAgICAgbGV0IGNvbnRhaW5lcnM7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50IHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20oc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVycztcbiAgICB9XG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmlkO1xuICAgIH1cbiAgICBzZXQgaWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlkID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBpbm5lckhUTUwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cbiAgICBzZXQgaW5uZXJIVE1MKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBXaWxsIHJldHVybiB1bmRlZmluZWQgaWYgY29udGVudCBpcyBub3QgYSBmb3JtIGZpZWxkIHR5cGVcbiAgICAgICAgcmV0dXJuIEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50KTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIC8vIFdpbGwgbG9nIGEgd2FybmluZyBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICBGb3JtRmllbGRWYWx1ZV8xLnNldEZvcm1GaWVsZFZhbHVlKHRoaXMuY29udGVudCwgdmFsdWUpO1xuICAgIH1cbiAgICBnZXQgY2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNsYXNzTmFtZTtcbiAgICB9XG4gICAgc2V0IGNsYXNzTmFtZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0O1xuICAgIH1cbiAgICBnZXQgc3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuc3R5bGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBIVE1MIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBDb21wb25lbnQgY29udGVudC4gRmx1ZW50LlxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaCB0aGUgSFRNTCBmb3IgaTVfZXZlbnQgb3IgOmV2ZW50IGF0dHJpYnV0ZXMgYW5kIGFkZCBldmVudCBsaXN0ZW5lcnMgYWNjb3JkaW5nIHRvIGlubGluZSBjdXN0b20gYXR0cmlidXRlcy5cbiAgICAgKiBGaWx0ZXIgYnkgbWF0Y2hpbmcgdGhlIGNvbXBvbmVudEZpbHRlciBpbnB1dCB3aXRoIGFuIGF0dHJpYnV0ZSBsaWtlIGNvbXBvbmVudD1cImNvbXBvbmVudEZpbHRlclwiLlxuICAgICAqIEVuY2xvc2UgdGhlIGV2ZW50IHR5cGUgaW4gcGFyZW50aGVzZXMsIGFuZCBmb3IgdGhlIHZhbHVlLCBlbnRlciB0aGUgbmFtZSBvZiBhIG1ldGhvZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgKiBFeGFtcGxlOiA8Zm9ybSA6ZXZlbnQgKGNsaWNrKT1cInN1Ym1pdFRoZUZvcm1cIj48L2Zvcm0+XG4gICAgICogVGhpcyBpcyBhbHNvIGFsbG93ZWQ6IDxmb3JtIDpldmVudCBfY2xpY2tfPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKi9cbiAgICBhZGRJbmxpbmVFdmVudExpc3RlbmVycyhjb21wb25lbnRGaWx0ZXIpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB3ZSBjb3VsZCBza2lwIHRoaXMgaW5pdGlhbCBmaWx0ZXIsIGxpa2UgYW5ndWxhciBkb2VzLiBCdXQgdGhlcmUgaXMgbm8gQ1NTIHNlbGVjdG9yIGZvclxuICAgICAgICAvLyBhdHRyaWJ1dGUgbmFtZSBiZWdpbnMgd2l0aCBvciBlbmRzIHdpdGguIFthdHRyXj1dIGlzIGZvciB0aGUgVkFMVUUgYmVnaW5uaW5nIHdpdGggc29tZXRoaW5nLlxuICAgICAgICAvLyBUaGlzIGluY2x1ZGVzIHRoZSBjb250ZW50IGl0c2VsZiBpbiBpdHMgY2hlY2suXG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRGaWx0ZXIgJiYgZWxlLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgIT09IGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGxldCBldmVudERlZmluaXRpb24gPSBjdXJyZW50QXR0cmlidXRlcy5maW5kKGYgPT4gZi5uYW1lLnN0YXJ0c1dpdGgoJygnKSAmJiBmLm5hbWUuZW5kc1dpdGgoJyknKSAmJiBmLm5hbWUubGVuZ3RoID4gMik7XG4gICAgICAgICAgICBpZiAoIWV2ZW50RGVmaW5pdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIGJ5IGFsdGVybmF0ZSBzeW50YXguIFRoaXMgb25lIHdvcmtzIGJldHRlciB3aXRoIHNldEF0dHJpYnV0ZSgpLlxuICAgICAgICAgICAgICAgIGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnXycpICYmIGYubmFtZS5lbmRzV2l0aCgnXycpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uIHx8ICFldmVudERlZmluaXRpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50IGRlZmluaXRpb24gbm90IGRlY2xhcmVkIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpc1tldmVudERlZmluaXRpb24udmFsdWVdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhbmRsZXIgbWV0aG9kIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfSAke2V2ZW50RGVmaW5pdGlvbi52YWx1ZX0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50RGVmaW5pdGlvbi5uYW1lLnNsaWNlKDEsIC0xKSwgbWV0aG9kLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZENoaWxkKG5ld0NoaWxkKSB7XG4gICAgICAgIGlmIChndWFyZChuZXdDaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgICAgIGlmIChndWFyZChwYXJlbnQpKSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGNvbXBvbmVudCB0byBDb21wb25lbnRNYXAuXG4gICAgICovXG4gICAgbWFwQ29tcG9uZW50KCkge1xuICAgICAgICAvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgY29udGVudCBoYXMgYWxyZWFkeSBiZWVuIHJlbGF0ZWQgdG8gYSBkaWZmZXJlbnQgY29tcG9uZW50XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQodGhpcy5jb250ZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IGFscmVhZHkgcmVmZXJlbmNlZCBieSBhIGNvbXBvbmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldCh0aGlzLmNvbnRlbnQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBjb21wb25lbnQgZnJvbSBDb21wb25lbnRNYXAuIFNvbWV0aW1lcyB5b3UgbWlnaHQgbmVlZCB0byB1c2UgdGhpcy4gQnV0IGhvcGVmdWxseSByYXJlbHksIGJlY2F1c2UgaXQncyB1c2luZyBhIFdlYWtNYXAsXG4gICAgICovXG4gICAgdW5tYXBDb21wb25lbnQoKSB7XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBjb21wb25lbnRzIHRoYXQgYXJlIG5lc3RlZCBpbnNpZGUgdGhpcyBjb21wb25lbnQuXG4gICAgICovXG4gICAgKmdldEFsbENoaWxkQ29tcG9uZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudChlKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0U3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdzdHJpbmcnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUUyBqdXN0IGZvcmdvdCB0aGF0IHByb3BlcnR5IGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4uXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcHJvcGVydHlbcHJvcF07XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENsYXNzKGNsYXNzTmFtZXMpIHtcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09IFwic3RyaW5nXCIgJiYgY2xhc3NOYW1lcy5pbmNsdWRlcyhcIiBcIikpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLnNwbGl0KFwiIFwiKS5maWx0ZXIocSA9PiBxICE9PSBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IFtjbGFzc05hbWVzXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJlY2F1c2UgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKSBzZWFyY2hlcyBhbGwgdGhlIHdheSBkb3duLCBpbnRvIG5lc3RlZCBjb21wb25lbnRzLCBpdCBjYW4ndCBiZSBjYWxsZWRcbiAgICAgKiBieSBkZWZhdWx0LiBJdCBqdXN0IHRocm93cyBlcnJvcnMgb24gYWxsIGJ1dCBzaW1wbGUgdGVzdCBjYXNlcy4gQnV0IGJlY2F1c2UgdGhlc2UgZXZlbnRzIGFsbW9zdCBhbHdheXMgZXhpc3RcbiAgICAgKiBpbnRlcm5hbCB0byB0aGUgY29tcG9uZW50IChlLmcuIG9uIGJ1dHRvbnMpLCBpdCBjYW4ndCBiZSBsaW1pdGVkLiBUaGlzIGNhbiBiZSBjb25mdXNpbmcgd2l0aG91dCBzb21lIGtpbmQgb2ZcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIF9jaGVja0lubGluZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGVsZSBvZiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKFt0aGlzLmNvbnRlbnRdLCAnW2k1X2V2ZW50XSwgW1xcXFwwMDAwM0FldmVudF0sIFtkYXRhLWk1X2V2ZW50XScpKSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXykge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdJbmxpbmUgZXZlbnQgbGlzdGVuZXJzIGFyZSBjb25maWd1cmVkLiBSZW1lbWJlciB0byBjYWxsIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuJyk7XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fZXZlbnRfd2FybmluZ19fID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVsZXRlIHdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXywgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgcXVlc3Rpb24gbmVlZHMgdG8gYmUgYXNrZWQ6IGlmIHlvdSBjYW4gYWRkIGEgY29tcG9uZW50IHRvIGEgcGFnZSBieSBkb2luZyBlbGVtZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudC5jb250ZW50KSxcbiAqIGhvdyBkbyB5b3UgZG8gZnJvbSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykgYW5kIGdldCB0byBjb21wb25lbnQsIG5vdCBjb21wb25lbnQuY29udGVudD8gVGhpcyBpcyBob3cuXG4gKlxuICogdmFyIGNvbXBvbmVudCA9IENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykpO1xuICpcbiAqIFRoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KGNvbnRlbnQsIGNvbXBvbmVudCkgaGFzIGJlZW4gY2FsbGVkIGF0IHNvbWUgcG9pbnQuXG4gKlxuICogVGhpcyBpcyB0aGUgYXBwcm92ZWQgd2F5IG9mIGRvaW5nIGl0LiBBbm90aGVyIHBvc3NpYmxlIHNvbHV0aW9uIHdvdWxkIGJlIHRoZSB1c2Ugb2YgZXhwYW5kbyBwcm9wZXJ0aWVzLFxuICogZm9yIGV4YW1wbGUgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpLnJlbGF0ZWRDb21wb25lbnQgPSBjb21wb25lbnQuIFRoaXMgd29ya3MgYW5kIGl0J3Mgc3VwZXIgc2ltcGxlLFxuICogYnV0IHNlZW1zIHRvIGJlIGZyb3duZWQgdXBvbiAuLi4gaXQgaGFzIGJlZW4ga25vd24gdG8gY3JlYXRlIG1lbW9yeSBsZWFrcyBpbiB0aGUgcGFzdC4gV2Vha01hcCBpcyB0aGUgb2JqZWN0XG4gKiBzcGVjaWZpY2FsbHkgY3JlYXRlZCBmb3IgdGhpcyB1c2UgY2FzZSwgc28gdGhhdCBpcyB1c2VkIGhlcmUuXG4gKlxuICogSWYgZXh0ZW5zaW9uIG1ldGhvZHMgYXJlIGxvYWRlZCwgeW91IGNhbiB1c2UgdGhlIGVsZW1lbnQuZ2V0Q29tcG9uZW50KCkgc2hvcnRjdXQuXG4gKi9cbmNsYXNzIENvbXBvbmVudE1hcCB7XG59XG5Db21wb25lbnRNYXAuY29tcG9uZW50cyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLkNvbXBvbmVudE1hcCA9IENvbXBvbmVudE1hcDtcbmZ1bmN0aW9uIGdldENvbXBvbmVudChlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGVsZW1lbnQpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcG9uZW50ID0gZ2V0Q29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudEJpbmRpbmdPcHRpb25zID0gQ29tcG9uZW50QmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG9wdC5lbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnMgPSBFeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gb3B0LnNlbGVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucyA9IEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIElubmVySHRtbEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Jbm5lckh0bWxCaW5kaW5nT3B0aW9ucyA9IElubmVySHRtbEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBPdXRlckh0bWxCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLm91dGVySHRtbCA9IG9wdC5vdXRlckh0bWw7XG4gICAgfVxufVxuZXhwb3J0cy5PdXRlckh0bWxCaW5kaW5nT3B0aW9ucyA9IE91dGVySHRtbEJpbmRpbmdPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmFibGVDaGVjayhvYmopIHtcbiAgICAvLyBOb3QgYW4gZXhoYXVzdGl2ZSB0ZXN0IGJ1dCBpdCdzIHRoZSBpbXBvcnRhbnQgYml0LlxuICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NoYW5nZUhhbmRsZXInIGluIG9iaiAmJiBvYmouY2hhbmdlSGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcjtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUNoZWNrID0gb2JzZXJ2YWJsZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0FycmF5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlQmFzZVwiKTtcbmNsYXNzIFRyYWl0U291cmNlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIHN1cGVyKHsgbmFtZTogJ0FycmF5UHJveHknLCBkaXNhYmxlQXN5bmMgfSk7XG4gICAgfVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBBcnJheU9ic2VydmFibGUgZXh0ZW5kcyBBcnJheSB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG4gICAgc3RhdGljIGdldE1lcmdlZE9ic2VydmFibGUoYXJncywgZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgd2hlcmUgSSByZWFsbHkgbmVlZCBtdWx0aXBsZSBpbmhlcml0YW5jZS4gVGhpcyBuZWVkcyB0byBpbmhlcml0IGZyb20gQXJyYXlcbiAgICAgICAgLy8gYmVjYXVzZSBpdCdzIGV4dGVuZGluZyBhIGJ1aWx0LWluIGNsYXNzLiBJdCBhbHNvIG5lZWRzIHRvIGluaGVyaXQgZnJvbSBPYnNlcnZhYmxlQmFzZS5cbiAgICAgICAgLy8gVGhyZWUgY2hvaWNlczpcbiAgICAgICAgLy8gMSkgNTAgbGluZXMgb2YgY2xpcGJvYXJkIGluaGVyaXRhbmNlLlxuICAgICAgICAvLyAyKSBDaGVhdCBoZWF2aWx5IGJ5IHRha2luZyBhIHRyYWl0IGFwcHJvYWNoLiBUaGlzIG1lYW5zIGhhY2tlcnkgdG8gbWFrZSBUUyBoYXBweS5cbiAgICAgICAgLy8gMykgRG8gdGhlIHNhbWUgYXMgMiB3aXRoIHRoZSBidWlsdC1pbiBBcnJheSBjbGFzcy4gTm90IGEgcHJvYmxlbSBidXQgd2l0aCAjMiB0aGUgY2xhc3MgbmFtZSBhY3RzXG4gICAgICAgIC8vIGFzIGEgaGludCB0aGF0IGl0J3Mgbm90IGEgZGVmYXVsdCBhcnJheSwgd2hpY2ggaXMgYmV0dGVyLlxuICAgICAgICAvLyAjMiB3aW5zLlxuICAgICAgICBjb25zdCBhcnIgPSBuZXcgQXJyYXlPYnNlcnZhYmxlKC4uLmFyZ3MpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbihhcnIsIG5ldyBUcmFpdFNvdXJjZShkaXNhYmxlQXN5bmMpKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwgJ2NoYW5nZUhhbmRsZXInLCB7IGVudW1lcmFibGU6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBPYmplY3RzIGNyZWF0ZWQgdGhyb3VnaCBtYXAsIGZpbHRlciwgZXRjLCBzaG91bGQgYmUgZ2VuZXJpYyBhcnJheXMuXG4gICAgc3RhdGljIGdldCBbU3ltYm9sLnNwZWNpZXNdKCkge1xuICAgICAgICByZXR1cm4gQXJyYXk7XG4gICAgfVxuICAgIC8vIE5lZWRzIHRvIGJlIHB1YmxpYyBzbyB0aGUgcHJveHkgY2FuIGNhbGwgaXQsIGJ1dCBzaG91bGQgbm90IGJlIGNhbGxlZCBvdXRzaWRlIHRoZSBBUEkuIEltYWdpbmUgaXQncyBpbnRlcm5hbC5cbiAgICBwdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBhcmdzLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICAvLyBUaGlzIHJlcXVpcmVzIGEgY2hlYXQuIEl0IHdpbGwgZmFpbCBpZiB0aGUgb2JqZWN0IGlzIGNyZWF0ZWQgd2l0aCBuZXcoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEuQXJyYXlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBhcmdzLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5T2JzZXJ2YWJsZSA9IEFycmF5T2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuY2xhc3MgQXJyYXlQcm94eUhhbmRsZXIge1xuICAgIGdldCh0YXJnZXQsIGtleSwgcHJveHkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZENhbGxlZCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICAvLyBTaWxlbnQgcGFzcy10aHJvdWdoIG9mIG90aGVyIG1ldGhvZHNcbiAgICAgICAgICAgIGlmIChBcnJheVByb3h5SGFuZGxlci5tZXRob2RzVG9XYXRjaC5pbmRleE9mKGtleS50b1N0cmluZygpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kQ2FsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogTmVlZCB0byBldmFsdWF0ZSBwZXJmb3JtYW5jZSBvZiBjb3BpZXNcbiAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbCA9IG1ldGhvZENhbGxlZC5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdjYWxsJywga2V5LCBhcmdzLCBiZWZvcmUsIGFmdGVyLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpIHtcbiAgICAgICAgLy8gUHJvYmxlbTogV2Ugd2FudCB0byBjYXB0dXJlIG9ubHkgbGVuZ3RoIGFuZCBbaW5kZXhlcl0gY2FsbHMsIGJ1dCBKUyBoYXMgbm8gY29uc2lzdGVudFxuICAgICAgICAvLyB3YXkgb2YgZGVmaW5pbmcgW2luZGV4ZXJdLiBXaGF0IG1ha2VzIGl0IHdvcnNlIGlzIHRoYXQgaWYgYSBzdHJpbmcgaXMgYW4gaW50ZWdlciwgaXQgaXNcbiAgICAgICAgLy8gY29udmVydGVkIHRvIGEgbnVtYmVyLiBBbmQgSlMgZG9lcyBub3QgaW5jbHVkZSBhIGJ1aWx0LWluIHdheSB0byB0ZXN0IGlmIGEgbnVtYmVyIGlzIGFuIGludGVnZXIuXG4gICAgICAgIC8vIFNvbHV0aW9uOiBBIHJlZ2V4LWJhc2VkIGNoZWNrLiBJY2suIFdheSB0byByZW1pbmQgbWUgSSdtIHVzaW5nIEpTLlxuICAgICAgICBpZiAoa2V5ICYmIChrZXkudG9TdHJpbmcoKSA9PT0gJ2xlbmd0aCcgfHwgdHlwZW9mIGtleSA9PT0gJ251bWJlcicgfHwgSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoa2V5KSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IE5lZWQgdG8gZXZhbHVhdGUgcGVyZm9ybWFuY2Ugb2YgY29waWVzXG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdzZXQnLCBrZXksIFt2YWx1ZV0sIGJlZm9yZSwgYWZ0ZXIsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAvLyBDYW5ub3QgcmVwb3J0IHByb3h5IGFzIHNlbmRlciBiZWNhdXNlIHByb3h5IG5vdCBzZW50IHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ2RlbGV0ZScsIGtleSwgW10sIGJlZm9yZSwgYWZ0ZXIsIG51bGwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vLyBUaGVzZSBhcmUgYWxsIHRoZSBtZXRob2RzLCBub3QgY291bnRpbmcgY3VzdG9tIHNldHRlcnMsIHRoYXQgbXV0YXRlIGFuIGFycmF5LlxuQXJyYXlQcm94eUhhbmRsZXIubWV0aG9kc1RvV2F0Y2ggPSBbJ2NvcHlXaXRoaW4nLCAnZmlsbCcsICdwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXTtcbmV4cG9ydHMuQXJyYXlQcm94eUhhbmRsZXIgPSBBcnJheVByb3h5SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVCYXNlXCIpO1xuY29uc3QgT2JqZWN0RnVsbEFzc2lnbl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIik7XG5jbGFzcyBPYmplY3RPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgb25seSB3YXkgdG8gcHJvZHVjZSBhbiBvYmplY3Qgb2JzZXJ2YWJsZSwgZm9yIHJlYXNvbnMgb2Ygc2FmZXR5LlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRNZXJnZWRPYnNlcnZhYmxlKGRhdGEsIGRpc2FibGVBc3luYykge1xuICAgICAgICAvLyBXZSBuZWVkIHNvbWV0aGluZyB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgaW5wdXQgb2JqZWN0IG1lcmdlZCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMuXG4gICAgICAgIC8vIEkgZG9uJ3Qgd2FudCB0byBhY3R1YWxseSBtb2RpZnkgdGhlIGlucHV0IG9iamVjdC4gRXZlbiB0aG91Z2ggaXQgU0hPVUxEIGJlIHRocm93YXdheSwgSSBkb24ndCBrbm93LlxuICAgICAgICAvLyBBbmQgSSBkb24ndCB3YW50IHRvIHRha2UgdGhlIHJpc2sgdGhhdCBzb21ldGhpbmcgaW4gdGhlIGlucHV0LCBhbiB1bmtub3duIGZhY3Rvciwgd2lsbCBtYWtlIHRoaXMgYmxvdyB1cC5cbiAgICAgICAgLy8gSSBrbm93IHRoYXQgdGhpcyBjbGFzcyBoYXMgb25seSAyIGxldmVscyBvZiBpbmhlcml0YW5jZSAoY3VycmVudGx5KSBhbmQgY29udGFpbnMgbm90aGluZyB2ZXJ5IGNvbXBsZXggYXQgYW55IGxldmVsLlxuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbihkYXRhLCBuZXcgT2JqZWN0T2JzZXJ2YWJsZShkaXNhYmxlQXN5bmMpLCB0cnVlKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwgJ2NoYW5nZUhhbmRsZXInLCB7IGVudW1lcmFibGU6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgc3VwZXIoeyBuYW1lOiBcIk9iamVjdFByb3h5XCIsIGRpc2FibGVBc3luYyB9KTtcbiAgICB9XG4gICAgLy8gTmVlZHMgdG8gYmUgcHVibGljIHNvIHRoZSBwcm94eSBjYW4gY2FsbCBpdCwgYnV0IHNob3VsZCBub3QgYmUgY2FsbGVkIG91dHNpZGUgdGhlIEFQSS4gSW1hZ2luZSBpdCdzIGludGVybmFsLlxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICAvLyBUaGlzIGZpbHRlcnMgb3V0IHRoZSB0cm91Ymxlc29tZSBjaGFuZ2VIYW5kbGVyIGZpZWxkLlxuICAgICAgICByZXR1cm4gc3VwZXIudG9KU09OKCk7XG4gICAgfVxufVxuZXhwb3J0cy5PYmplY3RPYnNlcnZhYmxlID0gT2JqZWN0T2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgT2JqZWN0UHJveHlIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfbWV0aG9kc1RvV2F0Y2gsIF93YXRjaFNldCwgX3dhdGNoRGVsZXRlLCBfdHJpZ2dlck9ubHlPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9tZXRob2RzVG9XYXRjaCA9IF9tZXRob2RzVG9XYXRjaDtcbiAgICAgICAgdGhpcy5fd2F0Y2hTZXQgPSBfd2F0Y2hTZXQ7XG4gICAgICAgIHRoaXMuX3dhdGNoRGVsZXRlID0gX3dhdGNoRGVsZXRlO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gX3RyaWdnZXJPbmx5T25DaGFuZ2U7XG4gICAgfVxuICAgIGdldCh0YXJnZXQsIGtleSwgcHJveHkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZENhbGxlZCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICAvLyBTaWxlbnQgcGFzcy10aHJvdWdoIG9mIG5vbi13YXRjaGVkIG1ldGhvZHNcbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRob2RzVG9XYXRjaC5pbmRleE9mKGtleS50b1N0cmluZygpKSA9PT0gLTEgfHwgdHlwZW9mIG1ldGhvZENhbGxlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RDYWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSB3cmFwcGVyIGFyb3VuZCB0aGUgbWV0aG9kIHRoYXQgcHVibGlzaGVzIHRoZSBjaGFuZ2VcbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbCA9IG1ldGhvZENhbGxlZC5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywga2V5LCB1bmRlZmluZWQsIGFyZ3MsIHByb3h5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSkge1xuICAgICAgICBpZiAodGhpcy5fd2F0Y2hTZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gSWYgdG8gYmUgdHJpZ2dlcmVkIG9ubHkgb24gY2hhbmdlLCBjaGVjayBvbGRWYWx1ZSBhbmQgbmV3VmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlICYmIG9sZFZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ3NldCcsIGtleSwgb2xkVmFsdWUsIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoRGVsZXRlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgLy8gQ2Fubm90IHJlcG9ydCBwcm94eSBhcyBzZW5kZXIgYmVjYXVzZSBwcm94eSBub3Qgc2VudCB0byB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2RlbGV0ZScsIGtleSwgb2xkVmFsdWUsIHVuZGVmaW5lZCwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk9iamVjdFByb3h5SGFuZGxlciA9IE9iamVjdFByb3h5SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgT2JzZXJ2YWJsZVByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG4vKipcbiAqIFRoaXMgaXMgYSBzaW1wbGUgaW1wbGVtZW50YXRpb24gb2YgT2JqZWN0LmFzc2lnbigpIHRoYXQgdW5kZXJzdGFuZHMgT2JzZXJ2YWJsZVByb3BlcnR5LFxuICogc28gdGhhdCBpdCBjYW4gdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2l0aG91dCB3aXBpbmcgb3V0IHJlZmVyZW5jZXMgdG8gdGhlXG4gKiBleGlzdGluZyBwcm9wZXJ0eSB3aXRoIHRoYXQga2V5ICh3aGljaCBpcyB3aGF0IHdvdWxkIGhhcHBlbiBpZiB5b3UgdXNlZCByZWd1bGFyIE9iamVjdC5hc3NpZ24oKVxuICogb24gYSBub24tcHJveGllZCBvYmplY3QpLiAgSXQgY2FuIGFsc28gYmUgdXNlZCB0byByZWFkIHRoZSB2YWx1ZSBvZiBhbiBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIG9ic2VydmFibGVBc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHt9O1xuICAgIGZvciAoY29uc3Qgc3JjIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3JjKSkge1xuICAgICAgICAgICAgY29uc3Qgc3Byb3AgPSBzcmNba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHRwcm9wID0gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICBsZXQgdmFsO1xuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNwcm9wKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHNwcm9wLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsID0gc3Byb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sodHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdHByb3AudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUFzc2lnbiA9IG9ic2VydmFibGVBc3NpZ247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuLyoqXG4gKiBDb21tb24gbG9naWMgYmV0d2VlbiB0aGUgZGlmZmVyZW50IG9ic2VydmFibGUgY2xhc3Nlcy4gVGhlc2UgaW1wbGVtZW50IElPYnNlcnZhYmxlLiBUaGUgaW52b2NhdGlvbiBpdHNlbGYgdmFyaWVzIGZyb20gY2xhc3MgdG8gY2xhc3MuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGZvcndhcmRUbywgYnViYmxlRnJvbSwgZGlzYWJsZUFzeW5jIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGlmIChkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcndhcmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBidWJibGVGcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWdEZWxlZ2F0ZShuYW1lKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgaGFzIGZvcmdvdHRlbiB0aGF0IEV2ZW50SGFuZGxlciBjYW4gYWNjZXB0IGFuIGFycmF5LlxuICAgICAgICAvLyBJbiBzcGl0ZSBpZiB0aGUgZmFjdCB0aGF0IHRoaXMgc2lnbmF0dXJlIGlzIGlkZW50aWNhbC5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci5zdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhlIGlucHV0J3MgZGVsZWdhdGUgdG8gdGhpcyBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pIHtcbiAgICAgICAgLy8gSm9pbiB0aGUgb3RoZXIgZXZlbnQgaGFuZGxlciB0byB0aGlzLCBzbyB0aGF0IHdoZW4gdGhpcyBpcyBpbnZva2VkLCBzbyBpcyB0aGUgb3RoZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKGZvcndhcmRUby5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoaXMgb2JqZWN0J3MgZGVsZWdhdGUgdG8gdGhlIGlucHV0IG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oYnViYmxlRnJvbSkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gZXZlbnRzIHJhaXNlZCBvbiB0aGUgb3RoZXIgaGFuZGxlciwgc28gdGhhdCB3aGVuIHRoYXQgaXMgaW52b2tlZCwgc28gaXMgdGhpc1xuICAgICAgICAvLyBUaGUgc2FtZSBhcyBmb3J3YXJkQ2hhbmdlRXZlbnRzVG8gZXhjZXB0IHRoYXQgdGhpcyBpcyB0aGUgdGFyZ2V0LCBub3QgdGhlIHNvdXJjZS5cbiAgICAgICAgYnViYmxlRnJvbS5zdWJzY3JpYmUodGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZVNlbmRlcihzZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcik7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwcm9iYWJseSBmcm93bmVkIHVwb24gKHNlZSBob3cgVFMgZG9lc24ndCBsaWtlIGl0KSwgYnV0IGl0J3MgdmFsaWQgSlMuXG4gICAgICogSXQncyBvbmx5IGludGVuZGVkIGZvciB0cm91Ymxlc2hvb3RpbmcsIG5vdCByZWFsIGxvZ2ljLiBUaGVyZSBhcmUgdGltZXMgd2hlbiB5b3UncmVcbiAgICAgKiB0cnlpbmcgdG8gaWRlbnRpZnkgZXhhY3RseSB3aGljaCBkZWxlZ2F0ZXMgYXJlIHN1YnNjcmliZWQsIGFuZCB0aGlzIGlzIHJlYWxseSBoYXJkIHdoZW5cbiAgICAgKiBub3RoaW5nIGhhcyBodW1hbi1yZWFkYWJsZSBuYW1lcy5cbiAgICAgKi9cbiAgICB0YWdEZWxlZ2F0ZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUuX3RhZyA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB4IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBcImNoYW5nZUhhbmRsZXJcIiAmJiB4ICE9PSBcInByaXZhdGVQcm9wZXJ0eTJcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdFt4XSA9IHRoaXNbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVCYXNlID0gT2JzZXJ2YWJsZUJhc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gT2JzZXJ2YWJsZVByb3BlcnR5IGlzIGEgcHJvcGVydHkgdGhhdCBhdXRvbWF0aWNhbGx5IHJhaXNlcyBhIFByb3BlcnR5Q2hhbmdlZCBldmVudCB3aGVuIGl0IGlzIG1vZGlmaWVkLiBUaGlzIGlzIG1vcmVcbiAqIGNvbnZlbmllbnQgdGhhbiBoYXZpbmcgdG8gZG8gaXQgbWFudWFsbHkgZXZlcnkgdGltZSB5b3UgbmVlZCBpdC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVByb3BlcnR5IGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IG9wdGlvbnMub25seVdoZW5DaGFuZ2VkIHx8IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkLCB2YWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgKGlmIGEgc3RyaW5nKSB0aGF0IGhhcyBoYWQgc3BlY2lhbCBIVE1MIGNoYXJhY3RlcnMgZXNjYXBlZC5cbiAgICAgKi9cbiAgICBnZXQgc2FmZVZhbHVlKCkge1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVQcm9wZXJ0eSA9IE9ic2VydmFibGVQcm9wZXJ0eTtcbmZ1bmN0aW9uIG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3QgbGlrZSB0aGlzIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGNoZWNraW5nIGlmIHZhbHVlIGlzIGEgc2V0dGVyLFxuICAgIC8vIGFuZCBpdCBpc24ndCwgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gY2hlY2suXG4gICAgLy8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpIGRvZXNuJ3QgY2F0Y2ggaW5oZXJpdGVkIHByb3BlcnRpZXMsIG9mXG4gICAgLy8gd2hpY2ggdGhpcyBpcyBhbG1vc3QgYWx3YXlzIG9uZS5cbiAgICAvLyBJIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGEgYmFzaWMgaW5zdGFuY2UgY2hlY2suXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlUHJvcGVydHk7XG59XG5leHBvcnRzLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrID0gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5T2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlXCIpO1xuY29uc3QgQXJyYXlQcm94eUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL0FycmF5UHJveHlIYW5kbGVyXCIpO1xuY29uc3QgT2JqZWN0T2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvT2JqZWN0T2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9iamVjdFByb3h5SGFuZGxlcl8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyXCIpO1xuY2xhc3MgT2JzZXJ2YWJsZVByb3h5IHtcbiAgICBzdGF0aWMgcHJveGltYXRlKG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgZG8gZnVuY3Rpb25zLCBub3QgdGhhdCB0aGV5IHdvdWxkIGJlIHZlcnkgdXNlZnVsLlxuICAgICAgICAgICAgLy8gWWVzLCB0ZWNobmljYWxseSB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gZGVmaW5lIHByb3BlcnRpZXMgb24gYSBmdW5jdGlvbi4gVGhleSBhcmUgYWN0dWFsXG4gICAgICAgICAgICAvLyBvYmplY3RzLiAgSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpIHN0aWxsIG1ha2VzIHRoZW0gdW5kZWZpbmVkLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB0eXBlOiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobW9kZWwpKSB7XG4gICAgICAgICAgICAvLyBBbiBhcnJheSBwcm94eSBhbGxvd3MgY2hhbmdlcyB0byBhbiBhcnJheSB0byBiZSBvYnNlcnZlZC4gVGhlIGRvd24tc2lkZSBpcyB0aGF0IHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAvLyBpcyBhbiBvcmRlciBvZiBtYWduaXR1ZGUgc2xvd2VyIHRoYW4gdXNpbmcgYW4gT2JzZXJ2YWJsZUxpc3QuICBUaGUgdXAtc2lkZSBpcyB0aGF0IGl0IHVzZXNcbiAgICAgICAgICAgIC8vIG1vcmUgdGhhbiBhbiBvcmRlciBvZiBtYWduaXR1ZGUgbGVzcyBjb2RlLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlQXJyYXkobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlT2JqZWN0KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgYSBzaW1wbGUgdmFsdWUgaXMgcmV0dXJuZWQsIHJldHVybiBhIHByb3h5IGhhdmluZyBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlT2JqZWN0KHsgdmFsdWU6IG1vZGVsIH0sIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBjb25maWd1cmFibGUgdmVyc2lvbiBvZiBwcm94aW1hdGUoKSBjYWxsZWQgb24gYW4gb2JqZWN0LiBCeSBtYWtpbmcgaXQgZ2VuZXJhbGl6ZWQgYW5kIGNvbmZpZ3VyYWJsZSwgdGhpcyBhbGxvd3MgdGhlIGNhbGxlciB0b1xuICAgICAqIHRyYWNrIG1ldGhvZHMgdGhhdCBhcmUgY2FsbGVkLCBiYXNlZCBvbiBhIGNvbmZpZ3VyYWJsZSBsaXN0LlxuICAgICAqXG4gICAgICogSWYgdGhlIG9iamVjdCBpcyBhIGNvbXBsZXggb2JqZWN0LCB3aGVyZSBjaGlsZCBvYmplY3RzIGFyZSBtb2RpZmllZCwgbm90IHRoZSBtYWluIG9iamVjdCwgY2hhbmdlcyB3b3VsZCBub3QgYmUgY2F1Z2h0LlxuICAgICAqIE9uZSB3YXkgdG8gaGFuZGxlIHRoYXQgaXMgdG8gbWFrZSB0aGUgY2hpbGQgb2JqZWN0IGEgcHJveHkuIEFub3RoZXIgd2F5IGlzIHRvIGFjY2VzcyB0aGUgY2hpbGQgb2JqZWN0IG9ubHkgdGhyb3VnaCBtZXRob2RzXG4gICAgICogYW5kIHVzZSB0aGlzLlxuICAgICAqL1xuICAgIHN0YXRpYyBwcm94aW1hdGVPYmplY3QobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCwgbWV0aG9kc1RvV2F0Y2ggPSBbXSwgd2F0Y2hTZXQgPSB0cnVlLCB3YXRjaERlbGV0ZSA9IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgZG8gZnVuY3Rpb25zLCBub3QgdGhhdCB0aGV5IHdvdWxkIGJlIHZlcnkgdXNlZnVsLlxuICAgICAgICAgICAgLy8gWWVzLCB0ZWNobmljYWxseSB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gZGVmaW5lIHByb3BlcnRpZXMgb24gYSBmdW5jdGlvbi4gVGhleSBhcmUgYWN0dWFsXG4gICAgICAgICAgICAvLyBvYmplY3RzLiAgSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpIHN0aWxsIG1ha2VzIHRoZW0gdW5kZWZpbmVkLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB0eXBlOiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBJT2JzZXJ2YWJsZSBtZXRob2RzIHRvIHRoZSBtb2RlbCBzbyB0aGF0IGl0IGNhbiByYWlzZSBldmVudHMuXG4gICAgICAgIC8vIFdlIG11c3QgZXh0ZW5kIHRoZSBvcmlnaW5hbCBjbGFzcyAob3IgYXQgbGVhc3QgdGhlIG9iamVjdCkuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdE9ic2VydmFibGVfMS5PYmplY3RPYnNlcnZhYmxlLmdldE1lcmdlZE9ic2VydmFibGUobW9kZWwsIGRpc2FibGVBc3luYyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT2JqZWN0UHJveHlIYW5kbGVyXzEuT2JqZWN0UHJveHlIYW5kbGVyKG1ldGhvZHNUb1dhdGNoIHx8IFtdLCB3YXRjaFNldCB8fCBmYWxzZSwgd2F0Y2hEZWxldGUgfHwgZmFsc2UsIG9ubHlJZkNoYW5nZWQgfHwgZmFsc2UpO1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlUHJveHkuX21vZGVscy5zZXQocHJveHksIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJveGltYXRlIGFuIGFycmF5LlxuICAgICAqL1xuICAgIHN0YXRpYyBwcm94aW1hdGVBcnJheShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKSB7XG4gICAgICAgIC8vIEFkZCBJT2JzZXJ2YWJsZSBtZXRob2RzIHRvIHRoZSBtb2RlbCBzbyB0aGF0IGl0IGNhbiByYWlzZSBldmVudHMuXG4gICAgICAgIC8vIFdlIG11c3QgZXh0ZW5kIHRoZSBvcmlnaW5hbCBhcnJheSBjbGFzcyAob3IgYXQgbGVhc3QgdGhlIGFycmF5IG9iamVjdCkuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IEFycmF5T2JzZXJ2YWJsZV8xLkFycmF5T2JzZXJ2YWJsZS5nZXRNZXJnZWRPYnNlcnZhYmxlKG1vZGVsLCBkaXNhYmxlQXN5bmMpO1xuICAgICAgICAvLyBUaGUgdHlwZSBoZXJlIGlzbid0IGFjY3VyYXRlLCBidXQgSSBoYXZlIG5vIGdvb2Qgd2F5IHRvIHBhc3MgdGhlIGtleSB0eXBlIHdpdGhvdXQgbWFraW5nIHRoaXMgY2xhc3Mgb25seSB3b3JrIGZvciBhcnJheXMuXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQXJyYXlQcm94eUhhbmRsZXJfMS5BcnJheVByb3h5SGFuZGxlcigpO1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlUHJveHkuX21vZGVscy5zZXQocHJveHksIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG59XG4vLyBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCBuZWVkcyB0byBiZSBzdG9yZWQgc29tZXdoZXJlIHNvIHRoYXQgdGhlIHByb3h5IGNhbiB3b3JrLlxuLy8gVGhlcmUncyBubyByZWFzb24gdGhhdCB0aGUgdXNlciBjYW4ndCBrZWVwIGEgY29weSBidXQgd2Ugc2hvdWxkbid0IGZvcmNlIHRoYXQuXG5PYnNlcnZhYmxlUHJveHkuX21vZGVscyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLk9ic2VydmFibGVQcm94eSA9IE9ic2VydmFibGVQcm94eTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDbG9uZURlZXBfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBvYnNlcnZhYmxlIHN0YXRlIHRoYXQgc2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgdXNpbmcgdGhlIHJlbGV2YW50IG1ldGhvZHMsIGFsbG93aW5nIGF0b21pYyBjaGFuZ2VzIHRvIG11bHRpcGxlIHByb3BlcnRpZXNcbiAqIGluIG11bHRpcGxlIG9iamVjdHMsIHJhaXNpbmcgYSBzaW5nbGUgZXZlbnQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVTdGF0ZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICdzZXRTdGF0ZSc7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgLy8gSSB3b3VsZCBwcmVmZXIgdGhhdCB0aGlzIHJldHVybiBSZWFkb25seTxUPiBidXQgZ2V0dGVyIGFuZCBzZXR0ZXIgaGF2ZSB0byBiZSB0aGUgc2FtZSB0eXBlLlxuICAgICAgICAvLyBUaGF0IG1lYW5zIHlvdSB3b3VsZCBoYXZlIHRvIGNhc3QgYW55IHZhbHVlIHlvdSBzZXQgYXMgYSByZWFkb25seSwgd2hpY2ggaXMgYSBQSVRBLlxuICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcndyaXRlcyB0aGUgZW50aXJlIHZhbHVlLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0U2FmZVZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodG1wKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0bXApKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRtcCkpO1xuICAgIH1cbiAgICBnZXRWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgIH1cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHNldFN0YXRlKHZhbHVlLCBvdmVyV3JpdGVBbGwgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZTtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xuICAgICAgICAvLyBJZiB0aGUgdHlwZSBpcyBwcmltaXRpdmUsIHRoZW4gYSBmdWxsIG92ZXJ3cml0ZSBpcyBhbGxvd2VkXG4gICAgICAgIGlmIChJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgLy8gRnVuY3Rpb25zIHdpbGwgZXhlY3V0ZSBidXQgdGhleSB3b24ndCBjaGFuZ2UgdGhlIHZhbHVlLiBUaGUgcmVhc29uIGlzIHRoZSBzYW1lIHJlYXNvbiB0aGF0IHRoaXMgbWFrZXMgbm8gcGVybWFuZW50IGNoYW5nZSB0byBiYXI6XG4gICAgICAgICAgICAvLyB2YXIgZm9vID0gZnVuY3Rpb24oc3RyKSB7IHN0ciA9IHN0ci50b1VwcGVyQ2FzZSgpOyB9OyB2YXIgYmFyID0gJ2FiYyc7IGZvbyhiYXIpOyBjb25zb2xlLmxvZyhiYXIgPT09ICdhYmMnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHNldFN0YXRlIHdpdGggYSBmdW5jdGlvbiBpZiBzdGF0ZSBpcyBwcmltaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVyV3JpdGVBbGwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdmVyV3JpdGVBbGwpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjFfb3ZlcndyaXRlQWxsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgW25ld1ZhbHVlLCByZXR1cm5WYWx1ZV0gPSBfb3ZyM19mdW5jdGlvbkFyZy5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndmFsdWUgaXMgbm90IGEgcGFydGlhbCBzdGF0ZSBvciBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIyX3BhcnRpYWwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB7IG9sZFZhbHVlLCBuZXdWYWx1ZSwgcmV0dXJuVmFsdWUgfTtcbiAgICAgICAgZnVuY3Rpb24gX292cjFfb3ZlcndyaXRlQWxsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBlbnRpcmUgb2JqZWN0LlxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAoX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjJfcGFydGlhbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFBhcnRpYWwgb2JqZWN0OiBPdmVyd3JpdGUgb25seSB0aGUga2V5cyBwcm92aWRlZFxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0bXBba2V5XSA9IF92YWx1ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjNfZnVuY3Rpb25BcmcoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmdW5jdGlvbiBwcm92aWRlZCBhbmQgdXBkYXRlIHRoZSBvYmplY3QgYXMgZGljdGF0ZWRcbiAgICAgICAgICAgIC8vIE1heWJlIHVubmVjZXNzYXJ5IGJ1dCB3ZSB3YW50IHRvIGF2b2lkIHRoZSBjYWxsZXIgZXhmaWx0cmF0aW5nIHRoZSBzdGF0ZSB1c2luZyBhIGZ1bmN0aW9uLFxuICAgICAgICAgICAgLy8gYnkgYWNjaWRlbnQuIE9mIGNvdXJzZSwgdGhleSBjYW4ganVzdCBhY2Nlc3MgX3ZhbHVlIGJ5IGNhc3RpbmcgYXMgYW55LFxuICAgICAgICAgICAgLy8gYnV0IHRoYXQncyBub3QgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBfcmV0dXJuVmFsdWUgPSBfdmFsdWUuY2FsbCh0bXAsIHRtcCk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIFt0bXAsIF9yZXR1cm5WYWx1ZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVTdGF0ZSA9IE9ic2VydmFibGVTdGF0ZTtcbmZ1bmN0aW9uIG9ic2VydmFibGVTdGF0ZUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3Qga25vdyBpZiBJIHNob3VsZCBjaGVjayBmb3IgdGhpcyBvciBmb3IgZ2V0U3RhdGUoKSBhbmQgc2V0U3RhdGUoKVxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlU3RhdGVDaGVjayA9IG9ic2VydmFibGVTdGF0ZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRGVsZXRlTm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0RlbGV0ZU5vZGVDb250ZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogSWYgeW91IGNsaWNrIGEgbGluayBpbiBhIHJlYWwgd2ViIHNpdGUsIHRoZSBicm93c2VyIGFza3MgdGhlIHNlcnZlciBmb3IgYSBwYWdlIGFuZCBpdCByb3V0ZXMgeW91IHRvIHRoZSByZWxldmFudFxuICogcGFnZS4gQnV0IGlmIHlvdSBoYXZlIGEgc2luZ2xlIHBhZ2UgYXBwIHJ1bm5pbmcgb24gYSBmaWxlLCB3aXRoIG5vIHdlYiBzZXJ2ZXIsIGxpa2UgdGhlIG9uZSB0aGlzIGZyYW1ld29ya1xuICogd2FzIGJ1aWx0IGZvciwgeW91IG5lZWQgc29tZXRoaW5nIHRvIHNpbXVsYXRlIHRoYXQuXG4gKlxuICogVGhpcyBjbGFzcyBjbGVhcnMgdGhlIHJvdXRlIGNvbnRhaW5lciwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gYmUgYSBzdGF0aWMgY29udGFpbmVyIGluIHRoZSB3cmFwcGVyIEhUTUwgcGFnZSwgb3IgdGhlIGJvZHkuXG4gKiBXaGVuIHlvdSBnaXZlIGl0IHRoZSByZWxldmFudCByb3V0ZSwgaXQgZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIG9yIHJldHVybnMgdGhlIHZpZXcvSFRNTCBlbGVtZW50IHlvdSBkZWZpbmVkIGZvciB0aGUgcm91dGUsXG4gKiBhbmQgc3RpY2tzIGl0IGluc2lkZSB0aGUgY29udGFpbmVyLiBUaGUgZWxlbWVudCByZXR1cm5lZCBjYW4gYmUgd3JhcHBlZCBpbiBhIGxheW91dCB2aWV3LCBsaWtlIGluIEFTUC5OZXQuXG4gKlxuICogVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uLCB3aXRob3V0IHRoZSByZWN1cnNpdmUgcm91dGVzIGZvdW5kIGluIHRoZSBhZHZhbmNlZCByb3V0ZXIuIEl0IHdhcyBiYXNlZCBtb3JlIG9uIEFTUC5OZXQgb3Igbm9kZS5qc1xuICogcm91dGluZywgd2hlcmUgeW91IGhhdmUgYSBmbGF0IHNldCBvZiByb3V0ZXMgYW5kIG9uY2UgeW91IGZpbmQgYSByb3V0ZSwgeW91J3JlIGRvbmUuXG4gKi9cbmNsYXNzIFBhZ2VSb3V0ZXIge1xuICAgIHN0YXRpYyBnZXQgYWxsUm91dGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IG1hdGNoZWRSb3V0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZWRSb3V0ZSB8fCB7IHJvdXRlOiAnJywgcGFyYW1zOiBuZXcgTWFwKCksIGNvbmZpZzogeyByb3V0ZTogJycgfSB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlZFJvdXRlLnBhcmFtcztcbiAgICB9XG4gICAgc3RhdGljIGdldCBoaXN0b3J5TWF4TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeU1heExlbmd0aDtcbiAgICB9XG4gICAgc3RhdGljIHNldCBoaXN0b3J5TWF4TGVuZ3RoKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9oaXN0b3J5Lmxlbmd0aCA+IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5Lmxlbmd0aCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpc3RvcnlNYXhMZW5ndGggPSB2YWx1ZTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBoaXN0b3J5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgICB9XG4gICAgc3RhdGljIHNldCBub3RGb3VuZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ub3RGb3VuZCA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIG11c3QgYmUgY2FsbGVkIGZpcnN0IGJlZm9yZSB1c2luZyBpdCwgYmVjYXVzZSBKUyBkb2Vzbid0IGhhdmUgc3RhdGljIGNvbnN0cnVjdG9ycyBsaWtlIEMjLiBJdCBzZXRzIHVwIHRoZVxuICAgICAqIHJvdXRlIGNvbnRhaW5lciwgY3VzdG9tIGVsZW1lbnRzLCBhbmQgYWxzbyBhbGxvd3Mgb25lLXN0ZXAgY29uZmlndXJhdGlvbiBvZiBzZXZlcmFsIG90aGVyIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBBY2NlcHRzIEtleXdvcmQgQXJndW1lbnRzLlxuICAgICAqL1xuICAgIHN0YXRpYyBjb25maWd1cmUocm91dGVzID0gW10sIGRlZmF1bHRMYXlvdXQsIGRlZmF1bHRTdGF0aWNMYXlvdXQsIG5vdEZvdW5kLCBkZWZhdWx0Um91dGUsIHVybFJvdXRpbmdFbmFibGVkID0gdHJ1ZSkge1xuICAgICAgICAoeyByb3V0ZXMsIGRlZmF1bHRMYXlvdXQsIGRlZmF1bHRTdGF0aWNMYXlvdXQsIG5vdEZvdW5kLCBkZWZhdWx0Um91dGUsIHVybFJvdXRpbmdFbmFibGVkID0gdHJ1ZSB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHJvdXRlcywgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgdGhpcy5fY29uZmlndXJlZCA9IHRydWU7XG4gICAgICAgIGlmIChub3RGb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5fbm90Rm91bmQgPSBub3RGb3VuZDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJ0ZSBvZiByb3V0ZXMpIHtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0TGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgcnRlLmxheW91dCA9IHJ0ZS5sYXlvdXQgfHwgZGVmYXVsdExheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUoZGVmYXVsdFN0YXRpY0xheW91dCkgJiYgTm9uZVR5cGVfMS5pc05vbmUocnRlLnN0YXRpY0xheW91dCkpIHtcbiAgICAgICAgICAgICAgICBydGUuc3RhdGljTGF5b3V0ID0gZGVmYXVsdFN0YXRpY0xheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkUm91dGUocnRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsUm91dGluZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGFsbG93cyBnb2luZyB0byBhIG5ldyBwYWdlIGJ5IGNoYW5naW5nIHRoZSBVUkwgaW5zdGVhZCBvZiBoYXZpbmcgdG8gaXNzdWUgcm91dGUoKSBjb21tYW5kcy5cbiAgICAgICAgICAgIHRoaXMudHVybk9uVXJsUm91dGluZygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm91dGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJvdXRlcicpIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ3BhZ2Utcm91dGVyJykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdwYWdlLXJvdXRlcicsIERpdlBhZ2UsIHsgZXh0ZW5kczogJ2RpdicgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2xheW91dC1ib2R5JykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdsYXlvdXQtYm9keScsIERpdkxheW91dCwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbm90LWZvdW5kJykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdub3QtZm91bmQnLCBEaXZOb3RGb3VuZCwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdWx0Um91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFJvdXRlKGRlZmF1bHRSb3V0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gTm90ZTogdGhlcmUgaXMgbm8gcmVtb3ZlUm91dGUuIFRoZXJlIGNvdWxkIGJlLCBidXQgaXQncyBuZXZlciBuZWVkZWQuXG4gICAgc3RhdGljIGFkZFJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGxldCByb3V0ZXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvdXRlLnJvdXRlKSkge1xuICAgICAgICAgICAgcm91dGVzID0gcm91dGUucm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByb3V0ZXMgPSBbcm91dGUucm91dGVdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JvdXRlcy5maW5kKHEgPT4gcS5yb3V0ZSA9PT0gcnRlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdXRlIGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IE9iamVjdC5hc3NpZ24oe30sIHJvdXRlKTtcbiAgICAgICAgICAgIHRtcC5yb3V0ZSA9IHJ0ZTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcy5wdXNoKHRtcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgbGlua2VkIHRvIGEgcGFydGljdWxhciBwYWdlIChvbiB0aGUgaGFzaCksIGdvIHRvIGl0LiBFbHNlLCBnbyB0byB0aGUgcm91dGUgc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIHN0YXRpYyBkZWZhdWx0Um91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICBQYWdlUm91dGVyLnJvdXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBQYWdlUm91dGVyLnJvdXRlKHJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcm91dGUocm91dGUsIHVwZGF0ZVVybCA9IHRydWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWd1cmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2VSb3V0ZXIgbm90IGNvbmZpZ3VyZWQuIENhbGwgY29uZmlndXJlKCkgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgICAgLy8gQWxsb3cgYWN0dWFsIGxpbmtzIHZpYSB0aGUgaGFzaC4gSGFzaCBsaW5rcyBkb24ndCBmb3JjZSBhIHBhZ2UgcmVsb2FkIGFuZCB0aGV5IHdvcmsgdy9vIGEgd2ViIHNlcnZlci5cbiAgICAgICAgICAgIC8vIFRvIGF2b2lkIGhhdmluZyB0byBjYWxsIHJvdXRlKCkgbWFudWFsbHksIHlvdSBtdXN0IGNhbGwgdHVybk9uVXJsUm91dGluZygpO1xuICAgICAgICAgICAgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcbiAgICAgICAgICAgIC8vIFRoZXJlIGlzIGEgcHJvYmxlbSwgd2hpY2ggaXMgdGhhdCBzZXR0aW5nIHRoZSBoYXNoIHdpbGwgdHJpZ2dlciBBTk9USEVSIHJvdXRlIGNoYWluZ2UgdmlhIHRoZSBoYXNoY2hhbmdlIG9wZXJhdGlvbi5cbiAgICAgICAgICAgIC8vIFJlbW92aW5nIHRoZSBoYXNoIGNoYW5nZSBhbmQgdGhlbiByZXN0b3JpbmcgaXQgbGF0ZXIgZG9lcyBub3RoaW5nLiBJdCdzIHN0aWxsIHRyaWdnZXJlZC5cbiAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZXMgaGFja3dvcmsuIEV2ZW4gdGhlIHNpbXBsZSByb3V0ZXIgaGFzIG1vcmUgaGFja3MgdGhhbiBJIGxpa2UuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIHdhcyB0cmlnZ2VyZWQgYnkgYSBoYXNoIGNoYW5nZSBhbmQgdGhlIHJvdXRlIGlzIHRoZSBzYW1lLCB0aGVuIGRvbid0IGRvIGFueXRoaW5nLlxuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGxhc3Qgcm91dGUgc28gdGhhdCBpdCBkb2Vzbid0IGludGVyZmVyZSB3aXRoIHRoZSBuZXh0IGhhc2ggY2hhbmdlLlxuICAgICAgICAgICAgaWYgKHJvdXRlID09PSB0aGlzLl9sYXN0Um91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZVVybCkge1xuICAgICAgICAgICAgLy8gSWYgYSByb3V0ZSBpcyBzZW50IGluLCB0aGVuIHNldCB0aGUgaGFzaC5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcm91dGU7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXRjaDtcbiAgICAgICAgbGV0IHNlYXJjaFJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHJ0ZSBvZiB0aGlzLl9yb3V0ZXMpIHtcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdCA9IHRoaXMuX3Rlc3RSb3V0ZShydGUucm91dGUsIHJvdXRlIHx8ICcnKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHJ0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJvdXRlICR7cm91dGV9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldmlvdXNSb3V0ZSA9ICh0aGlzLl9tYXRjaGVkUm91dGUgfHwge30pLmNvbmZpZztcbiAgICAgICAgdGhpcy5fbWF0Y2hlZFJvdXRlID0geyByb3V0ZSwgcGFyYW1zOiBzZWFyY2hSZXN1bHQgfHwgbmV3IE1hcCgpLCBjb25maWc6IG1hdGNoIH07XG4gICAgICAgIC8vIEFkZCByb3V0ZSB0byBoaXN0b3J5IGlmIGl0J3MgZGlmZmVyZW50IGZyb20gdGhlIHByZXZpb3VzIGxhdGVzdCBoaXN0b3J5XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID09PSAwIHx8IHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMV0gIT09IHJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2gocm91dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gdGhpcy5oaXN0b3J5TWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvdXRlR3VhcmRzID0gW107XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoLnJvdXRlR3VhcmRzKSkge1xuICAgICAgICAgICAgcm91dGVHdWFyZHMgPSBtYXRjaC5yb3V0ZUd1YXJkcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXRjaC5yb3V0ZUd1YXJkcykge1xuICAgICAgICAgICAgcm91dGVHdWFyZHMucHVzaChtYXRjaC5yb3V0ZUd1YXJkcyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCByZyBvZiByb3V0ZUd1YXJkcykge1xuICAgICAgICAgICAgY29uc3QgdGVzdCA9IHJnLmNoZWNrVmFsaWQobWF0Y2gpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JvdXRlIHBlcm1pc3Npb24gZGVuaWVkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlclJvdXRlKG1hdGNoLCBwcmV2aW91c1JvdXRlKTtcbiAgICB9XG4gICAgc3RhdGljIGJhY2soKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzbid0IGFueSBoaXN0b3J5IHRvIGdvIGJhY2sgdG8sIGRvbid0IGdvIGJhY2suXG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpc3RvcnkucG9wKCk7IC8vIEN1cnJlbnQgcm91dGUgc2l0cyBhdCB0aGUgdG9wIG9mIHRoZSBzdGFja1xuICAgICAgICBjb25zdCByb3V0ZSA9IHRoaXMuX2hpc3RvcnkucG9wKCk7IC8vIHByZXZpb3VzIHJvdXRlXG4gICAgICAgIGlmIChyb3V0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlKHJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgdHVybk9uVXJsUm91dGluZygpIHtcbiAgICAgICAgdGhpcy5faGFzaENoYW5nZSA9IChldnQpID0+IHsgdGhpcy5yb3V0ZSgpOyB9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX2hhc2hDaGFuZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgX3Rlc3RSb3V0ZShyb3V0ZVN0cmluZywgdXJsU3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKCFyb3V0ZVN0cmluZyB8fCAhdXJsU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVTdHJpbmcgPSByb3V0ZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAocm91dGVTdHJpbmcuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgcm91dGVTdHJpbmcgPSByb3V0ZVN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybFN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlQXJyYXkgPSByb3V0ZVN0cmluZy5zcGxpdCgnLycpO1xuICAgICAgICBjb25zdCB1cmxBcnJheSA9IHVybFN0cmluZy5zcGxpdCgnLycpO1xuICAgICAgICAvLyBTYW1lIG51bWJlciBvZiAvIGNoYXJhY3RlcnMgcmVxdWlyZWQuXG4gICAgICAgIGlmIChyb3V0ZUFycmF5Lmxlbmd0aCAhPT0gdXJsQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbcm91dGVTZWdtZW50LCB1cmxTZWdtZW50XSBvZiBBcnJheVV0aWxpdGllc18xLnppcChyb3V0ZUFycmF5LCB1cmxBcnJheSkpIHtcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnMgYXJlIGFsbG93ZWQuIE9wdGlvbmFsIHBhcmFtZXRlcnMgYXJlIG5vdC5cbiAgICAgICAgICAgIC8vIFRoZSByZWFzb24gZm9yIG5vIG9wdGlvbmFsIHBhcmFtZXRlcnMgaXMgdGhhdCBmaW5kaW5nIGEgbWF0Y2ggYmV0d2VlbiAvYS86P3BhcmFtL2IgYW5kIC9hL2IgaXMgdG9vIGNvbXBsZXguXG4gICAgICAgICAgICAvLyBJcyAnYicgYSBwYXJhbSB2YWx1ZSBvciBwYXJ0IG9mIHRoZSByb3V0ZS4gQmFzaWNhbGx5LCBvcHRpb25hbCBwYXJhbWV0ZXJzIG9ubHkgd29yayBhdCB0aGUgcm91dGUgZW5kLlxuICAgICAgICAgICAgLy8gSSBub3RpY2VkIHRoYXQgQVNQLk5FVCB3b3JrcyB0aGF0IHdheSBhbmQgSSBmb3VuZCBpdCBjb25mdXNpbmcgdGhhdCBvcHRpb25hbCBwYXJhbWV0ZXJzIG9ubHkgd29yayBhdCB0aGUgZW5kLlxuICAgICAgICAgICAgLy8gSnVzdCBjcmVhdGUgYSBuZXcgcm91dGUgd2l0aCB0aGUgb3B0aW9uYWwgcGFyYW0gbGVmdCBvdXQuXG4gICAgICAgICAgICBpZiAocm91dGVTZWdtZW50LnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gcm91dGVTZWdtZW50LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGlmICghbmFtZS5pbmNsdWRlcygnPScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJvdXRlICR7cm91dGVTdHJpbmd9IGNvbnRhaW5zIGR1cGxpY2F0ZXMgb2YgdGhlIHNhbWUgcGFyYW1ldGVyLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQobmFtZSwgdXJsU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIG1hcHBlZCBzdGF0aWMgcGFyYW0gY2FzZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gbmFtZS5zcGxpdCgnPScpWzFdO1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zcGxpdCgnPScpWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSB1cmxTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgJHtyb3V0ZVN0cmluZ30gY29udGFpbnMgZHVwbGljYXRlcyBvZiB0aGUgc2FtZSBwYXJhbWV0ZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldChuYW1lLCB1cmxTZWdtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb3V0ZVNlZ21lbnQgIT09IHVybFNlZ21lbnQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlbmRlclJvdXRlKHJvdXRlLCBwcmV2aW91cykge1xuICAgICAgICAvLyBDYWxsaW5nIFBhZ2VSb3V0ZXIucm91dGUoJ3RoZSBzYW1lIHVybCcpIHdpbGwgcmVsb2FkIHRoZSBjb250ZW50cyBmcm9tIHNjcmF0Y2guXG4gICAgICAgIC8vIEFkanVzdGluZyB3aW5kb3cubG9jYXRpb24gd2lsbCBkbyBub3RoaW5nIGlmIHRoZSByb3V0ZSBpcyB0aGUgc2FtZS5cbiAgICAgICAgLy8gSSB0aGluayB0aGlzIGlzIGZpbmUsIGFmdGVyIHN0cnVnZ2xpbmcgaW4gYW5ndWxhciB0byByZWxvYWQgdGhlIHBhZ2UgYW5kIGZpbmRpbmdcbiAgICAgICAgLy8gaXQgbXVjaCBoYXJkZXIuXG4gICAgICAgIC8vIE5vdGUgaWYgeW91IGNoYW5nZSB0aGUgbG9jYXRpb24gYmFyLCBDaHJvbWUgZm9yY2VzIGEgcmVsb2FkIG9mIFByb2dyYW0udHMsIG5vdGhpbmcgeW91IGNhbiBkb1xuICAgICAgICAvLyBhYm91dCBpdCBiZWNhdXNlIENocm9tZSBpcyB0aGUgb25lIHRoYXQgZGlzY2FyZGVkIHlvdXIgc3RhdGUuXG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLnJvdXRlQ29udGFpbmVyO1xuICAgICAgICBjb25zdCBrZWVwTGF5b3V0ID0gcm91dGUubGF5b3V0ICYmIHByZXZpb3VzICYmIHJvdXRlLnN0YXRpY0xheW91dCAmJiByb3V0ZS5sYXlvdXQgPT09IHByZXZpb3VzLmxheW91dDtcbiAgICAgICAgaWYgKCFrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgY29udGVudHMgb2YgcGFnZS1yb3V0ZXJcbiAgICAgICAgICAgIERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2VlcExheW91dCkge1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGF5b3V0LWJvZHknKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8bGF5b3V0LWJvZHk+IGVsZW1lbnQgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm91dGUubGF5b3V0KSB7XG4gICAgICAgICAgICBsZXQgbGF5b3V0VmlldztcbiAgICAgICAgICAgIGlmIChDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQocm91dGUubGF5b3V0KSkge1xuICAgICAgICAgICAgICAgIGxheW91dFZpZXcgPSBuZXcgcm91dGUubGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb3V0ZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0VmlldyA9IHJvdXRlLmxheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxheW91dFZpZXcgJiYgdmlld1R5cGVHdWFyZChsYXlvdXRWaWV3KSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYXlvdXRWaWV3LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGF5b3V0Vmlldykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYXlvdXRWaWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xheW91dC1ib2R5Jyk7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignPGxheW91dC1ib2R5PiBlbGVtZW50IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgY29udGVudHMgb2YgbGF5b3V0LWJvZHkgKGJ1dCBrZWVwIGxheW91dClcbiAgICAgICAgICAgIERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlldztcbiAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChyb3V0ZS5wYXlsb2FkKSkge1xuICAgICAgICAgICAgdmlldyA9IG5ldyByb3V0ZS5wYXlsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJvdXRlLnBheWxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZpZXcgPSByb3V0ZS5wYXlsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm91dGUucGF5bG9hZCkge1xuICAgICAgICAgICAgdmlldyA9IHJvdXRlLnBheWxvYWQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3ICYmIHZpZXdUeXBlR3VhcmQodmlldykpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWV3LmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWV3KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2aWV3VHlwZUd1YXJkKHRlc3QpIHtcbiAgICAgICAgICAgIGlmIChcImNvbnRlbnRcIiBpbiB0ZXN0ICYmIHRlc3QuY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZW5kZXJOb3RGb3VuZCgpIHtcbiAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudCh0aGlzLnJvdXRlQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5yb3V0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlkOiAnbm90LWZvdW5kJywgaW5uZXJIVE1MOiB0aGlzLl9ub3RGb3VuZCB8fCBcIlF1b3RoIHRoZSBSYXZlbiwgNDA0XCIgfSkpO1xuICAgIH1cbn1cblBhZ2VSb3V0ZXIucm91dGVDb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xuUGFnZVJvdXRlci5fY29uZmlndXJlZCA9IGZhbHNlO1xuUGFnZVJvdXRlci5fcm91dGVzID0gW107XG5QYWdlUm91dGVyLl9oaXN0b3J5ID0gW107XG5QYWdlUm91dGVyLl9oaXN0b3J5TWF4TGVuZ3RoID0gNTA7XG5leHBvcnRzLlBhZ2VSb3V0ZXIgPSBQYWdlUm91dGVyO1xuLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbi8vIEEgY2xhc3MgaXMgcmVxdWlyZWQgYnV0IHlvdSdyZSBub3QgYWxsb3dlZCB0byB1c2UgdGhlIGV4aXN0aW5nIGNsYXNzIGJlY2F1c2UgaXQgY2FuJ3Rcbi8vIGJlIGNvbnN0cnVjdGVkIChpbnZhbGlkIGNvbnN0cnVjdG9yKS4gQW5kIHlvdSBhcmUgT05MWSBhbGxvd2VkIHRvIGV4dGVuZCBIVE1MRWxlbWVudC5cbi8vIEFORCB0aGV5IG11c3QgYmUgdW5pcXVlLlxuY2xhc3MgRGl2UGFnZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5jbGFzcyBEaXZMYXlvdXQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuY2xhc3MgRGl2Tm90Rm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgZGVmZXJyZWQgcHJvbWlzZSBpcyBhIHdyYXBwZXIgYXJvdW5kIGEgcHJvbWlzZSB0aGF0IGFsbG93cyBpdCB0byBiZSB0cmlnZ2VyZWQgbGF0ZXIuIEluIHB1cmUgSlMsIHRoaXMgaXMgaGFyZGVyXG4gKiB0aGFuIGl0IG5lZWRzIHRvIGJlLCBhbmQgaXQgdGFrZXMgYSB3ZWlyZCBoYWNrIHRvIG1ha2UgaXQgd29yay4gVGhpcyBjbGFzcyBpcyBsaXR0bGUgbW9yZSB0aGFuIGEgd3JhcHBlciBhcm91bmRcbiAqIHNhaWQgaGFjay5cbiAqXG4gKiBPdGhlcndpc2UsIHRoaXMgdXNlcyBhIHJlYWwgcHJvbWlzZSBpbnRlcm5hbGx5LCBzbyBhc2lkZSBmcm9tIHRoZSB3cmFwcGluZyBvYmplY3QsIGl0IGhhcyBubyBzcGVjaWFsIGxvZ2ljLiBJIGNob3NlXG4gKiBub3QgdG8gcmUtaW1wbGVtZW50IHRoZSBQcm9taXNlIEFQSSBzeW5jaHJvbm91c2x5LCBzbyBpdCB1c2VzIHRoZSBzYW1lIG1pY3JvdGFzayBxdWV1ZS5cbiAqXG4gKiBUaGUgd3JhcHBpbmcgQVBJIGlzIHR3ZWFrZWQgYSBsaXR0bGUgdG8gYXZvaWQgc29tZSBjb21tb24gcGl0ZmFsbHMgdGhhdCBhcmUgY2F1c2VkIGJ5IGZsYXdzIGluIHRoZSBQcm9taXNlXG4gKiBkZXNpZ24uIEZvciBleGFtcGxlLCBoYXZpbmcgb25mdWxmaWxsZWQgYW5kIG9ucmVqZWN0ZWQgaW4gdGhlIHNhbWUgc3RlcCBtZWFucyB0aGF0IGVycm9ycyBpbiB0aGUgZnVsZmlsbGVkXG4gKiBoYWxmIHdpbGwgbm90IGJlIGNhdWdodCBieSB0aGUgZXJyb3IgaGFuZGxlci4gIFJhdGhlciB0aGFuIHNheSBcImRvbid0IHVzZSB0aGF0IGlucHV0XCIgbGlrZSBtb3N0IGluc3RydWN0b3JzLFxuICogSSBqdXN0IGdvdCByaWQgb2YgaXQgKGl0J3Mgc3RpbGwgYWNjZXNzaWJsZSBvbiB0aGUgb3V0cHV0IHByb3BlcnR5LCBpZiB5b3Ugd2FudCB0byB1c2UgaXQgLi4uIGJ1dCBkb24ndCkuXG4gKi9cbmNsYXNzIERlZmVycmVkUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yO1xuICAgICAgICAvKiogVXNlIHRoaXMgdG8gaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlc29sdmUgPSBmdW5jdGlvbiBfZHVtbXkoKSB7IH07XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byByZWplY3QgdGhlIHByb21pc2UgcmlnaHQgb3V0LiBXaGljaCBpcyBwcm9iYWJseSB1c2VsZXNzIGJ1dCB5b3UgbmV2ZXIga25vdy4gKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5IFRTIGRvZXNuJ3Qga25vdyB0aGF0IHRoZSBwcm9wZXJ0aWVzIGFyZSByZXBsYWNlZCBpbiB0aGUgcHJvbWlzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgdGhpcy5yZWplY3QgPSBmdW5jdGlvbiBfZHVtbXkoKSB7IH07XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIHdlaXJkIGhhY2sgdGhhdCBpcyB0aGUgYmFzaXMgb2YgdGhpcyBjbGFzcy4gSXQncyBhIGNsb3N1cmUsIGJ1dCByZXZlcnNlZCwgYXMgdGhlXG4gICAgICAgIC8vIGVuY2xvc2VkIHByb3BlcnR5IGlzIGFuIGludGVybmFsIHJlZmVyZW5jZSBhY2Nlc3NlZCBvdXRzaWRlIHJhdGhlciB0aGFuIGFuIG91dHNpZGUgcmVmZXJlbmNlXG4gICAgICAgIC8vIGFjY2Vzc2VkIGluc2lkZS5cbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gX3Jlc29sdmU7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IF9yZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuXG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IgdG8gYWxsb3cgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgLy8gY29uc3Qgd2FpdGFibGUgPSBuZXcgRGVmZXJyZWRQcm9taXNlKCk7IGV2ZW50LnN1YnNjcmliZSh3YWl0YWJsZS5yZXNvbHZlKTsgY29uc3QgciA9IGF3YWl0IHdhaXRhYmxlLm91dHB1dDsgY29uc29sZS5sb2cocik7XG4gICAgICAgIC8vIElmIHlvdSBsZWF2ZSBvdXQgdGhlIGluaXRpYWwgY2FsbGJhY2ssIHlvdSdsbCBnZXQgdW5kZWZpbmVkIGluc3RlYWQgb2Ygd2hhdCB0aGUgZXZlbnQgc2VuZHMuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIGluIGFzeW5jL2F3YWl0IGNvZGUuIFRoZSBmb2xsb3dpbmcgd2lsbCB3b3JrIGlmIGEgcmVzdWx0IGlzIHJldHVybmVkLlxuICAgICAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRlZmVycmVkLm91dHB1dDtcbiAgICAgKiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAqL1xuICAgIGdldCBvdXRwdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cbiAgICAvKiogVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suICovXG4gICAgdGhlbihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRvIGtlZXAgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCdzIHVnbHkuXG4gICAgICAgIC8vIEl0IG1lYW5zIGEgbG90IG9mIGV4dHJhIHN0ZXBzLiBJdCBtYWtlcyBzdXJlIHRoYXQgYnkgZGVmYXVsdCwgdGhlIGxhc3Qgc3RlcCBpcyBhbHdheXMgYSBjYXRjaC5cbiAgICAgICAgaWYgKHRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25yZWplY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2gob25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWdhaW4gdGhpcyBpcyBhIG1lc3MsIGJ1dCB0aGUgY2F0Y2ggaGFuZGxlciBhYm92ZSBjb3VsZCB0aHJvd1xuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZlcnJlZFByb21pc2UgPSBEZWZlcnJlZFByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gKHJlc3VsdCkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUocmVzdWx0KSwgdGltZSkpO1xufVxuZXhwb3J0cy5kZWxheSA9IGRlbGF5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBEZWZlcnJlZFByb21pc2VfMSA9IHJlcXVpcmUoXCIuL0RlZmVycmVkUHJvbWlzZVwiKTtcbi8qKlxuICogVGhlIHByb21pc2UgQVBJIGlzIG5pY2UsIG1vc3RseSwgYnV0IHRoZSBtYWluIHRoaW5nIHByZXZlbnRpbmcgdXNlIG9mIGEgcHJvbWlzZSBhcyBhbiBldmVudCBoYW5kbGVyIGlzIHRoYXRcbiAqIGl0IG9ubHkgZXhlY3V0ZXMgb25jZS4gQWZ0ZXIgdGhhdCBwb2ludCwgaXQgaXMgcmVzb2x2ZWQsIGFuZCB0aGVyZSBpcyBubyB3YXkgdG8gZmxpcCBpdCBiYWNrLlxuICpcbiAqIFRoZSByZXBlYXRhYmxlIHByb21pc2Uga2VlcHMgdGhlIHByb21pc2UgQVBJIGFuZCBjcmVhdGVzIHRoZSBpbGx1c2lvbiB0aGF0IHRoZSBwcm9taXNlIGlzIHJlcGVhdGVkIGJ5XG4gKiByZWJ1aWxkaW5nIHRoZSBjaGFpbiBlYWNoIHRpbWUuIEl0J3MgcmVhbGx5IGEgZGVmZXJyZWQgZmFjdG9yeSBidXQgaXQgcHJldGVuZHMgdG8gYmUgYSBkZWZlcnJlZC4gSSdtIHN1cmVcbiAqIHRoaXMgaGFzIGEgcGVyZm9ybWFuY2UgcGVuYWx0eS5cbiAqXG4gKiBZb3Ugc2hvdWxkIG5vdCBhdHRhY2ggYWN0dWFsIHByb21pc2VzIGludG8gdGhlIHRoZW4oKSBjaGFpbiwgYmVjYXVzZSB0aGV5IGNhbid0IGJlIHJlcGVhdGVkLiBUaGUgUHJvbWlzZSB0eXBlIGlzbid0XG4gKiBhbGxvd2VkIGJ1dCB0aGVyZSBhcmUgd2F5cyB0byBnZXQgYXJvdW5kIHRoZSBUUyBjb21waWxlci4gVGhlIFRTIHR5cGUgZGVmaW5pdGlvbiBmb3IgUHJvbWlzZSBhbmQgUHJvbWlzZUxpa2UgaXNuJ3RcbiAqIGNvbXBsZXRlbHkgY29ycmVjdCwgYW55d2F5LCBzbyBpdCdzIGVhc3kgdG8gZ2V0IHVzZWQgdG8gdXNpbmcgdGhlIGFueSB0eXBlIGFuZCBtYWtlIGJyb2tlbiBjb2RlLlxuICpcbiAqIFlvdSBjYW5ub3QgYXN5bmMvYXdhaXQgYSByZXBlYXRhYmxlIHByb21pc2UgaXRzZWxmIGJ1dCB5b3UgY2FuIGF3YWl0IGEgc2luZ2xlIHJlc29sdXRpb24uIEFzeW5jL2F3YWl0IGlzIHN1Z2FyIHRoYXRcbiAqIGNyZWF0ZXMgYSByZWd1bGFyLCBub24tcmVwZWF0YWJsZSwgcHJvbWlzZS5cbiAqL1xuY2xhc3MgUmVwZWF0YWJsZVByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCBvblVuaGFuZGxlZEVycm9yLCAvLyBUaGlzIGFkZHMgYSBjYWxsYmFjayBhdCB0aGUgZW5kIChvciAybmQgZnJvbSB0aGUgZW5kLCBzZWUgbmV4dCBvcHRpb24pXG4gICAgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgKSB7XG4gICAgICAgIHRoaXMub25VbmhhbmRsZWRFcnJvciA9IG9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yOyAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LiBVc2VmdWwgZm9yIGFzeW5jL2F3YWl0IGNvZGUuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGUgZm9sbG93aW5nIHNob3VsZCB3b3JrOlxuICAgIC8vIGNvbnN0IHJlcGVhdGFibGUgPSBuZXcgUmVwZWF0YWJsZVByb21pc2UoKTsgY29uc3QgciA9IGF3YWl0IHJlcGVhdGFibGUucmVzb2x2ZSgpOyBjb25zb2xlLmxvZyhyKTtcbiAgICByZXNvbHZlKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIHJlamVjdChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIC8vIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLlxuICAgIHRoZW4ob25mdWxmaWxsZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9uZnVsZmlsbGVkOiBvbmZ1bGZpbGxlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9ucmVqZWN0ZWQ6IG9ucmVqZWN0ZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBidWlsZCgpIHtcbiAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGtub3cgdGhhdCB0aGUgZmlyc3QgaXMgYWx3YXlzIG9uZnVsZmlsbGVkIGFuZCBpcyBuZXZlciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpZiAoIWNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gRmlyc3Qgb25mdWxmaWxsZWQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgRGVmZXJyZWRQcm9taXNlXzEuRGVmZXJyZWRQcm9taXNlKGNiLm9uZnVsZmlsbGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihjYi5vbmZ1bGZpbGxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbnJlamVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChjYi5vbnJlamVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gTm8gY2FsbGJhY2tzLCBub3QgZXZlbiB0aGUgZGVmYXVsdCBmaXJzdCBvbmZ1bGZpbGxlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuZXhwb3J0cy5SZXBlYXRhYmxlUHJvbWlzZSA9IFJlcGVhdGFibGVQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJldHVybiBlbGVtZW50cyBvZiBhcnJheSBhIGxpbmVkIHVwIHdpdGggZWxlbWVudHMgb2YgYXJyYXkgYi4gQm90aCBhcnJheXMgZG9uJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoID49IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFtlbGVtZW50LCBiW2luZGV4XV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2FbaW5kZXhdLCBiXSk7XG4gICAgfVxufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vKipcbiAqIFJldHVybiBhIGNhcnRlc2lhbiBqb2luIChjcm9zcyBqb2luKSBiZXR3ZWVuIGFycmF5cyBhIGFuZCBiLlxuICovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYikge1xuICAgIC8vLyB0eXBlc2NyaXB0IHByZXZlbnRzIGEgZGlyZWN0IHVzZSBvZiBjb25jYXQsIHNvIGRvIHRoaXMgbWFudWFsbHkgd2l0aCBhIGxvb3BcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGEpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmIubWFwKHEgPT4gW2l0ZW0sIHFdKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5jYXJ0ZXNpYW4gPSBjYXJ0ZXNpYW47XG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZ2Ugb2YgaW50ZWdlcnMsIGNvdW50aW5nIHVwIGJ5IDEsIGZvciB0aGUgZ2l2ZW4gbGVuZ3RoLiBTdG9sZW4gZnJvbSBQeXRob24uXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG59XG5leHBvcnRzLnJhbmdlID0gcmFuZ2U7XG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGl0ZW1zIGFuZCBvdGhlciBhcnJheXMsIGZsYXR0ZW4gdGhlbSBvdXQgaW50byBhIHNpbmdsZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24qIHRyYXZlcnNlKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHlpZWxkIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGFycikge1xuICAgICAgICAgICAgeWllbGQqIHRyYXZlcnNlKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogTWFrZSBpdCBlYXNpZXIgdG8gY3JlYXRlIHNpbXBsZSBjb21wYXJpc29uIGZ1bmN0aW9ucyBvbiAocG9zc2libHkgY29tcGxleCkgb2JqZWN0cy4gVHlwaWNhbCB1c2U6IGFyci5zb3J0KG9yZGVyQnkobyA9PiBvLmlkKSlcbiAqL1xuZnVuY3Rpb24gb3JkZXJCeShwcm9wZXJ0eUZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBwcm9wZXJ0eUZuKGZpcnN0KTtcbiAgICAgICAgY29uc3Qgc2Vjb25kVmFsdWUgPSBwcm9wZXJ0eUZuKHNlY29uZCk7XG4gICAgICAgIGlmIChmaXJzdFZhbHVlIDwgc2Vjb25kVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RWYWx1ZSA+IHNlY29uZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xufVxuZXhwb3J0cy5vcmRlckJ5ID0gb3JkZXJCeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBvZiBvcGVyYXRpb24gKG1ldGhvZCwgc2V0LCBkZWxldGUpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSAnJztcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5hcmdzID0gW107XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5BcnJheUNoYW5nZWRFdmVudEFyZ3MgPSBBcnJheUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFJlcGVhdGFibGVQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIik7XG4vKipcbiAqIEEgZGVsZWdhdGUgb2JqZWN0IGlzIHVzZWQgYnkgdGhlIEV2ZW50SGFuZGxlci4gSXQgY29udGFpbnMgZW5vdWdoIGluZm9ybWF0aW9uIHRvIGV4ZWN1dGUgYSBjYWxsYmFjayBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5XG4gKiAodXNpbmcgYSBwcm9taXNlKS4gSXQgYWxzbyBhZGRzIHNvbWUgc3RyaW5ncyB0byBoZWxwIGluIHRyb3VibGVzaG9vdGluZywgYmVjYXVzZSBzZWFyY2hpbmcgYSByZWN1cnNpdmUgYXJyYXkgb2YgY29tcGxleCBvYmplY3RzIGNhbiBtYWtlXG4gKiBpdCBhIGJlYXIgdG8gZmluZCBvdXQgd2h5IGEgY2FsbGJhY2sgaXNuJ3QgYmVpbmcgZXhlY3V0ZWQuXG4gKi9cbmNsYXNzIERlbGVnYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJbiBtYW55IGNhc2VzIChmb3IgZXhhbXBsZSwgd2hlbiB1c2luZyBmYXQgYXJyb3cgZnVuY3Rpb25zKSwgdGhpc0FyZyBpc1xuICAgICAgICAvLyBub3QgbmVlZGVkLiBCdXQgaW4gbW9zdCBvdGhlcnMsIGl0IGlzIGFuIGFubm95aW5nIGJ1ZyB0aGF0IHJlcXVpcmVzIHRyb3VibGVzaG9vdGluZ1xuICAgICAgICAvLyB0byBmaWd1cmUgb3V0IHdoYXQgdGhlIGNhbGxlciBmb3Jnb3QuIEkndmUgd2F2ZXJlZCBiZXR3ZWVuIG1ha2luZyBpdCByZXF1aXJlZCBhbmQgbm90LlxuICAgICAgICBpZiAoIXRoaXNBcmcpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlbGVnYXRlIGNyZWF0ZWQgd2l0aG91dCB0aGlzQXJnLiBEaWQgeW91IG1lYW4gdG8/Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICAgICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHRoaXNBcmcgPT09ICdvYmplY3QnICYmICdjb25zdHJ1Y3RvcicgaW4gdGhpc0FyZykge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja093bmVyTmFtZSA9IHRoaXNBcmcuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgdHlwZXNjcmlwdCBjb21waWxlciBzaG91bGQgaGFuZGxlIHRoaXMgY2hlY2sgYnV0IGNhbid0IGF0IHJ1bnRpbWUuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIG11c3QgYmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tOYW1lID0gY2FsbGJhY2submFtZTtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUgJiYgdGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGAke3RoaXMuY2FsbGJhY2tPd25lck5hbWV9LiR7dGhpcy5jYWxsYmFja05hbWV9KClgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrTmFtZSArICcoKSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja093bmVyTmFtZSArICcuX19sYW1iZGFfXygpJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUmVwZWF0YWJsZVByb21pc2VfMS5SZXBlYXRhYmxlUHJvbWlzZShjYWxsYmFjay5iaW5kKHRoaXNBcmcpKTtcbiAgICB9XG59XG5leHBvcnRzLkRlbGVnYXRlID0gRGVsZWdhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBEZWxlZ2F0ZV8xID0gcmVxdWlyZShcIi4vRGVsZWdhdGVcIik7XG4vKipcbiAqIEkgY2hvc2UgdG8gdXNlIEMjIHN0eWxlIGV2ZW50cywgbm90IEpTL1RTLCBiZWNhdXNlIHRoZSBKUy9UUyB3YXkgb2YgZG9pbmcgZGVsZWdhdGVzL2N1c3RvbSBldmVudHMgaXMgYSBOSUdIVE1BUkUuIFN1cmUsXG4gKiBDdXN0b21FdmVudCB3b3JrcywgYnV0IG9uIHRoZSBUUyBzaWRlIHRoZSBjb2RlIHJlcXVpcmVkIHRvIG1ha2UgVFNDIGhhcHB5IHdpdGggdmFsaWQgamF2YXNjcmlwdCBpcyBhd2Z1bCBhbmQgbm9uLWludHVpdGl2ZS5cbiAqIE9uIHRoZSBKUyBzaWRlLCB5b3UgaGF2ZSB0aGUgcHJvYmxlbSB0aGF0IGV2ZXJ5IGhhbmRsZXIgcGlja3MgaXQgdXAsIG5vdCBqdXN0IHRoZSBvbmVzIHRoYXQgYXJlIGJvdW5kIHRvIHRoZSByZWxldmFudCBIVE1MXG4gKiBlbGVtZW50LCBzbyBlbGVtZW50cyBuZWVkIHRvIHBhc3MgdGhlIHNvdXJjZSBhcyBhbiBhcmd1bWVudCBhbmQgY2hlY2sgaXQgKGxpa2UganF1ZXJ5IGFuZCAkKGRvY3VtZW50KS5vbigpKS5cbiAqXG4gKiBBZnRlciBnZXR0aW5nIGl0IHdvcmtpbmcsIGFsbCBJIGNvdWxkIHRoaW5rIGFib3V0IHdhcyBob3cgYmFkIHRoZSBjb2RlIHdhcywgc28gSSByZXdyb3RlIGl0IGF2b2lkaW5nIHRoZSBKUyBwYXR0ZXJuIGVudGlyZWx5LlxuICpcbiAqIFRoaXMgY2FuIGJlIHN5bmNocm9ub3VzIChjYWxsYmFja3MpIG9yIGFzeW5jaHJvbm91cyAocHJvbWlzZXMpLiAgV2hlbiBpdCBpcyBhc3luYywgdGhlIGNvZGUgZXhlY3V0ZXMgYWZ0ZXIgdGhlIGN1cnJlbnQgc3luY2hyb25vdXNcbiAqIGV2ZW50cyBydW4gdG8gY29tcGxldGlvbi4gVGhpcyBjb3VsZCBjcmVhdGUgYnVncyBpbiBzeW5jaHJvbm91cyBjb2RlLCBidXQgaXMgYmVzdCBmb3IgYnJvd3NlciBldmVudHMuIFRoaXMgaGFuZGxlciBpcyBwcmltYXJpbHkgdXNlZCBmb3JcbiAqIGJyb3dzZXIgZXZlbnRzLCBzbyBhc3luYyBpcyBkZWZhdWx0LlxuICpcbiAqIEJ1dCBpZiB5b3UncmUgdHJpZ2dlcmluZyBhc3luYyBldmVudHMgaW4gY29kZSBhbmQgc3RlcHBpbmcgdGhyb3VnaCBpdCBpbiBDaHJvbWUsIHdoYXQgeW91IHNlZSB3b24ndCBtYWtlIHNlbnNlLCBiZWNhdXNlIHRoZSBhc3luY1xuICogZXZlbnRzIHdvbid0IG9jY3VyIHVudGlsIHJpZ2h0IGF3YXkuIEl0IGNhbiBiZSBoYXJkIHRvIHRyb3VibGVzaG9vdC5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfZGlzYWJsZUFzeW5jID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUFzeW5jID0gX2Rpc2FibGVBc3luYztcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IFtdO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSWYgdGhpcyByZWNlaXZlcyBhIGRlbGVnYXRlICh3aGljaCBpcyBhbiBhcnJheSBvZiBkZWxlZ2F0ZXMpLCBhZGQgaXQuXG4gICAgICAgIC8vIFdoZW4gdGhpcyBpcyBpbnZva2VkLCB0aGF0IGRlbGVnYXRlIHdpbGwgYWxzbyBiZSBpbnZva2VkLlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjYWxsYmFjaykpIHtcbiAgICAgICAgICAgIF9vdnIxX2RlbGVnYXRlLmNhbGwodGhpcywgY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdvdCBhIHNpbmdsZSBjYWxsYmFja1xuICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGNhbGxiYWNrLlxuICAgICAgICBpZiAodGhpcy5maW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2g6IHRydWUgfSkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3RGVsZSA9IG5ldyBEZWxlZ2F0ZV8xLkRlbGVnYXRlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5wdXNoKG5ld0RlbGUpO1xuICAgICAgICAvLyBJRiB0aGlzIGlzIGFzeW5jaHJvbm91cywgcmV0dXJuIHRoZSBwcm9taXNlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICAgICAgICAvLyBDaGFpbmluZyB3b24ndCB3b3JrIG9uIHN5bmMgY29kZSwgc28gZG8gbm90IGluIHRoYXQgY2FzZS5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdEZWxlLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjFfZGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgZGVsZWdhdGUuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5maW5kKHEgPT4gcSA9PT0gZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5wdXNoKGRlbGVnYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gIUFycmF5LmlzQXJyYXkocSkgJiYgcS5jYWxsYmFjayA9PT0gY2FsbGJhY2spO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKSB7XG4gICAgICAgIC8vIEZpcnN0IHRyeSB0byB1bnN1YnNjcmliZSB0aGUgZGVmYXVsdCBkZWxlZ2F0ZS4gQ2FuJ3QgZG8gYW55dGhpbmcgaWYgaXQgaGFzIGEgZGlmZmVyZW50IG5hbWUsIHRob3VnaC5cbiAgICAgICAgaWYgKFwiZGVsZWdhdGVcIiBpbiBzZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVEZWxlZ2F0ZShzZW5kZXIuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+ICFBcnJheS5pc0FycmF5KHEpICYmIHEudGhpc0FyZyA9PT0gc2VuZGVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiBxID09PSBkZWxlZ2F0ZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZva2UoYXJncykge1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UodGhpcy5kZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICAgICAgLy8gQXN5bmMgdmVyc2lvbi4gRG9lcyBub3Qgd29yayB3ZWxsIHdpdGggdGhlIGNocm9tZSBkZWJ1Z2dlci5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5wcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnRoaXNBcmcsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UodGhpcy5kZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaChsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2gobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiB0aGlzQXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzQXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7IC8vIENsZWFycyB0aGUgZGVsZWdhdGVcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHVuZGVmaW5lZDsgLy8gTWFrZXMgc3VyZSB0aGlzIGNhbid0IGJlIHVzZWQgYWdhaW5cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50SGFuZGxlciA9IEV2ZW50SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBFdmVudCBhcmd1bWVudHMgZXhwZWN0ZWQgb24gYW55IENoYW5nZSBldmVudC5cbiAqL1xuY2xhc3MgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBvZiBjaGFuZ2Ugb3BlcmF0aW9uIChzZXQsIGRlbGV0ZSkgKHBvdGVudGlhbGx5IG1ldGhvZClcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICcnO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzID0gUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBjb25zdHJ1Y3RvciB0aGF0IGlzIG5ld2FibGUuXG4gKiBUSElTIENBTk5PVCBERVRFQ1QgQU5PTllNT1VTIENMQVNTRVMuIFNvcnJ5LCBidXQgSlMgZG9lc24ndCBoYXZlIGEgbm9uLWRlc3RydWN0aXZlIHdheVxuICogdG8gY2hlY2sgaWYgYW55IGZ1bmN0aW9uIGlzIGEgY29uc3RydWN0b3Igb3RoZXIgdGhhbiB0byB0cnkgdG8gbmV3KCkgaXQgYW5kIGJsb3cgdXAvbm90IGJsb3cgdXAuXG4gKiBUaGlzIGZ1bmN0aW9uIGRlcGVuZHMgb24gdGhlcmUgYmVpbmcgYSBwcm90b3R5cGUgd2l0aCBhIG5hbWVkIGNvbnN0cnVjdG9yLlxuICovXG5mdW5jdGlvbiBjb25zdHJ1Y3RvclR5cGVHdWFyZChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5wcm90b3R5cGUgJiYgb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuZXhwb3J0cy5jb25zdHJ1Y3RvclR5cGVHdWFyZCA9IGNvbnN0cnVjdG9yVHlwZUd1YXJkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYW4gaW1wbGVtZW50YXRpb24gb2Yga2V5d29yZCBhcmd1bWVudHMsIGFzIHNlZW4gaW4gUHl0aG9uIGFuZCBDIy4gSXQgbWFrZXMgY29uZmlndXJhYmxlXG4gKiBmdW5jdGlvbnMgc28gbXVjaCBxdWlja2VyIGFuZCBlYXNpZXIgdGhhbiBmbGF0IGFyZ3VtZW50cyAoZm9yY2luZyB5b3UgdG8gcHV0IHVuZGVmaW5lZCBtYW51YWxseSBpbiBkaWZmZXJlbnRcbiAqIHNsb3RzKSBvciBvcHRpb25zIG9iamVjdHMgKHRha2VzIG1vcmUgdGltZSB0byBwcm9kdWNlLCBlc3BlY2lhbGx5IGlmIHlvdSBuZWVkIHRvIG5ldyBpdCB1cCkuXG4gKlxuICogQ2FsbCBmdW5jdGlvbnMgaGF2aW5nIGtleXdvcmQgYXJndW1lbnRzIHVzaW5nIHRoaXMgc3ludGF4OlxuICogY2FsbG1lKGFyZzEsIGFyZzIsIGt3KCdzb21ldGhpbmcnLCBrdzEpLCBrdygnc29tZXRoaW5nRWxzZScsIGt3MikpXG4gKlxuICogVG8gbWFrZSB0aGVtIHdvcmssIGluIHRoZSBmdW5jdGlvbiBpdHNlbGYsIHlvdSBuZWVkIHRvIGNvcHkgYW5kIHBhc3RlLiBGb3IgZXhhbXBsZTpcbiAqICh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9ID0gS3dhcmcucGFyc2UoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSkpO1xuICovXG5jbGFzcyBLd2FyZyB7XG4gICAgY29uc3RydWN0b3IoYSwgYikge1xuICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWUgPSBhO1xuICAgICAgICB0aGlzLnZhbHVlID0gYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtZW1iZXIgdGhpcyB0ZW1wbGF0ZTpcbiAgICAgKiAoeyB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSkpO1xuICAgICAqIEluY2x1ZGUgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIGZpcnN0IG9iamVjdCwgbm90IHRoZSBzZWNvbmQuXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCB0byBjYXB0dXJlIHJlc3QgcGFyYW1ldGVycywgdXNlIHRoaXM6XG4gICAgICogKHsgJHJlc3QkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyAsIC4uLnJlc3QgfSkpO1xuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgYWxsb3dVbmtub3duS2V5d29yZCB0byBiZSB0cnVlLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkJGt3JCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0sIHRydWUpKTtcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VBcmdzKGFyZ3MsIGFsbG93VW5rbm93bktleXdvcmQgPSBmYWxzZSkge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHRoaXMgY291bGQgdGFrZSB0aGUgYXJndW1lbnRzIG9iamVjdCwgYnV0IHNhZGx5IGFyZ3VtZW50cyBzdG9yZXMgb25seSBhbiBhcnJheSBvZiB2YWx1ZXMsXG4gICAgICAgIC8vIG5vIGtleXMuIElmIEpTIHdlcmUgc2FuZSwgaXQgd291bGQgYmUgYSBNYXAsIG5vdCBhbiBhcnJheS4gVHdvIHN0ZXBzIGZvcndhcmQsIG9uZSBzdGVwIGJhY2suXG4gICAgICAgIC8vIFBhcnNpbmcgdGhlIHN0cmluZyBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb24gaXMgbm90IG15IGN1cCBvZiB0ZWEsIHNvIGp1c3Qgbm8uXG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpO1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBhcmd1bWVudCBvcmRlclxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrd3ZhciA9IHt9O1xuICAgICAgICBvYmpbJyQka3ckJCddID0ga3d2YXI7XG4gICAgICAgIC8vIENoZWNrIGZvciByZXN0IHBhcmFtZXRlcnMuXG4gICAgICAgIC8vIEkgd2FzIGdvaW5nIHRvIGhhdmUgdGhpcyBvbi9vZmYgY29uZmlndXJhYmxlLCBidXQgaXQgc2hvdWxkbid0IGh1cnQgcGVyZm9ybWFuY2UuXG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBvYmpbJyRyZXN0JCddID0gYXJyO1xuICAgICAgICAvLyBSZXN0IHBhcmFtZXRlcnMgYXJlIHN0b3JlZCBhcyBhcnJheSBrZXlzLCB7ICcwJzogYSwgJzEnOiBiLCAnbm9uUmVzdCc6ICdzb21ldGhpbmcgZWxzZSd9XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpLmZpbHRlcihmID0+IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKGYpKSkge1xuICAgICAgICAgICAgaWYgKCEoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goYXJnc1thcmddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXl3b3Jkc1VzZWQgPSB7fTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkga2V5d29yZCBuYW1lXG4gICAgICAgIC8vIEhhdmUgdG8gaXRlcmF0ZSB0aGUgbGlzdCB0d2ljZSwgdG8gYXZvaWQgd2lwaW5nIG91dCBkYXRhIGlmIHRoZSBvcmRlciBpcyBzd2FwcGVkXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBhcmdzW2FyZ107XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmpbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93VW5rbm93bktleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGt3dmFyW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IGFuIHVuZXhwZWN0ZWQga2V5d29yZCBhcmd1bWVudCAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIGtleXdvcmRzVXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBtdWx0aXBsZSB2YWx1ZXMgZm9yIGtleXdvcmQgYXJndW1lbnQgKyAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleXdvcmRzVXNlZFt0bXAubmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIC8vIFR1cm4gYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5d29yZCBhcmd1bWVudHMuXG4gICAgLy8gTmVlZHMgdG8gcmV0dXJuIGFueVtdIGJlY2F1c2UgaXQncyBnb2luZyB0byBiZSBzaG92ZWQgaW50byBhcmJpdHJhcnkgYXJndW1lbnQgbGlzdHNcbiAgICBzdGF0aWMgdW5wYWNrKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGt3KGFyZywgYXJnc1thcmddKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGlzTWF0Y2goa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IGtleTtcbiAgICB9XG59XG5leHBvcnRzLkt3YXJnID0gS3dhcmc7XG5mdW5jdGlvbiBrdyhhLCBiKSB7XG4gICAgaWYgKCFhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBPdmVybG9hZCAxXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYSwgYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMlxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGFbMF0sIGFbMV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgM1xuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBvbmx5IG9uZSBrZXkvdmFsdWUgcGFpci5cbiAgICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKTtcbiAgICAgICAgaWYgKCFwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1hcCBvYmplY3Q6IG11bHRpcGxlIGtleXMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKHByb3BzWzBdLCBhW3Byb3BzWzBdXSk7XG4gICAgfVxufVxuZXhwb3J0cy5rdyA9IGt3O1xuZnVuY3Rpb24ga3dhcmdzVG9PYmplY3QoYXJyKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgYXJnIG9mIGFycikge1xuICAgICAgICBvcHRpb25zW2FyZy5uYW1lXSA9IG9wdGlvbnNbYXJnLnZhbHVlXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnRzLmt3YXJnc1RvT2JqZWN0ID0ga3dhcmdzVG9PYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGlzTm9uZSh0ZXN0KSB7XG4gICAgcmV0dXJuICh0ZXN0ID09IG51bGwgfHwgdGVzdCA9PT0gdW5kZWZpbmVkKTtcbn1cbmV4cG9ydHMuaXNOb25lID0gaXNOb25lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjbG9uZURlZXAob2JqLCBoYXNoID0gbmV3IFdlYWtNYXAoKSkge1xuICAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgICAgIHJldHVybiBvYmo7IC8vIHByaW1pdGl2ZSB0eXBlc1xuICAgIH1cbiAgICBpZiAoaGFzaC5oYXMob2JqKSkge1xuICAgICAgICByZXR1cm4gaGFzaC5nZXQob2JqKTsgLy8gcmVmZXJlbmNlIHRvIG9iamVjdCBwcmV2aW91c2x5IHNlZW5cbiAgICB9XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIHZhbCA9PiByZXN1bHQuYWRkKGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgTWFwKCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCAoW2tleSwgdmFsXSkgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAoa2V5LCBoYXNoKSwgY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IEFycmF5LmZyb20ob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFJlZ0V4cChvYmouc291cmNlLCBvYmouZmxhZ3MpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYXdmdWwgY29kZSwgYnV0IGl0J3MgdGhlIG9ubHkgd2F5IHRvIGNsb25lIGEgc3RhbmRhbG9uZSBmdW5jdGlvbiAodnMgYSBtZXRob2Qgd2hpY2ggaGFzIGEgZGVzY3JpcHRvcikuXG4gICAgICAgIC8vIEluIGdlbmVyYWwsIHlvdSBwcm9iYWJseSBkb24ndCB3YW50IHRvIHVzZSBjbG9uZURlZXAgb24gZnVuY3Rpb25zLiBZb3UnbGwgc2VlIGl0J3MgTk9UIHVzZWQgb24gaW50ZXJuYWwgbWV0aG9kcy5cbiAgICAgICAgcmVzdWx0ID0gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIG9iai50b1N0cmluZygpKSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIGhhc2guc2V0KG9iaiwgcmVzdWx0KTsgLy8gS2VlcCB0cmFjayBvZiBvYmplY3RzIHByZXZpb3VzbHkgY2xvbmVkXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnZnVuY3Rpb24nICYmICEoa2V5IGluIHJlc3VsdCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBtZXRob2RzIHRoYXQgYXJlbid0IGluIHRoZSBwcm90b3R5cGUuXG4gICAgICAgICAgICAvLyBUaGlzIGRvZXNuJ3QgcmVjdXJzaXZlbHkgZm9sbG93IGJlY2F1c2UgdGhlcmUncyBub3RoaW5nIHJlY3Vyc2l2ZSB0byBkby5cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICBoYXNoLnNldChvYmpba2V5XSwgcmVzdWx0W2tleV0pO1xuICAgICAgICAgICAgICAgIC8vIE5PVEUgdGhhdCBjbG9uZURlZXAgaXMgTk9UIGNhbGxlZCByZWN1cnNpdmVseSBoZXJlLiBJdCBhbGwgZW5kcyBhdCB0aGUgbWV0aG9kLlxuICAgICAgICAgICAgICAgIC8vIElmIGV4dHJhIGtleXMgYXJlIHRocm93biBvbnRvIGEgZnVuY3Rpb24sIHRoZXkgcHJvYmFibHkgd2lsbCBub3QgYmUgY2xvbmVkLlxuICAgICAgICAgICAgICAgIC8vIEluIG15IGV4cGVyaWVuY2UsIGV4dHJhIGtleXMgb24gZnVuY3Rpb25zIGRpZG4ndCB3b3JrIHJpZ2h0LCBzbyBubyBiaWcgbG9zcy5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBjdXN0b20gZ2V0dGVycy9zZXR0ZXJzLiBUaGVzZSBhcmUgbG9jYWwgYW5kIGhvcGVmdWxseSB3b3JrIGp1c3QgbGlrZSBtZXRob2RzLlxuICAgICAgICAgICAgLy8gSW4gbWFueSBjYXNlcywgdGhpcyBpcyByZWR1bmRhbnQgd2l0aCBPYmplY3QuY3JlYXRlKCksIGJ1dCBpcyBuZWNlc3NhcnkgdG8gYWxsb3cgb2JqZWN0cyB3aXRoIG1hbnVhbGx5LWFkZGVkIGN1c3RvbSBnZXR0ZXJzLlxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIC8vIE5PVEUgdGhhdCBjbG9uZURlZXAgaXMgTk9UIGNhbGxlZCByZWN1cnNpdmVseSBoZXJlLiBJdCBhbGwgZW5kcyBhdCB0aGUgZ2V0dGVyL3NldHRlci5cbiAgICAgICAgICAgIC8vIEFMU08gaGFzaCBub3QgdXBkYXRlZDsgdGhpcyBpcyBub3QgcG9zc2libGUsIGJlY2F1c2UgaXQgd2lsbCBtYXAgdGhlIHZhbHVlIGl0IGdldHMsIG5vdCB0aGUgZ2V0dGVyLlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZURlZXAob2JqW2tleV0sIGhhc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNsb25lRGVlcCA9IGNsb25lRGVlcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gSSBkb24ndCBrbm93IGZvciBzdXJlIGlmIHRoaXMgd2lsbCB3b3JrIGluIGFsbCBjYXNlcy5cbi8vIEl0IGdldHMgZGVlcGVyIGludG8gdGhlIGd1dHMgb2YgSlMgb2JqZWN0IHRoYW4gSSBoYXZlIGV4cGVyaWVuY2Ugd2l0aC5cbmZ1bmN0aW9uIGNsb25lT2JqZWN0KG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNsb25lT2JqZWN0ID0gY2xvbmVPYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG4vKipcbiAqIEEgcHNldWRvLXJhbmRvbSBwcmVmaXggcGx1cyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIHVuaXggZXBvY2guIFRoZSByYW5kb20gcGFydCBzaG91bGQgYmUgcmFuZG9tIGVub3VnaCB0byBjb3ZlclxuICogbXVsdGlwbGUgaWRzIGNyZWF0ZWQgaW4gYSBtaWxsaXNlY29uZC5cbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlSWQoKSB7XG4gICAgY29uc3QgY2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotXyc7XG4gICAgbGV0IHJlc3VsdCA9ICd1JyArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyAnLSc7XG4gICAgZm9yIChjb25zdCBfIG9mIEFycmF5VXRpbGl0aWVzXzEucmFuZ2UoOCkpIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZ2V0VW5pcXVlSWQgPSBnZXRVbmlxdWVJZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUZWxsIGlmIGEgZ2l2ZW4gc3RyaW5nIGlzIGEgcG9zaXRpdmUgaW50ZWdlci5cbiAqIFVzZSBmb3IgZGV0ZWN0aW5nIGFycmF5IGtleXMuXG4gKi9cbmZ1bmN0aW9uIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKHN0cikge1xuICAgIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0ciA9PT0gJzAnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gL15bMS05XVxcZCokLy50ZXN0KHN0cik7XG59XG5leHBvcnRzLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nID0gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBhY2N1cmF0ZSB0aGlzIGlzIGJ1dCBpdCBzZWVtcyBwcmV0dHkgZ29vZFxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iajtcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ2xvbmVPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Nsb25lT2JqZWN0XCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogT2JqZWN0LmFzc2lnbigpIGNhbiBiZSB1c2VkIGZvciBzaW1wbGUgY29waWVzIG9mIHByb3BlcnRpZXMsIGJ1dCBpdCBtaXNzZXMgZ2V0dGVycyxcbiAqIHNldHRlcnMsIGFuZCBpbmhlcml0ZWQgcHJvcGVydGllcy4gSXQgb25seSBnZXRzIHRoZSBsb2NhbCB2YWx1ZXMuXG4gKlxuICogVGhpcyBzaG91bGQgaG9wZWZ1bGx5IHJlc29sdmUgdGhhdCwgYnV0IEkgZG9uJ3Qga25vdyBmb3Igc3VyZS4gVGhpcyBpcyB2ZXJ5IHNrZXRjaHkuXG4gKiBUaGUgcmVzdWx0cyBhcmUgY29tcGxldGVseSBmbGF0LCBiZWNhdXNlIHlvdSBjYW4ndCBoYXZlIG11bHRpcGxlIGluaGVyaXRhbmNlIGhpZXJhcmNoeVxuICogaW4gYSBsYW5ndWFnZSB3aXRob3V0IG11bHRpcGxlIGluaGVyaXRhbmNlLiBCZWNhdXNlIHRoaXMgZmxhdHRlbnMgb2JqZWN0cywgaXQgaXMgZ3VhcmFudGVlZFxuICogdG8gYnJlYWsgYW55dGhpbmcgdGhhdCBtYWtlcyBzdXBlciBjYWxscy5cbiAqXG4gKiBJZiByZXR1cm5DbG9uZSBpcyB0cnVlLCBhIGNsb25lIG9mIHRoZSB0YXJnZXQgb2JqZWN0IHdpbGwgYmUgbW9kaWZpZWQgYW5kIHJldHVybmVkLCBsZWF2aW5nXG4gKiB0aGUgb3JpZ2luYWwgdW50b3VjaGVkLlxuICovXG5mdW5jdGlvbiBvYmplY3RGdWxsQXNzaWduKHRhcmdldCwgc291cmNlLCByZXR1cm5DbG9uZSA9IGZhbHNlKSB7XG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0ge307XG4gICAgfVxuICAgIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGlmIChyZXR1cm5DbG9uZSkge1xuICAgICAgICB0YXJnZXQgPSBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0KHRhcmdldCk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KGZpbmRUaGVQcm9wZXJ0eU5hbWVzKHNvdXJjZSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuYW1lcykge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICByZXN1bHQucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihmID0+IGYgIT09ICdjb25zdHJ1Y3RvcicpKTtcbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi5maW5kVGhlUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRUaGVQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JqZWN0RnVsbEFzc2lnbiA9IG9iamVjdEZ1bGxBc3NpZ247XG4iXX0=
