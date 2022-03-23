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
            // If name is specified, component MUST be specified. The same if component is specified.
            if (this._name && repl.getAttribute('component') !== this._name) {
                continue;
            }
            // The same if component is specified. Requires repeating because this part breaks when minified
            if (repl.getAttribute('component') && repl.getAttribute('component') !== this._name) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9GdWxsLmpzIiwic3JjL0V4dGVuc2lvbkxvYWRlci5qcyIsInNyYy9FeHRlbnNpb25zL0NvbXBvbmVudEV4dGVuc2lvbnMuanMiLCJzcmMvRXh0ZW5zaW9ucy9FbGVtZW50RXh0ZW5zaW9ucy5qcyIsInNyYy9FeHRlbnNpb25zL09ic2VydmFibGVFeHRlbnNpb25zLmpzIiwic3JjL0h0bWwvQ3JlYXRlRWxlbWVudC5qcyIsInNyYy9IdG1sL0RlbGV0ZU5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRmluZEluZGV4SW5QYXJlbnQuanMiLCJzcmMvSHRtbC9Gb3JtRmllbGRWYWx1ZS5qcyIsInNyYy9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdC5qcyIsInNyYy9IdG1sL1ZhbGlkYXRlVW5pcXVlRG9tSWRzLmpzIiwic3JjL0h0bWxDb21wb25lbnQvQm91bmRDb21wb25lbnQuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnQuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRNYXAuanMiLCJzcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lDb21wb25lbnRCaW5kaW5nT3B0aW9ucy5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXIuanMiLCJzcmMvT2JzZXJ2YWJsZS9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnbi5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVCYXNlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3h5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlLmpzIiwic3JjL1JvdXRlci9QYWdlUm91dGVyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlbGF5LmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnkuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lT2JqZWN0LmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZS5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCIuLi9zcmMvRXh0ZW5zaW9uTG9hZGVyXCIpO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBEZWxldGVOb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0RlbGV0ZU5vZGVDb250ZW50XCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBFeHRyYWN0Tm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5jb25zdCBGaW5kSW5kZXhJblBhcmVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0ZpbmRJbmRleEluUGFyZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbC9Gb3JtRmllbGRWYWx1ZVwiKTtcbmNvbnN0IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IFZhbGlkYXRlVW5pcXVlRG9tSWRzXzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvVmFsaWRhdGVVbmlxdWVEb21JZHNcIik7XG5jb25zdCBCb3VuZENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUFzc2lnbl8xID0gcmVxdWlyZShcIi4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVBc3NpZ25cIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJveHlfMSA9IHJlcXVpcmUoXCIuLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJveHlcIik7XG5jb25zdCBPYnNlcnZhYmxlU3RhdGVfMSA9IHJlcXVpcmUoXCIuLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBQYWdlUm91dGVyXzEgPSByZXF1aXJlKFwiLi4vc3JjL1JvdXRlci9QYWdlUm91dGVyXCIpO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2VcIik7XG5jb25zdCBEZWxheV8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vQXN5bmMvRGVsYXlcIik7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIik7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBPcmRlckJ5XzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Db2xsZWN0aW9ucy9PcmRlckJ5XCIpO1xuY29uc3QgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENsb25lRGVlcF8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIik7XG5jb25zdCBDbG9uZU9iamVjdF8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZU9iamVjdFwiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKTtcbihmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vIFRoaXMgaXMgbm90IG1pbmksIGJ1dCBpdCBpcyBldmVyeXRoaW5nIHRoYXQncyBpbiBhbnkgb2YgdGhlIG1pbmktaWNoaWdvXG4gICAgLy8gc2NyaXB0cyBjb21iaW5lZCBpbnRvIG9uZS4gQmVjYXVzZSB0aGVyZSBpcyBhIGJpdCBvZiBvdmVybGFwLCB0aGUgc2l6ZVxuICAgIC8vIGlzIGxlc3MgdGhhbiB0aGUgc2l6ZSBvZiBhbGwgdGhlIG90aGVyIHNjcmlwdHMgcHV0IHRvZ2V0aGVyLCBJRiB5b3Ugd2FudFxuICAgIC8vIGV2ZXJ5dGhpbmcuXG4gICAgLy8gVGhpcyBhbHNvIGNhbiBiZSB1c2VkIGFzIGFuIGVhc3kgdGVtcGxhdGUgaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIG93blxuICAgIC8vIGJ1aWxkLiBKdXN0IGRlbGV0ZSB3aGF0IHlvdSBkb24ndCB3YW50IGFuZCBydW4gdGhlIGd1bHAgc2NyaXB0cy5cbiAgICBjb25zdCBjb21wb25lbnQgPSB7XG4gICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50XzEuQ29tcG9uZW50LFxuICAgICAgICBCb3VuZENvbXBvbmVudDogQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCxcbiAgICAgICAgQ29tcG9uZW50TWFwOiBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAsXG4gICAgICAgIGdldENvbXBvbmVudDogQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50LFxuICAgIH07XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHtcbiAgICAgICAgRXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIsXG4gICAgICAgIG9ic2VydmFibGVBc3NpZ246IE9ic2VydmFibGVBc3NpZ25fMS5vYnNlcnZhYmxlQXNzaWduLFxuICAgICAgICBPYnNlcnZhYmxlUHJvcGVydHk6IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSxcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5OiBPYnNlcnZhYmxlUHJveHlfMS5PYnNlcnZhYmxlUHJveHksXG4gICAgICAgIE9ic2VydmFibGVTdGF0ZTogT2JzZXJ2YWJsZVN0YXRlXzEuT2JzZXJ2YWJsZVN0YXRlLFxuICAgICAgICBBcnJheUNoYW5nZWRFdmVudEFyZ3M6IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xLkFycmF5Q2hhbmdlZEV2ZW50QXJncyxcbiAgICAgICAgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzOiBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MsXG4gICAgfTtcbiAgICBjb25zdCBwcm9taXNlID0ge1xuICAgICAgICBEZWZlcnJlZFByb21pc2U6IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZSxcbiAgICAgICAgUmVwZWF0YWJsZVByb21pc2U6IFJlcGVhdGFibGVQcm9taXNlXzEuUmVwZWF0YWJsZVByb21pc2VcbiAgICB9O1xuICAgIGNvbnN0IHJvdXRlciA9IHtcbiAgICAgICAgUGFnZVJvdXRlcjogUGFnZVJvdXRlcl8xLlBhZ2VSb3V0ZXJcbiAgICB9O1xuICAgIGNvbnN0IGh0bWwgPSB7XG4gICAgICAgIGFuY2hvcjogQ3JlYXRlRWxlbWVudF8xLmFuY2hvcixcbiAgICAgICAgYnV0dG9uOiBDcmVhdGVFbGVtZW50XzEuYnV0dG9uLFxuICAgICAgICBjcmVhdGVFbGVtZW50OiBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudCxcbiAgICAgICAgY3JlYXRlSHRtbDogQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUh0bWwsXG4gICAgICAgIGNyZWF0ZUZyYWdtZW50OiBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQsXG4gICAgICAgIGRlbGV0ZU5vZGVDb250ZW50OiBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50LFxuICAgICAgICBkaXY6IENyZWF0ZUVsZW1lbnRfMS5kaXYsXG4gICAgICAgIGVzY2FwZUh0bWw6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sLFxuICAgICAgICBleHRyYWN0Tm9kZUNvbnRlbnQ6IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCxcbiAgICAgICAgZmluZEluZGV4SW5QYXJlbnQ6IEZpbmRJbmRleEluUGFyZW50XzEuZmluZEluZGV4SW5QYXJlbnQsXG4gICAgICAgIGdldEZvcm1GaWVsZFZhbHVlOiBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlLFxuICAgICAgICBwYXJhZ3JhcGg6IENyZWF0ZUVsZW1lbnRfMS5wYXJhZ3JhcGgsXG4gICAgICAgIG5vZGVMaXN0U2VsZWN0b3I6IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3IsXG4gICAgICAgIG5vZGVMaXN0U2VsZWN0b3JBbGw6IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwsXG4gICAgICAgIHNldEZvcm1GaWVsZFZhbHVlOiBGb3JtRmllbGRWYWx1ZV8xLnNldEZvcm1GaWVsZFZhbHVlLFxuICAgICAgICBzcGFuOiBDcmVhdGVFbGVtZW50XzEuc3BhbixcbiAgICAgICAgdmFsaWRhdGVVbmlxdWVEb21JZHM6IFZhbGlkYXRlVW5pcXVlRG9tSWRzXzEudmFsaWRhdGVVbmlxdWVEb21JZHMsXG4gICAgfTtcbiAgICBjb25zdCBhcnJheSA9IHtcbiAgICAgICAgY2FydGVzaWFuOiBBcnJheVV0aWxpdGllc18xLmNhcnRlc2lhbixcbiAgICAgICAgcmFuZ2U6IEFycmF5VXRpbGl0aWVzXzEucmFuZ2UsXG4gICAgICAgIHRyYXZlcnNlOiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlLFxuICAgICAgICB6aXA6IEFycmF5VXRpbGl0aWVzXzEuemlwXG4gICAgfTtcbiAgICBjb25zdCB1dGlsID0ge1xuICAgICAgICBhcnJheSxcbiAgICAgICAgY2xvbmVEZWVwOiBDbG9uZURlZXBfMS5jbG9uZURlZXAsXG4gICAgICAgIGNsb25lT2JqZWN0OiBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0LFxuICAgICAgICBkZWxheTogRGVsYXlfMS5kZWxheSxcbiAgICAgICAgZ2V0VW5pcXVlSWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQsXG4gICAgICAgIGh0bWwsXG4gICAgICAgIGlzTm9uZTogTm9uZVR5cGVfMS5pc05vbmUsXG4gICAgICAgIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nOiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyxcbiAgICAgICAga3c6IEtleXdvcmRBcmd1bWVudHNfMS5rdyxcbiAgICAgICAgS3dhcmc6IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZyxcbiAgICAgICAgb2JqZWN0RnVsbEFzc2lnbjogT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24sXG4gICAgICAgIG9yZGVyQnk6IE9yZGVyQnlfMS5vcmRlckJ5LFxuICAgIH07XG4gICAgd2luZG93Lm1pNSA9IHdpbmRvdy5taTUgfHwge307XG4gICAgd2luZG93Lm1pNS5jb21wb25lbnQgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUuY29tcG9uZW50IHx8IHt9LCBjb21wb25lbnQpO1xuICAgIHdpbmRvdy5taTUub2JzZXJ2YWJsZSA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5vYnNlcnZhYmxlIHx8IHt9LCBvYnNlcnZhYmxlKTtcbiAgICB3aW5kb3cubWk1LnByb21pc2UgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUucHJvbWlzZSB8fCB7fSwgcHJvbWlzZSk7XG4gICAgd2luZG93Lm1pNS5yb3V0ZXIgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUucm91dGVyIHx8IHt9LCByb3V0ZXIpO1xuICAgIHdpbmRvdy5taTUuaHRtbCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5odG1sIHx8IHt9LCBodG1sKTtcbiAgICB3aW5kb3cubWk1LnV0aWwgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUudXRpbCB8fCB7fSwgdXRpbCk7XG4gICAgLyoqXG4gICAgICogVGhpcyBzbGlnaHRseSBzaW1wbGlmZXMgdGhlIHByb2Nlc3Mgb2YgcmVmZXJlbmNpbmcgbWluaS1pY2hpZ28gY29tcG9uZW50cyB3aXRob3V0IHRoZSBmdWxsIG5hbWVzcGFjZS5cbiAgICAgKiBJdCByZXF1aXJlcyB0d28gYXJndW1lbnRzLCB1bmZvcnR1bmF0ZWx5LCBiZWNhdXNlIGl0J3Mgbm90IHBvc3NpYmxlIGluIG1hbnkgY2FzZXMgdG8gZGV0ZXJtaW5lIHRoZVxuICAgICAqIGNsYXNzIG9yIGZ1bmN0aW9uIG5hbWUuIE9mdGVuIHRoZSAnbmFtZScgcHJvcGVydHkgaGFzIG9ubHkgdGhlIG1pbmlmaWVkIG5hbWUsIGEgcmFuZG9tIGxldHRlci5cbiAgICAgKi9cbiAgICB3aW5kb3cubWk1LnVzaW5nID0gZnVuY3Rpb24gdXNpbmcobGliLCBhbGlhcykge1xuICAgICAgICBpZiAoIWxpYiB8fCAhYWxpYXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTnVsbEFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmV2YWwuY2FsbCh3aW5kb3csICcoZnVuY3Rpb24gKGFyZykgeyB3aW5kb3cuJyArIGFsaWFzICsgJyA9IGFyZzsgfSknKShsaWIpO1xuICAgIH07XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoaXMgc2NyaXB0IGNvbnRhaW5zIGV4dGVuc2lvbnMgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIGZ1bmN0aW9ucyB1c2VkIGJ5IEljaGlnby5cbiAqIEluIHlvdXIgbWFpbiBwcm9jZXNzLCBpbXBvcnQgdGhpcyBzY3JpcHQgKGltcG9ydCAnL3BhdGgvdG8vSWNoaWdvL0ljaGlnb0V4dGVuc2lvbkxvYWRlcicpIHRvIGFkZFxuICogdGhlc2UgZXh0ZW5zaW9ucyB0byBwcm90b3R5cGVzLlxuICovXG5yZXF1aXJlKFwiLi9FeHRlbnNpb25zL09ic2VydmFibGVFeHRlbnNpb25zXCIpO1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9Db21wb25lbnRFeHRlbnNpb25zXCIpO1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9FbGVtZW50RXh0ZW5zaW9uc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9PcHRpb25zL0lDb21wb25lbnRCaW5kaW5nT3B0aW9uc1wiKTtcbmNvbnN0IEJvdW5kQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4uL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmdldENvbXBvbmVudCA9IGZ1bmN0aW9uIF9nZXRDb21wb25lbnQoKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldCh0aGlzKTtcbn07XG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYmluZENvbXBvbmVudCA9IGZ1bmN0aW9uIF9iaW5kKHZpZXdNb2RlbCkge1xuICAgIHJldHVybiBuZXcgQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCh2aWV3TW9kZWwsIG5ldyBJQ29tcG9uZW50QmluZGluZ09wdGlvbnNfMS5FeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyh7IGVsZW1lbnQ6IHRoaXMgfSkpO1xufTtcbkhUTUxFbGVtZW50LnByb3RvdHlwZS5kZWxldGVDb21wb25lbnQgPSBmdW5jdGlvbiBfZGVsZXRlQ29tcG9uZW50KCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldCh0aGlzKTtcbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgYSBjb21wb25lbnQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbi8qKlxuICogU2V0IHRoZSBwYXJlbnQgZm9yIGFuIGVsZW1lbnQgKGpvaW4gdGhlIHBhcmVudCdzIGZhbWlseSBhcyBhIG5ldyBjaGlsZCksIHRoZSBvcHBvc2l0ZSBvZiBhcHBlbmRDaGlsZC4gRmx1ZW50LCBmb3IgY2hhaW5pbmcsIHNvXG4gKiBpdCdzIG5vdCBhIHBlcmZlY3QgYW5hbG9nIChhcHBlbmRDaGlsZCByZXR1cm5zIHRoZSBhcmd1bWVudCB3aGlsZSB0aGlzIHJldHVybnMgdGhlIGV4dGVuZGVkIG9iamVjdCAuLi4gdGhvdWdoIGJvdGggYXJlIHRoZSBjaGlsZCkuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRUb1BhcmVudCA9IGZ1bmN0aW9uIF9hcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBGbHVlbnQgdmVyc2lvbiBvZiBhcHBlbmRDaGlsZCwgd2hpY2ggcmV0dXJucyB0aGUgcGFyZW50LCBub3QgdGhlIGNoaWxkICh0aGUgYXJndW1lbnQpLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGRGbHVlbnQgPSBmdW5jdGlvbiBfYXBwZW5kQ2hpbGRGbHVlbnQoY2hpbGQpIHtcbiAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEFkZCB0aGUgZWxlbWVudCBhZnRlciB0aGUgY3VycmVudCBpdGVtLCBhdCB0aGUgc2FtZSBsZXZlbC4gTm90IGZsdWVudCwgc28gdGhpcyBpcyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGFwcGVuZENoaWxkLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kU2libGluZyA9IGZ1bmN0aW9uIF9hcHBlbmRTaWJsaW5nKG5leHQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChuZXh0KTtcbn07XG4vKipcbiAqIEFkZCB0aGUgZWxlbWVudCBhZnRlciB0aGUgY3VycmVudCBpdGVtLCBhdCB0aGUgc2FtZSBsZXZlbC4gRmx1ZW50LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kU2libGluZ0ZsdWVudCA9IGZ1bmN0aW9uIF9hcHBlbmRTaWJsaW5nRmx1ZW50KG5leHQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG5leHQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogUmVwbGFjZSB0aGUgZWxlbWVudC4gTm90IGZsdWVudCwgc28gdGhpcyBpcyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGFwcGVuZENoaWxkLiBUaGVyZSBpcyBubyBmbHVlbnQgdmVyc2lvbiBiZWNhdXNlXG4gKiB0aGlzIGlzIGRlbGV0aW5nIHRoZSBleHRlbmRlZCBvYmplY3QuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIF9yZXBsYWNlV2l0aChuZXdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWxlbWVudCwgdGhpcyk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuLyoqXG4gKiBTd2FwIHR3byBlbGVtZW50cyBmcm9tIHRoZWlyIHBsYWNlcyBpbiB0aGUgRE9NLCByZXR1cm5pbmcgdGhlIGFyZ3VtZW50LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIF9zd2FwKGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgY29uc3QgZWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBjb25zdCBwbGFjZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBlbGVtZW50UGFyZW50LnJlcGxhY2VDaGlsZChwbGFjZUhvbGRlciwgZWxlbWVudCk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChlbGVtZW50LCB0aGlzKTtcbiAgICBlbGVtZW50UGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLCBwbGFjZUhvbGRlcik7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIGRvY3VtZW50LnJlbW92ZUNoaWxkIHRoYXQgdXNlcyB0aGUgc2FtZSBBUEkgYXMgdGhlIG90aGVyIGZ1bmN0aW9ucyBoZXJlLlxuICogSW5jbHVkZWQgZm9yIHRoZSBzYWtlIG9mIGNvbnNpc3RlbmN5LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuZXh0cmFjdCA9IGZ1bmN0aW9uIF9leHRyYWN0KCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICByZXR1cm4gcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbi8qKlxuICogRmx1ZW50IHZlcnNpb24gb2YgYWRkRXZlbnRMaXN0ZW5lci5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJGbHVlbnQgPSBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lckZsdWVudChldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IHN0eWxlIGFkZGVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkU3R5bGUgPSBmdW5jdGlvbiBfYWRkU3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IGNsYXNzIGFkZGVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiBfYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjbGFzc05hbWVzKSkge1xuICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgIH1cbiAgICAvLyBOZWVkIHRvIGFsc28gYWxsb3cgY2xhc3NlcyBpbiB0aGUgXCJjbGFzczEgY2xhc3MyXCIgZm9ybWF0XG4gICAgZm9yIChjb25zdCBjIG9mIFtdLmNvbmNhdCguLi5jbGFzc05hbWVzXG4gICAgICAgIC5tYXAocSA9PiBxLnNwbGl0KCcgJykpXG4gICAgICAgIC5maWx0ZXIocSA9PiBxKSkpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjcmVhdGVFbGVtZW50IGhlbHBlciBmdW5jdGlvbiBhbmQgYWRkIGl0IHRvIHRoZSBmcmFnbWVudCwgcmV0dXJuaW5nIHRoZSBuZXcgZWxlbWVudC5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjcmVhdGVFbGVtZW50IGhlbHBlciBmdW5jdGlvbiBhbmQgYWRkIGl0IHRvIHRoZSBmcmFnbWVudC4gRmx1ZW50IHZlcnNpb24sIHNvIGl0J3MgZWFzeSB0byBxdWlja2x5IGFkZFxuICogYSBidW5jaCBvZiBlbGVtZW50cyB0byB0aGUgZnJhZ21lbnQuXG4gKi9cbkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnRGbHVlbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudEZsdWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBUYWtlIGEgZG9jdW1lbnQgZnJhZ21lbnQgYW5kIGFkZCBpdHMgY29udGVudHMgdG8gYSBwYXJlbnQgZWxlbWVudC4gQ2Fubm90IGJlIGZsdWVudCBiZWNhdXNlIGF0IHRoaXMgcG9pbnQsIHRoZSBmcmFnbWVudCBpcyBlbXB0eSBhbmRcbiAqIHByZXR0eSB1c2VsZXNzLCBzbyB0aGlzIHJldHVybnMgdGhlIHBhcmVudCBhcmd1bWVudCAoYXMgZ29vZCBhcyBhbnkgb3RoZXIgb3B0aW9uKS5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuYXBwZW5kVG9QYXJlbnQgPSBmdW5jdGlvbiBfYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMpO1xuICAgIHJldHVybiBwYXJlbnQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbi8qKlxuICogUXVpY2tseSBjb252ZXJ0IGFuIG9iamVjdCB0byBhIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuT2JqZWN0LnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4vKipcbiAqIFF1aWNrbHkgY29udmVydCBhIHN0cmluZyB0byBhbiBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBudW1iZXIgdG8gYSBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBib29sIHRvIGEgT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5Cb29sZWFuLnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4vRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgLy8gQWxsb3cgYXR0cmlidXRlcyB0byBiZSBzZW50IG9uIHByb3BlcnRpZXMsIHByb3ZpZGluZyBhIGNsZWFuZXIgaW50ZXJmYWNlLlxuICAgIC8vIEl0IGFsbG93cyB5b3UgdG8gc2VuZCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7YXR0cmlidXRlczogeyBjbGFzczogJ2ZvbycgfX0pIGluc3RlYWQgb2YgY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCwgeyBjbGFzczogJ2ZvbycgfSk7XG4gICAgLy8gQW5vdGhlciBvcHRpb24gaXMgdG8gdXNlIEt3YXJncywgYnV0IG5vdCBldmVyeW9uZSB3YW50cyB0by5cbiAgICBpZiAocHJvcGVydGllcyAmJiAnYXR0cmlidXRlcycgaW4gcHJvcGVydGllcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzIHx8IHt9LCBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBkZWxldGUgcHJvcGVydGllcy5hdHRyaWJ1dGVzO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpKTtcbiAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIERPTSBwcm9wZXJ0aWVzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGF0dHJpYnV0ZXMsIGJlY2F1c2UgaW4gc29tZSBjYXNlcywgdGhleSBvdmVycmlkZSB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIEhUTUwgZnJvbSBhbnkgSFRNTCBlbGVtZW50IHByb3ZpZGVkLlxuICogVXNlIGxpa2UgY29uc3QgZGl2ID0gY3JlYXRlSHRtbDxIVE1MRGl2RWxlbWVudD4oXCI8ZGl2PlNvbWV0aGluZzwvZGl2PlwiKSBvciBjb25zdCBjdXN0b20gPSBjcmVhdGVIdG1sKFwiPHNvbWUtdGFnPjwvc29tZS10YWc+XCIpLlxuICogSWYgbXVsdGlwbGUgZWxlbWVudHMgb3IgYSBwbGFpbiB0ZXh0IHN0cmluZyB3aXRoIG5vIEhUTUwgaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSB3cmFwcGVkIGluIGEgZGl2LCBzbyBpdCBjYW4ga2VlcFxuICogcmV0dXJuaW5nIGFuIEhUTUxFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUh0bWwoaHRtbCwgaW5saW5lID0gZmFsc2UpIHtcbiAgICBsZXQgd3JhcHBlcjtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgIHdyYXBwZXIgPSBzcGFuKChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZXMgPSB3cmFwcGVyLmNoaWxkTm9kZXM7XG4gICAgLy8gTXVsdGlwbGUgbm9kZXMsIHJldHVybiB0aGUgd3JhcHBpbmcgZGl2XG4gICAgLy8gZS5nLiBcIlRoaXMgaXMgYSA8ZW0+dGVzdDwvZW0+XCIgb3IgXCI8ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PlwiXG4gICAgaWYgKG5vZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgLy8gSWYganVzdCBhIHRleHRub2RlIChvciBlbXB0eSksIHJldHVybiBhIHNwYW4uIFRleHQgaXMgaW5jb21wYXRpYmxlIHdpdGggSFRNTEVsZW1lbnQgc28gY2FuJ3QgcmV0dXJuIHRoYXRcbiAgICAvLyBlLmcuIFwiSGVsbG8gd29ybGRcIlxuICAgIGlmICghd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjsgLy8gVGhpcyBpcyBhIHNwYW5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcGFuKHdyYXBwZXIuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFbHNlIHJldHVybiB0aGUgc2luZ2xlIGNoaWxkLlxuICAgIC8vIGUuZy4gXCI8ZGl2PjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+PC9kaXY+XCJcbiAgICByZXR1cm4gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbn1cbmV4cG9ydHMuY3JlYXRlSHRtbCA9IGNyZWF0ZUh0bWw7XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB3aXRoIGFueSBodG1sLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudChodG1sKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICByZXR1cm4gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHdyYXBwZXIpO1xufVxuZXhwb3J0cy5jcmVhdGVGcmFnbWVudCA9IGNyZWF0ZUZyYWdtZW50O1xuZnVuY3Rpb24gZGl2KGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmRpdiA9IGRpdjtcbmZ1bmN0aW9uIHNwYW4oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxTcGFuRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnNwYW4gPSBzcGFuO1xuZnVuY3Rpb24gcGFyYWdyYXBoKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MUGFyYWdyYXBoRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnBhcmFncmFwaCA9IHBhcmFncmFwaDtcbmZ1bmN0aW9uIGFuY2hvcihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBocmVmT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgY29uc3QgdG1wID0gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEFuY2hvckVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIGlmICh0eXBlb2YgaHJlZk9yUHJvcGVydGllcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdG1wLmhyZWYgPSBTdHJpbmcoaHJlZk9yUHJvcGVydGllcyB8fCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB0bXA7XG59XG5leHBvcnRzLmFuY2hvciA9IGFuY2hvcjtcbmZ1bmN0aW9uIGJ1dHRvbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEJ1dHRvbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5idXR0b24gPSBidXR0b247XG4vLyBDb21tb24gcHJpdmF0ZSBmdW5jdGlvbnMgZm9yIG92ZXJsb2Fkcy4gUHJldmVudHMgbG90cyBvZiBjb3B5cGFzdGEuXG4vLyBUaGlzIHdvcmtzIGZvciBldmVyeXRoaW5nIGJlY2F1c2UgVHlwZVNjcmlwdCBpcyBrZWVwaW5nIHRoZSB0eXBlcyB2YWxpZC4gSW4gcHVyZSBKUywgYnVncyBjb3VsZCBiZSBjcmVhdGVkIChmb3IgZXhhbXBsZSwgcGFzc2luZyBhbiBpbm5lclxuLy8gZWxlbWVudCB0byBhIHBhcmFncmFwaCAuLi4gZGlzYWxsb3dlZCBieSBUUyBidXQgdGhlIGNvZGUgaXMgdGhlcmUgaW4gdGhlIEpTKVxuZnVuY3Rpb24gX2ludGVybmFsKHR5cGUsIGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoaHRtbE9yUHJvcGVydGllcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfb3ZyMSh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGh0bWxPclByb3BlcnRpZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIzKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9vdnIyKHR5cGUsIFN0cmluZyhodG1sT3JQcm9wZXJ0aWVzIHx8ICcnKSwgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX292cjEodHlwZSwgaW5uZXJFbGVtZW50LCBwcm9wcywgYXR0cnMpIHtcbiAgICBjb25zdCBlID0gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xuICAgIGUuYXBwZW5kQ2hpbGQoaW5uZXJFbGVtZW50KTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIF9vdnIyKHR5cGUsIGlubmVySHRtbCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBpbm5lckh0bWw7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbmZ1bmN0aW9uIF9vdnIzKHR5cGUsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gcHJvcHMuaW5uZXJIVE1MIHx8ICcnO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGVsZXRlIHRoZSBjb250ZW50cyBvZiBhbnkgaHRtbCBub2RlLlxuICovXG5mdW5jdGlvbiBkZWxldGVOb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xufVxuZXhwb3J0cy5kZWxldGVOb2RlQ29udGVudCA9IGRlbGV0ZU5vZGVDb250ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgaGVscGVyIGZvciBDcmVhdGVFbGVtZW50LCByb3VnaGx5IG1hcHBpbmcgdG8gSHRtbEVsZW1lbnQgdHlwZXMsIGJ1dCBub3QgcGVyZmVjdGx5IGJlY2F1c2UgaXQncyBpbXBvc3NpYmxlXG4gKiAodGhlcmUncyBubyBwZXJmZWN0IDE6MSByZWxhdGlvbnNoaXApLlxuICovXG52YXIgZWxlbWVudFR5cGU7XG4oZnVuY3Rpb24gKGVsZW1lbnRUeXBlKSB7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQW5jaG9yRWxlbWVudFwiXSA9IFwiYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFyZWFFbGVtZW50XCJdID0gXCJhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXVkaW9FbGVtZW50XCJdID0gXCJhdWRpb1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJSRWxlbWVudFwiXSA9IFwiYnJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCYXNlRm9udEVsZW1lbnRcIl0gPSBcImJhc2Vmb250XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmxvY2tRdW90ZUVsZW1lbnRcIl0gPSBcImJsb2NrcXVvdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCdXR0b25FbGVtZW50XCJdID0gXCJidXR0b25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxDYW52YXNFbGVtZW50XCJdID0gXCJjYW52YXNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhRWxlbWVudFwiXSA9IFwiZGF0YVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFMaXN0RWxlbWVudFwiXSA9IFwiZGF0YWxpc3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaWFsb2dFbGVtZW50XCJdID0gXCJkaWFsb2dcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaXZFbGVtZW50XCJdID0gXCJkaXZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxETGlzdEVsZW1lbnRcIl0gPSBcImRsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRW1iZWRFbGVtZW50XCJdID0gXCJlbWJlZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZpZWxkU2V0RWxlbWVudFwiXSA9IFwiZmllbGRzZXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGb3JtRWxlbWVudFwiXSA9IFwiZm9ybVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcxRWxlbWVudFwiXSA9IFwiaDFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMkVsZW1lbnRcIl0gPSBcImgyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzNFbGVtZW50XCJdID0gXCJoM1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc0RWxlbWVudFwiXSA9IFwiaDRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNUVsZW1lbnRcIl0gPSBcImg1XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzZFbGVtZW50XCJdID0gXCJoNlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhSRWxlbWVudFwiXSA9IFwiaHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbWFnZUVsZW1lbnRcIl0gPSBcImltYWdlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW5wdXRFbGVtZW50XCJdID0gXCJpbnB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExhYmVsRWxlbWVudFwiXSA9IFwibGFiZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMZWdlbmRFbGVtZW50XCJdID0gXCJsZWdlbmRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMSUVsZW1lbnRcIl0gPSBcImxpXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGlua0VsZW1lbnRcIl0gPSBcImxpbmtcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNYXBFbGVtZW50XCJdID0gXCJtYXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNZXRlckVsZW1lbnRcIl0gPSBcIm1ldGVyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kRGVsRWxlbWVudFwiXSA9IFwiZGVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kSW5zRWxlbWVudFwiXSA9IFwiaW5zXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT0xpc3RFbGVtZW50XCJdID0gXCJvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9iamVjdEVsZW1lbnRcIl0gPSBcIm9iamVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdEdyb3VwRWxlbWVudFwiXSA9IFwib3B0Z3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRpb25FbGVtZW50XCJdID0gXCJvcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPdXRwdXRFbGVtZW50XCJdID0gXCJvdXRwdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhZ3JhcGhFbGVtZW50XCJdID0gXCJwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYW1FbGVtZW50XCJdID0gXCJwYXJhbVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBpY3R1cmVFbGVtZW50XCJdID0gXCJwaWN0dXJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJlRWxlbWVudFwiXSA9IFwicHJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJvZ3Jlc3NFbGVtZW50XCJdID0gXCJwcm9ncmVzc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFF1b3RlRWxlbWVudFwiXSA9IFwicVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNjcmlwdEVsZW1lbnRcIl0gPSBcInNjcmlwdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNlbGVjdEVsZW1lbnRcIl0gPSBcInNlbGVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNvdXJjZUVsZW1lbnRcIl0gPSBcInNvdXJjZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNwYW5FbGVtZW50XCJdID0gXCJzcGFuXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3R5bGVFbGVtZW50XCJdID0gXCJzdHlsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnRcIl0gPSBcImNhcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFwiXSA9IFwidGRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50XCJdID0gXCJ0aFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sRWxlbWVudFwiXSA9IFwiY29sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xHcm91cEVsZW1lbnRcIl0gPSBcImNvbGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVFbGVtZW50XCJdID0gXCJ0YWJsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlUm93RWxlbWVudFwiXSA9IFwidHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Cb2R5RWxlbWVudFwiXSA9IFwidGJvZHlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Gb290ZXJFbGVtZW50XCJdID0gXCJ0Zm9vdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkhlYWRlckVsZW1lbnRcIl0gPSBcInRoZWFkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGVtcGxhdGVFbGVtZW50XCJdID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRleHRBcmVhRWxlbWVudFwiXSA9IFwidGV4dGFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUaW1lRWxlbWVudFwiXSA9IFwidGltZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRyYWNrRWxlbWVudFwiXSA9IFwidHJhY2tcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxVTGlzdEVsZW1lbnRcIl0gPSBcInVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVmlkZW9FbGVtZW50XCJdID0gXCJ2aWRlb1wiO1xufSkoZWxlbWVudFR5cGUgPSBleHBvcnRzLmVsZW1lbnRUeXBlIHx8IChleHBvcnRzLmVsZW1lbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChpbnB1dCkge1xuICAgIC8vIFRoZXJlIGlzbid0IGEgYnVpbHQtaW4gd2F5IHRvIGRvIHRoaXMsIHN0aWxsLCBzbyB3ZSBuZWVkIGEgaGVscGVyIGZ1bmN0aW9uLlxuICAgIC8vIFRoZSBhcnRpY2xlIFwiWW91IGFyZSBwcm9iYWJseSBtaXN1c2luZyBET00gdGV4dCBtZXRob2RzXCIgY29udmluY2VkIG1lIHRvIGRvIGl0IHRoaXMgd2F5LFxuICAgIC8vIHZzLiBjcmVhdGVUZXh0Tm9kZS4gVGhvdWdoIGNyZWF0ZVRleHROb2RlIHdvdWxkIHByb2JhYmx5IHdvcmsgZmluZSBmb3Igc2V0dGluZyBpbm5lckhUTUwuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGVzY2FwZXMgPSB7XG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICAgICAgXCI9XCI6IFwiJiN4M0Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXG4gICAgICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gICAgfTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBzID0+IGVzY2FwZXNbc10pO1xufVxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUgYXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xufVxuZXhwb3J0cy5leHRyYWN0Tm9kZUNvbnRlbnQgPSBleHRyYWN0Tm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGZpbmRJbmRleEluUGFyZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmluZGV4T2YoZWxlbWVudCk7XG4gICAgfVxufVxuZXhwb3J0cy5maW5kSW5kZXhJblBhcmVudCA9IGZpbmRJbmRleEluUGFyZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogSFRNTCBpcyBpbmNvbnNpc3RlbnQuIEdldHRpbmcgdGhlIHZhbHVlIG9mIGZvcm0gZmllbGRzIGlzIGEgYml0IGNvbXBsaWNhdGVkLCBub3QgYWx3YXlzIGVsZW1lbnQudmFsdWUsXG4gKiBzbyBoZXJlJ3MgYSBoZWxwZXIgdG8gbWFrZSBpdCBlYXNpZXIuXG4gKi9cbmZ1bmN0aW9uIGdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpIHtcbiAgICAvLyBJdCB3b3VsZCBiZSByZWFsbHkgbmljZSBhdCB0aGlzIHBvaW50IGlmIEpTIGNvdWxkIHNlZSBnZW5lcmljIHBhcmFtZXRlcnMuXG4gICAgLy8gSWYgaXQgY291bGQsIHRoZW4gdGhlIGNvZGUgY291bGQgc2F5IFwiaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgJiYgVE91dHB1dCAhPT0gYm9vbGVhbikgdGhyb3cgbmV3IEVycm9yKClcIlxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDaGVja2JveFZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldE51bWJlcklucHV0VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJhZGlvVmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0VmFsdWUoZWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Rm9ybUZpZWxkVmFsdWUgPSBnZXRGb3JtRmllbGRWYWx1ZTtcbmZ1bmN0aW9uIGdldENoZWNrYm94VmFsdWUoaW5wdXQpIHtcbiAgICByZXR1cm4gISFpbnB1dC5jaGVja2VkO1xufVxuZXhwb3J0cy5nZXRDaGVja2JveFZhbHVlID0gZ2V0Q2hlY2tib3hWYWx1ZTtcbmZ1bmN0aW9uIGdldE51bWJlcklucHV0VmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihpbnB1dC52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXROdW1iZXJJbnB1dFZhbHVlID0gZ2V0TnVtYmVySW5wdXRWYWx1ZTtcbmZ1bmN0aW9uIGdldFJhZGlvVmFsdWUoaW5wdXQpIHtcbiAgICAvLyBSYWRpbyBidXR0b25zIGFyZSB3ZWlyZC4gV2Ugd2FudCB0aGVtIHRvIGFwcGVhciB0byBiZSBtb3JlIG5vcm1hbC5cbiAgICBpZiAoaW5wdXQubmFtZSkge1xuICAgICAgICByZXR1cm4gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9XCIke2lucHV0Lm5hbWV9XCJdOmNoZWNrZWRgKSB8fCB7fSkudmFsdWU7XG4gICAgfVxuICAgIC8vIElmIG5vIG5hbWUsIGZhbGwgYmFjayB0byB0aGlzXG4gICAgaWYgKGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0UmFkaW9WYWx1ZSA9IGdldFJhZGlvVmFsdWU7XG5mdW5jdGlvbiBnZXRTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICBpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiBnZXRNdWx0aVNlbGVjdFZhbHVlKHNlbGVjdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZWN0LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U2VsZWN0VmFsdWUgPSBnZXRTZWxlY3RWYWx1ZTtcbmZ1bmN0aW9uIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2VsZWN0LnNlbGVjdGVkT3B0aW9ucykuZmlsdGVyKGYgPT4gZi52YWx1ZSkubWFwKG0gPT4gbS52YWx1ZSk7XG59XG5leHBvcnRzLmdldE11bHRpU2VsZWN0VmFsdWUgPSBnZXRNdWx0aVNlbGVjdFZhbHVlO1xuLy8gVGhpcyBpcyBhbG1vc3QgcG9pbnRsZXNzLiBKdXN0IGhlcmUgZm9yIGNvbnNpc3RlbmN5LlxuZnVuY3Rpb24gZ2V0U2ltcGxlRm9ybVZhbHVlKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgaWYgKGlucHV0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCB2YWxpZCBmb3IgbXVsdGktc2VsZWN0cycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbn1cbmV4cG9ydHMuZ2V0U2ltcGxlRm9ybVZhbHVlID0gZ2V0U2ltcGxlRm9ybVZhbHVlO1xuLyoqXG4gKiBTZXR0aW5nIHZhbHVlcyBpcyBqdXN0IGFzIGNvbXBsaWNhdGVkIGFzIGdldHRpbmcgdGhlbSwgYmVjYXVzZSBIVE1MIGlzIGluY29uc2lzdGVudC4gWW91IGNhbid0IGp1c3Qgc2F5IGVsZW1lbnQudmFsdWUgPSBmb28uXG4gKiBIZXJlJ3MgYSBoZWxwZXIgdG8gbWFrZSBpdCBlYXNpZXIuXG4gKi9cbmZ1bmN0aW9uIHNldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgLy8gSGVyZSB5b3UgY2FuIHZhbGlkYXRlIHRoZSB0eXBlIGJlZm9yZSBzZXR0aW5nIG9yIGRvIHNvbWUga2luZCBvZiBjb252ZXJzaW9uLlxuICAgIC8vIEZvciBtdWx0aS1zZWxlY3RzLCBjYW4gYXV0by13cmFwIHZhbHVlIGluIHN0cmluZy5cbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTsgLy8gdXNlZCBpbiBtb3N0IG9mIHRoZSBjYXNlc1xuICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gdmFsdWUgPT09IHRydWUgfHwgc3RyaW5nVmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBzdHJpbmdWYWx1ZSA9PT0gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0b0RhdGVTdHJpbmcobmV3IERhdGUoc3RyaW5nVmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZXRpbWUnIHx8IHR5cGUgPT09ICdkYXRldGltZS1sb2NhbCcpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc3RyaW5nVmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gYCR7dG9EYXRlU3RyaW5nKGRhdGUpfVQke3RvVGltZVN0cmluZyhkYXRlKX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IEFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpO1xuICAgICAgICBpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlOyAvLyB0cmVhdGluZyBpdCBsaWtlIGEgbm9uLW11bHRpcGxlIHdvcmtzXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm9uZXhpc3RlbnQgb3B0aW9ucyBjYW5ub3QgYmUgc2V0LiBXZSBzaG91bGQgbGV0IHRoZSBwcm9ncmFtbWVyIGtub3cuIEV2ZW4gdGhvdWdoIHRoaXMgdGFrZXMgQ1BVIGN5Y2xlcy5cbiAgICAgICAgICAgIHZhbHVlLm1hcChtID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCBtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHQgb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9wdC5zZWxlY3RlZCA9IHZhbHVlLm1hcChtID0+IG0udG9TdHJpbmcoKSkuaW5kZXhPZihvcHQudmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZWxlY3QudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICBlbGVtZW50LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oYENhbGxlZCBzZXRGb3JtRmllbGRWYWx1ZSBvbiBub24tZm9ybSBmaWVsZCAke2VsZW1lbnQudGFnTmFtZX0gJHtlbGVtZW50LmlkIHx8ICcnfWApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja09wdGlvbihvcHRpb25zLCB2YWwpIHtcbiAgICAgICAgLy8gSWYgeW91IHNldCB0aGUgdmFsdWUgb2YgYSBzZWxlY3QgdG8gc29tZXRoaW5nIHRoYXQgaXMgbm90IGFuIGF2YWlsYWJsZSBvcHRpb24sIG5vdGhpbmcgd2lsbCBoYXBwZW4uXG4gICAgICAgIGNvbnN0IGhhc09wdGlvbiA9IG9wdGlvbnMubWFwKG0gPT4gbS52YWx1ZSkuaW5kZXhPZih2YWwudG9TdHJpbmcoKSkgPiAtMTtcbiAgICAgICAgaWYgKCFoYXNPcHRpb24pIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENhbGxlZCBzZXRGb3JtRmllbGRWYWx1ZSB3aXRoIG5vbmV4aXN0ZW50IG9wdGlvbiAke3ZhbC50b1N0cmluZygpfSBvbiBzZWxlY3QgJHtlbGVtZW50LmlkfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZXNlIGNvdWxkIGJlIHJlYWRhYmxlIG9uZWxpbmVycyBpZiB3ZSBoYWQgcGFkU3RhcnQoKSBidXQgaXQncyBub3Qgd29ydGggYnVtcGluZyB0byBFUzIwMTcgZm9yIG9uZSBtZXRob2RcbiAgICBmdW5jdGlvbiB0b0RhdGVTdHJpbmcoZGF0ZSkge1xuICAgICAgICBpZiAoIWlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vbnRoID0gKCcwJyArIChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgICAgIGNvbnN0IGRheSA9ICgnMCcgKyBkYXRlLmdldFVUQ0RhdGUoKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHtkYXRlLmdldFVUQ0Z1bGxZZWFyKCl9LSR7bW9udGh9LSR7ZGF5fWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvVGltZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaG91ciA9ICgnMCcgKyBkYXRlLmdldEhvdXJzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgbWludXRlID0gKCcwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHtob3VyfToke21pbnV0ZX1gO1xuICAgIH1cbn1cbmV4cG9ydHMuc2V0Rm9ybUZpZWxkVmFsdWUgPSBzZXRGb3JtRmllbGRWYWx1ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBIZXJlJ3MgYSBoZWxwZXIgZm9yIG9uZSBvZiB0aGUgcGxhY2VzIHdoZXJlIEhUTUw1IGZhbGxzIG92ZXIuIElmIHlvdSBnZXQgc29tZSBodG1sIGxpa2UgPGRpdiBpZD1cIjFcIj48L2Rpdj48ZGl2IGlkPVwiMlwiPjwvZGl2PiwgaXQgYmVjb21lc1xuICogYSBOb2RlTGlzdC4gSFRNTDUgYnkgZGVmYXVsdCBkb2VzIG5vdCBwcm92aWRlIGEgd2F5IHRvIHNlYXJjaCB0aGlzIGZvciBhIHNlbGVjdG9yLlxuICovXG5mdW5jdGlvbiBub2RlTGlzdFNlbGVjdG9yKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2g7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3IgPSBub2RlTGlzdFNlbGVjdG9yO1xuLyoqXG4gKiBIZXJlJ3MgYSBoZWxwZXIgZm9yIG9uZSBvZiB0aGUgcGxhY2VzIHdoZXJlIEhUTUw1IGZhbGxzIG92ZXIuIElmIHlvdSBnZXQgc29tZSBodG1sIGxpa2UgPGRpdiBpZD1cIjFcIj48L2Rpdj48ZGl2IGlkPVwiMlwiPjwvZGl2PiwgaXQgYmVjb21lc1xuICogYSBOb2RlTGlzdC4gSFRNTDUgYnkgZGVmYXVsdCBkb2VzIG5vdCBwcm92aWRlIGEgd2F5IHRvIHNlYXJjaCB0aGlzIGZvciBhIHNlbGVjdG9yLlxuICovXG5mdW5jdGlvbiBub2RlTGlzdFNlbGVjdG9yQWxsKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIC8vIEJlY2F1c2UgdGhlIGJyb3dzZXIgY2FuIGxvc2UgcmVmZXJlbmNlcyB3aGVuIG1vdmluZyBub2RlcywgdGhpcyBjYW4gYWxzbyB0YWtlIGEgcmVndWxhciBhcnJheS5cbiAgICAvLyBCZWNhdXNlIEhUTUw1IGhhcyB0b3RhbGx5IGZhbGxlbiBvdmVyLCBpdCdzIG5vdCBwb3NzaWJsZSBmb3IgdGhlIGZpeGVkIG5vZGVMaXN0U2VsZWN0b3JBbGxcbiAgICAvLyB0byBtYXRjaCB0aGUgb3V0cHV0IHNpZ25hdHVyZSBvZiBxdWVyeVNlbGVjdG9yQWxsIChOb2RlTGlzdE9mPEVsZW1lbnQ+IGluc3RlYWQgb2YgYXJyYXkpLlxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKCEoJ21hdGNoZXMnIGluIG5vZGUpKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IHRleHQgbm9kZXNcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLkFycmF5LmZyb20oc2VhcmNoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5ub2RlTGlzdFNlbGVjdG9yQWxsID0gbm9kZUxpc3RTZWxlY3RvckFsbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJZiB0aGUgZG9jdW1lbnQgY29udGFpbnMgYW55IGR1cGxpY2F0ZSBJRHMsIHRocm93IGFuIGV4Y2VwdGlvbi5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVVbmlxdWVEb21JZHMoKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGZvbyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqW2lkXScpKSB7XG4gICAgICAgIGlkcy5hZGQoZm9vLmlkKTtcbiAgICAgICAgaSsrO1xuICAgICAgICBpZiAoaWRzLnNpemUgIT09IGkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIERPTSBJRHMgZm91bmQuIFRoZSBmaXJzdCBkdXBsaWNhdGUgaWQgaXMgJHtmb299LmApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVVuaXF1ZURvbUlkcyA9IHZhbGlkYXRlVW5pcXVlRG9tSWRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2ktdicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaS12JywgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICB0aGlzLl9hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gb3B0aW9ucy5kZWZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgLy8gRGVmaW5lZCB0aGUgZGVmYXVsdCBjb21wb25lbnQgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IGxvb3BQb3N0UHJvY2VzcygpIG1ldGhvZFxuICAgICAgICBpZiAob3B0aW9ucy5sb29wSXRlbUNsYXNzKSB7XG4gICAgICAgICAgICBpZiAoIUNvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb29wSXRlbUNsYXNzIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShvcHRpb25zLmxvb3BJdGVtQ2xhc3MgaW5zdGFuY2VvZiBCb3VuZENvbXBvbmVudC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGFuIGJvdW5kIGNvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MgPSBvcHRpb25zLmxvb3BJdGVtQ2xhc3MgfHwgQm91bmRDb21wb25lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCk7XG4gICAgICAgIHRoaXMuc2V0VGVtcGxhdGUodGhpcy5jb250ZW50LmlubmVySFRNTCk7IC8vIElubmVySFRNTCBpcyBjdXJyZW50bHkgb25seSBwYXJzZWQgYW5kIHRoZW4gdGhlIG9yaWdpbmFsIHRleHQgaXMgdGhyb3duIGF3YXkuXG4gICAgICAgIC8vIEF1dG8tYWRkIHN1YnNjcmlwdGlvbnMgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMub2JzZXJ2ZVZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGd0IG9mIG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUodGd0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcigpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0b3IgaW5pdGlhbGl6YXRpb24gaXMgZG9uZS5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKiBUbyByZXBsYWNlIHRoZSBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogSW4gYWxtb3N0IGV2ZXJ5IGNhc2UsIHZpZXdNb2RlbCBzaG91bGQgYmUgc2V0LiBCdXQgaXQncyBub3QgcG9zc2libGUgdG8gY2hhbmdlIHRoYXQgYW5kIHN0aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgYmFzZVxuICAgICAqIGNsYXNzIGluamVjdCgpLiBUaGlzIGlzIGEgdHlwZXNjcmlwdC1vbmx5IGlzc3VlIGJ1dCBpdCBtYWtlcyB0aGluZ3MgdWdseS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuIEFuZCBwcmFjdGljYWxseSBkZW1hbmRzIHRoZWlyIHVzZSB0byBzZXQgdmlld01vZGVsLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQm91bmRDb21wb25lbnQoZWxlbWVudCwgdmlld01vZGVsLCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Cb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbCB0byBpbmplY3QoKSB3aXRoIGEgY2xlYW5lciBhcmd1bWVudCBvcmRlci5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0QmluZCh2aWV3TW9kZWwsIHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKTtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIHZpZXdNb2RlbCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAvLyBXQVJOOiBUaGlzIGNhc3QgbWF5IG5vdCBiZSB0cnVlLiBUaGVyZSdzIG5vIHdheSB0byBjaGVjayB0aGF0IHRoZSB0YWdzIG1hdGNoLlxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgb3B0KTtcbiAgICB9XG4gICAgd3JpdGUoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIGNhc2VzIHdoZXJlIHZhbHVlIGlzIHVuZGVmaW5lZC4gRWl0aGVyIHRoZSBlbGVtZW50IGlzIG5vdCBhIGZvcm0gZWxlbWVudCBvciBpdCdzIGFuIHVubmFtZWQgcmFkaW8gYnV0dG9uXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IHNlbGVjdGVkLiBJbiBib3RoIGNhc2VzLCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSB0aGUgbW9kZWwgd2l0aCB1bmRlZmluZWQsIHdoaWNoIGlzIHVzZWxlc3MuXG4gICAgICAgIC8vIFRPRE86IElzIHRoaXMganVzdGlmaWNhdGlvbiB2YWxpZD9cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXQVJOOiBDYW5ub3QgdHlwZSBjaGVjayB0aGlzIGR5bmFtaWNhbGx5LiBUeXBlU2NyaXB0IGlzIGJ1aWxkLXRpbWUgY2hlY2tpbmcgb25seS4gUnVudGltZSBjb2RlIGNhbid0IGV2ZW4gc2VlIHRoZSB0eXBlLlxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB0byBiZSBwcmVjaXNlLCBhbGwgcHJvcGVydGllcyBpbiBfd3JpdGVCaW5kaW5ncyBzaG91bGQgYmUgRm9ybUl0ZW1WYWx1ZSwgYnV0IGFzIF93cml0ZUJpbmRpbmdzIGlzIHBvcHVsYXRlZFxuICAgICAgICAvLyB2aWEgc3RyaW5nLCB0aGVyZSdzIG5vIHdheSB0byBlbmZvcmNlIHRoYXQuIFNvIGlmIHlvdSBmaWxsIGEgc3RyaW5nIHZhbHVlIGZyb20gYSBtdWx0aXBsZSBzZWxlY3QsIGl0J2xsIHByb2R1Y2UgYnVncy5cbiAgICAgICAgLy8gU28gYmUgY2FyZWZ1bC4gSXQncyBvbiB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYmluZCBvZiB0aGlzLl93cml0ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGlmIChiaW5kLnN0YXJ0c1dpdGgoJ3RoaXMuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW2JpbmRdO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzW2JpbmRdID0gdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIHZpZXcgbW9kZWwgaXMgZWl0aGVyIEZvcm1GaWVsZFZhbHVlIG9yIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBvbmUuXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGhpcy52aWV3TW9kZWwsICgpID0+IHRoaXMudmlld01vZGVsID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIG9ic2VydmFibGUgc3RhdGUsIHdlIG5lZWQgdG8gZ2V0IHRoZSBzdGF0ZSwgdXBkYXRlIGl0LCBhbmQgd3JpdGUgdGhlIHdob2xlIHRoaW5nIGJhY2suXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoaWxlIGl0IGlzIHBvc3NpYmxlIHRvIHVwZGF0ZSBhIHNpbmdsZSBwcm9wZXJ0eSBpbiBzb21lIGNhc2VzLCBpdCBkb2Vzbid0IGFsbG93IHJldXNlIG9mIGFscmVhZHktd29ya2luZyBjb2RlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZpZXdNb2RlbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG1wW2JpbmRdO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gdG1wW2JpbmRdID0gdmFsdWUsIHRtcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdG1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy52aWV3TW9kZWxbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzLnZpZXdNb2RlbFtiaW5kXSA9IHZhbHVlLCB0aGlzLnZpZXdNb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlVmFsdWUodGFyZ2V0LCB3cml0ZVRvUHJvcGVydHksIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRvIGJlIGZsZXhpYmxlLCBiZWNhdXNlIGlmIHRhcmdldCBpcyBhIHZhbHVlIHR5cGUgb3IgaW1tdXRhYmxlLCB3cml0aW5nXG4gICAgICAgICAgICAvLyBpdCBkaXJlY3RseSByZXBsYWNlcyBvbmx5IHRoZSB2YWx1ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBtb2RlbC5cbiAgICAgICAgICAgIHdyaXRlVG9Qcm9wZXJ0eSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byB0aGUgbW9kZWwgcGFzc2VkIGluLCBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi5cbiAgICAgKi9cbiAgICBvYnNlcnZlKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmIChJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhtb2RlbCkpIHtcbiAgICAgICAgICAgIG1vZGVsLnN1YnNjcmliZSh0aGlzLnJlbmRlciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byBhbGwgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIGZvdW5kIGluIHRoZSBtb2RlbCBwYXNzZWQgaW4sXG4gICAgICogb3IgdGhlIHZpZXcgbW9kZWwgaWYgbm9uZSBwYXNzZWQgaW4uIFRoaXMgb25seSBnb2VzIG9uZSBsZXZlbCBkZWVwLCBzbyBpdFxuICAgICAqIHdvbid0IHBpY2sgdXAgbmVzdGVkIG9iamVjdHMsIGJ1dCBpdCdzIHByb2JhYmx5IGdvb2QgZW5vdWdoIGluIDYwJSBvZiBjYXNlcy5cbiAgICAgKi9cbiAgICBvYnNlcnZlQWxsKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbCk7XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtb2RlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbFttXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gU2VlIGlmIHdlIG5lZWQgdG8gZGVmZXIgcmVuZGVyaW5nIHVudGlsIGFmdGVyIGluaXRpYWxpemF0aW9uXG4gICAgICAgIGlmICh0aGlzLl9kZWZlciAmJiAhdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYm9vbCkge1xuICAgICAgICAgICAgICAgIC8vIEZvciBib29sZWFuIGF0dHJpYnV0ZXMsIHRoZSB2ZXJ5IGV4aXN0ZW5jZSBvZiB0aGUgYXR0cmlidXRlIG1lYW5zIGl0IGlzIGNvbnNpZGVyZWQgdG8gYmUgdHJ1ZS5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gISF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUsIHRoaXMuX2dldFN0cmluZ1ZhbHVlKGl0ZW0uc291cmNlKSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAvLyBDYWxscyBzZXRGb3JtRmllbGRWYWx1ZSBiZWhpbmQgdGhlIHNjZW5lcy5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fdmFsdWVBdHRyaWJ1dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzQ2xhc3NlcykgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMpIHtcbiAgICAgICAgICAgIC8vIElmIHRydXRoeSwgYWRkIGNsYXNzLCBlbHNlIGRlbGV0ZSBpdC5cbiAgICAgICAgICAgIGxldCB2YWwgPSAhIXRoaXMuX2dldFVudHlwZWRWYWx1ZShpdGVtLnNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHRoaXMuX2Nzc1N0eWxlKSB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5jc3NUZXh0ID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCAmJiAhdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW52YWxpZCBzdHlsZSB0ZXh0IGluIGNvbXBvbmVudDogJHt2YWx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZXJhYmxlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2xvb3Auc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVyYWJsZSAmJiB0eXBlb2YgaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLl9sb29wLmZyYWdtZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXMgc29vbiBhcyB3ZSBhZGQgdGhlIGNsb25lIHRvIGNvbnRlbnQsIGNoaWxkTm9kZXMgbG9zZXMgcmVmZXJlbmNlIHRvIGl0cyBjaGlsZCBub2Rlcywgc28gY29weSBpdC5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGNsb25lLmNoaWxkTm9kZXMpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wLnBvc3RQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb3BQb3N0UHJvY2Vzcyhyb3csIG5vZGVzLCBpdGVyYWJsZSwgcHJldmlvdXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzRGlzcGxheSkge1xuICAgICAgICAgICAgLy8gSWYgZmFsc3ksIHNldCBkaXNwbGF5OiBub25lIChzYXZpbmcgcHJldmlvdXMgdmFsdWUpLiBJZiB0cnV0aHksIHJlc3RvcmUgcHJldmlvdXMgdmFsdWUgKGlmIGJsb2NrLCBmbGV4LCBidXQgbm90IGlmIG5vbmUpXG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2Nzc0Rpc3BsYXkuc291cmNlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5Lm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCB0aGlzLl9wcmV2aW91c0Nzc0Rpc3BsYXlTZXR0aW5nIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgPSB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGVtcGxhdGUodGVtcGxhdGVUZXh0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgdXBkYXRlIHBhcmFtIHNob3VsZCBub3QgYmUgc2V0LlxuICAgICAgICBpZiAodXBkYXRlICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgc2hvdWxkIG5vdCBiZSB0cnVlIHdoZW4gY2FsbGVkIGludGVybmFsbHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2Ugd2UncmUgY3JlYXRpbmcgYW4gZWxlbWVudCB0aGF0J3Mgbm90IG9uIHRoZSBwYWdlLCB3ZSBwcm9iYWJseSBjb3VsZCBhdm9pZCB1c2luZyBhIGZyYWdtZW50LFxuICAgICAgICAvLyBidXQgdGhpcyBpcyB3aGF0IGZyYWdtZW50cyBhcmUgZm9yLlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlVGV4dDtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHVzZWQgdG8gcmVwbGFjZSB0aGUgZXhpc3RpbmcgdGVtcGxhdGUsIHdlIG5lZWQgdG8gd2lwZSBvdXQgdGhlIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gV29ya2luZyBvbiBhIGNsb25lIGhlcmUsIHNvIHdlIGRvbid0IHNlZSB0aGUgYm9keSBiZWluZyBidWlsdCBzdGVwIGJ5IHN0ZXAgaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpLXYnKSkge1xuICAgICAgICAgICAgLy8gSWYgbmFtZSBpcyBzcGVjaWZpZWQsIGNvbXBvbmVudCBNVVNUIGJlIHNwZWNpZmllZC4gVGhlIHNhbWUgaWYgY29tcG9uZW50IGlzIHNwZWNpZmllZC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uYW1lICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIHNhbWUgaWYgY29tcG9uZW50IGlzIHNwZWNpZmllZC4gUmVxdWlyZXMgcmVwZWF0aW5nIGJlY2F1c2UgdGhpcyBwYXJ0IGJyZWFrcyB3aGVuIG1pbmlmaWVkXG4gICAgICAgICAgICBpZiAocmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm9lc2NhcGUgPSByZXBsLmhhc0F0dHJpYnV0ZSgnbm9lc2NhcGUnKSAmJiByZXBsLmdldEF0dHJpYnV0ZSgnbm9lc2NhcGUnKSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiByZXBsLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogcmVwbC5pbm5lckhUTUwsXG4gICAgICAgICAgICAgICAgbm9lc2NhcGU6IG5vZXNjYXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbiB0aGUgb3JpZ2luYWwgYnVpbGQgb2YgdGhlIG9iamVjdCwgZiBhbnkgcmVwbGFjZW1lbnRzIHN0YXJ0IHdpdGggXCJ0aGlzLlwiIHdlIG5lZWQgdG8gZGVmZXIuXG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQgJiYgIXRoaXMuX2RlZmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZlciA9IHRoaXMuX2RlZmVyIHx8ICEhdGhpcy5fcmVwbGFjZW1lbnRzLmZpbmQoZiA9PiBmLnNvdXJjZS5zdGFydHNXaXRoKFwidGhpcy5cIikpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlZSBpZiB3ZSBuZWVkIHRvIGRlZmVyIHJlbmRlcmluZyB1bnRpbCBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgd2lsbCBsZWFkIHRvIGEgRk9VQywgbWF5YmUgbWlsbGlzZWNvbmRzLCBtYXliZSBsb25nZXIuXG4gICAgICAgIGlmICghdGhpcy5fZGVmZXIgfHwgdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGNvbXBsZXRlZCB2YWx1ZXMgYmVmb3JlIGFkZGluZyB0byB0aGUgdmlzaWJsZSBwYWdlLiBUaGlzIGlzIHNsaWdodGx5IHJlZHVuZGFudCwgYmVjYXVzZSB0aGlzIGhhcHBlbnMgaW4gdGhlIHJlbmRlcigpXG4gICAgICAgICAgICAvLyBzdGVwLCBidXQgSSBoYXRlIGl0IHdoZW4gSSBzZWUgYSBmbGFzaCBvZiB1bnJlcGxhY2VkIGNvbnRlbnQgb24gc2l0ZXMuXG4gICAgICAgICAgICAvLyBUaGUgcmVhc29uIHRoaXMgd29ya3MgaXMgYmVjYXVzZSBfcmVwbGFjZW1lbnRzIHJlZmVyZW5jZXMgY2xvbmUsIHdoaWNoIGlzbid0IHZpc2libGUgdW50aWwgYWxtb3N0IHRoZSBsYXN0IGxpbmUuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGZyb250LWVuZCB0ZXh0LiBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHRoaW5nIHRvIHJlcGxhY2UuIE90aGVyd2lzZSwgeW91J3JlIGp1c3Qgd2lwaW5nIG91dCBwZXJmZWN0bHlcbiAgICAgICAgLy8gdmFsaWQgSFRNTDUgcmVmZXJlbmNlcyBmb3Igbm8gcmVhc29uLlxuICAgICAgICBpZiAodGhpcy5fcmVwbGFjZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBhIGZ1bGwgdXBkYXRlIGlmIHJlcXVlc3RlZCB0b1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIdG1sVGVtcGxhdGUodGVtcGxhdGVQcm9wZXJ0eSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VGVtcGxhdGUoJzxpLXYgbm9lc2NhcGU+JyArIHRlbXBsYXRlUHJvcGVydHkgKyAnPC9pLXY+JywgdXBkYXRlKTtcbiAgICB9XG4gICAgc2V0VGV4dFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12PicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldExvb3Aoc291cmNlID0gJy4nLCBmcmFnbWVudCwgc2tpcFBvc3RQcm9jZXNzID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFmcmFnbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJhZ21lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmcmFnbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVGcmFnbWVudChmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9vcCA9IHsgc291cmNlLCBwb3N0UHJvY2VzczogIXNraXBQb3N0UHJvY2VzcywgZnJhZ21lbnQgfTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlTG9vcCh1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9sb29wID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRWYWx1ZUF0dHJpYnV0ZShzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlQXR0cmlidXRlID0gc291cmNlO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRWaXNpYmlsaXR5KHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0Rpc3BsYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0geyBzb3VyY2UsIG5lZ2F0aXZlIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHNvdXJjZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmluZChmID0+IGYuYXR0cmlidXRlID09PSBhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKHsgYXR0cmlidXRlLCBzb3VyY2UsIGJvb2w6IGZhbHNlLCBuZWdhdGl2ZTogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQm9vbGVhbkF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiB0cnVlLCBuZWdhdGl2ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVBdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmlsdGVyKGYgPT4gZi5hdHRyaWJ1dGUgIT09IGF0dHJpYnV0ZSk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NDbGFzcyhjbHMgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzZXMgPSBjbHM7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENzc1N0eWxlKHN0eWxlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jc3NTdHlsZSA9IHN0eWxlO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRDc3NDbGFzc1N3aXRjaChjbHMsIHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFjbHMgfHwgIXNvdXJjZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5maW5kKGYgPT4gZi5jbGFzcyA9PT0gY2xzKSkge1xuICAgICAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKHsgY2xhc3M6IGNscywgc291cmNlLCBuZWdhdGl2ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVDc3NDbGFzc1N3aXRjaChjbHMsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghY2xzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmlsdGVyKGYgPT4gZi5jbGFzcyAhPT0gY2xzKTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRXcml0ZUV2ZW50KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLndyaXRlLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVUYXJnZXQodGFyZ2V0ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl93cml0ZVRhcmdldHMuZmluZChmID0+IGYgPT09IHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlV3JpdGVUYXJnZXQodGFyZ2V0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl93cml0ZVRhcmdldHMuZmlsdGVyKGYgPT4gZiAhPT0gdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBdXRvLUluamVjdCBjYWxscyB0aGUgZGVmYXVsdCBpbmplY3RCaW5kKCkgb24gdGhlIGRlZmF1bHQgQm91bmRDb21wb25lbnQgY2xhc3MsIHdpdGggbm8gb3B0aW9ucyBleGNlcHQgc2VsZWN0b3IuXG4gICAgICogSWYgeW91IHBhc3Mgbm8gaW5wdXRzLCBpdCBzZWVrcyBvdXQgYWxsIGNoaWxkIGVsZW1lbnRzIHRoYXQgaGF2ZSBhdCBsZWFzdCBvbmUgaWNoaWdvIGN1c3RvbSBwcm9wZXJ0eS4gS2VlcCBpbiBtaW5kXG4gICAgICogdGhhdCB3aGVuIHlvdSBoYXZlIG5lc3RlZCBvYmplY3RzLCB0aGlzIHdpbGwgdXN1YWxseSBtZWFuIHNvbWV0aGluZyB3aWxsIGJsb3cgdXAgYmVjYXVzZSB5b3UgdHJpZWQgdG8gYmluZCBhbiBlbGVtZW50XG4gICAgICogdHdpY2UuIEl0IGFsc28gd2lsbCBwZXJmb3JtIG11Y2ggd29yc2UuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgcGFzcyBhIHNlbGVjdG9yLCBpdCBhY3RzIHRoZSBzYW1lIGFzIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQoKSB3aXRoIHRoYXQgc2VsZWN0b3IuXG4gICAgICpcbiAgICAgKiBJbiBteSBleHBlcmllbmNlLCB0aGlzIGlzIGFsbW9zdCBjb21wbGV0ZWx5IHVzZWxlc3MuIEVpdGhlciB0aGUgbGFjayBvZiBvcHRpb25zIGJyZWFrcyBpdCAocHJldHR5IHVzZWxlc3MgaWYgeW91IGNhbid0XG4gICAgICogb2JzZXJ2ZSBhbiBvYnNlcnZhYmxlKSBvciB0aGUgc2ltcGxlIGFjdCBvZiBiaW5kaW5nIGJyZWFrcyBzdHVmZi5cbiAgICAgKi9cbiAgICBhdXRvSW5qZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCh0aGlzLnZpZXdNb2RlbCwgc2VsZWN0b3IsIHsgcGFyZW50OiB0aGlzLmNvbnRlbnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGUuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIubmFtZS5zdGFydHNXaXRoKCdpNV8nKSB8fCBhdHRyLm5hbWUuc3RhcnRzV2l0aCgnOicpIHx8IGF0dHIubmFtZS5zdGFydHNXaXRoKCdkYXRhLWk1XycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKHRoaXMudmlld01vZGVsLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byB1bmJpbmQgYSB2aWV3IGZyb20gYW4gb2JzZXJ2YWJsZS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAoQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gc29tZXRoaW5nIGVsc2UgYWZ0ZXIgdGhlIGxvb3AgaXMgYWRkZWQgdG8gdGhlIERPTS5cbiAgICAgKi9cbiAgICBsb29wUG9zdFByb2Nlc3Mocm93LCBhZGRlZENvbnRlbnQsIGFsbFJvd3MsIHByZXZpb3VzQ29udGVudCkge1xuICAgICAgICAvLyBJZiB0aGUgdHlwZXNjcmlwdCBwYXJ0IG9mIHRoZSBmb2xsb3dpbmcgd2VyZSBpbXBvcnRhbnQsIHRoaXMgd291bGQgYmUgYSBwcm9ibGVtXG4gICAgICAgIC8vIGlmIHRoaXMgd2VyZSBhIGRlcml2ZWQgY2xhc3MuXG4gICAgICAgIGNvbnN0IHRoaXNjbGFzcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MuaW5qZWN0QmluZChyb3csIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoYWRkZWRDb250ZW50LCAnW2k1X2l0ZW1dLCBbXFxcXDAwMDAzQWl0ZW1dLCBbZGF0YS1pNV9pdGVtXScpLCB7XG4gICAgICAgICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIGxvb3BQYXJlbnQ6IHRoaXMsXG4gICAgICAgICAgICBhc3luYzogdGhpcy5fYXN5bmNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRTdHJpbmdWYWx1ZShuYW1lLCBza2lwRXNjYXBlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUobmFtZSk7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZS50b1N0cmluZygpIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFVudHlwZWRWYWx1ZShuYW1lKSB7XG4gICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgIC8vIEknbSBwcmV0dHkgc3VyZSB0aGlzIGlzIGJlaW5nIHZhbGlkYXRlZCBkdXJpbmcgY29uc3RydWN0aW9uIGJ1dCBiZSBzYWZlXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aGlzQXJnID0gdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIC8vIElmIFZNIGlzIGEgc3RhdGUsIGdldCB0aGUgY3VycmVudCBzdGF0ZSB2YWx1ZS5cbiAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXNBcmcpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKFwidGhpcy5cIikpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzO1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoNSk7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHRoaXMuJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3LmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzQXJnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlld01vZGVsLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ09OU0lERVI6IENvbnNpZGVyIGFkZGluZyBjdXN0b20gYXR0cmlidXRlcyB0byBhbGxvdyBleGVjdXRpbmcgbWV0aG9kIHdpdGggc3RyaW5nIHBhcmFtZXRlcnMuIGk1X3BhcmFtMDE9XCJ2YWwgMVwiLCBpNV9wYXJhbTAyPVwidmFsIDJcIlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5jYWxsKHRoaXNBcmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJlcGwgb2YgdGhpcy5fcmVwbGFjZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHJlcGwuc291cmNlLCByZXBsLm5vZXNjYXBlKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXBsLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRlbnQuYXR0cmlidXRlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLnZhbHVlIHx8IGYubmFtZSA9PT0gJ2k1X2lucHV0JyB8fCBmLm5hbWUgPT09ICc6aW5wdXQnKVxuICAgICAgICAgICAgLm1hcChtID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBtLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbS52YWx1ZSB8fCAnJ1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFRlY2huaWNhbGx5IGl0J3MgaW52YWxpZCB0byBhZGQgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gcmVndWxhciBlbGVtZW50cywgc28gdGVjaG5pY2FsbHkgPHJlcGxhY2UtbWUgOnN3aXRjaDpyZWR0ZXh0PVwid2FybmluZ1wiPlxuICAgICAgICAvLyBpcyBsZWdhbCBidXQgaWYgaWYgaXQgd2VyZSBhIGRpdiwgdGhhdCB3b3VsZCBiZSBpbGxlZ2FsLiBTbyB3ZSdsbCBhbGxvdyA8ZGl2IGRhdGEtaTVfc3dpdGNoX3JlZHRleHQ9XCJ3YXJuaW5nXCI+LlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIHdlaXJkIG5hbWUgaGFuZGxpbmcgb2YgZGF0YSBhdHRyaWJ1dGVzIGNvdWxkIGJyZWFrIHlvdXIgY29kZSBpZiB5b3UgdHJ5IHRvIHVzZSB0aGlzLiBZb3UgbWF5IG5lZWQgdG8gZG8gZXh0cmFcbiAgICAgICAgLy8gd29yayB0byBtYWtlIHlvdXIgY29kZSB3b3JrLCBhbGwgaW4gdGhlIG5hbWUgb2Ygc3RyaWN0IGFkaGVyZW5jZSB0byBzdGFuZGFyZHMuIEl0J3MgdXAgdG8geW91LlxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5jb250ZW50LmRhdGFzZXQpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGVudC5kYXRhc2V0W2F0dHJdO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IGF0dHIgPT09ICdpNV9pbnB1dCcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QXR0cmlidXRlcy5wdXNoKHsgbmFtZTogYXR0ciwgdmFsdWU6IHZhbHVlIHx8ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0SHRtbFNldCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgY3VycmVudEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9wYXJzZUF0dHJpYnV0ZU5hbWUocHJvcC5uYW1lKTtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gUmVndWxhciBhdHRyaWJ1dGVzIHdpbGwgYWxsIG1hdGNoIHRoaXMuXG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHRoaXMuX25hbWUgfHwgcHJvcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQm9vbGVhbkF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYXR0clwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENzc0NsYXNzU3dpdGNoKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXY+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12IG5vZXNjYXBlPiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0dHJpYnV0ZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eShwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzU3R5bGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzQ2xhc3MocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBmYWxsIHRocm91Z2gsIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYXR0cmlidXRlIGFzIGEgdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlVGFyZ2V0KHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIGJhc2UgY29udGVudCBmb3IgdGhlIGxvb3AsIHB1bGxpbmcgaXQgb3V0IG9mIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9vcChwcm9wLnZhbHVlLCBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQodGhpcy5jb250ZW50KSwgdHlwZS5kZXRhaWwgPT09ICdudWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2VkIGFzIGEgc2VsZWN0b3IuIEhhcyBubyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZCBJY2hpZ28gYXR0cmlidXRlOiBcIiArIHR5cGUudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZlcklmTmVlZGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgcHJvcC52YWx1ZS5zdGFydHNXaXRoKCd0aGlzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJzZUF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICAgIC8vIEdlbmVyYWwgaWNoaWdvIHNob3J0Y3V0XG4gICAgICAgICAgICBuYW1lID0gJ2k1XycgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9pdGVtJykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIGluZGljYXRlIGFuIGl0ZW0gY29tcG9uZW50LCBub3RoaW5nIGVsc2UuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X2V2ZW50Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIG9ubHkgaW4gQ29tcG9uZW50LmFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5hbWUuc3RhcnRzV2l0aCgnaTVfJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9hdHRyJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnYXR0cicsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYm9vbCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nICYmIG5hbWVbN10gIT09ICctJyAmJiBuYW1lWzddICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs3XSA9PT0gJy0nIHx8IG5hbWVbN10gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA3KSArIG5hbWUuc2xpY2UoOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2Jvb2xOZWdhdGl2ZScgOiAnYm9vbCcsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfc3dpdGNoJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbOV0gIT09ICc6JyAmJiBuYW1lWzldICE9PSAnXycgJiYgbmFtZVs5XSAhPT0gJy0nICYmIG5hbWVbOV0gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzd2l0Y2ggYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzldID09PSAnLScgfHwgbmFtZVs5XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDkpICsgbmFtZS5zbGljZSgxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCAxMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsYXNzIHN3aXRjaCBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnc3dpdGNoQ2xhc3NOZWdhdGl2ZScgOiAnc3dpdGNoQ2xhc3MnLCBkZXRhaWw6IG5hbWUuc2xpY2UoMTApIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pZicpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJy0nIHx8IG5hbWUuc2xpY2UoLTEpID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdpZk5lZ2F0aXZlJyA6ICdpZicgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2xvb3AnKSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdpNV9sb29wOm51bGwnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnLCBkZXRhaWw6ICdudWxsJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV90YXJnZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICd0YXJnZXQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaW5wdXQnKSkge1xuICAgICAgICAgICAgY29uc3QgdHdvV2F5ID0gbmFtZS5lbmRzV2l0aCgnX3ZhbHVlJykgfHwgbmFtZS5lbmRzV2l0aCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICdpbnB1dCcsIGRldGFpbDogdHdvV2F5ID8gJzJ3YXknIDogJycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdHlwZTogbmFtZS5zbGljZSgzKSB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQm91bmRDb21wb25lbnQgPSBCb3VuZENvbXBvbmVudDtcbi8vIFVzZSBhIGN1c3RvbSBlbGVtZW50IHRvIGNyZWF0ZSBhIHJlcGxhY2VtZW50IHRhZyB0aGF0IGlzIG5vdCBsaW1pdGVkLCBhcyBzcGFuIGlzLCB0byBjb250YWluaW5nIG5vIGJsb2NrIGVsZW1lbnRzLlxuLy8gTm8gbG9naWMsIG5vIHNwZWNpYWwgZGlzcGxheSBkZXRhaWxzLlxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuZXhwb3J0cy5UZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgPSBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudE1hcFwiKTtcbi8qKlxuICogQSBjbGFzcyB3aXRoIGEgY29udGVudCBwcm9wZXJ0eSB0aGF0IHBvaW50cyB0byBzb21ldGhpbmcgb24gdGhlIHBhZ2UsIGFsb25nIHdpdGggc29tZSBvZiBoZWxwZXIgbWV0aG9kcy5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgYXMgYSBiYXNlIGNsYXNzIGZvciBvdGhlciBjbGFzc2VzLCBzbyBpdCdzIG1hcmtlZCBhYnN0cmFjdC4gSXQganVzdCBkb2Vzbid0XG4gKiBtYWtlIHNlbnNlIHRvIG1lIHRvIGNyZWF0ZSBDb21wb25lbnQgd2l0aCBub3RoaW5nIGN1c3RvbWl6ZWQuIEp1c3QgY3JlYXRlIGFuIEhUTUxFbGVtZW50LiBUaGUgaGVscGVycyBhcmVuJ3QgcmVhbGx5XG4gKiB0aGF0IGltcHJlc3NpdmUsIHdoZW4geW91IGNvbnNpZGVyIHRoYXQgdGhlIHRyYWRlb2ZmIGlzIGhhdmluZyB0byByZWZlcmVuY2Ugb2JqLmNvbnRlbnQgdG8gbW9kaWZ5IHRoZSBET00uXG4gKi9cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGRvZXNuJ3QgdW5kZXJzdGFuZCB0aGF0IHRoaXMuY29udGVudCBpcyBzZXQgaW4gQUxMIG9mIHRoZSBwcml2YXRlIGN0b3IgZnVuY3Rpb25zLlxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICBpZiAoYXJncyAmJiB0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIF9jdG9yX3N0cmluZy5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5uZXJIdG1sKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihhcmdzLnByb3BlcnRpZXMgfHwge30sIHsgaW5uZXJIVE1MOiBhcmdzLmlubmVySHRtbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2xvb2t1cC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICBfY3Rvcl9lbXB0eS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5uZXJIdG1sKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihhcmdzLnByb3BlcnRpZXMgfHwge30sIHsgaW5uZXJIVE1MOiBhcmdzLmlubmVySHRtbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2V4aXN0aW5nRWxlbWVudC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3Mub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBfY3Rvcl9vdXRlckh0bWwuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9jdG9yX2lubmVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoZWNrSW5saW5lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgLy8gQW5ndWxhciBtYXRlcmlhbCBkb2VzIHNvbWV0aGluZyBsaWtlIHRoaXMuIEluIHRoaXMgY2FzZSwgdGhlcmUncyBubyBmdW5jdGlvbmFsaXR5IGJlaGluZCBpdCwgYnV0IGl0IGRvZXMgbWFrZSBpdFxuICAgICAgICAvLyB1c2VmdWwgZm9yIGEgZGV2ZWxvcGVyIHRvIHNlZSB0aGF0IGFuIGVsZW1lbnQgaXMgYSBjb21wb25lbnQgYW5kIHdoYXQgdHlwZSBpdCBpcy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNuYWtlX2Nhc2UgPSAnaXZfJyArIHRoaXMuY29uc3RydWN0b3IubmFtZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHRoaXMuY29uc3RydWN0b3IubmFtZS5zbGljZSgxKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFcrL2csICcgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkoW2Etel0pL2csIFwiJDEgJDIkM1wiKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgvXFxCKD89W0EtWl17Mix9KS8pXG4gICAgICAgICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgLmpvaW4oJ18nKVxuICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShzbmFrZV9jYXNlLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBoYXMgc29tZSB3ZWlyZCBuYW1lLCBubyBwcm9ibGVtLiBUaGlzIGlzIGp1c3QgYW4gaW5mbyBmaWVsZCBhbnl3YXkuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBDb21wb25lbnQoKTtcbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfZW1wdHkoKSB7XG4gICAgICAgICAgICAvLyBObyBhcmd1bWVudHNcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgZmluZSBhcyBsb25nIGFzIFRFbGVtZW50IGlzIERJVi4gTm8gd2F5IHRvIHZlcmlmeSB0aGF0IGFzIGl0J3MgYSB0eXBlc2NyaXB0IGlsbHVzaW9uLiBKUyBkb2Vzbid0IHNlZSB0eXBlIHBhcmFtZXRlcnMuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlkOiBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfbG9va3VwKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIGV4aXN0aW5nRWxlbWVudC5cbiAgICAgICAgICAgIC8vIFRoZSBtYWluIHJlYXNvbiBpdCBleGlzdHMgaXMgdGhhdCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBkb2Vzbid0IHJldHVybiB0aGUgY29ycmVjdCB0eXBlIChpdCdzIG5vdCBnZW5lcmljKSxcbiAgICAgICAgICAgIC8vIHNvIHR5cGVzY3JpcHQgZnJlYWtzIG91dCBhbmQgdGhpbmtzIGl0IHNob3VsZCBiZSBhIFNUUklORywgaW4gc3BpdGUgb2YgdGhlIHR5cGUgZGVmaW5pdGlvbiBub3QgYmVpbmcgYW55dGhpbmdcbiAgICAgICAgICAgIC8vIGxpa2UgdGhhdC4gSXQncyBqdXN0IGVhc2llciB0byB1c2UgdGhpcyB0aGFuIHRvIHJlbWVtYmVyIFwib2gsIHJpZ2h0LCBpIGhhdmUgdG8gdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKSwgd2hpY2ggaXMgZ2VuZXJpY1wiLlxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IChleGlzdGluZ0VsZW1lbnQucGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKGV4aXN0aW5nRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgc2VsZWN0b3IgY291bGQgbm90IGZpbmQgZWxlbWVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbmFzdHkgYnV0IGl0IG1ha2VzIFR5cGVTY3JpcHQgaGFwcHkgd2l0aG91dCBjcmVhdGluZyBhIG5ldyBvYmplY3QgY29weVxuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9leGlzdGluZ0VsZW1lbnQoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBleGlzdGluZ0VsZW1lbnQuZWxlbWVudDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHIsIGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9pbm5lckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gTmV3IGVsZW1lbnQuIFVzZXIgc3BlY2lmaWVzIHRoZSBpbm5lciBIVE1MIGZvciB0aGUgY29udGVudC5cbiAgICAgICAgICAgIC8vIFRoaXMgY291bGQgYmUgYW4gZW1wdHkgb2JqZWN0IGxpa2Uge30sIHByYWN0aWNhbGx5IHRoZSBzYW1lIGFzIGNhbGxpbmcgaXQgd2l0aCBubyBhcmdzXG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHsgaW5uZXJIVE1MOiBuZXdFbGVtZW50LmlubmVySHRtbCB8fCAnJyB9O1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcywgbmV3RWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnQudHlwZSB8fCBFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBwcm9wcywgbmV3RWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbnRlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3Jfb3V0ZXJIdG1sKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZXIgc3BlY2lmaWVzIHRoZSBmdWxsIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGl0IGNhbid0IGJlIHR5cGUgY2hlY2tlZC4gSlMgY2FuJ3Qgc2VlIHdoYXQgVEVsZW1lbnQgaXMuXG4gICAgICAgICAgICBjb25zdCB0bXBkaXYgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG5ld0VsZW1lbnQub3V0ZXJIdG1sLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAodG1wZGl2LmNoaWxkTm9kZXMubGVuZ3RoICE9PSAxIHx8ICF0bXBkaXYuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGVySHRtbCBtdXN0IGNvbnRhaW4gZXhhY3RseSBvbmUgSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhuZXdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3RWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50LCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3BlY2lmaWVkIElEIHRha2VzIHByZWNlZGVuY2VcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9zdHJpbmcobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU3RyaW5nIGJ5IGl0c2VsZiBpcyBhIHNob3J0Y3V0IGZvciBvdXRlckh0bWxcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIHsgb3V0ZXJIdG1sOiBuZXdFbGVtZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqXG4gICAgICogSXQgZG9lc24ndCBoYXZlIHRvIGJlIGEgY3VzdG9tIHRhZy4gSXQgY291bGQgYmUgYSBjbGFzcywgbGlrZSA8cCBjbGFzcz0nYmluZC10by1tb2RlbFwiPiAoc2VsZWN0b3I9Jy5iaW5kLXRvLW1vZGVsJylcbiAgICAgKiBvciA8cCBpY2hpZ28+IChzZWxlY3Rvcj0nW2ljaGlnb10nKS5cbiAgICAgKlxuICAgICAqIFRvIGNvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgZWxlbWVudCAoY29weWluZyBleGlzdGluZyBhdHRyaWJ1dGVzKSBzZW5kIHRoZSByZWxldmFudCBvcHRpb25zLCBwbHVzIHtyZXBsYWNlOiB0cnVlfS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZWxlbWVudCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGVsZW1lbnQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdChzZWxlY3Rvciwgb3B0LCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyBfaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBjb25zdCBjb250YWluZXJzID0gdGhpcy5fbG9va1VwQ29udGFpbmVyc1RvSW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLnBhcmVudCk7XG4gICAgICAgIGZvciAoY29uc3QgY29udGFpbmVyIG9mIGNvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJlcGxhY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBDYW4ndCBoYXZlIGR1cGUgSURzIGJlaW5nIGNyZWF0ZWQgaWYgdGhlcmUgYXJlIG11bHRpcGxlIGNvbnRhaW5lcnMuIFRoZXJlIGFyZSAzIHBsYWNlcyB3aGVyZSBJRCBjYW4gYmUgc2V0LlxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgncHJvcGVydGllcycgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMucHJvcGVydGllcy5pZDsgLy8gRE9NIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCdhdHRyaWJ1dGVzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5hdHRyaWJ1dGVzLmlkOyAvLyBIVE1MIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXBsYWNlckZ1bmN0aW9uKGNvbnRhaW5lcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNvbnZlcnRlckZ1bmN0aW9uKGNvbnRhaW5lcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBzdGF0aWMgX21lcmdlUHJvcGVydGllc0FuZEF0dHJpYnV0ZXMoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIFRoaXMgYXR0ZW1wdHMgdG8gcHJlc2VydmUgdGhlIGF0dHJpYnV0ZXMgc2V0IG9uIHRoZSByZXBsYWNlZCBlbGVtZW50LiBUaGF0IG9wZW5zIGFuIHVnbHkgY2FuIG9mIHdvcm1zLFxuICAgICAgICAvLyBidXQgaXQgc2hvdWxkIG1ha2UgcmVwbGFjZW1lbnQgY29tcG9uZW50cyBtb3JlIHVzZWZ1bCBiZWNhdXNlIGl0IGFsbG93cyB0aGVtIHRvIHZhcnkuXG4gICAgICAgIC8vIEl0IGRvZXMgbWFrZSBhIGJydXRhbCBqdWdnbGluZyBhY3Q6XG4gICAgICAgIC8vIElmIHRoZSBleGlzdGluZyBlbGVtZW50IGhhcyBpbm5lckhUTUwsIHdlIHdhbnQgdG8gdGFrZSBpdC5cbiAgICAgICAgLy8gSWYgb3V0ZXJIVE1MIGlzIHByb3ZpZGVkLCB0aGUgb3V0ZXJIVE1MJ3MgaW5uZXJIVE1MIHNob3VsZCBvdmVycmlkZSB0aGUgZXhpc3RpbmcgZWxlbWVudCdzLlxuICAgICAgICAvLyBJZiB0aGUgZXhpc3RpbmcgZWxlbWVudCBoYXMgYXR0cmlidXRlcywgd2Ugd2FudCB0byB0YWtlIHRoZW0uXG4gICAgICAgIC8vIElmIG91dGVySFRNTCBpcyBwcm92aWRlZCwgdGhlIG91dGVySFRNTCdzIGF0dHJpYnV0ZXMgc2hvdWxkIG92ZXJyaWRlIHRoZW0uXG4gICAgICAgIC8vIEZvciBhbnkgYXR0cmlidXRlcyBwYXNzZWQgaW4gT1BUSU9OUywgdGhleSBzaG91bGQgb3ZlcnJpZGUgYW55dGhpbmcgdGhhdCBjYW1lIGJlZm9yZS5cbiAgICAgICAgLy8gRm9yIGFueSBwcm9wZXJ0aWVzIHBhc3NlZCBpbiBPUFRJT05TLCB0aGV5IHNob3VsZCBvdmVycmlkZSBhbnl0aGluZyB0aGF0IGNhbWUgYmVmb3JlLlxuICAgICAgICAvLyBPbmx5IHRoZSBsYXN0IDIgYXJlIGhhbmRsZWQgaW4gdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci4gQW5kIGlmIHdlJ3JlIG5vdCBjYXJlZnVsLCB3ZSBjb3VsZCBicmVhayB0aGVtLlxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0geyBpbm5lckhUTUw6IGV4aXN0aW5nRWxlbWVudC5pbm5lckhUTUwgfTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbShleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIFRoaXMgaXMgdWdseSBiZWNhdXNlIGl0IGhhcHBlbnMgYWdhaW4gaW4gdGhlIGNvbnN0cnVjdG9yLiBObyBvdGhlciBjbGVhbiB3YXkgdG8gcGFyc2UgdGhlIGVsZW1lbnQgYXR0cmlidXRlcywgdGhvdWdoLlxuICAgICAgICBpZiAob3B0Lm91dGVySHRtbCkge1xuICAgICAgICAgICAgY29uc3QgdG1wID0gQ3JlYXRlRWxlbWVudF8xLmRpdihvcHQub3V0ZXJIdG1sLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAodG1wLmNoaWxkTm9kZXMubGVuZ3RoICE9PSAxIHx8ICF0bXAuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGVySHRtbCBtdXN0IGNvbnRhaW4gZXhhY3RseSBvbmUgSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRtcDIgPSB0bXAuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAvLyBUaGUgb3V0ZXIgSFRNTCBhdHRyaWJ1dGVzIGdldCBwaWNrZWQgdXAgYXV0b21hdGljYWxseSB3aGVuIGFkZGVkIHRvIHRoZSBET00sIHNvIHdlIHJlYWxseVxuICAgICAgICAgICAgLy8ganVzdCBuZWVkIHRvIGRpc2NhcmQgdGhlIG1hdGNoaW5nIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXMgb2YgdGhlIGV4aXN0aW5nIGVsZW1lbnQuXG4gICAgICAgICAgICBkZWxldGUgcHJvcGVydGllcy5pbm5lckhUTUw7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbSh0bXAyLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIubmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2F0dHIubmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9wdC5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCBvcHQucHJvcGVydGllcyk7XG4gICAgICAgIG9wdC5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzLCBvcHQuYXR0cmlidXRlcyk7XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfVxuICAgIHN0YXRpYyBfZ2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBvcHQ7XG4gICAgICAgIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIHJlcGxhY2luZyB0aGUgb3V0ZXIgSFRNTFxuICAgICAgICAgICAgb3B0ID0geyByZXBsYWNlOiB0cnVlLCBvdXRlckh0bWw6IG9wdGlvbnMgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBUeXBlc2NyaXB0IGRvZXNuJ3Qga25vdyB0aGF0IG9wdGlvbnMgIT09ICdzdHJpbmcnIChjYW4ndCByZWFkIFwiZWxzZSBpZlwiIGNsYXVzZSlcbiAgICAgICAgICAgIG9wdCA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHQgPSB7IHJlcGxhY2U6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb21wb25lbnQuY29udGVudCwgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlcGxhY2VDaGlsZChjb21wb25lbnQuY29udGVudCwgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50V2l0aENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX21lcmdlUHJvcGVydGllc0FuZEF0dHJpYnV0ZXMoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gbmV3IGNvbnN0cnVjdG9yKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0NvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoeyBlbGVtZW50OiBleGlzdGluZ0VsZW1lbnQgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBfbG9va1VwQ29udGFpbmVyc1RvSW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgcGFyZW50KSB7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSSd2ZSBkb25lIHRoaXMgbXlzZWxmLCB3aGljaCByZXN1bHRzIGluIGEgc2lsZW50IGZhaWx1cmUgaWYgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luamVjdGlvbiBzZWxlY3RvciBpcyBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJ1tpY2hpZ29dJztcbiAgICAgICAgLy8gTG9vayB1cCB0aGUgZWxlbWVudHMgdG8gZWl0aGVyIHJlcGxhY2Ugb3IgY29udmVydFxuICAgICAgICBsZXQgY29udGFpbmVycztcbiAgICAgICAgaWYgKHBhcmVudCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBbc2VsZWN0b3JdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJzO1xuICAgIH1cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaWQ7XG4gICAgfVxuICAgIHNldCBpZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGlubmVySFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuICAgIHNldCBpbm5lckhUTUwodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIFdpbGwgcmV0dXJuIHVuZGVmaW5lZCBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICByZXR1cm4gRm9ybUZpZWxkVmFsdWVfMS5nZXRGb3JtRmllbGRWYWx1ZSh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLy8gV2lsbCBsb2cgYSB3YXJuaW5nIGlmIGNvbnRlbnQgaXMgbm90IGEgZm9ybSBmaWVsZCB0eXBlXG4gICAgICAgIEZvcm1GaWVsZFZhbHVlXzEuc2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldCBjbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lO1xuICAgIH1cbiAgICBzZXQgY2xhc3NOYW1lKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc0xpc3Q7XG4gICAgfVxuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5zdHlsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIEhUTUwgZXZlbnQgbGlzdGVuZXIgb24gdGhlIENvbXBvbmVudCBjb250ZW50LiBGbHVlbnQuXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIHRoZSBIVE1MIGZvciBpNV9ldmVudCBvciA6ZXZlbnQgYXR0cmlidXRlcyBhbmQgYWRkIGV2ZW50IGxpc3RlbmVycyBhY2NvcmRpbmcgdG8gaW5saW5lIGN1c3RvbSBhdHRyaWJ1dGVzLlxuICAgICAqIEZpbHRlciBieSBtYXRjaGluZyB0aGUgY29tcG9uZW50RmlsdGVyIGlucHV0IHdpdGggYW4gYXR0cmlidXRlIGxpa2UgY29tcG9uZW50PVwiY29tcG9uZW50RmlsdGVyXCIuXG4gICAgICogRW5jbG9zZSB0aGUgZXZlbnQgdHlwZSBpbiBwYXJlbnRoZXNlcywgYW5kIGZvciB0aGUgdmFsdWUsIGVudGVyIHRoZSBuYW1lIG9mIGEgbWV0aG9kIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAqIEV4YW1wbGU6IDxmb3JtIDpldmVudCAoY2xpY2spPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKiBUaGlzIGlzIGFsc28gYWxsb3dlZDogPGZvcm0gOmV2ZW50IF9jbGlja189XCJzdWJtaXRUaGVGb3JtXCI+PC9mb3JtPlxuICAgICAqL1xuICAgIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHdlIGNvdWxkIHNraXAgdGhpcyBpbml0aWFsIGZpbHRlciwgbGlrZSBhbmd1bGFyIGRvZXMuIEJ1dCB0aGVyZSBpcyBubyBDU1Mgc2VsZWN0b3IgZm9yXG4gICAgICAgIC8vIGF0dHJpYnV0ZSBuYW1lIGJlZ2lucyB3aXRoIG9yIGVuZHMgd2l0aC4gW2F0dHJePV0gaXMgZm9yIHRoZSBWQUxVRSBiZWdpbm5pbmcgd2l0aCBzb21ldGhpbmcuXG4gICAgICAgIC8vIFRoaXMgaW5jbHVkZXMgdGhlIGNvbnRlbnQgaXRzZWxmIGluIGl0cyBjaGVjay5cbiAgICAgICAgZm9yIChjb25zdCBlbGUgb2YgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChbdGhpcy5jb250ZW50XSwgJ1tpNV9ldmVudF0sIFtcXFxcMDAwMDNBZXZlbnRdLCBbZGF0YS1pNV9ldmVudF0nKSkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudEZpbHRlciAmJiBlbGUuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gY29tcG9uZW50RmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWxlLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgbGV0IGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnKCcpICYmIGYubmFtZS5lbmRzV2l0aCgnKScpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgYnkgYWx0ZXJuYXRlIHN5bnRheC4gVGhpcyBvbmUgd29ya3MgYmV0dGVyIHdpdGggc2V0QXR0cmlidXRlKCkuXG4gICAgICAgICAgICAgICAgZXZlbnREZWZpbml0aW9uID0gY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZS5zdGFydHNXaXRoKCdfJykgJiYgZi5uYW1lLmVuZHNXaXRoKCdfJykgJiYgZi5uYW1lLmxlbmd0aCA+IDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldmVudERlZmluaXRpb24gfHwgIWV2ZW50RGVmaW5pdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgZGVmaW5pdGlvbiBub3QgZGVjbGFyZWQgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzW2V2ZW50RGVmaW5pdGlvbi52YWx1ZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlciBtZXRob2QgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9ICR7ZXZlbnREZWZpbml0aW9uLnZhbHVlfSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnREZWZpbml0aW9uLm5hbWUuc2xpY2UoMSwgLTEpLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZChuZXdDaGlsZCkge1xuICAgICAgICBpZiAoZ3VhcmQobmV3Q2hpbGQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kQ2hpbGQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZC5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICAgICAgaWYgKGd1YXJkKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgY29tcG9uZW50IHRvIENvbXBvbmVudE1hcC5cbiAgICAgKi9cbiAgICBtYXBDb21wb25lbnQoKSB7XG4gICAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBjb250ZW50IGhhcyBhbHJlYWR5IGJlZW4gcmVsYXRlZCB0byBhIGRpZmZlcmVudCBjb21wb25lbnRcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudCh0aGlzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnQgYWxyZWFkeSByZWZlcmVuY2VkIGJ5IGEgY29tcG9uZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KHRoaXMuY29udGVudCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGNvbXBvbmVudCBmcm9tIENvbXBvbmVudE1hcC4gU29tZXRpbWVzIHlvdSBtaWdodCBuZWVkIHRvIHVzZSB0aGlzLiBCdXQgaG9wZWZ1bGx5IHJhcmVseSwgYmVjYXVzZSBpdCdzIHVzaW5nIGEgV2Vha01hcCxcbiAgICAgKi9cbiAgICB1bm1hcENvbXBvbmVudCgpIHtcbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGNvbXBvbmVudHMgdGhhdCBhcmUgbmVzdGVkIGluc2lkZSB0aGlzIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICAqZ2V0QWxsQ2hpbGRDb21wb25lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50KGUpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRTdHlsZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIC8vIFRTIGp1c3QgZm9yZ290IHRoYXQgcHJvcGVydHkgaXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPi5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBwcm9wZXJ0eVtwcm9wXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgICAgICBpZiAoIWNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIiAmJiBjbGFzc05hbWVzLmluY2x1ZGVzKFwiIFwiKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMuc3BsaXQoXCIgXCIpLmZpbHRlcihxID0+IHEgIT09IFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmVjYXVzZSBhZGRJbmxpbmVFdmVudExpc3RlbmVycygpIHNlYXJjaGVzIGFsbCB0aGUgd2F5IGRvd24sIGludG8gbmVzdGVkIGNvbXBvbmVudHMsIGl0IGNhbid0IGJlIGNhbGxlZFxuICAgICAqIGJ5IGRlZmF1bHQuIEl0IGp1c3QgdGhyb3dzIGVycm9ycyBvbiBhbGwgYnV0IHNpbXBsZSB0ZXN0IGNhc2VzLiBCdXQgYmVjYXVzZSB0aGVzZSBldmVudHMgYWxtb3N0IGFsd2F5cyBleGlzdFxuICAgICAqIGludGVybmFsIHRvIHRoZSBjb21wb25lbnQgKGUuZy4gb24gYnV0dG9ucyksIGl0IGNhbid0IGJlIGxpbWl0ZWQuIFRoaXMgY2FuIGJlIGNvbmZ1c2luZyB3aXRob3V0IHNvbWUga2luZCBvZlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgX2NoZWNrSW5saW5lRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmICghd2luZG93Ll9fZXZlbnRfd2FybmluZ19fKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ0lubGluZSBldmVudCBsaXN0ZW5lcnMgYXJlIGNvbmZpZ3VyZWQuIFJlbWVtYmVyIHRvIGNhbGwgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKS4nKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuX19ldmVudF93YXJuaW5nX18gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWxldGUgd2luZG93Ll9fZXZlbnRfd2FybmluZ19fLCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoZSBxdWVzdGlvbiBuZWVkcyB0byBiZSBhc2tlZDogaWYgeW91IGNhbiBhZGQgYSBjb21wb25lbnQgdG8gYSBwYWdlIGJ5IGRvaW5nIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQpLFxuICogaG93IGRvIHlvdSBkbyBmcm9tIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKSBhbmQgZ2V0IHRvIGNvbXBvbmVudCwgbm90IGNvbXBvbmVudC5jb250ZW50PyBUaGlzIGlzIGhvdy5cbiAqXG4gKiB2YXIgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKSk7XG4gKlxuICogVGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyBDb21wb25lbnRNYXAuY29tcG9uZW50cy5zZXQoY29udGVudCwgY29tcG9uZW50KSBoYXMgYmVlbiBjYWxsZWQgYXQgc29tZSBwb2ludC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBhcHByb3ZlZCB3YXkgb2YgZG9pbmcgaXQuIEFub3RoZXIgcG9zc2libGUgc29sdXRpb24gd291bGQgYmUgdGhlIHVzZSBvZiBleHBhbmRvIHByb3BlcnRpZXMsXG4gKiBmb3IgZXhhbXBsZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykucmVsYXRlZENvbXBvbmVudCA9IGNvbXBvbmVudC4gVGhpcyB3b3JrcyBhbmQgaXQncyBzdXBlciBzaW1wbGUsXG4gKiBidXQgc2VlbXMgdG8gYmUgZnJvd25lZCB1cG9uIC4uLiBpdCBoYXMgYmVlbiBrbm93biB0byBjcmVhdGUgbWVtb3J5IGxlYWtzIGluIHRoZSBwYXN0LiBXZWFrTWFwIGlzIHRoZSBvYmplY3RcbiAqIHNwZWNpZmljYWxseSBjcmVhdGVkIGZvciB0aGlzIHVzZSBjYXNlLCBzbyB0aGF0IGlzIHVzZWQgaGVyZS5cbiAqXG4gKiBJZiBleHRlbnNpb24gbWV0aG9kcyBhcmUgbG9hZGVkLCB5b3UgY2FuIHVzZSB0aGUgZWxlbWVudC5nZXRDb21wb25lbnQoKSBzaG9ydGN1dC5cbiAqL1xuY2xhc3MgQ29tcG9uZW50TWFwIHtcbn1cbkNvbXBvbmVudE1hcC5jb21wb25lbnRzID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydHMuQ29tcG9uZW50TWFwID0gQ29tcG9uZW50TWFwO1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZWxlbWVudCk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDb21wb25lbnQgPSBnZXRDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlXG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29tcG9uZW50QmluZGluZ09wdGlvbnMgPSBDb21wb25lbnRCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gb3B0LmVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5FeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyA9IEV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBvcHQuc2VsZWN0b3I7XG4gICAgfVxufVxuZXhwb3J0cy5FeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zID0gRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgSW5uZXJIdG1sQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICB9XG59XG5leHBvcnRzLklubmVySHRtbEJpbmRpbmdPcHRpb25zID0gSW5uZXJIdG1sQmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIE91dGVySHRtbEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMub3V0ZXJIdG1sID0gb3B0Lm91dGVySHRtbDtcbiAgICB9XG59XG5leHBvcnRzLk91dGVySHRtbEJpbmRpbmdPcHRpb25zID0gT3V0ZXJIdG1sQmluZGluZ09wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZUNoZWNrKG9iaikge1xuICAgIC8vIE5vdCBhbiBleGhhdXN0aXZlIHRlc3QgYnV0IGl0J3MgdGhlIGltcG9ydGFudCBiaXQuXG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAnY2hhbmdlSGFuZGxlcicgaW4gb2JqICYmIG9iai5jaGFuZ2VIYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlQ2hlY2sgPSBvYnNlcnZhYmxlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9FdmVudEhhbmRsZXIvQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgT2JqZWN0RnVsbEFzc2lnbl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVCYXNlXCIpO1xuY2xhc3MgVHJhaXRTb3VyY2UgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgc3VwZXIoeyBuYW1lOiAnQXJyYXlQcm94eScsIGRpc2FibGVBc3luYyB9KTtcbiAgICB9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbmNsYXNzIEFycmF5T2JzZXJ2YWJsZSBleHRlbmRzIEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TWVyZ2VkT2JzZXJ2YWJsZShhcmdzLCBkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB3aGVyZSBJIHJlYWxseSBuZWVkIG11bHRpcGxlIGluaGVyaXRhbmNlLiBUaGlzIG5lZWRzIHRvIGluaGVyaXQgZnJvbSBBcnJheVxuICAgICAgICAvLyBiZWNhdXNlIGl0J3MgZXh0ZW5kaW5nIGEgYnVpbHQtaW4gY2xhc3MuIEl0IGFsc28gbmVlZHMgdG8gaW5oZXJpdCBmcm9tIE9ic2VydmFibGVCYXNlLlxuICAgICAgICAvLyBUaHJlZSBjaG9pY2VzOlxuICAgICAgICAvLyAxKSA1MCBsaW5lcyBvZiBjbGlwYm9hcmQgaW5oZXJpdGFuY2UuXG4gICAgICAgIC8vIDIpIENoZWF0IGhlYXZpbHkgYnkgdGFraW5nIGEgdHJhaXQgYXBwcm9hY2guIFRoaXMgbWVhbnMgaGFja2VyeSB0byBtYWtlIFRTIGhhcHB5LlxuICAgICAgICAvLyAzKSBEbyB0aGUgc2FtZSBhcyAyIHdpdGggdGhlIGJ1aWx0LWluIEFycmF5IGNsYXNzLiBOb3QgYSBwcm9ibGVtIGJ1dCB3aXRoICMyIHRoZSBjbGFzcyBuYW1lIGFjdHNcbiAgICAgICAgLy8gYXMgYSBoaW50IHRoYXQgaXQncyBub3QgYSBkZWZhdWx0IGFycmF5LCB3aGljaCBpcyBiZXR0ZXIuXG4gICAgICAgIC8vICMyIHdpbnMuXG4gICAgICAgIGNvbnN0IGFyciA9IG5ldyBBcnJheU9ic2VydmFibGUoLi4uYXJncyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdEZ1bGxBc3NpZ25fMS5vYmplY3RGdWxsQXNzaWduKGFyciwgbmV3IFRyYWl0U291cmNlKGRpc2FibGVBc3luYykpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCAnY2hhbmdlSGFuZGxlcicsIHsgZW51bWVyYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vIE9iamVjdHMgY3JlYXRlZCB0aHJvdWdoIG1hcCwgZmlsdGVyLCBldGMsIHNob3VsZCBiZSBnZW5lcmljIGFycmF5cy5cbiAgICBzdGF0aWMgZ2V0IFtTeW1ib2wuc3BlY2llc10oKSB7XG4gICAgICAgIHJldHVybiBBcnJheTtcbiAgICB9XG4gICAgLy8gTmVlZHMgdG8gYmUgcHVibGljIHNvIHRoZSBwcm94eSBjYW4gY2FsbCBpdCwgYnV0IHNob3VsZCBub3QgYmUgY2FsbGVkIG91dHNpZGUgdGhlIEFQSS4gSW1hZ2luZSBpdCdzIGludGVybmFsLlxuICAgIHB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIGFyZ3MsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIC8vIFRoaXMgcmVxdWlyZXMgYSBjaGVhdC4gSXQgd2lsbCBmYWlsIGlmIHRoZSBvYmplY3QgaXMgY3JlYXRlZCB3aXRoIG5ldygpO1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMS5BcnJheUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIGFyZ3MsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXJyYXlPYnNlcnZhYmxlID0gQXJyYXlPYnNlcnZhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG5jbGFzcyBBcnJheVByb3h5SGFuZGxlciB7XG4gICAgZ2V0KHRhcmdldCwga2V5LCBwcm94eSkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kQ2FsbGVkID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIC8vIFNpbGVudCBwYXNzLXRocm91Z2ggb2Ygb3RoZXIgbWV0aG9kc1xuICAgICAgICAgICAgaWYgKEFycmF5UHJveHlIYW5kbGVyLm1ldGhvZHNUb1dhdGNoLmluZGV4T2Yoa2V5LnRvU3RyaW5nKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RDYWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBOZWVkIHRvIGV2YWx1YXRlIHBlcmZvcm1hbmNlIG9mIGNvcGllc1xuICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gbWV0aG9kQ2FsbGVkLmFwcGx5KHRhcmdldCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ2NhbGwnLCBrZXksIGFyZ3MsIGJlZm9yZSwgYWZ0ZXIsIHByb3h5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSkge1xuICAgICAgICAvLyBQcm9ibGVtOiBXZSB3YW50IHRvIGNhcHR1cmUgb25seSBsZW5ndGggYW5kIFtpbmRleGVyXSBjYWxscywgYnV0IEpTIGhhcyBubyBjb25zaXN0ZW50XG4gICAgICAgIC8vIHdheSBvZiBkZWZpbmluZyBbaW5kZXhlcl0uIFdoYXQgbWFrZXMgaXQgd29yc2UgaXMgdGhhdCBpZiBhIHN0cmluZyBpcyBhbiBpbnRlZ2VyLCBpdCBpc1xuICAgICAgICAvLyBjb252ZXJ0ZWQgdG8gYSBudW1iZXIuIEFuZCBKUyBkb2VzIG5vdCBpbmNsdWRlIGEgYnVpbHQtaW4gd2F5IHRvIHRlc3QgaWYgYSBudW1iZXIgaXMgYW4gaW50ZWdlci5cbiAgICAgICAgLy8gU29sdXRpb246IEEgcmVnZXgtYmFzZWQgY2hlY2suIEljay4gV2F5IHRvIHJlbWluZCBtZSBJJ20gdXNpbmcgSlMuXG4gICAgICAgIGlmIChrZXkgJiYgKGtleS50b1N0cmluZygpID09PSAnbGVuZ3RoJyB8fCB0eXBlb2Yga2V5ID09PSAnbnVtYmVyJyB8fCBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhrZXkpKSkge1xuICAgICAgICAgICAgLy8gVE9ETzogTmVlZCB0byBldmFsdWF0ZSBwZXJmb3JtYW5jZSBvZiBjb3BpZXNcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ3NldCcsIGtleSwgW3ZhbHVlXSwgYmVmb3JlLCBhZnRlciwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZSA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgIC8vIENhbm5vdCByZXBvcnQgcHJveHkgYXMgc2VuZGVyIGJlY2F1c2UgcHJveHkgbm90IHNlbnQgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgdGFyZ2V0LnB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCgnZGVsZXRlJywga2V5LCBbXSwgYmVmb3JlLCBhZnRlciwgbnVsbCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbi8vIFRoZXNlIGFyZSBhbGwgdGhlIG1ldGhvZHMsIG5vdCBjb3VudGluZyBjdXN0b20gc2V0dGVycywgdGhhdCBtdXRhdGUgYW4gYXJyYXkuXG5BcnJheVByb3h5SGFuZGxlci5tZXRob2RzVG9XYXRjaCA9IFsnY29weVdpdGhpbicsICdmaWxsJywgJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddO1xuZXhwb3J0cy5BcnJheVByb3h5SGFuZGxlciA9IEFycmF5UHJveHlIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZUJhc2VcIik7XG5jb25zdCBPYmplY3RGdWxsQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKTtcbmNsYXNzIE9iamVjdE9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBvbmx5IHdheSB0byBwcm9kdWNlIGFuIG9iamVjdCBvYnNlcnZhYmxlLCBmb3IgcmVhc29ucyBvZiBzYWZldHkuXG4gICAgICovXG4gICAgc3RhdGljIGdldE1lcmdlZE9ic2VydmFibGUoZGF0YSwgZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgc29tZXRoaW5nIHdpdGggYWxsIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBpbnB1dCBvYmplY3QgbWVyZ2VkIHdpdGggdGhlIHByb3BlcnRpZXMgb2YgdGhpcy5cbiAgICAgICAgLy8gSSBkb24ndCB3YW50IHRvIGFjdHVhbGx5IG1vZGlmeSB0aGUgaW5wdXQgb2JqZWN0LiBFdmVuIHRob3VnaCBpdCBTSE9VTEQgYmUgdGhyb3dhd2F5LCBJIGRvbid0IGtub3cuXG4gICAgICAgIC8vIEFuZCBJIGRvbid0IHdhbnQgdG8gdGFrZSB0aGUgcmlzayB0aGF0IHNvbWV0aGluZyBpbiB0aGUgaW5wdXQsIGFuIHVua25vd24gZmFjdG9yLCB3aWxsIG1ha2UgdGhpcyBibG93IHVwLlxuICAgICAgICAvLyBJIGtub3cgdGhhdCB0aGlzIGNsYXNzIGhhcyBvbmx5IDIgbGV2ZWxzIG9mIGluaGVyaXRhbmNlIChjdXJyZW50bHkpIGFuZCBjb250YWlucyBub3RoaW5nIHZlcnkgY29tcGxleCBhdCBhbnkgbGV2ZWwuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdEZ1bGxBc3NpZ25fMS5vYmplY3RGdWxsQXNzaWduKGRhdGEsIG5ldyBPYmplY3RPYnNlcnZhYmxlKGRpc2FibGVBc3luYyksIHRydWUpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCAnY2hhbmdlSGFuZGxlcicsIHsgZW51bWVyYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGRpc2FibGVBc3luYykge1xuICAgICAgICBzdXBlcih7IG5hbWU6IFwiT2JqZWN0UHJveHlcIiwgZGlzYWJsZUFzeW5jIH0pO1xuICAgIH1cbiAgICAvLyBOZWVkcyB0byBiZSBwdWJsaWMgc28gdGhlIHByb3h5IGNhbiBjYWxsIGl0LCBidXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgb3V0c2lkZSB0aGUgQVBJLiBJbWFnaW5lIGl0J3MgaW50ZXJuYWwuXG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIC8vIFRoaXMgZmlsdGVycyBvdXQgdGhlIHRyb3VibGVzb21lIGNoYW5nZUhhbmRsZXIgZmllbGQuXG4gICAgICAgIHJldHVybiBzdXBlci50b0pTT04oKTtcbiAgICB9XG59XG5leHBvcnRzLk9iamVjdE9ic2VydmFibGUgPSBPYmplY3RPYnNlcnZhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBPYmplY3RQcm94eUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9tZXRob2RzVG9XYXRjaCwgX3dhdGNoU2V0LCBfd2F0Y2hEZWxldGUsIF90cmlnZ2VyT25seU9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX21ldGhvZHNUb1dhdGNoID0gX21ldGhvZHNUb1dhdGNoO1xuICAgICAgICB0aGlzLl93YXRjaFNldCA9IF93YXRjaFNldDtcbiAgICAgICAgdGhpcy5fd2F0Y2hEZWxldGUgPSBfd2F0Y2hEZWxldGU7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBfdHJpZ2dlck9ubHlPbkNoYW5nZTtcbiAgICB9XG4gICAgZ2V0KHRhcmdldCwga2V5LCBwcm94eSkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kQ2FsbGVkID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIC8vIFNpbGVudCBwYXNzLXRocm91Z2ggb2Ygbm9uLXdhdGNoZWQgbWV0aG9kc1xuICAgICAgICAgICAgaWYgKHRoaXMuX21ldGhvZHNUb1dhdGNoLmluZGV4T2Yoa2V5LnRvU3RyaW5nKCkpID09PSAtMSB8fCB0eXBlb2YgbWV0aG9kQ2FsbGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZENhbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJldHVybiBhIHdyYXBwZXIgYXJvdW5kIHRoZSBtZXRob2QgdGhhdCBwdWJsaXNoZXMgdGhlIGNoYW5nZVxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gbWV0aG9kQ2FsbGVkLmFwcGx5KHRhcmdldCwgYXJncyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCBrZXksIHVuZGVmaW5lZCwgYXJncywgcHJveHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KSB7XG4gICAgICAgIGlmICh0aGlzLl93YXRjaFNldCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcHJveHkpO1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICAvLyBJZiB0byBiZSB0cmlnZ2VyZWQgb25seSBvbiBjaGFuZ2UsIGNoZWNrIG9sZFZhbHVlIGFuZCBuZXdWYWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgJiYgb2xkVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnc2V0Jywga2V5LCBvbGRWYWx1ZSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICAgICAgICBpZiAodGhpcy5fd2F0Y2hEZWxldGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgICAgICAgICAvLyBDYW5ub3QgcmVwb3J0IHByb3h5IGFzIHNlbmRlciBiZWNhdXNlIHByb3h5IG5vdCBzZW50IHRvIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnZGVsZXRlJywga2V5LCBvbGRWYWx1ZSwgdW5kZWZpbmVkLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuT2JqZWN0UHJveHlIYW5kbGVyID0gT2JqZWN0UHJveHlIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbi8qKlxuICogVGhpcyBpcyBhIHNpbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBPYmplY3QuYXNzaWduKCkgdGhhdCB1bmRlcnN0YW5kcyBPYnNlcnZhYmxlUHJvcGVydHksXG4gKiBzbyB0aGF0IGl0IGNhbiB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB3aXRob3V0IHdpcGluZyBvdXQgcmVmZXJlbmNlcyB0byB0aGVcbiAqIGV4aXN0aW5nIHByb3BlcnR5IHdpdGggdGhhdCBrZXkgKHdoaWNoIGlzIHdoYXQgd291bGQgaGFwcGVuIGlmIHlvdSB1c2VkIHJlZ3VsYXIgT2JqZWN0LmFzc2lnbigpXG4gKiBvbiBhIG5vbi1wcm94aWVkIG9iamVjdCkuICBJdCBjYW4gYWxzbyBiZSB1c2VkIHRvIHJlYWQgdGhlIHZhbHVlIG9mIGFuIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuZnVuY3Rpb24gb2JzZXJ2YWJsZUFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwge307XG4gICAgZm9yIChjb25zdCBzcmMgb2Ygc291cmNlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzcmMpKSB7XG4gICAgICAgICAgICBjb25zdCBzcHJvcCA9IHNyY1trZXldO1xuICAgICAgICAgICAgY29uc3QgdHByb3AgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgICAgIGxldCB2YWw7XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2soc3Byb3ApKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gc3Byb3AudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBzcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0cHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0cHJvcC52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5vYnNlcnZhYmxlQXNzaWduID0gb2JzZXJ2YWJsZUFzc2lnbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG4vKipcbiAqIENvbW1vbiBsb2dpYyBiZXR3ZWVuIHRoZSBkaWZmZXJlbnQgb2JzZXJ2YWJsZSBjbGFzc2VzLiBUaGVzZSBpbXBsZW1lbnQgSU9ic2VydmFibGUuIFRoZSBpbnZvY2F0aW9uIGl0c2VsZiB2YXJpZXMgZnJvbSBjbGFzcyB0byBjbGFzcy5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHsgbmFtZSwgZm9yd2FyZFRvLCBidWJibGVGcm9tLCBkaXNhYmxlQXN5bmMgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIoKTtcbiAgICAgICAgaWYgKGRpc2FibGVBc3luYykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9yd2FyZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWJibGVGcm9tKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhZ0RlbGVnYXRlKG5hbWUpO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gVHlwZXNjcmlwdCBoYXMgZm9yZ290dGVuIHRoYXQgRXZlbnRIYW5kbGVyIGNhbiBhY2NlcHQgYW4gYXJyYXkuXG4gICAgICAgIC8vIEluIHNwaXRlIGlmIHRoZSBmYWN0IHRoYXQgdGhpcyBzaWduYXR1cmUgaXMgaWRlbnRpY2FsLlxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGUgaW5wdXQncyBkZWxlZ2F0ZSB0byB0aGlzIG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbykge1xuICAgICAgICAvLyBKb2luIHRoZSBvdGhlciBldmVudCBoYW5kbGVyIHRvIHRoaXMsIHNvIHRoYXQgd2hlbiB0aGlzIGlzIGludm9rZWQsIHNvIGlzIHRoZSBvdGhlci5cbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoZm9yd2FyZFRvLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhpcyBvYmplY3QncyBkZWxlZ2F0ZSB0byB0aGUgaW5wdXQgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShidWJibGVGcm9tKSB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBldmVudHMgcmFpc2VkIG9uIHRoZSBvdGhlciBoYW5kbGVyLCBzbyB0aGF0IHdoZW4gdGhhdCBpcyBpbnZva2VkLCBzbyBpcyB0aGlzXG4gICAgICAgIC8vIFRoZSBzYW1lIGFzIGZvcndhcmRDaGFuZ2VFdmVudHNUbyBleGNlcHQgdGhhdCB0aGlzIGlzIHRoZSB0YXJnZXQsIG5vdCB0aGUgc291cmNlLlxuICAgICAgICBidWJibGVGcm9tLnN1YnNjcmliZSh0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlU2VuZGVyKHNlbmRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHByb2JhYmx5IGZyb3duZWQgdXBvbiAoc2VlIGhvdyBUUyBkb2Vzbid0IGxpa2UgaXQpLCBidXQgaXQncyB2YWxpZCBKUy5cbiAgICAgKiBJdCdzIG9ubHkgaW50ZW5kZWQgZm9yIHRyb3VibGVzaG9vdGluZywgbm90IHJlYWwgbG9naWMuIFRoZXJlIGFyZSB0aW1lcyB3aGVuIHlvdSdyZVxuICAgICAqIHRyeWluZyB0byBpZGVudGlmeSBleGFjdGx5IHdoaWNoIGRlbGVnYXRlcyBhcmUgc3Vic2NyaWJlZCwgYW5kIHRoaXMgaXMgcmVhbGx5IGhhcmQgd2hlblxuICAgICAqIG5vdGhpbmcgaGFzIGh1bWFuLXJlYWRhYmxlIG5hbWVzLlxuICAgICAqL1xuICAgIHRhZ0RlbGVnYXRlKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZS5fdGFnID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHggaW4gdGhpcykge1xuICAgICAgICAgICAgaWYgKHggIT09IFwiY2hhbmdlSGFuZGxlclwiICYmIHggIT09IFwicHJpdmF0ZVByb3BlcnR5MlwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3hdID0gdGhpc1t4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZUJhc2UgPSBPYnNlcnZhYmxlQmFzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBPYnNlcnZhYmxlUHJvcGVydHkgaXMgYSBwcm9wZXJ0eSB0aGF0IGF1dG9tYXRpY2FsbHkgcmFpc2VzIGEgUHJvcGVydHlDaGFuZ2VkIGV2ZW50IHdoZW4gaXQgaXMgbW9kaWZpZWQuIFRoaXMgaXMgbW9yZVxuICogY29udmVuaWVudCB0aGFuIGhhdmluZyB0byBkbyBpdCBtYW51YWxseSBldmVyeSB0aW1lIHlvdSBuZWVkIGl0LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlUHJvcGVydHkgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICcnO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gb3B0aW9ucy5vbmx5V2hlbkNoYW5nZWQgfHwgZmFsc2U7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5fdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlICYmIG9sZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ3NldCcsIHRoaXMucHJvcGVydHlOYW1lLCBvbGQsIHZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSAoaWYgYSBzdHJpbmcpIHRoYXQgaGFzIGhhZCBzcGVjaWFsIEhUTUwgY2hhcmFjdGVycyBlc2NhcGVkLlxuICAgICAqL1xuICAgIGdldCBzYWZlVmFsdWUoKSB7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVByb3BlcnR5ID0gT2JzZXJ2YWJsZVByb3BlcnR5O1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBsaWtlIHRoaXMgYmVjYXVzZSBpdCBzaG91bGQgYmUgY2hlY2tpbmcgaWYgdmFsdWUgaXMgYSBzZXR0ZXIsXG4gICAgLy8gYW5kIGl0IGlzbid0LCBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSB0byBjaGVjay5cbiAgICAvLyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKCkgZG9lc24ndCBjYXRjaCBpbmhlcml0ZWQgcHJvcGVydGllcywgb2ZcbiAgICAvLyB3aGljaCB0aGlzIGlzIGFsbW9zdCBhbHdheXMgb25lLlxuICAgIC8vIEkgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYSBiYXNpYyBpbnN0YW5jZSBjaGVjay5cbiAgICByZXR1cm4gb2JqICYmIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGVQcm9wZXJ0eTtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sgPSBvYnNlcnZhYmxlUHJvcGVydHlDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9BcnJheU9ic2VydmFibGVcIik7XG5jb25zdCBBcnJheVByb3h5SGFuZGxlcl8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXJcIik7XG5jb25zdCBPYmplY3RPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JqZWN0UHJveHlIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9PYmplY3RQcm94eUhhbmRsZXJcIik7XG5jbGFzcyBPYnNlcnZhYmxlUHJveHkge1xuICAgIHN0YXRpYyBwcm94aW1hdGUobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCkge1xuICAgICAgICBpZiAodHlwZW9mIG1vZGVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBXZSBjYW4ndCBkbyBmdW5jdGlvbnMsIG5vdCB0aGF0IHRoZXkgd291bGQgYmUgdmVyeSB1c2VmdWwuXG4gICAgICAgICAgICAvLyBZZXMsIHRlY2huaWNhbGx5IHlvdSBzaG91bGQgYmUgYWJsZSB0byBkZWZpbmUgcHJvcGVydGllcyBvbiBhIGZ1bmN0aW9uLiBUaGV5IGFyZSBhY3R1YWxcbiAgICAgICAgICAgIC8vIG9iamVjdHMuICBJbiBwcmFjdGljZSwgaG93ZXZlciwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCkgc3RpbGwgbWFrZXMgdGhlbSB1bmRlZmluZWQuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHR5cGU6IGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShtb2RlbCkpIHtcbiAgICAgICAgICAgIC8vIEFuIGFycmF5IHByb3h5IGFsbG93cyBjaGFuZ2VzIHRvIGFuIGFycmF5IHRvIGJlIG9ic2VydmVkLiBUaGUgZG93bi1zaWRlIGlzIHRoYXQgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIC8vIGlzIGFuIG9yZGVyIG9mIG1hZ25pdHVkZSBzbG93ZXIgdGhhbiB1c2luZyBhbiBPYnNlcnZhYmxlTGlzdC4gIFRoZSB1cC1zaWRlIGlzIHRoYXQgaXQgdXNlc1xuICAgICAgICAgICAgLy8gbW9yZSB0aGFuIGFuIG9yZGVyIG9mIG1hZ25pdHVkZSBsZXNzIGNvZGUuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aW1hdGVBcnJheShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgbW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aW1hdGVPYmplY3QobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBhIHNpbXBsZSB2YWx1ZSBpcyByZXR1cm5lZCwgcmV0dXJuIGEgcHJveHkgaGF2aW5nIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aW1hdGVPYmplY3QoeyB2YWx1ZTogbW9kZWwgfSwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIGNvbmZpZ3VyYWJsZSB2ZXJzaW9uIG9mIHByb3hpbWF0ZSgpIGNhbGxlZCBvbiBhbiBvYmplY3QuIEJ5IG1ha2luZyBpdCBnZW5lcmFsaXplZCBhbmQgY29uZmlndXJhYmxlLCB0aGlzIGFsbG93cyB0aGUgY2FsbGVyIHRvXG4gICAgICogdHJhY2sgbWV0aG9kcyB0aGF0IGFyZSBjYWxsZWQsIGJhc2VkIG9uIGEgY29uZmlndXJhYmxlIGxpc3QuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgb2JqZWN0IGlzIGEgY29tcGxleCBvYmplY3QsIHdoZXJlIGNoaWxkIG9iamVjdHMgYXJlIG1vZGlmaWVkLCBub3QgdGhlIG1haW4gb2JqZWN0LCBjaGFuZ2VzIHdvdWxkIG5vdCBiZSBjYXVnaHQuXG4gICAgICogT25lIHdheSB0byBoYW5kbGUgdGhhdCBpcyB0byBtYWtlIHRoZSBjaGlsZCBvYmplY3QgYSBwcm94eS4gQW5vdGhlciB3YXkgaXMgdG8gYWNjZXNzIHRoZSBjaGlsZCBvYmplY3Qgb25seSB0aHJvdWdoIG1ldGhvZHNcbiAgICAgKiBhbmQgdXNlIHRoaXMuXG4gICAgICovXG4gICAgc3RhdGljIHByb3hpbWF0ZU9iamVjdChtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkLCBtZXRob2RzVG9XYXRjaCA9IFtdLCB3YXRjaFNldCA9IHRydWUsIHdhdGNoRGVsZXRlID0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1vZGVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBXZSBjYW4ndCBkbyBmdW5jdGlvbnMsIG5vdCB0aGF0IHRoZXkgd291bGQgYmUgdmVyeSB1c2VmdWwuXG4gICAgICAgICAgICAvLyBZZXMsIHRlY2huaWNhbGx5IHlvdSBzaG91bGQgYmUgYWJsZSB0byBkZWZpbmUgcHJvcGVydGllcyBvbiBhIGZ1bmN0aW9uLiBUaGV5IGFyZSBhY3R1YWxcbiAgICAgICAgICAgIC8vIG9iamVjdHMuICBJbiBwcmFjdGljZSwgaG93ZXZlciwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCkgc3RpbGwgbWFrZXMgdGhlbSB1bmRlZmluZWQuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHR5cGU6IGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIElPYnNlcnZhYmxlIG1ldGhvZHMgdG8gdGhlIG1vZGVsIHNvIHRoYXQgaXQgY2FuIHJhaXNlIGV2ZW50cy5cbiAgICAgICAgLy8gV2UgbXVzdCBleHRlbmQgdGhlIG9yaWdpbmFsIGNsYXNzIChvciBhdCBsZWFzdCB0aGUgb2JqZWN0KS5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0T2JzZXJ2YWJsZV8xLk9iamVjdE9ic2VydmFibGUuZ2V0TWVyZ2VkT2JzZXJ2YWJsZShtb2RlbCwgZGlzYWJsZUFzeW5jKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBPYmplY3RQcm94eUhhbmRsZXJfMS5PYmplY3RQcm94eUhhbmRsZXIobWV0aG9kc1RvV2F0Y2ggfHwgW10sIHdhdGNoU2V0IHx8IGZhbHNlLCB3YXRjaERlbGV0ZSB8fCBmYWxzZSwgb25seUlmQ2hhbmdlZCB8fCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHRhcmdldCwgaGFuZGxlcik7XG4gICAgICAgIE9ic2VydmFibGVQcm94eS5fbW9kZWxzLnNldChwcm94eSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm94aW1hdGUgYW4gYXJyYXkuXG4gICAgICovXG4gICAgc3RhdGljIHByb3hpbWF0ZUFycmF5KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpIHtcbiAgICAgICAgLy8gQWRkIElPYnNlcnZhYmxlIG1ldGhvZHMgdG8gdGhlIG1vZGVsIHNvIHRoYXQgaXQgY2FuIHJhaXNlIGV2ZW50cy5cbiAgICAgICAgLy8gV2UgbXVzdCBleHRlbmQgdGhlIG9yaWdpbmFsIGFycmF5IGNsYXNzIChvciBhdCBsZWFzdCB0aGUgYXJyYXkgb2JqZWN0KS5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gQXJyYXlPYnNlcnZhYmxlXzEuQXJyYXlPYnNlcnZhYmxlLmdldE1lcmdlZE9ic2VydmFibGUobW9kZWwsIGRpc2FibGVBc3luYyk7XG4gICAgICAgIC8vIFRoZSB0eXBlIGhlcmUgaXNuJ3QgYWNjdXJhdGUsIGJ1dCBJIGhhdmUgbm8gZ29vZCB3YXkgdG8gcGFzcyB0aGUga2V5IHR5cGUgd2l0aG91dCBtYWtpbmcgdGhpcyBjbGFzcyBvbmx5IHdvcmsgZm9yIGFycmF5cy5cbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBBcnJheVByb3h5SGFuZGxlcl8xLkFycmF5UHJveHlIYW5kbGVyKCk7XG4gICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHRhcmdldCwgaGFuZGxlcik7XG4gICAgICAgIE9ic2VydmFibGVQcm94eS5fbW9kZWxzLnNldChwcm94eSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH1cbn1cbi8vIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IG5lZWRzIHRvIGJlIHN0b3JlZCBzb21ld2hlcmUgc28gdGhhdCB0aGUgcHJveHkgY2FuIHdvcmsuXG4vLyBUaGVyZSdzIG5vIHJlYXNvbiB0aGF0IHRoZSB1c2VyIGNhbid0IGtlZXAgYSBjb3B5IGJ1dCB3ZSBzaG91bGRuJ3QgZm9yY2UgdGhhdC5cbk9ic2VydmFibGVQcm94eS5fbW9kZWxzID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZVByb3h5ID0gT2JzZXJ2YWJsZVByb3h5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENsb25lRGVlcF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcFwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIG9ic2VydmFibGUgc3RhdGUgdGhhdCBzaG91bGQgb25seSBiZSBhY2Nlc3NlZCB1c2luZyB0aGUgcmVsZXZhbnQgbWV0aG9kcywgYWxsb3dpbmcgYXRvbWljIGNoYW5nZXMgdG8gbXVsdGlwbGUgcHJvcGVydGllc1xuICogaW4gbXVsdGlwbGUgb2JqZWN0cywgcmFpc2luZyBhIHNpbmdsZSBldmVudC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVN0YXRlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJ3NldFN0YXRlJztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBJIHdvdWxkIHByZWZlciB0aGF0IHRoaXMgcmV0dXJuIFJlYWRvbmx5PFQ+IGJ1dCBnZXR0ZXIgYW5kIHNldHRlciBoYXZlIHRvIGJlIHRoZSBzYW1lIHR5cGUuXG4gICAgICAgIC8vIFRoYXQgbWVhbnMgeW91IHdvdWxkIGhhdmUgdG8gY2FzdCBhbnkgdmFsdWUgeW91IHNldCBhcyBhIHJlYWRvbmx5LCB3aGljaCBpcyBhIFBJVEEuXG4gICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVyd3JpdGVzIHRoZSBlbnRpcmUgdmFsdWUuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodmFsdWUsIHRydWUpO1xuICAgIH1cbiAgICBnZXRTYWZlVmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG1wID0gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0bXApIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRtcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodG1wKSk7XG4gICAgfVxuICAgIGdldFZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgc2V0U3RhdGUodmFsdWUsIG92ZXJXcml0ZUFsbCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlIGlzIHByaW1pdGl2ZSwgdGhlbiBhIGZ1bGwgb3ZlcndyaXRlIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbnMgd2lsbCBleGVjdXRlIGJ1dCB0aGV5IHdvbid0IGNoYW5nZSB0aGUgdmFsdWUuIFRoZSByZWFzb24gaXMgdGhlIHNhbWUgcmVhc29uIHRoYXQgdGhpcyBtYWtlcyBubyBwZXJtYW5lbnQgY2hhbmdlIHRvIGJhcjpcbiAgICAgICAgICAgIC8vIHZhciBmb28gPSBmdW5jdGlvbihzdHIpIHsgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7IH07IHZhciBiYXIgPSAnYWJjJzsgZm9vKGJhcik7IGNvbnNvbGUubG9nKGJhciA9PT0gJ2FiYycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgc2V0U3RhdGUgd2l0aCBhIGZ1bmN0aW9uIGlmIHN0YXRlIGlzIHByaW1pdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJXcml0ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJXcml0ZUFsbCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMV9vdmVyd3JpdGVBbGwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBbbmV3VmFsdWUsIHJldHVyblZhbHVlXSA9IF9vdnIzX2Z1bmN0aW9uQXJnLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBpcyBub3QgYSBwYXJ0aWFsIHN0YXRlIG9yIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjJfcGFydGlhbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHsgb2xkVmFsdWUsIG5ld1ZhbHVlLCByZXR1cm5WYWx1ZSB9O1xuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9vdmVyd3JpdGVBbGwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGVudGlyZSBvYmplY3QuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcChfdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMl9wYXJ0aWFsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gUGFydGlhbCBvYmplY3Q6IE92ZXJ3cml0ZSBvbmx5IHRoZSBrZXlzIHByb3ZpZGVkXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRtcFtrZXldID0gX3ZhbHVlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyM19mdW5jdGlvbkFyZyhfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGFuZCB1cGRhdGUgdGhlIG9iamVjdCBhcyBkaWN0YXRlZFxuICAgICAgICAgICAgLy8gTWF5YmUgdW5uZWNlc3NhcnkgYnV0IHdlIHdhbnQgdG8gYXZvaWQgdGhlIGNhbGxlciBleGZpbHRyYXRpbmcgdGhlIHN0YXRlIHVzaW5nIGEgZnVuY3Rpb24sXG4gICAgICAgICAgICAvLyBieSBhY2NpZGVudC4gT2YgY291cnNlLCB0aGV5IGNhbiBqdXN0IGFjY2VzcyBfdmFsdWUgYnkgY2FzdGluZyBhcyBhbnksXG4gICAgICAgICAgICAvLyBidXQgdGhhdCdzIG5vdCBhY2NpZGVudGFsLlxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IF9yZXR1cm5WYWx1ZSA9IF92YWx1ZS5jYWxsKHRtcCwgdG1wKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gW3RtcCwgX3JldHVyblZhbHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVN0YXRlID0gT2JzZXJ2YWJsZVN0YXRlO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVN0YXRlQ2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBrbm93IGlmIEkgc2hvdWxkIGNoZWNrIGZvciB0aGlzIG9yIGZvciBnZXRTdGF0ZSgpIGFuZCBzZXRTdGF0ZSgpXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGU7XG59XG5leHBvcnRzLm9ic2VydmFibGVTdGF0ZUNoZWNrID0gb2JzZXJ2YWJsZVN0YXRlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBEZWxldGVOb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRGVsZXRlTm9kZUNvbnRlbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IENvbnN0cnVjdGFibGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZVwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBJZiB5b3UgY2xpY2sgYSBsaW5rIGluIGEgcmVhbCB3ZWIgc2l0ZSwgdGhlIGJyb3dzZXIgYXNrcyB0aGUgc2VydmVyIGZvciBhIHBhZ2UgYW5kIGl0IHJvdXRlcyB5b3UgdG8gdGhlIHJlbGV2YW50XG4gKiBwYWdlLiBCdXQgaWYgeW91IGhhdmUgYSBzaW5nbGUgcGFnZSBhcHAgcnVubmluZyBvbiBhIGZpbGUsIHdpdGggbm8gd2ViIHNlcnZlciwgbGlrZSB0aGUgb25lIHRoaXMgZnJhbWV3b3JrXG4gKiB3YXMgYnVpbHQgZm9yLCB5b3UgbmVlZCBzb21ldGhpbmcgdG8gc2ltdWxhdGUgdGhhdC5cbiAqXG4gKiBUaGlzIGNsYXNzIGNsZWFycyB0aGUgcm91dGUgY29udGFpbmVyLCB3aGljaCBpcyBleHBlY3RlZCB0byBiZSBhIHN0YXRpYyBjb250YWluZXIgaW4gdGhlIHdyYXBwZXIgSFRNTCBwYWdlLCBvciB0aGUgYm9keS5cbiAqIFdoZW4geW91IGdpdmUgaXQgdGhlIHJlbGV2YW50IHJvdXRlLCBpdCBleGVjdXRlcyB0aGUgY2FsbGJhY2sgb3IgcmV0dXJucyB0aGUgdmlldy9IVE1MIGVsZW1lbnQgeW91IGRlZmluZWQgZm9yIHRoZSByb3V0ZSxcbiAqIGFuZCBzdGlja3MgaXQgaW5zaWRlIHRoZSBjb250YWluZXIuIFRoZSBlbGVtZW50IHJldHVybmVkIGNhbiBiZSB3cmFwcGVkIGluIGEgbGF5b3V0IHZpZXcsIGxpa2UgaW4gQVNQLk5ldC5cbiAqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb24sIHdpdGhvdXQgdGhlIHJlY3Vyc2l2ZSByb3V0ZXMgZm91bmQgaW4gdGhlIGFkdmFuY2VkIHJvdXRlci4gSXQgd2FzIGJhc2VkIG1vcmUgb24gQVNQLk5ldCBvciBub2RlLmpzXG4gKiByb3V0aW5nLCB3aGVyZSB5b3UgaGF2ZSBhIGZsYXQgc2V0IG9mIHJvdXRlcyBhbmQgb25jZSB5b3UgZmluZCBhIHJvdXRlLCB5b3UncmUgZG9uZS5cbiAqL1xuY2xhc3MgUGFnZVJvdXRlciB7XG4gICAgc3RhdGljIGdldCBhbGxSb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgbWF0Y2hlZFJvdXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlZFJvdXRlIHx8IHsgcm91dGU6ICcnLCBwYXJhbXM6IG5ldyBNYXAoKSwgY29uZmlnOiB7IHJvdXRlOiAnJyB9IH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVkUm91dGUucGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnlNYXhMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5TWF4TGVuZ3RoO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGhpc3RvcnlNYXhMZW5ndGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hpc3RvcnkubGVuZ3RoID4gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkubGVuZ3RoID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeU1heExlbmd0aCA9IHZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IG5vdEZvdW5kKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX25vdEZvdW5kID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgbXVzdCBiZSBjYWxsZWQgZmlyc3QgYmVmb3JlIHVzaW5nIGl0LCBiZWNhdXNlIEpTIGRvZXNuJ3QgaGF2ZSBzdGF0aWMgY29uc3RydWN0b3JzIGxpa2UgQyMuIEl0IHNldHMgdXAgdGhlXG4gICAgICogcm91dGUgY29udGFpbmVyLCBjdXN0b20gZWxlbWVudHMsIGFuZCBhbHNvIGFsbG93cyBvbmUtc3RlcCBjb25maWd1cmF0aW9uIG9mIHNldmVyYWwgb3RoZXIgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGNvbmZpZ3VyZShyb3V0ZXMgPSBbXSwgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgICAgICh7IHJvdXRlcywgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgPSB0cnVlIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgcm91dGVzLCBkZWZhdWx0TGF5b3V0LCBkZWZhdWx0U3RhdGljTGF5b3V0LCBub3RGb3VuZCwgZGVmYXVsdFJvdXRlLCB1cmxSb3V0aW5nRW5hYmxlZCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICB0aGlzLl9jb25maWd1cmVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5vdEZvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3RGb3VuZCA9IG5vdEZvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBydGUubGF5b3V0ID0gcnRlLmxheW91dCB8fCBkZWZhdWx0TGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZShkZWZhdWx0U3RhdGljTGF5b3V0KSAmJiBOb25lVHlwZV8xLmlzTm9uZShydGUuc3RhdGljTGF5b3V0KSkge1xuICAgICAgICAgICAgICAgIHJ0ZS5zdGF0aWNMYXlvdXQgPSBkZWZhdWx0U3RhdGljTGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRSb3V0ZShydGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmxSb3V0aW5nRW5hYmxlZCkge1xuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgYWxsb3dzIGdvaW5nIHRvIGEgbmV3IHBhZ2UgYnkgY2hhbmdpbmcgdGhlIFVSTCBpbnN0ZWFkIG9mIGhhdmluZyB0byBpc3N1ZSByb3V0ZSgpIGNvbW1hbmRzLlxuICAgICAgICAgICAgdGhpcy50dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2Utcm91dGVyJykgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgncGFnZS1yb3V0ZXInKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3BhZ2Utcm91dGVyJywgRGl2UGFnZSwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbGF5b3V0LWJvZHknKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2xheW91dC1ib2R5JywgRGl2TGF5b3V0LCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdub3QtZm91bmQnKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ25vdC1mb3VuZCcsIERpdk5vdEZvdW5kLCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGN1c3RvbUVsZW1lbnRzIGlzbid0IG9mZmljaWFsbHkgcGFydCBvZiBhbiBFUyB2ZXJzaW9uIHlldCBzbyB3b24ndCB3b3JrIGV2ZW4gaW4gc29tZSByZWNlbnQtaXNoIGJyb3dzZXJzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRSb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Um91dGUoZGVmYXVsdFJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBOb3RlOiB0aGVyZSBpcyBubyByZW1vdmVSb3V0ZS4gVGhlcmUgY291bGQgYmUsIGJ1dCBpdCdzIG5ldmVyIG5lZWRlZC5cbiAgICBzdGF0aWMgYWRkUm91dGUocm91dGUpIHtcbiAgICAgICAgbGV0IHJvdXRlcztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm91dGUucm91dGUpKSB7XG4gICAgICAgICAgICByb3V0ZXMgPSByb3V0ZS5yb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJvdXRlcyA9IFtyb3V0ZS5yb3V0ZV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydGUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm91dGVzLmZpbmQocSA9PiBxLnJvdXRlID09PSBydGUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGUgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wID0gT2JqZWN0LmFzc2lnbih7fSwgcm91dGUpO1xuICAgICAgICAgICAgdG1wLnJvdXRlID0gcnRlO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLnB1c2godG1wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBsaW5rZWQgdG8gYSBwYXJ0aWN1bGFyIHBhZ2UgKG9uIHRoZSBoYXNoKSwgZ28gdG8gaXQuIEVsc2UsIGdvIHRvIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIFBhZ2VSb3V0ZXIucm91dGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFBhZ2VSb3V0ZXIucm91dGUocm91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyByb3V0ZShyb3V0ZSwgdXBkYXRlVXJsID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZ3VyZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFnZVJvdXRlciBub3QgY29uZmlndXJlZC4gQ2FsbCBjb25maWd1cmUoKSBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgICAvLyBBbGxvdyBhY3R1YWwgbGlua3MgdmlhIHRoZSBoYXNoLiBIYXNoIGxpbmtzIGRvbid0IGZvcmNlIGEgcGFnZSByZWxvYWQgYW5kIHRoZXkgd29yayB3L28gYSB3ZWIgc2VydmVyLlxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgaGF2aW5nIHRvIGNhbGwgcm91dGUoKSBtYW51YWxseSwgeW91IG11c3QgY2FsbCB0dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgICAgICByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSBwcm9ibGVtLCB3aGljaCBpcyB0aGF0IHNldHRpbmcgdGhlIGhhc2ggd2lsbCB0cmlnZ2VyIEFOT1RIRVIgcm91dGUgY2hhaW5nZSB2aWEgdGhlIGhhc2hjaGFuZ2Ugb3BlcmF0aW9uLlxuICAgICAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGhhc2ggY2hhbmdlIGFuZCB0aGVuIHJlc3RvcmluZyBpdCBsYXRlciBkb2VzIG5vdGhpbmcuIEl0J3Mgc3RpbGwgdHJpZ2dlcmVkLlxuICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlcyBoYWNrd29yay4gRXZlbiB0aGUgc2ltcGxlIHJvdXRlciBoYXMgbW9yZSBoYWNrcyB0aGFuIEkgbGlrZS5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgd2FzIHRyaWdnZXJlZCBieSBhIGhhc2ggY2hhbmdlIGFuZCB0aGUgcm91dGUgaXMgdGhlIHNhbWUsIHRoZW4gZG9uJ3QgZG8gYW55dGhpbmcuXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgbGFzdCByb3V0ZSBzbyB0aGF0IGl0IGRvZXNuJ3QgaW50ZXJmZXJlIHdpdGggdGhlIG5leHQgaGFzaCBjaGFuZ2UuXG4gICAgICAgICAgICBpZiAocm91dGUgPT09IHRoaXMuX2xhc3RSb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXBkYXRlVXJsKSB7XG4gICAgICAgICAgICAvLyBJZiBhIHJvdXRlIGlzIHNlbnQgaW4sIHRoZW4gc2V0IHRoZSBoYXNoLlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICBsZXQgc2VhcmNoUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHRoaXMuX3JvdXRlcykge1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0ID0gdGhpcy5fdGVzdFJvdXRlKHJ0ZS5yb3V0ZSwgcm91dGUgfHwgJycpO1xuICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcnRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUm91dGUgJHtyb3V0ZX0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2aW91c1JvdXRlID0gKHRoaXMuX21hdGNoZWRSb3V0ZSB8fCB7fSkuY29uZmlnO1xuICAgICAgICB0aGlzLl9tYXRjaGVkUm91dGUgPSB7IHJvdXRlLCBwYXJhbXM6IHNlYXJjaFJlc3VsdCB8fCBuZXcgTWFwKCksIGNvbmZpZzogbWF0Y2ggfTtcbiAgICAgICAgLy8gQWRkIHJvdXRlIHRvIGhpc3RvcnkgaWYgaXQncyBkaWZmZXJlbnQgZnJvbSB0aGUgcHJldmlvdXMgbGF0ZXN0IGhpc3RvcnlcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPT09IDAgfHwgdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggLSAxXSAhPT0gcm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChyb3V0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiB0aGlzLmhpc3RvcnlNYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3Rvcnkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcm91dGVHdWFyZHMgPSBbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2gucm91dGVHdWFyZHMpKSB7XG4gICAgICAgICAgICByb3V0ZUd1YXJkcyA9IG1hdGNoLnJvdXRlR3VhcmRzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hdGNoLnJvdXRlR3VhcmRzKSB7XG4gICAgICAgICAgICByb3V0ZUd1YXJkcy5wdXNoKG1hdGNoLnJvdXRlR3VhcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJnIG9mIHJvdXRlR3VhcmRzKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXN0ID0gcmcuY2hlY2tWYWxpZChtYXRjaCk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUm91dGUgcGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyUm91dGUobWF0Y2gsIHByZXZpb3VzUm91dGUpO1xuICAgIH1cbiAgICBzdGF0aWMgYmFjaygpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXNuJ3QgYW55IGhpc3RvcnkgdG8gZ28gYmFjayB0bywgZG9uJ3QgZ28gYmFjay5cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeS5wb3AoKTsgLy8gQ3VycmVudCByb3V0ZSBzaXRzIGF0IHRoZSB0b3Agb2YgdGhlIHN0YWNrXG4gICAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy5faGlzdG9yeS5wb3AoKTsgLy8gcHJldmlvdXMgcm91dGVcbiAgICAgICAgaWYgKHJvdXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGUocm91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyB0dXJuT25VcmxSb3V0aW5nKCkge1xuICAgICAgICB0aGlzLl9oYXNoQ2hhbmdlID0gKGV2dCkgPT4geyB0aGlzLnJvdXRlKCk7IH07XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5faGFzaENoYW5nZSk7XG4gICAgfVxuICAgIHN0YXRpYyBfdGVzdFJvdXRlKHJvdXRlU3RyaW5nLCB1cmxTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAoIXJvdXRlU3RyaW5nIHx8ICF1cmxTdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChyb3V0ZVN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsU3RyaW5nLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHVybFN0cmluZyA9IHVybFN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGVBcnJheSA9IHJvdXRlU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIGNvbnN0IHVybEFycmF5ID0gdXJsU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIC8vIFNhbWUgbnVtYmVyIG9mIC8gY2hhcmFjdGVycyByZXF1aXJlZC5cbiAgICAgICAgaWYgKHJvdXRlQXJyYXkubGVuZ3RoICE9PSB1cmxBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtyb3V0ZVNlZ21lbnQsIHVybFNlZ21lbnRdIG9mIEFycmF5VXRpbGl0aWVzXzEuemlwKHJvdXRlQXJyYXksIHVybEFycmF5KSkge1xuICAgICAgICAgICAgLy8gUGFyYW1ldGVycyBhcmUgYWxsb3dlZC4gT3B0aW9uYWwgcGFyYW1ldGVycyBhcmUgbm90LlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiBmb3Igbm8gb3B0aW9uYWwgcGFyYW1ldGVycyBpcyB0aGF0IGZpbmRpbmcgYSBtYXRjaCBiZXR3ZWVuIC9hLzo/cGFyYW0vYiBhbmQgL2EvYiBpcyB0b28gY29tcGxleC5cbiAgICAgICAgICAgIC8vIElzICdiJyBhIHBhcmFtIHZhbHVlIG9yIHBhcnQgb2YgdGhlIHJvdXRlLiBCYXNpY2FsbHksIG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSByb3V0ZSBlbmQuXG4gICAgICAgICAgICAvLyBJIG5vdGljZWQgdGhhdCBBU1AuTkVUIHdvcmtzIHRoYXQgd2F5IGFuZCBJIGZvdW5kIGl0IGNvbmZ1c2luZyB0aGF0IG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAvLyBKdXN0IGNyZWF0ZSBhIG5ldyByb3V0ZSB3aXRoIHRoZSBvcHRpb25hbCBwYXJhbSBsZWZ0IG91dC5cbiAgICAgICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSByb3V0ZVNlZ21lbnQuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lLmluY2x1ZGVzKCc9JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgJHtyb3V0ZVN0cmluZ30gY29udGFpbnMgZHVwbGljYXRlcyBvZiB0aGUgc2FtZSBwYXJhbWV0ZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldChuYW1lLCB1cmxTZWdtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgbWFwcGVkIHN0YXRpYyBwYXJhbSBjYXNlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBuYW1lLnNwbGl0KCc9JylbMV07XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KCc9JylbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IHVybFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSb3V0ZSAke3JvdXRlU3RyaW5nfSBjb250YWlucyBkdXBsaWNhdGVzIG9mIHRoZSBzYW1lIHBhcmFtZXRlci5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc2V0KG5hbWUsIHVybFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlU2VnbWVudCAhPT0gdXJsU2VnbWVudC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVuZGVyUm91dGUocm91dGUsIHByZXZpb3VzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgUGFnZVJvdXRlci5yb3V0ZSgndGhlIHNhbWUgdXJsJykgd2lsbCByZWxvYWQgdGhlIGNvbnRlbnRzIGZyb20gc2NyYXRjaC5cbiAgICAgICAgLy8gQWRqdXN0aW5nIHdpbmRvdy5sb2NhdGlvbiB3aWxsIGRvIG5vdGhpbmcgaWYgdGhlIHJvdXRlIGlzIHRoZSBzYW1lLlxuICAgICAgICAvLyBJIHRoaW5rIHRoaXMgaXMgZmluZSwgYWZ0ZXIgc3RydWdnbGluZyBpbiBhbmd1bGFyIHRvIHJlbG9hZCB0aGUgcGFnZSBhbmQgZmluZGluZ1xuICAgICAgICAvLyBpdCBtdWNoIGhhcmRlci5cbiAgICAgICAgLy8gTm90ZSBpZiB5b3UgY2hhbmdlIHRoZSBsb2NhdGlvbiBiYXIsIENocm9tZSBmb3JjZXMgYSByZWxvYWQgb2YgUHJvZ3JhbS50cywgbm90aGluZyB5b3UgY2FuIGRvXG4gICAgICAgIC8vIGFib3V0IGl0IGJlY2F1c2UgQ2hyb21lIGlzIHRoZSBvbmUgdGhhdCBkaXNjYXJkZWQgeW91ciBzdGF0ZS5cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMucm91dGVDb250YWluZXI7XG4gICAgICAgIGNvbnN0IGtlZXBMYXlvdXQgPSByb3V0ZS5sYXlvdXQgJiYgcHJldmlvdXMgJiYgcm91dGUuc3RhdGljTGF5b3V0ICYmIHJvdXRlLmxheW91dCA9PT0gcHJldmlvdXMubGF5b3V0O1xuICAgICAgICBpZiAoIWtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjb250ZW50cyBvZiBwYWdlLXJvdXRlclxuICAgICAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYXlvdXQtYm9keScpO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxsYXlvdXQtYm9keT4gZWxlbWVudCBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5sYXlvdXQpIHtcbiAgICAgICAgICAgIGxldCBsYXlvdXRWaWV3O1xuICAgICAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChyb3V0ZS5sYXlvdXQpKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0VmlldyA9IG5ldyByb3V0ZS5sYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRWaWV3ID0gcm91dGUubGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5b3V0VmlldyAmJiB2aWV3VHlwZUd1YXJkKGxheW91dFZpZXcpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxheW91dFZpZXcuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsYXlvdXRWaWV3KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxheW91dFZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGF5b3V0LWJvZHknKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8bGF5b3V0LWJvZHk+IGVsZW1lbnQgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjb250ZW50cyBvZiBsYXlvdXQtYm9keSAoYnV0IGtlZXAgbGF5b3V0KVxuICAgICAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3O1xuICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKHJvdXRlLnBheWxvYWQpKSB7XG4gICAgICAgICAgICB2aWV3ID0gbmV3IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygcm91dGUucGF5bG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmlldyA9IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICB2aWV3ID0gcm91dGUucGF5bG9hZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcgJiYgdmlld1R5cGVHdWFyZCh2aWV3KSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmlldykge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZpZXdUeXBlR3VhcmQodGVzdCkge1xuICAgICAgICAgICAgaWYgKFwiY29udGVudFwiIGluIHRlc3QgJiYgdGVzdC5jb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3JlbmRlck5vdEZvdW5kKCkge1xuICAgICAgICBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50KHRoaXMucm91dGVDb250YWluZXIpO1xuICAgICAgICB0aGlzLnJvdXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6ICdub3QtZm91bmQnLCBpbm5lckhUTUw6IHRoaXMuX25vdEZvdW5kIHx8IFwiUXVvdGggdGhlIFJhdmVuLCA0MDRcIiB9KSk7XG4gICAgfVxufVxuUGFnZVJvdXRlci5yb3V0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XG5QYWdlUm91dGVyLl9jb25maWd1cmVkID0gZmFsc2U7XG5QYWdlUm91dGVyLl9yb3V0ZXMgPSBbXTtcblBhZ2VSb3V0ZXIuX2hpc3RvcnkgPSBbXTtcblBhZ2VSb3V0ZXIuX2hpc3RvcnlNYXhMZW5ndGggPSA1MDtcbmV4cG9ydHMuUGFnZVJvdXRlciA9IFBhZ2VSb3V0ZXI7XG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuLy8gQSBjbGFzcyBpcyByZXF1aXJlZCBidXQgeW91J3JlIG5vdCBhbGxvd2VkIHRvIHVzZSB0aGUgZXhpc3RpbmcgY2xhc3MgYmVjYXVzZSBpdCBjYW4ndFxuLy8gYmUgY29uc3RydWN0ZWQgKGludmFsaWQgY29uc3RydWN0b3IpLiBBbmQgeW91IGFyZSBPTkxZIGFsbG93ZWQgdG8gZXh0ZW5kIEhUTUxFbGVtZW50LlxuLy8gQU5EIHRoZXkgbXVzdCBiZSB1bmlxdWUuXG5jbGFzcyBEaXZQYWdlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmNsYXNzIERpdkxheW91dCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5jbGFzcyBEaXZOb3RGb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiAocmVzdWx0KSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShyZXN1bHQpLCB0aW1lKSk7XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IERlZmVycmVkUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vRGVmZXJyZWRQcm9taXNlXCIpO1xuLyoqXG4gKiBUaGUgcHJvbWlzZSBBUEkgaXMgbmljZSwgbW9zdGx5LCBidXQgdGhlIG1haW4gdGhpbmcgcHJldmVudGluZyB1c2Ugb2YgYSBwcm9taXNlIGFzIGFuIGV2ZW50IGhhbmRsZXIgaXMgdGhhdFxuICogaXQgb25seSBleGVjdXRlcyBvbmNlLiBBZnRlciB0aGF0IHBvaW50LCBpdCBpcyByZXNvbHZlZCwgYW5kIHRoZXJlIGlzIG5vIHdheSB0byBmbGlwIGl0IGJhY2suXG4gKlxuICogVGhlIHJlcGVhdGFibGUgcHJvbWlzZSBrZWVwcyB0aGUgcHJvbWlzZSBBUEkgYW5kIGNyZWF0ZXMgdGhlIGlsbHVzaW9uIHRoYXQgdGhlIHByb21pc2UgaXMgcmVwZWF0ZWQgYnlcbiAqIHJlYnVpbGRpbmcgdGhlIGNoYWluIGVhY2ggdGltZS4gSXQncyByZWFsbHkgYSBkZWZlcnJlZCBmYWN0b3J5IGJ1dCBpdCBwcmV0ZW5kcyB0byBiZSBhIGRlZmVycmVkLiBJJ20gc3VyZVxuICogdGhpcyBoYXMgYSBwZXJmb3JtYW5jZSBwZW5hbHR5LlxuICpcbiAqIFlvdSBzaG91bGQgbm90IGF0dGFjaCBhY3R1YWwgcHJvbWlzZXMgaW50byB0aGUgdGhlbigpIGNoYWluLCBiZWNhdXNlIHRoZXkgY2FuJ3QgYmUgcmVwZWF0ZWQuIFRoZSBQcm9taXNlIHR5cGUgaXNuJ3RcbiAqIGFsbG93ZWQgYnV0IHRoZXJlIGFyZSB3YXlzIHRvIGdldCBhcm91bmQgdGhlIFRTIGNvbXBpbGVyLiBUaGUgVFMgdHlwZSBkZWZpbml0aW9uIGZvciBQcm9taXNlIGFuZCBQcm9taXNlTGlrZSBpc24ndFxuICogY29tcGxldGVseSBjb3JyZWN0LCBhbnl3YXksIHNvIGl0J3MgZWFzeSB0byBnZXQgdXNlZCB0byB1c2luZyB0aGUgYW55IHR5cGUgYW5kIG1ha2UgYnJva2VuIGNvZGUuXG4gKlxuICogWW91IGNhbm5vdCBhc3luYy9hd2FpdCBhIHJlcGVhdGFibGUgcHJvbWlzZSBpdHNlbGYgYnV0IHlvdSBjYW4gYXdhaXQgYSBzaW5nbGUgcmVzb2x1dGlvbi4gQXN5bmMvYXdhaXQgaXMgc3VnYXIgdGhhdFxuICogY3JlYXRlcyBhIHJlZ3VsYXIsIG5vbi1yZXBlYXRhYmxlLCBwcm9taXNlLlxuICovXG5jbGFzcyBSZXBlYXRhYmxlUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIG9uVW5oYW5kbGVkRXJyb3IsIC8vIFRoaXMgYWRkcyBhIGNhbGxiYWNrIGF0IHRoZSBlbmQgKG9yIDJuZCBmcm9tIHRoZSBlbmQsIHNlZSBuZXh0IG9wdGlvbilcbiAgICB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICApIHtcbiAgICAgICAgdGhpcy5vblVuaGFuZGxlZEVycm9yID0gb25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7IC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuIFVzZWZ1bCBmb3IgYXN5bmMvYXdhaXQgY29kZS5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZSBmb2xsb3dpbmcgc2hvdWxkIHdvcms6XG4gICAgLy8gY29uc3QgcmVwZWF0YWJsZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZSgpOyBjb25zdCByID0gYXdhaXQgcmVwZWF0YWJsZS5yZXNvbHZlKCk7IGNvbnNvbGUubG9nKHIpO1xuICAgIHJlc29sdmUoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgcmVqZWN0KGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgLy8gVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suXG4gICAgdGhlbihvbmZ1bGZpbGxlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25mdWxmaWxsZWQ6IG9uZnVsZmlsbGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25yZWplY3RlZDogb25yZWplY3RlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Uga25vdyB0aGF0IHRoZSBmaXJzdCBpcyBhbHdheXMgb25mdWxmaWxsZWQgYW5kIGlzIG5ldmVyIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmICghY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBGaXJzdCBvbmZ1bGZpbGxlZCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IG5ldyBEZWZlcnJlZFByb21pc2VfMS5EZWZlcnJlZFByb21pc2UoY2Iub25mdWxmaWxsZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGNiLm9uZnVsZmlsbGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKGNiLm9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBObyBjYWxsYmFja3MsIG5vdCBldmVuIHRoZSBkZWZhdWx0IGZpcnN0IG9uZnVsZmlsbGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKHRoaXMub25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5leHBvcnRzLlJlcGVhdGFibGVQcm9taXNlID0gUmVwZWF0YWJsZVByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUmV0dXJuIGVsZW1lbnRzIG9mIGFycmF5IGEgbGluZWQgdXAgd2l0aCBlbGVtZW50cyBvZiBhcnJheSBiLiBCb3RoIGFycmF5cyBkb24ndCBoYXZlIHRvIGJlIHRoZSBzYW1lIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggPj0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2VsZW1lbnQsIGJbaW5kZXhdXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYi5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbYVtpbmRleF0sIGJdKTtcbiAgICB9XG59XG5leHBvcnRzLnppcCA9IHppcDtcbi8qKlxuICogUmV0dXJuIGEgY2FydGVzaWFuIGpvaW4gKGNyb3NzIGpvaW4pIGJldHdlZW4gYXJyYXlzIGEgYW5kIGIuXG4gKi9cbmZ1bmN0aW9uIGNhcnRlc2lhbihhLCBiKSB7XG4gICAgLy8vIHR5cGVzY3JpcHQgcHJldmVudHMgYSBkaXJlY3QgdXNlIG9mIGNvbmNhdCwgc28gZG8gdGhpcyBtYW51YWxseSB3aXRoIGEgbG9vcFxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYSkge1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uYi5tYXAocSA9PiBbaXRlbSwgcV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLmNhcnRlc2lhbiA9IGNhcnRlc2lhbjtcbi8qKlxuICogR2VuZXJhdGUgYSByYW5nZSBvZiBpbnRlZ2VycywgY291bnRpbmcgdXAgYnkgMSwgZm9yIHRoZSBnaXZlbiBsZW5ndGguIFN0b2xlbiBmcm9tIFB5dGhvbi5cbiAqL1xuZnVuY3Rpb24gcmFuZ2UobGVuZ3RoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbmd0aCB9LCAodmFsdWUsIGtleSkgPT4ga2V5KTtcbn1cbmV4cG9ydHMucmFuZ2UgPSByYW5nZTtcbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgaXRlbXMgYW5kIG90aGVyIGFycmF5cywgZmxhdHRlbiB0aGVtIG91dCBpbnRvIGEgc2luZ2xlIGFycmF5LlxuICovXG5mdW5jdGlvbiogdHJhdmVyc2UoYXJyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgeWllbGQgYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgYXJyKSB7XG4gICAgICAgICAgICB5aWVsZCogdHJhdmVyc2Uocm93KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudHJhdmVyc2UgPSB0cmF2ZXJzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBNYWtlIGl0IGVhc2llciB0byBjcmVhdGUgc2ltcGxlIGNvbXBhcmlzb24gZnVuY3Rpb25zIG9uIChwb3NzaWJseSBjb21wbGV4KSBvYmplY3RzLiBUeXBpY2FsIHVzZTogYXJyLnNvcnQob3JkZXJCeShvID0+IG8uaWQpKVxuICovXG5mdW5jdGlvbiBvcmRlckJ5KHByb3BlcnR5Rm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RWYWx1ZSA9IHByb3BlcnR5Rm4oZmlyc3QpO1xuICAgICAgICBjb25zdCBzZWNvbmRWYWx1ZSA9IHByb3BlcnR5Rm4oc2Vjb25kKTtcbiAgICAgICAgaWYgKGZpcnN0VmFsdWUgPCBzZWNvbmRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdFZhbHVlID4gc2Vjb25kVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG59XG5leHBvcnRzLm9yZGVyQnkgPSBvcmRlckJ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBBcnJheUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIG9wZXJhdGlvbiAobWV0aG9kLCBzZXQsIGRlbGV0ZSlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmFyZ3MgPSBbXTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5Q2hhbmdlZEV2ZW50QXJncyA9IEFycmF5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmVwZWF0YWJsZVByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKTtcbi8qKlxuICogQSBkZWxlZ2F0ZSBvYmplY3QgaXMgdXNlZCBieSB0aGUgRXZlbnRIYW5kbGVyLiBJdCBjb250YWlucyBlbm91Z2ggaW5mb3JtYXRpb24gdG8gZXhlY3V0ZSBhIGNhbGxiYWNrIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3VzbHlcbiAqICh1c2luZyBhIHByb21pc2UpLiBJdCBhbHNvIGFkZHMgc29tZSBzdHJpbmdzIHRvIGhlbHAgaW4gdHJvdWJsZXNob290aW5nLCBiZWNhdXNlIHNlYXJjaGluZyBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBjb21wbGV4IG9iamVjdHMgY2FuIG1ha2VcbiAqIGl0IGEgYmVhciB0byBmaW5kIG91dCB3aHkgYSBjYWxsYmFjayBpc24ndCBiZWluZyBleGVjdXRlZC5cbiAqL1xuY2xhc3MgRGVsZWdhdGUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIEluIG1hbnkgY2FzZXMgKGZvciBleGFtcGxlLCB3aGVuIHVzaW5nIGZhdCBhcnJvdyBmdW5jdGlvbnMpLCB0aGlzQXJnIGlzXG4gICAgICAgIC8vIG5vdCBuZWVkZWQuIEJ1dCBpbiBtb3N0IG90aGVycywgaXQgaXMgYW4gYW5ub3lpbmcgYnVnIHRoYXQgcmVxdWlyZXMgdHJvdWJsZXNob290aW5nXG4gICAgICAgIC8vIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY2FsbGVyIGZvcmdvdC4gSSd2ZSB3YXZlcmVkIGJldHdlZW4gbWFraW5nIGl0IHJlcXVpcmVkIGFuZCBub3QuXG4gICAgICAgIGlmICghdGhpc0FyZykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVsZWdhdGUgY3JlYXRlZCB3aXRob3V0IHRoaXNBcmcuIERpZCB5b3UgbWVhbiB0bz8nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrT3duZXJOYW1lID0gdGhpc0FyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSB0eXBlc2NyaXB0IGNvbXBpbGVyIHNob3VsZCBoYW5kbGUgdGhpcyBjaGVjayBidXQgY2FuJ3QgYXQgcnVudGltZS5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5jYWxsYmFja05hbWUgPSBjYWxsYmFjay5uYW1lO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSAmJiB0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5jYWxsYmFja093bmVyTmFtZX0uJHt0aGlzLmNhbGxiYWNrTmFtZX0oKWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tOYW1lICsgJygpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrT3duZXJOYW1lICsgJy5fX2xhbWJkYV9fKCknO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZV8xLlJlcGVhdGFibGVQcm9taXNlKGNhbGxiYWNrLmJpbmQodGhpc0FyZykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVsZWdhdGUgPSBEZWxlZ2F0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IERlbGVnYXRlXzEgPSByZXF1aXJlKFwiLi9EZWxlZ2F0ZVwiKTtcbi8qKlxuICogSSBjaG9zZSB0byB1c2UgQyMgc3R5bGUgZXZlbnRzLCBub3QgSlMvVFMsIGJlY2F1c2UgdGhlIEpTL1RTIHdheSBvZiBkb2luZyBkZWxlZ2F0ZXMvY3VzdG9tIGV2ZW50cyBpcyBhIE5JR0hUTUFSRS4gU3VyZSxcbiAqIEN1c3RvbUV2ZW50IHdvcmtzLCBidXQgb24gdGhlIFRTIHNpZGUgdGhlIGNvZGUgcmVxdWlyZWQgdG8gbWFrZSBUU0MgaGFwcHkgd2l0aCB2YWxpZCBqYXZhc2NyaXB0IGlzIGF3ZnVsIGFuZCBub24taW50dWl0aXZlLlxuICogT24gdGhlIEpTIHNpZGUsIHlvdSBoYXZlIHRoZSBwcm9ibGVtIHRoYXQgZXZlcnkgaGFuZGxlciBwaWNrcyBpdCB1cCwgbm90IGp1c3QgdGhlIG9uZXMgdGhhdCBhcmUgYm91bmQgdG8gdGhlIHJlbGV2YW50IEhUTUxcbiAqIGVsZW1lbnQsIHNvIGVsZW1lbnRzIG5lZWQgdG8gcGFzcyB0aGUgc291cmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBjaGVjayBpdCAobGlrZSBqcXVlcnkgYW5kICQoZG9jdW1lbnQpLm9uKCkpLlxuICpcbiAqIEFmdGVyIGdldHRpbmcgaXQgd29ya2luZywgYWxsIEkgY291bGQgdGhpbmsgYWJvdXQgd2FzIGhvdyBiYWQgdGhlIGNvZGUgd2FzLCBzbyBJIHJld3JvdGUgaXQgYXZvaWRpbmcgdGhlIEpTIHBhdHRlcm4gZW50aXJlbHkuXG4gKlxuICogVGhpcyBjYW4gYmUgc3luY2hyb25vdXMgKGNhbGxiYWNrcykgb3IgYXN5bmNocm9ub3VzIChwcm9taXNlcykuICBXaGVuIGl0IGlzIGFzeW5jLCB0aGUgY29kZSBleGVjdXRlcyBhZnRlciB0aGUgY3VycmVudCBzeW5jaHJvbm91c1xuICogZXZlbnRzIHJ1biB0byBjb21wbGV0aW9uLiBUaGlzIGNvdWxkIGNyZWF0ZSBidWdzIGluIHN5bmNocm9ub3VzIGNvZGUsIGJ1dCBpcyBiZXN0IGZvciBicm93c2VyIGV2ZW50cy4gVGhpcyBoYW5kbGVyIGlzIHByaW1hcmlseSB1c2VkIGZvclxuICogYnJvd3NlciBldmVudHMsIHNvIGFzeW5jIGlzIGRlZmF1bHQuXG4gKlxuICogQnV0IGlmIHlvdSdyZSB0cmlnZ2VyaW5nIGFzeW5jIGV2ZW50cyBpbiBjb2RlIGFuZCBzdGVwcGluZyB0aHJvdWdoIGl0IGluIENocm9tZSwgd2hhdCB5b3Ugc2VlIHdvbid0IG1ha2Ugc2Vuc2UsIGJlY2F1c2UgdGhlIGFzeW5jXG4gKiBldmVudHMgd29uJ3Qgb2NjdXIgdW50aWwgcmlnaHQgYXdheS4gSXQgY2FuIGJlIGhhcmQgdG8gdHJvdWJsZXNob290LlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9kaXNhYmxlQXN5bmMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlQXN5bmMgPSBfZGlzYWJsZUFzeW5jO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJZiB0aGlzIHJlY2VpdmVzIGEgZGVsZWdhdGUgKHdoaWNoIGlzIGFuIGFycmF5IG9mIGRlbGVnYXRlcyksIGFkZCBpdC5cbiAgICAgICAgLy8gV2hlbiB0aGlzIGlzIGludm9rZWQsIHRoYXQgZGVsZWdhdGUgd2lsbCBhbHNvIGJlIGludm9rZWQuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgX292cjFfZGVsZWdhdGUuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR290IGEgc2luZ2xlIGNhbGxiYWNrXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2FsbGJhY2suXG4gICAgICAgIGlmICh0aGlzLmZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaDogdHJ1ZSB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEZWxlID0gbmV3IERlbGVnYXRlXzEuRGVsZWdhdGUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2gobmV3RGVsZSk7XG4gICAgICAgIC8vIElGIHRoaXMgaXMgYXN5bmNocm9ub3VzLCByZXR1cm4gdGhlIHByb21pc2Ugc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gICAgICAgIC8vIENoYWluaW5nIHdvbid0IHdvcmsgb24gc3luYyBjb2RlLCBzbyBkbyBub3QgaW4gdGhhdCBjYXNlLlxuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ld0RlbGUucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9kZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmZpbmQocSA9PiBxID09PSBkZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiAhQXJyYXkuaXNBcnJheShxKSAmJiBxLmNhbGxiYWNrID09PSBjYWxsYmFjayk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVMaXN0ZW5lcihzZW5kZXIpIHtcbiAgICAgICAgLy8gRmlyc3QgdHJ5IHRvIHVuc3Vic2NyaWJlIHRoZSBkZWZhdWx0IGRlbGVnYXRlLiBDYW4ndCBkbyBhbnl0aGluZyBpZiBpdCBoYXMgYSBkaWZmZXJlbnQgbmFtZSwgdGhvdWdoLlxuICAgICAgICBpZiAoXCJkZWxlZ2F0ZVwiIGluIHNlbmRlcikge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZURlbGVnYXRlKHNlbmRlci5kZWxlZ2F0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gIUFycmF5LmlzQXJyYXkocSkgJiYgcS50aGlzQXJnID09PSBzZW5kZXIpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+IHEgPT09IGRlbGVnYXRlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZShhcmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBBc3luYyB2ZXJzaW9uLiBEb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCB0aGUgY2hyb21lIGRlYnVnZ2VyLlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIudGhpc0FyZywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoIH0gPSB7fSkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoKGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICBmdW5jdGlvbiBtYXRjaChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTsgLy8gQ2xlYXJzIHRoZSBkZWxlZ2F0ZVxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdW5kZWZpbmVkOyAvLyBNYWtlcyBzdXJlIHRoaXMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEV2ZW50IGFyZ3VtZW50cyBleHBlY3RlZCBvbiBhbnkgQ2hhbmdlIGV2ZW50LlxuICovXG5jbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIGNoYW5nZSBvcGVyYXRpb24gKHNldCwgZGVsZXRlKSAocG90ZW50aWFsbHkgbWV0aG9kKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgbmV3YWJsZS5cbiAqIFRISVMgQ0FOTk9UIERFVEVDVCBBTk9OWU1PVVMgQ0xBU1NFUy4gU29ycnksIGJ1dCBKUyBkb2Vzbid0IGhhdmUgYSBub24tZGVzdHJ1Y3RpdmUgd2F5XG4gKiB0byBjaGVjayBpZiBhbnkgZnVuY3Rpb24gaXMgYSBjb25zdHJ1Y3RvciBvdGhlciB0aGFuIHRvIHRyeSB0byBuZXcoKSBpdCBhbmQgYmxvdyB1cC9ub3QgYmxvdyB1cC5cbiAqIFRoaXMgZnVuY3Rpb24gZGVwZW5kcyBvbiB0aGVyZSBiZWluZyBhIHByb3RvdHlwZSB3aXRoIGEgbmFtZWQgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yVHlwZUd1YXJkKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLnByb3RvdHlwZSAmJiBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5leHBvcnRzLmNvbnN0cnVjdG9yVHlwZUd1YXJkID0gY29uc3RydWN0b3JUeXBlR3VhcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBrZXl3b3JkIGFyZ3VtZW50cywgYXMgc2VlbiBpbiBQeXRob24gYW5kIEMjLiBJdCBtYWtlcyBjb25maWd1cmFibGVcbiAqIGZ1bmN0aW9ucyBzbyBtdWNoIHF1aWNrZXIgYW5kIGVhc2llciB0aGFuIGZsYXQgYXJndW1lbnRzIChmb3JjaW5nIHlvdSB0byBwdXQgdW5kZWZpbmVkIG1hbnVhbGx5IGluIGRpZmZlcmVudFxuICogc2xvdHMpIG9yIG9wdGlvbnMgb2JqZWN0cyAodGFrZXMgbW9yZSB0aW1lIHRvIHByb2R1Y2UsIGVzcGVjaWFsbHkgaWYgeW91IG5lZWQgdG8gbmV3IGl0IHVwKS5cbiAqXG4gKiBDYWxsIGZ1bmN0aW9ucyBoYXZpbmcga2V5d29yZCBhcmd1bWVudHMgdXNpbmcgdGhpcyBzeW50YXg6XG4gKiBjYWxsbWUoYXJnMSwgYXJnMiwga3coJ3NvbWV0aGluZycsIGt3MSksIGt3KCdzb21ldGhpbmdFbHNlJywga3cyKSlcbiAqXG4gKiBUbyBtYWtlIHRoZW0gd29yaywgaW4gdGhlIGZ1bmN0aW9uIGl0c2VsZiwgeW91IG5lZWQgdG8gY29weSBhbmQgcGFzdGUuIEZvciBleGFtcGxlOlxuICogKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0gPSBLd2FyZy5wYXJzZSh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9KSk7XG4gKi9cbmNsYXNzIEt3YXJnIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIGlmICghYSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGE7XG4gICAgICAgIHRoaXMudmFsdWUgPSBiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1lbWJlciB0aGlzIHRlbXBsYXRlOlxuICAgICAqICh7IH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9KSk7XG4gICAgICogSW5jbHVkZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgZmlyc3Qgb2JqZWN0LCBub3QgdGhlIHNlY29uZC5cbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IHRvIGNhcHR1cmUgcmVzdCBwYXJhbWV0ZXJzLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkcmVzdCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7ICwgLi4ucmVzdCB9KSk7XG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCBhbGxvd1Vua25vd25LZXl3b3JkIHRvIGJlIHRydWUsIHVzZSB0aGlzOlxuICAgICAqICh7ICQka3ckJCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSwgdHJ1ZSkpO1xuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUFyZ3MoYXJncywgYWxsb3dVbmtub3duS2V5d29yZCA9IGZhbHNlKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgdGhpcyBjb3VsZCB0YWtlIHRoZSBhcmd1bWVudHMgb2JqZWN0LCBidXQgc2FkbHkgYXJndW1lbnRzIHN0b3JlcyBvbmx5IGFuIGFycmF5IG9mIHZhbHVlcyxcbiAgICAgICAgLy8gbm8ga2V5cy4gSWYgSlMgd2VyZSBzYW5lLCBpdCB3b3VsZCBiZSBhIE1hcCwgbm90IGFuIGFycmF5LiBUd28gc3RlcHMgZm9yd2FyZCwgb25lIHN0ZXAgYmFjay5cbiAgICAgICAgLy8gUGFyc2luZyB0aGUgc3RyaW5nIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvbiBpcyBub3QgbXkgY3VwIG9mIHRlYSwgc28ganVzdCBuby5cbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncyk7XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGFyZ3VtZW50IG9yZGVyXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gYXJnc1thcmddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGt3dmFyID0ge307XG4gICAgICAgIG9ialsnJCRrdyQkJ10gPSBrd3ZhcjtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJlc3QgcGFyYW1ldGVycy5cbiAgICAgICAgLy8gSSB3YXMgZ29pbmcgdG8gaGF2ZSB0aGlzIG9uL29mZiBjb25maWd1cmFibGUsIGJ1dCBpdCBzaG91bGRuJ3QgaHVydCBwZXJmb3JtYW5jZS5cbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIG9ialsnJHJlc3QkJ10gPSBhcnI7XG4gICAgICAgIC8vIFJlc3QgcGFyYW1ldGVycyBhcmUgc3RvcmVkIGFzIGFycmF5IGtleXMsIHsgJzAnOiBhLCAnMSc6IGIsICdub25SZXN0JzogJ3NvbWV0aGluZyBlbHNlJ31cbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykuZmlsdGVyKGYgPT4gSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoZikpKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcmdzW2FyZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXdvcmRzVXNlZCA9IHt9O1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBrZXl3b3JkIG5hbWVcbiAgICAgICAgLy8gSGF2ZSB0byBpdGVyYXRlIHRoZSBsaXN0IHR3aWNlLCB0byBhdm9pZCB3aXBpbmcgb3V0IGRhdGEgaWYgdGhlIG9yZGVyIGlzIHN3YXBwZWRcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dVbmtub3duS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga3d2YXJbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgYW4gdW5leHBlY3RlZCBrZXl3b3JkIGFyZ3VtZW50ICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4ga2V5d29yZHNVc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IG11bHRpcGxlIHZhbHVlcyBmb3Iga2V5d29yZCBhcmd1bWVudCArICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5d29yZHNVc2VkW3RtcC5uYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgLy8gVHVybiBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXl3b3JkIGFyZ3VtZW50cy5cbiAgICAvLyBOZWVkcyB0byByZXR1cm4gYW55W10gYmVjYXVzZSBpdCdzIGdvaW5nIHRvIGJlIHNob3ZlZCBpbnRvIGFyYml0cmFyeSBhcmd1bWVudCBsaXN0c1xuICAgIHN0YXRpYyB1bnBhY2soYXJncykge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goa3coYXJnLCBhcmdzW2FyZ10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgaXNNYXRjaChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSA9PT0ga2V5O1xuICAgIH1cbn1cbmV4cG9ydHMuS3dhcmcgPSBLd2FyZztcbmZ1bmN0aW9uIGt3KGEsIGIpIHtcbiAgICBpZiAoIWEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDFcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhLCBiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgICAvLyBPdmVybG9hZCAyXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYVswXSwgYVsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdmVybG9hZCAzXG4gICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyLlxuICAgICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpO1xuICAgICAgICBpZiAoIXByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwIG9iamVjdDogbXVsdGlwbGUga2V5cycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcocHJvcHNbMF0sIGFbcHJvcHNbMF1dKTtcbiAgICB9XG59XG5leHBvcnRzLmt3ID0ga3c7XG5mdW5jdGlvbiBrd2FyZ3NUb09iamVjdChhcnIpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJyKSB7XG4gICAgICAgIG9wdGlvbnNbYXJnLm5hbWVdID0gb3B0aW9uc1thcmcudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbmV4cG9ydHMua3dhcmdzVG9PYmplY3QgPSBrd2FyZ3NUb09iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNOb25lKHRlc3QpIHtcbiAgICByZXR1cm4gKHRlc3QgPT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5pc05vbmUgPSBpc05vbmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNsb25lRGVlcChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKSB7XG4gICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajsgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgfVxuICAgIGlmIChoYXNoLmhhcyhvYmopKSB7XG4gICAgICAgIHJldHVybiBoYXNoLmdldChvYmopOyAvLyByZWZlcmVuY2UgdG8gb2JqZWN0IHByZXZpb3VzbHkgc2VlblxuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgdmFsID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIChba2V5LCB2YWxdKSA9PiByZXN1bHQuYWRkKGNsb25lRGVlcChrZXksIGhhc2gpLCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhd2Z1bCBjb2RlLCBidXQgaXQncyB0aGUgb25seSB3YXkgdG8gY2xvbmUgYSBzdGFuZGFsb25lIGZ1bmN0aW9uICh2cyBhIG1ldGhvZCB3aGljaCBoYXMgYSBkZXNjcmlwdG9yKS5cbiAgICAgICAgLy8gSW4gZ2VuZXJhbCwgeW91IHByb2JhYmx5IGRvbid0IHdhbnQgdG8gdXNlIGNsb25lRGVlcCBvbiBmdW5jdGlvbnMuIFlvdSdsbCBzZWUgaXQncyBOT1QgdXNlZCBvbiBpbnRlcm5hbCBtZXRob2RzLlxuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgb2JqLnRvU3RyaW5nKCkpKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaGFzaC5zZXQob2JqLCByZXN1bHQpOyAvLyBLZWVwIHRyYWNrIG9mIG9iamVjdHMgcHJldmlvdXNseSBjbG9uZWRcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIShrZXkgaW4gcmVzdWx0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIG1ldGhvZHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHByb3RvdHlwZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCByZWN1cnNpdmVseSBmb2xsb3cgYmVjYXVzZSB0aGVyZSdzIG5vdGhpbmcgcmVjdXJzaXZlIHRvIGRvLlxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGhhc2guc2V0KG9ialtrZXldLCByZXN1bHRba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBtZXRob2QuXG4gICAgICAgICAgICAgICAgLy8gSWYgZXh0cmEga2V5cyBhcmUgdGhyb3duIG9udG8gYSBmdW5jdGlvbiwgdGhleSBwcm9iYWJseSB3aWxsIG5vdCBiZSBjbG9uZWQuXG4gICAgICAgICAgICAgICAgLy8gSW4gbXkgZXhwZXJpZW5jZSwgZXh0cmEga2V5cyBvbiBmdW5jdGlvbnMgZGlkbid0IHdvcmsgcmlnaHQsIHNvIG5vIGJpZyBsb3NzLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBnZXR0ZXJzL3NldHRlcnMuIFRoZXNlIGFyZSBsb2NhbCBhbmQgaG9wZWZ1bGx5IHdvcmsganVzdCBsaWtlIG1ldGhvZHMuXG4gICAgICAgICAgICAvLyBJbiBtYW55IGNhc2VzLCB0aGlzIGlzIHJlZHVuZGFudCB3aXRoIE9iamVjdC5jcmVhdGUoKSwgYnV0IGlzIG5lY2Vzc2FyeSB0byBhbGxvdyBvYmplY3RzIHdpdGggbWFudWFsbHktYWRkZWQgY3VzdG9tIGdldHRlcnMuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBnZXR0ZXIvc2V0dGVyLlxuICAgICAgICAgICAgLy8gQUxTTyBoYXNoIG5vdCB1cGRhdGVkOyB0aGlzIGlzIG5vdCBwb3NzaWJsZSwgYmVjYXVzZSBpdCB3aWxsIG1hcCB0aGUgdmFsdWUgaXQgZ2V0cywgbm90IHRoZSBnZXR0ZXIuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lRGVlcChvYmpba2V5XSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJIGRvbid0IGtub3cgZm9yIHN1cmUgaWYgdGhpcyB3aWxsIHdvcmsgaW4gYWxsIGNhc2VzLlxuLy8gSXQgZ2V0cyBkZWVwZXIgaW50byB0aGUgZ3V0cyBvZiBKUyBvYmplY3QgdGhhbiBJIGhhdmUgZXhwZXJpZW5jZSB3aXRoLlxuZnVuY3Rpb24gY2xvbmVPYmplY3Qob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVPYmplY3QgPSBjbG9uZU9iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbi8qKlxuICogQSBwc2V1ZG8tcmFuZG9tIHByZWZpeCBwbHVzIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSB0aGUgdW5peCBlcG9jaC4gVGhlIHJhbmRvbSBwYXJ0IHNob3VsZCBiZSByYW5kb20gZW5vdWdoIHRvIGNvdmVyXG4gKiBtdWx0aXBsZSBpZHMgY3JlYXRlZCBpbiBhIG1pbGxpc2Vjb25kLlxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWVJZCgpIHtcbiAgICBjb25zdCBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWi1fJztcbiAgICBsZXQgcmVzdWx0ID0gJ3UnICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArICctJztcbiAgICBmb3IgKGNvbnN0IF8gb2YgQXJyYXlVdGlsaXRpZXNfMS5yYW5nZSg4KSkge1xuICAgICAgICByZXN1bHQgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5nZXRVbmlxdWVJZCA9IGdldFVuaXF1ZUlkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRlbGwgaWYgYSBnaXZlbiBzdHJpbmcgaXMgYSBwb3NpdGl2ZSBpbnRlZ2VyLlxuICogVXNlIGZvciBkZXRlY3RpbmcgYXJyYXkga2V5cy5cbiAqL1xuZnVuY3Rpb24gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RyID09PSAnMCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvXlsxLTldXFxkKiQvLnRlc3Qoc3RyKTtcbn1cbmV4cG9ydHMuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcgPSBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJIGRvbid0IGtub3cgaG93IGFjY3VyYXRlIHRoaXMgaXMgYnV0IGl0IHNlZW1zIHByZXR0eSBnb29kXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qob2JqKSAhPT0gb2JqO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDbG9uZU9iamVjdF8xID0gcmVxdWlyZShcIi4vQ2xvbmVPYmplY3RcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBPYmplY3QuYXNzaWduKCkgY2FuIGJlIHVzZWQgZm9yIHNpbXBsZSBjb3BpZXMgb2YgcHJvcGVydGllcywgYnV0IGl0IG1pc3NlcyBnZXR0ZXJzLFxuICogc2V0dGVycywgYW5kIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJdCBvbmx5IGdldHMgdGhlIGxvY2FsIHZhbHVlcy5cbiAqXG4gKiBUaGlzIHNob3VsZCBob3BlZnVsbHkgcmVzb2x2ZSB0aGF0LCBidXQgSSBkb24ndCBrbm93IGZvciBzdXJlLiBUaGlzIGlzIHZlcnkgc2tldGNoeS5cbiAqIFRoZSByZXN1bHRzIGFyZSBjb21wbGV0ZWx5IGZsYXQsIGJlY2F1c2UgeW91IGNhbid0IGhhdmUgbXVsdGlwbGUgaW5oZXJpdGFuY2UgaGllcmFyY2h5XG4gKiBpbiBhIGxhbmd1YWdlIHdpdGhvdXQgbXVsdGlwbGUgaW5oZXJpdGFuY2UuIEJlY2F1c2UgdGhpcyBmbGF0dGVucyBvYmplY3RzLCBpdCBpcyBndWFyYW50ZWVkXG4gKiB0byBicmVhayBhbnl0aGluZyB0aGF0IG1ha2VzIHN1cGVyIGNhbGxzLlxuICpcbiAqIElmIHJldHVybkNsb25lIGlzIHRydWUsIGEgY2xvbmUgb2YgdGhlIHRhcmdldCBvYmplY3Qgd2lsbCBiZSBtb2RpZmllZCBhbmQgcmV0dXJuZWQsIGxlYXZpbmdcbiAqIHRoZSBvcmlnaW5hbCB1bnRvdWNoZWQuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEZ1bGxBc3NpZ24odGFyZ2V0LCBzb3VyY2UsIHJldHVybkNsb25lID0gZmFsc2UpIHtcbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgaWYgKHJldHVybkNsb25lKSB7XG4gICAgICAgIHRhcmdldCA9IENsb25lT2JqZWN0XzEuY2xvbmVPYmplY3QodGFyZ2V0KTtcbiAgICB9XG4gICAgY29uc3QgbmFtZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZmluZFRoZVByb3BlcnR5TmFtZXMoc291cmNlKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIG5hbWVzKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgICBmdW5jdGlvbiBmaW5kVGhlUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHJlc3VsdC5wdXNoKC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKGYgPT4gZiAhPT0gJ2NvbnN0cnVjdG9yJykpO1xuICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLmZpbmRUaGVQcm9wZXJ0eU5hbWVzKHByb3RvKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5vYmplY3RGdWxsQXNzaWduID0gb2JqZWN0RnVsbEFzc2lnbjtcbiJdfQ==
