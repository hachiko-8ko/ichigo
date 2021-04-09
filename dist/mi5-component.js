(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BoundComponent_1 = require("../../src/HtmlComponent/BoundComponent");
const ComponentMap_1 = require("../../src/HtmlComponent/ComponentMap");
const IComponentBindingOptions_1 = require("../../src/HtmlComponent/Options/IComponentBindingOptions");
const IExistingElementOptions_1 = require("../../src/HtmlComponent/Options/IExistingElementOptions");
const IExistingLookupOptions_1 = require("../../src/HtmlComponent/Options/IExistingLookupOptions");
const IInnerHtmlOptions_1 = require("../../src/HtmlComponent/Options/IInnerHtmlOptions");
const IOuterHtmlOptions_1 = require("../../src/HtmlComponent/Options/IOuterHtmlOptions");
(function main() {
    const plugin = {
        BoundComponent: BoundComponent_1.BoundComponent,
        ComponentMap: ComponentMap_1.ComponentMap,
        ExistingElementBindingOptions: IComponentBindingOptions_1.ExistingElementBindingOptions,
        ExistingElementOptions: IExistingElementOptions_1.ExistingElementOptions,
        ExistingLookupOptions: IExistingLookupOptions_1.ExistingLookupOptions,
        ExistingLookupBindingOptions: IComponentBindingOptions_1.ExistingLookupBindingOptions,
        getComponent: ComponentMap_1.getComponent,
        InnerHtmlBindingOptions: IComponentBindingOptions_1.InnerHtmlBindingOptions,
        InnerHtmlOptions: IInnerHtmlOptions_1.InnerHtmlOptions,
        OuterHtmlBindingOptions: IComponentBindingOptions_1.OuterHtmlBindingOptions,
        OuterHtmlOptions: IOuterHtmlOptions_1.OuterHtmlOptions,
    };
    window.mi5 = window.mi5 || {};
    window.mi5.component = Object.assign(window.mi5.component || {}, plugin);
})();

},{"../../src/HtmlComponent/BoundComponent":8,"../../src/HtmlComponent/ComponentMap":10,"../../src/HtmlComponent/Options/IComponentBindingOptions":11,"../../src/HtmlComponent/Options/IExistingElementOptions":12,"../../src/HtmlComponent/Options/IExistingLookupOptions":13,"../../src/HtmlComponent/Options/IInnerHtmlOptions":14,"../../src/HtmlComponent/Options/IOuterHtmlOptions":15}],2:[function(require,module,exports){
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

},{"../System/Types/KeywordArguments":27,"./ElementType":3,"./ExtractNodeContent":5}],3:[function(require,module,exports){
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

},{"../System/Types/NoneType":28}],7:[function(require,module,exports){
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
        if (!window.customElements.get('i-v')) {
            window.customElements.define('i-v', TemplateReplacementValue);
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
            // If name is specified, component MUST be specified
            if (this._name && repl.getAttribute('component') !== this._name) {
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
        this.content.innerHTML = '';
        this.content.appendChild(clone);
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
        this._loopItemClass.inject(QuerySelectorNodeList_1.nodeListSelectorAll(addedContent, '[i5_item], [\\00003Aitem], [data-i5_item]'), {
            replace: false,
            parent: this,
            async: this._async
        }, KeywordArguments_1.kw('viewModel', row));
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

},{"../Html/CreateElement":2,"../Html/ElementType":3,"../Html/EscapeHtml":4,"../Html/ExtractNodeContent":5,"../Html/FormFieldValue":6,"../Html/QuerySelectorNodeList":7,"../Observable/IObservable":16,"../Observable/ObservableProperty":18,"../Observable/ObservableState":19,"../System/Types/Constructable":26,"../System/Types/KeywordArguments":27,"../System/Types/NoneType":28,"./Component":9,"./ComponentMap":10}],9:[function(require,module,exports){
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
            _ctor_lookup.call(this, args);
        }
        else if (!args) {
            _ctor_empty.call(this);
        }
        else if (args.element) {
            _ctor_existingElement.call(this, args);
        }
        else if (args.outerHtml) {
            _ctor_outerHtml.call(this, args);
        }
        else {
            _ctor_innerHtml.call(this, args);
        }
        // containerType could be any string that can be used as the tag for the component. If it's a custom tag, the browser will see
        // as HTMLUnknownElement. If you want the browser to know about it, then pass a constructor in containerCustomElement
        if (args && args.customElement) {
            if (!this.content.tagName.includes('-')) {
                throw new Error('HTML Custom Elements require a dash in their tag.');
            }
            if (!window.customElements.get(this.content.tagName)) {
                window.customElements.define(this.content.tagName.toLowerCase(), args.customElement);
            }
        }
        // I've never seen customized built-in elements working in Chrome. YMMV
        if ('is' in this.content) {
            // tslint:disable-next-line:no-console
            console.warn('Customized built-in elements are not supported. This may fail.');
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
            _ctor_existingElement.call(this, { element });
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
            const eventDefinition = currentAttributes.find(f => f.name.startsWith('(') && f.name.endsWith(')') && f.name.length > 2);
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
    setClass(classNames) {
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
}
exports.Component = Component;

},{"../Html/CreateElement":2,"../Html/ElementType":3,"../Html/FormFieldValue":6,"../Html/QuerySelectorNodeList":7,"../System/Types/KeywordArguments":27,"../System/Utility/GetUniqueId":30,"./ComponentMap":10}],10:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class ExistingElementOptions {
    constructor(opt) {
        Object.assign(this, opt);
        this.element = opt.element;
    }
}
exports.ExistingElementOptions = ExistingElementOptions;

},{}],13:[function(require,module,exports){
"use strict";
/**
 * Look up an existing element in the DOM and convert it to a component. This is just a way to simplify the lookup process vs doing
 * it manually before using IExistingElementOptions.
 * Note: Typescript can't verify your type annotations if you do it this way.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class ExistingLookupOptions {
    constructor(opt) {
        Object.assign(this, opt);
        this.selector = opt.selector;
    }
}
exports.ExistingLookupOptions = ExistingLookupOptions;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class InnerHtmlOptions {
    constructor(opt) {
        Object.assign(this, opt);
    }
}
exports.InnerHtmlOptions = InnerHtmlOptions;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
class OuterHtmlOptions {
    constructor(opt) {
        Object.assign(this, opt);
        this.outerHtml = opt.outerHtml;
    }
}
exports.OuterHtmlOptions = OuterHtmlOptions;

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

},{"../Html/EscapeHtml":4,"../System/EventHandler/PropertyChangedEventArgs":25,"../System/Types/NoneType":28,"../System/Utility/IsPrimitive":32,"./IObservable":16,"./ObservableBase":17}],19:[function(require,module,exports){
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

},{"../Html/EscapeHtml":4,"../System/EventHandler/PropertyChangedEventArgs":25,"../System/Types/NoneType":28,"../System/Utility/CloneDeep":29,"../System/Utility/IsPrimitive":32,"./IObservable":16,"./ObservableBase":17}],20:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Db21wb25lbnQuanMiLCJzcmMvSHRtbC9DcmVhdGVFbGVtZW50LmpzIiwic3JjL0h0bWwvRWxlbWVudFR5cGUuanMiLCJzcmMvSHRtbC9Fc2NhcGVIdG1sLmpzIiwic3JjL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcC5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JRXhpc3RpbmdFbGVtZW50T3B0aW9ucy5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUV4aXN0aW5nTG9va3VwT3B0aW9ucy5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUlubmVySHRtbE9wdGlvbnMuanMiLCJzcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lPdXRlckh0bWxPcHRpb25zLmpzIiwic3JjL09ic2VydmFibGUvSU9ic2VydmFibGUuanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQmFzZS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZS5qcyIsInNyYy9TeXN0ZW0vQXN5bmMvRGVmZXJyZWRQcm9taXNlLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBCb3VuZENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JQ29tcG9uZW50QmluZGluZ09wdGlvbnNcIik7XG5jb25zdCBJRXhpc3RpbmdFbGVtZW50T3B0aW9uc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUV4aXN0aW5nRWxlbWVudE9wdGlvbnNcIik7XG5jb25zdCBJRXhpc3RpbmdMb29rdXBPcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JRXhpc3RpbmdMb29rdXBPcHRpb25zXCIpO1xuY29uc3QgSUlubmVySHRtbE9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lJbm5lckh0bWxPcHRpb25zXCIpO1xuY29uc3QgSU91dGVySHRtbE9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lPdXRlckh0bWxPcHRpb25zXCIpO1xuKGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgcGx1Z2luID0ge1xuICAgICAgICBCb3VuZENvbXBvbmVudDogQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCxcbiAgICAgICAgQ29tcG9uZW50TWFwOiBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAsXG4gICAgICAgIEV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zOiBJQ29tcG9uZW50QmluZGluZ09wdGlvbnNfMS5FeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyxcbiAgICAgICAgRXhpc3RpbmdFbGVtZW50T3B0aW9uczogSUV4aXN0aW5nRWxlbWVudE9wdGlvbnNfMS5FeGlzdGluZ0VsZW1lbnRPcHRpb25zLFxuICAgICAgICBFeGlzdGluZ0xvb2t1cE9wdGlvbnM6IElFeGlzdGluZ0xvb2t1cE9wdGlvbnNfMS5FeGlzdGluZ0xvb2t1cE9wdGlvbnMsXG4gICAgICAgIEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnM6IElDb21wb25lbnRCaW5kaW5nT3B0aW9uc18xLkV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMsXG4gICAgICAgIGdldENvbXBvbmVudDogQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50LFxuICAgICAgICBJbm5lckh0bWxCaW5kaW5nT3B0aW9uczogSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXzEuSW5uZXJIdG1sQmluZGluZ09wdGlvbnMsXG4gICAgICAgIElubmVySHRtbE9wdGlvbnM6IElJbm5lckh0bWxPcHRpb25zXzEuSW5uZXJIdG1sT3B0aW9ucyxcbiAgICAgICAgT3V0ZXJIdG1sQmluZGluZ09wdGlvbnM6IElDb21wb25lbnRCaW5kaW5nT3B0aW9uc18xLk91dGVySHRtbEJpbmRpbmdPcHRpb25zLFxuICAgICAgICBPdXRlckh0bWxPcHRpb25zOiBJT3V0ZXJIdG1sT3B0aW9uc18xLk91dGVySHRtbE9wdGlvbnMsXG4gICAgfTtcbiAgICB3aW5kb3cubWk1ID0gd2luZG93Lm1pNSB8fCB7fTtcbiAgICB3aW5kb3cubWk1LmNvbXBvbmVudCA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5jb21wb25lbnQgfHwge30sIHBsdWdpbik7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4vRWxlbWVudFR5cGVcIik7XG5jb25zdCBFeHRyYWN0Tm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuL0V4dHJhY3ROb2RlQ29udGVudFwiKTtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgdGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgdGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIC8vIEFsbG93IGF0dHJpYnV0ZXMgdG8gYmUgc2VudCBvbiBwcm9wZXJ0aWVzLCBwcm92aWRpbmcgYSBjbGVhbmVyIGludGVyZmFjZS5cbiAgICAvLyBJdCBhbGxvd3MgeW91IHRvIHNlbmQgY3JlYXRlRWxlbWVudCgnZGl2Jywge2F0dHJpYnV0ZXM6IHsgY2xhc3M6ICdmb28nIH19KSBpbnN0ZWFkIG9mIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsIHsgY2xhc3M6ICdmb28nIH0pO1xuICAgIC8vIEFub3RoZXIgb3B0aW9uIGlzIHRvIHVzZSBLd2FyZ3MsIGJ1dCBub3QgZXZlcnlvbmUgd2FudHMgdG8uXG4gICAgaWYgKHByb3BlcnRpZXMgJiYgJ2F0dHJpYnV0ZXMnIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcyB8fCB7fSwgcHJvcGVydGllcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuYXR0cmlidXRlcztcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG5mdW5jdGlvbiBjcmVhdGUodGFnLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBET00gcHJvcGVydGllcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBhdHRyaWJ1dGVzLCBiZWNhdXNlIGluIHNvbWUgY2FzZXMsIHRoZXkgb3ZlcnJpZGUgdGhlIGluaXRpYWwgdmFsdWUuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBIVE1MIGZyb20gYW55IEhUTUwgZWxlbWVudCBwcm92aWRlZC5cbiAqIFVzZSBsaWtlIGNvbnN0IGRpdiA9IGNyZWF0ZUh0bWw8SFRNTERpdkVsZW1lbnQ+KFwiPGRpdj5Tb21ldGhpbmc8L2Rpdj5cIikgb3IgY29uc3QgY3VzdG9tID0gY3JlYXRlSHRtbChcIjxzb21lLXRhZz48L3NvbWUtdGFnPlwiKS5cbiAqIElmIG11bHRpcGxlIGVsZW1lbnRzIG9yIGEgcGxhaW4gdGV4dCBzdHJpbmcgd2l0aCBubyBIVE1MIGlzIHByb3ZpZGVkLCB0aGVuIGl0IHdpbGwgYmUgd3JhcHBlZCBpbiBhIGRpdiwgc28gaXQgY2FuIGtlZXBcbiAqIHJldHVybmluZyBhbiBIVE1MRWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVIdG1sKGh0bWwsIGlubGluZSA9IGZhbHNlKSB7XG4gICAgbGV0IHdyYXBwZXI7XG4gICAgaWYgKGlubGluZSkge1xuICAgICAgICB3cmFwcGVyID0gc3BhbigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVzID0gd3JhcHBlci5jaGlsZE5vZGVzO1xuICAgIC8vIE11bHRpcGxlIG5vZGVzLCByZXR1cm4gdGhlIHdyYXBwaW5nIGRpdlxuICAgIC8vIGUuZy4gXCJUaGlzIGlzIGEgPGVtPnRlc3Q8L2VtPlwiIG9yIFwiPGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj5cIlxuICAgIGlmIChub2Rlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIC8vIElmIGp1c3QgYSB0ZXh0bm9kZSAob3IgZW1wdHkpLCByZXR1cm4gYSBzcGFuLiBUZXh0IGlzIGluY29tcGF0aWJsZSB3aXRoIEhUTUxFbGVtZW50IHNvIGNhbid0IHJldHVybiB0aGF0XG4gICAgLy8gZS5nLiBcIkhlbGxvIHdvcmxkXCJcbiAgICBpZiAoIXdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgaWYgKGlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7IC8vIFRoaXMgaXMgYSBzcGFuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Bhbih3cmFwcGVyLmlubmVySFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRWxzZSByZXR1cm4gdGhlIHNpbmdsZSBjaGlsZC5cbiAgICAvLyBlLmcuIFwiPGRpdj48ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PjwvZGl2PlwiXG4gICAgcmV0dXJuIHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5leHBvcnRzLmNyZWF0ZUh0bWwgPSBjcmVhdGVIdG1sO1xuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgd2l0aCBhbnkgaHRtbC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQoaHRtbCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgcmV0dXJuIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh3cmFwcGVyKTtcbn1cbmV4cG9ydHMuY3JlYXRlRnJhZ21lbnQgPSBjcmVhdGVGcmFnbWVudDtcbmZ1bmN0aW9uIGRpdihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5kaXYgPSBkaXY7XG5mdW5jdGlvbiBzcGFuKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MU3BhbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5zcGFuID0gc3BhbjtcbmZ1bmN0aW9uIHBhcmFncmFwaChodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFBhcmFncmFwaEVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5wYXJhZ3JhcGggPSBwYXJhZ3JhcGg7XG5mdW5jdGlvbiBhbmNob3IoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgaHJlZk9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIGNvbnN0IHRtcCA9IF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxBbmNob3JFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICBpZiAodHlwZW9mIGhyZWZPclByb3BlcnRpZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRtcC5ocmVmID0gU3RyaW5nKGhyZWZPclByb3BlcnRpZXMgfHwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gdG1wO1xufVxuZXhwb3J0cy5hbmNob3IgPSBhbmNob3I7XG5mdW5jdGlvbiBidXR0b24oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxCdXR0b25FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuYnV0dG9uID0gYnV0dG9uO1xuLy8gQ29tbW9uIHByaXZhdGUgZnVuY3Rpb25zIGZvciBvdmVybG9hZHMuIFByZXZlbnRzIGxvdHMgb2YgY29weXBhc3RhLlxuLy8gVGhpcyB3b3JrcyBmb3IgZXZlcnl0aGluZyBiZWNhdXNlIFR5cGVTY3JpcHQgaXMga2VlcGluZyB0aGUgdHlwZXMgdmFsaWQuIEluIHB1cmUgSlMsIGJ1Z3MgY291bGQgYmUgY3JlYXRlZCAoZm9yIGV4YW1wbGUsIHBhc3NpbmcgYW4gaW5uZXJcbi8vIGVsZW1lbnQgdG8gYSBwYXJhZ3JhcGggLi4uIGRpc2FsbG93ZWQgYnkgVFMgYnV0IHRoZSBjb2RlIGlzIHRoZXJlIGluIHRoZSBKUylcbmZ1bmN0aW9uIF9pbnRlcm5hbCh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKGh0bWxPclByb3BlcnRpZXMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX292cjEodHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBodG1sT3JQcm9wZXJ0aWVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBfb3ZyMyh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBfb3ZyMih0eXBlLCBTdHJpbmcoaHRtbE9yUHJvcGVydGllcyB8fCAnJyksIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9vdnIxKHR5cGUsIGlubmVyRWxlbWVudCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgY29uc3QgZSA9IGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbiAgICBlLmFwcGVuZENoaWxkKGlubmVyRWxlbWVudCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBfb3ZyMih0eXBlLCBpbm5lckh0bWwsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gaW5uZXJIdG1sO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG5mdW5jdGlvbiBfb3ZyMyh0eXBlLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IHByb3BzLmlubmVySFRNTCB8fCAnJztcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgaGVscGVyIGZvciBDcmVhdGVFbGVtZW50LCByb3VnaGx5IG1hcHBpbmcgdG8gSHRtbEVsZW1lbnQgdHlwZXMsIGJ1dCBub3QgcGVyZmVjdGx5IGJlY2F1c2UgaXQncyBpbXBvc3NpYmxlXG4gKiAodGhlcmUncyBubyBwZXJmZWN0IDE6MSByZWxhdGlvbnNoaXApLlxuICovXG52YXIgZWxlbWVudFR5cGU7XG4oZnVuY3Rpb24gKGVsZW1lbnRUeXBlKSB7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQW5jaG9yRWxlbWVudFwiXSA9IFwiYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFyZWFFbGVtZW50XCJdID0gXCJhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXVkaW9FbGVtZW50XCJdID0gXCJhdWRpb1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJSRWxlbWVudFwiXSA9IFwiYnJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCYXNlRm9udEVsZW1lbnRcIl0gPSBcImJhc2Vmb250XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmxvY2tRdW90ZUVsZW1lbnRcIl0gPSBcImJsb2NrcXVvdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCdXR0b25FbGVtZW50XCJdID0gXCJidXR0b25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxDYW52YXNFbGVtZW50XCJdID0gXCJjYW52YXNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhRWxlbWVudFwiXSA9IFwiZGF0YVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFMaXN0RWxlbWVudFwiXSA9IFwiZGF0YWxpc3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaWFsb2dFbGVtZW50XCJdID0gXCJkaWFsb2dcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaXZFbGVtZW50XCJdID0gXCJkaXZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxETGlzdEVsZW1lbnRcIl0gPSBcImRsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRW1iZWRFbGVtZW50XCJdID0gXCJlbWJlZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZpZWxkU2V0RWxlbWVudFwiXSA9IFwiZmllbGRzZXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGb3JtRWxlbWVudFwiXSA9IFwiZm9ybVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcxRWxlbWVudFwiXSA9IFwiaDFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMkVsZW1lbnRcIl0gPSBcImgyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzNFbGVtZW50XCJdID0gXCJoM1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc0RWxlbWVudFwiXSA9IFwiaDRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNUVsZW1lbnRcIl0gPSBcImg1XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzZFbGVtZW50XCJdID0gXCJoNlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhSRWxlbWVudFwiXSA9IFwiaHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbWFnZUVsZW1lbnRcIl0gPSBcImltYWdlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW5wdXRFbGVtZW50XCJdID0gXCJpbnB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExhYmVsRWxlbWVudFwiXSA9IFwibGFiZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMZWdlbmRFbGVtZW50XCJdID0gXCJsZWdlbmRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMSUVsZW1lbnRcIl0gPSBcImxpXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGlua0VsZW1lbnRcIl0gPSBcImxpbmtcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNYXBFbGVtZW50XCJdID0gXCJtYXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNZXRlckVsZW1lbnRcIl0gPSBcIm1ldGVyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kRGVsRWxlbWVudFwiXSA9IFwiZGVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kSW5zRWxlbWVudFwiXSA9IFwiaW5zXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT0xpc3RFbGVtZW50XCJdID0gXCJvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9iamVjdEVsZW1lbnRcIl0gPSBcIm9iamVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdEdyb3VwRWxlbWVudFwiXSA9IFwib3B0Z3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRpb25FbGVtZW50XCJdID0gXCJvcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPdXRwdXRFbGVtZW50XCJdID0gXCJvdXRwdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhZ3JhcGhFbGVtZW50XCJdID0gXCJwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYW1FbGVtZW50XCJdID0gXCJwYXJhbVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBpY3R1cmVFbGVtZW50XCJdID0gXCJwaWN0dXJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJlRWxlbWVudFwiXSA9IFwicHJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJvZ3Jlc3NFbGVtZW50XCJdID0gXCJwcm9ncmVzc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFF1b3RlRWxlbWVudFwiXSA9IFwicVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNjcmlwdEVsZW1lbnRcIl0gPSBcInNjcmlwdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNlbGVjdEVsZW1lbnRcIl0gPSBcInNlbGVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNvdXJjZUVsZW1lbnRcIl0gPSBcInNvdXJjZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNwYW5FbGVtZW50XCJdID0gXCJzcGFuXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3R5bGVFbGVtZW50XCJdID0gXCJzdHlsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnRcIl0gPSBcImNhcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFwiXSA9IFwidGRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50XCJdID0gXCJ0aFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sRWxlbWVudFwiXSA9IFwiY29sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xHcm91cEVsZW1lbnRcIl0gPSBcImNvbGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVFbGVtZW50XCJdID0gXCJ0YWJsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlUm93RWxlbWVudFwiXSA9IFwidHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Cb2R5RWxlbWVudFwiXSA9IFwidGJvZHlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Gb290ZXJFbGVtZW50XCJdID0gXCJ0Zm9vdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkhlYWRlckVsZW1lbnRcIl0gPSBcInRoZWFkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGVtcGxhdGVFbGVtZW50XCJdID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRleHRBcmVhRWxlbWVudFwiXSA9IFwidGV4dGFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUaW1lRWxlbWVudFwiXSA9IFwidGltZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRyYWNrRWxlbWVudFwiXSA9IFwidHJhY2tcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxVTGlzdEVsZW1lbnRcIl0gPSBcInVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVmlkZW9FbGVtZW50XCJdID0gXCJ2aWRlb1wiO1xufSkoZWxlbWVudFR5cGUgPSBleHBvcnRzLmVsZW1lbnRUeXBlIHx8IChleHBvcnRzLmVsZW1lbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChpbnB1dCkge1xuICAgIC8vIFRoZXJlIGlzbid0IGEgYnVpbHQtaW4gd2F5IHRvIGRvIHRoaXMsIHN0aWxsLCBzbyB3ZSBuZWVkIGEgaGVscGVyIGZ1bmN0aW9uLlxuICAgIC8vIFRoZSBhcnRpY2xlIFwiWW91IGFyZSBwcm9iYWJseSBtaXN1c2luZyBET00gdGV4dCBtZXRob2RzXCIgY29udmluY2VkIG1lIHRvIGRvIGl0IHRoaXMgd2F5LFxuICAgIC8vIHZzLiBjcmVhdGVUZXh0Tm9kZS4gVGhvdWdoIGNyZWF0ZVRleHROb2RlIHdvdWxkIHByb2JhYmx5IHdvcmsgZmluZSBmb3Igc2V0dGluZyBpbm5lckhUTUwuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGVzY2FwZXMgPSB7XG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICAgICAgXCI9XCI6IFwiJiN4M0Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXG4gICAgICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gICAgfTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBzID0+IGVzY2FwZXNbc10pO1xufVxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUgYXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xufVxuZXhwb3J0cy5leHRyYWN0Tm9kZUNvbnRlbnQgPSBleHRyYWN0Tm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBIVE1MIGlzIGluY29uc2lzdGVudC4gR2V0dGluZyB0aGUgdmFsdWUgb2YgZm9ybSBmaWVsZHMgaXMgYSBiaXQgY29tcGxpY2F0ZWQsIG5vdCBhbHdheXMgZWxlbWVudC52YWx1ZSxcbiAqIHNvIGhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCkge1xuICAgIC8vIEl0IHdvdWxkIGJlIHJlYWxseSBuaWNlIGF0IHRoaXMgcG9pbnQgaWYgSlMgY291bGQgc2VlIGdlbmVyaWMgcGFyYW1ldGVycy5cbiAgICAvLyBJZiBpdCBjb3VsZCwgdGhlbiB0aGUgY29kZSBjb3VsZCBzYXkgXCJpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiBUT3V0cHV0ICE9PSBib29sZWFuKSB0aHJvdyBuZXcgRXJyb3IoKVwiXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RWYWx1ZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGb3JtRmllbGRWYWx1ZSA9IGdldEZvcm1GaWVsZFZhbHVlO1xuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0LmNoZWNrZWQ7XG59XG5leHBvcnRzLmdldENoZWNrYm94VmFsdWUgPSBnZXRDaGVja2JveFZhbHVlO1xuZnVuY3Rpb24gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlcklucHV0VmFsdWUgPSBnZXROdW1iZXJJbnB1dFZhbHVlO1xuZnVuY3Rpb24gZ2V0UmFkaW9WYWx1ZShpbnB1dCkge1xuICAgIC8vIFJhZGlvIGJ1dHRvbnMgYXJlIHdlaXJkLiBXZSB3YW50IHRoZW0gdG8gYXBwZWFyIHRvIGJlIG1vcmUgbm9ybWFsLlxuICAgIGlmIChpbnB1dC5uYW1lKSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aW5wdXQubmFtZX1cIl06Y2hlY2tlZGApIHx8IHt9KS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSWYgbm8gbmFtZSwgZmFsbCBiYWNrIHRvIHRoaXNcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRSYWRpb1ZhbHVlID0gZ2V0UmFkaW9WYWx1ZTtcbmZ1bmN0aW9uIGdldFNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZWxlY3RWYWx1ZSA9IGdldFNlbGVjdFZhbHVlO1xuZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3Quc2VsZWN0ZWRPcHRpb25zKS5maWx0ZXIoZiA9PiBmLnZhbHVlKS5tYXAobSA9PiBtLnZhbHVlKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlTZWxlY3RWYWx1ZSA9IGdldE11bHRpU2VsZWN0VmFsdWU7XG4vLyBUaGlzIGlzIGFsbW9zdCBwb2ludGxlc3MuIEp1c3QgaGVyZSBmb3IgY29uc2lzdGVuY3kuXG5mdW5jdGlvbiBnZXRTaW1wbGVGb3JtVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIGZvciBtdWx0aS1zZWxlY3RzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuZXhwb3J0cy5nZXRTaW1wbGVGb3JtVmFsdWUgPSBnZXRTaW1wbGVGb3JtVmFsdWU7XG4vKipcbiAqIFNldHRpbmcgdmFsdWVzIGlzIGp1c3QgYXMgY29tcGxpY2F0ZWQgYXMgZ2V0dGluZyB0aGVtLCBiZWNhdXNlIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBZb3UgY2FuJ3QganVzdCBzYXkgZWxlbWVudC52YWx1ZSA9IGZvby5cbiAqIEhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gc2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAvLyBIZXJlIHlvdSBjYW4gdmFsaWRhdGUgdGhlIHR5cGUgYmVmb3JlIHNldHRpbmcgb3IgZG8gc29tZSBraW5kIG9mIGNvbnZlcnNpb24uXG4gICAgLy8gRm9yIG11bHRpLXNlbGVjdHMsIGNhbiBhdXRvLXdyYXAgdmFsdWUgaW4gc3RyaW5nLlxuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpOyAvLyB1c2VkIGluIG1vc3Qgb2YgdGhlIGNhc2VzXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCBzdHJpbmdWYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHN0cmluZ1ZhbHVlID09PSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShzdHJpbmdWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRldGltZScgfHwgdHlwZSA9PT0gJ2RhdGV0aW1lLWxvY2FsJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdHJpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBgJHt0b0RhdGVTdHJpbmcoZGF0ZSl9VCR7dG9UaW1lU3RyaW5nKGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzZWxlY3Qub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7IC8vIHRyZWF0aW5nIGl0IGxpa2UgYSBub24tbXVsdGlwbGUgd29ya3NcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb25leGlzdGVudCBvcHRpb25zIGNhbm5vdCBiZSBzZXQuIFdlIHNob3VsZCBsZXQgdGhlIHByb2dyYW1tZXIga25vdy4gRXZlbiB0aG91Z2ggdGhpcyB0YWtlcyBDUFUgY3ljbGVzLlxuICAgICAgICAgICAgdmFsdWUubWFwKG0gPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdmFsdWUubWFwKG0gPT4gbS50b1N0cmluZygpKS5pbmRleE9mKG9wdC52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIG9uIG5vbi1mb3JtIGZpZWxkICR7ZWxlbWVudC50YWdOYW1lfSAke2VsZW1lbnQuaWQgfHwgJyd9YCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbCkge1xuICAgICAgICAvLyBJZiB5b3Ugc2V0IHRoZSB2YWx1ZSBvZiBhIHNlbGVjdCB0byBzb21ldGhpbmcgdGhhdCBpcyBub3QgYW4gYXZhaWxhYmxlIG9wdGlvbiwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgICAgY29uc3QgaGFzT3B0aW9uID0gb3B0aW9ucy5tYXAobSA9PiBtLnZhbHVlKS5pbmRleE9mKHZhbC50b1N0cmluZygpKSA+IC0xO1xuICAgICAgICBpZiAoIWhhc09wdGlvbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIHdpdGggbm9uZXhpc3RlbnQgb3B0aW9uICR7dmFsLnRvU3RyaW5nKCl9IG9uIHNlbGVjdCAke2VsZW1lbnQuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlc2UgY291bGQgYmUgcmVhZGFibGUgb25lbGluZXJzIGlmIHdlIGhhZCBwYWRTdGFydCgpIGJ1dCBpdCdzIG5vdCB3b3J0aCBidW1waW5nIHRvIEVTMjAxNyBmb3Igb25lIG1ldGhvZFxuICAgIGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGggPSAoJzAnICsgKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgZGF5ID0gKCcwJyArIGRhdGUuZ2V0VVRDRGF0ZSgpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0VVRDRnVsbFllYXIoKX0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9UaW1lU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3VyID0gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBtaW51dGUgPSAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5zZXRGb3JtRmllbGRWYWx1ZSA9IHNldEZvcm1GaWVsZFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3Iobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvciA9IG5vZGVMaXN0U2VsZWN0b3I7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3JBbGwobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgYnJvd3NlciBjYW4gbG9zZSByZWZlcmVuY2VzIHdoZW4gbW92aW5nIG5vZGVzLCB0aGlzIGNhbiBhbHNvIHRha2UgYSByZWd1bGFyIGFycmF5LlxuICAgIC8vIEJlY2F1c2UgSFRNTDUgaGFzIHRvdGFsbHkgZmFsbGVuIG92ZXIsIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgZml4ZWQgbm9kZUxpc3RTZWxlY3RvckFsbFxuICAgIC8vIHRvIG1hdGNoIHRoZSBvdXRwdXQgc2lnbmF0dXJlIG9mIHF1ZXJ5U2VsZWN0b3JBbGwgKE5vZGVMaXN0T2Y8RWxlbWVudD4gaW5zdGVhZCBvZiBhcnJheSkuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uQXJyYXkuZnJvbShzZWFyY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3JBbGwgPSBub2RlTGlzdFNlbGVjdG9yQWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnaS12JykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2ktdicsIFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgICAgIHRoaXMuX2FzeW5jID0gb3B0aW9ucy5hc3luYyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBvcHRpb25zLmRlZmVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICAvLyBEZWZpbmVkIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBjbGFzcyBmb3IgdGhlIGRlZmF1bHQgbG9vcFBvc3RQcm9jZXNzKCkgbWV0aG9kXG4gICAgICAgIGlmIChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmICghQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKG9wdGlvbnMubG9vcEl0ZW1DbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMubG9vcEl0ZW1DbGFzcyBpbnN0YW5jZW9mIEJvdW5kQ29tcG9uZW50LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9vcEl0ZW1DbGFzcyBpcyBub3QgYW4gYm91bmQgY29tcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9vcEl0ZW1DbGFzcyA9IG9wdGlvbnMubG9vcEl0ZW1DbGFzcyB8fCBCb3VuZENvbXBvbmVudDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKTtcbiAgICAgICAgdGhpcy5zZXRUZW1wbGF0ZSh0aGlzLmNvbnRlbnQuaW5uZXJIVE1MKTsgLy8gSW5uZXJIVE1MIGlzIGN1cnJlbnRseSBvbmx5IHBhcnNlZCBhbmQgdGhlbiB0aGUgb3JpZ2luYWwgdGV4dCBpcyB0aHJvd24gYXdheS5cbiAgICAgICAgLy8gQXV0by1hZGQgc3Vic2NyaXB0aW9ucyBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZUFsbFZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5vYnNlcnZlVmlld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRndCBvZiBvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKHRndCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2FzeW5jKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb25zdHJ1Y3RvciBpbml0aWFsaXphdGlvbiBpcyBkb25lLlxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqIFRvIHJlcGxhY2UgdGhlIGVsZW1lbnQgKGNvcHlpbmcgZXhpc3RpbmcgYXR0cmlidXRlcykgc2VuZCB0aGUgcmVsZXZhbnQgb3B0aW9ucywgcGx1cyB7cmVwbGFjZTogdHJ1ZX0uXG4gICAgICpcbiAgICAgKiBJbiBhbG1vc3QgZXZlcnkgY2FzZSwgdmlld01vZGVsIHNob3VsZCBiZSBzZXQuIEJ1dCBpdCdzIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgdGhhdCBhbmQgc3RpbGwgYmUgY29tcGF0aWJsZSB3aXRoIHRoZSBiYXNlXG4gICAgICogY2xhc3MgaW5qZWN0KCkuIFRoaXMgaXMgYSB0eXBlc2NyaXB0LW9ubHkgaXNzdWUgYnV0IGl0IG1ha2VzIHRoaW5ncyB1Z2x5LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy4gQW5kIHByYWN0aWNhbGx5IGRlbWFuZHMgdGhlaXIgdXNlIHRvIHNldCB2aWV3TW9kZWwuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGVsZW1lbnQsIHZpZXdNb2RlbCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3Qoc2VsZWN0b3IsIG9wdCwgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsIHRvIGluamVjdCgpIHdpdGggYSBjbGVhbmVyIGFyZ3VtZW50IG9yZGVyLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3RCaW5kKHZpZXdNb2RlbCwgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3Qoc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50V2l0aEJvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIG9wdCk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQm91bmRDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCB2aWV3TW9kZWwsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIC8vIFdBUk46IFRoaXMgY2FzdCBtYXkgbm90IGJlIHRydWUuIFRoZXJlJ3Mgbm8gd2F5IHRvIGNoZWNrIHRoYXQgdGhlIHRhZ3MgbWF0Y2guXG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oeyBlbGVtZW50OiBleGlzdGluZ0VsZW1lbnQgfSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgIH1cbiAgICB3cml0ZShldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2dC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCk7XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28gY2FzZXMgd2hlcmUgdmFsdWUgaXMgdW5kZWZpbmVkLiBFaXRoZXIgdGhlIGVsZW1lbnQgaXMgbm90IGEgZm9ybSBlbGVtZW50IG9yIGl0J3MgYW4gdW5uYW1lZCByYWRpbyBidXR0b25cbiAgICAgICAgLy8gdGhhdCBpcyBub3Qgc2VsZWN0ZWQuIEluIGJvdGggY2FzZXMsIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHRoZSBtb2RlbCB3aXRoIHVuZGVmaW5lZCwgd2hpY2ggaXMgdXNlbGVzcy5cbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyBqdXN0aWZpY2F0aW9uIHZhbGlkP1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdBUk46IENhbm5vdCB0eXBlIGNoZWNrIHRoaXMgZHluYW1pY2FsbHkuIFR5cGVTY3JpcHQgaXMgYnVpbGQtdGltZSBjaGVja2luZyBvbmx5LiBSdW50aW1lIGNvZGUgY2FuJ3QgZXZlbiBzZWUgdGhlIHR5cGUuXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHRvIGJlIHByZWNpc2UsIGFsbCBwcm9wZXJ0aWVzIGluIF93cml0ZUJpbmRpbmdzIHNob3VsZCBiZSBGb3JtSXRlbVZhbHVlLCBidXQgYXMgX3dyaXRlQmluZGluZ3MgaXMgcG9wdWxhdGVkXG4gICAgICAgIC8vIHZpYSBzdHJpbmcsIHRoZXJlJ3Mgbm8gd2F5IHRvIGVuZm9yY2UgdGhhdC4gU28gaWYgeW91IGZpbGwgYSBzdHJpbmcgdmFsdWUgZnJvbSBhIG11bHRpcGxlIHNlbGVjdCwgaXQnbGwgcHJvZHVjZSBidWdzLlxuICAgICAgICAvLyBTbyBiZSBjYXJlZnVsLiBJdCdzIG9uIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBiaW5kIG9mIHRoaXMuX3dyaXRlVGFyZ2V0cykge1xuICAgICAgICAgICAgaWYgKGJpbmQuc3RhcnRzV2l0aCgndGhpcy4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbYmluZF07XG4gICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXNbYmluZF0gPSB2YWx1ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgdmlldyBtb2RlbCBpcyBlaXRoZXIgRm9ybUZpZWxkVmFsdWUgb3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG9uZS5cbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0aGlzLnZpZXdNb2RlbCwgKCkgPT4gdGhpcy52aWV3TW9kZWwgPSB2YWx1ZSwgdGhpcy52aWV3TW9kZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnZpZXdNb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdpdGggb2JzZXJ2YWJsZSBzdGF0ZSwgd2UgbmVlZCB0byBnZXQgdGhlIHN0YXRlLCB1cGRhdGUgaXQsIGFuZCB3cml0ZSB0aGUgd2hvbGUgdGhpbmcgYmFjay5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2hpbGUgaXQgaXMgcG9zc2libGUgdG8gdXBkYXRlIGEgc2luZ2xlIHByb3BlcnR5IGluIHNvbWUgY2FzZXMsIGl0IGRvZXNuJ3QgYWxsb3cgcmV1c2Ugb2YgYWxyZWFkeS13b3JraW5nIGNvZGUuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmlld01vZGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0bXBbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0bXBbYmluZF0gPSB2YWx1ZSwgdG1wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudmFsdWUgPSB0bXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnZpZXdNb2RlbFtiaW5kXTtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXMudmlld01vZGVsW2JpbmRdID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JpdGVWYWx1ZSh0YXJnZXQsIHdyaXRlVG9Qcm9wZXJ0eSwgdGhpc0FyZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24gdG8gYmUgZmxleGlibGUsIGJlY2F1c2UgaWYgdGFyZ2V0IGlzIGEgdmFsdWUgdHlwZSBvciBpbW11dGFibGUsIHdyaXRpbmdcbiAgICAgICAgICAgIC8vIGl0IGRpcmVjdGx5IHJlcGxhY2VzIG9ubHkgdGhlIHZhbHVlIHdpdGhvdXQgdXBkYXRpbmcgdGhlIG1vZGVsLlxuICAgICAgICAgICAgd3JpdGVUb1Byb3BlcnR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIHRoZSBtb2RlbCBwYXNzZWQgaW4sIG9yIHRoZSB2aWV3IG1vZGVsIGlmIG5vbmUgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIG9ic2VydmUobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKElPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG1vZGVsKSkge1xuICAgICAgICAgICAgbW9kZWwuc3Vic2NyaWJlKHRoaXMucmVuZGVyLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIGFsbCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgZm91bmQgaW4gdGhlIG1vZGVsIHBhc3NlZCBpbixcbiAgICAgKiBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi4gVGhpcyBvbmx5IGdvZXMgb25lIGxldmVsIGRlZXAsIHNvIGl0XG4gICAgICogd29uJ3QgcGljayB1cCBuZXN0ZWQgb2JqZWN0cywgYnV0IGl0J3MgcHJvYmFibHkgZ29vZCBlbm91Z2ggaW4gNjAlIG9mIGNhc2VzLlxuICAgICAqL1xuICAgIG9ic2VydmVBbGwobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsKTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1vZGVsKSkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsW21dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgaWYgKHRoaXMuX2RlZmVyICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5ib29sKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGJvb2xlYW4gYXR0cmlidXRlcywgdGhlIHZlcnkgZXhpc3RlbmNlIG9mIHRoZSBhdHRyaWJ1dGUgbWVhbnMgaXQgaXMgY29uc2lkZXJlZCB0byBiZSB0cnVlLlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUoaXRlbS5zb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGl0ZW0uYXR0cmlidXRlLCB2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdGhpcy5fZ2V0U3RyaW5nVmFsdWUoaXRlbS5zb3VyY2UpIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdmFsdWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIC8vIENhbGxzIHNldEZvcm1GaWVsZFZhbHVlIGJlaGluZCB0aGUgc2NlbmVzLlxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZSh0aGlzLl92YWx1ZUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZSh0aGlzLl9jc3NDbGFzc2VzKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcykge1xuICAgICAgICAgICAgLy8gSWYgdHJ1dGh5LCBhZGQgY2xhc3MsIGVsc2UgZGVsZXRlIGl0LlxuICAgICAgICAgICAgbGV0IHZhbCA9ICEhdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0uY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NTdHlsZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzU3R5bGUpIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLmNvbnRlbnQuc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIHN0eWxlIHRleHQgaW4gY29tcG9uZW50OiAke3ZhbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICAgICAgY29uc3QgaXRlcmFibGUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fbG9vcC5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGl0ZXJhYmxlICYmIHR5cGVvZiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNDb250ZW50ID0gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgaXRlcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuX2xvb3AuZnJhZ21lbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBcyBzb29uIGFzIHdlIGFkZCB0aGUgY2xvbmUgdG8gY29udGVudCwgY2hpbGROb2RlcyBsb3NlcyByZWZlcmVuY2UgdG8gaXRzIGNoaWxkIG5vZGVzLCBzbyBjb3B5IGl0LlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IEFycmF5LmZyb20oY2xvbmUuY2hpbGROb2Rlcykuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3AucG9zdFByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9vcFBvc3RQcm9jZXNzKHJvdywgbm9kZXMsIGl0ZXJhYmxlLCBwcmV2aW91c0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5KSB7XG4gICAgICAgICAgICAvLyBJZiBmYWxzeSwgc2V0IGRpc3BsYXk6IG5vbmUgKHNhdmluZyBwcmV2aW91cyB2YWx1ZSkuIElmIHRydXRoeSwgcmVzdG9yZSBwcmV2aW91cyB2YWx1ZSAoaWYgYmxvY2ssIGZsZXgsIGJ1dCBub3QgaWYgbm9uZSlcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fY3NzRGlzcGxheS5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nzc0Rpc3BsYXkubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNDc3NEaXNwbGF5U2V0dGluZyA9IHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZVRleHQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGVtcGxhdGVUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBpbiB0aGUgY29uc3RydWN0b3IuIFRoZSB1cGRhdGUgcGFyYW0gc2hvdWxkIG5vdCBiZSBzZXQuXG4gICAgICAgIGlmICh1cGRhdGUgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSBzaG91bGQgbm90IGJlIHRydWUgd2hlbiBjYWxsZWQgaW50ZXJuYWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSBjcmVhdGluZyBhbiBlbGVtZW50IHRoYXQncyBub3Qgb24gdGhlIHBhZ2UsIHdlIHByb2JhYmx5IGNvdWxkIGF2b2lkIHVzaW5nIGEgZnJhZ21lbnQsXG4gICAgICAgIC8vIGJ1dCB0aGlzIGlzIHdoYXQgZnJhZ21lbnRzIGFyZSBmb3IuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MVGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGVUZXh0O1xuICAgICAgICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgdXNlZCB0byByZXBsYWNlIHRoZSBleGlzdGluZyB0ZW1wbGF0ZSwgd2UgbmVlZCB0byB3aXBlIG91dCB0aGUgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICAvLyBXb3JraW5nIG9uIGEgY2xvbmUgaGVyZSwgc28gd2UgZG9uJ3Qgc2VlIHRoZSBib2R5IGJlaW5nIGJ1aWx0IHN0ZXAgYnkgc3RlcCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ktdicpKSB7XG4gICAgICAgICAgICAvLyBJZiBuYW1lIGlzIHNwZWNpZmllZCwgY29tcG9uZW50IE1VU1QgYmUgc3BlY2lmaWVkXG4gICAgICAgICAgICBpZiAodGhpcy5fbmFtZSAmJiByZXBsLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgIT09IHRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vZXNjYXBlID0gcmVwbC5oYXNBdHRyaWJ1dGUoJ25vZXNjYXBlJykgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ25vZXNjYXBlJykgIT09ICdmYWxzZSc7XG4gICAgICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogcmVwbCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHJlcGwuaW5uZXJIVE1MLFxuICAgICAgICAgICAgICAgIG5vZXNjYXBlOiBub2VzY2FwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2VlIGlmIHdlIG5lZWQgdG8gZGVmZXIgcmVuZGVyaW5nIHVudGlsIGFmdGVyIGluaXRpYWxpemF0aW9uLlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyB3aWxsIGxlYWQgdG8gYSBGT1VDLCBtYXliZSBtaWxsaXNlY29uZHMsIG1heWJlIGxvbmdlci5cbiAgICAgICAgaWYgKCF0aGlzLl9kZWZlciB8fCB0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGUgY29tcGxldGVkIHZhbHVlcyBiZWZvcmUgYWRkaW5nIHRvIHRoZSB2aXNpYmxlIHBhZ2UuIFRoaXMgaXMgc2xpZ2h0bHkgcmVkdW5kYW50LCBiZWNhdXNlIHRoaXMgaGFwcGVucyBpbiB0aGUgcmVuZGVyKClcbiAgICAgICAgICAgIC8vIHN0ZXAsIGJ1dCBJIGhhdGUgaXQgd2hlbiBJIHNlZSBhIGZsYXNoIG9mIHVucmVwbGFjZWQgY29udGVudCBvbiBzaXRlcy5cbiAgICAgICAgICAgIC8vIFRoZSByZWFzb24gdGhpcyB3b3JrcyBpcyBiZWNhdXNlIF9yZXBsYWNlbWVudHMgcmVmZXJlbmNlcyBjbG9uZSwgd2hpY2ggaXNuJ3QgdmlzaWJsZSB1bnRpbCBhbG1vc3QgdGhlIGxhc3QgbGluZS5cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUh0bWxSZXBsYWNlbWVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgIC8vIERvIGEgZnVsbCB1cGRhdGUgaWYgcmVxdWVzdGVkIHRvXG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEh0bWxUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdiBub2VzY2FwZT4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRUZXh0VGVtcGxhdGUodGVtcGxhdGVQcm9wZXJ0eSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VGVtcGxhdGUoJzxpLXY+JyArIHRlbXBsYXRlUHJvcGVydHkgKyAnPC9pLXY+JywgdXBkYXRlKTtcbiAgICB9XG4gICAgc2V0TG9vcChzb3VyY2UgPSAnLicsIGZyYWdtZW50LCBza2lwUG9zdFByb2Nlc3MgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWZyYWdtZW50KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcmFnbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZyYWdtZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUZyYWdtZW50KGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb29wID0geyBzb3VyY2UsIHBvc3RQcm9jZXNzOiAhc2tpcFBvc3RQcm9jZXNzLCBmcmFnbWVudCB9O1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVMb29wKHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZhbHVlQXR0cmlidXRlKHNvdXJjZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fdmFsdWVBdHRyaWJ1dGUgPSBzb3VyY2U7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFZpc2liaWxpdHkoc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0Rpc3BsYXkgPSB7IHNvdXJjZSwgbmVnYXRpdmUgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRBdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogZmFsc2UsIG5lZ2F0aXZlOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRCb29sZWFuQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmluZChmID0+IGYuYXR0cmlidXRlID09PSBhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKHsgYXR0cmlidXRlLCBzb3VyY2UsIGJvb2w6IHRydWUsIG5lZ2F0aXZlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maWx0ZXIoZiA9PiBmLmF0dHJpYnV0ZSAhPT0gYXR0cmlidXRlKTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENzc0NsYXNzKGNscyA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NlcyA9IGNscztcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzU3R5bGUoc3R5bGUgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nzc1N0eWxlID0gc3R5bGU7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENzc0NsYXNzU3dpdGNoKGNscywgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscyB8fCAhc291cmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbmQoZiA9PiBmLmNsYXNzID09PSBjbHMpKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLnB1c2goeyBjbGFzczogY2xzLCBzb3VyY2UsIG5lZ2F0aXZlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUNzc0NsYXNzU3dpdGNoKGNscywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFjbHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5maWx0ZXIoZiA9PiBmLmNsYXNzICE9PSBjbHMpO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMud3JpdGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRXcml0ZVRhcmdldCh0YXJnZXQgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX3dyaXRlVGFyZ2V0cy5maW5kKGYgPT4gZiA9PT0gdGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLnB1c2godGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVXcml0ZVRhcmdldCh0YXJnZXQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX3dyaXRlVGFyZ2V0cy5maWx0ZXIoZiA9PiBmICE9PSB0YXJnZXQpO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byB1bmJpbmQgYSB2aWV3IGZyb20gYW4gb2JzZXJ2YWJsZS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAoQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gc29tZXRoaW5nIGVsc2UgYWZ0ZXIgdGhlIGxvb3AgaXMgYWRkZWQgdG8gdGhlIERPTS5cbiAgICAgKi9cbiAgICBsb29wUG9zdFByb2Nlc3Mocm93LCBhZGRlZENvbnRlbnQsIGFsbFJvd3MsIHByZXZpb3VzQ29udGVudCkge1xuICAgICAgICAvLyBJZiB0aGUgdHlwZXNjcmlwdCBwYXJ0IG9mIHRoZSBmb2xsb3dpbmcgd2VyZSBpbXBvcnRhbnQsIHRoaXMgd291bGQgYmUgYSBwcm9ibGVtXG4gICAgICAgIC8vIGlmIHRoaXMgd2VyZSBhIGRlcml2ZWQgY2xhc3MuXG4gICAgICAgIGNvbnN0IHRoaXNjbGFzcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MuaW5qZWN0KFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoYWRkZWRDb250ZW50LCAnW2k1X2l0ZW1dLCBbXFxcXDAwMDAzQWl0ZW1dLCBbZGF0YS1pNV9pdGVtXScpLCB7XG4gICAgICAgICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIGFzeW5jOiB0aGlzLl9hc3luY1xuICAgICAgICB9LCBLZXl3b3JkQXJndW1lbnRzXzEua3coJ3ZpZXdNb2RlbCcsIHJvdykpO1xuICAgIH1cbiAgICBfZ2V0U3RyaW5nVmFsdWUobmFtZSwgc2tpcEVzY2FwZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKG5hbWUpO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZSA6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBza2lwRXNjYXBlID8gdmFsdWUudG9TdHJpbmcoKSA6IEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRVbnR5cGVkVmFsdWUobmFtZSkge1xuICAgICAgICBsZXQgc291cmNlO1xuICAgICAgICAvLyBJJ20gcHJldHR5IHN1cmUgdGhpcyBpcyBiZWluZyB2YWxpZGF0ZWQgZHVyaW5nIGNvbnN0cnVjdGlvbiBidXQgYmUgc2FmZVxuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGhpc0FyZyA9IHRoaXMudmlld01vZGVsO1xuICAgICAgICAvLyBJZiBWTSBpcyBhIHN0YXRlLCBnZXQgdGhlIGN1cnJlbnQgc3RhdGUgdmFsdWUuXG4gICAgICAgIGlmIChPYnNlcnZhYmxlU3RhdGVfMS5vYnNlcnZhYmxlU3RhdGVDaGVjayh0aGlzQXJnKSkge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXNBcmcudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aChcInRoaXMuXCIpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpcztcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDUpO1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlldy5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICcuJykge1xuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpc0FyZykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXdNb2RlbC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIENPTlNJREVSOiBDb25zaWRlciBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gYWxsb3cgZXhlY3V0aW5nIG1ldGhvZCB3aXRoIHN0cmluZyBwYXJhbWV0ZXJzLiBpNV9wYXJhbTAxPVwidmFsIDFcIiwgaTVfcGFyYW0wMj1cInZhbCAyXCJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UuY2FsbCh0aGlzQXJnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayhzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIHRoaXMuX3JlcGxhY2VtZW50cykge1xuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZShyZXBsLnNvdXJjZSwgcmVwbC5ub2VzY2FwZSkgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVwbC5lbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20odGhpcy5jb250ZW50LmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gZi52YWx1ZSB8fCBmLm5hbWUgPT09ICdpNV9pbnB1dCcgfHwgZi5uYW1lID09PSAnOmlucHV0JylcbiAgICAgICAgICAgIC5tYXAobSA9PiAoe1xuICAgICAgICAgICAgbmFtZTogbS5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6IG0udmFsdWUgfHwgJydcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBUZWNobmljYWxseSBpdCdzIGludmFsaWQgdG8gYWRkIGN1c3RvbSBhdHRyaWJ1dGVzIHRvIHJlZ3VsYXIgZWxlbWVudHMsIHNvIHRlY2huaWNhbGx5IDxyZXBsYWNlLW1lIDpzd2l0Y2g6cmVkdGV4dD1cIndhcm5pbmdcIj5cbiAgICAgICAgLy8gaXMgbGVnYWwgYnV0IGlmIGlmIGl0IHdlcmUgYSBkaXYsIHRoYXQgd291bGQgYmUgaWxsZWdhbC4gU28gd2UnbGwgYWxsb3cgPGRpdiBkYXRhLWk1X3N3aXRjaF9yZWR0ZXh0PVwid2FybmluZ1wiPi5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoZSB3ZWlyZCBuYW1lIGhhbmRsaW5nIG9mIGRhdGEgYXR0cmlidXRlcyBjb3VsZCBicmVhayB5b3VyIGNvZGUgaWYgeW91IHRyeSB0byB1c2UgdGhpcy4gWW91IG1heSBuZWVkIHRvIGRvIGV4dHJhXG4gICAgICAgIC8vIHdvcmsgdG8gbWFrZSB5b3VyIGNvZGUgd29yaywgYWxsIGluIHRoZSBuYW1lIG9mIHN0cmljdCBhZGhlcmVuY2UgdG8gc3RhbmRhcmRzLiBJdCdzIHVwIHRvIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuY29udGVudC5kYXRhc2V0KSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRlbnQuZGF0YXNldFthdHRyXTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSB8fCBhdHRyID09PSAnaTVfaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEF0dHJpYnV0ZXMucHVzaCh7IG5hbWU6IGF0dHIsIHZhbHVlOiB2YWx1ZSB8fCAnJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgdGV4dEh0bWxTZXQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIGN1cnJlbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5fcGFyc2VBdHRyaWJ1dGVOYW1lKHByb3AubmFtZSk7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIFJlZ3VsYXIgYXR0cmlidXRlcyB3aWxsIGFsbCBtYXRjaCB0aGlzLlxuICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hbWUgPSB0aGlzLl9uYW1lIHx8IHByb3AudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImF0dHJcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQXR0cmlidXRlTWFwcGluZyh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJzd2l0Y2hDbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDc3NDbGFzc1N3aXRjaCh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZXh0XCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12PiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaHRtbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dEh0bWxTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldCBpNV90ZXh0IGFuZCBpNV9odG1sIGF0IHNhbWUgdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0SHRtbFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBgPGktdiBub2VzY2FwZT4ke3Byb3AudmFsdWV9PC9pLXY+YDsgLy8gVXNlIHRoaXMgYXMgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdHRyaWJ1dGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlmTmVnYXRpdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkocHJvcC52YWx1ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzc1N0eWxlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENzc0NsYXNzKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpbnB1dFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsc2UgZmFsbCB0aHJvdWdoLCB1c2luZyB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGF0dHJpYnV0ZSBhcyBhIHRhcmdldCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0dHJpYnV0ZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0YXJnZXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXcml0ZVRhcmdldChwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9vcFwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBHcmFiIHRoZSBiYXNlIGNvbnRlbnQgZm9yIHRoZSBsb29wLCBwdWxsaW5nIGl0IG91dCBvZiB0aGUgRE9NLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvb3AocHJvcC52YWx1ZSwgRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCksIHR5cGUuZGV0YWlsID09PSAnbnVsbCcpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgdXNlZCBhcyBhIHNlbGVjdG9yLiBIYXMgbm8gZnVuY3Rpb25hbGl0eVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgSW1wbGVtZW50ZWQgSWNoaWdvIGF0dHJpYnV0ZTogXCIgKyB0eXBlLnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZGVmZXJJZk5lZWRlZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWZlciA9IHRoaXMuX2RlZmVyIHx8IHByb3AudmFsdWUuc3RhcnRzV2l0aCgndGhpcy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfcGFyc2VBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgICAvLyBHZW5lcmFsIGljaGlnbyBzaG9ydGN1dFxuICAgICAgICAgICAgbmFtZSA9ICdpNV8nICsgbmFtZS5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnaTVfaXRlbScpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCB0byBpbmRpY2F0ZSBhbiBpdGVtIGNvbXBvbmVudCwgbm90aGluZyBlbHNlLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9ldmVudCcpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdXNlZCBvbmx5IGluIENvbXBvbmVudC5hZGRJbmxpbmVFdmVudExpc3RlbmVycygpLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuYW1lLnN0YXJ0c1dpdGgoJ2k1XycpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYXR0cicpKSB7XG4gICAgICAgICAgICBpZiAobmFtZVs3XSAhPT0gJzonICYmIG5hbWVbN10gIT09ICdfJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5kaW5nIGF0dHJpYnV0ZSBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2F0dHInLCBkZXRhaWw6IG5hbWUuc2xpY2UoOCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2Jvb2wnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZVs3XSAhPT0gJzonICYmIG5hbWVbN10gIT09ICdfJyAmJiBuYW1lWzddICE9PSAnLScgJiYgbmFtZVs3XSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVbN10gPT09ICctJyB8fCBuYW1lWzddID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgNykgKyBuYW1lLnNsaWNlKDgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdib29sTmVnYXRpdmUnIDogJ2Jvb2wnLCBkZXRhaWw6IG5hbWUuc2xpY2UoOCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X3N3aXRjaCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzldICE9PSAnOicgJiYgbmFtZVs5XSAhPT0gJ18nICYmIG5hbWVbOV0gIT09ICctJyAmJiBuYW1lWzldICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3dpdGNoIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs5XSA9PT0gJy0nIHx8IG5hbWVbOV0gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA5KSArIG5hbWUuc2xpY2UoMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgMTEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGFzcyBzd2l0Y2ggbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ3N3aXRjaENsYXNzTmVnYXRpdmUnIDogJ3N3aXRjaENsYXNzJywgZGV0YWlsOiBuYW1lLnNsaWNlKDEwKSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaWYnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZS5zbGljZSgtMSkgPT09ICctJyB8fCBuYW1lLnNsaWNlKC0xKSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnaWZOZWdhdGl2ZScgOiAnaWYnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9sb29wJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSAnaTVfbG9vcDpudWxsJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdsb29wJywgZGV0YWlsOiAnbnVsbCcgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdsb29wJyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfdGFyZ2V0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAoeyB0eXBlOiAndGFyZ2V0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2lucHV0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHR3b1dheSA9IG5hbWUuZW5kc1dpdGgoJ192YWx1ZScpIHx8IG5hbWUuZW5kc1dpdGgoJzonKTtcbiAgICAgICAgICAgIHJldHVybiAoeyB0eXBlOiAnaW5wdXQnLCBkZXRhaWw6IHR3b1dheSA/ICcyd2F5JyA6ICcnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHR5cGU6IG5hbWUuc2xpY2UoMykgfTtcbiAgICB9XG59XG5leHBvcnRzLkJvdW5kQ29tcG9uZW50ID0gQm91bmRDb21wb25lbnQ7XG4vLyBVc2UgYSBjdXN0b20gZWxlbWVudCB0byBjcmVhdGUgYSByZXBsYWNlbWVudCB0YWcgdGhhdCBpcyBub3QgbGltaXRlZCwgYXMgc3BhbiBpcywgdG8gY29udGFpbmluZyBubyBibG9jayBlbGVtZW50cy5cbi8vIE5vIGxvZ2ljLCBubyBzcGVjaWFsIGRpc3BsYXkgZGV0YWlscy5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuY2xhc3MgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmV4cG9ydHMuVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlID0gVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBHZXRVbmlxdWVJZF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG4vKipcbiAqIEEgY2xhc3Mgd2l0aCBhIGNvbnRlbnQgcHJvcGVydHkgdGhhdCBwb2ludHMgdG8gc29tZXRoaW5nIG9uIHRoZSBwYWdlLCBhbG9uZyB3aXRoIHNvbWUgb2YgaGVscGVyIG1ldGhvZHMuXG4gKlxuICogVGhpcyBjbGFzcyBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgYmFzZSBjbGFzcyBmb3Igb3RoZXIgY2xhc3Nlcywgc28gaXQncyBtYXJrZWQgYWJzdHJhY3QuIEl0IGp1c3QgZG9lc24ndFxuICogbWFrZSBzZW5zZSB0byBtZSB0byBjcmVhdGUgQ29tcG9uZW50IHdpdGggbm90aGluZyBjdXN0b21pemVkLiBKdXN0IGNyZWF0ZSBhbiBIVE1MRWxlbWVudC4gVGhlIGhlbHBlcnMgYXJlbid0IHJlYWxseVxuICogdGhhdCBpbXByZXNzaXZlLCB3aGVuIHlvdSBjb25zaWRlciB0aGF0IHRoZSB0cmFkZW9mZiBpcyBoYXZpbmcgdG8gcmVmZXJlbmNlIG9iai5jb250ZW50IHRvIG1vZGlmeSB0aGUgRE9NLlxuICovXG5jbGFzcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IHVuZGVyc3RhbmQgdGhhdCB0aGlzLmNvbnRlbnQgaXMgc2V0IGluIEFMTCBvZiB0aGUgcHJpdmF0ZSBjdG9yIGZ1bmN0aW9ucy5cbiAgICAgICAgdGhpcy5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgaWYgKGFyZ3MgJiYgdHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBfY3Rvcl9zdHJpbmcuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzICYmIGFyZ3Muc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIF9jdG9yX2xvb2t1cC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFhcmdzKSB7XG4gICAgICAgICAgICBfY3Rvcl9lbXB0eS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MuZWxlbWVudCkge1xuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2N0b3JfaW5uZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29udGFpbmVyVHlwZSBjb3VsZCBiZSBhbnkgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIHRhZyBmb3IgdGhlIGNvbXBvbmVudC4gSWYgaXQncyBhIGN1c3RvbSB0YWcsIHRoZSBicm93c2VyIHdpbGwgc2VlXG4gICAgICAgIC8vIGFzIEhUTUxVbmtub3duRWxlbWVudC4gSWYgeW91IHdhbnQgdGhlIGJyb3dzZXIgdG8ga25vdyBhYm91dCBpdCwgdGhlbiBwYXNzIGEgY29uc3RydWN0b3IgaW4gY29udGFpbmVyQ3VzdG9tRWxlbWVudFxuICAgICAgICBpZiAoYXJncyAmJiBhcmdzLmN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250ZW50LnRhZ05hbWUuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSFRNTCBDdXN0b20gRWxlbWVudHMgcmVxdWlyZSBhIGRhc2ggaW4gdGhlaXIgdGFnLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KHRoaXMuY29udGVudC50YWdOYW1lKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUodGhpcy5jb250ZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSwgYXJncy5jdXN0b21FbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJJ3ZlIG5ldmVyIHNlZW4gY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cyB3b3JraW5nIGluIENocm9tZS4gWU1NVlxuICAgICAgICBpZiAoJ2lzJyBpbiB0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0N1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHMgYXJlIG5vdCBzdXBwb3J0ZWQuIFRoaXMgbWF5IGZhaWwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBDb21wb25lbnQoKTtcbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfZW1wdHkoKSB7XG4gICAgICAgICAgICAvLyBObyBhcmd1bWVudHNcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgZmluZSBhcyBsb25nIGFzIFRFbGVtZW50IGlzIERJVi4gTm8gd2F5IHRvIHZlcmlmeSB0aGF0IGFzIGl0J3MgYSB0eXBlc2NyaXB0IGlsbHVzaW9uLiBKUyBkb2Vzbid0IHNlZSB0eXBlIHBhcmFtZXRlcnMuXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlkOiBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3JfbG9va3VwKGV4aXN0aW5nRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU2hvcnRjdXQgZm9yIGV4aXN0aW5nRWxlbWVudC5cbiAgICAgICAgICAgIC8vIFRoZSBtYWluIHJlYXNvbiBpdCBleGlzdHMgaXMgdGhhdCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCBkb2Vzbid0IHJldHVybiB0aGUgY29ycmVjdCB0eXBlIChpdCdzIG5vdCBnZW5lcmljKSxcbiAgICAgICAgICAgIC8vIHNvIHR5cGVzY3JpcHQgZnJlYWtzIG91dCBhbmQgdGhpbmtzIGl0IHNob3VsZCBiZSBhIFNUUklORywgaW4gc3BpdGUgb2YgdGhlIHR5cGUgZGVmaW5pdGlvbiBub3QgYmVpbmcgYW55dGhpbmdcbiAgICAgICAgICAgIC8vIGxpa2UgdGhhdC4gSXQncyBqdXN0IGVhc2llciB0byB1c2UgdGhpcyB0aGFuIHRvIHJlbWVtYmVyIFwib2gsIHJpZ2h0LCBpIGhhdmUgdG8gdXNlIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoKSwgd2hpY2ggaXMgZ2VuZXJpY1wiLlxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IChleGlzdGluZ0VsZW1lbnQucGFyZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKGV4aXN0aW5nRWxlbWVudC5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgc2VsZWN0b3IgY291bGQgbm90IGZpbmQgZWxlbWVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdG9yX2V4aXN0aW5nRWxlbWVudC5jYWxsKHRoaXMsIHsgZWxlbWVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9leGlzdGluZ0VsZW1lbnQoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBleGlzdGluZ0VsZW1lbnQuZWxlbWVudDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGF0dHIsIGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9pbm5lckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gTmV3IGVsZW1lbnQuIFVzZXIgc3BlY2lmaWVzIHRoZSBpbm5lciBIVE1MIGZvciB0aGUgY29udGVudC5cbiAgICAgICAgICAgIC8vIFRoaXMgY291bGQgYmUgYW4gZW1wdHkgb2JqZWN0IGxpa2Uge30sIHByYWN0aWNhbGx5IHRoZSBzYW1lIGFzIGNhbGxpbmcgaXQgd2l0aCBubyBhcmdzXG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHsgaW5uZXJIVE1MOiBuZXdFbGVtZW50LmlubmVySHRtbCB8fCAnJyB9O1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcywgbmV3RWxlbWVudC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnQudHlwZSB8fCBFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBwcm9wcywgbmV3RWxlbWVudC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbnRlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBHZXRVbmlxdWVJZF8xLmdldFVuaXF1ZUlkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2N0b3Jfb3V0ZXJIdG1sKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFVzZXIgc3BlY2lmaWVzIHRoZSBmdWxsIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGl0IGNhbid0IGJlIHR5cGUgY2hlY2tlZC4gSlMgY2FuJ3Qgc2VlIHdoYXQgVEVsZW1lbnQgaXMuXG4gICAgICAgICAgICBjb25zdCB0bXBkaXYgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG5ld0VsZW1lbnQub3V0ZXJIdG1sLnRyaW0oKSk7XG4gICAgICAgICAgICBpZiAodG1wZGl2LmNoaWxkTm9kZXMubGVuZ3RoICE9PSAxIHx8ICF0bXBkaXYuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ091dGVySHRtbCBtdXN0IGNvbnRhaW4gZXhhY3RseSBvbmUgSFRNTEVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSBhdHRyaWJ1dGVzICh3aGljaCBhcmUgdGhlIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhuZXdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3RWxlbWVudC5hdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIG92ZXJ3cml0ZSB3aXRoIHByb3BlcnRpZXMgKHdoaWNoIGFyZSBjdXJyZW50KVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50LCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3BlY2lmaWVkIElEIHRha2VzIHByZWNlZGVuY2VcbiAgICAgICAgICAgIGlmIChuZXdFbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlkID0gbmV3RWxlbWVudC5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9zdHJpbmcobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gU3RyaW5nIGJ5IGl0c2VsZiBpcyBhIHNob3J0Y3V0IGZvciBvdXRlckh0bWxcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIHsgb3V0ZXJIdG1sOiBuZXdFbGVtZW50IH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqXG4gICAgICogSXQgZG9lc24ndCBoYXZlIHRvIGJlIGEgY3VzdG9tIHRhZy4gSXQgY291bGQgYmUgYSBjbGFzcywgbGlrZSA8cCBjbGFzcz0nYmluZC10by1tb2RlbFwiPiAoc2VsZWN0b3I9Jy5iaW5kLXRvLW1vZGVsJylcbiAgICAgKiBvciA8cCBpY2hpZ28+IChzZWxlY3Rvcj0nW2ljaGlnb10nKS5cbiAgICAgKlxuICAgICAqIFRvIGNvbXBsZXRlbHkgcmVwbGFjZSB0aGUgZXhpc3RpbmcgZWxlbWVudCAoY29weWluZyBleGlzdGluZyBhdHRyaWJ1dGVzKSBzZW5kIHRoZSByZWxldmFudCBvcHRpb25zLCBwbHVzIHtyZXBsYWNlOiB0cnVlfS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZWxlbWVudCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGVsZW1lbnQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdChzZWxlY3Rvciwgb3B0LCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyBfaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBjb25zdCBjb250YWluZXJzID0gdGhpcy5fbG9va1VwQ29udGFpbmVyc1RvSW5qZWN0KHNlbGVjdG9yKTtcbiAgICAgICAgZm9yIChjb25zdCBjb250YWluZXIgb2YgY29udGFpbmVycykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIC8vIENhbid0IGhhdmUgZHVwZSBJRHMgYmVpbmcgY3JlYXRlZCBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgY29udGFpbmVycy4gVGhlcmUgYXJlIDMgcGxhY2VzIHdoZXJlIElEIGNhbiBiZSBzZXQuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5pZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdwcm9wZXJ0aWVzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5wcm9wZXJ0aWVzLmlkOyAvLyBET00gcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoJ2F0dHJpYnV0ZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmF0dHJpYnV0ZXMuaWQ7IC8vIEhUTUwgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlcGxhY2VyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY29udmVydGVyRnVuY3Rpb24oY29udGFpbmVyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIHN0YXRpYyBfbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gVGhpcyBhdHRlbXB0cyB0byBwcmVzZXJ2ZSB0aGUgYXR0cmlidXRlcyBzZXQgb24gdGhlIHJlcGxhY2VkIGVsZW1lbnQuIFRoYXQgb3BlbnMgYW4gdWdseSBjYW4gb2Ygd29ybXMsXG4gICAgICAgIC8vIGJ1dCBpdCBzaG91bGQgbWFrZSByZXBsYWNlbWVudCBjb21wb25lbnRzIG1vcmUgdXNlZnVsIGJlY2F1c2UgaXQgYWxsb3dzIHRoZW0gdG8gdmFyeS5cbiAgICAgICAgLy8gSXQgZG9lcyBtYWtlIGEgYnJ1dGFsIGp1Z2dsaW5nIGFjdDpcbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGlubmVySFRNTCwgd2Ugd2FudCB0byB0YWtlIGl0LlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBpbm5lckhUTUwgc2hvdWxkIG92ZXJyaWRlIHRoZSBleGlzdGluZyBlbGVtZW50J3MuXG4gICAgICAgIC8vIElmIHRoZSBleGlzdGluZyBlbGVtZW50IGhhcyBhdHRyaWJ1dGVzLCB3ZSB3YW50IHRvIHRha2UgdGhlbS5cbiAgICAgICAgLy8gSWYgb3V0ZXJIVE1MIGlzIHByb3ZpZGVkLCB0aGUgb3V0ZXJIVE1MJ3MgYXR0cmlidXRlcyBzaG91bGQgb3ZlcnJpZGUgdGhlbS5cbiAgICAgICAgLy8gRm9yIGFueSBhdHRyaWJ1dGVzIHBhc3NlZCBpbiBPUFRJT05TLCB0aGV5IHNob3VsZCBvdmVycmlkZSBhbnl0aGluZyB0aGF0IGNhbWUgYmVmb3JlLlxuICAgICAgICAvLyBGb3IgYW55IHByb3BlcnRpZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIE9ubHkgdGhlIGxhc3QgMiBhcmUgaGFuZGxlZCBpbiB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yLiBBbmQgaWYgd2UncmUgbm90IGNhcmVmdWwsIHdlIGNvdWxkIGJyZWFrIHRoZW0uXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7IGlubmVySFRNTDogZXhpc3RpbmdFbGVtZW50LmlubmVySFRNTCB9O1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGV4aXN0aW5nRWxlbWVudC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXR0cmlidXRlc1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgLy8gVGhpcyBpcyB1Z2x5IGJlY2F1c2UgaXQgaGFwcGVucyBhZ2FpbiBpbiB0aGUgY29uc3RydWN0b3IuIE5vIG90aGVyIGNsZWFuIHdheSB0byBwYXJzZSB0aGUgZWxlbWVudCBhdHRyaWJ1dGVzLCB0aG91Z2guXG4gICAgICAgIGlmIChvcHQub3V0ZXJIdG1sKSB7XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDcmVhdGVFbGVtZW50XzEuZGl2KG9wdC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXAuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wMiA9IHRtcC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIC8vIFRoZSBvdXRlciBIVE1MIGF0dHJpYnV0ZXMgZ2V0IHBpY2tlZCB1cCBhdXRvbWF0aWNhbGx5IHdoZW4gYWRkZWQgdG8gdGhlIERPTSwgc28gd2UgcmVhbGx5XG4gICAgICAgICAgICAvLyBqdXN0IG5lZWQgdG8gZGlzY2FyZCB0aGUgbWF0Y2hpbmcgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcyBvZiB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmlubmVySFRNTDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKHRtcDIuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lIGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJpYnV0ZXNbYXR0ci5uYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0LnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIG9wdC5wcm9wZXJ0aWVzKTtcbiAgICAgICAgb3B0LmF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIG9wdC5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcmV0dXJuIG9wdDtcbiAgICB9XG4gICAgc3RhdGljIF9nZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG9wdDtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgcmVwbGFjaW5nIHRoZSBvdXRlciBIVE1MXG4gICAgICAgICAgICBvcHQgPSB7IHJlcGxhY2U6IHRydWUsIG91dGVySHRtbDogb3B0aW9ucyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCBrbm93IHRoYXQgb3B0aW9ucyAhPT0gJ3N0cmluZycgKGNhbid0IHJlYWQgXCJlbHNlIGlmXCIgY2xhdXNlKVxuICAgICAgICAgICAgb3B0ID0gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZXhpc3RpbmdFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVwbGFjZUNoaWxkKGNvbXBvbmVudC5jb250ZW50LCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnRXaXRoQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgY29uc3RydWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb25zdHJ1Y3Rvcih7IGVsZW1lbnQ6IGV4aXN0aW5nRWxlbWVudCB9KTtcbiAgICB9XG4gICAgc3RhdGljIF9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nKSB7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gSSd2ZSBkb25lIHRoaXMgbXlzZWxmLCB3aGljaCByZXN1bHRzIGluIGEgc2lsZW50IGZhaWx1cmUgaWYgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0luamVjdGlvbiBzZWxlY3RvciBpcyBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgfHwgJ1tpY2hpZ29dJztcbiAgICAgICAgLy8gTG9vayB1cCB0aGUgZWxlbWVudHMgdG8gZWl0aGVyIHJlcGxhY2Ugb3IgY29udmVydFxuICAgICAgICBsZXQgY29udGFpbmVycztcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gQXJyYXkuZnJvbShzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnICYmICdzZWxlY3RvcicgaW4gc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGVjdG9yLnBhcmVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLnNlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXJzID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFpbmVycztcbiAgICB9XG4gICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmlkO1xuICAgIH1cbiAgICBzZXQgaWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlkID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBpbm5lckhUTUwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MO1xuICAgIH1cbiAgICBzZXQgaW5uZXJIVE1MKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBXaWxsIHJldHVybiB1bmRlZmluZWQgaWYgY29udGVudCBpcyBub3QgYSBmb3JtIGZpZWxkIHR5cGVcbiAgICAgICAgcmV0dXJuIEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50KTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIC8vIFdpbGwgbG9nIGEgd2FybmluZyBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICBGb3JtRmllbGRWYWx1ZV8xLnNldEZvcm1GaWVsZFZhbHVlKHRoaXMuY29udGVudCwgdmFsdWUpO1xuICAgIH1cbiAgICBnZXQgY2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmNsYXNzTmFtZTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc0xpc3Q7XG4gICAgfVxuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5zdHlsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIEhUTUwgZXZlbnQgbGlzdGVuZXIgb24gdGhlIENvbXBvbmVudCBjb250ZW50LiBGbHVlbnQuXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIHRoZSBIVE1MIGZvciBpNV9ldmVudCBvciA6ZXZlbnQgYXR0cmlidXRlcyBhbmQgYWRkIGV2ZW50IGxpc3RlbmVycyBhY2NvcmRpbmcgdG8gaW5saW5lIGN1c3RvbSBhdHRyaWJ1dGVzLlxuICAgICAqIEZpbHRlciBieSBtYXRjaGluZyB0aGUgY29tcG9uZW50RmlsdGVyIGlucHV0IHdpdGggYW4gYXR0cmlidXRlIGxpa2UgY29tcG9uZW50PVwiY29tcG9uZW50RmlsdGVyXCIuXG4gICAgICogRW5jbG9zZSB0aGUgZXZlbnQgdHlwZSBpbiBwYXJlbnRoZXNlcywgYW5kIGZvciB0aGUgdmFsdWUsIGVudGVyIHRoZSBuYW1lIG9mIGEgbWV0aG9kIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAqIEV4YW1wbGU6IDxmb3JtIDpldmVudCAoY2xpY2spPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKi9cbiAgICBhZGRJbmxpbmVFdmVudExpc3RlbmVycyhjb21wb25lbnRGaWx0ZXIpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB3ZSBjb3VsZCBza2lwIHRoaXMgaW5pdGlhbCBmaWx0ZXIsIGxpa2UgYW5ndWxhciBkb2VzLiBCdXQgdGhlcmUgaXMgbm8gQ1NTIHNlbGVjdG9yIGZvclxuICAgICAgICAvLyBhdHRyaWJ1dGUgbmFtZSBiZWdpbnMgd2l0aCBvciBlbmRzIHdpdGguIFthdHRyXj1dIGlzIGZvciB0aGUgVkFMVUUgYmVnaW5uaW5nIHdpdGggc29tZXRoaW5nLlxuICAgICAgICAvLyBUaGlzIGluY2x1ZGVzIHRoZSBjb250ZW50IGl0c2VsZiBpbiBpdHMgY2hlY2suXG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRGaWx0ZXIgJiYgZWxlLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgIT09IGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKGVsZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnKCcpICYmIGYubmFtZS5lbmRzV2l0aCgnKScpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uIHx8ICFldmVudERlZmluaXRpb24udmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50IGRlZmluaXRpb24gbm90IGRlY2xhcmVkIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdGhpc1tldmVudERlZmluaXRpb24udmFsdWVdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhhbmRsZXIgbWV0aG9kIGZvciBlbGVtZW50ICR7ZWxlLmlkIHx8IGVsZS50YWdOYW1lfSAke2V2ZW50RGVmaW5pdGlvbi52YWx1ZX0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50RGVmaW5pdGlvbi5uYW1lLnNsaWNlKDEsIC0xKSwgbWV0aG9kLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhcHBlbmQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGVuZENoaWxkKG5ld0NoaWxkKSB7XG4gICAgICAgIGlmIChndWFyZChuZXdDaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kVG9QYXJlbnQocGFyZW50KSB7XG4gICAgICAgIGlmIChndWFyZChwYXJlbnQpKSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGNvbXBvbmVudCB0byBDb21wb25lbnRNYXAuXG4gICAgICovXG4gICAgbWFwQ29tcG9uZW50KCkge1xuICAgICAgICAvLyBUaHJvdyBhbiBlcnJvciBpZiB0aGUgY29udGVudCBoYXMgYWxyZWFkeSBiZWVuIHJlbGF0ZWQgdG8gYSBkaWZmZXJlbnQgY29tcG9uZW50XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5nZXRDb21wb25lbnQodGhpcy5jb250ZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IGFscmVhZHkgcmVmZXJlbmNlZCBieSBhIGNvbXBvbmVudCcpO1xuICAgICAgICB9XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldCh0aGlzLmNvbnRlbnQsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBjb21wb25lbnQgZnJvbSBDb21wb25lbnRNYXAuIFNvbWV0aW1lcyB5b3UgbWlnaHQgbmVlZCB0byB1c2UgdGhpcy4gQnV0IGhvcGVmdWxseSByYXJlbHksIGJlY2F1c2UgaXQncyB1c2luZyBhIFdlYWtNYXAsXG4gICAgICovXG4gICAgdW5tYXBDb21wb25lbnQoKSB7XG4gICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBjb21wb25lbnRzIHRoYXQgYXJlIG5lc3RlZCBpbnNpZGUgdGhpcyBjb21wb25lbnQuXG4gICAgICovXG4gICAgKmdldEFsbENoaWxkQ29tcG9uZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBlIG9mIHRoaXMuY29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudChlKTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0U3R5bGUocHJvcGVydHksIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdzdHJpbmcnICYmIHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAvLyBUUyBqdXN0IGZvcmdvdCB0aGF0IHByb3BlcnR5IGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4uXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcHJvcGVydHlbcHJvcF07XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENsYXNzKGNsYXNzTmFtZXMpIHtcbiAgICAgICAgaWYgKCFjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZXMgPT09IFwic3RyaW5nXCIgJiYgY2xhc3NOYW1lcy5pbmNsdWRlcyhcIiBcIikpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc05hbWVzLnNwbGl0KFwiIFwiKS5maWx0ZXIocSA9PiBxICE9PSBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IFtjbGFzc05hbWVzXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgY2xhc3NOYW1lcykge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGhlIHF1ZXN0aW9uIG5lZWRzIHRvIGJlIGFza2VkOiBpZiB5b3UgY2FuIGFkZCBhIGNvbXBvbmVudCB0byBhIHBhZ2UgYnkgZG9pbmcgZWxlbWVudC5hcHBlbmRDaGlsZChjb21wb25lbnQuY29udGVudCksXG4gKiBob3cgZG8geW91IGRvIGZyb20gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpIGFuZCBnZXQgdG8gY29tcG9uZW50LCBub3QgY29tcG9uZW50LmNvbnRlbnQ/IFRoaXMgaXMgaG93LlxuICpcbiAqIHZhciBjb21wb25lbnQgPSBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpKTtcbiAqXG4gKiBUaGlzIHdpbGwgd29yayBhcyBsb25nIGFzIENvbXBvbmVudE1hcC5jb21wb25lbnRzLnNldChjb250ZW50LCBjb21wb25lbnQpIGhhcyBiZWVuIGNhbGxlZCBhdCBzb21lIHBvaW50LlxuICpcbiAqIFRoaXMgaXMgdGhlIGFwcHJvdmVkIHdheSBvZiBkb2luZyBpdC4gQW5vdGhlciBwb3NzaWJsZSBzb2x1dGlvbiB3b3VsZCBiZSB0aGUgdXNlIG9mIGV4cGFuZG8gcHJvcGVydGllcyxcbiAqIGZvciBleGFtcGxlIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKS5yZWxhdGVkQ29tcG9uZW50ID0gY29tcG9uZW50LiBUaGlzIHdvcmtzIGFuZCBpdCdzIHN1cGVyIHNpbXBsZSxcbiAqIGJ1dCBzZWVtcyB0byBiZSBmcm93bmVkIHVwb24gLi4uIGl0IGhhcyBiZWVuIGtub3duIHRvIGNyZWF0ZSBtZW1vcnkgbGVha3MgaW4gdGhlIHBhc3QuIFdlYWtNYXAgaXMgdGhlIG9iamVjdFxuICogc3BlY2lmaWNhbGx5IGNyZWF0ZWQgZm9yIHRoaXMgdXNlIGNhc2UsIHNvIHRoYXQgaXMgdXNlZCBoZXJlLlxuICpcbiAqIElmIGV4dGVuc2lvbiBtZXRob2RzIGFyZSBsb2FkZWQsIHlvdSBjYW4gdXNlIHRoZSBlbGVtZW50LmdldENvbXBvbmVudCgpIHNob3J0Y3V0LlxuICovXG5jbGFzcyBDb21wb25lbnRNYXAge1xufVxuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0cy5Db21wb25lbnRNYXAgPSBDb21wb25lbnRNYXA7XG5mdW5jdGlvbiBnZXRDb21wb25lbnQoZWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xuICAgICAgICBpZiAoIWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChlbGVtZW50KTtcbiAgICB9XG59XG5leHBvcnRzLmdldENvbXBvbmVudCA9IGdldENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Db21wb25lbnRCaW5kaW5nT3B0aW9ucyA9IENvbXBvbmVudEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBvcHQuZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zID0gRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG9wdC5zZWxlY3RvcjtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnMgPSBFeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBJbm5lckh0bWxCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW5uZXJIdG1sQmluZGluZ09wdGlvbnMgPSBJbm5lckh0bWxCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgT3V0ZXJIdG1sQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5vdXRlckh0bWwgPSBvcHQub3V0ZXJIdG1sO1xuICAgIH1cbn1cbmV4cG9ydHMuT3V0ZXJIdG1sQmluZGluZ09wdGlvbnMgPSBPdXRlckh0bWxCaW5kaW5nT3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0VsZW1lbnRPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBvcHQuZWxlbWVudDtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nRWxlbWVudE9wdGlvbnMgPSBFeGlzdGluZ0VsZW1lbnRPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIExvb2sgdXAgYW4gZXhpc3RpbmcgZWxlbWVudCBpbiB0aGUgRE9NIGFuZCBjb252ZXJ0IGl0IHRvIGEgY29tcG9uZW50LiBUaGlzIGlzIGp1c3QgYSB3YXkgdG8gc2ltcGxpZnkgdGhlIGxvb2t1cCBwcm9jZXNzIHZzIGRvaW5nXG4gKiBpdCBtYW51YWxseSBiZWZvcmUgdXNpbmcgSUV4aXN0aW5nRWxlbWVudE9wdGlvbnMuXG4gKiBOb3RlOiBUeXBlc2NyaXB0IGNhbid0IHZlcmlmeSB5b3VyIHR5cGUgYW5ub3RhdGlvbnMgaWYgeW91IGRvIGl0IHRoaXMgd2F5LlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nTG9va3VwT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG9wdC5zZWxlY3RvcjtcbiAgICB9XG59XG5leHBvcnRzLkV4aXN0aW5nTG9va3VwT3B0aW9ucyA9IEV4aXN0aW5nTG9va3VwT3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBJbm5lckh0bWxPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW5uZXJIdG1sT3B0aW9ucyA9IElubmVySHRtbE9wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgT3V0ZXJIdG1sT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5vdXRlckh0bWwgPSBvcHQub3V0ZXJIdG1sO1xuICAgIH1cbn1cbmV4cG9ydHMuT3V0ZXJIdG1sT3B0aW9ucyA9IE91dGVySHRtbE9wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZUNoZWNrKG9iaikge1xuICAgIC8vIE5vdCBhbiBleGhhdXN0aXZlIHRlc3QgYnV0IGl0J3MgdGhlIGltcG9ydGFudCBiaXQuXG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAnY2hhbmdlSGFuZGxlcicgaW4gb2JqICYmIG9iai5jaGFuZ2VIYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlQ2hlY2sgPSBvYnNlcnZhYmxlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuLyoqXG4gKiBDb21tb24gbG9naWMgYmV0d2VlbiB0aGUgZGlmZmVyZW50IG9ic2VydmFibGUgY2xhc3Nlcy4gVGhlc2UgaW1wbGVtZW50IElPYnNlcnZhYmxlLiBUaGUgaW52b2NhdGlvbiBpdHNlbGYgdmFyaWVzIGZyb20gY2xhc3MgdG8gY2xhc3MuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGZvcndhcmRUbywgYnViYmxlRnJvbSwgZGlzYWJsZUFzeW5jIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGlmIChkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcndhcmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBidWJibGVGcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWdEZWxlZ2F0ZShuYW1lKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgaGFzIGZvcmdvdHRlbiB0aGF0IEV2ZW50SGFuZGxlciBjYW4gYWNjZXB0IGFuIGFycmF5LlxuICAgICAgICAvLyBJbiBzcGl0ZSBpZiB0aGUgZmFjdCB0aGF0IHRoaXMgc2lnbmF0dXJlIGlzIGlkZW50aWNhbC5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci5zdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhlIGlucHV0J3MgZGVsZWdhdGUgdG8gdGhpcyBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pIHtcbiAgICAgICAgLy8gSm9pbiB0aGUgb3RoZXIgZXZlbnQgaGFuZGxlciB0byB0aGlzLCBzbyB0aGF0IHdoZW4gdGhpcyBpcyBpbnZva2VkLCBzbyBpcyB0aGUgb3RoZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKGZvcndhcmRUby5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoaXMgb2JqZWN0J3MgZGVsZWdhdGUgdG8gdGhlIGlucHV0IG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oYnViYmxlRnJvbSkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gZXZlbnRzIHJhaXNlZCBvbiB0aGUgb3RoZXIgaGFuZGxlciwgc28gdGhhdCB3aGVuIHRoYXQgaXMgaW52b2tlZCwgc28gaXMgdGhpc1xuICAgICAgICAvLyBUaGUgc2FtZSBhcyBmb3J3YXJkQ2hhbmdlRXZlbnRzVG8gZXhjZXB0IHRoYXQgdGhpcyBpcyB0aGUgdGFyZ2V0LCBub3QgdGhlIHNvdXJjZS5cbiAgICAgICAgYnViYmxlRnJvbS5zdWJzY3JpYmUodGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZVNlbmRlcihzZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcik7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwcm9iYWJseSBmcm93bmVkIHVwb24gKHNlZSBob3cgVFMgZG9lc24ndCBsaWtlIGl0KSwgYnV0IGl0J3MgdmFsaWQgSlMuXG4gICAgICogSXQncyBvbmx5IGludGVuZGVkIGZvciB0cm91Ymxlc2hvb3RpbmcsIG5vdCByZWFsIGxvZ2ljLiBUaGVyZSBhcmUgdGltZXMgd2hlbiB5b3UncmVcbiAgICAgKiB0cnlpbmcgdG8gaWRlbnRpZnkgZXhhY3RseSB3aGljaCBkZWxlZ2F0ZXMgYXJlIHN1YnNjcmliZWQsIGFuZCB0aGlzIGlzIHJlYWxseSBoYXJkIHdoZW5cbiAgICAgKiBub3RoaW5nIGhhcyBodW1hbi1yZWFkYWJsZSBuYW1lcy5cbiAgICAgKi9cbiAgICB0YWdEZWxlZ2F0ZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUuX3RhZyA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB4IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBcImNoYW5nZUhhbmRsZXJcIiAmJiB4ICE9PSBcInByaXZhdGVQcm9wZXJ0eTJcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdFt4XSA9IHRoaXNbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVCYXNlID0gT2JzZXJ2YWJsZUJhc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gT2JzZXJ2YWJsZVByb3BlcnR5IGlzIGEgcHJvcGVydHkgdGhhdCBhdXRvbWF0aWNhbGx5IHJhaXNlcyBhIFByb3BlcnR5Q2hhbmdlZCBldmVudCB3aGVuIGl0IGlzIG1vZGlmaWVkLiBUaGlzIGlzIG1vcmVcbiAqIGNvbnZlbmllbnQgdGhhbiBoYXZpbmcgdG8gZG8gaXQgbWFudWFsbHkgZXZlcnkgdGltZSB5b3UgbmVlZCBpdC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVByb3BlcnR5IGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IG9wdGlvbnMub25seVdoZW5DaGFuZ2VkIHx8IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkLCB2YWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgKGlmIGEgc3RyaW5nKSB0aGF0IGhhcyBoYWQgc3BlY2lhbCBIVE1MIGNoYXJhY3RlcnMgZXNjYXBlZC5cbiAgICAgKi9cbiAgICBnZXQgc2FmZVZhbHVlKCkge1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVQcm9wZXJ0eSA9IE9ic2VydmFibGVQcm9wZXJ0eTtcbmZ1bmN0aW9uIG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3QgbGlrZSB0aGlzIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGNoZWNraW5nIGlmIHZhbHVlIGlzIGEgc2V0dGVyLFxuICAgIC8vIGFuZCBpdCBpc24ndCwgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gY2hlY2suXG4gICAgLy8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpIGRvZXNuJ3QgY2F0Y2ggaW5oZXJpdGVkIHByb3BlcnRpZXMsIG9mXG4gICAgLy8gd2hpY2ggdGhpcyBpcyBhbG1vc3QgYWx3YXlzIG9uZS5cbiAgICAvLyBJIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGEgYmFzaWMgaW5zdGFuY2UgY2hlY2suXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlUHJvcGVydHk7XG59XG5leHBvcnRzLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrID0gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgQ2xvbmVEZWVwXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gb2JzZXJ2YWJsZSBzdGF0ZSB0aGF0IHNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIHVzaW5nIHRoZSByZWxldmFudCBtZXRob2RzLCBhbGxvd2luZyBhdG9taWMgY2hhbmdlcyB0byBtdWx0aXBsZSBwcm9wZXJ0aWVzXG4gKiBpbiBtdWx0aXBsZSBvYmplY3RzLCByYWlzaW5nIGEgc2luZ2xlIGV2ZW50LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlU3RhdGUgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnc2V0U3RhdGUnO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIEkgd291bGQgcHJlZmVyIHRoYXQgdGhpcyByZXR1cm4gUmVhZG9ubHk8VD4gYnV0IGdldHRlciBhbmQgc2V0dGVyIGhhdmUgdG8gYmUgdGhlIHNhbWUgdHlwZS5cbiAgICAgICAgLy8gVGhhdCBtZWFucyB5b3Ugd291bGQgaGF2ZSB0byBjYXN0IGFueSB2YWx1ZSB5b3Ugc2V0IGFzIGEgcmVhZG9ubHksIHdoaWNoIGlzIGEgUElUQS5cbiAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJ3cml0ZXMgdGhlIGVudGlyZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldFNhZmVWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRtcCkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodG1wKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0bXApKTtcbiAgICB9XG4gICAgZ2V0VmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBzZXRTdGF0ZSh2YWx1ZSwgb3ZlcldyaXRlQWxsID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICBsZXQgbmV3VmFsdWU7XG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICAgICAgLy8gSWYgdGhlIHR5cGUgaXMgcHJpbWl0aXZlLCB0aGVuIGEgZnVsbCBvdmVyd3JpdGUgaXMgYWxsb3dlZFxuICAgICAgICBpZiAoSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIEZ1bmN0aW9ucyB3aWxsIGV4ZWN1dGUgYnV0IHRoZXkgd29uJ3QgY2hhbmdlIHRoZSB2YWx1ZS4gVGhlIHJlYXNvbiBpcyB0aGUgc2FtZSByZWFzb24gdGhhdCB0aGlzIG1ha2VzIG5vIHBlcm1hbmVudCBjaGFuZ2UgdG8gYmFyOlxuICAgICAgICAgICAgLy8gdmFyIGZvbyA9IGZ1bmN0aW9uKHN0cikgeyBzdHIgPSBzdHIudG9VcHBlckNhc2UoKTsgfTsgdmFyIGJhciA9ICdhYmMnOyBmb28oYmFyKTsgY29uc29sZS5sb2coYmFyID09PSAnYWJjJyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FsbCBzZXRTdGF0ZSB3aXRoIGEgZnVuY3Rpb24gaWYgc3RhdGUgaXMgcHJpbWl0aXZlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3ZlcldyaXRlQWxsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3ZlcldyaXRlQWxsKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIxX292ZXJ3cml0ZUFsbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIFtuZXdWYWx1ZSwgcmV0dXJuVmFsdWVdID0gX292cjNfZnVuY3Rpb25BcmcuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlIGlzIG5vdCBhIHBhcnRpYWwgc3RhdGUgb3IgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMl9wYXJ0aWFsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnY2FsbCcsIHRoaXMucHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgICAgICByZXR1cm4geyBvbGRWYWx1ZSwgbmV3VmFsdWUsIHJldHVyblZhbHVlIH07XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX292ZXJ3cml0ZUFsbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgZW50aXJlIG9iamVjdC5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKF92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIyX3BhcnRpYWwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBQYXJ0aWFsIG9iamVjdDogT3ZlcndyaXRlIG9ubHkgdGhlIGtleXMgcHJvdmlkZWRcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdG1wW2tleV0gPSBfdmFsdWVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIzX2Z1bmN0aW9uQXJnKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgZnVuY3Rpb24gcHJvdmlkZWQgYW5kIHVwZGF0ZSB0aGUgb2JqZWN0IGFzIGRpY3RhdGVkXG4gICAgICAgICAgICAvLyBNYXliZSB1bm5lY2Vzc2FyeSBidXQgd2Ugd2FudCB0byBhdm9pZCB0aGUgY2FsbGVyIGV4ZmlsdHJhdGluZyB0aGUgc3RhdGUgdXNpbmcgYSBmdW5jdGlvbixcbiAgICAgICAgICAgIC8vIGJ5IGFjY2lkZW50LiBPZiBjb3Vyc2UsIHRoZXkgY2FuIGp1c3QgYWNjZXNzIF92YWx1ZSBieSBjYXN0aW5nIGFzIGFueSxcbiAgICAgICAgICAgIC8vIGJ1dCB0aGF0J3Mgbm90IGFjY2lkZW50YWwuXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgX3JldHVyblZhbHVlID0gX3ZhbHVlLmNhbGwodG1wLCB0bXApO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiBbdG1wLCBfcmV0dXJuVmFsdWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlU3RhdGUgPSBPYnNlcnZhYmxlU3RhdGU7XG5mdW5jdGlvbiBvYnNlcnZhYmxlU3RhdGVDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGtub3cgaWYgSSBzaG91bGQgY2hlY2sgZm9yIHRoaXMgb3IgZm9yIGdldFN0YXRlKCkgYW5kIHNldFN0YXRlKClcbiAgICByZXR1cm4gb2JqICYmIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZTtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZVN0YXRlQ2hlY2sgPSBvYnNlcnZhYmxlU3RhdGVDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBBIGRlZmVycmVkIHByb21pc2UgaXMgYSB3cmFwcGVyIGFyb3VuZCBhIHByb21pc2UgdGhhdCBhbGxvd3MgaXQgdG8gYmUgdHJpZ2dlcmVkIGxhdGVyLiBJbiBwdXJlIEpTLCB0aGlzIGlzIGhhcmRlclxuICogdGhhbiBpdCBuZWVkcyB0byBiZSwgYW5kIGl0IHRha2VzIGEgd2VpcmQgaGFjayB0byBtYWtlIGl0IHdvcmsuIFRoaXMgY2xhc3MgaXMgbGl0dGxlIG1vcmUgdGhhbiBhIHdyYXBwZXIgYXJvdW5kXG4gKiBzYWlkIGhhY2suXG4gKlxuICogT3RoZXJ3aXNlLCB0aGlzIHVzZXMgYSByZWFsIHByb21pc2UgaW50ZXJuYWxseSwgc28gYXNpZGUgZnJvbSB0aGUgd3JhcHBpbmcgb2JqZWN0LCBpdCBoYXMgbm8gc3BlY2lhbCBsb2dpYy4gSSBjaG9zZVxuICogbm90IHRvIHJlLWltcGxlbWVudCB0aGUgUHJvbWlzZSBBUEkgc3luY2hyb25vdXNseSwgc28gaXQgdXNlcyB0aGUgc2FtZSBtaWNyb3Rhc2sgcXVldWUuXG4gKlxuICogVGhlIHdyYXBwaW5nIEFQSSBpcyB0d2Vha2VkIGEgbGl0dGxlIHRvIGF2b2lkIHNvbWUgY29tbW9uIHBpdGZhbGxzIHRoYXQgYXJlIGNhdXNlZCBieSBmbGF3cyBpbiB0aGUgUHJvbWlzZVxuICogZGVzaWduLiBGb3IgZXhhbXBsZSwgaGF2aW5nIG9uZnVsZmlsbGVkIGFuZCBvbnJlamVjdGVkIGluIHRoZSBzYW1lIHN0ZXAgbWVhbnMgdGhhdCBlcnJvcnMgaW4gdGhlIGZ1bGZpbGxlZFxuICogaGFsZiB3aWxsIG5vdCBiZSBjYXVnaHQgYnkgdGhlIGVycm9yIGhhbmRsZXIuICBSYXRoZXIgdGhhbiBzYXkgXCJkb24ndCB1c2UgdGhhdCBpbnB1dFwiIGxpa2UgbW9zdCBpbnN0cnVjdG9ycyxcbiAqIEkganVzdCBnb3QgcmlkIG9mIGl0IChpdCdzIHN0aWxsIGFjY2Vzc2libGUgb24gdGhlIG91dHB1dCBwcm9wZXJ0eSwgaWYgeW91IHdhbnQgdG8gdXNlIGl0IC4uLiBidXQgZG9uJ3QpLlxuICovXG5jbGFzcyBEZWZlcnJlZFByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5IFRTIGRvZXNuJ3Qga25vdyB0aGF0IHRoZSBwcm9wZXJ0aWVzIGFyZSByZXBsYWNlZCBpbiB0aGUgcHJvbWlzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gZnVuY3Rpb24gX2R1bW15KCkgeyB9O1xuICAgICAgICAvKiogVXNlIHRoaXMgdG8gcmVqZWN0IHRoZSBwcm9taXNlIHJpZ2h0IG91dC4gV2hpY2ggaXMgcHJvYmFibHkgdXNlbGVzcyBidXQgeW91IG5ldmVyIGtub3cuICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVqZWN0ID0gZnVuY3Rpb24gX2R1bW15KCkgeyB9O1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSB3ZWlyZCBoYWNrIHRoYXQgaXMgdGhlIGJhc2lzIG9mIHRoaXMgY2xhc3MuIEl0J3MgYSBjbG9zdXJlLCBidXQgcmV2ZXJzZWQsIGFzIHRoZVxuICAgICAgICAvLyBlbmNsb3NlZCBwcm9wZXJ0eSBpcyBhbiBpbnRlcm5hbCByZWZlcmVuY2UgYWNjZXNzZWQgb3V0c2lkZSByYXRoZXIgdGhhbiBhbiBvdXRzaWRlIHJlZmVyZW5jZVxuICAgICAgICAvLyBhY2Nlc3NlZCBpbnNpZGUuXG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IF9yZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSBfcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LlxuICAgICAgICAvLyBXZSB3YW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGFsbG93IHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIC8vIGNvbnN0IHdhaXRhYmxlID0gbmV3IERlZmVycmVkUHJvbWlzZSgpOyBldmVudC5zdWJzY3JpYmUod2FpdGFibGUucmVzb2x2ZSk7IGNvbnN0IHIgPSBhd2FpdCB3YWl0YWJsZS5vdXRwdXQ7IGNvbnNvbGUubG9nKHIpO1xuICAgICAgICAvLyBJZiB5b3UgbGVhdmUgb3V0IHRoZSBpbml0aWFsIGNhbGxiYWNrLCB5b3UnbGwgZ2V0IHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHdoYXQgdGhlIGV2ZW50IHNlbmRzLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSBpbiBhc3luYy9hd2FpdCBjb2RlLiBUaGUgZm9sbG93aW5nIHdpbGwgd29yayBpZiBhIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAgICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWZlcnJlZC5vdXRwdXQ7XG4gICAgICogY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgKi9cbiAgICBnZXQgb3V0cHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLiAqL1xuICAgIHRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQncyB1Z2x5LlxuICAgICAgICAvLyBJdCBtZWFucyBhIGxvdCBvZiBleHRyYSBzdGVwcy4gSXQgbWFrZXMgc3VyZSB0aGF0IGJ5IGRlZmF1bHQsIHRoZSBsYXN0IHN0ZXAgaXMgYWx3YXlzIGEgY2F0Y2guXG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgaWYgKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFnYWluIHRoaXMgaXMgYSBtZXNzLCBidXQgdGhlIGNhdGNoIGhhbmRsZXIgYWJvdmUgY291bGQgdGhyb3dcbiAgICAgICAgaWYgKHRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmZXJyZWRQcm9taXNlID0gRGVmZXJyZWRQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBEZWZlcnJlZFByb21pc2VfMSA9IHJlcXVpcmUoXCIuL0RlZmVycmVkUHJvbWlzZVwiKTtcbi8qKlxuICogVGhlIHByb21pc2UgQVBJIGlzIG5pY2UsIG1vc3RseSwgYnV0IHRoZSBtYWluIHRoaW5nIHByZXZlbnRpbmcgdXNlIG9mIGEgcHJvbWlzZSBhcyBhbiBldmVudCBoYW5kbGVyIGlzIHRoYXRcbiAqIGl0IG9ubHkgZXhlY3V0ZXMgb25jZS4gQWZ0ZXIgdGhhdCBwb2ludCwgaXQgaXMgcmVzb2x2ZWQsIGFuZCB0aGVyZSBpcyBubyB3YXkgdG8gZmxpcCBpdCBiYWNrLlxuICpcbiAqIFRoZSByZXBlYXRhYmxlIHByb21pc2Uga2VlcHMgdGhlIHByb21pc2UgQVBJIGFuZCBjcmVhdGVzIHRoZSBpbGx1c2lvbiB0aGF0IHRoZSBwcm9taXNlIGlzIHJlcGVhdGVkIGJ5XG4gKiByZWJ1aWxkaW5nIHRoZSBjaGFpbiBlYWNoIHRpbWUuIEl0J3MgcmVhbGx5IGEgZGVmZXJyZWQgZmFjdG9yeSBidXQgaXQgcHJldGVuZHMgdG8gYmUgYSBkZWZlcnJlZC4gSSdtIHN1cmVcbiAqIHRoaXMgaGFzIGEgcGVyZm9ybWFuY2UgcGVuYWx0eS5cbiAqXG4gKiBZb3Ugc2hvdWxkIG5vdCBhdHRhY2ggYWN0dWFsIHByb21pc2VzIGludG8gdGhlIHRoZW4oKSBjaGFpbiwgYmVjYXVzZSB0aGV5IGNhbid0IGJlIHJlcGVhdGVkLiBUaGUgUHJvbWlzZSB0eXBlIGlzbid0XG4gKiBhbGxvd2VkIGJ1dCB0aGVyZSBhcmUgd2F5cyB0byBnZXQgYXJvdW5kIHRoZSBUUyBjb21waWxlci4gVGhlIFRTIHR5cGUgZGVmaW5pdGlvbiBmb3IgUHJvbWlzZSBhbmQgUHJvbWlzZUxpa2UgaXNuJ3RcbiAqIGNvbXBsZXRlbHkgY29ycmVjdCwgYW55d2F5LCBzbyBpdCdzIGVhc3kgdG8gZ2V0IHVzZWQgdG8gdXNpbmcgdGhlIGFueSB0eXBlIGFuZCBtYWtlIGJyb2tlbiBjb2RlLlxuICpcbiAqIFlvdSBjYW5ub3QgYXN5bmMvYXdhaXQgYSByZXBlYXRhYmxlIHByb21pc2UgaXRzZWxmIGJ1dCB5b3UgY2FuIGF3YWl0IGEgc2luZ2xlIHJlc29sdXRpb24uIEFzeW5jL2F3YWl0IGlzIHN1Z2FyIHRoYXRcbiAqIGNyZWF0ZXMgYSByZWd1bGFyLCBub24tcmVwZWF0YWJsZSwgcHJvbWlzZS5cbiAqL1xuY2xhc3MgUmVwZWF0YWJsZVByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCBvblVuaGFuZGxlZEVycm9yLCAvLyBUaGlzIGFkZHMgYSBjYWxsYmFjayBhdCB0aGUgZW5kIChvciAybmQgZnJvbSB0aGUgZW5kLCBzZWUgbmV4dCBvcHRpb24pXG4gICAgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgKSB7XG4gICAgICAgIHRoaXMub25VbmhhbmRsZWRFcnJvciA9IG9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yOyAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LiBVc2VmdWwgZm9yIGFzeW5jL2F3YWl0IGNvZGUuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGUgZm9sbG93aW5nIHNob3VsZCB3b3JrOlxuICAgIC8vIGNvbnN0IHJlcGVhdGFibGUgPSBuZXcgUmVwZWF0YWJsZVByb21pc2UoKTsgY29uc3QgciA9IGF3YWl0IHJlcGVhdGFibGUucmVzb2x2ZSgpOyBjb25zb2xlLmxvZyhyKTtcbiAgICByZXNvbHZlKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIHJlamVjdChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIC8vIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLlxuICAgIHRoZW4ob25mdWxmaWxsZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9uZnVsZmlsbGVkOiBvbmZ1bGZpbGxlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9ucmVqZWN0ZWQ6IG9ucmVqZWN0ZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBidWlsZCgpIHtcbiAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGtub3cgdGhhdCB0aGUgZmlyc3QgaXMgYWx3YXlzIG9uZnVsZmlsbGVkIGFuZCBpcyBuZXZlciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpZiAoIWNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gRmlyc3Qgb25mdWxmaWxsZWQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgRGVmZXJyZWRQcm9taXNlXzEuRGVmZXJyZWRQcm9taXNlKGNiLm9uZnVsZmlsbGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihjYi5vbmZ1bGZpbGxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbnJlamVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChjYi5vbnJlamVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gTm8gY2FsbGJhY2tzLCBub3QgZXZlbiB0aGUgZGVmYXVsdCBmaXJzdCBvbmZ1bGZpbGxlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuZXhwb3J0cy5SZXBlYXRhYmxlUHJvbWlzZSA9IFJlcGVhdGFibGVQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJldHVybiBlbGVtZW50cyBvZiBhcnJheSBhIGxpbmVkIHVwIHdpdGggZWxlbWVudHMgb2YgYXJyYXkgYi4gQm90aCBhcnJheXMgZG9uJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoID49IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFtlbGVtZW50LCBiW2luZGV4XV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2FbaW5kZXhdLCBiXSk7XG4gICAgfVxufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vKipcbiAqIFJldHVybiBhIGNhcnRlc2lhbiBqb2luIChjcm9zcyBqb2luKSBiZXR3ZWVuIGFycmF5cyBhIGFuZCBiLlxuICovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYikge1xuICAgIC8vLyB0eXBlc2NyaXB0IHByZXZlbnRzIGEgZGlyZWN0IHVzZSBvZiBjb25jYXQsIHNvIGRvIHRoaXMgbWFudWFsbHkgd2l0aCBhIGxvb3BcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGEpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmIubWFwKHEgPT4gW2l0ZW0sIHFdKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5jYXJ0ZXNpYW4gPSBjYXJ0ZXNpYW47XG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZ2Ugb2YgaW50ZWdlcnMsIGNvdW50aW5nIHVwIGJ5IDEsIGZvciB0aGUgZ2l2ZW4gbGVuZ3RoLiBTdG9sZW4gZnJvbSBQeXRob24uXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG59XG5leHBvcnRzLnJhbmdlID0gcmFuZ2U7XG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGl0ZW1zIGFuZCBvdGhlciBhcnJheXMsIGZsYXR0ZW4gdGhlbSBvdXQgaW50byBhIHNpbmdsZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24qIHRyYXZlcnNlKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHlpZWxkIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGFycikge1xuICAgICAgICAgICAgeWllbGQqIHRyYXZlcnNlKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFJlcGVhdGFibGVQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIik7XG4vKipcbiAqIEEgZGVsZWdhdGUgb2JqZWN0IGlzIHVzZWQgYnkgdGhlIEV2ZW50SGFuZGxlci4gSXQgY29udGFpbnMgZW5vdWdoIGluZm9ybWF0aW9uIHRvIGV4ZWN1dGUgYSBjYWxsYmFjayBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5XG4gKiAodXNpbmcgYSBwcm9taXNlKS4gSXQgYWxzbyBhZGRzIHNvbWUgc3RyaW5ncyB0byBoZWxwIGluIHRyb3VibGVzaG9vdGluZywgYmVjYXVzZSBzZWFyY2hpbmcgYSByZWN1cnNpdmUgYXJyYXkgb2YgY29tcGxleCBvYmplY3RzIGNhbiBtYWtlXG4gKiBpdCBhIGJlYXIgdG8gZmluZCBvdXQgd2h5IGEgY2FsbGJhY2sgaXNuJ3QgYmVpbmcgZXhlY3V0ZWQuXG4gKi9cbmNsYXNzIERlbGVnYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJbiBtYW55IGNhc2VzIChmb3IgZXhhbXBsZSwgd2hlbiB1c2luZyBmYXQgYXJyb3cgZnVuY3Rpb25zKSwgdGhpc0FyZyBpc1xuICAgICAgICAvLyBub3QgbmVlZGVkLiBCdXQgaW4gbW9zdCBvdGhlcnMsIGl0IGlzIGFuIGFubm95aW5nIGJ1ZyB0aGF0IHJlcXVpcmVzIHRyb3VibGVzaG9vdGluZ1xuICAgICAgICAvLyB0byBmaWd1cmUgb3V0IHdoYXQgdGhlIGNhbGxlciBmb3Jnb3QuIEkndmUgd2F2ZXJlZCBiZXR3ZWVuIG1ha2luZyBpdCByZXF1aXJlZCBhbmQgbm90LlxuICAgICAgICBpZiAoIXRoaXNBcmcpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlbGVnYXRlIGNyZWF0ZWQgd2l0aG91dCB0aGlzQXJnLiBEaWQgeW91IG1lYW4gdG8/Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICAgICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHRoaXNBcmcgPT09ICdvYmplY3QnICYmICdjb25zdHJ1Y3RvcicgaW4gdGhpc0FyZykge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja093bmVyTmFtZSA9IHRoaXNBcmcuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgdHlwZXNjcmlwdCBjb21waWxlciBzaG91bGQgaGFuZGxlIHRoaXMgY2hlY2sgYnV0IGNhbid0IGF0IHJ1bnRpbWUuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIG11c3QgYmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tOYW1lID0gY2FsbGJhY2submFtZTtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUgJiYgdGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGAke3RoaXMuY2FsbGJhY2tPd25lck5hbWV9LiR7dGhpcy5jYWxsYmFja05hbWV9KClgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrTmFtZSArICcoKSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja093bmVyTmFtZSArICcuX19sYW1iZGFfXygpJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUmVwZWF0YWJsZVByb21pc2VfMS5SZXBlYXRhYmxlUHJvbWlzZShjYWxsYmFjay5iaW5kKHRoaXNBcmcpKTtcbiAgICB9XG59XG5leHBvcnRzLkRlbGVnYXRlID0gRGVsZWdhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBEZWxlZ2F0ZV8xID0gcmVxdWlyZShcIi4vRGVsZWdhdGVcIik7XG4vKipcbiAqIEkgY2hvc2UgdG8gdXNlIEMjIHN0eWxlIGV2ZW50cywgbm90IEpTL1RTLCBiZWNhdXNlIHRoZSBKUy9UUyB3YXkgb2YgZG9pbmcgZGVsZWdhdGVzL2N1c3RvbSBldmVudHMgaXMgYSBOSUdIVE1BUkUuIFN1cmUsXG4gKiBDdXN0b21FdmVudCB3b3JrcywgYnV0IG9uIHRoZSBUUyBzaWRlIHRoZSBjb2RlIHJlcXVpcmVkIHRvIG1ha2UgVFNDIGhhcHB5IHdpdGggdmFsaWQgamF2YXNjcmlwdCBpcyBhd2Z1bCBhbmQgbm9uLWludHVpdGl2ZS5cbiAqIE9uIHRoZSBKUyBzaWRlLCB5b3UgaGF2ZSB0aGUgcHJvYmxlbSB0aGF0IGV2ZXJ5IGhhbmRsZXIgcGlja3MgaXQgdXAsIG5vdCBqdXN0IHRoZSBvbmVzIHRoYXQgYXJlIGJvdW5kIHRvIHRoZSByZWxldmFudCBIVE1MXG4gKiBlbGVtZW50LCBzbyBlbGVtZW50cyBuZWVkIHRvIHBhc3MgdGhlIHNvdXJjZSBhcyBhbiBhcmd1bWVudCBhbmQgY2hlY2sgaXQgKGxpa2UganF1ZXJ5IGFuZCAkKGRvY3VtZW50KS5vbigpKS5cbiAqXG4gKiBBZnRlciBnZXR0aW5nIGl0IHdvcmtpbmcsIGFsbCBJIGNvdWxkIHRoaW5rIGFib3V0IHdhcyBob3cgYmFkIHRoZSBjb2RlIHdhcywgc28gSSByZXdyb3RlIGl0IGF2b2lkaW5nIHRoZSBKUyBwYXR0ZXJuIGVudGlyZWx5LlxuICpcbiAqIFRoaXMgY2FuIGJlIHN5bmNocm9ub3VzIChjYWxsYmFja3MpIG9yIGFzeW5jaHJvbm91cyAocHJvbWlzZXMpLiAgV2hlbiBpdCBpcyBhc3luYywgdGhlIGNvZGUgZXhlY3V0ZXMgYWZ0ZXIgdGhlIGN1cnJlbnQgc3luY2hyb25vdXNcbiAqIGV2ZW50cyBydW4gdG8gY29tcGxldGlvbi4gVGhpcyBjb3VsZCBjcmVhdGUgYnVncyBpbiBzeW5jaHJvbm91cyBjb2RlLCBidXQgaXMgYmVzdCBmb3IgYnJvd3NlciBldmVudHMuIFRoaXMgaGFuZGxlciBpcyBwcmltYXJpbHkgdXNlZCBmb3JcbiAqIGJyb3dzZXIgZXZlbnRzLCBzbyBhc3luYyBpcyBkZWZhdWx0LlxuICpcbiAqIEJ1dCBpZiB5b3UncmUgdHJpZ2dlcmluZyBhc3luYyBldmVudHMgaW4gY29kZSBhbmQgc3RlcHBpbmcgdGhyb3VnaCBpdCBpbiBDaHJvbWUsIHdoYXQgeW91IHNlZSB3b24ndCBtYWtlIHNlbnNlLCBiZWNhdXNlIHRoZSBhc3luY1xuICogZXZlbnRzIHdvbid0IG9jY3VyIHVudGlsIHJpZ2h0IGF3YXkuIEl0IGNhbiBiZSBoYXJkIHRvIHRyb3VibGVzaG9vdC5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfZGlzYWJsZUFzeW5jID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUFzeW5jID0gX2Rpc2FibGVBc3luYztcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IFtdO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSWYgdGhpcyByZWNlaXZlcyBhIGRlbGVnYXRlICh3aGljaCBpcyBhbiBhcnJheSBvZiBkZWxlZ2F0ZXMpLCBhZGQgaXQuXG4gICAgICAgIC8vIFdoZW4gdGhpcyBpcyBpbnZva2VkLCB0aGF0IGRlbGVnYXRlIHdpbGwgYWxzbyBiZSBpbnZva2VkLlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjYWxsYmFjaykpIHtcbiAgICAgICAgICAgIF9vdnIxX2RlbGVnYXRlLmNhbGwodGhpcywgY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdvdCBhIHNpbmdsZSBjYWxsYmFja1xuICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGNhbGxiYWNrLlxuICAgICAgICBpZiAodGhpcy5maW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2g6IHRydWUgfSkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3RGVsZSA9IG5ldyBEZWxlZ2F0ZV8xLkRlbGVnYXRlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5wdXNoKG5ld0RlbGUpO1xuICAgICAgICAvLyBJRiB0aGlzIGlzIGFzeW5jaHJvbm91cywgcmV0dXJuIHRoZSBwcm9taXNlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICAgICAgICAvLyBDaGFpbmluZyB3b24ndCB3b3JrIG9uIHN5bmMgY29kZSwgc28gZG8gbm90IGluIHRoYXQgY2FzZS5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdEZWxlLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjFfZGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgZGVsZWdhdGUuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5maW5kKHEgPT4gcSA9PT0gZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5wdXNoKGRlbGVnYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gIUFycmF5LmlzQXJyYXkocSkgJiYgcS5jYWxsYmFjayA9PT0gY2FsbGJhY2spO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKSB7XG4gICAgICAgIC8vIEZpcnN0IHRyeSB0byB1bnN1YnNjcmliZSB0aGUgZGVmYXVsdCBkZWxlZ2F0ZS4gQ2FuJ3QgZG8gYW55dGhpbmcgaWYgaXQgaGFzIGEgZGlmZmVyZW50IG5hbWUsIHRob3VnaC5cbiAgICAgICAgaWYgKFwiZGVsZWdhdGVcIiBpbiBzZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVEZWxlZ2F0ZShzZW5kZXIuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+ICFBcnJheS5pc0FycmF5KHEpICYmIHEudGhpc0FyZyA9PT0gc2VuZGVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiBxID09PSBkZWxlZ2F0ZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZva2UoYXJncykge1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UodGhpcy5kZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICAgICAgLy8gQXN5bmMgdmVyc2lvbi4gRG9lcyBub3Qgd29yayB3ZWxsIHdpdGggdGhlIGNocm9tZSBkZWJ1Z2dlci5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5wcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnRoaXNBcmcsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UodGhpcy5kZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaChsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2gobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiB0aGlzQXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzQXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7IC8vIENsZWFycyB0aGUgZGVsZWdhdGVcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHVuZGVmaW5lZDsgLy8gTWFrZXMgc3VyZSB0aGlzIGNhbid0IGJlIHVzZWQgYWdhaW5cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50SGFuZGxlciA9IEV2ZW50SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBFdmVudCBhcmd1bWVudHMgZXhwZWN0ZWQgb24gYW55IENoYW5nZSBldmVudC5cbiAqL1xuY2xhc3MgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBvZiBjaGFuZ2Ugb3BlcmF0aW9uIChzZXQsIGRlbGV0ZSkgKHBvdGVudGlhbGx5IG1ldGhvZClcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICcnO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzID0gUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBjb25zdHJ1Y3RvciB0aGF0IGlzIG5ld2FibGUuXG4gKiBUSElTIENBTk5PVCBERVRFQ1QgQU5PTllNT1VTIENMQVNTRVMuIFNvcnJ5LCBidXQgSlMgZG9lc24ndCBoYXZlIGEgbm9uLWRlc3RydWN0aXZlIHdheVxuICogdG8gY2hlY2sgaWYgYW55IGZ1bmN0aW9uIGlzIGEgY29uc3RydWN0b3Igb3RoZXIgdGhhbiB0byB0cnkgdG8gbmV3KCkgaXQgYW5kIGJsb3cgdXAvbm90IGJsb3cgdXAuXG4gKiBUaGlzIGZ1bmN0aW9uIGRlcGVuZHMgb24gdGhlcmUgYmVpbmcgYSBwcm90b3R5cGUgd2l0aCBhIG5hbWVkIGNvbnN0cnVjdG9yLlxuICovXG5mdW5jdGlvbiBjb25zdHJ1Y3RvclR5cGVHdWFyZChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5wcm90b3R5cGUgJiYgb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuZXhwb3J0cy5jb25zdHJ1Y3RvclR5cGVHdWFyZCA9IGNvbnN0cnVjdG9yVHlwZUd1YXJkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYW4gaW1wbGVtZW50YXRpb24gb2Yga2V5d29yZCBhcmd1bWVudHMsIGFzIHNlZW4gaW4gUHl0aG9uIGFuZCBDIy4gSXQgbWFrZXMgY29uZmlndXJhYmxlXG4gKiBmdW5jdGlvbnMgc28gbXVjaCBxdWlja2VyIGFuZCBlYXNpZXIgdGhhbiBmbGF0IGFyZ3VtZW50cyAoZm9yY2luZyB5b3UgdG8gcHV0IHVuZGVmaW5lZCBtYW51YWxseSBpbiBkaWZmZXJlbnRcbiAqIHNsb3RzKSBvciBvcHRpb25zIG9iamVjdHMgKHRha2VzIG1vcmUgdGltZSB0byBwcm9kdWNlLCBlc3BlY2lhbGx5IGlmIHlvdSBuZWVkIHRvIG5ldyBpdCB1cCkuXG4gKlxuICogQ2FsbCBmdW5jdGlvbnMgaGF2aW5nIGtleXdvcmQgYXJndW1lbnRzIHVzaW5nIHRoaXMgc3ludGF4OlxuICogY2FsbG1lKGFyZzEsIGFyZzIsIGt3KCdzb21ldGhpbmcnLCBrdzEpLCBrdygnc29tZXRoaW5nRWxzZScsIGt3MikpXG4gKlxuICogVG8gbWFrZSB0aGVtIHdvcmssIGluIHRoZSBmdW5jdGlvbiBpdHNlbGYsIHlvdSBuZWVkIHRvIGNvcHkgYW5kIHBhc3RlLiBGb3IgZXhhbXBsZTpcbiAqICh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9ID0gS3dhcmcucGFyc2UoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSkpO1xuICovXG5jbGFzcyBLd2FyZyB7XG4gICAgY29uc3RydWN0b3IoYSwgYikge1xuICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWUgPSBhO1xuICAgICAgICB0aGlzLnZhbHVlID0gYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtZW1iZXIgdGhpcyB0ZW1wbGF0ZTpcbiAgICAgKiAoeyB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSkpO1xuICAgICAqIEluY2x1ZGUgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIGZpcnN0IG9iamVjdCwgbm90IHRoZSBzZWNvbmQuXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCB0byBjYXB0dXJlIHJlc3QgcGFyYW1ldGVycywgdXNlIHRoaXM6XG4gICAgICogKHsgJHJlc3QkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyAsIC4uLnJlc3QgfSkpO1xuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgYWxsb3dVbmtub3duS2V5d29yZCB0byBiZSB0cnVlLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkJGt3JCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0sIHRydWUpKTtcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VBcmdzKGFyZ3MsIGFsbG93VW5rbm93bktleXdvcmQgPSBmYWxzZSkge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHRoaXMgY291bGQgdGFrZSB0aGUgYXJndW1lbnRzIG9iamVjdCwgYnV0IHNhZGx5IGFyZ3VtZW50cyBzdG9yZXMgb25seSBhbiBhcnJheSBvZiB2YWx1ZXMsXG4gICAgICAgIC8vIG5vIGtleXMuIElmIEpTIHdlcmUgc2FuZSwgaXQgd291bGQgYmUgYSBNYXAsIG5vdCBhbiBhcnJheS4gVHdvIHN0ZXBzIGZvcndhcmQsIG9uZSBzdGVwIGJhY2suXG4gICAgICAgIC8vIFBhcnNpbmcgdGhlIHN0cmluZyBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb24gaXMgbm90IG15IGN1cCBvZiB0ZWEsIHNvIGp1c3Qgbm8uXG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpO1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBhcmd1bWVudCBvcmRlclxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrd3ZhciA9IHt9O1xuICAgICAgICBvYmpbJyQka3ckJCddID0ga3d2YXI7XG4gICAgICAgIC8vIENoZWNrIGZvciByZXN0IHBhcmFtZXRlcnMuXG4gICAgICAgIC8vIEkgd2FzIGdvaW5nIHRvIGhhdmUgdGhpcyBvbi9vZmYgY29uZmlndXJhYmxlLCBidXQgaXQgc2hvdWxkbid0IGh1cnQgcGVyZm9ybWFuY2UuXG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBvYmpbJyRyZXN0JCddID0gYXJyO1xuICAgICAgICAvLyBSZXN0IHBhcmFtZXRlcnMgYXJlIHN0b3JlZCBhcyBhcnJheSBrZXlzLCB7ICcwJzogYSwgJzEnOiBiLCAnbm9uUmVzdCc6ICdzb21ldGhpbmcgZWxzZSd9XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpLmZpbHRlcihmID0+IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKGYpKSkge1xuICAgICAgICAgICAgaWYgKCEoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goYXJnc1thcmddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXl3b3Jkc1VzZWQgPSB7fTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkga2V5d29yZCBuYW1lXG4gICAgICAgIC8vIEhhdmUgdG8gaXRlcmF0ZSB0aGUgbGlzdCB0d2ljZSwgdG8gYXZvaWQgd2lwaW5nIG91dCBkYXRhIGlmIHRoZSBvcmRlciBpcyBzd2FwcGVkXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBhcmdzW2FyZ107XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmpbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93VW5rbm93bktleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGt3dmFyW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IGFuIHVuZXhwZWN0ZWQga2V5d29yZCBhcmd1bWVudCAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIGtleXdvcmRzVXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBtdWx0aXBsZSB2YWx1ZXMgZm9yIGtleXdvcmQgYXJndW1lbnQgKyAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleXdvcmRzVXNlZFt0bXAubmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIC8vIFR1cm4gYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5d29yZCBhcmd1bWVudHMuXG4gICAgLy8gTmVlZHMgdG8gcmV0dXJuIGFueVtdIGJlY2F1c2UgaXQncyBnb2luZyB0byBiZSBzaG92ZWQgaW50byBhcmJpdHJhcnkgYXJndW1lbnQgbGlzdHNcbiAgICBzdGF0aWMgdW5wYWNrKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGt3KGFyZywgYXJnc1thcmddKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGlzTWF0Y2goa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IGtleTtcbiAgICB9XG59XG5leHBvcnRzLkt3YXJnID0gS3dhcmc7XG5mdW5jdGlvbiBrdyhhLCBiKSB7XG4gICAgaWYgKCFhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBPdmVybG9hZCAxXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYSwgYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMlxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGFbMF0sIGFbMV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgM1xuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBvbmx5IG9uZSBrZXkvdmFsdWUgcGFpci5cbiAgICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKTtcbiAgICAgICAgaWYgKCFwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1hcCBvYmplY3Q6IG11bHRpcGxlIGtleXMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKHByb3BzWzBdLCBhW3Byb3BzWzBdXSk7XG4gICAgfVxufVxuZXhwb3J0cy5rdyA9IGt3O1xuZnVuY3Rpb24ga3dhcmdzVG9PYmplY3QoYXJyKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgYXJnIG9mIGFycikge1xuICAgICAgICBvcHRpb25zW2FyZy5uYW1lXSA9IG9wdGlvbnNbYXJnLnZhbHVlXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnRzLmt3YXJnc1RvT2JqZWN0ID0ga3dhcmdzVG9PYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGlzTm9uZSh0ZXN0KSB7XG4gICAgcmV0dXJuICh0ZXN0ID09IG51bGwgfHwgdGVzdCA9PT0gdW5kZWZpbmVkKTtcbn1cbmV4cG9ydHMuaXNOb25lID0gaXNOb25lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjbG9uZURlZXAob2JqLCBoYXNoID0gbmV3IFdlYWtNYXAoKSkge1xuICAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgICAgIHJldHVybiBvYmo7IC8vIHByaW1pdGl2ZSB0eXBlc1xuICAgIH1cbiAgICBpZiAoaGFzaC5oYXMob2JqKSkge1xuICAgICAgICByZXR1cm4gaGFzaC5nZXQob2JqKTsgLy8gcmVmZXJlbmNlIHRvIG9iamVjdCBwcmV2aW91c2x5IHNlZW5cbiAgICB9XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIHZhbCA9PiByZXN1bHQuYWRkKGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgTWFwKCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCAoW2tleSwgdmFsXSkgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAoa2V5LCBoYXNoKSwgY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IEFycmF5LmZyb20ob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFJlZ0V4cChvYmouc291cmNlLCBvYmouZmxhZ3MpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYXdmdWwgY29kZSwgYnV0IGl0J3MgdGhlIG9ubHkgd2F5IHRvIGNsb25lIGEgc3RhbmRhbG9uZSBmdW5jdGlvbiAodnMgYSBtZXRob2Qgd2hpY2ggaGFzIGEgZGVzY3JpcHRvcikuXG4gICAgICAgIC8vIEluIGdlbmVyYWwsIHlvdSBwcm9iYWJseSBkb24ndCB3YW50IHRvIHVzZSBjbG9uZURlZXAgb24gZnVuY3Rpb25zLiBZb3UnbGwgc2VlIGl0J3MgTk9UIHVzZWQgb24gaW50ZXJuYWwgbWV0aG9kcy5cbiAgICAgICAgcmVzdWx0ID0gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIG9iai50b1N0cmluZygpKSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIGhhc2guc2V0KG9iaiwgcmVzdWx0KTsgLy8gS2VlcCB0cmFjayBvZiBvYmplY3RzIHByZXZpb3VzbHkgY2xvbmVkXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnZnVuY3Rpb24nICYmICEoa2V5IGluIHJlc3VsdCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBtZXRob2RzIHRoYXQgYXJlbid0IGluIHRoZSBwcm90b3R5cGUuXG4gICAgICAgICAgICAvLyBUaGlzIGRvZXNuJ3QgcmVjdXJzaXZlbHkgZm9sbG93IGJlY2F1c2UgdGhlcmUncyBub3RoaW5nIHJlY3Vyc2l2ZSB0byBkby5cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICBoYXNoLnNldChvYmpba2V5XSwgcmVzdWx0W2tleV0pO1xuICAgICAgICAgICAgICAgIC8vIE5PVEUgdGhhdCBjbG9uZURlZXAgaXMgTk9UIGNhbGxlZCByZWN1cnNpdmVseSBoZXJlLiBJdCBhbGwgZW5kcyBhdCB0aGUgbWV0aG9kLlxuICAgICAgICAgICAgICAgIC8vIElmIGV4dHJhIGtleXMgYXJlIHRocm93biBvbnRvIGEgZnVuY3Rpb24sIHRoZXkgcHJvYmFibHkgd2lsbCBub3QgYmUgY2xvbmVkLlxuICAgICAgICAgICAgICAgIC8vIEluIG15IGV4cGVyaWVuY2UsIGV4dHJhIGtleXMgb24gZnVuY3Rpb25zIGRpZG4ndCB3b3JrIHJpZ2h0LCBzbyBubyBiaWcgbG9zcy5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBjdXN0b20gZ2V0dGVycy9zZXR0ZXJzLiBUaGVzZSBhcmUgbG9jYWwgYW5kIGhvcGVmdWxseSB3b3JrIGp1c3QgbGlrZSBtZXRob2RzLlxuICAgICAgICAgICAgLy8gSW4gbWFueSBjYXNlcywgdGhpcyBpcyByZWR1bmRhbnQgd2l0aCBPYmplY3QuY3JlYXRlKCksIGJ1dCBpcyBuZWNlc3NhcnkgdG8gYWxsb3cgb2JqZWN0cyB3aXRoIG1hbnVhbGx5LWFkZGVkIGN1c3RvbSBnZXR0ZXJzLlxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIC8vIE5PVEUgdGhhdCBjbG9uZURlZXAgaXMgTk9UIGNhbGxlZCByZWN1cnNpdmVseSBoZXJlLiBJdCBhbGwgZW5kcyBhdCB0aGUgZ2V0dGVyL3NldHRlci5cbiAgICAgICAgICAgIC8vIEFMU08gaGFzaCBub3QgdXBkYXRlZDsgdGhpcyBpcyBub3QgcG9zc2libGUsIGJlY2F1c2UgaXQgd2lsbCBtYXAgdGhlIHZhbHVlIGl0IGdldHMsIG5vdCB0aGUgZ2V0dGVyLlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZURlZXAob2JqW2tleV0sIGhhc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNsb25lRGVlcCA9IGNsb25lRGVlcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbi8qKlxuICogQSBwc2V1ZG8tcmFuZG9tIHByZWZpeCBwbHVzIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSB0aGUgdW5peCBlcG9jaC4gVGhlIHJhbmRvbSBwYXJ0IHNob3VsZCBiZSByYW5kb20gZW5vdWdoIHRvIGNvdmVyXG4gKiBtdWx0aXBsZSBpZHMgY3JlYXRlZCBpbiBhIG1pbGxpc2Vjb25kLlxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWVJZCgpIHtcbiAgICBjb25zdCBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWi1fJztcbiAgICBsZXQgcmVzdWx0ID0gJ3UnICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArICctJztcbiAgICBmb3IgKGNvbnN0IF8gb2YgQXJyYXlVdGlsaXRpZXNfMS5yYW5nZSg4KSkge1xuICAgICAgICByZXN1bHQgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5nZXRVbmlxdWVJZCA9IGdldFVuaXF1ZUlkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRlbGwgaWYgYSBnaXZlbiBzdHJpbmcgaXMgYSBwb3NpdGl2ZSBpbnRlZ2VyLlxuICogVXNlIGZvciBkZXRlY3RpbmcgYXJyYXkga2V5cy5cbiAqL1xuZnVuY3Rpb24gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RyID09PSAnMCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvXlsxLTldXFxkKiQvLnRlc3Qoc3RyKTtcbn1cbmV4cG9ydHMuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcgPSBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJIGRvbid0IGtub3cgaG93IGFjY3VyYXRlIHRoaXMgaXMgYnV0IGl0IHNlZW1zIHByZXR0eSBnb29kXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qob2JqKSAhPT0gb2JqO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuIl19
