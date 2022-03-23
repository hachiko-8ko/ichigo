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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Qcm90b3R5cGVFeHRlbnNpb24uanMiLCJzcmMvRXh0ZW5zaW9uTG9hZGVyLmpzIiwic3JjL0V4dGVuc2lvbnMvQ29tcG9uZW50RXh0ZW5zaW9ucy5qcyIsInNyYy9FeHRlbnNpb25zL0VsZW1lbnRFeHRlbnNpb25zLmpzIiwic3JjL0V4dGVuc2lvbnMvT2JzZXJ2YWJsZUV4dGVuc2lvbnMuanMiLCJzcmMvSHRtbC9DcmVhdGVFbGVtZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zLmpzIiwic3JjL09ic2VydmFibGUvSU9ic2VydmFibGUuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQmFzZS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZS5qcyIsInNyYy9TeXN0ZW0vQXN5bmMvRGVmZXJyZWRQcm9taXNlLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnJlcXVpcmUoXCIuLi8uLi9zcmMvRXh0ZW5zaW9uTG9hZGVyXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoaXMgc2NyaXB0IGNvbnRhaW5zIGV4dGVuc2lvbnMgdG8gcHJvdmlkZSBhZGRpdGlvbmFsIGZ1bmN0aW9ucyB1c2VkIGJ5IEljaGlnby5cbiAqIEluIHlvdXIgbWFpbiBwcm9jZXNzLCBpbXBvcnQgdGhpcyBzY3JpcHQgKGltcG9ydCAnL3BhdGgvdG8vSWNoaWdvL0ljaGlnb0V4dGVuc2lvbkxvYWRlcicpIHRvIGFkZFxuICogdGhlc2UgZXh0ZW5zaW9ucyB0byBwcm90b3R5cGVzLlxuICovXG5yZXF1aXJlKFwiLi9FeHRlbnNpb25zL09ic2VydmFibGVFeHRlbnNpb25zXCIpO1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9Db21wb25lbnRFeHRlbnNpb25zXCIpO1xucmVxdWlyZShcIi4vRXh0ZW5zaW9ucy9FbGVtZW50RXh0ZW5zaW9uc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9PcHRpb25zL0lDb21wb25lbnRCaW5kaW5nT3B0aW9uc1wiKTtcbmNvbnN0IEJvdW5kQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4uL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmdldENvbXBvbmVudCA9IGZ1bmN0aW9uIF9nZXRDb21wb25lbnQoKSB7XG4gICAgcmV0dXJuIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldCh0aGlzKTtcbn07XG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYmluZENvbXBvbmVudCA9IGZ1bmN0aW9uIF9iaW5kKHZpZXdNb2RlbCkge1xuICAgIHJldHVybiBuZXcgQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCh2aWV3TW9kZWwsIG5ldyBJQ29tcG9uZW50QmluZGluZ09wdGlvbnNfMS5FeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyh7IGVsZW1lbnQ6IHRoaXMgfSkpO1xufTtcbkhUTUxFbGVtZW50LnByb3RvdHlwZS5kZWxldGVDb21wb25lbnQgPSBmdW5jdGlvbiBfZGVsZXRlQ29tcG9uZW50KCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldCh0aGlzKTtcbiAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLmVycm9yKCdOb3QgYSBjb21wb25lbnQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCkge1xuICAgICAgICBjb21wb25lbnQuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbi8qKlxuICogU2V0IHRoZSBwYXJlbnQgZm9yIGFuIGVsZW1lbnQgKGpvaW4gdGhlIHBhcmVudCdzIGZhbWlseSBhcyBhIG5ldyBjaGlsZCksIHRoZSBvcHBvc2l0ZSBvZiBhcHBlbmRDaGlsZC4gRmx1ZW50LCBmb3IgY2hhaW5pbmcsIHNvXG4gKiBpdCdzIG5vdCBhIHBlcmZlY3QgYW5hbG9nIChhcHBlbmRDaGlsZCByZXR1cm5zIHRoZSBhcmd1bWVudCB3aGlsZSB0aGlzIHJldHVybnMgdGhlIGV4dGVuZGVkIG9iamVjdCAuLi4gdGhvdWdoIGJvdGggYXJlIHRoZSBjaGlsZCkuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRUb1BhcmVudCA9IGZ1bmN0aW9uIF9hcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBGbHVlbnQgdmVyc2lvbiBvZiBhcHBlbmRDaGlsZCwgd2hpY2ggcmV0dXJucyB0aGUgcGFyZW50LCBub3QgdGhlIGNoaWxkICh0aGUgYXJndW1lbnQpLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGRGbHVlbnQgPSBmdW5jdGlvbiBfYXBwZW5kQ2hpbGRGbHVlbnQoY2hpbGQpIHtcbiAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIEFkZCB0aGUgZWxlbWVudCBhZnRlciB0aGUgY3VycmVudCBpdGVtLCBhdCB0aGUgc2FtZSBsZXZlbC4gTm90IGZsdWVudCwgc28gdGhpcyBpcyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGFwcGVuZENoaWxkLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kU2libGluZyA9IGZ1bmN0aW9uIF9hcHBlbmRTaWJsaW5nKG5leHQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChuZXh0KTtcbn07XG4vKipcbiAqIEFkZCB0aGUgZWxlbWVudCBhZnRlciB0aGUgY3VycmVudCBpdGVtLCBhdCB0aGUgc2FtZSBsZXZlbC4gRmx1ZW50LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kU2libGluZ0ZsdWVudCA9IGZ1bmN0aW9uIF9hcHBlbmRTaWJsaW5nRmx1ZW50KG5leHQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG5leHQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogUmVwbGFjZSB0aGUgZWxlbWVudC4gTm90IGZsdWVudCwgc28gdGhpcyBpcyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGFwcGVuZENoaWxkLiBUaGVyZSBpcyBubyBmbHVlbnQgdmVyc2lvbiBiZWNhdXNlXG4gKiB0aGlzIGlzIGRlbGV0aW5nIHRoZSBleHRlbmRlZCBvYmplY3QuXG4gKi9cbkhUTUxFbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIF9yZXBsYWNlV2l0aChuZXdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlIHx8IGRvY3VtZW50O1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobmV3RWxlbWVudCwgdGhpcyk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuLyoqXG4gKiBTd2FwIHR3byBlbGVtZW50cyBmcm9tIHRoZWlyIHBsYWNlcyBpbiB0aGUgRE9NLCByZXR1cm5pbmcgdGhlIGFyZ3VtZW50LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIF9zd2FwKGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUgfHwgZG9jdW1lbnQ7XG4gICAgY29uc3QgZWxlbWVudFBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICBjb25zdCBwbGFjZUhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBlbGVtZW50UGFyZW50LnJlcGxhY2VDaGlsZChwbGFjZUhvbGRlciwgZWxlbWVudCk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChlbGVtZW50LCB0aGlzKTtcbiAgICBlbGVtZW50UGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLCBwbGFjZUhvbGRlcik7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIGRvY3VtZW50LnJlbW92ZUNoaWxkIHRoYXQgdXNlcyB0aGUgc2FtZSBBUEkgYXMgdGhlIG90aGVyIGZ1bmN0aW9ucyBoZXJlLlxuICogSW5jbHVkZWQgZm9yIHRoZSBzYWtlIG9mIGNvbnNpc3RlbmN5LlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuZXh0cmFjdCA9IGZ1bmN0aW9uIF9leHRyYWN0KCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSB8fCBkb2N1bWVudDtcbiAgICByZXR1cm4gcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufTtcbi8qKlxuICogRmx1ZW50IHZlcnNpb24gb2YgYWRkRXZlbnRMaXN0ZW5lci5cbiAqL1xuSFRNTEVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJGbHVlbnQgPSBmdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lckZsdWVudChldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IHN0eWxlIGFkZGVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkU3R5bGUgPSBmdW5jdGlvbiBfYWRkU3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbi8qKlxuICogRmx1ZW50IGNsYXNzIGFkZGVyLlxuICovXG5IVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiBfYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjbGFzc05hbWVzKSkge1xuICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgIH1cbiAgICAvLyBOZWVkIHRvIGFsc28gYWxsb3cgY2xhc3NlcyBpbiB0aGUgXCJjbGFzczEgY2xhc3MyXCIgZm9ybWF0XG4gICAgZm9yIChjb25zdCBjIG9mIFtdLmNvbmNhdCguLi5jbGFzc05hbWVzXG4gICAgICAgIC5tYXAocSA9PiBxLnNwbGl0KCcgJykpXG4gICAgICAgIC5maWx0ZXIocSA9PiBxKSkpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjcmVhdGVFbGVtZW50IGhlbHBlciBmdW5jdGlvbiBhbmQgYWRkIGl0IHRvIHRoZSBmcmFnbWVudCwgcmV0dXJuaW5nIHRoZSBuZXcgZWxlbWVudC5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyk7XG4gICAgdGhpcy5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjcmVhdGVFbGVtZW50IGhlbHBlciBmdW5jdGlvbiBhbmQgYWRkIGl0IHRvIHRoZSBmcmFnbWVudC4gRmx1ZW50IHZlcnNpb24sIHNvIGl0J3MgZWFzeSB0byBxdWlja2x5IGFkZFxuICogYSBidW5jaCBvZiBlbGVtZW50cyB0byB0aGUgZnJhZ21lbnQuXG4gKi9cbkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnRGbHVlbnQgPSBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudEZsdWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMpO1xuICAgIHRoaXMuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuLyoqXG4gKiBUYWtlIGEgZG9jdW1lbnQgZnJhZ21lbnQgYW5kIGFkZCBpdHMgY29udGVudHMgdG8gYSBwYXJlbnQgZWxlbWVudC4gQ2Fubm90IGJlIGZsdWVudCBiZWNhdXNlIGF0IHRoaXMgcG9pbnQsIHRoZSBmcmFnbWVudCBpcyBlbXB0eSBhbmRcbiAqIHByZXR0eSB1c2VsZXNzLCBzbyB0aGlzIHJldHVybnMgdGhlIHBhcmVudCBhcmd1bWVudCAoYXMgZ29vZCBhcyBhbnkgb3RoZXIgb3B0aW9uKS5cbiAqL1xuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuYXBwZW5kVG9QYXJlbnQgPSBmdW5jdGlvbiBfYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMpO1xuICAgIHJldHVybiBwYXJlbnQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbi8qKlxuICogUXVpY2tseSBjb252ZXJ0IGFuIG9iamVjdCB0byBhIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuT2JqZWN0LnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4vKipcbiAqIFF1aWNrbHkgY29udmVydCBhIHN0cmluZyB0byBhbiBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBudW1iZXIgdG8gYSBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSh0aGlzLCB7IG5hbWUgfSk7XG59O1xuLyoqXG4gKiBRdWlja2x5IGNvbnZlcnQgYSBib29sIHRvIGEgT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5Cb29sZWFuLnByb3RvdHlwZS50b09ic2VydmFibGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVByb3BlcnR5XzEuT2JzZXJ2YWJsZVByb3BlcnR5KHRoaXMsIHsgbmFtZSB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4vRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgLy8gQWxsb3cgYXR0cmlidXRlcyB0byBiZSBzZW50IG9uIHByb3BlcnRpZXMsIHByb3ZpZGluZyBhIGNsZWFuZXIgaW50ZXJmYWNlLlxuICAgIC8vIEl0IGFsbG93cyB5b3UgdG8gc2VuZCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7YXR0cmlidXRlczogeyBjbGFzczogJ2ZvbycgfX0pIGluc3RlYWQgb2YgY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCwgeyBjbGFzczogJ2ZvbycgfSk7XG4gICAgLy8gQW5vdGhlciBvcHRpb24gaXMgdG8gdXNlIEt3YXJncywgYnV0IG5vdCBldmVyeW9uZSB3YW50cyB0by5cbiAgICBpZiAocHJvcGVydGllcyAmJiAnYXR0cmlidXRlcycgaW4gcHJvcGVydGllcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzIHx8IHt9LCBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBkZWxldGUgcHJvcGVydGllcy5hdHRyaWJ1dGVzO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpKTtcbiAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIERPTSBwcm9wZXJ0aWVzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGF0dHJpYnV0ZXMsIGJlY2F1c2UgaW4gc29tZSBjYXNlcywgdGhleSBvdmVycmlkZSB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIEhUTUwgZnJvbSBhbnkgSFRNTCBlbGVtZW50IHByb3ZpZGVkLlxuICogVXNlIGxpa2UgY29uc3QgZGl2ID0gY3JlYXRlSHRtbDxIVE1MRGl2RWxlbWVudD4oXCI8ZGl2PlNvbWV0aGluZzwvZGl2PlwiKSBvciBjb25zdCBjdXN0b20gPSBjcmVhdGVIdG1sKFwiPHNvbWUtdGFnPjwvc29tZS10YWc+XCIpLlxuICogSWYgbXVsdGlwbGUgZWxlbWVudHMgb3IgYSBwbGFpbiB0ZXh0IHN0cmluZyB3aXRoIG5vIEhUTUwgaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSB3cmFwcGVkIGluIGEgZGl2LCBzbyBpdCBjYW4ga2VlcFxuICogcmV0dXJuaW5nIGFuIEhUTUxFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUh0bWwoaHRtbCwgaW5saW5lID0gZmFsc2UpIHtcbiAgICBsZXQgd3JhcHBlcjtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgIHdyYXBwZXIgPSBzcGFuKChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZXMgPSB3cmFwcGVyLmNoaWxkTm9kZXM7XG4gICAgLy8gTXVsdGlwbGUgbm9kZXMsIHJldHVybiB0aGUgd3JhcHBpbmcgZGl2XG4gICAgLy8gZS5nLiBcIlRoaXMgaXMgYSA8ZW0+dGVzdDwvZW0+XCIgb3IgXCI8ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PlwiXG4gICAgaWYgKG5vZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgLy8gSWYganVzdCBhIHRleHRub2RlIChvciBlbXB0eSksIHJldHVybiBhIHNwYW4uIFRleHQgaXMgaW5jb21wYXRpYmxlIHdpdGggSFRNTEVsZW1lbnQgc28gY2FuJ3QgcmV0dXJuIHRoYXRcbiAgICAvLyBlLmcuIFwiSGVsbG8gd29ybGRcIlxuICAgIGlmICghd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjsgLy8gVGhpcyBpcyBhIHNwYW5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcGFuKHdyYXBwZXIuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFbHNlIHJldHVybiB0aGUgc2luZ2xlIGNoaWxkLlxuICAgIC8vIGUuZy4gXCI8ZGl2PjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+PC9kaXY+XCJcbiAgICByZXR1cm4gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbn1cbmV4cG9ydHMuY3JlYXRlSHRtbCA9IGNyZWF0ZUh0bWw7XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB3aXRoIGFueSBodG1sLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudChodG1sKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICByZXR1cm4gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHdyYXBwZXIpO1xufVxuZXhwb3J0cy5jcmVhdGVGcmFnbWVudCA9IGNyZWF0ZUZyYWdtZW50O1xuZnVuY3Rpb24gZGl2KGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmRpdiA9IGRpdjtcbmZ1bmN0aW9uIHNwYW4oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxTcGFuRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnNwYW4gPSBzcGFuO1xuZnVuY3Rpb24gcGFyYWdyYXBoKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MUGFyYWdyYXBoRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnBhcmFncmFwaCA9IHBhcmFncmFwaDtcbmZ1bmN0aW9uIGFuY2hvcihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBocmVmT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgY29uc3QgdG1wID0gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEFuY2hvckVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIGlmICh0eXBlb2YgaHJlZk9yUHJvcGVydGllcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdG1wLmhyZWYgPSBTdHJpbmcoaHJlZk9yUHJvcGVydGllcyB8fCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB0bXA7XG59XG5leHBvcnRzLmFuY2hvciA9IGFuY2hvcjtcbmZ1bmN0aW9uIGJ1dHRvbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEJ1dHRvbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5idXR0b24gPSBidXR0b247XG4vLyBDb21tb24gcHJpdmF0ZSBmdW5jdGlvbnMgZm9yIG92ZXJsb2Fkcy4gUHJldmVudHMgbG90cyBvZiBjb3B5cGFzdGEuXG4vLyBUaGlzIHdvcmtzIGZvciBldmVyeXRoaW5nIGJlY2F1c2UgVHlwZVNjcmlwdCBpcyBrZWVwaW5nIHRoZSB0eXBlcyB2YWxpZC4gSW4gcHVyZSBKUywgYnVncyBjb3VsZCBiZSBjcmVhdGVkIChmb3IgZXhhbXBsZSwgcGFzc2luZyBhbiBpbm5lclxuLy8gZWxlbWVudCB0byBhIHBhcmFncmFwaCAuLi4gZGlzYWxsb3dlZCBieSBUUyBidXQgdGhlIGNvZGUgaXMgdGhlcmUgaW4gdGhlIEpTKVxuZnVuY3Rpb24gX2ludGVybmFsKHR5cGUsIGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoaHRtbE9yUHJvcGVydGllcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfb3ZyMSh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGh0bWxPclByb3BlcnRpZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIzKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9vdnIyKHR5cGUsIFN0cmluZyhodG1sT3JQcm9wZXJ0aWVzIHx8ICcnKSwgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX292cjEodHlwZSwgaW5uZXJFbGVtZW50LCBwcm9wcywgYXR0cnMpIHtcbiAgICBjb25zdCBlID0gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xuICAgIGUuYXBwZW5kQ2hpbGQoaW5uZXJFbGVtZW50KTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIF9vdnIyKHR5cGUsIGlubmVySHRtbCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBpbm5lckh0bWw7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbmZ1bmN0aW9uIF9vdnIzKHR5cGUsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gcHJvcHMuaW5uZXJIVE1MIHx8ICcnO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBoZWxwZXIgZm9yIENyZWF0ZUVsZW1lbnQsIHJvdWdobHkgbWFwcGluZyB0byBIdG1sRWxlbWVudCB0eXBlcywgYnV0IG5vdCBwZXJmZWN0bHkgYmVjYXVzZSBpdCdzIGltcG9zc2libGVcbiAqICh0aGVyZSdzIG5vIHBlcmZlY3QgMToxIHJlbGF0aW9uc2hpcCkuXG4gKi9cbnZhciBlbGVtZW50VHlwZTtcbihmdW5jdGlvbiAoZWxlbWVudFR5cGUpIHtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBbmNob3JFbGVtZW50XCJdID0gXCJhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXJlYUVsZW1lbnRcIl0gPSBcImFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBdWRpb0VsZW1lbnRcIl0gPSBcImF1ZGlvXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQlJFbGVtZW50XCJdID0gXCJiclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJhc2VGb250RWxlbWVudFwiXSA9IFwiYmFzZWZvbnRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCbG9ja1F1b3RlRWxlbWVudFwiXSA9IFwiYmxvY2txdW90ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJ1dHRvbkVsZW1lbnRcIl0gPSBcImJ1dHRvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTENhbnZhc0VsZW1lbnRcIl0gPSBcImNhbnZhc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFFbGVtZW50XCJdID0gXCJkYXRhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGF0YUxpc3RFbGVtZW50XCJdID0gXCJkYXRhbGlzdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpYWxvZ0VsZW1lbnRcIl0gPSBcImRpYWxvZ1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpdkVsZW1lbnRcIl0gPSBcImRpdlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERMaXN0RWxlbWVudFwiXSA9IFwiZGxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxFbWJlZEVsZW1lbnRcIl0gPSBcImVtYmVkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRmllbGRTZXRFbGVtZW50XCJdID0gXCJmaWVsZHNldFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZvcm1FbGVtZW50XCJdID0gXCJmb3JtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzFFbGVtZW50XCJdID0gXCJoMVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcyRWxlbWVudFwiXSA9IFwiaDJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nM0VsZW1lbnRcIl0gPSBcImgzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzRFbGVtZW50XCJdID0gXCJoNFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc1RWxlbWVudFwiXSA9IFwiaDVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNkVsZW1lbnRcIl0gPSBcImg2XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSFJFbGVtZW50XCJdID0gXCJoclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEltYWdlRWxlbWVudFwiXSA9IFwiaW1hZ2VcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbnB1dEVsZW1lbnRcIl0gPSBcImlucHV0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGFiZWxFbGVtZW50XCJdID0gXCJsYWJlbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExlZ2VuZEVsZW1lbnRcIl0gPSBcImxlZ2VuZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExJRWxlbWVudFwiXSA9IFwibGlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMaW5rRWxlbWVudFwiXSA9IFwibGlua1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1hcEVsZW1lbnRcIl0gPSBcIm1hcFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1ldGVyRWxlbWVudFwiXSA9IFwibWV0ZXJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2REZWxFbGVtZW50XCJdID0gXCJkZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2RJbnNFbGVtZW50XCJdID0gXCJpbnNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPTGlzdEVsZW1lbnRcIl0gPSBcIm9sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT2JqZWN0RWxlbWVudFwiXSA9IFwib2JqZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3B0R3JvdXBFbGVtZW50XCJdID0gXCJvcHRncm91cFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdGlvbkVsZW1lbnRcIl0gPSBcIm9wdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE91dHB1dEVsZW1lbnRcIl0gPSBcIm91dHB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBhcmFncmFwaEVsZW1lbnRcIl0gPSBcInBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhbUVsZW1lbnRcIl0gPSBcInBhcmFtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGljdHVyZUVsZW1lbnRcIl0gPSBcInBpY3R1cmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcmVFbGVtZW50XCJdID0gXCJwcmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcm9ncmVzc0VsZW1lbnRcIl0gPSBcInByb2dyZXNzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUXVvdGVFbGVtZW50XCJdID0gXCJxXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2NyaXB0RWxlbWVudFwiXSA9IFwic2NyaXB0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2VsZWN0RWxlbWVudFwiXSA9IFwic2VsZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU291cmNlRWxlbWVudFwiXSA9IFwic291cmNlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3BhbkVsZW1lbnRcIl0gPSBcInNwYW5cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTdHlsZUVsZW1lbnRcIl0gPSBcInN0eWxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDYXB0aW9uRWxlbWVudFwiXSA9IFwiY2FwdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50XCJdID0gXCJ0ZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnRcIl0gPSBcInRoXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xFbGVtZW50XCJdID0gXCJjb2xcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNvbEdyb3VwRWxlbWVudFwiXSA9IFwiY29sZ3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUVsZW1lbnRcIl0gPSBcInRhYmxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVSb3dFbGVtZW50XCJdID0gXCJ0clwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkJvZHlFbGVtZW50XCJdID0gXCJ0Ym9keVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkZvb3RlckVsZW1lbnRcIl0gPSBcInRmb290XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uSGVhZGVyRWxlbWVudFwiXSA9IFwidGhlYWRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUZW1wbGF0ZUVsZW1lbnRcIl0gPSBcInRlbXBsYXRlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGV4dEFyZWFFbGVtZW50XCJdID0gXCJ0ZXh0YXJlYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRpbWVFbGVtZW50XCJdID0gXCJ0aW1lXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVHJhY2tFbGVtZW50XCJdID0gXCJ0cmFja1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFVMaXN0RWxlbWVudFwiXSA9IFwidWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxWaWRlb0VsZW1lbnRcIl0gPSBcInZpZGVvXCI7XG59KShlbGVtZW50VHlwZSA9IGV4cG9ydHMuZWxlbWVudFR5cGUgfHwgKGV4cG9ydHMuZWxlbWVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKGlucHV0KSB7XG4gICAgLy8gVGhlcmUgaXNuJ3QgYSBidWlsdC1pbiB3YXkgdG8gZG8gdGhpcywgc3RpbGwsIHNvIHdlIG5lZWQgYSBoZWxwZXIgZnVuY3Rpb24uXG4gICAgLy8gVGhlIGFydGljbGUgXCJZb3UgYXJlIHByb2JhYmx5IG1pc3VzaW5nIERPTSB0ZXh0IG1ldGhvZHNcIiBjb252aW5jZWQgbWUgdG8gZG8gaXQgdGhpcyB3YXksXG4gICAgLy8gdnMuIGNyZWF0ZVRleHROb2RlLiBUaG91Z2ggY3JlYXRlVGV4dE5vZGUgd291bGQgcHJvYmFibHkgd29yayBmaW5lIGZvciBzZXR0aW5nIGlubmVySFRNTC5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgICAgICBcIj1cIjogXCImI3gzRDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMzOTtcIixcbiAgICAgICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgICB9O1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIHMgPT4gZXNjYXBlc1tzXSk7XG59XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEdldCB0aGUgY29udGVudHMgb2YgYW55IGh0bWwgbm9kZSBhcyBhIERvY3VtZW50RnJhZ21lbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3ROb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XG59XG5leHBvcnRzLmV4dHJhY3ROb2RlQ29udGVudCA9IGV4dHJhY3ROb2RlQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG4vKipcbiAqIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBHZXR0aW5nIHRoZSB2YWx1ZSBvZiBmb3JtIGZpZWxkcyBpcyBhIGJpdCBjb21wbGljYXRlZCwgbm90IGFsd2F5cyBlbGVtZW50LnZhbHVlLFxuICogc28gaGVyZSdzIGEgaGVscGVyIHRvIG1ha2UgaXQgZWFzaWVyLlxuICovXG5mdW5jdGlvbiBnZXRGb3JtRmllbGRWYWx1ZShlbGVtZW50KSB7XG4gICAgLy8gSXQgd291bGQgYmUgcmVhbGx5IG5pY2UgYXQgdGhpcyBwb2ludCBpZiBKUyBjb3VsZCBzZWUgZ2VuZXJpYyBwYXJhbWV0ZXJzLlxuICAgIC8vIElmIGl0IGNvdWxkLCB0aGVuIHRoZSBjb2RlIGNvdWxkIHNheSBcImlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnICYmIFRPdXRwdXQgIT09IGJvb2xlYW4pIHRocm93IG5ldyBFcnJvcigpXCJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXROdW1iZXJJbnB1dFZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYWRpb1ZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdFZhbHVlKGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmdldEZvcm1GaWVsZFZhbHVlID0gZ2V0Rm9ybUZpZWxkVmFsdWU7XG5mdW5jdGlvbiBnZXRDaGVja2JveFZhbHVlKGlucHV0KSB7XG4gICAgcmV0dXJuICEhaW5wdXQuY2hlY2tlZDtcbn1cbmV4cG9ydHMuZ2V0Q2hlY2tib3hWYWx1ZSA9IGdldENoZWNrYm94VmFsdWU7XG5mdW5jdGlvbiBnZXROdW1iZXJJbnB1dFZhbHVlKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoaW5wdXQudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0TnVtYmVySW5wdXRWYWx1ZSA9IGdldE51bWJlcklucHV0VmFsdWU7XG5mdW5jdGlvbiBnZXRSYWRpb1ZhbHVlKGlucHV0KSB7XG4gICAgLy8gUmFkaW8gYnV0dG9ucyBhcmUgd2VpcmQuIFdlIHdhbnQgdGhlbSB0byBhcHBlYXIgdG8gYmUgbW9yZSBub3JtYWwuXG4gICAgaWYgKGlucHV0Lm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPVwiJHtpbnB1dC5uYW1lfVwiXTpjaGVja2VkYCkgfHwge30pLnZhbHVlO1xuICAgIH1cbiAgICAvLyBJZiBubyBuYW1lLCBmYWxsIGJhY2sgdG8gdGhpc1xuICAgIGlmIChpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmdldFJhZGlvVmFsdWUgPSBnZXRSYWRpb1ZhbHVlO1xuZnVuY3Rpb24gZ2V0U2VsZWN0VmFsdWUoc2VsZWN0KSB7XG4gICAgaWYgKHNlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICByZXR1cm4gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdC52YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmdldFNlbGVjdFZhbHVlID0gZ2V0U2VsZWN0VmFsdWU7XG5mdW5jdGlvbiBnZXRNdWx0aVNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNlbGVjdC5zZWxlY3RlZE9wdGlvbnMpLmZpbHRlcihmID0+IGYudmFsdWUpLm1hcChtID0+IG0udmFsdWUpO1xufVxuZXhwb3J0cy5nZXRNdWx0aVNlbGVjdFZhbHVlID0gZ2V0TXVsdGlTZWxlY3RWYWx1ZTtcbi8vIFRoaXMgaXMgYWxtb3N0IHBvaW50bGVzcy4gSnVzdCBoZXJlIGZvciBjb25zaXN0ZW5jeS5cbmZ1bmN0aW9uIGdldFNpbXBsZUZvcm1WYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIGlmIChpbnB1dC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgdmFsaWQgZm9yIG11bHRpLXNlbGVjdHMnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG59XG5leHBvcnRzLmdldFNpbXBsZUZvcm1WYWx1ZSA9IGdldFNpbXBsZUZvcm1WYWx1ZTtcbi8qKlxuICogU2V0dGluZyB2YWx1ZXMgaXMganVzdCBhcyBjb21wbGljYXRlZCBhcyBnZXR0aW5nIHRoZW0sIGJlY2F1c2UgSFRNTCBpcyBpbmNvbnNpc3RlbnQuIFlvdSBjYW4ndCBqdXN0IHNheSBlbGVtZW50LnZhbHVlID0gZm9vLlxuICogSGVyZSdzIGEgaGVscGVyIHRvIG1ha2UgaXQgZWFzaWVyLlxuICovXG5mdW5jdGlvbiBzZXRGb3JtRmllbGRWYWx1ZShlbGVtZW50LCB2YWx1ZSkge1xuICAgIC8vIEhlcmUgeW91IGNhbiB2YWxpZGF0ZSB0aGUgdHlwZSBiZWZvcmUgc2V0dGluZyBvciBkbyBzb21lIGtpbmQgb2YgY29udmVyc2lvbi5cbiAgICAvLyBGb3IgbXVsdGktc2VsZWN0cywgY2FuIGF1dG8td3JhcCB2YWx1ZSBpbiBzdHJpbmcuXG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgIH1cbiAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7IC8vIHVzZWQgaW4gbW9zdCBvZiB0aGUgY2FzZXNcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCB0eXBlID0gaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHZhbHVlID09PSB0cnVlIHx8IHN0cmluZ1ZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gc3RyaW5nVmFsdWUgPT09IGlucHV0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdG9EYXRlU3RyaW5nKG5ldyBEYXRlKHN0cmluZ1ZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2RhdGV0aW1lJyB8fCB0eXBlID09PSAnZGF0ZXRpbWUtbG9jYWwnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZ1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGAke3RvRGF0ZVN0cmluZyhkYXRlKX1UJHt0b1RpbWVTdHJpbmcoZGF0ZSl9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IGVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBBcnJheS5mcm9tKHNlbGVjdC5vcHRpb25zKTtcbiAgICAgICAgaWYgKHNlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSBzdHJpbmdWYWx1ZTsgLy8gdHJlYXRpbmcgaXQgbGlrZSBhIG5vbi1tdWx0aXBsZSB3b3Jrc1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vbmV4aXN0ZW50IG9wdGlvbnMgY2Fubm90IGJlIHNldC4gV2Ugc2hvdWxkIGxldCB0aGUgcHJvZ3JhbW1lciBrbm93LiBFdmVuIHRob3VnaCB0aGlzIHRha2VzIENQVSBjeWNsZXMuXG4gICAgICAgICAgICB2YWx1ZS5tYXAobSA9PiB7XG4gICAgICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0IG9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBvcHQuc2VsZWN0ZWQgPSB2YWx1ZS5tYXAobSA9PiBtLnRvU3RyaW5nKCkpLmluZGV4T2Yob3B0LnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsdWUpO1xuICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgZWxlbWVudC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKGBDYWxsZWQgc2V0Rm9ybUZpZWxkVmFsdWUgb24gbm9uLWZvcm0gZmllbGQgJHtlbGVtZW50LnRhZ05hbWV9ICR7ZWxlbWVudC5pZCB8fCAnJ31gKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsKSB7XG4gICAgICAgIC8vIElmIHlvdSBzZXQgdGhlIHZhbHVlIG9mIGEgc2VsZWN0IHRvIHNvbWV0aGluZyB0aGF0IGlzIG5vdCBhbiBhdmFpbGFibGUgb3B0aW9uLCBub3RoaW5nIHdpbGwgaGFwcGVuLlxuICAgICAgICBjb25zdCBoYXNPcHRpb24gPSBvcHRpb25zLm1hcChtID0+IG0udmFsdWUpLmluZGV4T2YodmFsLnRvU3RyaW5nKCkpID4gLTE7XG4gICAgICAgIGlmICghaGFzT3B0aW9uKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDYWxsZWQgc2V0Rm9ybUZpZWxkVmFsdWUgd2l0aCBub25leGlzdGVudCBvcHRpb24gJHt2YWwudG9TdHJpbmcoKX0gb24gc2VsZWN0ICR7ZWxlbWVudC5pZH1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGVzZSBjb3VsZCBiZSByZWFkYWJsZSBvbmVsaW5lcnMgaWYgd2UgaGFkIHBhZFN0YXJ0KCkgYnV0IGl0J3Mgbm90IHdvcnRoIGJ1bXBpbmcgdG8gRVMyMDE3IGZvciBvbmUgbWV0aG9kXG4gICAgZnVuY3Rpb24gdG9EYXRlU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb250aCA9ICgnMCcgKyAoZGF0ZS5nZXRVVENNb250aCgpICsgMSkudG9TdHJpbmcoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBkYXkgPSAoJzAnICsgZGF0ZS5nZXRVVENEYXRlKCkudG9TdHJpbmcoKSkuc2xpY2UoLTIpO1xuICAgICAgICByZXR1cm4gYCR7ZGF0ZS5nZXRVVENGdWxsWWVhcigpfS0ke21vbnRofS0ke2RheX1gO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b1RpbWVTdHJpbmcoZGF0ZSkge1xuICAgICAgICBpZiAoIWlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvdXIgPSAoJzAnICsgZGF0ZS5nZXRIb3VycygpKS5zbGljZSgtMik7XG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9ICgnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpO1xuICAgICAgICByZXR1cm4gYCR7aG91cn06JHttaW51dGV9YDtcbiAgICB9XG59XG5leHBvcnRzLnNldEZvcm1GaWVsZFZhbHVlID0gc2V0Rm9ybUZpZWxkVmFsdWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSGVyZSdzIGEgaGVscGVyIGZvciBvbmUgb2YgdGhlIHBsYWNlcyB3aGVyZSBIVE1MNSBmYWxscyBvdmVyLiBJZiB5b3UgZ2V0IHNvbWUgaHRtbCBsaWtlIDxkaXYgaWQ9XCIxXCI+PC9kaXY+PGRpdiBpZD1cIjJcIj48L2Rpdj4sIGl0IGJlY29tZXNcbiAqIGEgTm9kZUxpc3QuIEhUTUw1IGJ5IGRlZmF1bHQgZG9lcyBub3QgcHJvdmlkZSBhIHdheSB0byBzZWFyY2ggdGhpcyBmb3IgYSBzZWxlY3Rvci5cbiAqL1xuZnVuY3Rpb24gbm9kZUxpc3RTZWxlY3Rvcihub2Rlcywgc2VsZWN0b3IpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKCEoJ21hdGNoZXMnIGluIG5vZGUpKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IHRleHQgbm9kZXNcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ub2RlTGlzdFNlbGVjdG9yID0gbm9kZUxpc3RTZWxlY3Rvcjtcbi8qKlxuICogSGVyZSdzIGEgaGVscGVyIGZvciBvbmUgb2YgdGhlIHBsYWNlcyB3aGVyZSBIVE1MNSBmYWxscyBvdmVyLiBJZiB5b3UgZ2V0IHNvbWUgaHRtbCBsaWtlIDxkaXYgaWQ9XCIxXCI+PC9kaXY+PGRpdiBpZD1cIjJcIj48L2Rpdj4sIGl0IGJlY29tZXNcbiAqIGEgTm9kZUxpc3QuIEhUTUw1IGJ5IGRlZmF1bHQgZG9lcyBub3QgcHJvdmlkZSBhIHdheSB0byBzZWFyY2ggdGhpcyBmb3IgYSBzZWxlY3Rvci5cbiAqL1xuZnVuY3Rpb24gbm9kZUxpc3RTZWxlY3RvckFsbChub2Rlcywgc2VsZWN0b3IpIHtcbiAgICAvLyBCZWNhdXNlIHRoZSBicm93c2VyIGNhbiBsb3NlIHJlZmVyZW5jZXMgd2hlbiBtb3Zpbmcgbm9kZXMsIHRoaXMgY2FuIGFsc28gdGFrZSBhIHJlZ3VsYXIgYXJyYXkuXG4gICAgLy8gQmVjYXVzZSBIVE1MNSBoYXMgdG90YWxseSBmYWxsZW4gb3ZlciwgaXQncyBub3QgcG9zc2libGUgZm9yIHRoZSBmaXhlZCBub2RlTGlzdFNlbGVjdG9yQWxsXG4gICAgLy8gdG8gbWF0Y2ggdGhlIG91dHB1dCBzaWduYXR1cmUgb2YgcXVlcnlTZWxlY3RvckFsbCAoTm9kZUxpc3RPZjxFbGVtZW50PiBpbnN0ZWFkIG9mIGFycmF5KS5cbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5BcnJheS5mcm9tKHNlYXJjaCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvckFsbCA9IG5vZGVMaXN0U2VsZWN0b3JBbGw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuY29uc3QgT2JzZXJ2YWJsZVN0YXRlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG4vKipcbiAqIEEgc3VwZXItYmFzaWMgY29tcG9uZW50IHRoYXQgYWxsb3dzIGNvbmZpZ3VyYXRpb24gb2YgZGF0YS1iaW5kaW5nIGZ1bmN0aW9ucyB1c2luZyBzcGVjaWFsbHktbmFtZWQgSFRNTCBhdHRyaWJ1dGVzLCBhcyBpbiBBbmd1bGFyXG4gKiBvciBWdWUuXG4gKi9cbmNsYXNzIEJvdW5kQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50XzEuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGFyZ3MpIHtcbiAgICAgICAgc3VwZXIoYXJncyk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzID0gW107XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzID0gW107XG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLl9hc3luYyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kZWZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IHZpZXdNb2RlbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnaS12JykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdpLXYnLCBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGN1c3RvbUVsZW1lbnRzIGlzbid0IG9mZmljaWFsbHkgcGFydCBvZiBhbiBFUyB2ZXJzaW9uIHlldCBzbyB3b24ndCB3b3JrIGV2ZW4gaW4gc29tZSByZWNlbnQtaXNoIGJyb3dzZXJzXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgICAgIHRoaXMuX2FzeW5jID0gb3B0aW9ucy5hc3luYyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBvcHRpb25zLmRlZmVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICAvLyBEZWZpbmVkIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBjbGFzcyBmb3IgdGhlIGRlZmF1bHQgbG9vcFBvc3RQcm9jZXNzKCkgbWV0aG9kXG4gICAgICAgIGlmIChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmICghQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKG9wdGlvbnMubG9vcEl0ZW1DbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMubG9vcEl0ZW1DbGFzcyBpbnN0YW5jZW9mIEJvdW5kQ29tcG9uZW50LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9vcEl0ZW1DbGFzcyBpcyBub3QgYW4gYm91bmQgY29tcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9vcEl0ZW1DbGFzcyA9IG9wdGlvbnMubG9vcEl0ZW1DbGFzcyB8fCBCb3VuZENvbXBvbmVudDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKTtcbiAgICAgICAgdGhpcy5zZXRUZW1wbGF0ZSh0aGlzLmNvbnRlbnQuaW5uZXJIVE1MKTsgLy8gSW5uZXJIVE1MIGlzIGN1cnJlbnRseSBvbmx5IHBhcnNlZCBhbmQgdGhlbiB0aGUgb3JpZ2luYWwgdGV4dCBpcyB0aHJvd24gYXdheS5cbiAgICAgICAgLy8gQXV0by1hZGQgc3Vic2NyaXB0aW9ucyBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZUFsbFZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5vYnNlcnZlVmlld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRndCBvZiBvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKHRndCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2FzeW5jKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb25zdHJ1Y3RvciBpbml0aWFsaXphdGlvbiBpcyBkb25lLlxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqIFRvIHJlcGxhY2UgdGhlIGVsZW1lbnQgKGNvcHlpbmcgZXhpc3RpbmcgYXR0cmlidXRlcykgc2VuZCB0aGUgcmVsZXZhbnQgb3B0aW9ucywgcGx1cyB7cmVwbGFjZTogdHJ1ZX0uXG4gICAgICpcbiAgICAgKiBJbiBhbG1vc3QgZXZlcnkgY2FzZSwgdmlld01vZGVsIHNob3VsZCBiZSBzZXQuIEJ1dCBpdCdzIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgdGhhdCBhbmQgc3RpbGwgYmUgY29tcGF0aWJsZSB3aXRoIHRoZSBiYXNlXG4gICAgICogY2xhc3MgaW5qZWN0KCkuIFRoaXMgaXMgYSB0eXBlc2NyaXB0LW9ubHkgaXNzdWUgYnV0IGl0IG1ha2VzIHRoaW5ncyB1Z2x5LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy4gQW5kIHByYWN0aWNhbGx5IGRlbWFuZHMgdGhlaXIgdXNlIHRvIHNldCB2aWV3TW9kZWwuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGVsZW1lbnQsIHZpZXdNb2RlbCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3Qoc2VsZWN0b3IsIG9wdCwgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsIHRvIGluamVjdCgpIHdpdGggYSBjbGVhbmVyIGFyZ3VtZW50IG9yZGVyLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3RCaW5kKHZpZXdNb2RlbCwgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3Qoc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50V2l0aEJvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIG9wdCk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQm91bmRDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCB2aWV3TW9kZWwsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIC8vIFdBUk46IFRoaXMgY2FzdCBtYXkgbm90IGJlIHRydWUuIFRoZXJlJ3Mgbm8gd2F5IHRvIGNoZWNrIHRoYXQgdGhlIHRhZ3MgbWF0Y2guXG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oeyBlbGVtZW50OiBleGlzdGluZ0VsZW1lbnQgfSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgIH1cbiAgICB3cml0ZShldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2dC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCk7XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28gY2FzZXMgd2hlcmUgdmFsdWUgaXMgdW5kZWZpbmVkLiBFaXRoZXIgdGhlIGVsZW1lbnQgaXMgbm90IGEgZm9ybSBlbGVtZW50IG9yIGl0J3MgYW4gdW5uYW1lZCByYWRpbyBidXR0b25cbiAgICAgICAgLy8gdGhhdCBpcyBub3Qgc2VsZWN0ZWQuIEluIGJvdGggY2FzZXMsIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHRoZSBtb2RlbCB3aXRoIHVuZGVmaW5lZCwgd2hpY2ggaXMgdXNlbGVzcy5cbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyBqdXN0aWZpY2F0aW9uIHZhbGlkP1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdBUk46IENhbm5vdCB0eXBlIGNoZWNrIHRoaXMgZHluYW1pY2FsbHkuIFR5cGVTY3JpcHQgaXMgYnVpbGQtdGltZSBjaGVja2luZyBvbmx5LiBSdW50aW1lIGNvZGUgY2FuJ3QgZXZlbiBzZWUgdGhlIHR5cGUuXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHRvIGJlIHByZWNpc2UsIGFsbCBwcm9wZXJ0aWVzIGluIF93cml0ZUJpbmRpbmdzIHNob3VsZCBiZSBGb3JtSXRlbVZhbHVlLCBidXQgYXMgX3dyaXRlQmluZGluZ3MgaXMgcG9wdWxhdGVkXG4gICAgICAgIC8vIHZpYSBzdHJpbmcsIHRoZXJlJ3Mgbm8gd2F5IHRvIGVuZm9yY2UgdGhhdC4gU28gaWYgeW91IGZpbGwgYSBzdHJpbmcgdmFsdWUgZnJvbSBhIG11bHRpcGxlIHNlbGVjdCwgaXQnbGwgcHJvZHVjZSBidWdzLlxuICAgICAgICAvLyBTbyBiZSBjYXJlZnVsLiBJdCdzIG9uIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBiaW5kIG9mIHRoaXMuX3dyaXRlVGFyZ2V0cykge1xuICAgICAgICAgICAgaWYgKGJpbmQuc3RhcnRzV2l0aCgndGhpcy4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbYmluZF07XG4gICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXNbYmluZF0gPSB2YWx1ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgdmlldyBtb2RlbCBpcyBlaXRoZXIgRm9ybUZpZWxkVmFsdWUgb3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG9uZS5cbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0aGlzLnZpZXdNb2RlbCwgKCkgPT4gdGhpcy52aWV3TW9kZWwgPSB2YWx1ZSwgdGhpcy52aWV3TW9kZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnZpZXdNb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdpdGggb2JzZXJ2YWJsZSBzdGF0ZSwgd2UgbmVlZCB0byBnZXQgdGhlIHN0YXRlLCB1cGRhdGUgaXQsIGFuZCB3cml0ZSB0aGUgd2hvbGUgdGhpbmcgYmFjay5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2hpbGUgaXQgaXMgcG9zc2libGUgdG8gdXBkYXRlIGEgc2luZ2xlIHByb3BlcnR5IGluIHNvbWUgY2FzZXMsIGl0IGRvZXNuJ3QgYWxsb3cgcmV1c2Ugb2YgYWxyZWFkeS13b3JraW5nIGNvZGUuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmlld01vZGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0bXBbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0bXBbYmluZF0gPSB2YWx1ZSwgdG1wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudmFsdWUgPSB0bXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnZpZXdNb2RlbFtiaW5kXTtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXMudmlld01vZGVsW2JpbmRdID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JpdGVWYWx1ZSh0YXJnZXQsIHdyaXRlVG9Qcm9wZXJ0eSwgdGhpc0FyZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24gdG8gYmUgZmxleGlibGUsIGJlY2F1c2UgaWYgdGFyZ2V0IGlzIGEgdmFsdWUgdHlwZSBvciBpbW11dGFibGUsIHdyaXRpbmdcbiAgICAgICAgICAgIC8vIGl0IGRpcmVjdGx5IHJlcGxhY2VzIG9ubHkgdGhlIHZhbHVlIHdpdGhvdXQgdXBkYXRpbmcgdGhlIG1vZGVsLlxuICAgICAgICAgICAgd3JpdGVUb1Byb3BlcnR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIHRoZSBtb2RlbCBwYXNzZWQgaW4sIG9yIHRoZSB2aWV3IG1vZGVsIGlmIG5vbmUgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIG9ic2VydmUobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKElPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG1vZGVsKSkge1xuICAgICAgICAgICAgbW9kZWwuc3Vic2NyaWJlKHRoaXMucmVuZGVyLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIGFsbCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgZm91bmQgaW4gdGhlIG1vZGVsIHBhc3NlZCBpbixcbiAgICAgKiBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi4gVGhpcyBvbmx5IGdvZXMgb25lIGxldmVsIGRlZXAsIHNvIGl0XG4gICAgICogd29uJ3QgcGljayB1cCBuZXN0ZWQgb2JqZWN0cywgYnV0IGl0J3MgcHJvYmFibHkgZ29vZCBlbm91Z2ggaW4gNjAlIG9mIGNhc2VzLlxuICAgICAqL1xuICAgIG9ic2VydmVBbGwobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsKTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1vZGVsKSkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsW21dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgaWYgKHRoaXMuX2RlZmVyICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5ib29sKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGJvb2xlYW4gYXR0cmlidXRlcywgdGhlIHZlcnkgZXhpc3RlbmNlIG9mIHRoZSBhdHRyaWJ1dGUgbWVhbnMgaXQgaXMgY29uc2lkZXJlZCB0byBiZSB0cnVlLlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUoaXRlbS5zb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGl0ZW0uYXR0cmlidXRlLCB2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdGhpcy5fZ2V0U3RyaW5nVmFsdWUoaXRlbS5zb3VyY2UpIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdmFsdWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIC8vIENhbGxzIHNldEZvcm1GaWVsZFZhbHVlIGJlaGluZCB0aGUgc2NlbmVzLlxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZSh0aGlzLl92YWx1ZUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZSh0aGlzLl9jc3NDbGFzc2VzKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcykge1xuICAgICAgICAgICAgLy8gSWYgdHJ1dGh5LCBhZGQgY2xhc3MsIGVsc2UgZGVsZXRlIGl0LlxuICAgICAgICAgICAgbGV0IHZhbCA9ICEhdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0uY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NTdHlsZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzU3R5bGUpIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLmNvbnRlbnQuc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIHN0eWxlIHRleHQgaW4gY29tcG9uZW50OiAke3ZhbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICAgICAgY29uc3QgaXRlcmFibGUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fbG9vcC5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGl0ZXJhYmxlICYmIHR5cGVvZiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNDb250ZW50ID0gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgaXRlcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuX2xvb3AuZnJhZ21lbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBcyBzb29uIGFzIHdlIGFkZCB0aGUgY2xvbmUgdG8gY29udGVudCwgY2hpbGROb2RlcyBsb3NlcyByZWZlcmVuY2UgdG8gaXRzIGNoaWxkIG5vZGVzLCBzbyBjb3B5IGl0LlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IEFycmF5LmZyb20oY2xvbmUuY2hpbGROb2Rlcykuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3AucG9zdFByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9vcFBvc3RQcm9jZXNzKHJvdywgbm9kZXMsIGl0ZXJhYmxlLCBwcmV2aW91c0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5KSB7XG4gICAgICAgICAgICAvLyBJZiBmYWxzeSwgc2V0IGRpc3BsYXk6IG5vbmUgKHNhdmluZyBwcmV2aW91cyB2YWx1ZSkuIElmIHRydXRoeSwgcmVzdG9yZSBwcmV2aW91cyB2YWx1ZSAoaWYgYmxvY2ssIGZsZXgsIGJ1dCBub3QgaWYgbm9uZSlcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fY3NzRGlzcGxheS5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nzc0Rpc3BsYXkubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNDc3NEaXNwbGF5U2V0dGluZyA9IHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZVRleHQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGVtcGxhdGVUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBpbiB0aGUgY29uc3RydWN0b3IuIFRoZSB1cGRhdGUgcGFyYW0gc2hvdWxkIG5vdCBiZSBzZXQuXG4gICAgICAgIGlmICh1cGRhdGUgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSBzaG91bGQgbm90IGJlIHRydWUgd2hlbiBjYWxsZWQgaW50ZXJuYWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSBjcmVhdGluZyBhbiBlbGVtZW50IHRoYXQncyBub3Qgb24gdGhlIHBhZ2UsIHdlIHByb2JhYmx5IGNvdWxkIGF2b2lkIHVzaW5nIGEgZnJhZ21lbnQsXG4gICAgICAgIC8vIGJ1dCB0aGlzIGlzIHdoYXQgZnJhZ21lbnRzIGFyZSBmb3IuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MVGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGVUZXh0O1xuICAgICAgICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgdXNlZCB0byByZXBsYWNlIHRoZSBleGlzdGluZyB0ZW1wbGF0ZSwgd2UgbmVlZCB0byB3aXBlIG91dCB0aGUgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICAvLyBXb3JraW5nIG9uIGEgY2xvbmUgaGVyZSwgc28gd2UgZG9uJ3Qgc2VlIHRoZSBib2R5IGJlaW5nIGJ1aWx0IHN0ZXAgYnkgc3RlcCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ktdicpKSB7XG4gICAgICAgICAgICAvLyBJZiBuYW1lIGlzIHNwZWNpZmllZCwgY29tcG9uZW50IE1VU1QgYmUgc3BlY2lmaWVkLiBUaGUgc2FtZSBpZiBjb21wb25lbnQgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgaWYgKHRoaXMuX25hbWUgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICE9PSB0aGlzLl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgc2FtZSBpZiBjb21wb25lbnQgaXMgc3BlY2lmaWVkLiBSZXF1aXJlcyByZXBlYXRpbmcgYmVjYXVzZSB0aGlzIHBhcnQgYnJlYWtzIHdoZW4gbWluaWZpZWRcbiAgICAgICAgICAgIGlmIChyZXBsLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICE9PSB0aGlzLl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub2VzY2FwZSA9IHJlcGwuaGFzQXR0cmlidXRlKCdub2VzY2FwZScpICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdub2VzY2FwZScpICE9PSAnZmFsc2UnO1xuICAgICAgICAgICAgdGhpcy5fcmVwbGFjZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHJlcGwsXG4gICAgICAgICAgICAgICAgc291cmNlOiByZXBsLmlubmVySFRNTCxcbiAgICAgICAgICAgICAgICBub2VzY2FwZTogbm9lc2NhcGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluIHRoZSBvcmlnaW5hbCBidWlsZCBvZiB0aGUgb2JqZWN0LCBmIGFueSByZXBsYWNlbWVudHMgc3RhcnQgd2l0aCBcInRoaXMuXCIgd2UgbmVlZCB0byBkZWZlci5cbiAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCAmJiAhdGhpcy5fZGVmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgISF0aGlzLl9yZXBsYWNlbWVudHMuZmluZChmID0+IGYuc291cmNlLnN0YXJ0c1dpdGgoXCJ0aGlzLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2VlIGlmIHdlIG5lZWQgdG8gZGVmZXIgcmVuZGVyaW5nIHVudGlsIGFmdGVyIGluaXRpYWxpemF0aW9uLlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyB3aWxsIGxlYWQgdG8gYSBGT1VDLCBtYXliZSBtaWxsaXNlY29uZHMsIG1heWJlIGxvbmdlci5cbiAgICAgICAgaWYgKCF0aGlzLl9kZWZlciB8fCB0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGUgY29tcGxldGVkIHZhbHVlcyBiZWZvcmUgYWRkaW5nIHRvIHRoZSB2aXNpYmxlIHBhZ2UuIFRoaXMgaXMgc2xpZ2h0bHkgcmVkdW5kYW50LCBiZWNhdXNlIHRoaXMgaGFwcGVucyBpbiB0aGUgcmVuZGVyKClcbiAgICAgICAgICAgIC8vIHN0ZXAsIGJ1dCBJIGhhdGUgaXQgd2hlbiBJIHNlZSBhIGZsYXNoIG9mIHVucmVwbGFjZWQgY29udGVudCBvbiBzaXRlcy5cbiAgICAgICAgICAgIC8vIFRoZSByZWFzb24gdGhpcyB3b3JrcyBpcyBiZWNhdXNlIF9yZXBsYWNlbWVudHMgcmVmZXJlbmNlcyBjbG9uZSwgd2hpY2ggaXNuJ3QgdmlzaWJsZSB1bnRpbCBhbG1vc3QgdGhlIGxhc3QgbGluZS5cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUh0bWxSZXBsYWNlbWVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQb3B1bGF0ZSB0aGUgZnJvbnQtZW5kIHRleHQuIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgdGhpbmcgdG8gcmVwbGFjZS4gT3RoZXJ3aXNlLCB5b3UncmUganVzdCB3aXBpbmcgb3V0IHBlcmZlY3RseVxuICAgICAgICAvLyB2YWxpZCBIVE1MNSByZWZlcmVuY2VzIGZvciBubyByZWFzb24uXG4gICAgICAgIGlmICh0aGlzLl9yZXBsYWNlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvIGEgZnVsbCB1cGRhdGUgaWYgcmVxdWVzdGVkIHRvXG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEh0bWxUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdiBub2VzY2FwZT4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRUZXh0VGVtcGxhdGUodGVtcGxhdGVQcm9wZXJ0eSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VGVtcGxhdGUoJzxpLXY+JyArIHRlbXBsYXRlUHJvcGVydHkgKyAnPC9pLXY+JywgdXBkYXRlKTtcbiAgICB9XG4gICAgc2V0TG9vcChzb3VyY2UgPSAnLicsIGZyYWdtZW50LCBza2lwUG9zdFByb2Nlc3MgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWZyYWdtZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcmFnbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZyYWdtZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUZyYWdtZW50KGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb29wID0geyBzb3VyY2UsIHBvc3RQcm9jZXNzOiAhc2tpcFBvc3RQcm9jZXNzLCBmcmFnbWVudCB9O1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVMb29wKHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZhbHVlQXR0cmlidXRlKHNvdXJjZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVBdHRyaWJ1dGUgPSBzb3VyY2U7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZpc2liaWxpdHkoc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0Rpc3BsYXkgPSB7IHNvdXJjZSwgbmVnYXRpdmUgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRBdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogZmFsc2UsIG5lZ2F0aXZlOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRCb29sZWFuQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmluZChmID0+IGYuYXR0cmlidXRlID09PSBhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKHsgYXR0cmlidXRlLCBzb3VyY2UsIGJvb2w6IHRydWUsIG5lZ2F0aXZlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maWx0ZXIoZiA9PiBmLmF0dHJpYnV0ZSAhPT0gYXR0cmlidXRlKTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENzc0NsYXNzKGNscyA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NlcyA9IGNscztcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzU3R5bGUoc3R5bGUgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nzc1N0eWxlID0gc3R5bGU7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENzc0NsYXNzU3dpdGNoKGNscywgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscyB8fCAhc291cmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbmQoZiA9PiBmLmNsYXNzID09PSBjbHMpKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLnB1c2goeyBjbGFzczogY2xzLCBzb3VyY2UsIG5lZ2F0aXZlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUNzc0NsYXNzU3dpdGNoKGNscywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFjbHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5maWx0ZXIoZiA9PiBmLmNsYXNzICE9PSBjbHMpO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMud3JpdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRXcml0ZVRhcmdldCh0YXJnZXQgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX3dyaXRlVGFyZ2V0cy5maW5kKGYgPT4gZiA9PT0gdGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVXcml0ZVRhcmdldCh0YXJnZXQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX3dyaXRlVGFyZ2V0cy5maWx0ZXIoZiA9PiBmICE9PSB0YXJnZXQpO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEF1dG8tSW5qZWN0IGNhbGxzIHRoZSBkZWZhdWx0IGluamVjdEJpbmQoKSBvbiB0aGUgZGVmYXVsdCBCb3VuZENvbXBvbmVudCBjbGFzcywgd2l0aCBubyBvcHRpb25zIGV4Y2VwdCBzZWxlY3Rvci5cbiAgICAgKiBJZiB5b3UgcGFzcyBubyBpbnB1dHMsIGl0IHNlZWtzIG91dCBhbGwgY2hpbGQgZWxlbWVudHMgdGhhdCBoYXZlIGF0IGxlYXN0IG9uZSBpY2hpZ28gY3VzdG9tIHByb3BlcnR5LiBLZWVwIGluIG1pbmRcbiAgICAgKiB0aGF0IHdoZW4geW91IGhhdmUgbmVzdGVkIG9iamVjdHMsIHRoaXMgd2lsbCB1c3VhbGx5IG1lYW4gc29tZXRoaW5nIHdpbGwgYmxvdyB1cCBiZWNhdXNlIHlvdSB0cmllZCB0byBiaW5kIGFuIGVsZW1lbnRcbiAgICAgKiB0d2ljZS4gSXQgYWxzbyB3aWxsIHBlcmZvcm0gbXVjaCB3b3JzZS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIGEgc2VsZWN0b3IsIGl0IGFjdHMgdGhlIHNhbWUgYXMgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCgpIHdpdGggdGhhdCBzZWxlY3Rvci5cbiAgICAgKlxuICAgICAqIEluIG15IGV4cGVyaWVuY2UsIHRoaXMgaXMgYWxtb3N0IGNvbXBsZXRlbHkgdXNlbGVzcy4gRWl0aGVyIHRoZSBsYWNrIG9mIG9wdGlvbnMgYnJlYWtzIGl0IChwcmV0dHkgdXNlbGVzcyBpZiB5b3UgY2FuJ3RcbiAgICAgKiBvYnNlcnZlIGFuIG9ic2VydmFibGUpIG9yIHRoZSBzaW1wbGUgYWN0IG9mIGJpbmRpbmcgYnJlYWtzIHN0dWZmLlxuICAgICAqL1xuICAgIGF1dG9JbmplY3Qoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKHRoaXMudmlld01vZGVsLCBzZWxlY3RvciwgeyBwYXJlbnQ6IHRoaXMuY29udGVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZSBvZiB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnKicpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20oZS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJ2k1XycpIHx8IGF0dHIubmFtZS5zdGFydHNXaXRoKCc6JykgfHwgYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJ2RhdGEtaTVfJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQodGhpcy52aWV3TW9kZWwsIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHVuYmluZCBhIHZpZXcgZnJvbSBhbiBvYnNlcnZhYmxlLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cykge1xuICAgICAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBzb21ldGhpbmcgZWxzZSBhZnRlciB0aGUgbG9vcCBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICAgICAqL1xuICAgIGxvb3BQb3N0UHJvY2Vzcyhyb3csIGFkZGVkQ29udGVudCwgYWxsUm93cywgcHJldmlvdXNDb250ZW50KSB7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlc2NyaXB0IHBhcnQgb2YgdGhlIGZvbGxvd2luZyB3ZXJlIGltcG9ydGFudCwgdGhpcyB3b3VsZCBiZSBhIHByb2JsZW1cbiAgICAgICAgLy8gaWYgdGhpcyB3ZXJlIGEgZGVyaXZlZCBjbGFzcy5cbiAgICAgICAgY29uc3QgdGhpc2NsYXNzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbG9vcEl0ZW1DbGFzcy5pbmplY3RCaW5kKHJvdywgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChhZGRlZENvbnRlbnQsICdbaTVfaXRlbV0sIFtcXFxcMDAwMDNBaXRlbV0sIFtkYXRhLWk1X2l0ZW1dJyksIHtcbiAgICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgICAgICAgbG9vcFBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIGFzeW5jOiB0aGlzLl9hc3luY1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2dldFN0cmluZ1ZhbHVlKG5hbWUsIHNraXBFc2NhcGUgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZShuYW1lKTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBza2lwRXNjYXBlID8gdmFsdWUgOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0VW50eXBlZFZhbHVlKG5hbWUpIHtcbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgLy8gSSdtIHByZXR0eSBzdXJlIHRoaXMgaXMgYmVpbmcgdmFsaWRhdGVkIGR1cmluZyBjb25zdHJ1Y3Rpb24gYnV0IGJlIHNhZmVcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRoaXNBcmcgPSB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgLy8gSWYgVk0gaXMgYSBzdGF0ZSwgZ2V0IHRoZSBjdXJyZW50IHN0YXRlIHZhbHVlLlxuICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpc0FyZykpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoXCJ0aGlzLlwiKSkge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXM7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSg1KTtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpcykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXcuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnLicpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXNBcmcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXNBcmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHRoaXMuJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3TW9kZWwuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDT05TSURFUjogQ29uc2lkZXIgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIHRvIGFsbG93IGV4ZWN1dGluZyBtZXRob2Qgd2l0aCBzdHJpbmcgcGFyYW1ldGVycy4gaTVfcGFyYW0wMT1cInZhbCAxXCIsIGk1X3BhcmFtMDI9XCJ2YWwgMlwiXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmNhbGwodGhpc0FyZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2soc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3VwZGF0ZUh0bWxSZXBsYWNlbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiB0aGlzLl9yZXBsYWNlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUocmVwbC5zb3VyY2UsIHJlcGwubm9lc2NhcGUpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlcGwuZWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jb25maWd1cmVDb21wb25lbnRCaW5kaW5ncygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKHRoaXMuY29udGVudC5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgLmZpbHRlcihmID0+IGYudmFsdWUgfHwgZi5uYW1lID09PSAnaTVfaW5wdXQnIHx8IGYubmFtZSA9PT0gJzppbnB1dCcpXG4gICAgICAgICAgICAubWFwKG0gPT4gKHtcbiAgICAgICAgICAgIG5hbWU6IG0ubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBtLnZhbHVlIHx8ICcnXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gVGVjaG5pY2FsbHkgaXQncyBpbnZhbGlkIHRvIGFkZCBjdXN0b20gYXR0cmlidXRlcyB0byByZWd1bGFyIGVsZW1lbnRzLCBzbyB0ZWNobmljYWxseSA8cmVwbGFjZS1tZSA6c3dpdGNoOnJlZHRleHQ9XCJ3YXJuaW5nXCI+XG4gICAgICAgIC8vIGlzIGxlZ2FsIGJ1dCBpZiBpZiBpdCB3ZXJlIGEgZGl2LCB0aGF0IHdvdWxkIGJlIGlsbGVnYWwuIFNvIHdlJ2xsIGFsbG93IDxkaXYgZGF0YS1pNV9zd2l0Y2hfcmVkdGV4dD1cIndhcm5pbmdcIj4uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGUgd2VpcmQgbmFtZSBoYW5kbGluZyBvZiBkYXRhIGF0dHJpYnV0ZXMgY291bGQgYnJlYWsgeW91ciBjb2RlIGlmIHlvdSB0cnkgdG8gdXNlIHRoaXMuIFlvdSBtYXkgbmVlZCB0byBkbyBleHRyYVxuICAgICAgICAvLyB3b3JrIHRvIG1ha2UgeW91ciBjb2RlIHdvcmssIGFsbCBpbiB0aGUgbmFtZSBvZiBzdHJpY3QgYWRoZXJlbmNlIHRvIHN0YW5kYXJkcy4gSXQncyB1cCB0byB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLmNvbnRlbnQuZGF0YXNldCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb250ZW50LmRhdGFzZXRbYXR0cl07XG4gICAgICAgICAgICBpZiAodmFsdWUgfHwgYXR0ciA9PT0gJ2k1X2lucHV0Jykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBdHRyaWJ1dGVzLnB1c2goeyBuYW1lOiBhdHRyLCB2YWx1ZTogdmFsdWUgfHwgJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRleHRIdG1sU2V0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBjdXJyZW50QXR0cmlidXRlcykge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuX3BhcnNlQXR0cmlidXRlTmFtZShwcm9wLm5hbWUpO1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBSZWd1bGFyIGF0dHJpYnV0ZXMgd2lsbCBhbGwgbWF0Y2ggdGhpcy5cbiAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0eXBlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gdGhpcy5fbmFtZSB8fCBwcm9wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbE5lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCb29sZWFuQXR0cmlidXRlTWFwcGluZyh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhdHRyXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzd2l0Y2hDbGFzc05lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ3NzQ2xhc3NTd2l0Y2godHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dEh0bWxTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldCBpNV90ZXh0IGFuZCBpNV9odG1sIGF0IHNhbWUgdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0SHRtbFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBgPGktdj4ke3Byb3AudmFsdWV9PC9pLXY+YDsgLy8gVXNlIHRoaXMgYXMgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXYgbm9lc2NhcGU+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpZk5lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDc3NTdHlsZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDc3NDbGFzcyhwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXcml0ZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIGZhbGwgdGhyb3VnaCwgdXNpbmcgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBhdHRyaWJ1dGUgYXMgYSB0YXJnZXQgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdHRyaWJ1dGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwidGFyZ2V0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVUYXJnZXQocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvb3BcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gR3JhYiB0aGUgYmFzZSBjb250ZW50IGZvciB0aGUgbG9vcCwgcHVsbGluZyBpdCBvdXQgb2YgdGhlIERPTS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb29wKHByb3AudmFsdWUsIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpLCB0eXBlLmRldGFpbCA9PT0gJ251bGwnKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHVzZWQgYXMgYSBzZWxlY3Rvci4gSGFzIG5vIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkIEljaGlnbyBhdHRyaWJ1dGU6IFwiICsgdHlwZS50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmVySWZOZWVkZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmZXIgPSB0aGlzLl9kZWZlciB8fCBwcm9wLnZhbHVlLnN0YXJ0c1dpdGgoJ3RoaXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3BhcnNlQXR0cmlidXRlTmFtZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgICAgLy8gR2VuZXJhbCBpY2hpZ28gc2hvcnRjdXRcbiAgICAgICAgICAgIG5hbWUgPSAnaTVfJyArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X2l0ZW0nKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgdG8gaW5kaWNhdGUgYW4gaXRlbSBjb21wb25lbnQsIG5vdGhpbmcgZWxzZS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnaTVfZXZlbnQnKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgb25seSBpbiBDb21wb25lbnQuYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmFtZS5zdGFydHNXaXRoKCdpNV8nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2F0dHInKSkge1xuICAgICAgICAgICAgaWYgKG5hbWVbN10gIT09ICc6JyAmJiBuYW1lWzddICE9PSAnXycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdhdHRyJywgZGV0YWlsOiBuYW1lLnNsaWNlKDgpIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9ib29sJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbN10gIT09ICc6JyAmJiBuYW1lWzddICE9PSAnXycgJiYgbmFtZVs3XSAhPT0gJy0nICYmIG5hbWVbN10gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzddID09PSAnLScgfHwgbmFtZVs3XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDcpICsgbmFtZS5zbGljZSg4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5kaW5nIGF0dHJpYnV0ZSBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnYm9vbE5lZ2F0aXZlJyA6ICdib29sJywgZGV0YWlsOiBuYW1lLnNsaWNlKDgpIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9zd2l0Y2gnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZVs5XSAhPT0gJzonICYmIG5hbWVbOV0gIT09ICdfJyAmJiBuYW1lWzldICE9PSAnLScgJiYgbmFtZVs5XSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3aXRjaCBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVbOV0gPT09ICctJyB8fCBuYW1lWzldID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgOSkgKyBuYW1lLnNsaWNlKDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDExKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2xhc3Mgc3dpdGNoIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdzd2l0Y2hDbGFzc05lZ2F0aXZlJyA6ICdzd2l0Y2hDbGFzcycsIGRldGFpbDogbmFtZS5zbGljZSgxMCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2lmJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWUuc2xpY2UoLTEpID09PSAnLScgfHwgbmFtZS5zbGljZSgtMSkgPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2lmTmVnYXRpdmUnIDogJ2lmJyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfbG9vcCcpKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2k1X2xvb3A6bnVsbCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbG9vcCcsIGRldGFpbDogJ251bGwnIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbG9vcCcgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X3RhcmdldCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHsgdHlwZTogJ3RhcmdldCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pbnB1dCcpKSB7XG4gICAgICAgICAgICBjb25zdCB0d29XYXkgPSBuYW1lLmVuZHNXaXRoKCdfdmFsdWUnKSB8fCBuYW1lLmVuZHNXaXRoKCc6Jyk7XG4gICAgICAgICAgICByZXR1cm4gKHsgdHlwZTogJ2lucHV0JywgZGV0YWlsOiB0d29XYXkgPyAnMndheScgOiAnJyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0eXBlOiBuYW1lLnNsaWNlKDMpIH07XG4gICAgfVxufVxuZXhwb3J0cy5Cb3VuZENvbXBvbmVudCA9IEJvdW5kQ29tcG9uZW50O1xuLy8gVXNlIGEgY3VzdG9tIGVsZW1lbnQgdG8gY3JlYXRlIGEgcmVwbGFjZW1lbnQgdGFnIHRoYXQgaXMgbm90IGxpbWl0ZWQsIGFzIHNwYW4gaXMsIHRvIGNvbnRhaW5pbmcgbm8gYmxvY2sgZWxlbWVudHMuXG4vLyBObyBsb2dpYywgbm8gc3BlY2lhbCBkaXNwbGF5IGRldGFpbHMuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbmNsYXNzIFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5leHBvcnRzLlRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSA9IFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEZvcm1GaWVsZFZhbHVlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Gb3JtRmllbGRWYWx1ZVwiKTtcbmNvbnN0IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xID0gcmVxdWlyZShcIi4uL0h0bWwvUXVlcnlTZWxlY3Rvck5vZGVMaXN0XCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgR2V0VW5pcXVlSWRfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuLyoqXG4gKiBBIGNsYXNzIHdpdGggYSBjb250ZW50IHByb3BlcnR5IHRoYXQgcG9pbnRzIHRvIHNvbWV0aGluZyBvbiB0aGUgcGFnZSwgYWxvbmcgd2l0aCBzb21lIG9mIGhlbHBlciBtZXRob2RzLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBhcyBhIGJhc2UgY2xhc3MgZm9yIG90aGVyIGNsYXNzZXMsIHNvIGl0J3MgbWFya2VkIGFic3RyYWN0LiBJdCBqdXN0IGRvZXNuJ3RcbiAqIG1ha2Ugc2Vuc2UgdG8gbWUgdG8gY3JlYXRlIENvbXBvbmVudCB3aXRoIG5vdGhpbmcgY3VzdG9taXplZC4gSnVzdCBjcmVhdGUgYW4gSFRNTEVsZW1lbnQuIFRoZSBoZWxwZXJzIGFyZW4ndCByZWFsbHlcbiAqIHRoYXQgaW1wcmVzc2l2ZSwgd2hlbiB5b3UgY29uc2lkZXIgdGhhdCB0aGUgdHJhZGVvZmYgaXMgaGF2aW5nIHRvIHJlZmVyZW5jZSBvYmouY29udGVudCB0byBtb2RpZnkgdGhlIERPTS5cbiAqL1xuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCB1bmRlcnN0YW5kIHRoYXQgdGhpcy5jb250ZW50IGlzIHNldCBpbiBBTEwgb2YgdGhlIHByaXZhdGUgY3RvciBmdW5jdGlvbnMuXG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIGlmIChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgX2N0b3Jfc3RyaW5nLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncyAmJiBhcmdzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKGFyZ3MucHJvcGVydGllcyB8fCB7fSwgeyBpbm5lckhUTUw6IGFyZ3MuaW5uZXJIdG1sIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfbG9va3VwLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWFyZ3MpIHtcbiAgICAgICAgICAgIF9jdG9yX2VtcHR5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5lbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKGFyZ3MucHJvcGVydGllcyB8fCB7fSwgeyBpbm5lckhUTUw6IGFyZ3MuaW5uZXJIdG1sIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2N0b3JfaW5uZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hlY2tJbmxpbmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAvLyBBbmd1bGFyIG1hdGVyaWFsIGRvZXMgc29tZXRoaW5nIGxpa2UgdGhpcy4gSW4gdGhpcyBjYXNlLCB0aGVyZSdzIG5vIGZ1bmN0aW9uYWxpdHkgYmVoaW5kIGl0LCBidXQgaXQgZG9lcyBtYWtlIGl0XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgYSBkZXZlbG9wZXIgdG8gc2VlIHRoYXQgYW4gZWxlbWVudCBpcyBhIGNvbXBvbmVudCBhbmQgd2hhdCB0eXBlIGl0IGlzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc25ha2VfY2FzZSA9ICdpdl8nICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKDEpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKShbYS16XSkvZywgXCIkMSAkMiQzXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9cXEIoPz1bQS1aXXsyLH0pLylcbiAgICAgICAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuam9pbignXycpXG4gICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKHNuYWtlX2Nhc2UsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29tcG9uZW50IGhhcyBzb21lIHdlaXJkIG5hbWUsIG5vIHByb2JsZW0uIFRoaXMgaXMganVzdCBhbiBpbmZvIGZpZWxkIGFueXdheS5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcENvbXBvbmVudCgpO1xuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9lbXB0eSgpIHtcbiAgICAgICAgICAgIC8vIE5vIGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBmaW5lIGFzIGxvbmcgYXMgVEVsZW1lbnQgaXMgRElWLiBObyB3YXkgdG8gdmVyaWZ5IHRoYXQgYXMgaXQncyBhIHR5cGVzY3JpcHQgaWxsdXNpb24uIEpTIGRvZXNuJ3Qgc2VlIHR5cGUgcGFyYW1ldGVycy5cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9sb29rdXAoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgZXhpc3RpbmdFbGVtZW50LlxuICAgICAgICAgICAgLy8gVGhlIG1haW4gcmVhc29uIGl0IGV4aXN0cyBpcyB0aGF0IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIGRvZXNuJ3QgcmV0dXJuIHRoZSBjb3JyZWN0IHR5cGUgKGl0J3Mgbm90IGdlbmVyaWMpLFxuICAgICAgICAgICAgLy8gc28gdHlwZXNjcmlwdCBmcmVha3Mgb3V0IGFuZCB0aGlua3MgaXQgc2hvdWxkIGJlIGEgU1RSSU5HLCBpbiBzcGl0ZSBvZiB0aGUgdHlwZSBkZWZpbml0aW9uIG5vdCBiZWluZyBhbnl0aGluZ1xuICAgICAgICAgICAgLy8gbGlrZSB0aGF0LiBJdCdzIGp1c3QgZWFzaWVyIHRvIHVzZSB0aGlzIHRoYW4gdG8gcmVtZW1iZXIgXCJvaCwgcmlnaHQsIGkgaGF2ZSB0byB1c2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpLCB3aGljaCBpcyBnZW5lcmljXCIuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gKGV4aXN0aW5nRWxlbWVudC5wYXJlbnQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3IoZXhpc3RpbmdFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBzZWxlY3RvciBjb3VsZCBub3QgZmluZCBlbGVtZW50LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBpcyBuYXN0eSBidXQgaXQgbWFrZXMgVHlwZVNjcmlwdCBoYXBweSB3aXRob3V0IGNyZWF0aW5nIGEgbmV3IG9iamVjdCBjb3B5XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBfY3Rvcl9leGlzdGluZ0VsZW1lbnQuY2FsbCh0aGlzLCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2V4aXN0aW5nRWxlbWVudChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGV4aXN0aW5nRWxlbWVudC5lbGVtZW50O1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudCwgZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2lubmVySHRtbChuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBOZXcgZWxlbWVudC4gVXNlciBzcGVjaWZpZXMgdGhlIGlubmVyIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBhbiBlbXB0eSBvYmplY3QgbGlrZSB7fSwgcHJhY3RpY2FsbHkgdGhlIHNhbWUgYXMgY2FsbGluZyBpdCB3aXRoIG5vIGFyZ3NcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0geyBpbm5lckhUTUw6IG5ld0VsZW1lbnQuaW5uZXJIdG1sIHx8ICcnIH07XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudC50eXBlIHx8IEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHByb3BzLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29udGVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9vdXRlckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gVXNlciBzcGVjaWZpZXMgdGhlIGZ1bGwgSFRNTCBmb3IgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgaXQgY2FuJ3QgYmUgdHlwZSBjaGVja2VkLiBKUyBjYW4ndCBzZWUgd2hhdCBURWxlbWVudCBpcy5cbiAgICAgICAgICAgIGNvbnN0IHRtcGRpdiA9IENyZWF0ZUVsZW1lbnRfMS5kaXYobmV3RWxlbWVudC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXBkaXYuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdG1wZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5ld0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShhdHRyLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIG5ld0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTcGVjaWZpZWQgSUQgdGFrZXMgcHJlY2VkZW5jZVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX3N0cmluZyhuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTdHJpbmcgYnkgaXRzZWxmIGlzIGEgc2hvcnRjdXQgZm9yIG91dGVySHRtbFxuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgeyBvdXRlckh0bWw6IG5ld0VsZW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgdG8gY29udmVydCBlbGVtZW50cyB0byBjb21wb25lbnRzLiBJdCdzIG1vc3QgdXNlZnVsIGZvciBjdXN0b20gdGFncywgZm9yIGV4YW1wbGUsIDxteS1jb21wb25lbnQ+PC9teS1jb21wb25lbnQ+LlxuICAgICAqIEl0IHdpbGwgYmVjb21lIDxkaXYgaWQ9XCJmb29cIj5XaGF0ZXZlciB0aGUgY29tcG9uZW50IGNvbnRlbnQgaXM8L2Rpdj4uXG4gICAgICpcbiAgICAgKiBJdCBkb2Vzbid0IGhhdmUgdG8gYmUgYSBjdXN0b20gdGFnLiBJdCBjb3VsZCBiZSBhIGNsYXNzLCBsaWtlIDxwIGNsYXNzPSdiaW5kLXRvLW1vZGVsXCI+IChzZWxlY3Rvcj0nLmJpbmQtdG8tbW9kZWwnKVxuICAgICAqIG9yIDxwIGljaGlnbz4gKHNlbGVjdG9yPSdbaWNoaWdvXScpLlxuICAgICAqXG4gICAgICogVG8gY29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICBjb25zdCBuZXdDb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yIHx8IHRoaXM7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX2dldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VFbGVtZW50V2l0aENvbXBvbmVudChlbGVtZW50LCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZWxlbWVudCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIF9pbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSB0aGlzLl9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IsIG9wdGlvbnMucGFyZW50KTtcbiAgICAgICAgZm9yIChjb25zdCBjb250YWluZXIgb2YgY29udGFpbmVycykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIC8vIENhbid0IGhhdmUgZHVwZSBJRHMgYmVpbmcgY3JlYXRlZCBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY29udGFpbmVycy4gVGhlcmUgYXJlIDMgcGxhY2VzIHdoZXJlIElEIGNhbiBiZSBzZXQuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5pZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdwcm9wZXJ0aWVzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5wcm9wZXJ0aWVzLmlkOyAvLyBET00gcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2F0dHJpYnV0ZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHJpYnV0ZXMuaWQ7IC8vIEhUTUwgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlcGxhY2VyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY29udmVydGVyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIHN0YXRpYyBfbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRlbXB0cyB0byBwcmVzZXJ2ZSB0aGUgYXR0cmlidXRlcyBzZXQgb24gdGhlIHJlcGxhY2VkIGVsZW1lbnQuIFRoYXQgb3BlbnMgYW4gdWdseSBjYW4gb2Ygd29ybXMsXG4gICAgICAgIC8vIGJ1dCBpdCBzaG91bGQgbWFrZSByZXBsYWNlbWVudCBjb21wb25lbnRzIG1vcmUgdXNlZnVsIGJlY2F1c2UgaXQgYWxsb3dzIHRoZW0gdG8gdmFyeS5cbiAgICAgICAgLy8gSXQgZG9lcyBtYWtlIGEgYnJ1dGFsIGp1Z2dsaW5nIGFjdDpcbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGlubmVySFRNTCwgd2Ugd2FudCB0byB0YWtlIGl0LlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBpbm5lckhUTUwgc2hvdWxkIG92ZXJyaWRlIHRoZSBleGlzdGluZyBlbGVtZW50J3MuXG4gICAgICAgIC8vIElmIHRoZSBleGlzdGluZyBlbGVtZW50IGhhcyBhdHRyaWJ1dGVzLCB3ZSB3YW50IHRvIHRha2UgdGhlbS5cbiAgICAgICAgLy8gSWYgb3V0ZXJIVE1MIGlzIHByb3ZpZGVkLCB0aGUgb3V0ZXJIVE1MJ3MgYXR0cmlidXRlcyBzaG91bGQgb3ZlcnJpZGUgdGhlbS5cbiAgICAgICAgLy8gRm9yIGFueSBhdHRyaWJ1dGVzIHBhc3NlZCBpbiBPUFRJT05TLCB0aGV5IHNob3VsZCBvdmVycmlkZSBhbnl0aGluZyB0aGF0IGNhbWUgYmVmb3JlLlxuICAgICAgICAvLyBGb3IgYW55IHByb3BlcnRpZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIE9ubHkgdGhlIGxhc3QgMiBhcmUgaGFuZGxlZCBpbiB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yLiBBbmQgaWYgd2UncmUgbm90IGNhcmVmdWwsIHdlIGNvdWxkIGJyZWFrIHRoZW0uXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7IGlubmVySFRNTDogZXhpc3RpbmdFbGVtZW50LmlubmVySFRNTCB9O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgLy8gVGhpcyBpcyB1Z2x5IGJlY2F1c2UgaXQgaGFwcGVucyBhZ2FpbiBpbiB0aGUgY29uc3RydWN0b3IuIE5vIG90aGVyIGNsZWFuIHdheSB0byBwYXJzZSB0aGUgZWxlbWVudCBhdHRyaWJ1dGVzLCB0aG91Z2guXG4gICAgICAgIGlmIChvcHQub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG9wdC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXAuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wMiA9IHRtcC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIFRoZSBvdXRlciBIVE1MIGF0dHJpYnV0ZXMgZ2V0IHBpY2tlZCB1cCBhdXRvbWF0aWNhbGx5IHdoZW4gYWRkZWQgdG8gdGhlIERPTSwgc28gd2UgcmVhbGx5XG4gICAgICAgICAgICAvLyBqdXN0IG5lZWQgdG8gZGlzY2FyZCB0aGUgbWF0Y2hpbmcgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcyBvZiB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmlubmVySFRNTDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKHRtcDIuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNbYXR0ci5uYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIG9wdC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgb3B0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIG9wdC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9XG4gICAgc3RhdGljIF9nZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG9wdDtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgcmVwbGFjaW5nIHRoZSBvdXRlciBIVE1MXG4gICAgICAgICAgICBvcHQgPSB7IHJlcGxhY2U6IHRydWUsIG91dGVySHRtbDogb3B0aW9ucyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCBrbm93IHRoYXQgb3B0aW9ucyAhPT0gJ3N0cmluZycgKGNhbid0IHJlYWQgXCJlbHNlIGlmXCIgY2xhdXNlKVxuICAgICAgICAgICAgb3B0ID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnRXaXRoQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih7IGVsZW1lbnQ6IGV4aXN0aW5nRWxlbWVudCB9KTtcbiAgICB9XG4gICAgc3RhdGljIF9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJJ3ZlIGRvbmUgdGhpcyBteXNlbGYsIHdoaWNoIHJlc3VsdHMgaW4gYSBzaWxlbnQgZmFpbHVyZSBpZiBhY2NpZGVudGFsLlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5qZWN0aW9uIHNlbGVjdG9yIGlzIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnW2ljaGlnb10nO1xuICAgICAgICAvLyBMb29rIHVwIHRoZSBlbGVtZW50cyB0byBlaXRoZXIgcmVwbGFjZSBvciBjb252ZXJ0XG4gICAgICAgIGxldCBjb250YWluZXJzO1xuICAgICAgICBpZiAocGFyZW50ICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IHNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IFtzZWxlY3Rvcl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcnM7XG4gICAgfVxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5pZDtcbiAgICB9XG4gICAgc2V0IGlkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pZCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgaW5uZXJIVE1MKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmlubmVySFRNTDtcbiAgICB9XG4gICAgc2V0IGlubmVySFRNTCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgLy8gV2lsbCByZXR1cm4gdW5kZWZpbmVkIGlmIGNvbnRlbnQgaXMgbm90IGEgZm9ybSBmaWVsZCB0eXBlXG4gICAgICAgIHJldHVybiBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKHRoaXMuY29udGVudCk7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICAvLyBXaWxsIGxvZyBhIHdhcm5pbmcgaWYgY29udGVudCBpcyBub3QgYSBmb3JtIGZpZWxkIHR5cGVcbiAgICAgICAgRm9ybUZpZWxkVmFsdWVfMS5zZXRGb3JtRmllbGRWYWx1ZSh0aGlzLmNvbnRlbnQsIHZhbHVlKTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc05hbWU7XG4gICAgfVxuICAgIHNldCBjbGFzc05hbWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTmFtZSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgY2xhc3NMaXN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNsYXNzTGlzdDtcbiAgICB9XG4gICAgZ2V0IHN0eWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LnN0eWxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gSFRNTCBldmVudCBsaXN0ZW5lciBvbiB0aGUgQ29tcG9uZW50IGNvbnRlbnQuIEZsdWVudC5cbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggdGhlIEhUTUwgZm9yIGk1X2V2ZW50IG9yIDpldmVudCBhdHRyaWJ1dGVzIGFuZCBhZGQgZXZlbnQgbGlzdGVuZXJzIGFjY29yZGluZyB0byBpbmxpbmUgY3VzdG9tIGF0dHJpYnV0ZXMuXG4gICAgICogRmlsdGVyIGJ5IG1hdGNoaW5nIHRoZSBjb21wb25lbnRGaWx0ZXIgaW5wdXQgd2l0aCBhbiBhdHRyaWJ1dGUgbGlrZSBjb21wb25lbnQ9XCJjb21wb25lbnRGaWx0ZXJcIi5cbiAgICAgKiBFbmNsb3NlIHRoZSBldmVudCB0eXBlIGluIHBhcmVudGhlc2VzLCBhbmQgZm9yIHRoZSB2YWx1ZSwgZW50ZXIgdGhlIG5hbWUgb2YgYSBtZXRob2QgaW4gdGhpcyBjb21wb25lbnQuXG4gICAgICogRXhhbXBsZTogPGZvcm0gOmV2ZW50IChjbGljayk9XCJzdWJtaXRUaGVGb3JtXCI+PC9mb3JtPlxuICAgICAqIFRoaXMgaXMgYWxzbyBhbGxvd2VkOiA8Zm9ybSA6ZXZlbnQgX2NsaWNrXz1cInN1Ym1pdFRoZUZvcm1cIj48L2Zvcm0+XG4gICAgICovXG4gICAgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoY29tcG9uZW50RmlsdGVyKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgd2UgY291bGQgc2tpcCB0aGlzIGluaXRpYWwgZmlsdGVyLCBsaWtlIGFuZ3VsYXIgZG9lcy4gQnV0IHRoZXJlIGlzIG5vIENTUyBzZWxlY3RvciBmb3JcbiAgICAgICAgLy8gYXR0cmlidXRlIG5hbWUgYmVnaW5zIHdpdGggb3IgZW5kcyB3aXRoLiBbYXR0cl49XSBpcyBmb3IgdGhlIFZBTFVFIGJlZ2lubmluZyB3aXRoIHNvbWV0aGluZy5cbiAgICAgICAgLy8gVGhpcyBpbmNsdWRlcyB0aGUgY29udGVudCBpdHNlbGYgaW4gaXRzIGNoZWNrLlxuICAgICAgICBmb3IgKGNvbnN0IGVsZSBvZiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKFt0aGlzLmNvbnRlbnRdLCAnW2k1X2V2ZW50XSwgW1xcXFwwMDAwM0FldmVudF0sIFtkYXRhLWk1X2V2ZW50XScpKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50RmlsdGVyICYmIGVsZS5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICE9PSBjb21wb25lbnRGaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShlbGUuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBsZXQgZXZlbnREZWZpbml0aW9uID0gY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZS5zdGFydHNXaXRoKCcoJykgJiYgZi5uYW1lLmVuZHNXaXRoKCcpJykgJiYgZi5uYW1lLmxlbmd0aCA+IDIpO1xuICAgICAgICAgICAgaWYgKCFldmVudERlZmluaXRpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBUcnkgdG8gZmluZCBieSBhbHRlcm5hdGUgc3ludGF4LiBUaGlzIG9uZSB3b3JrcyBiZXR0ZXIgd2l0aCBzZXRBdHRyaWJ1dGUoKS5cbiAgICAgICAgICAgICAgICBldmVudERlZmluaXRpb24gPSBjdXJyZW50QXR0cmlidXRlcy5maW5kKGYgPT4gZi5uYW1lLnN0YXJ0c1dpdGgoJ18nKSAmJiBmLm5hbWUuZW5kc1dpdGgoJ18nKSAmJiBmLm5hbWUubGVuZ3RoID4gMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWV2ZW50RGVmaW5pdGlvbiB8fCAhZXZlbnREZWZpbml0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFdmVudCBkZWZpbml0aW9uIG5vdCBkZWNsYXJlZCBmb3IgZWxlbWVudCAke2VsZS5pZCB8fCBlbGUudGFnTmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXNbZXZlbnREZWZpbml0aW9uLnZhbHVlXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIYW5kbGVyIG1ldGhvZCBmb3IgZWxlbWVudCAke2VsZS5pZCB8fCBlbGUudGFnTmFtZX0gJHtldmVudERlZmluaXRpb24udmFsdWV9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudERlZmluaXRpb24ubmFtZS5zbGljZSgxLCAtMSksIG1ldGhvZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYXBwZW5kKG5ld0NoaWxkKSB7XG4gICAgICAgIGlmIChndWFyZChuZXdDaGlsZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZC5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRDaGlsZChuZXdDaGlsZCkge1xuICAgICAgICBpZiAoZ3VhcmQobmV3Q2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZFRvUGFyZW50KHBhcmVudCkge1xuICAgICAgICBpZiAoZ3VhcmQocGFyZW50KSkge1xuICAgICAgICAgICAgcGFyZW50LmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBjb21wb25lbnQgdG8gQ29tcG9uZW50TWFwLlxuICAgICAqL1xuICAgIG1hcENvbXBvbmVudCgpIHtcbiAgICAgICAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbnRlbnQgaGFzIGFscmVhZHkgYmVlbiByZWxhdGVkIHRvIGEgZGlmZmVyZW50IGNvbXBvbmVudFxuICAgICAgICBpZiAoQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50KHRoaXMuY29udGVudCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGVudCBhbHJlYWR5IHJlZmVyZW5jZWQgYnkgYSBjb21wb25lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5zZXQodGhpcy5jb250ZW50LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgY29tcG9uZW50IGZyb20gQ29tcG9uZW50TWFwLiBTb21ldGltZXMgeW91IG1pZ2h0IG5lZWQgdG8gdXNlIHRoaXMuIEJ1dCBob3BlZnVsbHkgcmFyZWx5LCBiZWNhdXNlIGl0J3MgdXNpbmcgYSBXZWFrTWFwLFxuICAgICAqL1xuICAgIHVubWFwQ29tcG9uZW50KCkge1xuICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5kZWxldGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgb2YgY29tcG9uZW50cyB0aGF0IGFyZSBuZXN0ZWQgaW5zaWRlIHRoaXMgY29tcG9uZW50LlxuICAgICAqL1xuICAgICpnZXRBbGxDaGlsZENvbXBvbmVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgZSBvZiB0aGlzLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnKicpKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQoZSk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgeWllbGQgY29tcG9uZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNldFN0eWxlKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnc3RyaW5nJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgLy8gVFMganVzdCBmb3Jnb3QgdGhhdCBwcm9wZXJ0eSBpcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LlxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHByb3BlcnR5W3Byb3BdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCB2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRDbGFzcyhjbGFzc05hbWVzKSB7XG4gICAgICAgIGlmICghY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSBcInN0cmluZ1wiICYmIGNsYXNzTmFtZXMuaW5jbHVkZXMoXCIgXCIpKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gY2xhc3NOYW1lcy5zcGxpdChcIiBcIikuZmlsdGVyKHEgPT4gcSAhPT0gXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBbY2xhc3NOYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCZWNhdXNlIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkgc2VhcmNoZXMgYWxsIHRoZSB3YXkgZG93biwgaW50byBuZXN0ZWQgY29tcG9uZW50cywgaXQgY2FuJ3QgYmUgY2FsbGVkXG4gICAgICogYnkgZGVmYXVsdC4gSXQganVzdCB0aHJvd3MgZXJyb3JzIG9uIGFsbCBidXQgc2ltcGxlIHRlc3QgY2FzZXMuIEJ1dCBiZWNhdXNlIHRoZXNlIGV2ZW50cyBhbG1vc3QgYWx3YXlzIGV4aXN0XG4gICAgICogaW50ZXJuYWwgdG8gdGhlIGNvbXBvbmVudCAoZS5nLiBvbiBidXR0b25zKSwgaXQgY2FuJ3QgYmUgbGltaXRlZC4gVGhpcyBjYW4gYmUgY29uZnVzaW5nIHdpdGhvdXQgc29tZSBraW5kIG9mXG4gICAgICogbWVzc2FnZS5cbiAgICAgKi9cbiAgICBfY2hlY2tJbmxpbmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbGUgb2YgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChbdGhpcy5jb250ZW50XSwgJ1tpNV9ldmVudF0sIFtcXFxcMDAwMDNBZXZlbnRdLCBbZGF0YS1pNV9ldmVudF0nKSkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuX19ldmVudF93YXJuaW5nX18pIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnSW5saW5lIGV2ZW50IGxpc3RlbmVycyBhcmUgY29uZmlndXJlZC4gUmVtZW1iZXIgdG8gY2FsbCBhZGRJbmxpbmVFdmVudExpc3RlbmVycygpLicpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlbGV0ZSB3aW5kb3cuX19ldmVudF93YXJuaW5nX18sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIHF1ZXN0aW9uIG5lZWRzIHRvIGJlIGFza2VkOiBpZiB5b3UgY2FuIGFkZCBhIGNvbXBvbmVudCB0byBhIHBhZ2UgYnkgZG9pbmcgZWxlbWVudC5hcHBlbmRDaGlsZChjb21wb25lbnQuY29udGVudCksXG4gKiBob3cgZG8geW91IGRvIGZyb20gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpIGFuZCBnZXQgdG8gY29tcG9uZW50LCBub3QgY29tcG9uZW50LmNvbnRlbnQ/IFRoaXMgaXMgaG93LlxuICpcbiAqIHZhciBjb21wb25lbnQgPSBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpKTtcbiAqXG4gKiBUaGlzIHdpbGwgd29yayBhcyBsb25nIGFzIENvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldChjb250ZW50LCBjb21wb25lbnQpIGhhcyBiZWVuIGNhbGxlZCBhdCBzb21lIHBvaW50LlxuICpcbiAqIFRoaXMgaXMgdGhlIGFwcHJvdmVkIHdheSBvZiBkb2luZyBpdC4gQW5vdGhlciBwb3NzaWJsZSBzb2x1dGlvbiB3b3VsZCBiZSB0aGUgdXNlIG9mIGV4cGFuZG8gcHJvcGVydGllcyxcbiAqIGZvciBleGFtcGxlIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKS5yZWxhdGVkQ29tcG9uZW50ID0gY29tcG9uZW50LiBUaGlzIHdvcmtzIGFuZCBpdCdzIHN1cGVyIHNpbXBsZSxcbiAqIGJ1dCBzZWVtcyB0byBiZSBmcm93bmVkIHVwb24gLi4uIGl0IGhhcyBiZWVuIGtub3duIHRvIGNyZWF0ZSBtZW1vcnkgbGVha3MgaW4gdGhlIHBhc3QuIFdlYWtNYXAgaXMgdGhlIG9iamVjdFxuICogc3BlY2lmaWNhbGx5IGNyZWF0ZWQgZm9yIHRoaXMgdXNlIGNhc2UsIHNvIHRoYXQgaXMgdXNlZCBoZXJlLlxuICpcbiAqIElmIGV4dGVuc2lvbiBtZXRob2RzIGFyZSBsb2FkZWQsIHlvdSBjYW4gdXNlIHRoZSBlbGVtZW50LmdldENvbXBvbmVudCgpIHNob3J0Y3V0LlxuICovXG5jbGFzcyBDb21wb25lbnRNYXAge1xufVxuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0cy5Db21wb25lbnRNYXAgPSBDb21wb25lbnRNYXA7XG5mdW5jdGlvbiBnZXRDb21wb25lbnQoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChlbGVtZW50KTtcbiAgICB9XG59XG5leHBvcnRzLmdldENvbXBvbmVudCA9IGdldENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Db21wb25lbnRCaW5kaW5nT3B0aW9ucyA9IENvbXBvbmVudEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBvcHQuZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zID0gRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG9wdC5zZWxlY3RvcjtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMgPSBFeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBJbm5lckh0bWxCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW5uZXJIdG1sQmluZGluZ09wdGlvbnMgPSBJbm5lckh0bWxCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgT3V0ZXJIdG1sQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5vdXRlckh0bWwgPSBvcHQub3V0ZXJIdG1sO1xuICAgIH1cbn1cbmV4cG9ydHMuT3V0ZXJIdG1sQmluZGluZ09wdGlvbnMgPSBPdXRlckh0bWxCaW5kaW5nT3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG5mdW5jdGlvbiBvYnNlcnZhYmxlQ2hlY2sob2JqKSB7XG4gICAgLy8gTm90IGFuIGV4aGF1c3RpdmUgdGVzdCBidXQgaXQncyB0aGUgaW1wb3J0YW50IGJpdC5cbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICdjaGFuZ2VIYW5kbGVyJyBpbiBvYmogJiYgb2JqLmNoYW5nZUhhbmRsZXIgaW5zdGFuY2VvZiBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXI7XG59XG5leHBvcnRzLm9ic2VydmFibGVDaGVjayA9IG9ic2VydmFibGVDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG4vKipcbiAqIENvbW1vbiBsb2dpYyBiZXR3ZWVuIHRoZSBkaWZmZXJlbnQgb2JzZXJ2YWJsZSBjbGFzc2VzLiBUaGVzZSBpbXBsZW1lbnQgSU9ic2VydmFibGUuIFRoZSBpbnZvY2F0aW9uIGl0c2VsZiB2YXJpZXMgZnJvbSBjbGFzcyB0byBjbGFzcy5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHsgbmFtZSwgZm9yd2FyZFRvLCBidWJibGVGcm9tLCBkaXNhYmxlQXN5bmMgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIoKTtcbiAgICAgICAgaWYgKGRpc2FibGVBc3luYykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9yd2FyZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWJibGVGcm9tKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhZ0RlbGVnYXRlKG5hbWUpO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gVHlwZXNjcmlwdCBoYXMgZm9yZ290dGVuIHRoYXQgRXZlbnRIYW5kbGVyIGNhbiBhY2NlcHQgYW4gYXJyYXkuXG4gICAgICAgIC8vIEluIHNwaXRlIGlmIHRoZSBmYWN0IHRoYXQgdGhpcyBzaWduYXR1cmUgaXMgaWRlbnRpY2FsLlxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGUgaW5wdXQncyBkZWxlZ2F0ZSB0byB0aGlzIG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbykge1xuICAgICAgICAvLyBKb2luIHRoZSBvdGhlciBldmVudCBoYW5kbGVyIHRvIHRoaXMsIHNvIHRoYXQgd2hlbiB0aGlzIGlzIGludm9rZWQsIHNvIGlzIHRoZSBvdGhlci5cbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoZm9yd2FyZFRvLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhpcyBvYmplY3QncyBkZWxlZ2F0ZSB0byB0aGUgaW5wdXQgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShidWJibGVGcm9tKSB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBldmVudHMgcmFpc2VkIG9uIHRoZSBvdGhlciBoYW5kbGVyLCBzbyB0aGF0IHdoZW4gdGhhdCBpcyBpbnZva2VkLCBzbyBpcyB0aGlzXG4gICAgICAgIC8vIFRoZSBzYW1lIGFzIGZvcndhcmRDaGFuZ2VFdmVudHNUbyBleGNlcHQgdGhhdCB0aGlzIGlzIHRoZSB0YXJnZXQsIG5vdCB0aGUgc291cmNlLlxuICAgICAgICBidWJibGVGcm9tLnN1YnNjcmliZSh0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlU2VuZGVyKHNlbmRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHByb2JhYmx5IGZyb3duZWQgdXBvbiAoc2VlIGhvdyBUUyBkb2Vzbid0IGxpa2UgaXQpLCBidXQgaXQncyB2YWxpZCBKUy5cbiAgICAgKiBJdCdzIG9ubHkgaW50ZW5kZWQgZm9yIHRyb3VibGVzaG9vdGluZywgbm90IHJlYWwgbG9naWMuIFRoZXJlIGFyZSB0aW1lcyB3aGVuIHlvdSdyZVxuICAgICAqIHRyeWluZyB0byBpZGVudGlmeSBleGFjdGx5IHdoaWNoIGRlbGVnYXRlcyBhcmUgc3Vic2NyaWJlZCwgYW5kIHRoaXMgaXMgcmVhbGx5IGhhcmQgd2hlblxuICAgICAqIG5vdGhpbmcgaGFzIGh1bWFuLXJlYWRhYmxlIG5hbWVzLlxuICAgICAqL1xuICAgIHRhZ0RlbGVnYXRlKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZS5fdGFnID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHggaW4gdGhpcykge1xuICAgICAgICAgICAgaWYgKHggIT09IFwiY2hhbmdlSGFuZGxlclwiICYmIHggIT09IFwicHJpdmF0ZVByb3BlcnR5MlwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3hdID0gdGhpc1t4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZUJhc2UgPSBPYnNlcnZhYmxlQmFzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBPYnNlcnZhYmxlUHJvcGVydHkgaXMgYSBwcm9wZXJ0eSB0aGF0IGF1dG9tYXRpY2FsbHkgcmFpc2VzIGEgUHJvcGVydHlDaGFuZ2VkIGV2ZW50IHdoZW4gaXQgaXMgbW9kaWZpZWQuIFRoaXMgaXMgbW9yZVxuICogY29udmVuaWVudCB0aGFuIGhhdmluZyB0byBkbyBpdCBtYW51YWxseSBldmVyeSB0aW1lIHlvdSBuZWVkIGl0LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlUHJvcGVydHkgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICcnO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gb3B0aW9ucy5vbmx5V2hlbkNoYW5nZWQgfHwgZmFsc2U7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5fdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlICYmIG9sZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ3NldCcsIHRoaXMucHJvcGVydHlOYW1lLCBvbGQsIHZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSAoaWYgYSBzdHJpbmcpIHRoYXQgaGFzIGhhZCBzcGVjaWFsIEhUTUwgY2hhcmFjdGVycyBlc2NhcGVkLlxuICAgICAqL1xuICAgIGdldCBzYWZlVmFsdWUoKSB7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVByb3BlcnR5ID0gT2JzZXJ2YWJsZVByb3BlcnR5O1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBsaWtlIHRoaXMgYmVjYXVzZSBpdCBzaG91bGQgYmUgY2hlY2tpbmcgaWYgdmFsdWUgaXMgYSBzZXR0ZXIsXG4gICAgLy8gYW5kIGl0IGlzbid0LCBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSB0byBjaGVjay5cbiAgICAvLyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKCkgZG9lc24ndCBjYXRjaCBpbmhlcml0ZWQgcHJvcGVydGllcywgb2ZcbiAgICAvLyB3aGljaCB0aGlzIGlzIGFsbW9zdCBhbHdheXMgb25lLlxuICAgIC8vIEkgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYSBiYXNpYyBpbnN0YW5jZSBjaGVjay5cbiAgICByZXR1cm4gb2JqICYmIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGVQcm9wZXJ0eTtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sgPSBvYnNlcnZhYmxlUHJvcGVydHlDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDbG9uZURlZXBfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBvYnNlcnZhYmxlIHN0YXRlIHRoYXQgc2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgdXNpbmcgdGhlIHJlbGV2YW50IG1ldGhvZHMsIGFsbG93aW5nIGF0b21pYyBjaGFuZ2VzIHRvIG11bHRpcGxlIHByb3BlcnRpZXNcbiAqIGluIG11bHRpcGxlIG9iamVjdHMsIHJhaXNpbmcgYSBzaW5nbGUgZXZlbnQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVTdGF0ZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICdzZXRTdGF0ZSc7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgLy8gSSB3b3VsZCBwcmVmZXIgdGhhdCB0aGlzIHJldHVybiBSZWFkb25seTxUPiBidXQgZ2V0dGVyIGFuZCBzZXR0ZXIgaGF2ZSB0byBiZSB0aGUgc2FtZSB0eXBlLlxuICAgICAgICAvLyBUaGF0IG1lYW5zIHlvdSB3b3VsZCBoYXZlIHRvIGNhc3QgYW55IHZhbHVlIHlvdSBzZXQgYXMgYSByZWFkb25seSwgd2hpY2ggaXMgYSBQSVRBLlxuICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcndyaXRlcyB0aGUgZW50aXJlIHZhbHVlLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0U2FmZVZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodG1wKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0bXApKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRtcCkpO1xuICAgIH1cbiAgICBnZXRWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgIH1cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHNldFN0YXRlKHZhbHVlLCBvdmVyV3JpdGVBbGwgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZTtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xuICAgICAgICAvLyBJZiB0aGUgdHlwZSBpcyBwcmltaXRpdmUsIHRoZW4gYSBmdWxsIG92ZXJ3cml0ZSBpcyBhbGxvd2VkXG4gICAgICAgIGlmIChJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgLy8gRnVuY3Rpb25zIHdpbGwgZXhlY3V0ZSBidXQgdGhleSB3b24ndCBjaGFuZ2UgdGhlIHZhbHVlLiBUaGUgcmVhc29uIGlzIHRoZSBzYW1lIHJlYXNvbiB0aGF0IHRoaXMgbWFrZXMgbm8gcGVybWFuZW50IGNoYW5nZSB0byBiYXI6XG4gICAgICAgICAgICAvLyB2YXIgZm9vID0gZnVuY3Rpb24oc3RyKSB7IHN0ciA9IHN0ci50b1VwcGVyQ2FzZSgpOyB9OyB2YXIgYmFyID0gJ2FiYyc7IGZvbyhiYXIpOyBjb25zb2xlLmxvZyhiYXIgPT09ICdhYmMnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHNldFN0YXRlIHdpdGggYSBmdW5jdGlvbiBpZiBzdGF0ZSBpcyBwcmltaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVyV3JpdGVBbGwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdmVyV3JpdGVBbGwpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjFfb3ZlcndyaXRlQWxsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgW25ld1ZhbHVlLCByZXR1cm5WYWx1ZV0gPSBfb3ZyM19mdW5jdGlvbkFyZy5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndmFsdWUgaXMgbm90IGEgcGFydGlhbCBzdGF0ZSBvciBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIyX3BhcnRpYWwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB7IG9sZFZhbHVlLCBuZXdWYWx1ZSwgcmV0dXJuVmFsdWUgfTtcbiAgICAgICAgZnVuY3Rpb24gX292cjFfb3ZlcndyaXRlQWxsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBlbnRpcmUgb2JqZWN0LlxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAoX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjJfcGFydGlhbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFBhcnRpYWwgb2JqZWN0OiBPdmVyd3JpdGUgb25seSB0aGUga2V5cyBwcm92aWRlZFxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0bXBba2V5XSA9IF92YWx1ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjNfZnVuY3Rpb25BcmcoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmdW5jdGlvbiBwcm92aWRlZCBhbmQgdXBkYXRlIHRoZSBvYmplY3QgYXMgZGljdGF0ZWRcbiAgICAgICAgICAgIC8vIE1heWJlIHVubmVjZXNzYXJ5IGJ1dCB3ZSB3YW50IHRvIGF2b2lkIHRoZSBjYWxsZXIgZXhmaWx0cmF0aW5nIHRoZSBzdGF0ZSB1c2luZyBhIGZ1bmN0aW9uLFxuICAgICAgICAgICAgLy8gYnkgYWNjaWRlbnQuIE9mIGNvdXJzZSwgdGhleSBjYW4ganVzdCBhY2Nlc3MgX3ZhbHVlIGJ5IGNhc3RpbmcgYXMgYW55LFxuICAgICAgICAgICAgLy8gYnV0IHRoYXQncyBub3QgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBfcmV0dXJuVmFsdWUgPSBfdmFsdWUuY2FsbCh0bXAsIHRtcCk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIFt0bXAsIF9yZXR1cm5WYWx1ZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVTdGF0ZSA9IE9ic2VydmFibGVTdGF0ZTtcbmZ1bmN0aW9uIG9ic2VydmFibGVTdGF0ZUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3Qga25vdyBpZiBJIHNob3VsZCBjaGVjayBmb3IgdGhpcyBvciBmb3IgZ2V0U3RhdGUoKSBhbmQgc2V0U3RhdGUoKVxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlU3RhdGVDaGVjayA9IG9ic2VydmFibGVTdGF0ZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgZGVmZXJyZWQgcHJvbWlzZSBpcyBhIHdyYXBwZXIgYXJvdW5kIGEgcHJvbWlzZSB0aGF0IGFsbG93cyBpdCB0byBiZSB0cmlnZ2VyZWQgbGF0ZXIuIEluIHB1cmUgSlMsIHRoaXMgaXMgaGFyZGVyXG4gKiB0aGFuIGl0IG5lZWRzIHRvIGJlLCBhbmQgaXQgdGFrZXMgYSB3ZWlyZCBoYWNrIHRvIG1ha2UgaXQgd29yay4gVGhpcyBjbGFzcyBpcyBsaXR0bGUgbW9yZSB0aGFuIGEgd3JhcHBlciBhcm91bmRcbiAqIHNhaWQgaGFjay5cbiAqXG4gKiBPdGhlcndpc2UsIHRoaXMgdXNlcyBhIHJlYWwgcHJvbWlzZSBpbnRlcm5hbGx5LCBzbyBhc2lkZSBmcm9tIHRoZSB3cmFwcGluZyBvYmplY3QsIGl0IGhhcyBubyBzcGVjaWFsIGxvZ2ljLiBJIGNob3NlXG4gKiBub3QgdG8gcmUtaW1wbGVtZW50IHRoZSBQcm9taXNlIEFQSSBzeW5jaHJvbm91c2x5LCBzbyBpdCB1c2VzIHRoZSBzYW1lIG1pY3JvdGFzayBxdWV1ZS5cbiAqXG4gKiBUaGUgd3JhcHBpbmcgQVBJIGlzIHR3ZWFrZWQgYSBsaXR0bGUgdG8gYXZvaWQgc29tZSBjb21tb24gcGl0ZmFsbHMgdGhhdCBhcmUgY2F1c2VkIGJ5IGZsYXdzIGluIHRoZSBQcm9taXNlXG4gKiBkZXNpZ24uIEZvciBleGFtcGxlLCBoYXZpbmcgb25mdWxmaWxsZWQgYW5kIG9ucmVqZWN0ZWQgaW4gdGhlIHNhbWUgc3RlcCBtZWFucyB0aGF0IGVycm9ycyBpbiB0aGUgZnVsZmlsbGVkXG4gKiBoYWxmIHdpbGwgbm90IGJlIGNhdWdodCBieSB0aGUgZXJyb3IgaGFuZGxlci4gIFJhdGhlciB0aGFuIHNheSBcImRvbid0IHVzZSB0aGF0IGlucHV0XCIgbGlrZSBtb3N0IGluc3RydWN0b3JzLFxuICogSSBqdXN0IGdvdCByaWQgb2YgaXQgKGl0J3Mgc3RpbGwgYWNjZXNzaWJsZSBvbiB0aGUgb3V0cHV0IHByb3BlcnR5LCBpZiB5b3Ugd2FudCB0byB1c2UgaXQgLi4uIGJ1dCBkb24ndCkuXG4gKi9cbmNsYXNzIERlZmVycmVkUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yO1xuICAgICAgICAvKiogVXNlIHRoaXMgdG8gaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlc29sdmUgPSBmdW5jdGlvbiBfZHVtbXkoKSB7IH07XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byByZWplY3QgdGhlIHByb21pc2UgcmlnaHQgb3V0LiBXaGljaCBpcyBwcm9iYWJseSB1c2VsZXNzIGJ1dCB5b3UgbmV2ZXIga25vdy4gKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5IFRTIGRvZXNuJ3Qga25vdyB0aGF0IHRoZSBwcm9wZXJ0aWVzIGFyZSByZXBsYWNlZCBpbiB0aGUgcHJvbWlzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgdGhpcy5yZWplY3QgPSBmdW5jdGlvbiBfZHVtbXkoKSB7IH07XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIHdlaXJkIGhhY2sgdGhhdCBpcyB0aGUgYmFzaXMgb2YgdGhpcyBjbGFzcy4gSXQncyBhIGNsb3N1cmUsIGJ1dCByZXZlcnNlZCwgYXMgdGhlXG4gICAgICAgIC8vIGVuY2xvc2VkIHByb3BlcnR5IGlzIGFuIGludGVybmFsIHJlZmVyZW5jZSBhY2Nlc3NlZCBvdXRzaWRlIHJhdGhlciB0aGFuIGFuIG91dHNpZGUgcmVmZXJlbmNlXG4gICAgICAgIC8vIGFjY2Vzc2VkIGluc2lkZS5cbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gX3Jlc29sdmU7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IF9yZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuXG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IgdG8gYWxsb3cgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgLy8gY29uc3Qgd2FpdGFibGUgPSBuZXcgRGVmZXJyZWRQcm9taXNlKCk7IGV2ZW50LnN1YnNjcmliZSh3YWl0YWJsZS5yZXNvbHZlKTsgY29uc3QgciA9IGF3YWl0IHdhaXRhYmxlLm91dHB1dDsgY29uc29sZS5sb2cocik7XG4gICAgICAgIC8vIElmIHlvdSBsZWF2ZSBvdXQgdGhlIGluaXRpYWwgY2FsbGJhY2ssIHlvdSdsbCBnZXQgdW5kZWZpbmVkIGluc3RlYWQgb2Ygd2hhdCB0aGUgZXZlbnQgc2VuZHMuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIGluIGFzeW5jL2F3YWl0IGNvZGUuIFRoZSBmb2xsb3dpbmcgd2lsbCB3b3JrIGlmIGEgcmVzdWx0IGlzIHJldHVybmVkLlxuICAgICAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRlZmVycmVkLm91dHB1dDtcbiAgICAgKiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAqL1xuICAgIGdldCBvdXRwdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cbiAgICAvKiogVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suICovXG4gICAgdGhlbihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRvIGtlZXAgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCdzIHVnbHkuXG4gICAgICAgIC8vIEl0IG1lYW5zIGEgbG90IG9mIGV4dHJhIHN0ZXBzLiBJdCBtYWtlcyBzdXJlIHRoYXQgYnkgZGVmYXVsdCwgdGhlIGxhc3Qgc3RlcCBpcyBhbHdheXMgYSBjYXRjaC5cbiAgICAgICAgaWYgKHRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25yZWplY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2gob25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWdhaW4gdGhpcyBpcyBhIG1lc3MsIGJ1dCB0aGUgY2F0Y2ggaGFuZGxlciBhYm92ZSBjb3VsZCB0aHJvd1xuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZlcnJlZFByb21pc2UgPSBEZWZlcnJlZFByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IERlZmVycmVkUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vRGVmZXJyZWRQcm9taXNlXCIpO1xuLyoqXG4gKiBUaGUgcHJvbWlzZSBBUEkgaXMgbmljZSwgbW9zdGx5LCBidXQgdGhlIG1haW4gdGhpbmcgcHJldmVudGluZyB1c2Ugb2YgYSBwcm9taXNlIGFzIGFuIGV2ZW50IGhhbmRsZXIgaXMgdGhhdFxuICogaXQgb25seSBleGVjdXRlcyBvbmNlLiBBZnRlciB0aGF0IHBvaW50LCBpdCBpcyByZXNvbHZlZCwgYW5kIHRoZXJlIGlzIG5vIHdheSB0byBmbGlwIGl0IGJhY2suXG4gKlxuICogVGhlIHJlcGVhdGFibGUgcHJvbWlzZSBrZWVwcyB0aGUgcHJvbWlzZSBBUEkgYW5kIGNyZWF0ZXMgdGhlIGlsbHVzaW9uIHRoYXQgdGhlIHByb21pc2UgaXMgcmVwZWF0ZWQgYnlcbiAqIHJlYnVpbGRpbmcgdGhlIGNoYWluIGVhY2ggdGltZS4gSXQncyByZWFsbHkgYSBkZWZlcnJlZCBmYWN0b3J5IGJ1dCBpdCBwcmV0ZW5kcyB0byBiZSBhIGRlZmVycmVkLiBJJ20gc3VyZVxuICogdGhpcyBoYXMgYSBwZXJmb3JtYW5jZSBwZW5hbHR5LlxuICpcbiAqIFlvdSBzaG91bGQgbm90IGF0dGFjaCBhY3R1YWwgcHJvbWlzZXMgaW50byB0aGUgdGhlbigpIGNoYWluLCBiZWNhdXNlIHRoZXkgY2FuJ3QgYmUgcmVwZWF0ZWQuIFRoZSBQcm9taXNlIHR5cGUgaXNuJ3RcbiAqIGFsbG93ZWQgYnV0IHRoZXJlIGFyZSB3YXlzIHRvIGdldCBhcm91bmQgdGhlIFRTIGNvbXBpbGVyLiBUaGUgVFMgdHlwZSBkZWZpbml0aW9uIGZvciBQcm9taXNlIGFuZCBQcm9taXNlTGlrZSBpc24ndFxuICogY29tcGxldGVseSBjb3JyZWN0LCBhbnl3YXksIHNvIGl0J3MgZWFzeSB0byBnZXQgdXNlZCB0byB1c2luZyB0aGUgYW55IHR5cGUgYW5kIG1ha2UgYnJva2VuIGNvZGUuXG4gKlxuICogWW91IGNhbm5vdCBhc3luYy9hd2FpdCBhIHJlcGVhdGFibGUgcHJvbWlzZSBpdHNlbGYgYnV0IHlvdSBjYW4gYXdhaXQgYSBzaW5nbGUgcmVzb2x1dGlvbi4gQXN5bmMvYXdhaXQgaXMgc3VnYXIgdGhhdFxuICogY3JlYXRlcyBhIHJlZ3VsYXIsIG5vbi1yZXBlYXRhYmxlLCBwcm9taXNlLlxuICovXG5jbGFzcyBSZXBlYXRhYmxlUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIG9uVW5oYW5kbGVkRXJyb3IsIC8vIFRoaXMgYWRkcyBhIGNhbGxiYWNrIGF0IHRoZSBlbmQgKG9yIDJuZCBmcm9tIHRoZSBlbmQsIHNlZSBuZXh0IG9wdGlvbilcbiAgICB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICApIHtcbiAgICAgICAgdGhpcy5vblVuaGFuZGxlZEVycm9yID0gb25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7IC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuIFVzZWZ1bCBmb3IgYXN5bmMvYXdhaXQgY29kZS5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZSBmb2xsb3dpbmcgc2hvdWxkIHdvcms6XG4gICAgLy8gY29uc3QgcmVwZWF0YWJsZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZSgpOyBjb25zdCByID0gYXdhaXQgcmVwZWF0YWJsZS5yZXNvbHZlKCk7IGNvbnNvbGUubG9nKHIpO1xuICAgIHJlc29sdmUoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgcmVqZWN0KGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgLy8gVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suXG4gICAgdGhlbihvbmZ1bGZpbGxlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25mdWxmaWxsZWQ6IG9uZnVsZmlsbGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25yZWplY3RlZDogb25yZWplY3RlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Uga25vdyB0aGF0IHRoZSBmaXJzdCBpcyBhbHdheXMgb25mdWxmaWxsZWQgYW5kIGlzIG5ldmVyIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmICghY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBGaXJzdCBvbmZ1bGZpbGxlZCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IG5ldyBEZWZlcnJlZFByb21pc2VfMS5EZWZlcnJlZFByb21pc2UoY2Iub25mdWxmaWxsZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGNiLm9uZnVsZmlsbGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKGNiLm9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBObyBjYWxsYmFja3MsIG5vdCBldmVuIHRoZSBkZWZhdWx0IGZpcnN0IG9uZnVsZmlsbGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKHRoaXMub25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5leHBvcnRzLlJlcGVhdGFibGVQcm9taXNlID0gUmVwZWF0YWJsZVByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUmV0dXJuIGVsZW1lbnRzIG9mIGFycmF5IGEgbGluZWQgdXAgd2l0aCBlbGVtZW50cyBvZiBhcnJheSBiLiBCb3RoIGFycmF5cyBkb24ndCBoYXZlIHRvIGJlIHRoZSBzYW1lIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggPj0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2VsZW1lbnQsIGJbaW5kZXhdXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYi5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbYVtpbmRleF0sIGJdKTtcbiAgICB9XG59XG5leHBvcnRzLnppcCA9IHppcDtcbi8qKlxuICogUmV0dXJuIGEgY2FydGVzaWFuIGpvaW4gKGNyb3NzIGpvaW4pIGJldHdlZW4gYXJyYXlzIGEgYW5kIGIuXG4gKi9cbmZ1bmN0aW9uIGNhcnRlc2lhbihhLCBiKSB7XG4gICAgLy8vIHR5cGVzY3JpcHQgcHJldmVudHMgYSBkaXJlY3QgdXNlIG9mIGNvbmNhdCwgc28gZG8gdGhpcyBtYW51YWxseSB3aXRoIGEgbG9vcFxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYSkge1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uYi5tYXAocSA9PiBbaXRlbSwgcV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLmNhcnRlc2lhbiA9IGNhcnRlc2lhbjtcbi8qKlxuICogR2VuZXJhdGUgYSByYW5nZSBvZiBpbnRlZ2VycywgY291bnRpbmcgdXAgYnkgMSwgZm9yIHRoZSBnaXZlbiBsZW5ndGguIFN0b2xlbiBmcm9tIFB5dGhvbi5cbiAqL1xuZnVuY3Rpb24gcmFuZ2UobGVuZ3RoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbmd0aCB9LCAodmFsdWUsIGtleSkgPT4ga2V5KTtcbn1cbmV4cG9ydHMucmFuZ2UgPSByYW5nZTtcbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgaXRlbXMgYW5kIG90aGVyIGFycmF5cywgZmxhdHRlbiB0aGVtIG91dCBpbnRvIGEgc2luZ2xlIGFycmF5LlxuICovXG5mdW5jdGlvbiogdHJhdmVyc2UoYXJyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgeWllbGQgYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgYXJyKSB7XG4gICAgICAgICAgICB5aWVsZCogdHJhdmVyc2Uocm93KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudHJhdmVyc2UgPSB0cmF2ZXJzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmVwZWF0YWJsZVByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKTtcbi8qKlxuICogQSBkZWxlZ2F0ZSBvYmplY3QgaXMgdXNlZCBieSB0aGUgRXZlbnRIYW5kbGVyLiBJdCBjb250YWlucyBlbm91Z2ggaW5mb3JtYXRpb24gdG8gZXhlY3V0ZSBhIGNhbGxiYWNrIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3VzbHlcbiAqICh1c2luZyBhIHByb21pc2UpLiBJdCBhbHNvIGFkZHMgc29tZSBzdHJpbmdzIHRvIGhlbHAgaW4gdHJvdWJsZXNob290aW5nLCBiZWNhdXNlIHNlYXJjaGluZyBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBjb21wbGV4IG9iamVjdHMgY2FuIG1ha2VcbiAqIGl0IGEgYmVhciB0byBmaW5kIG91dCB3aHkgYSBjYWxsYmFjayBpc24ndCBiZWluZyBleGVjdXRlZC5cbiAqL1xuY2xhc3MgRGVsZWdhdGUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIEluIG1hbnkgY2FzZXMgKGZvciBleGFtcGxlLCB3aGVuIHVzaW5nIGZhdCBhcnJvdyBmdW5jdGlvbnMpLCB0aGlzQXJnIGlzXG4gICAgICAgIC8vIG5vdCBuZWVkZWQuIEJ1dCBpbiBtb3N0IG90aGVycywgaXQgaXMgYW4gYW5ub3lpbmcgYnVnIHRoYXQgcmVxdWlyZXMgdHJvdWJsZXNob290aW5nXG4gICAgICAgIC8vIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY2FsbGVyIGZvcmdvdC4gSSd2ZSB3YXZlcmVkIGJldHdlZW4gbWFraW5nIGl0IHJlcXVpcmVkIGFuZCBub3QuXG4gICAgICAgIGlmICghdGhpc0FyZykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVsZWdhdGUgY3JlYXRlZCB3aXRob3V0IHRoaXNBcmcuIERpZCB5b3UgbWVhbiB0bz8nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrT3duZXJOYW1lID0gdGhpc0FyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSB0eXBlc2NyaXB0IGNvbXBpbGVyIHNob3VsZCBoYW5kbGUgdGhpcyBjaGVjayBidXQgY2FuJ3QgYXQgcnVudGltZS5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5jYWxsYmFja05hbWUgPSBjYWxsYmFjay5uYW1lO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSAmJiB0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5jYWxsYmFja093bmVyTmFtZX0uJHt0aGlzLmNhbGxiYWNrTmFtZX0oKWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tOYW1lICsgJygpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrT3duZXJOYW1lICsgJy5fX2xhbWJkYV9fKCknO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZV8xLlJlcGVhdGFibGVQcm9taXNlKGNhbGxiYWNrLmJpbmQodGhpc0FyZykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVsZWdhdGUgPSBEZWxlZ2F0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IERlbGVnYXRlXzEgPSByZXF1aXJlKFwiLi9EZWxlZ2F0ZVwiKTtcbi8qKlxuICogSSBjaG9zZSB0byB1c2UgQyMgc3R5bGUgZXZlbnRzLCBub3QgSlMvVFMsIGJlY2F1c2UgdGhlIEpTL1RTIHdheSBvZiBkb2luZyBkZWxlZ2F0ZXMvY3VzdG9tIGV2ZW50cyBpcyBhIE5JR0hUTUFSRS4gU3VyZSxcbiAqIEN1c3RvbUV2ZW50IHdvcmtzLCBidXQgb24gdGhlIFRTIHNpZGUgdGhlIGNvZGUgcmVxdWlyZWQgdG8gbWFrZSBUU0MgaGFwcHkgd2l0aCB2YWxpZCBqYXZhc2NyaXB0IGlzIGF3ZnVsIGFuZCBub24taW50dWl0aXZlLlxuICogT24gdGhlIEpTIHNpZGUsIHlvdSBoYXZlIHRoZSBwcm9ibGVtIHRoYXQgZXZlcnkgaGFuZGxlciBwaWNrcyBpdCB1cCwgbm90IGp1c3QgdGhlIG9uZXMgdGhhdCBhcmUgYm91bmQgdG8gdGhlIHJlbGV2YW50IEhUTUxcbiAqIGVsZW1lbnQsIHNvIGVsZW1lbnRzIG5lZWQgdG8gcGFzcyB0aGUgc291cmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBjaGVjayBpdCAobGlrZSBqcXVlcnkgYW5kICQoZG9jdW1lbnQpLm9uKCkpLlxuICpcbiAqIEFmdGVyIGdldHRpbmcgaXQgd29ya2luZywgYWxsIEkgY291bGQgdGhpbmsgYWJvdXQgd2FzIGhvdyBiYWQgdGhlIGNvZGUgd2FzLCBzbyBJIHJld3JvdGUgaXQgYXZvaWRpbmcgdGhlIEpTIHBhdHRlcm4gZW50aXJlbHkuXG4gKlxuICogVGhpcyBjYW4gYmUgc3luY2hyb25vdXMgKGNhbGxiYWNrcykgb3IgYXN5bmNocm9ub3VzIChwcm9taXNlcykuICBXaGVuIGl0IGlzIGFzeW5jLCB0aGUgY29kZSBleGVjdXRlcyBhZnRlciB0aGUgY3VycmVudCBzeW5jaHJvbm91c1xuICogZXZlbnRzIHJ1biB0byBjb21wbGV0aW9uLiBUaGlzIGNvdWxkIGNyZWF0ZSBidWdzIGluIHN5bmNocm9ub3VzIGNvZGUsIGJ1dCBpcyBiZXN0IGZvciBicm93c2VyIGV2ZW50cy4gVGhpcyBoYW5kbGVyIGlzIHByaW1hcmlseSB1c2VkIGZvclxuICogYnJvd3NlciBldmVudHMsIHNvIGFzeW5jIGlzIGRlZmF1bHQuXG4gKlxuICogQnV0IGlmIHlvdSdyZSB0cmlnZ2VyaW5nIGFzeW5jIGV2ZW50cyBpbiBjb2RlIGFuZCBzdGVwcGluZyB0aHJvdWdoIGl0IGluIENocm9tZSwgd2hhdCB5b3Ugc2VlIHdvbid0IG1ha2Ugc2Vuc2UsIGJlY2F1c2UgdGhlIGFzeW5jXG4gKiBldmVudHMgd29uJ3Qgb2NjdXIgdW50aWwgcmlnaHQgYXdheS4gSXQgY2FuIGJlIGhhcmQgdG8gdHJvdWJsZXNob290LlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9kaXNhYmxlQXN5bmMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlQXN5bmMgPSBfZGlzYWJsZUFzeW5jO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJZiB0aGlzIHJlY2VpdmVzIGEgZGVsZWdhdGUgKHdoaWNoIGlzIGFuIGFycmF5IG9mIGRlbGVnYXRlcyksIGFkZCBpdC5cbiAgICAgICAgLy8gV2hlbiB0aGlzIGlzIGludm9rZWQsIHRoYXQgZGVsZWdhdGUgd2lsbCBhbHNvIGJlIGludm9rZWQuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgX292cjFfZGVsZWdhdGUuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR290IGEgc2luZ2xlIGNhbGxiYWNrXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2FsbGJhY2suXG4gICAgICAgIGlmICh0aGlzLmZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaDogdHJ1ZSB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEZWxlID0gbmV3IERlbGVnYXRlXzEuRGVsZWdhdGUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2gobmV3RGVsZSk7XG4gICAgICAgIC8vIElGIHRoaXMgaXMgYXN5bmNocm9ub3VzLCByZXR1cm4gdGhlIHByb21pc2Ugc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gICAgICAgIC8vIENoYWluaW5nIHdvbid0IHdvcmsgb24gc3luYyBjb2RlLCBzbyBkbyBub3QgaW4gdGhhdCBjYXNlLlxuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ld0RlbGUucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9kZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmZpbmQocSA9PiBxID09PSBkZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiAhQXJyYXkuaXNBcnJheShxKSAmJiBxLmNhbGxiYWNrID09PSBjYWxsYmFjayk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVMaXN0ZW5lcihzZW5kZXIpIHtcbiAgICAgICAgLy8gRmlyc3QgdHJ5IHRvIHVuc3Vic2NyaWJlIHRoZSBkZWZhdWx0IGRlbGVnYXRlLiBDYW4ndCBkbyBhbnl0aGluZyBpZiBpdCBoYXMgYSBkaWZmZXJlbnQgbmFtZSwgdGhvdWdoLlxuICAgICAgICBpZiAoXCJkZWxlZ2F0ZVwiIGluIHNlbmRlcikge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZURlbGVnYXRlKHNlbmRlci5kZWxlZ2F0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gIUFycmF5LmlzQXJyYXkocSkgJiYgcS50aGlzQXJnID09PSBzZW5kZXIpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+IHEgPT09IGRlbGVnYXRlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZShhcmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBBc3luYyB2ZXJzaW9uLiBEb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCB0aGUgY2hyb21lIGRlYnVnZ2VyLlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIudGhpc0FyZywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoIH0gPSB7fSkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoKGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICBmdW5jdGlvbiBtYXRjaChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTsgLy8gQ2xlYXJzIHRoZSBkZWxlZ2F0ZVxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdW5kZWZpbmVkOyAvLyBNYWtlcyBzdXJlIHRoaXMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEV2ZW50IGFyZ3VtZW50cyBleHBlY3RlZCBvbiBhbnkgQ2hhbmdlIGV2ZW50LlxuICovXG5jbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIGNoYW5nZSBvcGVyYXRpb24gKHNldCwgZGVsZXRlKSAocG90ZW50aWFsbHkgbWV0aG9kKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgbmV3YWJsZS5cbiAqIFRISVMgQ0FOTk9UIERFVEVDVCBBTk9OWU1PVVMgQ0xBU1NFUy4gU29ycnksIGJ1dCBKUyBkb2Vzbid0IGhhdmUgYSBub24tZGVzdHJ1Y3RpdmUgd2F5XG4gKiB0byBjaGVjayBpZiBhbnkgZnVuY3Rpb24gaXMgYSBjb25zdHJ1Y3RvciBvdGhlciB0aGFuIHRvIHRyeSB0byBuZXcoKSBpdCBhbmQgYmxvdyB1cC9ub3QgYmxvdyB1cC5cbiAqIFRoaXMgZnVuY3Rpb24gZGVwZW5kcyBvbiB0aGVyZSBiZWluZyBhIHByb3RvdHlwZSB3aXRoIGEgbmFtZWQgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yVHlwZUd1YXJkKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLnByb3RvdHlwZSAmJiBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5leHBvcnRzLmNvbnN0cnVjdG9yVHlwZUd1YXJkID0gY29uc3RydWN0b3JUeXBlR3VhcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBrZXl3b3JkIGFyZ3VtZW50cywgYXMgc2VlbiBpbiBQeXRob24gYW5kIEMjLiBJdCBtYWtlcyBjb25maWd1cmFibGVcbiAqIGZ1bmN0aW9ucyBzbyBtdWNoIHF1aWNrZXIgYW5kIGVhc2llciB0aGFuIGZsYXQgYXJndW1lbnRzIChmb3JjaW5nIHlvdSB0byBwdXQgdW5kZWZpbmVkIG1hbnVhbGx5IGluIGRpZmZlcmVudFxuICogc2xvdHMpIG9yIG9wdGlvbnMgb2JqZWN0cyAodGFrZXMgbW9yZSB0aW1lIHRvIHByb2R1Y2UsIGVzcGVjaWFsbHkgaWYgeW91IG5lZWQgdG8gbmV3IGl0IHVwKS5cbiAqXG4gKiBDYWxsIGZ1bmN0aW9ucyBoYXZpbmcga2V5d29yZCBhcmd1bWVudHMgdXNpbmcgdGhpcyBzeW50YXg6XG4gKiBjYWxsbWUoYXJnMSwgYXJnMiwga3coJ3NvbWV0aGluZycsIGt3MSksIGt3KCdzb21ldGhpbmdFbHNlJywga3cyKSlcbiAqXG4gKiBUbyBtYWtlIHRoZW0gd29yaywgaW4gdGhlIGZ1bmN0aW9uIGl0c2VsZiwgeW91IG5lZWQgdG8gY29weSBhbmQgcGFzdGUuIEZvciBleGFtcGxlOlxuICogKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0gPSBLd2FyZy5wYXJzZSh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9KSk7XG4gKi9cbmNsYXNzIEt3YXJnIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIGlmICghYSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGE7XG4gICAgICAgIHRoaXMudmFsdWUgPSBiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1lbWJlciB0aGlzIHRlbXBsYXRlOlxuICAgICAqICh7IH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9KSk7XG4gICAgICogSW5jbHVkZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgZmlyc3Qgb2JqZWN0LCBub3QgdGhlIHNlY29uZC5cbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IHRvIGNhcHR1cmUgcmVzdCBwYXJhbWV0ZXJzLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkcmVzdCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7ICwgLi4ucmVzdCB9KSk7XG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCBhbGxvd1Vua25vd25LZXl3b3JkIHRvIGJlIHRydWUsIHVzZSB0aGlzOlxuICAgICAqICh7ICQka3ckJCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSwgdHJ1ZSkpO1xuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUFyZ3MoYXJncywgYWxsb3dVbmtub3duS2V5d29yZCA9IGZhbHNlKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgdGhpcyBjb3VsZCB0YWtlIHRoZSBhcmd1bWVudHMgb2JqZWN0LCBidXQgc2FkbHkgYXJndW1lbnRzIHN0b3JlcyBvbmx5IGFuIGFycmF5IG9mIHZhbHVlcyxcbiAgICAgICAgLy8gbm8ga2V5cy4gSWYgSlMgd2VyZSBzYW5lLCBpdCB3b3VsZCBiZSBhIE1hcCwgbm90IGFuIGFycmF5LiBUd28gc3RlcHMgZm9yd2FyZCwgb25lIHN0ZXAgYmFjay5cbiAgICAgICAgLy8gUGFyc2luZyB0aGUgc3RyaW5nIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvbiBpcyBub3QgbXkgY3VwIG9mIHRlYSwgc28ganVzdCBuby5cbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncyk7XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGFyZ3VtZW50IG9yZGVyXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gYXJnc1thcmddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGt3dmFyID0ge307XG4gICAgICAgIG9ialsnJCRrdyQkJ10gPSBrd3ZhcjtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJlc3QgcGFyYW1ldGVycy5cbiAgICAgICAgLy8gSSB3YXMgZ29pbmcgdG8gaGF2ZSB0aGlzIG9uL29mZiBjb25maWd1cmFibGUsIGJ1dCBpdCBzaG91bGRuJ3QgaHVydCBwZXJmb3JtYW5jZS5cbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIG9ialsnJHJlc3QkJ10gPSBhcnI7XG4gICAgICAgIC8vIFJlc3QgcGFyYW1ldGVycyBhcmUgc3RvcmVkIGFzIGFycmF5IGtleXMsIHsgJzAnOiBhLCAnMSc6IGIsICdub25SZXN0JzogJ3NvbWV0aGluZyBlbHNlJ31cbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykuZmlsdGVyKGYgPT4gSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoZikpKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcmdzW2FyZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXdvcmRzVXNlZCA9IHt9O1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBrZXl3b3JkIG5hbWVcbiAgICAgICAgLy8gSGF2ZSB0byBpdGVyYXRlIHRoZSBsaXN0IHR3aWNlLCB0byBhdm9pZCB3aXBpbmcgb3V0IGRhdGEgaWYgdGhlIG9yZGVyIGlzIHN3YXBwZWRcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dVbmtub3duS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga3d2YXJbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgYW4gdW5leHBlY3RlZCBrZXl3b3JkIGFyZ3VtZW50ICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4ga2V5d29yZHNVc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IG11bHRpcGxlIHZhbHVlcyBmb3Iga2V5d29yZCBhcmd1bWVudCArICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5d29yZHNVc2VkW3RtcC5uYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgLy8gVHVybiBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXl3b3JkIGFyZ3VtZW50cy5cbiAgICAvLyBOZWVkcyB0byByZXR1cm4gYW55W10gYmVjYXVzZSBpdCdzIGdvaW5nIHRvIGJlIHNob3ZlZCBpbnRvIGFyYml0cmFyeSBhcmd1bWVudCBsaXN0c1xuICAgIHN0YXRpYyB1bnBhY2soYXJncykge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goa3coYXJnLCBhcmdzW2FyZ10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgaXNNYXRjaChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSA9PT0ga2V5O1xuICAgIH1cbn1cbmV4cG9ydHMuS3dhcmcgPSBLd2FyZztcbmZ1bmN0aW9uIGt3KGEsIGIpIHtcbiAgICBpZiAoIWEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDFcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhLCBiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgICAvLyBPdmVybG9hZCAyXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYVswXSwgYVsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdmVybG9hZCAzXG4gICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyLlxuICAgICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpO1xuICAgICAgICBpZiAoIXByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwIG9iamVjdDogbXVsdGlwbGUga2V5cycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcocHJvcHNbMF0sIGFbcHJvcHNbMF1dKTtcbiAgICB9XG59XG5leHBvcnRzLmt3ID0ga3c7XG5mdW5jdGlvbiBrd2FyZ3NUb09iamVjdChhcnIpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJyKSB7XG4gICAgICAgIG9wdGlvbnNbYXJnLm5hbWVdID0gb3B0aW9uc1thcmcudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbmV4cG9ydHMua3dhcmdzVG9PYmplY3QgPSBrd2FyZ3NUb09iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNOb25lKHRlc3QpIHtcbiAgICByZXR1cm4gKHRlc3QgPT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5pc05vbmUgPSBpc05vbmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNsb25lRGVlcChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKSB7XG4gICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajsgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgfVxuICAgIGlmIChoYXNoLmhhcyhvYmopKSB7XG4gICAgICAgIHJldHVybiBoYXNoLmdldChvYmopOyAvLyByZWZlcmVuY2UgdG8gb2JqZWN0IHByZXZpb3VzbHkgc2VlblxuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgdmFsID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIChba2V5LCB2YWxdKSA9PiByZXN1bHQuYWRkKGNsb25lRGVlcChrZXksIGhhc2gpLCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhd2Z1bCBjb2RlLCBidXQgaXQncyB0aGUgb25seSB3YXkgdG8gY2xvbmUgYSBzdGFuZGFsb25lIGZ1bmN0aW9uICh2cyBhIG1ldGhvZCB3aGljaCBoYXMgYSBkZXNjcmlwdG9yKS5cbiAgICAgICAgLy8gSW4gZ2VuZXJhbCwgeW91IHByb2JhYmx5IGRvbid0IHdhbnQgdG8gdXNlIGNsb25lRGVlcCBvbiBmdW5jdGlvbnMuIFlvdSdsbCBzZWUgaXQncyBOT1QgdXNlZCBvbiBpbnRlcm5hbCBtZXRob2RzLlxuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgb2JqLnRvU3RyaW5nKCkpKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaGFzaC5zZXQob2JqLCByZXN1bHQpOyAvLyBLZWVwIHRyYWNrIG9mIG9iamVjdHMgcHJldmlvdXNseSBjbG9uZWRcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIShrZXkgaW4gcmVzdWx0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIG1ldGhvZHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHByb3RvdHlwZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCByZWN1cnNpdmVseSBmb2xsb3cgYmVjYXVzZSB0aGVyZSdzIG5vdGhpbmcgcmVjdXJzaXZlIHRvIGRvLlxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGhhc2guc2V0KG9ialtrZXldLCByZXN1bHRba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBtZXRob2QuXG4gICAgICAgICAgICAgICAgLy8gSWYgZXh0cmEga2V5cyBhcmUgdGhyb3duIG9udG8gYSBmdW5jdGlvbiwgdGhleSBwcm9iYWJseSB3aWxsIG5vdCBiZSBjbG9uZWQuXG4gICAgICAgICAgICAgICAgLy8gSW4gbXkgZXhwZXJpZW5jZSwgZXh0cmEga2V5cyBvbiBmdW5jdGlvbnMgZGlkbid0IHdvcmsgcmlnaHQsIHNvIG5vIGJpZyBsb3NzLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBnZXR0ZXJzL3NldHRlcnMuIFRoZXNlIGFyZSBsb2NhbCBhbmQgaG9wZWZ1bGx5IHdvcmsganVzdCBsaWtlIG1ldGhvZHMuXG4gICAgICAgICAgICAvLyBJbiBtYW55IGNhc2VzLCB0aGlzIGlzIHJlZHVuZGFudCB3aXRoIE9iamVjdC5jcmVhdGUoKSwgYnV0IGlzIG5lY2Vzc2FyeSB0byBhbGxvdyBvYmplY3RzIHdpdGggbWFudWFsbHktYWRkZWQgY3VzdG9tIGdldHRlcnMuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBnZXR0ZXIvc2V0dGVyLlxuICAgICAgICAgICAgLy8gQUxTTyBoYXNoIG5vdCB1cGRhdGVkOyB0aGlzIGlzIG5vdCBwb3NzaWJsZSwgYmVjYXVzZSBpdCB3aWxsIG1hcCB0aGUgdmFsdWUgaXQgZ2V0cywgbm90IHRoZSBnZXR0ZXIuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lRGVlcChvYmpba2V5XSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuLyoqXG4gKiBBIHBzZXVkby1yYW5kb20gcHJlZml4IHBsdXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIHRoZSB1bml4IGVwb2NoLiBUaGUgcmFuZG9tIHBhcnQgc2hvdWxkIGJlIHJhbmRvbSBlbm91Z2ggdG8gY292ZXJcbiAqIG11bHRpcGxlIGlkcyBjcmVhdGVkIGluIGEgbWlsbGlzZWNvbmQuXG4gKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZUlkKCkge1xuICAgIGNvbnN0IGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLV8nO1xuICAgIGxldCByZXN1bHQgPSAndScgKyBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpICsgJy0nO1xuICAgIGZvciAoY29uc3QgXyBvZiBBcnJheVV0aWxpdGllc18xLnJhbmdlKDgpKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmdldFVuaXF1ZUlkID0gZ2V0VW5pcXVlSWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGVsbCBpZiBhIGdpdmVuIHN0cmluZyBpcyBhIHBvc2l0aXZlIGludGVnZXIuXG4gKiBVc2UgZm9yIGRldGVjdGluZyBhcnJheSBrZXlzLlxuICovXG5mdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHIgPT09ICcwJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC9eWzEtOV1cXGQqJC8udGVzdChzdHIpO1xufVxuZXhwb3J0cy5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyA9IGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEkgZG9uJ3Qga25vdyBob3cgYWNjdXJhdGUgdGhpcyBpcyBidXQgaXQgc2VlbXMgcHJldHR5IGdvb2RcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmo7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4iXX0=
