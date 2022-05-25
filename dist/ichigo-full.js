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

},{"../src/ExtensionLoader":2,"../src/Html/CreateElement":6,"../src/Html/DeleteNodeContent":7,"../src/Html/EscapeHtml":9,"../src/Html/ExtractNodeContent":10,"../src/Html/FindIndexInParent":11,"../src/Html/FormFieldValue":12,"../src/Html/QuerySelectorNodeList":13,"../src/Html/ValidateUniqueDomIds":14,"../src/HtmlComponent/BoundComponent":15,"../src/HtmlComponent/Component":16,"../src/HtmlComponent/ComponentMap":17,"../src/Observable/ObservableAssign":24,"../src/Observable/ObservableProperty":26,"../src/Observable/ObservableProxy":27,"../src/Observable/ObservableState":28,"../src/Router/PageRouter":29,"../src/System/Async/DeferredPromise":30,"../src/System/Async/Delay":31,"../src/System/Async/RepeatablePromise":32,"../src/System/Collections/ArrayUtilities":33,"../src/System/Collections/OrderBy":34,"../src/System/EventHandler/ArrayChangedEventArgs":35,"../src/System/EventHandler/EventHandler":37,"../src/System/EventHandler/PropertyChangedEventArgs":38,"../src/System/Types/KeywordArguments":40,"../src/System/Types/NoneType":41,"../src/System/Utility/CloneDeep":42,"../src/System/Utility/CloneObject":43,"../src/System/Utility/GetUniqueId":45,"../src/System/Utility/IsInteger":46,"../src/System/Utility/ObjectFullAssign":48}],2:[function(require,module,exports){
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
const Elvis_1 = require("../System/Utility/Elvis");
/**
 * A super-basic component that allows configuration of data-binding functions using specially-named HTML attributes, as in Angular
 * or Vue.
 */
class BoundComponent extends Component_1.Component {
    constructor(viewModel, args) {
        super(args);
        this.paused = false;
        this._attributeBindings = [];
        this._writeTargets = []; // Can only write to THIS component
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
        this._id = this.content.id;
        // Defined the default component class for the default loopPostProcess() method
        if (options.loopItemClass) {
            if (!Constructable_1.constructorTypeGuard(options.loopItemClass)) {
                throw new Error('loopItemClass is not a constructor');
            }
            if (!(options.loopItemClass instanceof BoundComponent.constructor)) {
                throw new Error('loopItemClass is not an bound component');
            }
        }
        this.loopParent = options.loopParent; // undefined in most cases
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
                const target = this[bind.slice(5)];
                writeValue(target, () => this[bind.slice(5)] = value, this);
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
            else if (bind.startsWith('^') && Elvis_1.e_(this.loopParent).viewModel && typeof this.loopParent.viewModel === 'object') {
                // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
                // an object or an iterable, not really something you'll read or write to directly.
                // Might do a shortcut to the parent component's 'this'
                writeToViewModelObject(this.loopParent, bind.slice(1));
            }
            else if (typeof this.viewModel === 'object') {
                writeToViewModelObject(this, bind);
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
        function writeToViewModelObject(comp, property) {
            if (ObservableState_1.observableStateCheck(comp.viewModel)) {
                // With observable state, we need to get the state, update it, and write the whole thing back.
                // While it is possible to update a single property in some cases, it doesn't allow reuse of already-working code.
                const tmp = comp.viewModel.value;
                const target = tmp[property];
                writeValue(target, () => tmp[property] = value, tmp);
                comp.viewModel.value = tmp;
            }
            else {
                const target = comp.viewModel[property];
                writeValue(target, () => comp.viewModel[property] = value, comp.viewModel);
            }
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
        // If we pause rendering, then nothing happens.
        if (this.paused) {
            return this;
        }
        // See if we need to defer rendering until after initialization
        if (this._defer && !this._initialized) {
            return this;
        }
        for (const item of this._attributeBindings) {
            if (item.bool) {
                // For boolean attributes, the very existence of the attribute means it is considered to be true.
                let val = this._getUntypedValue(item.source, item.otherComponentId);
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
                this.content.setAttribute(item.attribute, this._getStringValue(item.source, false, item.otherComponentId) || '');
            }
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
            }
            else {
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
            let val = this._getUntypedValue(this._cssDisplay.source, this._cssDisplay.otherComponentId);
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
                relatedComponentId = repl.dataset.component || '';
            }
            // If component is specified, this component must have that as an id
            if (this._id && relatedComponentId && relatedComponentId.toLowerCase() !== this._id.toLowerCase()) {
                continue;
            }
            const noescape = repl.hasAttribute('noescape') && repl.getAttribute('noescape') !== 'false';
            const otherComponentId = repl.getAttribute('i5_source') || repl.getAttribute('source') || repl.dataset.i5_source || repl.dataset.source || repl.getAttribute(':source');
            this._replacements.push({
                element: repl,
                source: repl.innerHTML,
                noescape: noescape,
                otherComponentId: otherComponentId || undefined
            });
        }
        // In the original build of the object, f any replacements start with "this." we need to defer.
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
    setLoop(source = '.', fragment, skipPostProcess = false, update = false, otherComponentId) {
        if (!source || !fragment) {
            throw new Error('Invalid arguments');
        }
        if (typeof fragment === 'string') {
            fragment = CreateElement_1.createFragment(fragment);
        }
        this._loop = { source, postProcess: !skipPostProcess, fragment, otherComponentId };
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
    setValueAttribute(source = '.', update = false, otherComponentId) {
        this._valueAttribute = { source, otherComponentId };
        if (update) {
            this.render();
        }
        return this;
    }
    setVisibility(source = '.', negative = false, update = false, otherComponentId) {
        if (!source) {
            this._cssDisplay = undefined;
        }
        else {
            this._cssDisplay = { source, negative, otherComponentId };
        }
        if (update) {
            this.render();
        }
        return this;
    }
    addAttributeMapping(attribute, source = '.', update = false, otherComponentId) {
        if (!source || !attribute) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._attributeBindings.find(f => f.attribute === attribute)) {
            this._attributeBindings.push({ attribute, source, bool: false, negative: false, otherComponentId });
        }
        if (update) {
            this.render();
        }
        return this;
    }
    addBooleanAttributeMapping(attribute, source = '.', negative = false, update = false, otherComponentId) {
        if (!source || !attribute) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._attributeBindings.find(f => f.attribute === attribute)) {
            this._attributeBindings.push({ attribute, source, bool: true, negative, otherComponentId });
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
    setCssClass(cls = '.', update = false, otherComponentId) {
        this._cssClasses = { cssClass: cls, otherComponentId };
        if (update) {
            this.render();
        }
        return this;
    }
    setCssStyle(style = '.', update = false, otherComponentId) {
        this._cssStyle = { style, otherComponentId };
        if (update) {
            this.render();
        }
        return this;
    }
    addCssClassSwitch(cls, source = '.', negative = false, update = false, otherComponentId) {
        if (!cls || !source) {
            throw new Error('Invalid arguments');
        }
        // Don't bind a single property to multiple things
        if (!this._cssClassSwitches.find(f => f.class === cls)) {
            this._cssClassSwitches.push({ class: cls, source, negative, otherComponentId });
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
        if (!addedContent.length) {
            return;
        }
        // If the typescript part of the following were important, this would be a problem
        // if this were a derived class.
        const thisclass = this;
        const nodes = QuerySelectorNodeList_1.nodeListSelectorAll(addedContent, '[i5_item], [\\00003Aitem], [data-i5_item]');
        // If no i5_item matches, then grab the first element.
        if (!nodes.length) {
            const firstNode = QuerySelectorNodeList_1.nodeListSelector(addedContent, '*');
            if (firstNode) {
                nodes.push(firstNode);
            }
        }
        if (!nodes.length) {
            return;
        }
        this._loopItemClass.injectBind(row, nodes, {
            replace: false,
            loopParent: this,
            async: this._async
        });
    }
    _getStringValue(name, skipEscape = false, sourceComponentId) {
        const value = this._getUntypedValue(name, sourceComponentId);
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
    _getUntypedValue(name, sourceComponentId) {
        let component = this;
        let source;
        if (sourceComponentId) {
            component = ComponentMap_1.getComponent(sourceComponentId) || component;
        }
        // I'm pretty sure this is being validated during construction but be safe
        if (!name) {
            return;
        }
        let thisArg = component.viewModel;
        // If VM is a state, get the current state value.
        if (ObservableState_1.observableStateCheck(thisArg)) {
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
            source = component[name];
        }
        else if (name.startsWith('^') && Elvis_1.e_(component.loopParent).viewModel && typeof Elvis_1.e_(component.loopParent).viewModel === 'object') {
            // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
            // an object or an iterable, not really something you'll read or write to directly.
            // Might do a shortcut to the parent component's 'this'
            thisArg = component.loopParent.viewModel;
            if (!(name.slice(1) in thisArg)) {
                // tslint:disable-next-line:no-console
                console.warn(`${name} does not exist on viewModel parent view model.`);
                return {};
            }
            source = thisArg[name.slice(1)];
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
            const newValue = this._getStringValue(repl.source, repl.noescape, repl.otherComponentId) || '';
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
        // Get the alternate source Id
        const otherComponentId = Elvis_1.e_(currentAttributes.find(f => f.name === 'i5_source' || f.name === ':source')).value;
        let textHtmlSet = false;
        for (const prop of currentAttributes) {
            const type = this._parseAttributeName(prop.name);
            let negative = false;
            // Regular attributes will all match this.
            if (!type) {
                continue;
            }
            switch (type.type) {
                case "boolNegative":
                    negative = true;
                // fall through
                case "bool":
                    if (!type.detail) {
                        throw new Error('Programming error');
                    }
                    this.addBooleanAttributeMapping(type.detail, prop.value, negative, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "attr":
                    if (!type.detail) {
                        throw new Error('Programming error');
                    }
                    this.addAttributeMapping(type.detail, prop.value, false, otherComponentId);
                    deferIfNeeded.call(this);
                    break;
                case "switchClassNegative":
                    negative = true;
                // fall through
                case "switchClass":
                    if (!type.detail) {
                        throw new Error('Programming error');
                    }
                    this.addCssClassSwitch(type.detail, prop.value, negative, false, otherComponentId);
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
                    }
                    else if (type.detail) {
                        this.setValueAttribute(prop.value, false);
                    }
                case "target":
                    this.addWriteTarget(prop.value, false);
                    deferIfNeeded.call(this);
                    break;
                case "loop":
                    // Grab the base content for the loop, pulling it out of the DOM.
                    this.setLoop(prop.value, ExtractNodeContent_1.extractNodeContent(this.content), type.detail === 'null', false, otherComponentId);
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
        if (name === 'i5_item') {
            // This is used to indicate an item component, nothing else.
            return;
        }
        else if (name === 'i5_source') {
            // This is used to indicate a source component. It's read separately.
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

},{"../Html/CreateElement":6,"../Html/ElementType":8,"../Html/EscapeHtml":9,"../Html/ExtractNodeContent":10,"../Html/FormFieldValue":12,"../Html/QuerySelectorNodeList":13,"../Observable/IObservable":19,"../Observable/ObservableProperty":26,"../Observable/ObservableState":28,"../System/Types/Constructable":39,"../System/Types/KeywordArguments":40,"../System/Types/NoneType":41,"../System/Utility/Elvis":44,"./Component":16,"./ComponentMap":17}],16:[function(require,module,exports){
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

},{"../Html/CreateElement":6,"../Html/ElementType":8,"../Html/FormFieldValue":12,"../Html/QuerySelectorNodeList":13,"../System/Types/KeywordArguments":40,"../System/Utility/GetUniqueId":45,"./ComponentMap":17}],17:[function(require,module,exports){
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

},{"../../System/EventHandler/ArrayChangedEventArgs":35,"../../System/Utility/ObjectFullAssign":48,"../ObservableBase":25}],21:[function(require,module,exports){
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

},{"../../System/Utility/IsInteger":46}],22:[function(require,module,exports){
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

},{"../../System/EventHandler/PropertyChangedEventArgs":38,"../../System/Utility/ObjectFullAssign":48,"../ObservableBase":25}],23:[function(require,module,exports){
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

},{"../Html/EscapeHtml":9,"../System/EventHandler/PropertyChangedEventArgs":38,"../System/Types/NoneType":41,"../System/Utility/IsPrimitive":47,"./IObservable":19,"./ObservableBase":25}],27:[function(require,module,exports){
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
        // The Readonly type works fine and it's fast ... in typescript.
        // In javascript, if you just return the value, nothing prevents it from being edited.
        return CloneDeep_1.cloneDeep(this.value);
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

},{"../Html/EscapeHtml":9,"../System/EventHandler/PropertyChangedEventArgs":38,"../System/Types/NoneType":41,"../System/Utility/CloneDeep":42,"../System/Utility/IsPrimitive":47,"./IObservable":19,"./ObservableBase":25}],29:[function(require,module,exports){
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
        let i = 0;
        while (i < this.delegate.length) {
            const q = this.delegate[i];
            if (!Array.isArray(q) && q.callback === callback) {
                this.delegate.splice(i, 1);
                continue;
            }
            i++;
        }
    }
    unsubscribeListener(sender) {
        // First try to unsubscribe the default delegate. Can't do anything if it has a different name, though.
        if ("delegate" in sender) {
            this.unsubscribeDelegate(sender.delegate);
        }
        // Only searches non-delegates
        let i = 0;
        while (i < this.delegate.length) {
            const q = this.delegate[i];
            if (!Array.isArray(q) && q.thisArg === sender) {
                this.delegate.splice(i, 1);
                continue;
            }
            i++;
        }
    }
    unsubscribeDelegate(delegate) {
        let i = 0;
        while (i < this.delegate.length) {
            const q = this.delegate[i];
            if (q === delegate) {
                this.delegate.splice(i, 1);
                continue;
            }
            i++;
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

},{"../Utility/IsInteger":46}],41:[function(require,module,exports){
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
const NoneType_1 = require("../Types/NoneType");
/**
 * Recent Typescript has added a null coalescing operator (?., aka the Elvis operator) but NPM issues
 * prevent me from upgrading.  But this returns undefined if you access anything that doesn't exist.
 *
 * Naturally this breaks VSCode intellisense, because it returns any. Only MS can do keep the right type.
 *
 * If you do return a partial version of the type, TS throws an error because it could be missing (umm... that's what Partial means...).
 *
 * A true elvis operator would also work on strings/numbers/etc. This cannot do that, because JS can't tell the difference between a
 * null string and a null object. Null is null.
 */
function e_(item) {
    if (NoneType_1.isNone(item)) {
        return {};
    }
    return item;
}
exports.e_ = e_;

},{"../Types/NoneType":41}],45:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":33}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I don't know how accurate this is but it seems pretty good
 */
function isPrimitive(obj) {
    return Object(obj) !== obj;
}
exports.isPrimitive = isPrimitive;

},{}],48:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9GdWxsLmpzIiwic3JjL0V4dGVuc2lvbkxvYWRlci5qcyIsInNyYy9FeHRlbnNpb25zL0NvbXBvbmVudEV4dGVuc2lvbnMuanMiLCJzcmMvRXh0ZW5zaW9ucy9FbGVtZW50RXh0ZW5zaW9ucy5qcyIsInNyYy9FeHRlbnNpb25zL09ic2VydmFibGVFeHRlbnNpb25zLmpzIiwic3JjL0h0bWwvQ3JlYXRlRWxlbWVudC5qcyIsInNyYy9IdG1sL0RlbGV0ZU5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRmluZEluZGV4SW5QYXJlbnQuanMiLCJzcmMvSHRtbC9Gb3JtRmllbGRWYWx1ZS5qcyIsInNyYy9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdC5qcyIsInNyYy9IdG1sL1ZhbGlkYXRlVW5pcXVlRG9tSWRzLmpzIiwic3JjL0h0bWxDb21wb25lbnQvQm91bmRDb21wb25lbnQuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnQuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRNYXAuanMiLCJzcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lDb21wb25lbnRCaW5kaW5nT3B0aW9ucy5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXIuanMiLCJzcmMvT2JzZXJ2YWJsZS9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnbi5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVCYXNlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3h5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlLmpzIiwic3JjL1JvdXRlci9QYWdlUm91dGVyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlbGF5LmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnkuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lT2JqZWN0LmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0VsdmlzLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZS5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xucmVxdWlyZShcIi4uL3NyYy9FeHRlbnNpb25Mb2FkZXJcIik7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IERlbGV0ZU5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvRGVsZXRlTm9kZUNvbnRlbnRcIik7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0V4dHJhY3ROb2RlQ29udGVudFwiKTtcbmNvbnN0IEZpbmRJbmRleEluUGFyZW50XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvRmluZEluZGV4SW5QYXJlbnRcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL3NyYy9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWwvUXVlcnlTZWxlY3Rvck5vZGVMaXN0XCIpO1xuY29uc3QgVmFsaWRhdGVVbmlxdWVEb21JZHNfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbC9WYWxpZGF0ZVVuaXF1ZURvbUlkc1wiKTtcbmNvbnN0IEJvdW5kQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vc3JjL0h0bWxDb21wb25lbnQvQm91bmRDb21wb25lbnRcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuLi9zcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRNYXBcIik7XG5jb25zdCBPYnNlcnZhYmxlQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vc3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnblwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm94eV8xID0gcmVxdWlyZShcIi4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm94eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZVwiKTtcbmNvbnN0IFBhZ2VSb3V0ZXJfMSA9IHJlcXVpcmUoXCIuLi9zcmMvUm91dGVyL1BhZ2VSb3V0ZXJcIik7XG5jb25zdCBEZWZlcnJlZFByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL0FzeW5jL0RlZmVycmVkUHJvbWlzZVwiKTtcbmNvbnN0IERlbGF5XzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Bc3luYy9EZWxheVwiKTtcbmNvbnN0IFJlcGVhdGFibGVQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IE9yZGVyQnlfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnlcIik7XG5jb25zdCBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgQ2xvbmVEZWVwXzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcFwiKTtcbmNvbnN0IENsb25lT2JqZWN0XzEgPSByZXF1aXJlKFwiLi4vc3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lT2JqZWN0XCIpO1xuY29uc3QgR2V0VW5pcXVlSWRfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIik7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi9zcmMvU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuY29uc3QgT2JqZWN0RnVsbEFzc2lnbl8xID0gcmVxdWlyZShcIi4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduXCIpO1xuKGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgLy8gVGhpcyBpcyBub3QgbWluaSwgYnV0IGl0IGlzIGV2ZXJ5dGhpbmcgdGhhdCdzIGluIGFueSBvZiB0aGUgbWluaS1pY2hpZ29cbiAgICAvLyBzY3JpcHRzIGNvbWJpbmVkIGludG8gb25lLiBCZWNhdXNlIHRoZXJlIGlzIGEgYml0IG9mIG92ZXJsYXAsIHRoZSBzaXplXG4gICAgLy8gaXMgbGVzcyB0aGFuIHRoZSBzaXplIG9mIGFsbCB0aGUgb3RoZXIgc2NyaXB0cyBwdXQgdG9nZXRoZXIsIElGIHlvdSB3YW50XG4gICAgLy8gZXZlcnl0aGluZy5cbiAgICAvLyBUaGlzIGFsc28gY2FuIGJlIHVzZWQgYXMgYW4gZWFzeSB0ZW1wbGF0ZSBpZiB5b3Ugd2FudCB0byBtYWtlIHlvdXIgb3duXG4gICAgLy8gYnVpbGQuIEp1c3QgZGVsZXRlIHdoYXQgeW91IGRvbid0IHdhbnQgYW5kIHJ1biB0aGUgZ3VscCBzY3JpcHRzLlxuICAgIGNvbnN0IGNvbXBvbmVudCA9IHtcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnRfMS5Db21wb25lbnQsXG4gICAgICAgIEJvdW5kQ29tcG9uZW50OiBCb3VuZENvbXBvbmVudF8xLkJvdW5kQ29tcG9uZW50LFxuICAgICAgICBDb21wb25lbnRNYXA6IENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcCxcbiAgICAgICAgZ2V0Q29tcG9uZW50OiBDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQsXG4gICAgfTtcbiAgICBjb25zdCBvYnNlcnZhYmxlID0ge1xuICAgICAgICBFdmVudEhhbmRsZXI6IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcixcbiAgICAgICAgb2JzZXJ2YWJsZUFzc2lnbjogT2JzZXJ2YWJsZUFzc2lnbl8xLm9ic2VydmFibGVBc3NpZ24sXG4gICAgICAgIE9ic2VydmFibGVQcm9wZXJ0eTogT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5LFxuICAgICAgICBPYnNlcnZhYmxlUHJveHk6IE9ic2VydmFibGVQcm94eV8xLk9ic2VydmFibGVQcm94eSxcbiAgICAgICAgT2JzZXJ2YWJsZVN0YXRlOiBPYnNlcnZhYmxlU3RhdGVfMS5PYnNlcnZhYmxlU3RhdGUsXG4gICAgICAgIEFycmF5Q2hhbmdlZEV2ZW50QXJnczogQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEuQXJyYXlDaGFuZ2VkRXZlbnRBcmdzLFxuICAgICAgICBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M6IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyxcbiAgICB9O1xuICAgIGNvbnN0IHByb21pc2UgPSB7XG4gICAgICAgIERlZmVycmVkUHJvbWlzZTogRGVmZXJyZWRQcm9taXNlXzEuRGVmZXJyZWRQcm9taXNlLFxuICAgICAgICBSZXBlYXRhYmxlUHJvbWlzZTogUmVwZWF0YWJsZVByb21pc2VfMS5SZXBlYXRhYmxlUHJvbWlzZVxuICAgIH07XG4gICAgY29uc3Qgcm91dGVyID0ge1xuICAgICAgICBQYWdlUm91dGVyOiBQYWdlUm91dGVyXzEuUGFnZVJvdXRlclxuICAgIH07XG4gICAgY29uc3QgaHRtbCA9IHtcbiAgICAgICAgYW5jaG9yOiBDcmVhdGVFbGVtZW50XzEuYW5jaG9yLFxuICAgICAgICBidXR0b246IENyZWF0ZUVsZW1lbnRfMS5idXR0b24sXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQ6IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50LFxuICAgICAgICBjcmVhdGVIdG1sOiBDcmVhdGVFbGVtZW50XzEuY3JlYXRlSHRtbCxcbiAgICAgICAgY3JlYXRlRnJhZ21lbnQ6IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVGcmFnbWVudCxcbiAgICAgICAgZGVsZXRlTm9kZUNvbnRlbnQ6IERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQsXG4gICAgICAgIGRpdjogQ3JlYXRlRWxlbWVudF8xLmRpdixcbiAgICAgICAgZXNjYXBlSHRtbDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwsXG4gICAgICAgIGV4dHJhY3ROb2RlQ29udGVudDogRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50LFxuICAgICAgICBmaW5kSW5kZXhJblBhcmVudDogRmluZEluZGV4SW5QYXJlbnRfMS5maW5kSW5kZXhJblBhcmVudCxcbiAgICAgICAgZ2V0Rm9ybUZpZWxkVmFsdWU6IEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUsXG4gICAgICAgIHBhcmFncmFwaDogQ3JlYXRlRWxlbWVudF8xLnBhcmFncmFwaCxcbiAgICAgICAgbm9kZUxpc3RTZWxlY3RvcjogUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvcixcbiAgICAgICAgbm9kZUxpc3RTZWxlY3RvckFsbDogUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbCxcbiAgICAgICAgc2V0Rm9ybUZpZWxkVmFsdWU6IEZvcm1GaWVsZFZhbHVlXzEuc2V0Rm9ybUZpZWxkVmFsdWUsXG4gICAgICAgIHNwYW46IENyZWF0ZUVsZW1lbnRfMS5zcGFuLFxuICAgICAgICB2YWxpZGF0ZVVuaXF1ZURvbUlkczogVmFsaWRhdGVVbmlxdWVEb21JZHNfMS52YWxpZGF0ZVVuaXF1ZURvbUlkcyxcbiAgICB9O1xuICAgIGNvbnN0IGFycmF5ID0ge1xuICAgICAgICBjYXJ0ZXNpYW46IEFycmF5VXRpbGl0aWVzXzEuY2FydGVzaWFuLFxuICAgICAgICByYW5nZTogQXJyYXlVdGlsaXRpZXNfMS5yYW5nZSxcbiAgICAgICAgdHJhdmVyc2U6IEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UsXG4gICAgICAgIHppcDogQXJyYXlVdGlsaXRpZXNfMS56aXBcbiAgICB9O1xuICAgIGNvbnN0IHV0aWwgPSB7XG4gICAgICAgIGFycmF5LFxuICAgICAgICBjbG9uZURlZXA6IENsb25lRGVlcF8xLmNsb25lRGVlcCxcbiAgICAgICAgY2xvbmVPYmplY3Q6IENsb25lT2JqZWN0XzEuY2xvbmVPYmplY3QsXG4gICAgICAgIGRlbGF5OiBEZWxheV8xLmRlbGF5LFxuICAgICAgICBnZXRVbmlxdWVJZDogR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCxcbiAgICAgICAgaHRtbCxcbiAgICAgICAgaXNOb25lOiBOb25lVHlwZV8xLmlzTm9uZSxcbiAgICAgICAgaXNQb3NpdGl2ZUludGVnZXJTdHJpbmc6IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nLFxuICAgICAgICBrdzogS2V5d29yZEFyZ3VtZW50c18xLmt3LFxuICAgICAgICBLd2FyZzogS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLFxuICAgICAgICBvYmplY3RGdWxsQXNzaWduOiBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbixcbiAgICAgICAgb3JkZXJCeTogT3JkZXJCeV8xLm9yZGVyQnksXG4gICAgfTtcbiAgICB3aW5kb3cubWk1ID0gd2luZG93Lm1pNSB8fCB7fTtcbiAgICB3aW5kb3cubWk1LmNvbXBvbmVudCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5jb21wb25lbnQgfHwge30sIGNvbXBvbmVudCk7XG4gICAgd2luZG93Lm1pNS5vYnNlcnZhYmxlID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1Lm9ic2VydmFibGUgfHwge30sIG9ic2VydmFibGUpO1xuICAgIHdpbmRvdy5taTUucHJvbWlzZSA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5wcm9taXNlIHx8IHt9LCBwcm9taXNlKTtcbiAgICB3aW5kb3cubWk1LnJvdXRlciA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5yb3V0ZXIgfHwge30sIHJvdXRlcik7XG4gICAgd2luZG93Lm1pNS5odG1sID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1Lmh0bWwgfHwge30sIGh0bWwpO1xuICAgIHdpbmRvdy5taTUudXRpbCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS51dGlsIHx8IHt9LCB1dGlsKTtcbiAgICAvKipcbiAgICAgKiBUaGlzIHNsaWdodGx5IHNpbXBsaWZlcyB0aGUgcHJvY2VzcyBvZiByZWZlcmVuY2luZyBtaW5pLWljaGlnbyBjb21wb25lbnRzIHdpdGhvdXQgdGhlIGZ1bGwgbmFtZXNwYWNlLlxuICAgICAqIEl0IHJlcXVpcmVzIHR3byBhcmd1bWVudHMsIHVuZm9ydHVuYXRlbHksIGJlY2F1c2UgaXQncyBub3QgcG9zc2libGUgaW4gbWFueSBjYXNlcyB0byBkZXRlcm1pbmUgdGhlXG4gICAgICogY2xhc3Mgb3IgZnVuY3Rpb24gbmFtZS4gT2Z0ZW4gdGhlICduYW1lJyBwcm9wZXJ0eSBoYXMgb25seSB0aGUgbWluaWZpZWQgbmFtZSwgYSByYW5kb20gbGV0dGVyLlxuICAgICAqL1xuICAgIHdpbmRvdy5taTUudXNpbmcgPSBmdW5jdGlvbiB1c2luZyhsaWIsIGFsaWFzKSB7XG4gICAgICAgIGlmICghbGliIHx8ICFhbGlhcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOdWxsQXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuZXZhbC5jYWxsKHdpbmRvdywgJyhmdW5jdGlvbiAoYXJnKSB7IHdpbmRvdy4nICsgYWxpYXMgKyAnID0gYXJnOyB9KScpKGxpYik7XG4gICAgfTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhpcyBzY3JpcHQgY29udGFpbnMgZXh0ZW5zaW9ucyB0byBwcm92aWRlIGFkZGl0aW9uYWwgZnVuY3Rpb25zIHVzZWQgYnkgSWNoaWdvLlxuICogSW4geW91ciBtYWluIHByb2Nlc3MsIGltcG9ydCB0aGlzIHNjcmlwdCAoaW1wb3J0ICcvcGF0aC90by9JY2hpZ28vSWNoaWdvRXh0ZW5zaW9uTG9hZGVyJykgdG8gYWRkXG4gKiB0aGVzZSBleHRlbnNpb25zIHRvIHByb3RvdHlwZXMuXG4gKi9cbnJlcXVpcmUoXCIuL0V4dGVuc2lvbnMvT2JzZXJ2YWJsZUV4dGVuc2lvbnNcIik7XG5yZXF1aXJlKFwiLi9FeHRlbnNpb25zL0NvbXBvbmVudEV4dGVuc2lvbnNcIik7XG5yZXF1aXJlKFwiLi9FeHRlbnNpb25zL0VsZW1lbnRFeHRlbnNpb25zXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJQ29tcG9uZW50QmluZGluZ09wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXCIpO1xuY29uc3QgQm91bmRDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9Db21wb25lbnRNYXBcIik7XG5IVE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0Q29tcG9uZW50ID0gZnVuY3Rpb24gX2dldENvbXBvbmVudCgpIHtcbiAgICByZXR1cm4gQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KHRoaXMpO1xufTtcbkhUTUxFbGVtZW50LnByb3RvdHlwZS5iaW5kQ29tcG9uZW50ID0gZnVuY3Rpb24gX2JpbmQodmlld01vZGVsKSB7XG4gICAgcmV0dXJuIG5ldyBCb3VuZENvbXBvbmVudF8xLkJvdW5kQ29tcG9uZW50KHZpZXdNb2RlbCwgbmV3IElDb21wb25lbnRCaW5kaW5nT3B0aW9uc18xLkV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zKHsgZWxlbWVudDogdGhpcyB9KSk7XG59O1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmRlbGV0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uIF9kZWxldGVDb21wb25lbnQoKSB7XG4gICAgY29uc3QgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KHRoaXMpO1xuICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vdCBhIGNvbXBvbmVudCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQgaW5zdGFuY2VvZiBCb3VuZENvbXBvbmVudF8xLkJvdW5kQ29tcG9uZW50KSB7XG4gICAgICAgIGNvbXBvbmVudC5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuLyoqXG4gKiBTZXQgdGhlIHBhcmVudCBmb3IgYW4gZWxlbWVudCAoam9pbiB0aGUgcGFyZW50J3MgZmFtaWx5IGFzIGEgbmV3IGNoaWxkKSwgdGhlIG9wcG9zaXRlIG9mIGFwcGVuZENoaWxkLiBGbHVlbnQsIGZvciBjaGFpbmluZywgc29cbiAqIGl0J3Mgbm90IGEgcGVyZmVjdCBhbmFsb2cgKGFwcGVuZENoaWxkIHJldHVybnMgdGhlIGFyZ3VtZW50IHdoaWxlIHRoaXMgcmV0dXJucyB0aGUgZXh0ZW5kZWQgb2JqZWN0IC4uLiB0aG91Z2ggYm90aCBhcmUgdGhlIGNoaWxkKS5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFwcGVuZFRvUGFyZW50ID0gZnVuY3Rpb24gX2FwcGVuZFRvUGFyZW50KHBhcmVudCkge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEZsdWVudCB2ZXJzaW9uIG9mIGFwcGVuZENoaWxkLCB3aGljaCByZXR1cm5zIHRoZSBwYXJlbnQsIG5vdCB0aGUgY2hpbGQgKHRoZSBhcmd1bWVudCkuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZEZsdWVudCA9IGZ1bmN0aW9uIF9hcHBlbmRDaGlsZEZsdWVudChjaGlsZCkge1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogQWRkIHRoZSBlbGVtZW50IGFmdGVyIHRoZSBjdXJyZW50IGl0ZW0sIGF0IHRoZSBzYW1lIGxldmVsLiBOb3QgZmx1ZW50LCBzbyB0aGlzIGlzIHRoZSBzYW1lIHBhdHRlcm4gYXMgYXBwZW5kQ2hpbGQuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRTaWJsaW5nID0gZnVuY3Rpb24gX2FwcGVuZFNpYmxpbmcobmV4dCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKG5leHQpO1xufTtcbi8qKlxuICogQWRkIHRoZSBlbGVtZW50IGFmdGVyIHRoZSBjdXJyZW50IGl0ZW0sIGF0IHRoZSBzYW1lIGxldmVsLiBGbHVlbnQuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRTaWJsaW5nRmx1ZW50ID0gZnVuY3Rpb24gX2FwcGVuZFNpYmxpbmdGbHVlbnQobmV4dCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBSZXBsYWNlIHRoZSBlbGVtZW50LiBOb3QgZmx1ZW50LCBzbyB0aGlzIGlzIHRoZSBzYW1lIHBhdHRlcm4gYXMgYXBwZW5kQ2hpbGQuIFRoZXJlIGlzIG5vIGZsdWVudCB2ZXJzaW9uIGJlY2F1c2VcbiAqIHRoaXMgaXMgZGVsZXRpbmcgdGhlIGV4dGVuZGVkIG9iamVjdC5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VXaXRoID0gZnVuY3Rpb24gX3JlcGxhY2VXaXRoKG5ld0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCB0aGlzKTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbn07XG4vKipcbiAqIFN3YXAgdHdvIGVsZW1lbnRzIGZyb20gdGhlaXIgcGxhY2VzIGluIHRoZSBET00sIHJldHVybmluZyB0aGUgYXJndW1lbnQuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gX3N3YXAoZWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBjb25zdCBlbGVtZW50UGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIGNvbnN0IHBsYWNlSG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGVsZW1lbnRQYXJlbnQucmVwbGFjZUNoaWxkKHBsYWNlSG9sZGVyLCBlbGVtZW50KTtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGVsZW1lbnQsIHRoaXMpO1xuICAgIGVsZW1lbnRQYXJlbnQucmVwbGFjZUNoaWxkKHRoaXMsIHBsYWNlSG9sZGVyKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4vKipcbiAqIEEgd3JhcHBlciBhcm91bmQgZG9jdW1lbnQucmVtb3ZlQ2hpbGQgdGhhdCB1c2VzIHRoZSBzYW1lIEFQSSBhcyB0aGUgb3RoZXIgZnVuY3Rpb25zIGhlcmUuXG4gKiBJbmNsdWRlZCBmb3IgdGhlIHNha2Ugb2YgY29uc2lzdGVuY3kuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5leHRyYWN0ID0gZnVuY3Rpb24gX2V4dHJhY3QoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHJldHVybiBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG59O1xuLyoqXG4gKiBGbHVlbnQgdmVyc2lvbiBvZiBhZGRFdmVudExpc3RlbmVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lckZsdWVudCA9IGZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVyRmx1ZW50KGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBGbHVlbnQgc3R5bGUgYWRkZXIuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hZGRTdHlsZSA9IGZ1bmN0aW9uIF9hZGRTdHlsZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBGbHVlbnQgY2xhc3MgYWRkZXIuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIF9hZGRDbGFzcyhjbGFzc05hbWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNsYXNzTmFtZXMpKSB7XG4gICAgICAgIGNsYXNzTmFtZXMgPSBbY2xhc3NOYW1lc107XG4gICAgfVxuICAgIC8vIE5lZWQgdG8gYWxzbyBhbGxvdyBjbGFzc2VzIGluIHRoZSBcImNsYXNzMSBjbGFzczJcIiBmb3JtYXRcbiAgICBmb3IgKGNvbnN0IGMgb2YgW10uY29uY2F0KC4uLmNsYXNzTmFtZXNcbiAgICAgICAgLm1hcChxID0+IHEuc3BsaXQoJyAnKSlcbiAgICAgICAgLmZpbHRlcihxID0+IHEpKSkge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQgdXNpbmcgdGhlIGNyZWF0ZUVsZW1lbnQgaGVscGVyIGZ1bmN0aW9uIGFuZCBhZGQgaXQgdG8gdGhlIGZyYWdtZW50LCByZXR1cm5pbmcgdGhlIG5ldyBlbGVtZW50LlxuICovXG5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzKTtcbiAgICB0aGlzLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xufTtcbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQgdXNpbmcgdGhlIGNyZWF0ZUVsZW1lbnQgaGVscGVyIGZ1bmN0aW9uIGFuZCBhZGQgaXQgdG8gdGhlIGZyYWdtZW50LiBGbHVlbnQgdmVyc2lvbiwgc28gaXQncyBlYXN5IHRvIHF1aWNrbHkgYWRkXG4gKiBhIGJ1bmNoIG9mIGVsZW1lbnRzIHRvIHRoZSBmcmFnbWVudC5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudEZsdWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50Rmx1ZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIFRha2UgYSBkb2N1bWVudCBmcmFnbWVudCBhbmQgYWRkIGl0cyBjb250ZW50cyB0byBhIHBhcmVudCBlbGVtZW50LiBDYW5ub3QgYmUgZmx1ZW50IGJlY2F1c2UgYXQgdGhpcyBwb2ludCwgdGhlIGZyYWdtZW50IGlzIGVtcHR5IGFuZFxuICogcHJldHR5IHVzZWxlc3MsIHNvIHRoaXMgcmV0dXJucyB0aGUgcGFyZW50IGFyZ3VtZW50IChhcyBnb29kIGFzIGFueSBvdGhlciBvcHRpb24pLlxuICovXG5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5hcHBlbmRUb1BhcmVudCA9IGZ1bmN0aW9uIF9hcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgcmV0dXJuIHBhcmVudDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5PYmplY3QucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlUHJvcGVydHlfMS5PYnNlcnZhYmxlUHJvcGVydHkodGhpcywgeyBuYW1lIH0pO1xufTtcbi8qKlxuICogUXVpY2tseSBjb252ZXJ0IGEgc3RyaW5nIHRvIGFuIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4vKipcbiAqIFF1aWNrbHkgY29udmVydCBhIG51bWJlciB0byBhIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4vKipcbiAqIFF1aWNrbHkgY29udmVydCBhIGJvb2wgdG8gYSBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbkJvb2xlYW4ucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlUHJvcGVydHlfMS5PYnNlcnZhYmxlUHJvcGVydHkodGhpcywgeyBuYW1lIH0pO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IHRhZ05hbWUsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAvLyBBbGxvdyBhdHRyaWJ1dGVzIHRvIGJlIHNlbnQgb24gcHJvcGVydGllcywgcHJvdmlkaW5nIGEgY2xlYW5lciBpbnRlcmZhY2UuXG4gICAgLy8gSXQgYWxsb3dzIHlvdSB0byBzZW5kIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHthdHRyaWJ1dGVzOiB7IGNsYXNzOiAnZm9vJyB9fSkgaW5zdGVhZCBvZiBjcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLCB7IGNsYXNzOiAnZm9vJyB9KTtcbiAgICAvLyBBbm90aGVyIG9wdGlvbiBpcyB0byB1c2UgS3dhcmdzLCBidXQgbm90IGV2ZXJ5b25lIHdhbnRzIHRvLlxuICAgIGlmIChwcm9wZXJ0aWVzICYmICdhdHRyaWJ1dGVzJyBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMgfHwge30sIHByb3BlcnRpZXMuYXR0cmlidXRlcyk7XG4gICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXM7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGUodGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuZnVuY3Rpb24gY3JlYXRlKHRhZywgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IChkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZykpO1xuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRE9NIHByb3BlcnRpZXMgdGFrZSBwcmVjZWRlbmNlIG92ZXIgYXR0cmlidXRlcywgYmVjYXVzZSBpbiBzb21lIGNhc2VzLCB0aGV5IG92ZXJyaWRlIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgSFRNTCBmcm9tIGFueSBIVE1MIGVsZW1lbnQgcHJvdmlkZWQuXG4gKiBVc2UgbGlrZSBjb25zdCBkaXYgPSBjcmVhdGVIdG1sPEhUTUxEaXZFbGVtZW50PihcIjxkaXY+U29tZXRoaW5nPC9kaXY+XCIpIG9yIGNvbnN0IGN1c3RvbSA9IGNyZWF0ZUh0bWwoXCI8c29tZS10YWc+PC9zb21lLXRhZz5cIikuXG4gKiBJZiBtdWx0aXBsZSBlbGVtZW50cyBvciBhIHBsYWluIHRleHQgc3RyaW5nIHdpdGggbm8gSFRNTCBpcyBwcm92aWRlZCwgdGhlbiBpdCB3aWxsIGJlIHdyYXBwZWQgaW4gYSBkaXYsIHNvIGl0IGNhbiBrZWVwXG4gKiByZXR1cm5pbmcgYW4gSFRNTEVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSHRtbChodG1sLCBpbmxpbmUgPSBmYWxzZSkge1xuICAgIGxldCB3cmFwcGVyO1xuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgICAgd3JhcHBlciA9IHNwYW4oKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB3cmFwcGVyID0gZGl2KChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBjb25zdCBub2RlcyA9IHdyYXBwZXIuY2hpbGROb2RlcztcbiAgICAvLyBNdWx0aXBsZSBub2RlcywgcmV0dXJuIHRoZSB3cmFwcGluZyBkaXZcbiAgICAvLyBlLmcuIFwiVGhpcyBpcyBhIDxlbT50ZXN0PC9lbT5cIiBvciBcIjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+XCJcbiAgICBpZiAobm9kZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cbiAgICAvLyBJZiBqdXN0IGEgdGV4dG5vZGUgKG9yIGVtcHR5KSwgcmV0dXJuIGEgc3Bhbi4gVGV4dCBpcyBpbmNvbXBhdGlibGUgd2l0aCBIVE1MRWxlbWVudCBzbyBjYW4ndCByZXR1cm4gdGhhdFxuICAgIC8vIGUuZy4gXCJIZWxsbyB3b3JsZFwiXG4gICAgaWYgKCF3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIGlmIChpbmxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyOyAvLyBUaGlzIGlzIGEgc3BhblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNwYW4od3JhcHBlci5pbm5lckhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEVsc2UgcmV0dXJuIHRoZSBzaW5nbGUgY2hpbGQuXG4gICAgLy8gZS5nLiBcIjxkaXY+PGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj48L2Rpdj5cIlxuICAgIHJldHVybiB3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkO1xufVxuZXhwb3J0cy5jcmVhdGVIdG1sID0gY3JlYXRlSHRtbDtcbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHdpdGggYW55IGh0bWwuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KGh0bWwpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gZGl2KChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIHJldHVybiBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQod3JhcHBlcik7XG59XG5leHBvcnRzLmNyZWF0ZUZyYWdtZW50ID0gY3JlYXRlRnJhZ21lbnQ7XG5mdW5jdGlvbiBkaXYoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuZGl2ID0gZGl2O1xuZnVuY3Rpb24gc3BhbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFNwYW5FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuc3BhbiA9IHNwYW47XG5mdW5jdGlvbiBwYXJhZ3JhcGgoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxQYXJhZ3JhcGhFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMucGFyYWdyYXBoID0gcGFyYWdyYXBoO1xuZnVuY3Rpb24gYW5jaG9yKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBocmVmT3JQcm9wZXJ0aWVzID0ge30sIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBocmVmT3JQcm9wZXJ0aWVzID0ge30sIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIGhyZWZPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICBjb25zdCB0bXAgPSBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MQW5jaG9yRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgaWYgKHR5cGVvZiBocmVmT3JQcm9wZXJ0aWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB0bXAuaHJlZiA9IFN0cmluZyhocmVmT3JQcm9wZXJ0aWVzIHx8ICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRtcDtcbn1cbmV4cG9ydHMuYW5jaG9yID0gYW5jaG9yO1xuZnVuY3Rpb24gYnV0dG9uKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MQnV0dG9uRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmJ1dHRvbiA9IGJ1dHRvbjtcbi8vIENvbW1vbiBwcml2YXRlIGZ1bmN0aW9ucyBmb3Igb3ZlcmxvYWRzLiBQcmV2ZW50cyBsb3RzIG9mIGNvcHlwYXN0YS5cbi8vIFRoaXMgd29ya3MgZm9yIGV2ZXJ5dGhpbmcgYmVjYXVzZSBUeXBlU2NyaXB0IGlzIGtlZXBpbmcgdGhlIHR5cGVzIHZhbGlkLiBJbiBwdXJlIEpTLCBidWdzIGNvdWxkIGJlIGNyZWF0ZWQgKGZvciBleGFtcGxlLCBwYXNzaW5nIGFuIGlubmVyXG4vLyBlbGVtZW50IHRvIGEgcGFyYWdyYXBoIC4uLiBkaXNhbGxvd2VkIGJ5IFRTIGJ1dCB0aGUgY29kZSBpcyB0aGVyZSBpbiB0aGUgSlMpXG5mdW5jdGlvbiBfaW50ZXJuYWwodHlwZSwgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGlmIChodG1sT3JQcm9wZXJ0aWVzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIxKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaHRtbE9yUHJvcGVydGllcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gX292cjModHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX292cjIodHlwZSwgU3RyaW5nKGh0bWxPclByb3BlcnRpZXMgfHwgJycpLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfb3ZyMSh0eXBlLCBpbm5lckVsZW1lbnQsIHByb3BzLCBhdHRycykge1xuICAgIGNvbnN0IGUgPSBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG4gICAgZS5hcHBlbmRDaGlsZChpbm5lckVsZW1lbnQpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gX292cjIodHlwZSwgaW5uZXJIdG1sLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IGlubmVySHRtbDtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuZnVuY3Rpb24gX292cjModHlwZSwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBwcm9wcy5pbm5lckhUTUwgfHwgJyc7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZWxldGUgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVDb250ZW50KG5vZGUpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xuICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG59XG5leHBvcnRzLmRlbGV0ZU5vZGVDb250ZW50ID0gZGVsZXRlTm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBoZWxwZXIgZm9yIENyZWF0ZUVsZW1lbnQsIHJvdWdobHkgbWFwcGluZyB0byBIdG1sRWxlbWVudCB0eXBlcywgYnV0IG5vdCBwZXJmZWN0bHkgYmVjYXVzZSBpdCdzIGltcG9zc2libGVcbiAqICh0aGVyZSdzIG5vIHBlcmZlY3QgMToxIHJlbGF0aW9uc2hpcCkuXG4gKi9cbnZhciBlbGVtZW50VHlwZTtcbihmdW5jdGlvbiAoZWxlbWVudFR5cGUpIHtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBbmNob3JFbGVtZW50XCJdID0gXCJhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXJlYUVsZW1lbnRcIl0gPSBcImFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBdWRpb0VsZW1lbnRcIl0gPSBcImF1ZGlvXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQlJFbGVtZW50XCJdID0gXCJiclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJhc2VGb250RWxlbWVudFwiXSA9IFwiYmFzZWZvbnRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCbG9ja1F1b3RlRWxlbWVudFwiXSA9IFwiYmxvY2txdW90ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJ1dHRvbkVsZW1lbnRcIl0gPSBcImJ1dHRvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTENhbnZhc0VsZW1lbnRcIl0gPSBcImNhbnZhc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFFbGVtZW50XCJdID0gXCJkYXRhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGF0YUxpc3RFbGVtZW50XCJdID0gXCJkYXRhbGlzdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpYWxvZ0VsZW1lbnRcIl0gPSBcImRpYWxvZ1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpdkVsZW1lbnRcIl0gPSBcImRpdlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERMaXN0RWxlbWVudFwiXSA9IFwiZGxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxFbWJlZEVsZW1lbnRcIl0gPSBcImVtYmVkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRmllbGRTZXRFbGVtZW50XCJdID0gXCJmaWVsZHNldFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZvcm1FbGVtZW50XCJdID0gXCJmb3JtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzFFbGVtZW50XCJdID0gXCJoMVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcyRWxlbWVudFwiXSA9IFwiaDJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nM0VsZW1lbnRcIl0gPSBcImgzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzRFbGVtZW50XCJdID0gXCJoNFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc1RWxlbWVudFwiXSA9IFwiaDVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNkVsZW1lbnRcIl0gPSBcImg2XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSFJFbGVtZW50XCJdID0gXCJoclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEltYWdlRWxlbWVudFwiXSA9IFwiaW1hZ2VcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbnB1dEVsZW1lbnRcIl0gPSBcImlucHV0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGFiZWxFbGVtZW50XCJdID0gXCJsYWJlbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExlZ2VuZEVsZW1lbnRcIl0gPSBcImxlZ2VuZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExJRWxlbWVudFwiXSA9IFwibGlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMaW5rRWxlbWVudFwiXSA9IFwibGlua1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1hcEVsZW1lbnRcIl0gPSBcIm1hcFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1ldGVyRWxlbWVudFwiXSA9IFwibWV0ZXJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2REZWxFbGVtZW50XCJdID0gXCJkZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2RJbnNFbGVtZW50XCJdID0gXCJpbnNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPTGlzdEVsZW1lbnRcIl0gPSBcIm9sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT2JqZWN0RWxlbWVudFwiXSA9IFwib2JqZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3B0R3JvdXBFbGVtZW50XCJdID0gXCJvcHRncm91cFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdGlvbkVsZW1lbnRcIl0gPSBcIm9wdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE91dHB1dEVsZW1lbnRcIl0gPSBcIm91dHB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBhcmFncmFwaEVsZW1lbnRcIl0gPSBcInBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhbUVsZW1lbnRcIl0gPSBcInBhcmFtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGljdHVyZUVsZW1lbnRcIl0gPSBcInBpY3R1cmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcmVFbGVtZW50XCJdID0gXCJwcmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcm9ncmVzc0VsZW1lbnRcIl0gPSBcInByb2dyZXNzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUXVvdGVFbGVtZW50XCJdID0gXCJxXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2NyaXB0RWxlbWVudFwiXSA9IFwic2NyaXB0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2VsZWN0RWxlbWVudFwiXSA9IFwic2VsZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU291cmNlRWxlbWVudFwiXSA9IFwic291cmNlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3BhbkVsZW1lbnRcIl0gPSBcInNwYW5cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTdHlsZUVsZW1lbnRcIl0gPSBcInN0eWxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDYXB0aW9uRWxlbWVudFwiXSA9IFwiY2FwdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50XCJdID0gXCJ0ZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnRcIl0gPSBcInRoXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xFbGVtZW50XCJdID0gXCJjb2xcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNvbEdyb3VwRWxlbWVudFwiXSA9IFwiY29sZ3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUVsZW1lbnRcIl0gPSBcInRhYmxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVSb3dFbGVtZW50XCJdID0gXCJ0clwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkJvZHlFbGVtZW50XCJdID0gXCJ0Ym9keVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkZvb3RlckVsZW1lbnRcIl0gPSBcInRmb290XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uSGVhZGVyRWxlbWVudFwiXSA9IFwidGhlYWRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUZW1wbGF0ZUVsZW1lbnRcIl0gPSBcInRlbXBsYXRlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGV4dEFyZWFFbGVtZW50XCJdID0gXCJ0ZXh0YXJlYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRpbWVFbGVtZW50XCJdID0gXCJ0aW1lXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVHJhY2tFbGVtZW50XCJdID0gXCJ0cmFja1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFVMaXN0RWxlbWVudFwiXSA9IFwidWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxWaWRlb0VsZW1lbnRcIl0gPSBcInZpZGVvXCI7XG59KShlbGVtZW50VHlwZSA9IGV4cG9ydHMuZWxlbWVudFR5cGUgfHwgKGV4cG9ydHMuZWxlbWVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKGlucHV0KSB7XG4gICAgLy8gVGhlcmUgaXNuJ3QgYSBidWlsdC1pbiB3YXkgdG8gZG8gdGhpcywgc3RpbGwsIHNvIHdlIG5lZWQgYSBoZWxwZXIgZnVuY3Rpb24uXG4gICAgLy8gVGhlIGFydGljbGUgXCJZb3UgYXJlIHByb2JhYmx5IG1pc3VzaW5nIERPTSB0ZXh0IG1ldGhvZHNcIiBjb252aW5jZWQgbWUgdG8gZG8gaXQgdGhpcyB3YXksXG4gICAgLy8gdnMuIGNyZWF0ZVRleHROb2RlLiBUaG91Z2ggY3JlYXRlVGV4dE5vZGUgd291bGQgcHJvYmFibHkgd29yayBmaW5lIGZvciBzZXR0aW5nIGlubmVySFRNTC5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgICAgICBcIj1cIjogXCImI3gzRDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMzOTtcIixcbiAgICAgICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgICB9O1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIHMgPT4gZXNjYXBlc1tzXSk7XG59XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEdldCB0aGUgY29udGVudHMgb2YgYW55IGh0bWwgbm9kZSBhcyBhIERvY3VtZW50RnJhZ21lbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3ROb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XG59XG5leHBvcnRzLmV4dHJhY3ROb2RlQ29udGVudCA9IGV4dHJhY3ROb2RlQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZmluZEluZGV4SW5QYXJlbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuaW5kZXhPZihlbGVtZW50KTtcbiAgICB9XG59XG5leHBvcnRzLmZpbmRJbmRleEluUGFyZW50ID0gZmluZEluZGV4SW5QYXJlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBIVE1MIGlzIGluY29uc2lzdGVudC4gR2V0dGluZyB0aGUgdmFsdWUgb2YgZm9ybSBmaWVsZHMgaXMgYSBiaXQgY29tcGxpY2F0ZWQsIG5vdCBhbHdheXMgZWxlbWVudC52YWx1ZSxcbiAqIHNvIGhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCkge1xuICAgIC8vIEl0IHdvdWxkIGJlIHJlYWxseSBuaWNlIGF0IHRoaXMgcG9pbnQgaWYgSlMgY291bGQgc2VlIGdlbmVyaWMgcGFyYW1ldGVycy5cbiAgICAvLyBJZiBpdCBjb3VsZCwgdGhlbiB0aGUgY29kZSBjb3VsZCBzYXkgXCJpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiBUT3V0cHV0ICE9PSBib29sZWFuKSB0aHJvdyBuZXcgRXJyb3IoKVwiXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RWYWx1ZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGb3JtRmllbGRWYWx1ZSA9IGdldEZvcm1GaWVsZFZhbHVlO1xuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0LmNoZWNrZWQ7XG59XG5leHBvcnRzLmdldENoZWNrYm94VmFsdWUgPSBnZXRDaGVja2JveFZhbHVlO1xuZnVuY3Rpb24gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlcklucHV0VmFsdWUgPSBnZXROdW1iZXJJbnB1dFZhbHVlO1xuZnVuY3Rpb24gZ2V0UmFkaW9WYWx1ZShpbnB1dCkge1xuICAgIC8vIFJhZGlvIGJ1dHRvbnMgYXJlIHdlaXJkLiBXZSB3YW50IHRoZW0gdG8gYXBwZWFyIHRvIGJlIG1vcmUgbm9ybWFsLlxuICAgIGlmIChpbnB1dC5uYW1lKSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aW5wdXQubmFtZX1cIl06Y2hlY2tlZGApIHx8IHt9KS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSWYgbm8gbmFtZSwgZmFsbCBiYWNrIHRvIHRoaXNcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRSYWRpb1ZhbHVlID0gZ2V0UmFkaW9WYWx1ZTtcbmZ1bmN0aW9uIGdldFNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZWxlY3RWYWx1ZSA9IGdldFNlbGVjdFZhbHVlO1xuZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3Quc2VsZWN0ZWRPcHRpb25zKS5maWx0ZXIoZiA9PiBmLnZhbHVlKS5tYXAobSA9PiBtLnZhbHVlKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlTZWxlY3RWYWx1ZSA9IGdldE11bHRpU2VsZWN0VmFsdWU7XG4vLyBUaGlzIGlzIGFsbW9zdCBwb2ludGxlc3MuIEp1c3QgaGVyZSBmb3IgY29uc2lzdGVuY3kuXG5mdW5jdGlvbiBnZXRTaW1wbGVGb3JtVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIGZvciBtdWx0aS1zZWxlY3RzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuZXhwb3J0cy5nZXRTaW1wbGVGb3JtVmFsdWUgPSBnZXRTaW1wbGVGb3JtVmFsdWU7XG4vKipcbiAqIFNldHRpbmcgdmFsdWVzIGlzIGp1c3QgYXMgY29tcGxpY2F0ZWQgYXMgZ2V0dGluZyB0aGVtLCBiZWNhdXNlIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBZb3UgY2FuJ3QganVzdCBzYXkgZWxlbWVudC52YWx1ZSA9IGZvby5cbiAqIEhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gc2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAvLyBIZXJlIHlvdSBjYW4gdmFsaWRhdGUgdGhlIHR5cGUgYmVmb3JlIHNldHRpbmcgb3IgZG8gc29tZSBraW5kIG9mIGNvbnZlcnNpb24uXG4gICAgLy8gRm9yIG11bHRpLXNlbGVjdHMsIGNhbiBhdXRvLXdyYXAgdmFsdWUgaW4gc3RyaW5nLlxuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpOyAvLyB1c2VkIGluIG1vc3Qgb2YgdGhlIGNhc2VzXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCBzdHJpbmdWYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHN0cmluZ1ZhbHVlID09PSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShzdHJpbmdWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRldGltZScgfHwgdHlwZSA9PT0gJ2RhdGV0aW1lLWxvY2FsJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdHJpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBgJHt0b0RhdGVTdHJpbmcoZGF0ZSl9VCR7dG9UaW1lU3RyaW5nKGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzZWxlY3Qub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7IC8vIHRyZWF0aW5nIGl0IGxpa2UgYSBub24tbXVsdGlwbGUgd29ya3NcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb25leGlzdGVudCBvcHRpb25zIGNhbm5vdCBiZSBzZXQuIFdlIHNob3VsZCBsZXQgdGhlIHByb2dyYW1tZXIga25vdy4gRXZlbiB0aG91Z2ggdGhpcyB0YWtlcyBDUFUgY3ljbGVzLlxuICAgICAgICAgICAgdmFsdWUubWFwKG0gPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdmFsdWUubWFwKG0gPT4gbS50b1N0cmluZygpKS5pbmRleE9mKG9wdC52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIG9uIG5vbi1mb3JtIGZpZWxkICR7ZWxlbWVudC50YWdOYW1lfSAke2VsZW1lbnQuaWQgfHwgJyd9YCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbCkge1xuICAgICAgICAvLyBJZiB5b3Ugc2V0IHRoZSB2YWx1ZSBvZiBhIHNlbGVjdCB0byBzb21ldGhpbmcgdGhhdCBpcyBub3QgYW4gYXZhaWxhYmxlIG9wdGlvbiwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgICAgY29uc3QgaGFzT3B0aW9uID0gb3B0aW9ucy5tYXAobSA9PiBtLnZhbHVlKS5pbmRleE9mKHZhbC50b1N0cmluZygpKSA+IC0xO1xuICAgICAgICBpZiAoIWhhc09wdGlvbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIHdpdGggbm9uZXhpc3RlbnQgb3B0aW9uICR7dmFsLnRvU3RyaW5nKCl9IG9uIHNlbGVjdCAke2VsZW1lbnQuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlc2UgY291bGQgYmUgcmVhZGFibGUgb25lbGluZXJzIGlmIHdlIGhhZCBwYWRTdGFydCgpIGJ1dCBpdCdzIG5vdCB3b3J0aCBidW1waW5nIHRvIEVTMjAxNyBmb3Igb25lIG1ldGhvZFxuICAgIGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGggPSAoJzAnICsgKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgZGF5ID0gKCcwJyArIGRhdGUuZ2V0VVRDRGF0ZSgpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0VVRDRnVsbFllYXIoKX0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9UaW1lU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3VyID0gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBtaW51dGUgPSAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5zZXRGb3JtRmllbGRWYWx1ZSA9IHNldEZvcm1GaWVsZFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3Iobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvciA9IG5vZGVMaXN0U2VsZWN0b3I7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3JBbGwobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgYnJvd3NlciBjYW4gbG9zZSByZWZlcmVuY2VzIHdoZW4gbW92aW5nIG5vZGVzLCB0aGlzIGNhbiBhbHNvIHRha2UgYSByZWd1bGFyIGFycmF5LlxuICAgIC8vIEJlY2F1c2UgSFRNTDUgaGFzIHRvdGFsbHkgZmFsbGVuIG92ZXIsIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgZml4ZWQgbm9kZUxpc3RTZWxlY3RvckFsbFxuICAgIC8vIHRvIG1hdGNoIHRoZSBvdXRwdXQgc2lnbmF0dXJlIG9mIHF1ZXJ5U2VsZWN0b3JBbGwgKE5vZGVMaXN0T2Y8RWxlbWVudD4gaW5zdGVhZCBvZiBhcnJheSkuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uQXJyYXkuZnJvbShzZWFyY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3JBbGwgPSBub2RlTGlzdFNlbGVjdG9yQWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIElmIHRoZSBkb2N1bWVudCBjb250YWlucyBhbnkgZHVwbGljYXRlIElEcywgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVVuaXF1ZURvbUlkcygpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgZm9vIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJypbaWRdJykpIHtcbiAgICAgICAgaWRzLmFkZChmb28uaWQpO1xuICAgICAgICBpKys7XG4gICAgICAgIGlmIChpZHMuc2l6ZSAhPT0gaSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgRE9NIElEcyBmb3VuZC4gVGhlIGZpcnN0IGR1cGxpY2F0ZSBpZCBpcyAke2Zvb30uYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlVW5pcXVlRG9tSWRzID0gdmFsaWRhdGVVbmlxdWVEb21JZHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuY29uc3QgT2JzZXJ2YWJsZVN0YXRlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBFbHZpc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0VsdmlzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTsgLy8gQ2FuIG9ubHkgd3JpdGUgdG8gVEhJUyBjb21wb25lbnRcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2ktdicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaS12JywgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICB0aGlzLl9hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gb3B0aW9ucy5kZWZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSB0aGlzLmNvbnRlbnQuaWQ7XG4gICAgICAgIC8vIERlZmluZWQgdGhlIGRlZmF1bHQgY29tcG9uZW50IGNsYXNzIGZvciB0aGUgZGVmYXVsdCBsb29wUG9zdFByb2Nlc3MoKSBtZXRob2RcbiAgICAgICAgaWYgKG9wdGlvbnMubG9vcEl0ZW1DbGFzcykge1xuICAgICAgICAgICAgaWYgKCFDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQob3B0aW9ucy5sb29wSXRlbUNsYXNzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9vcEl0ZW1DbGFzcyBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEob3B0aW9ucy5sb29wSXRlbUNsYXNzIGluc3RhbmNlb2YgQm91bmRDb21wb25lbnQuY29uc3RydWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb29wSXRlbUNsYXNzIGlzIG5vdCBhbiBib3VuZCBjb21wb25lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvb3BQYXJlbnQgPSBvcHRpb25zLmxvb3BQYXJlbnQ7IC8vIHVuZGVmaW5lZCBpbiBtb3N0IGNhc2VzXG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MgPSBvcHRpb25zLmxvb3BJdGVtQ2xhc3MgfHwgQm91bmRDb21wb25lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCk7XG4gICAgICAgIHRoaXMuc2V0VGVtcGxhdGUodGhpcy5jb250ZW50LmlubmVySFRNTCk7IC8vIElubmVySFRNTCBpcyBjdXJyZW50bHkgb25seSBwYXJzZWQgYW5kIHRoZW4gdGhlIG9yaWdpbmFsIHRleHQgaXMgdGhyb3duIGF3YXkuXG4gICAgICAgIC8vIEF1dG8tYWRkIHN1YnNjcmlwdGlvbnMgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMub2JzZXJ2ZVZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGd0IG9mIG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUodGd0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcigpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0b3IgaW5pdGlhbGl6YXRpb24gaXMgZG9uZS5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKiBUbyByZXBsYWNlIHRoZSBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogSW4gYWxtb3N0IGV2ZXJ5IGNhc2UsIHZpZXdNb2RlbCBzaG91bGQgYmUgc2V0LiBCdXQgaXQncyBub3QgcG9zc2libGUgdG8gY2hhbmdlIHRoYXQgYW5kIHN0aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgYmFzZVxuICAgICAqIGNsYXNzIGluamVjdCgpLiBUaGlzIGlzIGEgdHlwZXNjcmlwdC1vbmx5IGlzc3VlIGJ1dCBpdCBtYWtlcyB0aGluZ3MgdWdseS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuIEFuZCBwcmFjdGljYWxseSBkZW1hbmRzIHRoZWlyIHVzZSB0byBzZXQgdmlld01vZGVsLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQm91bmRDb21wb25lbnQoZWxlbWVudCwgdmlld01vZGVsLCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Cb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbCB0byBpbmplY3QoKSB3aXRoIGEgY2xlYW5lciBhcmd1bWVudCBvcmRlci5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0QmluZCh2aWV3TW9kZWwsIHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKTtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIHZpZXdNb2RlbCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAvLyBXQVJOOiBUaGlzIGNhc3QgbWF5IG5vdCBiZSB0cnVlLiBUaGVyZSdzIG5vIHdheSB0byBjaGVjayB0aGF0IHRoZSB0YWdzIG1hdGNoLlxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgb3B0KTtcbiAgICB9XG4gICAgd3JpdGUoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIGNhc2VzIHdoZXJlIHZhbHVlIGlzIHVuZGVmaW5lZC4gRWl0aGVyIHRoZSBlbGVtZW50IGlzIG5vdCBhIGZvcm0gZWxlbWVudCBvciBpdCdzIGFuIHVubmFtZWQgcmFkaW8gYnV0dG9uXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IHNlbGVjdGVkLiBJbiBib3RoIGNhc2VzLCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSB0aGUgbW9kZWwgd2l0aCB1bmRlZmluZWQsIHdoaWNoIGlzIHVzZWxlc3MuXG4gICAgICAgIC8vIFRPRE86IElzIHRoaXMganVzdGlmaWNhdGlvbiB2YWxpZD9cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXQVJOOiBDYW5ub3QgdHlwZSBjaGVjayB0aGlzIGR5bmFtaWNhbGx5LiBUeXBlU2NyaXB0IGlzIGJ1aWxkLXRpbWUgY2hlY2tpbmcgb25seS4gUnVudGltZSBjb2RlIGNhbid0IGV2ZW4gc2VlIHRoZSB0eXBlLlxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB0byBiZSBwcmVjaXNlLCBhbGwgcHJvcGVydGllcyBpbiBfd3JpdGVCaW5kaW5ncyBzaG91bGQgYmUgRm9ybUl0ZW1WYWx1ZSwgYnV0IGFzIF93cml0ZUJpbmRpbmdzIGlzIHBvcHVsYXRlZFxuICAgICAgICAvLyB2aWEgc3RyaW5nLCB0aGVyZSdzIG5vIHdheSB0byBlbmZvcmNlIHRoYXQuIFNvIGlmIHlvdSBmaWxsIGEgc3RyaW5nIHZhbHVlIGZyb20gYSBtdWx0aXBsZSBzZWxlY3QsIGl0J2xsIHByb2R1Y2UgYnVncy5cbiAgICAgICAgLy8gU28gYmUgY2FyZWZ1bC4gSXQncyBvbiB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYmluZCBvZiB0aGlzLl93cml0ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGlmIChiaW5kLnN0YXJ0c1dpdGgoJ3RoaXMuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW2JpbmQuc2xpY2UoNSldO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzW2JpbmQuc2xpY2UoNSldID0gdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIHZpZXcgbW9kZWwgaXMgZWl0aGVyIEZvcm1GaWVsZFZhbHVlIG9yIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBvbmUuXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGhpcy52aWV3TW9kZWwsICgpID0+IHRoaXMudmlld01vZGVsID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kLnN0YXJ0c1dpdGgoJ14nKSAmJiBFbHZpc18xLmVfKHRoaXMubG9vcFBhcmVudCkudmlld01vZGVsICYmIHR5cGVvZiB0aGlzLmxvb3BQYXJlbnQudmlld01vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIC8vIE5vdGU6IE5vdCBkb2luZyBhICdeJyBieSBpdHNlbGYgYmVjYXVzZSB0aGF0J3MgYSBwcmV0dHkgQlMgY2FzZS4gSWYgdGhpcyBpcyB0aGUgbG9vcCBjaGlsZCwgdGhlIHBhcmVudCBpcyBwcm9iYWJseVxuICAgICAgICAgICAgICAgIC8vIGFuIG9iamVjdCBvciBhbiBpdGVyYWJsZSwgbm90IHJlYWxseSBzb21ldGhpbmcgeW91J2xsIHJlYWQgb3Igd3JpdGUgdG8gZGlyZWN0bHkuXG4gICAgICAgICAgICAgICAgLy8gTWlnaHQgZG8gYSBzaG9ydGN1dCB0byB0aGUgcGFyZW50IGNvbXBvbmVudCdzICd0aGlzJ1xuICAgICAgICAgICAgICAgIHdyaXRlVG9WaWV3TW9kZWxPYmplY3QodGhpcy5sb29wUGFyZW50LCBiaW5kLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnZpZXdNb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB3cml0ZVRvVmlld01vZGVsT2JqZWN0KHRoaXMsIGJpbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlVmFsdWUodGFyZ2V0LCB3cml0ZVRvUHJvcGVydHksIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRvIGJlIGZsZXhpYmxlLCBiZWNhdXNlIGlmIHRhcmdldCBpcyBhIHZhbHVlIHR5cGUgb3IgaW1tdXRhYmxlLCB3cml0aW5nXG4gICAgICAgICAgICAvLyBpdCBkaXJlY3RseSByZXBsYWNlcyBvbmx5IHRoZSB2YWx1ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBtb2RlbC5cbiAgICAgICAgICAgIHdyaXRlVG9Qcm9wZXJ0eSgpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlVG9WaWV3TW9kZWxPYmplY3QoY29tcCwgcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlU3RhdGVfMS5vYnNlcnZhYmxlU3RhdGVDaGVjayhjb21wLnZpZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAvLyBXaXRoIG9ic2VydmFibGUgc3RhdGUsIHdlIG5lZWQgdG8gZ2V0IHRoZSBzdGF0ZSwgdXBkYXRlIGl0LCBhbmQgd3JpdGUgdGhlIHdob2xlIHRoaW5nIGJhY2suXG4gICAgICAgICAgICAgICAgLy8gV2hpbGUgaXQgaXMgcG9zc2libGUgdG8gdXBkYXRlIGEgc2luZ2xlIHByb3BlcnR5IGluIHNvbWUgY2FzZXMsIGl0IGRvZXNuJ3QgYWxsb3cgcmV1c2Ugb2YgYWxyZWFkeS13b3JraW5nIGNvZGUuXG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gY29tcC52aWV3TW9kZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG1wW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gdG1wW3Byb3BlcnR5XSA9IHZhbHVlLCB0bXApO1xuICAgICAgICAgICAgICAgIGNvbXAudmlld01vZGVsLnZhbHVlID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gY29tcC52aWV3TW9kZWxbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiBjb21wLnZpZXdNb2RlbFtwcm9wZXJ0eV0gPSB2YWx1ZSwgY29tcC52aWV3TW9kZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byB0aGUgbW9kZWwgcGFzc2VkIGluLCBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi5cbiAgICAgKi9cbiAgICBvYnNlcnZlKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmIChJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhtb2RlbCkpIHtcbiAgICAgICAgICAgIG1vZGVsLnN1YnNjcmliZSh0aGlzLnJlbmRlciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byBhbGwgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIGZvdW5kIGluIHRoZSBtb2RlbCBwYXNzZWQgaW4sXG4gICAgICogb3IgdGhlIHZpZXcgbW9kZWwgaWYgbm9uZSBwYXNzZWQgaW4uIFRoaXMgb25seSBnb2VzIG9uZSBsZXZlbCBkZWVwLCBzbyBpdFxuICAgICAqIHdvbid0IHBpY2sgdXAgbmVzdGVkIG9iamVjdHMsIGJ1dCBpdCdzIHByb2JhYmx5IGdvb2QgZW5vdWdoIGluIDYwJSBvZiBjYXNlcy5cbiAgICAgKi9cbiAgICBvYnNlcnZlQWxsKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbCk7XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtb2RlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbFttXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gSWYgd2UgcGF1c2UgcmVuZGVyaW5nLCB0aGVuIG5vdGhpbmcgaGFwcGVucy5cbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgaWYgKHRoaXMuX2RlZmVyICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5ib29sKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGJvb2xlYW4gYXR0cmlidXRlcywgdGhlIHZlcnkgZXhpc3RlbmNlIG9mIHRoZSBhdHRyaWJ1dGUgbWVhbnMgaXQgaXMgY29uc2lkZXJlZCB0byBiZSB0cnVlLlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUoaXRlbS5zb3VyY2UsIGl0ZW0ub3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICEhdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUsIHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQXR0cmlidXRlKGl0ZW0uYXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGl0ZW0uYXR0cmlidXRlLCB0aGlzLl9nZXRTdHJpbmdWYWx1ZShpdGVtLnNvdXJjZSwgZmFsc2UsIGl0ZW0ub3RoZXJDb21wb25lbnRJZCkgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl92YWx1ZUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgLy8gQ2FsbHMgc2V0Rm9ybUZpZWxkVmFsdWUgYmVoaW5kIHRoZSBzY2VuZXMuXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX3ZhbHVlQXR0cmlidXRlLnNvdXJjZSwgdGhpcy5fdmFsdWVBdHRyaWJ1dGUub3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZSh0aGlzLl9jc3NDbGFzc2VzLmNzc0NsYXNzLCBmYWxzZSwgdGhpcy5fY3NzQ2xhc3Nlcy5vdGhlckNvbXBvbmVudElkKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcykge1xuICAgICAgICAgICAgLy8gSWYgdHJ1dGh5LCBhZGQgY2xhc3MsIGVsc2UgZGVsZXRlIGl0LlxuICAgICAgICAgICAgbGV0IHZhbCA9ICEhdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlLCBpdGVtLm90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW0ubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKGl0ZW0uY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc1N0eWxlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZSh0aGlzLl9jc3NTdHlsZS5zdHlsZSwgZmFsc2UsIHRoaXMuX2Nzc1N0eWxlLm90aGVyQ29tcG9uZW50SWQpIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLmNvbnRlbnQuc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIHN0eWxlIHRleHQgaW4gY29tcG9uZW50OiAke3ZhbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICAgICAgY29uc3QgaXRlcmFibGUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fbG9vcC5zb3VyY2UsIHRoaXMuX2xvb3Aub3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICBpZiAoaXRlcmFibGUgJiYgdHlwZW9mIGl0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c0NvbnRlbnQgPSBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBpdGVyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy5fbG9vcC5mcmFnbWVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzIHNvb24gYXMgd2UgYWRkIHRoZSBjbG9uZSB0byBjb250ZW50LCBjaGlsZE5vZGVzIGxvc2VzIHJlZmVyZW5jZSB0byBpdHMgY2hpbGQgbm9kZXMsIHNvIGNvcHkgaXQuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gQXJyYXkuZnJvbShjbG9uZS5jaGlsZE5vZGVzKS5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9vcC5wb3N0UHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29wUG9zdFByb2Nlc3Mocm93LCBub2RlcywgaXRlcmFibGUsIHByZXZpb3VzQ29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIC8vIElmIGZhbHN5LCBzZXQgZGlzcGxheTogbm9uZSAoc2F2aW5nIHByZXZpb3VzIHZhbHVlKS4gSWYgdHJ1dGh5LCByZXN0b3JlIHByZXZpb3VzIHZhbHVlIChpZiBibG9jaywgZmxleCwgYnV0IG5vdCBpZiBub25lKVxuICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZSh0aGlzLl9jc3NEaXNwbGF5LnNvdXJjZSwgdGhpcy5fY3NzRGlzcGxheS5vdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5Lm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCB0aGlzLl9wcmV2aW91c0Nzc0Rpc3BsYXlTZXR0aW5nIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgPSB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGVtcGxhdGUodGVtcGxhdGVUZXh0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgdXBkYXRlIHBhcmFtIHNob3VsZCBub3QgYmUgc2V0LlxuICAgICAgICBpZiAodXBkYXRlICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgc2hvdWxkIG5vdCBiZSB0cnVlIHdoZW4gY2FsbGVkIGludGVybmFsbHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2Ugd2UncmUgY3JlYXRpbmcgYW4gZWxlbWVudCB0aGF0J3Mgbm90IG9uIHRoZSBwYWdlLCB3ZSBwcm9iYWJseSBjb3VsZCBhdm9pZCB1c2luZyBhIGZyYWdtZW50LFxuICAgICAgICAvLyBidXQgdGhpcyBpcyB3aGF0IGZyYWdtZW50cyBhcmUgZm9yLlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlVGV4dDtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHVzZWQgdG8gcmVwbGFjZSB0aGUgZXhpc3RpbmcgdGVtcGxhdGUsIHdlIG5lZWQgdG8gd2lwZSBvdXQgdGhlIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gV29ya2luZyBvbiBhIGNsb25lIGhlcmUsIHNvIHdlIGRvbid0IHNlZSB0aGUgYm9keSBiZWluZyBidWlsdCBzdGVwIGJ5IHN0ZXAgaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpLXYnKSkge1xuICAgICAgICAgICAgLy8gQWxsb3cgMyB3YXlzIHRvIHJlZmVyZW5jZSBhIGNvbXBvbmVudCwgZWl0aGVyIGJ5ICNpZCAoZm9yIHBlb3BsZSB3aG8gbGlrZSBxdWlja25lc3MpLCBieSBjb21wb25lbnQgKGZvciBwZW9wbGUgd2hvIGxpa2VcbiAgICAgICAgICAgIC8vIGNvbXBsaWFuY2UpLCBvciBieSBkYXRhLWNvbXBvbmVudCAoZm9yIHBlb3BsZSB3aG8gUkVBTExZIGxpa2UgY29tcGxpYW5jZSlcbiAgICAgICAgICAgIGxldCByZWxhdGVkQ29tcG9uZW50SWQgPSAnJztcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcGwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcE5hbWUgPSByZXBsLmF0dHJpYnV0ZXNbaV0ubm9kZU5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKHRtcE5hbWUuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbGF0ZWRDb21wb25lbnRJZCA9IHRtcE5hbWUuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcmVsYXRlZENvbXBvbmVudElkICYmIHJlcGwuaGFzQXR0cmlidXRlKCdjb21wb25lbnQnKSkge1xuICAgICAgICAgICAgICAgIHJlbGF0ZWRDb21wb25lbnRJZCA9IChyZXBsLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFyZWxhdGVkQ29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgICAgICByZWxhdGVkQ29tcG9uZW50SWQgPSByZXBsLmRhdGFzZXQuY29tcG9uZW50IHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgY29tcG9uZW50IGlzIHNwZWNpZmllZCwgdGhpcyBjb21wb25lbnQgbXVzdCBoYXZlIHRoYXQgYXMgYW4gaWRcbiAgICAgICAgICAgIGlmICh0aGlzLl9pZCAmJiByZWxhdGVkQ29tcG9uZW50SWQgJiYgcmVsYXRlZENvbXBvbmVudElkLnRvTG93ZXJDYXNlKCkgIT09IHRoaXMuX2lkLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vZXNjYXBlID0gcmVwbC5oYXNBdHRyaWJ1dGUoJ25vZXNjYXBlJykgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ25vZXNjYXBlJykgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICBjb25zdCBvdGhlckNvbXBvbmVudElkID0gcmVwbC5nZXRBdHRyaWJ1dGUoJ2k1X3NvdXJjZScpIHx8IHJlcGwuZ2V0QXR0cmlidXRlKCdzb3VyY2UnKSB8fCByZXBsLmRhdGFzZXQuaTVfc291cmNlIHx8IHJlcGwuZGF0YXNldC5zb3VyY2UgfHwgcmVwbC5nZXRBdHRyaWJ1dGUoJzpzb3VyY2UnKTtcbiAgICAgICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiByZXBsLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogcmVwbC5pbm5lckhUTUwsXG4gICAgICAgICAgICAgICAgbm9lc2NhcGU6IG5vZXNjYXBlLFxuICAgICAgICAgICAgICAgIG90aGVyQ29tcG9uZW50SWQ6IG90aGVyQ29tcG9uZW50SWQgfHwgdW5kZWZpbmVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbiB0aGUgb3JpZ2luYWwgYnVpbGQgb2YgdGhlIG9iamVjdCwgZiBhbnkgcmVwbGFjZW1lbnRzIHN0YXJ0IHdpdGggXCJ0aGlzLlwiIHdlIG5lZWQgdG8gZGVmZXIuXG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQgJiYgIXRoaXMuX2RlZmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZlciA9IHRoaXMuX2RlZmVyIHx8ICEhdGhpcy5fcmVwbGFjZW1lbnRzLmZpbmQoZiA9PiBmLnNvdXJjZS5zdGFydHNXaXRoKCd0aGlzLicpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIHdpbGwgbGVhZCB0byBhIEZPVUMsIG1heWJlIG1pbGxpc2Vjb25kcywgbWF5YmUgbG9uZ2VyLlxuICAgICAgICBpZiAoIXRoaXMuX2RlZmVyIHx8IHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb21wbGV0ZWQgdmFsdWVzIGJlZm9yZSBhZGRpbmcgdG8gdGhlIHZpc2libGUgcGFnZS4gVGhpcyBpcyBzbGlnaHRseSByZWR1bmRhbnQsIGJlY2F1c2UgdGhpcyBoYXBwZW5zIGluIHRoZSByZW5kZXIoKVxuICAgICAgICAgICAgLy8gc3RlcCwgYnV0IEkgaGF0ZSBpdCB3aGVuIEkgc2VlIGEgZmxhc2ggb2YgdW5yZXBsYWNlZCBjb250ZW50IG9uIHNpdGVzLlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiB0aGlzIHdvcmtzIGlzIGJlY2F1c2UgX3JlcGxhY2VtZW50cyByZWZlcmVuY2VzIGNsb25lLCB3aGljaCBpc24ndCB2aXNpYmxlIHVudGlsIGFsbW9zdCB0aGUgbGFzdCBsaW5lLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBvcHVsYXRlIHRoZSBmcm9udC1lbmQgdGV4dC4gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSB0aGluZyB0byByZXBsYWNlLiBPdGhlcndpc2UsIHlvdSdyZSBqdXN0IHdpcGluZyBvdXQgcGVyZmVjdGx5XG4gICAgICAgIC8vIHZhbGlkIEhUTUw1IHJlZmVyZW5jZXMgZm9yIG5vIHJlYXNvbi5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gYSBmdWxsIHVwZGF0ZSBpZiByZXF1ZXN0ZWQgdG9cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SHRtbFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12IG5vZXNjYXBlPicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldFRleHRUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdj4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRMb29wKHNvdXJjZSA9ICcuJywgZnJhZ21lbnQsIHNraXBQb3N0UHJvY2VzcyA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3AgPSB7IHNvdXJjZSwgcG9zdFByb2Nlc3M6ICFza2lwUG9zdFByb2Nlc3MsIGZyYWdtZW50LCBvdGhlckNvbXBvbmVudElkIH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUxvb3AodXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmFsdWVBdHRyaWJ1dGUoc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLl92YWx1ZUF0dHJpYnV0ZSA9IHsgc291cmNlLCBvdGhlckNvbXBvbmVudElkIH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZpc2liaWxpdHkoc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0Rpc3BsYXkgPSB7IHNvdXJjZSwgbmVnYXRpdmUsIG90aGVyQ29tcG9uZW50SWQgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRBdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogZmFsc2UsIG5lZ2F0aXZlOiBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRCb29sZWFuQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmluZChmID0+IGYuYXR0cmlidXRlID09PSBhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKHsgYXR0cmlidXRlLCBzb3VyY2UsIGJvb2w6IHRydWUsIG5lZ2F0aXZlLCBvdGhlckNvbXBvbmVudElkIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maWx0ZXIoZiA9PiBmLmF0dHJpYnV0ZSAhPT0gYXR0cmlidXRlKTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENzc0NsYXNzKGNscyA9ICcuJywgdXBkYXRlID0gZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NlcyA9IHsgY3NzQ2xhc3M6IGNscywgb3RoZXJDb21wb25lbnRJZCB9O1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NTdHlsZShzdHlsZSA9ICcuJywgdXBkYXRlID0gZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5fY3NzU3R5bGUgPSB7IHN0eWxlLCBvdGhlckNvbXBvbmVudElkIH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENzc0NsYXNzU3dpdGNoKGNscywgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICBpZiAoIWNscyB8fCAhc291cmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbmQoZiA9PiBmLmNsYXNzID09PSBjbHMpKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLnB1c2goeyBjbGFzczogY2xzLCBzb3VyY2UsIG5lZ2F0aXZlLCBvdGhlckNvbXBvbmVudElkIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUNzc0NsYXNzU3dpdGNoKGNscywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFjbHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5maWx0ZXIoZiA9PiBmLmNsYXNzICE9PSBjbHMpO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMud3JpdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRXcml0ZVRhcmdldCh0YXJnZXQgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX3dyaXRlVGFyZ2V0cy5maW5kKGYgPT4gZiA9PT0gdGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVXcml0ZVRhcmdldCh0YXJnZXQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX3dyaXRlVGFyZ2V0cy5maWx0ZXIoZiA9PiBmICE9PSB0YXJnZXQpO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEF1dG8tSW5qZWN0IGNhbGxzIHRoZSBkZWZhdWx0IGluamVjdEJpbmQoKSBvbiB0aGUgZGVmYXVsdCBCb3VuZENvbXBvbmVudCBjbGFzcywgd2l0aCBubyBvcHRpb25zIGV4Y2VwdCBzZWxlY3Rvci5cbiAgICAgKiBJZiB5b3UgcGFzcyBubyBpbnB1dHMsIGl0IHNlZWtzIG91dCBhbGwgY2hpbGQgZWxlbWVudHMgdGhhdCBoYXZlIGF0IGxlYXN0IG9uZSBpY2hpZ28gY3VzdG9tIHByb3BlcnR5LiBLZWVwIGluIG1pbmRcbiAgICAgKiB0aGF0IHdoZW4geW91IGhhdmUgbmVzdGVkIG9iamVjdHMsIHRoaXMgd2lsbCB1c3VhbGx5IG1lYW4gc29tZXRoaW5nIHdpbGwgYmxvdyB1cCBiZWNhdXNlIHlvdSB0cmllZCB0byBiaW5kIGFuIGVsZW1lbnRcbiAgICAgKiB0d2ljZS4gSXQgYWxzbyB3aWxsIHBlcmZvcm0gbXVjaCB3b3JzZS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIGEgc2VsZWN0b3IsIGl0IGFjdHMgdGhlIHNhbWUgYXMgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCgpIHdpdGggdGhhdCBzZWxlY3Rvci5cbiAgICAgKlxuICAgICAqIEluIG15IGV4cGVyaWVuY2UsIHRoaXMgaXMgYWxtb3N0IGNvbXBsZXRlbHkgdXNlbGVzcy4gRWl0aGVyIHRoZSBsYWNrIG9mIG9wdGlvbnMgYnJlYWtzIGl0IChwcmV0dHkgdXNlbGVzcyBpZiB5b3UgY2FuJ3RcbiAgICAgKiBvYnNlcnZlIGFuIG9ic2VydmFibGUpIG9yIHRoZSBzaW1wbGUgYWN0IG9mIGJpbmRpbmcgYnJlYWtzIHN0dWZmLlxuICAgICAqL1xuICAgIGF1dG9JbmplY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKHRoaXMudmlld01vZGVsLCBzZWxlY3RvciwgeyBwYXJlbnQ6IHRoaXMuY29udGVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnKicpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20oZS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJ2k1XycpIHx8IGF0dHIubmFtZS5zdGFydHNXaXRoKCc6JykgfHwgYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtaTVfJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQodGhpcy52aWV3TW9kZWwsIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHVuYmluZCBhIHZpZXcgZnJvbSBhbiBvYnNlcnZhYmxlLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cykge1xuICAgICAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBzb21ldGhpbmcgZWxzZSBhZnRlciB0aGUgbG9vcCBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICAgICAqL1xuICAgIGxvb3BQb3N0UHJvY2Vzcyhyb3csIGFkZGVkQ29udGVudCwgYWxsUm93cywgcHJldmlvdXNDb250ZW50KSB7XG4gICAgICAgIGlmICghYWRkZWRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSB0eXBlc2NyaXB0IHBhcnQgb2YgdGhlIGZvbGxvd2luZyB3ZXJlIGltcG9ydGFudCwgdGhpcyB3b3VsZCBiZSBhIHByb2JsZW1cbiAgICAgICAgLy8gaWYgdGhpcyB3ZXJlIGEgZGVyaXZlZCBjbGFzcy5cbiAgICAgICAgY29uc3QgdGhpc2NsYXNzID0gdGhpcztcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKGFkZGVkQ29udGVudCwgJ1tpNV9pdGVtXSwgW1xcXFwwMDAwM0FpdGVtXSwgW2RhdGEtaTVfaXRlbV0nKTtcbiAgICAgICAgLy8gSWYgbm8gaTVfaXRlbSBtYXRjaGVzLCB0aGVuIGdyYWIgdGhlIGZpcnN0IGVsZW1lbnQuXG4gICAgICAgIGlmICghbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdE5vZGUgPSBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yKGFkZGVkQ29udGVudCwgJyonKTtcbiAgICAgICAgICAgIGlmIChmaXJzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKGZpcnN0Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb29wSXRlbUNsYXNzLmluamVjdEJpbmQocm93LCBub2Rlcywge1xuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICAgICAgICBsb29wUGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgYXN5bmM6IHRoaXMuX2FzeW5jXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U3RyaW5nVmFsdWUobmFtZSwgc2tpcEVzY2FwZSA9IGZhbHNlLCBzb3VyY2VDb21wb25lbnRJZCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZShuYW1lLCBzb3VyY2VDb21wb25lbnRJZCk7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZS50b1N0cmluZygpIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFVudHlwZWRWYWx1ZShuYW1lLCBzb3VyY2VDb21wb25lbnRJZCkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgaWYgKHNvdXJjZUNvbXBvbmVudElkKSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSBDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQoc291cmNlQ29tcG9uZW50SWQpIHx8IGNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJJ20gcHJldHR5IHN1cmUgdGhpcyBpcyBiZWluZyB2YWxpZGF0ZWQgZHVyaW5nIGNvbnN0cnVjdGlvbiBidXQgYmUgc2FmZVxuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGhpc0FyZyA9IGNvbXBvbmVudC52aWV3TW9kZWw7XG4gICAgICAgIC8vIElmIFZNIGlzIGEgc3RhdGUsIGdldCB0aGUgY3VycmVudCBzdGF0ZSB2YWx1ZS5cbiAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXNBcmcpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCd0aGlzLicpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gY29tcG9uZW50O1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoNSk7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXcuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gY29tcG9uZW50W25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnXicpICYmIEVsdmlzXzEuZV8oY29tcG9uZW50Lmxvb3BQYXJlbnQpLnZpZXdNb2RlbCAmJiB0eXBlb2YgRWx2aXNfMS5lXyhjb21wb25lbnQubG9vcFBhcmVudCkudmlld01vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gTm90ZTogTm90IGRvaW5nIGEgJ14nIGJ5IGl0c2VsZiBiZWNhdXNlIHRoYXQncyBhIHByZXR0eSBCUyBjYXNlLiBJZiB0aGlzIGlzIHRoZSBsb29wIGNoaWxkLCB0aGUgcGFyZW50IGlzIHByb2JhYmx5XG4gICAgICAgICAgICAvLyBhbiBvYmplY3Qgb3IgYW4gaXRlcmFibGUsIG5vdCByZWFsbHkgc29tZXRoaW5nIHlvdSdsbCByZWFkIG9yIHdyaXRlIHRvIGRpcmVjdGx5LlxuICAgICAgICAgICAgLy8gTWlnaHQgZG8gYSBzaG9ydGN1dCB0byB0aGUgcGFyZW50IGNvbXBvbmVudCdzICd0aGlzJ1xuICAgICAgICAgICAgdGhpc0FyZyA9IGNvbXBvbmVudC5sb29wUGFyZW50LnZpZXdNb2RlbDtcbiAgICAgICAgICAgIGlmICghKG5hbWUuc2xpY2UoMSkgaW4gdGhpc0FyZykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3TW9kZWwgcGFyZW50IHZpZXcgbW9kZWwuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZ1tuYW1lLnNsaWNlKDEpXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnLicpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXNBcmcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXNBcmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHRoaXMuJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3TW9kZWwuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDT05TSURFUjogQ29uc2lkZXIgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIHRvIGFsbG93IGV4ZWN1dGluZyBtZXRob2Qgd2l0aCBzdHJpbmcgcGFyYW1ldGVycy4gaTVfcGFyYW0wMT1cInZhbCAxXCIsIGk1X3BhcmFtMDI9XCJ2YWwgMlwiXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmNhbGwodGhpc0FyZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2soc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3VwZGF0ZUh0bWxSZXBsYWNlbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiB0aGlzLl9yZXBsYWNlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUocmVwbC5zb3VyY2UsIHJlcGwubm9lc2NhcGUsIHJlcGwub3RoZXJDb21wb25lbnRJZCkgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVwbC5lbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20odGhpcy5jb250ZW50LmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gZi52YWx1ZSB8fCBmLm5hbWUgPT09ICdpNV9pbnB1dCcgfHwgZi5uYW1lID09PSAnOmlucHV0JylcbiAgICAgICAgICAgIC5tYXAobSA9PiAoe1xuICAgICAgICAgICAgbmFtZTogbS5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IG0udmFsdWUgfHwgJydcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBUZWNobmljYWxseSBpdCdzIGludmFsaWQgdG8gYWRkIGN1c3RvbSBhdHRyaWJ1dGVzIHRvIHJlZ3VsYXIgZWxlbWVudHMsIHNvIHRlY2huaWNhbGx5IDxyZXBsYWNlLW1lIDpzd2l0Y2g6cmVkdGV4dD1cIndhcm5pbmdcIj5cbiAgICAgICAgLy8gaXMgbGVnYWwgYnV0IGlmIGlmIGl0IHdlcmUgYSBkaXYsIHRoYXQgd291bGQgYmUgaWxsZWdhbC4gU28gd2UnbGwgYWxsb3cgPGRpdiBkYXRhLWk1X3N3aXRjaF9yZWR0ZXh0PVwid2FybmluZ1wiPi5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSB3ZWlyZCBuYW1lIGhhbmRsaW5nIG9mIGRhdGEgYXR0cmlidXRlcyBjb3VsZCBicmVhayB5b3VyIGNvZGUgaWYgeW91IHRyeSB0byB1c2UgdGhpcy4gWW91IG1heSBuZWVkIHRvIGRvIGV4dHJhXG4gICAgICAgIC8vIHdvcmsgdG8gbWFrZSB5b3VyIGNvZGUgd29yaywgYWxsIGluIHRoZSBuYW1lIG9mIHN0cmljdCBhZGhlcmVuY2UgdG8gc3RhbmRhcmRzLiBJdCdzIHVwIHRvIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuY29udGVudC5kYXRhc2V0KSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRlbnQuZGF0YXNldFthdHRyXTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCBhdHRyID09PSAnaTVfaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEF0dHJpYnV0ZXMucHVzaCh7IG5hbWU6IGF0dHIsIHZhbHVlOiB2YWx1ZSB8fCAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgdGhlIGFsdGVybmF0ZSBzb3VyY2UgSWRcbiAgICAgICAgY29uc3Qgb3RoZXJDb21wb25lbnRJZCA9IEVsdmlzXzEuZV8oY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZSA9PT0gJ2k1X3NvdXJjZScgfHwgZi5uYW1lID09PSAnOnNvdXJjZScpKS52YWx1ZTtcbiAgICAgICAgbGV0IHRleHRIdG1sU2V0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBjdXJyZW50QXR0cmlidXRlcykge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuX3BhcnNlQXR0cmlidXRlTmFtZShwcm9wLm5hbWUpO1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBSZWd1bGFyIGF0dHJpYnV0ZXMgd2lsbCBhbGwgbWF0Y2ggdGhpcy5cbiAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0eXBlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbE5lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCb29sZWFuQXR0cmlidXRlTWFwcGluZyh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSwgbmVnYXRpdmUsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYXR0clwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJzd2l0Y2hDbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDc3NDbGFzc1N3aXRjaCh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSwgbmVnYXRpdmUsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dEh0bWxTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldCBpNV90ZXh0IGFuZCBpNV9odG1sIGF0IHNhbWUgdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0SHRtbFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBgPGktdj4ke3Byb3AudmFsdWV9PC9pLXY+YDsgLy8gVXNlIHRoaXMgYXMgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXYgbm9lc2NhcGU+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eShwcm9wLnZhbHVlLCBuZWdhdGl2ZSwgZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzc1N0eWxlKHByb3AudmFsdWUsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDc3NDbGFzcyhwcm9wLnZhbHVlLCBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBmYWxsIHRocm91Z2gsIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYXR0cmlidXRlIGFzIGEgdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXQgaTVfaW5wdXRfZm9vIGlzIHRoZSBzYW1lIGFzIGk1X3RhcmdldD1cImZvb1wiIGk1X3ZhbHVlPVwiZm9vXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJ1dCBvbmx5IHdyaXRlIHRvIHRoZSBsb2NhbCB2aWV3IG1vZGVsLCBub3QgYW5vdGhlciBjb21wb25lbnQnc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0YXJnZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXcml0ZVRhcmdldChwcm9wLnZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvb3BcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gR3JhYiB0aGUgYmFzZSBjb250ZW50IGZvciB0aGUgbG9vcCwgcHVsbGluZyBpdCBvdXQgb2YgdGhlIERPTS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb29wKHByb3AudmFsdWUsIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpLCB0eXBlLmRldGFpbCA9PT0gJ251bGwnLCBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2VkIGFzIGEgc2VsZWN0b3IuIEhhcyBubyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZCBJY2hpZ28gYXR0cmlidXRlOiBcIiArIHR5cGUudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZlcklmTmVlZGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgcHJvcC52YWx1ZS5zdGFydHNXaXRoKCd0aGlzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJzZUF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICAgIC8vIEdlbmVyYWwgaWNoaWdvIHNob3J0Y3V0XG4gICAgICAgICAgICBuYW1lID0gJ2k1XycgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lID09PSAnaTVfaXRlbScpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBpbmRpY2F0ZSBhbiBpdGVtIGNvbXBvbmVudCwgbm90aGluZyBlbHNlLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9zb3VyY2UnKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgdG8gaW5kaWNhdGUgYSBzb3VyY2UgY29tcG9uZW50LiBJdCdzIHJlYWQgc2VwYXJhdGVseS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnaTVfZXZlbnQnKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgb25seSBpbiBDb21wb25lbnQuYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmFtZS5zdGFydHNXaXRoKCdpNV8nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2F0dHInKSkge1xuICAgICAgICAgICAgaWYgKG5hbWVbN10gIT09ICc6JyAmJiBuYW1lWzddICE9PSAnXycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdhdHRyJywgZGV0YWlsOiBuYW1lLnNsaWNlKDgpIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9ib29sJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbN10gIT09ICc6JyAmJiBuYW1lWzddICE9PSAnXycgJiYgbmFtZVs3XSAhPT0gJy0nICYmIG5hbWVbN10gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzddID09PSAnLScgfHwgbmFtZVs3XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDcpICsgbmFtZS5zbGljZSg4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5kaW5nIGF0dHJpYnV0ZSBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnYm9vbE5lZ2F0aXZlJyA6ICdib29sJywgZGV0YWlsOiBuYW1lLnNsaWNlKDgpIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9zd2l0Y2gnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZVs5XSAhPT0gJzonICYmIG5hbWVbOV0gIT09ICdfJyAmJiBuYW1lWzldICE9PSAnLScgJiYgbmFtZVs5XSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3aXRjaCBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVbOV0gPT09ICctJyB8fCBuYW1lWzldID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgOSkgKyBuYW1lLnNsaWNlKDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDExKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2xhc3Mgc3dpdGNoIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdzd2l0Y2hDbGFzc05lZ2F0aXZlJyA6ICdzd2l0Y2hDbGFzcycsIGRldGFpbDogbmFtZS5zbGljZSgxMCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2lmJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWUuc2xpY2UoLTEpID09PSAnLScgfHwgbmFtZS5zbGljZSgtMSkgPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2lmTmVnYXRpdmUnIDogJ2lmJyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfbG9vcCcpKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2k1X2xvb3A6bnVsbCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbG9vcCcsIGRldGFpbDogJ251bGwnIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbG9vcCcgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X3RhcmdldCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHsgdHlwZTogJ3RhcmdldCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pbnB1dCcpKSB7XG4gICAgICAgICAgICBjb25zdCB0d29XYXkgPSBuYW1lLmVuZHNXaXRoKCdfdmFsdWUnKSB8fCBuYW1lLmVuZHNXaXRoKCc6Jyk7XG4gICAgICAgICAgICByZXR1cm4gKHsgdHlwZTogJ2lucHV0JywgZGV0YWlsOiB0d29XYXkgPyAnMndheScgOiAnJyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0eXBlOiBuYW1lLnNsaWNlKDMpIH07XG4gICAgfVxufVxuZXhwb3J0cy5Cb3VuZENvbXBvbmVudCA9IEJvdW5kQ29tcG9uZW50O1xuLy8gVXNlIGEgY3VzdG9tIGVsZW1lbnQgdG8gY3JlYXRlIGEgcmVwbGFjZW1lbnQgdGFnIHRoYXQgaXMgbm90IGxpbWl0ZWQsIGFzIHNwYW4gaXMsIHRvIGNvbnRhaW5pbmcgbm8gYmxvY2sgZWxlbWVudHMuXG4vLyBObyBsb2dpYywgbm8gc3BlY2lhbCBkaXNwbGF5IGRldGFpbHMuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbmNsYXNzIFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5leHBvcnRzLlRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSA9IFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEZvcm1GaWVsZFZhbHVlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Gb3JtRmllbGRWYWx1ZVwiKTtcbmNvbnN0IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xID0gcmVxdWlyZShcIi4uL0h0bWwvUXVlcnlTZWxlY3Rvck5vZGVMaXN0XCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgR2V0VW5pcXVlSWRfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuLyoqXG4gKiBBIGNsYXNzIHdpdGggYSBjb250ZW50IHByb3BlcnR5IHRoYXQgcG9pbnRzIHRvIHNvbWV0aGluZyBvbiB0aGUgcGFnZSwgYWxvbmcgd2l0aCBzb21lIG9mIGhlbHBlciBtZXRob2RzLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBhcyBhIGJhc2UgY2xhc3MgZm9yIG90aGVyIGNsYXNzZXMsIHNvIGl0J3MgbWFya2VkIGFic3RyYWN0LiBJdCBqdXN0IGRvZXNuJ3RcbiAqIG1ha2Ugc2Vuc2UgdG8gbWUgdG8gY3JlYXRlIENvbXBvbmVudCB3aXRoIG5vdGhpbmcgY3VzdG9taXplZC4gSnVzdCBjcmVhdGUgYW4gSFRNTEVsZW1lbnQuIFRoZSBoZWxwZXJzIGFyZW4ndCByZWFsbHlcbiAqIHRoYXQgaW1wcmVzc2l2ZSwgd2hlbiB5b3UgY29uc2lkZXIgdGhhdCB0aGUgdHJhZGVvZmYgaXMgaGF2aW5nIHRvIHJlZmVyZW5jZSBvYmouY29udGVudCB0byBtb2RpZnkgdGhlIERPTS5cbiAqL1xuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCB1bmRlcnN0YW5kIHRoYXQgdGhpcy5jb250ZW50IGlzIHNldCBpbiBBTEwgb2YgdGhlIHByaXZhdGUgY3RvciBmdW5jdGlvbnMuXG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIGlmIChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgX2N0b3Jfc3RyaW5nLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncyAmJiBhcmdzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKGFyZ3MucHJvcGVydGllcyB8fCB7fSwgeyBpbm5lckhUTUw6IGFyZ3MuaW5uZXJIdG1sIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfbG9va3VwLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWFyZ3MpIHtcbiAgICAgICAgICAgIF9jdG9yX2VtcHR5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5lbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKGFyZ3MucHJvcGVydGllcyB8fCB7fSwgeyBpbm5lckhUTUw6IGFyZ3MuaW5uZXJIdG1sIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2N0b3JfaW5uZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hlY2tJbmxpbmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAvLyBBbmd1bGFyIG1hdGVyaWFsIGRvZXMgc29tZXRoaW5nIGxpa2UgdGhpcy4gSW4gdGhpcyBjYXNlLCB0aGVyZSdzIG5vIGZ1bmN0aW9uYWxpdHkgYmVoaW5kIGl0LCBidXQgaXQgZG9lcyBtYWtlIGl0XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgYSBkZXZlbG9wZXIgdG8gc2VlIHRoYXQgYW4gZWxlbWVudCBpcyBhIGNvbXBvbmVudCBhbmQgd2hhdCB0eXBlIGl0IGlzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc25ha2VfY2FzZSA9ICdpdl8nICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKDEpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKShbYS16XSkvZywgXCIkMSAkMiQzXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9cXEIoPz1bQS1aXXsyLH0pLylcbiAgICAgICAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuam9pbignXycpXG4gICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKHNuYWtlX2Nhc2UsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29tcG9uZW50IGhhcyBzb21lIHdlaXJkIG5hbWUsIG5vIHByb2JsZW0uIFRoaXMgaXMganVzdCBhbiBpbmZvIGZpZWxkIGFueXdheS5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcENvbXBvbmVudCgpO1xuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9lbXB0eSgpIHtcbiAgICAgICAgICAgIC8vIE5vIGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBmaW5lIGFzIGxvbmcgYXMgVEVsZW1lbnQgaXMgRElWLiBObyB3YXkgdG8gdmVyaWZ5IHRoYXQgYXMgaXQncyBhIHR5cGVzY3JpcHQgaWxsdXNpb24uIEpTIGRvZXNuJ3Qgc2VlIHR5cGUgcGFyYW1ldGVycy5cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9sb29rdXAoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgZXhpc3RpbmdFbGVtZW50LlxuICAgICAgICAgICAgLy8gVGhlIG1haW4gcmVhc29uIGl0IGV4aXN0cyBpcyB0aGF0IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIGRvZXNuJ3QgcmV0dXJuIHRoZSBjb3JyZWN0IHR5cGUgKGl0J3Mgbm90IGdlbmVyaWMpLFxuICAgICAgICAgICAgLy8gc28gdHlwZXNjcmlwdCBmcmVha3Mgb3V0IGFuZCB0aGlua3MgaXQgc2hvdWxkIGJlIGEgU1RSSU5HLCBpbiBzcGl0ZSBvZiB0aGUgdHlwZSBkZWZpbml0aW9uIG5vdCBiZWluZyBhbnl0aGluZ1xuICAgICAgICAgICAgLy8gbGlrZSB0aGF0LiBJdCdzIGp1c3QgZWFzaWVyIHRvIHVzZSB0aGlzIHRoYW4gdG8gcmVtZW1iZXIgXCJvaCwgcmlnaHQsIGkgaGF2ZSB0byB1c2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpLCB3aGljaCBpcyBnZW5lcmljXCIuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gKGV4aXN0aW5nRWxlbWVudC5wYXJlbnQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3IoZXhpc3RpbmdFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBzZWxlY3RvciBjb3VsZCBub3QgZmluZCBlbGVtZW50LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBpcyBuYXN0eSBidXQgaXQgbWFrZXMgVHlwZVNjcmlwdCBoYXBweSB3aXRob3V0IGNyZWF0aW5nIGEgbmV3IG9iamVjdCBjb3B5XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBfY3Rvcl9leGlzdGluZ0VsZW1lbnQuY2FsbCh0aGlzLCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2V4aXN0aW5nRWxlbWVudChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGV4aXN0aW5nRWxlbWVudC5lbGVtZW50O1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudCwgZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2lubmVySHRtbChuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBOZXcgZWxlbWVudC4gVXNlciBzcGVjaWZpZXMgdGhlIGlubmVyIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBhbiBlbXB0eSBvYmplY3QgbGlrZSB7fSwgcHJhY3RpY2FsbHkgdGhlIHNhbWUgYXMgY2FsbGluZyBpdCB3aXRoIG5vIGFyZ3NcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0geyBpbm5lckhUTUw6IG5ld0VsZW1lbnQuaW5uZXJIdG1sIHx8ICcnIH07XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudC50eXBlIHx8IEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHByb3BzLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29udGVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9vdXRlckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gVXNlciBzcGVjaWZpZXMgdGhlIGZ1bGwgSFRNTCBmb3IgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgaXQgY2FuJ3QgYmUgdHlwZSBjaGVja2VkLiBKUyBjYW4ndCBzZWUgd2hhdCBURWxlbWVudCBpcy5cbiAgICAgICAgICAgIGNvbnN0IHRtcGRpdiA9IENyZWF0ZUVsZW1lbnRfMS5kaXYobmV3RWxlbWVudC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXBkaXYuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdG1wZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5ld0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShhdHRyLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIG5ld0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTcGVjaWZpZWQgSUQgdGFrZXMgcHJlY2VkZW5jZVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX3N0cmluZyhuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTdHJpbmcgYnkgaXRzZWxmIGlzIGEgc2hvcnRjdXQgZm9yIG91dGVySHRtbFxuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgeyBvdXRlckh0bWw6IG5ld0VsZW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgdG8gY29udmVydCBlbGVtZW50cyB0byBjb21wb25lbnRzLiBJdCdzIG1vc3QgdXNlZnVsIGZvciBjdXN0b20gdGFncywgZm9yIGV4YW1wbGUsIDxteS1jb21wb25lbnQ+PC9teS1jb21wb25lbnQ+LlxuICAgICAqIEl0IHdpbGwgYmVjb21lIDxkaXYgaWQ9XCJmb29cIj5XaGF0ZXZlciB0aGUgY29tcG9uZW50IGNvbnRlbnQgaXM8L2Rpdj4uXG4gICAgICpcbiAgICAgKiBJdCBkb2Vzbid0IGhhdmUgdG8gYmUgYSBjdXN0b20gdGFnLiBJdCBjb3VsZCBiZSBhIGNsYXNzLCBsaWtlIDxwIGNsYXNzPSdiaW5kLXRvLW1vZGVsXCI+IChzZWxlY3Rvcj0nLmJpbmQtdG8tbW9kZWwnKVxuICAgICAqIG9yIDxwIGljaGlnbz4gKHNlbGVjdG9yPSdbaWNoaWdvXScpLlxuICAgICAqXG4gICAgICogVG8gY29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICBjb25zdCBuZXdDb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yIHx8IHRoaXM7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX2dldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VFbGVtZW50V2l0aENvbXBvbmVudChlbGVtZW50LCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZWxlbWVudCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIF9pbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSB0aGlzLl9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IsIG9wdGlvbnMucGFyZW50KTtcbiAgICAgICAgZm9yIChjb25zdCBjb250YWluZXIgb2YgY29udGFpbmVycykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIC8vIENhbid0IGhhdmUgZHVwZSBJRHMgYmVpbmcgY3JlYXRlZCBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY29udGFpbmVycy4gVGhlcmUgYXJlIDMgcGxhY2VzIHdoZXJlIElEIGNhbiBiZSBzZXQuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5pZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdwcm9wZXJ0aWVzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5wcm9wZXJ0aWVzLmlkOyAvLyBET00gcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2F0dHJpYnV0ZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHJpYnV0ZXMuaWQ7IC8vIEhUTUwgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlcGxhY2VyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY29udmVydGVyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIHN0YXRpYyBfbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRlbXB0cyB0byBwcmVzZXJ2ZSB0aGUgYXR0cmlidXRlcyBzZXQgb24gdGhlIHJlcGxhY2VkIGVsZW1lbnQuIFRoYXQgb3BlbnMgYW4gdWdseSBjYW4gb2Ygd29ybXMsXG4gICAgICAgIC8vIGJ1dCBpdCBzaG91bGQgbWFrZSByZXBsYWNlbWVudCBjb21wb25lbnRzIG1vcmUgdXNlZnVsIGJlY2F1c2UgaXQgYWxsb3dzIHRoZW0gdG8gdmFyeS5cbiAgICAgICAgLy8gSXQgZG9lcyBtYWtlIGEgYnJ1dGFsIGp1Z2dsaW5nIGFjdDpcbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGlubmVySFRNTCwgd2Ugd2FudCB0byB0YWtlIGl0LlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBpbm5lckhUTUwgc2hvdWxkIG92ZXJyaWRlIHRoZSBleGlzdGluZyBlbGVtZW50J3MuXG4gICAgICAgIC8vIElmIHRoZSBleGlzdGluZyBlbGVtZW50IGhhcyBhdHRyaWJ1dGVzLCB3ZSB3YW50IHRvIHRha2UgdGhlbS5cbiAgICAgICAgLy8gSWYgb3V0ZXJIVE1MIGlzIHByb3ZpZGVkLCB0aGUgb3V0ZXJIVE1MJ3MgYXR0cmlidXRlcyBzaG91bGQgb3ZlcnJpZGUgdGhlbS5cbiAgICAgICAgLy8gRm9yIGFueSBhdHRyaWJ1dGVzIHBhc3NlZCBpbiBPUFRJT05TLCB0aGV5IHNob3VsZCBvdmVycmlkZSBhbnl0aGluZyB0aGF0IGNhbWUgYmVmb3JlLlxuICAgICAgICAvLyBGb3IgYW55IHByb3BlcnRpZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIE9ubHkgdGhlIGxhc3QgMiBhcmUgaGFuZGxlZCBpbiB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yLiBBbmQgaWYgd2UncmUgbm90IGNhcmVmdWwsIHdlIGNvdWxkIGJyZWFrIHRoZW0uXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7IGlubmVySFRNTDogZXhpc3RpbmdFbGVtZW50LmlubmVySFRNTCB9O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgLy8gVGhpcyBpcyB1Z2x5IGJlY2F1c2UgaXQgaGFwcGVucyBhZ2FpbiBpbiB0aGUgY29uc3RydWN0b3IuIE5vIG90aGVyIGNsZWFuIHdheSB0byBwYXJzZSB0aGUgZWxlbWVudCBhdHRyaWJ1dGVzLCB0aG91Z2guXG4gICAgICAgIGlmIChvcHQub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG9wdC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXAuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wMiA9IHRtcC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIFRoZSBvdXRlciBIVE1MIGF0dHJpYnV0ZXMgZ2V0IHBpY2tlZCB1cCBhdXRvbWF0aWNhbGx5IHdoZW4gYWRkZWQgdG8gdGhlIERPTSwgc28gd2UgcmVhbGx5XG4gICAgICAgICAgICAvLyBqdXN0IG5lZWQgdG8gZGlzY2FyZCB0aGUgbWF0Y2hpbmcgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcyBvZiB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmlubmVySFRNTDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKHRtcDIuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNbYXR0ci5uYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIG9wdC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgb3B0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIG9wdC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9XG4gICAgc3RhdGljIF9nZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG9wdDtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgcmVwbGFjaW5nIHRoZSBvdXRlciBIVE1MXG4gICAgICAgICAgICBvcHQgPSB7IHJlcGxhY2U6IHRydWUsIG91dGVySHRtbDogb3B0aW9ucyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCBrbm93IHRoYXQgb3B0aW9ucyAhPT0gJ3N0cmluZycgKGNhbid0IHJlYWQgXCJlbHNlIGlmXCIgY2xhdXNlKVxuICAgICAgICAgICAgb3B0ID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnRXaXRoQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih7IGVsZW1lbnQ6IGV4aXN0aW5nRWxlbWVudCB9KTtcbiAgICB9XG4gICAgc3RhdGljIF9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJJ3ZlIGRvbmUgdGhpcyBteXNlbGYsIHdoaWNoIHJlc3VsdHMgaW4gYSBzaWxlbnQgZmFpbHVyZSBpZiBhY2NpZGVudGFsLlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5qZWN0aW9uIHNlbGVjdG9yIGlzIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnW2ljaGlnb10nO1xuICAgICAgICAvLyBMb29rIHVwIHRoZSBlbGVtZW50cyB0byBlaXRoZXIgcmVwbGFjZSBvciBjb252ZXJ0XG4gICAgICAgIGxldCBjb250YWluZXJzO1xuICAgICAgICBpZiAocGFyZW50ICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IHNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IFtzZWxlY3Rvcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcnM7XG4gICAgfVxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5pZDtcbiAgICB9XG4gICAgc2V0IGlkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pZCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgaW5uZXJIVE1MKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmlubmVySFRNTDtcbiAgICB9XG4gICAgc2V0IGlubmVySFRNTCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgLy8gV2lsbCByZXR1cm4gdW5kZWZpbmVkIGlmIGNvbnRlbnQgaXMgbm90IGEgZm9ybSBmaWVsZCB0eXBlXG4gICAgICAgIHJldHVybiBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKHRoaXMuY29udGVudCk7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICAvLyBXaWxsIGxvZyBhIHdhcm5pbmcgaWYgY29udGVudCBpcyBub3QgYSBmb3JtIGZpZWxkIHR5cGVcbiAgICAgICAgRm9ybUZpZWxkVmFsdWVfMS5zZXRGb3JtRmllbGRWYWx1ZSh0aGlzLmNvbnRlbnQsIHZhbHVlKTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc05hbWU7XG4gICAgfVxuICAgIHNldCBjbGFzc05hbWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTmFtZSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNsYXNzTGlzdDtcbiAgICB9XG4gICAgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LnN0eWxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gSFRNTCBldmVudCBsaXN0ZW5lciBvbiB0aGUgQ29tcG9uZW50IGNvbnRlbnQuIEZsdWVudC5cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggdGhlIEhUTUwgZm9yIGk1X2V2ZW50IG9yIDpldmVudCBhdHRyaWJ1dGVzIGFuZCBhZGQgZXZlbnQgbGlzdGVuZXJzIGFjY29yZGluZyB0byBpbmxpbmUgY3VzdG9tIGF0dHJpYnV0ZXMuXG4gICAgICogRmlsdGVyIGJ5IG1hdGNoaW5nIHRoZSBjb21wb25lbnRGaWx0ZXIgaW5wdXQgd2l0aCBhbiBhdHRyaWJ1dGUgbGlrZSBjb21wb25lbnQ9XCJjb21wb25lbnRGaWx0ZXJcIi5cbiAgICAgKiBFbmNsb3NlIHRoZSBldmVudCB0eXBlIGluIHBhcmVudGhlc2VzLCBhbmQgZm9yIHRoZSB2YWx1ZSwgZW50ZXIgdGhlIG5hbWUgb2YgYSBtZXRob2QgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICogRXhhbXBsZTogPGZvcm0gOmV2ZW50IChjbGljayk9XCJzdWJtaXRUaGVGb3JtXCI+PC9mb3JtPlxuICAgICAqIFRoaXMgaXMgYWxzbyBhbGxvd2VkOiA8Zm9ybSA6ZXZlbnQgX2NsaWNrXz1cInN1Ym1pdFRoZUZvcm1cIj48L2Zvcm0+XG4gICAgICovXG4gICAgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoY29tcG9uZW50RmlsdGVyKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgd2UgY291bGQgc2tpcCB0aGlzIGluaXRpYWwgZmlsdGVyLCBsaWtlIGFuZ3VsYXIgZG9lcy4gQnV0IHRoZXJlIGlzIG5vIENTUyBzZWxlY3RvciBmb3JcbiAgICAgICAgLy8gYXR0cmlidXRlIG5hbWUgYmVnaW5zIHdpdGggb3IgZW5kcyB3aXRoLiBbYXR0cl49XSBpcyBmb3IgdGhlIFZBTFVFIGJlZ2lubmluZyB3aXRoIHNvbWV0aGluZy5cbiAgICAgICAgLy8gVGhpcyBpbmNsdWRlcyB0aGUgY29udGVudCBpdHNlbGYgaW4gaXRzIGNoZWNrLlxuICAgICAgICBmb3IgKGNvbnN0IGVsZSBvZiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKFt0aGlzLmNvbnRlbnRdLCAnW2k1X2V2ZW50XSwgW1xcXFwwMDAwM0FldmVudF0sIFtkYXRhLWk1X2V2ZW50XScpKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50RmlsdGVyICYmIGVsZS5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICE9PSBjb21wb25lbnRGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShlbGUuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBsZXQgZXZlbnREZWZpbml0aW9uID0gY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZS5zdGFydHNXaXRoKCcoJykgJiYgZi5uYW1lLmVuZHNXaXRoKCcpJykgJiYgZi5uYW1lLmxlbmd0aCA+IDIpO1xuICAgICAgICAgICAgaWYgKCFldmVudERlZmluaXRpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZmluZCBieSBhbHRlcm5hdGUgc3ludGF4LiBUaGlzIG9uZSB3b3JrcyBiZXR0ZXIgd2l0aCBzZXRBdHRyaWJ1dGUoKS5cbiAgICAgICAgICAgICAgICBldmVudERlZmluaXRpb24gPSBjdXJyZW50QXR0cmlidXRlcy5maW5kKGYgPT4gZi5uYW1lLnN0YXJ0c1dpdGgoJ18nKSAmJiBmLm5hbWUuZW5kc1dpdGgoJ18nKSAmJiBmLm5hbWUubGVuZ3RoID4gMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWV2ZW50RGVmaW5pdGlvbiB8fCAhZXZlbnREZWZpbml0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCBkZWZpbml0aW9uIG5vdCBkZWNsYXJlZCBmb3IgZWxlbWVudCAke2VsZS5pZCB8fCBlbGUudGFnTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXNbZXZlbnREZWZpbml0aW9uLnZhbHVlXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIYW5kbGVyIG1ldGhvZCBmb3IgZWxlbWVudCAke2VsZS5pZCB8fCBlbGUudGFnTmFtZX0gJHtldmVudERlZmluaXRpb24udmFsdWV9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudERlZmluaXRpb24ubmFtZS5zbGljZSgxLCAtMSksIG1ldGhvZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXBwZW5kKG5ld0NoaWxkKSB7XG4gICAgICAgIGlmIChndWFyZChuZXdDaGlsZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZC5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRDaGlsZChuZXdDaGlsZCkge1xuICAgICAgICBpZiAoZ3VhcmQobmV3Q2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZFRvUGFyZW50KHBhcmVudCkge1xuICAgICAgICBpZiAoZ3VhcmQocGFyZW50KSkge1xuICAgICAgICAgICAgcGFyZW50LmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBjb21wb25lbnQgdG8gQ29tcG9uZW50TWFwLlxuICAgICAqL1xuICAgIG1hcENvbXBvbmVudCgpIHtcbiAgICAgICAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbnRlbnQgaGFzIGFscmVhZHkgYmVlbiByZWxhdGVkIHRvIGEgZGlmZmVyZW50IGNvbXBvbmVudFxuICAgICAgICBpZiAoQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50KHRoaXMuY29udGVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGVudCBhbHJlYWR5IHJlZmVyZW5jZWQgYnkgYSBjb21wb25lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5zZXQodGhpcy5jb250ZW50LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgY29tcG9uZW50IGZyb20gQ29tcG9uZW50TWFwLiBTb21ldGltZXMgeW91IG1pZ2h0IG5lZWQgdG8gdXNlIHRoaXMuIEJ1dCBob3BlZnVsbHkgcmFyZWx5LCBiZWNhdXNlIGl0J3MgdXNpbmcgYSBXZWFrTWFwLFxuICAgICAqL1xuICAgIHVubWFwQ29tcG9uZW50KCkge1xuICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5kZWxldGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2YgY29tcG9uZW50cyB0aGF0IGFyZSBuZXN0ZWQgaW5zaWRlIHRoaXMgY29tcG9uZW50LlxuICAgICAqL1xuICAgICpnZXRBbGxDaGlsZENvbXBvbmVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgZSBvZiB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnKicpKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQoZSk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgeWllbGQgY29tcG9uZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldFN0eWxlKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnc3RyaW5nJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgLy8gVFMganVzdCBmb3Jnb3QgdGhhdCBwcm9wZXJ0eSBpcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LlxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHByb3BlcnR5W3Byb3BdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRDbGFzcyhjbGFzc05hbWVzKSB7XG4gICAgICAgIGlmICghY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSBcInN0cmluZ1wiICYmIGNsYXNzTmFtZXMuaW5jbHVkZXMoXCIgXCIpKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5zcGxpdChcIiBcIikuZmlsdGVyKHEgPT4gcSAhPT0gXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBbY2xhc3NOYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCZWNhdXNlIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkgc2VhcmNoZXMgYWxsIHRoZSB3YXkgZG93biwgaW50byBuZXN0ZWQgY29tcG9uZW50cywgaXQgY2FuJ3QgYmUgY2FsbGVkXG4gICAgICogYnkgZGVmYXVsdC4gSXQganVzdCB0aHJvd3MgZXJyb3JzIG9uIGFsbCBidXQgc2ltcGxlIHRlc3QgY2FzZXMuIEJ1dCBiZWNhdXNlIHRoZXNlIGV2ZW50cyBhbG1vc3QgYWx3YXlzIGV4aXN0XG4gICAgICogaW50ZXJuYWwgdG8gdGhlIGNvbXBvbmVudCAoZS5nLiBvbiBidXR0b25zKSwgaXQgY2FuJ3QgYmUgbGltaXRlZC4gVGhpcyBjYW4gYmUgY29uZnVzaW5nIHdpdGhvdXQgc29tZSBraW5kIG9mXG4gICAgICogbWVzc2FnZS5cbiAgICAgKi9cbiAgICBfY2hlY2tJbmxpbmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGUgb2YgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChbdGhpcy5jb250ZW50XSwgJ1tpNV9ldmVudF0sIFtcXFxcMDAwMDNBZXZlbnRdLCBbZGF0YS1pNV9ldmVudF0nKSkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuX19ldmVudF93YXJuaW5nX18pIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnSW5saW5lIGV2ZW50IGxpc3RlbmVycyBhcmUgY29uZmlndXJlZC4gUmVtZW1iZXIgdG8gY2FsbCBhZGRJbmxpbmVFdmVudExpc3RlbmVycygpLicpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlbGV0ZSB3aW5kb3cuX19ldmVudF93YXJuaW5nX18sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIHF1ZXN0aW9uIG5lZWRzIHRvIGJlIGFza2VkOiBpZiB5b3UgY2FuIGFkZCBhIGNvbXBvbmVudCB0byBhIHBhZ2UgYnkgZG9pbmcgZWxlbWVudC5hcHBlbmRDaGlsZChjb21wb25lbnQuY29udGVudCksXG4gKiBob3cgZG8geW91IGRvIGZyb20gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpIGFuZCBnZXQgdG8gY29tcG9uZW50LCBub3QgY29tcG9uZW50LmNvbnRlbnQ/IFRoaXMgaXMgaG93LlxuICpcbiAqIHZhciBjb21wb25lbnQgPSBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpKTtcbiAqXG4gKiBUaGlzIHdpbGwgd29yayBhcyBsb25nIGFzIENvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldChjb250ZW50LCBjb21wb25lbnQpIGhhcyBiZWVuIGNhbGxlZCBhdCBzb21lIHBvaW50LlxuICpcbiAqIFRoaXMgaXMgdGhlIGFwcHJvdmVkIHdheSBvZiBkb2luZyBpdC4gQW5vdGhlciBwb3NzaWJsZSBzb2x1dGlvbiB3b3VsZCBiZSB0aGUgdXNlIG9mIGV4cGFuZG8gcHJvcGVydGllcyxcbiAqIGZvciBleGFtcGxlIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKS5yZWxhdGVkQ29tcG9uZW50ID0gY29tcG9uZW50LiBUaGlzIHdvcmtzIGFuZCBpdCdzIHN1cGVyIHNpbXBsZSxcbiAqIGJ1dCBzZWVtcyB0byBiZSBmcm93bmVkIHVwb24gLi4uIGl0IGhhcyBiZWVuIGtub3duIHRvIGNyZWF0ZSBtZW1vcnkgbGVha3MgaW4gdGhlIHBhc3QuIFdlYWtNYXAgaXMgdGhlIG9iamVjdFxuICogc3BlY2lmaWNhbGx5IGNyZWF0ZWQgZm9yIHRoaXMgdXNlIGNhc2UsIHNvIHRoYXQgaXMgdXNlZCBoZXJlLlxuICpcbiAqIElmIGV4dGVuc2lvbiBtZXRob2RzIGFyZSBsb2FkZWQsIHlvdSBjYW4gdXNlIHRoZSBlbGVtZW50LmdldENvbXBvbmVudCgpIHNob3J0Y3V0LlxuICovXG5jbGFzcyBDb21wb25lbnRNYXAge1xufVxuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0cy5Db21wb25lbnRNYXAgPSBDb21wb25lbnRNYXA7XG5mdW5jdGlvbiBnZXRDb21wb25lbnQoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChlbGVtZW50KTtcbiAgICB9XG59XG5leHBvcnRzLmdldENvbXBvbmVudCA9IGdldENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Db21wb25lbnRCaW5kaW5nT3B0aW9ucyA9IENvbXBvbmVudEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBvcHQuZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zID0gRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG9wdC5zZWxlY3RvcjtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMgPSBFeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBJbm5lckh0bWxCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW5uZXJIdG1sQmluZGluZ09wdGlvbnMgPSBJbm5lckh0bWxCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgT3V0ZXJIdG1sQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5vdXRlckh0bWwgPSBvcHQub3V0ZXJIdG1sO1xuICAgIH1cbn1cbmV4cG9ydHMuT3V0ZXJIdG1sQmluZGluZ09wdGlvbnMgPSBPdXRlckh0bWxCaW5kaW5nT3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG5mdW5jdGlvbiBvYnNlcnZhYmxlQ2hlY2sob2JqKSB7XG4gICAgLy8gTm90IGFuIGV4aGF1c3RpdmUgdGVzdCBidXQgaXQncyB0aGUgaW1wb3J0YW50IGJpdC5cbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICdjaGFuZ2VIYW5kbGVyJyBpbiBvYmogJiYgb2JqLmNoYW5nZUhhbmRsZXIgaW5zdGFuY2VvZiBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXI7XG59XG5leHBvcnRzLm9ic2VydmFibGVDaGVjayA9IG9ic2VydmFibGVDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBPYmplY3RGdWxsQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZUJhc2VcIik7XG5jbGFzcyBUcmFpdFNvdXJjZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGRpc2FibGVBc3luYykge1xuICAgICAgICBzdXBlcih7IG5hbWU6ICdBcnJheVByb3h5JywgZGlzYWJsZUFzeW5jIH0pO1xuICAgIH1cbn1cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuY2xhc3MgQXJyYXlPYnNlcnZhYmxlIGV4dGVuZHMgQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRNZXJnZWRPYnNlcnZhYmxlKGFyZ3MsIGRpc2FibGVBc3luYykge1xuICAgICAgICAvLyBUaGlzIGlzIHdoZXJlIEkgcmVhbGx5IG5lZWQgbXVsdGlwbGUgaW5oZXJpdGFuY2UuIFRoaXMgbmVlZHMgdG8gaW5oZXJpdCBmcm9tIEFycmF5XG4gICAgICAgIC8vIGJlY2F1c2UgaXQncyBleHRlbmRpbmcgYSBidWlsdC1pbiBjbGFzcy4gSXQgYWxzbyBuZWVkcyB0byBpbmhlcml0IGZyb20gT2JzZXJ2YWJsZUJhc2UuXG4gICAgICAgIC8vIFRocmVlIGNob2ljZXM6XG4gICAgICAgIC8vIDEpIDUwIGxpbmVzIG9mIGNsaXBib2FyZCBpbmhlcml0YW5jZS5cbiAgICAgICAgLy8gMikgQ2hlYXQgaGVhdmlseSBieSB0YWtpbmcgYSB0cmFpdCBhcHByb2FjaC4gVGhpcyBtZWFucyBoYWNrZXJ5IHRvIG1ha2UgVFMgaGFwcHkuXG4gICAgICAgIC8vIDMpIERvIHRoZSBzYW1lIGFzIDIgd2l0aCB0aGUgYnVpbHQtaW4gQXJyYXkgY2xhc3MuIE5vdCBhIHByb2JsZW0gYnV0IHdpdGggIzIgdGhlIGNsYXNzIG5hbWUgYWN0c1xuICAgICAgICAvLyBhcyBhIGhpbnQgdGhhdCBpdCdzIG5vdCBhIGRlZmF1bHQgYXJyYXksIHdoaWNoIGlzIGJldHRlci5cbiAgICAgICAgLy8gIzIgd2lucy5cbiAgICAgICAgY29uc3QgYXJyID0gbmV3IEFycmF5T2JzZXJ2YWJsZSguLi5hcmdzKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24oYXJyLCBuZXcgVHJhaXRTb3VyY2UoZGlzYWJsZUFzeW5jKSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsICdjaGFuZ2VIYW5kbGVyJywgeyBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gT2JqZWN0cyBjcmVhdGVkIHRocm91Z2ggbWFwLCBmaWx0ZXIsIGV0Yywgc2hvdWxkIGJlIGdlbmVyaWMgYXJyYXlzLlxuICAgIHN0YXRpYyBnZXQgW1N5bWJvbC5zcGVjaWVzXSgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5O1xuICAgIH1cbiAgICAvLyBOZWVkcyB0byBiZSBwdWJsaWMgc28gdGhlIHByb3h5IGNhbiBjYWxsIGl0LCBidXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgb3V0c2lkZSB0aGUgQVBJLiBJbWFnaW5lIGl0J3MgaW50ZXJuYWwuXG4gICAgcHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgYXJncywgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgLy8gVGhpcyByZXF1aXJlcyBhIGNoZWF0LiBJdCB3aWxsIGZhaWwgaWYgdGhlIG9iamVjdCBpcyBjcmVhdGVkIHdpdGggbmV3KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xLkFycmF5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgYXJncywgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcnJheU9ic2VydmFibGUgPSBBcnJheU9ic2VydmFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbmNsYXNzIEFycmF5UHJveHlIYW5kbGVyIHtcbiAgICBnZXQodGFyZ2V0LCBrZXksIHByb3h5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2RDYWxsZWQgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gU2lsZW50IHBhc3MtdGhyb3VnaCBvZiBvdGhlciBtZXRob2RzXG4gICAgICAgICAgICBpZiAoQXJyYXlQcm94eUhhbmRsZXIubWV0aG9kc1RvV2F0Y2guaW5kZXhPZihrZXkudG9TdHJpbmcoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZENhbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IE5lZWQgdG8gZXZhbHVhdGUgcGVyZm9ybWFuY2Ugb2YgY29waWVzXG4gICAgICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5WYWwgPSBtZXRob2RDYWxsZWQuYXBwbHkodGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCgnY2FsbCcsIGtleSwgYXJncywgYmVmb3JlLCBhZnRlciwgcHJveHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KSB7XG4gICAgICAgIC8vIFByb2JsZW06IFdlIHdhbnQgdG8gY2FwdHVyZSBvbmx5IGxlbmd0aCBhbmQgW2luZGV4ZXJdIGNhbGxzLCBidXQgSlMgaGFzIG5vIGNvbnNpc3RlbnRcbiAgICAgICAgLy8gd2F5IG9mIGRlZmluaW5nIFtpbmRleGVyXS4gV2hhdCBtYWtlcyBpdCB3b3JzZSBpcyB0aGF0IGlmIGEgc3RyaW5nIGlzIGFuIGludGVnZXIsIGl0IGlzXG4gICAgICAgIC8vIGNvbnZlcnRlZCB0byBhIG51bWJlci4gQW5kIEpTIGRvZXMgbm90IGluY2x1ZGUgYSBidWlsdC1pbiB3YXkgdG8gdGVzdCBpZiBhIG51bWJlciBpcyBhbiBpbnRlZ2VyLlxuICAgICAgICAvLyBTb2x1dGlvbjogQSByZWdleC1iYXNlZCBjaGVjay4gSWNrLiBXYXkgdG8gcmVtaW5kIG1lIEknbSB1c2luZyBKUy5cbiAgICAgICAgaWYgKGtleSAmJiAoa2V5LnRvU3RyaW5nKCkgPT09ICdsZW5ndGgnIHx8IHR5cGVvZiBrZXkgPT09ICdudW1iZXInIHx8IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKGtleSkpKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBOZWVkIHRvIGV2YWx1YXRlIHBlcmZvcm1hbmNlIG9mIGNvcGllc1xuICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCgnc2V0Jywga2V5LCBbdmFsdWVdLCBiZWZvcmUsIGFmdGVyLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgLy8gQ2Fubm90IHJlcG9ydCBwcm94eSBhcyBzZW5kZXIgYmVjYXVzZSBwcm94eSBub3Qgc2VudCB0byB0aGlzIG1ldGhvZFxuICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdkZWxldGUnLCBrZXksIFtdLCBiZWZvcmUsIGFmdGVyLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuLy8gVGhlc2UgYXJlIGFsbCB0aGUgbWV0aG9kcywgbm90IGNvdW50aW5nIGN1c3RvbSBzZXR0ZXJzLCB0aGF0IG11dGF0ZSBhbiBhcnJheS5cbkFycmF5UHJveHlIYW5kbGVyLm1ldGhvZHNUb1dhdGNoID0gWydjb3B5V2l0aGluJywgJ2ZpbGwnLCAncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J107XG5leHBvcnRzLkFycmF5UHJveHlIYW5kbGVyID0gQXJyYXlQcm94eUhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlQmFzZVwiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduXCIpO1xuY2xhc3MgT2JqZWN0T2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIHByb2R1Y2UgYW4gb2JqZWN0IG9ic2VydmFibGUsIGZvciByZWFzb25zIG9mIHNhZmV0eS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0TWVyZ2VkT2JzZXJ2YWJsZShkYXRhLCBkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgLy8gV2UgbmVlZCBzb21ldGhpbmcgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGlucHV0IG9iamVjdCBtZXJnZWQgd2l0aCB0aGUgcHJvcGVydGllcyBvZiB0aGlzLlxuICAgICAgICAvLyBJIGRvbid0IHdhbnQgdG8gYWN0dWFsbHkgbW9kaWZ5IHRoZSBpbnB1dCBvYmplY3QuIEV2ZW4gdGhvdWdoIGl0IFNIT1VMRCBiZSB0aHJvd2F3YXksIEkgZG9uJ3Qga25vdy5cbiAgICAgICAgLy8gQW5kIEkgZG9uJ3Qgd2FudCB0byB0YWtlIHRoZSByaXNrIHRoYXQgc29tZXRoaW5nIGluIHRoZSBpbnB1dCwgYW4gdW5rbm93biBmYWN0b3IsIHdpbGwgbWFrZSB0aGlzIGJsb3cgdXAuXG4gICAgICAgIC8vIEkga25vdyB0aGF0IHRoaXMgY2xhc3MgaGFzIG9ubHkgMiBsZXZlbHMgb2YgaW5oZXJpdGFuY2UgKGN1cnJlbnRseSkgYW5kIGNvbnRhaW5zIG5vdGhpbmcgdmVyeSBjb21wbGV4IGF0IGFueSBsZXZlbC5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24oZGF0YSwgbmV3IE9iamVjdE9ic2VydmFibGUoZGlzYWJsZUFzeW5jKSwgdHJ1ZSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsICdjaGFuZ2VIYW5kbGVyJywgeyBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIHN1cGVyKHsgbmFtZTogXCJPYmplY3RQcm94eVwiLCBkaXNhYmxlQXN5bmMgfSk7XG4gICAgfVxuICAgIC8vIE5lZWRzIHRvIGJlIHB1YmxpYyBzbyB0aGUgcHJveHkgY2FuIGNhbGwgaXQsIGJ1dCBzaG91bGQgbm90IGJlIGNhbGxlZCBvdXRzaWRlIHRoZSBBUEkuIEltYWdpbmUgaXQncyBpbnRlcm5hbC5cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgLy8gVGhpcyBmaWx0ZXJzIG91dCB0aGUgdHJvdWJsZXNvbWUgY2hhbmdlSGFuZGxlciBmaWVsZC5cbiAgICAgICAgcmV0dXJuIHN1cGVyLnRvSlNPTigpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JqZWN0T2JzZXJ2YWJsZSA9IE9iamVjdE9ic2VydmFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE9iamVjdFByb3h5SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoX21ldGhvZHNUb1dhdGNoLCBfd2F0Y2hTZXQsIF93YXRjaERlbGV0ZSwgX3RyaWdnZXJPbmx5T25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fbWV0aG9kc1RvV2F0Y2ggPSBfbWV0aG9kc1RvV2F0Y2g7XG4gICAgICAgIHRoaXMuX3dhdGNoU2V0ID0gX3dhdGNoU2V0O1xuICAgICAgICB0aGlzLl93YXRjaERlbGV0ZSA9IF93YXRjaERlbGV0ZTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IF90cmlnZ2VyT25seU9uQ2hhbmdlO1xuICAgIH1cbiAgICBnZXQodGFyZ2V0LCBrZXksIHByb3h5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2RDYWxsZWQgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gU2lsZW50IHBhc3MtdGhyb3VnaCBvZiBub24td2F0Y2hlZCBtZXRob2RzXG4gICAgICAgICAgICBpZiAodGhpcy5fbWV0aG9kc1RvV2F0Y2guaW5kZXhPZihrZXkudG9TdHJpbmcoKSkgPT09IC0xIHx8IHR5cGVvZiBtZXRob2RDYWxsZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kQ2FsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmV0dXJuIGEgd3JhcHBlciBhcm91bmQgdGhlIG1ldGhvZCB0aGF0IHB1Ymxpc2hlcyB0aGUgY2hhbmdlXG4gICAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5WYWwgPSBtZXRob2RDYWxsZWQuYXBwbHkodGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnY2FsbCcsIGtleSwgdW5kZWZpbmVkLCBhcmdzLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoU2V0KSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIC8vIElmIHRvIGJlIHRyaWdnZXJlZCBvbmx5IG9uIGNoYW5nZSwgY2hlY2sgb2xkVmFsdWUgYW5kIG5ld1ZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGRWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCBrZXksIG9sZFZhbHVlLCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgICAgIGlmICh0aGlzLl93YXRjaERlbGV0ZSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSk7XG4gICAgICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIC8vIENhbm5vdCByZXBvcnQgcHJveHkgYXMgc2VuZGVyIGJlY2F1c2UgcHJveHkgbm90IHNlbnQgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdkZWxldGUnLCBrZXksIG9sZFZhbHVlLCB1bmRlZmluZWQsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5PYmplY3RQcm94eUhhbmRsZXIgPSBPYmplY3RQcm94eUhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuLyoqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIE9iamVjdC5hc3NpZ24oKSB0aGF0IHVuZGVyc3RhbmRzIE9ic2VydmFibGVQcm9wZXJ0eSxcbiAqIHNvIHRoYXQgaXQgY2FuIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHdpdGhvdXQgd2lwaW5nIG91dCByZWZlcmVuY2VzIHRvIHRoZVxuICogZXhpc3RpbmcgcHJvcGVydHkgd2l0aCB0aGF0IGtleSAod2hpY2ggaXMgd2hhdCB3b3VsZCBoYXBwZW4gaWYgeW91IHVzZWQgcmVndWxhciBPYmplY3QuYXNzaWduKClcbiAqIG9uIGEgbm9uLXByb3hpZWQgb2JqZWN0KS4gIEl0IGNhbiBhbHNvIGJlIHVzZWQgdG8gcmVhZCB0aGUgdmFsdWUgb2YgYW4gT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBvYnNlcnZhYmxlQXNzaWduKHRhcmdldCwgLi4uc291cmNlcykge1xuICAgIHRhcmdldCA9IHRhcmdldCB8fCB7fTtcbiAgICBmb3IgKGNvbnN0IHNyYyBvZiBzb3VyY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNyYykpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwcm9wID0gc3JjW2tleV07XG4gICAgICAgICAgICBjb25zdCB0cHJvcCA9IHRhcmdldFtrZXldO1xuICAgICAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayhzcHJvcCkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBzcHJvcC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbCA9IHNwcm9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHRwcm9wKSkge1xuICAgICAgICAgICAgICAgIHRwcm9wLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLm9ic2VydmFibGVBc3NpZ24gPSBvYnNlcnZhYmxlQXNzaWduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbi8qKlxuICogQ29tbW9uIGxvZ2ljIGJldHdlZW4gdGhlIGRpZmZlcmVudCBvYnNlcnZhYmxlIGNsYXNzZXMuIFRoZXNlIGltcGxlbWVudCBJT2JzZXJ2YWJsZS4gVGhlIGludm9jYXRpb24gaXRzZWxmIHZhcmllcyBmcm9tIGNsYXNzIHRvIGNsYXNzLlxuICovXG5jbGFzcyBPYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoeyBuYW1lLCBmb3J3YXJkVG8sIGJ1YmJsZUZyb20sIGRpc2FibGVBc3luYyB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBpZiAoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3J3YXJkVG8pIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFnRGVsZWdhdGUobmFtZSk7XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGhhcyBmb3Jnb3R0ZW4gdGhhdCBFdmVudEhhbmRsZXIgY2FuIGFjY2VwdCBhbiBhcnJheS5cbiAgICAgICAgLy8gSW4gc3BpdGUgaWYgdGhlIGZhY3QgdGhhdCB0aGlzIHNpZ25hdHVyZSBpcyBpZGVudGljYWwuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIuc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoZSBpbnB1dCdzIGRlbGVnYXRlIHRvIHRoaXMgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBzZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKSB7XG4gICAgICAgIC8vIEpvaW4gdGhlIG90aGVyIGV2ZW50IGhhbmRsZXIgdG8gdGhpcywgc28gdGhhdCB3aGVuIHRoaXMgaXMgaW52b2tlZCwgc28gaXMgdGhlIG90aGVyLlxuICAgICAgICB0aGlzLnN1YnNjcmliZShmb3J3YXJkVG8uY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGlzIG9iamVjdCdzIGRlbGVnYXRlIHRvIHRoZSBpbnB1dCBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGV2ZW50cyByYWlzZWQgb24gdGhlIG90aGVyIGhhbmRsZXIsIHNvIHRoYXQgd2hlbiB0aGF0IGlzIGludm9rZWQsIHNvIGlzIHRoaXNcbiAgICAgICAgLy8gVGhlIHNhbWUgYXMgZm9yd2FyZENoYW5nZUV2ZW50c1RvIGV4Y2VwdCB0aGF0IHRoaXMgaXMgdGhlIHRhcmdldCwgbm90IHRoZSBzb3VyY2UuXG4gICAgICAgIGJ1YmJsZUZyb20uc3Vic2NyaWJlKHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVTZW5kZXIoc2VuZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVMaXN0ZW5lcihzZW5kZXIpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgcHJvYmFibHkgZnJvd25lZCB1cG9uIChzZWUgaG93IFRTIGRvZXNuJ3QgbGlrZSBpdCksIGJ1dCBpdCdzIHZhbGlkIEpTLlxuICAgICAqIEl0J3Mgb25seSBpbnRlbmRlZCBmb3IgdHJvdWJsZXNob290aW5nLCBub3QgcmVhbCBsb2dpYy4gVGhlcmUgYXJlIHRpbWVzIHdoZW4geW91J3JlXG4gICAgICogdHJ5aW5nIHRvIGlkZW50aWZ5IGV4YWN0bHkgd2hpY2ggZGVsZWdhdGVzIGFyZSBzdWJzY3JpYmVkLCBhbmQgdGhpcyBpcyByZWFsbHkgaGFyZCB3aGVuXG4gICAgICogbm90aGluZyBoYXMgaHVtYW4tcmVhZGFibGUgbmFtZXMuXG4gICAgICovXG4gICAgdGFnRGVsZWdhdGUobmFtZSkge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlLl90YWcgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgeCBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoeCAhPT0gXCJjaGFuZ2VIYW5kbGVyXCIgJiYgeCAhPT0gXCJwcml2YXRlUHJvcGVydHkyXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbeF0gPSB0aGlzW3hdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlQmFzZSA9IE9ic2VydmFibGVCYXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIE9ic2VydmFibGVQcm9wZXJ0eSBpcyBhIHByb3BlcnR5IHRoYXQgYXV0b21hdGljYWxseSByYWlzZXMgYSBQcm9wZXJ0eUNoYW5nZWQgZXZlbnQgd2hlbiBpdCBpcyBtb2RpZmllZC4gVGhpcyBpcyBtb3JlXG4gKiBjb252ZW5pZW50IHRoYW4gaGF2aW5nIHRvIGRvIGl0IG1hbnVhbGx5IGV2ZXJ5IHRpbWUgeW91IG5lZWQgaXQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVQcm9wZXJ0eSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBvcHRpb25zLm9ubHlXaGVuQ2hhbmdlZCB8fCBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgJiYgb2xkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnc2V0JywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZCwgdmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIChpZiBhIHN0cmluZykgdGhhdCBoYXMgaGFkIHNwZWNpYWwgSFRNTCBjaGFyYWN0ZXJzIGVzY2FwZWQuXG4gICAgICovXG4gICAgZ2V0IHNhZmVWYWx1ZSgpIHtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlUHJvcGVydHkgPSBPYnNlcnZhYmxlUHJvcGVydHk7XG5mdW5jdGlvbiBvYnNlcnZhYmxlUHJvcGVydHlDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGxpa2UgdGhpcyBiZWNhdXNlIGl0IHNob3VsZCBiZSBjaGVja2luZyBpZiB2YWx1ZSBpcyBhIHNldHRlcixcbiAgICAvLyBhbmQgaXQgaXNuJ3QsIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGNoZWNrLlxuICAgIC8vIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKSBkb2Vzbid0IGNhdGNoIGluaGVyaXRlZCBwcm9wZXJ0aWVzLCBvZlxuICAgIC8vIHdoaWNoIHRoaXMgaXMgYWxtb3N0IGFsd2F5cyBvbmUuXG4gICAgLy8gSSBoYXZlIHRvIGZhbGwgYmFjayB0byBhIGJhc2ljIGluc3RhbmNlIGNoZWNrLlxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVByb3BlcnR5O1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayA9IG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL0FycmF5T2JzZXJ2YWJsZVwiKTtcbmNvbnN0IEFycmF5UHJveHlIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9BcnJheVByb3h5SGFuZGxlclwiKTtcbmNvbnN0IE9iamVjdE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL09iamVjdE9ic2VydmFibGVcIik7XG5jb25zdCBPYmplY3RQcm94eUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL09iamVjdFByb3h5SGFuZGxlclwiKTtcbmNsYXNzIE9ic2VydmFibGVQcm94eSB7XG4gICAgc3RhdGljIHByb3hpbWF0ZShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbW9kZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIFdlIGNhbid0IGRvIGZ1bmN0aW9ucywgbm90IHRoYXQgdGhleSB3b3VsZCBiZSB2ZXJ5IHVzZWZ1bC5cbiAgICAgICAgICAgIC8vIFllcywgdGVjaG5pY2FsbHkgeW91IHNob3VsZCBiZSBhYmxlIHRvIGRlZmluZSBwcm9wZXJ0aWVzIG9uIGEgZnVuY3Rpb24uIFRoZXkgYXJlIGFjdHVhbFxuICAgICAgICAgICAgLy8gb2JqZWN0cy4gIEluIHByYWN0aWNlLCBob3dldmVyLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoKSBzdGlsbCBtYWtlcyB0aGVtIHVuZGVmaW5lZC5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdHlwZTogZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG1vZGVsKSkge1xuICAgICAgICAgICAgLy8gQW4gYXJyYXkgcHJveHkgYWxsb3dzIGNoYW5nZXMgdG8gYW4gYXJyYXkgdG8gYmUgb2JzZXJ2ZWQuIFRoZSBkb3duLXNpZGUgaXMgdGhhdCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgLy8gaXMgYW4gb3JkZXIgb2YgbWFnbml0dWRlIHNsb3dlciB0aGFuIHVzaW5nIGFuIE9ic2VydmFibGVMaXN0LiAgVGhlIHVwLXNpZGUgaXMgdGhhdCBpdCB1c2VzXG4gICAgICAgICAgICAvLyBtb3JlIHRoYW4gYW4gb3JkZXIgb2YgbWFnbml0dWRlIGxlc3MgY29kZS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3hpbWF0ZUFycmF5KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3hpbWF0ZU9iamVjdChtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIGEgc2ltcGxlIHZhbHVlIGlzIHJldHVybmVkLCByZXR1cm4gYSBwcm94eSBoYXZpbmcgYSB2YWx1ZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3hpbWF0ZU9iamVjdCh7IHZhbHVlOiBtb2RlbCB9LCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgY29uZmlndXJhYmxlIHZlcnNpb24gb2YgcHJveGltYXRlKCkgY2FsbGVkIG9uIGFuIG9iamVjdC4gQnkgbWFraW5nIGl0IGdlbmVyYWxpemVkIGFuZCBjb25maWd1cmFibGUsIHRoaXMgYWxsb3dzIHRoZSBjYWxsZXIgdG9cbiAgICAgKiB0cmFjayBtZXRob2RzIHRoYXQgYXJlIGNhbGxlZCwgYmFzZWQgb24gYSBjb25maWd1cmFibGUgbGlzdC5cbiAgICAgKlxuICAgICAqIElmIHRoZSBvYmplY3QgaXMgYSBjb21wbGV4IG9iamVjdCwgd2hlcmUgY2hpbGQgb2JqZWN0cyBhcmUgbW9kaWZpZWQsIG5vdCB0aGUgbWFpbiBvYmplY3QsIGNoYW5nZXMgd291bGQgbm90IGJlIGNhdWdodC5cbiAgICAgKiBPbmUgd2F5IHRvIGhhbmRsZSB0aGF0IGlzIHRvIG1ha2UgdGhlIGNoaWxkIG9iamVjdCBhIHByb3h5LiBBbm90aGVyIHdheSBpcyB0byBhY2Nlc3MgdGhlIGNoaWxkIG9iamVjdCBvbmx5IHRocm91Z2ggbWV0aG9kc1xuICAgICAqIGFuZCB1c2UgdGhpcy5cbiAgICAgKi9cbiAgICBzdGF0aWMgcHJveGltYXRlT2JqZWN0KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQsIG1ldGhvZHNUb1dhdGNoID0gW10sIHdhdGNoU2V0ID0gdHJ1ZSwgd2F0Y2hEZWxldGUgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbW9kZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIFdlIGNhbid0IGRvIGZ1bmN0aW9ucywgbm90IHRoYXQgdGhleSB3b3VsZCBiZSB2ZXJ5IHVzZWZ1bC5cbiAgICAgICAgICAgIC8vIFllcywgdGVjaG5pY2FsbHkgeW91IHNob3VsZCBiZSBhYmxlIHRvIGRlZmluZSBwcm9wZXJ0aWVzIG9uIGEgZnVuY3Rpb24uIFRoZXkgYXJlIGFjdHVhbFxuICAgICAgICAgICAgLy8gb2JqZWN0cy4gIEluIHByYWN0aWNlLCBob3dldmVyLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoKSBzdGlsbCBtYWtlcyB0aGVtIHVuZGVmaW5lZC5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdHlwZTogZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgSU9ic2VydmFibGUgbWV0aG9kcyB0byB0aGUgbW9kZWwgc28gdGhhdCBpdCBjYW4gcmFpc2UgZXZlbnRzLlxuICAgICAgICAvLyBXZSBtdXN0IGV4dGVuZCB0aGUgb3JpZ2luYWwgY2xhc3MgKG9yIGF0IGxlYXN0IHRoZSBvYmplY3QpLlxuICAgICAgICBjb25zdCB0YXJnZXQgPSBPYmplY3RPYnNlcnZhYmxlXzEuT2JqZWN0T2JzZXJ2YWJsZS5nZXRNZXJnZWRPYnNlcnZhYmxlKG1vZGVsLCBkaXNhYmxlQXN5bmMpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IE9iamVjdFByb3h5SGFuZGxlcl8xLk9iamVjdFByb3h5SGFuZGxlcihtZXRob2RzVG9XYXRjaCB8fCBbXSwgd2F0Y2hTZXQgfHwgZmFsc2UsIHdhdGNoRGVsZXRlIHx8IGZhbHNlLCBvbmx5SWZDaGFuZ2VkIHx8IGZhbHNlKTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKTtcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5Ll9tb2RlbHMuc2V0KHByb3h5LCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb3hpbWF0ZSBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBzdGF0aWMgcHJveGltYXRlQXJyYXkobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCkge1xuICAgICAgICAvLyBBZGQgSU9ic2VydmFibGUgbWV0aG9kcyB0byB0aGUgbW9kZWwgc28gdGhhdCBpdCBjYW4gcmFpc2UgZXZlbnRzLlxuICAgICAgICAvLyBXZSBtdXN0IGV4dGVuZCB0aGUgb3JpZ2luYWwgYXJyYXkgY2xhc3MgKG9yIGF0IGxlYXN0IHRoZSBhcnJheSBvYmplY3QpLlxuICAgICAgICBjb25zdCB0YXJnZXQgPSBBcnJheU9ic2VydmFibGVfMS5BcnJheU9ic2VydmFibGUuZ2V0TWVyZ2VkT2JzZXJ2YWJsZShtb2RlbCwgZGlzYWJsZUFzeW5jKTtcbiAgICAgICAgLy8gVGhlIHR5cGUgaGVyZSBpc24ndCBhY2N1cmF0ZSwgYnV0IEkgaGF2ZSBubyBnb29kIHdheSB0byBwYXNzIHRoZSBrZXkgdHlwZSB3aXRob3V0IG1ha2luZyB0aGlzIGNsYXNzIG9ubHkgd29yayBmb3IgYXJyYXlzLlxuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IEFycmF5UHJveHlIYW5kbGVyXzEuQXJyYXlQcm94eUhhbmRsZXIoKTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKTtcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5Ll9tb2RlbHMuc2V0KHByb3h5LCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfVxufVxuLy8gVGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QgbmVlZHMgdG8gYmUgc3RvcmVkIHNvbWV3aGVyZSBzbyB0aGF0IHRoZSBwcm94eSBjYW4gd29yay5cbi8vIFRoZXJlJ3Mgbm8gcmVhc29uIHRoYXQgdGhlIHVzZXIgY2FuJ3Qga2VlcCBhIGNvcHkgYnV0IHdlIHNob3VsZG4ndCBmb3JjZSB0aGF0LlxuT2JzZXJ2YWJsZVByb3h5Ll9tb2RlbHMgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0cy5PYnNlcnZhYmxlUHJveHkgPSBPYnNlcnZhYmxlUHJveHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgQ2xvbmVEZWVwXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gb2JzZXJ2YWJsZSBzdGF0ZSB0aGF0IHNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIHVzaW5nIHRoZSByZWxldmFudCBtZXRob2RzLCBhbGxvd2luZyBhdG9taWMgY2hhbmdlcyB0byBtdWx0aXBsZSBwcm9wZXJ0aWVzXG4gKiBpbiBtdWx0aXBsZSBvYmplY3RzLCByYWlzaW5nIGEgc2luZ2xlIGV2ZW50LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlU3RhdGUgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnc2V0U3RhdGUnO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIEkgd291bGQgcHJlZmVyIHRoYXQgdGhpcyByZXR1cm4gUmVhZG9ubHk8VD4gYnV0IGdldHRlciBhbmQgc2V0dGVyIGhhdmUgdG8gYmUgdGhlIHNhbWUgdHlwZS5cbiAgICAgICAgLy8gVGhhdCBtZWFucyB5b3Ugd291bGQgaGF2ZSB0byBjYXN0IGFueSB2YWx1ZSB5b3Ugc2V0IGFzIGEgcmVhZG9ubHksIHdoaWNoIGlzIGEgUElUQS5cbiAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJ3cml0ZXMgdGhlIGVudGlyZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldFNhZmVWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRtcCkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodG1wKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0bXApKTtcbiAgICB9XG4gICAgZ2V0VmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIC8vIFRoZSBSZWFkb25seSB0eXBlIHdvcmtzIGZpbmUgYW5kIGl0J3MgZmFzdCAuLi4gaW4gdHlwZXNjcmlwdC5cbiAgICAgICAgLy8gSW4gamF2YXNjcmlwdCwgaWYgeW91IGp1c3QgcmV0dXJuIHRoZSB2YWx1ZSwgbm90aGluZyBwcmV2ZW50cyBpdCBmcm9tIGJlaW5nIGVkaXRlZC5cbiAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgc2V0U3RhdGUodmFsdWUsIG92ZXJXcml0ZUFsbCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlIGlzIHByaW1pdGl2ZSwgdGhlbiBhIGZ1bGwgb3ZlcndyaXRlIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbnMgd2lsbCBleGVjdXRlIGJ1dCB0aGV5IHdvbid0IGNoYW5nZSB0aGUgdmFsdWUuIFRoZSByZWFzb24gaXMgdGhlIHNhbWUgcmVhc29uIHRoYXQgdGhpcyBtYWtlcyBubyBwZXJtYW5lbnQgY2hhbmdlIHRvIGJhcjpcbiAgICAgICAgICAgIC8vIHZhciBmb28gPSBmdW5jdGlvbihzdHIpIHsgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7IH07IHZhciBiYXIgPSAnYWJjJzsgZm9vKGJhcik7IGNvbnNvbGUubG9nKGJhciA9PT0gJ2FiYycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgc2V0U3RhdGUgd2l0aCBhIGZ1bmN0aW9uIGlmIHN0YXRlIGlzIHByaW1pdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJXcml0ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJXcml0ZUFsbCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMV9vdmVyd3JpdGVBbGwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBbbmV3VmFsdWUsIHJldHVyblZhbHVlXSA9IF9vdnIzX2Z1bmN0aW9uQXJnLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBpcyBub3QgYSBwYXJ0aWFsIHN0YXRlIG9yIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjJfcGFydGlhbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHsgb2xkVmFsdWUsIG5ld1ZhbHVlLCByZXR1cm5WYWx1ZSB9O1xuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9vdmVyd3JpdGVBbGwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGVudGlyZSBvYmplY3QuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcChfdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMl9wYXJ0aWFsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gUGFydGlhbCBvYmplY3Q6IE92ZXJ3cml0ZSBvbmx5IHRoZSBrZXlzIHByb3ZpZGVkXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRtcFtrZXldID0gX3ZhbHVlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyM19mdW5jdGlvbkFyZyhfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGFuZCB1cGRhdGUgdGhlIG9iamVjdCBhcyBkaWN0YXRlZFxuICAgICAgICAgICAgLy8gTWF5YmUgdW5uZWNlc3NhcnkgYnV0IHdlIHdhbnQgdG8gYXZvaWQgdGhlIGNhbGxlciBleGZpbHRyYXRpbmcgdGhlIHN0YXRlIHVzaW5nIGEgZnVuY3Rpb24sXG4gICAgICAgICAgICAvLyBieSBhY2NpZGVudC4gT2YgY291cnNlLCB0aGV5IGNhbiBqdXN0IGFjY2VzcyBfdmFsdWUgYnkgY2FzdGluZyBhcyBhbnksXG4gICAgICAgICAgICAvLyBidXQgdGhhdCdzIG5vdCBhY2NpZGVudGFsLlxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IF9yZXR1cm5WYWx1ZSA9IF92YWx1ZS5jYWxsKHRtcCwgdG1wKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gW3RtcCwgX3JldHVyblZhbHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVN0YXRlID0gT2JzZXJ2YWJsZVN0YXRlO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVN0YXRlQ2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBrbm93IGlmIEkgc2hvdWxkIGNoZWNrIGZvciB0aGlzIG9yIGZvciBnZXRTdGF0ZSgpIGFuZCBzZXRTdGF0ZSgpXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGU7XG59XG5leHBvcnRzLm9ic2VydmFibGVTdGF0ZUNoZWNrID0gb2JzZXJ2YWJsZVN0YXRlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBEZWxldGVOb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRGVsZXRlTm9kZUNvbnRlbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IENvbnN0cnVjdGFibGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZVwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBJZiB5b3UgY2xpY2sgYSBsaW5rIGluIGEgcmVhbCB3ZWIgc2l0ZSwgdGhlIGJyb3dzZXIgYXNrcyB0aGUgc2VydmVyIGZvciBhIHBhZ2UgYW5kIGl0IHJvdXRlcyB5b3UgdG8gdGhlIHJlbGV2YW50XG4gKiBwYWdlLiBCdXQgaWYgeW91IGhhdmUgYSBzaW5nbGUgcGFnZSBhcHAgcnVubmluZyBvbiBhIGZpbGUsIHdpdGggbm8gd2ViIHNlcnZlciwgbGlrZSB0aGUgb25lIHRoaXMgZnJhbWV3b3JrXG4gKiB3YXMgYnVpbHQgZm9yLCB5b3UgbmVlZCBzb21ldGhpbmcgdG8gc2ltdWxhdGUgdGhhdC5cbiAqXG4gKiBUaGlzIGNsYXNzIGNsZWFycyB0aGUgcm91dGUgY29udGFpbmVyLCB3aGljaCBpcyBleHBlY3RlZCB0byBiZSBhIHN0YXRpYyBjb250YWluZXIgaW4gdGhlIHdyYXBwZXIgSFRNTCBwYWdlLCBvciB0aGUgYm9keS5cbiAqIFdoZW4geW91IGdpdmUgaXQgdGhlIHJlbGV2YW50IHJvdXRlLCBpdCBleGVjdXRlcyB0aGUgY2FsbGJhY2sgb3IgcmV0dXJucyB0aGUgdmlldy9IVE1MIGVsZW1lbnQgeW91IGRlZmluZWQgZm9yIHRoZSByb3V0ZSxcbiAqIGFuZCBzdGlja3MgaXQgaW5zaWRlIHRoZSBjb250YWluZXIuIFRoZSBlbGVtZW50IHJldHVybmVkIGNhbiBiZSB3cmFwcGVkIGluIGEgbGF5b3V0IHZpZXcsIGxpa2UgaW4gQVNQLk5ldC5cbiAqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb24sIHdpdGhvdXQgdGhlIHJlY3Vyc2l2ZSByb3V0ZXMgZm91bmQgaW4gdGhlIGFkdmFuY2VkIHJvdXRlci4gSXQgd2FzIGJhc2VkIG1vcmUgb24gQVNQLk5ldCBvciBub2RlLmpzXG4gKiByb3V0aW5nLCB3aGVyZSB5b3UgaGF2ZSBhIGZsYXQgc2V0IG9mIHJvdXRlcyBhbmQgb25jZSB5b3UgZmluZCBhIHJvdXRlLCB5b3UncmUgZG9uZS5cbiAqL1xuY2xhc3MgUGFnZVJvdXRlciB7XG4gICAgc3RhdGljIGdldCBhbGxSb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgbWF0Y2hlZFJvdXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlZFJvdXRlIHx8IHsgcm91dGU6ICcnLCBwYXJhbXM6IG5ldyBNYXAoKSwgY29uZmlnOiB7IHJvdXRlOiAnJyB9IH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVkUm91dGUucGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnlNYXhMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5TWF4TGVuZ3RoO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGhpc3RvcnlNYXhMZW5ndGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hpc3RvcnkubGVuZ3RoID4gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkubGVuZ3RoID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeU1heExlbmd0aCA9IHZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IG5vdEZvdW5kKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX25vdEZvdW5kID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgbXVzdCBiZSBjYWxsZWQgZmlyc3QgYmVmb3JlIHVzaW5nIGl0LCBiZWNhdXNlIEpTIGRvZXNuJ3QgaGF2ZSBzdGF0aWMgY29uc3RydWN0b3JzIGxpa2UgQyMuIEl0IHNldHMgdXAgdGhlXG4gICAgICogcm91dGUgY29udGFpbmVyLCBjdXN0b20gZWxlbWVudHMsIGFuZCBhbHNvIGFsbG93cyBvbmUtc3RlcCBjb25maWd1cmF0aW9uIG9mIHNldmVyYWwgb3RoZXIgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGNvbmZpZ3VyZShyb3V0ZXMgPSBbXSwgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgICAgICh7IHJvdXRlcywgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgPSB0cnVlIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgcm91dGVzLCBkZWZhdWx0TGF5b3V0LCBkZWZhdWx0U3RhdGljTGF5b3V0LCBub3RGb3VuZCwgZGVmYXVsdFJvdXRlLCB1cmxSb3V0aW5nRW5hYmxlZCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICB0aGlzLl9jb25maWd1cmVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5vdEZvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3RGb3VuZCA9IG5vdEZvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBydGUubGF5b3V0ID0gcnRlLmxheW91dCB8fCBkZWZhdWx0TGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZShkZWZhdWx0U3RhdGljTGF5b3V0KSAmJiBOb25lVHlwZV8xLmlzTm9uZShydGUuc3RhdGljTGF5b3V0KSkge1xuICAgICAgICAgICAgICAgIHJ0ZS5zdGF0aWNMYXlvdXQgPSBkZWZhdWx0U3RhdGljTGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRSb3V0ZShydGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmxSb3V0aW5nRW5hYmxlZCkge1xuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgYWxsb3dzIGdvaW5nIHRvIGEgbmV3IHBhZ2UgYnkgY2hhbmdpbmcgdGhlIFVSTCBpbnN0ZWFkIG9mIGhhdmluZyB0byBpc3N1ZSByb3V0ZSgpIGNvbW1hbmRzLlxuICAgICAgICAgICAgdGhpcy50dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2Utcm91dGVyJykgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgncGFnZS1yb3V0ZXInKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3BhZ2Utcm91dGVyJywgRGl2UGFnZSwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbGF5b3V0LWJvZHknKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2xheW91dC1ib2R5JywgRGl2TGF5b3V0LCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdub3QtZm91bmQnKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ25vdC1mb3VuZCcsIERpdk5vdEZvdW5kLCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGN1c3RvbUVsZW1lbnRzIGlzbid0IG9mZmljaWFsbHkgcGFydCBvZiBhbiBFUyB2ZXJzaW9uIHlldCBzbyB3b24ndCB3b3JrIGV2ZW4gaW4gc29tZSByZWNlbnQtaXNoIGJyb3dzZXJzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRSb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Um91dGUoZGVmYXVsdFJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBOb3RlOiB0aGVyZSBpcyBubyByZW1vdmVSb3V0ZS4gVGhlcmUgY291bGQgYmUsIGJ1dCBpdCdzIG5ldmVyIG5lZWRlZC5cbiAgICBzdGF0aWMgYWRkUm91dGUocm91dGUpIHtcbiAgICAgICAgbGV0IHJvdXRlcztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm91dGUucm91dGUpKSB7XG4gICAgICAgICAgICByb3V0ZXMgPSByb3V0ZS5yb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJvdXRlcyA9IFtyb3V0ZS5yb3V0ZV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydGUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm91dGVzLmZpbmQocSA9PiBxLnJvdXRlID09PSBydGUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGUgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wID0gT2JqZWN0LmFzc2lnbih7fSwgcm91dGUpO1xuICAgICAgICAgICAgdG1wLnJvdXRlID0gcnRlO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLnB1c2godG1wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBsaW5rZWQgdG8gYSBwYXJ0aWN1bGFyIHBhZ2UgKG9uIHRoZSBoYXNoKSwgZ28gdG8gaXQuIEVsc2UsIGdvIHRvIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIFBhZ2VSb3V0ZXIucm91dGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFBhZ2VSb3V0ZXIucm91dGUocm91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyByb3V0ZShyb3V0ZSwgdXBkYXRlVXJsID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZ3VyZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFnZVJvdXRlciBub3QgY29uZmlndXJlZC4gQ2FsbCBjb25maWd1cmUoKSBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgICAvLyBBbGxvdyBhY3R1YWwgbGlua3MgdmlhIHRoZSBoYXNoLiBIYXNoIGxpbmtzIGRvbid0IGZvcmNlIGEgcGFnZSByZWxvYWQgYW5kIHRoZXkgd29yayB3L28gYSB3ZWIgc2VydmVyLlxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgaGF2aW5nIHRvIGNhbGwgcm91dGUoKSBtYW51YWxseSwgeW91IG11c3QgY2FsbCB0dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgICAgICByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSBwcm9ibGVtLCB3aGljaCBpcyB0aGF0IHNldHRpbmcgdGhlIGhhc2ggd2lsbCB0cmlnZ2VyIEFOT1RIRVIgcm91dGUgY2hhaW5nZSB2aWEgdGhlIGhhc2hjaGFuZ2Ugb3BlcmF0aW9uLlxuICAgICAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGhhc2ggY2hhbmdlIGFuZCB0aGVuIHJlc3RvcmluZyBpdCBsYXRlciBkb2VzIG5vdGhpbmcuIEl0J3Mgc3RpbGwgdHJpZ2dlcmVkLlxuICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlcyBoYWNrd29yay4gRXZlbiB0aGUgc2ltcGxlIHJvdXRlciBoYXMgbW9yZSBoYWNrcyB0aGFuIEkgbGlrZS5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgd2FzIHRyaWdnZXJlZCBieSBhIGhhc2ggY2hhbmdlIGFuZCB0aGUgcm91dGUgaXMgdGhlIHNhbWUsIHRoZW4gZG9uJ3QgZG8gYW55dGhpbmcuXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgbGFzdCByb3V0ZSBzbyB0aGF0IGl0IGRvZXNuJ3QgaW50ZXJmZXJlIHdpdGggdGhlIG5leHQgaGFzaCBjaGFuZ2UuXG4gICAgICAgICAgICBpZiAocm91dGUgPT09IHRoaXMuX2xhc3RSb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXBkYXRlVXJsKSB7XG4gICAgICAgICAgICAvLyBJZiBhIHJvdXRlIGlzIHNlbnQgaW4sIHRoZW4gc2V0IHRoZSBoYXNoLlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICBsZXQgc2VhcmNoUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHRoaXMuX3JvdXRlcykge1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0ID0gdGhpcy5fdGVzdFJvdXRlKHJ0ZS5yb3V0ZSwgcm91dGUgfHwgJycpO1xuICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcnRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUm91dGUgJHtyb3V0ZX0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2aW91c1JvdXRlID0gKHRoaXMuX21hdGNoZWRSb3V0ZSB8fCB7fSkuY29uZmlnO1xuICAgICAgICB0aGlzLl9tYXRjaGVkUm91dGUgPSB7IHJvdXRlLCBwYXJhbXM6IHNlYXJjaFJlc3VsdCB8fCBuZXcgTWFwKCksIGNvbmZpZzogbWF0Y2ggfTtcbiAgICAgICAgLy8gQWRkIHJvdXRlIHRvIGhpc3RvcnkgaWYgaXQncyBkaWZmZXJlbnQgZnJvbSB0aGUgcHJldmlvdXMgbGF0ZXN0IGhpc3RvcnlcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPT09IDAgfHwgdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggLSAxXSAhPT0gcm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChyb3V0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiB0aGlzLmhpc3RvcnlNYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3Rvcnkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcm91dGVHdWFyZHMgPSBbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2gucm91dGVHdWFyZHMpKSB7XG4gICAgICAgICAgICByb3V0ZUd1YXJkcyA9IG1hdGNoLnJvdXRlR3VhcmRzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hdGNoLnJvdXRlR3VhcmRzKSB7XG4gICAgICAgICAgICByb3V0ZUd1YXJkcy5wdXNoKG1hdGNoLnJvdXRlR3VhcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJnIG9mIHJvdXRlR3VhcmRzKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXN0ID0gcmcuY2hlY2tWYWxpZChtYXRjaCk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUm91dGUgcGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyUm91dGUobWF0Y2gsIHByZXZpb3VzUm91dGUpO1xuICAgIH1cbiAgICBzdGF0aWMgYmFjaygpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXNuJ3QgYW55IGhpc3RvcnkgdG8gZ28gYmFjayB0bywgZG9uJ3QgZ28gYmFjay5cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeS5wb3AoKTsgLy8gQ3VycmVudCByb3V0ZSBzaXRzIGF0IHRoZSB0b3Agb2YgdGhlIHN0YWNrXG4gICAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy5faGlzdG9yeS5wb3AoKTsgLy8gcHJldmlvdXMgcm91dGVcbiAgICAgICAgaWYgKHJvdXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGUocm91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyB0dXJuT25VcmxSb3V0aW5nKCkge1xuICAgICAgICB0aGlzLl9oYXNoQ2hhbmdlID0gKGV2dCkgPT4geyB0aGlzLnJvdXRlKCk7IH07XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5faGFzaENoYW5nZSk7XG4gICAgfVxuICAgIHN0YXRpYyBfdGVzdFJvdXRlKHJvdXRlU3RyaW5nLCB1cmxTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAoIXJvdXRlU3RyaW5nIHx8ICF1cmxTdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChyb3V0ZVN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsU3RyaW5nLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHVybFN0cmluZyA9IHVybFN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGVBcnJheSA9IHJvdXRlU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIGNvbnN0IHVybEFycmF5ID0gdXJsU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIC8vIFNhbWUgbnVtYmVyIG9mIC8gY2hhcmFjdGVycyByZXF1aXJlZC5cbiAgICAgICAgaWYgKHJvdXRlQXJyYXkubGVuZ3RoICE9PSB1cmxBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtyb3V0ZVNlZ21lbnQsIHVybFNlZ21lbnRdIG9mIEFycmF5VXRpbGl0aWVzXzEuemlwKHJvdXRlQXJyYXksIHVybEFycmF5KSkge1xuICAgICAgICAgICAgLy8gUGFyYW1ldGVycyBhcmUgYWxsb3dlZC4gT3B0aW9uYWwgcGFyYW1ldGVycyBhcmUgbm90LlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiBmb3Igbm8gb3B0aW9uYWwgcGFyYW1ldGVycyBpcyB0aGF0IGZpbmRpbmcgYSBtYXRjaCBiZXR3ZWVuIC9hLzo/cGFyYW0vYiBhbmQgL2EvYiBpcyB0b28gY29tcGxleC5cbiAgICAgICAgICAgIC8vIElzICdiJyBhIHBhcmFtIHZhbHVlIG9yIHBhcnQgb2YgdGhlIHJvdXRlLiBCYXNpY2FsbHksIG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSByb3V0ZSBlbmQuXG4gICAgICAgICAgICAvLyBJIG5vdGljZWQgdGhhdCBBU1AuTkVUIHdvcmtzIHRoYXQgd2F5IGFuZCBJIGZvdW5kIGl0IGNvbmZ1c2luZyB0aGF0IG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAvLyBKdXN0IGNyZWF0ZSBhIG5ldyByb3V0ZSB3aXRoIHRoZSBvcHRpb25hbCBwYXJhbSBsZWZ0IG91dC5cbiAgICAgICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSByb3V0ZVNlZ21lbnQuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lLmluY2x1ZGVzKCc9JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgJHtyb3V0ZVN0cmluZ30gY29udGFpbnMgZHVwbGljYXRlcyBvZiB0aGUgc2FtZSBwYXJhbWV0ZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldChuYW1lLCB1cmxTZWdtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgbWFwcGVkIHN0YXRpYyBwYXJhbSBjYXNlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBuYW1lLnNwbGl0KCc9JylbMV07XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KCc9JylbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IHVybFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSb3V0ZSAke3JvdXRlU3RyaW5nfSBjb250YWlucyBkdXBsaWNhdGVzIG9mIHRoZSBzYW1lIHBhcmFtZXRlci5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc2V0KG5hbWUsIHVybFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlU2VnbWVudCAhPT0gdXJsU2VnbWVudC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVuZGVyUm91dGUocm91dGUsIHByZXZpb3VzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgUGFnZVJvdXRlci5yb3V0ZSgndGhlIHNhbWUgdXJsJykgd2lsbCByZWxvYWQgdGhlIGNvbnRlbnRzIGZyb20gc2NyYXRjaC5cbiAgICAgICAgLy8gQWRqdXN0aW5nIHdpbmRvdy5sb2NhdGlvbiB3aWxsIGRvIG5vdGhpbmcgaWYgdGhlIHJvdXRlIGlzIHRoZSBzYW1lLlxuICAgICAgICAvLyBJIHRoaW5rIHRoaXMgaXMgZmluZSwgYWZ0ZXIgc3RydWdnbGluZyBpbiBhbmd1bGFyIHRvIHJlbG9hZCB0aGUgcGFnZSBhbmQgZmluZGluZ1xuICAgICAgICAvLyBpdCBtdWNoIGhhcmRlci5cbiAgICAgICAgLy8gTm90ZSBpZiB5b3UgY2hhbmdlIHRoZSBsb2NhdGlvbiBiYXIsIENocm9tZSBmb3JjZXMgYSByZWxvYWQgb2YgUHJvZ3JhbS50cywgbm90aGluZyB5b3UgY2FuIGRvXG4gICAgICAgIC8vIGFib3V0IGl0IGJlY2F1c2UgQ2hyb21lIGlzIHRoZSBvbmUgdGhhdCBkaXNjYXJkZWQgeW91ciBzdGF0ZS5cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMucm91dGVDb250YWluZXI7XG4gICAgICAgIGNvbnN0IGtlZXBMYXlvdXQgPSByb3V0ZS5sYXlvdXQgJiYgcHJldmlvdXMgJiYgcm91dGUuc3RhdGljTGF5b3V0ICYmIHJvdXRlLmxheW91dCA9PT0gcHJldmlvdXMubGF5b3V0O1xuICAgICAgICBpZiAoIWtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjb250ZW50cyBvZiBwYWdlLXJvdXRlclxuICAgICAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYXlvdXQtYm9keScpO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxsYXlvdXQtYm9keT4gZWxlbWVudCBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5sYXlvdXQpIHtcbiAgICAgICAgICAgIGxldCBsYXlvdXRWaWV3O1xuICAgICAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChyb3V0ZS5sYXlvdXQpKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0VmlldyA9IG5ldyByb3V0ZS5sYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRWaWV3ID0gcm91dGUubGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5b3V0VmlldyAmJiB2aWV3VHlwZUd1YXJkKGxheW91dFZpZXcpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxheW91dFZpZXcuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsYXlvdXRWaWV3KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxheW91dFZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGF5b3V0LWJvZHknKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8bGF5b3V0LWJvZHk+IGVsZW1lbnQgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjb250ZW50cyBvZiBsYXlvdXQtYm9keSAoYnV0IGtlZXAgbGF5b3V0KVxuICAgICAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3O1xuICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKHJvdXRlLnBheWxvYWQpKSB7XG4gICAgICAgICAgICB2aWV3ID0gbmV3IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygcm91dGUucGF5bG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmlldyA9IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICB2aWV3ID0gcm91dGUucGF5bG9hZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcgJiYgdmlld1R5cGVHdWFyZCh2aWV3KSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmlldykge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZpZXdUeXBlR3VhcmQodGVzdCkge1xuICAgICAgICAgICAgaWYgKFwiY29udGVudFwiIGluIHRlc3QgJiYgdGVzdC5jb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3JlbmRlck5vdEZvdW5kKCkge1xuICAgICAgICBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50KHRoaXMucm91dGVDb250YWluZXIpO1xuICAgICAgICB0aGlzLnJvdXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6ICdub3QtZm91bmQnLCBpbm5lckhUTUw6IHRoaXMuX25vdEZvdW5kIHx8IFwiUXVvdGggdGhlIFJhdmVuLCA0MDRcIiB9KSk7XG4gICAgfVxufVxuUGFnZVJvdXRlci5yb3V0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XG5QYWdlUm91dGVyLl9jb25maWd1cmVkID0gZmFsc2U7XG5QYWdlUm91dGVyLl9yb3V0ZXMgPSBbXTtcblBhZ2VSb3V0ZXIuX2hpc3RvcnkgPSBbXTtcblBhZ2VSb3V0ZXIuX2hpc3RvcnlNYXhMZW5ndGggPSA1MDtcbmV4cG9ydHMuUGFnZVJvdXRlciA9IFBhZ2VSb3V0ZXI7XG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuLy8gQSBjbGFzcyBpcyByZXF1aXJlZCBidXQgeW91J3JlIG5vdCBhbGxvd2VkIHRvIHVzZSB0aGUgZXhpc3RpbmcgY2xhc3MgYmVjYXVzZSBpdCBjYW4ndFxuLy8gYmUgY29uc3RydWN0ZWQgKGludmFsaWQgY29uc3RydWN0b3IpLiBBbmQgeW91IGFyZSBPTkxZIGFsbG93ZWQgdG8gZXh0ZW5kIEhUTUxFbGVtZW50LlxuLy8gQU5EIHRoZXkgbXVzdCBiZSB1bmlxdWUuXG5jbGFzcyBEaXZQYWdlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmNsYXNzIERpdkxheW91dCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5jbGFzcyBEaXZOb3RGb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiAocmVzdWx0KSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShyZXN1bHQpLCB0aW1lKSk7XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IERlZmVycmVkUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vRGVmZXJyZWRQcm9taXNlXCIpO1xuLyoqXG4gKiBUaGUgcHJvbWlzZSBBUEkgaXMgbmljZSwgbW9zdGx5LCBidXQgdGhlIG1haW4gdGhpbmcgcHJldmVudGluZyB1c2Ugb2YgYSBwcm9taXNlIGFzIGFuIGV2ZW50IGhhbmRsZXIgaXMgdGhhdFxuICogaXQgb25seSBleGVjdXRlcyBvbmNlLiBBZnRlciB0aGF0IHBvaW50LCBpdCBpcyByZXNvbHZlZCwgYW5kIHRoZXJlIGlzIG5vIHdheSB0byBmbGlwIGl0IGJhY2suXG4gKlxuICogVGhlIHJlcGVhdGFibGUgcHJvbWlzZSBrZWVwcyB0aGUgcHJvbWlzZSBBUEkgYW5kIGNyZWF0ZXMgdGhlIGlsbHVzaW9uIHRoYXQgdGhlIHByb21pc2UgaXMgcmVwZWF0ZWQgYnlcbiAqIHJlYnVpbGRpbmcgdGhlIGNoYWluIGVhY2ggdGltZS4gSXQncyByZWFsbHkgYSBkZWZlcnJlZCBmYWN0b3J5IGJ1dCBpdCBwcmV0ZW5kcyB0byBiZSBhIGRlZmVycmVkLiBJJ20gc3VyZVxuICogdGhpcyBoYXMgYSBwZXJmb3JtYW5jZSBwZW5hbHR5LlxuICpcbiAqIFlvdSBzaG91bGQgbm90IGF0dGFjaCBhY3R1YWwgcHJvbWlzZXMgaW50byB0aGUgdGhlbigpIGNoYWluLCBiZWNhdXNlIHRoZXkgY2FuJ3QgYmUgcmVwZWF0ZWQuIFRoZSBQcm9taXNlIHR5cGUgaXNuJ3RcbiAqIGFsbG93ZWQgYnV0IHRoZXJlIGFyZSB3YXlzIHRvIGdldCBhcm91bmQgdGhlIFRTIGNvbXBpbGVyLiBUaGUgVFMgdHlwZSBkZWZpbml0aW9uIGZvciBQcm9taXNlIGFuZCBQcm9taXNlTGlrZSBpc24ndFxuICogY29tcGxldGVseSBjb3JyZWN0LCBhbnl3YXksIHNvIGl0J3MgZWFzeSB0byBnZXQgdXNlZCB0byB1c2luZyB0aGUgYW55IHR5cGUgYW5kIG1ha2UgYnJva2VuIGNvZGUuXG4gKlxuICogWW91IGNhbm5vdCBhc3luYy9hd2FpdCBhIHJlcGVhdGFibGUgcHJvbWlzZSBpdHNlbGYgYnV0IHlvdSBjYW4gYXdhaXQgYSBzaW5nbGUgcmVzb2x1dGlvbi4gQXN5bmMvYXdhaXQgaXMgc3VnYXIgdGhhdFxuICogY3JlYXRlcyBhIHJlZ3VsYXIsIG5vbi1yZXBlYXRhYmxlLCBwcm9taXNlLlxuICovXG5jbGFzcyBSZXBlYXRhYmxlUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIG9uVW5oYW5kbGVkRXJyb3IsIC8vIFRoaXMgYWRkcyBhIGNhbGxiYWNrIGF0IHRoZSBlbmQgKG9yIDJuZCBmcm9tIHRoZSBlbmQsIHNlZSBuZXh0IG9wdGlvbilcbiAgICB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICApIHtcbiAgICAgICAgdGhpcy5vblVuaGFuZGxlZEVycm9yID0gb25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7IC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuIFVzZWZ1bCBmb3IgYXN5bmMvYXdhaXQgY29kZS5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZSBmb2xsb3dpbmcgc2hvdWxkIHdvcms6XG4gICAgLy8gY29uc3QgcmVwZWF0YWJsZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZSgpOyBjb25zdCByID0gYXdhaXQgcmVwZWF0YWJsZS5yZXNvbHZlKCk7IGNvbnNvbGUubG9nKHIpO1xuICAgIHJlc29sdmUoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgcmVqZWN0KGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgLy8gVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suXG4gICAgdGhlbihvbmZ1bGZpbGxlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25mdWxmaWxsZWQ6IG9uZnVsZmlsbGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25yZWplY3RlZDogb25yZWplY3RlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Uga25vdyB0aGF0IHRoZSBmaXJzdCBpcyBhbHdheXMgb25mdWxmaWxsZWQgYW5kIGlzIG5ldmVyIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmICghY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBGaXJzdCBvbmZ1bGZpbGxlZCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IG5ldyBEZWZlcnJlZFByb21pc2VfMS5EZWZlcnJlZFByb21pc2UoY2Iub25mdWxmaWxsZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGNiLm9uZnVsZmlsbGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKGNiLm9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBObyBjYWxsYmFja3MsIG5vdCBldmVuIHRoZSBkZWZhdWx0IGZpcnN0IG9uZnVsZmlsbGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKHRoaXMub25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5leHBvcnRzLlJlcGVhdGFibGVQcm9taXNlID0gUmVwZWF0YWJsZVByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUmV0dXJuIGVsZW1lbnRzIG9mIGFycmF5IGEgbGluZWQgdXAgd2l0aCBlbGVtZW50cyBvZiBhcnJheSBiLiBCb3RoIGFycmF5cyBkb24ndCBoYXZlIHRvIGJlIHRoZSBzYW1lIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggPj0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2VsZW1lbnQsIGJbaW5kZXhdXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYi5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbYVtpbmRleF0sIGJdKTtcbiAgICB9XG59XG5leHBvcnRzLnppcCA9IHppcDtcbi8qKlxuICogUmV0dXJuIGEgY2FydGVzaWFuIGpvaW4gKGNyb3NzIGpvaW4pIGJldHdlZW4gYXJyYXlzIGEgYW5kIGIuXG4gKi9cbmZ1bmN0aW9uIGNhcnRlc2lhbihhLCBiKSB7XG4gICAgLy8vIHR5cGVzY3JpcHQgcHJldmVudHMgYSBkaXJlY3QgdXNlIG9mIGNvbmNhdCwgc28gZG8gdGhpcyBtYW51YWxseSB3aXRoIGEgbG9vcFxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYSkge1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uYi5tYXAocSA9PiBbaXRlbSwgcV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLmNhcnRlc2lhbiA9IGNhcnRlc2lhbjtcbi8qKlxuICogR2VuZXJhdGUgYSByYW5nZSBvZiBpbnRlZ2VycywgY291bnRpbmcgdXAgYnkgMSwgZm9yIHRoZSBnaXZlbiBsZW5ndGguIFN0b2xlbiBmcm9tIFB5dGhvbi5cbiAqL1xuZnVuY3Rpb24gcmFuZ2UobGVuZ3RoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbmd0aCB9LCAodmFsdWUsIGtleSkgPT4ga2V5KTtcbn1cbmV4cG9ydHMucmFuZ2UgPSByYW5nZTtcbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgaXRlbXMgYW5kIG90aGVyIGFycmF5cywgZmxhdHRlbiB0aGVtIG91dCBpbnRvIGEgc2luZ2xlIGFycmF5LlxuICovXG5mdW5jdGlvbiogdHJhdmVyc2UoYXJyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgeWllbGQgYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgYXJyKSB7XG4gICAgICAgICAgICB5aWVsZCogdHJhdmVyc2Uocm93KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudHJhdmVyc2UgPSB0cmF2ZXJzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBNYWtlIGl0IGVhc2llciB0byBjcmVhdGUgc2ltcGxlIGNvbXBhcmlzb24gZnVuY3Rpb25zIG9uIChwb3NzaWJseSBjb21wbGV4KSBvYmplY3RzLiBUeXBpY2FsIHVzZTogYXJyLnNvcnQob3JkZXJCeShvID0+IG8uaWQpKVxuICovXG5mdW5jdGlvbiBvcmRlckJ5KHByb3BlcnR5Rm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RWYWx1ZSA9IHByb3BlcnR5Rm4oZmlyc3QpO1xuICAgICAgICBjb25zdCBzZWNvbmRWYWx1ZSA9IHByb3BlcnR5Rm4oc2Vjb25kKTtcbiAgICAgICAgaWYgKGZpcnN0VmFsdWUgPCBzZWNvbmRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdFZhbHVlID4gc2Vjb25kVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG59XG5leHBvcnRzLm9yZGVyQnkgPSBvcmRlckJ5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBBcnJheUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIG9wZXJhdGlvbiAobWV0aG9kLCBzZXQsIGRlbGV0ZSlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmFyZ3MgPSBbXTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5Q2hhbmdlZEV2ZW50QXJncyA9IEFycmF5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmVwZWF0YWJsZVByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKTtcbi8qKlxuICogQSBkZWxlZ2F0ZSBvYmplY3QgaXMgdXNlZCBieSB0aGUgRXZlbnRIYW5kbGVyLiBJdCBjb250YWlucyBlbm91Z2ggaW5mb3JtYXRpb24gdG8gZXhlY3V0ZSBhIGNhbGxiYWNrIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3VzbHlcbiAqICh1c2luZyBhIHByb21pc2UpLiBJdCBhbHNvIGFkZHMgc29tZSBzdHJpbmdzIHRvIGhlbHAgaW4gdHJvdWJsZXNob290aW5nLCBiZWNhdXNlIHNlYXJjaGluZyBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBjb21wbGV4IG9iamVjdHMgY2FuIG1ha2VcbiAqIGl0IGEgYmVhciB0byBmaW5kIG91dCB3aHkgYSBjYWxsYmFjayBpc24ndCBiZWluZyBleGVjdXRlZC5cbiAqL1xuY2xhc3MgRGVsZWdhdGUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIEluIG1hbnkgY2FzZXMgKGZvciBleGFtcGxlLCB3aGVuIHVzaW5nIGZhdCBhcnJvdyBmdW5jdGlvbnMpLCB0aGlzQXJnIGlzXG4gICAgICAgIC8vIG5vdCBuZWVkZWQuIEJ1dCBpbiBtb3N0IG90aGVycywgaXQgaXMgYW4gYW5ub3lpbmcgYnVnIHRoYXQgcmVxdWlyZXMgdHJvdWJsZXNob290aW5nXG4gICAgICAgIC8vIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY2FsbGVyIGZvcmdvdC4gSSd2ZSB3YXZlcmVkIGJldHdlZW4gbWFraW5nIGl0IHJlcXVpcmVkIGFuZCBub3QuXG4gICAgICAgIGlmICghdGhpc0FyZykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVsZWdhdGUgY3JlYXRlZCB3aXRob3V0IHRoaXNBcmcuIERpZCB5b3UgbWVhbiB0bz8nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrT3duZXJOYW1lID0gdGhpc0FyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSB0eXBlc2NyaXB0IGNvbXBpbGVyIHNob3VsZCBoYW5kbGUgdGhpcyBjaGVjayBidXQgY2FuJ3QgYXQgcnVudGltZS5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5jYWxsYmFja05hbWUgPSBjYWxsYmFjay5uYW1lO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSAmJiB0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5jYWxsYmFja093bmVyTmFtZX0uJHt0aGlzLmNhbGxiYWNrTmFtZX0oKWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tOYW1lICsgJygpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrT3duZXJOYW1lICsgJy5fX2xhbWJkYV9fKCknO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZV8xLlJlcGVhdGFibGVQcm9taXNlKGNhbGxiYWNrLmJpbmQodGhpc0FyZykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVsZWdhdGUgPSBEZWxlZ2F0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IERlbGVnYXRlXzEgPSByZXF1aXJlKFwiLi9EZWxlZ2F0ZVwiKTtcbi8qKlxuICogSSBjaG9zZSB0byB1c2UgQyMgc3R5bGUgZXZlbnRzLCBub3QgSlMvVFMsIGJlY2F1c2UgdGhlIEpTL1RTIHdheSBvZiBkb2luZyBkZWxlZ2F0ZXMvY3VzdG9tIGV2ZW50cyBpcyBhIE5JR0hUTUFSRS4gU3VyZSxcbiAqIEN1c3RvbUV2ZW50IHdvcmtzLCBidXQgb24gdGhlIFRTIHNpZGUgdGhlIGNvZGUgcmVxdWlyZWQgdG8gbWFrZSBUU0MgaGFwcHkgd2l0aCB2YWxpZCBqYXZhc2NyaXB0IGlzIGF3ZnVsIGFuZCBub24taW50dWl0aXZlLlxuICogT24gdGhlIEpTIHNpZGUsIHlvdSBoYXZlIHRoZSBwcm9ibGVtIHRoYXQgZXZlcnkgaGFuZGxlciBwaWNrcyBpdCB1cCwgbm90IGp1c3QgdGhlIG9uZXMgdGhhdCBhcmUgYm91bmQgdG8gdGhlIHJlbGV2YW50IEhUTUxcbiAqIGVsZW1lbnQsIHNvIGVsZW1lbnRzIG5lZWQgdG8gcGFzcyB0aGUgc291cmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBjaGVjayBpdCAobGlrZSBqcXVlcnkgYW5kICQoZG9jdW1lbnQpLm9uKCkpLlxuICpcbiAqIEFmdGVyIGdldHRpbmcgaXQgd29ya2luZywgYWxsIEkgY291bGQgdGhpbmsgYWJvdXQgd2FzIGhvdyBiYWQgdGhlIGNvZGUgd2FzLCBzbyBJIHJld3JvdGUgaXQgYXZvaWRpbmcgdGhlIEpTIHBhdHRlcm4gZW50aXJlbHkuXG4gKlxuICogVGhpcyBjYW4gYmUgc3luY2hyb25vdXMgKGNhbGxiYWNrcykgb3IgYXN5bmNocm9ub3VzIChwcm9taXNlcykuICBXaGVuIGl0IGlzIGFzeW5jLCB0aGUgY29kZSBleGVjdXRlcyBhZnRlciB0aGUgY3VycmVudCBzeW5jaHJvbm91c1xuICogZXZlbnRzIHJ1biB0byBjb21wbGV0aW9uLiBUaGlzIGNvdWxkIGNyZWF0ZSBidWdzIGluIHN5bmNocm9ub3VzIGNvZGUsIGJ1dCBpcyBiZXN0IGZvciBicm93c2VyIGV2ZW50cy4gVGhpcyBoYW5kbGVyIGlzIHByaW1hcmlseSB1c2VkIGZvclxuICogYnJvd3NlciBldmVudHMsIHNvIGFzeW5jIGlzIGRlZmF1bHQuXG4gKlxuICogQnV0IGlmIHlvdSdyZSB0cmlnZ2VyaW5nIGFzeW5jIGV2ZW50cyBpbiBjb2RlIGFuZCBzdGVwcGluZyB0aHJvdWdoIGl0IGluIENocm9tZSwgd2hhdCB5b3Ugc2VlIHdvbid0IG1ha2Ugc2Vuc2UsIGJlY2F1c2UgdGhlIGFzeW5jXG4gKiBldmVudHMgd29uJ3Qgb2NjdXIgdW50aWwgcmlnaHQgYXdheS4gSXQgY2FuIGJlIGhhcmQgdG8gdHJvdWJsZXNob290LlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9kaXNhYmxlQXN5bmMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlQXN5bmMgPSBfZGlzYWJsZUFzeW5jO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJZiB0aGlzIHJlY2VpdmVzIGEgZGVsZWdhdGUgKHdoaWNoIGlzIGFuIGFycmF5IG9mIGRlbGVnYXRlcyksIGFkZCBpdC5cbiAgICAgICAgLy8gV2hlbiB0aGlzIGlzIGludm9rZWQsIHRoYXQgZGVsZWdhdGUgd2lsbCBhbHNvIGJlIGludm9rZWQuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgX292cjFfZGVsZWdhdGUuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR290IGEgc2luZ2xlIGNhbGxiYWNrXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2FsbGJhY2suXG4gICAgICAgIGlmICh0aGlzLmZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaDogdHJ1ZSB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEZWxlID0gbmV3IERlbGVnYXRlXzEuRGVsZWdhdGUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2gobmV3RGVsZSk7XG4gICAgICAgIC8vIElGIHRoaXMgaXMgYXN5bmNocm9ub3VzLCByZXR1cm4gdGhlIHByb21pc2Ugc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gICAgICAgIC8vIENoYWluaW5nIHdvbid0IHdvcmsgb24gc3luYyBjb2RlLCBzbyBkbyBub3QgaW4gdGhhdCBjYXNlLlxuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ld0RlbGUucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9kZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmZpbmQocSA9PiBxID09PSBkZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmRlbGVnYXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcSA9IHRoaXMuZGVsZWdhdGVbaV07XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocSkgJiYgcS5jYWxsYmFjayA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcikge1xuICAgICAgICAvLyBGaXJzdCB0cnkgdG8gdW5zdWJzY3JpYmUgdGhlIGRlZmF1bHQgZGVsZWdhdGUuIENhbid0IGRvIGFueXRoaW5nIGlmIGl0IGhhcyBhIGRpZmZlcmVudCBuYW1lLCB0aG91Z2guXG4gICAgICAgIGlmIChcImRlbGVnYXRlXCIgaW4gc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRGVsZWdhdGUoc2VuZGVyLmRlbGVnYXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxKSAmJiBxLnRoaXNBcmcgPT09IHNlbmRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmIChxID09PSBkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZShhcmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBBc3luYyB2ZXJzaW9uLiBEb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCB0aGUgY2hyb21lIGRlYnVnZ2VyLlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIudGhpc0FyZywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoIH0gPSB7fSkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoKGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICBmdW5jdGlvbiBtYXRjaChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTsgLy8gQ2xlYXJzIHRoZSBkZWxlZ2F0ZVxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdW5kZWZpbmVkOyAvLyBNYWtlcyBzdXJlIHRoaXMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEV2ZW50IGFyZ3VtZW50cyBleHBlY3RlZCBvbiBhbnkgQ2hhbmdlIGV2ZW50LlxuICovXG5jbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIGNoYW5nZSBvcGVyYXRpb24gKHNldCwgZGVsZXRlKSAocG90ZW50aWFsbHkgbWV0aG9kKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgbmV3YWJsZS5cbiAqIFRISVMgQ0FOTk9UIERFVEVDVCBBTk9OWU1PVVMgQ0xBU1NFUy4gU29ycnksIGJ1dCBKUyBkb2Vzbid0IGhhdmUgYSBub24tZGVzdHJ1Y3RpdmUgd2F5XG4gKiB0byBjaGVjayBpZiBhbnkgZnVuY3Rpb24gaXMgYSBjb25zdHJ1Y3RvciBvdGhlciB0aGFuIHRvIHRyeSB0byBuZXcoKSBpdCBhbmQgYmxvdyB1cC9ub3QgYmxvdyB1cC5cbiAqIFRoaXMgZnVuY3Rpb24gZGVwZW5kcyBvbiB0aGVyZSBiZWluZyBhIHByb3RvdHlwZSB3aXRoIGEgbmFtZWQgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yVHlwZUd1YXJkKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLnByb3RvdHlwZSAmJiBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5leHBvcnRzLmNvbnN0cnVjdG9yVHlwZUd1YXJkID0gY29uc3RydWN0b3JUeXBlR3VhcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBrZXl3b3JkIGFyZ3VtZW50cywgYXMgc2VlbiBpbiBQeXRob24gYW5kIEMjLiBJdCBtYWtlcyBjb25maWd1cmFibGVcbiAqIGZ1bmN0aW9ucyBzbyBtdWNoIHF1aWNrZXIgYW5kIGVhc2llciB0aGFuIGZsYXQgYXJndW1lbnRzIChmb3JjaW5nIHlvdSB0byBwdXQgdW5kZWZpbmVkIG1hbnVhbGx5IGluIGRpZmZlcmVudFxuICogc2xvdHMpIG9yIG9wdGlvbnMgb2JqZWN0cyAodGFrZXMgbW9yZSB0aW1lIHRvIHByb2R1Y2UsIGVzcGVjaWFsbHkgaWYgeW91IG5lZWQgdG8gbmV3IGl0IHVwKS5cbiAqXG4gKiBDYWxsIGZ1bmN0aW9ucyBoYXZpbmcga2V5d29yZCBhcmd1bWVudHMgdXNpbmcgdGhpcyBzeW50YXg6XG4gKiBjYWxsbWUoYXJnMSwgYXJnMiwga3coJ3NvbWV0aGluZycsIGt3MSksIGt3KCdzb21ldGhpbmdFbHNlJywga3cyKSlcbiAqXG4gKiBUbyBtYWtlIHRoZW0gd29yaywgaW4gdGhlIGZ1bmN0aW9uIGl0c2VsZiwgeW91IG5lZWQgdG8gY29weSBhbmQgcGFzdGUuIEZvciBleGFtcGxlOlxuICogKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0gPSBLd2FyZy5wYXJzZSh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9KSk7XG4gKi9cbmNsYXNzIEt3YXJnIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIGlmICghYSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGE7XG4gICAgICAgIHRoaXMudmFsdWUgPSBiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1lbWJlciB0aGlzIHRlbXBsYXRlOlxuICAgICAqICh7IH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9KSk7XG4gICAgICogSW5jbHVkZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgZmlyc3Qgb2JqZWN0LCBub3QgdGhlIHNlY29uZC5cbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IHRvIGNhcHR1cmUgcmVzdCBwYXJhbWV0ZXJzLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkcmVzdCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7ICwgLi4ucmVzdCB9KSk7XG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCBhbGxvd1Vua25vd25LZXl3b3JkIHRvIGJlIHRydWUsIHVzZSB0aGlzOlxuICAgICAqICh7ICQka3ckJCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSwgdHJ1ZSkpO1xuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUFyZ3MoYXJncywgYWxsb3dVbmtub3duS2V5d29yZCA9IGZhbHNlKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgdGhpcyBjb3VsZCB0YWtlIHRoZSBhcmd1bWVudHMgb2JqZWN0LCBidXQgc2FkbHkgYXJndW1lbnRzIHN0b3JlcyBvbmx5IGFuIGFycmF5IG9mIHZhbHVlcyxcbiAgICAgICAgLy8gbm8ga2V5cy4gSWYgSlMgd2VyZSBzYW5lLCBpdCB3b3VsZCBiZSBhIE1hcCwgbm90IGFuIGFycmF5LiBUd28gc3RlcHMgZm9yd2FyZCwgb25lIHN0ZXAgYmFjay5cbiAgICAgICAgLy8gUGFyc2luZyB0aGUgc3RyaW5nIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvbiBpcyBub3QgbXkgY3VwIG9mIHRlYSwgc28ganVzdCBuby5cbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncyk7XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGFyZ3VtZW50IG9yZGVyXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gYXJnc1thcmddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGt3dmFyID0ge307XG4gICAgICAgIG9ialsnJCRrdyQkJ10gPSBrd3ZhcjtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJlc3QgcGFyYW1ldGVycy5cbiAgICAgICAgLy8gSSB3YXMgZ29pbmcgdG8gaGF2ZSB0aGlzIG9uL29mZiBjb25maWd1cmFibGUsIGJ1dCBpdCBzaG91bGRuJ3QgaHVydCBwZXJmb3JtYW5jZS5cbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIG9ialsnJHJlc3QkJ10gPSBhcnI7XG4gICAgICAgIC8vIFJlc3QgcGFyYW1ldGVycyBhcmUgc3RvcmVkIGFzIGFycmF5IGtleXMsIHsgJzAnOiBhLCAnMSc6IGIsICdub25SZXN0JzogJ3NvbWV0aGluZyBlbHNlJ31cbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykuZmlsdGVyKGYgPT4gSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoZikpKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcmdzW2FyZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXdvcmRzVXNlZCA9IHt9O1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBrZXl3b3JkIG5hbWVcbiAgICAgICAgLy8gSGF2ZSB0byBpdGVyYXRlIHRoZSBsaXN0IHR3aWNlLCB0byBhdm9pZCB3aXBpbmcgb3V0IGRhdGEgaWYgdGhlIG9yZGVyIGlzIHN3YXBwZWRcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dVbmtub3duS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga3d2YXJbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgYW4gdW5leHBlY3RlZCBrZXl3b3JkIGFyZ3VtZW50ICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4ga2V5d29yZHNVc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IG11bHRpcGxlIHZhbHVlcyBmb3Iga2V5d29yZCBhcmd1bWVudCArICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5d29yZHNVc2VkW3RtcC5uYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgLy8gVHVybiBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXl3b3JkIGFyZ3VtZW50cy5cbiAgICAvLyBOZWVkcyB0byByZXR1cm4gYW55W10gYmVjYXVzZSBpdCdzIGdvaW5nIHRvIGJlIHNob3ZlZCBpbnRvIGFyYml0cmFyeSBhcmd1bWVudCBsaXN0c1xuICAgIHN0YXRpYyB1bnBhY2soYXJncykge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goa3coYXJnLCBhcmdzW2FyZ10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgaXNNYXRjaChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSA9PT0ga2V5O1xuICAgIH1cbn1cbmV4cG9ydHMuS3dhcmcgPSBLd2FyZztcbmZ1bmN0aW9uIGt3KGEsIGIpIHtcbiAgICBpZiAoIWEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDFcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhLCBiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgICAvLyBPdmVybG9hZCAyXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYVswXSwgYVsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdmVybG9hZCAzXG4gICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyLlxuICAgICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpO1xuICAgICAgICBpZiAoIXByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwIG9iamVjdDogbXVsdGlwbGUga2V5cycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcocHJvcHNbMF0sIGFbcHJvcHNbMF1dKTtcbiAgICB9XG59XG5leHBvcnRzLmt3ID0ga3c7XG5mdW5jdGlvbiBrd2FyZ3NUb09iamVjdChhcnIpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJyKSB7XG4gICAgICAgIG9wdGlvbnNbYXJnLm5hbWVdID0gb3B0aW9uc1thcmcudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbmV4cG9ydHMua3dhcmdzVG9PYmplY3QgPSBrd2FyZ3NUb09iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNOb25lKHRlc3QpIHtcbiAgICByZXR1cm4gKHRlc3QgPT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5pc05vbmUgPSBpc05vbmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNsb25lRGVlcChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKSB7XG4gICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajsgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgfVxuICAgIGlmIChoYXNoLmhhcyhvYmopKSB7XG4gICAgICAgIHJldHVybiBoYXNoLmdldChvYmopOyAvLyByZWZlcmVuY2UgdG8gb2JqZWN0IHByZXZpb3VzbHkgc2VlblxuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgdmFsID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIChba2V5LCB2YWxdKSA9PiByZXN1bHQuYWRkKGNsb25lRGVlcChrZXksIGhhc2gpLCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhd2Z1bCBjb2RlLCBidXQgaXQncyB0aGUgb25seSB3YXkgdG8gY2xvbmUgYSBzdGFuZGFsb25lIGZ1bmN0aW9uICh2cyBhIG1ldGhvZCB3aGljaCBoYXMgYSBkZXNjcmlwdG9yKS5cbiAgICAgICAgLy8gSW4gZ2VuZXJhbCwgeW91IHByb2JhYmx5IGRvbid0IHdhbnQgdG8gdXNlIGNsb25lRGVlcCBvbiBmdW5jdGlvbnMuIFlvdSdsbCBzZWUgaXQncyBOT1QgdXNlZCBvbiBpbnRlcm5hbCBtZXRob2RzLlxuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgb2JqLnRvU3RyaW5nKCkpKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaGFzaC5zZXQob2JqLCByZXN1bHQpOyAvLyBLZWVwIHRyYWNrIG9mIG9iamVjdHMgcHJldmlvdXNseSBjbG9uZWRcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIShrZXkgaW4gcmVzdWx0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIG1ldGhvZHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHByb3RvdHlwZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCByZWN1cnNpdmVseSBmb2xsb3cgYmVjYXVzZSB0aGVyZSdzIG5vdGhpbmcgcmVjdXJzaXZlIHRvIGRvLlxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGhhc2guc2V0KG9ialtrZXldLCByZXN1bHRba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBtZXRob2QuXG4gICAgICAgICAgICAgICAgLy8gSWYgZXh0cmEga2V5cyBhcmUgdGhyb3duIG9udG8gYSBmdW5jdGlvbiwgdGhleSBwcm9iYWJseSB3aWxsIG5vdCBiZSBjbG9uZWQuXG4gICAgICAgICAgICAgICAgLy8gSW4gbXkgZXhwZXJpZW5jZSwgZXh0cmEga2V5cyBvbiBmdW5jdGlvbnMgZGlkbid0IHdvcmsgcmlnaHQsIHNvIG5vIGJpZyBsb3NzLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBnZXR0ZXJzL3NldHRlcnMuIFRoZXNlIGFyZSBsb2NhbCBhbmQgaG9wZWZ1bGx5IHdvcmsganVzdCBsaWtlIG1ldGhvZHMuXG4gICAgICAgICAgICAvLyBJbiBtYW55IGNhc2VzLCB0aGlzIGlzIHJlZHVuZGFudCB3aXRoIE9iamVjdC5jcmVhdGUoKSwgYnV0IGlzIG5lY2Vzc2FyeSB0byBhbGxvdyBvYmplY3RzIHdpdGggbWFudWFsbHktYWRkZWQgY3VzdG9tIGdldHRlcnMuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBnZXR0ZXIvc2V0dGVyLlxuICAgICAgICAgICAgLy8gQUxTTyBoYXNoIG5vdCB1cGRhdGVkOyB0aGlzIGlzIG5vdCBwb3NzaWJsZSwgYmVjYXVzZSBpdCB3aWxsIG1hcCB0aGUgdmFsdWUgaXQgZ2V0cywgbm90IHRoZSBnZXR0ZXIuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lRGVlcChvYmpba2V5XSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJIGRvbid0IGtub3cgZm9yIHN1cmUgaWYgdGhpcyB3aWxsIHdvcmsgaW4gYWxsIGNhc2VzLlxuLy8gSXQgZ2V0cyBkZWVwZXIgaW50byB0aGUgZ3V0cyBvZiBKUyBvYmplY3QgdGhhbiBJIGhhdmUgZXhwZXJpZW5jZSB3aXRoLlxuZnVuY3Rpb24gY2xvbmVPYmplY3Qob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVPYmplY3QgPSBjbG9uZU9iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogUmVjZW50IFR5cGVzY3JpcHQgaGFzIGFkZGVkIGEgbnVsbCBjb2FsZXNjaW5nIG9wZXJhdG9yICg/LiwgYWthIHRoZSBFbHZpcyBvcGVyYXRvcikgYnV0IE5QTSBpc3N1ZXNcbiAqIHByZXZlbnQgbWUgZnJvbSB1cGdyYWRpbmcuICBCdXQgdGhpcyByZXR1cm5zIHVuZGVmaW5lZCBpZiB5b3UgYWNjZXNzIGFueXRoaW5nIHRoYXQgZG9lc24ndCBleGlzdC5cbiAqXG4gKiBOYXR1cmFsbHkgdGhpcyBicmVha3MgVlNDb2RlIGludGVsbGlzZW5zZSwgYmVjYXVzZSBpdCByZXR1cm5zIGFueS4gT25seSBNUyBjYW4gZG8ga2VlcCB0aGUgcmlnaHQgdHlwZS5cbiAqXG4gKiBJZiB5b3UgZG8gcmV0dXJuIGEgcGFydGlhbCB2ZXJzaW9uIG9mIHRoZSB0eXBlLCBUUyB0aHJvd3MgYW4gZXJyb3IgYmVjYXVzZSBpdCBjb3VsZCBiZSBtaXNzaW5nICh1bW0uLi4gdGhhdCdzIHdoYXQgUGFydGlhbCBtZWFucy4uLikuXG4gKlxuICogQSB0cnVlIGVsdmlzIG9wZXJhdG9yIHdvdWxkIGFsc28gd29yayBvbiBzdHJpbmdzL251bWJlcnMvZXRjLiBUaGlzIGNhbm5vdCBkbyB0aGF0LCBiZWNhdXNlIEpTIGNhbid0IHRlbGwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhXG4gKiBudWxsIHN0cmluZyBhbmQgYSBudWxsIG9iamVjdC4gTnVsbCBpcyBudWxsLlxuICovXG5mdW5jdGlvbiBlXyhpdGVtKSB7XG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG59XG5leHBvcnRzLmVfID0gZV87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG4vKipcbiAqIEEgcHNldWRvLXJhbmRvbSBwcmVmaXggcGx1cyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIHVuaXggZXBvY2guIFRoZSByYW5kb20gcGFydCBzaG91bGQgYmUgcmFuZG9tIGVub3VnaCB0byBjb3ZlclxuICogbXVsdGlwbGUgaWRzIGNyZWF0ZWQgaW4gYSBtaWxsaXNlY29uZC5cbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlSWQoKSB7XG4gICAgY29uc3QgY2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotXyc7XG4gICAgbGV0IHJlc3VsdCA9ICd1JyArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyAnLSc7XG4gICAgZm9yIChjb25zdCBfIG9mIEFycmF5VXRpbGl0aWVzXzEucmFuZ2UoOCkpIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZ2V0VW5pcXVlSWQgPSBnZXRVbmlxdWVJZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUZWxsIGlmIGEgZ2l2ZW4gc3RyaW5nIGlzIGEgcG9zaXRpdmUgaW50ZWdlci5cbiAqIFVzZSBmb3IgZGV0ZWN0aW5nIGFycmF5IGtleXMuXG4gKi9cbmZ1bmN0aW9uIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKHN0cikge1xuICAgIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0ciA9PT0gJzAnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gL15bMS05XVxcZCokLy50ZXN0KHN0cik7XG59XG5leHBvcnRzLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nID0gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBhY2N1cmF0ZSB0aGlzIGlzIGJ1dCBpdCBzZWVtcyBwcmV0dHkgZ29vZFxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iajtcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ2xvbmVPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Nsb25lT2JqZWN0XCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogT2JqZWN0LmFzc2lnbigpIGNhbiBiZSB1c2VkIGZvciBzaW1wbGUgY29waWVzIG9mIHByb3BlcnRpZXMsIGJ1dCBpdCBtaXNzZXMgZ2V0dGVycyxcbiAqIHNldHRlcnMsIGFuZCBpbmhlcml0ZWQgcHJvcGVydGllcy4gSXQgb25seSBnZXRzIHRoZSBsb2NhbCB2YWx1ZXMuXG4gKlxuICogVGhpcyBzaG91bGQgaG9wZWZ1bGx5IHJlc29sdmUgdGhhdCwgYnV0IEkgZG9uJ3Qga25vdyBmb3Igc3VyZS4gVGhpcyBpcyB2ZXJ5IHNrZXRjaHkuXG4gKiBUaGUgcmVzdWx0cyBhcmUgY29tcGxldGVseSBmbGF0LCBiZWNhdXNlIHlvdSBjYW4ndCBoYXZlIG11bHRpcGxlIGluaGVyaXRhbmNlIGhpZXJhcmNoeVxuICogaW4gYSBsYW5ndWFnZSB3aXRob3V0IG11bHRpcGxlIGluaGVyaXRhbmNlLiBCZWNhdXNlIHRoaXMgZmxhdHRlbnMgb2JqZWN0cywgaXQgaXMgZ3VhcmFudGVlZFxuICogdG8gYnJlYWsgYW55dGhpbmcgdGhhdCBtYWtlcyBzdXBlciBjYWxscy5cbiAqXG4gKiBJZiByZXR1cm5DbG9uZSBpcyB0cnVlLCBhIGNsb25lIG9mIHRoZSB0YXJnZXQgb2JqZWN0IHdpbGwgYmUgbW9kaWZpZWQgYW5kIHJldHVybmVkLCBsZWF2aW5nXG4gKiB0aGUgb3JpZ2luYWwgdW50b3VjaGVkLlxuICovXG5mdW5jdGlvbiBvYmplY3RGdWxsQXNzaWduKHRhcmdldCwgc291cmNlLCByZXR1cm5DbG9uZSA9IGZhbHNlKSB7XG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0ge307XG4gICAgfVxuICAgIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGlmIChyZXR1cm5DbG9uZSkge1xuICAgICAgICB0YXJnZXQgPSBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0KHRhcmdldCk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KGZpbmRUaGVQcm9wZXJ0eU5hbWVzKHNvdXJjZSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuYW1lcykge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICByZXN1bHQucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihmID0+IGYgIT09ICdjb25zdHJ1Y3RvcicpKTtcbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi5maW5kVGhlUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRUaGVQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JqZWN0RnVsbEFzc2lnbiA9IG9iamVjdEZ1bGxBc3NpZ247XG4iXX0=
