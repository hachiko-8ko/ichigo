(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("../../src/HtmlComponent/Component");
const BoundComponent_1 = require("../../src/HtmlComponent/BoundComponent");
const ComponentMap_1 = require("../../src/HtmlComponent/ComponentMap");
(function main() {
    const plugin = {
        Component: Component_1.Component,
        BoundComponent: BoundComponent_1.BoundComponent,
        ComponentMap: ComponentMap_1.ComponentMap,
        getComponent: ComponentMap_1.getComponent,
    };
    window.mi5 = window.mi5 || {};
    window.mi5.component = Object.assign(window.mi5.component || {}, plugin);
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

},{"../../src/HtmlComponent/BoundComponent":8,"../../src/HtmlComponent/Component":9,"../../src/HtmlComponent/ComponentMap":10}],2:[function(require,module,exports){
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

},{"../System/Types/KeywordArguments":22,"./ElementType":3,"./ExtractNodeContent":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"../System/Types/NoneType":23}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../Html/CreateElement":2,"../Html/ElementType":3,"../Html/EscapeHtml":4,"../Html/ExtractNodeContent":5,"../Html/FormFieldValue":6,"../Html/QuerySelectorNodeList":7,"../Observable/IObservable":11,"../Observable/ObservableProperty":13,"../Observable/ObservableState":14,"../System/Types/Constructable":21,"../System/Types/KeywordArguments":22,"../System/Types/NoneType":23,"../System/Utility/Elvis":25,"./Component":9,"./ComponentMap":10}],9:[function(require,module,exports){
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

},{"../Html/CreateElement":2,"../Html/ElementType":3,"../Html/FormFieldValue":6,"../Html/QuerySelectorNodeList":7,"../System/Types/KeywordArguments":22,"../System/Utility/GetUniqueId":26,"./ComponentMap":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
function observableCheck(obj) {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && 'changeHandler' in obj && obj.changeHandler instanceof EventHandler_1.EventHandler;
}
exports.observableCheck = observableCheck;

},{"../System/EventHandler/EventHandler":19}],12:[function(require,module,exports){
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

},{"../System/EventHandler/EventHandler":19}],13:[function(require,module,exports){
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

},{"../Html/EscapeHtml":4,"../System/EventHandler/PropertyChangedEventArgs":20,"../System/Types/NoneType":23,"../System/Utility/IsPrimitive":28,"./IObservable":11,"./ObservableBase":12}],14:[function(require,module,exports){
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

},{"../Html/EscapeHtml":4,"../System/EventHandler/PropertyChangedEventArgs":20,"../System/Types/NoneType":23,"../System/Utility/CloneDeep":24,"../System/Utility/IsPrimitive":28,"./IObservable":11,"./ObservableBase":12}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./DeferredPromise":15}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"../Async/RepeatablePromise":16}],19:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":17,"./Delegate":18}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"../Utility/IsInteger":27}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"../Types/NoneType":23}],26:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":17}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Db21wb25lbnQuanMiLCJzcmMvSHRtbC9DcmVhdGVFbGVtZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcC5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUJhc2UuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHkuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGUuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlZmVycmVkUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQXN5bmMvUmVwZWF0YWJsZVByb21pc2UuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzLmpzIiwic3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvRGVsZWdhdGUuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXIuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGUuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHMuanMiLCJzcmMvU3lzdGVtL1R5cGVzL05vbmVUeXBlLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9FbHZpcy5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXIuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDemNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50XCIpO1xuY29uc3QgQm91bmRDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcFwiKTtcbihmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IHBsdWdpbiA9IHtcbiAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnRfMS5Db21wb25lbnQsXG4gICAgICAgIEJvdW5kQ29tcG9uZW50OiBCb3VuZENvbXBvbmVudF8xLkJvdW5kQ29tcG9uZW50LFxuICAgICAgICBDb21wb25lbnRNYXA6IENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcCxcbiAgICAgICAgZ2V0Q29tcG9uZW50OiBDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQsXG4gICAgfTtcbiAgICB3aW5kb3cubWk1ID0gd2luZG93Lm1pNSB8fCB7fTtcbiAgICB3aW5kb3cubWk1LmNvbXBvbmVudCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5jb21wb25lbnQgfHwge30sIHBsdWdpbik7XG4gICAgLyoqXG4gICAgICogVGhpcyBzbGlnaHRseSBzaW1wbGlmZXMgdGhlIHByb2Nlc3Mgb2YgcmVmZXJlbmNpbmcgbWluaS1pY2hpZ28gY29tcG9uZW50cyB3aXRob3V0IHRoZSBmdWxsIG5hbWVzcGFjZS5cbiAgICAgKiBJdCByZXF1aXJlcyB0d28gYXJndW1lbnRzLCB1bmZvcnR1bmF0ZWx5LCBiZWNhdXNlIGl0J3Mgbm90IHBvc3NpYmxlIGluIG1hbnkgY2FzZXMgdG8gZGV0ZXJtaW5lIHRoZVxuICAgICAqIGNsYXNzIG9yIGZ1bmN0aW9uIG5hbWUuIE9mdGVuIHRoZSAnbmFtZScgcHJvcGVydHkgaGFzIG9ubHkgdGhlIG1pbmlmaWVkIG5hbWUsIGEgcmFuZG9tIGxldHRlci5cbiAgICAgKi9cbiAgICB3aW5kb3cubWk1LnVzaW5nID0gZnVuY3Rpb24gdXNpbmcobGliLCBhbGlhcykge1xuICAgICAgICBpZiAoIWxpYiB8fCAhYWxpYXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTnVsbEFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmV2YWwuY2FsbCh3aW5kb3csICcoZnVuY3Rpb24gKGFyZykgeyB3aW5kb3cuJyArIGFsaWFzICsgJyA9IGFyZzsgfSknKShsaWIpO1xuICAgIH07XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4vRWxlbWVudFR5cGVcIik7XG5jb25zdCBFeHRyYWN0Tm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuL0V4dHJhY3ROb2RlQ29udGVudFwiKTtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgdGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgdGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIC8vIEFsbG93IGF0dHJpYnV0ZXMgdG8gYmUgc2VudCBvbiBwcm9wZXJ0aWVzLCBwcm92aWRpbmcgYSBjbGVhbmVyIGludGVyZmFjZS5cbiAgICAvLyBJdCBhbGxvd3MgeW91IHRvIHNlbmQgY3JlYXRlRWxlbWVudCgnZGl2Jywge2F0dHJpYnV0ZXM6IHsgY2xhc3M6ICdmb28nIH19KSBpbnN0ZWFkIG9mIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsIHsgY2xhc3M6ICdmb28nIH0pO1xuICAgIC8vIEFub3RoZXIgb3B0aW9uIGlzIHRvIHVzZSBLd2FyZ3MsIGJ1dCBub3QgZXZlcnlvbmUgd2FudHMgdG8uXG4gICAgaWYgKHByb3BlcnRpZXMgJiYgJ2F0dHJpYnV0ZXMnIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcyB8fCB7fSwgcHJvcGVydGllcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuYXR0cmlidXRlcztcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG5mdW5jdGlvbiBjcmVhdGUodGFnLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBET00gcHJvcGVydGllcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBhdHRyaWJ1dGVzLCBiZWNhdXNlIGluIHNvbWUgY2FzZXMsIHRoZXkgb3ZlcnJpZGUgdGhlIGluaXRpYWwgdmFsdWUuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBIVE1MIGZyb20gYW55IEhUTUwgZWxlbWVudCBwcm92aWRlZC5cbiAqIFVzZSBsaWtlIGNvbnN0IGRpdiA9IGNyZWF0ZUh0bWw8SFRNTERpdkVsZW1lbnQ+KFwiPGRpdj5Tb21ldGhpbmc8L2Rpdj5cIikgb3IgY29uc3QgY3VzdG9tID0gY3JlYXRlSHRtbChcIjxzb21lLXRhZz48L3NvbWUtdGFnPlwiKS5cbiAqIElmIG11bHRpcGxlIGVsZW1lbnRzIG9yIGEgcGxhaW4gdGV4dCBzdHJpbmcgd2l0aCBubyBIVE1MIGlzIHByb3ZpZGVkLCB0aGVuIGl0IHdpbGwgYmUgd3JhcHBlZCBpbiBhIGRpdiwgc28gaXQgY2FuIGtlZXBcbiAqIHJldHVybmluZyBhbiBIVE1MRWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVIdG1sKGh0bWwsIGlubGluZSA9IGZhbHNlKSB7XG4gICAgbGV0IHdyYXBwZXI7XG4gICAgaWYgKGlubGluZSkge1xuICAgICAgICB3cmFwcGVyID0gc3BhbigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVzID0gd3JhcHBlci5jaGlsZE5vZGVzO1xuICAgIC8vIE11bHRpcGxlIG5vZGVzLCByZXR1cm4gdGhlIHdyYXBwaW5nIGRpdlxuICAgIC8vIGUuZy4gXCJUaGlzIGlzIGEgPGVtPnRlc3Q8L2VtPlwiIG9yIFwiPGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj5cIlxuICAgIGlmIChub2Rlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIC8vIElmIGp1c3QgYSB0ZXh0bm9kZSAob3IgZW1wdHkpLCByZXR1cm4gYSBzcGFuLiBUZXh0IGlzIGluY29tcGF0aWJsZSB3aXRoIEhUTUxFbGVtZW50IHNvIGNhbid0IHJldHVybiB0aGF0XG4gICAgLy8gZS5nLiBcIkhlbGxvIHdvcmxkXCJcbiAgICBpZiAoIXdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgaWYgKGlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7IC8vIFRoaXMgaXMgYSBzcGFuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Bhbih3cmFwcGVyLmlubmVySFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRWxzZSByZXR1cm4gdGhlIHNpbmdsZSBjaGlsZC5cbiAgICAvLyBlLmcuIFwiPGRpdj48ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PjwvZGl2PlwiXG4gICAgcmV0dXJuIHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5leHBvcnRzLmNyZWF0ZUh0bWwgPSBjcmVhdGVIdG1sO1xuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgd2l0aCBhbnkgaHRtbC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQoaHRtbCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgcmV0dXJuIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh3cmFwcGVyKTtcbn1cbmV4cG9ydHMuY3JlYXRlRnJhZ21lbnQgPSBjcmVhdGVGcmFnbWVudDtcbmZ1bmN0aW9uIGRpdihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5kaXYgPSBkaXY7XG5mdW5jdGlvbiBzcGFuKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MU3BhbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5zcGFuID0gc3BhbjtcbmZ1bmN0aW9uIHBhcmFncmFwaChodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFBhcmFncmFwaEVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5wYXJhZ3JhcGggPSBwYXJhZ3JhcGg7XG5mdW5jdGlvbiBhbmNob3IoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgaHJlZk9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIGNvbnN0IHRtcCA9IF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxBbmNob3JFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICBpZiAodHlwZW9mIGhyZWZPclByb3BlcnRpZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRtcC5ocmVmID0gU3RyaW5nKGhyZWZPclByb3BlcnRpZXMgfHwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gdG1wO1xufVxuZXhwb3J0cy5hbmNob3IgPSBhbmNob3I7XG5mdW5jdGlvbiBidXR0b24oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxCdXR0b25FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuYnV0dG9uID0gYnV0dG9uO1xuLy8gQ29tbW9uIHByaXZhdGUgZnVuY3Rpb25zIGZvciBvdmVybG9hZHMuIFByZXZlbnRzIGxvdHMgb2YgY29weXBhc3RhLlxuLy8gVGhpcyB3b3JrcyBmb3IgZXZlcnl0aGluZyBiZWNhdXNlIFR5cGVTY3JpcHQgaXMga2VlcGluZyB0aGUgdHlwZXMgdmFsaWQuIEluIHB1cmUgSlMsIGJ1Z3MgY291bGQgYmUgY3JlYXRlZCAoZm9yIGV4YW1wbGUsIHBhc3NpbmcgYW4gaW5uZXJcbi8vIGVsZW1lbnQgdG8gYSBwYXJhZ3JhcGggLi4uIGRpc2FsbG93ZWQgYnkgVFMgYnV0IHRoZSBjb2RlIGlzIHRoZXJlIGluIHRoZSBKUylcbmZ1bmN0aW9uIF9pbnRlcm5hbCh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKGh0bWxPclByb3BlcnRpZXMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX292cjEodHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBodG1sT3JQcm9wZXJ0aWVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBfb3ZyMyh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBfb3ZyMih0eXBlLCBTdHJpbmcoaHRtbE9yUHJvcGVydGllcyB8fCAnJyksIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9vdnIxKHR5cGUsIGlubmVyRWxlbWVudCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgY29uc3QgZSA9IGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbiAgICBlLmFwcGVuZENoaWxkKGlubmVyRWxlbWVudCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBfb3ZyMih0eXBlLCBpbm5lckh0bWwsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gaW5uZXJIdG1sO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG5mdW5jdGlvbiBfb3ZyMyh0eXBlLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IHByb3BzLmlubmVySFRNTCB8fCAnJztcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgaGVscGVyIGZvciBDcmVhdGVFbGVtZW50LCByb3VnaGx5IG1hcHBpbmcgdG8gSHRtbEVsZW1lbnQgdHlwZXMsIGJ1dCBub3QgcGVyZmVjdGx5IGJlY2F1c2UgaXQncyBpbXBvc3NpYmxlXG4gKiAodGhlcmUncyBubyBwZXJmZWN0IDE6MSByZWxhdGlvbnNoaXApLlxuICovXG52YXIgZWxlbWVudFR5cGU7XG4oZnVuY3Rpb24gKGVsZW1lbnRUeXBlKSB7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQW5jaG9yRWxlbWVudFwiXSA9IFwiYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFyZWFFbGVtZW50XCJdID0gXCJhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXVkaW9FbGVtZW50XCJdID0gXCJhdWRpb1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJSRWxlbWVudFwiXSA9IFwiYnJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCYXNlRm9udEVsZW1lbnRcIl0gPSBcImJhc2Vmb250XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmxvY2tRdW90ZUVsZW1lbnRcIl0gPSBcImJsb2NrcXVvdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCdXR0b25FbGVtZW50XCJdID0gXCJidXR0b25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxDYW52YXNFbGVtZW50XCJdID0gXCJjYW52YXNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhRWxlbWVudFwiXSA9IFwiZGF0YVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFMaXN0RWxlbWVudFwiXSA9IFwiZGF0YWxpc3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaWFsb2dFbGVtZW50XCJdID0gXCJkaWFsb2dcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaXZFbGVtZW50XCJdID0gXCJkaXZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxETGlzdEVsZW1lbnRcIl0gPSBcImRsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRW1iZWRFbGVtZW50XCJdID0gXCJlbWJlZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZpZWxkU2V0RWxlbWVudFwiXSA9IFwiZmllbGRzZXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGb3JtRWxlbWVudFwiXSA9IFwiZm9ybVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcxRWxlbWVudFwiXSA9IFwiaDFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMkVsZW1lbnRcIl0gPSBcImgyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzNFbGVtZW50XCJdID0gXCJoM1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc0RWxlbWVudFwiXSA9IFwiaDRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNUVsZW1lbnRcIl0gPSBcImg1XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzZFbGVtZW50XCJdID0gXCJoNlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhSRWxlbWVudFwiXSA9IFwiaHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbWFnZUVsZW1lbnRcIl0gPSBcImltYWdlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW5wdXRFbGVtZW50XCJdID0gXCJpbnB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExhYmVsRWxlbWVudFwiXSA9IFwibGFiZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMZWdlbmRFbGVtZW50XCJdID0gXCJsZWdlbmRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMSUVsZW1lbnRcIl0gPSBcImxpXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGlua0VsZW1lbnRcIl0gPSBcImxpbmtcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNYXBFbGVtZW50XCJdID0gXCJtYXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNZXRlckVsZW1lbnRcIl0gPSBcIm1ldGVyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kRGVsRWxlbWVudFwiXSA9IFwiZGVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kSW5zRWxlbWVudFwiXSA9IFwiaW5zXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT0xpc3RFbGVtZW50XCJdID0gXCJvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9iamVjdEVsZW1lbnRcIl0gPSBcIm9iamVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdEdyb3VwRWxlbWVudFwiXSA9IFwib3B0Z3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRpb25FbGVtZW50XCJdID0gXCJvcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPdXRwdXRFbGVtZW50XCJdID0gXCJvdXRwdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhZ3JhcGhFbGVtZW50XCJdID0gXCJwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYW1FbGVtZW50XCJdID0gXCJwYXJhbVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBpY3R1cmVFbGVtZW50XCJdID0gXCJwaWN0dXJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJlRWxlbWVudFwiXSA9IFwicHJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJvZ3Jlc3NFbGVtZW50XCJdID0gXCJwcm9ncmVzc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFF1b3RlRWxlbWVudFwiXSA9IFwicVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNjcmlwdEVsZW1lbnRcIl0gPSBcInNjcmlwdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNlbGVjdEVsZW1lbnRcIl0gPSBcInNlbGVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNvdXJjZUVsZW1lbnRcIl0gPSBcInNvdXJjZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNwYW5FbGVtZW50XCJdID0gXCJzcGFuXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3R5bGVFbGVtZW50XCJdID0gXCJzdHlsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnRcIl0gPSBcImNhcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFwiXSA9IFwidGRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50XCJdID0gXCJ0aFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sRWxlbWVudFwiXSA9IFwiY29sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xHcm91cEVsZW1lbnRcIl0gPSBcImNvbGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVFbGVtZW50XCJdID0gXCJ0YWJsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlUm93RWxlbWVudFwiXSA9IFwidHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Cb2R5RWxlbWVudFwiXSA9IFwidGJvZHlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Gb290ZXJFbGVtZW50XCJdID0gXCJ0Zm9vdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkhlYWRlckVsZW1lbnRcIl0gPSBcInRoZWFkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGVtcGxhdGVFbGVtZW50XCJdID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRleHRBcmVhRWxlbWVudFwiXSA9IFwidGV4dGFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUaW1lRWxlbWVudFwiXSA9IFwidGltZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRyYWNrRWxlbWVudFwiXSA9IFwidHJhY2tcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxVTGlzdEVsZW1lbnRcIl0gPSBcInVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVmlkZW9FbGVtZW50XCJdID0gXCJ2aWRlb1wiO1xufSkoZWxlbWVudFR5cGUgPSBleHBvcnRzLmVsZW1lbnRUeXBlIHx8IChleHBvcnRzLmVsZW1lbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChpbnB1dCkge1xuICAgIC8vIFRoZXJlIGlzbid0IGEgYnVpbHQtaW4gd2F5IHRvIGRvIHRoaXMsIHN0aWxsLCBzbyB3ZSBuZWVkIGEgaGVscGVyIGZ1bmN0aW9uLlxuICAgIC8vIFRoZSBhcnRpY2xlIFwiWW91IGFyZSBwcm9iYWJseSBtaXN1c2luZyBET00gdGV4dCBtZXRob2RzXCIgY29udmluY2VkIG1lIHRvIGRvIGl0IHRoaXMgd2F5LFxuICAgIC8vIHZzLiBjcmVhdGVUZXh0Tm9kZS4gVGhvdWdoIGNyZWF0ZVRleHROb2RlIHdvdWxkIHByb2JhYmx5IHdvcmsgZmluZSBmb3Igc2V0dGluZyBpbm5lckhUTUwuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGVzY2FwZXMgPSB7XG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICAgICAgXCI9XCI6IFwiJiN4M0Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXG4gICAgICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gICAgfTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBzID0+IGVzY2FwZXNbc10pO1xufVxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUgYXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xufVxuZXhwb3J0cy5leHRyYWN0Tm9kZUNvbnRlbnQgPSBleHRyYWN0Tm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBIVE1MIGlzIGluY29uc2lzdGVudC4gR2V0dGluZyB0aGUgdmFsdWUgb2YgZm9ybSBmaWVsZHMgaXMgYSBiaXQgY29tcGxpY2F0ZWQsIG5vdCBhbHdheXMgZWxlbWVudC52YWx1ZSxcbiAqIHNvIGhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCkge1xuICAgIC8vIEl0IHdvdWxkIGJlIHJlYWxseSBuaWNlIGF0IHRoaXMgcG9pbnQgaWYgSlMgY291bGQgc2VlIGdlbmVyaWMgcGFyYW1ldGVycy5cbiAgICAvLyBJZiBpdCBjb3VsZCwgdGhlbiB0aGUgY29kZSBjb3VsZCBzYXkgXCJpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiBUT3V0cHV0ICE9PSBib29sZWFuKSB0aHJvdyBuZXcgRXJyb3IoKVwiXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RWYWx1ZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGb3JtRmllbGRWYWx1ZSA9IGdldEZvcm1GaWVsZFZhbHVlO1xuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0LmNoZWNrZWQ7XG59XG5leHBvcnRzLmdldENoZWNrYm94VmFsdWUgPSBnZXRDaGVja2JveFZhbHVlO1xuZnVuY3Rpb24gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlcklucHV0VmFsdWUgPSBnZXROdW1iZXJJbnB1dFZhbHVlO1xuZnVuY3Rpb24gZ2V0UmFkaW9WYWx1ZShpbnB1dCkge1xuICAgIC8vIFJhZGlvIGJ1dHRvbnMgYXJlIHdlaXJkLiBXZSB3YW50IHRoZW0gdG8gYXBwZWFyIHRvIGJlIG1vcmUgbm9ybWFsLlxuICAgIGlmIChpbnB1dC5uYW1lKSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aW5wdXQubmFtZX1cIl06Y2hlY2tlZGApIHx8IHt9KS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSWYgbm8gbmFtZSwgZmFsbCBiYWNrIHRvIHRoaXNcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRSYWRpb1ZhbHVlID0gZ2V0UmFkaW9WYWx1ZTtcbmZ1bmN0aW9uIGdldFNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZWxlY3RWYWx1ZSA9IGdldFNlbGVjdFZhbHVlO1xuZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3Quc2VsZWN0ZWRPcHRpb25zKS5maWx0ZXIoZiA9PiBmLnZhbHVlKS5tYXAobSA9PiBtLnZhbHVlKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlTZWxlY3RWYWx1ZSA9IGdldE11bHRpU2VsZWN0VmFsdWU7XG4vLyBUaGlzIGlzIGFsbW9zdCBwb2ludGxlc3MuIEp1c3QgaGVyZSBmb3IgY29uc2lzdGVuY3kuXG5mdW5jdGlvbiBnZXRTaW1wbGVGb3JtVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIGZvciBtdWx0aS1zZWxlY3RzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuZXhwb3J0cy5nZXRTaW1wbGVGb3JtVmFsdWUgPSBnZXRTaW1wbGVGb3JtVmFsdWU7XG4vKipcbiAqIFNldHRpbmcgdmFsdWVzIGlzIGp1c3QgYXMgY29tcGxpY2F0ZWQgYXMgZ2V0dGluZyB0aGVtLCBiZWNhdXNlIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBZb3UgY2FuJ3QganVzdCBzYXkgZWxlbWVudC52YWx1ZSA9IGZvby5cbiAqIEhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gc2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAvLyBIZXJlIHlvdSBjYW4gdmFsaWRhdGUgdGhlIHR5cGUgYmVmb3JlIHNldHRpbmcgb3IgZG8gc29tZSBraW5kIG9mIGNvbnZlcnNpb24uXG4gICAgLy8gRm9yIG11bHRpLXNlbGVjdHMsIGNhbiBhdXRvLXdyYXAgdmFsdWUgaW4gc3RyaW5nLlxuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpOyAvLyB1c2VkIGluIG1vc3Qgb2YgdGhlIGNhc2VzXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCBzdHJpbmdWYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHN0cmluZ1ZhbHVlID09PSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShzdHJpbmdWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRldGltZScgfHwgdHlwZSA9PT0gJ2RhdGV0aW1lLWxvY2FsJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdHJpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBgJHt0b0RhdGVTdHJpbmcoZGF0ZSl9VCR7dG9UaW1lU3RyaW5nKGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzZWxlY3Qub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7IC8vIHRyZWF0aW5nIGl0IGxpa2UgYSBub24tbXVsdGlwbGUgd29ya3NcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb25leGlzdGVudCBvcHRpb25zIGNhbm5vdCBiZSBzZXQuIFdlIHNob3VsZCBsZXQgdGhlIHByb2dyYW1tZXIga25vdy4gRXZlbiB0aG91Z2ggdGhpcyB0YWtlcyBDUFUgY3ljbGVzLlxuICAgICAgICAgICAgdmFsdWUubWFwKG0gPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdmFsdWUubWFwKG0gPT4gbS50b1N0cmluZygpKS5pbmRleE9mKG9wdC52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIG9uIG5vbi1mb3JtIGZpZWxkICR7ZWxlbWVudC50YWdOYW1lfSAke2VsZW1lbnQuaWQgfHwgJyd9YCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbCkge1xuICAgICAgICAvLyBJZiB5b3Ugc2V0IHRoZSB2YWx1ZSBvZiBhIHNlbGVjdCB0byBzb21ldGhpbmcgdGhhdCBpcyBub3QgYW4gYXZhaWxhYmxlIG9wdGlvbiwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgICAgY29uc3QgaGFzT3B0aW9uID0gb3B0aW9ucy5tYXAobSA9PiBtLnZhbHVlKS5pbmRleE9mKHZhbC50b1N0cmluZygpKSA+IC0xO1xuICAgICAgICBpZiAoIWhhc09wdGlvbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIHdpdGggbm9uZXhpc3RlbnQgb3B0aW9uICR7dmFsLnRvU3RyaW5nKCl9IG9uIHNlbGVjdCAke2VsZW1lbnQuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlc2UgY291bGQgYmUgcmVhZGFibGUgb25lbGluZXJzIGlmIHdlIGhhZCBwYWRTdGFydCgpIGJ1dCBpdCdzIG5vdCB3b3J0aCBidW1waW5nIHRvIEVTMjAxNyBmb3Igb25lIG1ldGhvZFxuICAgIGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGggPSAoJzAnICsgKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgZGF5ID0gKCcwJyArIGRhdGUuZ2V0VVRDRGF0ZSgpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0VVRDRnVsbFllYXIoKX0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9UaW1lU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3VyID0gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBtaW51dGUgPSAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5zZXRGb3JtRmllbGRWYWx1ZSA9IHNldEZvcm1GaWVsZFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3Iobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvciA9IG5vZGVMaXN0U2VsZWN0b3I7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3JBbGwobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgYnJvd3NlciBjYW4gbG9zZSByZWZlcmVuY2VzIHdoZW4gbW92aW5nIG5vZGVzLCB0aGlzIGNhbiBhbHNvIHRha2UgYSByZWd1bGFyIGFycmF5LlxuICAgIC8vIEJlY2F1c2UgSFRNTDUgaGFzIHRvdGFsbHkgZmFsbGVuIG92ZXIsIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgZml4ZWQgbm9kZUxpc3RTZWxlY3RvckFsbFxuICAgIC8vIHRvIG1hdGNoIHRoZSBvdXRwdXQgc2lnbmF0dXJlIG9mIHF1ZXJ5U2VsZWN0b3JBbGwgKE5vZGVMaXN0T2Y8RWxlbWVudD4gaW5zdGVhZCBvZiBhcnJheSkuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uQXJyYXkuZnJvbShzZWFyY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3JBbGwgPSBub2RlTGlzdFNlbGVjdG9yQWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgRWx2aXNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9FbHZpc1wiKTtcbi8qKlxuICogQSBzdXBlci1iYXNpYyBjb21wb25lbnQgdGhhdCBhbGxvd3MgY29uZmlndXJhdGlvbiBvZiBkYXRhLWJpbmRpbmcgZnVuY3Rpb25zIHVzaW5nIHNwZWNpYWxseS1uYW1lZCBIVE1MIGF0dHJpYnV0ZXMsIGFzIGluIEFuZ3VsYXJcbiAqIG9yIFZ1ZS5cbiAqL1xuY2xhc3MgQm91bmRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnRfMS5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgYXJncykge1xuICAgICAgICBzdXBlcihhcmdzKTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzID0gW107IC8vIENhbiBvbmx5IHdyaXRlIHRvIFRISVMgY29tcG9uZW50XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fcmVwbGFjZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMuX2FzeW5jID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlld01vZGVsID0gdmlld01vZGVsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdpLXYnKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2ktdicsIFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gY3VzdG9tRWxlbWVudHMgaXNuJ3Qgb2ZmaWNpYWxseSBwYXJ0IG9mIGFuIEVTIHZlcnNpb24geWV0IHNvIHdvbid0IHdvcmsgZXZlbiBpbiBzb21lIHJlY2VudC1pc2ggYnJvd3NlcnNcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gYXJncyB8fCB7fTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBvcHRpb25zLmFzeW5jIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9kZWZlciA9IG9wdGlvbnMuZGVmZXIgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2lkID0gdGhpcy5jb250ZW50LmlkO1xuICAgICAgICAvLyBEZWZpbmVkIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBjbGFzcyBmb3IgdGhlIGRlZmF1bHQgbG9vcFBvc3RQcm9jZXNzKCkgbWV0aG9kXG4gICAgICAgIGlmIChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmICghQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKG9wdGlvbnMubG9vcEl0ZW1DbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMubG9vcEl0ZW1DbGFzcyBpbnN0YW5jZW9mIEJvdW5kQ29tcG9uZW50LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9vcEl0ZW1DbGFzcyBpcyBub3QgYW4gYm91bmQgY29tcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb29wUGFyZW50ID0gb3B0aW9ucy5sb29wUGFyZW50OyAvLyB1bmRlZmluZWQgaW4gbW9zdCBjYXNlc1xuICAgICAgICB0aGlzLl9sb29wSXRlbUNsYXNzID0gb3B0aW9ucy5sb29wSXRlbUNsYXNzIHx8IEJvdW5kQ29tcG9uZW50O1xuICAgICAgICB0aGlzLl9jb25maWd1cmVDb21wb25lbnRCaW5kaW5ncygpO1xuICAgICAgICB0aGlzLnNldFRlbXBsYXRlKHRoaXMuY29udGVudC5pbm5lckhUTUwpOyAvLyBJbm5lckhUTUwgaXMgY3VycmVudGx5IG9ubHkgcGFyc2VkIGFuZCB0aGVuIHRoZSBvcmlnaW5hbCB0ZXh0IGlzIHRocm93biBhd2F5LlxuICAgICAgICAvLyBBdXRvLWFkZCBzdWJzY3JpcHRpb25zIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlQWxsVmlld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVBbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLm9ic2VydmVWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVUYXJnZXRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRndCBvZiBvcHRpb25zLm9ic2VydmVUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlKHRndCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZUFsbFRhcmdldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGd0IG9mIG9wdGlvbnMub2JzZXJ2ZUFsbFRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVBbGwodGd0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYXN5bmMpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5yZW5kZXIoKSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENvbnN0cnVjdG9yIGluaXRpYWxpemF0aW9uIGlzIGRvbmUuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgdG8gY29udmVydCBlbGVtZW50cyB0byBjb21wb25lbnRzLiBJdCdzIG1vc3QgdXNlZnVsIGZvciBjdXN0b20gdGFncywgZm9yIGV4YW1wbGUsIDxteS1jb21wb25lbnQ+PC9teS1jb21wb25lbnQ+LlxuICAgICAqIEl0IHdpbGwgYmVjb21lIDxkaXYgaWQ9XCJmb29cIj5XaGF0ZXZlciB0aGUgY29tcG9uZW50IGNvbnRlbnQgaXM8L2Rpdj4uXG4gICAgICogVG8gcmVwbGFjZSB0aGUgZWxlbWVudCAoY29weWluZyBleGlzdGluZyBhdHRyaWJ1dGVzKSBzZW5kIHRoZSByZWxldmFudCBvcHRpb25zLCBwbHVzIHtyZXBsYWNlOiB0cnVlfS5cbiAgICAgKlxuICAgICAqIEluIGFsbW9zdCBldmVyeSBjYXNlLCB2aWV3TW9kZWwgc2hvdWxkIGJlIHNldC4gQnV0IGl0J3Mgbm90IHBvc3NpYmxlIHRvIGNoYW5nZSB0aGF0IGFuZCBzdGlsbCBiZSBjb21wYXRpYmxlIHdpdGggdGhlIGJhc2VcbiAgICAgKiBjbGFzcyBpbmplY3QoKS4gVGhpcyBpcyBhIHR5cGVzY3JpcHQtb25seSBpc3N1ZSBidXQgaXQgbWFrZXMgdGhpbmdzIHVnbHkuXG4gICAgICpcbiAgICAgKiBBY2NlcHRzIEtleXdvcmQgQXJndW1lbnRzLiBBbmQgcHJhY3RpY2FsbHkgZGVtYW5kcyB0aGVpciB1c2UgdG8gc2V0IHZpZXdNb2RlbC5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCkge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICBjb25zdCBuZXdDb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yIHx8IHRoaXM7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX2dldE9wdGlvbnMob3B0aW9ucyB8fCB7fSk7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VFbGVtZW50V2l0aEJvdW5kQ29tcG9uZW50KGVsZW1lbnQsIHZpZXdNb2RlbCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0RWxlbWVudFRvQm91bmRDb21wb25lbnQoZWxlbWVudCwgdmlld01vZGVsLCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdChzZWxlY3Rvciwgb3B0LCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGwgdG8gaW5qZWN0KCkgd2l0aCBhIGNsZWFuZXIgYXJndW1lbnQgb3JkZXIuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdEJpbmQodmlld01vZGVsLCBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIHJldHVybiB0aGlzLmluamVjdChzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCk7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnRXaXRoQm91bmRDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCB2aWV3TW9kZWwsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX21lcmdlUHJvcGVydGllc0FuZEF0dHJpYnV0ZXMoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gbmV3IGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgb3B0KTtcbiAgICAgICAgdGhpcy5fcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBzdGF0aWMgX2NvbnZlcnRFbGVtZW50VG9Cb3VuZENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIHZpZXdNb2RlbCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgLy8gV0FSTjogVGhpcyBjYXN0IG1heSBub3QgYmUgdHJ1ZS4gVGhlcmUncyBubyB3YXkgdG8gY2hlY2sgdGhhdCB0aGUgdGFncyBtYXRjaC5cbiAgICAgICAgY29uc3Qgb3B0ID0gT2JqZWN0LmFzc2lnbih7IGVsZW1lbnQ6IGV4aXN0aW5nRWxlbWVudCB9LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIG9wdCk7XG4gICAgfVxuICAgIHdyaXRlKGV2dCkge1xuICAgICAgICBpZiAoIXRoaXMuX3dyaXRlVGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gRm9ybUZpZWxkVmFsdWVfMS5nZXRGb3JtRmllbGRWYWx1ZShlbGVtZW50KTtcbiAgICAgICAgLy8gVGhlcmUgYXJlIHR3byBjYXNlcyB3aGVyZSB2YWx1ZSBpcyB1bmRlZmluZWQuIEVpdGhlciB0aGUgZWxlbWVudCBpcyBub3QgYSBmb3JtIGVsZW1lbnQgb3IgaXQncyBhbiB1bm5hbWVkIHJhZGlvIGJ1dHRvblxuICAgICAgICAvLyB0aGF0IGlzIG5vdCBzZWxlY3RlZC4gSW4gYm90aCBjYXNlcywgd2UgZG9uJ3Qgd2FudCB0byB1cGRhdGUgdGhlIG1vZGVsIHdpdGggdW5kZWZpbmVkLCB3aGljaCBpcyB1c2VsZXNzLlxuICAgICAgICAvLyBUT0RPOiBJcyB0aGlzIGp1c3RpZmljYXRpb24gdmFsaWQ/XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gV0FSTjogQ2Fubm90IHR5cGUgY2hlY2sgdGhpcyBkeW5hbWljYWxseS4gVHlwZVNjcmlwdCBpcyBidWlsZC10aW1lIGNoZWNraW5nIG9ubHkuIFJ1bnRpbWUgY29kZSBjYW4ndCBldmVuIHNlZSB0aGUgdHlwZS5cbiAgICAgICAgLy8gSWYgeW91IHdhbnQgdG8gYmUgcHJlY2lzZSwgYWxsIHByb3BlcnRpZXMgaW4gX3dyaXRlQmluZGluZ3Mgc2hvdWxkIGJlIEZvcm1JdGVtVmFsdWUsIGJ1dCBhcyBfd3JpdGVCaW5kaW5ncyBpcyBwb3B1bGF0ZWRcbiAgICAgICAgLy8gdmlhIHN0cmluZywgdGhlcmUncyBubyB3YXkgdG8gZW5mb3JjZSB0aGF0LiBTbyBpZiB5b3UgZmlsbCBhIHN0cmluZyB2YWx1ZSBmcm9tIGEgbXVsdGlwbGUgc2VsZWN0LCBpdCdsbCBwcm9kdWNlIGJ1Z3MuXG4gICAgICAgIC8vIFNvIGJlIGNhcmVmdWwuIEl0J3Mgb24geW91LlxuICAgICAgICBmb3IgKGNvbnN0IGJpbmQgb2YgdGhpcy5fd3JpdGVUYXJnZXRzKSB7XG4gICAgICAgICAgICBpZiAoYmluZC5zdGFydHNXaXRoKCd0aGlzLicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tiaW5kLnNsaWNlKDUpXTtcbiAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gdGhpc1tiaW5kLnNsaWNlKDUpXSA9IHZhbHVlLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmQgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlU3RhdGVfMS5vYnNlcnZhYmxlU3RhdGVDaGVjayh0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFzc3VtZSB0aGF0IHRoZSB2aWV3IG1vZGVsIGlzIGVpdGhlciBGb3JtRmllbGRWYWx1ZSBvciBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgb25lLlxuICAgICAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRoaXMudmlld01vZGVsLCAoKSA9PiB0aGlzLnZpZXdNb2RlbCA9IHZhbHVlLCB0aGlzLnZpZXdNb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZC5zdGFydHNXaXRoKCdeJykgJiYgRWx2aXNfMS5lXyh0aGlzLmxvb3BQYXJlbnQpLnZpZXdNb2RlbCAmJiB0eXBlb2YgdGhpcy5sb29wUGFyZW50LnZpZXdNb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBOb3QgZG9pbmcgYSAnXicgYnkgaXRzZWxmIGJlY2F1c2UgdGhhdCdzIGEgcHJldHR5IEJTIGNhc2UuIElmIHRoaXMgaXMgdGhlIGxvb3AgY2hpbGQsIHRoZSBwYXJlbnQgaXMgcHJvYmFibHlcbiAgICAgICAgICAgICAgICAvLyBhbiBvYmplY3Qgb3IgYW4gaXRlcmFibGUsIG5vdCByZWFsbHkgc29tZXRoaW5nIHlvdSdsbCByZWFkIG9yIHdyaXRlIHRvIGRpcmVjdGx5LlxuICAgICAgICAgICAgICAgIC8vIE1pZ2h0IGRvIGEgc2hvcnRjdXQgdG8gdGhlIHBhcmVudCBjb21wb25lbnQncyAndGhpcydcbiAgICAgICAgICAgICAgICB3cml0ZVRvVmlld01vZGVsT2JqZWN0KHRoaXMubG9vcFBhcmVudCwgYmluZC5zbGljZSgxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVUb1ZpZXdNb2RlbE9iamVjdCh0aGlzLCBiaW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3cml0ZVZhbHVlKHRhcmdldCwgd3JpdGVUb1Byb3BlcnR5LCB0aGlzQXJnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgYSBmdW5jdGlvbiB0byBiZSBmbGV4aWJsZSwgYmVjYXVzZSBpZiB0YXJnZXQgaXMgYSB2YWx1ZSB0eXBlIG9yIGltbXV0YWJsZSwgd3JpdGluZ1xuICAgICAgICAgICAgLy8gaXQgZGlyZWN0bHkgcmVwbGFjZXMgb25seSB0aGUgdmFsdWUgd2l0aG91dCB1cGRhdGluZyB0aGUgbW9kZWwuXG4gICAgICAgICAgICB3cml0ZVRvUHJvcGVydHkoKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB3cml0ZVRvVmlld01vZGVsT2JqZWN0KGNvbXAsIHByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2soY29tcC52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgLy8gV2l0aCBvYnNlcnZhYmxlIHN0YXRlLCB3ZSBuZWVkIHRvIGdldCB0aGUgc3RhdGUsIHVwZGF0ZSBpdCwgYW5kIHdyaXRlIHRoZSB3aG9sZSB0aGluZyBiYWNrLlxuICAgICAgICAgICAgICAgIC8vIFdoaWxlIGl0IGlzIHBvc3NpYmxlIHRvIHVwZGF0ZSBhIHNpbmdsZSBwcm9wZXJ0eSBpbiBzb21lIGNhc2VzLCBpdCBkb2Vzbid0IGFsbG93IHJldXNlIG9mIGFscmVhZHktd29ya2luZyBjb2RlLlxuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGNvbXAudmlld01vZGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRtcFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRtcFtwcm9wZXJ0eV0gPSB2YWx1ZSwgdG1wKTtcbiAgICAgICAgICAgICAgICBjb21wLnZpZXdNb2RlbC52YWx1ZSA9IHRtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGNvbXAudmlld01vZGVsW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gY29tcC52aWV3TW9kZWxbcHJvcGVydHldID0gdmFsdWUsIGNvbXAudmlld01vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBCaW5kIHRoaXMucmVuZGVyKCkgdG8gdGhlIG1vZGVsIHBhc3NlZCBpbiwgb3IgdGhlIHZpZXcgbW9kZWwgaWYgbm9uZSBwYXNzZWQgaW4uXG4gICAgICovXG4gICAgb2JzZXJ2ZShtb2RlbCkge1xuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHRoaXMudmlld01vZGVsO1xuICAgICAgICBpZiAoSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sobW9kZWwpKSB7XG4gICAgICAgICAgICBtb2RlbC5zdWJzY3JpYmUodGhpcy5yZW5kZXIsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBCaW5kIHRoaXMucmVuZGVyKCkgdG8gYWxsIG9ic2VydmFibGUgcHJvcGVydGllcyBmb3VuZCBpbiB0aGUgbW9kZWwgcGFzc2VkIGluLFxuICAgICAqIG9yIHRoZSB2aWV3IG1vZGVsIGlmIG5vbmUgcGFzc2VkIGluLiBUaGlzIG9ubHkgZ29lcyBvbmUgbGV2ZWwgZGVlcCwgc28gaXRcbiAgICAgKiB3b24ndCBwaWNrIHVwIG5lc3RlZCBvYmplY3RzLCBidXQgaXQncyBwcm9iYWJseSBnb29kIGVub3VnaCBpbiA2MCUgb2YgY2FzZXMuXG4gICAgICovXG4gICAgb2JzZXJ2ZUFsbChtb2RlbCkge1xuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHRoaXMudmlld01vZGVsO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmUobW9kZWwpO1xuICAgICAgICBmb3IgKGNvbnN0IG0gb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobW9kZWwpKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmUobW9kZWxbbV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIC8vIFNlZSBpZiB3ZSBuZWVkIHRvIGRlZmVyIHJlbmRlcmluZyB1bnRpbCBhZnRlciBpbml0aWFsaXphdGlvblxuICAgICAgICBpZiAodGhpcy5fZGVmZXIgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmJvb2wpIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgYm9vbGVhbiBhdHRyaWJ1dGVzLCB0aGUgdmVyeSBleGlzdGVuY2Ugb2YgdGhlIGF0dHJpYnV0ZSBtZWFucyBpdCBpcyBjb25zaWRlcmVkIHRvIGJlIHRydWUuXG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZShpdGVtLnNvdXJjZSwgaXRlbS5vdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gISF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUsIHRoaXMuX2dldFN0cmluZ1ZhbHVlKGl0ZW0uc291cmNlLCBmYWxzZSwgaXRlbS5vdGhlckNvbXBvbmVudElkKSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAvLyBDYWxscyBzZXRGb3JtRmllbGRWYWx1ZSBiZWhpbmQgdGhlIHNjZW5lcy5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fdmFsdWVBdHRyaWJ1dGUuc291cmNlLCB0aGlzLl92YWx1ZUF0dHJpYnV0ZS5vdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzQ2xhc3Nlcykge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTmFtZSA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHRoaXMuX2Nzc0NsYXNzZXMuY3NzQ2xhc3MsIGZhbHNlLCB0aGlzLl9jc3NDbGFzc2VzLm90aGVyQ29tcG9uZW50SWQpIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzKSB7XG4gICAgICAgICAgICAvLyBJZiB0cnV0aHksIGFkZCBjbGFzcywgZWxzZSBkZWxldGUgaXQuXG4gICAgICAgICAgICBsZXQgdmFsID0gISF0aGlzLl9nZXRVbnR5cGVkVmFsdWUoaXRlbS5zb3VyY2UsIGl0ZW0ub3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHRoaXMuX2Nzc1N0eWxlLnN0eWxlLCBmYWxzZSwgdGhpcy5fY3NzU3R5bGUub3RoZXJDb21wb25lbnRJZCkgfHwgJyc7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuY3NzVGV4dCA9IHZhbDtcbiAgICAgICAgICAgIGlmICh2YWwgJiYgIXRoaXMuY29udGVudC5zdHlsZS5jc3NUZXh0KSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEludmFsaWQgc3R5bGUgdGV4dCBpbiBjb21wb25lbnQ6ICR7dmFsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sb29wKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVyYWJsZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZSh0aGlzLl9sb29wLnNvdXJjZSwgdGhpcy5fbG9vcC5vdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgIGlmIChpdGVyYWJsZSAmJiB0eXBlb2YgaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLl9sb29wLmZyYWdtZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXMgc29vbiBhcyB3ZSBhZGQgdGhlIGNsb25lIHRvIGNvbnRlbnQsIGNoaWxkTm9kZXMgbG9zZXMgcmVmZXJlbmNlIHRvIGl0cyBjaGlsZCBub2Rlcywgc28gY29weSBpdC5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGNsb25lLmNoaWxkTm9kZXMpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wLnBvc3RQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb3BQb3N0UHJvY2Vzcyhyb3csIG5vZGVzLCBpdGVyYWJsZSwgcHJldmlvdXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzRGlzcGxheSkge1xuICAgICAgICAgICAgLy8gSWYgZmFsc3ksIHNldCBkaXNwbGF5OiBub25lIChzYXZpbmcgcHJldmlvdXMgdmFsdWUpLiBJZiB0cnV0aHksIHJlc3RvcmUgcHJldmlvdXMgdmFsdWUgKGlmIGJsb2NrLCBmbGV4LCBidXQgbm90IGlmIG5vbmUpXG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2Nzc0Rpc3BsYXkuc291cmNlLCB0aGlzLl9jc3NEaXNwbGF5Lm90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nzc0Rpc3BsYXkubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNDc3NEaXNwbGF5U2V0dGluZyA9IHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZVRleHQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGVtcGxhdGVUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBpbiB0aGUgY29uc3RydWN0b3IuIFRoZSB1cGRhdGUgcGFyYW0gc2hvdWxkIG5vdCBiZSBzZXQuXG4gICAgICAgIGlmICh1cGRhdGUgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSBzaG91bGQgbm90IGJlIHRydWUgd2hlbiBjYWxsZWQgaW50ZXJuYWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSBjcmVhdGluZyBhbiBlbGVtZW50IHRoYXQncyBub3Qgb24gdGhlIHBhZ2UsIHdlIHByb2JhYmx5IGNvdWxkIGF2b2lkIHVzaW5nIGEgZnJhZ21lbnQsXG4gICAgICAgIC8vIGJ1dCB0aGlzIGlzIHdoYXQgZnJhZ21lbnRzIGFyZSBmb3IuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MVGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGVUZXh0O1xuICAgICAgICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgdXNlZCB0byByZXBsYWNlIHRoZSBleGlzdGluZyB0ZW1wbGF0ZSwgd2UgbmVlZCB0byB3aXBlIG91dCB0aGUgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICAvLyBXb3JraW5nIG9uIGEgY2xvbmUgaGVyZSwgc28gd2UgZG9uJ3Qgc2VlIHRoZSBib2R5IGJlaW5nIGJ1aWx0IHN0ZXAgYnkgc3RlcCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ktdicpKSB7XG4gICAgICAgICAgICAvLyBBbGxvdyAzIHdheXMgdG8gcmVmZXJlbmNlIGEgY29tcG9uZW50LCBlaXRoZXIgYnkgI2lkIChmb3IgcGVvcGxlIHdobyBsaWtlIHF1aWNrbmVzcyksIGJ5IGNvbXBvbmVudCAoZm9yIHBlb3BsZSB3aG8gbGlrZVxuICAgICAgICAgICAgLy8gY29tcGxpYW5jZSksIG9yIGJ5IGRhdGEtY29tcG9uZW50IChmb3IgcGVvcGxlIHdobyBSRUFMTFkgbGlrZSBjb21wbGlhbmNlKVxuICAgICAgICAgICAgbGV0IHJlbGF0ZWRDb21wb25lbnRJZCA9ICcnO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1mb3Itb2ZcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wTmFtZSA9IHJlcGwuYXR0cmlidXRlc1tpXS5ub2RlTmFtZTtcbiAgICAgICAgICAgICAgICBpZiAodG1wTmFtZS5zdGFydHNXaXRoKCcjJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRlZENvbXBvbmVudElkID0gdG1wTmFtZS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFyZWxhdGVkQ29tcG9uZW50SWQgJiYgcmVwbC5oYXNBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpKSB7XG4gICAgICAgICAgICAgICAgcmVsYXRlZENvbXBvbmVudElkID0gKHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJlbGF0ZWRDb21wb25lbnRJZCkge1xuICAgICAgICAgICAgICAgIHJlbGF0ZWRDb21wb25lbnRJZCA9IHJlcGwuZGF0YXNldC5jb21wb25lbnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBjb21wb25lbnQgaXMgc3BlY2lmaWVkLCB0aGlzIGNvbXBvbmVudCBtdXN0IGhhdmUgdGhhdCBhcyBhbiBpZFxuICAgICAgICAgICAgaWYgKHRoaXMuX2lkICYmIHJlbGF0ZWRDb21wb25lbnRJZCAmJiByZWxhdGVkQ29tcG9uZW50SWQudG9Mb3dlckNhc2UoKSAhPT0gdGhpcy5faWQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm9lc2NhcGUgPSByZXBsLmhhc0F0dHJpYnV0ZSgnbm9lc2NhcGUnKSAmJiByZXBsLmdldEF0dHJpYnV0ZSgnbm9lc2NhcGUnKSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIGNvbnN0IG90aGVyQ29tcG9uZW50SWQgPSByZXBsLmdldEF0dHJpYnV0ZSgnaTVfc291cmNlJykgfHwgcmVwbC5nZXRBdHRyaWJ1dGUoJ3NvdXJjZScpIHx8IHJlcGwuZGF0YXNldC5pNV9zb3VyY2UgfHwgcmVwbC5kYXRhc2V0LnNvdXJjZSB8fCByZXBsLmdldEF0dHJpYnV0ZSgnOnNvdXJjZScpO1xuICAgICAgICAgICAgdGhpcy5fcmVwbGFjZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHJlcGwsXG4gICAgICAgICAgICAgICAgc291cmNlOiByZXBsLmlubmVySFRNTCxcbiAgICAgICAgICAgICAgICBub2VzY2FwZTogbm9lc2NhcGUsXG4gICAgICAgICAgICAgICAgb3RoZXJDb21wb25lbnRJZDogb3RoZXJDb21wb25lbnRJZCB8fCB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluIHRoZSBvcmlnaW5hbCBidWlsZCBvZiB0aGUgb2JqZWN0LCBmIGFueSByZXBsYWNlbWVudHMgc3RhcnQgd2l0aCBcInRoaXMuXCIgd2UgbmVlZCB0byBkZWZlci5cbiAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCAmJiAhdGhpcy5fZGVmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgISF0aGlzLl9yZXBsYWNlbWVudHMuZmluZChmID0+IGYuc291cmNlLnN0YXJ0c1dpdGgoJ3RoaXMuJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlZSBpZiB3ZSBuZWVkIHRvIGRlZmVyIHJlbmRlcmluZyB1bnRpbCBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgd2lsbCBsZWFkIHRvIGEgRk9VQywgbWF5YmUgbWlsbGlzZWNvbmRzLCBtYXliZSBsb25nZXIuXG4gICAgICAgIGlmICghdGhpcy5fZGVmZXIgfHwgdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGNvbXBsZXRlZCB2YWx1ZXMgYmVmb3JlIGFkZGluZyB0byB0aGUgdmlzaWJsZSBwYWdlLiBUaGlzIGlzIHNsaWdodGx5IHJlZHVuZGFudCwgYmVjYXVzZSB0aGlzIGhhcHBlbnMgaW4gdGhlIHJlbmRlcigpXG4gICAgICAgICAgICAvLyBzdGVwLCBidXQgSSBoYXRlIGl0IHdoZW4gSSBzZWUgYSBmbGFzaCBvZiB1bnJlcGxhY2VkIGNvbnRlbnQgb24gc2l0ZXMuXG4gICAgICAgICAgICAvLyBUaGUgcmVhc29uIHRoaXMgd29ya3MgaXMgYmVjYXVzZSBfcmVwbGFjZW1lbnRzIHJlZmVyZW5jZXMgY2xvbmUsIHdoaWNoIGlzbid0IHZpc2libGUgdW50aWwgYWxtb3N0IHRoZSBsYXN0IGxpbmUuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGZyb250LWVuZCB0ZXh0LiBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHRoaW5nIHRvIHJlcGxhY2UuIE90aGVyd2lzZSwgeW91J3JlIGp1c3Qgd2lwaW5nIG91dCBwZXJmZWN0bHlcbiAgICAgICAgLy8gdmFsaWQgSFRNTDUgcmVmZXJlbmNlcyBmb3Igbm8gcmVhc29uLlxuICAgICAgICBpZiAodGhpcy5fcmVwbGFjZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBhIGZ1bGwgdXBkYXRlIGlmIHJlcXVlc3RlZCB0b1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIdG1sVGVtcGxhdGUodGVtcGxhdGVQcm9wZXJ0eSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VGVtcGxhdGUoJzxpLXYgbm9lc2NhcGU+JyArIHRlbXBsYXRlUHJvcGVydHkgKyAnPC9pLXY+JywgdXBkYXRlKTtcbiAgICB9XG4gICAgc2V0VGV4dFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12PicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldExvb3Aoc291cmNlID0gJy4nLCBmcmFnbWVudCwgc2tpcFBvc3RQcm9jZXNzID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlLCBvdGhlckNvbXBvbmVudElkKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFmcmFnbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJhZ21lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmcmFnbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVGcmFnbWVudChmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9vcCA9IHsgc291cmNlLCBwb3N0UHJvY2VzczogIXNraXBQb3N0UHJvY2VzcywgZnJhZ21lbnQsIG90aGVyQ29tcG9uZW50SWQgfTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlTG9vcCh1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9sb29wID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRWYWx1ZUF0dHJpYnV0ZShzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlLCBvdGhlckNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlQXR0cmlidXRlID0geyBzb3VyY2UsIG90aGVyQ29tcG9uZW50SWQgfTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmlzaWJpbGl0eShzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlLCBvdGhlckNvbXBvbmVudElkKSB7XG4gICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHsgc291cmNlLCBuZWdhdGl2ZSwgb3RoZXJDb21wb25lbnRJZCB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlLCBvdGhlckNvbXBvbmVudElkKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiBmYWxzZSwgbmVnYXRpdmU6IGZhbHNlLCBvdGhlckNvbXBvbmVudElkIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogdHJ1ZSwgbmVnYXRpdmUsIG90aGVyQ29tcG9uZW50SWQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbHRlcihmID0+IGYuYXR0cmlidXRlICE9PSBhdHRyaWJ1dGUpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzQ2xhc3MoY2xzID0gJy4nLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLl9jc3NDbGFzc2VzID0geyBjc3NDbGFzczogY2xzLCBvdGhlckNvbXBvbmVudElkIH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENzc1N0eWxlKHN0eWxlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLl9jc3NTdHlsZSA9IHsgc3R5bGUsIG90aGVyQ29tcG9uZW50SWQgfTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ3NzQ2xhc3NTd2l0Y2goY2xzLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlLCBvdGhlckNvbXBvbmVudElkKSB7XG4gICAgICAgIGlmICghY2xzIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmluZChmID0+IGYuY2xhc3MgPT09IGNscykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCh7IGNsYXNzOiBjbHMsIHNvdXJjZSwgbmVnYXRpdmUsIG90aGVyQ29tcG9uZW50SWQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ3NzQ2xhc3NTd2l0Y2goY2xzLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbHRlcihmID0+IGYuY2xhc3MgIT09IGNscyk7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy53cml0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlVGFyZ2V0KHRhcmdldCA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmZpbmQoZiA9PiBmID09PSB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZVdyaXRlVGFyZ2V0KHRhcmdldCwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fd3JpdGVUYXJnZXRzLmZpbHRlcihmID0+IGYgIT09IHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXV0by1JbmplY3QgY2FsbHMgdGhlIGRlZmF1bHQgaW5qZWN0QmluZCgpIG9uIHRoZSBkZWZhdWx0IEJvdW5kQ29tcG9uZW50IGNsYXNzLCB3aXRoIG5vIG9wdGlvbnMgZXhjZXB0IHNlbGVjdG9yLlxuICAgICAqIElmIHlvdSBwYXNzIG5vIGlucHV0cywgaXQgc2Vla3Mgb3V0IGFsbCBjaGlsZCBlbGVtZW50cyB0aGF0IGhhdmUgYXQgbGVhc3Qgb25lIGljaGlnbyBjdXN0b20gcHJvcGVydHkuIEtlZXAgaW4gbWluZFxuICAgICAqIHRoYXQgd2hlbiB5b3UgaGF2ZSBuZXN0ZWQgb2JqZWN0cywgdGhpcyB3aWxsIHVzdWFsbHkgbWVhbiBzb21ldGhpbmcgd2lsbCBibG93IHVwIGJlY2F1c2UgeW91IHRyaWVkIHRvIGJpbmQgYW4gZWxlbWVudFxuICAgICAqIHR3aWNlLiBJdCBhbHNvIHdpbGwgcGVyZm9ybSBtdWNoIHdvcnNlLlxuICAgICAqXG4gICAgICogSWYgeW91IHBhc3MgYSBzZWxlY3RvciwgaXQgYWN0cyB0aGUgc2FtZSBhcyBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKCkgd2l0aCB0aGF0IHNlbGVjdG9yLlxuICAgICAqXG4gICAgICogSW4gbXkgZXhwZXJpZW5jZSwgdGhpcyBpcyBhbG1vc3QgY29tcGxldGVseSB1c2VsZXNzLiBFaXRoZXIgdGhlIGxhY2sgb2Ygb3B0aW9ucyBicmVha3MgaXQgKHByZXR0eSB1c2VsZXNzIGlmIHlvdSBjYW4ndFxuICAgICAqIG9ic2VydmUgYW4gb2JzZXJ2YWJsZSkgb3IgdGhlIHNpbXBsZSBhY3Qgb2YgYmluZGluZyBicmVha3Mgc3R1ZmYuXG4gICAgICovXG4gICAgYXV0b0luamVjdChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQodGhpcy52aWV3TW9kZWwsIHNlbGVjdG9yLCB7IHBhcmVudDogdGhpcy5jb250ZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbShlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUuc3RhcnRzV2l0aCgnaTVfJykgfHwgYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJzonKSB8fCBhdHRyLm5hbWUuc3RhcnRzV2l0aCgnZGF0YS1pNV8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCh0aGlzLnZpZXdNb2RlbCwgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gdW5iaW5kIGEgdmlldyBmcm9tIGFuIG9ic2VydmFibGUuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5kZWxldGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGlmIHlvdSBuZWVkIHRvIGRvIHNvbWV0aGluZyBlbHNlIGFmdGVyIHRoZSBsb29wIGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICovXG4gICAgbG9vcFBvc3RQcm9jZXNzKHJvdywgYWRkZWRDb250ZW50LCBhbGxSb3dzLCBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICAgICAgaWYgKCFhZGRlZENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIHR5cGVzY3JpcHQgcGFydCBvZiB0aGUgZm9sbG93aW5nIHdlcmUgaW1wb3J0YW50LCB0aGlzIHdvdWxkIGJlIGEgcHJvYmxlbVxuICAgICAgICAvLyBpZiB0aGlzIHdlcmUgYSBkZXJpdmVkIGNsYXNzLlxuICAgICAgICBjb25zdCB0aGlzY2xhc3MgPSB0aGlzO1xuICAgICAgICBjb25zdCBub2RlcyA9IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoYWRkZWRDb250ZW50LCAnW2k1X2l0ZW1dLCBbXFxcXDAwMDAzQWl0ZW1dLCBbZGF0YS1pNV9pdGVtXScpO1xuICAgICAgICAvLyBJZiBubyBpNV9pdGVtIG1hdGNoZXMsIHRoZW4gZ3JhYiB0aGUgZmlyc3QgZWxlbWVudC5cbiAgICAgICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3IoYWRkZWRDb250ZW50LCAnKicpO1xuICAgICAgICAgICAgaWYgKGZpcnN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2goZmlyc3ROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MuaW5qZWN0QmluZChyb3csIG5vZGVzLCB7XG4gICAgICAgICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIGxvb3BQYXJlbnQ6IHRoaXMsXG4gICAgICAgICAgICBhc3luYzogdGhpcy5fYXN5bmNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRTdHJpbmdWYWx1ZShuYW1lLCBza2lwRXNjYXBlID0gZmFsc2UsIHNvdXJjZUNvbXBvbmVudElkKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKG5hbWUsIHNvdXJjZUNvbXBvbmVudElkKTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBza2lwRXNjYXBlID8gdmFsdWUgOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0VW50eXBlZFZhbHVlKG5hbWUsIHNvdXJjZUNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzO1xuICAgICAgICBsZXQgc291cmNlO1xuICAgICAgICBpZiAoc291cmNlQ29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudChzb3VyY2VDb21wb25lbnRJZCkgfHwgY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIEknbSBwcmV0dHkgc3VyZSB0aGlzIGlzIGJlaW5nIHZhbGlkYXRlZCBkdXJpbmcgY29uc3RydWN0aW9uIGJ1dCBiZSBzYWZlXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aGlzQXJnID0gY29tcG9uZW50LnZpZXdNb2RlbDtcbiAgICAgICAgLy8gSWYgVk0gaXMgYSBzdGF0ZSwgZ2V0IHRoZSBjdXJyZW50IHN0YXRlIHZhbHVlLlxuICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpc0FyZykpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ3RoaXMuJykpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSg1KTtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlldy5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSBjb21wb25lbnRbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdeJykgJiYgRWx2aXNfMS5lXyhjb21wb25lbnQubG9vcFBhcmVudCkudmlld01vZGVsICYmIHR5cGVvZiBFbHZpc18xLmVfKGNvbXBvbmVudC5sb29wUGFyZW50KS52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBOb3QgZG9pbmcgYSAnXicgYnkgaXRzZWxmIGJlY2F1c2UgdGhhdCdzIGEgcHJldHR5IEJTIGNhc2UuIElmIHRoaXMgaXMgdGhlIGxvb3AgY2hpbGQsIHRoZSBwYXJlbnQgaXMgcHJvYmFibHlcbiAgICAgICAgICAgIC8vIGFuIG9iamVjdCBvciBhbiBpdGVyYWJsZSwgbm90IHJlYWxseSBzb21ldGhpbmcgeW91J2xsIHJlYWQgb3Igd3JpdGUgdG8gZGlyZWN0bHkuXG4gICAgICAgICAgICAvLyBNaWdodCBkbyBhIHNob3J0Y3V0IHRvIHRoZSBwYXJlbnQgY29tcG9uZW50J3MgJ3RoaXMnXG4gICAgICAgICAgICB0aGlzQXJnID0gY29tcG9uZW50Lmxvb3BQYXJlbnQudmlld01vZGVsO1xuICAgICAgICAgICAgaWYgKCEobmFtZS5zbGljZSgxKSBpbiB0aGlzQXJnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXdNb2RlbCBwYXJlbnQgdmlldyBtb2RlbC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnW25hbWUuc2xpY2UoMSldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICcuJykge1xuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpc0FyZykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXdNb2RlbC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIENPTlNJREVSOiBDb25zaWRlciBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gYWxsb3cgZXhlY3V0aW5nIG1ldGhvZCB3aXRoIHN0cmluZyBwYXJhbWV0ZXJzLiBpNV9wYXJhbTAxPVwidmFsIDFcIiwgaTVfcGFyYW0wMj1cInZhbCAyXCJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UuY2FsbCh0aGlzQXJnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayhzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIHRoaXMuX3JlcGxhY2VtZW50cykge1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZShyZXBsLnNvdXJjZSwgcmVwbC5ub2VzY2FwZSwgcmVwbC5vdGhlckNvbXBvbmVudElkKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXBsLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRlbnQuYXR0cmlidXRlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLnZhbHVlIHx8IGYubmFtZSA9PT0gJ2k1X2lucHV0JyB8fCBmLm5hbWUgPT09ICc6aW5wdXQnKVxuICAgICAgICAgICAgLm1hcChtID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBtLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbS52YWx1ZSB8fCAnJ1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFRlY2huaWNhbGx5IGl0J3MgaW52YWxpZCB0byBhZGQgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gcmVndWxhciBlbGVtZW50cywgc28gdGVjaG5pY2FsbHkgPHJlcGxhY2UtbWUgOnN3aXRjaDpyZWR0ZXh0PVwid2FybmluZ1wiPlxuICAgICAgICAvLyBpcyBsZWdhbCBidXQgaWYgaWYgaXQgd2VyZSBhIGRpdiwgdGhhdCB3b3VsZCBiZSBpbGxlZ2FsLiBTbyB3ZSdsbCBhbGxvdyA8ZGl2IGRhdGEtaTVfc3dpdGNoX3JlZHRleHQ9XCJ3YXJuaW5nXCI+LlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIHdlaXJkIG5hbWUgaGFuZGxpbmcgb2YgZGF0YSBhdHRyaWJ1dGVzIGNvdWxkIGJyZWFrIHlvdXIgY29kZSBpZiB5b3UgdHJ5IHRvIHVzZSB0aGlzLiBZb3UgbWF5IG5lZWQgdG8gZG8gZXh0cmFcbiAgICAgICAgLy8gd29yayB0byBtYWtlIHlvdXIgY29kZSB3b3JrLCBhbGwgaW4gdGhlIG5hbWUgb2Ygc3RyaWN0IGFkaGVyZW5jZSB0byBzdGFuZGFyZHMuIEl0J3MgdXAgdG8geW91LlxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5jb250ZW50LmRhdGFzZXQpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGVudC5kYXRhc2V0W2F0dHJdO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IGF0dHIgPT09ICdpNV9pbnB1dCcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QXR0cmlidXRlcy5wdXNoKHsgbmFtZTogYXR0ciwgdmFsdWU6IHZhbHVlIHx8ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEdldCB0aGUgYWx0ZXJuYXRlIHNvdXJjZSBJZFxuICAgICAgICBjb25zdCBvdGhlckNvbXBvbmVudElkID0gRWx2aXNfMS5lXyhjdXJyZW50QXR0cmlidXRlcy5maW5kKGYgPT4gZi5uYW1lID09PSAnaTVfc291cmNlJyB8fCBmLm5hbWUgPT09ICc6c291cmNlJykpLnZhbHVlO1xuICAgICAgICBsZXQgdGV4dEh0bWxTZXQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIGN1cnJlbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5fcGFyc2VBdHRyaWJ1dGVOYW1lKHByb3AubmFtZSk7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFJlZ3VsYXIgYXR0cmlidXRlcyB3aWxsIGFsbCBtYXRjaCB0aGlzLlxuICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSwgZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhdHRyXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENzc0NsYXNzU3dpdGNoKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSwgZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12PiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dEh0bWxTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldCBpNV90ZXh0IGFuZCBpNV9odG1sIGF0IHNhbWUgdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0SHRtbFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBgPGktdiBub2VzY2FwZT4ke3Byb3AudmFsdWV9PC9pLXY+YDsgLy8gVXNlIHRoaXMgYXMgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdHRyaWJ1dGUocHJvcC52YWx1ZSwgZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpZk5lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHByb3AudmFsdWUsIG5lZ2F0aXZlLCBmYWxzZSwgb3RoZXJDb21wb25lbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzU3R5bGUocHJvcC52YWx1ZSwgZmFsc2UsIG90aGVyQ29tcG9uZW50SWQpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzc0NsYXNzKHByb3AudmFsdWUsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXcml0ZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIGZhbGwgdGhyb3VnaCwgdXNpbmcgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBhdHRyaWJ1dGUgYXMgYSB0YXJnZXQgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dCBpNV9pbnB1dF9mb28gaXMgdGhlIHNhbWUgYXMgaTVfdGFyZ2V0PVwiZm9vXCIgaTVfdmFsdWU9XCJmb29cIlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQnV0IG9ubHkgd3JpdGUgdG8gdGhlIGxvY2FsIHZpZXcgbW9kZWwsIG5vdCBhbm90aGVyIGNvbXBvbmVudCdzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdHRyaWJ1dGUocHJvcC52YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlVGFyZ2V0KHByb3AudmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9vcFwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBHcmFiIHRoZSBiYXNlIGNvbnRlbnQgZm9yIHRoZSBsb29wLCBwdWxsaW5nIGl0IG91dCBvZiB0aGUgRE9NLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvb3AocHJvcC52YWx1ZSwgRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCksIHR5cGUuZGV0YWlsID09PSAnbnVsbCcsIGZhbHNlLCBvdGhlckNvbXBvbmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHVzZWQgYXMgYSBzZWxlY3Rvci4gSGFzIG5vIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkIEljaGlnbyBhdHRyaWJ1dGU6IFwiICsgdHlwZS50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmVySWZOZWVkZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmZXIgPSB0aGlzLl9kZWZlciB8fCBwcm9wLnZhbHVlLnN0YXJ0c1dpdGgoJ3RoaXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3BhcnNlQXR0cmlidXRlTmFtZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgICAgLy8gR2VuZXJhbCBpY2hpZ28gc2hvcnRjdXRcbiAgICAgICAgICAgIG5hbWUgPSAnaTVfJyArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUgPT09ICdpNV9pdGVtJykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIGluZGljYXRlIGFuIGl0ZW0gY29tcG9uZW50LCBub3RoaW5nIGVsc2UuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X3NvdXJjZScpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBpbmRpY2F0ZSBhIHNvdXJjZSBjb21wb25lbnQuIEl0J3MgcmVhZCBzZXBhcmF0ZWx5LlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9ldmVudCcpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCBvbmx5IGluIENvbXBvbmVudC5hZGRJbmxpbmVFdmVudExpc3RlbmVycygpLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoJ2k1XycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYXR0cicpKSB7XG4gICAgICAgICAgICBpZiAobmFtZVs3XSAhPT0gJzonICYmIG5hbWVbN10gIT09ICdfJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5kaW5nIGF0dHJpYnV0ZSBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2F0dHInLCBkZXRhaWw6IG5hbWUuc2xpY2UoOCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2Jvb2wnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZVs3XSAhPT0gJzonICYmIG5hbWVbN10gIT09ICdfJyAmJiBuYW1lWzddICE9PSAnLScgJiYgbmFtZVs3XSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVbN10gPT09ICctJyB8fCBuYW1lWzddID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgNykgKyBuYW1lLnNsaWNlKDgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdib29sTmVnYXRpdmUnIDogJ2Jvb2wnLCBkZXRhaWw6IG5hbWUuc2xpY2UoOCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X3N3aXRjaCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzldICE9PSAnOicgJiYgbmFtZVs5XSAhPT0gJ18nICYmIG5hbWVbOV0gIT09ICctJyAmJiBuYW1lWzldICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3dpdGNoIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs5XSA9PT0gJy0nIHx8IG5hbWVbOV0gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA5KSArIG5hbWUuc2xpY2UoMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgMTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGFzcyBzd2l0Y2ggbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ3N3aXRjaENsYXNzTmVnYXRpdmUnIDogJ3N3aXRjaENsYXNzJywgZGV0YWlsOiBuYW1lLnNsaWNlKDEwKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaWYnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICctJyB8fCBuYW1lLnNsaWNlKC0xKSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnaWZOZWdhdGl2ZScgOiAnaWYnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9sb29wJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSAnaTVfbG9vcDpudWxsJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdsb29wJywgZGV0YWlsOiAnbnVsbCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdsb29wJyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfdGFyZ2V0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAoeyB0eXBlOiAndGFyZ2V0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2lucHV0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHR3b1dheSA9IG5hbWUuZW5kc1dpdGgoJ192YWx1ZScpIHx8IG5hbWUuZW5kc1dpdGgoJzonKTtcbiAgICAgICAgICAgIHJldHVybiAoeyB0eXBlOiAnaW5wdXQnLCBkZXRhaWw6IHR3b1dheSA/ICcyd2F5JyA6ICcnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHR5cGU6IG5hbWUuc2xpY2UoMykgfTtcbiAgICB9XG59XG5leHBvcnRzLkJvdW5kQ29tcG9uZW50ID0gQm91bmRDb21wb25lbnQ7XG4vLyBVc2UgYSBjdXN0b20gZWxlbWVudCB0byBjcmVhdGUgYSByZXBsYWNlbWVudCB0YWcgdGhhdCBpcyBub3QgbGltaXRlZCwgYXMgc3BhbiBpcywgdG8gY29udGFpbmluZyBubyBibG9jayBlbGVtZW50cy5cbi8vIE5vIGxvZ2ljLCBubyBzcGVjaWFsIGRpc3BsYXkgZGV0YWlscy5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuY2xhc3MgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmV4cG9ydHMuVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlID0gVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBHZXRVbmlxdWVJZF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG4vKipcbiAqIEEgY2xhc3Mgd2l0aCBhIGNvbnRlbnQgcHJvcGVydHkgdGhhdCBwb2ludHMgdG8gc29tZXRoaW5nIG9uIHRoZSBwYWdlLCBhbG9uZyB3aXRoIHNvbWUgb2YgaGVscGVyIG1ldGhvZHMuXG4gKlxuICogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgYmFzZSBjbGFzcyBmb3Igb3RoZXIgY2xhc3Nlcywgc28gaXQncyBtYXJrZWQgYWJzdHJhY3QuIEl0IGp1c3QgZG9lc24ndFxuICogbWFrZSBzZW5zZSB0byBtZSB0byBjcmVhdGUgQ29tcG9uZW50IHdpdGggbm90aGluZyBjdXN0b21pemVkLiBKdXN0IGNyZWF0ZSBhbiBIVE1MRWxlbWVudC4gVGhlIGhlbHBlcnMgYXJlbid0IHJlYWxseVxuICogdGhhdCBpbXByZXNzaXZlLCB3aGVuIHlvdSBjb25zaWRlciB0aGF0IHRoZSB0cmFkZW9mZiBpcyBoYXZpbmcgdG8gcmVmZXJlbmNlIG9iai5jb250ZW50IHRvIG1vZGlmeSB0aGUgRE9NLlxuICovXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IHVuZGVyc3RhbmQgdGhhdCB0aGlzLmNvbnRlbnQgaXMgc2V0IGluIEFMTCBvZiB0aGUgcHJpdmF0ZSBjdG9yIGZ1bmN0aW9ucy5cbiAgICAgICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgaWYgKGFyZ3MgJiYgdHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBfY3Rvcl9zdHJpbmcuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzICYmIGFyZ3Muc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmlubmVySHRtbCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oYXJncy5wcm9wZXJ0aWVzIHx8IHt9LCB7IGlubmVySFRNTDogYXJncy5pbm5lckh0bWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfY3Rvcl9sb29rdXAuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghYXJncykge1xuICAgICAgICAgICAgX2N0b3JfZW1wdHkuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmlubmVySHRtbCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oYXJncy5wcm9wZXJ0aWVzIHx8IHt9LCB7IGlubmVySFRNTDogYXJncy5pbm5lckh0bWwgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfY3Rvcl9leGlzdGluZ0VsZW1lbnQuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLm91dGVySHRtbCkge1xuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfY3Rvcl9pbm5lckh0bWwuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGVja0lubGluZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIC8vIEFuZ3VsYXIgbWF0ZXJpYWwgZG9lcyBzb21ldGhpbmcgbGlrZSB0aGlzLiBJbiB0aGlzIGNhc2UsIHRoZXJlJ3Mgbm8gZnVuY3Rpb25hbGl0eSBiZWhpbmQgaXQsIGJ1dCBpdCBkb2VzIG1ha2UgaXRcbiAgICAgICAgLy8gdXNlZnVsIGZvciBhIGRldmVsb3BlciB0byBzZWUgdGhhdCBhbiBlbGVtZW50IGlzIGEgY29tcG9uZW50IGFuZCB3aGF0IHR5cGUgaXQgaXMuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzbmFrZV9jYXNlID0gJ2l2XycgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUuc2xpY2UoMSlcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxXKy9nLCAnICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pKFthLXpdKS9nLCBcIiQxICQyJDNcIilcbiAgICAgICAgICAgICAgICAuc3BsaXQoL1xcQig/PVtBLVpdezIsfSkvKVxuICAgICAgICAgICAgICAgIC5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgICAgICAgIC5qb2luKCdfJylcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoc25ha2VfY2FzZSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgaGFzIHNvbWUgd2VpcmQgbmFtZSwgbm8gcHJvYmxlbS4gVGhpcyBpcyBqdXN0IGFuIGluZm8gZmllbGQgYW55d2F5LlxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwQ29tcG9uZW50KCk7XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2VtcHR5KCkge1xuICAgICAgICAgICAgLy8gTm8gYXJndW1lbnRzXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGZpbmUgYXMgbG9uZyBhcyBURWxlbWVudCBpcyBESVYuIE5vIHdheSB0byB2ZXJpZnkgdGhhdCBhcyBpdCdzIGEgdHlwZXNjcmlwdCBpbGx1c2lvbi4gSlMgZG9lc24ndCBzZWUgdHlwZSBwYXJhbWV0ZXJzLlxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgeyBpZDogR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCgpIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2xvb2t1cChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciBleGlzdGluZ0VsZW1lbnQuXG4gICAgICAgICAgICAvLyBUaGUgbWFpbiByZWFzb24gaXQgZXhpc3RzIGlzIHRoYXQgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgZG9lc24ndCByZXR1cm4gdGhlIGNvcnJlY3QgdHlwZSAoaXQncyBub3QgZ2VuZXJpYyksXG4gICAgICAgICAgICAvLyBzbyB0eXBlc2NyaXB0IGZyZWFrcyBvdXQgYW5kIHRoaW5rcyBpdCBzaG91bGQgYmUgYSBTVFJJTkcsIGluIHNwaXRlIG9mIHRoZSB0eXBlIGRlZmluaXRpb24gbm90IGJlaW5nIGFueXRoaW5nXG4gICAgICAgICAgICAvLyBsaWtlIHRoYXQuIEl0J3MganVzdCBlYXNpZXIgdG8gdXNlIHRoaXMgdGhhbiB0byByZW1lbWJlciBcIm9oLCByaWdodCwgaSBoYXZlIHRvIHVzZSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCksIHdoaWNoIGlzIGdlbmVyaWNcIi5cbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSAoZXhpc3RpbmdFbGVtZW50LnBhcmVudCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihleGlzdGluZ0VsZW1lbnQuc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IHNlbGVjdG9yIGNvdWxkIG5vdCBmaW5kIGVsZW1lbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIGlzIG5hc3R5IGJ1dCBpdCBtYWtlcyBUeXBlU2NyaXB0IGhhcHB5IHdpdGhvdXQgY3JlYXRpbmcgYSBuZXcgb2JqZWN0IGNvcHlcbiAgICAgICAgICAgIGV4aXN0aW5nRWxlbWVudC5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIF9jdG9yX2V4aXN0aW5nRWxlbWVudC5jYWxsKHRoaXMsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfZXhpc3RpbmdFbGVtZW50KGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gZXhpc3RpbmdFbGVtZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAvLyBGaXJzdCB0cnkgYXR0cmlidXRlcyAod2hpY2ggYXJlIHRoZSBpbml0aWFsIHZhbHVlcylcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShhdHRyLCBleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlbiBvdmVyd3JpdGUgd2l0aCBwcm9wZXJ0aWVzICh3aGljaCBhcmUgY3VycmVudClcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfaW5uZXJIdG1sKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIE5ldyBlbGVtZW50LiBVc2VyIHNwZWNpZmllcyB0aGUgaW5uZXIgSFRNTCBmb3IgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAvLyBUaGlzIGNvdWxkIGJlIGFuIGVtcHR5IG9iamVjdCBsaWtlIHt9LCBwcmFjdGljYWxseSB0aGUgc2FtZSBhcyBjYWxsaW5nIGl0IHdpdGggbm8gYXJnc1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB7IGlubmVySFRNTDogbmV3RWxlbWVudC5pbm5lckh0bWwgfHwgJycgfTtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMsIG5ld0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChuZXdFbGVtZW50LnR5cGUgfHwgRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgcHJvcHMsIG5ld0VsZW1lbnQuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IG5ld0VsZW1lbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5jb250ZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX291dGVySHRtbChuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBVc2VyIHNwZWNpZmllcyB0aGUgZnVsbCBIVE1MIGZvciB0aGUgY29udGVudC5cbiAgICAgICAgICAgIC8vIE5vdGUgdGhhdCBpdCBjYW4ndCBiZSB0eXBlIGNoZWNrZWQuIEpTIGNhbid0IHNlZSB3aGF0IFRFbGVtZW50IGlzLlxuICAgICAgICAgICAgY29uc3QgdG1wZGl2ID0gQ3JlYXRlRWxlbWVudF8xLmRpdihuZXdFbGVtZW50Lm91dGVySHRtbC50cmltKCkpO1xuICAgICAgICAgICAgaWYgKHRtcGRpdi5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMSB8fCAhdG1wZGl2LmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXRlckh0bWwgbXVzdCBjb250YWluIGV4YWN0bHkgb25lIEhUTUxFbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0bXBkaXYuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAvLyBGaXJzdCB0cnkgYXR0cmlidXRlcyAod2hpY2ggYXJlIHRoZSBpbml0aWFsIHZhbHVlcylcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobmV3RWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHIsIG5ld0VsZW1lbnQuYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlbiBvdmVyd3JpdGUgd2l0aCBwcm9wZXJ0aWVzICh3aGljaCBhcmUgY3VycmVudClcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudCwgbmV3RWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNwZWNpZmllZCBJRCB0YWtlcyBwcmVjZWRlbmNlXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IG5ld0VsZW1lbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3Jfc3RyaW5nKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFN0cmluZyBieSBpdHNlbGYgaXMgYSBzaG9ydGN1dCBmb3Igb3V0ZXJIdG1sXG4gICAgICAgICAgICBfY3Rvcl9vdXRlckh0bWwuY2FsbCh0aGlzLCB7IG91dGVySHRtbDogbmV3RWxlbWVudCB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKlxuICAgICAqIEl0IGRvZXNuJ3QgaGF2ZSB0byBiZSBhIGN1c3RvbSB0YWcuIEl0IGNvdWxkIGJlIGEgY2xhc3MsIGxpa2UgPHAgY2xhc3M9J2JpbmQtdG8tbW9kZWxcIj4gKHNlbGVjdG9yPScuYmluZC10by1tb2RlbCcpXG4gICAgICogb3IgPHAgaWNoaWdvPiAoc2VsZWN0b3I9J1tpY2hpZ29dJykuXG4gICAgICpcbiAgICAgKiBUbyBjb21wbGV0ZWx5IHJlcGxhY2UgdGhlIGV4aXN0aW5nIGVsZW1lbnQgKGNvcHlpbmcgZXhpc3RpbmcgYXR0cmlidXRlcykgc2VuZCB0aGUgcmVsZXZhbnQgb3B0aW9ucywgcGx1cyB7cmVwbGFjZTogdHJ1ZX0uXG4gICAgICpcbiAgICAgKiBBY2NlcHRzIEtleXdvcmQgQXJndW1lbnRzLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQ29tcG9uZW50KGVsZW1lbnQsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydEVsZW1lbnRUb0NvbXBvbmVudChlbGVtZW50LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3Qoc2VsZWN0b3IsIG9wdCwgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pO1xuICAgIH1cbiAgICBzdGF0aWMgX2luamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgY29uc3QgY29udGFpbmVycyA9IHRoaXMuX2xvb2tVcENvbnRhaW5lcnNUb0luamVjdChzZWxlY3Rvciwgb3B0aW9ucy5wYXJlbnQpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiBjb250YWluZXJzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FuJ3QgaGF2ZSBkdXBlIElEcyBiZWluZyBjcmVhdGVkIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBjb250YWluZXJzLiBUaGVyZSBhcmUgMyBwbGFjZXMgd2hlcmUgSUQgY2FuIGJlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmlkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3Byb3BlcnRpZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnByb3BlcnRpZXMuaWQ7IC8vIERPTSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgnYXR0cmlidXRlcycgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0cmlidXRlcy5pZDsgLy8gSFRNTCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVwbGFjZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjb252ZXJ0ZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgc3RhdGljIF9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAvLyBUaGlzIGF0dGVtcHRzIHRvIHByZXNlcnZlIHRoZSBhdHRyaWJ1dGVzIHNldCBvbiB0aGUgcmVwbGFjZWQgZWxlbWVudC4gVGhhdCBvcGVucyBhbiB1Z2x5IGNhbiBvZiB3b3JtcyxcbiAgICAgICAgLy8gYnV0IGl0IHNob3VsZCBtYWtlIHJlcGxhY2VtZW50IGNvbXBvbmVudHMgbW9yZSB1c2VmdWwgYmVjYXVzZSBpdCBhbGxvd3MgdGhlbSB0byB2YXJ5LlxuICAgICAgICAvLyBJdCBkb2VzIG1ha2UgYSBicnV0YWwganVnZ2xpbmcgYWN0OlxuICAgICAgICAvLyBJZiB0aGUgZXhpc3RpbmcgZWxlbWVudCBoYXMgaW5uZXJIVE1MLCB3ZSB3YW50IHRvIHRha2UgaXQuXG4gICAgICAgIC8vIElmIG91dGVySFRNTCBpcyBwcm92aWRlZCwgdGhlIG91dGVySFRNTCdzIGlubmVySFRNTCBzaG91bGQgb3ZlcnJpZGUgdGhlIGV4aXN0aW5nIGVsZW1lbnQncy5cbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGF0dHJpYnV0ZXMsIHdlIHdhbnQgdG8gdGFrZSB0aGVtLlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBhdHRyaWJ1dGVzIHNob3VsZCBvdmVycmlkZSB0aGVtLlxuICAgICAgICAvLyBGb3IgYW55IGF0dHJpYnV0ZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIEZvciBhbnkgcHJvcGVydGllcyBwYXNzZWQgaW4gT1BUSU9OUywgdGhleSBzaG91bGQgb3ZlcnJpZGUgYW55dGhpbmcgdGhhdCBjYW1lIGJlZm9yZS5cbiAgICAgICAgLy8gT25seSB0aGUgbGFzdCAyIGFyZSBoYW5kbGVkIGluIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IuIEFuZCBpZiB3ZSdyZSBub3QgY2FyZWZ1bCwgd2UgY291bGQgYnJlYWsgdGhlbS5cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHsgaW5uZXJIVE1MOiBleGlzdGluZ0VsZW1lbnQuaW5uZXJIVE1MIH07XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20oZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICAvLyBUaGlzIGlzIHVnbHkgYmVjYXVzZSBpdCBoYXBwZW5zIGFnYWluIGluIHRoZSBjb25zdHJ1Y3Rvci4gTm8gb3RoZXIgY2xlYW4gd2F5IHRvIHBhcnNlIHRoZSBlbGVtZW50IGF0dHJpYnV0ZXMsIHRob3VnaC5cbiAgICAgICAgaWYgKG9wdC5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENyZWF0ZUVsZW1lbnRfMS5kaXYob3B0Lm91dGVySHRtbC50cmltKCkpO1xuICAgICAgICAgICAgaWYgKHRtcC5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMSB8fCAhdG1wLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXRlckh0bWwgbXVzdCBjb250YWluIGV4YWN0bHkgb25lIEhUTUxFbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0bXAyID0gdG1wLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gVGhlIG91dGVyIEhUTUwgYXR0cmlidXRlcyBnZXQgcGlja2VkIHVwIGF1dG9tYXRpY2FsbHkgd2hlbiBhZGRlZCB0byB0aGUgRE9NLCBzbyB3ZSByZWFsbHlcbiAgICAgICAgICAgIC8vIGp1c3QgbmVlZCB0byBkaXNjYXJkIHRoZSBtYXRjaGluZyBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzIG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuaW5uZXJIVE1MO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20odG1wMi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1thdHRyLm5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvcHQucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgb3B0LnByb3BlcnRpZXMpO1xuICAgICAgICBvcHQuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgb3B0LmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX2dldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgb3B0O1xuICAgICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciByZXBsYWNpbmcgdGhlIG91dGVyIEhUTUxcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogdHJ1ZSwgb3V0ZXJIdG1sOiBvcHRpb25zIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IGtub3cgdGhhdCBvcHRpb25zICE9PSAnc3RyaW5nJyAoY2FuJ3QgcmVhZCBcImVsc2UgaWZcIiBjbGF1c2UpXG4gICAgICAgICAgICBvcHQgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0ID0geyByZXBsYWNlOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3RvcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBzdGF0aWMgX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0pO1xuICAgIH1cbiAgICBzdGF0aWMgX2xvb2tVcENvbnRhaW5lcnNUb0luamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIHBhcmVudCkge1xuICAgICAgICBpZiAoc2VsZWN0b3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEkndmUgZG9uZSB0aGlzIG15c2VsZiwgd2hpY2ggcmVzdWx0cyBpbiBhIHNpbGVudCBmYWlsdXJlIGlmIGFjY2lkZW50YWwuXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdJbmplY3Rpb24gc2VsZWN0b3IgaXMgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RvciA9IHNlbGVjdG9yIHx8ICdbaWNoaWdvXSc7XG4gICAgICAgIC8vIExvb2sgdXAgdGhlIGVsZW1lbnRzIHRvIGVpdGhlciByZXBsYWNlIG9yIGNvbnZlcnRcbiAgICAgICAgbGV0IGNvbnRhaW5lcnM7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50IHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20oc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVycztcbiAgICB9XG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmlkO1xuICAgIH1cbiAgICBzZXQgaWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlkID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBpbm5lckhUTUwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cbiAgICBzZXQgaW5uZXJIVE1MKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBXaWxsIHJldHVybiB1bmRlZmluZWQgaWYgY29udGVudCBpcyBub3QgYSBmb3JtIGZpZWxkIHR5cGVcbiAgICAgICAgcmV0dXJuIEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50KTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIC8vIFdpbGwgbG9nIGEgd2FybmluZyBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICBGb3JtRmllbGRWYWx1ZV8xLnNldEZvcm1GaWVsZFZhbHVlKHRoaXMuY29udGVudCwgdmFsdWUpO1xuICAgIH1cbiAgICBnZXQgY2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNsYXNzTmFtZTtcbiAgICB9XG4gICAgc2V0IGNsYXNzTmFtZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBjbGFzc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0O1xuICAgIH1cbiAgICBnZXQgc3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuc3R5bGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBIVE1MIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBDb21wb25lbnQgY29udGVudC4gRmx1ZW50LlxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaCB0aGUgSFRNTCBmb3IgaTVfZXZlbnQgb3IgOmV2ZW50IGF0dHJpYnV0ZXMgYW5kIGFkZCBldmVudCBsaXN0ZW5lcnMgYWNjb3JkaW5nIHRvIGlubGluZSBjdXN0b20gYXR0cmlidXRlcy5cbiAgICAgKiBGaWx0ZXIgYnkgbWF0Y2hpbmcgdGhlIGNvbXBvbmVudEZpbHRlciBpbnB1dCB3aXRoIGFuIGF0dHJpYnV0ZSBsaWtlIGNvbXBvbmVudD1cImNvbXBvbmVudEZpbHRlclwiLlxuICAgICAqIEVuY2xvc2UgdGhlIGV2ZW50IHR5cGUgaW4gcGFyZW50aGVzZXMsIGFuZCBmb3IgdGhlIHZhbHVlLCBlbnRlciB0aGUgbmFtZSBvZiBhIG1ldGhvZCBpbiB0aGlzIGNvbXBvbmVudC5cbiAgICAgKiBFeGFtcGxlOiA8Zm9ybSA6ZXZlbnQgKGNsaWNrKT1cInN1Ym1pdFRoZUZvcm1cIj48L2Zvcm0+XG4gICAgICogVGhpcyBpcyBhbHNvIGFsbG93ZWQ6IDxmb3JtIDpldmVudCBfY2xpY2tfPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKi9cbiAgICBhZGRJbmxpbmVFdmVudExpc3RlbmVycyhjb21wb25lbnRGaWx0ZXIpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB3ZSBjb3VsZCBza2lwIHRoaXMgaW5pdGlhbCBmaWx0ZXIsIGxpa2UgYW5ndWxhciBkb2VzLiBCdXQgdGhlcmUgaXMgbm8gQ1NTIHNlbGVjdG9yIGZvclxuICAgICAgICAvLyBhdHRyaWJ1dGUgbmFtZSBiZWdpbnMgd2l0aCBvciBlbmRzIHdpdGguIFthdHRyXj1dIGlzIGZvciB0aGUgVkFMVUUgYmVnaW5uaW5nIHdpdGggc29tZXRoaW5nLlxuICAgICAgICAvLyBUaGlzIGluY2x1ZGVzIHRoZSBjb250ZW50IGl0c2VsZiBpbiBpdHMgY2hlY2suXG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRGaWx0ZXIgJiYgZWxlLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgIT09IGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGxldCBldmVudERlZmluaXRpb24gPSBjdXJyZW50QXR0cmlidXRlcy5maW5kKGYgPT4gZi5uYW1lLnN0YXJ0c1dpdGgoJygnKSAmJiBmLm5hbWUuZW5kc1dpdGgoJyknKSAmJiBmLm5hbWUubGVuZ3RoID4gMik7XG4gICAgICAgICAgICBpZiAoIWV2ZW50RGVmaW5pdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIGJ5IGFsdGVybmF0ZSBzeW50YXguIFRoaXMgb25lIHdvcmtzIGJldHRlciB3aXRoIHNldEF0dHJpYnV0ZSgpLlxuICAgICAgICAgICAgICAgIGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnXycpICYmIGYubmFtZS5lbmRzV2l0aCgnXycpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uIHx8ICFldmVudERlZmluaXRpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50IGRlZmluaXRpb24gbm90IGRlY2xhcmVkIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpc1tldmVudERlZmluaXRpb24udmFsdWVdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhbmRsZXIgbWV0aG9kIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfSAke2V2ZW50RGVmaW5pdGlvbi52YWx1ZX0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50RGVmaW5pdGlvbi5uYW1lLnNsaWNlKDEsIC0xKSwgbWV0aG9kLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZENoaWxkKG5ld0NoaWxkKSB7XG4gICAgICAgIGlmIChndWFyZChuZXdDaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgICAgIGlmIChndWFyZChwYXJlbnQpKSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGNvbXBvbmVudCB0byBDb21wb25lbnRNYXAuXG4gICAgICovXG4gICAgbWFwQ29tcG9uZW50KCkge1xuICAgICAgICAvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgY29udGVudCBoYXMgYWxyZWFkeSBiZWVuIHJlbGF0ZWQgdG8gYSBkaWZmZXJlbnQgY29tcG9uZW50XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQodGhpcy5jb250ZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IGFscmVhZHkgcmVmZXJlbmNlZCBieSBhIGNvbXBvbmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldCh0aGlzLmNvbnRlbnQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBjb21wb25lbnQgZnJvbSBDb21wb25lbnRNYXAuIFNvbWV0aW1lcyB5b3UgbWlnaHQgbmVlZCB0byB1c2UgdGhpcy4gQnV0IGhvcGVmdWxseSByYXJlbHksIGJlY2F1c2UgaXQncyB1c2luZyBhIFdlYWtNYXAsXG4gICAgICovXG4gICAgdW5tYXBDb21wb25lbnQoKSB7XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBjb21wb25lbnRzIHRoYXQgYXJlIG5lc3RlZCBpbnNpZGUgdGhpcyBjb21wb25lbnQuXG4gICAgICovXG4gICAgKmdldEFsbENoaWxkQ29tcG9uZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudChlKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0U3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdzdHJpbmcnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUUyBqdXN0IGZvcmdvdCB0aGF0IHByb3BlcnR5IGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4uXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcHJvcGVydHlbcHJvcF07XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENsYXNzKGNsYXNzTmFtZXMpIHtcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09IFwic3RyaW5nXCIgJiYgY2xhc3NOYW1lcy5pbmNsdWRlcyhcIiBcIikpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLnNwbGl0KFwiIFwiKS5maWx0ZXIocSA9PiBxICE9PSBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IFtjbGFzc05hbWVzXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJlY2F1c2UgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKSBzZWFyY2hlcyBhbGwgdGhlIHdheSBkb3duLCBpbnRvIG5lc3RlZCBjb21wb25lbnRzLCBpdCBjYW4ndCBiZSBjYWxsZWRcbiAgICAgKiBieSBkZWZhdWx0LiBJdCBqdXN0IHRocm93cyBlcnJvcnMgb24gYWxsIGJ1dCBzaW1wbGUgdGVzdCBjYXNlcy4gQnV0IGJlY2F1c2UgdGhlc2UgZXZlbnRzIGFsbW9zdCBhbHdheXMgZXhpc3RcbiAgICAgKiBpbnRlcm5hbCB0byB0aGUgY29tcG9uZW50IChlLmcuIG9uIGJ1dHRvbnMpLCBpdCBjYW4ndCBiZSBsaW1pdGVkLiBUaGlzIGNhbiBiZSBjb25mdXNpbmcgd2l0aG91dCBzb21lIGtpbmQgb2ZcbiAgICAgKiBtZXNzYWdlLlxuICAgICAqL1xuICAgIF9jaGVja0lubGluZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGVsZSBvZiBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKFt0aGlzLmNvbnRlbnRdLCAnW2k1X2V2ZW50XSwgW1xcXFwwMDAwM0FldmVudF0sIFtkYXRhLWk1X2V2ZW50XScpKSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXykge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdJbmxpbmUgZXZlbnQgbGlzdGVuZXJzIGFyZSBjb25maWd1cmVkLiBSZW1lbWJlciB0byBjYWxsIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuJyk7XG4gICAgICAgICAgICAgICAgd2luZG93Ll9fZXZlbnRfd2FybmluZ19fID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVsZXRlIHdpbmRvdy5fX2V2ZW50X3dhcm5pbmdfXywgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgcXVlc3Rpb24gbmVlZHMgdG8gYmUgYXNrZWQ6IGlmIHlvdSBjYW4gYWRkIGEgY29tcG9uZW50IHRvIGEgcGFnZSBieSBkb2luZyBlbGVtZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudC5jb250ZW50KSxcbiAqIGhvdyBkbyB5b3UgZG8gZnJvbSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykgYW5kIGdldCB0byBjb21wb25lbnQsIG5vdCBjb21wb25lbnQuY29udGVudD8gVGhpcyBpcyBob3cuXG4gKlxuICogdmFyIGNvbXBvbmVudCA9IENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykpO1xuICpcbiAqIFRoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KGNvbnRlbnQsIGNvbXBvbmVudCkgaGFzIGJlZW4gY2FsbGVkIGF0IHNvbWUgcG9pbnQuXG4gKlxuICogVGhpcyBpcyB0aGUgYXBwcm92ZWQgd2F5IG9mIGRvaW5nIGl0LiBBbm90aGVyIHBvc3NpYmxlIHNvbHV0aW9uIHdvdWxkIGJlIHRoZSB1c2Ugb2YgZXhwYW5kbyBwcm9wZXJ0aWVzLFxuICogZm9yIGV4YW1wbGUgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpLnJlbGF0ZWRDb21wb25lbnQgPSBjb21wb25lbnQuIFRoaXMgd29ya3MgYW5kIGl0J3Mgc3VwZXIgc2ltcGxlLFxuICogYnV0IHNlZW1zIHRvIGJlIGZyb3duZWQgdXBvbiAuLi4gaXQgaGFzIGJlZW4ga25vd24gdG8gY3JlYXRlIG1lbW9yeSBsZWFrcyBpbiB0aGUgcGFzdC4gV2Vha01hcCBpcyB0aGUgb2JqZWN0XG4gKiBzcGVjaWZpY2FsbHkgY3JlYXRlZCBmb3IgdGhpcyB1c2UgY2FzZSwgc28gdGhhdCBpcyB1c2VkIGhlcmUuXG4gKlxuICogSWYgZXh0ZW5zaW9uIG1ldGhvZHMgYXJlIGxvYWRlZCwgeW91IGNhbiB1c2UgdGhlIGVsZW1lbnQuZ2V0Q29tcG9uZW50KCkgc2hvcnRjdXQuXG4gKi9cbmNsYXNzIENvbXBvbmVudE1hcCB7XG59XG5Db21wb25lbnRNYXAuY29tcG9uZW50cyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLkNvbXBvbmVudE1hcCA9IENvbXBvbmVudE1hcDtcbmZ1bmN0aW9uIGdldENvbXBvbmVudChlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGVsZW1lbnQpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcG9uZW50ID0gZ2V0Q29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmFibGVDaGVjayhvYmopIHtcbiAgICAvLyBOb3QgYW4gZXhoYXVzdGl2ZSB0ZXN0IGJ1dCBpdCdzIHRoZSBpbXBvcnRhbnQgYml0LlxuICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NoYW5nZUhhbmRsZXInIGluIG9iaiAmJiBvYmouY2hhbmdlSGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcjtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUNoZWNrID0gb2JzZXJ2YWJsZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbi8qKlxuICogQ29tbW9uIGxvZ2ljIGJldHdlZW4gdGhlIGRpZmZlcmVudCBvYnNlcnZhYmxlIGNsYXNzZXMuIFRoZXNlIGltcGxlbWVudCBJT2JzZXJ2YWJsZS4gVGhlIGludm9jYXRpb24gaXRzZWxmIHZhcmllcyBmcm9tIGNsYXNzIHRvIGNsYXNzLlxuICovXG5jbGFzcyBPYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoeyBuYW1lLCBmb3J3YXJkVG8sIGJ1YmJsZUZyb20sIGRpc2FibGVBc3luYyB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBpZiAoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3J3YXJkVG8pIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFnRGVsZWdhdGUobmFtZSk7XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGhhcyBmb3Jnb3R0ZW4gdGhhdCBFdmVudEhhbmRsZXIgY2FuIGFjY2VwdCBhbiBhcnJheS5cbiAgICAgICAgLy8gSW4gc3BpdGUgaWYgdGhlIGZhY3QgdGhhdCB0aGlzIHNpZ25hdHVyZSBpcyBpZGVudGljYWwuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIuc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoZSBpbnB1dCdzIGRlbGVnYXRlIHRvIHRoaXMgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBzZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKSB7XG4gICAgICAgIC8vIEpvaW4gdGhlIG90aGVyIGV2ZW50IGhhbmRsZXIgdG8gdGhpcywgc28gdGhhdCB3aGVuIHRoaXMgaXMgaW52b2tlZCwgc28gaXMgdGhlIG90aGVyLlxuICAgICAgICB0aGlzLnN1YnNjcmliZShmb3J3YXJkVG8uY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGlzIG9iamVjdCdzIGRlbGVnYXRlIHRvIHRoZSBpbnB1dCBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGV2ZW50cyByYWlzZWQgb24gdGhlIG90aGVyIGhhbmRsZXIsIHNvIHRoYXQgd2hlbiB0aGF0IGlzIGludm9rZWQsIHNvIGlzIHRoaXNcbiAgICAgICAgLy8gVGhlIHNhbWUgYXMgZm9yd2FyZENoYW5nZUV2ZW50c1RvIGV4Y2VwdCB0aGF0IHRoaXMgaXMgdGhlIHRhcmdldCwgbm90IHRoZSBzb3VyY2UuXG4gICAgICAgIGJ1YmJsZUZyb20uc3Vic2NyaWJlKHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVTZW5kZXIoc2VuZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVMaXN0ZW5lcihzZW5kZXIpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgcHJvYmFibHkgZnJvd25lZCB1cG9uIChzZWUgaG93IFRTIGRvZXNuJ3QgbGlrZSBpdCksIGJ1dCBpdCdzIHZhbGlkIEpTLlxuICAgICAqIEl0J3Mgb25seSBpbnRlbmRlZCBmb3IgdHJvdWJsZXNob290aW5nLCBub3QgcmVhbCBsb2dpYy4gVGhlcmUgYXJlIHRpbWVzIHdoZW4geW91J3JlXG4gICAgICogdHJ5aW5nIHRvIGlkZW50aWZ5IGV4YWN0bHkgd2hpY2ggZGVsZWdhdGVzIGFyZSBzdWJzY3JpYmVkLCBhbmQgdGhpcyBpcyByZWFsbHkgaGFyZCB3aGVuXG4gICAgICogbm90aGluZyBoYXMgaHVtYW4tcmVhZGFibGUgbmFtZXMuXG4gICAgICovXG4gICAgdGFnRGVsZWdhdGUobmFtZSkge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlLl90YWcgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgeCBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoeCAhPT0gXCJjaGFuZ2VIYW5kbGVyXCIgJiYgeCAhPT0gXCJwcml2YXRlUHJvcGVydHkyXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbeF0gPSB0aGlzW3hdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlQmFzZSA9IE9ic2VydmFibGVCYXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIE9ic2VydmFibGVQcm9wZXJ0eSBpcyBhIHByb3BlcnR5IHRoYXQgYXV0b21hdGljYWxseSByYWlzZXMgYSBQcm9wZXJ0eUNoYW5nZWQgZXZlbnQgd2hlbiBpdCBpcyBtb2RpZmllZC4gVGhpcyBpcyBtb3JlXG4gKiBjb252ZW5pZW50IHRoYW4gaGF2aW5nIHRvIGRvIGl0IG1hbnVhbGx5IGV2ZXJ5IHRpbWUgeW91IG5lZWQgaXQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVQcm9wZXJ0eSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBvcHRpb25zLm9ubHlXaGVuQ2hhbmdlZCB8fCBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgJiYgb2xkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnc2V0JywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZCwgdmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIChpZiBhIHN0cmluZykgdGhhdCBoYXMgaGFkIHNwZWNpYWwgSFRNTCBjaGFyYWN0ZXJzIGVzY2FwZWQuXG4gICAgICovXG4gICAgZ2V0IHNhZmVWYWx1ZSgpIHtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlUHJvcGVydHkgPSBPYnNlcnZhYmxlUHJvcGVydHk7XG5mdW5jdGlvbiBvYnNlcnZhYmxlUHJvcGVydHlDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGxpa2UgdGhpcyBiZWNhdXNlIGl0IHNob3VsZCBiZSBjaGVja2luZyBpZiB2YWx1ZSBpcyBhIHNldHRlcixcbiAgICAvLyBhbmQgaXQgaXNuJ3QsIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGNoZWNrLlxuICAgIC8vIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKSBkb2Vzbid0IGNhdGNoIGluaGVyaXRlZCBwcm9wZXJ0aWVzLCBvZlxuICAgIC8vIHdoaWNoIHRoaXMgaXMgYWxtb3N0IGFsd2F5cyBvbmUuXG4gICAgLy8gSSBoYXZlIHRvIGZhbGwgYmFjayB0byBhIGJhc2ljIGluc3RhbmNlIGNoZWNrLlxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVByb3BlcnR5O1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayA9IG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENsb25lRGVlcF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcFwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIG9ic2VydmFibGUgc3RhdGUgdGhhdCBzaG91bGQgb25seSBiZSBhY2Nlc3NlZCB1c2luZyB0aGUgcmVsZXZhbnQgbWV0aG9kcywgYWxsb3dpbmcgYXRvbWljIGNoYW5nZXMgdG8gbXVsdGlwbGUgcHJvcGVydGllc1xuICogaW4gbXVsdGlwbGUgb2JqZWN0cywgcmFpc2luZyBhIHNpbmdsZSBldmVudC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVN0YXRlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJ3NldFN0YXRlJztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBJIHdvdWxkIHByZWZlciB0aGF0IHRoaXMgcmV0dXJuIFJlYWRvbmx5PFQ+IGJ1dCBnZXR0ZXIgYW5kIHNldHRlciBoYXZlIHRvIGJlIHRoZSBzYW1lIHR5cGUuXG4gICAgICAgIC8vIFRoYXQgbWVhbnMgeW91IHdvdWxkIGhhdmUgdG8gY2FzdCBhbnkgdmFsdWUgeW91IHNldCBhcyBhIHJlYWRvbmx5LCB3aGljaCBpcyBhIFBJVEEuXG4gICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVyd3JpdGVzIHRoZSBlbnRpcmUgdmFsdWUuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodmFsdWUsIHRydWUpO1xuICAgIH1cbiAgICBnZXRTYWZlVmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG1wID0gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0bXApIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRtcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodG1wKSk7XG4gICAgfVxuICAgIGdldFZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICAvLyBUaGUgUmVhZG9ubHkgdHlwZSB3b3JrcyBmaW5lIGFuZCBpdCdzIGZhc3QgLi4uIGluIHR5cGVzY3JpcHQuXG4gICAgICAgIC8vIEluIGphdmFzY3JpcHQsIGlmIHlvdSBqdXN0IHJldHVybiB0aGUgdmFsdWUsIG5vdGhpbmcgcHJldmVudHMgaXQgZnJvbSBiZWluZyBlZGl0ZWQuXG4gICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy52YWx1ZSk7XG4gICAgfVxuICAgIHNldFN0YXRlKHZhbHVlLCBvdmVyV3JpdGVBbGwgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZTtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xuICAgICAgICAvLyBJZiB0aGUgdHlwZSBpcyBwcmltaXRpdmUsIHRoZW4gYSBmdWxsIG92ZXJ3cml0ZSBpcyBhbGxvd2VkXG4gICAgICAgIGlmIChJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgLy8gRnVuY3Rpb25zIHdpbGwgZXhlY3V0ZSBidXQgdGhleSB3b24ndCBjaGFuZ2UgdGhlIHZhbHVlLiBUaGUgcmVhc29uIGlzIHRoZSBzYW1lIHJlYXNvbiB0aGF0IHRoaXMgbWFrZXMgbm8gcGVybWFuZW50IGNoYW5nZSB0byBiYXI6XG4gICAgICAgICAgICAvLyB2YXIgZm9vID0gZnVuY3Rpb24oc3RyKSB7IHN0ciA9IHN0ci50b1VwcGVyQ2FzZSgpOyB9OyB2YXIgYmFyID0gJ2FiYyc7IGZvbyhiYXIpOyBjb25zb2xlLmxvZyhiYXIgPT09ICdhYmMnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHNldFN0YXRlIHdpdGggYSBmdW5jdGlvbiBpZiBzdGF0ZSBpcyBwcmltaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVyV3JpdGVBbGwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdmVyV3JpdGVBbGwpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjFfb3ZlcndyaXRlQWxsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgW25ld1ZhbHVlLCByZXR1cm5WYWx1ZV0gPSBfb3ZyM19mdW5jdGlvbkFyZy5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndmFsdWUgaXMgbm90IGEgcGFydGlhbCBzdGF0ZSBvciBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIyX3BhcnRpYWwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB7IG9sZFZhbHVlLCBuZXdWYWx1ZSwgcmV0dXJuVmFsdWUgfTtcbiAgICAgICAgZnVuY3Rpb24gX292cjFfb3ZlcndyaXRlQWxsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBlbnRpcmUgb2JqZWN0LlxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAoX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjJfcGFydGlhbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFBhcnRpYWwgb2JqZWN0OiBPdmVyd3JpdGUgb25seSB0aGUga2V5cyBwcm92aWRlZFxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0bXBba2V5XSA9IF92YWx1ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjNfZnVuY3Rpb25BcmcoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmdW5jdGlvbiBwcm92aWRlZCBhbmQgdXBkYXRlIHRoZSBvYmplY3QgYXMgZGljdGF0ZWRcbiAgICAgICAgICAgIC8vIE1heWJlIHVubmVjZXNzYXJ5IGJ1dCB3ZSB3YW50IHRvIGF2b2lkIHRoZSBjYWxsZXIgZXhmaWx0cmF0aW5nIHRoZSBzdGF0ZSB1c2luZyBhIGZ1bmN0aW9uLFxuICAgICAgICAgICAgLy8gYnkgYWNjaWRlbnQuIE9mIGNvdXJzZSwgdGhleSBjYW4ganVzdCBhY2Nlc3MgX3ZhbHVlIGJ5IGNhc3RpbmcgYXMgYW55LFxuICAgICAgICAgICAgLy8gYnV0IHRoYXQncyBub3QgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBfcmV0dXJuVmFsdWUgPSBfdmFsdWUuY2FsbCh0bXAsIHRtcCk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIFt0bXAsIF9yZXR1cm5WYWx1ZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVTdGF0ZSA9IE9ic2VydmFibGVTdGF0ZTtcbmZ1bmN0aW9uIG9ic2VydmFibGVTdGF0ZUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3Qga25vdyBpZiBJIHNob3VsZCBjaGVjayBmb3IgdGhpcyBvciBmb3IgZ2V0U3RhdGUoKSBhbmQgc2V0U3RhdGUoKVxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlU3RhdGVDaGVjayA9IG9ic2VydmFibGVTdGF0ZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgZGVmZXJyZWQgcHJvbWlzZSBpcyBhIHdyYXBwZXIgYXJvdW5kIGEgcHJvbWlzZSB0aGF0IGFsbG93cyBpdCB0byBiZSB0cmlnZ2VyZWQgbGF0ZXIuIEluIHB1cmUgSlMsIHRoaXMgaXMgaGFyZGVyXG4gKiB0aGFuIGl0IG5lZWRzIHRvIGJlLCBhbmQgaXQgdGFrZXMgYSB3ZWlyZCBoYWNrIHRvIG1ha2UgaXQgd29yay4gVGhpcyBjbGFzcyBpcyBsaXR0bGUgbW9yZSB0aGFuIGEgd3JhcHBlciBhcm91bmRcbiAqIHNhaWQgaGFjay5cbiAqXG4gKiBPdGhlcndpc2UsIHRoaXMgdXNlcyBhIHJlYWwgcHJvbWlzZSBpbnRlcm5hbGx5LCBzbyBhc2lkZSBmcm9tIHRoZSB3cmFwcGluZyBvYmplY3QsIGl0IGhhcyBubyBzcGVjaWFsIGxvZ2ljLiBJIGNob3NlXG4gKiBub3QgdG8gcmUtaW1wbGVtZW50IHRoZSBQcm9taXNlIEFQSSBzeW5jaHJvbm91c2x5LCBzbyBpdCB1c2VzIHRoZSBzYW1lIG1pY3JvdGFzayBxdWV1ZS5cbiAqXG4gKiBUaGUgd3JhcHBpbmcgQVBJIGlzIHR3ZWFrZWQgYSBsaXR0bGUgdG8gYXZvaWQgc29tZSBjb21tb24gcGl0ZmFsbHMgdGhhdCBhcmUgY2F1c2VkIGJ5IGZsYXdzIGluIHRoZSBQcm9taXNlXG4gKiBkZXNpZ24uIEZvciBleGFtcGxlLCBoYXZpbmcgb25mdWxmaWxsZWQgYW5kIG9ucmVqZWN0ZWQgaW4gdGhlIHNhbWUgc3RlcCBtZWFucyB0aGF0IGVycm9ycyBpbiB0aGUgZnVsZmlsbGVkXG4gKiBoYWxmIHdpbGwgbm90IGJlIGNhdWdodCBieSB0aGUgZXJyb3IgaGFuZGxlci4gIFJhdGhlciB0aGFuIHNheSBcImRvbid0IHVzZSB0aGF0IGlucHV0XCIgbGlrZSBtb3N0IGluc3RydWN0b3JzLFxuICogSSBqdXN0IGdvdCByaWQgb2YgaXQgKGl0J3Mgc3RpbGwgYWNjZXNzaWJsZSBvbiB0aGUgb3V0cHV0IHByb3BlcnR5LCBpZiB5b3Ugd2FudCB0byB1c2UgaXQgLi4uIGJ1dCBkb24ndCkuXG4gKi9cbmNsYXNzIERlZmVycmVkUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yO1xuICAgICAgICAvKiogVXNlIHRoaXMgdG8gaW52b2tlIHRoZSBjYWxsYmFjayAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlc29sdmUgPSBmdW5jdGlvbiBfZHVtbXkoKSB7IH07XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byByZWplY3QgdGhlIHByb21pc2UgcmlnaHQgb3V0LiBXaGljaCBpcyBwcm9iYWJseSB1c2VsZXNzIGJ1dCB5b3UgbmV2ZXIga25vdy4gKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5IFRTIGRvZXNuJ3Qga25vdyB0aGF0IHRoZSBwcm9wZXJ0aWVzIGFyZSByZXBsYWNlZCBpbiB0aGUgcHJvbWlzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgdGhpcy5yZWplY3QgPSBmdW5jdGlvbiBfZHVtbXkoKSB7IH07XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIHdlaXJkIGhhY2sgdGhhdCBpcyB0aGUgYmFzaXMgb2YgdGhpcyBjbGFzcy4gSXQncyBhIGNsb3N1cmUsIGJ1dCByZXZlcnNlZCwgYXMgdGhlXG4gICAgICAgIC8vIGVuY2xvc2VkIHByb3BlcnR5IGlzIGFuIGludGVybmFsIHJlZmVyZW5jZSBhY2Nlc3NlZCBvdXRzaWRlIHJhdGhlciB0aGFuIGFuIG91dHNpZGUgcmVmZXJlbmNlXG4gICAgICAgIC8vIGFjY2Vzc2VkIGluc2lkZS5cbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgX3JlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gX3Jlc29sdmU7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IF9yZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuXG4gICAgICAgIC8vIFdlIHdhbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3IgdG8gYWxsb3cgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgLy8gY29uc3Qgd2FpdGFibGUgPSBuZXcgRGVmZXJyZWRQcm9taXNlKCk7IGV2ZW50LnN1YnNjcmliZSh3YWl0YWJsZS5yZXNvbHZlKTsgY29uc3QgciA9IGF3YWl0IHdhaXRhYmxlLm91dHB1dDsgY29uc29sZS5sb2cocik7XG4gICAgICAgIC8vIElmIHlvdSBsZWF2ZSBvdXQgdGhlIGluaXRpYWwgY2FsbGJhY2ssIHlvdSdsbCBnZXQgdW5kZWZpbmVkIGluc3RlYWQgb2Ygd2hhdCB0aGUgZXZlbnQgc2VuZHMuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIGluIGFzeW5jL2F3YWl0IGNvZGUuIFRoZSBmb2xsb3dpbmcgd2lsbCB3b3JrIGlmIGEgcmVzdWx0IGlzIHJldHVybmVkLlxuICAgICAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRlZmVycmVkLm91dHB1dDtcbiAgICAgKiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAqL1xuICAgIGdldCBvdXRwdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICAgIH1cbiAgICAvKiogVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suICovXG4gICAgdGhlbihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIHRvIGtlZXAgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCdzIHVnbHkuXG4gICAgICAgIC8vIEl0IG1lYW5zIGEgbG90IG9mIGV4dHJhIHN0ZXBzLiBJdCBtYWtlcyBzdXJlIHRoYXQgYnkgZGVmYXVsdCwgdGhlIGxhc3Qgc3RlcCBpcyBhbHdheXMgYSBjYXRjaC5cbiAgICAgICAgaWYgKHRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25yZWplY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2gob25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWdhaW4gdGhpcyBpcyBhIG1lc3MsIGJ1dCB0aGUgY2F0Y2ggaGFuZGxlciBhYm92ZSBjb3VsZCB0aHJvd1xuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5EZWZlcnJlZFByb21pc2UgPSBEZWZlcnJlZFByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IERlZmVycmVkUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vRGVmZXJyZWRQcm9taXNlXCIpO1xuLyoqXG4gKiBUaGUgcHJvbWlzZSBBUEkgaXMgbmljZSwgbW9zdGx5LCBidXQgdGhlIG1haW4gdGhpbmcgcHJldmVudGluZyB1c2Ugb2YgYSBwcm9taXNlIGFzIGFuIGV2ZW50IGhhbmRsZXIgaXMgdGhhdFxuICogaXQgb25seSBleGVjdXRlcyBvbmNlLiBBZnRlciB0aGF0IHBvaW50LCBpdCBpcyByZXNvbHZlZCwgYW5kIHRoZXJlIGlzIG5vIHdheSB0byBmbGlwIGl0IGJhY2suXG4gKlxuICogVGhlIHJlcGVhdGFibGUgcHJvbWlzZSBrZWVwcyB0aGUgcHJvbWlzZSBBUEkgYW5kIGNyZWF0ZXMgdGhlIGlsbHVzaW9uIHRoYXQgdGhlIHByb21pc2UgaXMgcmVwZWF0ZWQgYnlcbiAqIHJlYnVpbGRpbmcgdGhlIGNoYWluIGVhY2ggdGltZS4gSXQncyByZWFsbHkgYSBkZWZlcnJlZCBmYWN0b3J5IGJ1dCBpdCBwcmV0ZW5kcyB0byBiZSBhIGRlZmVycmVkLiBJJ20gc3VyZVxuICogdGhpcyBoYXMgYSBwZXJmb3JtYW5jZSBwZW5hbHR5LlxuICpcbiAqIFlvdSBzaG91bGQgbm90IGF0dGFjaCBhY3R1YWwgcHJvbWlzZXMgaW50byB0aGUgdGhlbigpIGNoYWluLCBiZWNhdXNlIHRoZXkgY2FuJ3QgYmUgcmVwZWF0ZWQuIFRoZSBQcm9taXNlIHR5cGUgaXNuJ3RcbiAqIGFsbG93ZWQgYnV0IHRoZXJlIGFyZSB3YXlzIHRvIGdldCBhcm91bmQgdGhlIFRTIGNvbXBpbGVyLiBUaGUgVFMgdHlwZSBkZWZpbml0aW9uIGZvciBQcm9taXNlIGFuZCBQcm9taXNlTGlrZSBpc24ndFxuICogY29tcGxldGVseSBjb3JyZWN0LCBhbnl3YXksIHNvIGl0J3MgZWFzeSB0byBnZXQgdXNlZCB0byB1c2luZyB0aGUgYW55IHR5cGUgYW5kIG1ha2UgYnJva2VuIGNvZGUuXG4gKlxuICogWW91IGNhbm5vdCBhc3luYy9hd2FpdCBhIHJlcGVhdGFibGUgcHJvbWlzZSBpdHNlbGYgYnV0IHlvdSBjYW4gYXdhaXQgYSBzaW5nbGUgcmVzb2x1dGlvbi4gQXN5bmMvYXdhaXQgaXMgc3VnYXIgdGhhdFxuICogY3JlYXRlcyBhIHJlZ3VsYXIsIG5vbi1yZXBlYXRhYmxlLCBwcm9taXNlLlxuICovXG5jbGFzcyBSZXBlYXRhYmxlUHJvbWlzZSB7XG4gICAgY29uc3RydWN0b3Iob25mdWxmaWxsZWQsIG9uVW5oYW5kbGVkRXJyb3IsIC8vIFRoaXMgYWRkcyBhIGNhbGxiYWNrIGF0IHRoZSBlbmQgKG9yIDJuZCBmcm9tIHRoZSBlbmQsIHNlZSBuZXh0IG9wdGlvbilcbiAgICB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICApIHtcbiAgICAgICAgdGhpcy5vblVuaGFuZGxlZEVycm9yID0gb25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7IC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgc29tZXRoaW5nIGF0IHRoZSBmaXJzdCBsZXZlbCwgZXZlbiBpZiBpdCdzIGp1c3QgcmV0dXJuaW5nIHRoZSByZXN1bHQuIFVzZWZ1bCBmb3IgYXN5bmMvYXdhaXQgY29kZS5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aGVuKHJlcyA9PiByZXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZSBmb2xsb3dpbmcgc2hvdWxkIHdvcms6XG4gICAgLy8gY29uc3QgcmVwZWF0YWJsZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZSgpOyBjb25zdCByID0gYXdhaXQgcmVwZWF0YWJsZS5yZXNvbHZlKCk7IGNvbnNvbGUubG9nKHIpO1xuICAgIHJlc29sdmUoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgcmVqZWN0KGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNlLm91dHB1dDtcbiAgICB9XG4gICAgLy8gVGhlbigpIG9ubHkgaGFzIG9uZSBvcHRpb24sIGJlY2F1c2UgaXQncyB0b28gZWFzeSB0byBmb3JnZXQgdGhhdCB0aGUgb25yZWplY3RlZCBjYWxsYmFjayBkb2Vzbid0IGhhbmRsZSB0aGUgb25mdWxsZWQgY2FsbGJhY2suXG4gICAgdGhlbihvbmZ1bGZpbGxlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25mdWxmaWxsZWQ6IG9uZnVsZmlsbGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKHsgb25yZWplY3RlZDogb25yZWplY3RlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Uga25vdyB0aGF0IHRoZSBmaXJzdCBpcyBhbHdheXMgb25mdWxmaWxsZWQgYW5kIGlzIG5ldmVyIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmICghY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBGaXJzdCBvbmZ1bGZpbGxlZCBpcyBudWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IG5ldyBEZWZlcnJlZFByb21pc2VfMS5EZWZlcnJlZFByb21pc2UoY2Iub25mdWxmaWxsZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGNiLm9uZnVsZmlsbGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNiLm9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKGNiLm9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVnIGluIFJlcGVhdGFibGVQcm9taXNlIGNvbnN0cnVjdG9yLiBObyBjYWxsYmFja3MsIG5vdCBldmVuIHRoZSBkZWZhdWx0IGZpcnN0IG9uZnVsZmlsbGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKHRoaXMub25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59XG5leHBvcnRzLlJlcGVhdGFibGVQcm9taXNlID0gUmVwZWF0YWJsZVByb21pc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogUmV0dXJuIGVsZW1lbnRzIG9mIGFycmF5IGEgbGluZWQgdXAgd2l0aCBlbGVtZW50cyBvZiBhcnJheSBiLiBCb3RoIGFycmF5cyBkb24ndCBoYXZlIHRvIGJlIHRoZSBzYW1lIGxlbmd0aC5cbiAqL1xuZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgICBpZiAoYS5sZW5ndGggPj0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGEubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2VsZW1lbnQsIGJbaW5kZXhdXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gYi5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbYVtpbmRleF0sIGJdKTtcbiAgICB9XG59XG5leHBvcnRzLnppcCA9IHppcDtcbi8qKlxuICogUmV0dXJuIGEgY2FydGVzaWFuIGpvaW4gKGNyb3NzIGpvaW4pIGJldHdlZW4gYXJyYXlzIGEgYW5kIGIuXG4gKi9cbmZ1bmN0aW9uIGNhcnRlc2lhbihhLCBiKSB7XG4gICAgLy8vIHR5cGVzY3JpcHQgcHJldmVudHMgYSBkaXJlY3QgdXNlIG9mIGNvbmNhdCwgc28gZG8gdGhpcyBtYW51YWxseSB3aXRoIGEgbG9vcFxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYSkge1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uYi5tYXAocSA9PiBbaXRlbSwgcV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLmNhcnRlc2lhbiA9IGNhcnRlc2lhbjtcbi8qKlxuICogR2VuZXJhdGUgYSByYW5nZSBvZiBpbnRlZ2VycywgY291bnRpbmcgdXAgYnkgMSwgZm9yIHRoZSBnaXZlbiBsZW5ndGguIFN0b2xlbiBmcm9tIFB5dGhvbi5cbiAqL1xuZnVuY3Rpb24gcmFuZ2UobGVuZ3RoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbmd0aCB9LCAodmFsdWUsIGtleSkgPT4ga2V5KTtcbn1cbmV4cG9ydHMucmFuZ2UgPSByYW5nZTtcbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2YgaXRlbXMgYW5kIG90aGVyIGFycmF5cywgZmxhdHRlbiB0aGVtIG91dCBpbnRvIGEgc2luZ2xlIGFycmF5LlxuICovXG5mdW5jdGlvbiogdHJhdmVyc2UoYXJyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgeWllbGQgYXJyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChjb25zdCByb3cgb2YgYXJyKSB7XG4gICAgICAgICAgICB5aWVsZCogdHJhdmVyc2Uocm93KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudHJhdmVyc2UgPSB0cmF2ZXJzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmVwZWF0YWJsZVByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKTtcbi8qKlxuICogQSBkZWxlZ2F0ZSBvYmplY3QgaXMgdXNlZCBieSB0aGUgRXZlbnRIYW5kbGVyLiBJdCBjb250YWlucyBlbm91Z2ggaW5mb3JtYXRpb24gdG8gZXhlY3V0ZSBhIGNhbGxiYWNrIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3VzbHlcbiAqICh1c2luZyBhIHByb21pc2UpLiBJdCBhbHNvIGFkZHMgc29tZSBzdHJpbmdzIHRvIGhlbHAgaW4gdHJvdWJsZXNob290aW5nLCBiZWNhdXNlIHNlYXJjaGluZyBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBjb21wbGV4IG9iamVjdHMgY2FuIG1ha2VcbiAqIGl0IGEgYmVhciB0byBmaW5kIG91dCB3aHkgYSBjYWxsYmFjayBpc24ndCBiZWluZyBleGVjdXRlZC5cbiAqL1xuY2xhc3MgRGVsZWdhdGUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIEluIG1hbnkgY2FzZXMgKGZvciBleGFtcGxlLCB3aGVuIHVzaW5nIGZhdCBhcnJvdyBmdW5jdGlvbnMpLCB0aGlzQXJnIGlzXG4gICAgICAgIC8vIG5vdCBuZWVkZWQuIEJ1dCBpbiBtb3N0IG90aGVycywgaXQgaXMgYW4gYW5ub3lpbmcgYnVnIHRoYXQgcmVxdWlyZXMgdHJvdWJsZXNob290aW5nXG4gICAgICAgIC8vIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY2FsbGVyIGZvcmdvdC4gSSd2ZSB3YXZlcmVkIGJldHdlZW4gbWFraW5nIGl0IHJlcXVpcmVkIGFuZCBub3QuXG4gICAgICAgIGlmICghdGhpc0FyZykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVsZWdhdGUgY3JlYXRlZCB3aXRob3V0IHRoaXNBcmcuIERpZCB5b3UgbWVhbiB0bz8nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrT3duZXJOYW1lID0gdGhpc0FyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSB0eXBlc2NyaXB0IGNvbXBpbGVyIHNob3VsZCBoYW5kbGUgdGhpcyBjaGVjayBidXQgY2FuJ3QgYXQgcnVudGltZS5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5jYWxsYmFja05hbWUgPSBjYWxsYmFjay5uYW1lO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSAmJiB0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5jYWxsYmFja093bmVyTmFtZX0uJHt0aGlzLmNhbGxiYWNrTmFtZX0oKWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tOYW1lICsgJygpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrT3duZXJOYW1lICsgJy5fX2xhbWJkYV9fKCknO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZV8xLlJlcGVhdGFibGVQcm9taXNlKGNhbGxiYWNrLmJpbmQodGhpc0FyZykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVsZWdhdGUgPSBEZWxlZ2F0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IERlbGVnYXRlXzEgPSByZXF1aXJlKFwiLi9EZWxlZ2F0ZVwiKTtcbi8qKlxuICogSSBjaG9zZSB0byB1c2UgQyMgc3R5bGUgZXZlbnRzLCBub3QgSlMvVFMsIGJlY2F1c2UgdGhlIEpTL1RTIHdheSBvZiBkb2luZyBkZWxlZ2F0ZXMvY3VzdG9tIGV2ZW50cyBpcyBhIE5JR0hUTUFSRS4gU3VyZSxcbiAqIEN1c3RvbUV2ZW50IHdvcmtzLCBidXQgb24gdGhlIFRTIHNpZGUgdGhlIGNvZGUgcmVxdWlyZWQgdG8gbWFrZSBUU0MgaGFwcHkgd2l0aCB2YWxpZCBqYXZhc2NyaXB0IGlzIGF3ZnVsIGFuZCBub24taW50dWl0aXZlLlxuICogT24gdGhlIEpTIHNpZGUsIHlvdSBoYXZlIHRoZSBwcm9ibGVtIHRoYXQgZXZlcnkgaGFuZGxlciBwaWNrcyBpdCB1cCwgbm90IGp1c3QgdGhlIG9uZXMgdGhhdCBhcmUgYm91bmQgdG8gdGhlIHJlbGV2YW50IEhUTUxcbiAqIGVsZW1lbnQsIHNvIGVsZW1lbnRzIG5lZWQgdG8gcGFzcyB0aGUgc291cmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBjaGVjayBpdCAobGlrZSBqcXVlcnkgYW5kICQoZG9jdW1lbnQpLm9uKCkpLlxuICpcbiAqIEFmdGVyIGdldHRpbmcgaXQgd29ya2luZywgYWxsIEkgY291bGQgdGhpbmsgYWJvdXQgd2FzIGhvdyBiYWQgdGhlIGNvZGUgd2FzLCBzbyBJIHJld3JvdGUgaXQgYXZvaWRpbmcgdGhlIEpTIHBhdHRlcm4gZW50aXJlbHkuXG4gKlxuICogVGhpcyBjYW4gYmUgc3luY2hyb25vdXMgKGNhbGxiYWNrcykgb3IgYXN5bmNocm9ub3VzIChwcm9taXNlcykuICBXaGVuIGl0IGlzIGFzeW5jLCB0aGUgY29kZSBleGVjdXRlcyBhZnRlciB0aGUgY3VycmVudCBzeW5jaHJvbm91c1xuICogZXZlbnRzIHJ1biB0byBjb21wbGV0aW9uLiBUaGlzIGNvdWxkIGNyZWF0ZSBidWdzIGluIHN5bmNocm9ub3VzIGNvZGUsIGJ1dCBpcyBiZXN0IGZvciBicm93c2VyIGV2ZW50cy4gVGhpcyBoYW5kbGVyIGlzIHByaW1hcmlseSB1c2VkIGZvclxuICogYnJvd3NlciBldmVudHMsIHNvIGFzeW5jIGlzIGRlZmF1bHQuXG4gKlxuICogQnV0IGlmIHlvdSdyZSB0cmlnZ2VyaW5nIGFzeW5jIGV2ZW50cyBpbiBjb2RlIGFuZCBzdGVwcGluZyB0aHJvdWdoIGl0IGluIENocm9tZSwgd2hhdCB5b3Ugc2VlIHdvbid0IG1ha2Ugc2Vuc2UsIGJlY2F1c2UgdGhlIGFzeW5jXG4gKiBldmVudHMgd29uJ3Qgb2NjdXIgdW50aWwgcmlnaHQgYXdheS4gSXQgY2FuIGJlIGhhcmQgdG8gdHJvdWJsZXNob290LlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9kaXNhYmxlQXN5bmMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlQXN5bmMgPSBfZGlzYWJsZUFzeW5jO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJZiB0aGlzIHJlY2VpdmVzIGEgZGVsZWdhdGUgKHdoaWNoIGlzIGFuIGFycmF5IG9mIGRlbGVnYXRlcyksIGFkZCBpdC5cbiAgICAgICAgLy8gV2hlbiB0aGlzIGlzIGludm9rZWQsIHRoYXQgZGVsZWdhdGUgd2lsbCBhbHNvIGJlIGludm9rZWQuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgX292cjFfZGVsZWdhdGUuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR290IGEgc2luZ2xlIGNhbGxiYWNrXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2FsbGJhY2suXG4gICAgICAgIGlmICh0aGlzLmZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaDogdHJ1ZSB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEZWxlID0gbmV3IERlbGVnYXRlXzEuRGVsZWdhdGUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2gobmV3RGVsZSk7XG4gICAgICAgIC8vIElGIHRoaXMgaXMgYXN5bmNocm9ub3VzLCByZXR1cm4gdGhlIHByb21pc2Ugc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gICAgICAgIC8vIENoYWluaW5nIHdvbid0IHdvcmsgb24gc3luYyBjb2RlLCBzbyBkbyBub3QgaW4gdGhhdCBjYXNlLlxuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ld0RlbGUucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9kZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmZpbmQocSA9PiBxID09PSBkZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmRlbGVnYXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcSA9IHRoaXMuZGVsZWdhdGVbaV07XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocSkgJiYgcS5jYWxsYmFjayA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcikge1xuICAgICAgICAvLyBGaXJzdCB0cnkgdG8gdW5zdWJzY3JpYmUgdGhlIGRlZmF1bHQgZGVsZWdhdGUuIENhbid0IGRvIGFueXRoaW5nIGlmIGl0IGhhcyBhIGRpZmZlcmVudCBuYW1lLCB0aG91Z2guXG4gICAgICAgIGlmIChcImRlbGVnYXRlXCIgaW4gc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRGVsZWdhdGUoc2VuZGVyLmRlbGVnYXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxKSAmJiBxLnRoaXNBcmcgPT09IHNlbmRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmIChxID09PSBkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZShhcmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBBc3luYyB2ZXJzaW9uLiBEb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCB0aGUgY2hyb21lIGRlYnVnZ2VyLlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIudGhpc0FyZywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoIH0gPSB7fSkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoKGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICBmdW5jdGlvbiBtYXRjaChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTsgLy8gQ2xlYXJzIHRoZSBkZWxlZ2F0ZVxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdW5kZWZpbmVkOyAvLyBNYWtlcyBzdXJlIHRoaXMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEV2ZW50IGFyZ3VtZW50cyBleHBlY3RlZCBvbiBhbnkgQ2hhbmdlIGV2ZW50LlxuICovXG5jbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIGNoYW5nZSBvcGVyYXRpb24gKHNldCwgZGVsZXRlKSAocG90ZW50aWFsbHkgbWV0aG9kKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgbmV3YWJsZS5cbiAqIFRISVMgQ0FOTk9UIERFVEVDVCBBTk9OWU1PVVMgQ0xBU1NFUy4gU29ycnksIGJ1dCBKUyBkb2Vzbid0IGhhdmUgYSBub24tZGVzdHJ1Y3RpdmUgd2F5XG4gKiB0byBjaGVjayBpZiBhbnkgZnVuY3Rpb24gaXMgYSBjb25zdHJ1Y3RvciBvdGhlciB0aGFuIHRvIHRyeSB0byBuZXcoKSBpdCBhbmQgYmxvdyB1cC9ub3QgYmxvdyB1cC5cbiAqIFRoaXMgZnVuY3Rpb24gZGVwZW5kcyBvbiB0aGVyZSBiZWluZyBhIHByb3RvdHlwZSB3aXRoIGEgbmFtZWQgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yVHlwZUd1YXJkKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLnByb3RvdHlwZSAmJiBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5leHBvcnRzLmNvbnN0cnVjdG9yVHlwZUd1YXJkID0gY29uc3RydWN0b3JUeXBlR3VhcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBrZXl3b3JkIGFyZ3VtZW50cywgYXMgc2VlbiBpbiBQeXRob24gYW5kIEMjLiBJdCBtYWtlcyBjb25maWd1cmFibGVcbiAqIGZ1bmN0aW9ucyBzbyBtdWNoIHF1aWNrZXIgYW5kIGVhc2llciB0aGFuIGZsYXQgYXJndW1lbnRzIChmb3JjaW5nIHlvdSB0byBwdXQgdW5kZWZpbmVkIG1hbnVhbGx5IGluIGRpZmZlcmVudFxuICogc2xvdHMpIG9yIG9wdGlvbnMgb2JqZWN0cyAodGFrZXMgbW9yZSB0aW1lIHRvIHByb2R1Y2UsIGVzcGVjaWFsbHkgaWYgeW91IG5lZWQgdG8gbmV3IGl0IHVwKS5cbiAqXG4gKiBDYWxsIGZ1bmN0aW9ucyBoYXZpbmcga2V5d29yZCBhcmd1bWVudHMgdXNpbmcgdGhpcyBzeW50YXg6XG4gKiBjYWxsbWUoYXJnMSwgYXJnMiwga3coJ3NvbWV0aGluZycsIGt3MSksIGt3KCdzb21ldGhpbmdFbHNlJywga3cyKSlcbiAqXG4gKiBUbyBtYWtlIHRoZW0gd29yaywgaW4gdGhlIGZ1bmN0aW9uIGl0c2VsZiwgeW91IG5lZWQgdG8gY29weSBhbmQgcGFzdGUuIEZvciBleGFtcGxlOlxuICogKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0gPSBLd2FyZy5wYXJzZSh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9KSk7XG4gKi9cbmNsYXNzIEt3YXJnIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIGlmICghYSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGE7XG4gICAgICAgIHRoaXMudmFsdWUgPSBiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1lbWJlciB0aGlzIHRlbXBsYXRlOlxuICAgICAqICh7IH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9KSk7XG4gICAgICogSW5jbHVkZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgZmlyc3Qgb2JqZWN0LCBub3QgdGhlIHNlY29uZC5cbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IHRvIGNhcHR1cmUgcmVzdCBwYXJhbWV0ZXJzLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkcmVzdCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7ICwgLi4ucmVzdCB9KSk7XG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCBhbGxvd1Vua25vd25LZXl3b3JkIHRvIGJlIHRydWUsIHVzZSB0aGlzOlxuICAgICAqICh7ICQka3ckJCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSwgdHJ1ZSkpO1xuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUFyZ3MoYXJncywgYWxsb3dVbmtub3duS2V5d29yZCA9IGZhbHNlKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgdGhpcyBjb3VsZCB0YWtlIHRoZSBhcmd1bWVudHMgb2JqZWN0LCBidXQgc2FkbHkgYXJndW1lbnRzIHN0b3JlcyBvbmx5IGFuIGFycmF5IG9mIHZhbHVlcyxcbiAgICAgICAgLy8gbm8ga2V5cy4gSWYgSlMgd2VyZSBzYW5lLCBpdCB3b3VsZCBiZSBhIE1hcCwgbm90IGFuIGFycmF5LiBUd28gc3RlcHMgZm9yd2FyZCwgb25lIHN0ZXAgYmFjay5cbiAgICAgICAgLy8gUGFyc2luZyB0aGUgc3RyaW5nIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvbiBpcyBub3QgbXkgY3VwIG9mIHRlYSwgc28ganVzdCBuby5cbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncyk7XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGFyZ3VtZW50IG9yZGVyXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gYXJnc1thcmddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGt3dmFyID0ge307XG4gICAgICAgIG9ialsnJCRrdyQkJ10gPSBrd3ZhcjtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJlc3QgcGFyYW1ldGVycy5cbiAgICAgICAgLy8gSSB3YXMgZ29pbmcgdG8gaGF2ZSB0aGlzIG9uL29mZiBjb25maWd1cmFibGUsIGJ1dCBpdCBzaG91bGRuJ3QgaHVydCBwZXJmb3JtYW5jZS5cbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIG9ialsnJHJlc3QkJ10gPSBhcnI7XG4gICAgICAgIC8vIFJlc3QgcGFyYW1ldGVycyBhcmUgc3RvcmVkIGFzIGFycmF5IGtleXMsIHsgJzAnOiBhLCAnMSc6IGIsICdub25SZXN0JzogJ3NvbWV0aGluZyBlbHNlJ31cbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykuZmlsdGVyKGYgPT4gSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoZikpKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcmdzW2FyZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXdvcmRzVXNlZCA9IHt9O1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBrZXl3b3JkIG5hbWVcbiAgICAgICAgLy8gSGF2ZSB0byBpdGVyYXRlIHRoZSBsaXN0IHR3aWNlLCB0byBhdm9pZCB3aXBpbmcgb3V0IGRhdGEgaWYgdGhlIG9yZGVyIGlzIHN3YXBwZWRcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dVbmtub3duS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga3d2YXJbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgYW4gdW5leHBlY3RlZCBrZXl3b3JkIGFyZ3VtZW50ICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4ga2V5d29yZHNVc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IG11bHRpcGxlIHZhbHVlcyBmb3Iga2V5d29yZCBhcmd1bWVudCArICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5d29yZHNVc2VkW3RtcC5uYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgLy8gVHVybiBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXl3b3JkIGFyZ3VtZW50cy5cbiAgICAvLyBOZWVkcyB0byByZXR1cm4gYW55W10gYmVjYXVzZSBpdCdzIGdvaW5nIHRvIGJlIHNob3ZlZCBpbnRvIGFyYml0cmFyeSBhcmd1bWVudCBsaXN0c1xuICAgIHN0YXRpYyB1bnBhY2soYXJncykge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goa3coYXJnLCBhcmdzW2FyZ10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgaXNNYXRjaChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSA9PT0ga2V5O1xuICAgIH1cbn1cbmV4cG9ydHMuS3dhcmcgPSBLd2FyZztcbmZ1bmN0aW9uIGt3KGEsIGIpIHtcbiAgICBpZiAoIWEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDFcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhLCBiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgICAvLyBPdmVybG9hZCAyXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYVswXSwgYVsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdmVybG9hZCAzXG4gICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyLlxuICAgICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpO1xuICAgICAgICBpZiAoIXByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwIG9iamVjdDogbXVsdGlwbGUga2V5cycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcocHJvcHNbMF0sIGFbcHJvcHNbMF1dKTtcbiAgICB9XG59XG5leHBvcnRzLmt3ID0ga3c7XG5mdW5jdGlvbiBrd2FyZ3NUb09iamVjdChhcnIpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJyKSB7XG4gICAgICAgIG9wdGlvbnNbYXJnLm5hbWVdID0gb3B0aW9uc1thcmcudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbmV4cG9ydHMua3dhcmdzVG9PYmplY3QgPSBrd2FyZ3NUb09iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNOb25lKHRlc3QpIHtcbiAgICByZXR1cm4gKHRlc3QgPT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5pc05vbmUgPSBpc05vbmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNsb25lRGVlcChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKSB7XG4gICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajsgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgfVxuICAgIGlmIChoYXNoLmhhcyhvYmopKSB7XG4gICAgICAgIHJldHVybiBoYXNoLmdldChvYmopOyAvLyByZWZlcmVuY2UgdG8gb2JqZWN0IHByZXZpb3VzbHkgc2VlblxuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgdmFsID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIChba2V5LCB2YWxdKSA9PiByZXN1bHQuYWRkKGNsb25lRGVlcChrZXksIGhhc2gpLCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhd2Z1bCBjb2RlLCBidXQgaXQncyB0aGUgb25seSB3YXkgdG8gY2xvbmUgYSBzdGFuZGFsb25lIGZ1bmN0aW9uICh2cyBhIG1ldGhvZCB3aGljaCBoYXMgYSBkZXNjcmlwdG9yKS5cbiAgICAgICAgLy8gSW4gZ2VuZXJhbCwgeW91IHByb2JhYmx5IGRvbid0IHdhbnQgdG8gdXNlIGNsb25lRGVlcCBvbiBmdW5jdGlvbnMuIFlvdSdsbCBzZWUgaXQncyBOT1QgdXNlZCBvbiBpbnRlcm5hbCBtZXRob2RzLlxuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgb2JqLnRvU3RyaW5nKCkpKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaGFzaC5zZXQob2JqLCByZXN1bHQpOyAvLyBLZWVwIHRyYWNrIG9mIG9iamVjdHMgcHJldmlvdXNseSBjbG9uZWRcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIShrZXkgaW4gcmVzdWx0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIG1ldGhvZHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHByb3RvdHlwZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCByZWN1cnNpdmVseSBmb2xsb3cgYmVjYXVzZSB0aGVyZSdzIG5vdGhpbmcgcmVjdXJzaXZlIHRvIGRvLlxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGhhc2guc2V0KG9ialtrZXldLCByZXN1bHRba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBtZXRob2QuXG4gICAgICAgICAgICAgICAgLy8gSWYgZXh0cmEga2V5cyBhcmUgdGhyb3duIG9udG8gYSBmdW5jdGlvbiwgdGhleSBwcm9iYWJseSB3aWxsIG5vdCBiZSBjbG9uZWQuXG4gICAgICAgICAgICAgICAgLy8gSW4gbXkgZXhwZXJpZW5jZSwgZXh0cmEga2V5cyBvbiBmdW5jdGlvbnMgZGlkbid0IHdvcmsgcmlnaHQsIHNvIG5vIGJpZyBsb3NzLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBnZXR0ZXJzL3NldHRlcnMuIFRoZXNlIGFyZSBsb2NhbCBhbmQgaG9wZWZ1bGx5IHdvcmsganVzdCBsaWtlIG1ldGhvZHMuXG4gICAgICAgICAgICAvLyBJbiBtYW55IGNhc2VzLCB0aGlzIGlzIHJlZHVuZGFudCB3aXRoIE9iamVjdC5jcmVhdGUoKSwgYnV0IGlzIG5lY2Vzc2FyeSB0byBhbGxvdyBvYmplY3RzIHdpdGggbWFudWFsbHktYWRkZWQgY3VzdG9tIGdldHRlcnMuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBnZXR0ZXIvc2V0dGVyLlxuICAgICAgICAgICAgLy8gQUxTTyBoYXNoIG5vdCB1cGRhdGVkOyB0aGlzIGlzIG5vdCBwb3NzaWJsZSwgYmVjYXVzZSBpdCB3aWxsIG1hcCB0aGUgdmFsdWUgaXQgZ2V0cywgbm90IHRoZSBnZXR0ZXIuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lRGVlcChvYmpba2V5XSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBSZWNlbnQgVHlwZXNjcmlwdCBoYXMgYWRkZWQgYSBudWxsIGNvYWxlc2Npbmcgb3BlcmF0b3IgKD8uLCBha2EgdGhlIEVsdmlzIG9wZXJhdG9yKSBidXQgTlBNIGlzc3Vlc1xuICogcHJldmVudCBtZSBmcm9tIHVwZ3JhZGluZy4gIEJ1dCB0aGlzIHJldHVybnMgdW5kZWZpbmVkIGlmIHlvdSBhY2Nlc3MgYW55dGhpbmcgdGhhdCBkb2Vzbid0IGV4aXN0LlxuICpcbiAqIE5hdHVyYWxseSB0aGlzIGJyZWFrcyBWU0NvZGUgaW50ZWxsaXNlbnNlLCBiZWNhdXNlIGl0IHJldHVybnMgYW55LiBPbmx5IE1TIGNhbiBkbyBrZWVwIHRoZSByaWdodCB0eXBlLlxuICpcbiAqIElmIHlvdSBkbyByZXR1cm4gYSBwYXJ0aWFsIHZlcnNpb24gb2YgdGhlIHR5cGUsIFRTIHRocm93cyBhbiBlcnJvciBiZWNhdXNlIGl0IGNvdWxkIGJlIG1pc3NpbmcgKHVtbS4uLiB0aGF0J3Mgd2hhdCBQYXJ0aWFsIG1lYW5zLi4uKS5cbiAqXG4gKiBBIHRydWUgZWx2aXMgb3BlcmF0b3Igd291bGQgYWxzbyB3b3JrIG9uIHN0cmluZ3MvbnVtYmVycy9ldGMuIFRoaXMgY2Fubm90IGRvIHRoYXQsIGJlY2F1c2UgSlMgY2FuJ3QgdGVsbCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGFcbiAqIG51bGwgc3RyaW5nIGFuZCBhIG51bGwgb2JqZWN0LiBOdWxsIGlzIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGVfKGl0ZW0pIHtcbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbn1cbmV4cG9ydHMuZV8gPSBlXztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbi8qKlxuICogQSBwc2V1ZG8tcmFuZG9tIHByZWZpeCBwbHVzIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSB0aGUgdW5peCBlcG9jaC4gVGhlIHJhbmRvbSBwYXJ0IHNob3VsZCBiZSByYW5kb20gZW5vdWdoIHRvIGNvdmVyXG4gKiBtdWx0aXBsZSBpZHMgY3JlYXRlZCBpbiBhIG1pbGxpc2Vjb25kLlxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWVJZCgpIHtcbiAgICBjb25zdCBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWi1fJztcbiAgICBsZXQgcmVzdWx0ID0gJ3UnICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArICctJztcbiAgICBmb3IgKGNvbnN0IF8gb2YgQXJyYXlVdGlsaXRpZXNfMS5yYW5nZSg4KSkge1xuICAgICAgICByZXN1bHQgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5nZXRVbmlxdWVJZCA9IGdldFVuaXF1ZUlkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRlbGwgaWYgYSBnaXZlbiBzdHJpbmcgaXMgYSBwb3NpdGl2ZSBpbnRlZ2VyLlxuICogVXNlIGZvciBkZXRlY3RpbmcgYXJyYXkga2V5cy5cbiAqL1xuZnVuY3Rpb24gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RyID09PSAnMCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvXlsxLTldXFxkKiQvLnRlc3Qoc3RyKTtcbn1cbmV4cG9ydHMuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcgPSBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJIGRvbid0IGtub3cgaG93IGFjY3VyYXRlIHRoaXMgaXMgYnV0IGl0IHNlZW1zIHByZXR0eSBnb29kXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qob2JqKSAhPT0gb2JqO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuIl19
