(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateElement_1 = require("../../src/Html/CreateElement");
const DeleteNodeContent_1 = require("../../src/Html/DeleteNodeContent");
const EscapeHtml_1 = require("../../src/Html/EscapeHtml");
const ExtractNodeContent_1 = require("../../src/Html/ExtractNodeContent");
const FindIndexInParent_1 = require("../../src/Html/FindIndexInParent");
const FormFieldValue_1 = require("../../src/Html/FormFieldValue");
const QuerySelectorNodeList_1 = require("../../src/Html/QuerySelectorNodeList");
const ValidateUniqueDomIds_1 = require("../../src/Html/ValidateUniqueDomIds");
const Delay_1 = require("../../src/System/Async/Delay");
const ArrayUtilities_1 = require("../../src/System/Collections/ArrayUtilities");
const OrderBy_1 = require("../../src/System/Collections/OrderBy");
const KeywordArguments_1 = require("../../src/System/Types/KeywordArguments");
const NoneType_1 = require("../../src/System/Types/NoneType");
const CloneDeep_1 = require("../../src/System/Utility/CloneDeep");
const CloneObject_1 = require("../../src/System/Utility/CloneObject");
const GetUniqueId_1 = require("../../src/System/Utility/GetUniqueId");
const IsInteger_1 = require("../../src/System/Utility/IsInteger");
const ObjectFullAssign_1 = require("../../src/System/Utility/ObjectFullAssign");
(function main() {
    // The large number of HTML helper means it makes sense to give them their own node.
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
    const plugin = {
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
        kwargsToObject: KeywordArguments_1.kwargsToObject,
        objectFullAssign: ObjectFullAssign_1.objectFullAssign,
        orderBy: OrderBy_1.orderBy,
    };
    window.mi5 = window.mi5 || {};
    window.mi5.html = Object.assign(window.mi5.html || {}, html);
    window.mi5.util = Object.assign(window.mi5.util || {}, plugin);
})();

},{"../../src/Html/CreateElement":2,"../../src/Html/DeleteNodeContent":3,"../../src/Html/EscapeHtml":5,"../../src/Html/ExtractNodeContent":6,"../../src/Html/FindIndexInParent":7,"../../src/Html/FormFieldValue":8,"../../src/Html/QuerySelectorNodeList":9,"../../src/Html/ValidateUniqueDomIds":10,"../../src/System/Async/Delay":11,"../../src/System/Collections/ArrayUtilities":12,"../../src/System/Collections/OrderBy":13,"../../src/System/Types/KeywordArguments":14,"../../src/System/Types/NoneType":15,"../../src/System/Utility/CloneDeep":16,"../../src/System/Utility/CloneObject":17,"../../src/System/Utility/GetUniqueId":18,"../../src/System/Utility/IsInteger":19,"../../src/System/Utility/ObjectFullAssign":20}],2:[function(require,module,exports){
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

},{"../System/Types/KeywordArguments":14,"./ElementType":4,"./ExtractNodeContent":6}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findIndexInParent(element) {
    const parent = element.parentElement;
    if (parent) {
        return Array.from(parent.children).indexOf(element);
    }
}
exports.findIndexInParent = findIndexInParent;

},{}],8:[function(require,module,exports){
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

},{"../System/Types/NoneType":15}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(time) {
    return (result) => new Promise(resolve => setTimeout(() => resolve(result), time));
}
exports.delay = delay;

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"../Utility/IsInteger":19}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":12}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../Types/NoneType":15,"./CloneObject":17}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9VdGlsLmpzIiwic3JjL0h0bWwvQ3JlYXRlRWxlbWVudC5qcyIsInNyYy9IdG1sL0RlbGV0ZU5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRmluZEluZGV4SW5QYXJlbnQuanMiLCJzcmMvSHRtbC9Gb3JtRmllbGRWYWx1ZS5qcyIsInNyYy9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdC5qcyIsInNyYy9IdG1sL1ZhbGlkYXRlVW5pcXVlRG9tSWRzLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWxheS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnkuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHMuanMiLCJzcmMvU3lzdGVtL1R5cGVzL05vbmVUeXBlLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZU9iamVjdC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXIuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRGVsZXRlTm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbC9EZWxldGVOb2RlQ29udGVudFwiKTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRmluZEluZGV4SW5QYXJlbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbC9GaW5kSW5kZXhJblBhcmVudFwiKTtcbmNvbnN0IEZvcm1GaWVsZFZhbHVlXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBWYWxpZGF0ZVVuaXF1ZURvbUlkc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9IdG1sL1ZhbGlkYXRlVW5pcXVlRG9tSWRzXCIpO1xuY29uc3QgRGVsYXlfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL0FzeW5jL0RlbGF5XCIpO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgT3JkZXJCeV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvT3JkZXJCeVwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDbG9uZURlZXBfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwXCIpO1xuY29uc3QgQ2xvbmVPYmplY3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVPYmplY3RcIik7XG5jb25zdCBHZXRVbmlxdWVJZF8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZFwiKTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG5jb25zdCBPYmplY3RGdWxsQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIik7XG4oZnVuY3Rpb24gbWFpbigpIHtcbiAgICAvLyBUaGUgbGFyZ2UgbnVtYmVyIG9mIEhUTUwgaGVscGVyIG1lYW5zIGl0IG1ha2VzIHNlbnNlIHRvIGdpdmUgdGhlbSB0aGVpciBvd24gbm9kZS5cbiAgICBjb25zdCBodG1sID0ge1xuICAgICAgICBhbmNob3I6IENyZWF0ZUVsZW1lbnRfMS5hbmNob3IsXG4gICAgICAgIGJ1dHRvbjogQ3JlYXRlRWxlbWVudF8xLmJ1dHRvbixcbiAgICAgICAgY3JlYXRlRWxlbWVudDogQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQsXG4gICAgICAgIGNyZWF0ZUh0bWw6IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVIdG1sLFxuICAgICAgICBjcmVhdGVGcmFnbWVudDogQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUZyYWdtZW50LFxuICAgICAgICBkZWxldGVOb2RlQ29udGVudDogRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudCxcbiAgICAgICAgZGl2OiBDcmVhdGVFbGVtZW50XzEuZGl2LFxuICAgICAgICBlc2NhcGVIdG1sOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCxcbiAgICAgICAgZXh0cmFjdE5vZGVDb250ZW50OiBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQsXG4gICAgICAgIGZpbmRJbmRleEluUGFyZW50OiBGaW5kSW5kZXhJblBhcmVudF8xLmZpbmRJbmRleEluUGFyZW50LFxuICAgICAgICBnZXRGb3JtRmllbGRWYWx1ZTogRm9ybUZpZWxkVmFsdWVfMS5nZXRGb3JtRmllbGRWYWx1ZSxcbiAgICAgICAgcGFyYWdyYXBoOiBDcmVhdGVFbGVtZW50XzEucGFyYWdyYXBoLFxuICAgICAgICBub2RlTGlzdFNlbGVjdG9yOiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yLFxuICAgICAgICBub2RlTGlzdFNlbGVjdG9yQWxsOiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsLFxuICAgICAgICBzZXRGb3JtRmllbGRWYWx1ZTogRm9ybUZpZWxkVmFsdWVfMS5zZXRGb3JtRmllbGRWYWx1ZSxcbiAgICAgICAgc3BhbjogQ3JlYXRlRWxlbWVudF8xLnNwYW4sXG4gICAgICAgIHZhbGlkYXRlVW5pcXVlRG9tSWRzOiBWYWxpZGF0ZVVuaXF1ZURvbUlkc18xLnZhbGlkYXRlVW5pcXVlRG9tSWRzLFxuICAgIH07XG4gICAgY29uc3QgYXJyYXkgPSB7XG4gICAgICAgIGNhcnRlc2lhbjogQXJyYXlVdGlsaXRpZXNfMS5jYXJ0ZXNpYW4sXG4gICAgICAgIHJhbmdlOiBBcnJheVV0aWxpdGllc18xLnJhbmdlLFxuICAgICAgICB0cmF2ZXJzZTogQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSxcbiAgICAgICAgemlwOiBBcnJheVV0aWxpdGllc18xLnppcFxuICAgIH07XG4gICAgY29uc3QgcGx1Z2luID0ge1xuICAgICAgICBhcnJheSxcbiAgICAgICAgY2xvbmVEZWVwOiBDbG9uZURlZXBfMS5jbG9uZURlZXAsXG4gICAgICAgIGNsb25lT2JqZWN0OiBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0LFxuICAgICAgICBkZWxheTogRGVsYXlfMS5kZWxheSxcbiAgICAgICAgZ2V0VW5pcXVlSWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQsXG4gICAgICAgIGh0bWwsXG4gICAgICAgIGlzTm9uZTogTm9uZVR5cGVfMS5pc05vbmUsXG4gICAgICAgIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nOiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyxcbiAgICAgICAga3c6IEtleXdvcmRBcmd1bWVudHNfMS5rdyxcbiAgICAgICAgS3dhcmc6IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZyxcbiAgICAgICAga3dhcmdzVG9PYmplY3Q6IEtleXdvcmRBcmd1bWVudHNfMS5rd2FyZ3NUb09iamVjdCxcbiAgICAgICAgb2JqZWN0RnVsbEFzc2lnbjogT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24sXG4gICAgICAgIG9yZGVyQnk6IE9yZGVyQnlfMS5vcmRlckJ5LFxuICAgIH07XG4gICAgd2luZG93Lm1pNSA9IHdpbmRvdy5taTUgfHwge307XG4gICAgd2luZG93Lm1pNS5odG1sID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1Lmh0bWwgfHwge30sIGh0bWwpO1xuICAgIHdpbmRvdy5taTUudXRpbCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS51dGlsIHx8IHt9LCBwbHVnaW4pO1xufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IHRhZ05hbWUsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAvLyBBbGxvdyBhdHRyaWJ1dGVzIHRvIGJlIHNlbnQgb24gcHJvcGVydGllcywgcHJvdmlkaW5nIGEgY2xlYW5lciBpbnRlcmZhY2UuXG4gICAgLy8gSXQgYWxsb3dzIHlvdSB0byBzZW5kIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHthdHRyaWJ1dGVzOiB7IGNsYXNzOiAnZm9vJyB9fSkgaW5zdGVhZCBvZiBjcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLCB7IGNsYXNzOiAnZm9vJyB9KTtcbiAgICAvLyBBbm90aGVyIG9wdGlvbiBpcyB0byB1c2UgS3dhcmdzLCBidXQgbm90IGV2ZXJ5b25lIHdhbnRzIHRvLlxuICAgIGlmIChwcm9wZXJ0aWVzICYmICdhdHRyaWJ1dGVzJyBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMgfHwge30sIHByb3BlcnRpZXMuYXR0cmlidXRlcyk7XG4gICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXM7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGUodGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuZnVuY3Rpb24gY3JlYXRlKHRhZywgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IChkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZykpO1xuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRE9NIHByb3BlcnRpZXMgdGFrZSBwcmVjZWRlbmNlIG92ZXIgYXR0cmlidXRlcywgYmVjYXVzZSBpbiBzb21lIGNhc2VzLCB0aGV5IG92ZXJyaWRlIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgSFRNTCBmcm9tIGFueSBIVE1MIGVsZW1lbnQgcHJvdmlkZWQuXG4gKiBVc2UgbGlrZSBjb25zdCBkaXYgPSBjcmVhdGVIdG1sPEhUTUxEaXZFbGVtZW50PihcIjxkaXY+U29tZXRoaW5nPC9kaXY+XCIpIG9yIGNvbnN0IGN1c3RvbSA9IGNyZWF0ZUh0bWwoXCI8c29tZS10YWc+PC9zb21lLXRhZz5cIikuXG4gKiBJZiBtdWx0aXBsZSBlbGVtZW50cyBvciBhIHBsYWluIHRleHQgc3RyaW5nIHdpdGggbm8gSFRNTCBpcyBwcm92aWRlZCwgdGhlbiBpdCB3aWxsIGJlIHdyYXBwZWQgaW4gYSBkaXYsIHNvIGl0IGNhbiBrZWVwXG4gKiByZXR1cm5pbmcgYW4gSFRNTEVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSHRtbChodG1sLCBpbmxpbmUgPSBmYWxzZSkge1xuICAgIGxldCB3cmFwcGVyO1xuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgICAgd3JhcHBlciA9IHNwYW4oKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB3cmFwcGVyID0gZGl2KChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBjb25zdCBub2RlcyA9IHdyYXBwZXIuY2hpbGROb2RlcztcbiAgICAvLyBNdWx0aXBsZSBub2RlcywgcmV0dXJuIHRoZSB3cmFwcGluZyBkaXZcbiAgICAvLyBlLmcuIFwiVGhpcyBpcyBhIDxlbT50ZXN0PC9lbT5cIiBvciBcIjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+XCJcbiAgICBpZiAobm9kZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cbiAgICAvLyBJZiBqdXN0IGEgdGV4dG5vZGUgKG9yIGVtcHR5KSwgcmV0dXJuIGEgc3Bhbi4gVGV4dCBpcyBpbmNvbXBhdGlibGUgd2l0aCBIVE1MRWxlbWVudCBzbyBjYW4ndCByZXR1cm4gdGhhdFxuICAgIC8vIGUuZy4gXCJIZWxsbyB3b3JsZFwiXG4gICAgaWYgKCF3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIGlmIChpbmxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyOyAvLyBUaGlzIGlzIGEgc3BhblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNwYW4od3JhcHBlci5pbm5lckhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEVsc2UgcmV0dXJuIHRoZSBzaW5nbGUgY2hpbGQuXG4gICAgLy8gZS5nLiBcIjxkaXY+PGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj48L2Rpdj5cIlxuICAgIHJldHVybiB3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkO1xufVxuZXhwb3J0cy5jcmVhdGVIdG1sID0gY3JlYXRlSHRtbDtcbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHdpdGggYW55IGh0bWwuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KGh0bWwpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gZGl2KChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIHJldHVybiBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQod3JhcHBlcik7XG59XG5leHBvcnRzLmNyZWF0ZUZyYWdtZW50ID0gY3JlYXRlRnJhZ21lbnQ7XG5mdW5jdGlvbiBkaXYoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuZGl2ID0gZGl2O1xuZnVuY3Rpb24gc3BhbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFNwYW5FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuc3BhbiA9IHNwYW47XG5mdW5jdGlvbiBwYXJhZ3JhcGgoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxQYXJhZ3JhcGhFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMucGFyYWdyYXBoID0gcGFyYWdyYXBoO1xuZnVuY3Rpb24gYW5jaG9yKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBocmVmT3JQcm9wZXJ0aWVzID0ge30sIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBocmVmT3JQcm9wZXJ0aWVzID0ge30sIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIGhyZWZPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICBjb25zdCB0bXAgPSBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MQW5jaG9yRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgaWYgKHR5cGVvZiBocmVmT3JQcm9wZXJ0aWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB0bXAuaHJlZiA9IFN0cmluZyhocmVmT3JQcm9wZXJ0aWVzIHx8ICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRtcDtcbn1cbmV4cG9ydHMuYW5jaG9yID0gYW5jaG9yO1xuZnVuY3Rpb24gYnV0dG9uKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MQnV0dG9uRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmJ1dHRvbiA9IGJ1dHRvbjtcbi8vIENvbW1vbiBwcml2YXRlIGZ1bmN0aW9ucyBmb3Igb3ZlcmxvYWRzLiBQcmV2ZW50cyBsb3RzIG9mIGNvcHlwYXN0YS5cbi8vIFRoaXMgd29ya3MgZm9yIGV2ZXJ5dGhpbmcgYmVjYXVzZSBUeXBlU2NyaXB0IGlzIGtlZXBpbmcgdGhlIHR5cGVzIHZhbGlkLiBJbiBwdXJlIEpTLCBidWdzIGNvdWxkIGJlIGNyZWF0ZWQgKGZvciBleGFtcGxlLCBwYXNzaW5nIGFuIGlubmVyXG4vLyBlbGVtZW50IHRvIGEgcGFyYWdyYXBoIC4uLiBkaXNhbGxvd2VkIGJ5IFRTIGJ1dCB0aGUgY29kZSBpcyB0aGVyZSBpbiB0aGUgSlMpXG5mdW5jdGlvbiBfaW50ZXJuYWwodHlwZSwgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGlmIChodG1sT3JQcm9wZXJ0aWVzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIxKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaHRtbE9yUHJvcGVydGllcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gX292cjModHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX292cjIodHlwZSwgU3RyaW5nKGh0bWxPclByb3BlcnRpZXMgfHwgJycpLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfb3ZyMSh0eXBlLCBpbm5lckVsZW1lbnQsIHByb3BzLCBhdHRycykge1xuICAgIGNvbnN0IGUgPSBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG4gICAgZS5hcHBlbmRDaGlsZChpbm5lckVsZW1lbnQpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gX292cjIodHlwZSwgaW5uZXJIdG1sLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IGlubmVySHRtbDtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuZnVuY3Rpb24gX292cjModHlwZSwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBwcm9wcy5pbm5lckhUTUwgfHwgJyc7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZWxldGUgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVDb250ZW50KG5vZGUpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xuICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG59XG5leHBvcnRzLmRlbGV0ZU5vZGVDb250ZW50ID0gZGVsZXRlTm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBoZWxwZXIgZm9yIENyZWF0ZUVsZW1lbnQsIHJvdWdobHkgbWFwcGluZyB0byBIdG1sRWxlbWVudCB0eXBlcywgYnV0IG5vdCBwZXJmZWN0bHkgYmVjYXVzZSBpdCdzIGltcG9zc2libGVcbiAqICh0aGVyZSdzIG5vIHBlcmZlY3QgMToxIHJlbGF0aW9uc2hpcCkuXG4gKi9cbnZhciBlbGVtZW50VHlwZTtcbihmdW5jdGlvbiAoZWxlbWVudFR5cGUpIHtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBbmNob3JFbGVtZW50XCJdID0gXCJhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXJlYUVsZW1lbnRcIl0gPSBcImFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBdWRpb0VsZW1lbnRcIl0gPSBcImF1ZGlvXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQlJFbGVtZW50XCJdID0gXCJiclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJhc2VGb250RWxlbWVudFwiXSA9IFwiYmFzZWZvbnRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCbG9ja1F1b3RlRWxlbWVudFwiXSA9IFwiYmxvY2txdW90ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJ1dHRvbkVsZW1lbnRcIl0gPSBcImJ1dHRvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTENhbnZhc0VsZW1lbnRcIl0gPSBcImNhbnZhc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFFbGVtZW50XCJdID0gXCJkYXRhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGF0YUxpc3RFbGVtZW50XCJdID0gXCJkYXRhbGlzdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpYWxvZ0VsZW1lbnRcIl0gPSBcImRpYWxvZ1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpdkVsZW1lbnRcIl0gPSBcImRpdlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERMaXN0RWxlbWVudFwiXSA9IFwiZGxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxFbWJlZEVsZW1lbnRcIl0gPSBcImVtYmVkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRmllbGRTZXRFbGVtZW50XCJdID0gXCJmaWVsZHNldFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZvcm1FbGVtZW50XCJdID0gXCJmb3JtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzFFbGVtZW50XCJdID0gXCJoMVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcyRWxlbWVudFwiXSA9IFwiaDJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nM0VsZW1lbnRcIl0gPSBcImgzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzRFbGVtZW50XCJdID0gXCJoNFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc1RWxlbWVudFwiXSA9IFwiaDVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNkVsZW1lbnRcIl0gPSBcImg2XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSFJFbGVtZW50XCJdID0gXCJoclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEltYWdlRWxlbWVudFwiXSA9IFwiaW1hZ2VcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbnB1dEVsZW1lbnRcIl0gPSBcImlucHV0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGFiZWxFbGVtZW50XCJdID0gXCJsYWJlbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExlZ2VuZEVsZW1lbnRcIl0gPSBcImxlZ2VuZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExJRWxlbWVudFwiXSA9IFwibGlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMaW5rRWxlbWVudFwiXSA9IFwibGlua1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1hcEVsZW1lbnRcIl0gPSBcIm1hcFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1ldGVyRWxlbWVudFwiXSA9IFwibWV0ZXJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2REZWxFbGVtZW50XCJdID0gXCJkZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2RJbnNFbGVtZW50XCJdID0gXCJpbnNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPTGlzdEVsZW1lbnRcIl0gPSBcIm9sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT2JqZWN0RWxlbWVudFwiXSA9IFwib2JqZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3B0R3JvdXBFbGVtZW50XCJdID0gXCJvcHRncm91cFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdGlvbkVsZW1lbnRcIl0gPSBcIm9wdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE91dHB1dEVsZW1lbnRcIl0gPSBcIm91dHB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBhcmFncmFwaEVsZW1lbnRcIl0gPSBcInBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhbUVsZW1lbnRcIl0gPSBcInBhcmFtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGljdHVyZUVsZW1lbnRcIl0gPSBcInBpY3R1cmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcmVFbGVtZW50XCJdID0gXCJwcmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcm9ncmVzc0VsZW1lbnRcIl0gPSBcInByb2dyZXNzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUXVvdGVFbGVtZW50XCJdID0gXCJxXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2NyaXB0RWxlbWVudFwiXSA9IFwic2NyaXB0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2VsZWN0RWxlbWVudFwiXSA9IFwic2VsZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU291cmNlRWxlbWVudFwiXSA9IFwic291cmNlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3BhbkVsZW1lbnRcIl0gPSBcInNwYW5cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTdHlsZUVsZW1lbnRcIl0gPSBcInN0eWxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDYXB0aW9uRWxlbWVudFwiXSA9IFwiY2FwdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50XCJdID0gXCJ0ZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnRcIl0gPSBcInRoXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xFbGVtZW50XCJdID0gXCJjb2xcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNvbEdyb3VwRWxlbWVudFwiXSA9IFwiY29sZ3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUVsZW1lbnRcIl0gPSBcInRhYmxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVSb3dFbGVtZW50XCJdID0gXCJ0clwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkJvZHlFbGVtZW50XCJdID0gXCJ0Ym9keVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkZvb3RlckVsZW1lbnRcIl0gPSBcInRmb290XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uSGVhZGVyRWxlbWVudFwiXSA9IFwidGhlYWRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUZW1wbGF0ZUVsZW1lbnRcIl0gPSBcInRlbXBsYXRlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGV4dEFyZWFFbGVtZW50XCJdID0gXCJ0ZXh0YXJlYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRpbWVFbGVtZW50XCJdID0gXCJ0aW1lXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVHJhY2tFbGVtZW50XCJdID0gXCJ0cmFja1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFVMaXN0RWxlbWVudFwiXSA9IFwidWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxWaWRlb0VsZW1lbnRcIl0gPSBcInZpZGVvXCI7XG59KShlbGVtZW50VHlwZSA9IGV4cG9ydHMuZWxlbWVudFR5cGUgfHwgKGV4cG9ydHMuZWxlbWVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKGlucHV0KSB7XG4gICAgLy8gVGhlcmUgaXNuJ3QgYSBidWlsdC1pbiB3YXkgdG8gZG8gdGhpcywgc3RpbGwsIHNvIHdlIG5lZWQgYSBoZWxwZXIgZnVuY3Rpb24uXG4gICAgLy8gVGhlIGFydGljbGUgXCJZb3UgYXJlIHByb2JhYmx5IG1pc3VzaW5nIERPTSB0ZXh0IG1ldGhvZHNcIiBjb252aW5jZWQgbWUgdG8gZG8gaXQgdGhpcyB3YXksXG4gICAgLy8gdnMuIGNyZWF0ZVRleHROb2RlLiBUaG91Z2ggY3JlYXRlVGV4dE5vZGUgd291bGQgcHJvYmFibHkgd29yayBmaW5lIGZvciBzZXR0aW5nIGlubmVySFRNTC5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgICAgICBcIj1cIjogXCImI3gzRDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMzOTtcIixcbiAgICAgICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgICB9O1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIHMgPT4gZXNjYXBlc1tzXSk7XG59XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEdldCB0aGUgY29udGVudHMgb2YgYW55IGh0bWwgbm9kZSBhcyBhIERvY3VtZW50RnJhZ21lbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3ROb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XG59XG5leHBvcnRzLmV4dHJhY3ROb2RlQ29udGVudCA9IGV4dHJhY3ROb2RlQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZmluZEluZGV4SW5QYXJlbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuaW5kZXhPZihlbGVtZW50KTtcbiAgICB9XG59XG5leHBvcnRzLmZpbmRJbmRleEluUGFyZW50ID0gZmluZEluZGV4SW5QYXJlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBIVE1MIGlzIGluY29uc2lzdGVudC4gR2V0dGluZyB0aGUgdmFsdWUgb2YgZm9ybSBmaWVsZHMgaXMgYSBiaXQgY29tcGxpY2F0ZWQsIG5vdCBhbHdheXMgZWxlbWVudC52YWx1ZSxcbiAqIHNvIGhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCkge1xuICAgIC8vIEl0IHdvdWxkIGJlIHJlYWxseSBuaWNlIGF0IHRoaXMgcG9pbnQgaWYgSlMgY291bGQgc2VlIGdlbmVyaWMgcGFyYW1ldGVycy5cbiAgICAvLyBJZiBpdCBjb3VsZCwgdGhlbiB0aGUgY29kZSBjb3VsZCBzYXkgXCJpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiBUT3V0cHV0ICE9PSBib29sZWFuKSB0aHJvdyBuZXcgRXJyb3IoKVwiXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RWYWx1ZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGb3JtRmllbGRWYWx1ZSA9IGdldEZvcm1GaWVsZFZhbHVlO1xuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0LmNoZWNrZWQ7XG59XG5leHBvcnRzLmdldENoZWNrYm94VmFsdWUgPSBnZXRDaGVja2JveFZhbHVlO1xuZnVuY3Rpb24gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlcklucHV0VmFsdWUgPSBnZXROdW1iZXJJbnB1dFZhbHVlO1xuZnVuY3Rpb24gZ2V0UmFkaW9WYWx1ZShpbnB1dCkge1xuICAgIC8vIFJhZGlvIGJ1dHRvbnMgYXJlIHdlaXJkLiBXZSB3YW50IHRoZW0gdG8gYXBwZWFyIHRvIGJlIG1vcmUgbm9ybWFsLlxuICAgIGlmIChpbnB1dC5uYW1lKSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aW5wdXQubmFtZX1cIl06Y2hlY2tlZGApIHx8IHt9KS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSWYgbm8gbmFtZSwgZmFsbCBiYWNrIHRvIHRoaXNcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRSYWRpb1ZhbHVlID0gZ2V0UmFkaW9WYWx1ZTtcbmZ1bmN0aW9uIGdldFNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZWxlY3RWYWx1ZSA9IGdldFNlbGVjdFZhbHVlO1xuZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3Quc2VsZWN0ZWRPcHRpb25zKS5maWx0ZXIoZiA9PiBmLnZhbHVlKS5tYXAobSA9PiBtLnZhbHVlKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlTZWxlY3RWYWx1ZSA9IGdldE11bHRpU2VsZWN0VmFsdWU7XG4vLyBUaGlzIGlzIGFsbW9zdCBwb2ludGxlc3MuIEp1c3QgaGVyZSBmb3IgY29uc2lzdGVuY3kuXG5mdW5jdGlvbiBnZXRTaW1wbGVGb3JtVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIGZvciBtdWx0aS1zZWxlY3RzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuZXhwb3J0cy5nZXRTaW1wbGVGb3JtVmFsdWUgPSBnZXRTaW1wbGVGb3JtVmFsdWU7XG4vKipcbiAqIFNldHRpbmcgdmFsdWVzIGlzIGp1c3QgYXMgY29tcGxpY2F0ZWQgYXMgZ2V0dGluZyB0aGVtLCBiZWNhdXNlIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBZb3UgY2FuJ3QganVzdCBzYXkgZWxlbWVudC52YWx1ZSA9IGZvby5cbiAqIEhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gc2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAvLyBIZXJlIHlvdSBjYW4gdmFsaWRhdGUgdGhlIHR5cGUgYmVmb3JlIHNldHRpbmcgb3IgZG8gc29tZSBraW5kIG9mIGNvbnZlcnNpb24uXG4gICAgLy8gRm9yIG11bHRpLXNlbGVjdHMsIGNhbiBhdXRvLXdyYXAgdmFsdWUgaW4gc3RyaW5nLlxuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpOyAvLyB1c2VkIGluIG1vc3Qgb2YgdGhlIGNhc2VzXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCBzdHJpbmdWYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHN0cmluZ1ZhbHVlID09PSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShzdHJpbmdWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRldGltZScgfHwgdHlwZSA9PT0gJ2RhdGV0aW1lLWxvY2FsJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdHJpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBgJHt0b0RhdGVTdHJpbmcoZGF0ZSl9VCR7dG9UaW1lU3RyaW5nKGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzZWxlY3Qub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7IC8vIHRyZWF0aW5nIGl0IGxpa2UgYSBub24tbXVsdGlwbGUgd29ya3NcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb25leGlzdGVudCBvcHRpb25zIGNhbm5vdCBiZSBzZXQuIFdlIHNob3VsZCBsZXQgdGhlIHByb2dyYW1tZXIga25vdy4gRXZlbiB0aG91Z2ggdGhpcyB0YWtlcyBDUFUgY3ljbGVzLlxuICAgICAgICAgICAgdmFsdWUubWFwKG0gPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdmFsdWUubWFwKG0gPT4gbS50b1N0cmluZygpKS5pbmRleE9mKG9wdC52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIG9uIG5vbi1mb3JtIGZpZWxkICR7ZWxlbWVudC50YWdOYW1lfSAke2VsZW1lbnQuaWQgfHwgJyd9YCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbCkge1xuICAgICAgICAvLyBJZiB5b3Ugc2V0IHRoZSB2YWx1ZSBvZiBhIHNlbGVjdCB0byBzb21ldGhpbmcgdGhhdCBpcyBub3QgYW4gYXZhaWxhYmxlIG9wdGlvbiwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgICAgY29uc3QgaGFzT3B0aW9uID0gb3B0aW9ucy5tYXAobSA9PiBtLnZhbHVlKS5pbmRleE9mKHZhbC50b1N0cmluZygpKSA+IC0xO1xuICAgICAgICBpZiAoIWhhc09wdGlvbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIHdpdGggbm9uZXhpc3RlbnQgb3B0aW9uICR7dmFsLnRvU3RyaW5nKCl9IG9uIHNlbGVjdCAke2VsZW1lbnQuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlc2UgY291bGQgYmUgcmVhZGFibGUgb25lbGluZXJzIGlmIHdlIGhhZCBwYWRTdGFydCgpIGJ1dCBpdCdzIG5vdCB3b3J0aCBidW1waW5nIHRvIEVTMjAxNyBmb3Igb25lIG1ldGhvZFxuICAgIGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGggPSAoJzAnICsgKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgZGF5ID0gKCcwJyArIGRhdGUuZ2V0VVRDRGF0ZSgpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0VVRDRnVsbFllYXIoKX0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9UaW1lU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3VyID0gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBtaW51dGUgPSAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5zZXRGb3JtRmllbGRWYWx1ZSA9IHNldEZvcm1GaWVsZFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3Iobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvciA9IG5vZGVMaXN0U2VsZWN0b3I7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3JBbGwobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgYnJvd3NlciBjYW4gbG9zZSByZWZlcmVuY2VzIHdoZW4gbW92aW5nIG5vZGVzLCB0aGlzIGNhbiBhbHNvIHRha2UgYSByZWd1bGFyIGFycmF5LlxuICAgIC8vIEJlY2F1c2UgSFRNTDUgaGFzIHRvdGFsbHkgZmFsbGVuIG92ZXIsIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgZml4ZWQgbm9kZUxpc3RTZWxlY3RvckFsbFxuICAgIC8vIHRvIG1hdGNoIHRoZSBvdXRwdXQgc2lnbmF0dXJlIG9mIHF1ZXJ5U2VsZWN0b3JBbGwgKE5vZGVMaXN0T2Y8RWxlbWVudD4gaW5zdGVhZCBvZiBhcnJheSkuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uQXJyYXkuZnJvbShzZWFyY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3JBbGwgPSBub2RlTGlzdFNlbGVjdG9yQWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIElmIHRoZSBkb2N1bWVudCBjb250YWlucyBhbnkgZHVwbGljYXRlIElEcywgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVVuaXF1ZURvbUlkcygpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgZm9vIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJypbaWRdJykpIHtcbiAgICAgICAgaWRzLmFkZChmb28uaWQpO1xuICAgICAgICBpKys7XG4gICAgICAgIGlmIChpZHMuc2l6ZSAhPT0gaSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgRE9NIElEcyBmb3VuZC4gVGhlIGZpcnN0IGR1cGxpY2F0ZSBpZCBpcyAke2Zvb30uYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlVW5pcXVlRG9tSWRzID0gdmFsaWRhdGVVbmlxdWVEb21JZHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gKHJlc3VsdCkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUocmVzdWx0KSwgdGltZSkpO1xufVxuZXhwb3J0cy5kZWxheSA9IGRlbGF5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJldHVybiBlbGVtZW50cyBvZiBhcnJheSBhIGxpbmVkIHVwIHdpdGggZWxlbWVudHMgb2YgYXJyYXkgYi4gQm90aCBhcnJheXMgZG9uJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoID49IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFtlbGVtZW50LCBiW2luZGV4XV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2FbaW5kZXhdLCBiXSk7XG4gICAgfVxufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vKipcbiAqIFJldHVybiBhIGNhcnRlc2lhbiBqb2luIChjcm9zcyBqb2luKSBiZXR3ZWVuIGFycmF5cyBhIGFuZCBiLlxuICovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYikge1xuICAgIC8vLyB0eXBlc2NyaXB0IHByZXZlbnRzIGEgZGlyZWN0IHVzZSBvZiBjb25jYXQsIHNvIGRvIHRoaXMgbWFudWFsbHkgd2l0aCBhIGxvb3BcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGEpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmIubWFwKHEgPT4gW2l0ZW0sIHFdKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5jYXJ0ZXNpYW4gPSBjYXJ0ZXNpYW47XG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZ2Ugb2YgaW50ZWdlcnMsIGNvdW50aW5nIHVwIGJ5IDEsIGZvciB0aGUgZ2l2ZW4gbGVuZ3RoLiBTdG9sZW4gZnJvbSBQeXRob24uXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG59XG5leHBvcnRzLnJhbmdlID0gcmFuZ2U7XG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGl0ZW1zIGFuZCBvdGhlciBhcnJheXMsIGZsYXR0ZW4gdGhlbSBvdXQgaW50byBhIHNpbmdsZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24qIHRyYXZlcnNlKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHlpZWxkIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGFycikge1xuICAgICAgICAgICAgeWllbGQqIHRyYXZlcnNlKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogTWFrZSBpdCBlYXNpZXIgdG8gY3JlYXRlIHNpbXBsZSBjb21wYXJpc29uIGZ1bmN0aW9ucyBvbiAocG9zc2libHkgY29tcGxleCkgb2JqZWN0cy4gVHlwaWNhbCB1c2U6IGFyci5zb3J0KG9yZGVyQnkobyA9PiBvLmlkKSlcbiAqL1xuZnVuY3Rpb24gb3JkZXJCeShwcm9wZXJ0eUZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBwcm9wZXJ0eUZuKGZpcnN0KTtcbiAgICAgICAgY29uc3Qgc2Vjb25kVmFsdWUgPSBwcm9wZXJ0eUZuKHNlY29uZCk7XG4gICAgICAgIGlmIChmaXJzdFZhbHVlIDwgc2Vjb25kVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RWYWx1ZSA+IHNlY29uZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xufVxuZXhwb3J0cy5vcmRlckJ5ID0gb3JkZXJCeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIGtleXdvcmQgYXJndW1lbnRzLCBhcyBzZWVuIGluIFB5dGhvbiBhbmQgQyMuIEl0IG1ha2VzIGNvbmZpZ3VyYWJsZVxuICogZnVuY3Rpb25zIHNvIG11Y2ggcXVpY2tlciBhbmQgZWFzaWVyIHRoYW4gZmxhdCBhcmd1bWVudHMgKGZvcmNpbmcgeW91IHRvIHB1dCB1bmRlZmluZWQgbWFudWFsbHkgaW4gZGlmZmVyZW50XG4gKiBzbG90cykgb3Igb3B0aW9ucyBvYmplY3RzICh0YWtlcyBtb3JlIHRpbWUgdG8gcHJvZHVjZSwgZXNwZWNpYWxseSBpZiB5b3UgbmVlZCB0byBuZXcgaXQgdXApLlxuICpcbiAqIENhbGwgZnVuY3Rpb25zIGhhdmluZyBrZXl3b3JkIGFyZ3VtZW50cyB1c2luZyB0aGlzIHN5bnRheDpcbiAqIGNhbGxtZShhcmcxLCBhcmcyLCBrdygnc29tZXRoaW5nJywga3cxKSwga3coJ3NvbWV0aGluZ0Vsc2UnLCBrdzIpKVxuICpcbiAqIFRvIG1ha2UgdGhlbSB3b3JrLCBpbiB0aGUgZnVuY3Rpb24gaXRzZWxmLCB5b3UgbmVlZCB0byBjb3B5IGFuZCBwYXN0ZS4gRm9yIGV4YW1wbGU6XG4gKiAoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSA9IEt3YXJnLnBhcnNlKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0pKTtcbiAqL1xuY2xhc3MgS3dhcmcge1xuICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgaWYgKCFhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gYTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbWVtYmVyIHRoaXMgdGVtcGxhdGU6XG4gICAgICogKHsgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0pKTtcbiAgICAgKiBJbmNsdWRlIGRlZmF1bHQgdmFsdWVzIGluIHRoZSBmaXJzdCBvYmplY3QsIG5vdCB0aGUgc2Vjb25kLlxuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgdG8gY2FwdHVyZSByZXN0IHBhcmFtZXRlcnMsIHVzZSB0aGlzOlxuICAgICAqICh7ICRyZXN0JCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgLCAuLi5yZXN0IH0pKTtcbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IGFsbG93VW5rbm93bktleXdvcmQgdG8gYmUgdHJ1ZSwgdXNlIHRoaXM6XG4gICAgICogKHsgJCRrdyQkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9LCB0cnVlKSk7XG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlQXJncyhhcmdzLCBhbGxvd1Vua25vd25LZXl3b3JkID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB0aGlzIGNvdWxkIHRha2UgdGhlIGFyZ3VtZW50cyBvYmplY3QsIGJ1dCBzYWRseSBhcmd1bWVudHMgc3RvcmVzIG9ubHkgYW4gYXJyYXkgb2YgdmFsdWVzLFxuICAgICAgICAvLyBubyBrZXlzLiBJZiBKUyB3ZXJlIHNhbmUsIGl0IHdvdWxkIGJlIGEgTWFwLCBub3QgYW4gYXJyYXkuIFR3byBzdGVwcyBmb3J3YXJkLCBvbmUgc3RlcCBiYWNrLlxuICAgICAgICAvLyBQYXJzaW5nIHRoZSBzdHJpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uIGlzIG5vdCBteSBjdXAgb2YgdGVhLCBzbyBqdXN0IG5vLlxuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkgYXJndW1lbnQgb3JkZXJcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSBhcmdzW2FyZ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga3d2YXIgPSB7fTtcbiAgICAgICAgb2JqWyckJGt3JCQnXSA9IGt3dmFyO1xuICAgICAgICAvLyBDaGVjayBmb3IgcmVzdCBwYXJhbWV0ZXJzLlxuICAgICAgICAvLyBJIHdhcyBnb2luZyB0byBoYXZlIHRoaXMgb24vb2ZmIGNvbmZpZ3VyYWJsZSwgYnV0IGl0IHNob3VsZG4ndCBodXJ0IHBlcmZvcm1hbmNlLlxuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgb2JqWyckcmVzdCQnXSA9IGFycjtcbiAgICAgICAgLy8gUmVzdCBwYXJhbWV0ZXJzIGFyZSBzdG9yZWQgYXMgYXJyYXkga2V5cywgeyAnMCc6IGEsICcxJzogYiwgJ25vblJlc3QnOiAnc29tZXRoaW5nIGVsc2UnfVxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKS5maWx0ZXIoZiA9PiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhmKSkpIHtcbiAgICAgICAgICAgIGlmICghKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGFyZ3NbYXJnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5d29yZHNVc2VkID0ge307XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGtleXdvcmQgbmFtZVxuICAgICAgICAvLyBIYXZlIHRvIGl0ZXJhdGUgdGhlIGxpc3QgdHdpY2UsIHRvIGF2b2lkIHdpcGluZyBvdXQgZGF0YSBpZiB0aGUgb3JkZXIgaXMgc3dhcHBlZFxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gYXJnc1thcmddO1xuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd1Vua25vd25LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrd3Zhclt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBhbiB1bmV4cGVjdGVkIGtleXdvcmQgYXJndW1lbnQgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBrZXl3b3Jkc1VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgbXVsdGlwbGUgdmFsdWVzIGZvciBrZXl3b3JkIGFyZ3VtZW50ICsgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXl3b3Jkc1VzZWRbdG1wLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICAvLyBUdXJuIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGtleXdvcmQgYXJndW1lbnRzLlxuICAgIC8vIE5lZWRzIHRvIHJldHVybiBhbnlbXSBiZWNhdXNlIGl0J3MgZ29pbmcgdG8gYmUgc2hvdmVkIGludG8gYXJiaXRyYXJ5IGFyZ3VtZW50IGxpc3RzXG4gICAgc3RhdGljIHVucGFjayhhcmdzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChrdyhhcmcsIGFyZ3NbYXJnXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBpc01hdGNoKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBrZXk7XG4gICAgfVxufVxuZXhwb3J0cy5Ld2FyZyA9IEt3YXJnO1xuZnVuY3Rpb24ga3coYSwgYikge1xuICAgIGlmICghYSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGEsIGIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDJcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhWzBdLCBhWzFdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDNcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGggb25seSBvbmUga2V5L3ZhbHVlIHBhaXIuXG4gICAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSk7XG4gICAgICAgIGlmICghcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXAgb2JqZWN0OiBtdWx0aXBsZSBrZXlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhwcm9wc1swXSwgYVtwcm9wc1swXV0pO1xuICAgIH1cbn1cbmV4cG9ydHMua3cgPSBrdztcbmZ1bmN0aW9uIGt3YXJnc1RvT2JqZWN0KGFycikge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcnIpIHtcbiAgICAgICAgb3B0aW9uc1thcmcubmFtZV0gPSBvcHRpb25zW2FyZy52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuZXhwb3J0cy5rd2FyZ3NUb09iamVjdCA9IGt3YXJnc1RvT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpc05vbmUodGVzdCkge1xuICAgIHJldHVybiAodGVzdCA9PSBudWxsIHx8IHRlc3QgPT09IHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmlzTm9uZSA9IGlzTm9uZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY2xvbmVEZWVwKG9iaiwgaGFzaCA9IG5ldyBXZWFrTWFwKCkpIHtcbiAgICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgICAgICByZXR1cm4gb2JqOyAvLyBwcmltaXRpdmUgdHlwZXNcbiAgICB9XG4gICAgaWYgKGhhc2guaGFzKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGhhc2guZ2V0KG9iaik7IC8vIHJlZmVyZW5jZSB0byBvYmplY3QgcHJldmlvdXNseSBzZWVuXG4gICAgfVxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgU2V0KCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCB2YWwgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgKFtrZXksIHZhbF0pID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKGtleSwgaGFzaCksIGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBBcnJheS5mcm9tKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgb2JqLmZsYWdzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBUaGlzIGlzIGF3ZnVsIGNvZGUsIGJ1dCBpdCdzIHRoZSBvbmx5IHdheSB0byBjbG9uZSBhIHN0YW5kYWxvbmUgZnVuY3Rpb24gKHZzIGEgbWV0aG9kIHdoaWNoIGhhcyBhIGRlc2NyaXB0b3IpLlxuICAgICAgICAvLyBJbiBnZW5lcmFsLCB5b3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgY2xvbmVEZWVwIG9uIGZ1bmN0aW9ucy4gWW91J2xsIHNlZSBpdCdzIE5PVCB1c2VkIG9uIGludGVybmFsIG1ldGhvZHMuXG4gICAgICAgIHJlc3VsdCA9IG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBvYmoudG9TdHJpbmcoKSkoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBoYXNoLnNldChvYmosIHJlc3VsdCk7IC8vIEtlZXAgdHJhY2sgb2Ygb2JqZWN0cyBwcmV2aW91c2x5IGNsb25lZFxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiAhKGtleSBpbiByZXN1bHQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgbWV0aG9kcyB0aGF0IGFyZW4ndCBpbiB0aGUgcHJvdG90eXBlLlxuICAgICAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHJlY3Vyc2l2ZWx5IGZvbGxvdyBiZWNhdXNlIHRoZXJlJ3Mgbm90aGluZyByZWN1cnNpdmUgdG8gZG8uXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgaGFzaC5zZXQob2JqW2tleV0sIHJlc3VsdFtrZXldKTtcbiAgICAgICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIG1ldGhvZC5cbiAgICAgICAgICAgICAgICAvLyBJZiBleHRyYSBrZXlzIGFyZSB0aHJvd24gb250byBhIGZ1bmN0aW9uLCB0aGV5IHByb2JhYmx5IHdpbGwgbm90IGJlIGNsb25lZC5cbiAgICAgICAgICAgICAgICAvLyBJbiBteSBleHBlcmllbmNlLCBleHRyYSBrZXlzIG9uIGZ1bmN0aW9ucyBkaWRuJ3Qgd29yayByaWdodCwgc28gbm8gYmlnIGxvc3MuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgY3VzdG9tIGdldHRlcnMvc2V0dGVycy4gVGhlc2UgYXJlIGxvY2FsIGFuZCBob3BlZnVsbHkgd29yayBqdXN0IGxpa2UgbWV0aG9kcy5cbiAgICAgICAgICAgIC8vIEluIG1hbnkgY2FzZXMsIHRoaXMgaXMgcmVkdW5kYW50IHdpdGggT2JqZWN0LmNyZWF0ZSgpLCBidXQgaXMgbmVjZXNzYXJ5IHRvIGFsbG93IG9iamVjdHMgd2l0aCBtYW51YWxseS1hZGRlZCBjdXN0b20gZ2V0dGVycy5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIGdldHRlci9zZXR0ZXIuXG4gICAgICAgICAgICAvLyBBTFNPIGhhc2ggbm90IHVwZGF0ZWQ7IHRoaXMgaXMgbm90IHBvc3NpYmxlLCBiZWNhdXNlIGl0IHdpbGwgbWFwIHRoZSB2YWx1ZSBpdCBnZXRzLCBub3QgdGhlIGdldHRlci5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gY2xvbmVEZWVwKG9ialtrZXldLCBoYXNoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jbG9uZURlZXAgPSBjbG9uZURlZXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEkgZG9uJ3Qga25vdyBmb3Igc3VyZSBpZiB0aGlzIHdpbGwgd29yayBpbiBhbGwgY2FzZXMuXG4vLyBJdCBnZXRzIGRlZXBlciBpbnRvIHRoZSBndXRzIG9mIEpTIG9iamVjdCB0aGFuIEkgaGF2ZSBleHBlcmllbmNlIHdpdGguXG5mdW5jdGlvbiBjbG9uZU9iamVjdChvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jbG9uZU9iamVjdCA9IGNsb25lT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuLyoqXG4gKiBBIHBzZXVkby1yYW5kb20gcHJlZml4IHBsdXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIHRoZSB1bml4IGVwb2NoLiBUaGUgcmFuZG9tIHBhcnQgc2hvdWxkIGJlIHJhbmRvbSBlbm91Z2ggdG8gY292ZXJcbiAqIG11bHRpcGxlIGlkcyBjcmVhdGVkIGluIGEgbWlsbGlzZWNvbmQuXG4gKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZUlkKCkge1xuICAgIGNvbnN0IGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLV8nO1xuICAgIGxldCByZXN1bHQgPSAndScgKyBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpICsgJy0nO1xuICAgIGZvciAoY29uc3QgXyBvZiBBcnJheVV0aWxpdGllc18xLnJhbmdlKDgpKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmdldFVuaXF1ZUlkID0gZ2V0VW5pcXVlSWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGVsbCBpZiBhIGdpdmVuIHN0cmluZyBpcyBhIHBvc2l0aXZlIGludGVnZXIuXG4gKiBVc2UgZm9yIGRldGVjdGluZyBhcnJheSBrZXlzLlxuICovXG5mdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHIgPT09ICcwJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC9eWzEtOV1cXGQqJC8udGVzdChzdHIpO1xufVxuZXhwb3J0cy5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyA9IGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDbG9uZU9iamVjdF8xID0gcmVxdWlyZShcIi4vQ2xvbmVPYmplY3RcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBPYmplY3QuYXNzaWduKCkgY2FuIGJlIHVzZWQgZm9yIHNpbXBsZSBjb3BpZXMgb2YgcHJvcGVydGllcywgYnV0IGl0IG1pc3NlcyBnZXR0ZXJzLFxuICogc2V0dGVycywgYW5kIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJdCBvbmx5IGdldHMgdGhlIGxvY2FsIHZhbHVlcy5cbiAqXG4gKiBUaGlzIHNob3VsZCBob3BlZnVsbHkgcmVzb2x2ZSB0aGF0LCBidXQgSSBkb24ndCBrbm93IGZvciBzdXJlLiBUaGlzIGlzIHZlcnkgc2tldGNoeS5cbiAqIFRoZSByZXN1bHRzIGFyZSBjb21wbGV0ZWx5IGZsYXQsIGJlY2F1c2UgeW91IGNhbid0IGhhdmUgbXVsdGlwbGUgaW5oZXJpdGFuY2UgaGllcmFyY2h5XG4gKiBpbiBhIGxhbmd1YWdlIHdpdGhvdXQgbXVsdGlwbGUgaW5oZXJpdGFuY2UuIEJlY2F1c2UgdGhpcyBmbGF0dGVucyBvYmplY3RzLCBpdCBpcyBndWFyYW50ZWVkXG4gKiB0byBicmVhayBhbnl0aGluZyB0aGF0IG1ha2VzIHN1cGVyIGNhbGxzLlxuICpcbiAqIElmIHJldHVybkNsb25lIGlzIHRydWUsIGEgY2xvbmUgb2YgdGhlIHRhcmdldCBvYmplY3Qgd2lsbCBiZSBtb2RpZmllZCBhbmQgcmV0dXJuZWQsIGxlYXZpbmdcbiAqIHRoZSBvcmlnaW5hbCB1bnRvdWNoZWQuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEZ1bGxBc3NpZ24odGFyZ2V0LCBzb3VyY2UsIHJldHVybkNsb25lID0gZmFsc2UpIHtcbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgaWYgKHJldHVybkNsb25lKSB7XG4gICAgICAgIHRhcmdldCA9IENsb25lT2JqZWN0XzEuY2xvbmVPYmplY3QodGFyZ2V0KTtcbiAgICB9XG4gICAgY29uc3QgbmFtZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZmluZFRoZVByb3BlcnR5TmFtZXMoc291cmNlKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIG5hbWVzKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgICBmdW5jdGlvbiBmaW5kVGhlUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHJlc3VsdC5wdXNoKC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKGYgPT4gZiAhPT0gJ2NvbnN0cnVjdG9yJykpO1xuICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLmZpbmRUaGVQcm9wZXJ0eU5hbWVzKHByb3RvKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5vYmplY3RGdWxsQXNzaWduID0gb2JqZWN0RnVsbEFzc2lnbjtcbiJdfQ==
