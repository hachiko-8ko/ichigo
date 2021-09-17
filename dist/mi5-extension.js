(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../src/ExtensionLoader");

},{"../../src/ExtensionLoader":2}],2:[function(require,module,exports){
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

},{"../HtmlComponent/BoundComponent":12,"../HtmlComponent/ComponentMap":14,"../HtmlComponent/Options/IComponentBindingOptions":15}],4:[function(require,module,exports){
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

},{"../Observable/ObservableProperty":18}],6:[function(require,module,exports){
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

},{"../System/Types/KeywordArguments":27,"./ElementType":7,"./ExtractNodeContent":9}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../System/Types/NoneType":28}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
            BoundComponent.injectBind(this.viewModel, { parent: this.content, selector });
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
            parent: this,
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

},{"../Html/CreateElement":6,"../Html/ElementType":7,"../Html/EscapeHtml":8,"../Html/ExtractNodeContent":9,"../Html/FormFieldValue":10,"../Html/QuerySelectorNodeList":11,"../Observable/IObservable":16,"../Observable/ObservableProperty":18,"../Observable/ObservableState":19,"../System/Types/Constructable":26,"../System/Types/KeywordArguments":27,"../System/Types/NoneType":28,"./Component":13,"./ComponentMap":14}],13:[function(require,module,exports){
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
    static _lookUpContainersToInject(selector = '[ichigo]') {
        if (selector === null) {
            // I've done this myself, which results in a silent failure if accidental.
            // tslint:disable-next-line:no-console
            console.warn('Injection selector is null.');
        }
        selector = selector || '[ichigo]';
        // Look up the elements to either replace or convert
        let containers;
        if (typeof selector === 'string') {
            containers = Array.from(document.querySelectorAll(selector));
        }
        else if (selector instanceof NodeList) {
            containers = Array.from(selector);
        }
        else if (Array.isArray(selector)) {
            containers = selector;
        }
        else if (typeof selector === 'object' && 'selector' in selector) {
            const parent = selector.parent || document;
            containers = Array.from(parent.querySelectorAll(selector.selector));
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

},{"../Html/CreateElement":6,"../Html/ElementType":7,"../Html/FormFieldValue":10,"../Html/QuerySelectorNodeList":11,"../System/Types/KeywordArguments":27,"../System/Utility/GetUniqueId":30,"./ComponentMap":14}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
function observableCheck(obj) {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && 'changeHandler' in obj && obj.changeHandler instanceof EventHandler_1.EventHandler;
}
exports.observableCheck = observableCheck;

},{"../System/EventHandler/EventHandler":24}],17:[function(require,module,exports){
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

},{"../System/EventHandler/EventHandler":24}],18:[function(require,module,exports){
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

},{"../Html/EscapeHtml":8,"../System/EventHandler/PropertyChangedEventArgs":25,"../System/Types/NoneType":28,"../System/Utility/IsPrimitive":32,"./IObservable":16,"./ObservableBase":17}],19:[function(require,module,exports){
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

},{"../Html/EscapeHtml":8,"../System/EventHandler/PropertyChangedEventArgs":25,"../System/Types/NoneType":28,"../System/Utility/CloneDeep":29,"../System/Utility/IsPrimitive":32,"./IObservable":16,"./ObservableBase":17}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{"./DeferredPromise":20}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"../Async/RepeatablePromise":21}],24:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":22,"./Delegate":23}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"../Utility/IsInteger":31}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":22}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I don't know how accurate this is but it seems pretty good
 */
function isPrimitive(obj) {
    return Object(obj) !== obj;
}
exports.isPrimitive = isPrimitive;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Qcm90b3R5cGVFeHRlbnNpb24uanMiLCJzcmMvRXh0ZW5zaW9uTG9hZGVyLmpzIiwic3JjL0V4dGVuc2lvbnMvQ29tcG9uZW50RXh0ZW5zaW9ucy5qcyIsInNyYy9FeHRlbnNpb25zL0VsZW1lbnRFeHRlbnNpb25zLmpzIiwic3JjL0V4dGVuc2lvbnMvT2JzZXJ2YWJsZUV4dGVuc2lvbnMuanMiLCJzcmMvSHRtbC9DcmVhdGVFbGVtZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zLmpzIiwic3JjL09ic2VydmFibGUvSU9ic2VydmFibGUuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQmFzZS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZS5qcyIsInNyYy9TeXN0ZW0vQXN5bmMvRGVmZXJyZWRQcm9taXNlLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3B6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5yZXF1aXJlKFwiLi4vLi4vc3JjL0V4dGVuc2lvbkxvYWRlclwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGlzIHNjcmlwdCBjb250YWlucyBleHRlbnNpb25zIHRvIHByb3ZpZGUgYWRkaXRpb25hbCBmdW5jdGlvbnMgdXNlZCBieSBJY2hpZ28uXG4gKiBJbiB5b3VyIG1haW4gcHJvY2VzcywgaW1wb3J0IHRoaXMgc2NyaXB0IChpbXBvcnQgJy9wYXRoL3RvL0ljaGlnby9JY2hpZ29FeHRlbnNpb25Mb2FkZXInKSB0byBhZGRcbiAqIHRoZXNlIGV4dGVuc2lvbnMgdG8gcHJvdG90eXBlcy5cbiAqL1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9PYnNlcnZhYmxlRXh0ZW5zaW9uc1wiKTtcbnJlcXVpcmUoXCIuL0V4dGVuc2lvbnMvQ29tcG9uZW50RXh0ZW5zaW9uc1wiKTtcbnJlcXVpcmUoXCIuL0V4dGVuc2lvbnMvRWxlbWVudEV4dGVuc2lvbnNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElDb21wb25lbnRCaW5kaW5nT3B0aW9uc18xID0gcmVxdWlyZShcIi4uL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JQ29tcG9uZW50QmluZGluZ09wdGlvbnNcIik7XG5jb25zdCBCb3VuZENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uL0h0bWxDb21wb25lbnQvQm91bmRDb21wb25lbnRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuLi9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcFwiKTtcbkhUTUxFbGVtZW50LnByb3RvdHlwZS5nZXRDb21wb25lbnQgPSBmdW5jdGlvbiBfZ2V0Q29tcG9uZW50KCkge1xuICAgIHJldHVybiBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQodGhpcyk7XG59O1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmJpbmRDb21wb25lbnQgPSBmdW5jdGlvbiBfYmluZCh2aWV3TW9kZWwpIHtcbiAgICByZXR1cm4gbmV3IEJvdW5kQ29tcG9uZW50XzEuQm91bmRDb21wb25lbnQodmlld01vZGVsLCBuZXcgSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXzEuRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnMoeyBlbGVtZW50OiB0aGlzIH0pKTtcbn07XG5IVE1MRWxlbWVudC5wcm90b3R5cGUuZGVsZXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gX2RlbGV0ZUNvbXBvbmVudCgpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQodGhpcyk7XG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5lcnJvcignTm90IGEgY29tcG9uZW50Jyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIEJvdW5kQ29tcG9uZW50XzEuQm91bmRDb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50LmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG4vKipcbiAqIFNldCB0aGUgcGFyZW50IGZvciBhbiBlbGVtZW50IChqb2luIHRoZSBwYXJlbnQncyBmYW1pbHkgYXMgYSBuZXcgY2hpbGQpLCB0aGUgb3Bwb3NpdGUgb2YgYXBwZW5kQ2hpbGQuIEZsdWVudCwgZm9yIGNoYWluaW5nLCBzb1xuICogaXQncyBub3QgYSBwZXJmZWN0IGFuYWxvZyAoYXBwZW5kQ2hpbGQgcmV0dXJucyB0aGUgYXJndW1lbnQgd2hpbGUgdGhpcyByZXR1cm5zIHRoZSBleHRlbmRlZCBvYmplY3QgLi4uIHRob3VnaCBib3RoIGFyZSB0aGUgY2hpbGQpLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kVG9QYXJlbnQgPSBmdW5jdGlvbiBfYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IHZlcnNpb24gb2YgYXBwZW5kQ2hpbGQsIHdoaWNoIHJldHVybnMgdGhlIHBhcmVudCwgbm90IHRoZSBjaGlsZCAodGhlIGFyZ3VtZW50KS5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkRmx1ZW50ID0gZnVuY3Rpb24gX2FwcGVuZENoaWxkRmx1ZW50KGNoaWxkKSB7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBBZGQgdGhlIGVsZW1lbnQgYWZ0ZXIgdGhlIGN1cnJlbnQgaXRlbSwgYXQgdGhlIHNhbWUgbGV2ZWwuIE5vdCBmbHVlbnQsIHNvIHRoaXMgaXMgdGhlIHNhbWUgcGF0dGVybiBhcyBhcHBlbmRDaGlsZC5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFwcGVuZFNpYmxpbmcgPSBmdW5jdGlvbiBfYXBwZW5kU2libGluZyhuZXh0KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQobmV4dCk7XG59O1xuLyoqXG4gKiBBZGQgdGhlIGVsZW1lbnQgYWZ0ZXIgdGhlIGN1cnJlbnQgaXRlbSwgYXQgdGhlIHNhbWUgbGV2ZWwuIEZsdWVudC5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFwcGVuZFNpYmxpbmdGbHVlbnQgPSBmdW5jdGlvbiBfYXBwZW5kU2libGluZ0ZsdWVudChuZXh0KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXh0KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIFJlcGxhY2UgdGhlIGVsZW1lbnQuIE5vdCBmbHVlbnQsIHNvIHRoaXMgaXMgdGhlIHNhbWUgcGF0dGVybiBhcyBhcHBlbmRDaGlsZC4gVGhlcmUgaXMgbm8gZmx1ZW50IHZlcnNpb24gYmVjYXVzZVxuICogdGhpcyBpcyBkZWxldGluZyB0aGUgZXh0ZW5kZWQgb2JqZWN0LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUucmVwbGFjZVdpdGggPSBmdW5jdGlvbiBfcmVwbGFjZVdpdGgobmV3RWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIHRoaXMpO1xuICAgIHJldHVybiBuZXdFbGVtZW50O1xufTtcbi8qKlxuICogU3dhcCB0d28gZWxlbWVudHMgZnJvbSB0aGVpciBwbGFjZXMgaW4gdGhlIERPTSwgcmV0dXJuaW5nIHRoZSBhcmd1bWVudC5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiBfc3dhcChlbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIGNvbnN0IGVsZW1lbnRQYXJlbnQgPSBlbGVtZW50LnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgY29uc3QgcGxhY2VIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZWxlbWVudFBhcmVudC5yZXBsYWNlQ2hpbGQocGxhY2VIb2xkZXIsIGVsZW1lbnQpO1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoZWxlbWVudCwgdGhpcyk7XG4gICAgZWxlbWVudFBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcywgcGxhY2VIb2xkZXIpO1xuICAgIHJldHVybiBlbGVtZW50O1xufTtcbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCBkb2N1bWVudC5yZW1vdmVDaGlsZCB0aGF0IHVzZXMgdGhlIHNhbWUgQVBJIGFzIHRoZSBvdGhlciBmdW5jdGlvbnMgaGVyZS5cbiAqIEluY2x1ZGVkIGZvciB0aGUgc2FrZSBvZiBjb25zaXN0ZW5jeS5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmV4dHJhY3QgPSBmdW5jdGlvbiBfZXh0cmFjdCgpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcmV0dXJuIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbn07XG4vKipcbiAqIEZsdWVudCB2ZXJzaW9uIG9mIGFkZEV2ZW50TGlzdGVuZXIuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyRmx1ZW50ID0gZnVuY3Rpb24gX2FkZEV2ZW50TGlzdGVuZXJGbHVlbnQoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEZsdWVudCBzdHlsZSBhZGRlci5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFkZFN0eWxlID0gZnVuY3Rpb24gX2FkZFN0eWxlKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEZsdWVudCBjbGFzcyBhZGRlci5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gX2FkZENsYXNzKGNsYXNzTmFtZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2xhc3NOYW1lcykpIHtcbiAgICAgICAgY2xhc3NOYW1lcyA9IFtjbGFzc05hbWVzXTtcbiAgICB9XG4gICAgLy8gTmVlZCB0byBhbHNvIGFsbG93IGNsYXNzZXMgaW4gdGhlIFwiY2xhc3MxIGNsYXNzMlwiIGZvcm1hdFxuICAgIGZvciAoY29uc3QgYyBvZiBbXS5jb25jYXQoLi4uY2xhc3NOYW1lc1xuICAgICAgICAubWFwKHEgPT4gcS5zcGxpdCgnICcpKVxuICAgICAgICAuZmlsdGVyKHEgPT4gcSkpKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCB1c2luZyB0aGUgY3JlYXRlRWxlbWVudCBoZWxwZXIgZnVuY3Rpb24gYW5kIGFkZCBpdCB0byB0aGUgZnJhZ21lbnQsIHJldHVybmluZyB0aGUgbmV3IGVsZW1lbnQuXG4gKi9cbkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCB1c2luZyB0aGUgY3JlYXRlRWxlbWVudCBoZWxwZXIgZnVuY3Rpb24gYW5kIGFkZCBpdCB0byB0aGUgZnJhZ21lbnQuIEZsdWVudCB2ZXJzaW9uLCBzbyBpdCdzIGVhc3kgdG8gcXVpY2tseSBhZGRcbiAqIGEgYnVuY2ggb2YgZWxlbWVudHMgdG8gdGhlIGZyYWdtZW50LlxuICovXG5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50Rmx1ZW50ID0gZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnRGbHVlbnQodGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzKTtcbiAgICB0aGlzLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogVGFrZSBhIGRvY3VtZW50IGZyYWdtZW50IGFuZCBhZGQgaXRzIGNvbnRlbnRzIHRvIGEgcGFyZW50IGVsZW1lbnQuIENhbm5vdCBiZSBmbHVlbnQgYmVjYXVzZSBhdCB0aGlzIHBvaW50LCB0aGUgZnJhZ21lbnQgaXMgZW1wdHkgYW5kXG4gKiBwcmV0dHkgdXNlbGVzcywgc28gdGhpcyByZXR1cm5zIHRoZSBwYXJlbnQgYXJndW1lbnQgKGFzIGdvb2QgYXMgYW55IG90aGVyIG9wdGlvbikuXG4gKi9cbkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmFwcGVuZFRvUGFyZW50ID0gZnVuY3Rpb24gX2FwcGVuZFRvUGFyZW50KHBhcmVudCkge1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgICByZXR1cm4gcGFyZW50O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgT2JzZXJ2YWJsZVByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG4vKipcbiAqIFF1aWNrbHkgY29udmVydCBhbiBvYmplY3QgdG8gYSBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbk9iamVjdC5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBzdHJpbmcgdG8gYW4gT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlUHJvcGVydHlfMS5PYnNlcnZhYmxlUHJvcGVydHkodGhpcywgeyBuYW1lIH0pO1xufTtcbi8qKlxuICogUXVpY2tseSBjb252ZXJ0IGEgbnVtYmVyIHRvIGEgT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlUHJvcGVydHlfMS5PYnNlcnZhYmxlUHJvcGVydHkodGhpcywgeyBuYW1lIH0pO1xufTtcbi8qKlxuICogUXVpY2tseSBjb252ZXJ0IGEgYm9vbCB0byBhIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuQm9vbGVhbi5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4vRWxlbWVudFR5cGVcIik7XG5jb25zdCBFeHRyYWN0Tm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuL0V4dHJhY3ROb2RlQ29udGVudFwiKTtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgdGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgdGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIC8vIEFsbG93IGF0dHJpYnV0ZXMgdG8gYmUgc2VudCBvbiBwcm9wZXJ0aWVzLCBwcm92aWRpbmcgYSBjbGVhbmVyIGludGVyZmFjZS5cbiAgICAvLyBJdCBhbGxvd3MgeW91IHRvIHNlbmQgY3JlYXRlRWxlbWVudCgnZGl2Jywge2F0dHJpYnV0ZXM6IHsgY2xhc3M6ICdmb28nIH19KSBpbnN0ZWFkIG9mIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsIHsgY2xhc3M6ICdmb28nIH0pO1xuICAgIC8vIEFub3RoZXIgb3B0aW9uIGlzIHRvIHVzZSBLd2FyZ3MsIGJ1dCBub3QgZXZlcnlvbmUgd2FudHMgdG8uXG4gICAgaWYgKHByb3BlcnRpZXMgJiYgJ2F0dHJpYnV0ZXMnIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcyB8fCB7fSwgcHJvcGVydGllcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuYXR0cmlidXRlcztcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG5mdW5jdGlvbiBjcmVhdGUodGFnLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBET00gcHJvcGVydGllcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBhdHRyaWJ1dGVzLCBiZWNhdXNlIGluIHNvbWUgY2FzZXMsIHRoZXkgb3ZlcnJpZGUgdGhlIGluaXRpYWwgdmFsdWUuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBIVE1MIGZyb20gYW55IEhUTUwgZWxlbWVudCBwcm92aWRlZC5cbiAqIFVzZSBsaWtlIGNvbnN0IGRpdiA9IGNyZWF0ZUh0bWw8SFRNTERpdkVsZW1lbnQ+KFwiPGRpdj5Tb21ldGhpbmc8L2Rpdj5cIikgb3IgY29uc3QgY3VzdG9tID0gY3JlYXRlSHRtbChcIjxzb21lLXRhZz48L3NvbWUtdGFnPlwiKS5cbiAqIElmIG11bHRpcGxlIGVsZW1lbnRzIG9yIGEgcGxhaW4gdGV4dCBzdHJpbmcgd2l0aCBubyBIVE1MIGlzIHByb3ZpZGVkLCB0aGVuIGl0IHdpbGwgYmUgd3JhcHBlZCBpbiBhIGRpdiwgc28gaXQgY2FuIGtlZXBcbiAqIHJldHVybmluZyBhbiBIVE1MRWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVIdG1sKGh0bWwsIGlubGluZSA9IGZhbHNlKSB7XG4gICAgbGV0IHdyYXBwZXI7XG4gICAgaWYgKGlubGluZSkge1xuICAgICAgICB3cmFwcGVyID0gc3BhbigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVzID0gd3JhcHBlci5jaGlsZE5vZGVzO1xuICAgIC8vIE11bHRpcGxlIG5vZGVzLCByZXR1cm4gdGhlIHdyYXBwaW5nIGRpdlxuICAgIC8vIGUuZy4gXCJUaGlzIGlzIGEgPGVtPnRlc3Q8L2VtPlwiIG9yIFwiPGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj5cIlxuICAgIGlmIChub2Rlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIC8vIElmIGp1c3QgYSB0ZXh0bm9kZSAob3IgZW1wdHkpLCByZXR1cm4gYSBzcGFuLiBUZXh0IGlzIGluY29tcGF0aWJsZSB3aXRoIEhUTUxFbGVtZW50IHNvIGNhbid0IHJldHVybiB0aGF0XG4gICAgLy8gZS5nLiBcIkhlbGxvIHdvcmxkXCJcbiAgICBpZiAoIXdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgaWYgKGlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7IC8vIFRoaXMgaXMgYSBzcGFuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Bhbih3cmFwcGVyLmlubmVySFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRWxzZSByZXR1cm4gdGhlIHNpbmdsZSBjaGlsZC5cbiAgICAvLyBlLmcuIFwiPGRpdj48ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PjwvZGl2PlwiXG4gICAgcmV0dXJuIHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5leHBvcnRzLmNyZWF0ZUh0bWwgPSBjcmVhdGVIdG1sO1xuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgd2l0aCBhbnkgaHRtbC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQoaHRtbCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgcmV0dXJuIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh3cmFwcGVyKTtcbn1cbmV4cG9ydHMuY3JlYXRlRnJhZ21lbnQgPSBjcmVhdGVGcmFnbWVudDtcbmZ1bmN0aW9uIGRpdihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5kaXYgPSBkaXY7XG5mdW5jdGlvbiBzcGFuKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MU3BhbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5zcGFuID0gc3BhbjtcbmZ1bmN0aW9uIHBhcmFncmFwaChodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFBhcmFncmFwaEVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5wYXJhZ3JhcGggPSBwYXJhZ3JhcGg7XG5mdW5jdGlvbiBhbmNob3IoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgaHJlZk9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIGNvbnN0IHRtcCA9IF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxBbmNob3JFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICBpZiAodHlwZW9mIGhyZWZPclByb3BlcnRpZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRtcC5ocmVmID0gU3RyaW5nKGhyZWZPclByb3BlcnRpZXMgfHwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gdG1wO1xufVxuZXhwb3J0cy5hbmNob3IgPSBhbmNob3I7XG5mdW5jdGlvbiBidXR0b24oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxCdXR0b25FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuYnV0dG9uID0gYnV0dG9uO1xuLy8gQ29tbW9uIHByaXZhdGUgZnVuY3Rpb25zIGZvciBvdmVybG9hZHMuIFByZXZlbnRzIGxvdHMgb2YgY29weXBhc3RhLlxuLy8gVGhpcyB3b3JrcyBmb3IgZXZlcnl0aGluZyBiZWNhdXNlIFR5cGVTY3JpcHQgaXMga2VlcGluZyB0aGUgdHlwZXMgdmFsaWQuIEluIHB1cmUgSlMsIGJ1Z3MgY291bGQgYmUgY3JlYXRlZCAoZm9yIGV4YW1wbGUsIHBhc3NpbmcgYW4gaW5uZXJcbi8vIGVsZW1lbnQgdG8gYSBwYXJhZ3JhcGggLi4uIGRpc2FsbG93ZWQgYnkgVFMgYnV0IHRoZSBjb2RlIGlzIHRoZXJlIGluIHRoZSBKUylcbmZ1bmN0aW9uIF9pbnRlcm5hbCh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKGh0bWxPclByb3BlcnRpZXMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX292cjEodHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBodG1sT3JQcm9wZXJ0aWVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBfb3ZyMyh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBfb3ZyMih0eXBlLCBTdHJpbmcoaHRtbE9yUHJvcGVydGllcyB8fCAnJyksIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9vdnIxKHR5cGUsIGlubmVyRWxlbWVudCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgY29uc3QgZSA9IGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbiAgICBlLmFwcGVuZENoaWxkKGlubmVyRWxlbWVudCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBfb3ZyMih0eXBlLCBpbm5lckh0bWwsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gaW5uZXJIdG1sO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG5mdW5jdGlvbiBfb3ZyMyh0eXBlLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IHByb3BzLmlubmVySFRNTCB8fCAnJztcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgaGVscGVyIGZvciBDcmVhdGVFbGVtZW50LCByb3VnaGx5IG1hcHBpbmcgdG8gSHRtbEVsZW1lbnQgdHlwZXMsIGJ1dCBub3QgcGVyZmVjdGx5IGJlY2F1c2UgaXQncyBpbXBvc3NpYmxlXG4gKiAodGhlcmUncyBubyBwZXJmZWN0IDE6MSByZWxhdGlvbnNoaXApLlxuICovXG52YXIgZWxlbWVudFR5cGU7XG4oZnVuY3Rpb24gKGVsZW1lbnRUeXBlKSB7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQW5jaG9yRWxlbWVudFwiXSA9IFwiYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFyZWFFbGVtZW50XCJdID0gXCJhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXVkaW9FbGVtZW50XCJdID0gXCJhdWRpb1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJSRWxlbWVudFwiXSA9IFwiYnJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCYXNlRm9udEVsZW1lbnRcIl0gPSBcImJhc2Vmb250XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmxvY2tRdW90ZUVsZW1lbnRcIl0gPSBcImJsb2NrcXVvdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCdXR0b25FbGVtZW50XCJdID0gXCJidXR0b25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxDYW52YXNFbGVtZW50XCJdID0gXCJjYW52YXNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhRWxlbWVudFwiXSA9IFwiZGF0YVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFMaXN0RWxlbWVudFwiXSA9IFwiZGF0YWxpc3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaWFsb2dFbGVtZW50XCJdID0gXCJkaWFsb2dcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaXZFbGVtZW50XCJdID0gXCJkaXZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxETGlzdEVsZW1lbnRcIl0gPSBcImRsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRW1iZWRFbGVtZW50XCJdID0gXCJlbWJlZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZpZWxkU2V0RWxlbWVudFwiXSA9IFwiZmllbGRzZXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGb3JtRWxlbWVudFwiXSA9IFwiZm9ybVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcxRWxlbWVudFwiXSA9IFwiaDFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMkVsZW1lbnRcIl0gPSBcImgyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzNFbGVtZW50XCJdID0gXCJoM1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc0RWxlbWVudFwiXSA9IFwiaDRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNUVsZW1lbnRcIl0gPSBcImg1XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzZFbGVtZW50XCJdID0gXCJoNlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhSRWxlbWVudFwiXSA9IFwiaHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbWFnZUVsZW1lbnRcIl0gPSBcImltYWdlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW5wdXRFbGVtZW50XCJdID0gXCJpbnB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExhYmVsRWxlbWVudFwiXSA9IFwibGFiZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMZWdlbmRFbGVtZW50XCJdID0gXCJsZWdlbmRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMSUVsZW1lbnRcIl0gPSBcImxpXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGlua0VsZW1lbnRcIl0gPSBcImxpbmtcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNYXBFbGVtZW50XCJdID0gXCJtYXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNZXRlckVsZW1lbnRcIl0gPSBcIm1ldGVyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kRGVsRWxlbWVudFwiXSA9IFwiZGVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kSW5zRWxlbWVudFwiXSA9IFwiaW5zXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT0xpc3RFbGVtZW50XCJdID0gXCJvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9iamVjdEVsZW1lbnRcIl0gPSBcIm9iamVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdEdyb3VwRWxlbWVudFwiXSA9IFwib3B0Z3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRpb25FbGVtZW50XCJdID0gXCJvcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPdXRwdXRFbGVtZW50XCJdID0gXCJvdXRwdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhZ3JhcGhFbGVtZW50XCJdID0gXCJwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYW1FbGVtZW50XCJdID0gXCJwYXJhbVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBpY3R1cmVFbGVtZW50XCJdID0gXCJwaWN0dXJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJlRWxlbWVudFwiXSA9IFwicHJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJvZ3Jlc3NFbGVtZW50XCJdID0gXCJwcm9ncmVzc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFF1b3RlRWxlbWVudFwiXSA9IFwicVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNjcmlwdEVsZW1lbnRcIl0gPSBcInNjcmlwdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNlbGVjdEVsZW1lbnRcIl0gPSBcInNlbGVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNvdXJjZUVsZW1lbnRcIl0gPSBcInNvdXJjZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNwYW5FbGVtZW50XCJdID0gXCJzcGFuXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3R5bGVFbGVtZW50XCJdID0gXCJzdHlsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnRcIl0gPSBcImNhcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFwiXSA9IFwidGRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50XCJdID0gXCJ0aFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sRWxlbWVudFwiXSA9IFwiY29sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xHcm91cEVsZW1lbnRcIl0gPSBcImNvbGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVFbGVtZW50XCJdID0gXCJ0YWJsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlUm93RWxlbWVudFwiXSA9IFwidHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Cb2R5RWxlbWVudFwiXSA9IFwidGJvZHlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Gb290ZXJFbGVtZW50XCJdID0gXCJ0Zm9vdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkhlYWRlckVsZW1lbnRcIl0gPSBcInRoZWFkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGVtcGxhdGVFbGVtZW50XCJdID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRleHRBcmVhRWxlbWVudFwiXSA9IFwidGV4dGFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUaW1lRWxlbWVudFwiXSA9IFwidGltZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRyYWNrRWxlbWVudFwiXSA9IFwidHJhY2tcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxVTGlzdEVsZW1lbnRcIl0gPSBcInVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVmlkZW9FbGVtZW50XCJdID0gXCJ2aWRlb1wiO1xufSkoZWxlbWVudFR5cGUgPSBleHBvcnRzLmVsZW1lbnRUeXBlIHx8IChleHBvcnRzLmVsZW1lbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChpbnB1dCkge1xuICAgIC8vIFRoZXJlIGlzbid0IGEgYnVpbHQtaW4gd2F5IHRvIGRvIHRoaXMsIHN0aWxsLCBzbyB3ZSBuZWVkIGEgaGVscGVyIGZ1bmN0aW9uLlxuICAgIC8vIFRoZSBhcnRpY2xlIFwiWW91IGFyZSBwcm9iYWJseSBtaXN1c2luZyBET00gdGV4dCBtZXRob2RzXCIgY29udmluY2VkIG1lIHRvIGRvIGl0IHRoaXMgd2F5LFxuICAgIC8vIHZzLiBjcmVhdGVUZXh0Tm9kZS4gVGhvdWdoIGNyZWF0ZVRleHROb2RlIHdvdWxkIHByb2JhYmx5IHdvcmsgZmluZSBmb3Igc2V0dGluZyBpbm5lckhUTUwuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGVzY2FwZXMgPSB7XG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICAgICAgXCI9XCI6IFwiJiN4M0Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXG4gICAgICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gICAgfTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBzID0+IGVzY2FwZXNbc10pO1xufVxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUgYXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xufVxuZXhwb3J0cy5leHRyYWN0Tm9kZUNvbnRlbnQgPSBleHRyYWN0Tm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBIVE1MIGlzIGluY29uc2lzdGVudC4gR2V0dGluZyB0aGUgdmFsdWUgb2YgZm9ybSBmaWVsZHMgaXMgYSBiaXQgY29tcGxpY2F0ZWQsIG5vdCBhbHdheXMgZWxlbWVudC52YWx1ZSxcbiAqIHNvIGhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCkge1xuICAgIC8vIEl0IHdvdWxkIGJlIHJlYWxseSBuaWNlIGF0IHRoaXMgcG9pbnQgaWYgSlMgY291bGQgc2VlIGdlbmVyaWMgcGFyYW1ldGVycy5cbiAgICAvLyBJZiBpdCBjb3VsZCwgdGhlbiB0aGUgY29kZSBjb3VsZCBzYXkgXCJpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiBUT3V0cHV0ICE9PSBib29sZWFuKSB0aHJvdyBuZXcgRXJyb3IoKVwiXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RWYWx1ZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGb3JtRmllbGRWYWx1ZSA9IGdldEZvcm1GaWVsZFZhbHVlO1xuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0LmNoZWNrZWQ7XG59XG5leHBvcnRzLmdldENoZWNrYm94VmFsdWUgPSBnZXRDaGVja2JveFZhbHVlO1xuZnVuY3Rpb24gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlcklucHV0VmFsdWUgPSBnZXROdW1iZXJJbnB1dFZhbHVlO1xuZnVuY3Rpb24gZ2V0UmFkaW9WYWx1ZShpbnB1dCkge1xuICAgIC8vIFJhZGlvIGJ1dHRvbnMgYXJlIHdlaXJkLiBXZSB3YW50IHRoZW0gdG8gYXBwZWFyIHRvIGJlIG1vcmUgbm9ybWFsLlxuICAgIGlmIChpbnB1dC5uYW1lKSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aW5wdXQubmFtZX1cIl06Y2hlY2tlZGApIHx8IHt9KS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSWYgbm8gbmFtZSwgZmFsbCBiYWNrIHRvIHRoaXNcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRSYWRpb1ZhbHVlID0gZ2V0UmFkaW9WYWx1ZTtcbmZ1bmN0aW9uIGdldFNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZWxlY3RWYWx1ZSA9IGdldFNlbGVjdFZhbHVlO1xuZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3Quc2VsZWN0ZWRPcHRpb25zKS5maWx0ZXIoZiA9PiBmLnZhbHVlKS5tYXAobSA9PiBtLnZhbHVlKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlTZWxlY3RWYWx1ZSA9IGdldE11bHRpU2VsZWN0VmFsdWU7XG4vLyBUaGlzIGlzIGFsbW9zdCBwb2ludGxlc3MuIEp1c3QgaGVyZSBmb3IgY29uc2lzdGVuY3kuXG5mdW5jdGlvbiBnZXRTaW1wbGVGb3JtVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIGZvciBtdWx0aS1zZWxlY3RzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuZXhwb3J0cy5nZXRTaW1wbGVGb3JtVmFsdWUgPSBnZXRTaW1wbGVGb3JtVmFsdWU7XG4vKipcbiAqIFNldHRpbmcgdmFsdWVzIGlzIGp1c3QgYXMgY29tcGxpY2F0ZWQgYXMgZ2V0dGluZyB0aGVtLCBiZWNhdXNlIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBZb3UgY2FuJ3QganVzdCBzYXkgZWxlbWVudC52YWx1ZSA9IGZvby5cbiAqIEhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gc2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAvLyBIZXJlIHlvdSBjYW4gdmFsaWRhdGUgdGhlIHR5cGUgYmVmb3JlIHNldHRpbmcgb3IgZG8gc29tZSBraW5kIG9mIGNvbnZlcnNpb24uXG4gICAgLy8gRm9yIG11bHRpLXNlbGVjdHMsIGNhbiBhdXRvLXdyYXAgdmFsdWUgaW4gc3RyaW5nLlxuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpOyAvLyB1c2VkIGluIG1vc3Qgb2YgdGhlIGNhc2VzXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCBzdHJpbmdWYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHN0cmluZ1ZhbHVlID09PSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShzdHJpbmdWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRldGltZScgfHwgdHlwZSA9PT0gJ2RhdGV0aW1lLWxvY2FsJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdHJpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBgJHt0b0RhdGVTdHJpbmcoZGF0ZSl9VCR7dG9UaW1lU3RyaW5nKGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzZWxlY3Qub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7IC8vIHRyZWF0aW5nIGl0IGxpa2UgYSBub24tbXVsdGlwbGUgd29ya3NcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb25leGlzdGVudCBvcHRpb25zIGNhbm5vdCBiZSBzZXQuIFdlIHNob3VsZCBsZXQgdGhlIHByb2dyYW1tZXIga25vdy4gRXZlbiB0aG91Z2ggdGhpcyB0YWtlcyBDUFUgY3ljbGVzLlxuICAgICAgICAgICAgdmFsdWUubWFwKG0gPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdmFsdWUubWFwKG0gPT4gbS50b1N0cmluZygpKS5pbmRleE9mKG9wdC52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIG9uIG5vbi1mb3JtIGZpZWxkICR7ZWxlbWVudC50YWdOYW1lfSAke2VsZW1lbnQuaWQgfHwgJyd9YCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbCkge1xuICAgICAgICAvLyBJZiB5b3Ugc2V0IHRoZSB2YWx1ZSBvZiBhIHNlbGVjdCB0byBzb21ldGhpbmcgdGhhdCBpcyBub3QgYW4gYXZhaWxhYmxlIG9wdGlvbiwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgICAgY29uc3QgaGFzT3B0aW9uID0gb3B0aW9ucy5tYXAobSA9PiBtLnZhbHVlKS5pbmRleE9mKHZhbC50b1N0cmluZygpKSA+IC0xO1xuICAgICAgICBpZiAoIWhhc09wdGlvbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIHdpdGggbm9uZXhpc3RlbnQgb3B0aW9uICR7dmFsLnRvU3RyaW5nKCl9IG9uIHNlbGVjdCAke2VsZW1lbnQuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlc2UgY291bGQgYmUgcmVhZGFibGUgb25lbGluZXJzIGlmIHdlIGhhZCBwYWRTdGFydCgpIGJ1dCBpdCdzIG5vdCB3b3J0aCBidW1waW5nIHRvIEVTMjAxNyBmb3Igb25lIG1ldGhvZFxuICAgIGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGggPSAoJzAnICsgKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgZGF5ID0gKCcwJyArIGRhdGUuZ2V0VVRDRGF0ZSgpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0VVRDRnVsbFllYXIoKX0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9UaW1lU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3VyID0gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBtaW51dGUgPSAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5zZXRGb3JtRmllbGRWYWx1ZSA9IHNldEZvcm1GaWVsZFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3Iobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvciA9IG5vZGVMaXN0U2VsZWN0b3I7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3JBbGwobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgYnJvd3NlciBjYW4gbG9zZSByZWZlcmVuY2VzIHdoZW4gbW92aW5nIG5vZGVzLCB0aGlzIGNhbiBhbHNvIHRha2UgYSByZWd1bGFyIGFycmF5LlxuICAgIC8vIEJlY2F1c2UgSFRNTDUgaGFzIHRvdGFsbHkgZmFsbGVuIG92ZXIsIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgZml4ZWQgbm9kZUxpc3RTZWxlY3RvckFsbFxuICAgIC8vIHRvIG1hdGNoIHRoZSBvdXRwdXQgc2lnbmF0dXJlIG9mIHF1ZXJ5U2VsZWN0b3JBbGwgKE5vZGVMaXN0T2Y8RWxlbWVudD4gaW5zdGVhZCBvZiBhcnJheSkuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uQXJyYXkuZnJvbShzZWFyY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3JBbGwgPSBub2RlTGlzdFNlbGVjdG9yQWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2ktdicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaS12JywgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICB0aGlzLl9hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gb3B0aW9ucy5kZWZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgLy8gRGVmaW5lZCB0aGUgZGVmYXVsdCBjb21wb25lbnQgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IGxvb3BQb3N0UHJvY2VzcygpIG1ldGhvZFxuICAgICAgICBpZiAob3B0aW9ucy5sb29wSXRlbUNsYXNzKSB7XG4gICAgICAgICAgICBpZiAoIUNvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb29wSXRlbUNsYXNzIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShvcHRpb25zLmxvb3BJdGVtQ2xhc3MgaW5zdGFuY2VvZiBCb3VuZENvbXBvbmVudC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGFuIGJvdW5kIGNvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MgPSBvcHRpb25zLmxvb3BJdGVtQ2xhc3MgfHwgQm91bmRDb21wb25lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCk7XG4gICAgICAgIHRoaXMuc2V0VGVtcGxhdGUodGhpcy5jb250ZW50LmlubmVySFRNTCk7IC8vIElubmVySFRNTCBpcyBjdXJyZW50bHkgb25seSBwYXJzZWQgYW5kIHRoZW4gdGhlIG9yaWdpbmFsIHRleHQgaXMgdGhyb3duIGF3YXkuXG4gICAgICAgIC8vIEF1dG8tYWRkIHN1YnNjcmlwdGlvbnMgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMub2JzZXJ2ZVZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGd0IG9mIG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUodGd0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcigpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0b3IgaW5pdGlhbGl6YXRpb24gaXMgZG9uZS5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKiBUbyByZXBsYWNlIHRoZSBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogSW4gYWxtb3N0IGV2ZXJ5IGNhc2UsIHZpZXdNb2RlbCBzaG91bGQgYmUgc2V0LiBCdXQgaXQncyBub3QgcG9zc2libGUgdG8gY2hhbmdlIHRoYXQgYW5kIHN0aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgYmFzZVxuICAgICAqIGNsYXNzIGluamVjdCgpLiBUaGlzIGlzIGEgdHlwZXNjcmlwdC1vbmx5IGlzc3VlIGJ1dCBpdCBtYWtlcyB0aGluZ3MgdWdseS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuIEFuZCBwcmFjdGljYWxseSBkZW1hbmRzIHRoZWlyIHVzZSB0byBzZXQgdmlld01vZGVsLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQm91bmRDb21wb25lbnQoZWxlbWVudCwgdmlld01vZGVsLCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Cb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbCB0byBpbmplY3QoKSB3aXRoIGEgY2xlYW5lciBhcmd1bWVudCBvcmRlci5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0QmluZCh2aWV3TW9kZWwsIHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKTtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIHZpZXdNb2RlbCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAvLyBXQVJOOiBUaGlzIGNhc3QgbWF5IG5vdCBiZSB0cnVlLiBUaGVyZSdzIG5vIHdheSB0byBjaGVjayB0aGF0IHRoZSB0YWdzIG1hdGNoLlxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgb3B0KTtcbiAgICB9XG4gICAgd3JpdGUoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIGNhc2VzIHdoZXJlIHZhbHVlIGlzIHVuZGVmaW5lZC4gRWl0aGVyIHRoZSBlbGVtZW50IGlzIG5vdCBhIGZvcm0gZWxlbWVudCBvciBpdCdzIGFuIHVubmFtZWQgcmFkaW8gYnV0dG9uXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IHNlbGVjdGVkLiBJbiBib3RoIGNhc2VzLCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSB0aGUgbW9kZWwgd2l0aCB1bmRlZmluZWQsIHdoaWNoIGlzIHVzZWxlc3MuXG4gICAgICAgIC8vIFRPRE86IElzIHRoaXMganVzdGlmaWNhdGlvbiB2YWxpZD9cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXQVJOOiBDYW5ub3QgdHlwZSBjaGVjayB0aGlzIGR5bmFtaWNhbGx5LiBUeXBlU2NyaXB0IGlzIGJ1aWxkLXRpbWUgY2hlY2tpbmcgb25seS4gUnVudGltZSBjb2RlIGNhbid0IGV2ZW4gc2VlIHRoZSB0eXBlLlxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB0byBiZSBwcmVjaXNlLCBhbGwgcHJvcGVydGllcyBpbiBfd3JpdGVCaW5kaW5ncyBzaG91bGQgYmUgRm9ybUl0ZW1WYWx1ZSwgYnV0IGFzIF93cml0ZUJpbmRpbmdzIGlzIHBvcHVsYXRlZFxuICAgICAgICAvLyB2aWEgc3RyaW5nLCB0aGVyZSdzIG5vIHdheSB0byBlbmZvcmNlIHRoYXQuIFNvIGlmIHlvdSBmaWxsIGEgc3RyaW5nIHZhbHVlIGZyb20gYSBtdWx0aXBsZSBzZWxlY3QsIGl0J2xsIHByb2R1Y2UgYnVncy5cbiAgICAgICAgLy8gU28gYmUgY2FyZWZ1bC4gSXQncyBvbiB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYmluZCBvZiB0aGlzLl93cml0ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGlmIChiaW5kLnN0YXJ0c1dpdGgoJ3RoaXMuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW2JpbmRdO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzW2JpbmRdID0gdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIHZpZXcgbW9kZWwgaXMgZWl0aGVyIEZvcm1GaWVsZFZhbHVlIG9yIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBvbmUuXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGhpcy52aWV3TW9kZWwsICgpID0+IHRoaXMudmlld01vZGVsID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIG9ic2VydmFibGUgc3RhdGUsIHdlIG5lZWQgdG8gZ2V0IHRoZSBzdGF0ZSwgdXBkYXRlIGl0LCBhbmQgd3JpdGUgdGhlIHdob2xlIHRoaW5nIGJhY2suXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoaWxlIGl0IGlzIHBvc3NpYmxlIHRvIHVwZGF0ZSBhIHNpbmdsZSBwcm9wZXJ0eSBpbiBzb21lIGNhc2VzLCBpdCBkb2Vzbid0IGFsbG93IHJldXNlIG9mIGFscmVhZHktd29ya2luZyBjb2RlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZpZXdNb2RlbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG1wW2JpbmRdO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gdG1wW2JpbmRdID0gdmFsdWUsIHRtcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdG1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy52aWV3TW9kZWxbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzLnZpZXdNb2RlbFtiaW5kXSA9IHZhbHVlLCB0aGlzLnZpZXdNb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlVmFsdWUodGFyZ2V0LCB3cml0ZVRvUHJvcGVydHksIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRvIGJlIGZsZXhpYmxlLCBiZWNhdXNlIGlmIHRhcmdldCBpcyBhIHZhbHVlIHR5cGUgb3IgaW1tdXRhYmxlLCB3cml0aW5nXG4gICAgICAgICAgICAvLyBpdCBkaXJlY3RseSByZXBsYWNlcyBvbmx5IHRoZSB2YWx1ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBtb2RlbC5cbiAgICAgICAgICAgIHdyaXRlVG9Qcm9wZXJ0eSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byB0aGUgbW9kZWwgcGFzc2VkIGluLCBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi5cbiAgICAgKi9cbiAgICBvYnNlcnZlKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmIChJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhtb2RlbCkpIHtcbiAgICAgICAgICAgIG1vZGVsLnN1YnNjcmliZSh0aGlzLnJlbmRlciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byBhbGwgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIGZvdW5kIGluIHRoZSBtb2RlbCBwYXNzZWQgaW4sXG4gICAgICogb3IgdGhlIHZpZXcgbW9kZWwgaWYgbm9uZSBwYXNzZWQgaW4uIFRoaXMgb25seSBnb2VzIG9uZSBsZXZlbCBkZWVwLCBzbyBpdFxuICAgICAqIHdvbid0IHBpY2sgdXAgbmVzdGVkIG9iamVjdHMsIGJ1dCBpdCdzIHByb2JhYmx5IGdvb2QgZW5vdWdoIGluIDYwJSBvZiBjYXNlcy5cbiAgICAgKi9cbiAgICBvYnNlcnZlQWxsKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbCk7XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtb2RlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbFttXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gU2VlIGlmIHdlIG5lZWQgdG8gZGVmZXIgcmVuZGVyaW5nIHVudGlsIGFmdGVyIGluaXRpYWxpemF0aW9uXG4gICAgICAgIGlmICh0aGlzLl9kZWZlciAmJiAhdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYm9vbCkge1xuICAgICAgICAgICAgICAgIC8vIEZvciBib29sZWFuIGF0dHJpYnV0ZXMsIHRoZSB2ZXJ5IGV4aXN0ZW5jZSBvZiB0aGUgYXR0cmlidXRlIG1lYW5zIGl0IGlzIGNvbnNpZGVyZWQgdG8gYmUgdHJ1ZS5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gISF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUsIHRoaXMuX2dldFN0cmluZ1ZhbHVlKGl0ZW0uc291cmNlKSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAvLyBDYWxscyBzZXRGb3JtRmllbGRWYWx1ZSBiZWhpbmQgdGhlIHNjZW5lcy5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fdmFsdWVBdHRyaWJ1dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzQ2xhc3NlcykgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMpIHtcbiAgICAgICAgICAgIC8vIElmIHRydXRoeSwgYWRkIGNsYXNzLCBlbHNlIGRlbGV0ZSBpdC5cbiAgICAgICAgICAgIGxldCB2YWwgPSAhIXRoaXMuX2dldFVudHlwZWRWYWx1ZShpdGVtLnNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHRoaXMuX2Nzc1N0eWxlKSB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5jc3NUZXh0ID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCAmJiAhdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW52YWxpZCBzdHlsZSB0ZXh0IGluIGNvbXBvbmVudDogJHt2YWx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZXJhYmxlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2xvb3Auc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVyYWJsZSAmJiB0eXBlb2YgaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLl9sb29wLmZyYWdtZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXMgc29vbiBhcyB3ZSBhZGQgdGhlIGNsb25lIHRvIGNvbnRlbnQsIGNoaWxkTm9kZXMgbG9zZXMgcmVmZXJlbmNlIHRvIGl0cyBjaGlsZCBub2Rlcywgc28gY29weSBpdC5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGNsb25lLmNoaWxkTm9kZXMpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wLnBvc3RQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb3BQb3N0UHJvY2Vzcyhyb3csIG5vZGVzLCBpdGVyYWJsZSwgcHJldmlvdXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzRGlzcGxheSkge1xuICAgICAgICAgICAgLy8gSWYgZmFsc3ksIHNldCBkaXNwbGF5OiBub25lIChzYXZpbmcgcHJldmlvdXMgdmFsdWUpLiBJZiB0cnV0aHksIHJlc3RvcmUgcHJldmlvdXMgdmFsdWUgKGlmIGJsb2NrLCBmbGV4LCBidXQgbm90IGlmIG5vbmUpXG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2Nzc0Rpc3BsYXkuc291cmNlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5Lm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCB0aGlzLl9wcmV2aW91c0Nzc0Rpc3BsYXlTZXR0aW5nIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgPSB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGVtcGxhdGUodGVtcGxhdGVUZXh0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgdXBkYXRlIHBhcmFtIHNob3VsZCBub3QgYmUgc2V0LlxuICAgICAgICBpZiAodXBkYXRlICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgc2hvdWxkIG5vdCBiZSB0cnVlIHdoZW4gY2FsbGVkIGludGVybmFsbHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2Ugd2UncmUgY3JlYXRpbmcgYW4gZWxlbWVudCB0aGF0J3Mgbm90IG9uIHRoZSBwYWdlLCB3ZSBwcm9iYWJseSBjb3VsZCBhdm9pZCB1c2luZyBhIGZyYWdtZW50LFxuICAgICAgICAvLyBidXQgdGhpcyBpcyB3aGF0IGZyYWdtZW50cyBhcmUgZm9yLlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlVGV4dDtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHVzZWQgdG8gcmVwbGFjZSB0aGUgZXhpc3RpbmcgdGVtcGxhdGUsIHdlIG5lZWQgdG8gd2lwZSBvdXQgdGhlIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gV29ya2luZyBvbiBhIGNsb25lIGhlcmUsIHNvIHdlIGRvbid0IHNlZSB0aGUgYm9keSBiZWluZyBidWlsdCBzdGVwIGJ5IHN0ZXAgaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpLXYnKSkge1xuICAgICAgICAgICAgLy8gSWYgbmFtZSBpcyBzcGVjaWZpZWQsIGNvbXBvbmVudCBNVVNUIGJlIHNwZWNpZmllZC4gVGhlIHNhbWUgaWYgY29tcG9uZW50IGlzIHNwZWNpZmllZC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uYW1lICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIHNhbWUgaWYgY29tcG9uZW50IGlzIHNwZWNpZmllZC4gUmVxdWlyZXMgcmVwZWF0aW5nIGJlY2F1c2UgdGhpcyBwYXJ0IGJyZWFrcyB3aGVuIG1pbmlmaWVkXG4gICAgICAgICAgICBpZiAocmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm9lc2NhcGUgPSByZXBsLmhhc0F0dHJpYnV0ZSgnbm9lc2NhcGUnKSAmJiByZXBsLmdldEF0dHJpYnV0ZSgnbm9lc2NhcGUnKSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiByZXBsLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogcmVwbC5pbm5lckhUTUwsXG4gICAgICAgICAgICAgICAgbm9lc2NhcGU6IG5vZXNjYXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIHdpbGwgbGVhZCB0byBhIEZPVUMsIG1heWJlIG1pbGxpc2Vjb25kcywgbWF5YmUgbG9uZ2VyLlxuICAgICAgICBpZiAoIXRoaXMuX2RlZmVyIHx8IHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb21wbGV0ZWQgdmFsdWVzIGJlZm9yZSBhZGRpbmcgdG8gdGhlIHZpc2libGUgcGFnZS4gVGhpcyBpcyBzbGlnaHRseSByZWR1bmRhbnQsIGJlY2F1c2UgdGhpcyBoYXBwZW5zIGluIHRoZSByZW5kZXIoKVxuICAgICAgICAgICAgLy8gc3RlcCwgYnV0IEkgaGF0ZSBpdCB3aGVuIEkgc2VlIGEgZmxhc2ggb2YgdW5yZXBsYWNlZCBjb250ZW50IG9uIHNpdGVzLlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiB0aGlzIHdvcmtzIGlzIGJlY2F1c2UgX3JlcGxhY2VtZW50cyByZWZlcmVuY2VzIGNsb25lLCB3aGljaCBpc24ndCB2aXNpYmxlIHVudGlsIGFsbW9zdCB0aGUgbGFzdCBsaW5lLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBvcHVsYXRlIHRoZSBmcm9udC1lbmQgdGV4dC4gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSB0aGluZyB0byByZXBsYWNlLiBPdGhlcndpc2UsIHlvdSdyZSBqdXN0IHdpcGluZyBvdXQgcGVyZmVjdGx5XG4gICAgICAgIC8vIHZhbGlkIEhUTUw1IHJlZmVyZW5jZXMgZm9yIG5vIHJlYXNvbi5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gYSBmdWxsIHVwZGF0ZSBpZiByZXF1ZXN0ZWQgdG9cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SHRtbFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12IG5vZXNjYXBlPicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldFRleHRUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdj4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRMb29wKHNvdXJjZSA9ICcuJywgZnJhZ21lbnQsIHNraXBQb3N0UHJvY2VzcyA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3AgPSB7IHNvdXJjZSwgcG9zdFByb2Nlc3M6ICFza2lwUG9zdFByb2Nlc3MsIGZyYWdtZW50IH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUxvb3AodXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmFsdWVBdHRyaWJ1dGUoc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl92YWx1ZUF0dHJpYnV0ZSA9IHNvdXJjZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmlzaWJpbGl0eShzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHsgc291cmNlLCBuZWdhdGl2ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiBmYWxzZSwgbmVnYXRpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogdHJ1ZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbHRlcihmID0+IGYuYXR0cmlidXRlICE9PSBhdHRyaWJ1dGUpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzQ2xhc3MoY2xzID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jc3NDbGFzc2VzID0gY2xzO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NTdHlsZShzdHlsZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY3NzU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ3NzQ2xhc3NTd2l0Y2goY2xzLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghY2xzIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmluZChmID0+IGYuY2xhc3MgPT09IGNscykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCh7IGNsYXNzOiBjbHMsIHNvdXJjZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ3NzQ2xhc3NTd2l0Y2goY2xzLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbHRlcihmID0+IGYuY2xhc3MgIT09IGNscyk7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy53cml0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlVGFyZ2V0KHRhcmdldCA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmZpbmQoZiA9PiBmID09PSB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZVdyaXRlVGFyZ2V0KHRhcmdldCwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fd3JpdGVUYXJnZXRzLmZpbHRlcihmID0+IGYgIT09IHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXV0by1JbmplY3QgY2FsbHMgdGhlIGRlZmF1bHQgaW5qZWN0QmluZCgpIG9uIHRoZSBkZWZhdWx0IEJvdW5kQ29tcG9uZW50IGNsYXNzLCB3aXRoIG5vIG9wdGlvbnMgZXhjZXB0IHNlbGVjdG9yLlxuICAgICAqIElmIHlvdSBwYXNzIG5vIGlucHV0cywgaXQgc2Vla3Mgb3V0IGFsbCBjaGlsZCBlbGVtZW50cyB0aGF0IGhhdmUgYXQgbGVhc3Qgb25lIGljaGlnbyBjdXN0b20gcHJvcGVydHkuIEtlZXAgaW4gbWluZFxuICAgICAqIHRoYXQgd2hlbiB5b3UgaGF2ZSBuZXN0ZWQgb2JqZWN0cywgdGhpcyB3aWxsIHVzdWFsbHkgbWVhbiBzb21ldGhpbmcgd2lsbCBibG93IHVwIGJlY2F1c2UgeW91IHRyaWVkIHRvIGJpbmQgYW4gZWxlbWVudFxuICAgICAqIHR3aWNlLiBJdCBhbHNvIHdpbGwgcGVyZm9ybSBtdWNoIHdvcnNlLlxuICAgICAqXG4gICAgICogSWYgeW91IHBhc3MgYSBzZWxlY3RvciwgaXQgYWN0cyB0aGUgc2FtZSBhcyBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKCkgd2l0aCB0aGF0IHNlbGVjdG9yLlxuICAgICAqXG4gICAgICogSW4gbXkgZXhwZXJpZW5jZSwgdGhpcyBpcyBhbG1vc3QgY29tcGxldGVseSB1c2VsZXNzLiBFaXRoZXIgdGhlIGxhY2sgb2Ygb3B0aW9ucyBicmVha3MgaXQgKHByZXR0eSB1c2VsZXNzIGlmIHlvdSBjYW4ndFxuICAgICAqIG9ic2VydmUgYW4gb2JzZXJ2YWJsZSkgb3IgdGhlIHNpbXBsZSBhY3Qgb2YgYmluZGluZyBicmVha3Mgc3R1ZmYuXG4gICAgICovXG4gICAgYXV0b0luamVjdChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQodGhpcy52aWV3TW9kZWwsIHsgcGFyZW50OiB0aGlzLmNvbnRlbnQsIHNlbGVjdG9yIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbShlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUuc3RhcnRzV2l0aCgnaTVfJykgfHwgYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJzonKSB8fCBhdHRyLm5hbWUuc3RhcnRzV2l0aCgnZGF0YS1pNV8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCh0aGlzLnZpZXdNb2RlbCwgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gdW5iaW5kIGEgdmlldyBmcm9tIGFuIG9ic2VydmFibGUuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5kZWxldGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGlmIHlvdSBuZWVkIHRvIGRvIHNvbWV0aGluZyBlbHNlIGFmdGVyIHRoZSBsb29wIGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICovXG4gICAgbG9vcFBvc3RQcm9jZXNzKHJvdywgYWRkZWRDb250ZW50LCBhbGxSb3dzLCBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICAgICAgLy8gSWYgdGhlIHR5cGVzY3JpcHQgcGFydCBvZiB0aGUgZm9sbG93aW5nIHdlcmUgaW1wb3J0YW50LCB0aGlzIHdvdWxkIGJlIGEgcHJvYmxlbVxuICAgICAgICAvLyBpZiB0aGlzIHdlcmUgYSBkZXJpdmVkIGNsYXNzLlxuICAgICAgICBjb25zdCB0aGlzY2xhc3MgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sb29wSXRlbUNsYXNzLmluamVjdEJpbmQocm93LCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKGFkZGVkQ29udGVudCwgJ1tpNV9pdGVtXSwgW1xcXFwwMDAwM0FpdGVtXSwgW2RhdGEtaTVfaXRlbV0nKSwge1xuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgICAgICAgICBhc3luYzogdGhpcy5fYXN5bmNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRTdHJpbmdWYWx1ZShuYW1lLCBza2lwRXNjYXBlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUobmFtZSk7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZS50b1N0cmluZygpIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFVudHlwZWRWYWx1ZShuYW1lKSB7XG4gICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgIC8vIEknbSBwcmV0dHkgc3VyZSB0aGlzIGlzIGJlaW5nIHZhbGlkYXRlZCBkdXJpbmcgY29uc3RydWN0aW9uIGJ1dCBiZSBzYWZlXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aGlzQXJnID0gdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIC8vIElmIFZNIGlzIGEgc3RhdGUsIGdldCB0aGUgY3VycmVudCBzdGF0ZSB2YWx1ZS5cbiAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXNBcmcpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKFwidGhpcy5cIikpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzO1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoNSk7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHRoaXMuJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3LmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzQXJnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlld01vZGVsLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ09OU0lERVI6IENvbnNpZGVyIGFkZGluZyBjdXN0b20gYXR0cmlidXRlcyB0byBhbGxvdyBleGVjdXRpbmcgbWV0aG9kIHdpdGggc3RyaW5nIHBhcmFtZXRlcnMuIGk1X3BhcmFtMDE9XCJ2YWwgMVwiLCBpNV9wYXJhbTAyPVwidmFsIDJcIlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5jYWxsKHRoaXNBcmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJlcGwgb2YgdGhpcy5fcmVwbGFjZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHJlcGwuc291cmNlLCByZXBsLm5vZXNjYXBlKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXBsLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRlbnQuYXR0cmlidXRlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLnZhbHVlIHx8IGYubmFtZSA9PT0gJ2k1X2lucHV0JyB8fCBmLm5hbWUgPT09ICc6aW5wdXQnKVxuICAgICAgICAgICAgLm1hcChtID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBtLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbS52YWx1ZSB8fCAnJ1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFRlY2huaWNhbGx5IGl0J3MgaW52YWxpZCB0byBhZGQgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gcmVndWxhciBlbGVtZW50cywgc28gdGVjaG5pY2FsbHkgPHJlcGxhY2UtbWUgOnN3aXRjaDpyZWR0ZXh0PVwid2FybmluZ1wiPlxuICAgICAgICAvLyBpcyBsZWdhbCBidXQgaWYgaWYgaXQgd2VyZSBhIGRpdiwgdGhhdCB3b3VsZCBiZSBpbGxlZ2FsLiBTbyB3ZSdsbCBhbGxvdyA8ZGl2IGRhdGEtaTVfc3dpdGNoX3JlZHRleHQ9XCJ3YXJuaW5nXCI+LlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIHdlaXJkIG5hbWUgaGFuZGxpbmcgb2YgZGF0YSBhdHRyaWJ1dGVzIGNvdWxkIGJyZWFrIHlvdXIgY29kZSBpZiB5b3UgdHJ5IHRvIHVzZSB0aGlzLiBZb3UgbWF5IG5lZWQgdG8gZG8gZXh0cmFcbiAgICAgICAgLy8gd29yayB0byBtYWtlIHlvdXIgY29kZSB3b3JrLCBhbGwgaW4gdGhlIG5hbWUgb2Ygc3RyaWN0IGFkaGVyZW5jZSB0byBzdGFuZGFyZHMuIEl0J3MgdXAgdG8geW91LlxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5jb250ZW50LmRhdGFzZXQpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGVudC5kYXRhc2V0W2F0dHJdO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IGF0dHIgPT09ICdpNV9pbnB1dCcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QXR0cmlidXRlcy5wdXNoKHsgbmFtZTogYXR0ciwgdmFsdWU6IHZhbHVlIHx8ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0SHRtbFNldCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgY3VycmVudEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9wYXJzZUF0dHJpYnV0ZU5hbWUocHJvcC5uYW1lKTtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gUmVndWxhciBhdHRyaWJ1dGVzIHdpbGwgYWxsIG1hdGNoIHRoaXMuXG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHRoaXMuX25hbWUgfHwgcHJvcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQm9vbGVhbkF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYXR0clwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENzc0NsYXNzU3dpdGNoKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXY+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12IG5vZXNjYXBlPiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0dHJpYnV0ZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eShwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzU3R5bGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzQ2xhc3MocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBmYWxsIHRocm91Z2gsIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYXR0cmlidXRlIGFzIGEgdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlVGFyZ2V0KHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIGJhc2UgY29udGVudCBmb3IgdGhlIGxvb3AsIHB1bGxpbmcgaXQgb3V0IG9mIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9vcChwcm9wLnZhbHVlLCBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQodGhpcy5jb250ZW50KSwgdHlwZS5kZXRhaWwgPT09ICdudWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2VkIGFzIGEgc2VsZWN0b3IuIEhhcyBubyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZCBJY2hpZ28gYXR0cmlidXRlOiBcIiArIHR5cGUudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZlcklmTmVlZGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgcHJvcC52YWx1ZS5zdGFydHNXaXRoKCd0aGlzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJzZUF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICAgIC8vIEdlbmVyYWwgaWNoaWdvIHNob3J0Y3V0XG4gICAgICAgICAgICBuYW1lID0gJ2k1XycgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9pdGVtJykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIGluZGljYXRlIGFuIGl0ZW0gY29tcG9uZW50LCBub3RoaW5nIGVsc2UuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X2V2ZW50Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIG9ubHkgaW4gQ29tcG9uZW50LmFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5hbWUuc3RhcnRzV2l0aCgnaTVfJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9hdHRyJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnYXR0cicsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYm9vbCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nICYmIG5hbWVbN10gIT09ICctJyAmJiBuYW1lWzddICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs3XSA9PT0gJy0nIHx8IG5hbWVbN10gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA3KSArIG5hbWUuc2xpY2UoOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2Jvb2xOZWdhdGl2ZScgOiAnYm9vbCcsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfc3dpdGNoJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbOV0gIT09ICc6JyAmJiBuYW1lWzldICE9PSAnXycgJiYgbmFtZVs5XSAhPT0gJy0nICYmIG5hbWVbOV0gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzd2l0Y2ggYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzldID09PSAnLScgfHwgbmFtZVs5XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDkpICsgbmFtZS5zbGljZSgxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCAxMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsYXNzIHN3aXRjaCBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnc3dpdGNoQ2xhc3NOZWdhdGl2ZScgOiAnc3dpdGNoQ2xhc3MnLCBkZXRhaWw6IG5hbWUuc2xpY2UoMTApIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pZicpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJy0nIHx8IG5hbWUuc2xpY2UoLTEpID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdpZk5lZ2F0aXZlJyA6ICdpZicgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2xvb3AnKSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdpNV9sb29wOm51bGwnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnLCBkZXRhaWw6ICdudWxsJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV90YXJnZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICd0YXJnZXQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaW5wdXQnKSkge1xuICAgICAgICAgICAgY29uc3QgdHdvV2F5ID0gbmFtZS5lbmRzV2l0aCgnX3ZhbHVlJykgfHwgbmFtZS5lbmRzV2l0aCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICdpbnB1dCcsIGRldGFpbDogdHdvV2F5ID8gJzJ3YXknIDogJycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdHlwZTogbmFtZS5zbGljZSgzKSB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQm91bmRDb21wb25lbnQgPSBCb3VuZENvbXBvbmVudDtcbi8vIFVzZSBhIGN1c3RvbSBlbGVtZW50IHRvIGNyZWF0ZSBhIHJlcGxhY2VtZW50IHRhZyB0aGF0IGlzIG5vdCBsaW1pdGVkLCBhcyBzcGFuIGlzLCB0byBjb250YWluaW5nIG5vIGJsb2NrIGVsZW1lbnRzLlxuLy8gTm8gbG9naWMsIG5vIHNwZWNpYWwgZGlzcGxheSBkZXRhaWxzLlxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuZXhwb3J0cy5UZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgPSBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudE1hcFwiKTtcbi8qKlxuICogQSBjbGFzcyB3aXRoIGEgY29udGVudCBwcm9wZXJ0eSB0aGF0IHBvaW50cyB0byBzb21ldGhpbmcgb24gdGhlIHBhZ2UsIGFsb25nIHdpdGggc29tZSBvZiBoZWxwZXIgbWV0aG9kcy5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgYXMgYSBiYXNlIGNsYXNzIGZvciBvdGhlciBjbGFzc2VzLCBzbyBpdCdzIG1hcmtlZCBhYnN0cmFjdC4gSXQganVzdCBkb2Vzbid0XG4gKiBtYWtlIHNlbnNlIHRvIG1lIHRvIGNyZWF0ZSBDb21wb25lbnQgd2l0aCBub3RoaW5nIGN1c3RvbWl6ZWQuIEp1c3QgY3JlYXRlIGFuIEhUTUxFbGVtZW50LiBUaGUgaGVscGVycyBhcmVuJ3QgcmVhbGx5XG4gKiB0aGF0IGltcHJlc3NpdmUsIHdoZW4geW91IGNvbnNpZGVyIHRoYXQgdGhlIHRyYWRlb2ZmIGlzIGhhdmluZyB0byByZWZlcmVuY2Ugb2JqLmNvbnRlbnQgdG8gbW9kaWZ5IHRoZSBET00uXG4gKi9cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGRvZXNuJ3QgdW5kZXJzdGFuZCB0aGF0IHRoaXMuY29udGVudCBpcyBzZXQgaW4gQUxMIG9mIHRoZSBwcml2YXRlIGN0b3IgZnVuY3Rpb25zLlxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICBpZiAoYXJncyAmJiB0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIF9jdG9yX3N0cmluZy5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5uZXJIdG1sKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihhcmdzLnByb3BlcnRpZXMgfHwge30sIHsgaW5uZXJIVE1MOiBhcmdzLmlubmVySHRtbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2xvb2t1cC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICBfY3Rvcl9lbXB0eS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5uZXJIdG1sKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihhcmdzLnByb3BlcnRpZXMgfHwge30sIHsgaW5uZXJIVE1MOiBhcmdzLmlubmVySHRtbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2V4aXN0aW5nRWxlbWVudC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3Mub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBfY3Rvcl9vdXRlckh0bWwuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9jdG9yX2lubmVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoZWNrSW5saW5lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgLy8gQW5ndWxhciBtYXRlcmlhbCBkb2VzIHNvbWV0aGluZyBsaWtlIHRoaXMuIEluIHRoaXMgY2FzZSwgdGhlcmUncyBubyBmdW5jdGlvbmFsaXR5IGJlaGluZCBpdCwgYnV0IGl0IGRvZXMgbWFrZSBpdFxuICAgICAgICAvLyB1c2VmdWwgZm9yIGEgZGV2ZWxvcGVyIHRvIHNlZSB0aGF0IGFuIGVsZW1lbnQgaXMgYSBjb21wb25lbnQgYW5kIHdoYXQgdHlwZSBpdCBpcy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNuYWtlX2Nhc2UgPSAnaXZfJyArIHRoaXMuY29uc3RydWN0b3IubmFtZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHRoaXMuY29uc3RydWN0b3IubmFtZS5zbGljZSgxKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFcrL2csICcgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkoW2Etel0pL2csIFwiJDEgJDIkM1wiKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgvXFxCKD89W0EtWl17Mix9KS8pXG4gICAgICAgICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgLmpvaW4oJ18nKVxuICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShzbmFrZV9jYXNlLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBoYXMgc29tZSB3ZWlyZCBuYW1lLCBubyBwcm9ibGVtLiBUaGlzIGlzIGp1c3QgYW4gaW5mbyBmaWVsZCBhbnl3YXkuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBDb21wb25lbnQoKTtcbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfZW1wdHkoKSB7XG4gICAgICAgICAgICAvLyBObyBhcmd1bWVudHNcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgZmluZSBhcyBsb25nIGFzIFRFbGVtZW50IGlzIERJVi4gTm8gd2F5IHRvIHZlcmlmeSB0aGF0IGFzIGl0J3MgYSB0eXBlc2NyaXB0IGlsbHVzaW9uLiBKUyBkb2Vzbid0IHNlZSB0eXBlIHBhcmFtZXRlcnMuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlkOiBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfbG9va3VwKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIGV4aXN0aW5nRWxlbWVudC5cbiAgICAgICAgICAgIC8vIFRoZSBtYWluIHJlYXNvbiBpdCBleGlzdHMgaXMgdGhhdCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBkb2Vzbid0IHJldHVybiB0aGUgY29ycmVjdCB0eXBlIChpdCdzIG5vdCBnZW5lcmljKSxcbiAgICAgICAgICAgIC8vIHNvIHR5cGVzY3JpcHQgZnJlYWtzIG91dCBhbmQgdGhpbmtzIGl0IHNob3VsZCBiZSBhIFNUUklORywgaW4gc3BpdGUgb2YgdGhlIHR5cGUgZGVmaW5pdGlvbiBub3QgYmVpbmcgYW55dGhpbmdcbiAgICAgICAgICAgIC8vIGxpa2UgdGhhdC4gSXQncyBqdXN0IGVhc2llciB0byB1c2UgdGhpcyB0aGFuIHRvIHJlbWVtYmVyIFwib2gsIHJpZ2h0LCBpIGhhdmUgdG8gdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKSwgd2hpY2ggaXMgZ2VuZXJpY1wiLlxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IChleGlzdGluZ0VsZW1lbnQucGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKGV4aXN0aW5nRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgc2VsZWN0b3IgY291bGQgbm90IGZpbmQgZWxlbWVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbmFzdHkgYnV0IGl0IG1ha2VzIFR5cGVTY3JpcHQgaGFwcHkgd2l0aG91dCBjcmVhdGluZyBhIG5ldyBvYmplY3QgY29weVxuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9leGlzdGluZ0VsZW1lbnQoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBleGlzdGluZ0VsZW1lbnQuZWxlbWVudDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHIsIGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9pbm5lckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gTmV3IGVsZW1lbnQuIFVzZXIgc3BlY2lmaWVzIHRoZSBpbm5lciBIVE1MIGZvciB0aGUgY29udGVudC5cbiAgICAgICAgICAgIC8vIFRoaXMgY291bGQgYmUgYW4gZW1wdHkgb2JqZWN0IGxpa2Uge30sIHByYWN0aWNhbGx5IHRoZSBzYW1lIGFzIGNhbGxpbmcgaXQgd2l0aCBubyBhcmdzXG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHsgaW5uZXJIVE1MOiBuZXdFbGVtZW50LmlubmVySHRtbCB8fCAnJyB9O1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcywgbmV3RWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnQudHlwZSB8fCBFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBwcm9wcywgbmV3RWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbnRlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3Jfb3V0ZXJIdG1sKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZXIgc3BlY2lmaWVzIHRoZSBmdWxsIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGl0IGNhbid0IGJlIHR5cGUgY2hlY2tlZC4gSlMgY2FuJ3Qgc2VlIHdoYXQgVEVsZW1lbnQgaXMuXG4gICAgICAgICAgICBjb25zdCB0bXBkaXYgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG5ld0VsZW1lbnQub3V0ZXJIdG1sLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAodG1wZGl2LmNoaWxkTm9kZXMubGVuZ3RoICE9PSAxIHx8ICF0bXBkaXYuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGVySHRtbCBtdXN0IGNvbnRhaW4gZXhhY3RseSBvbmUgSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhuZXdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3RWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50LCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3BlY2lmaWVkIElEIHRha2VzIHByZWNlZGVuY2VcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9zdHJpbmcobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU3RyaW5nIGJ5IGl0c2VsZiBpcyBhIHNob3J0Y3V0IGZvciBvdXRlckh0bWxcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIHsgb3V0ZXJIdG1sOiBuZXdFbGVtZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqXG4gICAgICogSXQgZG9lc24ndCBoYXZlIHRvIGJlIGEgY3VzdG9tIHRhZy4gSXQgY291bGQgYmUgYSBjbGFzcywgbGlrZSA8cCBjbGFzcz0nYmluZC10by1tb2RlbFwiPiAoc2VsZWN0b3I9Jy5iaW5kLXRvLW1vZGVsJylcbiAgICAgKiBvciA8cCBpY2hpZ28+IChzZWxlY3Rvcj0nW2ljaGlnb10nKS5cbiAgICAgKlxuICAgICAqIFRvIGNvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgZWxlbWVudCAoY29weWluZyBleGlzdGluZyBhdHRyaWJ1dGVzKSBzZW5kIHRoZSByZWxldmFudCBvcHRpb25zLCBwbHVzIHtyZXBsYWNlOiB0cnVlfS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZWxlbWVudCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGVsZW1lbnQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdChzZWxlY3Rvciwgb3B0LCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyBfaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBjb25zdCBjb250YWluZXJzID0gdGhpcy5fbG9va1VwQ29udGFpbmVyc1RvSW5qZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgZm9yIChjb25zdCBjb250YWluZXIgb2YgY29udGFpbmVycykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIC8vIENhbid0IGhhdmUgZHVwZSBJRHMgYmVpbmcgY3JlYXRlZCBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY29udGFpbmVycy4gVGhlcmUgYXJlIDMgcGxhY2VzIHdoZXJlIElEIGNhbiBiZSBzZXQuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5pZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdwcm9wZXJ0aWVzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5wcm9wZXJ0aWVzLmlkOyAvLyBET00gcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2F0dHJpYnV0ZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHJpYnV0ZXMuaWQ7IC8vIEhUTUwgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlcGxhY2VyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY29udmVydGVyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIHN0YXRpYyBfbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRlbXB0cyB0byBwcmVzZXJ2ZSB0aGUgYXR0cmlidXRlcyBzZXQgb24gdGhlIHJlcGxhY2VkIGVsZW1lbnQuIFRoYXQgb3BlbnMgYW4gdWdseSBjYW4gb2Ygd29ybXMsXG4gICAgICAgIC8vIGJ1dCBpdCBzaG91bGQgbWFrZSByZXBsYWNlbWVudCBjb21wb25lbnRzIG1vcmUgdXNlZnVsIGJlY2F1c2UgaXQgYWxsb3dzIHRoZW0gdG8gdmFyeS5cbiAgICAgICAgLy8gSXQgZG9lcyBtYWtlIGEgYnJ1dGFsIGp1Z2dsaW5nIGFjdDpcbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGlubmVySFRNTCwgd2Ugd2FudCB0byB0YWtlIGl0LlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBpbm5lckhUTUwgc2hvdWxkIG92ZXJyaWRlIHRoZSBleGlzdGluZyBlbGVtZW50J3MuXG4gICAgICAgIC8vIElmIHRoZSBleGlzdGluZyBlbGVtZW50IGhhcyBhdHRyaWJ1dGVzLCB3ZSB3YW50IHRvIHRha2UgdGhlbS5cbiAgICAgICAgLy8gSWYgb3V0ZXJIVE1MIGlzIHByb3ZpZGVkLCB0aGUgb3V0ZXJIVE1MJ3MgYXR0cmlidXRlcyBzaG91bGQgb3ZlcnJpZGUgdGhlbS5cbiAgICAgICAgLy8gRm9yIGFueSBhdHRyaWJ1dGVzIHBhc3NlZCBpbiBPUFRJT05TLCB0aGV5IHNob3VsZCBvdmVycmlkZSBhbnl0aGluZyB0aGF0IGNhbWUgYmVmb3JlLlxuICAgICAgICAvLyBGb3IgYW55IHByb3BlcnRpZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIE9ubHkgdGhlIGxhc3QgMiBhcmUgaGFuZGxlZCBpbiB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yLiBBbmQgaWYgd2UncmUgbm90IGNhcmVmdWwsIHdlIGNvdWxkIGJyZWFrIHRoZW0uXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7IGlubmVySFRNTDogZXhpc3RpbmdFbGVtZW50LmlubmVySFRNTCB9O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgLy8gVGhpcyBpcyB1Z2x5IGJlY2F1c2UgaXQgaGFwcGVucyBhZ2FpbiBpbiB0aGUgY29uc3RydWN0b3IuIE5vIG90aGVyIGNsZWFuIHdheSB0byBwYXJzZSB0aGUgZWxlbWVudCBhdHRyaWJ1dGVzLCB0aG91Z2guXG4gICAgICAgIGlmIChvcHQub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG9wdC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXAuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wMiA9IHRtcC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIFRoZSBvdXRlciBIVE1MIGF0dHJpYnV0ZXMgZ2V0IHBpY2tlZCB1cCBhdXRvbWF0aWNhbGx5IHdoZW4gYWRkZWQgdG8gdGhlIERPTSwgc28gd2UgcmVhbGx5XG4gICAgICAgICAgICAvLyBqdXN0IG5lZWQgdG8gZGlzY2FyZCB0aGUgbWF0Y2hpbmcgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcyBvZiB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmlubmVySFRNTDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKHRtcDIuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNbYXR0ci5uYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIG9wdC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgb3B0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIG9wdC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9XG4gICAgc3RhdGljIF9nZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG9wdDtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgcmVwbGFjaW5nIHRoZSBvdXRlciBIVE1MXG4gICAgICAgICAgICBvcHQgPSB7IHJlcGxhY2U6IHRydWUsIG91dGVySHRtbDogb3B0aW9ucyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCBrbm93IHRoYXQgb3B0aW9ucyAhPT0gJ3N0cmluZycgKGNhbid0IHJlYWQgXCJlbHNlIGlmXCIgY2xhdXNlKVxuICAgICAgICAgICAgb3B0ID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnRXaXRoQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih7IGVsZW1lbnQ6IGV4aXN0aW5nRWxlbWVudCB9KTtcbiAgICB9XG4gICAgc3RhdGljIF9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nKSB7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSSd2ZSBkb25lIHRoaXMgbXlzZWxmLCB3aGljaCByZXN1bHRzIGluIGEgc2lsZW50IGZhaWx1cmUgaWYgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luamVjdGlvbiBzZWxlY3RvciBpcyBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJ1tpY2hpZ29dJztcbiAgICAgICAgLy8gTG9vayB1cCB0aGUgZWxlbWVudHMgdG8gZWl0aGVyIHJlcGxhY2Ugb3IgY29udmVydFxuICAgICAgICBsZXQgY29udGFpbmVycztcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnICYmICdzZWxlY3RvcicgaW4gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGVjdG9yLnBhcmVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLnNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVycztcbiAgICB9XG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmlkO1xuICAgIH1cbiAgICBzZXQgaWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlkID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBpbm5lckhUTUwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cbiAgICBzZXQgaW5uZXJIVE1MKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBXaWxsIHJldHVybiB1bmRlZmluZWQgaWYgY29udGVudCBpcyBub3QgYSBmb3JtIGZpZWxkIHR5cGVcbiAgICAgICAgcmV0dXJuIEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50KTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIC8vIFdpbGwgbG9nIGEgd2FybmluZyBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICBGb3JtRmllbGRWYWx1ZV8xLnNldEZvcm1GaWVsZFZhbHVlKHRoaXMuY29udGVudCwgdmFsdWUpO1xuICAgIH1cbiAgICBnZXQgY2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNsYXNzTmFtZTtcbiAgICB9XG4gICAgc2V0IGNsYXNzTmFtZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0O1xuICAgIH1cbiAgICBnZXQgc3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuc3R5bGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBIVE1MIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBDb21wb25lbnQgY29udGVudC4gRmx1ZW50LlxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaCB0aGUgSFRNTCBmb3IgaTVfZXZlbnQgb3IgOmV2ZW50IGF0dHJpYnV0ZXMgYW5kIGFkZCBldmVudCBsaXN0ZW5lcnMgYWNjb3JkaW5nIHRvIGlubGluZSBjdXN0b20gYXR0cmlidXRlcy5cbiAgICAgKiBGaWx0ZXIgYnkgbWF0Y2hpbmcgdGhlIGNvbXBvbmVudEZpbHRlciBpbnB1dCB3aXRoIGFuIGF0dHJpYnV0ZSBsaWtlIGNvbXBvbmVudD1cImNvbXBvbmVudEZpbHRlclwiLlxuICAgICAqIEVuY2xvc2UgdGhlIGV2ZW50IHR5cGUgaW4gcGFyZW50aGVzZXMsIGFuZCBmb3IgdGhlIHZhbHVlLCBlbnRlciB0aGUgbmFtZSBvZiBhIG1ldGhvZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgKiBFeGFtcGxlOiA8Zm9ybSA6ZXZlbnQgKGNsaWNrKT1cInN1Ym1pdFRoZUZvcm1cIj48L2Zvcm0+XG4gICAgICogVGhpcyBpcyBhbHNvIGFsbG93ZWQ6IDxmb3JtIDpldmVudCBfY2xpY2tfPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKi9cbiAgICBhZGRJbmxpbmVFdmVudExpc3RlbmVycyhjb21wb25lbnRGaWx0ZXIpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB3ZSBjb3VsZCBza2lwIHRoaXMgaW5pdGlhbCBmaWx0ZXIsIGxpa2UgYW5ndWxhciBkb2VzLiBCdXQgdGhlcmUgaXMgbm8gQ1NTIHNlbGVjdG9yIGZvclxuICAgICAgICAvLyBhdHRyaWJ1dGUgbmFtZSBiZWdpbnMgd2l0aCBvciBlbmRzIHdpdGguIFthdHRyXj1dIGlzIGZvciB0aGUgVkFMVUUgYmVnaW5uaW5nIHdpdGggc29tZXRoaW5nLlxuICAgICAgICAvLyBUaGlzIGluY2x1ZGVzIHRoZSBjb250ZW50IGl0c2VsZiBpbiBpdHMgY2hlY2suXG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRGaWx0ZXIgJiYgZWxlLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgIT09IGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGxldCBldmVudERlZmluaXRpb24gPSBjdXJyZW50QXR0cmlidXRlcy5maW5kKGYgPT4gZi5uYW1lLnN0YXJ0c1dpdGgoJygnKSAmJiBmLm5hbWUuZW5kc1dpdGgoJyknKSAmJiBmLm5hbWUubGVuZ3RoID4gMik7XG4gICAgICAgICAgICBpZiAoIWV2ZW50RGVmaW5pdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIGJ5IGFsdGVybmF0ZSBzeW50YXguIFRoaXMgb25lIHdvcmtzIGJldHRlciB3aXRoIHNldEF0dHJpYnV0ZSgpLlxuICAgICAgICAgICAgICAgIGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnXycpICYmIGYubmFtZS5lbmRzV2l0aCgnXycpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uIHx8ICFldmVudERlZmluaXRpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50IGRlZmluaXRpb24gbm90IGRlY2xhcmVkIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpc1tldmVudERlZmluaXRpb24udmFsdWVdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhbmRsZXIgbWV0aG9kIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfSAke2V2ZW50RGVmaW5pdGlvbi52YWx1ZX0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50RGVmaW5pdGlvbi5uYW1lLnNsaWNlKDEsIC0xKSwgbWV0aG9kLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZENoaWxkKG5ld0NoaWxkKSB7XG4gICAgICAgIGlmIChndWFyZChuZXdDaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgICAgIGlmIChndWFyZChwYXJlbnQpKSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGNvbXBvbmVudCB0byBDb21wb25lbnRNYXAuXG4gICAgICovXG4gICAgbWFwQ29tcG9uZW50KCkge1xuICAgICAgICAvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgY29udGVudCBoYXMgYWxyZWFkeSBiZWVuIHJlbGF0ZWQgdG8gYSBkaWZmZXJlbnQgY29tcG9uZW50XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQodGhpcy5jb250ZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IGFscmVhZHkgcmVmZXJlbmNlZCBieSBhIGNvbXBvbmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldCh0aGlzLmNvbnRlbnQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBjb21wb25lbnQgZnJvbSBDb21wb25lbnRNYXAuIFNvbWV0aW1lcyB5b3UgbWlnaHQgbmVlZCB0byB1c2UgdGhpcy4gQnV0IGhvcGVmdWxseSByYXJlbHksIGJlY2F1c2UgaXQncyB1c2luZyBhIFdlYWtNYXAsXG4gICAgICovXG4gICAgdW5tYXBDb21wb25lbnQoKSB7XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBjb21wb25lbnRzIHRoYXQgYXJlIG5lc3RlZCBpbnNpZGUgdGhpcyBjb21wb25lbnQuXG4gICAgICovXG4gICAgKmdldEFsbENoaWxkQ29tcG9uZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudChlKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0U3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdzdHJpbmcnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUUyBqdXN0IGZvcmdvdCB0aGF0IHByb3BlcnR5IGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4uXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcHJvcGVydHlbcHJvcF07XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENsYXNzKGNsYXNzTmFtZXMpIHtcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09IFwic3RyaW5nXCIgJiYgY2xhc3NOYW1lcy5pbmNsdWRlcyhcIiBcIikpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLnNwbGl0KFwiIFwiKS5maWx0ZXIocSA9PiBxICE9PSBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IFtjbGFzc05hbWVzXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJlY2F1c2UgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKSBzZWFyY2hlcyBhbGwgdGhlIHdheSBkb3duLCBpbnRvIG5lc3RlZCBjb21wb25lbnRzLCBpdCBjYW4ndCBiZSBjYWxsZWRcbiAgICAgKiBieSBkZWZhdWx0LiBJdCBqdXN0IHRocm93cyBlcnJvcnMgb24gYWxsIGJ1dCBzaW1wbGUgdGVzdCBjYXNlcy4gQnV0IGJlY2F1c2UgdGhlc2UgZXZlbnRzIGFsbW9zdCBhbHdheXMgZXhpc3RcbiAgICAgKiBpbnRlcm5hbCB0byB0aGUgY29tcG9uZW50IChlLmcuIG9uIGJ1dHRvbnMpLCBpdCBjYW4ndCBiZSBsaW1pdGVkLiBUaGlzIGNhbiBiZSBjb25mdXNpbmcgd2l0aG91dCBzb21lIGtpbmQgb2ZcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIF9jaGVja0lubGluZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGVsZSBvZiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKFt0aGlzLmNvbnRlbnRdLCAnW2k1X2V2ZW50XSwgW1xcXFwwMDAwM0FldmVudF0sIFtkYXRhLWk1X2V2ZW50XScpKSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXykge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdJbmxpbmUgZXZlbnQgbGlzdGVuZXJzIGFyZSBjb25maWd1cmVkLiBSZW1lbWJlciB0byBjYWxsIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuJyk7XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fZXZlbnRfd2FybmluZ19fID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVsZXRlIHdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXywgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgcXVlc3Rpb24gbmVlZHMgdG8gYmUgYXNrZWQ6IGlmIHlvdSBjYW4gYWRkIGEgY29tcG9uZW50IHRvIGEgcGFnZSBieSBkb2luZyBlbGVtZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudC5jb250ZW50KSxcbiAqIGhvdyBkbyB5b3UgZG8gZnJvbSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykgYW5kIGdldCB0byBjb21wb25lbnQsIG5vdCBjb21wb25lbnQuY29udGVudD8gVGhpcyBpcyBob3cuXG4gKlxuICogdmFyIGNvbXBvbmVudCA9IENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykpO1xuICpcbiAqIFRoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KGNvbnRlbnQsIGNvbXBvbmVudCkgaGFzIGJlZW4gY2FsbGVkIGF0IHNvbWUgcG9pbnQuXG4gKlxuICogVGhpcyBpcyB0aGUgYXBwcm92ZWQgd2F5IG9mIGRvaW5nIGl0LiBBbm90aGVyIHBvc3NpYmxlIHNvbHV0aW9uIHdvdWxkIGJlIHRoZSB1c2Ugb2YgZXhwYW5kbyBwcm9wZXJ0aWVzLFxuICogZm9yIGV4YW1wbGUgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpLnJlbGF0ZWRDb21wb25lbnQgPSBjb21wb25lbnQuIFRoaXMgd29ya3MgYW5kIGl0J3Mgc3VwZXIgc2ltcGxlLFxuICogYnV0IHNlZW1zIHRvIGJlIGZyb3duZWQgdXBvbiAuLi4gaXQgaGFzIGJlZW4ga25vd24gdG8gY3JlYXRlIG1lbW9yeSBsZWFrcyBpbiB0aGUgcGFzdC4gV2Vha01hcCBpcyB0aGUgb2JqZWN0XG4gKiBzcGVjaWZpY2FsbHkgY3JlYXRlZCBmb3IgdGhpcyB1c2UgY2FzZSwgc28gdGhhdCBpcyB1c2VkIGhlcmUuXG4gKlxuICogSWYgZXh0ZW5zaW9uIG1ldGhvZHMgYXJlIGxvYWRlZCwgeW91IGNhbiB1c2UgdGhlIGVsZW1lbnQuZ2V0Q29tcG9uZW50KCkgc2hvcnRjdXQuXG4gKi9cbmNsYXNzIENvbXBvbmVudE1hcCB7XG59XG5Db21wb25lbnRNYXAuY29tcG9uZW50cyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLkNvbXBvbmVudE1hcCA9IENvbXBvbmVudE1hcDtcbmZ1bmN0aW9uIGdldENvbXBvbmVudChlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGVsZW1lbnQpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcG9uZW50ID0gZ2V0Q29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudEJpbmRpbmdPcHRpb25zID0gQ29tcG9uZW50QmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG9wdC5lbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnMgPSBFeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gb3B0LnNlbGVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucyA9IEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIElubmVySHRtbEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Jbm5lckh0bWxCaW5kaW5nT3B0aW9ucyA9IElubmVySHRtbEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBPdXRlckh0bWxCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLm91dGVySHRtbCA9IG9wdC5vdXRlckh0bWw7XG4gICAgfVxufVxuZXhwb3J0cy5PdXRlckh0bWxCaW5kaW5nT3B0aW9ucyA9IE91dGVySHRtbEJpbmRpbmdPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmFibGVDaGVjayhvYmopIHtcbiAgICAvLyBOb3QgYW4gZXhoYXVzdGl2ZSB0ZXN0IGJ1dCBpdCdzIHRoZSBpbXBvcnRhbnQgYml0LlxuICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NoYW5nZUhhbmRsZXInIGluIG9iaiAmJiBvYmouY2hhbmdlSGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcjtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUNoZWNrID0gb2JzZXJ2YWJsZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbi8qKlxuICogQ29tbW9uIGxvZ2ljIGJldHdlZW4gdGhlIGRpZmZlcmVudCBvYnNlcnZhYmxlIGNsYXNzZXMuIFRoZXNlIGltcGxlbWVudCBJT2JzZXJ2YWJsZS4gVGhlIGludm9jYXRpb24gaXRzZWxmIHZhcmllcyBmcm9tIGNsYXNzIHRvIGNsYXNzLlxuICovXG5jbGFzcyBPYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoeyBuYW1lLCBmb3J3YXJkVG8sIGJ1YmJsZUZyb20sIGRpc2FibGVBc3luYyB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBpZiAoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3J3YXJkVG8pIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFnRGVsZWdhdGUobmFtZSk7XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGhhcyBmb3Jnb3R0ZW4gdGhhdCBFdmVudEhhbmRsZXIgY2FuIGFjY2VwdCBhbiBhcnJheS5cbiAgICAgICAgLy8gSW4gc3BpdGUgaWYgdGhlIGZhY3QgdGhhdCB0aGlzIHNpZ25hdHVyZSBpcyBpZGVudGljYWwuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIuc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoZSBpbnB1dCdzIGRlbGVnYXRlIHRvIHRoaXMgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBzZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKSB7XG4gICAgICAgIC8vIEpvaW4gdGhlIG90aGVyIGV2ZW50IGhhbmRsZXIgdG8gdGhpcywgc28gdGhhdCB3aGVuIHRoaXMgaXMgaW52b2tlZCwgc28gaXMgdGhlIG90aGVyLlxuICAgICAgICB0aGlzLnN1YnNjcmliZShmb3J3YXJkVG8uY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGlzIG9iamVjdCdzIGRlbGVnYXRlIHRvIHRoZSBpbnB1dCBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGV2ZW50cyByYWlzZWQgb24gdGhlIG90aGVyIGhhbmRsZXIsIHNvIHRoYXQgd2hlbiB0aGF0IGlzIGludm9rZWQsIHNvIGlzIHRoaXNcbiAgICAgICAgLy8gVGhlIHNhbWUgYXMgZm9yd2FyZENoYW5nZUV2ZW50c1RvIGV4Y2VwdCB0aGF0IHRoaXMgaXMgdGhlIHRhcmdldCwgbm90IHRoZSBzb3VyY2UuXG4gICAgICAgIGJ1YmJsZUZyb20uc3Vic2NyaWJlKHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVTZW5kZXIoc2VuZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVMaXN0ZW5lcihzZW5kZXIpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgcHJvYmFibHkgZnJvd25lZCB1cG9uIChzZWUgaG93IFRTIGRvZXNuJ3QgbGlrZSBpdCksIGJ1dCBpdCdzIHZhbGlkIEpTLlxuICAgICAqIEl0J3Mgb25seSBpbnRlbmRlZCBmb3IgdHJvdWJsZXNob290aW5nLCBub3QgcmVhbCBsb2dpYy4gVGhlcmUgYXJlIHRpbWVzIHdoZW4geW91J3JlXG4gICAgICogdHJ5aW5nIHRvIGlkZW50aWZ5IGV4YWN0bHkgd2hpY2ggZGVsZWdhdGVzIGFyZSBzdWJzY3JpYmVkLCBhbmQgdGhpcyBpcyByZWFsbHkgaGFyZCB3aGVuXG4gICAgICogbm90aGluZyBoYXMgaHVtYW4tcmVhZGFibGUgbmFtZXMuXG4gICAgICovXG4gICAgdGFnRGVsZWdhdGUobmFtZSkge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlLl90YWcgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgeCBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoeCAhPT0gXCJjaGFuZ2VIYW5kbGVyXCIgJiYgeCAhPT0gXCJwcml2YXRlUHJvcGVydHkyXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbeF0gPSB0aGlzW3hdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlQmFzZSA9IE9ic2VydmFibGVCYXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIE9ic2VydmFibGVQcm9wZXJ0eSBpcyBhIHByb3BlcnR5IHRoYXQgYXV0b21hdGljYWxseSByYWlzZXMgYSBQcm9wZXJ0eUNoYW5nZWQgZXZlbnQgd2hlbiBpdCBpcyBtb2RpZmllZC4gVGhpcyBpcyBtb3JlXG4gKiBjb252ZW5pZW50IHRoYW4gaGF2aW5nIHRvIGRvIGl0IG1hbnVhbGx5IGV2ZXJ5IHRpbWUgeW91IG5lZWQgaXQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVQcm9wZXJ0eSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBvcHRpb25zLm9ubHlXaGVuQ2hhbmdlZCB8fCBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgJiYgb2xkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnc2V0JywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZCwgdmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIChpZiBhIHN0cmluZykgdGhhdCBoYXMgaGFkIHNwZWNpYWwgSFRNTCBjaGFyYWN0ZXJzIGVzY2FwZWQuXG4gICAgICovXG4gICAgZ2V0IHNhZmVWYWx1ZSgpIHtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlUHJvcGVydHkgPSBPYnNlcnZhYmxlUHJvcGVydHk7XG5mdW5jdGlvbiBvYnNlcnZhYmxlUHJvcGVydHlDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGxpa2UgdGhpcyBiZWNhdXNlIGl0IHNob3VsZCBiZSBjaGVja2luZyBpZiB2YWx1ZSBpcyBhIHNldHRlcixcbiAgICAvLyBhbmQgaXQgaXNuJ3QsIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGNoZWNrLlxuICAgIC8vIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKSBkb2Vzbid0IGNhdGNoIGluaGVyaXRlZCBwcm9wZXJ0aWVzLCBvZlxuICAgIC8vIHdoaWNoIHRoaXMgaXMgYWxtb3N0IGFsd2F5cyBvbmUuXG4gICAgLy8gSSBoYXZlIHRvIGZhbGwgYmFjayB0byBhIGJhc2ljIGluc3RhbmNlIGNoZWNrLlxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVByb3BlcnR5O1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayA9IG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENsb25lRGVlcF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcFwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIG9ic2VydmFibGUgc3RhdGUgdGhhdCBzaG91bGQgb25seSBiZSBhY2Nlc3NlZCB1c2luZyB0aGUgcmVsZXZhbnQgbWV0aG9kcywgYWxsb3dpbmcgYXRvbWljIGNoYW5nZXMgdG8gbXVsdGlwbGUgcHJvcGVydGllc1xuICogaW4gbXVsdGlwbGUgb2JqZWN0cywgcmFpc2luZyBhIHNpbmdsZSBldmVudC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVN0YXRlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJ3NldFN0YXRlJztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBJIHdvdWxkIHByZWZlciB0aGF0IHRoaXMgcmV0dXJuIFJlYWRvbmx5PFQ+IGJ1dCBnZXR0ZXIgYW5kIHNldHRlciBoYXZlIHRvIGJlIHRoZSBzYW1lIHR5cGUuXG4gICAgICAgIC8vIFRoYXQgbWVhbnMgeW91IHdvdWxkIGhhdmUgdG8gY2FzdCBhbnkgdmFsdWUgeW91IHNldCBhcyBhIHJlYWRvbmx5LCB3aGljaCBpcyBhIFBJVEEuXG4gICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVyd3JpdGVzIHRoZSBlbnRpcmUgdmFsdWUuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodmFsdWUsIHRydWUpO1xuICAgIH1cbiAgICBnZXRTYWZlVmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG1wID0gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0bXApIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRtcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodG1wKSk7XG4gICAgfVxuICAgIGdldFZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgc2V0U3RhdGUodmFsdWUsIG92ZXJXcml0ZUFsbCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlIGlzIHByaW1pdGl2ZSwgdGhlbiBhIGZ1bGwgb3ZlcndyaXRlIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbnMgd2lsbCBleGVjdXRlIGJ1dCB0aGV5IHdvbid0IGNoYW5nZSB0aGUgdmFsdWUuIFRoZSByZWFzb24gaXMgdGhlIHNhbWUgcmVhc29uIHRoYXQgdGhpcyBtYWtlcyBubyBwZXJtYW5lbnQgY2hhbmdlIHRvIGJhcjpcbiAgICAgICAgICAgIC8vIHZhciBmb28gPSBmdW5jdGlvbihzdHIpIHsgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7IH07IHZhciBiYXIgPSAnYWJjJzsgZm9vKGJhcik7IGNvbnNvbGUubG9nKGJhciA9PT0gJ2FiYycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgc2V0U3RhdGUgd2l0aCBhIGZ1bmN0aW9uIGlmIHN0YXRlIGlzIHByaW1pdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJXcml0ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJXcml0ZUFsbCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMV9vdmVyd3JpdGVBbGwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBbbmV3VmFsdWUsIHJldHVyblZhbHVlXSA9IF9vdnIzX2Z1bmN0aW9uQXJnLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBpcyBub3QgYSBwYXJ0aWFsIHN0YXRlIG9yIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjJfcGFydGlhbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHsgb2xkVmFsdWUsIG5ld1ZhbHVlLCByZXR1cm5WYWx1ZSB9O1xuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9vdmVyd3JpdGVBbGwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGVudGlyZSBvYmplY3QuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcChfdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMl9wYXJ0aWFsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gUGFydGlhbCBvYmplY3Q6IE92ZXJ3cml0ZSBvbmx5IHRoZSBrZXlzIHByb3ZpZGVkXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRtcFtrZXldID0gX3ZhbHVlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyM19mdW5jdGlvbkFyZyhfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGFuZCB1cGRhdGUgdGhlIG9iamVjdCBhcyBkaWN0YXRlZFxuICAgICAgICAgICAgLy8gTWF5YmUgdW5uZWNlc3NhcnkgYnV0IHdlIHdhbnQgdG8gYXZvaWQgdGhlIGNhbGxlciBleGZpbHRyYXRpbmcgdGhlIHN0YXRlIHVzaW5nIGEgZnVuY3Rpb24sXG4gICAgICAgICAgICAvLyBieSBhY2NpZGVudC4gT2YgY291cnNlLCB0aGV5IGNhbiBqdXN0IGFjY2VzcyBfdmFsdWUgYnkgY2FzdGluZyBhcyBhbnksXG4gICAgICAgICAgICAvLyBidXQgdGhhdCdzIG5vdCBhY2NpZGVudGFsLlxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IF9yZXR1cm5WYWx1ZSA9IF92YWx1ZS5jYWxsKHRtcCwgdG1wKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gW3RtcCwgX3JldHVyblZhbHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVN0YXRlID0gT2JzZXJ2YWJsZVN0YXRlO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVN0YXRlQ2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBrbm93IGlmIEkgc2hvdWxkIGNoZWNrIGZvciB0aGlzIG9yIGZvciBnZXRTdGF0ZSgpIGFuZCBzZXRTdGF0ZSgpXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGU7XG59XG5leHBvcnRzLm9ic2VydmFibGVTdGF0ZUNoZWNrID0gb2JzZXJ2YWJsZVN0YXRlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9EZWZlcnJlZFByb21pc2VcIik7XG4vKipcbiAqIFRoZSBwcm9taXNlIEFQSSBpcyBuaWNlLCBtb3N0bHksIGJ1dCB0aGUgbWFpbiB0aGluZyBwcmV2ZW50aW5nIHVzZSBvZiBhIHByb21pc2UgYXMgYW4gZXZlbnQgaGFuZGxlciBpcyB0aGF0XG4gKiBpdCBvbmx5IGV4ZWN1dGVzIG9uY2UuIEFmdGVyIHRoYXQgcG9pbnQsIGl0IGlzIHJlc29sdmVkLCBhbmQgdGhlcmUgaXMgbm8gd2F5IHRvIGZsaXAgaXQgYmFjay5cbiAqXG4gKiBUaGUgcmVwZWF0YWJsZSBwcm9taXNlIGtlZXBzIHRoZSBwcm9taXNlIEFQSSBhbmQgY3JlYXRlcyB0aGUgaWxsdXNpb24gdGhhdCB0aGUgcHJvbWlzZSBpcyByZXBlYXRlZCBieVxuICogcmVidWlsZGluZyB0aGUgY2hhaW4gZWFjaCB0aW1lLiBJdCdzIHJlYWxseSBhIGRlZmVycmVkIGZhY3RvcnkgYnV0IGl0IHByZXRlbmRzIHRvIGJlIGEgZGVmZXJyZWQuIEknbSBzdXJlXG4gKiB0aGlzIGhhcyBhIHBlcmZvcm1hbmNlIHBlbmFsdHkuXG4gKlxuICogWW91IHNob3VsZCBub3QgYXR0YWNoIGFjdHVhbCBwcm9taXNlcyBpbnRvIHRoZSB0aGVuKCkgY2hhaW4sIGJlY2F1c2UgdGhleSBjYW4ndCBiZSByZXBlYXRlZC4gVGhlIFByb21pc2UgdHlwZSBpc24ndFxuICogYWxsb3dlZCBidXQgdGhlcmUgYXJlIHdheXMgdG8gZ2V0IGFyb3VuZCB0aGUgVFMgY29tcGlsZXIuIFRoZSBUUyB0eXBlIGRlZmluaXRpb24gZm9yIFByb21pc2UgYW5kIFByb21pc2VMaWtlIGlzbid0XG4gKiBjb21wbGV0ZWx5IGNvcnJlY3QsIGFueXdheSwgc28gaXQncyBlYXN5IHRvIGdldCB1c2VkIHRvIHVzaW5nIHRoZSBhbnkgdHlwZSBhbmQgbWFrZSBicm9rZW4gY29kZS5cbiAqXG4gKiBZb3UgY2Fubm90IGFzeW5jL2F3YWl0IGEgcmVwZWF0YWJsZSBwcm9taXNlIGl0c2VsZiBidXQgeW91IGNhbiBhd2FpdCBhIHNpbmdsZSByZXNvbHV0aW9uLiBBc3luYy9hd2FpdCBpcyBzdWdhciB0aGF0XG4gKiBjcmVhdGVzIGEgcmVndWxhciwgbm9uLXJlcGVhdGFibGUsIHByb21pc2UuXG4gKi9cbmNsYXNzIFJlcGVhdGFibGVQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgb25VbmhhbmRsZWRFcnJvciwgLy8gVGhpcyBhZGRzIGEgY2FsbGJhY2sgYXQgdGhlIGVuZCAob3IgMm5kIGZyb20gdGhlIGVuZCwgc2VlIG5leHQgb3B0aW9uKVxuICAgIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlIC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICkge1xuICAgICAgICB0aGlzLm9uVW5oYW5kbGVkRXJyb3IgPSBvblVuaGFuZGxlZEVycm9yO1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjsgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC4gVXNlZnVsIGZvciBhc3luYy9hd2FpdCBjb2RlLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlIGZvbGxvd2luZyBzaG91bGQgd29yazpcbiAgICAvLyBjb25zdCByZXBlYXRhYmxlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlKCk7IGNvbnN0IHIgPSBhd2FpdCByZXBlYXRhYmxlLnJlc29sdmUoKTsgY29uc29sZS5sb2cocik7XG4gICAgcmVzb2x2ZShhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICByZWplY3QoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlamVjdChhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICAvLyBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay5cbiAgICB0aGVuKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbmZ1bGZpbGxlZDogb25mdWxmaWxsZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbnJlamVjdGVkOiBvbnJlamVjdGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhlIGZpcnN0IGlzIGFsd2F5cyBvbmZ1bGZpbGxlZCBhbmQgaXMgbmV2ZXIgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKCFjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIEZpcnN0IG9uZnVsZmlsbGVkIGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlID0gbmV3IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZShjYi5vbmZ1bGZpbGxlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oY2Iub25mdWxmaWxsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25yZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goY2Iub25yZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIE5vIGNhbGxiYWNrcywgbm90IGV2ZW4gdGhlIGRlZmF1bHQgZmlyc3Qgb25mdWxmaWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2godGhpcy5vblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVwZWF0YWJsZVByb21pc2UgPSBSZXBlYXRhYmxlUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBSZXR1cm4gZWxlbWVudHMgb2YgYXJyYXkgYSBsaW5lZCB1cCB3aXRoIGVsZW1lbnRzIG9mIGFycmF5IGIuIEJvdGggYXJyYXlzIGRvbid0IGhhdmUgdG8gYmUgdGhlIHNhbWUgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiB6aXAoYSwgYikge1xuICAgIGlmIChhLmxlbmd0aCA+PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbZWxlbWVudCwgYltpbmRleF1dKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFthW2luZGV4XSwgYl0pO1xuICAgIH1cbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLyoqXG4gKiBSZXR1cm4gYSBjYXJ0ZXNpYW4gam9pbiAoY3Jvc3Mgam9pbikgYmV0d2VlbiBhcnJheXMgYSBhbmQgYi5cbiAqL1xuZnVuY3Rpb24gY2FydGVzaWFuKGEsIGIpIHtcbiAgICAvLy8gdHlwZXNjcmlwdCBwcmV2ZW50cyBhIGRpcmVjdCB1c2Ugb2YgY29uY2F0LCBzbyBkbyB0aGlzIG1hbnVhbGx5IHdpdGggYSBsb29wXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5iLm1hcChxID0+IFtpdGVtLCBxXSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmV4cG9ydHMuY2FydGVzaWFuID0gY2FydGVzaWFuO1xuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhbmdlIG9mIGludGVnZXJzLCBjb3VudGluZyB1cCBieSAxLCBmb3IgdGhlIGdpdmVuIGxlbmd0aC4gU3RvbGVuIGZyb20gUHl0aG9uLlxuICovXG5mdW5jdGlvbiByYW5nZShsZW5ndGgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuZ3RoIH0sICh2YWx1ZSwga2V5KSA9PiBrZXkpO1xufVxuZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiBpdGVtcyBhbmQgb3RoZXIgYXJyYXlzLCBmbGF0dGVuIHRoZW0gb3V0IGludG8gYSBzaW5nbGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uKiB0cmF2ZXJzZShhcnIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICB5aWVsZCBhcnI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBhcnIpIHtcbiAgICAgICAgICAgIHlpZWxkKiB0cmF2ZXJzZShyb3cpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy50cmF2ZXJzZSA9IHRyYXZlcnNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlXCIpO1xuLyoqXG4gKiBBIGRlbGVnYXRlIG9iamVjdCBpcyB1c2VkIGJ5IHRoZSBFdmVudEhhbmRsZXIuIEl0IGNvbnRhaW5zIGVub3VnaCBpbmZvcm1hdGlvbiB0byBleGVjdXRlIGEgY2FsbGJhY2sgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25vdXNseVxuICogKHVzaW5nIGEgcHJvbWlzZSkuIEl0IGFsc28gYWRkcyBzb21lIHN0cmluZ3MgdG8gaGVscCBpbiB0cm91Ymxlc2hvb3RpbmcsIGJlY2F1c2Ugc2VhcmNoaW5nIGEgcmVjdXJzaXZlIGFycmF5IG9mIGNvbXBsZXggb2JqZWN0cyBjYW4gbWFrZVxuICogaXQgYSBiZWFyIHRvIGZpbmQgb3V0IHdoeSBhIGNhbGxiYWNrIGlzbid0IGJlaW5nIGV4ZWN1dGVkLlxuICovXG5jbGFzcyBEZWxlZ2F0ZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSW4gbWFueSBjYXNlcyAoZm9yIGV4YW1wbGUsIHdoZW4gdXNpbmcgZmF0IGFycm93IGZ1bmN0aW9ucyksIHRoaXNBcmcgaXNcbiAgICAgICAgLy8gbm90IG5lZWRlZC4gQnV0IGluIG1vc3Qgb3RoZXJzLCBpdCBpcyBhbiBhbm5veWluZyBidWcgdGhhdCByZXF1aXJlcyB0cm91Ymxlc2hvb3RpbmdcbiAgICAgICAgLy8gdG8gZmlndXJlIG91dCB3aGF0IHRoZSBjYWxsZXIgZm9yZ290LiBJJ3ZlIHdhdmVyZWQgYmV0d2VlbiBtYWtpbmcgaXQgcmVxdWlyZWQgYW5kIG5vdC5cbiAgICAgICAgaWYgKCF0aGlzQXJnKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZWxlZ2F0ZSBjcmVhdGVkIHdpdGhvdXQgdGhpc0FyZy4gRGlkIHlvdSBtZWFuIHRvPycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0JyAmJiAnY29uc3RydWN0b3InIGluIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPd25lck5hbWUgPSB0aGlzQXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHR5cGVzY3JpcHQgY29tcGlsZXIgc2hvdWxkIGhhbmRsZSB0aGlzIGNoZWNrIGJ1dCBjYW4ndCBhdCBydW50aW1lLlxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLmNhbGxiYWNrTmFtZSA9IGNhbGxiYWNrLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lICYmIHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLmNhbGxiYWNrT3duZXJOYW1lfS4ke3RoaXMuY2FsbGJhY2tOYW1lfSgpYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja05hbWUgKyAnKCknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tPd25lck5hbWUgKyAnLl9fbGFtYmRhX18oKSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlXzEuUmVwZWF0YWJsZVByb21pc2UoY2FsbGJhY2suYmluZCh0aGlzQXJnKSk7XG4gICAgfVxufVxuZXhwb3J0cy5EZWxlZ2F0ZSA9IERlbGVnYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgRGVsZWdhdGVfMSA9IHJlcXVpcmUoXCIuL0RlbGVnYXRlXCIpO1xuLyoqXG4gKiBJIGNob3NlIHRvIHVzZSBDIyBzdHlsZSBldmVudHMsIG5vdCBKUy9UUywgYmVjYXVzZSB0aGUgSlMvVFMgd2F5IG9mIGRvaW5nIGRlbGVnYXRlcy9jdXN0b20gZXZlbnRzIGlzIGEgTklHSFRNQVJFLiBTdXJlLFxuICogQ3VzdG9tRXZlbnQgd29ya3MsIGJ1dCBvbiB0aGUgVFMgc2lkZSB0aGUgY29kZSByZXF1aXJlZCB0byBtYWtlIFRTQyBoYXBweSB3aXRoIHZhbGlkIGphdmFzY3JpcHQgaXMgYXdmdWwgYW5kIG5vbi1pbnR1aXRpdmUuXG4gKiBPbiB0aGUgSlMgc2lkZSwgeW91IGhhdmUgdGhlIHByb2JsZW0gdGhhdCBldmVyeSBoYW5kbGVyIHBpY2tzIGl0IHVwLCBub3QganVzdCB0aGUgb25lcyB0aGF0IGFyZSBib3VuZCB0byB0aGUgcmVsZXZhbnQgSFRNTFxuICogZWxlbWVudCwgc28gZWxlbWVudHMgbmVlZCB0byBwYXNzIHRoZSBzb3VyY2UgYXMgYW4gYXJndW1lbnQgYW5kIGNoZWNrIGl0IChsaWtlIGpxdWVyeSBhbmQgJChkb2N1bWVudCkub24oKSkuXG4gKlxuICogQWZ0ZXIgZ2V0dGluZyBpdCB3b3JraW5nLCBhbGwgSSBjb3VsZCB0aGluayBhYm91dCB3YXMgaG93IGJhZCB0aGUgY29kZSB3YXMsIHNvIEkgcmV3cm90ZSBpdCBhdm9pZGluZyB0aGUgSlMgcGF0dGVybiBlbnRpcmVseS5cbiAqXG4gKiBUaGlzIGNhbiBiZSBzeW5jaHJvbm91cyAoY2FsbGJhY2tzKSBvciBhc3luY2hyb25vdXMgKHByb21pc2VzKS4gIFdoZW4gaXQgaXMgYXN5bmMsIHRoZSBjb2RlIGV4ZWN1dGVzIGFmdGVyIHRoZSBjdXJyZW50IHN5bmNocm9ub3VzXG4gKiBldmVudHMgcnVuIHRvIGNvbXBsZXRpb24uIFRoaXMgY291bGQgY3JlYXRlIGJ1Z3MgaW4gc3luY2hyb25vdXMgY29kZSwgYnV0IGlzIGJlc3QgZm9yIGJyb3dzZXIgZXZlbnRzLiBUaGlzIGhhbmRsZXIgaXMgcHJpbWFyaWx5IHVzZWQgZm9yXG4gKiBicm93c2VyIGV2ZW50cywgc28gYXN5bmMgaXMgZGVmYXVsdC5cbiAqXG4gKiBCdXQgaWYgeW91J3JlIHRyaWdnZXJpbmcgYXN5bmMgZXZlbnRzIGluIGNvZGUgYW5kIHN0ZXBwaW5nIHRocm91Z2ggaXQgaW4gQ2hyb21lLCB3aGF0IHlvdSBzZWUgd29uJ3QgbWFrZSBzZW5zZSwgYmVjYXVzZSB0aGUgYXN5bmNcbiAqIGV2ZW50cyB3b24ndCBvY2N1ciB1bnRpbCByaWdodCBhd2F5LiBJdCBjYW4gYmUgaGFyZCB0byB0cm91Ymxlc2hvb3QuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbmNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoX2Rpc2FibGVBc3luYyA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVBc3luYyA9IF9kaXNhYmxlQXN5bmM7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIElmIHRoaXMgcmVjZWl2ZXMgYSBkZWxlZ2F0ZSAod2hpY2ggaXMgYW4gYXJyYXkgb2YgZGVsZWdhdGVzKSwgYWRkIGl0LlxuICAgICAgICAvLyBXaGVuIHRoaXMgaXMgaW52b2tlZCwgdGhhdCBkZWxlZ2F0ZSB3aWxsIGFsc28gYmUgaW52b2tlZC5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBfb3ZyMV9kZWxlZ2F0ZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHb3QgYSBzaW5nbGUgY2FsbGJhY2tcbiAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBjYWxsYmFjay5cbiAgICAgICAgaWYgKHRoaXMuZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoOiB0cnVlIH0pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0RlbGUgPSBuZXcgRGVsZWdhdGVfMS5EZWxlZ2F0ZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChuZXdEZWxlKTtcbiAgICAgICAgLy8gSUYgdGhpcyBpcyBhc3luY2hyb25vdXMsIHJldHVybiB0aGUgcHJvbWlzZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAgICAgICAgLy8gQ2hhaW5pbmcgd29uJ3Qgd29yayBvbiBzeW5jIGNvZGUsIHNvIGRvIG5vdCBpbiB0aGF0IGNhc2UuXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3RGVsZS5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX2RlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGRlbGVnYXRlLlxuICAgICAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZmluZChxID0+IHEgPT09IGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChkZWxlZ2F0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+ICFBcnJheS5pc0FycmF5KHEpICYmIHEuY2FsbGJhY2sgPT09IGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcikge1xuICAgICAgICAvLyBGaXJzdCB0cnkgdG8gdW5zdWJzY3JpYmUgdGhlIGRlZmF1bHQgZGVsZWdhdGUuIENhbid0IGRvIGFueXRoaW5nIGlmIGl0IGhhcyBhIGRpZmZlcmVudCBuYW1lLCB0aG91Z2guXG4gICAgICAgIGlmIChcImRlbGVnYXRlXCIgaW4gc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRGVsZWdhdGUoc2VuZGVyLmRlbGVnYXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiAhQXJyYXkuaXNBcnJheShxKSAmJiBxLnRoaXNBcmcgPT09IHNlbmRlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gcSA9PT0gZGVsZWdhdGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlKGFyZ3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgICAgIC8vIEFzeW5jIHZlcnNpb24uIERvZXMgbm90IHdvcmsgd2VsbCB3aXRoIHRoZSBjaHJvbWUgZGVidWdnZXIuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suY2FsbChsaXN0ZW5lci50aGlzQXJnLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2ggfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2gobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgdGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpOyAvLyBDbGVhcnMgdGhlIGRlbGVnYXRlXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB1bmRlZmluZWQ7IC8vIE1ha2VzIHN1cmUgdGhpcyBjYW4ndCBiZSB1c2VkIGFnYWluXG4gICAgfVxufVxuZXhwb3J0cy5FdmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRXZlbnQgYXJndW1lbnRzIGV4cGVjdGVkIG9uIGFueSBDaGFuZ2UgZXZlbnQuXG4gKi9cbmNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2YgY2hhbmdlIG9wZXJhdGlvbiAoc2V0LCBkZWxldGUpIChwb3RlbnRpYWxseSBtZXRob2QpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSAnJztcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgY29uc3RydWN0b3IgdGhhdCBpcyBuZXdhYmxlLlxuICogVEhJUyBDQU5OT1QgREVURUNUIEFOT05ZTU9VUyBDTEFTU0VTLiBTb3JyeSwgYnV0IEpTIGRvZXNuJ3QgaGF2ZSBhIG5vbi1kZXN0cnVjdGl2ZSB3YXlcbiAqIHRvIGNoZWNrIGlmIGFueSBmdW5jdGlvbiBpcyBhIGNvbnN0cnVjdG9yIG90aGVyIHRoYW4gdG8gdHJ5IHRvIG5ldygpIGl0IGFuZCBibG93IHVwL25vdCBibG93IHVwLlxuICogVGhpcyBmdW5jdGlvbiBkZXBlbmRzIG9uIHRoZXJlIGJlaW5nIGEgcHJvdG90eXBlIHdpdGggYSBuYW1lZCBjb25zdHJ1Y3Rvci5cbiAqL1xuZnVuY3Rpb24gY29uc3RydWN0b3JUeXBlR3VhcmQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmoucHJvdG90eXBlICYmIG9iai5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbn1cbmV4cG9ydHMuY29uc3RydWN0b3JUeXBlR3VhcmQgPSBjb25zdHJ1Y3RvclR5cGVHdWFyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIGtleXdvcmQgYXJndW1lbnRzLCBhcyBzZWVuIGluIFB5dGhvbiBhbmQgQyMuIEl0IG1ha2VzIGNvbmZpZ3VyYWJsZVxuICogZnVuY3Rpb25zIHNvIG11Y2ggcXVpY2tlciBhbmQgZWFzaWVyIHRoYW4gZmxhdCBhcmd1bWVudHMgKGZvcmNpbmcgeW91IHRvIHB1dCB1bmRlZmluZWQgbWFudWFsbHkgaW4gZGlmZmVyZW50XG4gKiBzbG90cykgb3Igb3B0aW9ucyBvYmplY3RzICh0YWtlcyBtb3JlIHRpbWUgdG8gcHJvZHVjZSwgZXNwZWNpYWxseSBpZiB5b3UgbmVlZCB0byBuZXcgaXQgdXApLlxuICpcbiAqIENhbGwgZnVuY3Rpb25zIGhhdmluZyBrZXl3b3JkIGFyZ3VtZW50cyB1c2luZyB0aGlzIHN5bnRheDpcbiAqIGNhbGxtZShhcmcxLCBhcmcyLCBrdygnc29tZXRoaW5nJywga3cxKSwga3coJ3NvbWV0aGluZ0Vsc2UnLCBrdzIpKVxuICpcbiAqIFRvIG1ha2UgdGhlbSB3b3JrLCBpbiB0aGUgZnVuY3Rpb24gaXRzZWxmLCB5b3UgbmVlZCB0byBjb3B5IGFuZCBwYXN0ZS4gRm9yIGV4YW1wbGU6XG4gKiAoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSA9IEt3YXJnLnBhcnNlKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0pKTtcbiAqL1xuY2xhc3MgS3dhcmcge1xuICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgaWYgKCFhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gYTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbWVtYmVyIHRoaXMgdGVtcGxhdGU6XG4gICAgICogKHsgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0pKTtcbiAgICAgKiBJbmNsdWRlIGRlZmF1bHQgdmFsdWVzIGluIHRoZSBmaXJzdCBvYmplY3QsIG5vdCB0aGUgc2Vjb25kLlxuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgdG8gY2FwdHVyZSByZXN0IHBhcmFtZXRlcnMsIHVzZSB0aGlzOlxuICAgICAqICh7ICRyZXN0JCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgLCAuLi5yZXN0IH0pKTtcbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IGFsbG93VW5rbm93bktleXdvcmQgdG8gYmUgdHJ1ZSwgdXNlIHRoaXM6XG4gICAgICogKHsgJCRrdyQkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9LCB0cnVlKSk7XG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlQXJncyhhcmdzLCBhbGxvd1Vua25vd25LZXl3b3JkID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB0aGlzIGNvdWxkIHRha2UgdGhlIGFyZ3VtZW50cyBvYmplY3QsIGJ1dCBzYWRseSBhcmd1bWVudHMgc3RvcmVzIG9ubHkgYW4gYXJyYXkgb2YgdmFsdWVzLFxuICAgICAgICAvLyBubyBrZXlzLiBJZiBKUyB3ZXJlIHNhbmUsIGl0IHdvdWxkIGJlIGEgTWFwLCBub3QgYW4gYXJyYXkuIFR3byBzdGVwcyBmb3J3YXJkLCBvbmUgc3RlcCBiYWNrLlxuICAgICAgICAvLyBQYXJzaW5nIHRoZSBzdHJpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uIGlzIG5vdCBteSBjdXAgb2YgdGVhLCBzbyBqdXN0IG5vLlxuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkgYXJndW1lbnQgb3JkZXJcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSBhcmdzW2FyZ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga3d2YXIgPSB7fTtcbiAgICAgICAgb2JqWyckJGt3JCQnXSA9IGt3dmFyO1xuICAgICAgICAvLyBDaGVjayBmb3IgcmVzdCBwYXJhbWV0ZXJzLlxuICAgICAgICAvLyBJIHdhcyBnb2luZyB0byBoYXZlIHRoaXMgb24vb2ZmIGNvbmZpZ3VyYWJsZSwgYnV0IGl0IHNob3VsZG4ndCBodXJ0IHBlcmZvcm1hbmNlLlxuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgb2JqWyckcmVzdCQnXSA9IGFycjtcbiAgICAgICAgLy8gUmVzdCBwYXJhbWV0ZXJzIGFyZSBzdG9yZWQgYXMgYXJyYXkga2V5cywgeyAnMCc6IGEsICcxJzogYiwgJ25vblJlc3QnOiAnc29tZXRoaW5nIGVsc2UnfVxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKS5maWx0ZXIoZiA9PiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhmKSkpIHtcbiAgICAgICAgICAgIGlmICghKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGFyZ3NbYXJnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5d29yZHNVc2VkID0ge307XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGtleXdvcmQgbmFtZVxuICAgICAgICAvLyBIYXZlIHRvIGl0ZXJhdGUgdGhlIGxpc3QgdHdpY2UsIHRvIGF2b2lkIHdpcGluZyBvdXQgZGF0YSBpZiB0aGUgb3JkZXIgaXMgc3dhcHBlZFxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gYXJnc1thcmddO1xuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd1Vua25vd25LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrd3Zhclt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBhbiB1bmV4cGVjdGVkIGtleXdvcmQgYXJndW1lbnQgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBrZXl3b3Jkc1VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgbXVsdGlwbGUgdmFsdWVzIGZvciBrZXl3b3JkIGFyZ3VtZW50ICsgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXl3b3Jkc1VzZWRbdG1wLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICAvLyBUdXJuIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGtleXdvcmQgYXJndW1lbnRzLlxuICAgIC8vIE5lZWRzIHRvIHJldHVybiBhbnlbXSBiZWNhdXNlIGl0J3MgZ29pbmcgdG8gYmUgc2hvdmVkIGludG8gYXJiaXRyYXJ5IGFyZ3VtZW50IGxpc3RzXG4gICAgc3RhdGljIHVucGFjayhhcmdzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChrdyhhcmcsIGFyZ3NbYXJnXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBpc01hdGNoKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBrZXk7XG4gICAgfVxufVxuZXhwb3J0cy5Ld2FyZyA9IEt3YXJnO1xuZnVuY3Rpb24ga3coYSwgYikge1xuICAgIGlmICghYSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGEsIGIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDJcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhWzBdLCBhWzFdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDNcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGggb25seSBvbmUga2V5L3ZhbHVlIHBhaXIuXG4gICAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSk7XG4gICAgICAgIGlmICghcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXAgb2JqZWN0OiBtdWx0aXBsZSBrZXlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhwcm9wc1swXSwgYVtwcm9wc1swXV0pO1xuICAgIH1cbn1cbmV4cG9ydHMua3cgPSBrdztcbmZ1bmN0aW9uIGt3YXJnc1RvT2JqZWN0KGFycikge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcnIpIHtcbiAgICAgICAgb3B0aW9uc1thcmcubmFtZV0gPSBvcHRpb25zW2FyZy52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuZXhwb3J0cy5rd2FyZ3NUb09iamVjdCA9IGt3YXJnc1RvT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpc05vbmUodGVzdCkge1xuICAgIHJldHVybiAodGVzdCA9PSBudWxsIHx8IHRlc3QgPT09IHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmlzTm9uZSA9IGlzTm9uZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY2xvbmVEZWVwKG9iaiwgaGFzaCA9IG5ldyBXZWFrTWFwKCkpIHtcbiAgICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgICAgICByZXR1cm4gb2JqOyAvLyBwcmltaXRpdmUgdHlwZXNcbiAgICB9XG4gICAgaWYgKGhhc2guaGFzKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGhhc2guZ2V0KG9iaik7IC8vIHJlZmVyZW5jZSB0byBvYmplY3QgcHJldmlvdXNseSBzZWVuXG4gICAgfVxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgU2V0KCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCB2YWwgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgKFtrZXksIHZhbF0pID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKGtleSwgaGFzaCksIGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBBcnJheS5mcm9tKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgb2JqLmZsYWdzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBUaGlzIGlzIGF3ZnVsIGNvZGUsIGJ1dCBpdCdzIHRoZSBvbmx5IHdheSB0byBjbG9uZSBhIHN0YW5kYWxvbmUgZnVuY3Rpb24gKHZzIGEgbWV0aG9kIHdoaWNoIGhhcyBhIGRlc2NyaXB0b3IpLlxuICAgICAgICAvLyBJbiBnZW5lcmFsLCB5b3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgY2xvbmVEZWVwIG9uIGZ1bmN0aW9ucy4gWW91J2xsIHNlZSBpdCdzIE5PVCB1c2VkIG9uIGludGVybmFsIG1ldGhvZHMuXG4gICAgICAgIHJlc3VsdCA9IG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBvYmoudG9TdHJpbmcoKSkoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBoYXNoLnNldChvYmosIHJlc3VsdCk7IC8vIEtlZXAgdHJhY2sgb2Ygb2JqZWN0cyBwcmV2aW91c2x5IGNsb25lZFxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiAhKGtleSBpbiByZXN1bHQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgbWV0aG9kcyB0aGF0IGFyZW4ndCBpbiB0aGUgcHJvdG90eXBlLlxuICAgICAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHJlY3Vyc2l2ZWx5IGZvbGxvdyBiZWNhdXNlIHRoZXJlJ3Mgbm90aGluZyByZWN1cnNpdmUgdG8gZG8uXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgaGFzaC5zZXQob2JqW2tleV0sIHJlc3VsdFtrZXldKTtcbiAgICAgICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIG1ldGhvZC5cbiAgICAgICAgICAgICAgICAvLyBJZiBleHRyYSBrZXlzIGFyZSB0aHJvd24gb250byBhIGZ1bmN0aW9uLCB0aGV5IHByb2JhYmx5IHdpbGwgbm90IGJlIGNsb25lZC5cbiAgICAgICAgICAgICAgICAvLyBJbiBteSBleHBlcmllbmNlLCBleHRyYSBrZXlzIG9uIGZ1bmN0aW9ucyBkaWRuJ3Qgd29yayByaWdodCwgc28gbm8gYmlnIGxvc3MuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgY3VzdG9tIGdldHRlcnMvc2V0dGVycy4gVGhlc2UgYXJlIGxvY2FsIGFuZCBob3BlZnVsbHkgd29yayBqdXN0IGxpa2UgbWV0aG9kcy5cbiAgICAgICAgICAgIC8vIEluIG1hbnkgY2FzZXMsIHRoaXMgaXMgcmVkdW5kYW50IHdpdGggT2JqZWN0LmNyZWF0ZSgpLCBidXQgaXMgbmVjZXNzYXJ5IHRvIGFsbG93IG9iamVjdHMgd2l0aCBtYW51YWxseS1hZGRlZCBjdXN0b20gZ2V0dGVycy5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIGdldHRlci9zZXR0ZXIuXG4gICAgICAgICAgICAvLyBBTFNPIGhhc2ggbm90IHVwZGF0ZWQ7IHRoaXMgaXMgbm90IHBvc3NpYmxlLCBiZWNhdXNlIGl0IHdpbGwgbWFwIHRoZSB2YWx1ZSBpdCBnZXRzLCBub3QgdGhlIGdldHRlci5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gY2xvbmVEZWVwKG9ialtrZXldLCBoYXNoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jbG9uZURlZXAgPSBjbG9uZURlZXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG4vKipcbiAqIEEgcHNldWRvLXJhbmRvbSBwcmVmaXggcGx1cyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIHVuaXggZXBvY2guIFRoZSByYW5kb20gcGFydCBzaG91bGQgYmUgcmFuZG9tIGVub3VnaCB0byBjb3ZlclxuICogbXVsdGlwbGUgaWRzIGNyZWF0ZWQgaW4gYSBtaWxsaXNlY29uZC5cbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlSWQoKSB7XG4gICAgY29uc3QgY2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotXyc7XG4gICAgbGV0IHJlc3VsdCA9ICd1JyArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyAnLSc7XG4gICAgZm9yIChjb25zdCBfIG9mIEFycmF5VXRpbGl0aWVzXzEucmFuZ2UoOCkpIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZ2V0VW5pcXVlSWQgPSBnZXRVbmlxdWVJZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUZWxsIGlmIGEgZ2l2ZW4gc3RyaW5nIGlzIGEgcG9zaXRpdmUgaW50ZWdlci5cbiAqIFVzZSBmb3IgZGV0ZWN0aW5nIGFycmF5IGtleXMuXG4gKi9cbmZ1bmN0aW9uIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKHN0cikge1xuICAgIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0ciA9PT0gJzAnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gL15bMS05XVxcZCokLy50ZXN0KHN0cik7XG59XG5leHBvcnRzLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nID0gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBhY2N1cmF0ZSB0aGlzIGlzIGJ1dCBpdCBzZWVtcyBwcmV0dHkgZ29vZFxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iajtcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiJdfQ==
