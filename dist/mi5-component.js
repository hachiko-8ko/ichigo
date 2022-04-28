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
        if (name.startsWith('this.')) {
            thisArg = this;
            name = name.slice(5);
            if (!(name in this)) {
                // tslint:disable-next-line:no-console
                console.warn(`this.${name} does not exist on view.`);
                return;
            }
            source = this[name];
        }
        else if (name.startsWith('^') && Elvis_1.e_(this.loopParent).viewModel && typeof Elvis_1.e_(this.loopParent).viewModel === 'object') {
            // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
            // an object or an iterable, not really something you'll read or write to directly.
            // Might do a shortcut to the parent component's 'this'
            thisArg = this.loopParent.viewModel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Db21wb25lbnQuanMiLCJzcmMvSHRtbC9DcmVhdGVFbGVtZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcC5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUJhc2UuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHkuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGUuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlZmVycmVkUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQXN5bmMvUmVwZWF0YWJsZVByb21pc2UuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzLmpzIiwic3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvRGVsZWdhdGUuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXIuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGUuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHMuanMiLCJzcmMvU3lzdGVtL1R5cGVzL05vbmVUeXBlLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9FbHZpcy5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXIuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2wxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRcIik7XG5jb25zdCBCb3VuZENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuKGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgcGx1Z2luID0ge1xuICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudF8xLkNvbXBvbmVudCxcbiAgICAgICAgQm91bmRDb21wb25lbnQ6IEJvdW5kQ29tcG9uZW50XzEuQm91bmRDb21wb25lbnQsXG4gICAgICAgIENvbXBvbmVudE1hcDogQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLFxuICAgICAgICBnZXRDb21wb25lbnQ6IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudCxcbiAgICB9O1xuICAgIHdpbmRvdy5taTUgPSB3aW5kb3cubWk1IHx8IHt9O1xuICAgIHdpbmRvdy5taTUuY29tcG9uZW50ID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1LmNvbXBvbmVudCB8fCB7fSwgcGx1Z2luKTtcbiAgICAvKipcbiAgICAgKiBUaGlzIHNsaWdodGx5IHNpbXBsaWZlcyB0aGUgcHJvY2VzcyBvZiByZWZlcmVuY2luZyBtaW5pLWljaGlnbyBjb21wb25lbnRzIHdpdGhvdXQgdGhlIGZ1bGwgbmFtZXNwYWNlLlxuICAgICAqIEl0IHJlcXVpcmVzIHR3byBhcmd1bWVudHMsIHVuZm9ydHVuYXRlbHksIGJlY2F1c2UgaXQncyBub3QgcG9zc2libGUgaW4gbWFueSBjYXNlcyB0byBkZXRlcm1pbmUgdGhlXG4gICAgICogY2xhc3Mgb3IgZnVuY3Rpb24gbmFtZS4gT2Z0ZW4gdGhlICduYW1lJyBwcm9wZXJ0eSBoYXMgb25seSB0aGUgbWluaWZpZWQgbmFtZSwgYSByYW5kb20gbGV0dGVyLlxuICAgICAqL1xuICAgIHdpbmRvdy5taTUudXNpbmcgPSBmdW5jdGlvbiB1c2luZyhsaWIsIGFsaWFzKSB7XG4gICAgICAgIGlmICghbGliIHx8ICFhbGlhcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOdWxsQXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuZXZhbC5jYWxsKHdpbmRvdywgJyhmdW5jdGlvbiAoYXJnKSB7IHdpbmRvdy4nICsgYWxpYXMgKyAnID0gYXJnOyB9KScpKGxpYik7XG4gICAgfTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4vRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgLy8gQWxsb3cgYXR0cmlidXRlcyB0byBiZSBzZW50IG9uIHByb3BlcnRpZXMsIHByb3ZpZGluZyBhIGNsZWFuZXIgaW50ZXJmYWNlLlxuICAgIC8vIEl0IGFsbG93cyB5b3UgdG8gc2VuZCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7YXR0cmlidXRlczogeyBjbGFzczogJ2ZvbycgfX0pIGluc3RlYWQgb2YgY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCwgeyBjbGFzczogJ2ZvbycgfSk7XG4gICAgLy8gQW5vdGhlciBvcHRpb24gaXMgdG8gdXNlIEt3YXJncywgYnV0IG5vdCBldmVyeW9uZSB3YW50cyB0by5cbiAgICBpZiAocHJvcGVydGllcyAmJiAnYXR0cmlidXRlcycgaW4gcHJvcGVydGllcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzIHx8IHt9LCBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBkZWxldGUgcHJvcGVydGllcy5hdHRyaWJ1dGVzO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpKTtcbiAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIERPTSBwcm9wZXJ0aWVzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGF0dHJpYnV0ZXMsIGJlY2F1c2UgaW4gc29tZSBjYXNlcywgdGhleSBvdmVycmlkZSB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIEhUTUwgZnJvbSBhbnkgSFRNTCBlbGVtZW50IHByb3ZpZGVkLlxuICogVXNlIGxpa2UgY29uc3QgZGl2ID0gY3JlYXRlSHRtbDxIVE1MRGl2RWxlbWVudD4oXCI8ZGl2PlNvbWV0aGluZzwvZGl2PlwiKSBvciBjb25zdCBjdXN0b20gPSBjcmVhdGVIdG1sKFwiPHNvbWUtdGFnPjwvc29tZS10YWc+XCIpLlxuICogSWYgbXVsdGlwbGUgZWxlbWVudHMgb3IgYSBwbGFpbiB0ZXh0IHN0cmluZyB3aXRoIG5vIEhUTUwgaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSB3cmFwcGVkIGluIGEgZGl2LCBzbyBpdCBjYW4ga2VlcFxuICogcmV0dXJuaW5nIGFuIEhUTUxFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUh0bWwoaHRtbCwgaW5saW5lID0gZmFsc2UpIHtcbiAgICBsZXQgd3JhcHBlcjtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgIHdyYXBwZXIgPSBzcGFuKChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZXMgPSB3cmFwcGVyLmNoaWxkTm9kZXM7XG4gICAgLy8gTXVsdGlwbGUgbm9kZXMsIHJldHVybiB0aGUgd3JhcHBpbmcgZGl2XG4gICAgLy8gZS5nLiBcIlRoaXMgaXMgYSA8ZW0+dGVzdDwvZW0+XCIgb3IgXCI8ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PlwiXG4gICAgaWYgKG5vZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgLy8gSWYganVzdCBhIHRleHRub2RlIChvciBlbXB0eSksIHJldHVybiBhIHNwYW4uIFRleHQgaXMgaW5jb21wYXRpYmxlIHdpdGggSFRNTEVsZW1lbnQgc28gY2FuJ3QgcmV0dXJuIHRoYXRcbiAgICAvLyBlLmcuIFwiSGVsbG8gd29ybGRcIlxuICAgIGlmICghd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjsgLy8gVGhpcyBpcyBhIHNwYW5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcGFuKHdyYXBwZXIuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFbHNlIHJldHVybiB0aGUgc2luZ2xlIGNoaWxkLlxuICAgIC8vIGUuZy4gXCI8ZGl2PjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+PC9kaXY+XCJcbiAgICByZXR1cm4gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbn1cbmV4cG9ydHMuY3JlYXRlSHRtbCA9IGNyZWF0ZUh0bWw7XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB3aXRoIGFueSBodG1sLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudChodG1sKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICByZXR1cm4gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHdyYXBwZXIpO1xufVxuZXhwb3J0cy5jcmVhdGVGcmFnbWVudCA9IGNyZWF0ZUZyYWdtZW50O1xuZnVuY3Rpb24gZGl2KGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmRpdiA9IGRpdjtcbmZ1bmN0aW9uIHNwYW4oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxTcGFuRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnNwYW4gPSBzcGFuO1xuZnVuY3Rpb24gcGFyYWdyYXBoKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MUGFyYWdyYXBoRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnBhcmFncmFwaCA9IHBhcmFncmFwaDtcbmZ1bmN0aW9uIGFuY2hvcihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBocmVmT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgY29uc3QgdG1wID0gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEFuY2hvckVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIGlmICh0eXBlb2YgaHJlZk9yUHJvcGVydGllcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdG1wLmhyZWYgPSBTdHJpbmcoaHJlZk9yUHJvcGVydGllcyB8fCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB0bXA7XG59XG5leHBvcnRzLmFuY2hvciA9IGFuY2hvcjtcbmZ1bmN0aW9uIGJ1dHRvbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEJ1dHRvbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5idXR0b24gPSBidXR0b247XG4vLyBDb21tb24gcHJpdmF0ZSBmdW5jdGlvbnMgZm9yIG92ZXJsb2Fkcy4gUHJldmVudHMgbG90cyBvZiBjb3B5cGFzdGEuXG4vLyBUaGlzIHdvcmtzIGZvciBldmVyeXRoaW5nIGJlY2F1c2UgVHlwZVNjcmlwdCBpcyBrZWVwaW5nIHRoZSB0eXBlcyB2YWxpZC4gSW4gcHVyZSBKUywgYnVncyBjb3VsZCBiZSBjcmVhdGVkIChmb3IgZXhhbXBsZSwgcGFzc2luZyBhbiBpbm5lclxuLy8gZWxlbWVudCB0byBhIHBhcmFncmFwaCAuLi4gZGlzYWxsb3dlZCBieSBUUyBidXQgdGhlIGNvZGUgaXMgdGhlcmUgaW4gdGhlIEpTKVxuZnVuY3Rpb24gX2ludGVybmFsKHR5cGUsIGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoaHRtbE9yUHJvcGVydGllcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfb3ZyMSh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGh0bWxPclByb3BlcnRpZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIzKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9vdnIyKHR5cGUsIFN0cmluZyhodG1sT3JQcm9wZXJ0aWVzIHx8ICcnKSwgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX292cjEodHlwZSwgaW5uZXJFbGVtZW50LCBwcm9wcywgYXR0cnMpIHtcbiAgICBjb25zdCBlID0gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xuICAgIGUuYXBwZW5kQ2hpbGQoaW5uZXJFbGVtZW50KTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIF9vdnIyKHR5cGUsIGlubmVySHRtbCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBpbm5lckh0bWw7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbmZ1bmN0aW9uIF9vdnIzKHR5cGUsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gcHJvcHMuaW5uZXJIVE1MIHx8ICcnO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBoZWxwZXIgZm9yIENyZWF0ZUVsZW1lbnQsIHJvdWdobHkgbWFwcGluZyB0byBIdG1sRWxlbWVudCB0eXBlcywgYnV0IG5vdCBwZXJmZWN0bHkgYmVjYXVzZSBpdCdzIGltcG9zc2libGVcbiAqICh0aGVyZSdzIG5vIHBlcmZlY3QgMToxIHJlbGF0aW9uc2hpcCkuXG4gKi9cbnZhciBlbGVtZW50VHlwZTtcbihmdW5jdGlvbiAoZWxlbWVudFR5cGUpIHtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBbmNob3JFbGVtZW50XCJdID0gXCJhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXJlYUVsZW1lbnRcIl0gPSBcImFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBdWRpb0VsZW1lbnRcIl0gPSBcImF1ZGlvXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQlJFbGVtZW50XCJdID0gXCJiclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJhc2VGb250RWxlbWVudFwiXSA9IFwiYmFzZWZvbnRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCbG9ja1F1b3RlRWxlbWVudFwiXSA9IFwiYmxvY2txdW90ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJ1dHRvbkVsZW1lbnRcIl0gPSBcImJ1dHRvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTENhbnZhc0VsZW1lbnRcIl0gPSBcImNhbnZhc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFFbGVtZW50XCJdID0gXCJkYXRhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGF0YUxpc3RFbGVtZW50XCJdID0gXCJkYXRhbGlzdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpYWxvZ0VsZW1lbnRcIl0gPSBcImRpYWxvZ1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpdkVsZW1lbnRcIl0gPSBcImRpdlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERMaXN0RWxlbWVudFwiXSA9IFwiZGxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxFbWJlZEVsZW1lbnRcIl0gPSBcImVtYmVkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRmllbGRTZXRFbGVtZW50XCJdID0gXCJmaWVsZHNldFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZvcm1FbGVtZW50XCJdID0gXCJmb3JtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzFFbGVtZW50XCJdID0gXCJoMVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcyRWxlbWVudFwiXSA9IFwiaDJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nM0VsZW1lbnRcIl0gPSBcImgzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzRFbGVtZW50XCJdID0gXCJoNFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc1RWxlbWVudFwiXSA9IFwiaDVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNkVsZW1lbnRcIl0gPSBcImg2XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSFJFbGVtZW50XCJdID0gXCJoclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEltYWdlRWxlbWVudFwiXSA9IFwiaW1hZ2VcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbnB1dEVsZW1lbnRcIl0gPSBcImlucHV0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGFiZWxFbGVtZW50XCJdID0gXCJsYWJlbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExlZ2VuZEVsZW1lbnRcIl0gPSBcImxlZ2VuZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExJRWxlbWVudFwiXSA9IFwibGlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMaW5rRWxlbWVudFwiXSA9IFwibGlua1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1hcEVsZW1lbnRcIl0gPSBcIm1hcFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1ldGVyRWxlbWVudFwiXSA9IFwibWV0ZXJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2REZWxFbGVtZW50XCJdID0gXCJkZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2RJbnNFbGVtZW50XCJdID0gXCJpbnNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPTGlzdEVsZW1lbnRcIl0gPSBcIm9sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT2JqZWN0RWxlbWVudFwiXSA9IFwib2JqZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3B0R3JvdXBFbGVtZW50XCJdID0gXCJvcHRncm91cFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdGlvbkVsZW1lbnRcIl0gPSBcIm9wdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE91dHB1dEVsZW1lbnRcIl0gPSBcIm91dHB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBhcmFncmFwaEVsZW1lbnRcIl0gPSBcInBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhbUVsZW1lbnRcIl0gPSBcInBhcmFtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGljdHVyZUVsZW1lbnRcIl0gPSBcInBpY3R1cmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcmVFbGVtZW50XCJdID0gXCJwcmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcm9ncmVzc0VsZW1lbnRcIl0gPSBcInByb2dyZXNzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUXVvdGVFbGVtZW50XCJdID0gXCJxXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2NyaXB0RWxlbWVudFwiXSA9IFwic2NyaXB0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2VsZWN0RWxlbWVudFwiXSA9IFwic2VsZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU291cmNlRWxlbWVudFwiXSA9IFwic291cmNlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3BhbkVsZW1lbnRcIl0gPSBcInNwYW5cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTdHlsZUVsZW1lbnRcIl0gPSBcInN0eWxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDYXB0aW9uRWxlbWVudFwiXSA9IFwiY2FwdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50XCJdID0gXCJ0ZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnRcIl0gPSBcInRoXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xFbGVtZW50XCJdID0gXCJjb2xcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNvbEdyb3VwRWxlbWVudFwiXSA9IFwiY29sZ3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUVsZW1lbnRcIl0gPSBcInRhYmxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVSb3dFbGVtZW50XCJdID0gXCJ0clwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkJvZHlFbGVtZW50XCJdID0gXCJ0Ym9keVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkZvb3RlckVsZW1lbnRcIl0gPSBcInRmb290XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uSGVhZGVyRWxlbWVudFwiXSA9IFwidGhlYWRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUZW1wbGF0ZUVsZW1lbnRcIl0gPSBcInRlbXBsYXRlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGV4dEFyZWFFbGVtZW50XCJdID0gXCJ0ZXh0YXJlYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRpbWVFbGVtZW50XCJdID0gXCJ0aW1lXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVHJhY2tFbGVtZW50XCJdID0gXCJ0cmFja1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFVMaXN0RWxlbWVudFwiXSA9IFwidWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxWaWRlb0VsZW1lbnRcIl0gPSBcInZpZGVvXCI7XG59KShlbGVtZW50VHlwZSA9IGV4cG9ydHMuZWxlbWVudFR5cGUgfHwgKGV4cG9ydHMuZWxlbWVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKGlucHV0KSB7XG4gICAgLy8gVGhlcmUgaXNuJ3QgYSBidWlsdC1pbiB3YXkgdG8gZG8gdGhpcywgc3RpbGwsIHNvIHdlIG5lZWQgYSBoZWxwZXIgZnVuY3Rpb24uXG4gICAgLy8gVGhlIGFydGljbGUgXCJZb3UgYXJlIHByb2JhYmx5IG1pc3VzaW5nIERPTSB0ZXh0IG1ldGhvZHNcIiBjb252aW5jZWQgbWUgdG8gZG8gaXQgdGhpcyB3YXksXG4gICAgLy8gdnMuIGNyZWF0ZVRleHROb2RlLiBUaG91Z2ggY3JlYXRlVGV4dE5vZGUgd291bGQgcHJvYmFibHkgd29yayBmaW5lIGZvciBzZXR0aW5nIGlubmVySFRNTC5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgICAgICBcIj1cIjogXCImI3gzRDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMzOTtcIixcbiAgICAgICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgICB9O1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIHMgPT4gZXNjYXBlc1tzXSk7XG59XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEdldCB0aGUgY29udGVudHMgb2YgYW55IGh0bWwgbm9kZSBhcyBhIERvY3VtZW50RnJhZ21lbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3ROb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XG59XG5leHBvcnRzLmV4dHJhY3ROb2RlQ29udGVudCA9IGV4dHJhY3ROb2RlQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG4vKipcbiAqIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBHZXR0aW5nIHRoZSB2YWx1ZSBvZiBmb3JtIGZpZWxkcyBpcyBhIGJpdCBjb21wbGljYXRlZCwgbm90IGFsd2F5cyBlbGVtZW50LnZhbHVlLFxuICogc28gaGVyZSdzIGEgaGVscGVyIHRvIG1ha2UgaXQgZWFzaWVyLlxuICovXG5mdW5jdGlvbiBnZXRGb3JtRmllbGRWYWx1ZShlbGVtZW50KSB7XG4gICAgLy8gSXQgd291bGQgYmUgcmVhbGx5IG5pY2UgYXQgdGhpcyBwb2ludCBpZiBKUyBjb3VsZCBzZWUgZ2VuZXJpYyBwYXJhbWV0ZXJzLlxuICAgIC8vIElmIGl0IGNvdWxkLCB0aGVuIHRoZSBjb2RlIGNvdWxkIHNheSBcImlmIChpbnB1dC50eXBlID09PSAnY2hlY2tib3gnICYmIFRPdXRwdXQgIT09IGJvb2xlYW4pIHRocm93IG5ldyBFcnJvcigpXCJcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBlbGVtZW50O1xuICAgICAgICBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXROdW1iZXJJbnB1dFZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRSYWRpb1ZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGdldFNlbGVjdFZhbHVlKGVsZW1lbnQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmdldEZvcm1GaWVsZFZhbHVlID0gZ2V0Rm9ybUZpZWxkVmFsdWU7XG5mdW5jdGlvbiBnZXRDaGVja2JveFZhbHVlKGlucHV0KSB7XG4gICAgcmV0dXJuICEhaW5wdXQuY2hlY2tlZDtcbn1cbmV4cG9ydHMuZ2V0Q2hlY2tib3hWYWx1ZSA9IGdldENoZWNrYm94VmFsdWU7XG5mdW5jdGlvbiBnZXROdW1iZXJJbnB1dFZhbHVlKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoaW5wdXQudmFsdWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0TnVtYmVySW5wdXRWYWx1ZSA9IGdldE51bWJlcklucHV0VmFsdWU7XG5mdW5jdGlvbiBnZXRSYWRpb1ZhbHVlKGlucHV0KSB7XG4gICAgLy8gUmFkaW8gYnV0dG9ucyBhcmUgd2VpcmQuIFdlIHdhbnQgdGhlbSB0byBhcHBlYXIgdG8gYmUgbW9yZSBub3JtYWwuXG4gICAgaWYgKGlucHV0Lm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFtuYW1lPVwiJHtpbnB1dC5uYW1lfVwiXTpjaGVja2VkYCkgfHwge30pLnZhbHVlO1xuICAgIH1cbiAgICAvLyBJZiBubyBuYW1lLCBmYWxsIGJhY2sgdG8gdGhpc1xuICAgIGlmIChpbnB1dC5jaGVja2VkKSB7XG4gICAgICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmdldFJhZGlvVmFsdWUgPSBnZXRSYWRpb1ZhbHVlO1xuZnVuY3Rpb24gZ2V0U2VsZWN0VmFsdWUoc2VsZWN0KSB7XG4gICAgaWYgKHNlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICByZXR1cm4gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdC52YWx1ZTtcbiAgICB9XG59XG5leHBvcnRzLmdldFNlbGVjdFZhbHVlID0gZ2V0U2VsZWN0VmFsdWU7XG5mdW5jdGlvbiBnZXRNdWx0aVNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNlbGVjdC5zZWxlY3RlZE9wdGlvbnMpLmZpbHRlcihmID0+IGYudmFsdWUpLm1hcChtID0+IG0udmFsdWUpO1xufVxuZXhwb3J0cy5nZXRNdWx0aVNlbGVjdFZhbHVlID0gZ2V0TXVsdGlTZWxlY3RWYWx1ZTtcbi8vIFRoaXMgaXMgYWxtb3N0IHBvaW50bGVzcy4gSnVzdCBoZXJlIGZvciBjb25zaXN0ZW5jeS5cbmZ1bmN0aW9uIGdldFNpbXBsZUZvcm1WYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIGlmIChpbnB1dC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgdmFsaWQgZm9yIG11bHRpLXNlbGVjdHMnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5wdXQudmFsdWU7XG59XG5leHBvcnRzLmdldFNpbXBsZUZvcm1WYWx1ZSA9IGdldFNpbXBsZUZvcm1WYWx1ZTtcbi8qKlxuICogU2V0dGluZyB2YWx1ZXMgaXMganVzdCBhcyBjb21wbGljYXRlZCBhcyBnZXR0aW5nIHRoZW0sIGJlY2F1c2UgSFRNTCBpcyBpbmNvbnNpc3RlbnQuIFlvdSBjYW4ndCBqdXN0IHNheSBlbGVtZW50LnZhbHVlID0gZm9vLlxuICogSGVyZSdzIGEgaGVscGVyIHRvIG1ha2UgaXQgZWFzaWVyLlxuICovXG5mdW5jdGlvbiBzZXRGb3JtRmllbGRWYWx1ZShlbGVtZW50LCB2YWx1ZSkge1xuICAgIC8vIEhlcmUgeW91IGNhbiB2YWxpZGF0ZSB0aGUgdHlwZSBiZWZvcmUgc2V0dGluZyBvciBkbyBzb21lIGtpbmQgb2YgY29udmVyc2lvbi5cbiAgICAvLyBGb3IgbXVsdGktc2VsZWN0cywgY2FuIGF1dG8td3JhcCB2YWx1ZSBpbiBzdHJpbmcuXG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgIH1cbiAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7IC8vIHVzZWQgaW4gbW9zdCBvZiB0aGUgY2FzZXNcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCB0eXBlID0gaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHZhbHVlID09PSB0cnVlIHx8IHN0cmluZ1ZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gc3RyaW5nVmFsdWUgPT09IGlucHV0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdG9EYXRlU3RyaW5nKG5ldyBEYXRlKHN0cmluZ1ZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2RhdGV0aW1lJyB8fCB0eXBlID09PSAnZGF0ZXRpbWUtbG9jYWwnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHN0cmluZ1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGAke3RvRGF0ZVN0cmluZyhkYXRlKX1UJHt0b1RpbWVTdHJpbmcoZGF0ZSl9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IGVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBBcnJheS5mcm9tKHNlbGVjdC5vcHRpb25zKTtcbiAgICAgICAgaWYgKHNlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSBzdHJpbmdWYWx1ZTsgLy8gdHJlYXRpbmcgaXQgbGlrZSBhIG5vbi1tdWx0aXBsZSB3b3Jrc1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vbmV4aXN0ZW50IG9wdGlvbnMgY2Fubm90IGJlIHNldC4gV2Ugc2hvdWxkIGxldCB0aGUgcHJvZ3JhbW1lciBrbm93LiBFdmVuIHRob3VnaCB0aGlzIHRha2VzIENQVSBjeWNsZXMuXG4gICAgICAgICAgICB2YWx1ZS5tYXAobSA9PiB7XG4gICAgICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3B0IG9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBvcHQuc2VsZWN0ZWQgPSB2YWx1ZS5tYXAobSA9PiBtLnRvU3RyaW5nKCkpLmluZGV4T2Yob3B0LnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsdWUpO1xuICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgZWxlbWVudC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS53YXJuKGBDYWxsZWQgc2V0Rm9ybUZpZWxkVmFsdWUgb24gbm9uLWZvcm0gZmllbGQgJHtlbGVtZW50LnRhZ05hbWV9ICR7ZWxlbWVudC5pZCB8fCAnJ31gKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsKSB7XG4gICAgICAgIC8vIElmIHlvdSBzZXQgdGhlIHZhbHVlIG9mIGEgc2VsZWN0IHRvIHNvbWV0aGluZyB0aGF0IGlzIG5vdCBhbiBhdmFpbGFibGUgb3B0aW9uLCBub3RoaW5nIHdpbGwgaGFwcGVuLlxuICAgICAgICBjb25zdCBoYXNPcHRpb24gPSBvcHRpb25zLm1hcChtID0+IG0udmFsdWUpLmluZGV4T2YodmFsLnRvU3RyaW5nKCkpID4gLTE7XG4gICAgICAgIGlmICghaGFzT3B0aW9uKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDYWxsZWQgc2V0Rm9ybUZpZWxkVmFsdWUgd2l0aCBub25leGlzdGVudCBvcHRpb24gJHt2YWwudG9TdHJpbmcoKX0gb24gc2VsZWN0ICR7ZWxlbWVudC5pZH1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGVzZSBjb3VsZCBiZSByZWFkYWJsZSBvbmVsaW5lcnMgaWYgd2UgaGFkIHBhZFN0YXJ0KCkgYnV0IGl0J3Mgbm90IHdvcnRoIGJ1bXBpbmcgdG8gRVMyMDE3IGZvciBvbmUgbWV0aG9kXG4gICAgZnVuY3Rpb24gdG9EYXRlU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtb250aCA9ICgnMCcgKyAoZGF0ZS5nZXRVVENNb250aCgpICsgMSkudG9TdHJpbmcoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBkYXkgPSAoJzAnICsgZGF0ZS5nZXRVVENEYXRlKCkudG9TdHJpbmcoKSkuc2xpY2UoLTIpO1xuICAgICAgICByZXR1cm4gYCR7ZGF0ZS5nZXRVVENGdWxsWWVhcigpfS0ke21vbnRofS0ke2RheX1gO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b1RpbWVTdHJpbmcoZGF0ZSkge1xuICAgICAgICBpZiAoIWlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvdXIgPSAoJzAnICsgZGF0ZS5nZXRIb3VycygpKS5zbGljZSgtMik7XG4gICAgICAgIGNvbnN0IG1pbnV0ZSA9ICgnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpO1xuICAgICAgICByZXR1cm4gYCR7aG91cn06JHttaW51dGV9YDtcbiAgICB9XG59XG5leHBvcnRzLnNldEZvcm1GaWVsZFZhbHVlID0gc2V0Rm9ybUZpZWxkVmFsdWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSGVyZSdzIGEgaGVscGVyIGZvciBvbmUgb2YgdGhlIHBsYWNlcyB3aGVyZSBIVE1MNSBmYWxscyBvdmVyLiBJZiB5b3UgZ2V0IHNvbWUgaHRtbCBsaWtlIDxkaXYgaWQ9XCIxXCI+PC9kaXY+PGRpdiBpZD1cIjJcIj48L2Rpdj4sIGl0IGJlY29tZXNcbiAqIGEgTm9kZUxpc3QuIEhUTUw1IGJ5IGRlZmF1bHQgZG9lcyBub3QgcHJvdmlkZSBhIHdheSB0byBzZWFyY2ggdGhpcyBmb3IgYSBzZWxlY3Rvci5cbiAqL1xuZnVuY3Rpb24gbm9kZUxpc3RTZWxlY3Rvcihub2Rlcywgc2VsZWN0b3IpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKCEoJ21hdGNoZXMnIGluIG5vZGUpKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IHRleHQgbm9kZXNcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ub2RlTGlzdFNlbGVjdG9yID0gbm9kZUxpc3RTZWxlY3Rvcjtcbi8qKlxuICogSGVyZSdzIGEgaGVscGVyIGZvciBvbmUgb2YgdGhlIHBsYWNlcyB3aGVyZSBIVE1MNSBmYWxscyBvdmVyLiBJZiB5b3UgZ2V0IHNvbWUgaHRtbCBsaWtlIDxkaXYgaWQ9XCIxXCI+PC9kaXY+PGRpdiBpZD1cIjJcIj48L2Rpdj4sIGl0IGJlY29tZXNcbiAqIGEgTm9kZUxpc3QuIEhUTUw1IGJ5IGRlZmF1bHQgZG9lcyBub3QgcHJvdmlkZSBhIHdheSB0byBzZWFyY2ggdGhpcyBmb3IgYSBzZWxlY3Rvci5cbiAqL1xuZnVuY3Rpb24gbm9kZUxpc3RTZWxlY3RvckFsbChub2Rlcywgc2VsZWN0b3IpIHtcbiAgICAvLyBCZWNhdXNlIHRoZSBicm93c2VyIGNhbiBsb3NlIHJlZmVyZW5jZXMgd2hlbiBtb3Zpbmcgbm9kZXMsIHRoaXMgY2FuIGFsc28gdGFrZSBhIHJlZ3VsYXIgYXJyYXkuXG4gICAgLy8gQmVjYXVzZSBIVE1MNSBoYXMgdG90YWxseSBmYWxsZW4gb3ZlciwgaXQncyBub3QgcG9zc2libGUgZm9yIHRoZSBmaXhlZCBub2RlTGlzdFNlbGVjdG9yQWxsXG4gICAgLy8gdG8gbWF0Y2ggdGhlIG91dHB1dCBzaWduYXR1cmUgb2YgcXVlcnlTZWxlY3RvckFsbCAoTm9kZUxpc3RPZjxFbGVtZW50PiBpbnN0ZWFkIG9mIGFycmF5KS5cbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5BcnJheS5mcm9tKHNlYXJjaCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvckFsbCA9IG5vZGVMaXN0U2VsZWN0b3JBbGw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuY29uc3QgT2JzZXJ2YWJsZVN0YXRlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBFbHZpc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0VsdmlzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2ktdicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaS12JywgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICB0aGlzLl9hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gb3B0aW9ucy5kZWZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgLy8gRGVmaW5lZCB0aGUgZGVmYXVsdCBjb21wb25lbnQgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IGxvb3BQb3N0UHJvY2VzcygpIG1ldGhvZFxuICAgICAgICBpZiAob3B0aW9ucy5sb29wSXRlbUNsYXNzKSB7XG4gICAgICAgICAgICBpZiAoIUNvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb29wSXRlbUNsYXNzIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShvcHRpb25zLmxvb3BJdGVtQ2xhc3MgaW5zdGFuY2VvZiBCb3VuZENvbXBvbmVudC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGFuIGJvdW5kIGNvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9vcFBhcmVudCA9IG9wdGlvbnMubG9vcFBhcmVudDsgLy8gdW5kZWZpbmVkIGluIG1vc3QgY2FzZXNcbiAgICAgICAgdGhpcy5fbG9vcEl0ZW1DbGFzcyA9IG9wdGlvbnMubG9vcEl0ZW1DbGFzcyB8fCBCb3VuZENvbXBvbmVudDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKTtcbiAgICAgICAgdGhpcy5zZXRUZW1wbGF0ZSh0aGlzLmNvbnRlbnQuaW5uZXJIVE1MKTsgLy8gSW5uZXJIVE1MIGlzIGN1cnJlbnRseSBvbmx5IHBhcnNlZCBhbmQgdGhlbiB0aGUgb3JpZ2luYWwgdGV4dCBpcyB0aHJvd24gYXdheS5cbiAgICAgICAgLy8gQXV0by1hZGQgc3Vic2NyaXB0aW9ucyBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZUFsbFZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5vYnNlcnZlVmlld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRndCBvZiBvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKHRndCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2FzeW5jKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb25zdHJ1Y3RvciBpbml0aWFsaXphdGlvbiBpcyBkb25lLlxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqIFRvIHJlcGxhY2UgdGhlIGVsZW1lbnQgKGNvcHlpbmcgZXhpc3RpbmcgYXR0cmlidXRlcykgc2VuZCB0aGUgcmVsZXZhbnQgb3B0aW9ucywgcGx1cyB7cmVwbGFjZTogdHJ1ZX0uXG4gICAgICpcbiAgICAgKiBJbiBhbG1vc3QgZXZlcnkgY2FzZSwgdmlld01vZGVsIHNob3VsZCBiZSBzZXQuIEJ1dCBpdCdzIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgdGhhdCBhbmQgc3RpbGwgYmUgY29tcGF0aWJsZSB3aXRoIHRoZSBiYXNlXG4gICAgICogY2xhc3MgaW5qZWN0KCkuIFRoaXMgaXMgYSB0eXBlc2NyaXB0LW9ubHkgaXNzdWUgYnV0IGl0IG1ha2VzIHRoaW5ncyB1Z2x5LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy4gQW5kIHByYWN0aWNhbGx5IGRlbWFuZHMgdGhlaXIgdXNlIHRvIHNldCB2aWV3TW9kZWwuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGVsZW1lbnQsIHZpZXdNb2RlbCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3Qoc2VsZWN0b3IsIG9wdCwgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsIHRvIGluamVjdCgpIHdpdGggYSBjbGVhbmVyIGFyZ3VtZW50IG9yZGVyLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3RCaW5kKHZpZXdNb2RlbCwgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3Qoc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50V2l0aEJvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIG9wdCk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQm91bmRDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCB2aWV3TW9kZWwsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIC8vIFdBUk46IFRoaXMgY2FzdCBtYXkgbm90IGJlIHRydWUuIFRoZXJlJ3Mgbm8gd2F5IHRvIGNoZWNrIHRoYXQgdGhlIHRhZ3MgbWF0Y2guXG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oeyBlbGVtZW50OiBleGlzdGluZ0VsZW1lbnQgfSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgIH1cbiAgICB3cml0ZShldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2dC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCk7XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28gY2FzZXMgd2hlcmUgdmFsdWUgaXMgdW5kZWZpbmVkLiBFaXRoZXIgdGhlIGVsZW1lbnQgaXMgbm90IGEgZm9ybSBlbGVtZW50IG9yIGl0J3MgYW4gdW5uYW1lZCByYWRpbyBidXR0b25cbiAgICAgICAgLy8gdGhhdCBpcyBub3Qgc2VsZWN0ZWQuIEluIGJvdGggY2FzZXMsIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHRoZSBtb2RlbCB3aXRoIHVuZGVmaW5lZCwgd2hpY2ggaXMgdXNlbGVzcy5cbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyBqdXN0aWZpY2F0aW9uIHZhbGlkP1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdBUk46IENhbm5vdCB0eXBlIGNoZWNrIHRoaXMgZHluYW1pY2FsbHkuIFR5cGVTY3JpcHQgaXMgYnVpbGQtdGltZSBjaGVja2luZyBvbmx5LiBSdW50aW1lIGNvZGUgY2FuJ3QgZXZlbiBzZWUgdGhlIHR5cGUuXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHRvIGJlIHByZWNpc2UsIGFsbCBwcm9wZXJ0aWVzIGluIF93cml0ZUJpbmRpbmdzIHNob3VsZCBiZSBGb3JtSXRlbVZhbHVlLCBidXQgYXMgX3dyaXRlQmluZGluZ3MgaXMgcG9wdWxhdGVkXG4gICAgICAgIC8vIHZpYSBzdHJpbmcsIHRoZXJlJ3Mgbm8gd2F5IHRvIGVuZm9yY2UgdGhhdC4gU28gaWYgeW91IGZpbGwgYSBzdHJpbmcgdmFsdWUgZnJvbSBhIG11bHRpcGxlIHNlbGVjdCwgaXQnbGwgcHJvZHVjZSBidWdzLlxuICAgICAgICAvLyBTbyBiZSBjYXJlZnVsLiBJdCdzIG9uIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBiaW5kIG9mIHRoaXMuX3dyaXRlVGFyZ2V0cykge1xuICAgICAgICAgICAgaWYgKGJpbmQuc3RhcnRzV2l0aCgndGhpcy4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbYmluZC5zbGljZSg1KV07XG4gICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXNbYmluZC5zbGljZSg1KV0gPSB2YWx1ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgdmlldyBtb2RlbCBpcyBlaXRoZXIgRm9ybUZpZWxkVmFsdWUgb3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG9uZS5cbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0aGlzLnZpZXdNb2RlbCwgKCkgPT4gdGhpcy52aWV3TW9kZWwgPSB2YWx1ZSwgdGhpcy52aWV3TW9kZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGJpbmQuc3RhcnRzV2l0aCgnXicpICYmIEVsdmlzXzEuZV8odGhpcy5sb29wUGFyZW50KS52aWV3TW9kZWwgJiYgdHlwZW9mIHRoaXMubG9vcFBhcmVudC52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gTm90ZTogTm90IGRvaW5nIGEgJ14nIGJ5IGl0c2VsZiBiZWNhdXNlIHRoYXQncyBhIHByZXR0eSBCUyBjYXNlLiBJZiB0aGlzIGlzIHRoZSBsb29wIGNoaWxkLCB0aGUgcGFyZW50IGlzIHByb2JhYmx5XG4gICAgICAgICAgICAgICAgLy8gYW4gb2JqZWN0IG9yIGFuIGl0ZXJhYmxlLCBub3QgcmVhbGx5IHNvbWV0aGluZyB5b3UnbGwgcmVhZCBvciB3cml0ZSB0byBkaXJlY3RseS5cbiAgICAgICAgICAgICAgICAvLyBNaWdodCBkbyBhIHNob3J0Y3V0IHRvIHRoZSBwYXJlbnQgY29tcG9uZW50J3MgJ3RoaXMnXG4gICAgICAgICAgICAgICAgd3JpdGVUb1ZpZXdNb2RlbE9iamVjdCh0aGlzLmxvb3BQYXJlbnQsIGJpbmQuc2xpY2UoMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXMudmlld01vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHdyaXRlVG9WaWV3TW9kZWxPYmplY3QodGhpcywgYmluZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JpdGVWYWx1ZSh0YXJnZXQsIHdyaXRlVG9Qcm9wZXJ0eSwgdGhpc0FyZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24gdG8gYmUgZmxleGlibGUsIGJlY2F1c2UgaWYgdGFyZ2V0IGlzIGEgdmFsdWUgdHlwZSBvciBpbW11dGFibGUsIHdyaXRpbmdcbiAgICAgICAgICAgIC8vIGl0IGRpcmVjdGx5IHJlcGxhY2VzIG9ubHkgdGhlIHZhbHVlIHdpdGhvdXQgdXBkYXRpbmcgdGhlIG1vZGVsLlxuICAgICAgICAgICAgd3JpdGVUb1Byb3BlcnR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JpdGVUb1ZpZXdNb2RlbE9iamVjdChjb21wLCBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKGNvbXAudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgIC8vIFdpdGggb2JzZXJ2YWJsZSBzdGF0ZSwgd2UgbmVlZCB0byBnZXQgdGhlIHN0YXRlLCB1cGRhdGUgaXQsIGFuZCB3cml0ZSB0aGUgd2hvbGUgdGhpbmcgYmFjay5cbiAgICAgICAgICAgICAgICAvLyBXaGlsZSBpdCBpcyBwb3NzaWJsZSB0byB1cGRhdGUgYSBzaW5nbGUgcHJvcGVydHkgaW4gc29tZSBjYXNlcywgaXQgZG9lc24ndCBhbGxvdyByZXVzZSBvZiBhbHJlYWR5LXdvcmtpbmcgY29kZS5cbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBjb21wLnZpZXdNb2RlbC52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0bXBbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0bXBbcHJvcGVydHldID0gdmFsdWUsIHRtcCk7XG4gICAgICAgICAgICAgICAgY29tcC52aWV3TW9kZWwudmFsdWUgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBjb21wLnZpZXdNb2RlbFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IGNvbXAudmlld01vZGVsW3Byb3BlcnR5XSA9IHZhbHVlLCBjb21wLnZpZXdNb2RlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIHRoZSBtb2RlbCBwYXNzZWQgaW4sIG9yIHRoZSB2aWV3IG1vZGVsIGlmIG5vbmUgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIG9ic2VydmUobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKElPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG1vZGVsKSkge1xuICAgICAgICAgICAgbW9kZWwuc3Vic2NyaWJlKHRoaXMucmVuZGVyLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIGFsbCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgZm91bmQgaW4gdGhlIG1vZGVsIHBhc3NlZCBpbixcbiAgICAgKiBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi4gVGhpcyBvbmx5IGdvZXMgb25lIGxldmVsIGRlZXAsIHNvIGl0XG4gICAgICogd29uJ3QgcGljayB1cCBuZXN0ZWQgb2JqZWN0cywgYnV0IGl0J3MgcHJvYmFibHkgZ29vZCBlbm91Z2ggaW4gNjAlIG9mIGNhc2VzLlxuICAgICAqL1xuICAgIG9ic2VydmVBbGwobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsKTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1vZGVsKSkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsW21dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgaWYgKHRoaXMuX2RlZmVyICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5ib29sKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGJvb2xlYW4gYXR0cmlidXRlcywgdGhlIHZlcnkgZXhpc3RlbmNlIG9mIHRoZSBhdHRyaWJ1dGUgbWVhbnMgaXQgaXMgY29uc2lkZXJlZCB0byBiZSB0cnVlLlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUoaXRlbS5zb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGl0ZW0uYXR0cmlidXRlLCB2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdGhpcy5fZ2V0U3RyaW5nVmFsdWUoaXRlbS5zb3VyY2UpIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdmFsdWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIC8vIENhbGxzIHNldEZvcm1GaWVsZFZhbHVlIGJlaGluZCB0aGUgc2NlbmVzLlxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZSh0aGlzLl92YWx1ZUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZSh0aGlzLl9jc3NDbGFzc2VzKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcykge1xuICAgICAgICAgICAgLy8gSWYgdHJ1dGh5LCBhZGQgY2xhc3MsIGVsc2UgZGVsZXRlIGl0LlxuICAgICAgICAgICAgbGV0IHZhbCA9ICEhdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0uY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NTdHlsZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzU3R5bGUpIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLmNvbnRlbnQuc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIHN0eWxlIHRleHQgaW4gY29tcG9uZW50OiAke3ZhbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICAgICAgY29uc3QgaXRlcmFibGUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fbG9vcC5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGl0ZXJhYmxlICYmIHR5cGVvZiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNDb250ZW50ID0gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgaXRlcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuX2xvb3AuZnJhZ21lbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBcyBzb29uIGFzIHdlIGFkZCB0aGUgY2xvbmUgdG8gY29udGVudCwgY2hpbGROb2RlcyBsb3NlcyByZWZlcmVuY2UgdG8gaXRzIGNoaWxkIG5vZGVzLCBzbyBjb3B5IGl0LlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IEFycmF5LmZyb20oY2xvbmUuY2hpbGROb2Rlcykuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3AucG9zdFByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9vcFBvc3RQcm9jZXNzKHJvdywgbm9kZXMsIGl0ZXJhYmxlLCBwcmV2aW91c0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5KSB7XG4gICAgICAgICAgICAvLyBJZiBmYWxzeSwgc2V0IGRpc3BsYXk6IG5vbmUgKHNhdmluZyBwcmV2aW91cyB2YWx1ZSkuIElmIHRydXRoeSwgcmVzdG9yZSBwcmV2aW91cyB2YWx1ZSAoaWYgYmxvY2ssIGZsZXgsIGJ1dCBub3QgaWYgbm9uZSlcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fY3NzRGlzcGxheS5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nzc0Rpc3BsYXkubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNDc3NEaXNwbGF5U2V0dGluZyA9IHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZVRleHQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGVtcGxhdGVUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBpbiB0aGUgY29uc3RydWN0b3IuIFRoZSB1cGRhdGUgcGFyYW0gc2hvdWxkIG5vdCBiZSBzZXQuXG4gICAgICAgIGlmICh1cGRhdGUgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSBzaG91bGQgbm90IGJlIHRydWUgd2hlbiBjYWxsZWQgaW50ZXJuYWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSBjcmVhdGluZyBhbiBlbGVtZW50IHRoYXQncyBub3Qgb24gdGhlIHBhZ2UsIHdlIHByb2JhYmx5IGNvdWxkIGF2b2lkIHVzaW5nIGEgZnJhZ21lbnQsXG4gICAgICAgIC8vIGJ1dCB0aGlzIGlzIHdoYXQgZnJhZ21lbnRzIGFyZSBmb3IuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MVGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGVUZXh0O1xuICAgICAgICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgdXNlZCB0byByZXBsYWNlIHRoZSBleGlzdGluZyB0ZW1wbGF0ZSwgd2UgbmVlZCB0byB3aXBlIG91dCB0aGUgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICAvLyBXb3JraW5nIG9uIGEgY2xvbmUgaGVyZSwgc28gd2UgZG9uJ3Qgc2VlIHRoZSBib2R5IGJlaW5nIGJ1aWx0IHN0ZXAgYnkgc3RlcCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ktdicpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGEgcG9zc2libGUgZXJyb3Igc2NlbmFyaW86IEF0dHJpYnV0ZSBkb2VzIG5vdCBoYXZlIGEgbmFtZSBidXQgY29udGFpbnMgcG9zc2libHkgbmFtZWQgaS12IHRhZ3MuXG4gICAgICAgICAgICAvLyBJdCdzIG9ubHkgXCJwb3NzaWJsZVwiIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXIgcmVhc29ucyBmb3IgaXQgKHN1Y2ggYXMgJ2Rpc2FibGVkJykuXG4gICAgICAgICAgICAvLyBUbyB0cnkgYW5kIGZpbHRlciBvdXQgdGhlIG9idmlvdXMgY2FzZXMsIHN1Y2ggYXMgY2xhc3MgYW5kIHN0eWxlLCBkb24ndCBjb3VudCBub24tYm9vbGVhbiBhdHRyaWJ1dGVzIHRoYXQgaGF2ZSB2YWx1ZXMuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25hbWUgJiYgcmVwbC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDAgJiYgQXJyYXkuZnJvbShyZXBsLmF0dHJpYnV0ZXMpLmZpbHRlcihmID0+IGYubmFtZSAhPT0gJ25vZXNjYXBlJyAmJiAhZi52YWx1ZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFVubmFtZWQgY29tcG9uZW50ICMke3RoaXMuY29udGVudC5pZH0gY29udGFpbnMgcG9zc2libHkgbmFtZWQgSS1WIHJlcGxhY2VtZW50IGludGVuZGVkIGZvciBhbm90aGVyIGNvbXBvbmVudDogPGktdiAke0FycmF5LmZyb20ocmVwbC5hdHRyaWJ1dGVzKS5maWx0ZXIoZiA9PiBmLm5hbWUgIT09ICdub2VzY2FwZScgJiYgIWYudmFsdWUpWzBdLm5hbWV9PiR7cmVwbC5pbm5lckhUTUx9PC9pLXY+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBuYW1lIGlzIHNwZWNpZmllZCwgaS12IHRhZyBNVVNUIGhhdmUgdGhhdCBhcyBhIHRhZy5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uYW1lICYmICFyZXBsLmhhc0F0dHJpYnV0ZSh0aGlzLl9uYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm9lc2NhcGUgPSByZXBsLmhhc0F0dHJpYnV0ZSgnbm9lc2NhcGUnKSAmJiByZXBsLmdldEF0dHJpYnV0ZSgnbm9lc2NhcGUnKSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiByZXBsLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogcmVwbC5pbm5lckhUTUwsXG4gICAgICAgICAgICAgICAgbm9lc2NhcGU6IG5vZXNjYXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbiB0aGUgb3JpZ2luYWwgYnVpbGQgb2YgdGhlIG9iamVjdCwgZiBhbnkgcmVwbGFjZW1lbnRzIHN0YXJ0IHdpdGggXCJ0aGlzLlwiIHdlIG5lZWQgdG8gZGVmZXIuXG4gICAgICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQgJiYgIXRoaXMuX2RlZmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZlciA9IHRoaXMuX2RlZmVyIHx8ICEhdGhpcy5fcmVwbGFjZW1lbnRzLmZpbmQoZiA9PiBmLnNvdXJjZS5zdGFydHNXaXRoKCd0aGlzLicpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIHdpbGwgbGVhZCB0byBhIEZPVUMsIG1heWJlIG1pbGxpc2Vjb25kcywgbWF5YmUgbG9uZ2VyLlxuICAgICAgICBpZiAoIXRoaXMuX2RlZmVyIHx8IHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb21wbGV0ZWQgdmFsdWVzIGJlZm9yZSBhZGRpbmcgdG8gdGhlIHZpc2libGUgcGFnZS4gVGhpcyBpcyBzbGlnaHRseSByZWR1bmRhbnQsIGJlY2F1c2UgdGhpcyBoYXBwZW5zIGluIHRoZSByZW5kZXIoKVxuICAgICAgICAgICAgLy8gc3RlcCwgYnV0IEkgaGF0ZSBpdCB3aGVuIEkgc2VlIGEgZmxhc2ggb2YgdW5yZXBsYWNlZCBjb250ZW50IG9uIHNpdGVzLlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiB0aGlzIHdvcmtzIGlzIGJlY2F1c2UgX3JlcGxhY2VtZW50cyByZWZlcmVuY2VzIGNsb25lLCB3aGljaCBpc24ndCB2aXNpYmxlIHVudGlsIGFsbW9zdCB0aGUgbGFzdCBsaW5lLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBvcHVsYXRlIHRoZSBmcm9udC1lbmQgdGV4dC4gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSB0aGluZyB0byByZXBsYWNlLiBPdGhlcndpc2UsIHlvdSdyZSBqdXN0IHdpcGluZyBvdXQgcGVyZmVjdGx5XG4gICAgICAgIC8vIHZhbGlkIEhUTUw1IHJlZmVyZW5jZXMgZm9yIG5vIHJlYXNvbi5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gYSBmdWxsIHVwZGF0ZSBpZiByZXF1ZXN0ZWQgdG9cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SHRtbFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12IG5vZXNjYXBlPicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldFRleHRUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdj4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRMb29wKHNvdXJjZSA9ICcuJywgZnJhZ21lbnQsIHNraXBQb3N0UHJvY2VzcyA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3AgPSB7IHNvdXJjZSwgcG9zdFByb2Nlc3M6ICFza2lwUG9zdFByb2Nlc3MsIGZyYWdtZW50IH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUxvb3AodXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmFsdWVBdHRyaWJ1dGUoc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl92YWx1ZUF0dHJpYnV0ZSA9IHNvdXJjZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmlzaWJpbGl0eShzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHsgc291cmNlLCBuZWdhdGl2ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiBmYWxzZSwgbmVnYXRpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogdHJ1ZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbHRlcihmID0+IGYuYXR0cmlidXRlICE9PSBhdHRyaWJ1dGUpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzQ2xhc3MoY2xzID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jc3NDbGFzc2VzID0gY2xzO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NTdHlsZShzdHlsZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY3NzU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ3NzQ2xhc3NTd2l0Y2goY2xzLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghY2xzIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmluZChmID0+IGYuY2xhc3MgPT09IGNscykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCh7IGNsYXNzOiBjbHMsIHNvdXJjZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ3NzQ2xhc3NTd2l0Y2goY2xzLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbHRlcihmID0+IGYuY2xhc3MgIT09IGNscyk7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy53cml0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlVGFyZ2V0KHRhcmdldCA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmZpbmQoZiA9PiBmID09PSB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZVdyaXRlVGFyZ2V0KHRhcmdldCwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fd3JpdGVUYXJnZXRzLmZpbHRlcihmID0+IGYgIT09IHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQXV0by1JbmplY3QgY2FsbHMgdGhlIGRlZmF1bHQgaW5qZWN0QmluZCgpIG9uIHRoZSBkZWZhdWx0IEJvdW5kQ29tcG9uZW50IGNsYXNzLCB3aXRoIG5vIG9wdGlvbnMgZXhjZXB0IHNlbGVjdG9yLlxuICAgICAqIElmIHlvdSBwYXNzIG5vIGlucHV0cywgaXQgc2Vla3Mgb3V0IGFsbCBjaGlsZCBlbGVtZW50cyB0aGF0IGhhdmUgYXQgbGVhc3Qgb25lIGljaGlnbyBjdXN0b20gcHJvcGVydHkuIEtlZXAgaW4gbWluZFxuICAgICAqIHRoYXQgd2hlbiB5b3UgaGF2ZSBuZXN0ZWQgb2JqZWN0cywgdGhpcyB3aWxsIHVzdWFsbHkgbWVhbiBzb21ldGhpbmcgd2lsbCBibG93IHVwIGJlY2F1c2UgeW91IHRyaWVkIHRvIGJpbmQgYW4gZWxlbWVudFxuICAgICAqIHR3aWNlLiBJdCBhbHNvIHdpbGwgcGVyZm9ybSBtdWNoIHdvcnNlLlxuICAgICAqXG4gICAgICogSWYgeW91IHBhc3MgYSBzZWxlY3RvciwgaXQgYWN0cyB0aGUgc2FtZSBhcyBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKCkgd2l0aCB0aGF0IHNlbGVjdG9yLlxuICAgICAqXG4gICAgICogSW4gbXkgZXhwZXJpZW5jZSwgdGhpcyBpcyBhbG1vc3QgY29tcGxldGVseSB1c2VsZXNzLiBFaXRoZXIgdGhlIGxhY2sgb2Ygb3B0aW9ucyBicmVha3MgaXQgKHByZXR0eSB1c2VsZXNzIGlmIHlvdSBjYW4ndFxuICAgICAqIG9ic2VydmUgYW4gb2JzZXJ2YWJsZSkgb3IgdGhlIHNpbXBsZSBhY3Qgb2YgYmluZGluZyBicmVha3Mgc3R1ZmYuXG4gICAgICovXG4gICAgYXV0b0luamVjdChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQodGhpcy52aWV3TW9kZWwsIHNlbGVjdG9yLCB7IHBhcmVudDogdGhpcy5jb250ZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbShlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUuc3RhcnRzV2l0aCgnaTVfJykgfHwgYXR0ci5uYW1lLnN0YXJ0c1dpdGgoJzonKSB8fCBhdHRyLm5hbWUuc3RhcnRzV2l0aCgnZGF0YS1pNV8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCh0aGlzLnZpZXdNb2RlbCwgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gdW5iaW5kIGEgdmlldyBmcm9tIGFuIG9ic2VydmFibGUuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cy5kZWxldGUodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIGlmIHlvdSBuZWVkIHRvIGRvIHNvbWV0aGluZyBlbHNlIGFmdGVyIHRoZSBsb29wIGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICovXG4gICAgbG9vcFBvc3RQcm9jZXNzKHJvdywgYWRkZWRDb250ZW50LCBhbGxSb3dzLCBwcmV2aW91c0NvbnRlbnQpIHtcbiAgICAgICAgLy8gSWYgdGhlIHR5cGVzY3JpcHQgcGFydCBvZiB0aGUgZm9sbG93aW5nIHdlcmUgaW1wb3J0YW50LCB0aGlzIHdvdWxkIGJlIGEgcHJvYmxlbVxuICAgICAgICAvLyBpZiB0aGlzIHdlcmUgYSBkZXJpdmVkIGNsYXNzLlxuICAgICAgICBjb25zdCB0aGlzY2xhc3MgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sb29wSXRlbUNsYXNzLmluamVjdEJpbmQocm93LCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMS5ub2RlTGlzdFNlbGVjdG9yQWxsKGFkZGVkQ29udGVudCwgJ1tpNV9pdGVtXSwgW1xcXFwwMDAwM0FpdGVtXSwgW2RhdGEtaTVfaXRlbV0nKSwge1xuICAgICAgICAgICAgcmVwbGFjZTogZmFsc2UsXG4gICAgICAgICAgICBsb29wUGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgYXN5bmM6IHRoaXMuX2FzeW5jXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U3RyaW5nVmFsdWUobmFtZSwgc2tpcEVzY2FwZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKG5hbWUpO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZSA6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBza2lwRXNjYXBlID8gdmFsdWUudG9TdHJpbmcoKSA6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRVbnR5cGVkVmFsdWUobmFtZSkge1xuICAgICAgICBsZXQgc291cmNlO1xuICAgICAgICAvLyBJJ20gcHJldHR5IHN1cmUgdGhpcyBpcyBiZWluZyB2YWxpZGF0ZWQgZHVyaW5nIGNvbnN0cnVjdGlvbiBidXQgYmUgc2FmZVxuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGhpc0FyZyA9IHRoaXMudmlld01vZGVsO1xuICAgICAgICAvLyBJZiBWTSBpcyBhIHN0YXRlLCBnZXQgdGhlIGN1cnJlbnQgc3RhdGUgdmFsdWUuXG4gICAgICAgIGlmIChPYnNlcnZhYmxlU3RhdGVfMS5vYnNlcnZhYmxlU3RhdGVDaGVjayh0aGlzQXJnKSkge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXNBcmcudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgndGhpcy4nKSkge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXM7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSg1KTtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpcykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXcuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ14nKSAmJiBFbHZpc18xLmVfKHRoaXMubG9vcFBhcmVudCkudmlld01vZGVsICYmIHR5cGVvZiBFbHZpc18xLmVfKHRoaXMubG9vcFBhcmVudCkudmlld01vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gTm90ZTogTm90IGRvaW5nIGEgJ14nIGJ5IGl0c2VsZiBiZWNhdXNlIHRoYXQncyBhIHByZXR0eSBCUyBjYXNlLiBJZiB0aGlzIGlzIHRoZSBsb29wIGNoaWxkLCB0aGUgcGFyZW50IGlzIHByb2JhYmx5XG4gICAgICAgICAgICAvLyBhbiBvYmplY3Qgb3IgYW4gaXRlcmFibGUsIG5vdCByZWFsbHkgc29tZXRoaW5nIHlvdSdsbCByZWFkIG9yIHdyaXRlIHRvIGRpcmVjdGx5LlxuICAgICAgICAgICAgLy8gTWlnaHQgZG8gYSBzaG9ydGN1dCB0byB0aGUgcGFyZW50IGNvbXBvbmVudCdzICd0aGlzJ1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXMubG9vcFBhcmVudC52aWV3TW9kZWw7XG4gICAgICAgICAgICBpZiAoIShuYW1lLnNsaWNlKDEpIGluIHRoaXNBcmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlld01vZGVsIHBhcmVudCB2aWV3IG1vZGVsLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmdbbmFtZS5zbGljZSgxKV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzQXJnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlld01vZGVsLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ09OU0lERVI6IENvbnNpZGVyIGFkZGluZyBjdXN0b20gYXR0cmlidXRlcyB0byBhbGxvdyBleGVjdXRpbmcgbWV0aG9kIHdpdGggc3RyaW5nIHBhcmFtZXRlcnMuIGk1X3BhcmFtMDE9XCJ2YWwgMVwiLCBpNV9wYXJhbTAyPVwidmFsIDJcIlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5jYWxsKHRoaXNBcmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJlcGwgb2YgdGhpcy5fcmVwbGFjZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHJlcGwuc291cmNlLCByZXBsLm5vZXNjYXBlKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXBsLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRlbnQuYXR0cmlidXRlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLnZhbHVlIHx8IGYubmFtZSA9PT0gJ2k1X2lucHV0JyB8fCBmLm5hbWUgPT09ICc6aW5wdXQnKVxuICAgICAgICAgICAgLm1hcChtID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBtLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbS52YWx1ZSB8fCAnJ1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFRlY2huaWNhbGx5IGl0J3MgaW52YWxpZCB0byBhZGQgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gcmVndWxhciBlbGVtZW50cywgc28gdGVjaG5pY2FsbHkgPHJlcGxhY2UtbWUgOnN3aXRjaDpyZWR0ZXh0PVwid2FybmluZ1wiPlxuICAgICAgICAvLyBpcyBsZWdhbCBidXQgaWYgaWYgaXQgd2VyZSBhIGRpdiwgdGhhdCB3b3VsZCBiZSBpbGxlZ2FsLiBTbyB3ZSdsbCBhbGxvdyA8ZGl2IGRhdGEtaTVfc3dpdGNoX3JlZHRleHQ9XCJ3YXJuaW5nXCI+LlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIHdlaXJkIG5hbWUgaGFuZGxpbmcgb2YgZGF0YSBhdHRyaWJ1dGVzIGNvdWxkIGJyZWFrIHlvdXIgY29kZSBpZiB5b3UgdHJ5IHRvIHVzZSB0aGlzLiBZb3UgbWF5IG5lZWQgdG8gZG8gZXh0cmFcbiAgICAgICAgLy8gd29yayB0byBtYWtlIHlvdXIgY29kZSB3b3JrLCBhbGwgaW4gdGhlIG5hbWUgb2Ygc3RyaWN0IGFkaGVyZW5jZSB0byBzdGFuZGFyZHMuIEl0J3MgdXAgdG8geW91LlxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5jb250ZW50LmRhdGFzZXQpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGVudC5kYXRhc2V0W2F0dHJdO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IGF0dHIgPT09ICdpNV9pbnB1dCcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QXR0cmlidXRlcy5wdXNoKHsgbmFtZTogYXR0ciwgdmFsdWU6IHZhbHVlIHx8ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0SHRtbFNldCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgY3VycmVudEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9wYXJzZUF0dHJpYnV0ZU5hbWUocHJvcC5uYW1lKTtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gUmVndWxhciBhdHRyaWJ1dGVzIHdpbGwgYWxsIG1hdGNoIHRoaXMuXG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHRoaXMuX25hbWUgfHwgcHJvcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQm9vbGVhbkF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYXR0clwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENzc0NsYXNzU3dpdGNoKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXY+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12IG5vZXNjYXBlPiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0dHJpYnV0ZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eShwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzU3R5bGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzQ2xhc3MocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBmYWxsIHRocm91Z2gsIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYXR0cmlidXRlIGFzIGEgdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlVGFyZ2V0KHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIGJhc2UgY29udGVudCBmb3IgdGhlIGxvb3AsIHB1bGxpbmcgaXQgb3V0IG9mIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9vcChwcm9wLnZhbHVlLCBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQodGhpcy5jb250ZW50KSwgdHlwZS5kZXRhaWwgPT09ICdudWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2VkIGFzIGEgc2VsZWN0b3IuIEhhcyBubyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZCBJY2hpZ28gYXR0cmlidXRlOiBcIiArIHR5cGUudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZlcklmTmVlZGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgcHJvcC52YWx1ZS5zdGFydHNXaXRoKCd0aGlzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJzZUF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICAgIC8vIEdlbmVyYWwgaWNoaWdvIHNob3J0Y3V0XG4gICAgICAgICAgICBuYW1lID0gJ2k1XycgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9pdGVtJykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIGluZGljYXRlIGFuIGl0ZW0gY29tcG9uZW50LCBub3RoaW5nIGVsc2UuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X2V2ZW50Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIG9ubHkgaW4gQ29tcG9uZW50LmFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5hbWUuc3RhcnRzV2l0aCgnaTVfJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9hdHRyJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnYXR0cicsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYm9vbCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nICYmIG5hbWVbN10gIT09ICctJyAmJiBuYW1lWzddICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs3XSA9PT0gJy0nIHx8IG5hbWVbN10gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA3KSArIG5hbWUuc2xpY2UoOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2Jvb2xOZWdhdGl2ZScgOiAnYm9vbCcsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfc3dpdGNoJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbOV0gIT09ICc6JyAmJiBuYW1lWzldICE9PSAnXycgJiYgbmFtZVs5XSAhPT0gJy0nICYmIG5hbWVbOV0gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzd2l0Y2ggYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzldID09PSAnLScgfHwgbmFtZVs5XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDkpICsgbmFtZS5zbGljZSgxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCAxMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsYXNzIHN3aXRjaCBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnc3dpdGNoQ2xhc3NOZWdhdGl2ZScgOiAnc3dpdGNoQ2xhc3MnLCBkZXRhaWw6IG5hbWUuc2xpY2UoMTApIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pZicpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJy0nIHx8IG5hbWUuc2xpY2UoLTEpID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdpZk5lZ2F0aXZlJyA6ICdpZicgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2xvb3AnKSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdpNV9sb29wOm51bGwnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnLCBkZXRhaWw6ICdudWxsJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV90YXJnZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICd0YXJnZXQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaW5wdXQnKSkge1xuICAgICAgICAgICAgY29uc3QgdHdvV2F5ID0gbmFtZS5lbmRzV2l0aCgnX3ZhbHVlJykgfHwgbmFtZS5lbmRzV2l0aCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICdpbnB1dCcsIGRldGFpbDogdHdvV2F5ID8gJzJ3YXknIDogJycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdHlwZTogbmFtZS5zbGljZSgzKSB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQm91bmRDb21wb25lbnQgPSBCb3VuZENvbXBvbmVudDtcbi8vIFVzZSBhIGN1c3RvbSBlbGVtZW50IHRvIGNyZWF0ZSBhIHJlcGxhY2VtZW50IHRhZyB0aGF0IGlzIG5vdCBsaW1pdGVkLCBhcyBzcGFuIGlzLCB0byBjb250YWluaW5nIG5vIGJsb2NrIGVsZW1lbnRzLlxuLy8gTm8gbG9naWMsIG5vIHNwZWNpYWwgZGlzcGxheSBkZXRhaWxzLlxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuZXhwb3J0cy5UZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgPSBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudE1hcFwiKTtcbi8qKlxuICogQSBjbGFzcyB3aXRoIGEgY29udGVudCBwcm9wZXJ0eSB0aGF0IHBvaW50cyB0byBzb21ldGhpbmcgb24gdGhlIHBhZ2UsIGFsb25nIHdpdGggc29tZSBvZiBoZWxwZXIgbWV0aG9kcy5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgYXMgYSBiYXNlIGNsYXNzIGZvciBvdGhlciBjbGFzc2VzLCBzbyBpdCdzIG1hcmtlZCBhYnN0cmFjdC4gSXQganVzdCBkb2Vzbid0XG4gKiBtYWtlIHNlbnNlIHRvIG1lIHRvIGNyZWF0ZSBDb21wb25lbnQgd2l0aCBub3RoaW5nIGN1c3RvbWl6ZWQuIEp1c3QgY3JlYXRlIGFuIEhUTUxFbGVtZW50LiBUaGUgaGVscGVycyBhcmVuJ3QgcmVhbGx5XG4gKiB0aGF0IGltcHJlc3NpdmUsIHdoZW4geW91IGNvbnNpZGVyIHRoYXQgdGhlIHRyYWRlb2ZmIGlzIGhhdmluZyB0byByZWZlcmVuY2Ugb2JqLmNvbnRlbnQgdG8gbW9kaWZ5IHRoZSBET00uXG4gKi9cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGRvZXNuJ3QgdW5kZXJzdGFuZCB0aGF0IHRoaXMuY29udGVudCBpcyBzZXQgaW4gQUxMIG9mIHRoZSBwcml2YXRlIGN0b3IgZnVuY3Rpb25zLlxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICBpZiAoYXJncyAmJiB0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIF9jdG9yX3N0cmluZy5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5uZXJIdG1sKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihhcmdzLnByb3BlcnRpZXMgfHwge30sIHsgaW5uZXJIVE1MOiBhcmdzLmlubmVySHRtbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2xvb2t1cC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICBfY3Rvcl9lbXB0eS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5uZXJIdG1sKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihhcmdzLnByb3BlcnRpZXMgfHwge30sIHsgaW5uZXJIVE1MOiBhcmdzLmlubmVySHRtbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2V4aXN0aW5nRWxlbWVudC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3Mub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBfY3Rvcl9vdXRlckh0bWwuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF9jdG9yX2lubmVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoZWNrSW5saW5lRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgLy8gQW5ndWxhciBtYXRlcmlhbCBkb2VzIHNvbWV0aGluZyBsaWtlIHRoaXMuIEluIHRoaXMgY2FzZSwgdGhlcmUncyBubyBmdW5jdGlvbmFsaXR5IGJlaGluZCBpdCwgYnV0IGl0IGRvZXMgbWFrZSBpdFxuICAgICAgICAvLyB1c2VmdWwgZm9yIGEgZGV2ZWxvcGVyIHRvIHNlZSB0aGF0IGFuIGVsZW1lbnQgaXMgYSBjb21wb25lbnQgYW5kIHdoYXQgdHlwZSBpdCBpcy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNuYWtlX2Nhc2UgPSAnaXZfJyArIHRoaXMuY29uc3RydWN0b3IubmFtZS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHRoaXMuY29uc3RydWN0b3IubmFtZS5zbGljZSgxKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFcrL2csICcgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFthLXpdKShbQS1aXSkoW2Etel0pL2csIFwiJDEgJDIkM1wiKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgvXFxCKD89W0EtWl17Mix9KS8pXG4gICAgICAgICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgLmpvaW4oJ18nKVxuICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShzbmFrZV9jYXNlLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBoYXMgc29tZSB3ZWlyZCBuYW1lLCBubyBwcm9ibGVtLiBUaGlzIGlzIGp1c3QgYW4gaW5mbyBmaWVsZCBhbnl3YXkuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBDb21wb25lbnQoKTtcbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfZW1wdHkoKSB7XG4gICAgICAgICAgICAvLyBObyBhcmd1bWVudHNcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgZmluZSBhcyBsb25nIGFzIFRFbGVtZW50IGlzIERJVi4gTm8gd2F5IHRvIHZlcmlmeSB0aGF0IGFzIGl0J3MgYSB0eXBlc2NyaXB0IGlsbHVzaW9uLiBKUyBkb2Vzbid0IHNlZSB0eXBlIHBhcmFtZXRlcnMuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlkOiBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfbG9va3VwKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIGV4aXN0aW5nRWxlbWVudC5cbiAgICAgICAgICAgIC8vIFRoZSBtYWluIHJlYXNvbiBpdCBleGlzdHMgaXMgdGhhdCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBkb2Vzbid0IHJldHVybiB0aGUgY29ycmVjdCB0eXBlIChpdCdzIG5vdCBnZW5lcmljKSxcbiAgICAgICAgICAgIC8vIHNvIHR5cGVzY3JpcHQgZnJlYWtzIG91dCBhbmQgdGhpbmtzIGl0IHNob3VsZCBiZSBhIFNUUklORywgaW4gc3BpdGUgb2YgdGhlIHR5cGUgZGVmaW5pdGlvbiBub3QgYmVpbmcgYW55dGhpbmdcbiAgICAgICAgICAgIC8vIGxpa2UgdGhhdC4gSXQncyBqdXN0IGVhc2llciB0byB1c2UgdGhpcyB0aGFuIHRvIHJlbWVtYmVyIFwib2gsIHJpZ2h0LCBpIGhhdmUgdG8gdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKSwgd2hpY2ggaXMgZ2VuZXJpY1wiLlxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IChleGlzdGluZ0VsZW1lbnQucGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKGV4aXN0aW5nRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgc2VsZWN0b3IgY291bGQgbm90IGZpbmQgZWxlbWVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbmFzdHkgYnV0IGl0IG1ha2VzIFR5cGVTY3JpcHQgaGFwcHkgd2l0aG91dCBjcmVhdGluZyBhIG5ldyBvYmplY3QgY29weVxuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9leGlzdGluZ0VsZW1lbnQoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBleGlzdGluZ0VsZW1lbnQuZWxlbWVudDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHIsIGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9pbm5lckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gTmV3IGVsZW1lbnQuIFVzZXIgc3BlY2lmaWVzIHRoZSBpbm5lciBIVE1MIGZvciB0aGUgY29udGVudC5cbiAgICAgICAgICAgIC8vIFRoaXMgY291bGQgYmUgYW4gZW1wdHkgb2JqZWN0IGxpa2Uge30sIHByYWN0aWNhbGx5IHRoZSBzYW1lIGFzIGNhbGxpbmcgaXQgd2l0aCBubyBhcmdzXG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHsgaW5uZXJIVE1MOiBuZXdFbGVtZW50LmlubmVySHRtbCB8fCAnJyB9O1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcywgbmV3RWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnQudHlwZSB8fCBFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBwcm9wcywgbmV3RWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbnRlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3Jfb3V0ZXJIdG1sKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZXIgc3BlY2lmaWVzIHRoZSBmdWxsIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGl0IGNhbid0IGJlIHR5cGUgY2hlY2tlZC4gSlMgY2FuJ3Qgc2VlIHdoYXQgVEVsZW1lbnQgaXMuXG4gICAgICAgICAgICBjb25zdCB0bXBkaXYgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG5ld0VsZW1lbnQub3V0ZXJIdG1sLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAodG1wZGl2LmNoaWxkTm9kZXMubGVuZ3RoICE9PSAxIHx8ICF0bXBkaXYuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGVySHRtbCBtdXN0IGNvbnRhaW4gZXhhY3RseSBvbmUgSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhuZXdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3RWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50LCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3BlY2lmaWVkIElEIHRha2VzIHByZWNlZGVuY2VcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9zdHJpbmcobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU3RyaW5nIGJ5IGl0c2VsZiBpcyBhIHNob3J0Y3V0IGZvciBvdXRlckh0bWxcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIHsgb3V0ZXJIdG1sOiBuZXdFbGVtZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqXG4gICAgICogSXQgZG9lc24ndCBoYXZlIHRvIGJlIGEgY3VzdG9tIHRhZy4gSXQgY291bGQgYmUgYSBjbGFzcywgbGlrZSA8cCBjbGFzcz0nYmluZC10by1tb2RlbFwiPiAoc2VsZWN0b3I9Jy5iaW5kLXRvLW1vZGVsJylcbiAgICAgKiBvciA8cCBpY2hpZ28+IChzZWxlY3Rvcj0nW2ljaGlnb10nKS5cbiAgICAgKlxuICAgICAqIFRvIGNvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgZWxlbWVudCAoY29weWluZyBleGlzdGluZyBhdHRyaWJ1dGVzKSBzZW5kIHRoZSByZWxldmFudCBvcHRpb25zLCBwbHVzIHtyZXBsYWNlOiB0cnVlfS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZWxlbWVudCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGVsZW1lbnQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdChzZWxlY3Rvciwgb3B0LCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyBfaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBjb25zdCBjb250YWluZXJzID0gdGhpcy5fbG9va1VwQ29udGFpbmVyc1RvSW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLnBhcmVudCk7XG4gICAgICAgIGZvciAoY29uc3QgY29udGFpbmVyIG9mIGNvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJlcGxhY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBDYW4ndCBoYXZlIGR1cGUgSURzIGJlaW5nIGNyZWF0ZWQgaWYgdGhlcmUgYXJlIG11bHRpcGxlIGNvbnRhaW5lcnMuIFRoZXJlIGFyZSAzIHBsYWNlcyB3aGVyZSBJRCBjYW4gYmUgc2V0LlxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuaWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgncHJvcGVydGllcycgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMucHJvcGVydGllcy5pZDsgLy8gRE9NIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCdhdHRyaWJ1dGVzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5hdHRyaWJ1dGVzLmlkOyAvLyBIVE1MIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXBsYWNlckZ1bmN0aW9uKGNvbnRhaW5lcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNvbnZlcnRlckZ1bmN0aW9uKGNvbnRhaW5lcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBzdGF0aWMgX21lcmdlUHJvcGVydGllc0FuZEF0dHJpYnV0ZXMoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIFRoaXMgYXR0ZW1wdHMgdG8gcHJlc2VydmUgdGhlIGF0dHJpYnV0ZXMgc2V0IG9uIHRoZSByZXBsYWNlZCBlbGVtZW50LiBUaGF0IG9wZW5zIGFuIHVnbHkgY2FuIG9mIHdvcm1zLFxuICAgICAgICAvLyBidXQgaXQgc2hvdWxkIG1ha2UgcmVwbGFjZW1lbnQgY29tcG9uZW50cyBtb3JlIHVzZWZ1bCBiZWNhdXNlIGl0IGFsbG93cyB0aGVtIHRvIHZhcnkuXG4gICAgICAgIC8vIEl0IGRvZXMgbWFrZSBhIGJydXRhbCBqdWdnbGluZyBhY3Q6XG4gICAgICAgIC8vIElmIHRoZSBleGlzdGluZyBlbGVtZW50IGhhcyBpbm5lckhUTUwsIHdlIHdhbnQgdG8gdGFrZSBpdC5cbiAgICAgICAgLy8gSWYgb3V0ZXJIVE1MIGlzIHByb3ZpZGVkLCB0aGUgb3V0ZXJIVE1MJ3MgaW5uZXJIVE1MIHNob3VsZCBvdmVycmlkZSB0aGUgZXhpc3RpbmcgZWxlbWVudCdzLlxuICAgICAgICAvLyBJZiB0aGUgZXhpc3RpbmcgZWxlbWVudCBoYXMgYXR0cmlidXRlcywgd2Ugd2FudCB0byB0YWtlIHRoZW0uXG4gICAgICAgIC8vIElmIG91dGVySFRNTCBpcyBwcm92aWRlZCwgdGhlIG91dGVySFRNTCdzIGF0dHJpYnV0ZXMgc2hvdWxkIG92ZXJyaWRlIHRoZW0uXG4gICAgICAgIC8vIEZvciBhbnkgYXR0cmlidXRlcyBwYXNzZWQgaW4gT1BUSU9OUywgdGhleSBzaG91bGQgb3ZlcnJpZGUgYW55dGhpbmcgdGhhdCBjYW1lIGJlZm9yZS5cbiAgICAgICAgLy8gRm9yIGFueSBwcm9wZXJ0aWVzIHBhc3NlZCBpbiBPUFRJT05TLCB0aGV5IHNob3VsZCBvdmVycmlkZSBhbnl0aGluZyB0aGF0IGNhbWUgYmVmb3JlLlxuICAgICAgICAvLyBPbmx5IHRoZSBsYXN0IDIgYXJlIGhhbmRsZWQgaW4gdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci4gQW5kIGlmIHdlJ3JlIG5vdCBjYXJlZnVsLCB3ZSBjb3VsZCBicmVhayB0aGVtLlxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0geyBpbm5lckhUTUw6IGV4aXN0aW5nRWxlbWVudC5pbm5lckhUTUwgfTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbShleGlzdGluZ0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXNbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIC8vIFRoaXMgaXMgdWdseSBiZWNhdXNlIGl0IGhhcHBlbnMgYWdhaW4gaW4gdGhlIGNvbnN0cnVjdG9yLiBObyBvdGhlciBjbGVhbiB3YXkgdG8gcGFyc2UgdGhlIGVsZW1lbnQgYXR0cmlidXRlcywgdGhvdWdoLlxuICAgICAgICBpZiAob3B0Lm91dGVySHRtbCkge1xuICAgICAgICAgICAgY29uc3QgdG1wID0gQ3JlYXRlRWxlbWVudF8xLmRpdihvcHQub3V0ZXJIdG1sLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAodG1wLmNoaWxkTm9kZXMubGVuZ3RoICE9PSAxIHx8ICF0bXAuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGVySHRtbCBtdXN0IGNvbnRhaW4gZXhhY3RseSBvbmUgSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRtcDIgPSB0bXAuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICAvLyBUaGUgb3V0ZXIgSFRNTCBhdHRyaWJ1dGVzIGdldCBwaWNrZWQgdXAgYXV0b21hdGljYWxseSB3aGVuIGFkZGVkIHRvIHRoZSBET00sIHNvIHdlIHJlYWxseVxuICAgICAgICAgICAgLy8ganVzdCBuZWVkIHRvIGRpc2NhcmQgdGhlIG1hdGNoaW5nIHByb3BlcnRpZXMgYW5kIGF0dHJpYnV0ZXMgb2YgdGhlIGV4aXN0aW5nIGVsZW1lbnQuXG4gICAgICAgICAgICBkZWxldGUgcHJvcGVydGllcy5pbm5lckhUTUw7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgQXJyYXkuZnJvbSh0bXAyLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIubmFtZSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzW2F0dHIubmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9wdC5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCBvcHQucHJvcGVydGllcyk7XG4gICAgICAgIG9wdC5hdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzLCBvcHQuYXR0cmlidXRlcyk7XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfVxuICAgIHN0YXRpYyBfZ2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGxldCBvcHQ7XG4gICAgICAgIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIHJlcGxhY2luZyB0aGUgb3V0ZXIgSFRNTFxuICAgICAgICAgICAgb3B0ID0geyByZXBsYWNlOiB0cnVlLCBvdXRlckh0bWw6IG9wdGlvbnMgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBUeXBlc2NyaXB0IGRvZXNuJ3Qga25vdyB0aGF0IG9wdGlvbnMgIT09ICdzdHJpbmcnIChjYW4ndCByZWFkIFwiZWxzZSBpZlwiIGNsYXVzZSlcbiAgICAgICAgICAgIG9wdCA9IG9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHQgPSB7IHJlcGxhY2U6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjb21wb25lbnQuY29udGVudCwgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlcGxhY2VDaGlsZChjb21wb25lbnQuY29udGVudCwgZXhpc3RpbmdFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50V2l0aENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX21lcmdlUHJvcGVydGllc0FuZEF0dHJpYnV0ZXMoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gbmV3IGNvbnN0cnVjdG9yKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0NvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3IoeyBlbGVtZW50OiBleGlzdGluZ0VsZW1lbnQgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBfbG9va1VwQ29udGFpbmVyc1RvSW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgcGFyZW50KSB7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSSd2ZSBkb25lIHRoaXMgbXlzZWxmLCB3aGljaCByZXN1bHRzIGluIGEgc2lsZW50IGZhaWx1cmUgaWYgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luamVjdGlvbiBzZWxlY3RvciBpcyBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJ1tpY2hpZ29dJztcbiAgICAgICAgLy8gTG9vayB1cCB0aGUgZWxlbWVudHMgdG8gZWl0aGVyIHJlcGxhY2Ugb3IgY29udmVydFxuICAgICAgICBsZXQgY29udGFpbmVycztcbiAgICAgICAgaWYgKHBhcmVudCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBbc2VsZWN0b3JdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJzO1xuICAgIH1cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaWQ7XG4gICAgfVxuICAgIHNldCBpZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGlubmVySFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuICAgIHNldCBpbm5lckhUTUwodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIFdpbGwgcmV0dXJuIHVuZGVmaW5lZCBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICByZXR1cm4gRm9ybUZpZWxkVmFsdWVfMS5nZXRGb3JtRmllbGRWYWx1ZSh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLy8gV2lsbCBsb2cgYSB3YXJuaW5nIGlmIGNvbnRlbnQgaXMgbm90IGEgZm9ybSBmaWVsZCB0eXBlXG4gICAgICAgIEZvcm1GaWVsZFZhbHVlXzEuc2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldCBjbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lO1xuICAgIH1cbiAgICBzZXQgY2xhc3NOYW1lKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc0xpc3Q7XG4gICAgfVxuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5zdHlsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIEhUTUwgZXZlbnQgbGlzdGVuZXIgb24gdGhlIENvbXBvbmVudCBjb250ZW50LiBGbHVlbnQuXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIHRoZSBIVE1MIGZvciBpNV9ldmVudCBvciA6ZXZlbnQgYXR0cmlidXRlcyBhbmQgYWRkIGV2ZW50IGxpc3RlbmVycyBhY2NvcmRpbmcgdG8gaW5saW5lIGN1c3RvbSBhdHRyaWJ1dGVzLlxuICAgICAqIEZpbHRlciBieSBtYXRjaGluZyB0aGUgY29tcG9uZW50RmlsdGVyIGlucHV0IHdpdGggYW4gYXR0cmlidXRlIGxpa2UgY29tcG9uZW50PVwiY29tcG9uZW50RmlsdGVyXCIuXG4gICAgICogRW5jbG9zZSB0aGUgZXZlbnQgdHlwZSBpbiBwYXJlbnRoZXNlcywgYW5kIGZvciB0aGUgdmFsdWUsIGVudGVyIHRoZSBuYW1lIG9mIGEgbWV0aG9kIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAqIEV4YW1wbGU6IDxmb3JtIDpldmVudCAoY2xpY2spPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKiBUaGlzIGlzIGFsc28gYWxsb3dlZDogPGZvcm0gOmV2ZW50IF9jbGlja189XCJzdWJtaXRUaGVGb3JtXCI+PC9mb3JtPlxuICAgICAqL1xuICAgIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHdlIGNvdWxkIHNraXAgdGhpcyBpbml0aWFsIGZpbHRlciwgbGlrZSBhbmd1bGFyIGRvZXMuIEJ1dCB0aGVyZSBpcyBubyBDU1Mgc2VsZWN0b3IgZm9yXG4gICAgICAgIC8vIGF0dHJpYnV0ZSBuYW1lIGJlZ2lucyB3aXRoIG9yIGVuZHMgd2l0aC4gW2F0dHJePV0gaXMgZm9yIHRoZSBWQUxVRSBiZWdpbm5pbmcgd2l0aCBzb21ldGhpbmcuXG4gICAgICAgIC8vIFRoaXMgaW5jbHVkZXMgdGhlIGNvbnRlbnQgaXRzZWxmIGluIGl0cyBjaGVjay5cbiAgICAgICAgZm9yIChjb25zdCBlbGUgb2YgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChbdGhpcy5jb250ZW50XSwgJ1tpNV9ldmVudF0sIFtcXFxcMDAwMDNBZXZlbnRdLCBbZGF0YS1pNV9ldmVudF0nKSkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudEZpbHRlciAmJiBlbGUuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gY29tcG9uZW50RmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWxlLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgbGV0IGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnKCcpICYmIGYubmFtZS5lbmRzV2l0aCgnKScpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgYnkgYWx0ZXJuYXRlIHN5bnRheC4gVGhpcyBvbmUgd29ya3MgYmV0dGVyIHdpdGggc2V0QXR0cmlidXRlKCkuXG4gICAgICAgICAgICAgICAgZXZlbnREZWZpbml0aW9uID0gY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZS5zdGFydHNXaXRoKCdfJykgJiYgZi5uYW1lLmVuZHNXaXRoKCdfJykgJiYgZi5uYW1lLmxlbmd0aCA+IDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldmVudERlZmluaXRpb24gfHwgIWV2ZW50RGVmaW5pdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgZGVmaW5pdGlvbiBub3QgZGVjbGFyZWQgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzW2V2ZW50RGVmaW5pdGlvbi52YWx1ZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlciBtZXRob2QgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9ICR7ZXZlbnREZWZpbml0aW9uLnZhbHVlfSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnREZWZpbml0aW9uLm5hbWUuc2xpY2UoMSwgLTEpLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZChuZXdDaGlsZCkge1xuICAgICAgICBpZiAoZ3VhcmQobmV3Q2hpbGQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kQ2hpbGQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZC5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICAgICAgaWYgKGd1YXJkKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgY29tcG9uZW50IHRvIENvbXBvbmVudE1hcC5cbiAgICAgKi9cbiAgICBtYXBDb21wb25lbnQoKSB7XG4gICAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBjb250ZW50IGhhcyBhbHJlYWR5IGJlZW4gcmVsYXRlZCB0byBhIGRpZmZlcmVudCBjb21wb25lbnRcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudCh0aGlzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnQgYWxyZWFkeSByZWZlcmVuY2VkIGJ5IGEgY29tcG9uZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KHRoaXMuY29udGVudCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGNvbXBvbmVudCBmcm9tIENvbXBvbmVudE1hcC4gU29tZXRpbWVzIHlvdSBtaWdodCBuZWVkIHRvIHVzZSB0aGlzLiBCdXQgaG9wZWZ1bGx5IHJhcmVseSwgYmVjYXVzZSBpdCdzIHVzaW5nIGEgV2Vha01hcCxcbiAgICAgKi9cbiAgICB1bm1hcENvbXBvbmVudCgpIHtcbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGNvbXBvbmVudHMgdGhhdCBhcmUgbmVzdGVkIGluc2lkZSB0aGlzIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICAqZ2V0QWxsQ2hpbGRDb21wb25lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50KGUpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRTdHlsZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIC8vIFRTIGp1c3QgZm9yZ290IHRoYXQgcHJvcGVydHkgaXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPi5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBwcm9wZXJ0eVtwcm9wXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgICAgICBpZiAoIWNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIiAmJiBjbGFzc05hbWVzLmluY2x1ZGVzKFwiIFwiKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMuc3BsaXQoXCIgXCIpLmZpbHRlcihxID0+IHEgIT09IFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmVjYXVzZSBhZGRJbmxpbmVFdmVudExpc3RlbmVycygpIHNlYXJjaGVzIGFsbCB0aGUgd2F5IGRvd24sIGludG8gbmVzdGVkIGNvbXBvbmVudHMsIGl0IGNhbid0IGJlIGNhbGxlZFxuICAgICAqIGJ5IGRlZmF1bHQuIEl0IGp1c3QgdGhyb3dzIGVycm9ycyBvbiBhbGwgYnV0IHNpbXBsZSB0ZXN0IGNhc2VzLiBCdXQgYmVjYXVzZSB0aGVzZSBldmVudHMgYWxtb3N0IGFsd2F5cyBleGlzdFxuICAgICAqIGludGVybmFsIHRvIHRoZSBjb21wb25lbnQgKGUuZy4gb24gYnV0dG9ucyksIGl0IGNhbid0IGJlIGxpbWl0ZWQuIFRoaXMgY2FuIGJlIGNvbmZ1c2luZyB3aXRob3V0IHNvbWUga2luZCBvZlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgX2NoZWNrSW5saW5lRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmICghd2luZG93Ll9fZXZlbnRfd2FybmluZ19fKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ0lubGluZSBldmVudCBsaXN0ZW5lcnMgYXJlIGNvbmZpZ3VyZWQuIFJlbWVtYmVyIHRvIGNhbGwgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKS4nKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuX19ldmVudF93YXJuaW5nX18gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWxldGUgd2luZG93Ll9fZXZlbnRfd2FybmluZ19fLCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoZSBxdWVzdGlvbiBuZWVkcyB0byBiZSBhc2tlZDogaWYgeW91IGNhbiBhZGQgYSBjb21wb25lbnQgdG8gYSBwYWdlIGJ5IGRvaW5nIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQpLFxuICogaG93IGRvIHlvdSBkbyBmcm9tIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKSBhbmQgZ2V0IHRvIGNvbXBvbmVudCwgbm90IGNvbXBvbmVudC5jb250ZW50PyBUaGlzIGlzIGhvdy5cbiAqXG4gKiB2YXIgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKSk7XG4gKlxuICogVGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyBDb21wb25lbnRNYXAuY29tcG9uZW50cy5zZXQoY29udGVudCwgY29tcG9uZW50KSBoYXMgYmVlbiBjYWxsZWQgYXQgc29tZSBwb2ludC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBhcHByb3ZlZCB3YXkgb2YgZG9pbmcgaXQuIEFub3RoZXIgcG9zc2libGUgc29sdXRpb24gd291bGQgYmUgdGhlIHVzZSBvZiBleHBhbmRvIHByb3BlcnRpZXMsXG4gKiBmb3IgZXhhbXBsZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykucmVsYXRlZENvbXBvbmVudCA9IGNvbXBvbmVudC4gVGhpcyB3b3JrcyBhbmQgaXQncyBzdXBlciBzaW1wbGUsXG4gKiBidXQgc2VlbXMgdG8gYmUgZnJvd25lZCB1cG9uIC4uLiBpdCBoYXMgYmVlbiBrbm93biB0byBjcmVhdGUgbWVtb3J5IGxlYWtzIGluIHRoZSBwYXN0LiBXZWFrTWFwIGlzIHRoZSBvYmplY3RcbiAqIHNwZWNpZmljYWxseSBjcmVhdGVkIGZvciB0aGlzIHVzZSBjYXNlLCBzbyB0aGF0IGlzIHVzZWQgaGVyZS5cbiAqXG4gKiBJZiBleHRlbnNpb24gbWV0aG9kcyBhcmUgbG9hZGVkLCB5b3UgY2FuIHVzZSB0aGUgZWxlbWVudC5nZXRDb21wb25lbnQoKSBzaG9ydGN1dC5cbiAqL1xuY2xhc3MgQ29tcG9uZW50TWFwIHtcbn1cbkNvbXBvbmVudE1hcC5jb21wb25lbnRzID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydHMuQ29tcG9uZW50TWFwID0gQ29tcG9uZW50TWFwO1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZWxlbWVudCk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDb21wb25lbnQgPSBnZXRDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZUNoZWNrKG9iaikge1xuICAgIC8vIE5vdCBhbiBleGhhdXN0aXZlIHRlc3QgYnV0IGl0J3MgdGhlIGltcG9ydGFudCBiaXQuXG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAnY2hhbmdlSGFuZGxlcicgaW4gb2JqICYmIG9iai5jaGFuZ2VIYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlQ2hlY2sgPSBvYnNlcnZhYmxlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuLyoqXG4gKiBDb21tb24gbG9naWMgYmV0d2VlbiB0aGUgZGlmZmVyZW50IG9ic2VydmFibGUgY2xhc3Nlcy4gVGhlc2UgaW1wbGVtZW50IElPYnNlcnZhYmxlLiBUaGUgaW52b2NhdGlvbiBpdHNlbGYgdmFyaWVzIGZyb20gY2xhc3MgdG8gY2xhc3MuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGZvcndhcmRUbywgYnViYmxlRnJvbSwgZGlzYWJsZUFzeW5jIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGlmIChkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcndhcmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBidWJibGVGcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWdEZWxlZ2F0ZShuYW1lKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgaGFzIGZvcmdvdHRlbiB0aGF0IEV2ZW50SGFuZGxlciBjYW4gYWNjZXB0IGFuIGFycmF5LlxuICAgICAgICAvLyBJbiBzcGl0ZSBpZiB0aGUgZmFjdCB0aGF0IHRoaXMgc2lnbmF0dXJlIGlzIGlkZW50aWNhbC5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci5zdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhlIGlucHV0J3MgZGVsZWdhdGUgdG8gdGhpcyBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pIHtcbiAgICAgICAgLy8gSm9pbiB0aGUgb3RoZXIgZXZlbnQgaGFuZGxlciB0byB0aGlzLCBzbyB0aGF0IHdoZW4gdGhpcyBpcyBpbnZva2VkLCBzbyBpcyB0aGUgb3RoZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKGZvcndhcmRUby5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoaXMgb2JqZWN0J3MgZGVsZWdhdGUgdG8gdGhlIGlucHV0IG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oYnViYmxlRnJvbSkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gZXZlbnRzIHJhaXNlZCBvbiB0aGUgb3RoZXIgaGFuZGxlciwgc28gdGhhdCB3aGVuIHRoYXQgaXMgaW52b2tlZCwgc28gaXMgdGhpc1xuICAgICAgICAvLyBUaGUgc2FtZSBhcyBmb3J3YXJkQ2hhbmdlRXZlbnRzVG8gZXhjZXB0IHRoYXQgdGhpcyBpcyB0aGUgdGFyZ2V0LCBub3QgdGhlIHNvdXJjZS5cbiAgICAgICAgYnViYmxlRnJvbS5zdWJzY3JpYmUodGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZVNlbmRlcihzZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcik7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwcm9iYWJseSBmcm93bmVkIHVwb24gKHNlZSBob3cgVFMgZG9lc24ndCBsaWtlIGl0KSwgYnV0IGl0J3MgdmFsaWQgSlMuXG4gICAgICogSXQncyBvbmx5IGludGVuZGVkIGZvciB0cm91Ymxlc2hvb3RpbmcsIG5vdCByZWFsIGxvZ2ljLiBUaGVyZSBhcmUgdGltZXMgd2hlbiB5b3UncmVcbiAgICAgKiB0cnlpbmcgdG8gaWRlbnRpZnkgZXhhY3RseSB3aGljaCBkZWxlZ2F0ZXMgYXJlIHN1YnNjcmliZWQsIGFuZCB0aGlzIGlzIHJlYWxseSBoYXJkIHdoZW5cbiAgICAgKiBub3RoaW5nIGhhcyBodW1hbi1yZWFkYWJsZSBuYW1lcy5cbiAgICAgKi9cbiAgICB0YWdEZWxlZ2F0ZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUuX3RhZyA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB4IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBcImNoYW5nZUhhbmRsZXJcIiAmJiB4ICE9PSBcInByaXZhdGVQcm9wZXJ0eTJcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdFt4XSA9IHRoaXNbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVCYXNlID0gT2JzZXJ2YWJsZUJhc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gT2JzZXJ2YWJsZVByb3BlcnR5IGlzIGEgcHJvcGVydHkgdGhhdCBhdXRvbWF0aWNhbGx5IHJhaXNlcyBhIFByb3BlcnR5Q2hhbmdlZCBldmVudCB3aGVuIGl0IGlzIG1vZGlmaWVkLiBUaGlzIGlzIG1vcmVcbiAqIGNvbnZlbmllbnQgdGhhbiBoYXZpbmcgdG8gZG8gaXQgbWFudWFsbHkgZXZlcnkgdGltZSB5b3UgbmVlZCBpdC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVByb3BlcnR5IGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IG9wdGlvbnMub25seVdoZW5DaGFuZ2VkIHx8IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkLCB2YWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgKGlmIGEgc3RyaW5nKSB0aGF0IGhhcyBoYWQgc3BlY2lhbCBIVE1MIGNoYXJhY3RlcnMgZXNjYXBlZC5cbiAgICAgKi9cbiAgICBnZXQgc2FmZVZhbHVlKCkge1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVQcm9wZXJ0eSA9IE9ic2VydmFibGVQcm9wZXJ0eTtcbmZ1bmN0aW9uIG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3QgbGlrZSB0aGlzIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGNoZWNraW5nIGlmIHZhbHVlIGlzIGEgc2V0dGVyLFxuICAgIC8vIGFuZCBpdCBpc24ndCwgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gY2hlY2suXG4gICAgLy8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpIGRvZXNuJ3QgY2F0Y2ggaW5oZXJpdGVkIHByb3BlcnRpZXMsIG9mXG4gICAgLy8gd2hpY2ggdGhpcyBpcyBhbG1vc3QgYWx3YXlzIG9uZS5cbiAgICAvLyBJIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGEgYmFzaWMgaW5zdGFuY2UgY2hlY2suXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlUHJvcGVydHk7XG59XG5leHBvcnRzLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrID0gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgQ2xvbmVEZWVwXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gb2JzZXJ2YWJsZSBzdGF0ZSB0aGF0IHNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIHVzaW5nIHRoZSByZWxldmFudCBtZXRob2RzLCBhbGxvd2luZyBhdG9taWMgY2hhbmdlcyB0byBtdWx0aXBsZSBwcm9wZXJ0aWVzXG4gKiBpbiBtdWx0aXBsZSBvYmplY3RzLCByYWlzaW5nIGEgc2luZ2xlIGV2ZW50LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlU3RhdGUgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnc2V0U3RhdGUnO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIEkgd291bGQgcHJlZmVyIHRoYXQgdGhpcyByZXR1cm4gUmVhZG9ubHk8VD4gYnV0IGdldHRlciBhbmQgc2V0dGVyIGhhdmUgdG8gYmUgdGhlIHNhbWUgdHlwZS5cbiAgICAgICAgLy8gVGhhdCBtZWFucyB5b3Ugd291bGQgaGF2ZSB0byBjYXN0IGFueSB2YWx1ZSB5b3Ugc2V0IGFzIGEgcmVhZG9ubHksIHdoaWNoIGlzIGEgUElUQS5cbiAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJ3cml0ZXMgdGhlIGVudGlyZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldFNhZmVWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRtcCkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodG1wKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0bXApKTtcbiAgICB9XG4gICAgZ2V0VmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIC8vIFRoZSBSZWFkb25seSB0eXBlIHdvcmtzIGZpbmUgYW5kIGl0J3MgZmFzdCAuLi4gaW4gdHlwZXNjcmlwdC5cbiAgICAgICAgLy8gSW4gamF2YXNjcmlwdCwgaWYgeW91IGp1c3QgcmV0dXJuIHRoZSB2YWx1ZSwgbm90aGluZyBwcmV2ZW50cyBpdCBmcm9tIGJlaW5nIGVkaXRlZC5cbiAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgc2V0U3RhdGUodmFsdWUsIG92ZXJXcml0ZUFsbCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlIGlzIHByaW1pdGl2ZSwgdGhlbiBhIGZ1bGwgb3ZlcndyaXRlIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbnMgd2lsbCBleGVjdXRlIGJ1dCB0aGV5IHdvbid0IGNoYW5nZSB0aGUgdmFsdWUuIFRoZSByZWFzb24gaXMgdGhlIHNhbWUgcmVhc29uIHRoYXQgdGhpcyBtYWtlcyBubyBwZXJtYW5lbnQgY2hhbmdlIHRvIGJhcjpcbiAgICAgICAgICAgIC8vIHZhciBmb28gPSBmdW5jdGlvbihzdHIpIHsgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7IH07IHZhciBiYXIgPSAnYWJjJzsgZm9vKGJhcik7IGNvbnNvbGUubG9nKGJhciA9PT0gJ2FiYycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgc2V0U3RhdGUgd2l0aCBhIGZ1bmN0aW9uIGlmIHN0YXRlIGlzIHByaW1pdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJXcml0ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJXcml0ZUFsbCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMV9vdmVyd3JpdGVBbGwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBbbmV3VmFsdWUsIHJldHVyblZhbHVlXSA9IF9vdnIzX2Z1bmN0aW9uQXJnLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBpcyBub3QgYSBwYXJ0aWFsIHN0YXRlIG9yIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjJfcGFydGlhbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHsgb2xkVmFsdWUsIG5ld1ZhbHVlLCByZXR1cm5WYWx1ZSB9O1xuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9vdmVyd3JpdGVBbGwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGVudGlyZSBvYmplY3QuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcChfdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMl9wYXJ0aWFsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gUGFydGlhbCBvYmplY3Q6IE92ZXJ3cml0ZSBvbmx5IHRoZSBrZXlzIHByb3ZpZGVkXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRtcFtrZXldID0gX3ZhbHVlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyM19mdW5jdGlvbkFyZyhfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGFuZCB1cGRhdGUgdGhlIG9iamVjdCBhcyBkaWN0YXRlZFxuICAgICAgICAgICAgLy8gTWF5YmUgdW5uZWNlc3NhcnkgYnV0IHdlIHdhbnQgdG8gYXZvaWQgdGhlIGNhbGxlciBleGZpbHRyYXRpbmcgdGhlIHN0YXRlIHVzaW5nIGEgZnVuY3Rpb24sXG4gICAgICAgICAgICAvLyBieSBhY2NpZGVudC4gT2YgY291cnNlLCB0aGV5IGNhbiBqdXN0IGFjY2VzcyBfdmFsdWUgYnkgY2FzdGluZyBhcyBhbnksXG4gICAgICAgICAgICAvLyBidXQgdGhhdCdzIG5vdCBhY2NpZGVudGFsLlxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IF9yZXR1cm5WYWx1ZSA9IF92YWx1ZS5jYWxsKHRtcCwgdG1wKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gW3RtcCwgX3JldHVyblZhbHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVN0YXRlID0gT2JzZXJ2YWJsZVN0YXRlO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVN0YXRlQ2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBrbm93IGlmIEkgc2hvdWxkIGNoZWNrIGZvciB0aGlzIG9yIGZvciBnZXRTdGF0ZSgpIGFuZCBzZXRTdGF0ZSgpXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGU7XG59XG5leHBvcnRzLm9ic2VydmFibGVTdGF0ZUNoZWNrID0gb2JzZXJ2YWJsZVN0YXRlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9EZWZlcnJlZFByb21pc2VcIik7XG4vKipcbiAqIFRoZSBwcm9taXNlIEFQSSBpcyBuaWNlLCBtb3N0bHksIGJ1dCB0aGUgbWFpbiB0aGluZyBwcmV2ZW50aW5nIHVzZSBvZiBhIHByb21pc2UgYXMgYW4gZXZlbnQgaGFuZGxlciBpcyB0aGF0XG4gKiBpdCBvbmx5IGV4ZWN1dGVzIG9uY2UuIEFmdGVyIHRoYXQgcG9pbnQsIGl0IGlzIHJlc29sdmVkLCBhbmQgdGhlcmUgaXMgbm8gd2F5IHRvIGZsaXAgaXQgYmFjay5cbiAqXG4gKiBUaGUgcmVwZWF0YWJsZSBwcm9taXNlIGtlZXBzIHRoZSBwcm9taXNlIEFQSSBhbmQgY3JlYXRlcyB0aGUgaWxsdXNpb24gdGhhdCB0aGUgcHJvbWlzZSBpcyByZXBlYXRlZCBieVxuICogcmVidWlsZGluZyB0aGUgY2hhaW4gZWFjaCB0aW1lLiBJdCdzIHJlYWxseSBhIGRlZmVycmVkIGZhY3RvcnkgYnV0IGl0IHByZXRlbmRzIHRvIGJlIGEgZGVmZXJyZWQuIEknbSBzdXJlXG4gKiB0aGlzIGhhcyBhIHBlcmZvcm1hbmNlIHBlbmFsdHkuXG4gKlxuICogWW91IHNob3VsZCBub3QgYXR0YWNoIGFjdHVhbCBwcm9taXNlcyBpbnRvIHRoZSB0aGVuKCkgY2hhaW4sIGJlY2F1c2UgdGhleSBjYW4ndCBiZSByZXBlYXRlZC4gVGhlIFByb21pc2UgdHlwZSBpc24ndFxuICogYWxsb3dlZCBidXQgdGhlcmUgYXJlIHdheXMgdG8gZ2V0IGFyb3VuZCB0aGUgVFMgY29tcGlsZXIuIFRoZSBUUyB0eXBlIGRlZmluaXRpb24gZm9yIFByb21pc2UgYW5kIFByb21pc2VMaWtlIGlzbid0XG4gKiBjb21wbGV0ZWx5IGNvcnJlY3QsIGFueXdheSwgc28gaXQncyBlYXN5IHRvIGdldCB1c2VkIHRvIHVzaW5nIHRoZSBhbnkgdHlwZSBhbmQgbWFrZSBicm9rZW4gY29kZS5cbiAqXG4gKiBZb3UgY2Fubm90IGFzeW5jL2F3YWl0IGEgcmVwZWF0YWJsZSBwcm9taXNlIGl0c2VsZiBidXQgeW91IGNhbiBhd2FpdCBhIHNpbmdsZSByZXNvbHV0aW9uLiBBc3luYy9hd2FpdCBpcyBzdWdhciB0aGF0XG4gKiBjcmVhdGVzIGEgcmVndWxhciwgbm9uLXJlcGVhdGFibGUsIHByb21pc2UuXG4gKi9cbmNsYXNzIFJlcGVhdGFibGVQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgb25VbmhhbmRsZWRFcnJvciwgLy8gVGhpcyBhZGRzIGEgY2FsbGJhY2sgYXQgdGhlIGVuZCAob3IgMm5kIGZyb20gdGhlIGVuZCwgc2VlIG5leHQgb3B0aW9uKVxuICAgIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlIC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICkge1xuICAgICAgICB0aGlzLm9uVW5oYW5kbGVkRXJyb3IgPSBvblVuaGFuZGxlZEVycm9yO1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjsgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC4gVXNlZnVsIGZvciBhc3luYy9hd2FpdCBjb2RlLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlIGZvbGxvd2luZyBzaG91bGQgd29yazpcbiAgICAvLyBjb25zdCByZXBlYXRhYmxlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlKCk7IGNvbnN0IHIgPSBhd2FpdCByZXBlYXRhYmxlLnJlc29sdmUoKTsgY29uc29sZS5sb2cocik7XG4gICAgcmVzb2x2ZShhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICByZWplY3QoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlamVjdChhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICAvLyBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay5cbiAgICB0aGVuKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbmZ1bGZpbGxlZDogb25mdWxmaWxsZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbnJlamVjdGVkOiBvbnJlamVjdGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhlIGZpcnN0IGlzIGFsd2F5cyBvbmZ1bGZpbGxlZCBhbmQgaXMgbmV2ZXIgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKCFjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIEZpcnN0IG9uZnVsZmlsbGVkIGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlID0gbmV3IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZShjYi5vbmZ1bGZpbGxlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oY2Iub25mdWxmaWxsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25yZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goY2Iub25yZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIE5vIGNhbGxiYWNrcywgbm90IGV2ZW4gdGhlIGRlZmF1bHQgZmlyc3Qgb25mdWxmaWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2godGhpcy5vblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVwZWF0YWJsZVByb21pc2UgPSBSZXBlYXRhYmxlUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBSZXR1cm4gZWxlbWVudHMgb2YgYXJyYXkgYSBsaW5lZCB1cCB3aXRoIGVsZW1lbnRzIG9mIGFycmF5IGIuIEJvdGggYXJyYXlzIGRvbid0IGhhdmUgdG8gYmUgdGhlIHNhbWUgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiB6aXAoYSwgYikge1xuICAgIGlmIChhLmxlbmd0aCA+PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbZWxlbWVudCwgYltpbmRleF1dKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFthW2luZGV4XSwgYl0pO1xuICAgIH1cbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLyoqXG4gKiBSZXR1cm4gYSBjYXJ0ZXNpYW4gam9pbiAoY3Jvc3Mgam9pbikgYmV0d2VlbiBhcnJheXMgYSBhbmQgYi5cbiAqL1xuZnVuY3Rpb24gY2FydGVzaWFuKGEsIGIpIHtcbiAgICAvLy8gdHlwZXNjcmlwdCBwcmV2ZW50cyBhIGRpcmVjdCB1c2Ugb2YgY29uY2F0LCBzbyBkbyB0aGlzIG1hbnVhbGx5IHdpdGggYSBsb29wXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5iLm1hcChxID0+IFtpdGVtLCBxXSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmV4cG9ydHMuY2FydGVzaWFuID0gY2FydGVzaWFuO1xuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhbmdlIG9mIGludGVnZXJzLCBjb3VudGluZyB1cCBieSAxLCBmb3IgdGhlIGdpdmVuIGxlbmd0aC4gU3RvbGVuIGZyb20gUHl0aG9uLlxuICovXG5mdW5jdGlvbiByYW5nZShsZW5ndGgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuZ3RoIH0sICh2YWx1ZSwga2V5KSA9PiBrZXkpO1xufVxuZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiBpdGVtcyBhbmQgb3RoZXIgYXJyYXlzLCBmbGF0dGVuIHRoZW0gb3V0IGludG8gYSBzaW5nbGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uKiB0cmF2ZXJzZShhcnIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICB5aWVsZCBhcnI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBhcnIpIHtcbiAgICAgICAgICAgIHlpZWxkKiB0cmF2ZXJzZShyb3cpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy50cmF2ZXJzZSA9IHRyYXZlcnNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlXCIpO1xuLyoqXG4gKiBBIGRlbGVnYXRlIG9iamVjdCBpcyB1c2VkIGJ5IHRoZSBFdmVudEhhbmRsZXIuIEl0IGNvbnRhaW5zIGVub3VnaCBpbmZvcm1hdGlvbiB0byBleGVjdXRlIGEgY2FsbGJhY2sgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25vdXNseVxuICogKHVzaW5nIGEgcHJvbWlzZSkuIEl0IGFsc28gYWRkcyBzb21lIHN0cmluZ3MgdG8gaGVscCBpbiB0cm91Ymxlc2hvb3RpbmcsIGJlY2F1c2Ugc2VhcmNoaW5nIGEgcmVjdXJzaXZlIGFycmF5IG9mIGNvbXBsZXggb2JqZWN0cyBjYW4gbWFrZVxuICogaXQgYSBiZWFyIHRvIGZpbmQgb3V0IHdoeSBhIGNhbGxiYWNrIGlzbid0IGJlaW5nIGV4ZWN1dGVkLlxuICovXG5jbGFzcyBEZWxlZ2F0ZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSW4gbWFueSBjYXNlcyAoZm9yIGV4YW1wbGUsIHdoZW4gdXNpbmcgZmF0IGFycm93IGZ1bmN0aW9ucyksIHRoaXNBcmcgaXNcbiAgICAgICAgLy8gbm90IG5lZWRlZC4gQnV0IGluIG1vc3Qgb3RoZXJzLCBpdCBpcyBhbiBhbm5veWluZyBidWcgdGhhdCByZXF1aXJlcyB0cm91Ymxlc2hvb3RpbmdcbiAgICAgICAgLy8gdG8gZmlndXJlIG91dCB3aGF0IHRoZSBjYWxsZXIgZm9yZ290LiBJJ3ZlIHdhdmVyZWQgYmV0d2VlbiBtYWtpbmcgaXQgcmVxdWlyZWQgYW5kIG5vdC5cbiAgICAgICAgaWYgKCF0aGlzQXJnKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZWxlZ2F0ZSBjcmVhdGVkIHdpdGhvdXQgdGhpc0FyZy4gRGlkIHlvdSBtZWFuIHRvPycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0JyAmJiAnY29uc3RydWN0b3InIGluIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPd25lck5hbWUgPSB0aGlzQXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHR5cGVzY3JpcHQgY29tcGlsZXIgc2hvdWxkIGhhbmRsZSB0aGlzIGNoZWNrIGJ1dCBjYW4ndCBhdCBydW50aW1lLlxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLmNhbGxiYWNrTmFtZSA9IGNhbGxiYWNrLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lICYmIHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLmNhbGxiYWNrT3duZXJOYW1lfS4ke3RoaXMuY2FsbGJhY2tOYW1lfSgpYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja05hbWUgKyAnKCknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tPd25lck5hbWUgKyAnLl9fbGFtYmRhX18oKSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlXzEuUmVwZWF0YWJsZVByb21pc2UoY2FsbGJhY2suYmluZCh0aGlzQXJnKSk7XG4gICAgfVxufVxuZXhwb3J0cy5EZWxlZ2F0ZSA9IERlbGVnYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgRGVsZWdhdGVfMSA9IHJlcXVpcmUoXCIuL0RlbGVnYXRlXCIpO1xuLyoqXG4gKiBJIGNob3NlIHRvIHVzZSBDIyBzdHlsZSBldmVudHMsIG5vdCBKUy9UUywgYmVjYXVzZSB0aGUgSlMvVFMgd2F5IG9mIGRvaW5nIGRlbGVnYXRlcy9jdXN0b20gZXZlbnRzIGlzIGEgTklHSFRNQVJFLiBTdXJlLFxuICogQ3VzdG9tRXZlbnQgd29ya3MsIGJ1dCBvbiB0aGUgVFMgc2lkZSB0aGUgY29kZSByZXF1aXJlZCB0byBtYWtlIFRTQyBoYXBweSB3aXRoIHZhbGlkIGphdmFzY3JpcHQgaXMgYXdmdWwgYW5kIG5vbi1pbnR1aXRpdmUuXG4gKiBPbiB0aGUgSlMgc2lkZSwgeW91IGhhdmUgdGhlIHByb2JsZW0gdGhhdCBldmVyeSBoYW5kbGVyIHBpY2tzIGl0IHVwLCBub3QganVzdCB0aGUgb25lcyB0aGF0IGFyZSBib3VuZCB0byB0aGUgcmVsZXZhbnQgSFRNTFxuICogZWxlbWVudCwgc28gZWxlbWVudHMgbmVlZCB0byBwYXNzIHRoZSBzb3VyY2UgYXMgYW4gYXJndW1lbnQgYW5kIGNoZWNrIGl0IChsaWtlIGpxdWVyeSBhbmQgJChkb2N1bWVudCkub24oKSkuXG4gKlxuICogQWZ0ZXIgZ2V0dGluZyBpdCB3b3JraW5nLCBhbGwgSSBjb3VsZCB0aGluayBhYm91dCB3YXMgaG93IGJhZCB0aGUgY29kZSB3YXMsIHNvIEkgcmV3cm90ZSBpdCBhdm9pZGluZyB0aGUgSlMgcGF0dGVybiBlbnRpcmVseS5cbiAqXG4gKiBUaGlzIGNhbiBiZSBzeW5jaHJvbm91cyAoY2FsbGJhY2tzKSBvciBhc3luY2hyb25vdXMgKHByb21pc2VzKS4gIFdoZW4gaXQgaXMgYXN5bmMsIHRoZSBjb2RlIGV4ZWN1dGVzIGFmdGVyIHRoZSBjdXJyZW50IHN5bmNocm9ub3VzXG4gKiBldmVudHMgcnVuIHRvIGNvbXBsZXRpb24uIFRoaXMgY291bGQgY3JlYXRlIGJ1Z3MgaW4gc3luY2hyb25vdXMgY29kZSwgYnV0IGlzIGJlc3QgZm9yIGJyb3dzZXIgZXZlbnRzLiBUaGlzIGhhbmRsZXIgaXMgcHJpbWFyaWx5IHVzZWQgZm9yXG4gKiBicm93c2VyIGV2ZW50cywgc28gYXN5bmMgaXMgZGVmYXVsdC5cbiAqXG4gKiBCdXQgaWYgeW91J3JlIHRyaWdnZXJpbmcgYXN5bmMgZXZlbnRzIGluIGNvZGUgYW5kIHN0ZXBwaW5nIHRocm91Z2ggaXQgaW4gQ2hyb21lLCB3aGF0IHlvdSBzZWUgd29uJ3QgbWFrZSBzZW5zZSwgYmVjYXVzZSB0aGUgYXN5bmNcbiAqIGV2ZW50cyB3b24ndCBvY2N1ciB1bnRpbCByaWdodCBhd2F5LiBJdCBjYW4gYmUgaGFyZCB0byB0cm91Ymxlc2hvb3QuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbmNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoX2Rpc2FibGVBc3luYyA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVBc3luYyA9IF9kaXNhYmxlQXN5bmM7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIElmIHRoaXMgcmVjZWl2ZXMgYSBkZWxlZ2F0ZSAod2hpY2ggaXMgYW4gYXJyYXkgb2YgZGVsZWdhdGVzKSwgYWRkIGl0LlxuICAgICAgICAvLyBXaGVuIHRoaXMgaXMgaW52b2tlZCwgdGhhdCBkZWxlZ2F0ZSB3aWxsIGFsc28gYmUgaW52b2tlZC5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBfb3ZyMV9kZWxlZ2F0ZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHb3QgYSBzaW5nbGUgY2FsbGJhY2tcbiAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBjYWxsYmFjay5cbiAgICAgICAgaWYgKHRoaXMuZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoOiB0cnVlIH0pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0RlbGUgPSBuZXcgRGVsZWdhdGVfMS5EZWxlZ2F0ZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChuZXdEZWxlKTtcbiAgICAgICAgLy8gSUYgdGhpcyBpcyBhc3luY2hyb25vdXMsIHJldHVybiB0aGUgcHJvbWlzZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAgICAgICAgLy8gQ2hhaW5pbmcgd29uJ3Qgd29yayBvbiBzeW5jIGNvZGUsIHNvIGRvIG5vdCBpbiB0aGF0IGNhc2UuXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3RGVsZS5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX2RlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGRlbGVnYXRlLlxuICAgICAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZmluZChxID0+IHEgPT09IGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChkZWxlZ2F0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxKSAmJiBxLmNhbGxiYWNrID09PSBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKSB7XG4gICAgICAgIC8vIEZpcnN0IHRyeSB0byB1bnN1YnNjcmliZSB0aGUgZGVmYXVsdCBkZWxlZ2F0ZS4gQ2FuJ3QgZG8gYW55dGhpbmcgaWYgaXQgaGFzIGEgZGlmZmVyZW50IG5hbWUsIHRob3VnaC5cbiAgICAgICAgaWYgKFwiZGVsZWdhdGVcIiBpbiBzZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVEZWxlZ2F0ZShzZW5kZXIuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5kZWxlZ2F0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSB0aGlzLmRlbGVnYXRlW2ldO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHEpICYmIHEudGhpc0FyZyA9PT0gc2VuZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5kZWxlZ2F0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSB0aGlzLmRlbGVnYXRlW2ldO1xuICAgICAgICAgICAgaWYgKHEgPT09IGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlKGFyZ3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgICAgIC8vIEFzeW5jIHZlcnNpb24uIERvZXMgbm90IHdvcmsgd2VsbCB3aXRoIHRoZSBjaHJvbWUgZGVidWdnZXIuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suY2FsbChsaXN0ZW5lci50aGlzQXJnLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2ggfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2gobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgdGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpOyAvLyBDbGVhcnMgdGhlIGRlbGVnYXRlXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB1bmRlZmluZWQ7IC8vIE1ha2VzIHN1cmUgdGhpcyBjYW4ndCBiZSB1c2VkIGFnYWluXG4gICAgfVxufVxuZXhwb3J0cy5FdmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRXZlbnQgYXJndW1lbnRzIGV4cGVjdGVkIG9uIGFueSBDaGFuZ2UgZXZlbnQuXG4gKi9cbmNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2YgY2hhbmdlIG9wZXJhdGlvbiAoc2V0LCBkZWxldGUpIChwb3RlbnRpYWxseSBtZXRob2QpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSAnJztcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgY29uc3RydWN0b3IgdGhhdCBpcyBuZXdhYmxlLlxuICogVEhJUyBDQU5OT1QgREVURUNUIEFOT05ZTU9VUyBDTEFTU0VTLiBTb3JyeSwgYnV0IEpTIGRvZXNuJ3QgaGF2ZSBhIG5vbi1kZXN0cnVjdGl2ZSB3YXlcbiAqIHRvIGNoZWNrIGlmIGFueSBmdW5jdGlvbiBpcyBhIGNvbnN0cnVjdG9yIG90aGVyIHRoYW4gdG8gdHJ5IHRvIG5ldygpIGl0IGFuZCBibG93IHVwL25vdCBibG93IHVwLlxuICogVGhpcyBmdW5jdGlvbiBkZXBlbmRzIG9uIHRoZXJlIGJlaW5nIGEgcHJvdG90eXBlIHdpdGggYSBuYW1lZCBjb25zdHJ1Y3Rvci5cbiAqL1xuZnVuY3Rpb24gY29uc3RydWN0b3JUeXBlR3VhcmQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmoucHJvdG90eXBlICYmIG9iai5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbn1cbmV4cG9ydHMuY29uc3RydWN0b3JUeXBlR3VhcmQgPSBjb25zdHJ1Y3RvclR5cGVHdWFyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIGtleXdvcmQgYXJndW1lbnRzLCBhcyBzZWVuIGluIFB5dGhvbiBhbmQgQyMuIEl0IG1ha2VzIGNvbmZpZ3VyYWJsZVxuICogZnVuY3Rpb25zIHNvIG11Y2ggcXVpY2tlciBhbmQgZWFzaWVyIHRoYW4gZmxhdCBhcmd1bWVudHMgKGZvcmNpbmcgeW91IHRvIHB1dCB1bmRlZmluZWQgbWFudWFsbHkgaW4gZGlmZmVyZW50XG4gKiBzbG90cykgb3Igb3B0aW9ucyBvYmplY3RzICh0YWtlcyBtb3JlIHRpbWUgdG8gcHJvZHVjZSwgZXNwZWNpYWxseSBpZiB5b3UgbmVlZCB0byBuZXcgaXQgdXApLlxuICpcbiAqIENhbGwgZnVuY3Rpb25zIGhhdmluZyBrZXl3b3JkIGFyZ3VtZW50cyB1c2luZyB0aGlzIHN5bnRheDpcbiAqIGNhbGxtZShhcmcxLCBhcmcyLCBrdygnc29tZXRoaW5nJywga3cxKSwga3coJ3NvbWV0aGluZ0Vsc2UnLCBrdzIpKVxuICpcbiAqIFRvIG1ha2UgdGhlbSB3b3JrLCBpbiB0aGUgZnVuY3Rpb24gaXRzZWxmLCB5b3UgbmVlZCB0byBjb3B5IGFuZCBwYXN0ZS4gRm9yIGV4YW1wbGU6XG4gKiAoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSA9IEt3YXJnLnBhcnNlKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0pKTtcbiAqL1xuY2xhc3MgS3dhcmcge1xuICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgaWYgKCFhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gYTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbWVtYmVyIHRoaXMgdGVtcGxhdGU6XG4gICAgICogKHsgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0pKTtcbiAgICAgKiBJbmNsdWRlIGRlZmF1bHQgdmFsdWVzIGluIHRoZSBmaXJzdCBvYmplY3QsIG5vdCB0aGUgc2Vjb25kLlxuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgdG8gY2FwdHVyZSByZXN0IHBhcmFtZXRlcnMsIHVzZSB0aGlzOlxuICAgICAqICh7ICRyZXN0JCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgLCAuLi5yZXN0IH0pKTtcbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IGFsbG93VW5rbm93bktleXdvcmQgdG8gYmUgdHJ1ZSwgdXNlIHRoaXM6XG4gICAgICogKHsgJCRrdyQkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9LCB0cnVlKSk7XG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlQXJncyhhcmdzLCBhbGxvd1Vua25vd25LZXl3b3JkID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB0aGlzIGNvdWxkIHRha2UgdGhlIGFyZ3VtZW50cyBvYmplY3QsIGJ1dCBzYWRseSBhcmd1bWVudHMgc3RvcmVzIG9ubHkgYW4gYXJyYXkgb2YgdmFsdWVzLFxuICAgICAgICAvLyBubyBrZXlzLiBJZiBKUyB3ZXJlIHNhbmUsIGl0IHdvdWxkIGJlIGEgTWFwLCBub3QgYW4gYXJyYXkuIFR3byBzdGVwcyBmb3J3YXJkLCBvbmUgc3RlcCBiYWNrLlxuICAgICAgICAvLyBQYXJzaW5nIHRoZSBzdHJpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uIGlzIG5vdCBteSBjdXAgb2YgdGVhLCBzbyBqdXN0IG5vLlxuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkgYXJndW1lbnQgb3JkZXJcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSBhcmdzW2FyZ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga3d2YXIgPSB7fTtcbiAgICAgICAgb2JqWyckJGt3JCQnXSA9IGt3dmFyO1xuICAgICAgICAvLyBDaGVjayBmb3IgcmVzdCBwYXJhbWV0ZXJzLlxuICAgICAgICAvLyBJIHdhcyBnb2luZyB0byBoYXZlIHRoaXMgb24vb2ZmIGNvbmZpZ3VyYWJsZSwgYnV0IGl0IHNob3VsZG4ndCBodXJ0IHBlcmZvcm1hbmNlLlxuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgb2JqWyckcmVzdCQnXSA9IGFycjtcbiAgICAgICAgLy8gUmVzdCBwYXJhbWV0ZXJzIGFyZSBzdG9yZWQgYXMgYXJyYXkga2V5cywgeyAnMCc6IGEsICcxJzogYiwgJ25vblJlc3QnOiAnc29tZXRoaW5nIGVsc2UnfVxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKS5maWx0ZXIoZiA9PiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhmKSkpIHtcbiAgICAgICAgICAgIGlmICghKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGFyZ3NbYXJnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5d29yZHNVc2VkID0ge307XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGtleXdvcmQgbmFtZVxuICAgICAgICAvLyBIYXZlIHRvIGl0ZXJhdGUgdGhlIGxpc3QgdHdpY2UsIHRvIGF2b2lkIHdpcGluZyBvdXQgZGF0YSBpZiB0aGUgb3JkZXIgaXMgc3dhcHBlZFxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gYXJnc1thcmddO1xuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd1Vua25vd25LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrd3Zhclt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBhbiB1bmV4cGVjdGVkIGtleXdvcmQgYXJndW1lbnQgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBrZXl3b3Jkc1VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgbXVsdGlwbGUgdmFsdWVzIGZvciBrZXl3b3JkIGFyZ3VtZW50ICsgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXl3b3Jkc1VzZWRbdG1wLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICAvLyBUdXJuIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGtleXdvcmQgYXJndW1lbnRzLlxuICAgIC8vIE5lZWRzIHRvIHJldHVybiBhbnlbXSBiZWNhdXNlIGl0J3MgZ29pbmcgdG8gYmUgc2hvdmVkIGludG8gYXJiaXRyYXJ5IGFyZ3VtZW50IGxpc3RzXG4gICAgc3RhdGljIHVucGFjayhhcmdzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChrdyhhcmcsIGFyZ3NbYXJnXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBpc01hdGNoKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBrZXk7XG4gICAgfVxufVxuZXhwb3J0cy5Ld2FyZyA9IEt3YXJnO1xuZnVuY3Rpb24ga3coYSwgYikge1xuICAgIGlmICghYSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGEsIGIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDJcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhWzBdLCBhWzFdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDNcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGggb25seSBvbmUga2V5L3ZhbHVlIHBhaXIuXG4gICAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSk7XG4gICAgICAgIGlmICghcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXAgb2JqZWN0OiBtdWx0aXBsZSBrZXlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhwcm9wc1swXSwgYVtwcm9wc1swXV0pO1xuICAgIH1cbn1cbmV4cG9ydHMua3cgPSBrdztcbmZ1bmN0aW9uIGt3YXJnc1RvT2JqZWN0KGFycikge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcnIpIHtcbiAgICAgICAgb3B0aW9uc1thcmcubmFtZV0gPSBvcHRpb25zW2FyZy52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuZXhwb3J0cy5rd2FyZ3NUb09iamVjdCA9IGt3YXJnc1RvT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpc05vbmUodGVzdCkge1xuICAgIHJldHVybiAodGVzdCA9PSBudWxsIHx8IHRlc3QgPT09IHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmlzTm9uZSA9IGlzTm9uZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY2xvbmVEZWVwKG9iaiwgaGFzaCA9IG5ldyBXZWFrTWFwKCkpIHtcbiAgICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgICAgICByZXR1cm4gb2JqOyAvLyBwcmltaXRpdmUgdHlwZXNcbiAgICB9XG4gICAgaWYgKGhhc2guaGFzKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGhhc2guZ2V0KG9iaik7IC8vIHJlZmVyZW5jZSB0byBvYmplY3QgcHJldmlvdXNseSBzZWVuXG4gICAgfVxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgU2V0KCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCB2YWwgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgKFtrZXksIHZhbF0pID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKGtleSwgaGFzaCksIGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBBcnJheS5mcm9tKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgb2JqLmZsYWdzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBUaGlzIGlzIGF3ZnVsIGNvZGUsIGJ1dCBpdCdzIHRoZSBvbmx5IHdheSB0byBjbG9uZSBhIHN0YW5kYWxvbmUgZnVuY3Rpb24gKHZzIGEgbWV0aG9kIHdoaWNoIGhhcyBhIGRlc2NyaXB0b3IpLlxuICAgICAgICAvLyBJbiBnZW5lcmFsLCB5b3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgY2xvbmVEZWVwIG9uIGZ1bmN0aW9ucy4gWW91J2xsIHNlZSBpdCdzIE5PVCB1c2VkIG9uIGludGVybmFsIG1ldGhvZHMuXG4gICAgICAgIHJlc3VsdCA9IG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBvYmoudG9TdHJpbmcoKSkoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBoYXNoLnNldChvYmosIHJlc3VsdCk7IC8vIEtlZXAgdHJhY2sgb2Ygb2JqZWN0cyBwcmV2aW91c2x5IGNsb25lZFxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiAhKGtleSBpbiByZXN1bHQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgbWV0aG9kcyB0aGF0IGFyZW4ndCBpbiB0aGUgcHJvdG90eXBlLlxuICAgICAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHJlY3Vyc2l2ZWx5IGZvbGxvdyBiZWNhdXNlIHRoZXJlJ3Mgbm90aGluZyByZWN1cnNpdmUgdG8gZG8uXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgaGFzaC5zZXQob2JqW2tleV0sIHJlc3VsdFtrZXldKTtcbiAgICAgICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIG1ldGhvZC5cbiAgICAgICAgICAgICAgICAvLyBJZiBleHRyYSBrZXlzIGFyZSB0aHJvd24gb250byBhIGZ1bmN0aW9uLCB0aGV5IHByb2JhYmx5IHdpbGwgbm90IGJlIGNsb25lZC5cbiAgICAgICAgICAgICAgICAvLyBJbiBteSBleHBlcmllbmNlLCBleHRyYSBrZXlzIG9uIGZ1bmN0aW9ucyBkaWRuJ3Qgd29yayByaWdodCwgc28gbm8gYmlnIGxvc3MuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgY3VzdG9tIGdldHRlcnMvc2V0dGVycy4gVGhlc2UgYXJlIGxvY2FsIGFuZCBob3BlZnVsbHkgd29yayBqdXN0IGxpa2UgbWV0aG9kcy5cbiAgICAgICAgICAgIC8vIEluIG1hbnkgY2FzZXMsIHRoaXMgaXMgcmVkdW5kYW50IHdpdGggT2JqZWN0LmNyZWF0ZSgpLCBidXQgaXMgbmVjZXNzYXJ5IHRvIGFsbG93IG9iamVjdHMgd2l0aCBtYW51YWxseS1hZGRlZCBjdXN0b20gZ2V0dGVycy5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIGdldHRlci9zZXR0ZXIuXG4gICAgICAgICAgICAvLyBBTFNPIGhhc2ggbm90IHVwZGF0ZWQ7IHRoaXMgaXMgbm90IHBvc3NpYmxlLCBiZWNhdXNlIGl0IHdpbGwgbWFwIHRoZSB2YWx1ZSBpdCBnZXRzLCBub3QgdGhlIGdldHRlci5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gY2xvbmVEZWVwKG9ialtrZXldLCBoYXNoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jbG9uZURlZXAgPSBjbG9uZURlZXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vVHlwZXMvTm9uZVR5cGVcIik7XG4vKipcbiAqIFJlY2VudCBUeXBlc2NyaXB0IGhhcyBhZGRlZCBhIG51bGwgY29hbGVzY2luZyBvcGVyYXRvciAoPy4sIGFrYSB0aGUgRWx2aXMgb3BlcmF0b3IpIGJ1dCBOUE0gaXNzdWVzXG4gKiBwcmV2ZW50IG1lIGZyb20gdXBncmFkaW5nLiAgQnV0IHRoaXMgcmV0dXJucyB1bmRlZmluZWQgaWYgeW91IGFjY2VzcyBhbnl0aGluZyB0aGF0IGRvZXNuJ3QgZXhpc3QuXG4gKlxuICogTmF0dXJhbGx5IHRoaXMgYnJlYWtzIFZTQ29kZSBpbnRlbGxpc2Vuc2UsIGJlY2F1c2UgaXQgcmV0dXJucyBhbnkuIE9ubHkgTVMgY2FuIGRvIGtlZXAgdGhlIHJpZ2h0IHR5cGUuXG4gKlxuICogSWYgeW91IGRvIHJldHVybiBhIHBhcnRpYWwgdmVyc2lvbiBvZiB0aGUgdHlwZSwgVFMgdGhyb3dzIGFuIGVycm9yIGJlY2F1c2UgaXQgY291bGQgYmUgbWlzc2luZyAodW1tLi4uIHRoYXQncyB3aGF0IFBhcnRpYWwgbWVhbnMuLi4pLlxuICpcbiAqIEEgdHJ1ZSBlbHZpcyBvcGVyYXRvciB3b3VsZCBhbHNvIHdvcmsgb24gc3RyaW5ncy9udW1iZXJzL2V0Yy4gVGhpcyBjYW5ub3QgZG8gdGhhdCwgYmVjYXVzZSBKUyBjYW4ndCB0ZWxsIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gYVxuICogbnVsbCBzdHJpbmcgYW5kIGEgbnVsbCBvYmplY3QuIE51bGwgaXMgbnVsbC5cbiAqL1xuZnVuY3Rpb24gZV8oaXRlbSkge1xuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZShpdGVtKSkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHJldHVybiBpdGVtO1xufVxuZXhwb3J0cy5lXyA9IGVfO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuLyoqXG4gKiBBIHBzZXVkby1yYW5kb20gcHJlZml4IHBsdXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIHRoZSB1bml4IGVwb2NoLiBUaGUgcmFuZG9tIHBhcnQgc2hvdWxkIGJlIHJhbmRvbSBlbm91Z2ggdG8gY292ZXJcbiAqIG11bHRpcGxlIGlkcyBjcmVhdGVkIGluIGEgbWlsbGlzZWNvbmQuXG4gKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZUlkKCkge1xuICAgIGNvbnN0IGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaLV8nO1xuICAgIGxldCByZXN1bHQgPSAndScgKyBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpICsgJy0nO1xuICAgIGZvciAoY29uc3QgXyBvZiBBcnJheVV0aWxpdGllc18xLnJhbmdlKDgpKSB7XG4gICAgICAgIHJlc3VsdCArPSBjaGFycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnMubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmdldFVuaXF1ZUlkID0gZ2V0VW5pcXVlSWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGVsbCBpZiBhIGdpdmVuIHN0cmluZyBpcyBhIHBvc2l0aXZlIGludGVnZXIuXG4gKiBVc2UgZm9yIGRldGVjdGluZyBhcnJheSBrZXlzLlxuICovXG5mdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHIgPT09ICcwJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC9eWzEtOV1cXGQqJC8udGVzdChzdHIpO1xufVxuZXhwb3J0cy5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyA9IGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEkgZG9uJ3Qga25vdyBob3cgYWNjdXJhdGUgdGhpcyBpcyBidXQgaXQgc2VlbXMgcHJldHR5IGdvb2RcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmo7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4iXX0=
