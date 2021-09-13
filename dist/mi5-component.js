(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("../../src/Api");
const BoundComponent_1 = require("../../src/HtmlComponent/BoundComponent");
const ComponentMap_1 = require("../../src/HtmlComponent/ComponentMap");
(function main() {
    const plugin = {
        Component: Api_1.Component,
        BoundComponent: BoundComponent_1.BoundComponent,
        ComponentMap: ComponentMap_1.ComponentMap,
        getComponent: ComponentMap_1.getComponent,
    };
    window.mi5 = window.mi5 || {};
    window.mi5.component = Object.assign(window.mi5.component || {}, plugin);
})();

},{"../../src/Api":2,"../../src/HtmlComponent/BoundComponent":17,"../../src/HtmlComponent/ComponentMap":19}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Css/CssInlineRule"));
__export(require("./Css/CssRule"));
__export(require("./Css/CssRuleContract"));
__export(require("./Css/CssVariable"));
__export(require("./Css/GetCssRulesInElement"));
__export(require("./Html/CreateElement"));
__export(require("./Html/DeleteNodeContent"));
__export(require("./Html/ElementType"));
__export(require("./Html/EscapeHtml"));
__export(require("./Html/FindIndexInParent"));
__export(require("./Html/FormFieldValue"));
__export(require("./Html/ExtractNodeContent"));
__export(require("./Html/QuerySelectorNodeList"));
__export(require("./Html/ValidateUniqueDomIds"));
__export(require("./HtmlComponent/BoundComponent"));
__export(require("./HtmlComponent/Component"));
__export(require("./HtmlComponent/ComponentMap"));
__export(require("./HtmlComponent/Options/IExistingElementOptions"));
__export(require("./HtmlComponent/Options/IInnerHtmlOptions"));
__export(require("./HtmlComponent/Options/IExistingLookupOptions"));
__export(require("./HtmlComponent/Options/IOuterHtmlOptions"));
__export(require("./HtmlComponent/Options/IComponentBindingOptions"));
__export(require("./Observable/IObservable"));
__export(require("./Observable/ObservableAssign"));
__export(require("./Observable/ObservableBase"));
__export(require("./Observable/ObservableProperty"));
__export(require("./Observable/ObservableProxy"));
__export(require("./Observable/ObservableState"));
__export(require("./Router/PageRouter"));
__export(require("./Router/AdvancedPageRouter"));
__export(require("./System/Async/DynamicWebWorker"));
__export(require("./System/Async/DeferredPromise"));
__export(require("./System/Async/Delay"));
__export(require("./System/Async/RepeatablePromise"));
__export(require("./System/Collections/ArrayUtilities"));
__export(require("./System/Collections/OrderBy"));
__export(require("./System/EventHandler/ArrayChangedEventArgs"));
__export(require("./System/EventHandler/Delegate"));
__export(require("./System/EventHandler/EventHandler"));
__export(require("./System/EventHandler/PropertyChangedEventArgs"));
__export(require("./System/Types/Constructable"));
__export(require("./System/Types/KeywordArguments"));
__export(require("./System/Types/NoneType"));
__export(require("./System/Utility/Assert"));
__export(require("./System/Utility/CloneDeep"));
__export(require("./System/Utility/CloneObject"));
__export(require("./System/Utility/Elvis"));
__export(require("./System/Utility/IsInteger"));
__export(require("./System/Utility/IsPrimitive"));
__export(require("./System/Utility/GetUniqueId"));
__export(require("./System/Utility/ObjectFullAssign"));

},{"./Css/CssInlineRule":3,"./Css/CssRule":4,"./Css/CssRuleContract":5,"./Css/CssVariable":6,"./Css/GetCssRulesInElement":7,"./Html/CreateElement":8,"./Html/DeleteNodeContent":9,"./Html/ElementType":10,"./Html/EscapeHtml":11,"./Html/ExtractNodeContent":12,"./Html/FindIndexInParent":13,"./Html/FormFieldValue":14,"./Html/QuerySelectorNodeList":15,"./Html/ValidateUniqueDomIds":16,"./HtmlComponent/BoundComponent":17,"./HtmlComponent/Component":18,"./HtmlComponent/ComponentMap":19,"./HtmlComponent/Options/IComponentBindingOptions":20,"./HtmlComponent/Options/IExistingElementOptions":21,"./HtmlComponent/Options/IExistingLookupOptions":22,"./HtmlComponent/Options/IInnerHtmlOptions":23,"./HtmlComponent/Options/IOuterHtmlOptions":24,"./Observable/IObservable":25,"./Observable/ObservableAssign":30,"./Observable/ObservableBase":31,"./Observable/ObservableProperty":32,"./Observable/ObservableProxy":33,"./Observable/ObservableState":34,"./Router/AdvancedPageRouter":35,"./Router/PageRouter":36,"./System/Async/DeferredPromise":37,"./System/Async/Delay":38,"./System/Async/DynamicWebWorker":39,"./System/Async/RepeatablePromise":40,"./System/Collections/ArrayUtilities":41,"./System/Collections/OrderBy":42,"./System/EventHandler/ArrayChangedEventArgs":43,"./System/EventHandler/Delegate":44,"./System/EventHandler/EventHandler":45,"./System/EventHandler/PropertyChangedEventArgs":46,"./System/Types/Constructable":47,"./System/Types/KeywordArguments":48,"./System/Types/NoneType":49,"./System/Utility/Assert":50,"./System/Utility/CloneDeep":51,"./System/Utility/CloneObject":52,"./System/Utility/Elvis":53,"./System/Utility/GetUniqueId":54,"./System/Utility/IsInteger":55,"./System/Utility/IsPrimitive":56,"./System/Utility/ObjectFullAssign":57}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CssRule_1 = require("./CssRule");
/**
 * A simple, default Css Rule that is with an inline initializer in the constructor, useful for quick and dirty inline classes.
 */
class CssInlineRule extends CssRule_1.CssRule {
    constructor(selector, initial, parent) {
        super(parent);
        Object.assign(this, initial);
        this.selector$ = selector;
    }
}
exports.CssInlineRule = CssInlineRule;

},{"./CssRule":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementType_1 = require("../Html/ElementType");
const CreateElement_1 = require("../Html/CreateElement");
const Constructable_1 = require("../System/Types/Constructable");
const GetUniqueId_1 = require("../System/Utility/GetUniqueId");
const CssVariable_1 = require("./CssVariable");
/**
 * A Javascript CSS rule. Note the capitalization. This isn't the same as CSSRule. I'm considering renaming this to
 * CssJsRule but I'm hoping I think up something better. It has to be more generic than CssClass because, well, there's
 * more to CSS than class selectors.
 */
class CssRule {
    constructor(parent) {
        /** Storing this somewhere other than the HEAD would make it easy to drop the sheet on page change. */
        this.styleSheetParent$ = document.head;
        this.styleSheetId$ = GetUniqueId_1.getUniqueId();
        this.extends$ = [];
        this.nested$ = [];
        this.revert$ = false;
        this._constructed$ = false;
        this._selectors$ = [];
        if (parent) {
            this.styleSheetParent$ = parent;
        }
    }
    render$(parentSelector) {
        if (!this._constructed$) {
            // Remember, we cannot read properties of this in the constructor, because their population is emitted
            // after the super() call. But we don't want to clone this object and repeat this every time it's rendered.
            this._constructed$ = true;
            if (this.revert$) {
                this.all = "initial";
            }
            this._extendClass$();
            if (this.nested$) {
                if (!Array.isArray(this.nested$)) {
                    this.nested$ = [this.nested$];
                }
                for (const [idx, nest] of this.nested$.entries()) {
                    if (Constructable_1.constructorTypeGuard(nest)) {
                        this.nested$[idx] = new nest(this.styleSheetParent$);
                    }
                }
            }
            this._buildSelectors$(parentSelector);
        }
        // This creates a separate style element for each rule. That might seem pretty excessive, but it's the only way
        // to make it easy to update rules. The API for dealing with CSS in HTML5 is NAAAAAAASTY.
        let styleElement = this.styleSheetParent$.querySelector('#' + this.styleSheetId$);
        if (styleElement) {
            this.styleSheetParent$.removeChild(styleElement);
        }
        styleElement = this.styleSheetParent$.appendChild(CreateElement_1.createElement(ElementType_1.elementType.HTMLStyleElement, { id: this.styleSheetId$ }));
        const sheet = styleElement.sheet;
        this._buildRule$(sheet);
        if (this.nested$) {
            // We previously made this an array of constructed types.
            for (const nest of this.nested$) {
                nest.styleSheetParent$ = this.styleSheetParent$;
                for (const sel of this._selectors$) {
                    nest.render$(sel);
                }
            }
        }
        return this;
    }
    remove$() {
        const styleElement = this.styleSheetParent$.querySelector('#' + this.styleSheetId$);
        if (styleElement) {
            this.styleSheetParent$.removeChild(styleElement);
        }
    }
    /**
     * Implement "multiple inheritance".
     *
     * This checks only CSS properties. If you inherit from other CssRule classes that
     * themselves have extends$ set, those are not checked. I don't think there's enough
     * justification to bring recursion into this.
     *
     * Note that priority is in the opposite direction of normal inheritance priority.
     * Normally, when looking for a property, the runtime traverses the inheritance tree
     * and uses the first occurrence. In CSS, the LAST occurance takes priority.
     */
    _extendClass$() {
        if (!this.extends$) {
            return;
        }
        if (!Array.isArray(this.extends$)) {
            this.extends$ = [this.extends$];
        }
        for (const ex of this.extends$) {
            let traitSource;
            if (Constructable_1.constructorTypeGuard(ex)) {
                traitSource = new ex();
            }
            else {
                traitSource = ex;
            }
            const names = Array.from(new Set(findPropertyNames(traitSource)));
            for (const key of names) {
                // Filter out names with special meaning
                if (key.endsWith('$')) {
                    continue;
                }
                this[key] = traitSource[key];
            }
        }
    }
    _buildSelectors$(parentSelector) {
        parentSelector = (parentSelector || '');
        // If scopeElement$ is set, <style scoped> is simulated in a hacky way. It generates an random class name and adds
        // that to both the selector and the element. This similar to the way CSS Modules and Angular do it, except the
        // random selector comes during runtime instead of a custom build process.
        if (this.scopeElement$ && !this._fakeScopeClass$) {
            this._fakeScopeClass$ = this._fakeScopeClass$ || 'scope-' + GetUniqueId_1.getUniqueId();
            this.scopeElement$.classList.add(this._fakeScopeClass$);
        }
        for (let sel of this.selector$.split(',').map(m => m.trim())) {
            sel = (sel || '').replace('&', ''); // Ampersand tells us where to start (allows a space) but it's invalid CSS
            if (this._fakeScopeClass$) {
                if (!sel) {
                    this._selectors$.push(parentSelector + '.' + this._fakeScopeClass$);
                }
                else {
                    // produce an id like "div.autogen .otherclass, .autogen div .otherclass"
                    const words = sel.split(' ');
                    words[0] = parentSelector + words[0] + '.' + this._fakeScopeClass$;
                    this._selectors$.push(words.join(' ').trim());
                    // There is no CSS selector that matches an item and its children. It takes 2 rules.
                    this._selectors$.push((parentSelector + '.' + this._fakeScopeClass$ + ' ' + sel).trim());
                }
            }
            else if (!sel) {
                // A blank selector will fail
                if (parentSelector) {
                    this._selectors$.push(parentSelector);
                }
                else {
                    this._selectors$.push('body');
                }
            }
            else {
                this._selectors$.push(parentSelector + sel);
            }
        }
    }
    _buildRule$(sheet) {
        const ruleText = [];
        const variables = [];
        const names = Array.from(new Set(findPropertyNames(this)));
        for (const key of names) {
            // Filter out names with special meaning
            if (key.endsWith('$') || !this[key] || typeof this[key] === 'function') {
                continue;
            }
            // If Typescript was working correctly, we know that all properties that don't end in $ are RuleValue type.
            const val = this[key];
            if (typeof val === 'string') {
                ruleText.push(`${key}: ${val}`);
            }
            else if (val instanceof CssVariable_1.CssVariable) {
                variables.push(val);
                ruleText.push(`${key}: var(--${val.name})`);
            }
            else {
                // Nested properties, which extend the key and add more rules
                for (const np of Object.getOwnPropertyNames(val)) {
                    // Should never happen
                    if (np.endsWith('$')) {
                        continue;
                    }
                    const vp = val[np];
                    if (typeof vp === 'string') {
                        ruleText.push(`${key}-${np}: ${vp}`);
                    }
                    else {
                        variables.push(vp);
                        ruleText.push(`${key}-${np}: var(--${val.name})`);
                    }
                }
            }
        }
        const fullSelector = this._selectors$.join(', ');
        const fullText = ruleText.join('; \n');
        if (!fullText) {
            // tslint:disable-next-line:no-console
            console.warn(`No CSS properties defined for rule: ${this.constructor.name} on ${fullSelector}.`);
        }
        let fullRule = `${fullSelector} { \n${fullText}; \n}`;
        if (this.media$) {
            fullRule = `@media ${this.media$} { \n${fullRule}\n}`;
        }
        sheet.insertRule(fullRule, 0);
        // Add all the variable values
        let i = 1;
        for (const v of variables) {
            const varText = `${v.scope} { --${v.name}: ${v.value}; }`;
            sheet.insertRule(varText, i);
            i++;
        }
    }
}
exports.CssRule = CssRule;
function findPropertyNames(obj) {
    const result = [];
    result.push(...Object.getOwnPropertyNames(obj).filter(f => f !== 'constructor'));
    const proto = Object.getPrototypeOf(obj);
    if (proto && proto.constructor.name !== 'Object') {
        result.push(...findPropertyNames(proto));
    }
    return result;
}

},{"../Html/CreateElement":8,"../Html/ElementType":10,"../System/Types/Constructable":47,"../System/Utility/GetUniqueId":54,"./CssVariable":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This type is here for a bullshit reason, which is that if you want to require values to be all strings, this copypasta
 * must be included in the definition of the class. That's going far beyond time checking.
 * https://github.com/microsoft/TypeScript/issues/15300 (not just interfaces)
 */
class CssSimpleRule {
    constructor(initial) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
exports.CssSimpleRule = CssSimpleRule;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Use to define a CSS custom property.
 */
class CssVariable {
    constructor(name, value, scope = ':root') {
        this.scope = ':root';
        this.name = name;
        this.value = value;
        this.scope = scope;
    }
}
exports.CssVariable = CssVariable;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCssRulesInElement(element) {
    const result = [];
    for (const style of element.querySelectorAll('style')) {
        for (const rule of style.sheet.cssRules) {
            // A very minimum of pretty printing. I may beef it up later.
            result.push(rule.cssText.replace(/\{/g, '\n    {\n   ').replace(/;/g, ';\n    '));
        }
    }
    return result.join('\n');
}
exports.getCssRulesInElement = getCssRulesInElement;

},{}],8:[function(require,module,exports){
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

},{"../System/Types/KeywordArguments":48,"./ElementType":10,"./ExtractNodeContent":12}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findIndexInParent(element) {
    const parent = element.parentElement;
    if (parent) {
        return Array.from(parent.children).indexOf(element);
    }
}
exports.findIndexInParent = findIndexInParent;

},{}],14:[function(require,module,exports){
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

},{"../System/Types/NoneType":49}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"../Html/CreateElement":8,"../Html/ElementType":10,"../Html/EscapeHtml":11,"../Html/ExtractNodeContent":12,"../Html/FormFieldValue":14,"../Html/QuerySelectorNodeList":15,"../Observable/IObservable":25,"../Observable/ObservableProperty":32,"../Observable/ObservableState":34,"../System/Types/Constructable":47,"../System/Types/KeywordArguments":48,"../System/Types/NoneType":49,"./Component":18,"./ComponentMap":19}],18:[function(require,module,exports){
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
}
exports.Component = Component;

},{"../Html/CreateElement":8,"../Html/ElementType":10,"../Html/FormFieldValue":14,"../Html/QuerySelectorNodeList":15,"../System/Types/KeywordArguments":48,"../System/Utility/GetUniqueId":54,"./ComponentMap":19}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
function observableCheck(obj) {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && 'changeHandler' in obj && obj.changeHandler instanceof EventHandler_1.EventHandler;
}
exports.observableCheck = observableCheck;

},{"../System/EventHandler/EventHandler":45}],26:[function(require,module,exports){
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

},{"../../System/EventHandler/ArrayChangedEventArgs":43,"../../System/Utility/ObjectFullAssign":57,"../ObservableBase":31}],27:[function(require,module,exports){
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

},{"../../System/Utility/IsInteger":55}],28:[function(require,module,exports){
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

},{"../../System/EventHandler/PropertyChangedEventArgs":46,"../../System/Utility/ObjectFullAssign":57,"../ObservableBase":31}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"./ObservableProperty":32}],31:[function(require,module,exports){
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

},{"../System/EventHandler/EventHandler":45}],32:[function(require,module,exports){
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

},{"../Html/EscapeHtml":11,"../System/EventHandler/PropertyChangedEventArgs":46,"../System/Types/NoneType":49,"../System/Utility/IsPrimitive":56,"./IObservable":25,"./ObservableBase":31}],33:[function(require,module,exports){
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

},{"./Internal/ArrayObservable":26,"./Internal/ArrayProxyHandler":27,"./Internal/ObjectObservable":28,"./Internal/ObjectProxyHandler":29}],34:[function(require,module,exports){
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

},{"../Html/EscapeHtml":11,"../System/EventHandler/PropertyChangedEventArgs":46,"../System/Types/NoneType":49,"../System/Utility/CloneDeep":51,"../System/Utility/IsPrimitive":56,"./IObservable":25,"./ObservableBase":31}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateElement_1 = require("../Html/CreateElement");
const DeleteNodeContent_1 = require("../Html/DeleteNodeContent");
const ElementType_1 = require("../Html/ElementType");
const ArrayUtilities_1 = require("../System/Collections/ArrayUtilities");
const Constructable_1 = require("../System/Types/Constructable");
const Elvis_1 = require("../System/Utility/Elvis");
/**
 * If you click a link in a real web site, the browser asks the server for a page and it routes you to the relevant
 * page. But if you have a single page app running on a file, with no web server, like the one this framework
 * was built for, you need something to simulate that.
 *
 * The Advanced version of the router was created to provide the recursively-nested routes that you can get with Angular.
 * It functions. But I hate it. I don't like setting up routes in Angular because it takes editing too many files even
 * for simple sites. That said, for a very large and complex site it's nice to have the organization, so there's that.
 *
 * I found this to be complex and brittle and if you want to use the advanced features (it's pretty trivial to have three
 * columns, each populated via the route, for example), it can get hard to set up and easy to break (be careful not
 * to try to populate a router-outlet you just replaced). In terms of real use cases, I would prefer simple routes
 * and do the work in components.
 *
 * But this is here, if you want to use it.
 *
 * This class clears the route container, which is expected to be a static container in the wrapper HTML page, or the body.
 * When you give it the relevant route, it executes the callback or returns the view/HTML element you defined for the route,
 * and sticks it inside the container. Then it searches for child routes to put into child route containers, etc,
 * until it runs out of children.
 */
class AdvancedPageRouter {
    static get matchedRoute() {
        return this._matchedRoute || { route: '', params: new Map() };
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
    static configure(routes) {
        this._routes = routes;
    }
    /**
     * Set up a top-level route, which is expected to route to the main app container. This is expected to contain
     * a child-container element, which contains lower level routes that are stored as children, added using the addRoute()
     * method.
     */
    static addAppRoute(payload, route = '*', urlRoutingEnabled = true) {
        if (urlRoutingEnabled) {
            // By default, allows going to a new page by changing the URL instead of having to issue route() commands.
            this.turnOnUrlRouting();
        }
        if (Constructable_1.constructorTypeGuard(payload) || typeof payload === 'function') {
            this.addRoute({
                route: route,
                payload: payload,
                routeContainer: 'page-router',
                staticRouterContainer: true
            });
        }
        else {
            this.addRoute({
                route: route,
                payload: () => payload,
                routeContainer: 'page-router',
                staticRouterContainer: true
            });
        }
    }
    static addRoute(route) {
        if (this._routes.find(q => q.route === route.route &&
            (q.routeContainer || 'child-container') === (route.routeContainer || 'child-container'))) {
            throw new Error("Route and container already exists.");
        }
        this._routes.push(route);
    }
    static deleteRoute(route) {
        if (!this._routes.find(q => q.route === route)) {
            throw new Error("Route not found.");
        }
        // Removing items is such a pain.
        const routes = this._routes;
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].route === route) {
                routes.splice(i, 1);
                continue;
            }
        }
    }
    static route(route, updateUrl = true) {
        if (!route) {
            // Allow actual links via the hash. Hash links don't force a page reload and they work w/o a web server.
            // To avoid having to call route() manually, you must call turnOnUrlRouting();
            route = window.location.hash.slice(1);
            // There is a problem, which is that setting the hash will trigger ANOTHER route chainge via the hashchange operation.
            // Removing the hash change and then restoring it later does nothing. It's still triggered.
            // This requires hackwork. So you see why this router is my least favorite part of this framework. It's a pile of hacks:
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
        // Get a copy of routes, because (1) the list will be modified and (2) reduce accesses to static properties.
        // I'm not sure if async hash update events will all be in the same thread, but this isn't thread-safe.
        const routeCopy = this._routes.slice(0).map(m => ({ route: m }));
        // Find matching routes. Typically there will be 0 to 1 but the router allows multiples, one per container.
        const matches = [];
        const params = [];
        for (const r of routeCopy) {
            const searchResult = this._searchRoutes(route, r.route, routeCopy);
            if (searchResult) {
                params.push(searchResult);
                matches.push(r);
            }
        }
        if (!matches.length) {
            // tslint:disable-next-line:no-console
            console.log(`Route ${route} not found.`);
            this._renderNotFound();
            return;
        }
        // If parameters are found in multiple routes, the params are merged, but ONLY THE FIRST value for any param is kept
        // Params will be stored in a global collection. I'm not going to split them up and make the programmer hunt for them.
        const merged = new Map();
        for (const p of params) {
            for (const entry of p.entries()) {
                if (!merged.has(entry[0])) {
                    merged.set(entry[0], entry[1]);
                }
            }
        }
        /* Start writing data */
        this._matchedRoute = { route: route, params: merged };
        // Add route to history if it's different from the previous latest history
        if (this.history.length === 0 || this.history[this.history.length - 1] !== route) {
            this._history.push(route);
        }
        if (this.history.length > this.historyMaxLength) {
            this._history.shift();
        }
        const rcClone = this._routeContainers.slice(0);
        // Any containers from the previous iteration that are not matched in this one should be removed
        // Only keep ones where the staticRouterContainer flag is set
        for (const prev of rcClone
            .filter(rc => !matches.find(m => m.route === rc.route) || !rc.route.staticRouterContainer)) {
            if (prev.container) {
                prev.container.remove();
            }
            const index = rcClone.findIndex(f => f === prev);
            rcClone.splice(index, 1);
        }
        // Add route containers that aren't still there from the last iteration
        rcClone.push(...matches
            .filter(m => !rcClone.find(rc => rc.route === m.route)));
        // The containers need to be in order of matches, but previous iterations are there earlier.
        // This is too weird to work in the sort command, afaik
        const source = rcClone.slice(0);
        const sortedTarget = [];
        for (const match of matches) {
            const r = source.find(q => q.route === match.route);
            if (!r) {
                throw new Error('How did a route not get added to routeContainers?');
            }
            sortedTarget.push(r);
        }
        this._routeContainers = sortedTarget;
        for (const match of matches) {
            let routeGuards = [];
            if (Array.isArray(match.route.routeGuards)) {
                routeGuards = match.route.routeGuards;
            }
            else if (match.route.routeGuards) {
                routeGuards.push(match.route.routeGuards);
            }
            for (const rg of routeGuards) {
                const test = rg.checkValid(match.route);
                if (test === false) {
                    // tslint:disable-next-line:no-console
                    console.warn('Route permission denied');
                    continue;
                }
            }
            this._renderRoute(match);
        }
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
    static _searchRoutes(url, route, routesToSearch) {
        let search = [];
        if (Array.isArray(route.route)) {
            search = route.route;
        }
        else {
            search = [route.route];
        }
        // Search the route strings and if you find one, return the match.
        // Note that if you have multiple routes in the array, with different params, the results will be only the first.
        // Seriously, don't do that. At least one of those routes is gibberish.
        for (const sch of search) {
            const matchResult = this._testRoute(sch, url || '');
            if (matchResult) {
                // If the route has children, then add them to the end of the match list to be tested
                // This works because JS is perfectly OK with modifying an array that you are iterating, unlike C#
                if (route.children) {
                    for (const child of route.children) {
                        routesToSearch.push({ route: child, parent: route });
                    }
                }
                return matchResult;
            }
        }
        return false;
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
        // If route ends in *, don't check anything further than that in the URL
        if (routeArray[routeArray.length - 1] === '*') {
            routeArray.length--;
            if (routeArray.length <= urlArray.length) {
                urlArray.length = routeArray.length;
            }
        }
        // Same number of / characters required.
        if (routeArray.length !== urlArray.length) {
            return false;
        }
        for (const [routeSegment, urlSegment] of ArrayUtilities_1.zip(routeArray, urlArray)) {
            // Parameters are allowed. Optional parameters are not.
            // The reason for no optional parameters is that finding a match between /a/:?param/b and /a/b is too complex.
            // Is 'b' a param value or part of the route. Basically, optional parameters only work at the route end.
            // I noticed that ASP.NET works that way, and I found it confusing that optional parameters only work at the end.
            // Just create a new route with the optional param left out.
            if (routeSegment.startsWith(':')) {
                if (params.has(urlSegment.slice(1))) {
                    throw new Error(`Route ${routeString} contains duplicates of the same parameter.`);
                }
                params.set(routeSegment.slice(1), urlSegment);
            }
            else if (routeSegment !== '*' && routeSegment !== urlSegment.toLowerCase()) {
                return false;
            }
        }
        return params;
    }
    static _renderRoute({ route, parent }) {
        const container = this._prepareRouterContainer(route, parent);
        if (!container) {
            return;
        }
        let view;
        if (Constructable_1.constructorTypeGuard(route.payload)) {
            view = new route.payload();
        }
        else if (route.payload) {
            view = route.payload();
        }
        // If a view was returned
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
        const container = CreateElement_1.createElement('not-found', { id: 'not-found' });
        DeleteNodeContent_1.deleteNodeContent(document.body);
        document.body.appendChild(container);
        container.appendChild(CreateElement_1.createElement(ElementType_1.elementType.HTMLDivElement, { innerHTML: this._notFound || "Quoth the Raven, 404" }));
    }
    static _prepareRouterContainer(route, parentRoute) {
        if (!this._matchedRoute) {
            throw new Error('ProgrammingError: _prepareRouterContainer called out of order.');
        }
        // Look for the route container for the route. If it exists, exit doing nothing. We'll keep it.
        const routeContainer = this._routeContainers.find(f => f.route === route);
        if (!routeContainer) {
            throw new Error("ProgrammingError: Forgot to add routes to route containers.");
        }
        let parent;
        // See if this route has a parent that is on the page
        parent = Elvis_1.e_(this._routeContainers.find(q => q.route === parentRoute)).container;
        if (parent && !document.body.contains(parent)) {
            parent = undefined;
        }
        // If the route has a container, that container exists in the dom, and the staticRouterContainer setting is true, exit
        if (route.staticRouterContainer && routeContainer.container && (parent || document.body).contains(routeContainer.container)) {
            return;
        }
        const containerId = Elvis_1.e_(route).routeContainer || 'child-container';
        // If the parent container doesn't exist in the dom, add to the body.
        if (!parent || !document.body.contains(parent)) {
            // I would think there's always a body element, but typescript seems to think it could be undefined
            // This didn't actually fix the TS error, though.
            if (!document.body) {
                document.createElement('body');
            }
            parent = document.body;
        }
        const currentIndex = this._routeContainers.findIndex(q => q.route === route);
        if (this._routeContainers
            .slice(0, currentIndex) // Only check earlier containers
            .find(q => !!q.container
            && q.container.tagName.toLowerCase() === containerId.toLowerCase()
            && !!parent.querySelector(containerId))) {
            // tslint:disable-next-line:no-console
            console.log(`Route: [${route.route}]. Container [${containerId}] added to DOM by another route. Skipping.`);
            return;
        }
        const newRouter = CreateElement_1.createElement(containerId); /* { id: containerId } */
        const oldRouter = parent.querySelector(containerId);
        if (oldRouter) {
            (oldRouter.parentElement || parent).replaceChild(newRouter, oldRouter);
        }
        else {
            parent.appendChild(newRouter);
        }
        // Update the route container record with the routing container we created.
        routeContainer.container = newRouter;
        return newRouter;
    }
}
AdvancedPageRouter._routes = [];
AdvancedPageRouter._history = [];
AdvancedPageRouter._historyMaxLength = 50;
AdvancedPageRouter._routeContainers = [];
exports.AdvancedPageRouter = AdvancedPageRouter;

},{"../Html/CreateElement":8,"../Html/DeleteNodeContent":9,"../Html/ElementType":10,"../System/Collections/ArrayUtilities":41,"../System/Types/Constructable":47,"../System/Utility/Elvis":53}],36:[function(require,module,exports){
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

},{"../Html/CreateElement":8,"../Html/DeleteNodeContent":9,"../Html/ElementType":10,"../System/Collections/ArrayUtilities":41,"../System/Types/Constructable":47,"../System/Types/KeywordArguments":48,"../System/Types/NoneType":49}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(time) {
    return (result) => new Promise(resolve => setTimeout(() => resolve(result), time));
}
exports.delay = delay;

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeferredPromise_1 = require("./DeferredPromise");
/**
 * Creates a dedicated web worker that communicates via deferreds. It can execute whatever function
 * you give it. TaskStart() acts kind of like doing new Thread() and Thread.Start() in one step.
 * It is possible to do all this manually, but this helper class makes it a fairly trivial operation.
 *
 * Hackwork is used to avoid the need to create a specialized web worker js file. The worker created takes a
 * function and arguments, executes them in its own thread, and returns the result.
 *
 * Further hackwork is needed because web works have no access to modules, no access to closures, and can only
 * communiate in strings. The function to be executed needs to be passed as a string in the message between
 * threads.
 *
 * While it is possible to create a version that does not need to eval() the function string on every execution,
 * this requires the caller to manually code everything that you see in here the constructor. No helpers are allowed
 * (no access to other objects). If you wanted to do everything yourself, you could just make a web worker the right
 * way, without the helper.
 */
class DynamicWebWorker {
    constructor() {
        this.deferredId = 0;
        this.deferreds = new Map();
        function setupFunc() {
            const ctx = self;
            // Set up what happens when a message is sent to the worker.
            // If you're willing to write all this, but remember to define your fn function
            // before onmessage, you can skip the eval() step.
            ctx.onmessage = function (evt) {
                const { id, fn, args } = evt.data;
                try {
                    // This hack allows a single dedicated web worker to handle any function. Because
                    // the worker has no access to closures, it has no access to complex objects. It
                    // can only get the function to execute in the message, which contains simple objects
                    // only, strings and numbers. So it has to be serialized and then deserialized.
                    // The only way to deserialize it is to eval() it. Pretty horriffic.
                    // tslint:disable-next-line:prefer-const
                    let inputFunc;
                    // tslint:disable-next-line:no-eval
                    eval("inputFunc = " + fn + ";");
                    const argarray = JSON.parse(args) || [];
                    const result = inputFunc(...argarray); // Evaluate the function
                    // Send the response back.
                    ctx.postMessage({ id, result: JSON.stringify(result) });
                }
                catch (err) {
                    ctx.postMessage({ id, error: err });
                }
            };
        }
        this._setUpWorker(setupFunc);
    }
    /**
     * Starting a task returns a deferred promise that is resolved when the worker thread has completed its task.
     *
     * Remember that closures DO NOT WORK. Pass your arguments (which must be JSON.stringifiable).
     */
    taskStart(fn, ...args) {
        const id = this.deferredId++;
        const msg = {
            id,
            fn: fn.toString(),
            args: JSON.stringify(args)
        };
        const deferred = new DeferredPromise_1.DeferredPromise();
        this.deferreds.set(id, deferred);
        this.worker.postMessage(msg);
        return deferred.output
            .then(resp => JSON.parse(resp || ''))
            .catch(err => { throw (err || new Error('Unknown error')); });
    }
    _setUpWorker(callback) {
        // Here's the main hack and it's a doozy.
        // Normally, you are required to create a special worker.js file for web workers and link
        // to them when loading the page. Obviously that makes it impossible to define them at runtime.
        // To get around the limitation, this encodes the worker as an object URL (which requires conversion
        // to a string) and loads that.
        this.worker = new Worker(URL.createObjectURL(new Blob(['(' + callback.toString() + ')();'])));
        this.worker.onmessage = evt => {
            const { id, result, error } = evt.data;
            const deferred = this.deferreds.get(id);
            if (!deferred) {
                throw new Error("Deferred promise is missing.");
            }
            if (error) {
                deferred.reject(error);
            }
            else {
                deferred.resolve(result);
            }
            this.deferreds.delete(id);
        };
    }
}
exports.DynamicWebWorker = DynamicWebWorker;

},{"./DeferredPromise":37}],40:[function(require,module,exports){
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

},{"./DeferredPromise":37}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"../Async/RepeatablePromise":40}],45:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":41,"./Delegate":44}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"../Utility/IsInteger":55}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dead simple assertion that'll work anywhere. This is NOT the difficult part of unit testing.
 */
function assert(test, message) {
    if (!test) {
        throw new Error(message || 'Failed');
    }
}
exports.assert = assert;

},{}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{"../Types/NoneType":49}],54:[function(require,module,exports){
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

},{"../Collections/ArrayUtilities":41}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I don't know how accurate this is but it seems pretty good
 */
function isPrimitive(obj) {
    return Object(obj) !== obj;
}
exports.isPrimitive = isPrimitive;

},{}],57:[function(require,module,exports){
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

},{"../Types/NoneType":49,"./CloneObject":52}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Db21wb25lbnQuanMiLCJzcmMvQXBpLmpzIiwic3JjL0Nzcy9Dc3NJbmxpbmVSdWxlLmpzIiwic3JjL0Nzcy9Dc3NSdWxlLmpzIiwic3JjL0Nzcy9Dc3NSdWxlQ29udHJhY3QuanMiLCJzcmMvQ3NzL0Nzc1ZhcmlhYmxlLmpzIiwic3JjL0Nzcy9HZXRDc3NSdWxlc0luRWxlbWVudC5qcyIsInNyYy9IdG1sL0NyZWF0ZUVsZW1lbnQuanMiLCJzcmMvSHRtbC9EZWxldGVOb2RlQ29udGVudC5qcyIsInNyYy9IdG1sL0VsZW1lbnRUeXBlLmpzIiwic3JjL0h0bWwvRXNjYXBlSHRtbC5qcyIsInNyYy9IdG1sL0V4dHJhY3ROb2RlQ29udGVudC5qcyIsInNyYy9IdG1sL0ZpbmRJbmRleEluUGFyZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbC9WYWxpZGF0ZVVuaXF1ZURvbUlkcy5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50LmpzIiwic3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50LmpzIiwic3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JQ29tcG9uZW50QmluZGluZ09wdGlvbnMuanMiLCJzcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lFeGlzdGluZ0VsZW1lbnRPcHRpb25zLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JRXhpc3RpbmdMb29rdXBPcHRpb25zLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JSW5uZXJIdG1sT3B0aW9ucy5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSU91dGVySHRtbE9wdGlvbnMuanMiLCJzcmMvT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZS5qcyIsInNyYy9PYnNlcnZhYmxlL0ludGVybmFsL0FycmF5T2JzZXJ2YWJsZS5qcyIsInNyYy9PYnNlcnZhYmxlL0ludGVybmFsL0FycmF5UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0T2JzZXJ2YWJsZS5qcyIsInNyYy9PYnNlcnZhYmxlL0ludGVybmFsL09iamVjdFByb3h5SGFuZGxlci5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVBc3NpZ24uanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQmFzZS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm94eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZS5qcyIsInNyYy9Sb3V0ZXIvQWR2YW5jZWRQYWdlUm91dGVyLmpzIiwic3JjL1JvdXRlci9QYWdlUm91dGVyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlbGF5LmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EeW5hbWljV2ViV29ya2VyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnkuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQXNzZXJ0LmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZU9iamVjdC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9FbHZpcy5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXIuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3B4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFwaV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9BcGlcIik7XG5jb25zdCBCb3VuZENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpO1xuKGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgcGx1Z2luID0ge1xuICAgICAgICBDb21wb25lbnQ6IEFwaV8xLkNvbXBvbmVudCxcbiAgICAgICAgQm91bmRDb21wb25lbnQ6IEJvdW5kQ29tcG9uZW50XzEuQm91bmRDb21wb25lbnQsXG4gICAgICAgIENvbXBvbmVudE1hcDogQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLFxuICAgICAgICBnZXRDb21wb25lbnQ6IENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudCxcbiAgICB9O1xuICAgIHdpbmRvdy5taTUgPSB3aW5kb3cubWk1IHx8IHt9O1xuICAgIHdpbmRvdy5taTUuY29tcG9uZW50ID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1LmNvbXBvbmVudCB8fCB7fSwgcGx1Z2luKTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9Dc3MvQ3NzSW5saW5lUnVsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9Dc3MvQ3NzUnVsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9Dc3MvQ3NzUnVsZUNvbnRyYWN0XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0Nzcy9Dc3NWYXJpYWJsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9Dc3MvR2V0Q3NzUnVsZXNJbkVsZW1lbnRcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWwvRGVsZXRlTm9kZUNvbnRlbnRcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9FbGVtZW50VHlwZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sL0VzY2FwZUh0bWxcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9GaW5kSW5kZXhJblBhcmVudFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWwvUXVlcnlTZWxlY3Rvck5vZGVMaXN0XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWwvVmFsaWRhdGVVbmlxdWVEb21JZHNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbENvbXBvbmVudC9Cb3VuZENvbXBvbmVudFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sQ29tcG9uZW50L0NvbXBvbmVudFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sQ29tcG9uZW50L0NvbXBvbmVudE1hcFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUV4aXN0aW5nRWxlbWVudE9wdGlvbnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbENvbXBvbmVudC9PcHRpb25zL0lJbm5lckh0bWxPcHRpb25zXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JRXhpc3RpbmdMb29rdXBPcHRpb25zXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JT3V0ZXJIdG1sT3B0aW9uc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUNvbXBvbmVudEJpbmRpbmdPcHRpb25zXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL09ic2VydmFibGUvSU9ic2VydmFibGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQXNzaWduXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL09ic2VydmFibGUvT2JzZXJ2YWJsZUJhc2VcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHlcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJveHlcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vUm91dGVyL1BhZ2VSb3V0ZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vUm91dGVyL0FkdmFuY2VkUGFnZVJvdXRlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vQXN5bmMvRHluYW1pY1dlYldvcmtlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vQXN5bmMvRGVmZXJyZWRQcm9taXNlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9Bc3luYy9EZWxheVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9Db2xsZWN0aW9ucy9PcmRlckJ5XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9FdmVudEhhbmRsZXIvQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9FdmVudEhhbmRsZXIvRGVsZWdhdGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9VdGlsaXR5L0Fzc2VydFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvQ2xvbmVPYmplY3RcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvRWx2aXNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIikpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDc3NSdWxlXzEgPSByZXF1aXJlKFwiLi9Dc3NSdWxlXCIpO1xuLyoqXG4gKiBBIHNpbXBsZSwgZGVmYXVsdCBDc3MgUnVsZSB0aGF0IGlzIHdpdGggYW4gaW5saW5lIGluaXRpYWxpemVyIGluIHRoZSBjb25zdHJ1Y3RvciwgdXNlZnVsIGZvciBxdWljayBhbmQgZGlydHkgaW5saW5lIGNsYXNzZXMuXG4gKi9cbmNsYXNzIENzc0lubGluZVJ1bGUgZXh0ZW5kcyBDc3NSdWxlXzEuQ3NzUnVsZSB7XG4gICAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGluaXRpYWwsIHBhcmVudCkge1xuICAgICAgICBzdXBlcihwYXJlbnQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGluaXRpYWwpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yJCA9IHNlbGVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydHMuQ3NzSW5saW5lUnVsZSA9IENzc0lubGluZVJ1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBHZXRVbmlxdWVJZF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0dldFVuaXF1ZUlkXCIpO1xuY29uc3QgQ3NzVmFyaWFibGVfMSA9IHJlcXVpcmUoXCIuL0Nzc1ZhcmlhYmxlXCIpO1xuLyoqXG4gKiBBIEphdmFzY3JpcHQgQ1NTIHJ1bGUuIE5vdGUgdGhlIGNhcGl0YWxpemF0aW9uLiBUaGlzIGlzbid0IHRoZSBzYW1lIGFzIENTU1J1bGUuIEknbSBjb25zaWRlcmluZyByZW5hbWluZyB0aGlzIHRvXG4gKiBDc3NKc1J1bGUgYnV0IEknbSBob3BpbmcgSSB0aGluayB1cCBzb21ldGhpbmcgYmV0dGVyLiBJdCBoYXMgdG8gYmUgbW9yZSBnZW5lcmljIHRoYW4gQ3NzQ2xhc3MgYmVjYXVzZSwgd2VsbCwgdGhlcmUnc1xuICogbW9yZSB0byBDU1MgdGhhbiBjbGFzcyBzZWxlY3RvcnMuXG4gKi9cbmNsYXNzIENzc1J1bGUge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgICAgICAvKiogU3RvcmluZyB0aGlzIHNvbWV3aGVyZSBvdGhlciB0aGFuIHRoZSBIRUFEIHdvdWxkIG1ha2UgaXQgZWFzeSB0byBkcm9wIHRoZSBzaGVldCBvbiBwYWdlIGNoYW5nZS4gKi9cbiAgICAgICAgdGhpcy5zdHlsZVNoZWV0UGFyZW50JCA9IGRvY3VtZW50LmhlYWQ7XG4gICAgICAgIHRoaXMuc3R5bGVTaGVldElkJCA9IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKTtcbiAgICAgICAgdGhpcy5leHRlbmRzJCA9IFtdO1xuICAgICAgICB0aGlzLm5lc3RlZCQgPSBbXTtcbiAgICAgICAgdGhpcy5yZXZlcnQkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NvbnN0cnVjdGVkJCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zZWxlY3RvcnMkID0gW107XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVTaGVldFBhcmVudCQgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyJChwYXJlbnRTZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbnN0cnVjdGVkJCkge1xuICAgICAgICAgICAgLy8gUmVtZW1iZXIsIHdlIGNhbm5vdCByZWFkIHByb3BlcnRpZXMgb2YgdGhpcyBpbiB0aGUgY29uc3RydWN0b3IsIGJlY2F1c2UgdGhlaXIgcG9wdWxhdGlvbiBpcyBlbWl0dGVkXG4gICAgICAgICAgICAvLyBhZnRlciB0aGUgc3VwZXIoKSBjYWxsLiBCdXQgd2UgZG9uJ3Qgd2FudCB0byBjbG9uZSB0aGlzIG9iamVjdCBhbmQgcmVwZWF0IHRoaXMgZXZlcnkgdGltZSBpdCdzIHJlbmRlcmVkLlxuICAgICAgICAgICAgdGhpcy5fY29uc3RydWN0ZWQkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJldmVydCQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbCA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZXh0ZW5kQ2xhc3MkKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5uZXN0ZWQkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubmVzdGVkJCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXN0ZWQkID0gW3RoaXMubmVzdGVkJF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgW2lkeCwgbmVzdF0gb2YgdGhpcy5uZXN0ZWQkLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKG5lc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5lc3RlZCRbaWR4XSA9IG5ldyBuZXN0KHRoaXMuc3R5bGVTaGVldFBhcmVudCQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYnVpbGRTZWxlY3RvcnMkKHBhcmVudFNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYSBzZXBhcmF0ZSBzdHlsZSBlbGVtZW50IGZvciBlYWNoIHJ1bGUuIFRoYXQgbWlnaHQgc2VlbSBwcmV0dHkgZXhjZXNzaXZlLCBidXQgaXQncyB0aGUgb25seSB3YXlcbiAgICAgICAgLy8gdG8gbWFrZSBpdCBlYXN5IHRvIHVwZGF0ZSBydWxlcy4gVGhlIEFQSSBmb3IgZGVhbGluZyB3aXRoIENTUyBpbiBIVE1MNSBpcyBOQUFBQUFBQVNUWS5cbiAgICAgICAgbGV0IHN0eWxlRWxlbWVudCA9IHRoaXMuc3R5bGVTaGVldFBhcmVudCQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLnN0eWxlU2hlZXRJZCQpO1xuICAgICAgICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlU2hlZXRQYXJlbnQkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVFbGVtZW50ID0gdGhpcy5zdHlsZVNoZWV0UGFyZW50JC5hcHBlbmRDaGlsZChDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxTdHlsZUVsZW1lbnQsIHsgaWQ6IHRoaXMuc3R5bGVTaGVldElkJCB9KSk7XG4gICAgICAgIGNvbnN0IHNoZWV0ID0gc3R5bGVFbGVtZW50LnNoZWV0O1xuICAgICAgICB0aGlzLl9idWlsZFJ1bGUkKHNoZWV0KTtcbiAgICAgICAgaWYgKHRoaXMubmVzdGVkJCkge1xuICAgICAgICAgICAgLy8gV2UgcHJldmlvdXNseSBtYWRlIHRoaXMgYW4gYXJyYXkgb2YgY29uc3RydWN0ZWQgdHlwZXMuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5lc3Qgb2YgdGhpcy5uZXN0ZWQkKSB7XG4gICAgICAgICAgICAgICAgbmVzdC5zdHlsZVNoZWV0UGFyZW50JCA9IHRoaXMuc3R5bGVTaGVldFBhcmVudCQ7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBzZWwgb2YgdGhpcy5fc2VsZWN0b3JzJCkge1xuICAgICAgICAgICAgICAgICAgICBuZXN0LnJlbmRlciQoc2VsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZSQoKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IHRoaXMuc3R5bGVTaGVldFBhcmVudCQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLnN0eWxlU2hlZXRJZCQpO1xuICAgICAgICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlU2hlZXRQYXJlbnQkLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50IFwibXVsdGlwbGUgaW5oZXJpdGFuY2VcIi5cbiAgICAgKlxuICAgICAqIFRoaXMgY2hlY2tzIG9ubHkgQ1NTIHByb3BlcnRpZXMuIElmIHlvdSBpbmhlcml0IGZyb20gb3RoZXIgQ3NzUnVsZSBjbGFzc2VzIHRoYXRcbiAgICAgKiB0aGVtc2VsdmVzIGhhdmUgZXh0ZW5kcyQgc2V0LCB0aG9zZSBhcmUgbm90IGNoZWNrZWQuIEkgZG9uJ3QgdGhpbmsgdGhlcmUncyBlbm91Z2hcbiAgICAgKiBqdXN0aWZpY2F0aW9uIHRvIGJyaW5nIHJlY3Vyc2lvbiBpbnRvIHRoaXMuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgcHJpb3JpdHkgaXMgaW4gdGhlIG9wcG9zaXRlIGRpcmVjdGlvbiBvZiBub3JtYWwgaW5oZXJpdGFuY2UgcHJpb3JpdHkuXG4gICAgICogTm9ybWFsbHksIHdoZW4gbG9va2luZyBmb3IgYSBwcm9wZXJ0eSwgdGhlIHJ1bnRpbWUgdHJhdmVyc2VzIHRoZSBpbmhlcml0YW5jZSB0cmVlXG4gICAgICogYW5kIHVzZXMgdGhlIGZpcnN0IG9jY3VycmVuY2UuIEluIENTUywgdGhlIExBU1Qgb2NjdXJhbmNlIHRha2VzIHByaW9yaXR5LlxuICAgICAqL1xuICAgIF9leHRlbmRDbGFzcyQoKSB7XG4gICAgICAgIGlmICghdGhpcy5leHRlbmRzJCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmV4dGVuZHMkKSkge1xuICAgICAgICAgICAgdGhpcy5leHRlbmRzJCA9IFt0aGlzLmV4dGVuZHMkXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGV4IG9mIHRoaXMuZXh0ZW5kcyQpIHtcbiAgICAgICAgICAgIGxldCB0cmFpdFNvdXJjZTtcbiAgICAgICAgICAgIGlmIChDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQoZXgpKSB7XG4gICAgICAgICAgICAgICAgdHJhaXRTb3VyY2UgPSBuZXcgZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYWl0U291cmNlID0gZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuYW1lcyA9IEFycmF5LmZyb20obmV3IFNldChmaW5kUHJvcGVydHlOYW1lcyh0cmFpdFNvdXJjZSkpKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG5hbWVzKSB7XG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBuYW1lcyB3aXRoIHNwZWNpYWwgbWVhbmluZ1xuICAgICAgICAgICAgICAgIGlmIChrZXkuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdHJhaXRTb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfYnVpbGRTZWxlY3RvcnMkKHBhcmVudFNlbGVjdG9yKSB7XG4gICAgICAgIHBhcmVudFNlbGVjdG9yID0gKHBhcmVudFNlbGVjdG9yIHx8ICcnKTtcbiAgICAgICAgLy8gSWYgc2NvcGVFbGVtZW50JCBpcyBzZXQsIDxzdHlsZSBzY29wZWQ+IGlzIHNpbXVsYXRlZCBpbiBhIGhhY2t5IHdheS4gSXQgZ2VuZXJhdGVzIGFuIHJhbmRvbSBjbGFzcyBuYW1lIGFuZCBhZGRzXG4gICAgICAgIC8vIHRoYXQgdG8gYm90aCB0aGUgc2VsZWN0b3IgYW5kIHRoZSBlbGVtZW50LiBUaGlzIHNpbWlsYXIgdG8gdGhlIHdheSBDU1MgTW9kdWxlcyBhbmQgQW5ndWxhciBkbyBpdCwgZXhjZXB0IHRoZVxuICAgICAgICAvLyByYW5kb20gc2VsZWN0b3IgY29tZXMgZHVyaW5nIHJ1bnRpbWUgaW5zdGVhZCBvZiBhIGN1c3RvbSBidWlsZCBwcm9jZXNzLlxuICAgICAgICBpZiAodGhpcy5zY29wZUVsZW1lbnQkICYmICF0aGlzLl9mYWtlU2NvcGVDbGFzcyQpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zha2VTY29wZUNsYXNzJCA9IHRoaXMuX2Zha2VTY29wZUNsYXNzJCB8fCAnc2NvcGUtJyArIEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKTtcbiAgICAgICAgICAgIHRoaXMuc2NvcGVFbGVtZW50JC5jbGFzc0xpc3QuYWRkKHRoaXMuX2Zha2VTY29wZUNsYXNzJCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgc2VsIG9mIHRoaXMuc2VsZWN0b3IkLnNwbGl0KCcsJykubWFwKG0gPT4gbS50cmltKCkpKSB7XG4gICAgICAgICAgICBzZWwgPSAoc2VsIHx8ICcnKS5yZXBsYWNlKCcmJywgJycpOyAvLyBBbXBlcnNhbmQgdGVsbHMgdXMgd2hlcmUgdG8gc3RhcnQgKGFsbG93cyBhIHNwYWNlKSBidXQgaXQncyBpbnZhbGlkIENTU1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Zha2VTY29wZUNsYXNzJCkge1xuICAgICAgICAgICAgICAgIGlmICghc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9ycyQucHVzaChwYXJlbnRTZWxlY3RvciArICcuJyArIHRoaXMuX2Zha2VTY29wZUNsYXNzJCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcm9kdWNlIGFuIGlkIGxpa2UgXCJkaXYuYXV0b2dlbiAub3RoZXJjbGFzcywgLmF1dG9nZW4gZGl2IC5vdGhlcmNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd29yZHMgPSBzZWwuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgd29yZHNbMF0gPSBwYXJlbnRTZWxlY3RvciArIHdvcmRzWzBdICsgJy4nICsgdGhpcy5fZmFrZVNjb3BlQ2xhc3MkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvcnMkLnB1c2god29yZHMuam9pbignICcpLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXJlIGlzIG5vIENTUyBzZWxlY3RvciB0aGF0IG1hdGNoZXMgYW4gaXRlbSBhbmQgaXRzIGNoaWxkcmVuLiBJdCB0YWtlcyAyIHJ1bGVzLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvcnMkLnB1c2goKHBhcmVudFNlbGVjdG9yICsgJy4nICsgdGhpcy5fZmFrZVNjb3BlQ2xhc3MkICsgJyAnICsgc2VsKS50cmltKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzZWwpIHtcbiAgICAgICAgICAgICAgICAvLyBBIGJsYW5rIHNlbGVjdG9yIHdpbGwgZmFpbFxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvcnMkLnB1c2gocGFyZW50U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3JzJC5wdXNoKCdib2R5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3JzJC5wdXNoKHBhcmVudFNlbGVjdG9yICsgc2VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfYnVpbGRSdWxlJChzaGVldCkge1xuICAgICAgICBjb25zdCBydWxlVGV4dCA9IFtdO1xuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZmluZFByb3BlcnR5TmFtZXModGhpcykpKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgbmFtZXMgd2l0aCBzcGVjaWFsIG1lYW5pbmdcbiAgICAgICAgICAgIGlmIChrZXkuZW5kc1dpdGgoJyQnKSB8fCAhdGhpc1trZXldIHx8IHR5cGVvZiB0aGlzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIFR5cGVzY3JpcHQgd2FzIHdvcmtpbmcgY29ycmVjdGx5LCB3ZSBrbm93IHRoYXQgYWxsIHByb3BlcnRpZXMgdGhhdCBkb24ndCBlbmQgaW4gJCBhcmUgUnVsZVZhbHVlIHR5cGUuXG4gICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBydWxlVGV4dC5wdXNoKGAke2tleX06ICR7dmFsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgQ3NzVmFyaWFibGVfMS5Dc3NWYXJpYWJsZSkge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICAgICAgcnVsZVRleHQucHVzaChgJHtrZXl9OiB2YXIoLS0ke3ZhbC5uYW1lfSlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5lc3RlZCBwcm9wZXJ0aWVzLCB3aGljaCBleHRlbmQgdGhlIGtleSBhbmQgYWRkIG1vcmUgcnVsZXNcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlblxuICAgICAgICAgICAgICAgICAgICBpZiAobnAuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdnAgPSB2YWxbbnBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZVRleHQucHVzaChgJHtrZXl9LSR7bnB9OiAke3ZwfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzLnB1c2godnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZVRleHQucHVzaChgJHtrZXl9LSR7bnB9OiB2YXIoLS0ke3ZhbC5uYW1lfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmdWxsU2VsZWN0b3IgPSB0aGlzLl9zZWxlY3RvcnMkLmpvaW4oJywgJyk7XG4gICAgICAgIGNvbnN0IGZ1bGxUZXh0ID0gcnVsZVRleHQuam9pbignOyBcXG4nKTtcbiAgICAgICAgaWYgKCFmdWxsVGV4dCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gQ1NTIHByb3BlcnRpZXMgZGVmaW5lZCBmb3IgcnVsZTogJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IG9uICR7ZnVsbFNlbGVjdG9yfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZnVsbFJ1bGUgPSBgJHtmdWxsU2VsZWN0b3J9IHsgXFxuJHtmdWxsVGV4dH07IFxcbn1gO1xuICAgICAgICBpZiAodGhpcy5tZWRpYSQpIHtcbiAgICAgICAgICAgIGZ1bGxSdWxlID0gYEBtZWRpYSAke3RoaXMubWVkaWEkfSB7IFxcbiR7ZnVsbFJ1bGV9XFxufWA7XG4gICAgICAgIH1cbiAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShmdWxsUnVsZSwgMCk7XG4gICAgICAgIC8vIEFkZCBhbGwgdGhlIHZhcmlhYmxlIHZhbHVlc1xuICAgICAgICBsZXQgaSA9IDE7XG4gICAgICAgIGZvciAoY29uc3QgdiBvZiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhclRleHQgPSBgJHt2LnNjb3BlfSB7IC0tJHt2Lm5hbWV9OiAke3YudmFsdWV9OyB9YDtcbiAgICAgICAgICAgIHNoZWV0Lmluc2VydFJ1bGUodmFyVGV4dCwgaSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNzc1J1bGUgPSBDc3NSdWxlO1xuZnVuY3Rpb24gZmluZFByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0LnB1c2goLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5maWx0ZXIoZiA9PiBmICE9PSAnY29uc3RydWN0b3InKSk7XG4gICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goLi4uZmluZFByb3BlcnR5TmFtZXMocHJvdG8pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGlzIHR5cGUgaXMgaGVyZSBmb3IgYSBidWxsc2hpdCByZWFzb24sIHdoaWNoIGlzIHRoYXQgaWYgeW91IHdhbnQgdG8gcmVxdWlyZSB2YWx1ZXMgdG8gYmUgYWxsIHN0cmluZ3MsIHRoaXMgY29weXBhc3RhXG4gKiBtdXN0IGJlIGluY2x1ZGVkIGluIHRoZSBkZWZpbml0aW9uIG9mIHRoZSBjbGFzcy4gVGhhdCdzIGdvaW5nIGZhciBiZXlvbmQgdGltZSBjaGVja2luZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTUzMDAgKG5vdCBqdXN0IGludGVyZmFjZXMpXG4gKi9cbmNsYXNzIENzc1NpbXBsZVJ1bGUge1xuICAgIGNvbnN0cnVjdG9yKGluaXRpYWwpIHtcbiAgICAgICAgaWYgKGluaXRpYWwpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdGlhbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNzc1NpbXBsZVJ1bGUgPSBDc3NTaW1wbGVSdWxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFVzZSB0byBkZWZpbmUgYSBDU1MgY3VzdG9tIHByb3BlcnR5LlxuICovXG5jbGFzcyBDc3NWYXJpYWJsZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdmFsdWUsIHNjb3BlID0gJzpyb290Jykge1xuICAgICAgICB0aGlzLnNjb3BlID0gJzpyb290JztcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgfVxufVxuZXhwb3J0cy5Dc3NWYXJpYWJsZSA9IENzc1ZhcmlhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBnZXRDc3NSdWxlc0luRWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBzdHlsZSBvZiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N0eWxlJykpIHtcbiAgICAgICAgZm9yIChjb25zdCBydWxlIG9mIHN0eWxlLnNoZWV0LmNzc1J1bGVzKSB7XG4gICAgICAgICAgICAvLyBBIHZlcnkgbWluaW11bSBvZiBwcmV0dHkgcHJpbnRpbmcuIEkgbWF5IGJlZWYgaXQgdXAgbGF0ZXIuXG4gICAgICAgICAgICByZXN1bHQucHVzaChydWxlLmNzc1RleHQucmVwbGFjZSgvXFx7L2csICdcXG4gICAge1xcbiAgICcpLnJlcGxhY2UoLzsvZywgJztcXG4gICAgJykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuam9pbignXFxuJyk7XG59XG5leHBvcnRzLmdldENzc1J1bGVzSW5FbGVtZW50ID0gZ2V0Q3NzUnVsZXNJbkVsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4vRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyB0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgLy8gQWxsb3cgYXR0cmlidXRlcyB0byBiZSBzZW50IG9uIHByb3BlcnRpZXMsIHByb3ZpZGluZyBhIGNsZWFuZXIgaW50ZXJmYWNlLlxuICAgIC8vIEl0IGFsbG93cyB5b3UgdG8gc2VuZCBjcmVhdGVFbGVtZW50KCdkaXYnLCB7YXR0cmlidXRlczogeyBjbGFzczogJ2ZvbycgfX0pIGluc3RlYWQgb2YgY3JlYXRlRWxlbWVudCgnZGl2JywgbnVsbCwgeyBjbGFzczogJ2ZvbycgfSk7XG4gICAgLy8gQW5vdGhlciBvcHRpb24gaXMgdG8gdXNlIEt3YXJncywgYnV0IG5vdCBldmVyeW9uZSB3YW50cyB0by5cbiAgICBpZiAocHJvcGVydGllcyAmJiAnYXR0cmlidXRlcycgaW4gcHJvcGVydGllcykge1xuICAgICAgICBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihhdHRyaWJ1dGVzIHx8IHt9LCBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXMpO1xuICAgICAgICBkZWxldGUgcHJvcGVydGllcy5hdHRyaWJ1dGVzO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbmZ1bmN0aW9uIGNyZWF0ZSh0YWcsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpKTtcbiAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIERPTSBwcm9wZXJ0aWVzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGF0dHJpYnV0ZXMsIGJlY2F1c2UgaW4gc29tZSBjYXNlcywgdGhleSBvdmVycmlkZSB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHByb3BlcnRpZXMpO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIEhUTUwgZnJvbSBhbnkgSFRNTCBlbGVtZW50IHByb3ZpZGVkLlxuICogVXNlIGxpa2UgY29uc3QgZGl2ID0gY3JlYXRlSHRtbDxIVE1MRGl2RWxlbWVudD4oXCI8ZGl2PlNvbWV0aGluZzwvZGl2PlwiKSBvciBjb25zdCBjdXN0b20gPSBjcmVhdGVIdG1sKFwiPHNvbWUtdGFnPjwvc29tZS10YWc+XCIpLlxuICogSWYgbXVsdGlwbGUgZWxlbWVudHMgb3IgYSBwbGFpbiB0ZXh0IHN0cmluZyB3aXRoIG5vIEhUTUwgaXMgcHJvdmlkZWQsIHRoZW4gaXQgd2lsbCBiZSB3cmFwcGVkIGluIGEgZGl2LCBzbyBpdCBjYW4ga2VlcFxuICogcmV0dXJuaW5nIGFuIEhUTUxFbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUh0bWwoaHRtbCwgaW5saW5lID0gZmFsc2UpIHtcbiAgICBsZXQgd3JhcHBlcjtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgIHdyYXBwZXIgPSBzcGFuKChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZXMgPSB3cmFwcGVyLmNoaWxkTm9kZXM7XG4gICAgLy8gTXVsdGlwbGUgbm9kZXMsIHJldHVybiB0aGUgd3JhcHBpbmcgZGl2XG4gICAgLy8gZS5nLiBcIlRoaXMgaXMgYSA8ZW0+dGVzdDwvZW0+XCIgb3IgXCI8ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PlwiXG4gICAgaWYgKG5vZGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG4gICAgLy8gSWYganVzdCBhIHRleHRub2RlIChvciBlbXB0eSksIHJldHVybiBhIHNwYW4uIFRleHQgaXMgaW5jb21wYXRpYmxlIHdpdGggSFRNTEVsZW1lbnQgc28gY2FuJ3QgcmV0dXJuIHRoYXRcbiAgICAvLyBlLmcuIFwiSGVsbG8gd29ybGRcIlxuICAgIGlmICghd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlcjsgLy8gVGhpcyBpcyBhIHNwYW5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcGFuKHdyYXBwZXIuaW5uZXJIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFbHNlIHJldHVybiB0aGUgc2luZ2xlIGNoaWxkLlxuICAgIC8vIGUuZy4gXCI8ZGl2PjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+PC9kaXY+XCJcbiAgICByZXR1cm4gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbn1cbmV4cG9ydHMuY3JlYXRlSHRtbCA9IGNyZWF0ZUh0bWw7XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB3aXRoIGFueSBodG1sLlxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudChodG1sKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRpdigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICByZXR1cm4gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHdyYXBwZXIpO1xufVxuZXhwb3J0cy5jcmVhdGVGcmFnbWVudCA9IGNyZWF0ZUZyYWdtZW50O1xuZnVuY3Rpb24gZGl2KGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmRpdiA9IGRpdjtcbmZ1bmN0aW9uIHNwYW4oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxTcGFuRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnNwYW4gPSBzcGFuO1xuZnVuY3Rpb24gcGFyYWdyYXBoKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MUGFyYWdyYXBoRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLnBhcmFncmFwaCA9IHBhcmFncmFwaDtcbmZ1bmN0aW9uIGFuY2hvcihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgaHJlZk9yUHJvcGVydGllcyA9IHt9LCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBocmVmT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgY29uc3QgdG1wID0gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEFuY2hvckVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIGlmICh0eXBlb2YgaHJlZk9yUHJvcGVydGllcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdG1wLmhyZWYgPSBTdHJpbmcoaHJlZk9yUHJvcGVydGllcyB8fCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB0bXA7XG59XG5leHBvcnRzLmFuY2hvciA9IGFuY2hvcjtcbmZ1bmN0aW9uIGJ1dHRvbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTEJ1dHRvbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5idXR0b24gPSBidXR0b247XG4vLyBDb21tb24gcHJpdmF0ZSBmdW5jdGlvbnMgZm9yIG92ZXJsb2Fkcy4gUHJldmVudHMgbG90cyBvZiBjb3B5cGFzdGEuXG4vLyBUaGlzIHdvcmtzIGZvciBldmVyeXRoaW5nIGJlY2F1c2UgVHlwZVNjcmlwdCBpcyBrZWVwaW5nIHRoZSB0eXBlcyB2YWxpZC4gSW4gcHVyZSBKUywgYnVncyBjb3VsZCBiZSBjcmVhdGVkIChmb3IgZXhhbXBsZSwgcGFzc2luZyBhbiBpbm5lclxuLy8gZWxlbWVudCB0byBhIHBhcmFncmFwaCAuLi4gZGlzYWxsb3dlZCBieSBUUyBidXQgdGhlIGNvZGUgaXMgdGhlcmUgaW4gdGhlIEpTKVxuZnVuY3Rpb24gX2ludGVybmFsKHR5cGUsIGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBpZiAoaHRtbE9yUHJvcGVydGllcyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfb3ZyMSh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGh0bWxPclByb3BlcnRpZXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIzKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9vdnIyKHR5cGUsIFN0cmluZyhodG1sT3JQcm9wZXJ0aWVzIHx8ICcnKSwgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX292cjEodHlwZSwgaW5uZXJFbGVtZW50LCBwcm9wcywgYXR0cnMpIHtcbiAgICBjb25zdCBlID0gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xuICAgIGUuYXBwZW5kQ2hpbGQoaW5uZXJFbGVtZW50KTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIF9vdnIyKHR5cGUsIGlubmVySHRtbCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBpbm5lckh0bWw7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbmZ1bmN0aW9uIF9vdnIzKHR5cGUsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gcHJvcHMuaW5uZXJIVE1MIHx8ICcnO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGVsZXRlIHRoZSBjb250ZW50cyBvZiBhbnkgaHRtbCBub2RlLlxuICovXG5mdW5jdGlvbiBkZWxldGVOb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xufVxuZXhwb3J0cy5kZWxldGVOb2RlQ29udGVudCA9IGRlbGV0ZU5vZGVDb250ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEEgaGVscGVyIGZvciBDcmVhdGVFbGVtZW50LCByb3VnaGx5IG1hcHBpbmcgdG8gSHRtbEVsZW1lbnQgdHlwZXMsIGJ1dCBub3QgcGVyZmVjdGx5IGJlY2F1c2UgaXQncyBpbXBvc3NpYmxlXG4gKiAodGhlcmUncyBubyBwZXJmZWN0IDE6MSByZWxhdGlvbnNoaXApLlxuICovXG52YXIgZWxlbWVudFR5cGU7XG4oZnVuY3Rpb24gKGVsZW1lbnRUeXBlKSB7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQW5jaG9yRWxlbWVudFwiXSA9IFwiYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFyZWFFbGVtZW50XCJdID0gXCJhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXVkaW9FbGVtZW50XCJdID0gXCJhdWRpb1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJSRWxlbWVudFwiXSA9IFwiYnJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCYXNlRm9udEVsZW1lbnRcIl0gPSBcImJhc2Vmb250XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmxvY2tRdW90ZUVsZW1lbnRcIl0gPSBcImJsb2NrcXVvdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCdXR0b25FbGVtZW50XCJdID0gXCJidXR0b25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxDYW52YXNFbGVtZW50XCJdID0gXCJjYW52YXNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhRWxlbWVudFwiXSA9IFwiZGF0YVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFMaXN0RWxlbWVudFwiXSA9IFwiZGF0YWxpc3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaWFsb2dFbGVtZW50XCJdID0gXCJkaWFsb2dcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEaXZFbGVtZW50XCJdID0gXCJkaXZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxETGlzdEVsZW1lbnRcIl0gPSBcImRsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRW1iZWRFbGVtZW50XCJdID0gXCJlbWJlZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZpZWxkU2V0RWxlbWVudFwiXSA9IFwiZmllbGRzZXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGb3JtRWxlbWVudFwiXSA9IFwiZm9ybVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcxRWxlbWVudFwiXSA9IFwiaDFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMkVsZW1lbnRcIl0gPSBcImgyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzNFbGVtZW50XCJdID0gXCJoM1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc0RWxlbWVudFwiXSA9IFwiaDRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNUVsZW1lbnRcIl0gPSBcImg1XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzZFbGVtZW50XCJdID0gXCJoNlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhSRWxlbWVudFwiXSA9IFwiaHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbWFnZUVsZW1lbnRcIl0gPSBcImltYWdlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW5wdXRFbGVtZW50XCJdID0gXCJpbnB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExhYmVsRWxlbWVudFwiXSA9IFwibGFiZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMZWdlbmRFbGVtZW50XCJdID0gXCJsZWdlbmRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMSUVsZW1lbnRcIl0gPSBcImxpXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGlua0VsZW1lbnRcIl0gPSBcImxpbmtcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNYXBFbGVtZW50XCJdID0gXCJtYXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNZXRlckVsZW1lbnRcIl0gPSBcIm1ldGVyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kRGVsRWxlbWVudFwiXSA9IFwiZGVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTW9kSW5zRWxlbWVudFwiXSA9IFwiaW5zXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT0xpc3RFbGVtZW50XCJdID0gXCJvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9iamVjdEVsZW1lbnRcIl0gPSBcIm9iamVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdEdyb3VwRWxlbWVudFwiXSA9IFwib3B0Z3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRpb25FbGVtZW50XCJdID0gXCJvcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPdXRwdXRFbGVtZW50XCJdID0gXCJvdXRwdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhZ3JhcGhFbGVtZW50XCJdID0gXCJwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYW1FbGVtZW50XCJdID0gXCJwYXJhbVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBpY3R1cmVFbGVtZW50XCJdID0gXCJwaWN0dXJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJlRWxlbWVudFwiXSA9IFwicHJlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUHJvZ3Jlc3NFbGVtZW50XCJdID0gXCJwcm9ncmVzc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFF1b3RlRWxlbWVudFwiXSA9IFwicVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNjcmlwdEVsZW1lbnRcIl0gPSBcInNjcmlwdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNlbGVjdEVsZW1lbnRcIl0gPSBcInNlbGVjdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNvdXJjZUVsZW1lbnRcIl0gPSBcInNvdXJjZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFNwYW5FbGVtZW50XCJdID0gXCJzcGFuXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3R5bGVFbGVtZW50XCJdID0gXCJzdHlsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ2FwdGlvbkVsZW1lbnRcIl0gPSBcImNhcHRpb25cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZURhdGFDZWxsRWxlbWVudFwiXSA9IFwidGRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUhlYWRlckNlbGxFbGVtZW50XCJdID0gXCJ0aFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sRWxlbWVudFwiXSA9IFwiY29sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xHcm91cEVsZW1lbnRcIl0gPSBcImNvbGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVFbGVtZW50XCJdID0gXCJ0YWJsZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlUm93RWxlbWVudFwiXSA9IFwidHJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Cb2R5RWxlbWVudFwiXSA9IFwidGJvZHlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25Gb290ZXJFbGVtZW50XCJdID0gXCJ0Zm9vdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkhlYWRlckVsZW1lbnRcIl0gPSBcInRoZWFkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGVtcGxhdGVFbGVtZW50XCJdID0gXCJ0ZW1wbGF0ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRleHRBcmVhRWxlbWVudFwiXSA9IFwidGV4dGFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUaW1lRWxlbWVudFwiXSA9IFwidGltZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRyYWNrRWxlbWVudFwiXSA9IFwidHJhY2tcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxVTGlzdEVsZW1lbnRcIl0gPSBcInVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVmlkZW9FbGVtZW50XCJdID0gXCJ2aWRlb1wiO1xufSkoZWxlbWVudFR5cGUgPSBleHBvcnRzLmVsZW1lbnRUeXBlIHx8IChleHBvcnRzLmVsZW1lbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZXNjYXBlSHRtbChpbnB1dCkge1xuICAgIC8vIFRoZXJlIGlzbid0IGEgYnVpbHQtaW4gd2F5IHRvIGRvIHRoaXMsIHN0aWxsLCBzbyB3ZSBuZWVkIGEgaGVscGVyIGZ1bmN0aW9uLlxuICAgIC8vIFRoZSBhcnRpY2xlIFwiWW91IGFyZSBwcm9iYWJseSBtaXN1c2luZyBET00gdGV4dCBtZXRob2RzXCIgY29udmluY2VkIG1lIHRvIGRvIGl0IHRoaXMgd2F5LFxuICAgIC8vIHZzLiBjcmVhdGVUZXh0Tm9kZS4gVGhvdWdoIGNyZWF0ZVRleHROb2RlIHdvdWxkIHByb2JhYmx5IHdvcmsgZmluZSBmb3Igc2V0dGluZyBpbm5lckhUTUwuXG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIGNvbnN0IGVzY2FwZXMgPSB7XG4gICAgICAgIFwiPFwiOiBcIiZsdDtcIixcbiAgICAgICAgXCI+XCI6IFwiJmd0O1wiLFxuICAgICAgICBcIiZcIjogXCImYW1wO1wiLFxuICAgICAgICBcIi9cIjogXCImI3gyRjtcIixcbiAgICAgICAgXCI9XCI6IFwiJiN4M0Q7XCIsXG4gICAgICAgICdcIic6IFwiJnF1b3Q7XCIsXG4gICAgICAgIFwiJ1wiOiBcIiYjMzk7XCIsXG4gICAgICAgIFwiYFwiOiBcIiYjeDYwO1wiXG4gICAgfTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvWyY8PlwiJ2A9XFwvXS9nLCBzID0+IGVzY2FwZXNbc10pO1xufVxuZXhwb3J0cy5lc2NhcGVIdG1sID0gZXNjYXBlSHRtbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBHZXQgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUgYXMgYSBEb2N1bWVudEZyYWdtZW50LlxuICovXG5mdW5jdGlvbiBleHRyYWN0Tm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xufVxuZXhwb3J0cy5leHRyYWN0Tm9kZUNvbnRlbnQgPSBleHRyYWN0Tm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGZpbmRJbmRleEluUGFyZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQuY2hpbGRyZW4pLmluZGV4T2YoZWxlbWVudCk7XG4gICAgfVxufVxuZXhwb3J0cy5maW5kSW5kZXhJblBhcmVudCA9IGZpbmRJbmRleEluUGFyZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogSFRNTCBpcyBpbmNvbnNpc3RlbnQuIEdldHRpbmcgdGhlIHZhbHVlIG9mIGZvcm0gZmllbGRzIGlzIGEgYml0IGNvbXBsaWNhdGVkLCBub3QgYWx3YXlzIGVsZW1lbnQudmFsdWUsXG4gKiBzbyBoZXJlJ3MgYSBoZWxwZXIgdG8gbWFrZSBpdCBlYXNpZXIuXG4gKi9cbmZ1bmN0aW9uIGdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpIHtcbiAgICAvLyBJdCB3b3VsZCBiZSByZWFsbHkgbmljZSBhdCB0aGlzIHBvaW50IGlmIEpTIGNvdWxkIHNlZSBnZW5lcmljIHBhcmFtZXRlcnMuXG4gICAgLy8gSWYgaXQgY291bGQsIHRoZW4gdGhlIGNvZGUgY291bGQgc2F5IFwiaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgJiYgVE91dHB1dCAhPT0gYm9vbGVhbikgdGhyb3cgbmV3IEVycm9yKClcIlxuICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDaGVja2JveFZhbHVlKGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldE51bWJlcklucHV0VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgcmV0dXJuIGdldFJhZGlvVmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICByZXR1cm4gZ2V0U2VsZWN0VmFsdWUoZWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Rm9ybUZpZWxkVmFsdWUgPSBnZXRGb3JtRmllbGRWYWx1ZTtcbmZ1bmN0aW9uIGdldENoZWNrYm94VmFsdWUoaW5wdXQpIHtcbiAgICByZXR1cm4gISFpbnB1dC5jaGVja2VkO1xufVxuZXhwb3J0cy5nZXRDaGVja2JveFZhbHVlID0gZ2V0Q2hlY2tib3hWYWx1ZTtcbmZ1bmN0aW9uIGdldE51bWJlcklucHV0VmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihpbnB1dC52YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXROdW1iZXJJbnB1dFZhbHVlID0gZ2V0TnVtYmVySW5wdXRWYWx1ZTtcbmZ1bmN0aW9uIGdldFJhZGlvVmFsdWUoaW5wdXQpIHtcbiAgICAvLyBSYWRpbyBidXR0b25zIGFyZSB3ZWlyZC4gV2Ugd2FudCB0aGVtIHRvIGFwcGVhciB0byBiZSBtb3JlIG5vcm1hbC5cbiAgICBpZiAoaW5wdXQubmFtZSkge1xuICAgICAgICByZXR1cm4gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W25hbWU9XCIke2lucHV0Lm5hbWV9XCJdOmNoZWNrZWRgKSB8fCB7fSkudmFsdWU7XG4gICAgfVxuICAgIC8vIElmIG5vIG5hbWUsIGZhbGwgYmFjayB0byB0aGlzXG4gICAgaWYgKGlucHV0LmNoZWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0UmFkaW9WYWx1ZSA9IGdldFJhZGlvVmFsdWU7XG5mdW5jdGlvbiBnZXRTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICBpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiBnZXRNdWx0aVNlbGVjdFZhbHVlKHNlbGVjdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZWN0LnZhbHVlO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0U2VsZWN0VmFsdWUgPSBnZXRTZWxlY3RWYWx1ZTtcbmZ1bmN0aW9uIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2VsZWN0LnNlbGVjdGVkT3B0aW9ucykuZmlsdGVyKGYgPT4gZi52YWx1ZSkubWFwKG0gPT4gbS52YWx1ZSk7XG59XG5leHBvcnRzLmdldE11bHRpU2VsZWN0VmFsdWUgPSBnZXRNdWx0aVNlbGVjdFZhbHVlO1xuLy8gVGhpcyBpcyBhbG1vc3QgcG9pbnRsZXNzLiBKdXN0IGhlcmUgZm9yIGNvbnNpc3RlbmN5LlxuZnVuY3Rpb24gZ2V0U2ltcGxlRm9ybVZhbHVlKGlucHV0KSB7XG4gICAgaWYgKGlucHV0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgaWYgKGlucHV0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCB2YWxpZCBmb3IgbXVsdGktc2VsZWN0cycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnB1dC52YWx1ZTtcbn1cbmV4cG9ydHMuZ2V0U2ltcGxlRm9ybVZhbHVlID0gZ2V0U2ltcGxlRm9ybVZhbHVlO1xuLyoqXG4gKiBTZXR0aW5nIHZhbHVlcyBpcyBqdXN0IGFzIGNvbXBsaWNhdGVkIGFzIGdldHRpbmcgdGhlbSwgYmVjYXVzZSBIVE1MIGlzIGluY29uc2lzdGVudC4gWW91IGNhbid0IGp1c3Qgc2F5IGVsZW1lbnQudmFsdWUgPSBmb28uXG4gKiBIZXJlJ3MgYSBoZWxwZXIgdG8gbWFrZSBpdCBlYXNpZXIuXG4gKi9cbmZ1bmN0aW9uIHNldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQsIHZhbHVlKSB7XG4gICAgLy8gSGVyZSB5b3UgY2FuIHZhbGlkYXRlIHRoZSB0eXBlIGJlZm9yZSBzZXR0aW5nIG9yIGRvIHNvbWUga2luZCBvZiBjb252ZXJzaW9uLlxuICAgIC8vIEZvciBtdWx0aS1zZWxlY3RzLCBjYW4gYXV0by13cmFwIHZhbHVlIGluIHN0cmluZy5cbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gJyc7XG4gICAgfVxuICAgIGNvbnN0IHN0cmluZ1ZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTsgLy8gdXNlZCBpbiBtb3N0IG9mIHRoZSBjYXNlc1xuICAgIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gdmFsdWUgPT09IHRydWUgfHwgc3RyaW5nVmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBzdHJpbmdWYWx1ZSA9PT0gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB0b0RhdGVTdHJpbmcobmV3IERhdGUoc3RyaW5nVmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZXRpbWUnIHx8IHR5cGUgPT09ICdkYXRldGltZS1sb2NhbCcpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc3RyaW5nVmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gYCR7dG9EYXRlU3RyaW5nKGRhdGUpfVQke3RvVGltZVN0cmluZyhkYXRlKX1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IEFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpO1xuICAgICAgICBpZiAoc2VsZWN0Lm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tPcHRpb24ob3B0aW9ucywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlOyAvLyB0cmVhdGluZyBpdCBsaWtlIGEgbm9uLW11bHRpcGxlIHdvcmtzXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm9uZXhpc3RlbnQgb3B0aW9ucyBjYW5ub3QgYmUgc2V0LiBXZSBzaG91bGQgbGV0IHRoZSBwcm9ncmFtbWVyIGtub3cuIEV2ZW4gdGhvdWdoIHRoaXMgdGFrZXMgQ1BVIGN5Y2xlcy5cbiAgICAgICAgICAgIHZhbHVlLm1hcChtID0+IHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCBtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcHQgb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9wdC5zZWxlY3RlZCA9IHZhbHVlLm1hcChtID0+IG0udG9TdHJpbmcoKSkuaW5kZXhPZihvcHQudmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZWxlY3QudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICBlbGVtZW50LnZhbHVlID0gc3RyaW5nVmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oYENhbGxlZCBzZXRGb3JtRmllbGRWYWx1ZSBvbiBub24tZm9ybSBmaWVsZCAke2VsZW1lbnQudGFnTmFtZX0gJHtlbGVtZW50LmlkIHx8ICcnfWApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja09wdGlvbihvcHRpb25zLCB2YWwpIHtcbiAgICAgICAgLy8gSWYgeW91IHNldCB0aGUgdmFsdWUgb2YgYSBzZWxlY3QgdG8gc29tZXRoaW5nIHRoYXQgaXMgbm90IGFuIGF2YWlsYWJsZSBvcHRpb24sIG5vdGhpbmcgd2lsbCBoYXBwZW4uXG4gICAgICAgIGNvbnN0IGhhc09wdGlvbiA9IG9wdGlvbnMubWFwKG0gPT4gbS52YWx1ZSkuaW5kZXhPZih2YWwudG9TdHJpbmcoKSkgPiAtMTtcbiAgICAgICAgaWYgKCFoYXNPcHRpb24pIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENhbGxlZCBzZXRGb3JtRmllbGRWYWx1ZSB3aXRoIG5vbmV4aXN0ZW50IG9wdGlvbiAke3ZhbC50b1N0cmluZygpfSBvbiBzZWxlY3QgJHtlbGVtZW50LmlkfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFRoZXNlIGNvdWxkIGJlIHJlYWRhYmxlIG9uZWxpbmVycyBpZiB3ZSBoYWQgcGFkU3RhcnQoKSBidXQgaXQncyBub3Qgd29ydGggYnVtcGluZyB0byBFUzIwMTcgZm9yIG9uZSBtZXRob2RcbiAgICBmdW5jdGlvbiB0b0RhdGVTdHJpbmcoZGF0ZSkge1xuICAgICAgICBpZiAoIWlzTmFOKGRhdGUudmFsdWVPZigpKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vbnRoID0gKCcwJyArIChkYXRlLmdldFVUQ01vbnRoKCkgKyAxKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgICAgIGNvbnN0IGRheSA9ICgnMCcgKyBkYXRlLmdldFVUQ0RhdGUoKS50b1N0cmluZygpKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHtkYXRlLmdldFVUQ0Z1bGxZZWFyKCl9LSR7bW9udGh9LSR7ZGF5fWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvVGltZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaG91ciA9ICgnMCcgKyBkYXRlLmdldEhvdXJzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgbWludXRlID0gKCcwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7XG4gICAgICAgIHJldHVybiBgJHtob3VyfToke21pbnV0ZX1gO1xuICAgIH1cbn1cbmV4cG9ydHMuc2V0Rm9ybUZpZWxkVmFsdWUgPSBzZXRGb3JtRmllbGRWYWx1ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBIZXJlJ3MgYSBoZWxwZXIgZm9yIG9uZSBvZiB0aGUgcGxhY2VzIHdoZXJlIEhUTUw1IGZhbGxzIG92ZXIuIElmIHlvdSBnZXQgc29tZSBodG1sIGxpa2UgPGRpdiBpZD1cIjFcIj48L2Rpdj48ZGl2IGlkPVwiMlwiPjwvZGl2PiwgaXQgYmVjb21lc1xuICogYSBOb2RlTGlzdC4gSFRNTDUgYnkgZGVmYXVsdCBkb2VzIG5vdCBwcm92aWRlIGEgd2F5IHRvIHNlYXJjaCB0aGlzIGZvciBhIHNlbGVjdG9yLlxuICovXG5mdW5jdGlvbiBub2RlTGlzdFNlbGVjdG9yKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmIChzZWFyY2gpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2g7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3IgPSBub2RlTGlzdFNlbGVjdG9yO1xuLyoqXG4gKiBIZXJlJ3MgYSBoZWxwZXIgZm9yIG9uZSBvZiB0aGUgcGxhY2VzIHdoZXJlIEhUTUw1IGZhbGxzIG92ZXIuIElmIHlvdSBnZXQgc29tZSBodG1sIGxpa2UgPGRpdiBpZD1cIjFcIj48L2Rpdj48ZGl2IGlkPVwiMlwiPjwvZGl2PiwgaXQgYmVjb21lc1xuICogYSBOb2RlTGlzdC4gSFRNTDUgYnkgZGVmYXVsdCBkb2VzIG5vdCBwcm92aWRlIGEgd2F5IHRvIHNlYXJjaCB0aGlzIGZvciBhIHNlbGVjdG9yLlxuICovXG5mdW5jdGlvbiBub2RlTGlzdFNlbGVjdG9yQWxsKG5vZGVzLCBzZWxlY3Rvcikge1xuICAgIC8vIEJlY2F1c2UgdGhlIGJyb3dzZXIgY2FuIGxvc2UgcmVmZXJlbmNlcyB3aGVuIG1vdmluZyBub2RlcywgdGhpcyBjYW4gYWxzbyB0YWtlIGEgcmVndWxhciBhcnJheS5cbiAgICAvLyBCZWNhdXNlIEhUTUw1IGhhcyB0b3RhbGx5IGZhbGxlbiBvdmVyLCBpdCdzIG5vdCBwb3NzaWJsZSBmb3IgdGhlIGZpeGVkIG5vZGVMaXN0U2VsZWN0b3JBbGxcbiAgICAvLyB0byBtYXRjaCB0aGUgb3V0cHV0IHNpZ25hdHVyZSBvZiBxdWVyeVNlbGVjdG9yQWxsIChOb2RlTGlzdE9mPEVsZW1lbnQ+IGluc3RlYWQgb2YgYXJyYXkpLlxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKCEoJ21hdGNoZXMnIGluIG5vZGUpKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IHRleHQgbm9kZXNcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLkFycmF5LmZyb20oc2VhcmNoKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5ub2RlTGlzdFNlbGVjdG9yQWxsID0gbm9kZUxpc3RTZWxlY3RvckFsbDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJZiB0aGUgZG9jdW1lbnQgY29udGFpbnMgYW55IGR1cGxpY2F0ZSBJRHMsIHRocm93IGFuIGV4Y2VwdGlvbi5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVVbmlxdWVEb21JZHMoKSB7XG4gICAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGZvbyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcqW2lkXScpKSB7XG4gICAgICAgIGlkcy5hZGQoZm9vLmlkKTtcbiAgICAgICAgaSsrO1xuICAgICAgICBpZiAoaWRzLnNpemUgIT09IGkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIERPTSBJRHMgZm91bmQuIFRoZSBmaXJzdCBkdXBsaWNhdGUgaWQgaXMgJHtmb299LmApO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZVVuaXF1ZURvbUlkcyA9IHZhbGlkYXRlVW5pcXVlRG9tSWRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IEV4dHJhY3ROb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXh0cmFjdE5vZGVDb250ZW50XCIpO1xuY29uc3QgRm9ybUZpZWxkVmFsdWVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0Zvcm1GaWVsZFZhbHVlXCIpO1xuY29uc3QgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuLyoqXG4gKiBBIHN1cGVyLWJhc2ljIGNvbXBvbmVudCB0aGF0IGFsbG93cyBjb25maWd1cmF0aW9uIG9mIGRhdGEtYmluZGluZyBmdW5jdGlvbnMgdXNpbmcgc3BlY2lhbGx5LW5hbWVkIEhUTUwgYXR0cmlidXRlcywgYXMgaW4gQW5ndWxhclxuICogb3IgVnVlLlxuICovXG5jbGFzcyBCb3VuZENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudF8xLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld01vZGVsLCBhcmdzKSB7XG4gICAgICAgIHN1cGVyKGFyZ3MpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncyA9IFtdO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMgPSBbXTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcyA9IFtdO1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5fYXN5bmMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB2aWV3TW9kZWw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2ktdicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaS12JywgVGVtcGxhdGVSZXBsYWNlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgICAgICB0aGlzLl9hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmVyID0gb3B0aW9ucy5kZWZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgLy8gRGVmaW5lZCB0aGUgZGVmYXVsdCBjb21wb25lbnQgY2xhc3MgZm9yIHRoZSBkZWZhdWx0IGxvb3BQb3N0UHJvY2VzcygpIG1ldGhvZFxuICAgICAgICBpZiAob3B0aW9ucy5sb29wSXRlbUNsYXNzKSB7XG4gICAgICAgICAgICBpZiAoIUNvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb29wSXRlbUNsYXNzIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShvcHRpb25zLmxvb3BJdGVtQ2xhc3MgaW5zdGFuY2VvZiBCb3VuZENvbXBvbmVudC5jb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGFuIGJvdW5kIGNvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MgPSBvcHRpb25zLmxvb3BJdGVtQ2xhc3MgfHwgQm91bmRDb21wb25lbnQ7XG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZUNvbXBvbmVudEJpbmRpbmdzKCk7XG4gICAgICAgIHRoaXMuc2V0VGVtcGxhdGUodGhpcy5jb250ZW50LmlubmVySFRNTCk7IC8vIElubmVySFRNTCBpcyBjdXJyZW50bHkgb25seSBwYXJzZWQgYW5kIHRoZW4gdGhlIG9yaWdpbmFsIHRleHQgaXMgdGhyb3duIGF3YXkuXG4gICAgICAgIC8vIEF1dG8tYWRkIHN1YnNjcmlwdGlvbnMgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMub2JzZXJ2ZVZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGd0IG9mIG9wdGlvbnMub2JzZXJ2ZVRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmUodGd0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlQWxsVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZUFsbCh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hc3luYykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbmRlcigpLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29uc3RydWN0b3IgaW5pdGlhbGl6YXRpb24gaXMgZG9uZS5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIGNvbXBvbmVudHMuIEl0J3MgbW9zdCB1c2VmdWwgZm9yIGN1c3RvbSB0YWdzLCBmb3IgZXhhbXBsZSwgPG15LWNvbXBvbmVudD48L215LWNvbXBvbmVudD4uXG4gICAgICogSXQgd2lsbCBiZWNvbWUgPGRpdiBpZD1cImZvb1wiPldoYXRldmVyIHRoZSBjb21wb25lbnQgY29udGVudCBpczwvZGl2Pi5cbiAgICAgKiBUbyByZXBsYWNlIHRoZSBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogSW4gYWxtb3N0IGV2ZXJ5IGNhc2UsIHZpZXdNb2RlbCBzaG91bGQgYmUgc2V0LiBCdXQgaXQncyBub3QgcG9zc2libGUgdG8gY2hhbmdlIHRoYXQgYW5kIHN0aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGUgYmFzZVxuICAgICAqIGNsYXNzIGluamVjdCgpLiBUaGlzIGlzIGEgdHlwZXNjcmlwdC1vbmx5IGlzc3VlIGJ1dCBpdCBtYWtlcyB0aGluZ3MgdWdseS5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuIEFuZCBwcmFjdGljYWxseSBkZW1hbmRzIHRoZWlyIHVzZSB0byBzZXQgdmlld01vZGVsLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKSB7XG4gICAgICAgICh7IHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yID0gY29uc3RydWN0b3IgfHwgdGhpcztcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fZ2V0T3B0aW9ucyhvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgY29uc3QgcmVwbGFjZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUVsZW1lbnRXaXRoQm91bmRDb21wb25lbnQoZWxlbWVudCwgdmlld01vZGVsLCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Cb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbCB0byBpbmplY3QoKSB3aXRoIGEgY2xlYW5lciBhcmd1bWVudCBvcmRlci5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0QmluZCh2aWV3TW9kZWwsIHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0KHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsKTtcbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChleGlzdGluZ0VsZW1lbnQsIHZpZXdNb2RlbCwgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgY29uc3Qgb3B0ID0gdGhpcy5fbWVyZ2VQcm9wZXJ0aWVzQW5kQXR0cmlidXRlcyhleGlzdGluZ0VsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgICAgICB0aGlzLl9yZXBsYWNlRWxlbWVudChleGlzdGluZ0VsZW1lbnQsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIHN0YXRpYyBfY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAvLyBXQVJOOiBUaGlzIGNhc3QgbWF5IG5vdCBiZSB0cnVlLiBUaGVyZSdzIG5vIHdheSB0byBjaGVjayB0aGF0IHRoZSB0YWdzIG1hdGNoLlxuICAgICAgICBjb25zdCBvcHQgPSBPYmplY3QuYXNzaWduKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0sIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHZpZXdNb2RlbCwgb3B0KTtcbiAgICB9XG4gICAgd3JpdGUoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBldnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBGb3JtRmllbGRWYWx1ZV8xLmdldEZvcm1GaWVsZFZhbHVlKGVsZW1lbnQpO1xuICAgICAgICAvLyBUaGVyZSBhcmUgdHdvIGNhc2VzIHdoZXJlIHZhbHVlIGlzIHVuZGVmaW5lZC4gRWl0aGVyIHRoZSBlbGVtZW50IGlzIG5vdCBhIGZvcm0gZWxlbWVudCBvciBpdCdzIGFuIHVubmFtZWQgcmFkaW8gYnV0dG9uXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IHNlbGVjdGVkLiBJbiBib3RoIGNhc2VzLCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZSB0aGUgbW9kZWwgd2l0aCB1bmRlZmluZWQsIHdoaWNoIGlzIHVzZWxlc3MuXG4gICAgICAgIC8vIFRPRE86IElzIHRoaXMganVzdGlmaWNhdGlvbiB2YWxpZD9cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBXQVJOOiBDYW5ub3QgdHlwZSBjaGVjayB0aGlzIGR5bmFtaWNhbGx5LiBUeXBlU2NyaXB0IGlzIGJ1aWxkLXRpbWUgY2hlY2tpbmcgb25seS4gUnVudGltZSBjb2RlIGNhbid0IGV2ZW4gc2VlIHRoZSB0eXBlLlxuICAgICAgICAvLyBJZiB5b3Ugd2FudCB0byBiZSBwcmVjaXNlLCBhbGwgcHJvcGVydGllcyBpbiBfd3JpdGVCaW5kaW5ncyBzaG91bGQgYmUgRm9ybUl0ZW1WYWx1ZSwgYnV0IGFzIF93cml0ZUJpbmRpbmdzIGlzIHBvcHVsYXRlZFxuICAgICAgICAvLyB2aWEgc3RyaW5nLCB0aGVyZSdzIG5vIHdheSB0byBlbmZvcmNlIHRoYXQuIFNvIGlmIHlvdSBmaWxsIGEgc3RyaW5nIHZhbHVlIGZyb20gYSBtdWx0aXBsZSBzZWxlY3QsIGl0J2xsIHByb2R1Y2UgYnVncy5cbiAgICAgICAgLy8gU28gYmUgY2FyZWZ1bC4gSXQncyBvbiB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYmluZCBvZiB0aGlzLl93cml0ZVRhcmdldHMpIHtcbiAgICAgICAgICAgIGlmIChiaW5kLnN0YXJ0c1dpdGgoJ3RoaXMuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzW2JpbmRdO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzW2JpbmRdID0gdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYmluZCA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlIHZpZXcgbW9kZWwgaXMgZWl0aGVyIEZvcm1GaWVsZFZhbHVlIG9yIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBvbmUuXG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGhpcy52aWV3TW9kZWwsICgpID0+IHRoaXMudmlld01vZGVsID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdGhpcy52aWV3TW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXMudmlld01vZGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaXRoIG9ic2VydmFibGUgc3RhdGUsIHdlIG5lZWQgdG8gZ2V0IHRoZSBzdGF0ZSwgdXBkYXRlIGl0LCBhbmQgd3JpdGUgdGhlIHdob2xlIHRoaW5nIGJhY2suXG4gICAgICAgICAgICAgICAgICAgIC8vIFdoaWxlIGl0IGlzIHBvc3NpYmxlIHRvIHVwZGF0ZSBhIHNpbmdsZSBwcm9wZXJ0eSBpbiBzb21lIGNhc2VzLCBpdCBkb2Vzbid0IGFsbG93IHJldXNlIG9mIGFscmVhZHktd29ya2luZyBjb2RlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZpZXdNb2RlbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdG1wW2JpbmRdO1xuICAgICAgICAgICAgICAgICAgICB3cml0ZVZhbHVlKHRhcmdldCwgKCkgPT4gdG1wW2JpbmRdID0gdmFsdWUsIHRtcCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdG1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy52aWV3TW9kZWxbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0aGlzLnZpZXdNb2RlbFtiaW5kXSA9IHZhbHVlLCB0aGlzLnZpZXdNb2RlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHdyaXRlVmFsdWUodGFyZ2V0LCB3cml0ZVRvUHJvcGVydHksIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBhIGZ1bmN0aW9uIHRvIGJlIGZsZXhpYmxlLCBiZWNhdXNlIGlmIHRhcmdldCBpcyBhIHZhbHVlIHR5cGUgb3IgaW1tdXRhYmxlLCB3cml0aW5nXG4gICAgICAgICAgICAvLyBpdCBkaXJlY3RseSByZXBsYWNlcyBvbmx5IHRoZSB2YWx1ZSB3aXRob3V0IHVwZGF0aW5nIHRoZSBtb2RlbC5cbiAgICAgICAgICAgIHdyaXRlVG9Qcm9wZXJ0eSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byB0aGUgbW9kZWwgcGFzc2VkIGluLCBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi5cbiAgICAgKi9cbiAgICBvYnNlcnZlKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmIChJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhtb2RlbCkpIHtcbiAgICAgICAgICAgIG1vZGVsLnN1YnNjcmliZSh0aGlzLnJlbmRlciwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEJpbmQgdGhpcy5yZW5kZXIoKSB0byBhbGwgb2JzZXJ2YWJsZSBwcm9wZXJ0aWVzIGZvdW5kIGluIHRoZSBtb2RlbCBwYXNzZWQgaW4sXG4gICAgICogb3IgdGhlIHZpZXcgbW9kZWwgaWYgbm9uZSBwYXNzZWQgaW4uIFRoaXMgb25seSBnb2VzIG9uZSBsZXZlbCBkZWVwLCBzbyBpdFxuICAgICAqIHdvbid0IHBpY2sgdXAgbmVzdGVkIG9iamVjdHMsIGJ1dCBpdCdzIHByb2JhYmx5IGdvb2QgZW5vdWdoIGluIDYwJSBvZiBjYXNlcy5cbiAgICAgKi9cbiAgICBvYnNlcnZlQWxsKG1vZGVsKSB7XG4gICAgICAgIG1vZGVsID0gbW9kZWwgfHwgdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbCk7XG4gICAgICAgIGZvciAoY29uc3QgbSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtb2RlbCkpIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZShtb2RlbFttXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgLy8gU2VlIGlmIHdlIG5lZWQgdG8gZGVmZXIgcmVuZGVyaW5nIHVudGlsIGFmdGVyIGluaXRpYWxpemF0aW9uXG4gICAgICAgIGlmICh0aGlzLl9kZWZlciAmJiAhdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYm9vbCkge1xuICAgICAgICAgICAgICAgIC8vIEZvciBib29sZWFuIGF0dHJpYnV0ZXMsIHRoZSB2ZXJ5IGV4aXN0ZW5jZSBvZiB0aGUgYXR0cmlidXRlIG1lYW5zIGl0IGlzIGNvbnNpZGVyZWQgdG8gYmUgdHJ1ZS5cbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gISF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyaWJ1dGUsIHRoaXMuX2dldFN0cmluZ1ZhbHVlKGl0ZW0uc291cmNlKSB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAvLyBDYWxscyBzZXRGb3JtRmllbGRWYWx1ZSBiZWhpbmQgdGhlIHNjZW5lcy5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fdmFsdWVBdHRyaWJ1dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NDbGFzc2VzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzQ2xhc3NlcykgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMpIHtcbiAgICAgICAgICAgIC8vIElmIHRydXRoeSwgYWRkIGNsYXNzLCBlbHNlIGRlbGV0ZSBpdC5cbiAgICAgICAgICAgIGxldCB2YWwgPSAhIXRoaXMuX2dldFVudHlwZWRWYWx1ZShpdGVtLnNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaXRlbS5uZWdhdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTGlzdC5hZGQoaXRlbS5jbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHRoaXMuX2Nzc1N0eWxlKSB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5jc3NUZXh0ID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCAmJiAhdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW52YWxpZCBzdHlsZSB0ZXh0IGluIGNvbXBvbmVudDogJHt2YWx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZXJhYmxlID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2xvb3Auc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVyYWJsZSAmJiB0eXBlb2YgaXRlcmFibGVbU3ltYm9sLml0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZpb3VzQ29udGVudCA9IEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGl0ZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLl9sb29wLmZyYWdtZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXMgc29vbiBhcyB3ZSBhZGQgdGhlIGNsb25lIHRvIGNvbnRlbnQsIGNoaWxkTm9kZXMgbG9zZXMgcmVmZXJlbmNlIHRvIGl0cyBjaGlsZCBub2Rlcywgc28gY29weSBpdC5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKGNsb25lLmNoaWxkTm9kZXMpLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb29wLnBvc3RQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb3BQb3N0UHJvY2Vzcyhyb3csIG5vZGVzLCBpdGVyYWJsZSwgcHJldmlvdXNDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3NzRGlzcGxheSkge1xuICAgICAgICAgICAgLy8gSWYgZmFsc3ksIHNldCBkaXNwbGF5OiBub25lIChzYXZpbmcgcHJldmlvdXMgdmFsdWUpLiBJZiB0cnV0aHksIHJlc3RvcmUgcHJldmlvdXMgdmFsdWUgKGlmIGJsb2NrLCBmbGV4LCBidXQgbm90IGlmIG5vbmUpXG4gICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5fZ2V0VW50eXBlZFZhbHVlKHRoaXMuX2Nzc0Rpc3BsYXkuc291cmNlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5Lm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCB0aGlzLl9wcmV2aW91c0Nzc0Rpc3BsYXlTZXR0aW5nIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgPSB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGVtcGxhdGUodGVtcGxhdGVUZXh0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRlbXBsYXRlVGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgZXhlY3V0ZWQgaW4gdGhlIGNvbnN0cnVjdG9yLiBUaGUgdXBkYXRlIHBhcmFtIHNob3VsZCBub3QgYmUgc2V0LlxuICAgICAgICBpZiAodXBkYXRlICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVcGRhdGUgc2hvdWxkIG5vdCBiZSB0cnVlIHdoZW4gY2FsbGVkIGludGVybmFsbHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2Ugd2UncmUgY3JlYXRpbmcgYW4gZWxlbWVudCB0aGF0J3Mgbm90IG9uIHRoZSBwYWdlLCB3ZSBwcm9iYWJseSBjb3VsZCBhdm9pZCB1c2luZyBhIGZyYWdtZW50LFxuICAgICAgICAvLyBidXQgdGhpcyBpcyB3aGF0IGZyYWdtZW50cyBhcmUgZm9yLlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFRlbXBsYXRlRWxlbWVudCk7XG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRlbXBsYXRlVGV4dDtcbiAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHVzZWQgdG8gcmVwbGFjZSB0aGUgZXhpc3RpbmcgdGVtcGxhdGUsIHdlIG5lZWQgdG8gd2lwZSBvdXQgdGhlIHByZXZpb3VzIHZhbHVlc1xuICAgICAgICB0aGlzLl9yZXBsYWNlbWVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgLy8gV29ya2luZyBvbiBhIGNsb25lIGhlcmUsIHNvIHdlIGRvbid0IHNlZSB0aGUgYm9keSBiZWluZyBidWlsdCBzdGVwIGJ5IHN0ZXAgaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiBjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpLXYnKSkge1xuICAgICAgICAgICAgLy8gSWYgbmFtZSBpcyBzcGVjaWZpZWQsIGNvbXBvbmVudCBNVVNUIGJlIHNwZWNpZmllZC4gVGhlIHNhbWUgaWYgY29tcG9uZW50IGlzIHNwZWNpZmllZC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9uYW1lICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhlIHNhbWUgaWYgY29tcG9uZW50IGlzIHNwZWNpZmllZC4gUmVxdWlyZXMgcmVwZWF0aW5nIGJlY2F1c2UgdGhpcyBwYXJ0IGJyZWFrcyB3aGVuIG1pbmlmaWVkXG4gICAgICAgICAgICBpZiAocmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm9lc2NhcGUgPSByZXBsLmhhc0F0dHJpYnV0ZSgnbm9lc2NhcGUnKSAmJiByZXBsLmdldEF0dHJpYnV0ZSgnbm9lc2NhcGUnKSAhPT0gJ2ZhbHNlJztcbiAgICAgICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiByZXBsLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogcmVwbC5pbm5lckhUTUwsXG4gICAgICAgICAgICAgICAgbm9lc2NhcGU6IG5vZXNjYXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIHdpbGwgbGVhZCB0byBhIEZPVUMsIG1heWJlIG1pbGxpc2Vjb25kcywgbWF5YmUgbG9uZ2VyLlxuICAgICAgICBpZiAoIXRoaXMuX2RlZmVyIHx8IHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSBjb21wbGV0ZWQgdmFsdWVzIGJlZm9yZSBhZGRpbmcgdG8gdGhlIHZpc2libGUgcGFnZS4gVGhpcyBpcyBzbGlnaHRseSByZWR1bmRhbnQsIGJlY2F1c2UgdGhpcyBoYXBwZW5zIGluIHRoZSByZW5kZXIoKVxuICAgICAgICAgICAgLy8gc3RlcCwgYnV0IEkgaGF0ZSBpdCB3aGVuIEkgc2VlIGEgZmxhc2ggb2YgdW5yZXBsYWNlZCBjb250ZW50IG9uIHNpdGVzLlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiB0aGlzIHdvcmtzIGlzIGJlY2F1c2UgX3JlcGxhY2VtZW50cyByZWZlcmVuY2VzIGNsb25lLCB3aGljaCBpc24ndCB2aXNpYmxlIHVudGlsIGFsbW9zdCB0aGUgbGFzdCBsaW5lLlxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSHRtbFJlcGxhY2VtZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgLy8gRG8gYSBmdWxsIHVwZGF0ZSBpZiByZXF1ZXN0ZWQgdG9cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SHRtbFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12IG5vZXNjYXBlPicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldFRleHRUZW1wbGF0ZSh0ZW1wbGF0ZVByb3BlcnR5ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRUZW1wbGF0ZSgnPGktdj4nICsgdGVtcGxhdGVQcm9wZXJ0eSArICc8L2ktdj4nLCB1cGRhdGUpO1xuICAgIH1cbiAgICBzZXRMb29wKHNvdXJjZSA9ICcuJywgZnJhZ21lbnQsIHNraXBQb3N0UHJvY2VzcyA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZnJhZ21lbnQgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvb3AgPSB7IHNvdXJjZSwgcG9zdFByb2Nlc3M6ICFza2lwUG9zdFByb2Nlc3MsIGZyYWdtZW50IH07XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUxvb3AodXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmFsdWVBdHRyaWJ1dGUoc291cmNlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl92YWx1ZUF0dHJpYnV0ZSA9IHNvdXJjZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VmlzaWJpbGl0eShzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY3NzRGlzcGxheSA9IHsgc291cmNlLCBuZWdhdGl2ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiBmYWxzZSwgbmVnYXRpdmU6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEJvb2xlYW5BdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgc291cmNlID0gJy4nLCBuZWdhdGl2ZSA9IGZhbHNlLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXNvdXJjZSB8fCAhYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5maW5kKGYgPT4gZi5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goeyBhdHRyaWJ1dGUsIHNvdXJjZSwgYm9vbDogdHJ1ZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbHRlcihmID0+IGYuYXR0cmlidXRlICE9PSBhdHRyaWJ1dGUpO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Q3NzQ2xhc3MoY2xzID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jc3NDbGFzc2VzID0gY2xzO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NTdHlsZShzdHlsZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fY3NzU3R5bGUgPSBzdHlsZTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ3NzQ2xhc3NTd2l0Y2goY2xzLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghY2xzIHx8ICFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmluZChmID0+IGYuY2xhc3MgPT09IGNscykpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMucHVzaCh7IGNsYXNzOiBjbHMsIHNvdXJjZSwgbmVnYXRpdmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ3NzQ2xhc3NTd2l0Y2goY2xzLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIWNscykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLmZpbHRlcihmID0+IGYuY2xhc3MgIT09IGNscyk7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVFdmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy53cml0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFdyaXRlVGFyZ2V0KHRhcmdldCA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fd3JpdGVUYXJnZXRzLmZpbmQoZiA9PiBmID09PSB0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZVdyaXRlVGFyZ2V0KHRhcmdldCwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fd3JpdGVUYXJnZXRzLmZpbHRlcihmID0+IGYgIT09IHRhcmdldCk7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl93cml0ZVRhcmdldHMucHVzaCguLi5maWx0ZXJlZCk7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHVuYmluZCBhIHZpZXcgZnJvbSBhbiBvYnNlcnZhYmxlLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmIChDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAuY29tcG9uZW50cykge1xuICAgICAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBpZiB5b3UgbmVlZCB0byBkbyBzb21ldGhpbmcgZWxzZSBhZnRlciB0aGUgbG9vcCBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICAgICAqL1xuICAgIGxvb3BQb3N0UHJvY2Vzcyhyb3csIGFkZGVkQ29udGVudCwgYWxsUm93cywgcHJldmlvdXNDb250ZW50KSB7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlc2NyaXB0IHBhcnQgb2YgdGhlIGZvbGxvd2luZyB3ZXJlIGltcG9ydGFudCwgdGhpcyB3b3VsZCBiZSBhIHByb2JsZW1cbiAgICAgICAgLy8gaWYgdGhpcyB3ZXJlIGEgZGVyaXZlZCBjbGFzcy5cbiAgICAgICAgY29uc3QgdGhpc2NsYXNzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbG9vcEl0ZW1DbGFzcy5pbmplY3QoUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChhZGRlZENvbnRlbnQsICdbaTVfaXRlbV0sIFtcXFxcMDAwMDNBaXRlbV0sIFtkYXRhLWk1X2l0ZW1dJyksIHtcbiAgICAgICAgICAgIHJlcGxhY2U6IGZhbHNlLFxuICAgICAgICAgICAgcGFyZW50OiB0aGlzLFxuICAgICAgICAgICAgYXN5bmM6IHRoaXMuX2FzeW5jXG4gICAgICAgIH0sIEtleXdvcmRBcmd1bWVudHNfMS5rdygndmlld01vZGVsJywgcm93KSk7XG4gICAgfVxuICAgIF9nZXRTdHJpbmdWYWx1ZShuYW1lLCBza2lwRXNjYXBlID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUobmFtZSk7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNraXBFc2NhcGUgPyB2YWx1ZS50b1N0cmluZygpIDogRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFVudHlwZWRWYWx1ZShuYW1lKSB7XG4gICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgIC8vIEknbSBwcmV0dHkgc3VyZSB0aGlzIGlzIGJlaW5nIHZhbGlkYXRlZCBkdXJpbmcgY29uc3RydWN0aW9uIGJ1dCBiZSBzYWZlXG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0aGlzQXJnID0gdGhpcy52aWV3TW9kZWw7XG4gICAgICAgIC8vIElmIFZNIGlzIGEgc3RhdGUsIGdldCB0aGUgY3VycmVudCBzdGF0ZSB2YWx1ZS5cbiAgICAgICAgaWYgKE9ic2VydmFibGVTdGF0ZV8xLm9ic2VydmFibGVTdGF0ZUNoZWNrKHRoaXNBcmcpKSB7XG4gICAgICAgICAgICB0aGlzQXJnID0gdGhpc0FyZy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKFwidGhpcy5cIikpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzO1xuICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoNSk7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHRoaXMuJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3LmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJy4nKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSB0aGlzQXJnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzQXJnKSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGB0aGlzLiR7bmFtZX0gZG9lcyBub3QgZXhpc3Qgb24gdmlld01vZGVsLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmdbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ09OU0lERVI6IENvbnNpZGVyIGFkZGluZyBjdXN0b20gYXR0cmlidXRlcyB0byBhbGxvdyBleGVjdXRpbmcgbWV0aG9kIHdpdGggc3RyaW5nIHBhcmFtZXRlcnMuIGk1X3BhcmFtMDE9XCJ2YWwgMVwiLCBpNV9wYXJhbTAyPVwidmFsIDJcIlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5jYWxsKHRoaXNBcmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNvdXJjZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJlcGwgb2YgdGhpcy5fcmVwbGFjZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2dldFN0cmluZ1ZhbHVlKHJlcGwuc291cmNlLCByZXBsLm5vZXNjYXBlKSB8fCAnJztcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZXBsLmVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBlbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRlbnQuYXR0cmlidXRlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLnZhbHVlIHx8IGYubmFtZSA9PT0gJ2k1X2lucHV0JyB8fCBmLm5hbWUgPT09ICc6aW5wdXQnKVxuICAgICAgICAgICAgLm1hcChtID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBtLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbS52YWx1ZSB8fCAnJ1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFRlY2huaWNhbGx5IGl0J3MgaW52YWxpZCB0byBhZGQgY3VzdG9tIGF0dHJpYnV0ZXMgdG8gcmVndWxhciBlbGVtZW50cywgc28gdGVjaG5pY2FsbHkgPHJlcGxhY2UtbWUgOnN3aXRjaDpyZWR0ZXh0PVwid2FybmluZ1wiPlxuICAgICAgICAvLyBpcyBsZWdhbCBidXQgaWYgaWYgaXQgd2VyZSBhIGRpdiwgdGhhdCB3b3VsZCBiZSBpbGxlZ2FsLiBTbyB3ZSdsbCBhbGxvdyA8ZGl2IGRhdGEtaTVfc3dpdGNoX3JlZHRleHQ9XCJ3YXJuaW5nXCI+LlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhlIHdlaXJkIG5hbWUgaGFuZGxpbmcgb2YgZGF0YSBhdHRyaWJ1dGVzIGNvdWxkIGJyZWFrIHlvdXIgY29kZSBpZiB5b3UgdHJ5IHRvIHVzZSB0aGlzLiBZb3UgbWF5IG5lZWQgdG8gZG8gZXh0cmFcbiAgICAgICAgLy8gd29yayB0byBtYWtlIHlvdXIgY29kZSB3b3JrLCBhbGwgaW4gdGhlIG5hbWUgb2Ygc3RyaWN0IGFkaGVyZW5jZSB0byBzdGFuZGFyZHMuIEl0J3MgdXAgdG8geW91LlxuICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5jb250ZW50LmRhdGFzZXQpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGVudC5kYXRhc2V0W2F0dHJdO1xuICAgICAgICAgICAgaWYgKHZhbHVlIHx8IGF0dHIgPT09ICdpNV9pbnB1dCcpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QXR0cmlidXRlcy5wdXNoKHsgbmFtZTogYXR0ciwgdmFsdWU6IHZhbHVlIHx8ICcnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0SHRtbFNldCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgY3VycmVudEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9wYXJzZUF0dHJpYnV0ZU5hbWUocHJvcC5uYW1lKTtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gUmVndWxhciBhdHRyaWJ1dGVzIHdpbGwgYWxsIG1hdGNoIHRoaXMuXG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHRoaXMuX25hbWUgfHwgcHJvcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQm9vbGVhbkF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYXR0clwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdHRyaWJ1dGVNYXBwaW5nKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcInN3aXRjaENsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENzc0NsYXNzU3dpdGNoKHR5cGUuZGV0YWlsLCBwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRleHRcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXY+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0SHRtbFNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3Qgc2V0IGk1X3RleHQgYW5kIGk1X2h0bWwgYXQgc2FtZSB0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRleHRIdG1sU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGA8aS12IG5vZXNjYXBlPiR7cHJvcC52YWx1ZX08L2ktdj5gOyAvLyBVc2UgdGhpcyBhcyB0aGUgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUF0dHJpYnV0ZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZOZWdhdGl2ZVwiOlxuICAgICAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eShwcm9wLnZhbHVlLCBuZWdhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzU3R5bGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3NzQ2xhc3MocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBmYWxsIHRocm91Z2gsIHVzaW5nIHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgYXR0cmlidXRlIGFzIGEgdGFyZ2V0IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBcInRhcmdldFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFdyaXRlVGFyZ2V0KHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIEdyYWIgdGhlIGJhc2UgY29udGVudCBmb3IgdGhlIGxvb3AsIHB1bGxpbmcgaXQgb3V0IG9mIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9vcChwcm9wLnZhbHVlLCBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQodGhpcy5jb250ZW50KSwgdHlwZS5kZXRhaWwgPT09ICdudWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSB1c2VkIGFzIGEgc2VsZWN0b3IuIEhhcyBubyBmdW5jdGlvbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBJbXBsZW1lbnRlZCBJY2hpZ28gYXR0cmlidXRlOiBcIiArIHR5cGUudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZlcklmTmVlZGVkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmVyID0gdGhpcy5fZGVmZXIgfHwgcHJvcC52YWx1ZS5zdGFydHNXaXRoKCd0aGlzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJzZUF0dHJpYnV0ZU5hbWUobmFtZSkge1xuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICAgIC8vIEdlbmVyYWwgaWNoaWdvIHNob3J0Y3V0XG4gICAgICAgICAgICBuYW1lID0gJ2k1XycgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdpNV9pdGVtJykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIGluZGljYXRlIGFuIGl0ZW0gY29tcG9uZW50LCBub3RoaW5nIGVsc2UuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X2V2ZW50Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB1c2VkIG9ubHkgaW4gQ29tcG9uZW50LmFkZElubGluZUV2ZW50TGlzdGVuZXJzKCkuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIW5hbWUuc3RhcnRzV2l0aCgnaTVfJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9hdHRyJykpIHtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGF0dHJpYnV0ZSBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUubGVuZ3RoIDwgOSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmRpbmcgYXR0cmlidXRlIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnYXR0cicsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfYm9vbCcpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lWzddICE9PSAnOicgJiYgbmFtZVs3XSAhPT0gJ18nICYmIG5hbWVbN10gIT09ICctJyAmJiBuYW1lWzddICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZVs3XSA9PT0gJy0nIHx8IG5hbWVbN10gPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgwLCA3KSArIG5hbWUuc2xpY2UoOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2Jvb2xOZWdhdGl2ZScgOiAnYm9vbCcsIGRldGFpbDogbmFtZS5zbGljZSg4KSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfc3dpdGNoJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbOV0gIT09ICc6JyAmJiBuYW1lWzldICE9PSAnXycgJiYgbmFtZVs5XSAhPT0gJy0nICYmIG5hbWVbOV0gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzd2l0Y2ggYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzldID09PSAnLScgfHwgbmFtZVs5XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDkpICsgbmFtZS5zbGljZSgxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCAxMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsYXNzIHN3aXRjaCBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnc3dpdGNoQ2xhc3NOZWdhdGl2ZScgOiAnc3dpdGNoQ2xhc3MnLCBkZXRhaWw6IG5hbWUuc2xpY2UoMTApIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pZicpKSB7XG4gICAgICAgICAgICBsZXQgbmVnYXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChuYW1lLnNsaWNlKC0xKSA9PT0gJy0nIHx8IG5hbWUuc2xpY2UoLTEpID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdpZk5lZ2F0aXZlJyA6ICdpZicgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2xvb3AnKSkge1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdpNV9sb29wOm51bGwnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnLCBkZXRhaWw6ICdudWxsJyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2xvb3AnIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV90YXJnZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICd0YXJnZXQnIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfaW5wdXQnKSkge1xuICAgICAgICAgICAgY29uc3QgdHdvV2F5ID0gbmFtZS5lbmRzV2l0aCgnX3ZhbHVlJykgfHwgbmFtZS5lbmRzV2l0aCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuICh7IHR5cGU6ICdpbnB1dCcsIGRldGFpbDogdHdvV2F5ID8gJzJ3YXknIDogJycgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdHlwZTogbmFtZS5zbGljZSgzKSB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQm91bmRDb21wb25lbnQgPSBCb3VuZENvbXBvbmVudDtcbi8vIFVzZSBhIGN1c3RvbSBlbGVtZW50IHRvIGNyZWF0ZSBhIHJlcGxhY2VtZW50IHRhZyB0aGF0IGlzIG5vdCBsaW1pdGVkLCBhcyBzcGFuIGlzLCB0byBjb250YWluaW5nIG5vIGJsb2NrIGVsZW1lbnRzLlxuLy8gTm8gbG9naWMsIG5vIHNwZWNpYWwgZGlzcGxheSBkZXRhaWxzLlxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuZXhwb3J0cy5UZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUgPSBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuL0NvbXBvbmVudE1hcFwiKTtcbi8qKlxuICogQSBjbGFzcyB3aXRoIGEgY29udGVudCBwcm9wZXJ0eSB0aGF0IHBvaW50cyB0byBzb21ldGhpbmcgb24gdGhlIHBhZ2UsIGFsb25nIHdpdGggc29tZSBvZiBoZWxwZXIgbWV0aG9kcy5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgYXMgYSBiYXNlIGNsYXNzIGZvciBvdGhlciBjbGFzc2VzLCBzbyBpdCdzIG1hcmtlZCBhYnN0cmFjdC4gSXQganVzdCBkb2Vzbid0XG4gKiBtYWtlIHNlbnNlIHRvIG1lIHRvIGNyZWF0ZSBDb21wb25lbnQgd2l0aCBub3RoaW5nIGN1c3RvbWl6ZWQuIEp1c3QgY3JlYXRlIGFuIEhUTUxFbGVtZW50LiBUaGUgaGVscGVycyBhcmVuJ3QgcmVhbGx5XG4gKiB0aGF0IGltcHJlc3NpdmUsIHdoZW4geW91IGNvbnNpZGVyIHRoYXQgdGhlIHRyYWRlb2ZmIGlzIGhhdmluZyB0byByZWZlcmVuY2Ugb2JqLmNvbnRlbnQgdG8gbW9kaWZ5IHRoZSBET00uXG4gKi9cbmNsYXNzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGRvZXNuJ3QgdW5kZXJzdGFuZCB0aGF0IHRoaXMuY29udGVudCBpcyBzZXQgaW4gQUxMIG9mIHRoZSBwcml2YXRlIGN0b3IgZnVuY3Rpb25zLlxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBudWxsO1xuICAgICAgICBpZiAoYXJncyAmJiB0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIF9jdG9yX3N0cmluZy5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3MgJiYgYXJncy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgX2N0b3JfbG9va3VwLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWFyZ3MpIHtcbiAgICAgICAgICAgIF9jdG9yX2VtcHR5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5lbGVtZW50KSB7XG4gICAgICAgICAgICBfY3Rvcl9leGlzdGluZ0VsZW1lbnQuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmdzLm91dGVySHRtbCkge1xuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfY3Rvcl9pbm5lckh0bWwuY2FsbCh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBbmd1bGFyIG1hdGVyaWFsIGRvZXMgc29tZXRoaW5nIGxpa2UgdGhpcy4gSW4gdGhpcyBjYXNlLCB0aGVyZSdzIG5vIGZ1bmN0aW9uYWxpdHkgYmVoaW5kIGl0LCBidXQgaXQgZG9lcyBtYWtlIGl0XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgYSBkZXZlbG9wZXIgdG8gc2VlIHRoYXQgYW4gZWxlbWVudCBpcyBhIGNvbXBvbmVudCBhbmQgd2hhdCB0eXBlIGl0IGlzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc25ha2VfY2FzZSA9ICdpdl8nICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKDEpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKShbYS16XSkvZywgXCIkMSAkMiQzXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9cXEIoPz1bQS1aXXsyLH0pLylcbiAgICAgICAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuam9pbignXycpXG4gICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKHNuYWtlX2Nhc2UsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29tcG9uZW50IGhhcyBzb21lIHdlaXJkIG5hbWUsIG5vIHByb2JsZW0uIFRoaXMgaXMganVzdCBhbiBpbmZvIGZpZWxkIGFueXdheS5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcENvbXBvbmVudCgpO1xuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9lbXB0eSgpIHtcbiAgICAgICAgICAgIC8vIE5vIGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBmaW5lIGFzIGxvbmcgYXMgVEVsZW1lbnQgaXMgRElWLiBObyB3YXkgdG8gdmVyaWZ5IHRoYXQgYXMgaXQncyBhIHR5cGVzY3JpcHQgaWxsdXNpb24uIEpTIGRvZXNuJ3Qgc2VlIHR5cGUgcGFyYW1ldGVycy5cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9sb29rdXAoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgZXhpc3RpbmdFbGVtZW50LlxuICAgICAgICAgICAgLy8gVGhlIG1haW4gcmVhc29uIGl0IGV4aXN0cyBpcyB0aGF0IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIGRvZXNuJ3QgcmV0dXJuIHRoZSBjb3JyZWN0IHR5cGUgKGl0J3Mgbm90IGdlbmVyaWMpLFxuICAgICAgICAgICAgLy8gc28gdHlwZXNjcmlwdCBmcmVha3Mgb3V0IGFuZCB0aGlua3MgaXQgc2hvdWxkIGJlIGEgU1RSSU5HLCBpbiBzcGl0ZSBvZiB0aGUgdHlwZSBkZWZpbml0aW9uIG5vdCBiZWluZyBhbnl0aGluZ1xuICAgICAgICAgICAgLy8gbGlrZSB0aGF0LiBJdCdzIGp1c3QgZWFzaWVyIHRvIHVzZSB0aGlzIHRoYW4gdG8gcmVtZW1iZXIgXCJvaCwgcmlnaHQsIGkgaGF2ZSB0byB1c2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpLCB3aGljaCBpcyBnZW5lcmljXCIuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gKGV4aXN0aW5nRWxlbWVudC5wYXJlbnQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3IoZXhpc3RpbmdFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBzZWxlY3RvciBjb3VsZCBub3QgZmluZCBlbGVtZW50LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgeyBlbGVtZW50IH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2V4aXN0aW5nRWxlbWVudChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGV4aXN0aW5nRWxlbWVudC5lbGVtZW50O1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudCwgZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2lubmVySHRtbChuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBOZXcgZWxlbWVudC4gVXNlciBzcGVjaWZpZXMgdGhlIGlubmVyIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBhbiBlbXB0eSBvYmplY3QgbGlrZSB7fSwgcHJhY3RpY2FsbHkgdGhlIHNhbWUgYXMgY2FsbGluZyBpdCB3aXRoIG5vIGFyZ3NcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0geyBpbm5lckhUTUw6IG5ld0VsZW1lbnQuaW5uZXJIdG1sIHx8ICcnIH07XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudC50eXBlIHx8IEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHByb3BzLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29udGVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9vdXRlckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gVXNlciBzcGVjaWZpZXMgdGhlIGZ1bGwgSFRNTCBmb3IgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgaXQgY2FuJ3QgYmUgdHlwZSBjaGVja2VkLiBKUyBjYW4ndCBzZWUgd2hhdCBURWxlbWVudCBpcy5cbiAgICAgICAgICAgIGNvbnN0IHRtcGRpdiA9IENyZWF0ZUVsZW1lbnRfMS5kaXYobmV3RWxlbWVudC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXBkaXYuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdG1wZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5ld0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShhdHRyLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIG5ld0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTcGVjaWZpZWQgSUQgdGFrZXMgcHJlY2VkZW5jZVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX3N0cmluZyhuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTdHJpbmcgYnkgaXRzZWxmIGlzIGEgc2hvcnRjdXQgZm9yIG91dGVySHRtbFxuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgeyBvdXRlckh0bWw6IG5ld0VsZW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgdG8gY29udmVydCBlbGVtZW50cyB0byBjb21wb25lbnRzLiBJdCdzIG1vc3QgdXNlZnVsIGZvciBjdXN0b20gdGFncywgZm9yIGV4YW1wbGUsIDxteS1jb21wb25lbnQ+PC9teS1jb21wb25lbnQ+LlxuICAgICAqIEl0IHdpbGwgYmVjb21lIDxkaXYgaWQ9XCJmb29cIj5XaGF0ZXZlciB0aGUgY29tcG9uZW50IGNvbnRlbnQgaXM8L2Rpdj4uXG4gICAgICpcbiAgICAgKiBJdCBkb2Vzbid0IGhhdmUgdG8gYmUgYSBjdXN0b20gdGFnLiBJdCBjb3VsZCBiZSBhIGNsYXNzLCBsaWtlIDxwIGNsYXNzPSdiaW5kLXRvLW1vZGVsXCI+IChzZWxlY3Rvcj0nLmJpbmQtdG8tbW9kZWwnKVxuICAgICAqIG9yIDxwIGljaGlnbz4gKHNlbGVjdG9yPSdbaWNoaWdvXScpLlxuICAgICAqXG4gICAgICogVG8gY29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICBjb25zdCBuZXdDb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yIHx8IHRoaXM7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX2dldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VFbGVtZW50V2l0aENvbXBvbmVudChlbGVtZW50LCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZWxlbWVudCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIF9pbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSB0aGlzLl9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiBjb250YWluZXJzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FuJ3QgaGF2ZSBkdXBlIElEcyBiZWluZyBjcmVhdGVkIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBjb250YWluZXJzLiBUaGVyZSBhcmUgMyBwbGFjZXMgd2hlcmUgSUQgY2FuIGJlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmlkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3Byb3BlcnRpZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnByb3BlcnRpZXMuaWQ7IC8vIERPTSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgnYXR0cmlidXRlcycgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0cmlidXRlcy5pZDsgLy8gSFRNTCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVwbGFjZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjb252ZXJ0ZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgc3RhdGljIF9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAvLyBUaGlzIGF0dGVtcHRzIHRvIHByZXNlcnZlIHRoZSBhdHRyaWJ1dGVzIHNldCBvbiB0aGUgcmVwbGFjZWQgZWxlbWVudC4gVGhhdCBvcGVucyBhbiB1Z2x5IGNhbiBvZiB3b3JtcyxcbiAgICAgICAgLy8gYnV0IGl0IHNob3VsZCBtYWtlIHJlcGxhY2VtZW50IGNvbXBvbmVudHMgbW9yZSB1c2VmdWwgYmVjYXVzZSBpdCBhbGxvd3MgdGhlbSB0byB2YXJ5LlxuICAgICAgICAvLyBJdCBkb2VzIG1ha2UgYSBicnV0YWwganVnZ2xpbmcgYWN0OlxuICAgICAgICAvLyBJZiB0aGUgZXhpc3RpbmcgZWxlbWVudCBoYXMgaW5uZXJIVE1MLCB3ZSB3YW50IHRvIHRha2UgaXQuXG4gICAgICAgIC8vIElmIG91dGVySFRNTCBpcyBwcm92aWRlZCwgdGhlIG91dGVySFRNTCdzIGlubmVySFRNTCBzaG91bGQgb3ZlcnJpZGUgdGhlIGV4aXN0aW5nIGVsZW1lbnQncy5cbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGF0dHJpYnV0ZXMsIHdlIHdhbnQgdG8gdGFrZSB0aGVtLlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBhdHRyaWJ1dGVzIHNob3VsZCBvdmVycmlkZSB0aGVtLlxuICAgICAgICAvLyBGb3IgYW55IGF0dHJpYnV0ZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIEZvciBhbnkgcHJvcGVydGllcyBwYXNzZWQgaW4gT1BUSU9OUywgdGhleSBzaG91bGQgb3ZlcnJpZGUgYW55dGhpbmcgdGhhdCBjYW1lIGJlZm9yZS5cbiAgICAgICAgLy8gT25seSB0aGUgbGFzdCAyIGFyZSBoYW5kbGVkIGluIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IuIEFuZCBpZiB3ZSdyZSBub3QgY2FyZWZ1bCwgd2UgY291bGQgYnJlYWsgdGhlbS5cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHsgaW5uZXJIVE1MOiBleGlzdGluZ0VsZW1lbnQuaW5uZXJIVE1MIH07XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20oZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICAvLyBUaGlzIGlzIHVnbHkgYmVjYXVzZSBpdCBoYXBwZW5zIGFnYWluIGluIHRoZSBjb25zdHJ1Y3Rvci4gTm8gb3RoZXIgY2xlYW4gd2F5IHRvIHBhcnNlIHRoZSBlbGVtZW50IGF0dHJpYnV0ZXMsIHRob3VnaC5cbiAgICAgICAgaWYgKG9wdC5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENyZWF0ZUVsZW1lbnRfMS5kaXYob3B0Lm91dGVySHRtbC50cmltKCkpO1xuICAgICAgICAgICAgaWYgKHRtcC5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMSB8fCAhdG1wLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXRlckh0bWwgbXVzdCBjb250YWluIGV4YWN0bHkgb25lIEhUTUxFbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0bXAyID0gdG1wLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gVGhlIG91dGVyIEhUTUwgYXR0cmlidXRlcyBnZXQgcGlja2VkIHVwIGF1dG9tYXRpY2FsbHkgd2hlbiBhZGRlZCB0byB0aGUgRE9NLCBzbyB3ZSByZWFsbHlcbiAgICAgICAgICAgIC8vIGp1c3QgbmVlZCB0byBkaXNjYXJkIHRoZSBtYXRjaGluZyBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzIG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuaW5uZXJIVE1MO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20odG1wMi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1thdHRyLm5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvcHQucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgb3B0LnByb3BlcnRpZXMpO1xuICAgICAgICBvcHQuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgb3B0LmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX2dldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgb3B0O1xuICAgICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciByZXBsYWNpbmcgdGhlIG91dGVyIEhUTUxcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogdHJ1ZSwgb3V0ZXJIdG1sOiBvcHRpb25zIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IGtub3cgdGhhdCBvcHRpb25zICE9PSAnc3RyaW5nJyAoY2FuJ3QgcmVhZCBcImVsc2UgaWZcIiBjbGF1c2UpXG4gICAgICAgICAgICBvcHQgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0ID0geyByZXBsYWNlOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3RvcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBzdGF0aWMgX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0pO1xuICAgIH1cbiAgICBzdGF0aWMgX2xvb2tVcENvbnRhaW5lcnNUb0luamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJJ3ZlIGRvbmUgdGhpcyBteXNlbGYsIHdoaWNoIHJlc3VsdHMgaW4gYSBzaWxlbnQgZmFpbHVyZSBpZiBhY2NpZGVudGFsLlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5qZWN0aW9uIHNlbGVjdG9yIGlzIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnW2ljaGlnb10nO1xuICAgICAgICAvLyBMb29rIHVwIHRoZSBlbGVtZW50cyB0byBlaXRoZXIgcmVwbGFjZSBvciBjb252ZXJ0XG4gICAgICAgIGxldCBjb250YWluZXJzO1xuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IHNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ29iamVjdCcgJiYgJ3NlbGVjdG9yJyBpbiBzZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gc2VsZWN0b3IucGFyZW50IHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3Iuc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBbc2VsZWN0b3JdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJzO1xuICAgIH1cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaWQ7XG4gICAgfVxuICAgIHNldCBpZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGlubmVySFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuICAgIHNldCBpbm5lckhUTUwodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIFdpbGwgcmV0dXJuIHVuZGVmaW5lZCBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICByZXR1cm4gRm9ybUZpZWxkVmFsdWVfMS5nZXRGb3JtRmllbGRWYWx1ZSh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLy8gV2lsbCBsb2cgYSB3YXJuaW5nIGlmIGNvbnRlbnQgaXMgbm90IGEgZm9ybSBmaWVsZCB0eXBlXG4gICAgICAgIEZvcm1GaWVsZFZhbHVlXzEuc2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldCBjbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lO1xuICAgIH1cbiAgICBzZXQgY2xhc3NOYW1lKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc0xpc3Q7XG4gICAgfVxuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5zdHlsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIEhUTUwgZXZlbnQgbGlzdGVuZXIgb24gdGhlIENvbXBvbmVudCBjb250ZW50LiBGbHVlbnQuXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIHRoZSBIVE1MIGZvciBpNV9ldmVudCBvciA6ZXZlbnQgYXR0cmlidXRlcyBhbmQgYWRkIGV2ZW50IGxpc3RlbmVycyBhY2NvcmRpbmcgdG8gaW5saW5lIGN1c3RvbSBhdHRyaWJ1dGVzLlxuICAgICAqIEZpbHRlciBieSBtYXRjaGluZyB0aGUgY29tcG9uZW50RmlsdGVyIGlucHV0IHdpdGggYW4gYXR0cmlidXRlIGxpa2UgY29tcG9uZW50PVwiY29tcG9uZW50RmlsdGVyXCIuXG4gICAgICogRW5jbG9zZSB0aGUgZXZlbnQgdHlwZSBpbiBwYXJlbnRoZXNlcywgYW5kIGZvciB0aGUgdmFsdWUsIGVudGVyIHRoZSBuYW1lIG9mIGEgbWV0aG9kIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAqIEV4YW1wbGU6IDxmb3JtIDpldmVudCAoY2xpY2spPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKiBUaGlzIGlzIGFsc28gYWxsb3dlZDogPGZvcm0gOmV2ZW50IF9jbGlja189XCJzdWJtaXRUaGVGb3JtXCI+PC9mb3JtPlxuICAgICAqL1xuICAgIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHdlIGNvdWxkIHNraXAgdGhpcyBpbml0aWFsIGZpbHRlciwgbGlrZSBhbmd1bGFyIGRvZXMuIEJ1dCB0aGVyZSBpcyBubyBDU1Mgc2VsZWN0b3IgZm9yXG4gICAgICAgIC8vIGF0dHJpYnV0ZSBuYW1lIGJlZ2lucyB3aXRoIG9yIGVuZHMgd2l0aC4gW2F0dHJePV0gaXMgZm9yIHRoZSBWQUxVRSBiZWdpbm5pbmcgd2l0aCBzb21ldGhpbmcuXG4gICAgICAgIC8vIFRoaXMgaW5jbHVkZXMgdGhlIGNvbnRlbnQgaXRzZWxmIGluIGl0cyBjaGVjay5cbiAgICAgICAgZm9yIChjb25zdCBlbGUgb2YgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChbdGhpcy5jb250ZW50XSwgJ1tpNV9ldmVudF0sIFtcXFxcMDAwMDNBZXZlbnRdLCBbZGF0YS1pNV9ldmVudF0nKSkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudEZpbHRlciAmJiBlbGUuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gY29tcG9uZW50RmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWxlLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgbGV0IGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnKCcpICYmIGYubmFtZS5lbmRzV2l0aCgnKScpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgYnkgYWx0ZXJuYXRlIHN5bnRheC4gVGhpcyBvbmUgd29ya3MgYmV0dGVyIHdpdGggc2V0QXR0cmlidXRlKCkuXG4gICAgICAgICAgICAgICAgZXZlbnREZWZpbml0aW9uID0gY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZS5zdGFydHNXaXRoKCdfJykgJiYgZi5uYW1lLmVuZHNXaXRoKCdfJykgJiYgZi5uYW1lLmxlbmd0aCA+IDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldmVudERlZmluaXRpb24gfHwgIWV2ZW50RGVmaW5pdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgZGVmaW5pdGlvbiBub3QgZGVjbGFyZWQgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzW2V2ZW50RGVmaW5pdGlvbi52YWx1ZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlciBtZXRob2QgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9ICR7ZXZlbnREZWZpbml0aW9uLnZhbHVlfSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnREZWZpbml0aW9uLm5hbWUuc2xpY2UoMSwgLTEpLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZChuZXdDaGlsZCkge1xuICAgICAgICBpZiAoZ3VhcmQobmV3Q2hpbGQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kQ2hpbGQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZC5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICAgICAgaWYgKGd1YXJkKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgY29tcG9uZW50IHRvIENvbXBvbmVudE1hcC5cbiAgICAgKi9cbiAgICBtYXBDb21wb25lbnQoKSB7XG4gICAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBjb250ZW50IGhhcyBhbHJlYWR5IGJlZW4gcmVsYXRlZCB0byBhIGRpZmZlcmVudCBjb21wb25lbnRcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudCh0aGlzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnQgYWxyZWFkeSByZWZlcmVuY2VkIGJ5IGEgY29tcG9uZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KHRoaXMuY29udGVudCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGNvbXBvbmVudCBmcm9tIENvbXBvbmVudE1hcC4gU29tZXRpbWVzIHlvdSBtaWdodCBuZWVkIHRvIHVzZSB0aGlzLiBCdXQgaG9wZWZ1bGx5IHJhcmVseSwgYmVjYXVzZSBpdCdzIHVzaW5nIGEgV2Vha01hcCxcbiAgICAgKi9cbiAgICB1bm1hcENvbXBvbmVudCgpIHtcbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGNvbXBvbmVudHMgdGhhdCBhcmUgbmVzdGVkIGluc2lkZSB0aGlzIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICAqZ2V0QWxsQ2hpbGRDb21wb25lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50KGUpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRTdHlsZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIC8vIFRTIGp1c3QgZm9yZ290IHRoYXQgcHJvcGVydHkgaXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPi5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBwcm9wZXJ0eVtwcm9wXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgICAgICBpZiAoIWNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIiAmJiBjbGFzc05hbWVzLmluY2x1ZGVzKFwiIFwiKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMuc3BsaXQoXCIgXCIpLmZpbHRlcihxID0+IHEgIT09IFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUaGUgcXVlc3Rpb24gbmVlZHMgdG8gYmUgYXNrZWQ6IGlmIHlvdSBjYW4gYWRkIGEgY29tcG9uZW50IHRvIGEgcGFnZSBieSBkb2luZyBlbGVtZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudC5jb250ZW50KSxcbiAqIGhvdyBkbyB5b3UgZG8gZnJvbSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykgYW5kIGdldCB0byBjb21wb25lbnQsIG5vdCBjb21wb25lbnQuY29udGVudD8gVGhpcyBpcyBob3cuXG4gKlxuICogdmFyIGNvbXBvbmVudCA9IENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykpO1xuICpcbiAqIFRoaXMgd2lsbCB3b3JrIGFzIGxvbmcgYXMgQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KGNvbnRlbnQsIGNvbXBvbmVudCkgaGFzIGJlZW4gY2FsbGVkIGF0IHNvbWUgcG9pbnQuXG4gKlxuICogVGhpcyBpcyB0aGUgYXBwcm92ZWQgd2F5IG9mIGRvaW5nIGl0LiBBbm90aGVyIHBvc3NpYmxlIHNvbHV0aW9uIHdvdWxkIGJlIHRoZSB1c2Ugb2YgZXhwYW5kbyBwcm9wZXJ0aWVzLFxuICogZm9yIGV4YW1wbGUgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpLnJlbGF0ZWRDb21wb25lbnQgPSBjb21wb25lbnQuIFRoaXMgd29ya3MgYW5kIGl0J3Mgc3VwZXIgc2ltcGxlLFxuICogYnV0IHNlZW1zIHRvIGJlIGZyb3duZWQgdXBvbiAuLi4gaXQgaGFzIGJlZW4ga25vd24gdG8gY3JlYXRlIG1lbW9yeSBsZWFrcyBpbiB0aGUgcGFzdC4gV2Vha01hcCBpcyB0aGUgb2JqZWN0XG4gKiBzcGVjaWZpY2FsbHkgY3JlYXRlZCBmb3IgdGhpcyB1c2UgY2FzZSwgc28gdGhhdCBpcyB1c2VkIGhlcmUuXG4gKlxuICogSWYgZXh0ZW5zaW9uIG1ldGhvZHMgYXJlIGxvYWRlZCwgeW91IGNhbiB1c2UgdGhlIGVsZW1lbnQuZ2V0Q29tcG9uZW50KCkgc2hvcnRjdXQuXG4gKi9cbmNsYXNzIENvbXBvbmVudE1hcCB7XG59XG5Db21wb25lbnRNYXAuY29tcG9uZW50cyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLkNvbXBvbmVudE1hcCA9IENvbXBvbmVudE1hcDtcbmZ1bmN0aW9uIGdldENvbXBvbmVudChlbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudCk7XG4gICAgICAgIGlmICghZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGVsZW1lbnQpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcG9uZW50ID0gZ2V0Q29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICB9XG59XG5leHBvcnRzLkNvbXBvbmVudEJpbmRpbmdPcHRpb25zID0gQ29tcG9uZW50QmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG9wdC5lbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnMgPSBFeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gb3B0LnNlbGVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucyA9IEV4aXN0aW5nTG9va3VwQmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIElubmVySHRtbEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Jbm5lckh0bWxCaW5kaW5nT3B0aW9ucyA9IElubmVySHRtbEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBPdXRlckh0bWxCaW5kaW5nT3B0aW9ucyBleHRlbmRzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgc3VwZXIob3B0KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLm91dGVySHRtbCA9IG9wdC5vdXRlckh0bWw7XG4gICAgfVxufVxuZXhwb3J0cy5PdXRlckh0bWxCaW5kaW5nT3B0aW9ucyA9IE91dGVySHRtbEJpbmRpbmdPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIEV4aXN0aW5nRWxlbWVudE9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG9wdC5lbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdFbGVtZW50T3B0aW9ucyA9IEV4aXN0aW5nRWxlbWVudE9wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogTG9vayB1cCBhbiBleGlzdGluZyBlbGVtZW50IGluIHRoZSBET00gYW5kIGNvbnZlcnQgaXQgdG8gYSBjb21wb25lbnQuIFRoaXMgaXMganVzdCBhIHdheSB0byBzaW1wbGlmeSB0aGUgbG9va3VwIHByb2Nlc3MgdnMgZG9pbmdcbiAqIGl0IG1hbnVhbGx5IGJlZm9yZSB1c2luZyBJRXhpc3RpbmdFbGVtZW50T3B0aW9ucy5cbiAqIE5vdGU6IFR5cGVzY3JpcHQgY2FuJ3QgdmVyaWZ5IHlvdXIgdHlwZSBhbm5vdGF0aW9ucyBpZiB5b3UgZG8gaXQgdGhpcyB3YXkuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdMb29rdXBPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gb3B0LnNlbGVjdG9yO1xuICAgIH1cbn1cbmV4cG9ydHMuRXhpc3RpbmdMb29rdXBPcHRpb25zID0gRXhpc3RpbmdMb29rdXBPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIElubmVySHRtbE9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5Jbm5lckh0bWxPcHRpb25zID0gSW5uZXJIdG1sT3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBPdXRlckh0bWxPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgICAgICB0aGlzLm91dGVySHRtbCA9IG9wdC5vdXRlckh0bWw7XG4gICAgfVxufVxuZXhwb3J0cy5PdXRlckh0bWxPcHRpb25zID0gT3V0ZXJIdG1sT3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG5mdW5jdGlvbiBvYnNlcnZhYmxlQ2hlY2sob2JqKSB7XG4gICAgLy8gTm90IGFuIGV4aGF1c3RpdmUgdGVzdCBidXQgaXQncyB0aGUgaW1wb3J0YW50IGJpdC5cbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICdjaGFuZ2VIYW5kbGVyJyBpbiBvYmogJiYgb2JqLmNoYW5nZUhhbmRsZXIgaW5zdGFuY2VvZiBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXI7XG59XG5leHBvcnRzLm9ic2VydmFibGVDaGVjayA9IG9ic2VydmFibGVDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBPYmplY3RGdWxsQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZUJhc2VcIik7XG5jbGFzcyBUcmFpdFNvdXJjZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKGRpc2FibGVBc3luYykge1xuICAgICAgICBzdXBlcih7IG5hbWU6ICdBcnJheVByb3h5JywgZGlzYWJsZUFzeW5jIH0pO1xuICAgIH1cbn1cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuY2xhc3MgQXJyYXlPYnNlcnZhYmxlIGV4dGVuZHMgQXJyYXkge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRNZXJnZWRPYnNlcnZhYmxlKGFyZ3MsIGRpc2FibGVBc3luYykge1xuICAgICAgICAvLyBUaGlzIGlzIHdoZXJlIEkgcmVhbGx5IG5lZWQgbXVsdGlwbGUgaW5oZXJpdGFuY2UuIFRoaXMgbmVlZHMgdG8gaW5oZXJpdCBmcm9tIEFycmF5XG4gICAgICAgIC8vIGJlY2F1c2UgaXQncyBleHRlbmRpbmcgYSBidWlsdC1pbiBjbGFzcy4gSXQgYWxzbyBuZWVkcyB0byBpbmhlcml0IGZyb20gT2JzZXJ2YWJsZUJhc2UuXG4gICAgICAgIC8vIFRocmVlIGNob2ljZXM6XG4gICAgICAgIC8vIDEpIDUwIGxpbmVzIG9mIGNsaXBib2FyZCBpbmhlcml0YW5jZS5cbiAgICAgICAgLy8gMikgQ2hlYXQgaGVhdmlseSBieSB0YWtpbmcgYSB0cmFpdCBhcHByb2FjaC4gVGhpcyBtZWFucyBoYWNrZXJ5IHRvIG1ha2UgVFMgaGFwcHkuXG4gICAgICAgIC8vIDMpIERvIHRoZSBzYW1lIGFzIDIgd2l0aCB0aGUgYnVpbHQtaW4gQXJyYXkgY2xhc3MuIE5vdCBhIHByb2JsZW0gYnV0IHdpdGggIzIgdGhlIGNsYXNzIG5hbWUgYWN0c1xuICAgICAgICAvLyBhcyBhIGhpbnQgdGhhdCBpdCdzIG5vdCBhIGRlZmF1bHQgYXJyYXksIHdoaWNoIGlzIGJldHRlci5cbiAgICAgICAgLy8gIzIgd2lucy5cbiAgICAgICAgY29uc3QgYXJyID0gbmV3IEFycmF5T2JzZXJ2YWJsZSguLi5hcmdzKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24oYXJyLCBuZXcgVHJhaXRTb3VyY2UoZGlzYWJsZUFzeW5jKSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsICdjaGFuZ2VIYW5kbGVyJywgeyBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gT2JqZWN0cyBjcmVhdGVkIHRocm91Z2ggbWFwLCBmaWx0ZXIsIGV0Yywgc2hvdWxkIGJlIGdlbmVyaWMgYXJyYXlzLlxuICAgIHN0YXRpYyBnZXQgW1N5bWJvbC5zcGVjaWVzXSgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5O1xuICAgIH1cbiAgICAvLyBOZWVkcyB0byBiZSBwdWJsaWMgc28gdGhlIHByb3h5IGNhbiBjYWxsIGl0LCBidXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgb3V0c2lkZSB0aGUgQVBJLiBJbWFnaW5lIGl0J3MgaW50ZXJuYWwuXG4gICAgcHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgYXJncywgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgLy8gVGhpcyByZXF1aXJlcyBhIGNoZWF0LiBJdCB3aWxsIGZhaWwgaWYgdGhlIG9iamVjdCBpcyBjcmVhdGVkIHdpdGggbmV3KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xLkFycmF5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgYXJncywgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlKCk7XG4gICAgfVxufVxuZXhwb3J0cy5BcnJheU9ic2VydmFibGUgPSBBcnJheU9ic2VydmFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbmNsYXNzIEFycmF5UHJveHlIYW5kbGVyIHtcbiAgICBnZXQodGFyZ2V0LCBrZXksIHByb3h5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2RDYWxsZWQgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gU2lsZW50IHBhc3MtdGhyb3VnaCBvZiBvdGhlciBtZXRob2RzXG4gICAgICAgICAgICBpZiAoQXJyYXlQcm94eUhhbmRsZXIubWV0aG9kc1RvV2F0Y2guaW5kZXhPZihrZXkudG9TdHJpbmcoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZENhbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IE5lZWQgdG8gZXZhbHVhdGUgcGVyZm9ybWFuY2Ugb2YgY29waWVzXG4gICAgICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5WYWwgPSBtZXRob2RDYWxsZWQuYXBwbHkodGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCgnY2FsbCcsIGtleSwgYXJncywgYmVmb3JlLCBhZnRlciwgcHJveHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KSB7XG4gICAgICAgIC8vIFByb2JsZW06IFdlIHdhbnQgdG8gY2FwdHVyZSBvbmx5IGxlbmd0aCBhbmQgW2luZGV4ZXJdIGNhbGxzLCBidXQgSlMgaGFzIG5vIGNvbnNpc3RlbnRcbiAgICAgICAgLy8gd2F5IG9mIGRlZmluaW5nIFtpbmRleGVyXS4gV2hhdCBtYWtlcyBpdCB3b3JzZSBpcyB0aGF0IGlmIGEgc3RyaW5nIGlzIGFuIGludGVnZXIsIGl0IGlzXG4gICAgICAgIC8vIGNvbnZlcnRlZCB0byBhIG51bWJlci4gQW5kIEpTIGRvZXMgbm90IGluY2x1ZGUgYSBidWlsdC1pbiB3YXkgdG8gdGVzdCBpZiBhIG51bWJlciBpcyBhbiBpbnRlZ2VyLlxuICAgICAgICAvLyBTb2x1dGlvbjogQSByZWdleC1iYXNlZCBjaGVjay4gSWNrLiBXYXkgdG8gcmVtaW5kIG1lIEknbSB1c2luZyBKUy5cbiAgICAgICAgaWYgKGtleSAmJiAoa2V5LnRvU3RyaW5nKCkgPT09ICdsZW5ndGgnIHx8IHR5cGVvZiBrZXkgPT09ICdudW1iZXInIHx8IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKGtleSkpKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBOZWVkIHRvIGV2YWx1YXRlIHBlcmZvcm1hbmNlIG9mIGNvcGllc1xuICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCgnc2V0Jywga2V5LCBbdmFsdWVdLCBiZWZvcmUsIGFmdGVyLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgLy8gQ2Fubm90IHJlcG9ydCBwcm94eSBhcyBzZW5kZXIgYmVjYXVzZSBwcm94eSBub3Qgc2VudCB0byB0aGlzIG1ldGhvZFxuICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdkZWxldGUnLCBrZXksIFtdLCBiZWZvcmUsIGFmdGVyLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuLy8gVGhlc2UgYXJlIGFsbCB0aGUgbWV0aG9kcywgbm90IGNvdW50aW5nIGN1c3RvbSBzZXR0ZXJzLCB0aGF0IG11dGF0ZSBhbiBhcnJheS5cbkFycmF5UHJveHlIYW5kbGVyLm1ldGhvZHNUb1dhdGNoID0gWydjb3B5V2l0aGluJywgJ2ZpbGwnLCAncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J107XG5leHBvcnRzLkFycmF5UHJveHlIYW5kbGVyID0gQXJyYXlQcm94eUhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlQmFzZVwiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduXCIpO1xuY2xhc3MgT2JqZWN0T2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIHByb2R1Y2UgYW4gb2JqZWN0IG9ic2VydmFibGUsIGZvciByZWFzb25zIG9mIHNhZmV0eS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0TWVyZ2VkT2JzZXJ2YWJsZShkYXRhLCBkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgLy8gV2UgbmVlZCBzb21ldGhpbmcgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGlucHV0IG9iamVjdCBtZXJnZWQgd2l0aCB0aGUgcHJvcGVydGllcyBvZiB0aGlzLlxuICAgICAgICAvLyBJIGRvbid0IHdhbnQgdG8gYWN0dWFsbHkgbW9kaWZ5IHRoZSBpbnB1dCBvYmplY3QuIEV2ZW4gdGhvdWdoIGl0IFNIT1VMRCBiZSB0aHJvd2F3YXksIEkgZG9uJ3Qga25vdy5cbiAgICAgICAgLy8gQW5kIEkgZG9uJ3Qgd2FudCB0byB0YWtlIHRoZSByaXNrIHRoYXQgc29tZXRoaW5nIGluIHRoZSBpbnB1dCwgYW4gdW5rbm93biBmYWN0b3IsIHdpbGwgbWFrZSB0aGlzIGJsb3cgdXAuXG4gICAgICAgIC8vIEkga25vdyB0aGF0IHRoaXMgY2xhc3MgaGFzIG9ubHkgMiBsZXZlbHMgb2YgaW5oZXJpdGFuY2UgKGN1cnJlbnRseSkgYW5kIGNvbnRhaW5zIG5vdGhpbmcgdmVyeSBjb21wbGV4IGF0IGFueSBsZXZlbC5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0RnVsbEFzc2lnbl8xLm9iamVjdEZ1bGxBc3NpZ24oZGF0YSwgbmV3IE9iamVjdE9ic2VydmFibGUoZGlzYWJsZUFzeW5jKSwgdHJ1ZSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsICdjaGFuZ2VIYW5kbGVyJywgeyBlbnVtZXJhYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIHN1cGVyKHsgbmFtZTogXCJPYmplY3RQcm94eVwiLCBkaXNhYmxlQXN5bmMgfSk7XG4gICAgfVxuICAgIC8vIE5lZWRzIHRvIGJlIHB1YmxpYyBzbyB0aGUgcHJveHkgY2FuIGNhbGwgaXQsIGJ1dCBzaG91bGQgbm90IGJlIGNhbGxlZCBvdXRzaWRlIHRoZSBBUEkuIEltYWdpbmUgaXQncyBpbnRlcm5hbC5cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgLy8gVGhpcyBmaWx0ZXJzIG91dCB0aGUgdHJvdWJsZXNvbWUgY2hhbmdlSGFuZGxlciBmaWVsZC5cbiAgICAgICAgcmV0dXJuIHN1cGVyLnRvSlNPTigpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JqZWN0T2JzZXJ2YWJsZSA9IE9iamVjdE9ic2VydmFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIE9iamVjdFByb3h5SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoX21ldGhvZHNUb1dhdGNoLCBfd2F0Y2hTZXQsIF93YXRjaERlbGV0ZSwgX3RyaWdnZXJPbmx5T25DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fbWV0aG9kc1RvV2F0Y2ggPSBfbWV0aG9kc1RvV2F0Y2g7XG4gICAgICAgIHRoaXMuX3dhdGNoU2V0ID0gX3dhdGNoU2V0O1xuICAgICAgICB0aGlzLl93YXRjaERlbGV0ZSA9IF93YXRjaERlbGV0ZTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IF90cmlnZ2VyT25seU9uQ2hhbmdlO1xuICAgIH1cbiAgICBnZXQodGFyZ2V0LCBrZXksIHByb3h5KSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2RDYWxsZWQgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gU2lsZW50IHBhc3MtdGhyb3VnaCBvZiBub24td2F0Y2hlZCBtZXRob2RzXG4gICAgICAgICAgICBpZiAodGhpcy5fbWV0aG9kc1RvV2F0Y2guaW5kZXhPZihrZXkudG9TdHJpbmcoKSkgPT09IC0xIHx8IHR5cGVvZiBtZXRob2RDYWxsZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kQ2FsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmV0dXJuIGEgd3JhcHBlciBhcm91bmQgdGhlIG1ldGhvZCB0aGF0IHB1Ymxpc2hlcyB0aGUgY2hhbmdlXG4gICAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXR1cm5WYWwgPSBtZXRob2RDYWxsZWQuYXBwbHkodGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB0YXJnZXQucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnY2FsbCcsIGtleSwgdW5kZWZpbmVkLCBhcmdzLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoU2V0KSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIC8vIElmIHRvIGJlIHRyaWdnZXJlZCBvbmx5IG9uIGNoYW5nZSwgY2hlY2sgb2xkVmFsdWUgYW5kIG5ld1ZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGRWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCBrZXksIG9sZFZhbHVlLCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgICAgIGlmICh0aGlzLl93YXRjaERlbGV0ZSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSk7XG4gICAgICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIC8vIENhbm5vdCByZXBvcnQgcHJveHkgYXMgc2VuZGVyIGJlY2F1c2UgcHJveHkgbm90IHNlbnQgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdkZWxldGUnLCBrZXksIG9sZFZhbHVlLCB1bmRlZmluZWQsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5PYmplY3RQcm94eUhhbmRsZXIgPSBPYmplY3RQcm94eUhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuLyoqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIGltcGxlbWVudGF0aW9uIG9mIE9iamVjdC5hc3NpZ24oKSB0aGF0IHVuZGVyc3RhbmRzIE9ic2VydmFibGVQcm9wZXJ0eSxcbiAqIHNvIHRoYXQgaXQgY2FuIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHdpdGhvdXQgd2lwaW5nIG91dCByZWZlcmVuY2VzIHRvIHRoZVxuICogZXhpc3RpbmcgcHJvcGVydHkgd2l0aCB0aGF0IGtleSAod2hpY2ggaXMgd2hhdCB3b3VsZCBoYXBwZW4gaWYgeW91IHVzZWQgcmVndWxhciBPYmplY3QuYXNzaWduKClcbiAqIG9uIGEgbm9uLXByb3hpZWQgb2JqZWN0KS4gIEl0IGNhbiBhbHNvIGJlIHVzZWQgdG8gcmVhZCB0aGUgdmFsdWUgb2YgYW4gT2JzZXJ2YWJsZVByb3BlcnR5LlxuICovXG5mdW5jdGlvbiBvYnNlcnZhYmxlQXNzaWduKHRhcmdldCwgLi4uc291cmNlcykge1xuICAgIHRhcmdldCA9IHRhcmdldCB8fCB7fTtcbiAgICBmb3IgKGNvbnN0IHNyYyBvZiBzb3VyY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNyYykpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwcm9wID0gc3JjW2tleV07XG4gICAgICAgICAgICBjb25zdCB0cHJvcCA9IHRhcmdldFtrZXldO1xuICAgICAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayhzcHJvcCkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBzcHJvcC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbCA9IHNwcm9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHRwcm9wKSkge1xuICAgICAgICAgICAgICAgIHRwcm9wLnZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLm9ic2VydmFibGVBc3NpZ24gPSBvYnNlcnZhYmxlQXNzaWduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbi8qKlxuICogQ29tbW9uIGxvZ2ljIGJldHdlZW4gdGhlIGRpZmZlcmVudCBvYnNlcnZhYmxlIGNsYXNzZXMuIFRoZXNlIGltcGxlbWVudCBJT2JzZXJ2YWJsZS4gVGhlIGludm9jYXRpb24gaXRzZWxmIHZhcmllcyBmcm9tIGNsYXNzIHRvIGNsYXNzLlxuICovXG5jbGFzcyBPYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoeyBuYW1lLCBmb3J3YXJkVG8sIGJ1YmJsZUZyb20sIGRpc2FibGVBc3luYyB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBpZiAoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3J3YXJkVG8pIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFnRGVsZWdhdGUobmFtZSk7XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBUeXBlc2NyaXB0IGhhcyBmb3Jnb3R0ZW4gdGhhdCBFdmVudEhhbmRsZXIgY2FuIGFjY2VwdCBhbiBhcnJheS5cbiAgICAgICAgLy8gSW4gc3BpdGUgaWYgdGhlIGZhY3QgdGhhdCB0aGlzIHNpZ25hdHVyZSBpcyBpZGVudGljYWwuXG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIuc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoZSBpbnB1dCdzIGRlbGVnYXRlIHRvIHRoaXMgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBzZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKSB7XG4gICAgICAgIC8vIEpvaW4gdGhlIG90aGVyIGV2ZW50IGhhbmRsZXIgdG8gdGhpcywgc28gdGhhdCB3aGVuIHRoaXMgaXMgaW52b2tlZCwgc28gaXMgdGhlIG90aGVyLlxuICAgICAgICB0aGlzLnN1YnNjcmliZShmb3J3YXJkVG8uY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGlzIG9iamVjdCdzIGRlbGVnYXRlIHRvIHRoZSBpbnB1dCBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGJ1YmJsZUZyb20pIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGV2ZW50cyByYWlzZWQgb24gdGhlIG90aGVyIGhhbmRsZXIsIHNvIHRoYXQgd2hlbiB0aGF0IGlzIGludm9rZWQsIHNvIGlzIHRoaXNcbiAgICAgICAgLy8gVGhlIHNhbWUgYXMgZm9yd2FyZENoYW5nZUV2ZW50c1RvIGV4Y2VwdCB0aGF0IHRoaXMgaXMgdGhlIHRhcmdldCwgbm90IHRoZSBzb3VyY2UuXG4gICAgICAgIGJ1YmJsZUZyb20uc3Vic2NyaWJlKHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZSk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVTZW5kZXIoc2VuZGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVMaXN0ZW5lcihzZW5kZXIpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgcHJvYmFibHkgZnJvd25lZCB1cG9uIChzZWUgaG93IFRTIGRvZXNuJ3QgbGlrZSBpdCksIGJ1dCBpdCdzIHZhbGlkIEpTLlxuICAgICAqIEl0J3Mgb25seSBpbnRlbmRlZCBmb3IgdHJvdWJsZXNob290aW5nLCBub3QgcmVhbCBsb2dpYy4gVGhlcmUgYXJlIHRpbWVzIHdoZW4geW91J3JlXG4gICAgICogdHJ5aW5nIHRvIGlkZW50aWZ5IGV4YWN0bHkgd2hpY2ggZGVsZWdhdGVzIGFyZSBzdWJzY3JpYmVkLCBhbmQgdGhpcyBpcyByZWFsbHkgaGFyZCB3aGVuXG4gICAgICogbm90aGluZyBoYXMgaHVtYW4tcmVhZGFibGUgbmFtZXMuXG4gICAgICovXG4gICAgdGFnRGVsZWdhdGUobmFtZSkge1xuICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlLl90YWcgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgeCBpbiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoeCAhPT0gXCJjaGFuZ2VIYW5kbGVyXCIgJiYgeCAhPT0gXCJwcml2YXRlUHJvcGVydHkyXCIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbeF0gPSB0aGlzW3hdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlQmFzZSA9IE9ic2VydmFibGVCYXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIE9ic2VydmFibGVQcm9wZXJ0eSBpcyBhIHByb3BlcnR5IHRoYXQgYXV0b21hdGljYWxseSByYWlzZXMgYSBQcm9wZXJ0eUNoYW5nZWQgZXZlbnQgd2hlbiBpdCBpcyBtb2RpZmllZC4gVGhpcyBpcyBtb3JlXG4gKiBjb252ZW5pZW50IHRoYW4gaGF2aW5nIHRvIGRvIGl0IG1hbnVhbGx5IGV2ZXJ5IHRpbWUgeW91IG5lZWQgaXQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVQcm9wZXJ0eSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJyc7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBvcHRpb25zLm9ubHlXaGVuQ2hhbmdlZCB8fCBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgJiYgb2xkID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnc2V0JywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZCwgdmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIChpZiBhIHN0cmluZykgdGhhdCBoYXMgaGFkIHNwZWNpYWwgSFRNTCBjaGFyYWN0ZXJzIGVzY2FwZWQuXG4gICAgICovXG4gICAgZ2V0IHNhZmVWYWx1ZSgpIHtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlUHJvcGVydHkgPSBPYnNlcnZhYmxlUHJvcGVydHk7XG5mdW5jdGlvbiBvYnNlcnZhYmxlUHJvcGVydHlDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGxpa2UgdGhpcyBiZWNhdXNlIGl0IHNob3VsZCBiZSBjaGVja2luZyBpZiB2YWx1ZSBpcyBhIHNldHRlcixcbiAgICAvLyBhbmQgaXQgaXNuJ3QsIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IHRvIGNoZWNrLlxuICAgIC8vIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoKSBkb2Vzbid0IGNhdGNoIGluaGVyaXRlZCBwcm9wZXJ0aWVzLCBvZlxuICAgIC8vIHdoaWNoIHRoaXMgaXMgYWxtb3N0IGFsd2F5cyBvbmUuXG4gICAgLy8gSSBoYXZlIHRvIGZhbGwgYmFjayB0byBhIGJhc2ljIGluc3RhbmNlIGNoZWNrLlxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVByb3BlcnR5O1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayA9IG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL0FycmF5T2JzZXJ2YWJsZVwiKTtcbmNvbnN0IEFycmF5UHJveHlIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9BcnJheVByb3h5SGFuZGxlclwiKTtcbmNvbnN0IE9iamVjdE9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL09iamVjdE9ic2VydmFibGVcIik7XG5jb25zdCBPYmplY3RQcm94eUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL09iamVjdFByb3h5SGFuZGxlclwiKTtcbmNsYXNzIE9ic2VydmFibGVQcm94eSB7XG4gICAgc3RhdGljIHByb3hpbWF0ZShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbW9kZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIFdlIGNhbid0IGRvIGZ1bmN0aW9ucywgbm90IHRoYXQgdGhleSB3b3VsZCBiZSB2ZXJ5IHVzZWZ1bC5cbiAgICAgICAgICAgIC8vIFllcywgdGVjaG5pY2FsbHkgeW91IHNob3VsZCBiZSBhYmxlIHRvIGRlZmluZSBwcm9wZXJ0aWVzIG9uIGEgZnVuY3Rpb24uIFRoZXkgYXJlIGFjdHVhbFxuICAgICAgICAgICAgLy8gb2JqZWN0cy4gIEluIHByYWN0aWNlLCBob3dldmVyLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoKSBzdGlsbCBtYWtlcyB0aGVtIHVuZGVmaW5lZC5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdHlwZTogZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG1vZGVsKSkge1xuICAgICAgICAgICAgLy8gQW4gYXJyYXkgcHJveHkgYWxsb3dzIGNoYW5nZXMgdG8gYW4gYXJyYXkgdG8gYmUgb2JzZXJ2ZWQuIFRoZSBkb3duLXNpZGUgaXMgdGhhdCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgLy8gaXMgYW4gb3JkZXIgb2YgbWFnbml0dWRlIHNsb3dlciB0aGFuIHVzaW5nIGFuIE9ic2VydmFibGVMaXN0LiAgVGhlIHVwLXNpZGUgaXMgdGhhdCBpdCB1c2VzXG4gICAgICAgICAgICAvLyBtb3JlIHRoYW4gYW4gb3JkZXIgb2YgbWFnbml0dWRlIGxlc3MgY29kZS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3hpbWF0ZUFycmF5KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3hpbWF0ZU9iamVjdChtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIGEgc2ltcGxlIHZhbHVlIGlzIHJldHVybmVkLCByZXR1cm4gYSBwcm94eSBoYXZpbmcgYSB2YWx1ZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3hpbWF0ZU9iamVjdCh7IHZhbHVlOiBtb2RlbCB9LCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgY29uZmlndXJhYmxlIHZlcnNpb24gb2YgcHJveGltYXRlKCkgY2FsbGVkIG9uIGFuIG9iamVjdC4gQnkgbWFraW5nIGl0IGdlbmVyYWxpemVkIGFuZCBjb25maWd1cmFibGUsIHRoaXMgYWxsb3dzIHRoZSBjYWxsZXIgdG9cbiAgICAgKiB0cmFjayBtZXRob2RzIHRoYXQgYXJlIGNhbGxlZCwgYmFzZWQgb24gYSBjb25maWd1cmFibGUgbGlzdC5cbiAgICAgKlxuICAgICAqIElmIHRoZSBvYmplY3QgaXMgYSBjb21wbGV4IG9iamVjdCwgd2hlcmUgY2hpbGQgb2JqZWN0cyBhcmUgbW9kaWZpZWQsIG5vdCB0aGUgbWFpbiBvYmplY3QsIGNoYW5nZXMgd291bGQgbm90IGJlIGNhdWdodC5cbiAgICAgKiBPbmUgd2F5IHRvIGhhbmRsZSB0aGF0IGlzIHRvIG1ha2UgdGhlIGNoaWxkIG9iamVjdCBhIHByb3h5LiBBbm90aGVyIHdheSBpcyB0byBhY2Nlc3MgdGhlIGNoaWxkIG9iamVjdCBvbmx5IHRocm91Z2ggbWV0aG9kc1xuICAgICAqIGFuZCB1c2UgdGhpcy5cbiAgICAgKi9cbiAgICBzdGF0aWMgcHJveGltYXRlT2JqZWN0KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQsIG1ldGhvZHNUb1dhdGNoID0gW10sIHdhdGNoU2V0ID0gdHJ1ZSwgd2F0Y2hEZWxldGUgPSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbW9kZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIFdlIGNhbid0IGRvIGZ1bmN0aW9ucywgbm90IHRoYXQgdGhleSB3b3VsZCBiZSB2ZXJ5IHVzZWZ1bC5cbiAgICAgICAgICAgIC8vIFllcywgdGVjaG5pY2FsbHkgeW91IHNob3VsZCBiZSBhYmxlIHRvIGRlZmluZSBwcm9wZXJ0aWVzIG9uIGEgZnVuY3Rpb24uIFRoZXkgYXJlIGFjdHVhbFxuICAgICAgICAgICAgLy8gb2JqZWN0cy4gIEluIHByYWN0aWNlLCBob3dldmVyLCBPYmplY3QuZGVmaW5lUHJvcGVydHkoKSBzdGlsbCBtYWtlcyB0aGVtIHVuZGVmaW5lZC5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdHlwZTogZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgSU9ic2VydmFibGUgbWV0aG9kcyB0byB0aGUgbW9kZWwgc28gdGhhdCBpdCBjYW4gcmFpc2UgZXZlbnRzLlxuICAgICAgICAvLyBXZSBtdXN0IGV4dGVuZCB0aGUgb3JpZ2luYWwgY2xhc3MgKG9yIGF0IGxlYXN0IHRoZSBvYmplY3QpLlxuICAgICAgICBjb25zdCB0YXJnZXQgPSBPYmplY3RPYnNlcnZhYmxlXzEuT2JqZWN0T2JzZXJ2YWJsZS5nZXRNZXJnZWRPYnNlcnZhYmxlKG1vZGVsLCBkaXNhYmxlQXN5bmMpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IE9iamVjdFByb3h5SGFuZGxlcl8xLk9iamVjdFByb3h5SGFuZGxlcihtZXRob2RzVG9XYXRjaCB8fCBbXSwgd2F0Y2hTZXQgfHwgZmFsc2UsIHdhdGNoRGVsZXRlIHx8IGZhbHNlLCBvbmx5SWZDaGFuZ2VkIHx8IGZhbHNlKTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKTtcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5Ll9tb2RlbHMuc2V0KHByb3h5LCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb3hpbWF0ZSBhbiBhcnJheS5cbiAgICAgKi9cbiAgICBzdGF0aWMgcHJveGltYXRlQXJyYXkobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCkge1xuICAgICAgICAvLyBBZGQgSU9ic2VydmFibGUgbWV0aG9kcyB0byB0aGUgbW9kZWwgc28gdGhhdCBpdCBjYW4gcmFpc2UgZXZlbnRzLlxuICAgICAgICAvLyBXZSBtdXN0IGV4dGVuZCB0aGUgb3JpZ2luYWwgYXJyYXkgY2xhc3MgKG9yIGF0IGxlYXN0IHRoZSBhcnJheSBvYmplY3QpLlxuICAgICAgICBjb25zdCB0YXJnZXQgPSBBcnJheU9ic2VydmFibGVfMS5BcnJheU9ic2VydmFibGUuZ2V0TWVyZ2VkT2JzZXJ2YWJsZShtb2RlbCwgZGlzYWJsZUFzeW5jKTtcbiAgICAgICAgLy8gVGhlIHR5cGUgaGVyZSBpc24ndCBhY2N1cmF0ZSwgYnV0IEkgaGF2ZSBubyBnb29kIHdheSB0byBwYXNzIHRoZSBrZXkgdHlwZSB3aXRob3V0IG1ha2luZyB0aGlzIGNsYXNzIG9ubHkgd29yayBmb3IgYXJyYXlzLlxuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IEFycmF5UHJveHlIYW5kbGVyXzEuQXJyYXlQcm94eUhhbmRsZXIoKTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKTtcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5Ll9tb2RlbHMuc2V0KHByb3h5LCB0YXJnZXQpO1xuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgfVxufVxuLy8gVGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QgbmVlZHMgdG8gYmUgc3RvcmVkIHNvbWV3aGVyZSBzbyB0aGF0IHRoZSBwcm94eSBjYW4gd29yay5cbi8vIFRoZXJlJ3Mgbm8gcmVhc29uIHRoYXQgdGhlIHVzZXIgY2FuJ3Qga2VlcCBhIGNvcHkgYnV0IHdlIHNob3VsZG4ndCBmb3JjZSB0aGF0LlxuT2JzZXJ2YWJsZVByb3h5Ll9tb2RlbHMgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0cy5PYnNlcnZhYmxlUHJveHkgPSBPYnNlcnZhYmxlUHJveHk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgQ2xvbmVEZWVwXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvQ2xvbmVEZWVwXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gb2JzZXJ2YWJsZSBzdGF0ZSB0aGF0IHNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIHVzaW5nIHRoZSByZWxldmFudCBtZXRob2RzLCBhbGxvd2luZyBhdG9taWMgY2hhbmdlcyB0byBtdWx0aXBsZSBwcm9wZXJ0aWVzXG4gKiBpbiBtdWx0aXBsZSBvYmplY3RzLCByYWlzaW5nIGEgc2luZ2xlIGV2ZW50LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlU3RhdGUgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnc2V0U3RhdGUnO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIEkgd291bGQgcHJlZmVyIHRoYXQgdGhpcyByZXR1cm4gUmVhZG9ubHk8VD4gYnV0IGdldHRlciBhbmQgc2V0dGVyIGhhdmUgdG8gYmUgdGhlIHNhbWUgdHlwZS5cbiAgICAgICAgLy8gVGhhdCBtZWFucyB5b3Ugd291bGQgaGF2ZSB0byBjYXN0IGFueSB2YWx1ZSB5b3Ugc2V0IGFzIGEgcmVhZG9ubHksIHdoaWNoIGlzIGEgUElUQS5cbiAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJ3cml0ZXMgdGhlIGVudGlyZSB2YWx1ZS5cbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh2YWx1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGdldFNhZmVWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0bXAgPSB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRtcCkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodG1wKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0bXApKTtcbiAgICB9XG4gICAgZ2V0VmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBzZXRTdGF0ZSh2YWx1ZSwgb3ZlcldyaXRlQWxsID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICBsZXQgbmV3VmFsdWU7XG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICAgICAgLy8gSWYgdGhlIHR5cGUgaXMgcHJpbWl0aXZlLCB0aGVuIGEgZnVsbCBvdmVyd3JpdGUgaXMgYWxsb3dlZFxuICAgICAgICBpZiAoSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIEZ1bmN0aW9ucyB3aWxsIGV4ZWN1dGUgYnV0IHRoZXkgd29uJ3QgY2hhbmdlIHRoZSB2YWx1ZS4gVGhlIHJlYXNvbiBpcyB0aGUgc2FtZSByZWFzb24gdGhhdCB0aGlzIG1ha2VzIG5vIHBlcm1hbmVudCBjaGFuZ2UgdG8gYmFyOlxuICAgICAgICAgICAgLy8gdmFyIGZvbyA9IGZ1bmN0aW9uKHN0cikgeyBzdHIgPSBzdHIudG9VcHBlckNhc2UoKTsgfTsgdmFyIGJhciA9ICdhYmMnOyBmb28oYmFyKTsgY29uc29sZS5sb2coYmFyID09PSAnYWJjJyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FsbCBzZXRTdGF0ZSB3aXRoIGEgZnVuY3Rpb24gaWYgc3RhdGUgaXMgcHJpbWl0aXZlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3ZlcldyaXRlQWxsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3ZlcldyaXRlQWxsKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIxX292ZXJ3cml0ZUFsbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIFtuZXdWYWx1ZSwgcmV0dXJuVmFsdWVdID0gX292cjNfZnVuY3Rpb25BcmcuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlIGlzIG5vdCBhIHBhcnRpYWwgc3RhdGUgb3IgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMl9wYXJ0aWFsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnY2FsbCcsIHRoaXMucHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgICAgICByZXR1cm4geyBvbGRWYWx1ZSwgbmV3VmFsdWUsIHJldHVyblZhbHVlIH07XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX292ZXJ3cml0ZUFsbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgZW50aXJlIG9iamVjdC5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKF92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIyX3BhcnRpYWwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBQYXJ0aWFsIG9iamVjdDogT3ZlcndyaXRlIG9ubHkgdGhlIGtleXMgcHJvdmlkZWRcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdG1wW2tleV0gPSBfdmFsdWVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIzX2Z1bmN0aW9uQXJnKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgZnVuY3Rpb24gcHJvdmlkZWQgYW5kIHVwZGF0ZSB0aGUgb2JqZWN0IGFzIGRpY3RhdGVkXG4gICAgICAgICAgICAvLyBNYXliZSB1bm5lY2Vzc2FyeSBidXQgd2Ugd2FudCB0byBhdm9pZCB0aGUgY2FsbGVyIGV4ZmlsdHJhdGluZyB0aGUgc3RhdGUgdXNpbmcgYSBmdW5jdGlvbixcbiAgICAgICAgICAgIC8vIGJ5IGFjY2lkZW50LiBPZiBjb3Vyc2UsIHRoZXkgY2FuIGp1c3QgYWNjZXNzIF92YWx1ZSBieSBjYXN0aW5nIGFzIGFueSxcbiAgICAgICAgICAgIC8vIGJ1dCB0aGF0J3Mgbm90IGFjY2lkZW50YWwuXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgX3JldHVyblZhbHVlID0gX3ZhbHVlLmNhbGwodG1wLCB0bXApO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiBbdG1wLCBfcmV0dXJuVmFsdWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlU3RhdGUgPSBPYnNlcnZhYmxlU3RhdGU7XG5mdW5jdGlvbiBvYnNlcnZhYmxlU3RhdGVDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGtub3cgaWYgSSBzaG91bGQgY2hlY2sgZm9yIHRoaXMgb3IgZm9yIGdldFN0YXRlKCkgYW5kIHNldFN0YXRlKClcbiAgICByZXR1cm4gb2JqICYmIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZTtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZVN0YXRlQ2hlY2sgPSBvYnNlcnZhYmxlU3RhdGVDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IERlbGV0ZU5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9EZWxldGVOb2RlQ29udGVudFwiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgRWx2aXNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9FbHZpc1wiKTtcbi8qKlxuICogSWYgeW91IGNsaWNrIGEgbGluayBpbiBhIHJlYWwgd2ViIHNpdGUsIHRoZSBicm93c2VyIGFza3MgdGhlIHNlcnZlciBmb3IgYSBwYWdlIGFuZCBpdCByb3V0ZXMgeW91IHRvIHRoZSByZWxldmFudFxuICogcGFnZS4gQnV0IGlmIHlvdSBoYXZlIGEgc2luZ2xlIHBhZ2UgYXBwIHJ1bm5pbmcgb24gYSBmaWxlLCB3aXRoIG5vIHdlYiBzZXJ2ZXIsIGxpa2UgdGhlIG9uZSB0aGlzIGZyYW1ld29ya1xuICogd2FzIGJ1aWx0IGZvciwgeW91IG5lZWQgc29tZXRoaW5nIHRvIHNpbXVsYXRlIHRoYXQuXG4gKlxuICogVGhlIEFkdmFuY2VkIHZlcnNpb24gb2YgdGhlIHJvdXRlciB3YXMgY3JlYXRlZCB0byBwcm92aWRlIHRoZSByZWN1cnNpdmVseS1uZXN0ZWQgcm91dGVzIHRoYXQgeW91IGNhbiBnZXQgd2l0aCBBbmd1bGFyLlxuICogSXQgZnVuY3Rpb25zLiBCdXQgSSBoYXRlIGl0LiBJIGRvbid0IGxpa2Ugc2V0dGluZyB1cCByb3V0ZXMgaW4gQW5ndWxhciBiZWNhdXNlIGl0IHRha2VzIGVkaXRpbmcgdG9vIG1hbnkgZmlsZXMgZXZlblxuICogZm9yIHNpbXBsZSBzaXRlcy4gVGhhdCBzYWlkLCBmb3IgYSB2ZXJ5IGxhcmdlIGFuZCBjb21wbGV4IHNpdGUgaXQncyBuaWNlIHRvIGhhdmUgdGhlIG9yZ2FuaXphdGlvbiwgc28gdGhlcmUncyB0aGF0LlxuICpcbiAqIEkgZm91bmQgdGhpcyB0byBiZSBjb21wbGV4IGFuZCBicml0dGxlIGFuZCBpZiB5b3Ugd2FudCB0byB1c2UgdGhlIGFkdmFuY2VkIGZlYXR1cmVzIChpdCdzIHByZXR0eSB0cml2aWFsIHRvIGhhdmUgdGhyZWVcbiAqIGNvbHVtbnMsIGVhY2ggcG9wdWxhdGVkIHZpYSB0aGUgcm91dGUsIGZvciBleGFtcGxlKSwgaXQgY2FuIGdldCBoYXJkIHRvIHNldCB1cCBhbmQgZWFzeSB0byBicmVhayAoYmUgY2FyZWZ1bCBub3RcbiAqIHRvIHRyeSB0byBwb3B1bGF0ZSBhIHJvdXRlci1vdXRsZXQgeW91IGp1c3QgcmVwbGFjZWQpLiBJbiB0ZXJtcyBvZiByZWFsIHVzZSBjYXNlcywgSSB3b3VsZCBwcmVmZXIgc2ltcGxlIHJvdXRlc1xuICogYW5kIGRvIHRoZSB3b3JrIGluIGNvbXBvbmVudHMuXG4gKlxuICogQnV0IHRoaXMgaXMgaGVyZSwgaWYgeW91IHdhbnQgdG8gdXNlIGl0LlxuICpcbiAqIFRoaXMgY2xhc3MgY2xlYXJzIHRoZSByb3V0ZSBjb250YWluZXIsIHdoaWNoIGlzIGV4cGVjdGVkIHRvIGJlIGEgc3RhdGljIGNvbnRhaW5lciBpbiB0aGUgd3JhcHBlciBIVE1MIHBhZ2UsIG9yIHRoZSBib2R5LlxuICogV2hlbiB5b3UgZ2l2ZSBpdCB0aGUgcmVsZXZhbnQgcm91dGUsIGl0IGV4ZWN1dGVzIHRoZSBjYWxsYmFjayBvciByZXR1cm5zIHRoZSB2aWV3L0hUTUwgZWxlbWVudCB5b3UgZGVmaW5lZCBmb3IgdGhlIHJvdXRlLFxuICogYW5kIHN0aWNrcyBpdCBpbnNpZGUgdGhlIGNvbnRhaW5lci4gVGhlbiBpdCBzZWFyY2hlcyBmb3IgY2hpbGQgcm91dGVzIHRvIHB1dCBpbnRvIGNoaWxkIHJvdXRlIGNvbnRhaW5lcnMsIGV0YyxcbiAqIHVudGlsIGl0IHJ1bnMgb3V0IG9mIGNoaWxkcmVuLlxuICovXG5jbGFzcyBBZHZhbmNlZFBhZ2VSb3V0ZXIge1xuICAgIHN0YXRpYyBnZXQgbWF0Y2hlZFJvdXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlZFJvdXRlIHx8IHsgcm91dGU6ICcnLCBwYXJhbXM6IG5ldyBNYXAoKSB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlZFJvdXRlLnBhcmFtcztcbiAgICB9XG4gICAgc3RhdGljIGdldCBoaXN0b3J5TWF4TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeU1heExlbmd0aDtcbiAgICB9XG4gICAgc3RhdGljIHNldCBoaXN0b3J5TWF4TGVuZ3RoKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9oaXN0b3J5Lmxlbmd0aCA+IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5Lmxlbmd0aCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpc3RvcnlNYXhMZW5ndGggPSB2YWx1ZTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBoaXN0b3J5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgICB9XG4gICAgc3RhdGljIHNldCBub3RGb3VuZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ub3RGb3VuZCA9IHZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgY29uZmlndXJlKHJvdXRlcykge1xuICAgICAgICB0aGlzLl9yb3V0ZXMgPSByb3V0ZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB1cCBhIHRvcC1sZXZlbCByb3V0ZSwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gcm91dGUgdG8gdGhlIG1haW4gYXBwIGNvbnRhaW5lci4gVGhpcyBpcyBleHBlY3RlZCB0byBjb250YWluXG4gICAgICogYSBjaGlsZC1jb250YWluZXIgZWxlbWVudCwgd2hpY2ggY29udGFpbnMgbG93ZXIgbGV2ZWwgcm91dGVzIHRoYXQgYXJlIHN0b3JlZCBhcyBjaGlsZHJlbiwgYWRkZWQgdXNpbmcgdGhlIGFkZFJvdXRlKClcbiAgICAgKiBtZXRob2QuXG4gICAgICovXG4gICAgc3RhdGljIGFkZEFwcFJvdXRlKHBheWxvYWQsIHJvdXRlID0gJyonLCB1cmxSb3V0aW5nRW5hYmxlZCA9IHRydWUpIHtcbiAgICAgICAgaWYgKHVybFJvdXRpbmdFbmFibGVkKSB7XG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCBhbGxvd3MgZ29pbmcgdG8gYSBuZXcgcGFnZSBieSBjaGFuZ2luZyB0aGUgVVJMIGluc3RlYWQgb2YgaGF2aW5nIHRvIGlzc3VlIHJvdXRlKCkgY29tbWFuZHMuXG4gICAgICAgICAgICB0aGlzLnR1cm5PblVybFJvdXRpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKHBheWxvYWQpIHx8IHR5cGVvZiBwYXlsb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJvdXRlKHtcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGUsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICByb3V0ZUNvbnRhaW5lcjogJ3BhZ2Utcm91dGVyJyxcbiAgICAgICAgICAgICAgICBzdGF0aWNSb3V0ZXJDb250YWluZXI6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRSb3V0ZSh7XG4gICAgICAgICAgICAgICAgcm91dGU6IHJvdXRlLFxuICAgICAgICAgICAgICAgIHBheWxvYWQ6ICgpID0+IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgcm91dGVDb250YWluZXI6ICdwYWdlLXJvdXRlcicsXG4gICAgICAgICAgICAgICAgc3RhdGljUm91dGVyQ29udGFpbmVyOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgYWRkUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JvdXRlcy5maW5kKHEgPT4gcS5yb3V0ZSA9PT0gcm91dGUucm91dGUgJiZcbiAgICAgICAgICAgIChxLnJvdXRlQ29udGFpbmVyIHx8ICdjaGlsZC1jb250YWluZXInKSA9PT0gKHJvdXRlLnJvdXRlQ29udGFpbmVyIHx8ICdjaGlsZC1jb250YWluZXInKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdXRlIGFuZCBjb250YWluZXIgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZVJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5fcm91dGVzLmZpbmQocSA9PiBxLnJvdXRlID09PSByb3V0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdXRlIG5vdCBmb3VuZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZpbmcgaXRlbXMgaXMgc3VjaCBhIHBhaW4uXG4gICAgICAgIGNvbnN0IHJvdXRlcyA9IHRoaXMuX3JvdXRlcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChyb3V0ZXNbaV0ucm91dGUgPT09IHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgcm91dGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcm91dGUocm91dGUsIHVwZGF0ZVVybCA9IHRydWUpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgICAgLy8gQWxsb3cgYWN0dWFsIGxpbmtzIHZpYSB0aGUgaGFzaC4gSGFzaCBsaW5rcyBkb24ndCBmb3JjZSBhIHBhZ2UgcmVsb2FkIGFuZCB0aGV5IHdvcmsgdy9vIGEgd2ViIHNlcnZlci5cbiAgICAgICAgICAgIC8vIFRvIGF2b2lkIGhhdmluZyB0byBjYWxsIHJvdXRlKCkgbWFudWFsbHksIHlvdSBtdXN0IGNhbGwgdHVybk9uVXJsUm91dGluZygpO1xuICAgICAgICAgICAgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcbiAgICAgICAgICAgIC8vIFRoZXJlIGlzIGEgcHJvYmxlbSwgd2hpY2ggaXMgdGhhdCBzZXR0aW5nIHRoZSBoYXNoIHdpbGwgdHJpZ2dlciBBTk9USEVSIHJvdXRlIGNoYWluZ2UgdmlhIHRoZSBoYXNoY2hhbmdlIG9wZXJhdGlvbi5cbiAgICAgICAgICAgIC8vIFJlbW92aW5nIHRoZSBoYXNoIGNoYW5nZSBhbmQgdGhlbiByZXN0b3JpbmcgaXQgbGF0ZXIgZG9lcyBub3RoaW5nLiBJdCdzIHN0aWxsIHRyaWdnZXJlZC5cbiAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZXMgaGFja3dvcmsuIFNvIHlvdSBzZWUgd2h5IHRoaXMgcm91dGVyIGlzIG15IGxlYXN0IGZhdm9yaXRlIHBhcnQgb2YgdGhpcyBmcmFtZXdvcmsuIEl0J3MgYSBwaWxlIG9mIGhhY2tzOlxuICAgICAgICAgICAgLy8gSWYgdGhpcyB3YXMgdHJpZ2dlcmVkIGJ5IGEgaGFzaCBjaGFuZ2UgYW5kIHRoZSByb3V0ZSBpcyB0aGUgc2FtZSwgdGhlbiBkb24ndCBkbyBhbnl0aGluZy5cbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSBsYXN0IHJvdXRlIHNvIHRoYXQgaXQgZG9lc24ndCBpbnRlcmZlcmUgd2l0aCB0aGUgbmV4dCBoYXNoIGNoYW5nZS5cbiAgICAgICAgICAgIGlmIChyb3V0ZSA9PT0gdGhpcy5fbGFzdFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1cGRhdGVVcmwpIHtcbiAgICAgICAgICAgIC8vIElmIGEgcm91dGUgaXMgc2VudCBpbiwgdGhlbiBzZXQgdGhlIGhhc2guXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHJvdXRlO1xuICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgYSBjb3B5IG9mIHJvdXRlcywgYmVjYXVzZSAoMSkgdGhlIGxpc3Qgd2lsbCBiZSBtb2RpZmllZCBhbmQgKDIpIHJlZHVjZSBhY2Nlc3NlcyB0byBzdGF0aWMgcHJvcGVydGllcy5cbiAgICAgICAgLy8gSSdtIG5vdCBzdXJlIGlmIGFzeW5jIGhhc2ggdXBkYXRlIGV2ZW50cyB3aWxsIGFsbCBiZSBpbiB0aGUgc2FtZSB0aHJlYWQsIGJ1dCB0aGlzIGlzbid0IHRocmVhZC1zYWZlLlxuICAgICAgICBjb25zdCByb3V0ZUNvcHkgPSB0aGlzLl9yb3V0ZXMuc2xpY2UoMCkubWFwKG0gPT4gKHsgcm91dGU6IG0gfSkpO1xuICAgICAgICAvLyBGaW5kIG1hdGNoaW5nIHJvdXRlcy4gVHlwaWNhbGx5IHRoZXJlIHdpbGwgYmUgMCB0byAxIGJ1dCB0aGUgcm91dGVyIGFsbG93cyBtdWx0aXBsZXMsIG9uZSBwZXIgY29udGFpbmVyLlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gW107XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHIgb2Ygcm91dGVDb3B5KSB7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSB0aGlzLl9zZWFyY2hSb3V0ZXMocm91dGUsIHIucm91dGUsIHJvdXRlQ29weSk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goc2VhcmNoUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVzLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSb3V0ZSAke3JvdXRlfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHBhcmFtZXRlcnMgYXJlIGZvdW5kIGluIG11bHRpcGxlIHJvdXRlcywgdGhlIHBhcmFtcyBhcmUgbWVyZ2VkLCBidXQgT05MWSBUSEUgRklSU1QgdmFsdWUgZm9yIGFueSBwYXJhbSBpcyBrZXB0XG4gICAgICAgIC8vIFBhcmFtcyB3aWxsIGJlIHN0b3JlZCBpbiBhIGdsb2JhbCBjb2xsZWN0aW9uLiBJJ20gbm90IGdvaW5nIHRvIHNwbGl0IHRoZW0gdXAgYW5kIG1ha2UgdGhlIHByb2dyYW1tZXIgaHVudCBmb3IgdGhlbS5cbiAgICAgICAgY29uc3QgbWVyZ2VkID0gbmV3IE1hcCgpO1xuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcGFyYW1zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHAuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtZXJnZWQuaGFzKGVudHJ5WzBdKSkge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWQuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qIFN0YXJ0IHdyaXRpbmcgZGF0YSAqL1xuICAgICAgICB0aGlzLl9tYXRjaGVkUm91dGUgPSB7IHJvdXRlOiByb3V0ZSwgcGFyYW1zOiBtZXJnZWQgfTtcbiAgICAgICAgLy8gQWRkIHJvdXRlIHRvIGhpc3RvcnkgaWYgaXQncyBkaWZmZXJlbnQgZnJvbSB0aGUgcHJldmlvdXMgbGF0ZXN0IGhpc3RvcnlcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPT09IDAgfHwgdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggLSAxXSAhPT0gcm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChyb3V0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiB0aGlzLmhpc3RvcnlNYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3Rvcnkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByY0Nsb25lID0gdGhpcy5fcm91dGVDb250YWluZXJzLnNsaWNlKDApO1xuICAgICAgICAvLyBBbnkgY29udGFpbmVycyBmcm9tIHRoZSBwcmV2aW91cyBpdGVyYXRpb24gdGhhdCBhcmUgbm90IG1hdGNoZWQgaW4gdGhpcyBvbmUgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgICAgLy8gT25seSBrZWVwIG9uZXMgd2hlcmUgdGhlIHN0YXRpY1JvdXRlckNvbnRhaW5lciBmbGFnIGlzIHNldFxuICAgICAgICBmb3IgKGNvbnN0IHByZXYgb2YgcmNDbG9uZVxuICAgICAgICAgICAgLmZpbHRlcihyYyA9PiAhbWF0Y2hlcy5maW5kKG0gPT4gbS5yb3V0ZSA9PT0gcmMucm91dGUpIHx8ICFyYy5yb3V0ZS5zdGF0aWNSb3V0ZXJDb250YWluZXIpKSB7XG4gICAgICAgICAgICBpZiAocHJldi5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBwcmV2LmNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcmNDbG9uZS5maW5kSW5kZXgoZiA9PiBmID09PSBwcmV2KTtcbiAgICAgICAgICAgIHJjQ2xvbmUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgcm91dGUgY29udGFpbmVycyB0aGF0IGFyZW4ndCBzdGlsbCB0aGVyZSBmcm9tIHRoZSBsYXN0IGl0ZXJhdGlvblxuICAgICAgICByY0Nsb25lLnB1c2goLi4ubWF0Y2hlc1xuICAgICAgICAgICAgLmZpbHRlcihtID0+ICFyY0Nsb25lLmZpbmQocmMgPT4gcmMucm91dGUgPT09IG0ucm91dGUpKSk7XG4gICAgICAgIC8vIFRoZSBjb250YWluZXJzIG5lZWQgdG8gYmUgaW4gb3JkZXIgb2YgbWF0Y2hlcywgYnV0IHByZXZpb3VzIGl0ZXJhdGlvbnMgYXJlIHRoZXJlIGVhcmxpZXIuXG4gICAgICAgIC8vIFRoaXMgaXMgdG9vIHdlaXJkIHRvIHdvcmsgaW4gdGhlIHNvcnQgY29tbWFuZCwgYWZhaWtcbiAgICAgICAgY29uc3Qgc291cmNlID0gcmNDbG9uZS5zbGljZSgwKTtcbiAgICAgICAgY29uc3Qgc29ydGVkVGFyZ2V0ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgciA9IHNvdXJjZS5maW5kKHEgPT4gcS5yb3V0ZSA9PT0gbWF0Y2gucm91dGUpO1xuICAgICAgICAgICAgaWYgKCFyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIb3cgZGlkIGEgcm91dGUgbm90IGdldCBhZGRlZCB0byByb3V0ZUNvbnRhaW5lcnM/Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3J0ZWRUYXJnZXQucHVzaChyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yb3V0ZUNvbnRhaW5lcnMgPSBzb3J0ZWRUYXJnZXQ7XG4gICAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgICAgICAgICAgbGV0IHJvdXRlR3VhcmRzID0gW107XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRjaC5yb3V0ZS5yb3V0ZUd1YXJkcykpIHtcbiAgICAgICAgICAgICAgICByb3V0ZUd1YXJkcyA9IG1hdGNoLnJvdXRlLnJvdXRlR3VhcmRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2gucm91dGUucm91dGVHdWFyZHMpIHtcbiAgICAgICAgICAgICAgICByb3V0ZUd1YXJkcy5wdXNoKG1hdGNoLnJvdXRlLnJvdXRlR3VhcmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qgcmcgb2Ygcm91dGVHdWFyZHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gcmcuY2hlY2tWYWxpZChtYXRjaC5yb3V0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRlc3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUm91dGUgcGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyUm91dGUobWF0Y2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBiYWNrKCkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpc24ndCBhbnkgaGlzdG9yeSB0byBnbyBiYWNrIHRvLCBkb24ndCBnbyBiYWNrLlxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oaXN0b3J5LnBvcCgpOyAvLyBDdXJyZW50IHJvdXRlIHNpdHMgYXQgdGhlIHRvcCBvZiB0aGUgc3RhY2tcbiAgICAgICAgY29uc3Qgcm91dGUgPSB0aGlzLl9oaXN0b3J5LnBvcCgpOyAvLyBwcmV2aW91cyByb3V0ZVxuICAgICAgICBpZiAocm91dGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZShyb3V0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHR1cm5PblVybFJvdXRpbmcoKSB7XG4gICAgICAgIHRoaXMuX2hhc2hDaGFuZ2UgPSAoZXZ0KSA9PiB7IHRoaXMucm91dGUoKTsgfTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLl9oYXNoQ2hhbmdlKTtcbiAgICB9XG4gICAgc3RhdGljIF9zZWFyY2hSb3V0ZXModXJsLCByb3V0ZSwgcm91dGVzVG9TZWFyY2gpIHtcbiAgICAgICAgbGV0IHNlYXJjaCA9IFtdO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyb3V0ZS5yb3V0ZSkpIHtcbiAgICAgICAgICAgIHNlYXJjaCA9IHJvdXRlLnJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoID0gW3JvdXRlLnJvdXRlXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWFyY2ggdGhlIHJvdXRlIHN0cmluZ3MgYW5kIGlmIHlvdSBmaW5kIG9uZSwgcmV0dXJuIHRoZSBtYXRjaC5cbiAgICAgICAgLy8gTm90ZSB0aGF0IGlmIHlvdSBoYXZlIG11bHRpcGxlIHJvdXRlcyBpbiB0aGUgYXJyYXksIHdpdGggZGlmZmVyZW50IHBhcmFtcywgdGhlIHJlc3VsdHMgd2lsbCBiZSBvbmx5IHRoZSBmaXJzdC5cbiAgICAgICAgLy8gU2VyaW91c2x5LCBkb24ndCBkbyB0aGF0LiBBdCBsZWFzdCBvbmUgb2YgdGhvc2Ugcm91dGVzIGlzIGdpYmJlcmlzaC5cbiAgICAgICAgZm9yIChjb25zdCBzY2ggb2Ygc2VhcmNoKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaFJlc3VsdCA9IHRoaXMuX3Rlc3RSb3V0ZShzY2gsIHVybCB8fCAnJyk7XG4gICAgICAgICAgICBpZiAobWF0Y2hSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcm91dGUgaGFzIGNoaWxkcmVuLCB0aGVuIGFkZCB0aGVtIHRvIHRoZSBlbmQgb2YgdGhlIG1hdGNoIGxpc3QgdG8gYmUgdGVzdGVkXG4gICAgICAgICAgICAgICAgLy8gVGhpcyB3b3JrcyBiZWNhdXNlIEpTIGlzIHBlcmZlY3RseSBPSyB3aXRoIG1vZGlmeWluZyBhbiBhcnJheSB0aGF0IHlvdSBhcmUgaXRlcmF0aW5nLCB1bmxpa2UgQyNcbiAgICAgICAgICAgICAgICBpZiAocm91dGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiByb3V0ZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVzVG9TZWFyY2gucHVzaCh7IHJvdXRlOiBjaGlsZCwgcGFyZW50OiByb3V0ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzdGF0aWMgX3Rlc3RSb3V0ZShyb3V0ZVN0cmluZywgdXJsU3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKCFyb3V0ZVN0cmluZyB8fCAhdXJsU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVTdHJpbmcgPSByb3V0ZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAocm91dGVTdHJpbmcuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgcm91dGVTdHJpbmcgPSByb3V0ZVN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybFN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlQXJyYXkgPSByb3V0ZVN0cmluZy5zcGxpdCgnLycpO1xuICAgICAgICBjb25zdCB1cmxBcnJheSA9IHVybFN0cmluZy5zcGxpdCgnLycpO1xuICAgICAgICAvLyBJZiByb3V0ZSBlbmRzIGluICosIGRvbid0IGNoZWNrIGFueXRoaW5nIGZ1cnRoZXIgdGhhbiB0aGF0IGluIHRoZSBVUkxcbiAgICAgICAgaWYgKHJvdXRlQXJyYXlbcm91dGVBcnJheS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgICAgICAgICByb3V0ZUFycmF5Lmxlbmd0aC0tO1xuICAgICAgICAgICAgaWYgKHJvdXRlQXJyYXkubGVuZ3RoIDw9IHVybEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHVybEFycmF5Lmxlbmd0aCA9IHJvdXRlQXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFNhbWUgbnVtYmVyIG9mIC8gY2hhcmFjdGVycyByZXF1aXJlZC5cbiAgICAgICAgaWYgKHJvdXRlQXJyYXkubGVuZ3RoICE9PSB1cmxBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtyb3V0ZVNlZ21lbnQsIHVybFNlZ21lbnRdIG9mIEFycmF5VXRpbGl0aWVzXzEuemlwKHJvdXRlQXJyYXksIHVybEFycmF5KSkge1xuICAgICAgICAgICAgLy8gUGFyYW1ldGVycyBhcmUgYWxsb3dlZC4gT3B0aW9uYWwgcGFyYW1ldGVycyBhcmUgbm90LlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiBmb3Igbm8gb3B0aW9uYWwgcGFyYW1ldGVycyBpcyB0aGF0IGZpbmRpbmcgYSBtYXRjaCBiZXR3ZWVuIC9hLzo/cGFyYW0vYiBhbmQgL2EvYiBpcyB0b28gY29tcGxleC5cbiAgICAgICAgICAgIC8vIElzICdiJyBhIHBhcmFtIHZhbHVlIG9yIHBhcnQgb2YgdGhlIHJvdXRlLiBCYXNpY2FsbHksIG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSByb3V0ZSBlbmQuXG4gICAgICAgICAgICAvLyBJIG5vdGljZWQgdGhhdCBBU1AuTkVUIHdvcmtzIHRoYXQgd2F5LCBhbmQgSSBmb3VuZCBpdCBjb25mdXNpbmcgdGhhdCBvcHRpb25hbCBwYXJhbWV0ZXJzIG9ubHkgd29yayBhdCB0aGUgZW5kLlxuICAgICAgICAgICAgLy8gSnVzdCBjcmVhdGUgYSBuZXcgcm91dGUgd2l0aCB0aGUgb3B0aW9uYWwgcGFyYW0gbGVmdCBvdXQuXG4gICAgICAgICAgICBpZiAocm91dGVTZWdtZW50LnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzKHVybFNlZ21lbnQuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgJHtyb3V0ZVN0cmluZ30gY29udGFpbnMgZHVwbGljYXRlcyBvZiB0aGUgc2FtZSBwYXJhbWV0ZXIuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQocm91dGVTZWdtZW50LnNsaWNlKDEpLCB1cmxTZWdtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlU2VnbWVudCAhPT0gJyonICYmIHJvdXRlU2VnbWVudCAhPT0gdXJsU2VnbWVudC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVuZGVyUm91dGUoeyByb3V0ZSwgcGFyZW50IH0pIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fcHJlcGFyZVJvdXRlckNvbnRhaW5lcihyb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlldztcbiAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChyb3V0ZS5wYXlsb2FkKSkge1xuICAgICAgICAgICAgdmlldyA9IG5ldyByb3V0ZS5wYXlsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm91dGUucGF5bG9hZCkge1xuICAgICAgICAgICAgdmlldyA9IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhIHZpZXcgd2FzIHJldHVybmVkXG4gICAgICAgIGlmICh2aWV3ICYmIHZpZXdUeXBlR3VhcmQodmlldykpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWV3LmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWV3KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2aWV3VHlwZUd1YXJkKHRlc3QpIHtcbiAgICAgICAgICAgIGlmIChcImNvbnRlbnRcIiBpbiB0ZXN0ICYmIHRlc3QuY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZW5kZXJOb3RGb3VuZCgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoJ25vdC1mb3VuZCcsIHsgaWQ6ICdub3QtZm91bmQnIH0pO1xuICAgICAgICBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50KGRvY3VtZW50LmJvZHkpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlubmVySFRNTDogdGhpcy5fbm90Rm91bmQgfHwgXCJRdW90aCB0aGUgUmF2ZW4sIDQwNFwiIH0pKTtcbiAgICB9XG4gICAgc3RhdGljIF9wcmVwYXJlUm91dGVyQ29udGFpbmVyKHJvdXRlLCBwYXJlbnRSb3V0ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX21hdGNoZWRSb3V0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZ0Vycm9yOiBfcHJlcGFyZVJvdXRlckNvbnRhaW5lciBjYWxsZWQgb3V0IG9mIG9yZGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIExvb2sgZm9yIHRoZSByb3V0ZSBjb250YWluZXIgZm9yIHRoZSByb3V0ZS4gSWYgaXQgZXhpc3RzLCBleGl0IGRvaW5nIG5vdGhpbmcuIFdlJ2xsIGtlZXAgaXQuXG4gICAgICAgIGNvbnN0IHJvdXRlQ29udGFpbmVyID0gdGhpcy5fcm91dGVDb250YWluZXJzLmZpbmQoZiA9PiBmLnJvdXRlID09PSByb3V0ZSk7XG4gICAgICAgIGlmICghcm91dGVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlByb2dyYW1taW5nRXJyb3I6IEZvcmdvdCB0byBhZGQgcm91dGVzIHRvIHJvdXRlIGNvbnRhaW5lcnMuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXJlbnQ7XG4gICAgICAgIC8vIFNlZSBpZiB0aGlzIHJvdXRlIGhhcyBhIHBhcmVudCB0aGF0IGlzIG9uIHRoZSBwYWdlXG4gICAgICAgIHBhcmVudCA9IEVsdmlzXzEuZV8odGhpcy5fcm91dGVDb250YWluZXJzLmZpbmQocSA9PiBxLnJvdXRlID09PSBwYXJlbnRSb3V0ZSkpLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKHBhcmVudCAmJiAhZG9jdW1lbnQuYm9keS5jb250YWlucyhwYXJlbnQpKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIHJvdXRlIGhhcyBhIGNvbnRhaW5lciwgdGhhdCBjb250YWluZXIgZXhpc3RzIGluIHRoZSBkb20sIGFuZCB0aGUgc3RhdGljUm91dGVyQ29udGFpbmVyIHNldHRpbmcgaXMgdHJ1ZSwgZXhpdFxuICAgICAgICBpZiAocm91dGUuc3RhdGljUm91dGVyQ29udGFpbmVyICYmIHJvdXRlQ29udGFpbmVyLmNvbnRhaW5lciAmJiAocGFyZW50IHx8IGRvY3VtZW50LmJvZHkpLmNvbnRhaW5zKHJvdXRlQ29udGFpbmVyLmNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250YWluZXJJZCA9IEVsdmlzXzEuZV8ocm91dGUpLnJvdXRlQ29udGFpbmVyIHx8ICdjaGlsZC1jb250YWluZXInO1xuICAgICAgICAvLyBJZiB0aGUgcGFyZW50IGNvbnRhaW5lciBkb2Vzbid0IGV4aXN0IGluIHRoZSBkb20sIGFkZCB0byB0aGUgYm9keS5cbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgIWRvY3VtZW50LmJvZHkuY29udGFpbnMocGFyZW50KSkge1xuICAgICAgICAgICAgLy8gSSB3b3VsZCB0aGluayB0aGVyZSdzIGFsd2F5cyBhIGJvZHkgZWxlbWVudCwgYnV0IHR5cGVzY3JpcHQgc2VlbXMgdG8gdGhpbmsgaXQgY291bGQgYmUgdW5kZWZpbmVkXG4gICAgICAgICAgICAvLyBUaGlzIGRpZG4ndCBhY3R1YWxseSBmaXggdGhlIFRTIGVycm9yLCB0aG91Z2guXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHRoaXMuX3JvdXRlQ29udGFpbmVycy5maW5kSW5kZXgocSA9PiBxLnJvdXRlID09PSByb3V0ZSk7XG4gICAgICAgIGlmICh0aGlzLl9yb3V0ZUNvbnRhaW5lcnNcbiAgICAgICAgICAgIC5zbGljZSgwLCBjdXJyZW50SW5kZXgpIC8vIE9ubHkgY2hlY2sgZWFybGllciBjb250YWluZXJzXG4gICAgICAgICAgICAuZmluZChxID0+ICEhcS5jb250YWluZXJcbiAgICAgICAgICAgICYmIHEuY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gY29udGFpbmVySWQudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgJiYgISFwYXJlbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJJZCkpKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJvdXRlOiBbJHtyb3V0ZS5yb3V0ZX1dLiBDb250YWluZXIgWyR7Y29udGFpbmVySWR9XSBhZGRlZCB0byBET00gYnkgYW5vdGhlciByb3V0ZS4gU2tpcHBpbmcuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3Um91dGVyID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoY29udGFpbmVySWQpOyAvKiB7IGlkOiBjb250YWluZXJJZCB9ICovXG4gICAgICAgIGNvbnN0IG9sZFJvdXRlciA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcklkKTtcbiAgICAgICAgaWYgKG9sZFJvdXRlcikge1xuICAgICAgICAgICAgKG9sZFJvdXRlci5wYXJlbnRFbGVtZW50IHx8IHBhcmVudCkucmVwbGFjZUNoaWxkKG5ld1JvdXRlciwgb2xkUm91dGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdSb3V0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcm91dGUgY29udGFpbmVyIHJlY29yZCB3aXRoIHRoZSByb3V0aW5nIGNvbnRhaW5lciB3ZSBjcmVhdGVkLlxuICAgICAgICByb3V0ZUNvbnRhaW5lci5jb250YWluZXIgPSBuZXdSb3V0ZXI7XG4gICAgICAgIHJldHVybiBuZXdSb3V0ZXI7XG4gICAgfVxufVxuQWR2YW5jZWRQYWdlUm91dGVyLl9yb3V0ZXMgPSBbXTtcbkFkdmFuY2VkUGFnZVJvdXRlci5faGlzdG9yeSA9IFtdO1xuQWR2YW5jZWRQYWdlUm91dGVyLl9oaXN0b3J5TWF4TGVuZ3RoID0gNTA7XG5BZHZhbmNlZFBhZ2VSb3V0ZXIuX3JvdXRlQ29udGFpbmVycyA9IFtdO1xuZXhwb3J0cy5BZHZhbmNlZFBhZ2VSb3V0ZXIgPSBBZHZhbmNlZFBhZ2VSb3V0ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBEZWxldGVOb2RlQ29udGVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRGVsZXRlTm9kZUNvbnRlbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IENvbnN0cnVjdGFibGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZVwiKTtcbmNvbnN0IEtleXdvcmRBcmd1bWVudHNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBJZiB5b3UgY2xpY2sgYSBsaW5rIGluIGEgcmVhbCB3ZWIgc2l0ZSwgdGhlIGJyb3dzZXIgYXNrcyB0aGUgc2VydmVyIGZvciBhIHBhZ2UgYW5kIGl0IHJvdXRlcyB5b3UgdG8gdGhlIHJlbGV2YW50XG4gKiBwYWdlLiBCdXQgaWYgeW91IGhhdmUgYSBzaW5nbGUgcGFnZSBhcHAgcnVubmluZyBvbiBhIGZpbGUsIHdpdGggbm8gd2ViIHNlcnZlciwgbGlrZSB0aGUgb25lIHRoaXMgZnJhbWV3b3JrXG4gKiB3YXMgYnVpbHQgZm9yLCB5b3UgbmVlZCBzb21ldGhpbmcgdG8gc2ltdWxhdGUgdGhhdC5cbiAqXG4gKiBUaGlzIGNsYXNzIGNsZWFycyB0aGUgcm91dGUgY29udGFpbmVyLCB3aGljaCBpcyBleHBlY3RlZCB0byBiZSBhIHN0YXRpYyBjb250YWluZXIgaW4gdGhlIHdyYXBwZXIgSFRNTCBwYWdlLCBvciB0aGUgYm9keS5cbiAqIFdoZW4geW91IGdpdmUgaXQgdGhlIHJlbGV2YW50IHJvdXRlLCBpdCBleGVjdXRlcyB0aGUgY2FsbGJhY2sgb3IgcmV0dXJucyB0aGUgdmlldy9IVE1MIGVsZW1lbnQgeW91IGRlZmluZWQgZm9yIHRoZSByb3V0ZSxcbiAqIGFuZCBzdGlja3MgaXQgaW5zaWRlIHRoZSBjb250YWluZXIuIFRoZSBlbGVtZW50IHJldHVybmVkIGNhbiBiZSB3cmFwcGVkIGluIGEgbGF5b3V0IHZpZXcsIGxpa2UgaW4gQVNQLk5ldC5cbiAqXG4gKiBUaGlzIGlzIGEgc2ltcGxlIHZlcnNpb24sIHdpdGhvdXQgdGhlIHJlY3Vyc2l2ZSByb3V0ZXMgZm91bmQgaW4gdGhlIGFkdmFuY2VkIHJvdXRlci4gSXQgd2FzIGJhc2VkIG1vcmUgb24gQVNQLk5ldCBvciBub2RlLmpzXG4gKiByb3V0aW5nLCB3aGVyZSB5b3UgaGF2ZSBhIGZsYXQgc2V0IG9mIHJvdXRlcyBhbmQgb25jZSB5b3UgZmluZCBhIHJvdXRlLCB5b3UncmUgZG9uZS5cbiAqL1xuY2xhc3MgUGFnZVJvdXRlciB7XG4gICAgc3RhdGljIGdldCBhbGxSb3V0ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgbWF0Y2hlZFJvdXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF0Y2hlZFJvdXRlIHx8IHsgcm91dGU6ICcnLCBwYXJhbXM6IG5ldyBNYXAoKSwgY29uZmlnOiB7IHJvdXRlOiAnJyB9IH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVkUm91dGUucGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnlNYXhMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5TWF4TGVuZ3RoO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGhpc3RvcnlNYXhMZW5ndGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hpc3RvcnkubGVuZ3RoID4gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkubGVuZ3RoID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeU1heExlbmd0aCA9IHZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IG5vdEZvdW5kKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX25vdEZvdW5kID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgbXVzdCBiZSBjYWxsZWQgZmlyc3QgYmVmb3JlIHVzaW5nIGl0LCBiZWNhdXNlIEpTIGRvZXNuJ3QgaGF2ZSBzdGF0aWMgY29uc3RydWN0b3JzIGxpa2UgQyMuIEl0IHNldHMgdXAgdGhlXG4gICAgICogcm91dGUgY29udGFpbmVyLCBjdXN0b20gZWxlbWVudHMsIGFuZCBhbHNvIGFsbG93cyBvbmUtc3RlcCBjb25maWd1cmF0aW9uIG9mIHNldmVyYWwgb3RoZXIgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEFjY2VwdHMgS2V5d29yZCBBcmd1bWVudHMuXG4gICAgICovXG4gICAgc3RhdGljIGNvbmZpZ3VyZShyb3V0ZXMgPSBbXSwgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgPSB0cnVlKSB7XG4gICAgICAgICh7IHJvdXRlcywgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgPSB0cnVlIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgcm91dGVzLCBkZWZhdWx0TGF5b3V0LCBkZWZhdWx0U3RhdGljTGF5b3V0LCBub3RGb3VuZCwgZGVmYXVsdFJvdXRlLCB1cmxSb3V0aW5nRW5hYmxlZCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICB0aGlzLl9jb25maWd1cmVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG5vdEZvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9ub3RGb3VuZCA9IG5vdEZvdW5kO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBydGUubGF5b3V0ID0gcnRlLmxheW91dCB8fCBkZWZhdWx0TGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZShkZWZhdWx0U3RhdGljTGF5b3V0KSAmJiBOb25lVHlwZV8xLmlzTm9uZShydGUuc3RhdGljTGF5b3V0KSkge1xuICAgICAgICAgICAgICAgIHJ0ZS5zdGF0aWNMYXlvdXQgPSBkZWZhdWx0U3RhdGljTGF5b3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRSb3V0ZShydGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmxSb3V0aW5nRW5hYmxlZCkge1xuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCwgYWxsb3dzIGdvaW5nIHRvIGEgbmV3IHBhZ2UgYnkgY2hhbmdpbmcgdGhlIFVSTCBpbnN0ZWFkIG9mIGhhdmluZyB0byBpc3N1ZSByb3V0ZSgpIGNvbW1hbmRzLlxuICAgICAgICAgICAgdGhpcy50dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3V0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3BhZ2Utcm91dGVyJykgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgncGFnZS1yb3V0ZXInKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3BhZ2Utcm91dGVyJywgRGl2UGFnZSwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbGF5b3V0LWJvZHknKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2xheW91dC1ib2R5JywgRGl2TGF5b3V0LCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdub3QtZm91bmQnKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ25vdC1mb3VuZCcsIERpdk5vdEZvdW5kLCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGN1c3RvbUVsZW1lbnRzIGlzbid0IG9mZmljaWFsbHkgcGFydCBvZiBhbiBFUyB2ZXJzaW9uIHlldCBzbyB3b24ndCB3b3JrIGV2ZW4gaW4gc29tZSByZWNlbnQtaXNoIGJyb3dzZXJzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRSb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0Um91dGUoZGVmYXVsdFJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBOb3RlOiB0aGVyZSBpcyBubyByZW1vdmVSb3V0ZS4gVGhlcmUgY291bGQgYmUsIGJ1dCBpdCdzIG5ldmVyIG5lZWRlZC5cbiAgICBzdGF0aWMgYWRkUm91dGUocm91dGUpIHtcbiAgICAgICAgbGV0IHJvdXRlcztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocm91dGUucm91dGUpKSB7XG4gICAgICAgICAgICByb3V0ZXMgPSByb3V0ZS5yb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJvdXRlcyA9IFtyb3V0ZS5yb3V0ZV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydGUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm91dGVzLmZpbmQocSA9PiBxLnJvdXRlID09PSBydGUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGUgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdG1wID0gT2JqZWN0LmFzc2lnbih7fSwgcm91dGUpO1xuICAgICAgICAgICAgdG1wLnJvdXRlID0gcnRlO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLnB1c2godG1wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBsaW5rZWQgdG8gYSBwYXJ0aWN1bGFyIHBhZ2UgKG9uIHRoZSBoYXNoKSwgZ28gdG8gaXQuIEVsc2UsIGdvIHRvIHRoZSByb3V0ZSBzcGVjaWZpZWQuXG4gICAgICovXG4gICAgc3RhdGljIGRlZmF1bHRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICAgIFBhZ2VSb3V0ZXIucm91dGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFBhZ2VSb3V0ZXIucm91dGUocm91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyByb3V0ZShyb3V0ZSwgdXBkYXRlVXJsID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbmZpZ3VyZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFnZVJvdXRlciBub3QgY29uZmlndXJlZC4gQ2FsbCBjb25maWd1cmUoKSBmaXJzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgICAvLyBBbGxvdyBhY3R1YWwgbGlua3MgdmlhIHRoZSBoYXNoLiBIYXNoIGxpbmtzIGRvbid0IGZvcmNlIGEgcGFnZSByZWxvYWQgYW5kIHRoZXkgd29yayB3L28gYSB3ZWIgc2VydmVyLlxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgaGF2aW5nIHRvIGNhbGwgcm91dGUoKSBtYW51YWxseSwgeW91IG11c3QgY2FsbCB0dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgICAgICByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSBwcm9ibGVtLCB3aGljaCBpcyB0aGF0IHNldHRpbmcgdGhlIGhhc2ggd2lsbCB0cmlnZ2VyIEFOT1RIRVIgcm91dGUgY2hhaW5nZSB2aWEgdGhlIGhhc2hjaGFuZ2Ugb3BlcmF0aW9uLlxuICAgICAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGhhc2ggY2hhbmdlIGFuZCB0aGVuIHJlc3RvcmluZyBpdCBsYXRlciBkb2VzIG5vdGhpbmcuIEl0J3Mgc3RpbGwgdHJpZ2dlcmVkLlxuICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlcyBoYWNrd29yay4gRXZlbiB0aGUgc2ltcGxlIHJvdXRlciBoYXMgbW9yZSBoYWNrcyB0aGFuIEkgbGlrZS5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgd2FzIHRyaWdnZXJlZCBieSBhIGhhc2ggY2hhbmdlIGFuZCB0aGUgcm91dGUgaXMgdGhlIHNhbWUsIHRoZW4gZG9uJ3QgZG8gYW55dGhpbmcuXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgbGFzdCByb3V0ZSBzbyB0aGF0IGl0IGRvZXNuJ3QgaW50ZXJmZXJlIHdpdGggdGhlIG5leHQgaGFzaCBjaGFuZ2UuXG4gICAgICAgICAgICBpZiAocm91dGUgPT09IHRoaXMuX2xhc3RSb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXBkYXRlVXJsKSB7XG4gICAgICAgICAgICAvLyBJZiBhIHJvdXRlIGlzIHNlbnQgaW4sIHRoZW4gc2V0IHRoZSBoYXNoLlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICBsZXQgc2VhcmNoUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHRoaXMuX3JvdXRlcykge1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0ID0gdGhpcy5fdGVzdFJvdXRlKHJ0ZS5yb3V0ZSwgcm91dGUgfHwgJycpO1xuICAgICAgICAgICAgaWYgKHNlYXJjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcnRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUm91dGUgJHtyb3V0ZX0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyTm90Rm91bmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2aW91c1JvdXRlID0gKHRoaXMuX21hdGNoZWRSb3V0ZSB8fCB7fSkuY29uZmlnO1xuICAgICAgICB0aGlzLl9tYXRjaGVkUm91dGUgPSB7IHJvdXRlLCBwYXJhbXM6IHNlYXJjaFJlc3VsdCB8fCBuZXcgTWFwKCksIGNvbmZpZzogbWF0Y2ggfTtcbiAgICAgICAgLy8gQWRkIHJvdXRlIHRvIGhpc3RvcnkgaWYgaXQncyBkaWZmZXJlbnQgZnJvbSB0aGUgcHJldmlvdXMgbGF0ZXN0IGhpc3RvcnlcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPT09IDAgfHwgdGhpcy5oaXN0b3J5W3RoaXMuaGlzdG9yeS5sZW5ndGggLSAxXSAhPT0gcm91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChyb3V0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiB0aGlzLmhpc3RvcnlNYXhMZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3Rvcnkuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcm91dGVHdWFyZHMgPSBbXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2gucm91dGVHdWFyZHMpKSB7XG4gICAgICAgICAgICByb3V0ZUd1YXJkcyA9IG1hdGNoLnJvdXRlR3VhcmRzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hdGNoLnJvdXRlR3VhcmRzKSB7XG4gICAgICAgICAgICByb3V0ZUd1YXJkcy5wdXNoKG1hdGNoLnJvdXRlR3VhcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJnIG9mIHJvdXRlR3VhcmRzKSB7XG4gICAgICAgICAgICBjb25zdCB0ZXN0ID0gcmcuY2hlY2tWYWxpZChtYXRjaCk7XG4gICAgICAgICAgICBpZiAodGVzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUm91dGUgcGVybWlzc2lvbiBkZW5pZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyUm91dGUobWF0Y2gsIHByZXZpb3VzUm91dGUpO1xuICAgIH1cbiAgICBzdGF0aWMgYmFjaygpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXNuJ3QgYW55IGhpc3RvcnkgdG8gZ28gYmFjayB0bywgZG9uJ3QgZ28gYmFjay5cbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeS5wb3AoKTsgLy8gQ3VycmVudCByb3V0ZSBzaXRzIGF0IHRoZSB0b3Agb2YgdGhlIHN0YWNrXG4gICAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy5faGlzdG9yeS5wb3AoKTsgLy8gcHJldmlvdXMgcm91dGVcbiAgICAgICAgaWYgKHJvdXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGUocm91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyB0dXJuT25VcmxSb3V0aW5nKCkge1xuICAgICAgICB0aGlzLl9oYXNoQ2hhbmdlID0gKGV2dCkgPT4geyB0aGlzLnJvdXRlKCk7IH07XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5faGFzaENoYW5nZSk7XG4gICAgfVxuICAgIHN0YXRpYyBfdGVzdFJvdXRlKHJvdXRlU3RyaW5nLCB1cmxTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAoIXJvdXRlU3RyaW5nIHx8ICF1cmxTdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChyb3V0ZVN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsU3RyaW5nLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHVybFN0cmluZyA9IHVybFN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGVBcnJheSA9IHJvdXRlU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIGNvbnN0IHVybEFycmF5ID0gdXJsU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIC8vIFNhbWUgbnVtYmVyIG9mIC8gY2hhcmFjdGVycyByZXF1aXJlZC5cbiAgICAgICAgaWYgKHJvdXRlQXJyYXkubGVuZ3RoICE9PSB1cmxBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IFtyb3V0ZVNlZ21lbnQsIHVybFNlZ21lbnRdIG9mIEFycmF5VXRpbGl0aWVzXzEuemlwKHJvdXRlQXJyYXksIHVybEFycmF5KSkge1xuICAgICAgICAgICAgLy8gUGFyYW1ldGVycyBhcmUgYWxsb3dlZC4gT3B0aW9uYWwgcGFyYW1ldGVycyBhcmUgbm90LlxuICAgICAgICAgICAgLy8gVGhlIHJlYXNvbiBmb3Igbm8gb3B0aW9uYWwgcGFyYW1ldGVycyBpcyB0aGF0IGZpbmRpbmcgYSBtYXRjaCBiZXR3ZWVuIC9hLzo/cGFyYW0vYiBhbmQgL2EvYiBpcyB0b28gY29tcGxleC5cbiAgICAgICAgICAgIC8vIElzICdiJyBhIHBhcmFtIHZhbHVlIG9yIHBhcnQgb2YgdGhlIHJvdXRlLiBCYXNpY2FsbHksIG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSByb3V0ZSBlbmQuXG4gICAgICAgICAgICAvLyBJIG5vdGljZWQgdGhhdCBBU1AuTkVUIHdvcmtzIHRoYXQgd2F5IGFuZCBJIGZvdW5kIGl0IGNvbmZ1c2luZyB0aGF0IG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAvLyBKdXN0IGNyZWF0ZSBhIG5ldyByb3V0ZSB3aXRoIHRoZSBvcHRpb25hbCBwYXJhbSBsZWZ0IG91dC5cbiAgICAgICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSByb3V0ZVNlZ21lbnQuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lLmluY2x1ZGVzKCc9JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgJHtyb3V0ZVN0cmluZ30gY29udGFpbnMgZHVwbGljYXRlcyBvZiB0aGUgc2FtZSBwYXJhbWV0ZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldChuYW1lLCB1cmxTZWdtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgbWFwcGVkIHN0YXRpYyBwYXJhbSBjYXNlLlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBuYW1lLnNwbGl0KCc9JylbMV07XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KCc9JylbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT09IHVybFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSb3V0ZSAke3JvdXRlU3RyaW5nfSBjb250YWlucyBkdXBsaWNhdGVzIG9mIHRoZSBzYW1lIHBhcmFtZXRlci5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc2V0KG5hbWUsIHVybFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlU2VnbWVudCAhPT0gdXJsU2VnbWVudC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVuZGVyUm91dGUocm91dGUsIHByZXZpb3VzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgUGFnZVJvdXRlci5yb3V0ZSgndGhlIHNhbWUgdXJsJykgd2lsbCByZWxvYWQgdGhlIGNvbnRlbnRzIGZyb20gc2NyYXRjaC5cbiAgICAgICAgLy8gQWRqdXN0aW5nIHdpbmRvdy5sb2NhdGlvbiB3aWxsIGRvIG5vdGhpbmcgaWYgdGhlIHJvdXRlIGlzIHRoZSBzYW1lLlxuICAgICAgICAvLyBJIHRoaW5rIHRoaXMgaXMgZmluZSwgYWZ0ZXIgc3RydWdnbGluZyBpbiBhbmd1bGFyIHRvIHJlbG9hZCB0aGUgcGFnZSBhbmQgZmluZGluZ1xuICAgICAgICAvLyBpdCBtdWNoIGhhcmRlci5cbiAgICAgICAgLy8gTm90ZSBpZiB5b3UgY2hhbmdlIHRoZSBsb2NhdGlvbiBiYXIsIENocm9tZSBmb3JjZXMgYSByZWxvYWQgb2YgUHJvZ3JhbS50cywgbm90aGluZyB5b3UgY2FuIGRvXG4gICAgICAgIC8vIGFib3V0IGl0IGJlY2F1c2UgQ2hyb21lIGlzIHRoZSBvbmUgdGhhdCBkaXNjYXJkZWQgeW91ciBzdGF0ZS5cbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IHRoaXMucm91dGVDb250YWluZXI7XG4gICAgICAgIGNvbnN0IGtlZXBMYXlvdXQgPSByb3V0ZS5sYXlvdXQgJiYgcHJldmlvdXMgJiYgcm91dGUuc3RhdGljTGF5b3V0ICYmIHJvdXRlLmxheW91dCA9PT0gcHJldmlvdXMubGF5b3V0O1xuICAgICAgICBpZiAoIWtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjb250ZW50cyBvZiBwYWdlLXJvdXRlclxuICAgICAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYXlvdXQtYm9keScpO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxsYXlvdXQtYm9keT4gZWxlbWVudCBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5sYXlvdXQpIHtcbiAgICAgICAgICAgIGxldCBsYXlvdXRWaWV3O1xuICAgICAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChyb3V0ZS5sYXlvdXQpKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0VmlldyA9IG5ldyByb3V0ZS5sYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJvdXRlLnBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRWaWV3ID0gcm91dGUubGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5b3V0VmlldyAmJiB2aWV3VHlwZUd1YXJkKGxheW91dFZpZXcpKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxheW91dFZpZXcuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsYXlvdXRWaWV3KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxheW91dFZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGF5b3V0LWJvZHknKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8bGF5b3V0LWJvZHk+IGVsZW1lbnQgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBjb250ZW50cyBvZiBsYXlvdXQtYm9keSAoYnV0IGtlZXAgbGF5b3V0KVxuICAgICAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3O1xuICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKHJvdXRlLnBheWxvYWQpKSB7XG4gICAgICAgICAgICB2aWV3ID0gbmV3IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygcm91dGUucGF5bG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmlldyA9IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICB2aWV3ID0gcm91dGUucGF5bG9hZC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcgJiYgdmlld1R5cGVHdWFyZCh2aWV3KSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmlldykge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZpZXdUeXBlR3VhcmQodGVzdCkge1xuICAgICAgICAgICAgaWYgKFwiY29udGVudFwiIGluIHRlc3QgJiYgdGVzdC5jb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3JlbmRlck5vdEZvdW5kKCkge1xuICAgICAgICBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50KHRoaXMucm91dGVDb250YWluZXIpO1xuICAgICAgICB0aGlzLnJvdXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6ICdub3QtZm91bmQnLCBpbm5lckhUTUw6IHRoaXMuX25vdEZvdW5kIHx8IFwiUXVvdGggdGhlIFJhdmVuLCA0MDRcIiB9KSk7XG4gICAgfVxufVxuUGFnZVJvdXRlci5yb3V0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XG5QYWdlUm91dGVyLl9jb25maWd1cmVkID0gZmFsc2U7XG5QYWdlUm91dGVyLl9yb3V0ZXMgPSBbXTtcblBhZ2VSb3V0ZXIuX2hpc3RvcnkgPSBbXTtcblBhZ2VSb3V0ZXIuX2hpc3RvcnlNYXhMZW5ndGggPSA1MDtcbmV4cG9ydHMuUGFnZVJvdXRlciA9IFBhZ2VSb3V0ZXI7XG4vLyB0c2xpbnQ6ZGlzYWJsZTptYXgtY2xhc3Nlcy1wZXItZmlsZVxuLy8gQSBjbGFzcyBpcyByZXF1aXJlZCBidXQgeW91J3JlIG5vdCBhbGxvd2VkIHRvIHVzZSB0aGUgZXhpc3RpbmcgY2xhc3MgYmVjYXVzZSBpdCBjYW4ndFxuLy8gYmUgY29uc3RydWN0ZWQgKGludmFsaWQgY29uc3RydWN0b3IpLiBBbmQgeW91IGFyZSBPTkxZIGFsbG93ZWQgdG8gZXh0ZW5kIEhUTUxFbGVtZW50LlxuLy8gQU5EIHRoZXkgbXVzdCBiZSB1bmlxdWUuXG5jbGFzcyBEaXZQYWdlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmNsYXNzIERpdkxheW91dCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5jbGFzcyBEaXZOb3RGb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiAocmVzdWx0KSA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShyZXN1bHQpLCB0aW1lKSk7XG59XG5leHBvcnRzLmRlbGF5ID0gZGVsYXk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IERlZmVycmVkUHJvbWlzZV8xID0gcmVxdWlyZShcIi4vRGVmZXJyZWRQcm9taXNlXCIpO1xuLyoqXG4gKiBDcmVhdGVzIGEgZGVkaWNhdGVkIHdlYiB3b3JrZXIgdGhhdCBjb21tdW5pY2F0ZXMgdmlhIGRlZmVycmVkcy4gSXQgY2FuIGV4ZWN1dGUgd2hhdGV2ZXIgZnVuY3Rpb25cbiAqIHlvdSBnaXZlIGl0LiBUYXNrU3RhcnQoKSBhY3RzIGtpbmQgb2YgbGlrZSBkb2luZyBuZXcgVGhyZWFkKCkgYW5kIFRocmVhZC5TdGFydCgpIGluIG9uZSBzdGVwLlxuICogSXQgaXMgcG9zc2libGUgdG8gZG8gYWxsIHRoaXMgbWFudWFsbHksIGJ1dCB0aGlzIGhlbHBlciBjbGFzcyBtYWtlcyBpdCBhIGZhaXJseSB0cml2aWFsIG9wZXJhdGlvbi5cbiAqXG4gKiBIYWNrd29yayBpcyB1c2VkIHRvIGF2b2lkIHRoZSBuZWVkIHRvIGNyZWF0ZSBhIHNwZWNpYWxpemVkIHdlYiB3b3JrZXIganMgZmlsZS4gVGhlIHdvcmtlciBjcmVhdGVkIHRha2VzIGFcbiAqIGZ1bmN0aW9uIGFuZCBhcmd1bWVudHMsIGV4ZWN1dGVzIHRoZW0gaW4gaXRzIG93biB0aHJlYWQsIGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXG4gKlxuICogRnVydGhlciBoYWNrd29yayBpcyBuZWVkZWQgYmVjYXVzZSB3ZWIgd29ya3MgaGF2ZSBubyBhY2Nlc3MgdG8gbW9kdWxlcywgbm8gYWNjZXNzIHRvIGNsb3N1cmVzLCBhbmQgY2FuIG9ubHlcbiAqIGNvbW11bmlhdGUgaW4gc3RyaW5ncy4gVGhlIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG5lZWRzIHRvIGJlIHBhc3NlZCBhcyBhIHN0cmluZyBpbiB0aGUgbWVzc2FnZSBiZXR3ZWVuXG4gKiB0aHJlYWRzLlxuICpcbiAqIFdoaWxlIGl0IGlzIHBvc3NpYmxlIHRvIGNyZWF0ZSBhIHZlcnNpb24gdGhhdCBkb2VzIG5vdCBuZWVkIHRvIGV2YWwoKSB0aGUgZnVuY3Rpb24gc3RyaW5nIG9uIGV2ZXJ5IGV4ZWN1dGlvbixcbiAqIHRoaXMgcmVxdWlyZXMgdGhlIGNhbGxlciB0byBtYW51YWxseSBjb2RlIGV2ZXJ5dGhpbmcgdGhhdCB5b3Ugc2VlIGluIGhlcmUgdGhlIGNvbnN0cnVjdG9yLiBObyBoZWxwZXJzIGFyZSBhbGxvd2VkXG4gKiAobm8gYWNjZXNzIHRvIG90aGVyIG9iamVjdHMpLiBJZiB5b3Ugd2FudGVkIHRvIGRvIGV2ZXJ5dGhpbmcgeW91cnNlbGYsIHlvdSBjb3VsZCBqdXN0IG1ha2UgYSB3ZWIgd29ya2VyIHRoZSByaWdodFxuICogd2F5LCB3aXRob3V0IHRoZSBoZWxwZXIuXG4gKi9cbmNsYXNzIER5bmFtaWNXZWJXb3JrZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRlZmVycmVkSWQgPSAwO1xuICAgICAgICB0aGlzLmRlZmVycmVkcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgZnVuY3Rpb24gc2V0dXBGdW5jKCkge1xuICAgICAgICAgICAgY29uc3QgY3R4ID0gc2VsZjtcbiAgICAgICAgICAgIC8vIFNldCB1cCB3aGF0IGhhcHBlbnMgd2hlbiBhIG1lc3NhZ2UgaXMgc2VudCB0byB0aGUgd29ya2VyLlxuICAgICAgICAgICAgLy8gSWYgeW91J3JlIHdpbGxpbmcgdG8gd3JpdGUgYWxsIHRoaXMsIGJ1dCByZW1lbWJlciB0byBkZWZpbmUgeW91ciBmbiBmdW5jdGlvblxuICAgICAgICAgICAgLy8gYmVmb3JlIG9ubWVzc2FnZSwgeW91IGNhbiBza2lwIHRoZSBldmFsKCkgc3RlcC5cbiAgICAgICAgICAgIGN0eC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgZm4sIGFyZ3MgfSA9IGV2dC5kYXRhO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaGFjayBhbGxvd3MgYSBzaW5nbGUgZGVkaWNhdGVkIHdlYiB3b3JrZXIgdG8gaGFuZGxlIGFueSBmdW5jdGlvbi4gQmVjYXVzZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgd29ya2VyIGhhcyBubyBhY2Nlc3MgdG8gY2xvc3VyZXMsIGl0IGhhcyBubyBhY2Nlc3MgdG8gY29tcGxleCBvYmplY3RzLiBJdFxuICAgICAgICAgICAgICAgICAgICAvLyBjYW4gb25seSBnZXQgdGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgaW4gdGhlIG1lc3NhZ2UsIHdoaWNoIGNvbnRhaW5zIHNpbXBsZSBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ubHksIHN0cmluZ3MgYW5kIG51bWJlcnMuIFNvIGl0IGhhcyB0byBiZSBzZXJpYWxpemVkIGFuZCB0aGVuIGRlc2VyaWFsaXplZC5cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIGRlc2VyaWFsaXplIGl0IGlzIHRvIGV2YWwoKSBpdC4gUHJldHR5IGhvcnJpZmZpYy5cbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXRGdW5jO1xuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZXZhbFxuICAgICAgICAgICAgICAgICAgICBldmFsKFwiaW5wdXRGdW5jID0gXCIgKyBmbiArIFwiO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJnYXJyYXkgPSBKU09OLnBhcnNlKGFyZ3MpIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBpbnB1dEZ1bmMoLi4uYXJnYXJyYXkpOyAvLyBFdmFsdWF0ZSB0aGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCB0aGUgcmVzcG9uc2UgYmFjay5cbiAgICAgICAgICAgICAgICAgICAgY3R4LnBvc3RNZXNzYWdlKHsgaWQsIHJlc3VsdDogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyBpZCwgZXJyb3I6IGVyciB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldFVwV29ya2VyKHNldHVwRnVuYyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0aW5nIGEgdGFzayByZXR1cm5zIGEgZGVmZXJyZWQgcHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gdGhlIHdvcmtlciB0aHJlYWQgaGFzIGNvbXBsZXRlZCBpdHMgdGFzay5cbiAgICAgKlxuICAgICAqIFJlbWVtYmVyIHRoYXQgY2xvc3VyZXMgRE8gTk9UIFdPUksuIFBhc3MgeW91ciBhcmd1bWVudHMgKHdoaWNoIG11c3QgYmUgSlNPTi5zdHJpbmdpZmlhYmxlKS5cbiAgICAgKi9cbiAgICB0YXNrU3RhcnQoZm4sIC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmRlZmVycmVkSWQrKztcbiAgICAgICAgY29uc3QgbXNnID0ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBmbjogZm4udG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGFyZ3M6IEpTT04uc3RyaW5naWZ5KGFyZ3MpXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gbmV3IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZSgpO1xuICAgICAgICB0aGlzLmRlZmVycmVkcy5zZXQoaWQsIGRlZmVycmVkKTtcbiAgICAgICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2UobXNnKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLm91dHB1dFxuICAgICAgICAgICAgLnRoZW4ocmVzcCA9PiBKU09OLnBhcnNlKHJlc3AgfHwgJycpKVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIgfHwgbmV3IEVycm9yKCdVbmtub3duIGVycm9yJykpOyB9KTtcbiAgICB9XG4gICAgX3NldFVwV29ya2VyKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIEhlcmUncyB0aGUgbWFpbiBoYWNrIGFuZCBpdCdzIGEgZG9venkuXG4gICAgICAgIC8vIE5vcm1hbGx5LCB5b3UgYXJlIHJlcXVpcmVkIHRvIGNyZWF0ZSBhIHNwZWNpYWwgd29ya2VyLmpzIGZpbGUgZm9yIHdlYiB3b3JrZXJzIGFuZCBsaW5rXG4gICAgICAgIC8vIHRvIHRoZW0gd2hlbiBsb2FkaW5nIHRoZSBwYWdlLiBPYnZpb3VzbHkgdGhhdCBtYWtlcyBpdCBpbXBvc3NpYmxlIHRvIGRlZmluZSB0aGVtIGF0IHJ1bnRpbWUuXG4gICAgICAgIC8vIFRvIGdldCBhcm91bmQgdGhlIGxpbWl0YXRpb24sIHRoaXMgZW5jb2RlcyB0aGUgd29ya2VyIGFzIGFuIG9iamVjdCBVUkwgKHdoaWNoIHJlcXVpcmVzIGNvbnZlcnNpb25cbiAgICAgICAgLy8gdG8gYSBzdHJpbmcpIGFuZCBsb2FkcyB0aGF0LlxuICAgICAgICB0aGlzLndvcmtlciA9IG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbJygnICsgY2FsbGJhY2sudG9TdHJpbmcoKSArICcpKCk7J10pKSk7XG4gICAgICAgIHRoaXMud29ya2VyLm9ubWVzc2FnZSA9IGV2dCA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGlkLCByZXN1bHQsIGVycm9yIH0gPSBldnQuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gdGhpcy5kZWZlcnJlZHMuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmICghZGVmZXJyZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEZWZlcnJlZCBwcm9taXNlIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVmZXJyZWRzLmRlbGV0ZShpZCk7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5EeW5hbWljV2ViV29ya2VyID0gRHluYW1pY1dlYldvcmtlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9EZWZlcnJlZFByb21pc2VcIik7XG4vKipcbiAqIFRoZSBwcm9taXNlIEFQSSBpcyBuaWNlLCBtb3N0bHksIGJ1dCB0aGUgbWFpbiB0aGluZyBwcmV2ZW50aW5nIHVzZSBvZiBhIHByb21pc2UgYXMgYW4gZXZlbnQgaGFuZGxlciBpcyB0aGF0XG4gKiBpdCBvbmx5IGV4ZWN1dGVzIG9uY2UuIEFmdGVyIHRoYXQgcG9pbnQsIGl0IGlzIHJlc29sdmVkLCBhbmQgdGhlcmUgaXMgbm8gd2F5IHRvIGZsaXAgaXQgYmFjay5cbiAqXG4gKiBUaGUgcmVwZWF0YWJsZSBwcm9taXNlIGtlZXBzIHRoZSBwcm9taXNlIEFQSSBhbmQgY3JlYXRlcyB0aGUgaWxsdXNpb24gdGhhdCB0aGUgcHJvbWlzZSBpcyByZXBlYXRlZCBieVxuICogcmVidWlsZGluZyB0aGUgY2hhaW4gZWFjaCB0aW1lLiBJdCdzIHJlYWxseSBhIGRlZmVycmVkIGZhY3RvcnkgYnV0IGl0IHByZXRlbmRzIHRvIGJlIGEgZGVmZXJyZWQuIEknbSBzdXJlXG4gKiB0aGlzIGhhcyBhIHBlcmZvcm1hbmNlIHBlbmFsdHkuXG4gKlxuICogWW91IHNob3VsZCBub3QgYXR0YWNoIGFjdHVhbCBwcm9taXNlcyBpbnRvIHRoZSB0aGVuKCkgY2hhaW4sIGJlY2F1c2UgdGhleSBjYW4ndCBiZSByZXBlYXRlZC4gVGhlIFByb21pc2UgdHlwZSBpc24ndFxuICogYWxsb3dlZCBidXQgdGhlcmUgYXJlIHdheXMgdG8gZ2V0IGFyb3VuZCB0aGUgVFMgY29tcGlsZXIuIFRoZSBUUyB0eXBlIGRlZmluaXRpb24gZm9yIFByb21pc2UgYW5kIFByb21pc2VMaWtlIGlzbid0XG4gKiBjb21wbGV0ZWx5IGNvcnJlY3QsIGFueXdheSwgc28gaXQncyBlYXN5IHRvIGdldCB1c2VkIHRvIHVzaW5nIHRoZSBhbnkgdHlwZSBhbmQgbWFrZSBicm9rZW4gY29kZS5cbiAqXG4gKiBZb3UgY2Fubm90IGFzeW5jL2F3YWl0IGEgcmVwZWF0YWJsZSBwcm9taXNlIGl0c2VsZiBidXQgeW91IGNhbiBhd2FpdCBhIHNpbmdsZSByZXNvbHV0aW9uLiBBc3luYy9hd2FpdCBpcyBzdWdhciB0aGF0XG4gKiBjcmVhdGVzIGEgcmVndWxhciwgbm9uLXJlcGVhdGFibGUsIHByb21pc2UuXG4gKi9cbmNsYXNzIFJlcGVhdGFibGVQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgb25VbmhhbmRsZWRFcnJvciwgLy8gVGhpcyBhZGRzIGEgY2FsbGJhY2sgYXQgdGhlIGVuZCAob3IgMm5kIGZyb20gdGhlIGVuZCwgc2VlIG5leHQgb3B0aW9uKVxuICAgIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlIC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICkge1xuICAgICAgICB0aGlzLm9uVW5oYW5kbGVkRXJyb3IgPSBvblVuaGFuZGxlZEVycm9yO1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjsgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC4gVXNlZnVsIGZvciBhc3luYy9hd2FpdCBjb2RlLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlIGZvbGxvd2luZyBzaG91bGQgd29yazpcbiAgICAvLyBjb25zdCByZXBlYXRhYmxlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlKCk7IGNvbnN0IHIgPSBhd2FpdCByZXBlYXRhYmxlLnJlc29sdmUoKTsgY29uc29sZS5sb2cocik7XG4gICAgcmVzb2x2ZShhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICByZWplY3QoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlamVjdChhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICAvLyBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay5cbiAgICB0aGVuKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbmZ1bGZpbGxlZDogb25mdWxmaWxsZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbnJlamVjdGVkOiBvbnJlamVjdGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhlIGZpcnN0IGlzIGFsd2F5cyBvbmZ1bGZpbGxlZCBhbmQgaXMgbmV2ZXIgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKCFjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIEZpcnN0IG9uZnVsZmlsbGVkIGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlID0gbmV3IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZShjYi5vbmZ1bGZpbGxlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oY2Iub25mdWxmaWxsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25yZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goY2Iub25yZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIE5vIGNhbGxiYWNrcywgbm90IGV2ZW4gdGhlIGRlZmF1bHQgZmlyc3Qgb25mdWxmaWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2godGhpcy5vblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVwZWF0YWJsZVByb21pc2UgPSBSZXBlYXRhYmxlUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBSZXR1cm4gZWxlbWVudHMgb2YgYXJyYXkgYSBsaW5lZCB1cCB3aXRoIGVsZW1lbnRzIG9mIGFycmF5IGIuIEJvdGggYXJyYXlzIGRvbid0IGhhdmUgdG8gYmUgdGhlIHNhbWUgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiB6aXAoYSwgYikge1xuICAgIGlmIChhLmxlbmd0aCA+PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbZWxlbWVudCwgYltpbmRleF1dKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFthW2luZGV4XSwgYl0pO1xuICAgIH1cbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLyoqXG4gKiBSZXR1cm4gYSBjYXJ0ZXNpYW4gam9pbiAoY3Jvc3Mgam9pbikgYmV0d2VlbiBhcnJheXMgYSBhbmQgYi5cbiAqL1xuZnVuY3Rpb24gY2FydGVzaWFuKGEsIGIpIHtcbiAgICAvLy8gdHlwZXNjcmlwdCBwcmV2ZW50cyBhIGRpcmVjdCB1c2Ugb2YgY29uY2F0LCBzbyBkbyB0aGlzIG1hbnVhbGx5IHdpdGggYSBsb29wXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5iLm1hcChxID0+IFtpdGVtLCBxXSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmV4cG9ydHMuY2FydGVzaWFuID0gY2FydGVzaWFuO1xuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhbmdlIG9mIGludGVnZXJzLCBjb3VudGluZyB1cCBieSAxLCBmb3IgdGhlIGdpdmVuIGxlbmd0aC4gU3RvbGVuIGZyb20gUHl0aG9uLlxuICovXG5mdW5jdGlvbiByYW5nZShsZW5ndGgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuZ3RoIH0sICh2YWx1ZSwga2V5KSA9PiBrZXkpO1xufVxuZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiBpdGVtcyBhbmQgb3RoZXIgYXJyYXlzLCBmbGF0dGVuIHRoZW0gb3V0IGludG8gYSBzaW5nbGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uKiB0cmF2ZXJzZShhcnIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICB5aWVsZCBhcnI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBhcnIpIHtcbiAgICAgICAgICAgIHlpZWxkKiB0cmF2ZXJzZShyb3cpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy50cmF2ZXJzZSA9IHRyYXZlcnNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIE1ha2UgaXQgZWFzaWVyIHRvIGNyZWF0ZSBzaW1wbGUgY29tcGFyaXNvbiBmdW5jdGlvbnMgb24gKHBvc3NpYmx5IGNvbXBsZXgpIG9iamVjdHMuIFR5cGljYWwgdXNlOiBhcnIuc29ydChvcmRlckJ5KG8gPT4gby5pZCkpXG4gKi9cbmZ1bmN0aW9uIG9yZGVyQnkocHJvcGVydHlGbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZmlyc3QsIHNlY29uZCkge1xuICAgICAgICBjb25zdCBmaXJzdFZhbHVlID0gcHJvcGVydHlGbihmaXJzdCk7XG4gICAgICAgIGNvbnN0IHNlY29uZFZhbHVlID0gcHJvcGVydHlGbihzZWNvbmQpO1xuICAgICAgICBpZiAoZmlyc3RWYWx1ZSA8IHNlY29uZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpcnN0VmFsdWUgPiBzZWNvbmRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbn1cbmV4cG9ydHMub3JkZXJCeSA9IG9yZGVyQnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEFycmF5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChtZXRob2QsIHNldCwgZGVsZXRlKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gJyc7XG4gICAgICAgIHRoaXMuYXJncyA9IFtdO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXJyYXlDaGFuZ2VkRXZlbnRBcmdzID0gQXJyYXlDaGFuZ2VkRXZlbnRBcmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlXCIpO1xuLyoqXG4gKiBBIGRlbGVnYXRlIG9iamVjdCBpcyB1c2VkIGJ5IHRoZSBFdmVudEhhbmRsZXIuIEl0IGNvbnRhaW5zIGVub3VnaCBpbmZvcm1hdGlvbiB0byBleGVjdXRlIGEgY2FsbGJhY2sgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25vdXNseVxuICogKHVzaW5nIGEgcHJvbWlzZSkuIEl0IGFsc28gYWRkcyBzb21lIHN0cmluZ3MgdG8gaGVscCBpbiB0cm91Ymxlc2hvb3RpbmcsIGJlY2F1c2Ugc2VhcmNoaW5nIGEgcmVjdXJzaXZlIGFycmF5IG9mIGNvbXBsZXggb2JqZWN0cyBjYW4gbWFrZVxuICogaXQgYSBiZWFyIHRvIGZpbmQgb3V0IHdoeSBhIGNhbGxiYWNrIGlzbid0IGJlaW5nIGV4ZWN1dGVkLlxuICovXG5jbGFzcyBEZWxlZ2F0ZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSW4gbWFueSBjYXNlcyAoZm9yIGV4YW1wbGUsIHdoZW4gdXNpbmcgZmF0IGFycm93IGZ1bmN0aW9ucyksIHRoaXNBcmcgaXNcbiAgICAgICAgLy8gbm90IG5lZWRlZC4gQnV0IGluIG1vc3Qgb3RoZXJzLCBpdCBpcyBhbiBhbm5veWluZyBidWcgdGhhdCByZXF1aXJlcyB0cm91Ymxlc2hvb3RpbmdcbiAgICAgICAgLy8gdG8gZmlndXJlIG91dCB3aGF0IHRoZSBjYWxsZXIgZm9yZ290LiBJJ3ZlIHdhdmVyZWQgYmV0d2VlbiBtYWtpbmcgaXQgcmVxdWlyZWQgYW5kIG5vdC5cbiAgICAgICAgaWYgKCF0aGlzQXJnKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZWxlZ2F0ZSBjcmVhdGVkIHdpdGhvdXQgdGhpc0FyZy4gRGlkIHlvdSBtZWFuIHRvPycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0JyAmJiAnY29uc3RydWN0b3InIGluIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPd25lck5hbWUgPSB0aGlzQXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHR5cGVzY3JpcHQgY29tcGlsZXIgc2hvdWxkIGhhbmRsZSB0aGlzIGNoZWNrIGJ1dCBjYW4ndCBhdCBydW50aW1lLlxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLmNhbGxiYWNrTmFtZSA9IGNhbGxiYWNrLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lICYmIHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLmNhbGxiYWNrT3duZXJOYW1lfS4ke3RoaXMuY2FsbGJhY2tOYW1lfSgpYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja05hbWUgKyAnKCknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tPd25lck5hbWUgKyAnLl9fbGFtYmRhX18oKSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlXzEuUmVwZWF0YWJsZVByb21pc2UoY2FsbGJhY2suYmluZCh0aGlzQXJnKSk7XG4gICAgfVxufVxuZXhwb3J0cy5EZWxlZ2F0ZSA9IERlbGVnYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgRGVsZWdhdGVfMSA9IHJlcXVpcmUoXCIuL0RlbGVnYXRlXCIpO1xuLyoqXG4gKiBJIGNob3NlIHRvIHVzZSBDIyBzdHlsZSBldmVudHMsIG5vdCBKUy9UUywgYmVjYXVzZSB0aGUgSlMvVFMgd2F5IG9mIGRvaW5nIGRlbGVnYXRlcy9jdXN0b20gZXZlbnRzIGlzIGEgTklHSFRNQVJFLiBTdXJlLFxuICogQ3VzdG9tRXZlbnQgd29ya3MsIGJ1dCBvbiB0aGUgVFMgc2lkZSB0aGUgY29kZSByZXF1aXJlZCB0byBtYWtlIFRTQyBoYXBweSB3aXRoIHZhbGlkIGphdmFzY3JpcHQgaXMgYXdmdWwgYW5kIG5vbi1pbnR1aXRpdmUuXG4gKiBPbiB0aGUgSlMgc2lkZSwgeW91IGhhdmUgdGhlIHByb2JsZW0gdGhhdCBldmVyeSBoYW5kbGVyIHBpY2tzIGl0IHVwLCBub3QganVzdCB0aGUgb25lcyB0aGF0IGFyZSBib3VuZCB0byB0aGUgcmVsZXZhbnQgSFRNTFxuICogZWxlbWVudCwgc28gZWxlbWVudHMgbmVlZCB0byBwYXNzIHRoZSBzb3VyY2UgYXMgYW4gYXJndW1lbnQgYW5kIGNoZWNrIGl0IChsaWtlIGpxdWVyeSBhbmQgJChkb2N1bWVudCkub24oKSkuXG4gKlxuICogQWZ0ZXIgZ2V0dGluZyBpdCB3b3JraW5nLCBhbGwgSSBjb3VsZCB0aGluayBhYm91dCB3YXMgaG93IGJhZCB0aGUgY29kZSB3YXMsIHNvIEkgcmV3cm90ZSBpdCBhdm9pZGluZyB0aGUgSlMgcGF0dGVybiBlbnRpcmVseS5cbiAqXG4gKiBUaGlzIGNhbiBiZSBzeW5jaHJvbm91cyAoY2FsbGJhY2tzKSBvciBhc3luY2hyb25vdXMgKHByb21pc2VzKS4gIFdoZW4gaXQgaXMgYXN5bmMsIHRoZSBjb2RlIGV4ZWN1dGVzIGFmdGVyIHRoZSBjdXJyZW50IHN5bmNocm9ub3VzXG4gKiBldmVudHMgcnVuIHRvIGNvbXBsZXRpb24uIFRoaXMgY291bGQgY3JlYXRlIGJ1Z3MgaW4gc3luY2hyb25vdXMgY29kZSwgYnV0IGlzIGJlc3QgZm9yIGJyb3dzZXIgZXZlbnRzLiBUaGlzIGhhbmRsZXIgaXMgcHJpbWFyaWx5IHVzZWQgZm9yXG4gKiBicm93c2VyIGV2ZW50cywgc28gYXN5bmMgaXMgZGVmYXVsdC5cbiAqXG4gKiBCdXQgaWYgeW91J3JlIHRyaWdnZXJpbmcgYXN5bmMgZXZlbnRzIGluIGNvZGUgYW5kIHN0ZXBwaW5nIHRocm91Z2ggaXQgaW4gQ2hyb21lLCB3aGF0IHlvdSBzZWUgd29uJ3QgbWFrZSBzZW5zZSwgYmVjYXVzZSB0aGUgYXN5bmNcbiAqIGV2ZW50cyB3b24ndCBvY2N1ciB1bnRpbCByaWdodCBhd2F5LiBJdCBjYW4gYmUgaGFyZCB0byB0cm91Ymxlc2hvb3QuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbmNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoX2Rpc2FibGVBc3luYyA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVBc3luYyA9IF9kaXNhYmxlQXN5bmM7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIElmIHRoaXMgcmVjZWl2ZXMgYSBkZWxlZ2F0ZSAod2hpY2ggaXMgYW4gYXJyYXkgb2YgZGVsZWdhdGVzKSwgYWRkIGl0LlxuICAgICAgICAvLyBXaGVuIHRoaXMgaXMgaW52b2tlZCwgdGhhdCBkZWxlZ2F0ZSB3aWxsIGFsc28gYmUgaW52b2tlZC5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBfb3ZyMV9kZWxlZ2F0ZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHb3QgYSBzaW5nbGUgY2FsbGJhY2tcbiAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBjYWxsYmFjay5cbiAgICAgICAgaWYgKHRoaXMuZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoOiB0cnVlIH0pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0RlbGUgPSBuZXcgRGVsZWdhdGVfMS5EZWxlZ2F0ZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChuZXdEZWxlKTtcbiAgICAgICAgLy8gSUYgdGhpcyBpcyBhc3luY2hyb25vdXMsIHJldHVybiB0aGUgcHJvbWlzZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAgICAgICAgLy8gQ2hhaW5pbmcgd29uJ3Qgd29yayBvbiBzeW5jIGNvZGUsIHNvIGRvIG5vdCBpbiB0aGF0IGNhc2UuXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3RGVsZS5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX2RlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGRlbGVnYXRlLlxuICAgICAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZmluZChxID0+IHEgPT09IGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChkZWxlZ2F0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+ICFBcnJheS5pc0FycmF5KHEpICYmIHEuY2FsbGJhY2sgPT09IGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcikge1xuICAgICAgICAvLyBGaXJzdCB0cnkgdG8gdW5zdWJzY3JpYmUgdGhlIGRlZmF1bHQgZGVsZWdhdGUuIENhbid0IGRvIGFueXRoaW5nIGlmIGl0IGhhcyBhIGRpZmZlcmVudCBuYW1lLCB0aG91Z2guXG4gICAgICAgIGlmIChcImRlbGVnYXRlXCIgaW4gc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRGVsZWdhdGUoc2VuZGVyLmRlbGVnYXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiAhQXJyYXkuaXNBcnJheShxKSAmJiBxLnRoaXNBcmcgPT09IHNlbmRlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gcSA9PT0gZGVsZWdhdGUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlKGFyZ3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgICAgIC8vIEFzeW5jIHZlcnNpb24uIERvZXMgbm90IHdvcmsgd2VsbCB3aXRoIHRoZSBjaHJvbWUgZGVidWdnZXIuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suY2FsbChsaXN0ZW5lci50aGlzQXJnLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2ggfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2gobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgdGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpOyAvLyBDbGVhcnMgdGhlIGRlbGVnYXRlXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB1bmRlZmluZWQ7IC8vIE1ha2VzIHN1cmUgdGhpcyBjYW4ndCBiZSB1c2VkIGFnYWluXG4gICAgfVxufVxuZXhwb3J0cy5FdmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRXZlbnQgYXJndW1lbnRzIGV4cGVjdGVkIG9uIGFueSBDaGFuZ2UgZXZlbnQuXG4gKi9cbmNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2YgY2hhbmdlIG9wZXJhdGlvbiAoc2V0LCBkZWxldGUpIChwb3RlbnRpYWxseSBtZXRob2QpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSAnJztcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgY29uc3RydWN0b3IgdGhhdCBpcyBuZXdhYmxlLlxuICogVEhJUyBDQU5OT1QgREVURUNUIEFOT05ZTU9VUyBDTEFTU0VTLiBTb3JyeSwgYnV0IEpTIGRvZXNuJ3QgaGF2ZSBhIG5vbi1kZXN0cnVjdGl2ZSB3YXlcbiAqIHRvIGNoZWNrIGlmIGFueSBmdW5jdGlvbiBpcyBhIGNvbnN0cnVjdG9yIG90aGVyIHRoYW4gdG8gdHJ5IHRvIG5ldygpIGl0IGFuZCBibG93IHVwL25vdCBibG93IHVwLlxuICogVGhpcyBmdW5jdGlvbiBkZXBlbmRzIG9uIHRoZXJlIGJlaW5nIGEgcHJvdG90eXBlIHdpdGggYSBuYW1lZCBjb25zdHJ1Y3Rvci5cbiAqL1xuZnVuY3Rpb24gY29uc3RydWN0b3JUeXBlR3VhcmQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmoucHJvdG90eXBlICYmIG9iai5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcbn1cbmV4cG9ydHMuY29uc3RydWN0b3JUeXBlR3VhcmQgPSBjb25zdHJ1Y3RvclR5cGVHdWFyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIGtleXdvcmQgYXJndW1lbnRzLCBhcyBzZWVuIGluIFB5dGhvbiBhbmQgQyMuIEl0IG1ha2VzIGNvbmZpZ3VyYWJsZVxuICogZnVuY3Rpb25zIHNvIG11Y2ggcXVpY2tlciBhbmQgZWFzaWVyIHRoYW4gZmxhdCBhcmd1bWVudHMgKGZvcmNpbmcgeW91IHRvIHB1dCB1bmRlZmluZWQgbWFudWFsbHkgaW4gZGlmZmVyZW50XG4gKiBzbG90cykgb3Igb3B0aW9ucyBvYmplY3RzICh0YWtlcyBtb3JlIHRpbWUgdG8gcHJvZHVjZSwgZXNwZWNpYWxseSBpZiB5b3UgbmVlZCB0byBuZXcgaXQgdXApLlxuICpcbiAqIENhbGwgZnVuY3Rpb25zIGhhdmluZyBrZXl3b3JkIGFyZ3VtZW50cyB1c2luZyB0aGlzIHN5bnRheDpcbiAqIGNhbGxtZShhcmcxLCBhcmcyLCBrdygnc29tZXRoaW5nJywga3cxKSwga3coJ3NvbWV0aGluZ0Vsc2UnLCBrdzIpKVxuICpcbiAqIFRvIG1ha2UgdGhlbSB3b3JrLCBpbiB0aGUgZnVuY3Rpb24gaXRzZWxmLCB5b3UgbmVlZCB0byBjb3B5IGFuZCBwYXN0ZS4gRm9yIGV4YW1wbGU6XG4gKiAoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSA9IEt3YXJnLnBhcnNlKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0pKTtcbiAqL1xuY2xhc3MgS3dhcmcge1xuICAgIGNvbnN0cnVjdG9yKGEsIGIpIHtcbiAgICAgICAgaWYgKCFhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYW1lID0gYTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbWVtYmVyIHRoaXMgdGVtcGxhdGU6XG4gICAgICogKHsgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0pKTtcbiAgICAgKiBJbmNsdWRlIGRlZmF1bHQgdmFsdWVzIGluIHRoZSBmaXJzdCBvYmplY3QsIG5vdCB0aGUgc2Vjb25kLlxuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgdG8gY2FwdHVyZSByZXN0IHBhcmFtZXRlcnMsIHVzZSB0aGlzOlxuICAgICAqICh7ICRyZXN0JCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgLCAuLi5yZXN0IH0pKTtcbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IGFsbG93VW5rbm93bktleXdvcmQgdG8gYmUgdHJ1ZSwgdXNlIHRoaXM6XG4gICAgICogKHsgJCRrdyQkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9LCB0cnVlKSk7XG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlQXJncyhhcmdzLCBhbGxvd1Vua25vd25LZXl3b3JkID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSXQgd291bGQgYmUgbmljZSBpZiB0aGlzIGNvdWxkIHRha2UgdGhlIGFyZ3VtZW50cyBvYmplY3QsIGJ1dCBzYWRseSBhcmd1bWVudHMgc3RvcmVzIG9ubHkgYW4gYXJyYXkgb2YgdmFsdWVzLFxuICAgICAgICAvLyBubyBrZXlzLiBJZiBKUyB3ZXJlIHNhbmUsIGl0IHdvdWxkIGJlIGEgTWFwLCBub3QgYW4gYXJyYXkuIFR3byBzdGVwcyBmb3J3YXJkLCBvbmUgc3RlcCBiYWNrLlxuICAgICAgICAvLyBQYXJzaW5nIHRoZSBzdHJpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uIGlzIG5vdCBteSBjdXAgb2YgdGVhLCBzbyBqdXN0IG5vLlxuICAgICAgICBjb25zdCBvYmogPSB7fTtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkgYXJndW1lbnQgb3JkZXJcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSBhcmdzW2FyZ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga3d2YXIgPSB7fTtcbiAgICAgICAgb2JqWyckJGt3JCQnXSA9IGt3dmFyO1xuICAgICAgICAvLyBDaGVjayBmb3IgcmVzdCBwYXJhbWV0ZXJzLlxuICAgICAgICAvLyBJIHdhcyBnb2luZyB0byBoYXZlIHRoaXMgb24vb2ZmIGNvbmZpZ3VyYWJsZSwgYnV0IGl0IHNob3VsZG4ndCBodXJ0IHBlcmZvcm1hbmNlLlxuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgb2JqWyckcmVzdCQnXSA9IGFycjtcbiAgICAgICAgLy8gUmVzdCBwYXJhbWV0ZXJzIGFyZSBzdG9yZWQgYXMgYXJyYXkga2V5cywgeyAnMCc6IGEsICcxJzogYiwgJ25vblJlc3QnOiAnc29tZXRoaW5nIGVsc2UnfVxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKS5maWx0ZXIoZiA9PiBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhmKSkpIHtcbiAgICAgICAgICAgIGlmICghKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGFyZ3NbYXJnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5d29yZHNVc2VkID0ge307XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGtleXdvcmQgbmFtZVxuICAgICAgICAvLyBIYXZlIHRvIGl0ZXJhdGUgdGhlIGxpc3QgdHdpY2UsIHRvIGF2b2lkIHdpcGluZyBvdXQgZGF0YSBpZiB0aGUgb3JkZXIgaXMgc3dhcHBlZFxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG1wID0gYXJnc1thcmddO1xuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbGxvd1Vua25vd25LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrd3Zhclt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBhbiB1bmV4cGVjdGVkIGtleXdvcmQgYXJndW1lbnQgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0bXAubmFtZSBpbiBrZXl3b3Jkc1VzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgbXVsdGlwbGUgdmFsdWVzIGZvciBrZXl3b3JkIGFyZ3VtZW50ICsgJyR7dG1wLm5hbWV9J2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXl3b3Jkc1VzZWRbdG1wLm5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICAvLyBUdXJuIGFuIG9iamVjdCBpbnRvIGFuIGFycmF5IG9mIGtleXdvcmQgYXJndW1lbnRzLlxuICAgIC8vIE5lZWRzIHRvIHJldHVybiBhbnlbXSBiZWNhdXNlIGl0J3MgZ29pbmcgdG8gYmUgc2hvdmVkIGludG8gYXJiaXRyYXJ5IGFyZ3VtZW50IGxpc3RzXG4gICAgc3RhdGljIHVucGFjayhhcmdzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChrdyhhcmcsIGFyZ3NbYXJnXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBpc01hdGNoKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBrZXk7XG4gICAgfVxufVxuZXhwb3J0cy5Ld2FyZyA9IEt3YXJnO1xuZnVuY3Rpb24ga3coYSwgYikge1xuICAgIGlmICghYSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGEsIGIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDJcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhWzBdLCBhWzFdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDNcbiAgICAgICAgLy8gVGhpcyBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGggb25seSBvbmUga2V5L3ZhbHVlIHBhaXIuXG4gICAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYSk7XG4gICAgICAgIGlmICghcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50IG51bGwgZXhjZXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXAgb2JqZWN0OiBtdWx0aXBsZSBrZXlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhwcm9wc1swXSwgYVtwcm9wc1swXV0pO1xuICAgIH1cbn1cbmV4cG9ydHMua3cgPSBrdztcbmZ1bmN0aW9uIGt3YXJnc1RvT2JqZWN0KGFycikge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBhcnIpIHtcbiAgICAgICAgb3B0aW9uc1thcmcubmFtZV0gPSBvcHRpb25zW2FyZy52YWx1ZV07XG4gICAgfVxuICAgIHJldHVybiBvcHRpb25zO1xufVxuZXhwb3J0cy5rd2FyZ3NUb09iamVjdCA9IGt3YXJnc1RvT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpc05vbmUodGVzdCkge1xuICAgIHJldHVybiAodGVzdCA9PSBudWxsIHx8IHRlc3QgPT09IHVuZGVmaW5lZCk7XG59XG5leHBvcnRzLmlzTm9uZSA9IGlzTm9uZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZWFkIHNpbXBsZSBhc3NlcnRpb24gdGhhdCdsbCB3b3JrIGFueXdoZXJlLiBUaGlzIGlzIE5PVCB0aGUgZGlmZmljdWx0IHBhcnQgb2YgdW5pdCB0ZXN0aW5nLlxuICovXG5mdW5jdGlvbiBhc3NlcnQodGVzdCwgbWVzc2FnZSkge1xuICAgIGlmICghdGVzdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkJyk7XG4gICAgfVxufVxuZXhwb3J0cy5hc3NlcnQgPSBhc3NlcnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNsb25lRGVlcChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKSB7XG4gICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajsgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgfVxuICAgIGlmIChoYXNoLmhhcyhvYmopKSB7XG4gICAgICAgIHJldHVybiBoYXNoLmdldChvYmopOyAvLyByZWZlcmVuY2UgdG8gb2JqZWN0IHByZXZpb3VzbHkgc2VlblxuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgdmFsID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIChba2V5LCB2YWxdKSA9PiByZXN1bHQuYWRkKGNsb25lRGVlcChrZXksIGhhc2gpLCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhd2Z1bCBjb2RlLCBidXQgaXQncyB0aGUgb25seSB3YXkgdG8gY2xvbmUgYSBzdGFuZGFsb25lIGZ1bmN0aW9uICh2cyBhIG1ldGhvZCB3aGljaCBoYXMgYSBkZXNjcmlwdG9yKS5cbiAgICAgICAgLy8gSW4gZ2VuZXJhbCwgeW91IHByb2JhYmx5IGRvbid0IHdhbnQgdG8gdXNlIGNsb25lRGVlcCBvbiBmdW5jdGlvbnMuIFlvdSdsbCBzZWUgaXQncyBOT1QgdXNlZCBvbiBpbnRlcm5hbCBtZXRob2RzLlxuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgb2JqLnRvU3RyaW5nKCkpKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaGFzaC5zZXQob2JqLCByZXN1bHQpOyAvLyBLZWVwIHRyYWNrIG9mIG9iamVjdHMgcHJldmlvdXNseSBjbG9uZWRcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIShrZXkgaW4gcmVzdWx0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIG1ldGhvZHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHByb3RvdHlwZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCByZWN1cnNpdmVseSBmb2xsb3cgYmVjYXVzZSB0aGVyZSdzIG5vdGhpbmcgcmVjdXJzaXZlIHRvIGRvLlxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGhhc2guc2V0KG9ialtrZXldLCByZXN1bHRba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBtZXRob2QuXG4gICAgICAgICAgICAgICAgLy8gSWYgZXh0cmEga2V5cyBhcmUgdGhyb3duIG9udG8gYSBmdW5jdGlvbiwgdGhleSBwcm9iYWJseSB3aWxsIG5vdCBiZSBjbG9uZWQuXG4gICAgICAgICAgICAgICAgLy8gSW4gbXkgZXhwZXJpZW5jZSwgZXh0cmEga2V5cyBvbiBmdW5jdGlvbnMgZGlkbid0IHdvcmsgcmlnaHQsIHNvIG5vIGJpZyBsb3NzLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBnZXR0ZXJzL3NldHRlcnMuIFRoZXNlIGFyZSBsb2NhbCBhbmQgaG9wZWZ1bGx5IHdvcmsganVzdCBsaWtlIG1ldGhvZHMuXG4gICAgICAgICAgICAvLyBJbiBtYW55IGNhc2VzLCB0aGlzIGlzIHJlZHVuZGFudCB3aXRoIE9iamVjdC5jcmVhdGUoKSwgYnV0IGlzIG5lY2Vzc2FyeSB0byBhbGxvdyBvYmplY3RzIHdpdGggbWFudWFsbHktYWRkZWQgY3VzdG9tIGdldHRlcnMuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBnZXR0ZXIvc2V0dGVyLlxuICAgICAgICAgICAgLy8gQUxTTyBoYXNoIG5vdCB1cGRhdGVkOyB0aGlzIGlzIG5vdCBwb3NzaWJsZSwgYmVjYXVzZSBpdCB3aWxsIG1hcCB0aGUgdmFsdWUgaXQgZ2V0cywgbm90IHRoZSBnZXR0ZXIuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lRGVlcChvYmpba2V5XSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJIGRvbid0IGtub3cgZm9yIHN1cmUgaWYgdGhpcyB3aWxsIHdvcmsgaW4gYWxsIGNhc2VzLlxuLy8gSXQgZ2V0cyBkZWVwZXIgaW50byB0aGUgZ3V0cyBvZiBKUyBvYmplY3QgdGhhbiBJIGhhdmUgZXhwZXJpZW5jZSB3aXRoLlxuZnVuY3Rpb24gY2xvbmVPYmplY3Qob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVPYmplY3QgPSBjbG9uZU9iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogUmVjZW50IFR5cGVzY3JpcHQgaGFzIGFkZGVkIGEgbnVsbCBjb2FsZXNjaW5nIG9wZXJhdG9yICg/LiwgYWthIHRoZSBFbHZpcyBvcGVyYXRvcikgYnV0IE5QTSBpc3N1ZXNcbiAqIHByZXZlbnQgbWUgZnJvbSB1cGdyYWRpbmcuICBCdXQgdGhpcyByZXR1cm5zIHVuZGVmaW5lZCBpZiB5b3UgYWNjZXNzIGFueXRoaW5nIHRoYXQgZG9lc24ndCBleGlzdC5cbiAqXG4gKiBOYXR1cmFsbHkgdGhpcyBicmVha3MgVlNDb2RlIGludGVsbGlzZW5zZSwgYmVjYXVzZSBpdCByZXR1cm5zIGFueS4gT25seSBNUyBjYW4gZG8ga2VlcCB0aGUgcmlnaHQgdHlwZS5cbiAqXG4gKiBJZiB5b3UgZG8gcmV0dXJuIGEgcGFydGlhbCB2ZXJzaW9uIG9mIHRoZSB0eXBlLCBUUyB0aHJvd3MgYW4gZXJyb3IgYmVjYXVzZSBpdCBjb3VsZCBiZSBtaXNzaW5nICh1bW0uLi4gdGhhdCdzIHdoYXQgUGFydGlhbCBtZWFucy4uLikuXG4gKlxuICogQSB0cnVlIGVsdmlzIG9wZXJhdG9yIHdvdWxkIGFsc28gd29yayBvbiBzdHJpbmdzL251bWJlcnMvZXRjLiBUaGlzIGNhbm5vdCBkbyB0aGF0LCBiZWNhdXNlIEpTIGNhbid0IHRlbGwgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhXG4gKiBudWxsIHN0cmluZyBhbmQgYSBudWxsIG9iamVjdC4gTnVsbCBpcyBudWxsLlxuICovXG5mdW5jdGlvbiBlXyhpdGVtKSB7XG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW07XG59XG5leHBvcnRzLmVfID0gZV87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG4vKipcbiAqIEEgcHNldWRvLXJhbmRvbSBwcmVmaXggcGx1cyB0aGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIHVuaXggZXBvY2guIFRoZSByYW5kb20gcGFydCBzaG91bGQgYmUgcmFuZG9tIGVub3VnaCB0byBjb3ZlclxuICogbXVsdGlwbGUgaWRzIGNyZWF0ZWQgaW4gYSBtaWxsaXNlY29uZC5cbiAqL1xuZnVuY3Rpb24gZ2V0VW5pcXVlSWQoKSB7XG4gICAgY29uc3QgY2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVotXyc7XG4gICAgbGV0IHJlc3VsdCA9ICd1JyArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSkgKyAnLSc7XG4gICAgZm9yIChjb25zdCBfIG9mIEFycmF5VXRpbGl0aWVzXzEucmFuZ2UoOCkpIHtcbiAgICAgICAgcmVzdWx0ICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuZ2V0VW5pcXVlSWQgPSBnZXRVbmlxdWVJZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUZWxsIGlmIGEgZ2l2ZW4gc3RyaW5nIGlzIGEgcG9zaXRpdmUgaW50ZWdlci5cbiAqIFVzZSBmb3IgZGV0ZWN0aW5nIGFycmF5IGtleXMuXG4gKi9cbmZ1bmN0aW9uIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKHN0cikge1xuICAgIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0ciA9PT0gJzAnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gL15bMS05XVxcZCokLy50ZXN0KHN0cik7XG59XG5leHBvcnRzLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nID0gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBhY2N1cmF0ZSB0aGlzIGlzIGJ1dCBpdCBzZWVtcyBwcmV0dHkgZ29vZFxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iajtcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ2xvbmVPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Nsb25lT2JqZWN0XCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogT2JqZWN0LmFzc2lnbigpIGNhbiBiZSB1c2VkIGZvciBzaW1wbGUgY29waWVzIG9mIHByb3BlcnRpZXMsIGJ1dCBpdCBtaXNzZXMgZ2V0dGVycyxcbiAqIHNldHRlcnMsIGFuZCBpbmhlcml0ZWQgcHJvcGVydGllcy4gSXQgb25seSBnZXRzIHRoZSBsb2NhbCB2YWx1ZXMuXG4gKlxuICogVGhpcyBzaG91bGQgaG9wZWZ1bGx5IHJlc29sdmUgdGhhdCwgYnV0IEkgZG9uJ3Qga25vdyBmb3Igc3VyZS4gVGhpcyBpcyB2ZXJ5IHNrZXRjaHkuXG4gKiBUaGUgcmVzdWx0cyBhcmUgY29tcGxldGVseSBmbGF0LCBiZWNhdXNlIHlvdSBjYW4ndCBoYXZlIG11bHRpcGxlIGluaGVyaXRhbmNlIGhpZXJhcmNoeVxuICogaW4gYSBsYW5ndWFnZSB3aXRob3V0IG11bHRpcGxlIGluaGVyaXRhbmNlLiBCZWNhdXNlIHRoaXMgZmxhdHRlbnMgb2JqZWN0cywgaXQgaXMgZ3VhcmFudGVlZFxuICogdG8gYnJlYWsgYW55dGhpbmcgdGhhdCBtYWtlcyBzdXBlciBjYWxscy5cbiAqXG4gKiBJZiByZXR1cm5DbG9uZSBpcyB0cnVlLCBhIGNsb25lIG9mIHRoZSB0YXJnZXQgb2JqZWN0IHdpbGwgYmUgbW9kaWZpZWQgYW5kIHJldHVybmVkLCBsZWF2aW5nXG4gKiB0aGUgb3JpZ2luYWwgdW50b3VjaGVkLlxuICovXG5mdW5jdGlvbiBvYmplY3RGdWxsQXNzaWduKHRhcmdldCwgc291cmNlLCByZXR1cm5DbG9uZSA9IGZhbHNlKSB7XG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0ge307XG4gICAgfVxuICAgIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGlmIChyZXR1cm5DbG9uZSkge1xuICAgICAgICB0YXJnZXQgPSBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0KHRhcmdldCk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KGZpbmRUaGVQcm9wZXJ0eU5hbWVzKHNvdXJjZSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuYW1lcykge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICByZXN1bHQucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihmID0+IGYgIT09ICdjb25zdHJ1Y3RvcicpKTtcbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi5maW5kVGhlUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRUaGVQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JqZWN0RnVsbEFzc2lnbiA9IG9iamVjdEZ1bGxBc3NpZ247XG4iXX0=
