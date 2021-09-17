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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Db21wb25lbnQuanMiLCJzcmMvQXBpLmpzIiwic3JjL0Nzcy9Dc3NJbmxpbmVSdWxlLmpzIiwic3JjL0Nzcy9Dc3NSdWxlLmpzIiwic3JjL0Nzcy9Dc3NSdWxlQ29udHJhY3QuanMiLCJzcmMvQ3NzL0Nzc1ZhcmlhYmxlLmpzIiwic3JjL0Nzcy9HZXRDc3NSdWxlc0luRWxlbWVudC5qcyIsInNyYy9IdG1sL0NyZWF0ZUVsZW1lbnQuanMiLCJzcmMvSHRtbC9EZWxldGVOb2RlQ29udGVudC5qcyIsInNyYy9IdG1sL0VsZW1lbnRUeXBlLmpzIiwic3JjL0h0bWwvRXNjYXBlSHRtbC5qcyIsInNyYy9IdG1sL0V4dHJhY3ROb2RlQ29udGVudC5qcyIsInNyYy9IdG1sL0ZpbmRJbmRleEluUGFyZW50LmpzIiwic3JjL0h0bWwvRm9ybUZpZWxkVmFsdWUuanMiLCJzcmMvSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3QuanMiLCJzcmMvSHRtbC9WYWxpZGF0ZVVuaXF1ZURvbUlkcy5qcyIsInNyYy9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50LmpzIiwic3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50LmpzIiwic3JjL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JQ29tcG9uZW50QmluZGluZ09wdGlvbnMuanMiLCJzcmMvSHRtbENvbXBvbmVudC9PcHRpb25zL0lFeGlzdGluZ0VsZW1lbnRPcHRpb25zLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JRXhpc3RpbmdMb29rdXBPcHRpb25zLmpzIiwic3JjL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JSW5uZXJIdG1sT3B0aW9ucy5qcyIsInNyYy9IdG1sQ29tcG9uZW50L09wdGlvbnMvSU91dGVySHRtbE9wdGlvbnMuanMiLCJzcmMvT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZS5qcyIsInNyYy9PYnNlcnZhYmxlL0ludGVybmFsL0FycmF5T2JzZXJ2YWJsZS5qcyIsInNyYy9PYnNlcnZhYmxlL0ludGVybmFsL0FycmF5UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0T2JzZXJ2YWJsZS5qcyIsInNyYy9PYnNlcnZhYmxlL0ludGVybmFsL09iamVjdFByb3h5SGFuZGxlci5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVBc3NpZ24uanMiLCJzcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQmFzZS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm94eS5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZS5qcyIsInNyYy9Sb3V0ZXIvQWR2YW5jZWRQYWdlUm91dGVyLmpzIiwic3JjL1JvdXRlci9QYWdlUm91dGVyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL0RlbGF5LmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EeW5hbWljV2ViV29ya2VyLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZS5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnkuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3MuanMiLCJzcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZS5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlci5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZS5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50cy5qcyIsInNyYy9TeXN0ZW0vVHlwZXMvTm9uZVR5cGUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQXNzZXJ0LmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZU9iamVjdC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9FbHZpcy5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZC5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXIuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmUuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3B6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Y0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXBpXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0FwaVwiKTtcbmNvbnN0IEJvdW5kQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL0h0bWxDb21wb25lbnQvQm91bmRDb21wb25lbnRcIik7XG5jb25zdCBDb21wb25lbnRNYXBfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvSHRtbENvbXBvbmVudC9Db21wb25lbnRNYXBcIik7XG4oZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBwbHVnaW4gPSB7XG4gICAgICAgIENvbXBvbmVudDogQXBpXzEuQ29tcG9uZW50LFxuICAgICAgICBCb3VuZENvbXBvbmVudDogQm91bmRDb21wb25lbnRfMS5Cb3VuZENvbXBvbmVudCxcbiAgICAgICAgQ29tcG9uZW50TWFwOiBDb21wb25lbnRNYXBfMS5Db21wb25lbnRNYXAsXG4gICAgICAgIGdldENvbXBvbmVudDogQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50LFxuICAgIH07XG4gICAgd2luZG93Lm1pNSA9IHdpbmRvdy5taTUgfHwge307XG4gICAgd2luZG93Lm1pNS5jb21wb25lbnQgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUuY29tcG9uZW50IHx8IHt9LCBwbHVnaW4pO1xuICAgIC8qKlxuICAgICAqIFRoaXMgc2xpZ2h0bHkgc2ltcGxpZmVzIHRoZSBwcm9jZXNzIG9mIHJlZmVyZW5jaW5nIG1pbmktaWNoaWdvIGNvbXBvbmVudHMgd2l0aG91dCB0aGUgZnVsbCBuYW1lc3BhY2UuXG4gICAgICogSXQgcmVxdWlyZXMgdHdvIGFyZ3VtZW50cywgdW5mb3J0dW5hdGVseSwgYmVjYXVzZSBpdCdzIG5vdCBwb3NzaWJsZSBpbiBtYW55IGNhc2VzIHRvIGRldGVybWluZSB0aGVcbiAgICAgKiBjbGFzcyBvciBmdW5jdGlvbiBuYW1lLiBPZnRlbiB0aGUgJ25hbWUnIHByb3BlcnR5IGhhcyBvbmx5IHRoZSBtaW5pZmllZCBuYW1lLCBhIHJhbmRvbSBsZXR0ZXIuXG4gICAgICovXG4gICAgd2luZG93Lm1pNS51c2luZyA9IGZ1bmN0aW9uIHVzaW5nKGxpYiwgYWxpYXMpIHtcbiAgICAgICAgaWYgKCFsaWIgfHwgIWFsaWFzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ051bGxBcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5ldmFsLmNhbGwod2luZG93LCAnKGZ1bmN0aW9uIChhcmcpIHsgd2luZG93LicgKyBhbGlhcyArICcgPSBhcmc7IH0pJykobGliKTtcbiAgICB9O1xufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0Nzcy9Dc3NJbmxpbmVSdWxlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0Nzcy9Dc3NSdWxlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0Nzcy9Dc3NSdWxlQ29udHJhY3RcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vQ3NzL0Nzc1ZhcmlhYmxlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0Nzcy9HZXRDc3NSdWxlc0luRWxlbWVudFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9EZWxldGVOb2RlQ29udGVudFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sL0VsZW1lbnRUeXBlXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWwvRXNjYXBlSHRtbFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sL0ZpbmRJbmRleEluUGFyZW50XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWwvRm9ybUZpZWxkVmFsdWVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9RdWVyeVNlbGVjdG9yTm9kZUxpc3RcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbC9WYWxpZGF0ZVVuaXF1ZURvbUlkc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sQ29tcG9uZW50L0JvdW5kQ29tcG9uZW50XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWxDb21wb25lbnQvQ29tcG9uZW50XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWxDb21wb25lbnQvQ29tcG9uZW50TWFwXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JRXhpc3RpbmdFbGVtZW50T3B0aW9uc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9IdG1sQ29tcG9uZW50L09wdGlvbnMvSUlubmVySHRtbE9wdGlvbnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbENvbXBvbmVudC9PcHRpb25zL0lFeGlzdGluZ0xvb2t1cE9wdGlvbnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vSHRtbENvbXBvbmVudC9PcHRpb25zL0lPdXRlckh0bWxPcHRpb25zXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0h0bWxDb21wb25lbnQvT3B0aW9ucy9JQ29tcG9uZW50QmluZGluZ09wdGlvbnNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9PYnNlcnZhYmxlL09ic2VydmFibGVBc3NpZ25cIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlQmFzZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9PYnNlcnZhYmxlL09ic2VydmFibGVQcm94eVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9Sb3V0ZXIvUGFnZVJvdXRlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9Sb3V0ZXIvQWR2YW5jZWRQYWdlUm91dGVyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9Bc3luYy9EeW5hbWljV2ViV29ya2VyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2VcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0FzeW5jL0RlbGF5XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0NvbGxlY3Rpb25zL09yZGVyQnlcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3NcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL0V2ZW50SGFuZGxlci9EZWxlZ2F0ZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVHlwZXMvS2V5d29yZEFyZ3VtZW50c1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvQXNzZXJ0XCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVXRpbGl0eS9DbG9uZU9iamVjdFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVXRpbGl0eS9FbHZpc1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENzc1J1bGVfMSA9IHJlcXVpcmUoXCIuL0Nzc1J1bGVcIik7XG4vKipcbiAqIEEgc2ltcGxlLCBkZWZhdWx0IENzcyBSdWxlIHRoYXQgaXMgd2l0aCBhbiBpbmxpbmUgaW5pdGlhbGl6ZXIgaW4gdGhlIGNvbnN0cnVjdG9yLCB1c2VmdWwgZm9yIHF1aWNrIGFuZCBkaXJ0eSBpbmxpbmUgY2xhc3Nlcy5cbiAqL1xuY2xhc3MgQ3NzSW5saW5lUnVsZSBleHRlbmRzIENzc1J1bGVfMS5Dc3NSdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgaW5pdGlhbCwgcGFyZW50KSB7XG4gICAgICAgIHN1cGVyKHBhcmVudCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgaW5pdGlhbCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IkID0gc2VsZWN0b3I7XG4gICAgfVxufVxuZXhwb3J0cy5Dc3NJbmxpbmVSdWxlID0gQ3NzSW5saW5lUnVsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IENvbnN0cnVjdGFibGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvQ29uc3RydWN0YWJsZVwiKTtcbmNvbnN0IEdldFVuaXF1ZUlkXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvR2V0VW5pcXVlSWRcIik7XG5jb25zdCBDc3NWYXJpYWJsZV8xID0gcmVxdWlyZShcIi4vQ3NzVmFyaWFibGVcIik7XG4vKipcbiAqIEEgSmF2YXNjcmlwdCBDU1MgcnVsZS4gTm90ZSB0aGUgY2FwaXRhbGl6YXRpb24uIFRoaXMgaXNuJ3QgdGhlIHNhbWUgYXMgQ1NTUnVsZS4gSSdtIGNvbnNpZGVyaW5nIHJlbmFtaW5nIHRoaXMgdG9cbiAqIENzc0pzUnVsZSBidXQgSSdtIGhvcGluZyBJIHRoaW5rIHVwIHNvbWV0aGluZyBiZXR0ZXIuIEl0IGhhcyB0byBiZSBtb3JlIGdlbmVyaWMgdGhhbiBDc3NDbGFzcyBiZWNhdXNlLCB3ZWxsLCB0aGVyZSdzXG4gKiBtb3JlIHRvIENTUyB0aGFuIGNsYXNzIHNlbGVjdG9ycy5cbiAqL1xuY2xhc3MgQ3NzUnVsZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50KSB7XG4gICAgICAgIC8qKiBTdG9yaW5nIHRoaXMgc29tZXdoZXJlIG90aGVyIHRoYW4gdGhlIEhFQUQgd291bGQgbWFrZSBpdCBlYXN5IHRvIGRyb3AgdGhlIHNoZWV0IG9uIHBhZ2UgY2hhbmdlLiAqL1xuICAgICAgICB0aGlzLnN0eWxlU2hlZXRQYXJlbnQkID0gZG9jdW1lbnQuaGVhZDtcbiAgICAgICAgdGhpcy5zdHlsZVNoZWV0SWQkID0gR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCgpO1xuICAgICAgICB0aGlzLmV4dGVuZHMkID0gW107XG4gICAgICAgIHRoaXMubmVzdGVkJCA9IFtdO1xuICAgICAgICB0aGlzLnJldmVydCQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29uc3RydWN0ZWQkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NlbGVjdG9ycyQgPSBbXTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVNoZWV0UGFyZW50JCA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIkKHBhcmVudFNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghdGhpcy5fY29uc3RydWN0ZWQkKSB7XG4gICAgICAgICAgICAvLyBSZW1lbWJlciwgd2UgY2Fubm90IHJlYWQgcHJvcGVydGllcyBvZiB0aGlzIGluIHRoZSBjb25zdHJ1Y3RvciwgYmVjYXVzZSB0aGVpciBwb3B1bGF0aW9uIGlzIGVtaXR0ZWRcbiAgICAgICAgICAgIC8vIGFmdGVyIHRoZSBzdXBlcigpIGNhbGwuIEJ1dCB3ZSBkb24ndCB3YW50IHRvIGNsb25lIHRoaXMgb2JqZWN0IGFuZCByZXBlYXQgdGhpcyBldmVyeSB0aW1lIGl0J3MgcmVuZGVyZWQuXG4gICAgICAgICAgICB0aGlzLl9jb25zdHJ1Y3RlZCQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMucmV2ZXJ0JCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9leHRlbmRDbGFzcyQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm5lc3RlZCQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5uZXN0ZWQkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5lc3RlZCQgPSBbdGhpcy5uZXN0ZWQkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBbaWR4LCBuZXN0XSBvZiB0aGlzLm5lc3RlZCQuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQobmVzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmVzdGVkJFtpZHhdID0gbmV3IG5lc3QodGhpcy5zdHlsZVNoZWV0UGFyZW50JCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9idWlsZFNlbGVjdG9ycyQocGFyZW50U2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhIHNlcGFyYXRlIHN0eWxlIGVsZW1lbnQgZm9yIGVhY2ggcnVsZS4gVGhhdCBtaWdodCBzZWVtIHByZXR0eSBleGNlc3NpdmUsIGJ1dCBpdCdzIHRoZSBvbmx5IHdheVxuICAgICAgICAvLyB0byBtYWtlIGl0IGVhc3kgdG8gdXBkYXRlIHJ1bGVzLiBUaGUgQVBJIGZvciBkZWFsaW5nIHdpdGggQ1NTIGluIEhUTUw1IGlzIE5BQUFBQUFBU1RZLlxuICAgICAgICBsZXQgc3R5bGVFbGVtZW50ID0gdGhpcy5zdHlsZVNoZWV0UGFyZW50JC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuc3R5bGVTaGVldElkJCk7XG4gICAgICAgIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVTaGVldFBhcmVudCQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUVsZW1lbnQgPSB0aGlzLnN0eWxlU2hlZXRQYXJlbnQkLmFwcGVuZENoaWxkKENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFN0eWxlRWxlbWVudCwgeyBpZDogdGhpcy5zdHlsZVNoZWV0SWQkIH0pKTtcbiAgICAgICAgY29uc3Qgc2hlZXQgPSBzdHlsZUVsZW1lbnQuc2hlZXQ7XG4gICAgICAgIHRoaXMuX2J1aWxkUnVsZSQoc2hlZXQpO1xuICAgICAgICBpZiAodGhpcy5uZXN0ZWQkKSB7XG4gICAgICAgICAgICAvLyBXZSBwcmV2aW91c2x5IG1hZGUgdGhpcyBhbiBhcnJheSBvZiBjb25zdHJ1Y3RlZCB0eXBlcy5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbmVzdCBvZiB0aGlzLm5lc3RlZCQpIHtcbiAgICAgICAgICAgICAgICBuZXN0LnN0eWxlU2hlZXRQYXJlbnQkID0gdGhpcy5zdHlsZVNoZWV0UGFyZW50JDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNlbCBvZiB0aGlzLl9zZWxlY3RvcnMkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5lc3QucmVuZGVyJChzZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlJCgpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gdGhpcy5zdHlsZVNoZWV0UGFyZW50JC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuc3R5bGVTaGVldElkJCk7XG4gICAgICAgIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVTaGVldFBhcmVudCQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnQgXCJtdWx0aXBsZSBpbmhlcml0YW5jZVwiLlxuICAgICAqXG4gICAgICogVGhpcyBjaGVja3Mgb25seSBDU1MgcHJvcGVydGllcy4gSWYgeW91IGluaGVyaXQgZnJvbSBvdGhlciBDc3NSdWxlIGNsYXNzZXMgdGhhdFxuICAgICAqIHRoZW1zZWx2ZXMgaGF2ZSBleHRlbmRzJCBzZXQsIHRob3NlIGFyZSBub3QgY2hlY2tlZC4gSSBkb24ndCB0aGluayB0aGVyZSdzIGVub3VnaFxuICAgICAqIGp1c3RpZmljYXRpb24gdG8gYnJpbmcgcmVjdXJzaW9uIGludG8gdGhpcy5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBwcmlvcml0eSBpcyBpbiB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uIG9mIG5vcm1hbCBpbmhlcml0YW5jZSBwcmlvcml0eS5cbiAgICAgKiBOb3JtYWxseSwgd2hlbiBsb29raW5nIGZvciBhIHByb3BlcnR5LCB0aGUgcnVudGltZSB0cmF2ZXJzZXMgdGhlIGluaGVyaXRhbmNlIHRyZWVcbiAgICAgKiBhbmQgdXNlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZS4gSW4gQ1NTLCB0aGUgTEFTVCBvY2N1cmFuY2UgdGFrZXMgcHJpb3JpdHkuXG4gICAgICovXG4gICAgX2V4dGVuZENsYXNzJCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmV4dGVuZHMkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZXh0ZW5kcyQpKSB7XG4gICAgICAgICAgICB0aGlzLmV4dGVuZHMkID0gW3RoaXMuZXh0ZW5kcyRdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZXggb2YgdGhpcy5leHRlbmRzJCkge1xuICAgICAgICAgICAgbGV0IHRyYWl0U291cmNlO1xuICAgICAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChleCkpIHtcbiAgICAgICAgICAgICAgICB0cmFpdFNvdXJjZSA9IG5ldyBleCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhaXRTb3VyY2UgPSBleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5hbWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KGZpbmRQcm9wZXJ0eU5hbWVzKHRyYWl0U291cmNlKSkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IG5hbWVzIHdpdGggc3BlY2lhbCBtZWFuaW5nXG4gICAgICAgICAgICAgICAgaWYgKGtleS5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0cmFpdFNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9idWlsZFNlbGVjdG9ycyQocGFyZW50U2VsZWN0b3IpIHtcbiAgICAgICAgcGFyZW50U2VsZWN0b3IgPSAocGFyZW50U2VsZWN0b3IgfHwgJycpO1xuICAgICAgICAvLyBJZiBzY29wZUVsZW1lbnQkIGlzIHNldCwgPHN0eWxlIHNjb3BlZD4gaXMgc2ltdWxhdGVkIGluIGEgaGFja3kgd2F5LiBJdCBnZW5lcmF0ZXMgYW4gcmFuZG9tIGNsYXNzIG5hbWUgYW5kIGFkZHNcbiAgICAgICAgLy8gdGhhdCB0byBib3RoIHRoZSBzZWxlY3RvciBhbmQgdGhlIGVsZW1lbnQuIFRoaXMgc2ltaWxhciB0byB0aGUgd2F5IENTUyBNb2R1bGVzIGFuZCBBbmd1bGFyIGRvIGl0LCBleGNlcHQgdGhlXG4gICAgICAgIC8vIHJhbmRvbSBzZWxlY3RvciBjb21lcyBkdXJpbmcgcnVudGltZSBpbnN0ZWFkIG9mIGEgY3VzdG9tIGJ1aWxkIHByb2Nlc3MuXG4gICAgICAgIGlmICh0aGlzLnNjb3BlRWxlbWVudCQgJiYgIXRoaXMuX2Zha2VTY29wZUNsYXNzJCkge1xuICAgICAgICAgICAgdGhpcy5fZmFrZVNjb3BlQ2xhc3MkID0gdGhpcy5fZmFrZVNjb3BlQ2xhc3MkIHx8ICdzY29wZS0nICsgR2V0VW5pcXVlSWRfMS5nZXRVbmlxdWVJZCgpO1xuICAgICAgICAgICAgdGhpcy5zY29wZUVsZW1lbnQkLmNsYXNzTGlzdC5hZGQodGhpcy5fZmFrZVNjb3BlQ2xhc3MkKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBzZWwgb2YgdGhpcy5zZWxlY3RvciQuc3BsaXQoJywnKS5tYXAobSA9PiBtLnRyaW0oKSkpIHtcbiAgICAgICAgICAgIHNlbCA9IChzZWwgfHwgJycpLnJlcGxhY2UoJyYnLCAnJyk7IC8vIEFtcGVyc2FuZCB0ZWxscyB1cyB3aGVyZSB0byBzdGFydCAoYWxsb3dzIGEgc3BhY2UpIGJ1dCBpdCdzIGludmFsaWQgQ1NTXG4gICAgICAgICAgICBpZiAodGhpcy5fZmFrZVNjb3BlQ2xhc3MkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3JzJC5wdXNoKHBhcmVudFNlbGVjdG9yICsgJy4nICsgdGhpcy5fZmFrZVNjb3BlQ2xhc3MkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByb2R1Y2UgYW4gaWQgbGlrZSBcImRpdi5hdXRvZ2VuIC5vdGhlcmNsYXNzLCAuYXV0b2dlbiBkaXYgLm90aGVyY2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkcyA9IHNlbC5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICB3b3Jkc1swXSA9IHBhcmVudFNlbGVjdG9yICsgd29yZHNbMF0gKyAnLicgKyB0aGlzLl9mYWtlU2NvcGVDbGFzcyQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9ycyQucHVzaCh3b3Jkcy5qb2luKCcgJykudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgaXMgbm8gQ1NTIHNlbGVjdG9yIHRoYXQgbWF0Y2hlcyBhbiBpdGVtIGFuZCBpdHMgY2hpbGRyZW4uIEl0IHRha2VzIDIgcnVsZXMuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9ycyQucHVzaCgocGFyZW50U2VsZWN0b3IgKyAnLicgKyB0aGlzLl9mYWtlU2NvcGVDbGFzcyQgKyAnICcgKyBzZWwpLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXNlbCkge1xuICAgICAgICAgICAgICAgIC8vIEEgYmxhbmsgc2VsZWN0b3Igd2lsbCBmYWlsXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9ycyQucHVzaChwYXJlbnRTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvcnMkLnB1c2goJ2JvZHknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvcnMkLnB1c2gocGFyZW50U2VsZWN0b3IgKyBzZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9idWlsZFJ1bGUkKHNoZWV0KSB7XG4gICAgICAgIGNvbnN0IHJ1bGVUZXh0ID0gW107XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IFtdO1xuICAgICAgICBjb25zdCBuYW1lcyA9IEFycmF5LmZyb20obmV3IFNldChmaW5kUHJvcGVydHlOYW1lcyh0aGlzKSkpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBuYW1lcykge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBuYW1lcyB3aXRoIHNwZWNpYWwgbWVhbmluZ1xuICAgICAgICAgICAgaWYgKGtleS5lbmRzV2l0aCgnJCcpIHx8ICF0aGlzW2tleV0gfHwgdHlwZW9mIHRoaXNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgVHlwZXNjcmlwdCB3YXMgd29ya2luZyBjb3JyZWN0bHksIHdlIGtub3cgdGhhdCBhbGwgcHJvcGVydGllcyB0aGF0IGRvbid0IGVuZCBpbiAkIGFyZSBSdWxlVmFsdWUgdHlwZS5cbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXNba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJ1bGVUZXh0LnB1c2goYCR7a2V5fTogJHt2YWx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWwgaW5zdGFuY2VvZiBDc3NWYXJpYWJsZV8xLkNzc1ZhcmlhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFyaWFibGVzLnB1c2godmFsKTtcbiAgICAgICAgICAgICAgICBydWxlVGV4dC5wdXNoKGAke2tleX06IHZhcigtLSR7dmFsLm5hbWV9KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTmVzdGVkIHByb3BlcnRpZXMsIHdoaWNoIGV4dGVuZCB0aGUga2V5IGFuZCBhZGQgbW9yZSBydWxlc1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbnAgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaG91bGQgbmV2ZXIgaGFwcGVuXG4gICAgICAgICAgICAgICAgICAgIGlmIChucC5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2cCA9IHZhbFtucF07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdnAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBydWxlVGV4dC5wdXNoKGAke2tleX0tJHtucH06ICR7dnB9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXMucHVzaCh2cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBydWxlVGV4dC5wdXNoKGAke2tleX0tJHtucH06IHZhcigtLSR7dmFsLm5hbWV9KWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZ1bGxTZWxlY3RvciA9IHRoaXMuX3NlbGVjdG9ycyQuam9pbignLCAnKTtcbiAgICAgICAgY29uc3QgZnVsbFRleHQgPSBydWxlVGV4dC5qb2luKCc7IFxcbicpO1xuICAgICAgICBpZiAoIWZ1bGxUZXh0KSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBObyBDU1MgcHJvcGVydGllcyBkZWZpbmVkIGZvciBydWxlOiAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gb24gJHtmdWxsU2VsZWN0b3J9LmApO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmdWxsUnVsZSA9IGAke2Z1bGxTZWxlY3Rvcn0geyBcXG4ke2Z1bGxUZXh0fTsgXFxufWA7XG4gICAgICAgIGlmICh0aGlzLm1lZGlhJCkge1xuICAgICAgICAgICAgZnVsbFJ1bGUgPSBgQG1lZGlhICR7dGhpcy5tZWRpYSR9IHsgXFxuJHtmdWxsUnVsZX1cXG59YDtcbiAgICAgICAgfVxuICAgICAgICBzaGVldC5pbnNlcnRSdWxlKGZ1bGxSdWxlLCAwKTtcbiAgICAgICAgLy8gQWRkIGFsbCB0aGUgdmFyaWFibGUgdmFsdWVzXG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgZm9yIChjb25zdCB2IG9mIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgY29uc3QgdmFyVGV4dCA9IGAke3Yuc2NvcGV9IHsgLS0ke3YubmFtZX06ICR7di52YWx1ZX07IH1gO1xuICAgICAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZSh2YXJUZXh0LCBpKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ3NzUnVsZSA9IENzc1J1bGU7XG5mdW5jdGlvbiBmaW5kUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihmID0+IGYgIT09ICdjb25zdHJ1Y3RvcicpKTtcbiAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIGlmIChwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnT2JqZWN0Jykge1xuICAgICAgICByZXN1bHQucHVzaCguLi5maW5kUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoaXMgdHlwZSBpcyBoZXJlIGZvciBhIGJ1bGxzaGl0IHJlYXNvbiwgd2hpY2ggaXMgdGhhdCBpZiB5b3Ugd2FudCB0byByZXF1aXJlIHZhbHVlcyB0byBiZSBhbGwgc3RyaW5ncywgdGhpcyBjb3B5cGFzdGFcbiAqIG11c3QgYmUgaW5jbHVkZWQgaW4gdGhlIGRlZmluaXRpb24gb2YgdGhlIGNsYXNzLiBUaGF0J3MgZ29pbmcgZmFyIGJleW9uZCB0aW1lIGNoZWNraW5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNTMwMCAobm90IGp1c3QgaW50ZXJmYWNlcylcbiAqL1xuY2xhc3MgQ3NzU2ltcGxlUnVsZSB7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbCkge1xuICAgICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBpbml0aWFsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ3NzU2ltcGxlUnVsZSA9IENzc1NpbXBsZVJ1bGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVXNlIHRvIGRlZmluZSBhIENTUyBjdXN0b20gcHJvcGVydHkuXG4gKi9cbmNsYXNzIENzc1ZhcmlhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB2YWx1ZSwgc2NvcGUgPSAnOnJvb3QnKSB7XG4gICAgICAgIHRoaXMuc2NvcGUgPSAnOnJvb3QnO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB9XG59XG5leHBvcnRzLkNzc1ZhcmlhYmxlID0gQ3NzVmFyaWFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGdldENzc1J1bGVzSW5FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHN0eWxlIG9mIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc3R5bGUnKSkge1xuICAgICAgICBmb3IgKGNvbnN0IHJ1bGUgb2Ygc3R5bGUuc2hlZXQuY3NzUnVsZXMpIHtcbiAgICAgICAgICAgIC8vIEEgdmVyeSBtaW5pbXVtIG9mIHByZXR0eSBwcmludGluZy4gSSBtYXkgYmVlZiBpdCB1cCBsYXRlci5cbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHJ1bGUuY3NzVGV4dC5yZXBsYWNlKC9cXHsvZywgJ1xcbiAgICB7XFxuICAgJykucmVwbGFjZSgvOy9nLCAnO1xcbiAgICAnKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCdcXG4nKTtcbn1cbmV4cG9ydHMuZ2V0Q3NzUnVsZXNJbkVsZW1lbnQgPSBnZXRDc3NSdWxlc0luRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZ05hbWUsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IHRhZ05hbWUsIHByb3BlcnRpZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHRhZ05hbWUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAvLyBBbGxvdyBhdHRyaWJ1dGVzIHRvIGJlIHNlbnQgb24gcHJvcGVydGllcywgcHJvdmlkaW5nIGEgY2xlYW5lciBpbnRlcmZhY2UuXG4gICAgLy8gSXQgYWxsb3dzIHlvdSB0byBzZW5kIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHthdHRyaWJ1dGVzOiB7IGNsYXNzOiAnZm9vJyB9fSkgaW5zdGVhZCBvZiBjcmVhdGVFbGVtZW50KCdkaXYnLCBudWxsLCB7IGNsYXNzOiAnZm9vJyB9KTtcbiAgICAvLyBBbm90aGVyIG9wdGlvbiBpcyB0byB1c2UgS3dhcmdzLCBidXQgbm90IGV2ZXJ5b25lIHdhbnRzIHRvLlxuICAgIGlmIChwcm9wZXJ0aWVzICYmICdhdHRyaWJ1dGVzJyBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMgfHwge30sIHByb3BlcnRpZXMuYXR0cmlidXRlcyk7XG4gICAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzLmF0dHJpYnV0ZXM7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGUodGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuZnVuY3Rpb24gY3JlYXRlKHRhZywgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IChkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZykpO1xuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlidXRlc1thdHRyXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRE9NIHByb3BlcnRpZXMgdGFrZSBwcmVjZWRlbmNlIG92ZXIgYXR0cmlidXRlcywgYmVjYXVzZSBpbiBzb21lIGNhc2VzLCB0aGV5IG92ZXJyaWRlIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwgcHJvcGVydGllcyk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG4vKipcbiAqIFF1aWNrIGhlbHBlciB0byBjcmVhdGUgSFRNTCBmcm9tIGFueSBIVE1MIGVsZW1lbnQgcHJvdmlkZWQuXG4gKiBVc2UgbGlrZSBjb25zdCBkaXYgPSBjcmVhdGVIdG1sPEhUTUxEaXZFbGVtZW50PihcIjxkaXY+U29tZXRoaW5nPC9kaXY+XCIpIG9yIGNvbnN0IGN1c3RvbSA9IGNyZWF0ZUh0bWwoXCI8c29tZS10YWc+PC9zb21lLXRhZz5cIikuXG4gKiBJZiBtdWx0aXBsZSBlbGVtZW50cyBvciBhIHBsYWluIHRleHQgc3RyaW5nIHdpdGggbm8gSFRNTCBpcyBwcm92aWRlZCwgdGhlbiBpdCB3aWxsIGJlIHdyYXBwZWQgaW4gYSBkaXYsIHNvIGl0IGNhbiBrZWVwXG4gKiByZXR1cm5pbmcgYW4gSFRNTEVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSHRtbChodG1sLCBpbmxpbmUgPSBmYWxzZSkge1xuICAgIGxldCB3cmFwcGVyO1xuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgICAgd3JhcHBlciA9IHNwYW4oKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB3cmFwcGVyID0gZGl2KChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIH1cbiAgICBjb25zdCBub2RlcyA9IHdyYXBwZXIuY2hpbGROb2RlcztcbiAgICAvLyBNdWx0aXBsZSBub2RlcywgcmV0dXJuIHRoZSB3cmFwcGluZyBkaXZcbiAgICAvLyBlLmcuIFwiVGhpcyBpcyBhIDxlbT50ZXN0PC9lbT5cIiBvciBcIjxkaXY+SGVsbG88L2Rpdj48ZGl2PldvcmxkPC9kaXY+XCJcbiAgICBpZiAobm9kZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cbiAgICAvLyBJZiBqdXN0IGEgdGV4dG5vZGUgKG9yIGVtcHR5KSwgcmV0dXJuIGEgc3Bhbi4gVGV4dCBpcyBpbmNvbXBhdGlibGUgd2l0aCBIVE1MRWxlbWVudCBzbyBjYW4ndCByZXR1cm4gdGhhdFxuICAgIC8vIGUuZy4gXCJIZWxsbyB3b3JsZFwiXG4gICAgaWYgKCF3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIGlmIChpbmxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyOyAvLyBUaGlzIGlzIGEgc3BhblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNwYW4od3JhcHBlci5pbm5lckhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEVsc2UgcmV0dXJuIHRoZSBzaW5nbGUgY2hpbGQuXG4gICAgLy8gZS5nLiBcIjxkaXY+PGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj48L2Rpdj5cIlxuICAgIHJldHVybiB3cmFwcGVyLmZpcnN0RWxlbWVudENoaWxkO1xufVxuZXhwb3J0cy5jcmVhdGVIdG1sID0gY3JlYXRlSHRtbDtcbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHdpdGggYW55IGh0bWwuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KGh0bWwpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gZGl2KChodG1sIHx8ICcnKS50cmltKCkpO1xuICAgIHJldHVybiBFeHRyYWN0Tm9kZUNvbnRlbnRfMS5leHRyYWN0Tm9kZUNvbnRlbnQod3JhcHBlcik7XG59XG5leHBvcnRzLmNyZWF0ZUZyYWdtZW50ID0gY3JlYXRlRnJhZ21lbnQ7XG5mdW5jdGlvbiBkaXYoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuZGl2ID0gZGl2O1xuZnVuY3Rpb24gc3BhbihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFNwYW5FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuc3BhbiA9IHNwYW47XG5mdW5jdGlvbiBwYXJhZ3JhcGgoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxQYXJhZ3JhcGhFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMucGFyYWdyYXBoID0gcGFyYWdyYXBoO1xuZnVuY3Rpb24gYW5jaG9yKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBocmVmT3JQcm9wZXJ0aWVzID0ge30sIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBocmVmT3JQcm9wZXJ0aWVzID0ge30sIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIGhyZWZPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICBjb25zdCB0bXAgPSBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MQW5jaG9yRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgaWYgKHR5cGVvZiBocmVmT3JQcm9wZXJ0aWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICB0bXAuaHJlZiA9IFN0cmluZyhocmVmT3JQcm9wZXJ0aWVzIHx8ICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRtcDtcbn1cbmV4cG9ydHMuYW5jaG9yID0gYW5jaG9yO1xuZnVuY3Rpb24gYnV0dG9uKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MQnV0dG9uRWxlbWVudCwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG59XG5leHBvcnRzLmJ1dHRvbiA9IGJ1dHRvbjtcbi8vIENvbW1vbiBwcml2YXRlIGZ1bmN0aW9ucyBmb3Igb3ZlcmxvYWRzLiBQcmV2ZW50cyBsb3RzIG9mIGNvcHlwYXN0YS5cbi8vIFRoaXMgd29ya3MgZm9yIGV2ZXJ5dGhpbmcgYmVjYXVzZSBUeXBlU2NyaXB0IGlzIGtlZXBpbmcgdGhlIHR5cGVzIHZhbGlkLiBJbiBwdXJlIEpTLCBidWdzIGNvdWxkIGJlIGNyZWF0ZWQgKGZvciBleGFtcGxlLCBwYXNzaW5nIGFuIGlubmVyXG4vLyBlbGVtZW50IHRvIGEgcGFyYWdyYXBoIC4uLiBkaXNhbGxvd2VkIGJ5IFRTIGJ1dCB0aGUgY29kZSBpcyB0aGVyZSBpbiB0aGUgSlMpXG5mdW5jdGlvbiBfaW50ZXJuYWwodHlwZSwgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgIGlmIChodG1sT3JQcm9wZXJ0aWVzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9vdnIxKHR5cGUsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaHRtbE9yUHJvcGVydGllcyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gX292cjModHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX292cjIodHlwZSwgU3RyaW5nKGh0bWxPclByb3BlcnRpZXMgfHwgJycpLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfb3ZyMSh0eXBlLCBpbm5lckVsZW1lbnQsIHByb3BzLCBhdHRycykge1xuICAgIGNvbnN0IGUgPSBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG4gICAgZS5hcHBlbmRDaGlsZChpbm5lckVsZW1lbnQpO1xuICAgIHJldHVybiBlO1xufVxuZnVuY3Rpb24gX292cjIodHlwZSwgaW5uZXJIdG1sLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IGlubmVySHRtbDtcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuZnVuY3Rpb24gX292cjModHlwZSwgcHJvcHMsIGF0dHJzKSB7XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBwcm9wcy5pbm5lckhUTUwgPSBwcm9wcy5pbm5lckhUTUwgfHwgJyc7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBEZWxldGUgdGhlIGNvbnRlbnRzIG9mIGFueSBodG1sIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVDb250ZW50KG5vZGUpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xuICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG59XG5leHBvcnRzLmRlbGV0ZU5vZGVDb250ZW50ID0gZGVsZXRlTm9kZUNvbnRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBoZWxwZXIgZm9yIENyZWF0ZUVsZW1lbnQsIHJvdWdobHkgbWFwcGluZyB0byBIdG1sRWxlbWVudCB0eXBlcywgYnV0IG5vdCBwZXJmZWN0bHkgYmVjYXVzZSBpdCdzIGltcG9zc2libGVcbiAqICh0aGVyZSdzIG5vIHBlcmZlY3QgMToxIHJlbGF0aW9uc2hpcCkuXG4gKi9cbnZhciBlbGVtZW50VHlwZTtcbihmdW5jdGlvbiAoZWxlbWVudFR5cGUpIHtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBbmNob3JFbGVtZW50XCJdID0gXCJhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQXJlYUVsZW1lbnRcIl0gPSBcImFyZWFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBdWRpb0VsZW1lbnRcIl0gPSBcImF1ZGlvXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQlJFbGVtZW50XCJdID0gXCJiclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJhc2VGb250RWxlbWVudFwiXSA9IFwiYmFzZWZvbnRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCbG9ja1F1b3RlRWxlbWVudFwiXSA9IFwiYmxvY2txdW90ZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJ1dHRvbkVsZW1lbnRcIl0gPSBcImJ1dHRvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTENhbnZhc0VsZW1lbnRcIl0gPSBcImNhbnZhc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERhdGFFbGVtZW50XCJdID0gXCJkYXRhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGF0YUxpc3RFbGVtZW50XCJdID0gXCJkYXRhbGlzdFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpYWxvZ0VsZW1lbnRcIl0gPSBcImRpYWxvZ1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERpdkVsZW1lbnRcIl0gPSBcImRpdlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTERMaXN0RWxlbWVudFwiXSA9IFwiZGxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxFbWJlZEVsZW1lbnRcIl0gPSBcImVtYmVkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRmllbGRTZXRFbGVtZW50XCJdID0gXCJmaWVsZHNldFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEZvcm1FbGVtZW50XCJdID0gXCJmb3JtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzFFbGVtZW50XCJdID0gXCJoMVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmcyRWxlbWVudFwiXSA9IFwiaDJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nM0VsZW1lbnRcIl0gPSBcImgzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzRFbGVtZW50XCJdID0gXCJoNFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc1RWxlbWVudFwiXSA9IFwiaDVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNkVsZW1lbnRcIl0gPSBcImg2XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSFJFbGVtZW50XCJdID0gXCJoclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEltYWdlRWxlbWVudFwiXSA9IFwiaW1hZ2VcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxJbnB1dEVsZW1lbnRcIl0gPSBcImlucHV0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGFiZWxFbGVtZW50XCJdID0gXCJsYWJlbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExlZ2VuZEVsZW1lbnRcIl0gPSBcImxlZ2VuZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExJRWxlbWVudFwiXSA9IFwibGlcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMaW5rRWxlbWVudFwiXSA9IFwibGlua1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1hcEVsZW1lbnRcIl0gPSBcIm1hcFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1ldGVyRWxlbWVudFwiXSA9IFwibWV0ZXJcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2REZWxFbGVtZW50XCJdID0gXCJkZWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxNb2RJbnNFbGVtZW50XCJdID0gXCJpbnNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPTGlzdEVsZW1lbnRcIl0gPSBcIm9sXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT2JqZWN0RWxlbWVudFwiXSA9IFwib2JqZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3B0R3JvdXBFbGVtZW50XCJdID0gXCJvcHRncm91cFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9wdGlvbkVsZW1lbnRcIl0gPSBcIm9wdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE91dHB1dEVsZW1lbnRcIl0gPSBcIm91dHB1dFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBhcmFncmFwaEVsZW1lbnRcIl0gPSBcInBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQYXJhbUVsZW1lbnRcIl0gPSBcInBhcmFtXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGljdHVyZUVsZW1lbnRcIl0gPSBcInBpY3R1cmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcmVFbGVtZW50XCJdID0gXCJwcmVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQcm9ncmVzc0VsZW1lbnRcIl0gPSBcInByb2dyZXNzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUXVvdGVFbGVtZW50XCJdID0gXCJxXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2NyaXB0RWxlbWVudFwiXSA9IFwic2NyaXB0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU2VsZWN0RWxlbWVudFwiXSA9IFwic2VsZWN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU291cmNlRWxlbWVudFwiXSA9IFwic291cmNlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MU3BhbkVsZW1lbnRcIl0gPSBcInNwYW5cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTdHlsZUVsZW1lbnRcIl0gPSBcInN0eWxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDYXB0aW9uRWxlbWVudFwiXSA9IFwiY2FwdGlvblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlRGF0YUNlbGxFbGVtZW50XCJdID0gXCJ0ZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlSGVhZGVyQ2VsbEVsZW1lbnRcIl0gPSBcInRoXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVDb2xFbGVtZW50XCJdID0gXCJjb2xcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNvbEdyb3VwRWxlbWVudFwiXSA9IFwiY29sZ3JvdXBcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUVsZW1lbnRcIl0gPSBcInRhYmxlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVSb3dFbGVtZW50XCJdID0gXCJ0clwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkJvZHlFbGVtZW50XCJdID0gXCJ0Ym9keVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlU2VjdGlvbkZvb3RlckVsZW1lbnRcIl0gPSBcInRmb290XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uSGVhZGVyRWxlbWVudFwiXSA9IFwidGhlYWRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUZW1wbGF0ZUVsZW1lbnRcIl0gPSBcInRlbXBsYXRlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGV4dEFyZWFFbGVtZW50XCJdID0gXCJ0ZXh0YXJlYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRpbWVFbGVtZW50XCJdID0gXCJ0aW1lXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVHJhY2tFbGVtZW50XCJdID0gXCJ0cmFja1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFVMaXN0RWxlbWVudFwiXSA9IFwidWxcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxWaWRlb0VsZW1lbnRcIl0gPSBcInZpZGVvXCI7XG59KShlbGVtZW50VHlwZSA9IGV4cG9ydHMuZWxlbWVudFR5cGUgfHwgKGV4cG9ydHMuZWxlbWVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKGlucHV0KSB7XG4gICAgLy8gVGhlcmUgaXNuJ3QgYSBidWlsdC1pbiB3YXkgdG8gZG8gdGhpcywgc3RpbGwsIHNvIHdlIG5lZWQgYSBoZWxwZXIgZnVuY3Rpb24uXG4gICAgLy8gVGhlIGFydGljbGUgXCJZb3UgYXJlIHByb2JhYmx5IG1pc3VzaW5nIERPTSB0ZXh0IG1ldGhvZHNcIiBjb252aW5jZWQgbWUgdG8gZG8gaXQgdGhpcyB3YXksXG4gICAgLy8gdnMuIGNyZWF0ZVRleHROb2RlLiBUaG91Z2ggY3JlYXRlVGV4dE5vZGUgd291bGQgcHJvYmFibHkgd29yayBmaW5lIGZvciBzZXR0aW5nIGlubmVySFRNTC5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgICAgICBcIj1cIjogXCImI3gzRDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMzOTtcIixcbiAgICAgICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgICB9O1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIHMgPT4gZXNjYXBlc1tzXSk7XG59XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEdldCB0aGUgY29udGVudHMgb2YgYW55IGh0bWwgbm9kZSBhcyBhIERvY3VtZW50RnJhZ21lbnQuXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3ROb2RlQ29udGVudChub2RlKSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcbiAgICByZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XG59XG5leHBvcnRzLmV4dHJhY3ROb2RlQ29udGVudCA9IGV4dHJhY3ROb2RlQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZmluZEluZGV4SW5QYXJlbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuaW5kZXhPZihlbGVtZW50KTtcbiAgICB9XG59XG5leHBvcnRzLmZpbmRJbmRleEluUGFyZW50ID0gZmluZEluZGV4SW5QYXJlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBIVE1MIGlzIGluY29uc2lzdGVudC4gR2V0dGluZyB0aGUgdmFsdWUgb2YgZm9ybSBmaWVsZHMgaXMgYSBiaXQgY29tcGxpY2F0ZWQsIG5vdCBhbHdheXMgZWxlbWVudC52YWx1ZSxcbiAqIHNvIGhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCkge1xuICAgIC8vIEl0IHdvdWxkIGJlIHJlYWxseSBuaWNlIGF0IHRoaXMgcG9pbnQgaWYgSlMgY291bGQgc2VlIGdlbmVyaWMgcGFyYW1ldGVycy5cbiAgICAvLyBJZiBpdCBjb3VsZCwgdGhlbiB0aGUgY29kZSBjb3VsZCBzYXkgXCJpZiAoaW5wdXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiBUT3V0cHV0ICE9PSBib29sZWFuKSB0aHJvdyBuZXcgRXJyb3IoKVwiXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQudHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG4gICAgICAgIHJldHVybiBnZXRTZWxlY3RWYWx1ZShlbGVtZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0YXJlYScpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRGb3JtRmllbGRWYWx1ZSA9IGdldEZvcm1GaWVsZFZhbHVlO1xuZnVuY3Rpb24gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dCkge1xuICAgIHJldHVybiAhIWlucHV0LmNoZWNrZWQ7XG59XG5leHBvcnRzLmdldENoZWNrYm94VmFsdWUgPSBnZXRDaGVja2JveFZhbHVlO1xuZnVuY3Rpb24gZ2V0TnVtYmVySW5wdXRWYWx1ZShpbnB1dCkge1xuICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGlucHV0LnZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmdldE51bWJlcklucHV0VmFsdWUgPSBnZXROdW1iZXJJbnB1dFZhbHVlO1xuZnVuY3Rpb24gZ2V0UmFkaW9WYWx1ZShpbnB1dCkge1xuICAgIC8vIFJhZGlvIGJ1dHRvbnMgYXJlIHdlaXJkLiBXZSB3YW50IHRoZW0gdG8gYXBwZWFyIHRvIGJlIG1vcmUgbm9ybWFsLlxuICAgIGlmIChpbnB1dC5uYW1lKSB7XG4gICAgICAgIHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbbmFtZT1cIiR7aW5wdXQubmFtZX1cIl06Y2hlY2tlZGApIHx8IHt9KS52YWx1ZTtcbiAgICB9XG4gICAgLy8gSWYgbm8gbmFtZSwgZmFsbCBiYWNrIHRvIHRoaXNcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICByZXR1cm4gaW5wdXQudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRSYWRpb1ZhbHVlID0gZ2V0UmFkaW9WYWx1ZTtcbmZ1bmN0aW9uIGdldFNlbGVjdFZhbHVlKHNlbGVjdCkge1xuICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIGdldE11bHRpU2VsZWN0VmFsdWUoc2VsZWN0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTZWxlY3RWYWx1ZSA9IGdldFNlbGVjdFZhbHVlO1xuZnVuY3Rpb24gZ2V0TXVsdGlTZWxlY3RWYWx1ZShzZWxlY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzZWxlY3Quc2VsZWN0ZWRPcHRpb25zKS5maWx0ZXIoZiA9PiBmLnZhbHVlKS5tYXAobSA9PiBtLnZhbHVlKTtcbn1cbmV4cG9ydHMuZ2V0TXVsdGlTZWxlY3RWYWx1ZSA9IGdldE11bHRpU2VsZWN0VmFsdWU7XG4vLyBUaGlzIGlzIGFsbW9zdCBwb2ludGxlc3MuIEp1c3QgaGVyZSBmb3IgY29uc2lzdGVuY3kuXG5mdW5jdGlvbiBnZXRTaW1wbGVGb3JtVmFsdWUoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBpZiAoaW5wdXQubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHZhbGlkIGZvciBtdWx0aS1zZWxlY3RzJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlucHV0LnZhbHVlO1xufVxuZXhwb3J0cy5nZXRTaW1wbGVGb3JtVmFsdWUgPSBnZXRTaW1wbGVGb3JtVmFsdWU7XG4vKipcbiAqIFNldHRpbmcgdmFsdWVzIGlzIGp1c3QgYXMgY29tcGxpY2F0ZWQgYXMgZ2V0dGluZyB0aGVtLCBiZWNhdXNlIEhUTUwgaXMgaW5jb25zaXN0ZW50LiBZb3UgY2FuJ3QganVzdCBzYXkgZWxlbWVudC52YWx1ZSA9IGZvby5cbiAqIEhlcmUncyBhIGhlbHBlciB0byBtYWtlIGl0IGVhc2llci5cbiAqL1xuZnVuY3Rpb24gc2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCwgdmFsdWUpIHtcbiAgICAvLyBIZXJlIHlvdSBjYW4gdmFsaWRhdGUgdGhlIHR5cGUgYmVmb3JlIHNldHRpbmcgb3IgZG8gc29tZSBraW5kIG9mIGNvbnZlcnNpb24uXG4gICAgLy8gRm9yIG11bHRpLXNlbGVjdHMsIGNhbiBhdXRvLXdyYXAgdmFsdWUgaW4gc3RyaW5nLlxuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgY29uc3Qgc3RyaW5nVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpOyAvLyB1c2VkIGluIG1vc3Qgb2YgdGhlIGNhc2VzXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbWVudDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGlucHV0LnR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2YWx1ZSA9PT0gdHJ1ZSB8fCBzdHJpbmdWYWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHN0cmluZ1ZhbHVlID09PSBpbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRvRGF0ZVN0cmluZyhuZXcgRGF0ZShzdHJpbmdWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdkYXRldGltZScgfHwgdHlwZSA9PT0gJ2RhdGV0aW1lLWxvY2FsJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdHJpbmdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAoaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBgJHt0b0RhdGVTdHJpbmcoZGF0ZSl9VCR7dG9UaW1lU3RyaW5nKGRhdGUpfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuICAgICAgICBjb25zdCBzZWxlY3QgPSBlbGVtZW50O1xuICAgICAgICBjb25zdCBvcHRpb25zID0gQXJyYXkuZnJvbShzZWxlY3Qub3B0aW9ucyk7XG4gICAgICAgIGlmIChzZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBjaGVja09wdGlvbihvcHRpb25zLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gc3RyaW5nVmFsdWU7IC8vIHRyZWF0aW5nIGl0IGxpa2UgYSBub24tbXVsdGlwbGUgd29ya3NcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb25leGlzdGVudCBvcHRpb25zIGNhbm5vdCBiZSBzZXQuIFdlIHNob3VsZCBsZXQgdGhlIHByb2dyYW1tZXIga25vdy4gRXZlbiB0aG91Z2ggdGhpcyB0YWtlcyBDUFUgY3ljbGVzLlxuICAgICAgICAgICAgdmFsdWUubWFwKG0gPT4ge1xuICAgICAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIG0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdCBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgb3B0LnNlbGVjdGVkID0gdmFsdWUubWFwKG0gPT4gbS50b1N0cmluZygpKS5pbmRleE9mKG9wdC52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbHVlKTtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHN0cmluZ1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgIGVsZW1lbnQudmFsdWUgPSBzdHJpbmdWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIG9uIG5vbi1mb3JtIGZpZWxkICR7ZWxlbWVudC50YWdOYW1lfSAke2VsZW1lbnQuaWQgfHwgJyd9YCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrT3B0aW9uKG9wdGlvbnMsIHZhbCkge1xuICAgICAgICAvLyBJZiB5b3Ugc2V0IHRoZSB2YWx1ZSBvZiBhIHNlbGVjdCB0byBzb21ldGhpbmcgdGhhdCBpcyBub3QgYW4gYXZhaWxhYmxlIG9wdGlvbiwgbm90aGluZyB3aWxsIGhhcHBlbi5cbiAgICAgICAgY29uc3QgaGFzT3B0aW9uID0gb3B0aW9ucy5tYXAobSA9PiBtLnZhbHVlKS5pbmRleE9mKHZhbC50b1N0cmluZygpKSA+IC0xO1xuICAgICAgICBpZiAoIWhhc09wdGlvbikge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FsbGVkIHNldEZvcm1GaWVsZFZhbHVlIHdpdGggbm9uZXhpc3RlbnQgb3B0aW9uICR7dmFsLnRvU3RyaW5nKCl9IG9uIHNlbGVjdCAke2VsZW1lbnQuaWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlc2UgY291bGQgYmUgcmVhZGFibGUgb25lbGluZXJzIGlmIHdlIGhhZCBwYWRTdGFydCgpIGJ1dCBpdCdzIG5vdCB3b3J0aCBidW1waW5nIHRvIEVTMjAxNyBmb3Igb25lIG1ldGhvZFxuICAgIGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhkYXRlKSB7XG4gICAgICAgIGlmICghaXNOYU4oZGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9udGggPSAoJzAnICsgKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgY29uc3QgZGF5ID0gKCcwJyArIGRhdGUuZ2V0VVRDRGF0ZSgpLnRvU3RyaW5nKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2RhdGUuZ2V0VVRDRnVsbFllYXIoKX0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdG9UaW1lU3RyaW5nKGRhdGUpIHtcbiAgICAgICAgaWYgKCFpc05hTihkYXRlLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBob3VyID0gKCcwJyArIGRhdGUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBjb25zdCBtaW51dGUgPSAoJzAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKTtcbiAgICAgICAgcmV0dXJuIGAke2hvdXJ9OiR7bWludXRlfWA7XG4gICAgfVxufVxuZXhwb3J0cy5zZXRGb3JtRmllbGRWYWx1ZSA9IHNldEZvcm1GaWVsZFZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3Iobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmICghKCdtYXRjaGVzJyBpbiBub2RlKSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCB0ZXh0IG5vZGVzXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMubm9kZUxpc3RTZWxlY3RvciA9IG5vZGVMaXN0U2VsZWN0b3I7XG4vKipcbiAqIEhlcmUncyBhIGhlbHBlciBmb3Igb25lIG9mIHRoZSBwbGFjZXMgd2hlcmUgSFRNTDUgZmFsbHMgb3Zlci4gSWYgeW91IGdldCBzb21lIGh0bWwgbGlrZSA8ZGl2IGlkPVwiMVwiPjwvZGl2PjxkaXYgaWQ9XCIyXCI+PC9kaXY+LCBpdCBiZWNvbWVzXG4gKiBhIE5vZGVMaXN0LiBIVE1MNSBieSBkZWZhdWx0IGRvZXMgbm90IHByb3ZpZGUgYSB3YXkgdG8gc2VhcmNoIHRoaXMgZm9yIGEgc2VsZWN0b3IuXG4gKi9cbmZ1bmN0aW9uIG5vZGVMaXN0U2VsZWN0b3JBbGwobm9kZXMsIHNlbGVjdG9yKSB7XG4gICAgLy8gQmVjYXVzZSB0aGUgYnJvd3NlciBjYW4gbG9zZSByZWZlcmVuY2VzIHdoZW4gbW92aW5nIG5vZGVzLCB0aGlzIGNhbiBhbHNvIHRha2UgYSByZWd1bGFyIGFycmF5LlxuICAgIC8vIEJlY2F1c2UgSFRNTDUgaGFzIHRvdGFsbHkgZmFsbGVuIG92ZXIsIGl0J3Mgbm90IHBvc3NpYmxlIGZvciB0aGUgZml4ZWQgbm9kZUxpc3RTZWxlY3RvckFsbFxuICAgIC8vIHRvIG1hdGNoIHRoZSBvdXRwdXQgc2lnbmF0dXJlIG9mIHF1ZXJ5U2VsZWN0b3JBbGwgKE5vZGVMaXN0T2Y8RWxlbWVudD4gaW5zdGVhZCBvZiBhcnJheSkuXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICBpZiAoISgnbWF0Y2hlcycgaW4gbm9kZSkpIHtcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdGV4dCBub2Rlc1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2ggPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICByZXN1bHRzLnB1c2goLi4uQXJyYXkuZnJvbShzZWFyY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5leHBvcnRzLm5vZGVMaXN0U2VsZWN0b3JBbGwgPSBub2RlTGlzdFNlbGVjdG9yQWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIElmIHRoZSBkb2N1bWVudCBjb250YWlucyBhbnkgZHVwbGljYXRlIElEcywgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVVuaXF1ZURvbUlkcygpIHtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgZm9vIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJypbaWRdJykpIHtcbiAgICAgICAgaWRzLmFkZChmb28uaWQpO1xuICAgICAgICBpKys7XG4gICAgICAgIGlmIChpZHMuc2l6ZSAhPT0gaSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgRE9NIElEcyBmb3VuZC4gVGhlIGZpcnN0IGR1cGxpY2F0ZSBpZCBpcyAke2Zvb30uYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlVW5pcXVlRG9tSWRzID0gdmFsaWRhdGVVbmlxdWVEb21JZHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENyZWF0ZUVsZW1lbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0NyZWF0ZUVsZW1lbnRcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRWxlbWVudFR5cGVcIik7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgRXh0cmFjdE5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FeHRyYWN0Tm9kZUNvbnRlbnRcIik7XG5jb25zdCBGb3JtRmllbGRWYWx1ZV8xID0gcmVxdWlyZShcIi4uL0h0bWwvRm9ybUZpZWxkVmFsdWVcIik7XG5jb25zdCBRdWVyeVNlbGVjdG9yTm9kZUxpc3RfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL1F1ZXJ5U2VsZWN0b3JOb2RlTGlzdFwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5XCIpO1xuY29uc3QgT2JzZXJ2YWJsZVN0YXRlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50XCIpO1xuY29uc3QgQ29tcG9uZW50TWFwXzEgPSByZXF1aXJlKFwiLi9Db21wb25lbnRNYXBcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG4vKipcbiAqIEEgc3VwZXItYmFzaWMgY29tcG9uZW50IHRoYXQgYWxsb3dzIGNvbmZpZ3VyYXRpb24gb2YgZGF0YS1iaW5kaW5nIGZ1bmN0aW9ucyB1c2luZyBzcGVjaWFsbHktbmFtZWQgSFRNTCBhdHRyaWJ1dGVzLCBhcyBpbiBBbmd1bGFyXG4gKiBvciBWdWUuXG4gKi9cbmNsYXNzIEJvdW5kQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50XzEuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIGFyZ3MpIHtcbiAgICAgICAgc3VwZXIoYXJncyk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzID0gW107XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cyA9IFtdO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzID0gW107XG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cyA9IFtdO1xuICAgICAgICB0aGlzLl9hc3luYyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kZWZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IHZpZXdNb2RlbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnaS12JykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdpLXYnLCBUZW1wbGF0ZVJlcGxhY2VtZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGN1c3RvbUVsZW1lbnRzIGlzbid0IG9mZmljaWFsbHkgcGFydCBvZiBhbiBFUyB2ZXJzaW9uIHlldCBzbyB3b24ndCB3b3JrIGV2ZW4gaW4gc29tZSByZWNlbnQtaXNoIGJyb3dzZXJzXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgICAgIHRoaXMuX2FzeW5jID0gb3B0aW9ucy5hc3luYyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVmZXIgPSBvcHRpb25zLmRlZmVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLl9uYW1lID0gb3B0aW9ucy5uYW1lO1xuICAgICAgICAvLyBEZWZpbmVkIHRoZSBkZWZhdWx0IGNvbXBvbmVudCBjbGFzcyBmb3IgdGhlIGRlZmF1bHQgbG9vcFBvc3RQcm9jZXNzKCkgbWV0aG9kXG4gICAgICAgIGlmIChvcHRpb25zLmxvb3BJdGVtQ2xhc3MpIHtcbiAgICAgICAgICAgIGlmICghQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKG9wdGlvbnMubG9vcEl0ZW1DbGFzcykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvb3BJdGVtQ2xhc3MgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG9wdGlvbnMubG9vcEl0ZW1DbGFzcyBpbnN0YW5jZW9mIEJvdW5kQ29tcG9uZW50LmNvbnN0cnVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9vcEl0ZW1DbGFzcyBpcyBub3QgYW4gYm91bmQgY29tcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9vcEl0ZW1DbGFzcyA9IG9wdGlvbnMubG9vcEl0ZW1DbGFzcyB8fCBCb3VuZENvbXBvbmVudDtcbiAgICAgICAgdGhpcy5fY29uZmlndXJlQ29tcG9uZW50QmluZGluZ3MoKTtcbiAgICAgICAgdGhpcy5zZXRUZW1wbGF0ZSh0aGlzLmNvbnRlbnQuaW5uZXJIVE1MKTsgLy8gSW5uZXJIVE1MIGlzIGN1cnJlbnRseSBvbmx5IHBhcnNlZCBhbmQgdGhlbiB0aGUgb3JpZ2luYWwgdGV4dCBpcyB0aHJvd24gYXdheS5cbiAgICAgICAgLy8gQXV0by1hZGQgc3Vic2NyaXB0aW9ucyBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgICAgaWYgKG9wdGlvbnMub2JzZXJ2ZUFsbFZpZXdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5vYnNlcnZlVmlld01vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0Z3Qgb2Ygb3B0aW9ucy5vYnNlcnZlVGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSh0Z3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRndCBvZiBvcHRpb25zLm9ic2VydmVBbGxUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlQWxsKHRndCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2FzeW5jKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyKCksIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb25zdHJ1Y3RvciBpbml0aWFsaXphdGlvbiBpcyBkb25lLlxuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gY29tcG9uZW50cy4gSXQncyBtb3N0IHVzZWZ1bCBmb3IgY3VzdG9tIHRhZ3MsIGZvciBleGFtcGxlLCA8bXktY29tcG9uZW50PjwvbXktY29tcG9uZW50Pi5cbiAgICAgKiBJdCB3aWxsIGJlY29tZSA8ZGl2IGlkPVwiZm9vXCI+V2hhdGV2ZXIgdGhlIGNvbXBvbmVudCBjb250ZW50IGlzPC9kaXY+LlxuICAgICAqIFRvIHJlcGxhY2UgdGhlIGVsZW1lbnQgKGNvcHlpbmcgZXhpc3RpbmcgYXR0cmlidXRlcykgc2VuZCB0aGUgcmVsZXZhbnQgb3B0aW9ucywgcGx1cyB7cmVwbGFjZTogdHJ1ZX0uXG4gICAgICpcbiAgICAgKiBJbiBhbG1vc3QgZXZlcnkgY2FzZSwgdmlld01vZGVsIHNob3VsZCBiZSBzZXQuIEJ1dCBpdCdzIG5vdCBwb3NzaWJsZSB0byBjaGFuZ2UgdGhhdCBhbmQgc3RpbGwgYmUgY29tcGF0aWJsZSB3aXRoIHRoZSBiYXNlXG4gICAgICogY2xhc3MgaW5qZWN0KCkuIFRoaXMgaXMgYSB0eXBlc2NyaXB0LW9ubHkgaXNzdWUgYnV0IGl0IG1ha2VzIHRoaW5ncyB1Z2x5LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy4gQW5kIHByYWN0aWNhbGx5IGRlbWFuZHMgdGhlaXIgdXNlIHRvIHNldCB2aWV3TW9kZWwuXG4gICAgICovXG4gICAgc3RhdGljIGluamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvciwgdmlld01vZGVsIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvciB8fCB0aGlzO1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xuICAgICAgICBjb25zdCByZXBsYWNlckZ1bmN0aW9uID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBsYWNlRWxlbWVudFdpdGhCb3VuZENvbXBvbmVudChlbGVtZW50LCB2aWV3TW9kZWwsIG9wdCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb252ZXJ0ZXJGdW5jdGlvbiA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydEVsZW1lbnRUb0JvdW5kQ29tcG9uZW50KGVsZW1lbnQsIHZpZXdNb2RlbCwgb3B0LCBuZXdDb25zdHJ1Y3Rvcik7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmplY3Qoc2VsZWN0b3IsIG9wdCwgcmVwbGFjZXJGdW5jdGlvbiwgY29udmVydGVyRnVuY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsIHRvIGluamVjdCgpIHdpdGggYSBjbGVhbmVyIGFyZ3VtZW50IG9yZGVyLlxuICAgICAqL1xuICAgIHN0YXRpYyBpbmplY3RCaW5kKHZpZXdNb2RlbCwgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAoeyBzZWxlY3RvciA9ICdbaWNoaWdvXScsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBzZWxlY3Rvciwgb3B0aW9ucywgY29uc3RydWN0b3IsIHZpZXdNb2RlbCB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICByZXR1cm4gdGhpcy5pbmplY3Qoc2VsZWN0b3IsIG9wdGlvbnMsIGNvbnN0cnVjdG9yLCB2aWV3TW9kZWwpO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlcGxhY2VFbGVtZW50V2l0aEJvdW5kQ29tcG9uZW50KGV4aXN0aW5nRWxlbWVudCwgdmlld01vZGVsLCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3Rvcih2aWV3TW9kZWwsIG9wdCk7XG4gICAgICAgIHRoaXMuX3JlcGxhY2VFbGVtZW50KGV4aXN0aW5nRWxlbWVudCwgY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIF9jb252ZXJ0RWxlbWVudFRvQm91bmRDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCB2aWV3TW9kZWwsIG9wdGlvbnMsIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgIC8vIFdBUk46IFRoaXMgY2FzdCBtYXkgbm90IGJlIHRydWUuIFRoZXJlJ3Mgbm8gd2F5IHRvIGNoZWNrIHRoYXQgdGhlIHRhZ3MgbWF0Y2guXG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oeyBlbGVtZW50OiBleGlzdGluZ0VsZW1lbnQgfSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgY29uc3RydWN0b3Iodmlld01vZGVsLCBvcHQpO1xuICAgIH1cbiAgICB3cml0ZShldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl93cml0ZVRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGV2dC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IEZvcm1GaWVsZFZhbHVlXzEuZ2V0Rm9ybUZpZWxkVmFsdWUoZWxlbWVudCk7XG4gICAgICAgIC8vIFRoZXJlIGFyZSB0d28gY2FzZXMgd2hlcmUgdmFsdWUgaXMgdW5kZWZpbmVkLiBFaXRoZXIgdGhlIGVsZW1lbnQgaXMgbm90IGEgZm9ybSBlbGVtZW50IG9yIGl0J3MgYW4gdW5uYW1lZCByYWRpbyBidXR0b25cbiAgICAgICAgLy8gdGhhdCBpcyBub3Qgc2VsZWN0ZWQuIEluIGJvdGggY2FzZXMsIHdlIGRvbid0IHdhbnQgdG8gdXBkYXRlIHRoZSBtb2RlbCB3aXRoIHVuZGVmaW5lZCwgd2hpY2ggaXMgdXNlbGVzcy5cbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyBqdXN0aWZpY2F0aW9uIHZhbGlkP1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdBUk46IENhbm5vdCB0eXBlIGNoZWNrIHRoaXMgZHluYW1pY2FsbHkuIFR5cGVTY3JpcHQgaXMgYnVpbGQtdGltZSBjaGVja2luZyBvbmx5LiBSdW50aW1lIGNvZGUgY2FuJ3QgZXZlbiBzZWUgdGhlIHR5cGUuXG4gICAgICAgIC8vIElmIHlvdSB3YW50IHRvIGJlIHByZWNpc2UsIGFsbCBwcm9wZXJ0aWVzIGluIF93cml0ZUJpbmRpbmdzIHNob3VsZCBiZSBGb3JtSXRlbVZhbHVlLCBidXQgYXMgX3dyaXRlQmluZGluZ3MgaXMgcG9wdWxhdGVkXG4gICAgICAgIC8vIHZpYSBzdHJpbmcsIHRoZXJlJ3Mgbm8gd2F5IHRvIGVuZm9yY2UgdGhhdC4gU28gaWYgeW91IGZpbGwgYSBzdHJpbmcgdmFsdWUgZnJvbSBhIG11bHRpcGxlIHNlbGVjdCwgaXQnbGwgcHJvZHVjZSBidWdzLlxuICAgICAgICAvLyBTbyBiZSBjYXJlZnVsLiBJdCdzIG9uIHlvdS5cbiAgICAgICAgZm9yIChjb25zdCBiaW5kIG9mIHRoaXMuX3dyaXRlVGFyZ2V0cykge1xuICAgICAgICAgICAgaWYgKGJpbmQuc3RhcnRzV2l0aCgndGhpcy4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXNbYmluZF07XG4gICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXNbYmluZF0gPSB2YWx1ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiaW5kID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBc3N1bWUgdGhhdCB0aGUgdmlldyBtb2RlbCBpcyBlaXRoZXIgRm9ybUZpZWxkVmFsdWUgb3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG9uZS5cbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0aGlzLnZpZXdNb2RlbCwgKCkgPT4gdGhpcy52aWV3TW9kZWwgPSB2YWx1ZSwgdGhpcy52aWV3TW9kZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB0aGlzLnZpZXdNb2RlbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdpdGggb2JzZXJ2YWJsZSBzdGF0ZSwgd2UgbmVlZCB0byBnZXQgdGhlIHN0YXRlLCB1cGRhdGUgaXQsIGFuZCB3cml0ZSB0aGUgd2hvbGUgdGhpbmcgYmFjay5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2hpbGUgaXQgaXMgcG9zc2libGUgdG8gdXBkYXRlIGEgc2luZ2xlIHByb3BlcnR5IGluIHNvbWUgY2FzZXMsIGl0IGRvZXNuJ3QgYWxsb3cgcmV1c2Ugb2YgYWxyZWFkeS13b3JraW5nIGNvZGUuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmlld01vZGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0bXBbYmluZF07XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlVmFsdWUodGFyZ2V0LCAoKSA9PiB0bXBbYmluZF0gPSB2YWx1ZSwgdG1wKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwudmFsdWUgPSB0bXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnZpZXdNb2RlbFtiaW5kXTtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh0YXJnZXQsICgpID0+IHRoaXMudmlld01vZGVsW2JpbmRdID0gdmFsdWUsIHRoaXMudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gd3JpdGVWYWx1ZSh0YXJnZXQsIHdyaXRlVG9Qcm9wZXJ0eSwgdGhpc0FyZykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGEgZnVuY3Rpb24gdG8gYmUgZmxleGlibGUsIGJlY2F1c2UgaWYgdGFyZ2V0IGlzIGEgdmFsdWUgdHlwZSBvciBpbW11dGFibGUsIHdyaXRpbmdcbiAgICAgICAgICAgIC8vIGl0IGRpcmVjdGx5IHJlcGxhY2VzIG9ubHkgdGhlIHZhbHVlIHdpdGhvdXQgdXBkYXRpbmcgdGhlIG1vZGVsLlxuICAgICAgICAgICAgd3JpdGVUb1Byb3BlcnR5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIHRoZSBtb2RlbCBwYXNzZWQgaW4sIG9yIHRoZSB2aWV3IG1vZGVsIGlmIG5vbmUgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIG9ic2VydmUobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKElPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG1vZGVsKSkge1xuICAgICAgICAgICAgbW9kZWwuc3Vic2NyaWJlKHRoaXMucmVuZGVyLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmluZCB0aGlzLnJlbmRlcigpIHRvIGFsbCBvYnNlcnZhYmxlIHByb3BlcnRpZXMgZm91bmQgaW4gdGhlIG1vZGVsIHBhc3NlZCBpbixcbiAgICAgKiBvciB0aGUgdmlldyBtb2RlbCBpZiBub25lIHBhc3NlZCBpbi4gVGhpcyBvbmx5IGdvZXMgb25lIGxldmVsIGRlZXAsIHNvIGl0XG4gICAgICogd29uJ3QgcGljayB1cCBuZXN0ZWQgb2JqZWN0cywgYnV0IGl0J3MgcHJvYmFibHkgZ29vZCBlbm91Z2ggaW4gNjAlIG9mIGNhc2VzLlxuICAgICAqL1xuICAgIG9ic2VydmVBbGwobW9kZWwpIHtcbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsKTtcbiAgICAgICAgZm9yIChjb25zdCBtIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1vZGVsKSkge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlKG1vZGVsW21dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBkZWZlciByZW5kZXJpbmcgdW50aWwgYWZ0ZXIgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgaWYgKHRoaXMuX2RlZmVyICYmICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5ib29sKSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGJvb2xlYW4gYXR0cmlidXRlcywgdGhlIHZlcnkgZXhpc3RlbmNlIG9mIHRoZSBhdHRyaWJ1dGUgbWVhbnMgaXQgaXMgY29uc2lkZXJlZCB0byBiZSB0cnVlLlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUoaXRlbS5zb3VyY2UpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSAhIXZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKGl0ZW0uYXR0cmlidXRlLCB2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShpdGVtLmF0dHJpYnV0ZSwgdGhpcy5fZ2V0U3RyaW5nVmFsdWUoaXRlbS5zb3VyY2UpIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdmFsdWVBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIC8vIENhbGxzIHNldEZvcm1GaWVsZFZhbHVlIGJlaGluZCB0aGUgc2NlbmVzLlxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZSh0aGlzLl92YWx1ZUF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nzc0NsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB0aGlzLl9nZXRTdHJpbmdWYWx1ZSh0aGlzLl9jc3NDbGFzc2VzKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcykge1xuICAgICAgICAgICAgLy8gSWYgdHJ1dGh5LCBhZGQgY2xhc3MsIGVsc2UgZGVsZXRlIGl0LlxuICAgICAgICAgICAgbGV0IHZhbCA9ICEhdGhpcy5fZ2V0VW50eXBlZFZhbHVlKGl0ZW0uc291cmNlKTtcbiAgICAgICAgICAgIGlmIChpdGVtLm5lZ2F0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChpdGVtLmNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0uY2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NTdHlsZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUodGhpcy5fY3NzU3R5bGUpIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmNzc1RleHQgPSB2YWw7XG4gICAgICAgICAgICBpZiAodmFsICYmICF0aGlzLmNvbnRlbnQuc3R5bGUuY3NzVGV4dCkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkIHN0eWxlIHRleHQgaW4gY29tcG9uZW50OiAke3ZhbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICAgICAgY29uc3QgaXRlcmFibGUgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fbG9vcC5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGl0ZXJhYmxlICYmIHR5cGVvZiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNDb250ZW50ID0gRXh0cmFjdE5vZGVDb250ZW50XzEuZXh0cmFjdE5vZGVDb250ZW50KHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByb3cgb2YgaXRlcmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuX2xvb3AuZnJhZ21lbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBcyBzb29uIGFzIHdlIGFkZCB0aGUgY2xvbmUgdG8gY29udGVudCwgY2hpbGROb2RlcyBsb3NlcyByZWZlcmVuY2UgdG8gaXRzIGNoaWxkIG5vZGVzLCBzbyBjb3B5IGl0LlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IEFycmF5LmZyb20oY2xvbmUuY2hpbGROb2Rlcykuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvb3AucG9zdFByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9vcFBvc3RQcm9jZXNzKHJvdywgbm9kZXMsIGl0ZXJhYmxlLCBwcmV2aW91c0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jc3NEaXNwbGF5KSB7XG4gICAgICAgICAgICAvLyBJZiBmYWxzeSwgc2V0IGRpc3BsYXk6IG5vbmUgKHNhdmluZyBwcmV2aW91cyB2YWx1ZSkuIElmIHRydXRoeSwgcmVzdG9yZSBwcmV2aW91cyB2YWx1ZSAoaWYgYmxvY2ssIGZsZXgsIGJ1dCBub3QgaWYgbm9uZSlcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9nZXRVbnR5cGVkVmFsdWUodGhpcy5fY3NzRGlzcGxheS5zb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nzc0Rpc3BsYXkubmVnYXRpdmUpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsIHRoaXMuX3ByZXZpb3VzQ3NzRGlzcGxheVNldHRpbmcgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNDc3NEaXNwbGF5U2V0dGluZyA9IHRoaXMuY29udGVudC5zdHlsZS5kaXNwbGF5IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZVRleHQsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGVtcGxhdGVUZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBleGVjdXRlZCBpbiB0aGUgY29uc3RydWN0b3IuIFRoZSB1cGRhdGUgcGFyYW0gc2hvdWxkIG5vdCBiZSBzZXQuXG4gICAgICAgIGlmICh1cGRhdGUgJiYgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VwZGF0ZSBzaG91bGQgbm90IGJlIHRydWUgd2hlbiBjYWxsZWQgaW50ZXJuYWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSB3ZSdyZSBjcmVhdGluZyBhbiBlbGVtZW50IHRoYXQncyBub3Qgb24gdGhlIHBhZ2UsIHdlIHByb2JhYmx5IGNvdWxkIGF2b2lkIHVzaW5nIGEgZnJhZ21lbnQsXG4gICAgICAgIC8vIGJ1dCB0aGlzIGlzIHdoYXQgZnJhZ21lbnRzIGFyZSBmb3IuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MVGVtcGxhdGVFbGVtZW50KTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGVtcGxhdGVUZXh0O1xuICAgICAgICBjb25zdCBjbG9uZSA9IGRvY3VtZW50LmltcG9ydE5vZGUodGVtcGxhdGUuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgdXNlZCB0byByZXBsYWNlIHRoZSBleGlzdGluZyB0ZW1wbGF0ZSwgd2UgbmVlZCB0byB3aXBlIG91dCB0aGUgcHJldmlvdXMgdmFsdWVzXG4gICAgICAgIHRoaXMuX3JlcGxhY2VtZW50cy5sZW5ndGggPSAwO1xuICAgICAgICAvLyBXb3JraW5nIG9uIGEgY2xvbmUgaGVyZSwgc28gd2UgZG9uJ3Qgc2VlIHRoZSBib2R5IGJlaW5nIGJ1aWx0IHN0ZXAgYnkgc3RlcCBpbiB0aGUgYnJvd3Nlci5cbiAgICAgICAgZm9yIChjb25zdCByZXBsIG9mIGNsb25lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ktdicpKSB7XG4gICAgICAgICAgICAvLyBJZiBuYW1lIGlzIHNwZWNpZmllZCwgY29tcG9uZW50IE1VU1QgYmUgc3BlY2lmaWVkLiBUaGUgc2FtZSBpZiBjb21wb25lbnQgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgaWYgKHRoaXMuX25hbWUgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICE9PSB0aGlzLl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgc2FtZSBpZiBjb21wb25lbnQgaXMgc3BlY2lmaWVkLiBSZXF1aXJlcyByZXBlYXRpbmcgYmVjYXVzZSB0aGlzIHBhcnQgYnJlYWtzIHdoZW4gbWluaWZpZWRcbiAgICAgICAgICAgIGlmIChyZXBsLmdldEF0dHJpYnV0ZSgnY29tcG9uZW50JykgJiYgcmVwbC5nZXRBdHRyaWJ1dGUoJ2NvbXBvbmVudCcpICE9PSB0aGlzLl9uYW1lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub2VzY2FwZSA9IHJlcGwuaGFzQXR0cmlidXRlKCdub2VzY2FwZScpICYmIHJlcGwuZ2V0QXR0cmlidXRlKCdub2VzY2FwZScpICE9PSAnZmFsc2UnO1xuICAgICAgICAgICAgdGhpcy5fcmVwbGFjZW1lbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHJlcGwsXG4gICAgICAgICAgICAgICAgc291cmNlOiByZXBsLmlubmVySFRNTCxcbiAgICAgICAgICAgICAgICBub2VzY2FwZTogbm9lc2NhcGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlZSBpZiB3ZSBuZWVkIHRvIGRlZmVyIHJlbmRlcmluZyB1bnRpbCBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgd2lsbCBsZWFkIHRvIGEgRk9VQywgbWF5YmUgbWlsbGlzZWNvbmRzLCBtYXliZSBsb25nZXIuXG4gICAgICAgIGlmICghdGhpcy5fZGVmZXIgfHwgdGhpcy5faW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlIGNvbXBsZXRlZCB2YWx1ZXMgYmVmb3JlIGFkZGluZyB0byB0aGUgdmlzaWJsZSBwYWdlLiBUaGlzIGlzIHNsaWdodGx5IHJlZHVuZGFudCwgYmVjYXVzZSB0aGlzIGhhcHBlbnMgaW4gdGhlIHJlbmRlcigpXG4gICAgICAgICAgICAvLyBzdGVwLCBidXQgSSBoYXRlIGl0IHdoZW4gSSBzZWUgYSBmbGFzaCBvZiB1bnJlcGxhY2VkIGNvbnRlbnQgb24gc2l0ZXMuXG4gICAgICAgICAgICAvLyBUaGUgcmVhc29uIHRoaXMgd29ya3MgaXMgYmVjYXVzZSBfcmVwbGFjZW1lbnRzIHJlZmVyZW5jZXMgY2xvbmUsIHdoaWNoIGlzbid0IHZpc2libGUgdW50aWwgYWxtb3N0IHRoZSBsYXN0IGxpbmUuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVIdG1sUmVwbGFjZW1lbnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGZyb250LWVuZCB0ZXh0LiBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHRoaW5nIHRvIHJlcGxhY2UuIE90aGVyd2lzZSwgeW91J3JlIGp1c3Qgd2lwaW5nIG91dCBwZXJmZWN0bHlcbiAgICAgICAgLy8gdmFsaWQgSFRNTDUgcmVmZXJlbmNlcyBmb3Igbm8gcmVhc29uLlxuICAgICAgICBpZiAodGhpcy5fcmVwbGFjZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGNsb25lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBhIGZ1bGwgdXBkYXRlIGlmIHJlcXVlc3RlZCB0b1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIdG1sVGVtcGxhdGUodGVtcGxhdGVQcm9wZXJ0eSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0VGVtcGxhdGUoJzxpLXYgbm9lc2NhcGU+JyArIHRlbXBsYXRlUHJvcGVydHkgKyAnPC9pLXY+JywgdXBkYXRlKTtcbiAgICB9XG4gICAgc2V0VGV4dFRlbXBsYXRlKHRlbXBsYXRlUHJvcGVydHkgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFRlbXBsYXRlKCc8aS12PicgKyB0ZW1wbGF0ZVByb3BlcnR5ICsgJzwvaS12PicsIHVwZGF0ZSk7XG4gICAgfVxuICAgIHNldExvb3Aoc291cmNlID0gJy4nLCBmcmFnbWVudCwgc2tpcFBvc3RQcm9jZXNzID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFmcmFnbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJhZ21lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBmcmFnbWVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVGcmFnbWVudChmcmFnbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9vcCA9IHsgc291cmNlLCBwb3N0UHJvY2VzczogIXNraXBQb3N0UHJvY2VzcywgZnJhZ21lbnQgfTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlTG9vcCh1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9sb29wID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRWYWx1ZUF0dHJpYnV0ZShzb3VyY2UgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlQXR0cmlidXRlID0gc291cmNlO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRWaXNpYmlsaXR5KHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nzc0Rpc3BsYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jc3NEaXNwbGF5ID0geyBzb3VyY2UsIG5lZ2F0aXZlIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQXR0cmlidXRlTWFwcGluZyhhdHRyaWJ1dGUsIHNvdXJjZSA9ICcuJywgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFzb3VyY2UgfHwgIWF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmluZChmID0+IGYuYXR0cmlidXRlID09PSBhdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRyaWJ1dGVCaW5kaW5ncy5wdXNoKHsgYXR0cmlidXRlLCBzb3VyY2UsIGJvb2w6IGZhbHNlLCBuZWdhdGl2ZTogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQm9vbGVhbkF0dHJpYnV0ZU1hcHBpbmcoYXR0cmlidXRlLCBzb3VyY2UgPSAnLicsIG5lZ2F0aXZlID0gZmFsc2UsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghc291cmNlIHx8ICFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEb24ndCBiaW5kIGEgc2luZ2xlIHByb3BlcnR5IHRvIG11bHRpcGxlIHRoaW5nc1xuICAgICAgICBpZiAoIXRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmZpbmQoZiA9PiBmLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fYXR0cmlidXRlQmluZGluZ3MucHVzaCh7IGF0dHJpYnV0ZSwgc291cmNlLCBib29sOiB0cnVlLCBuZWdhdGl2ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVBdHRyaWJ1dGVNYXBwaW5nKGF0dHJpYnV0ZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gdGhpcy5fYXR0cmlidXRlQmluZGluZ3MuZmlsdGVyKGYgPT4gZi5hdHRyaWJ1dGUgIT09IGF0dHJpYnV0ZSk7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZUJpbmRpbmdzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRDc3NDbGFzcyhjbHMgPSAnLicsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Nzc0NsYXNzZXMgPSBjbHM7XG4gICAgICAgIGlmICh1cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldENzc1N0eWxlKHN0eWxlID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9jc3NTdHlsZSA9IHN0eWxlO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRDc3NDbGFzc1N3aXRjaChjbHMsIHNvdXJjZSA9ICcuJywgbmVnYXRpdmUgPSBmYWxzZSwgdXBkYXRlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFjbHMgfHwgIXNvdXJjZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERvbid0IGJpbmQgYSBzaW5nbGUgcHJvcGVydHkgdG8gbXVsdGlwbGUgdGhpbmdzXG4gICAgICAgIGlmICghdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5maW5kKGYgPT4gZi5jbGFzcyA9PT0gY2xzKSkge1xuICAgICAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5wdXNoKHsgY2xhc3M6IGNscywgc291cmNlLCBuZWdhdGl2ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVDc3NDbGFzc1N3aXRjaChjbHMsIHVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghY2xzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuX2Nzc0NsYXNzU3dpdGNoZXMuZmlsdGVyKGYgPT4gZi5jbGFzcyAhPT0gY2xzKTtcbiAgICAgICAgdGhpcy5fY3NzQ2xhc3NTd2l0Y2hlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9jc3NDbGFzc1N3aXRjaGVzLnB1c2goLi4uZmlsdGVyZWQpO1xuICAgICAgICBpZiAodXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRXcml0ZUV2ZW50KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLndyaXRlLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkV3JpdGVUYXJnZXQodGFyZ2V0ID0gJy4nLCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG9uJ3QgYmluZCBhIHNpbmdsZSBwcm9wZXJ0eSB0byBtdWx0aXBsZSB0aGluZ3NcbiAgICAgICAgaWYgKCF0aGlzLl93cml0ZVRhcmdldHMuZmluZChmID0+IGYgPT09IHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5wdXNoKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlV3JpdGVUYXJnZXQodGFyZ2V0LCB1cGRhdGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmlsdGVyZWQgPSB0aGlzLl93cml0ZVRhcmdldHMuZmlsdGVyKGYgPT4gZiAhPT0gdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fd3JpdGVUYXJnZXRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3dyaXRlVGFyZ2V0cy5wdXNoKC4uLmZpbHRlcmVkKTtcbiAgICAgICAgaWYgKHVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBBdXRvLUluamVjdCBjYWxscyB0aGUgZGVmYXVsdCBpbmplY3RCaW5kKCkgb24gdGhlIGRlZmF1bHQgQm91bmRDb21wb25lbnQgY2xhc3MsIHdpdGggbm8gb3B0aW9ucyBleGNlcHQgc2VsZWN0b3IuXG4gICAgICogSWYgeW91IHBhc3Mgbm8gaW5wdXRzLCBpdCBzZWVrcyBvdXQgYWxsIGNoaWxkIGVsZW1lbnRzIHRoYXQgaGF2ZSBhdCBsZWFzdCBvbmUgaWNoaWdvIGN1c3RvbSBwcm9wZXJ0eS4gS2VlcCBpbiBtaW5kXG4gICAgICogdGhhdCB3aGVuIHlvdSBoYXZlIG5lc3RlZCBvYmplY3RzLCB0aGlzIHdpbGwgdXN1YWxseSBtZWFuIHNvbWV0aGluZyB3aWxsIGJsb3cgdXAgYmVjYXVzZSB5b3UgdHJpZWQgdG8gYmluZCBhbiBlbGVtZW50XG4gICAgICogdHdpY2UuIEl0IGFsc28gd2lsbCBwZXJmb3JtIG11Y2ggd29yc2UuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgcGFzcyBhIHNlbGVjdG9yLCBpdCBhY3RzIHRoZSBzYW1lIGFzIEJvdW5kQ29tcG9uZW50LmluamVjdEJpbmQoKSB3aXRoIHRoYXQgc2VsZWN0b3IuXG4gICAgICpcbiAgICAgKiBJbiBteSBleHBlcmllbmNlLCB0aGlzIGlzIGFsbW9zdCBjb21wbGV0ZWx5IHVzZWxlc3MuIEVpdGhlciB0aGUgbGFjayBvZiBvcHRpb25zIGJyZWFrcyBpdCAocHJldHR5IHVzZWxlc3MgaWYgeW91IGNhbid0XG4gICAgICogb2JzZXJ2ZSBhbiBvYnNlcnZhYmxlKSBvciB0aGUgc2ltcGxlIGFjdCBvZiBiaW5kaW5nIGJyZWFrcyBzdHVmZi5cbiAgICAgKi9cbiAgICBhdXRvSW5qZWN0KHNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgQm91bmRDb21wb25lbnQuaW5qZWN0QmluZCh0aGlzLnZpZXdNb2RlbCwgeyBwYXJlbnQ6IHRoaXMuY29udGVudCwgc2VsZWN0b3IgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBBcnJheS5mcm9tKGUuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIubmFtZS5zdGFydHNXaXRoKCdpNV8nKSB8fCBhdHRyLm5hbWUuc3RhcnRzV2l0aCgnOicpIHx8IGF0dHIubmFtZS5zdGFydHNXaXRoKCdkYXRhLWk1XycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBCb3VuZENvbXBvbmVudC5pbmplY3RCaW5kKHRoaXMudmlld01vZGVsLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byB1bmJpbmQgYSB2aWV3IGZyb20gYW4gb2JzZXJ2YWJsZS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAoQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIENvbXBvbmVudE1hcF8xLkNvbXBvbmVudE1hcC5jb21wb25lbnRzLmRlbGV0ZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoaXMgaWYgeW91IG5lZWQgdG8gZG8gc29tZXRoaW5nIGVsc2UgYWZ0ZXIgdGhlIGxvb3AgaXMgYWRkZWQgdG8gdGhlIERPTS5cbiAgICAgKi9cbiAgICBsb29wUG9zdFByb2Nlc3Mocm93LCBhZGRlZENvbnRlbnQsIGFsbFJvd3MsIHByZXZpb3VzQ29udGVudCkge1xuICAgICAgICAvLyBJZiB0aGUgdHlwZXNjcmlwdCBwYXJ0IG9mIHRoZSBmb2xsb3dpbmcgd2VyZSBpbXBvcnRhbnQsIHRoaXMgd291bGQgYmUgYSBwcm9ibGVtXG4gICAgICAgIC8vIGlmIHRoaXMgd2VyZSBhIGRlcml2ZWQgY2xhc3MuXG4gICAgICAgIGNvbnN0IHRoaXNjbGFzcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2xvb3BJdGVtQ2xhc3MuaW5qZWN0QmluZChyb3csIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoYWRkZWRDb250ZW50LCAnW2k1X2l0ZW1dLCBbXFxcXDAwMDAzQWl0ZW1dLCBbZGF0YS1pNV9pdGVtXScpLCB7XG4gICAgICAgICAgICByZXBsYWNlOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgICAgIGFzeW5jOiB0aGlzLl9hc3luY1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2dldFN0cmluZ1ZhbHVlKG5hbWUsIHNraXBFc2NhcGUgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2dldFVudHlwZWRWYWx1ZShuYW1lKTtcbiAgICAgICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBza2lwRXNjYXBlID8gdmFsdWUgOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2tpcEVzY2FwZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbCh2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0VW50eXBlZFZhbHVlKG5hbWUpIHtcbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgLy8gSSdtIHByZXR0eSBzdXJlIHRoaXMgaXMgYmVpbmcgdmFsaWRhdGVkIGR1cmluZyBjb25zdHJ1Y3Rpb24gYnV0IGJlIHNhZmVcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRoaXNBcmcgPSB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgLy8gSWYgVk0gaXMgYSBzdGF0ZSwgZ2V0IHRoZSBjdXJyZW50IHN0YXRlIHZhbHVlLlxuICAgICAgICBpZiAoT2JzZXJ2YWJsZVN0YXRlXzEub2JzZXJ2YWJsZVN0YXRlQ2hlY2sodGhpc0FyZykpIHtcbiAgICAgICAgICAgIHRoaXNBcmcgPSB0aGlzQXJnLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoXCJ0aGlzLlwiKSkge1xuICAgICAgICAgICAgdGhpc0FyZyA9IHRoaXM7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS5zbGljZSg1KTtcbiAgICAgICAgICAgIGlmICghKG5hbWUgaW4gdGhpcykpIHtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgdGhpcy4ke25hbWV9IGRvZXMgbm90IGV4aXN0IG9uIHZpZXcuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnLicpIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IHRoaXNBcmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHRoaXNBcmcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXNBcmcpKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYHRoaXMuJHtuYW1lfSBkb2VzIG5vdCBleGlzdCBvbiB2aWV3TW9kZWwuYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291cmNlID0gdGhpc0FyZ1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDT05TSURFUjogQ29uc2lkZXIgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIHRvIGFsbG93IGV4ZWN1dGluZyBtZXRob2Qgd2l0aCBzdHJpbmcgcGFyYW1ldGVycy4gaTVfcGFyYW0wMT1cInZhbCAxXCIsIGk1X3BhcmFtMDI9XCJ2YWwgMlwiXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmNhbGwodGhpc0FyZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2soc291cmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3VwZGF0ZUh0bWxSZXBsYWNlbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmVwbCBvZiB0aGlzLl9yZXBsYWNlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5fZ2V0U3RyaW5nVmFsdWUocmVwbC5zb3VyY2UsIHJlcGwubm9lc2NhcGUpIHx8ICcnO1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlcGwuZWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jb25maWd1cmVDb21wb25lbnRCaW5kaW5ncygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKHRoaXMuY29udGVudC5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgLmZpbHRlcihmID0+IGYudmFsdWUgfHwgZi5uYW1lID09PSAnaTVfaW5wdXQnIHx8IGYubmFtZSA9PT0gJzppbnB1dCcpXG4gICAgICAgICAgICAubWFwKG0gPT4gKHtcbiAgICAgICAgICAgIG5hbWU6IG0ubmFtZSxcbiAgICAgICAgICAgIHZhbHVlOiBtLnZhbHVlIHx8ICcnXG4gICAgICAgIH0pKTtcbiAgICAgICAgLy8gVGVjaG5pY2FsbHkgaXQncyBpbnZhbGlkIHRvIGFkZCBjdXN0b20gYXR0cmlidXRlcyB0byByZWd1bGFyIGVsZW1lbnRzLCBzbyB0ZWNobmljYWxseSA8cmVwbGFjZS1tZSA6c3dpdGNoOnJlZHRleHQ9XCJ3YXJuaW5nXCI+XG4gICAgICAgIC8vIGlzIGxlZ2FsIGJ1dCBpZiBpZiBpdCB3ZXJlIGEgZGl2LCB0aGF0IHdvdWxkIGJlIGlsbGVnYWwuIFNvIHdlJ2xsIGFsbG93IDxkaXYgZGF0YS1pNV9zd2l0Y2hfcmVkdGV4dD1cIndhcm5pbmdcIj4uXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGUgd2VpcmQgbmFtZSBoYW5kbGluZyBvZiBkYXRhIGF0dHJpYnV0ZXMgY291bGQgYnJlYWsgeW91ciBjb2RlIGlmIHlvdSB0cnkgdG8gdXNlIHRoaXMuIFlvdSBtYXkgbmVlZCB0byBkbyBleHRyYVxuICAgICAgICAvLyB3b3JrIHRvIG1ha2UgeW91ciBjb2RlIHdvcmssIGFsbCBpbiB0aGUgbmFtZSBvZiBzdHJpY3QgYWRoZXJlbmNlIHRvIHN0YW5kYXJkcy4gSXQncyB1cCB0byB5b3UuXG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLmNvbnRlbnQuZGF0YXNldCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb250ZW50LmRhdGFzZXRbYXR0cl07XG4gICAgICAgICAgICBpZiAodmFsdWUgfHwgYXR0ciA9PT0gJ2k1X2lucHV0Jykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBdHRyaWJ1dGVzLnB1c2goeyBuYW1lOiBhdHRyLCB2YWx1ZTogdmFsdWUgfHwgJycgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRleHRIdG1sU2V0ID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBjdXJyZW50QXR0cmlidXRlcykge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuX3BhcnNlQXR0cmlidXRlTmFtZShwcm9wLm5hbWUpO1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBSZWd1bGFyIGF0dHJpYnV0ZXMgd2lsbCBhbGwgbWF0Y2ggdGhpcy5cbiAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0eXBlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibmFtZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gdGhpcy5fbmFtZSB8fCBwcm9wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbE5lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGUuZGV0YWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCb29sZWFuQXR0cmlidXRlTWFwcGluZyh0eXBlLmRldGFpbCwgcHJvcC52YWx1ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhdHRyXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZ3JhbW1pbmcgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEF0dHJpYnV0ZU1hcHBpbmcodHlwZS5kZXRhaWwsIHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzd2l0Y2hDbGFzc05lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwic3dpdGNoQ2xhc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlLmRldGFpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ncmFtbWluZyBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ3NzQ2xhc3NTd2l0Y2godHlwZS5kZXRhaWwsIHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dEh0bWxTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHNldCBpNV90ZXh0IGFuZCBpNV9odG1sIGF0IHNhbWUgdGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXh0SHRtbFNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSBgPGktdj4ke3Byb3AudmFsdWV9PC9pLXY+YDsgLy8gVXNlIHRoaXMgYXMgdGhlIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRIdG1sU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBzZXQgaTVfdGV4dCBhbmQgaTVfaHRtbCBhdCBzYW1lIHRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGV4dEh0bWxTZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gYDxpLXYgbm9lc2NhcGU+JHtwcm9wLnZhbHVlfTwvaS12PmA7IC8vIFVzZSB0aGlzIGFzIHRoZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlQXR0cmlidXRlKHByb3AudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcklmTmVlZGVkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJpZk5lZ2F0aXZlXCI6XG4gICAgICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHByb3AudmFsdWUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3R5bGVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDc3NTdHlsZShwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDc3NDbGFzcyhwcm9wLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaW5wdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRXcml0ZUV2ZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIGZhbGwgdGhyb3VnaCwgdXNpbmcgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBhdHRyaWJ1dGUgYXMgYSB0YXJnZXQgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5kZXRhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmFsdWVBdHRyaWJ1dGUocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFwidGFyZ2V0XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkV3JpdGVUYXJnZXQocHJvcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVySWZOZWVkZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvb3BcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gR3JhYiB0aGUgYmFzZSBjb250ZW50IGZvciB0aGUgbG9vcCwgcHVsbGluZyBpdCBvdXQgb2YgdGhlIERPTS5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb29wKHByb3AudmFsdWUsIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh0aGlzLmNvbnRlbnQpLCB0eXBlLmRldGFpbCA9PT0gJ251bGwnKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJJZk5lZWRlZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHVzZWQgYXMgYSBzZWxlY3Rvci4gSGFzIG5vIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IEltcGxlbWVudGVkIEljaGlnbyBhdHRyaWJ1dGU6IFwiICsgdHlwZS50eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlZmVySWZOZWVkZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmZXIgPSB0aGlzLl9kZWZlciB8fCBwcm9wLnZhbHVlLnN0YXJ0c1dpdGgoJ3RoaXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3BhcnNlQXR0cmlidXRlTmFtZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgICAgLy8gR2VuZXJhbCBpY2hpZ28gc2hvcnRjdXRcbiAgICAgICAgICAgIG5hbWUgPSAnaTVfJyArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZSA9PT0gJ2k1X2l0ZW0nKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgdG8gaW5kaWNhdGUgYW4gaXRlbSBjb21wb25lbnQsIG5vdGhpbmcgZWxzZS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnaTVfZXZlbnQnKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIHVzZWQgb25seSBpbiBDb21wb25lbnQuYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKS5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmFtZS5zdGFydHNXaXRoKCdpNV8nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2F0dHInKSkge1xuICAgICAgICAgICAgaWYgKG5hbWVbN10gIT09ICc6JyAmJiBuYW1lWzddICE9PSAnXycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGJpbmRpbmcgc3ludGF4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZS5sZW5ndGggPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluZGluZyBhdHRyaWJ1dGUgbmFtZSBpcyBtaXNzaW5nLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdhdHRyJywgZGV0YWlsOiBuYW1lLnNsaWNlKDgpIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9ib29sJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWVbN10gIT09ICc6JyAmJiBuYW1lWzddICE9PSAnXycgJiYgbmFtZVs3XSAhPT0gJy0nICYmIG5hbWVbN10gIT09ICcwJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhdHRyaWJ1dGUgYmluZGluZyBzeW50YXgnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lWzddID09PSAnLScgfHwgbmFtZVs3XSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgbmVnYXRpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKDAsIDcpICsgbmFtZS5zbGljZSg4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCaW5kaW5nIGF0dHJpYnV0ZSBuYW1lIGlzIG1pc3NpbmcuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogbmVnYXRpdmUgPyAnYm9vbE5lZ2F0aXZlJyA6ICdib29sJywgZGV0YWlsOiBuYW1lLnNsaWNlKDgpIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9zd2l0Y2gnKSkge1xuICAgICAgICAgICAgbGV0IG5lZ2F0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobmFtZVs5XSAhPT0gJzonICYmIG5hbWVbOV0gIT09ICdfJyAmJiBuYW1lWzldICE9PSAnLScgJiYgbmFtZVs5XSAhPT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN3aXRjaCBiaW5kaW5nIHN5bnRheCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWVbOV0gPT09ICctJyB8fCBuYW1lWzldID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBuZWdhdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMCwgOSkgKyBuYW1lLnNsaWNlKDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA8IDExKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2xhc3Mgc3dpdGNoIG5hbWUgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiBuZWdhdGl2ZSA/ICdzd2l0Y2hDbGFzc05lZ2F0aXZlJyA6ICdzd2l0Y2hDbGFzcycsIGRldGFpbDogbmFtZS5zbGljZSgxMCkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X2lmJykpIHtcbiAgICAgICAgICAgIGxldCBuZWdhdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5hbWUuc2xpY2UoLTEpID09PSAnLScgfHwgbmFtZS5zbGljZSgtMSkgPT09ICcwJykge1xuICAgICAgICAgICAgICAgIG5lZ2F0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IG5lZ2F0aXZlID8gJ2lmTmVnYXRpdmUnIDogJ2lmJyB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnaTVfbG9vcCcpKSB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gJ2k1X2xvb3A6bnVsbCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbG9vcCcsIGRldGFpbDogJ251bGwnIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyB0eXBlOiAnbG9vcCcgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ2k1X3RhcmdldCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHsgdHlwZTogJ3RhcmdldCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdpNV9pbnB1dCcpKSB7XG4gICAgICAgICAgICBjb25zdCB0d29XYXkgPSBuYW1lLmVuZHNXaXRoKCdfdmFsdWUnKSB8fCBuYW1lLmVuZHNXaXRoKCc6Jyk7XG4gICAgICAgICAgICByZXR1cm4gKHsgdHlwZTogJ2lucHV0JywgZGV0YWlsOiB0d29XYXkgPyAnMndheScgOiAnJyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0eXBlOiBuYW1lLnNsaWNlKDMpIH07XG4gICAgfVxufVxuZXhwb3J0cy5Cb3VuZENvbXBvbmVudCA9IEJvdW5kQ29tcG9uZW50O1xuLy8gVXNlIGEgY3VzdG9tIGVsZW1lbnQgdG8gY3JlYXRlIGEgcmVwbGFjZW1lbnQgdGFnIHRoYXQgaXMgbm90IGxpbWl0ZWQsIGFzIHNwYW4gaXMsIHRvIGNvbnRhaW5pbmcgbm8gYmxvY2sgZWxlbWVudHMuXG4vLyBObyBsb2dpYywgbm8gc3BlY2lhbCBkaXNwbGF5IGRldGFpbHMuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbmNsYXNzIFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5leHBvcnRzLlRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZSA9IFRlbXBsYXRlUmVwbGFjZW1lbnRWYWx1ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEZvcm1GaWVsZFZhbHVlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Gb3JtRmllbGRWYWx1ZVwiKTtcbmNvbnN0IFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xID0gcmVxdWlyZShcIi4uL0h0bWwvUXVlcnlTZWxlY3Rvck5vZGVMaXN0XCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgR2V0VW5pcXVlSWRfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9HZXRVbmlxdWVJZFwiKTtcbmNvbnN0IENvbXBvbmVudE1hcF8xID0gcmVxdWlyZShcIi4vQ29tcG9uZW50TWFwXCIpO1xuLyoqXG4gKiBBIGNsYXNzIHdpdGggYSBjb250ZW50IHByb3BlcnR5IHRoYXQgcG9pbnRzIHRvIHNvbWV0aGluZyBvbiB0aGUgcGFnZSwgYWxvbmcgd2l0aCBzb21lIG9mIGhlbHBlciBtZXRob2RzLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgaW50ZW5kZWQgdG8gYmUgdXNlZCBhcyBhIGJhc2UgY2xhc3MgZm9yIG90aGVyIGNsYXNzZXMsIHNvIGl0J3MgbWFya2VkIGFic3RyYWN0LiBJdCBqdXN0IGRvZXNuJ3RcbiAqIG1ha2Ugc2Vuc2UgdG8gbWUgdG8gY3JlYXRlIENvbXBvbmVudCB3aXRoIG5vdGhpbmcgY3VzdG9taXplZC4gSnVzdCBjcmVhdGUgYW4gSFRNTEVsZW1lbnQuIFRoZSBoZWxwZXJzIGFyZW4ndCByZWFsbHlcbiAqIHRoYXQgaW1wcmVzc2l2ZSwgd2hlbiB5b3UgY29uc2lkZXIgdGhhdCB0aGUgdHJhZGVvZmYgaXMgaGF2aW5nIHRvIHJlZmVyZW5jZSBvYmouY29udGVudCB0byBtb2RpZnkgdGhlIERPTS5cbiAqL1xuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCB1bmRlcnN0YW5kIHRoYXQgdGhpcy5jb250ZW50IGlzIHNldCBpbiBBTEwgb2YgdGhlIHByaXZhdGUgY3RvciBmdW5jdGlvbnMuXG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XG4gICAgICAgIGlmIChhcmdzICYmIHR5cGVvZiBhcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgX2N0b3Jfc3RyaW5nLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncyAmJiBhcmdzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKGFyZ3MucHJvcGVydGllcyB8fCB7fSwgeyBpbm5lckhUTUw6IGFyZ3MuaW5uZXJIdG1sIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfbG9va3VwLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWFyZ3MpIHtcbiAgICAgICAgICAgIF9jdG9yX2VtcHR5LmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5lbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbm5lckh0bWwpIHtcbiAgICAgICAgICAgICAgICBhcmdzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKGFyZ3MucHJvcGVydGllcyB8fCB7fSwgeyBpbm5lckhUTUw6IGFyZ3MuaW5uZXJIdG1sIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N0b3JfZXhpc3RpbmdFbGVtZW50LmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJncy5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIF9jdG9yX291dGVySHRtbC5jYWxsKHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX2N0b3JfaW5uZXJIdG1sLmNhbGwodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hlY2tJbmxpbmVFdmVudExpc3RlbmVycygpO1xuICAgICAgICAvLyBBbmd1bGFyIG1hdGVyaWFsIGRvZXMgc29tZXRoaW5nIGxpa2UgdGhpcy4gSW4gdGhpcyBjYXNlLCB0aGVyZSdzIG5vIGZ1bmN0aW9uYWxpdHkgYmVoaW5kIGl0LCBidXQgaXQgZG9lcyBtYWtlIGl0XG4gICAgICAgIC8vIHVzZWZ1bCBmb3IgYSBkZXZlbG9wZXIgdG8gc2VlIHRoYXQgYW4gZWxlbWVudCBpcyBhIGNvbXBvbmVudCBhbmQgd2hhdCB0eXBlIGl0IGlzLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc25ha2VfY2FzZSA9ICdpdl8nICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnNsaWNlKDEpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcVysvZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKShbYS16XSkvZywgXCIkMSAkMiQzXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9cXEIoPz1bQS1aXXsyLH0pLylcbiAgICAgICAgICAgICAgICAuam9pbignICcpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAgICAgICAuam9pbignXycpXG4gICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKHNuYWtlX2Nhc2UsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29tcG9uZW50IGhhcyBzb21lIHdlaXJkIG5hbWUsIG5vIHByb2JsZW0uIFRoaXMgaXMganVzdCBhbiBpbmZvIGZpZWxkIGFueXdheS5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcENvbXBvbmVudCgpO1xuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9lbXB0eSgpIHtcbiAgICAgICAgICAgIC8vIE5vIGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBmaW5lIGFzIGxvbmcgYXMgVEVsZW1lbnQgaXMgRElWLiBObyB3YXkgdG8gdmVyaWZ5IHRoYXQgYXMgaXQncyBhIHR5cGVzY3JpcHQgaWxsdXNpb24uIEpTIGRvZXNuJ3Qgc2VlIHR5cGUgcGFyYW1ldGVycy5cbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaWQ6IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9sb29rdXAoZXhpc3RpbmdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTaG9ydGN1dCBmb3IgZXhpc3RpbmdFbGVtZW50LlxuICAgICAgICAgICAgLy8gVGhlIG1haW4gcmVhc29uIGl0IGV4aXN0cyBpcyB0aGF0IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIGRvZXNuJ3QgcmV0dXJuIHRoZSBjb3JyZWN0IHR5cGUgKGl0J3Mgbm90IGdlbmVyaWMpLFxuICAgICAgICAgICAgLy8gc28gdHlwZXNjcmlwdCBmcmVha3Mgb3V0IGFuZCB0aGlua3MgaXQgc2hvdWxkIGJlIGEgU1RSSU5HLCBpbiBzcGl0ZSBvZiB0aGUgdHlwZSBkZWZpbml0aW9uIG5vdCBiZWluZyBhbnl0aGluZ1xuICAgICAgICAgICAgLy8gbGlrZSB0aGF0LiBJdCdzIGp1c3QgZWFzaWVyIHRvIHVzZSB0aGlzIHRoYW4gdG8gcmVtZW1iZXIgXCJvaCwgcmlnaHQsIGkgaGF2ZSB0byB1c2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpLCB3aGljaCBpcyBnZW5lcmljXCIuXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gKGV4aXN0aW5nRWxlbWVudC5wYXJlbnQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3IoZXhpc3RpbmdFbGVtZW50LnNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBzZWxlY3RvciBjb3VsZCBub3QgZmluZCBlbGVtZW50LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVGhpcyBpcyBuYXN0eSBidXQgaXQgbWFrZXMgVHlwZVNjcmlwdCBoYXBweSB3aXRob3V0IGNyZWF0aW5nIGEgbmV3IG9iamVjdCBjb3B5XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBfY3Rvcl9leGlzdGluZ0VsZW1lbnQuY2FsbCh0aGlzLCBleGlzdGluZ0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2V4aXN0aW5nRWxlbWVudChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGV4aXN0aW5nRWxlbWVudC5lbGVtZW50O1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29udGVudCwgZXhpc3RpbmdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX2lubmVySHRtbChuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBOZXcgZWxlbWVudC4gVXNlciBzcGVjaWZpZXMgdGhlIGlubmVyIEhUTUwgZm9yIHRoZSBjb250ZW50LlxuICAgICAgICAgICAgLy8gVGhpcyBjb3VsZCBiZSBhbiBlbXB0eSBvYmplY3QgbGlrZSB7fSwgcHJhY3RpY2FsbHkgdGhlIHNhbWUgYXMgY2FsbGluZyBpdCB3aXRoIG5vIGFyZ3NcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0geyBpbm5lckhUTUw6IG5ld0VsZW1lbnQuaW5uZXJIdG1sIHx8ICcnIH07XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLCBuZXdFbGVtZW50LnByb3BlcnRpZXMpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudC50eXBlIHx8IEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHByb3BzLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29udGVudC5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5pZCA9IEdldFVuaXF1ZUlkXzEuZ2V0VW5pcXVlSWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfY3Rvcl9vdXRlckh0bWwobmV3RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gVXNlciBzcGVjaWZpZXMgdGhlIGZ1bGwgSFRNTCBmb3IgdGhlIGNvbnRlbnQuXG4gICAgICAgICAgICAvLyBOb3RlIHRoYXQgaXQgY2FuJ3QgYmUgdHlwZSBjaGVja2VkLiBKUyBjYW4ndCBzZWUgd2hhdCBURWxlbWVudCBpcy5cbiAgICAgICAgICAgIGNvbnN0IHRtcGRpdiA9IENyZWF0ZUVsZW1lbnRfMS5kaXYobmV3RWxlbWVudC5vdXRlckh0bWwudHJpbSgpKTtcbiAgICAgICAgICAgIGlmICh0bXBkaXYuY2hpbGROb2Rlcy5sZW5ndGggIT09IDEgfHwgIXRtcGRpdi5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT3V0ZXJIdG1sIG11c3QgY29udGFpbiBleGFjdGx5IG9uZSBIVE1MRWxlbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdG1wZGl2LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gRmlyc3QgdHJ5IGF0dHJpYnV0ZXMgKHdoaWNoIGFyZSB0aGUgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5ld0VsZW1lbnQuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZShhdHRyLCBuZXdFbGVtZW50LmF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZW4gb3ZlcndyaXRlIHdpdGggcHJvcGVydGllcyAod2hpY2ggYXJlIGN1cnJlbnQpXG4gICAgICAgICAgICBpZiAobmV3RWxlbWVudC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbnRlbnQsIG5ld0VsZW1lbnQucHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTcGVjaWZpZWQgSUQgdGFrZXMgcHJlY2VkZW5jZVxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSBuZXdFbGVtZW50LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9jdG9yX3N0cmluZyhuZXdFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBTdHJpbmcgYnkgaXRzZWxmIGlzIGEgc2hvcnRjdXQgZm9yIG91dGVySHRtbFxuICAgICAgICAgICAgX2N0b3Jfb3V0ZXJIdG1sLmNhbGwodGhpcywgeyBvdXRlckh0bWw6IG5ld0VsZW1lbnQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgdG8gY29udmVydCBlbGVtZW50cyB0byBjb21wb25lbnRzLiBJdCdzIG1vc3QgdXNlZnVsIGZvciBjdXN0b20gdGFncywgZm9yIGV4YW1wbGUsIDxteS1jb21wb25lbnQ+PC9teS1jb21wb25lbnQ+LlxuICAgICAqIEl0IHdpbGwgYmVjb21lIDxkaXYgaWQ9XCJmb29cIj5XaGF0ZXZlciB0aGUgY29tcG9uZW50IGNvbnRlbnQgaXM8L2Rpdj4uXG4gICAgICpcbiAgICAgKiBJdCBkb2Vzbid0IGhhdmUgdG8gYmUgYSBjdXN0b20gdGFnLiBJdCBjb3VsZCBiZSBhIGNsYXNzLCBsaWtlIDxwIGNsYXNzPSdiaW5kLXRvLW1vZGVsXCI+IChzZWxlY3Rvcj0nLmJpbmQtdG8tbW9kZWwnKVxuICAgICAqIG9yIDxwIGljaGlnbz4gKHNlbGVjdG9yPSdbaWNoaWdvXScpLlxuICAgICAqXG4gICAgICogVG8gY29tcGxldGVseSByZXBsYWNlIHRoZSBleGlzdGluZyBlbGVtZW50IChjb3B5aW5nIGV4aXN0aW5nIGF0dHJpYnV0ZXMpIHNlbmQgdGhlIHJlbGV2YW50IG9wdGlvbnMsIHBsdXMge3JlcGxhY2U6IHRydWV9LlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBzdGF0aWMgaW5qZWN0KHNlbGVjdG9yID0gJ1tpY2hpZ29dJywgb3B0aW9ucywgY29uc3RydWN0b3IpIHtcbiAgICAgICAgKHsgc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHNlbGVjdG9yLCBvcHRpb25zLCBjb25zdHJ1Y3RvciB9KSk7IC8vIGt3YXJnbGluZVxuICAgICAgICBjb25zdCBuZXdDb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yIHx8IHRoaXM7XG4gICAgICAgIGNvbnN0IG9wdCA9IHRoaXMuX2dldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VFbGVtZW50V2l0aENvbXBvbmVudChlbGVtZW50LCBvcHQsIG5ld0NvbnN0cnVjdG9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udmVydGVyRnVuY3Rpb24gPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZWxlbWVudCwgbmV3Q29uc3RydWN0b3IpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0KHNlbGVjdG9yLCBvcHQsIHJlcGxhY2VyRnVuY3Rpb24sIGNvbnZlcnRlckZ1bmN0aW9uKTtcbiAgICB9XG4gICAgc3RhdGljIF9pbmplY3Qoc2VsZWN0b3IgPSAnW2ljaGlnb10nLCBvcHRpb25zLCByZXBsYWNlckZ1bmN0aW9uLCBjb252ZXJ0ZXJGdW5jdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSB0aGlzLl9sb29rVXBDb250YWluZXJzVG9JbmplY3Qoc2VsZWN0b3IpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbnRhaW5lciBvZiBjb250YWluZXJzKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5yZXBsYWNlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FuJ3QgaGF2ZSBkdXBlIElEcyBiZWluZyBjcmVhdGVkIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBjb250YWluZXJzLiBUaGVyZSBhcmUgMyBwbGFjZXMgd2hlcmUgSUQgY2FuIGJlIHNldC5cbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmlkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3Byb3BlcnRpZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLnByb3BlcnRpZXMuaWQ7IC8vIERPTSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgnYXR0cmlidXRlcycgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuYXR0cmlidXRlcy5pZDsgLy8gSFRNTCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVwbGFjZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjb252ZXJ0ZXJGdW5jdGlvbihjb250YWluZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgc3RhdGljIF9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgICAvLyBUaGlzIGF0dGVtcHRzIHRvIHByZXNlcnZlIHRoZSBhdHRyaWJ1dGVzIHNldCBvbiB0aGUgcmVwbGFjZWQgZWxlbWVudC4gVGhhdCBvcGVucyBhbiB1Z2x5IGNhbiBvZiB3b3JtcyxcbiAgICAgICAgLy8gYnV0IGl0IHNob3VsZCBtYWtlIHJlcGxhY2VtZW50IGNvbXBvbmVudHMgbW9yZSB1c2VmdWwgYmVjYXVzZSBpdCBhbGxvd3MgdGhlbSB0byB2YXJ5LlxuICAgICAgICAvLyBJdCBkb2VzIG1ha2UgYSBicnV0YWwganVnZ2xpbmcgYWN0OlxuICAgICAgICAvLyBJZiB0aGUgZXhpc3RpbmcgZWxlbWVudCBoYXMgaW5uZXJIVE1MLCB3ZSB3YW50IHRvIHRha2UgaXQuXG4gICAgICAgIC8vIElmIG91dGVySFRNTCBpcyBwcm92aWRlZCwgdGhlIG91dGVySFRNTCdzIGlubmVySFRNTCBzaG91bGQgb3ZlcnJpZGUgdGhlIGV4aXN0aW5nIGVsZW1lbnQncy5cbiAgICAgICAgLy8gSWYgdGhlIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGF0dHJpYnV0ZXMsIHdlIHdhbnQgdG8gdGFrZSB0aGVtLlxuICAgICAgICAvLyBJZiBvdXRlckhUTUwgaXMgcHJvdmlkZWQsIHRoZSBvdXRlckhUTUwncyBhdHRyaWJ1dGVzIHNob3VsZCBvdmVycmlkZSB0aGVtLlxuICAgICAgICAvLyBGb3IgYW55IGF0dHJpYnV0ZXMgcGFzc2VkIGluIE9QVElPTlMsIHRoZXkgc2hvdWxkIG92ZXJyaWRlIGFueXRoaW5nIHRoYXQgY2FtZSBiZWZvcmUuXG4gICAgICAgIC8vIEZvciBhbnkgcHJvcGVydGllcyBwYXNzZWQgaW4gT1BUSU9OUywgdGhleSBzaG91bGQgb3ZlcnJpZGUgYW55dGhpbmcgdGhhdCBjYW1lIGJlZm9yZS5cbiAgICAgICAgLy8gT25seSB0aGUgbGFzdCAyIGFyZSBoYW5kbGVkIGluIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IuIEFuZCBpZiB3ZSdyZSBub3QgY2FyZWZ1bCwgd2UgY291bGQgYnJlYWsgdGhlbS5cbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHsgaW5uZXJIVE1MOiBleGlzdGluZ0VsZW1lbnQuaW5uZXJIVE1MIH07XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20oZXhpc3RpbmdFbGVtZW50LmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICAvLyBUaGlzIGlzIHVnbHkgYmVjYXVzZSBpdCBoYXBwZW5zIGFnYWluIGluIHRoZSBjb25zdHJ1Y3Rvci4gTm8gb3RoZXIgY2xlYW4gd2F5IHRvIHBhcnNlIHRoZSBlbGVtZW50IGF0dHJpYnV0ZXMsIHRob3VnaC5cbiAgICAgICAgaWYgKG9wdC5vdXRlckh0bWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENyZWF0ZUVsZW1lbnRfMS5kaXYob3B0Lm91dGVySHRtbC50cmltKCkpO1xuICAgICAgICAgICAgaWYgKHRtcC5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMSB8fCAhdG1wLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXRlckh0bWwgbXVzdCBjb250YWluIGV4YWN0bHkgb25lIEhUTUxFbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0bXAyID0gdG1wLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgLy8gVGhlIG91dGVyIEhUTUwgYXR0cmlidXRlcyBnZXQgcGlja2VkIHVwIGF1dG9tYXRpY2FsbHkgd2hlbiBhZGRlZCB0byB0aGUgRE9NLCBzbyB3ZSByZWFsbHlcbiAgICAgICAgICAgIC8vIGp1c3QgbmVlZCB0byBkaXNjYXJkIHRoZSBtYXRjaGluZyBwcm9wZXJ0aWVzIGFuZCBhdHRyaWJ1dGVzIG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICAgICAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuaW5uZXJIVE1MO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIEFycmF5LmZyb20odG1wMi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1thdHRyLm5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvcHQucHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24ocHJvcGVydGllcywgb3B0LnByb3BlcnRpZXMpO1xuICAgICAgICBvcHQuYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgb3B0LmF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gb3B0O1xuICAgIH1cbiAgICBzdGF0aWMgX2dldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBsZXQgb3B0O1xuICAgICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFNob3J0Y3V0IGZvciByZXBsYWNpbmcgdGhlIG91dGVyIEhUTUxcbiAgICAgICAgICAgIG9wdCA9IHsgcmVwbGFjZTogdHJ1ZSwgb3V0ZXJIdG1sOiBvcHRpb25zIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IGtub3cgdGhhdCBvcHRpb25zICE9PSAnc3RyaW5nJyAoY2FuJ3QgcmVhZCBcImVsc2UgaWZcIiBjbGF1c2UpXG4gICAgICAgICAgICBvcHQgPSBvcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3B0ID0geyByZXBsYWNlOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcHQ7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGV4aXN0aW5nRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBleGlzdGluZ0VsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZXBsYWNlQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQsIGV4aXN0aW5nRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZXBsYWNlRWxlbWVudFdpdGhDb21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBvcHRpb25zLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdCBvcHQgPSB0aGlzLl9tZXJnZVByb3BlcnRpZXNBbmRBdHRyaWJ1dGVzKGV4aXN0aW5nRWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3RvcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fcmVwbGFjZUVsZW1lbnQoZXhpc3RpbmdFbGVtZW50LCBjb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBzdGF0aWMgX2NvbnZlcnRFbGVtZW50VG9Db21wb25lbnQoZXhpc3RpbmdFbGVtZW50LCBjb25zdHJ1Y3Rvcikge1xuICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKHsgZWxlbWVudDogZXhpc3RpbmdFbGVtZW50IH0pO1xuICAgIH1cbiAgICBzdGF0aWMgX2xvb2tVcENvbnRhaW5lcnNUb0luamVjdChzZWxlY3RvciA9ICdbaWNoaWdvXScpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBJJ3ZlIGRvbmUgdGhpcyBteXNlbGYsIHdoaWNoIHJlc3VsdHMgaW4gYSBzaWxlbnQgZmFpbHVyZSBpZiBhY2NpZGVudGFsLlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5qZWN0aW9uIHNlbGVjdG9yIGlzIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCAnW2ljaGlnb10nO1xuICAgICAgICAvLyBMb29rIHVwIHRoZSBlbGVtZW50cyB0byBlaXRoZXIgcmVwbGFjZSBvciBjb252ZXJ0XG4gICAgICAgIGxldCBjb250YWluZXJzO1xuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBBcnJheS5mcm9tKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgY29udGFpbmVycyA9IHNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ29iamVjdCcgJiYgJ3NlbGVjdG9yJyBpbiBzZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gc2VsZWN0b3IucGFyZW50IHx8IGRvY3VtZW50O1xuICAgICAgICAgICAgY29udGFpbmVycyA9IEFycmF5LmZyb20ocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3Iuc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcnMgPSBbc2VsZWN0b3JdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJzO1xuICAgIH1cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuaWQ7XG4gICAgfVxuICAgIHNldCBpZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaWQgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGlubmVySFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5pbm5lckhUTUw7XG4gICAgfVxuICAgIHNldCBpbm5lckhUTUwodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIC8vIFdpbGwgcmV0dXJuIHVuZGVmaW5lZCBpZiBjb250ZW50IGlzIG5vdCBhIGZvcm0gZmllbGQgdHlwZVxuICAgICAgICByZXR1cm4gRm9ybUZpZWxkVmFsdWVfMS5nZXRGb3JtRmllbGRWYWx1ZSh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgLy8gV2lsbCBsb2cgYSB3YXJuaW5nIGlmIGNvbnRlbnQgaXMgbm90IGEgZm9ybSBmaWVsZCB0eXBlXG4gICAgICAgIEZvcm1GaWVsZFZhbHVlXzEuc2V0Rm9ybUZpZWxkVmFsdWUodGhpcy5jb250ZW50LCB2YWx1ZSk7XG4gICAgfVxuICAgIGdldCBjbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuY2xhc3NOYW1lO1xuICAgIH1cbiAgICBzZXQgY2xhc3NOYW1lKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNsYXNzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5jbGFzc0xpc3Q7XG4gICAgfVxuICAgIGdldCBzdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5zdHlsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGFuIEhUTUwgZXZlbnQgbGlzdGVuZXIgb24gdGhlIENvbXBvbmVudCBjb250ZW50LiBGbHVlbnQuXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VhcmNoIHRoZSBIVE1MIGZvciBpNV9ldmVudCBvciA6ZXZlbnQgYXR0cmlidXRlcyBhbmQgYWRkIGV2ZW50IGxpc3RlbmVycyBhY2NvcmRpbmcgdG8gaW5saW5lIGN1c3RvbSBhdHRyaWJ1dGVzLlxuICAgICAqIEZpbHRlciBieSBtYXRjaGluZyB0aGUgY29tcG9uZW50RmlsdGVyIGlucHV0IHdpdGggYW4gYXR0cmlidXRlIGxpa2UgY29tcG9uZW50PVwiY29tcG9uZW50RmlsdGVyXCIuXG4gICAgICogRW5jbG9zZSB0aGUgZXZlbnQgdHlwZSBpbiBwYXJlbnRoZXNlcywgYW5kIGZvciB0aGUgdmFsdWUsIGVudGVyIHRoZSBuYW1lIG9mIGEgbWV0aG9kIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAqIEV4YW1wbGU6IDxmb3JtIDpldmVudCAoY2xpY2spPVwic3VibWl0VGhlRm9ybVwiPjwvZm9ybT5cbiAgICAgKiBUaGlzIGlzIGFsc28gYWxsb3dlZDogPGZvcm0gOmV2ZW50IF9jbGlja189XCJzdWJtaXRUaGVGb3JtXCI+PC9mb3JtPlxuICAgICAqL1xuICAgIGFkZElubGluZUV2ZW50TGlzdGVuZXJzKGNvbXBvbmVudEZpbHRlcikge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHdlIGNvdWxkIHNraXAgdGhpcyBpbml0aWFsIGZpbHRlciwgbGlrZSBhbmd1bGFyIGRvZXMuIEJ1dCB0aGVyZSBpcyBubyBDU1Mgc2VsZWN0b3IgZm9yXG4gICAgICAgIC8vIGF0dHJpYnV0ZSBuYW1lIGJlZ2lucyB3aXRoIG9yIGVuZHMgd2l0aC4gW2F0dHJePV0gaXMgZm9yIHRoZSBWQUxVRSBiZWdpbm5pbmcgd2l0aCBzb21ldGhpbmcuXG4gICAgICAgIC8vIFRoaXMgaW5jbHVkZXMgdGhlIGNvbnRlbnQgaXRzZWxmIGluIGl0cyBjaGVjay5cbiAgICAgICAgZm9yIChjb25zdCBlbGUgb2YgUXVlcnlTZWxlY3Rvck5vZGVMaXN0XzEubm9kZUxpc3RTZWxlY3RvckFsbChbdGhpcy5jb250ZW50XSwgJ1tpNV9ldmVudF0sIFtcXFxcMDAwMDNBZXZlbnRdLCBbZGF0YS1pNV9ldmVudF0nKSkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudEZpbHRlciAmJiBlbGUuZ2V0QXR0cmlidXRlKCdjb21wb25lbnQnKSAhPT0gY29tcG9uZW50RmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50QXR0cmlidXRlcyA9IEFycmF5LmZyb20oZWxlLmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgbGV0IGV2ZW50RGVmaW5pdGlvbiA9IGN1cnJlbnRBdHRyaWJ1dGVzLmZpbmQoZiA9PiBmLm5hbWUuc3RhcnRzV2l0aCgnKCcpICYmIGYubmFtZS5lbmRzV2l0aCgnKScpICYmIGYubmFtZS5sZW5ndGggPiAyKTtcbiAgICAgICAgICAgIGlmICghZXZlbnREZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgYnkgYWx0ZXJuYXRlIHN5bnRheC4gVGhpcyBvbmUgd29ya3MgYmV0dGVyIHdpdGggc2V0QXR0cmlidXRlKCkuXG4gICAgICAgICAgICAgICAgZXZlbnREZWZpbml0aW9uID0gY3VycmVudEF0dHJpYnV0ZXMuZmluZChmID0+IGYubmFtZS5zdGFydHNXaXRoKCdfJykgJiYgZi5uYW1lLmVuZHNXaXRoKCdfJykgJiYgZi5uYW1lLmxlbmd0aCA+IDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldmVudERlZmluaXRpb24gfHwgIWV2ZW50RGVmaW5pdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgZGVmaW5pdGlvbiBub3QgZGVjbGFyZWQgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB0aGlzW2V2ZW50RGVmaW5pdGlvbi52YWx1ZV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlciBtZXRob2QgZm9yIGVsZW1lbnQgJHtlbGUuaWQgfHwgZWxlLnRhZ05hbWV9ICR7ZXZlbnREZWZpbml0aW9uLnZhbHVlfSBkb2VzIG5vdCBleGlzdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnREZWZpbml0aW9uLm5hbWUuc2xpY2UoMSwgLTEpLCBtZXRob2QuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFwcGVuZChuZXdDaGlsZCkge1xuICAgICAgICBpZiAoZ3VhcmQobmV3Q2hpbGQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBndWFyZChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogJiYgJ2NvbnRlbnQnIGluIG9iaiAmJiBvYmouY29udGVudCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kQ2hpbGQobmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKGd1YXJkKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChuZXdDaGlsZC5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGd1YXJkKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiAnY29udGVudCcgaW4gb2JqICYmIG9iai5jb250ZW50IGluc3RhbmNlb2YgTm9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRUb1BhcmVudChwYXJlbnQpIHtcbiAgICAgICAgaWYgKGd1YXJkKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZnVuY3Rpb24gZ3VhcmQob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqICYmICdjb250ZW50JyBpbiBvYmogJiYgb2JqLmNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgY29tcG9uZW50IHRvIENvbXBvbmVudE1hcC5cbiAgICAgKi9cbiAgICBtYXBDb21wb25lbnQoKSB7XG4gICAgICAgIC8vIFRocm93IGFuIGVycm9yIGlmIHRoZSBjb250ZW50IGhhcyBhbHJlYWR5IGJlZW4gcmVsYXRlZCB0byBhIGRpZmZlcmVudCBjb21wb25lbnRcbiAgICAgICAgaWYgKENvbXBvbmVudE1hcF8xLmdldENvbXBvbmVudCh0aGlzLmNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRlbnQgYWxyZWFkeSByZWZlcmVuY2VkIGJ5IGEgY29tcG9uZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuc2V0KHRoaXMuY29udGVudCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGNvbXBvbmVudCBmcm9tIENvbXBvbmVudE1hcC4gU29tZXRpbWVzIHlvdSBtaWdodCBuZWVkIHRvIHVzZSB0aGlzLiBCdXQgaG9wZWZ1bGx5IHJhcmVseSwgYmVjYXVzZSBpdCdzIHVzaW5nIGEgV2Vha01hcCxcbiAgICAgKi9cbiAgICB1bm1hcENvbXBvbmVudCgpIHtcbiAgICAgICAgQ29tcG9uZW50TWFwXzEuQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZGVsZXRlKHRoaXMuY29udGVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGNvbXBvbmVudHMgdGhhdCBhcmUgbmVzdGVkIGluc2lkZSB0aGlzIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICAqZ2V0QWxsQ2hpbGRDb21wb25lbnRzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGUgb2YgdGhpcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwXzEuZ2V0Q29tcG9uZW50KGUpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRTdHlsZShwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIC8vIFRTIGp1c3QgZm9yZ290IHRoYXQgcHJvcGVydHkgaXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPi5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSBwcm9wZXJ0eVtwcm9wXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkQ2xhc3MoY2xhc3NOYW1lcykge1xuICAgICAgICBpZiAoIWNsYXNzTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lcyA9PT0gXCJzdHJpbmdcIiAmJiBjbGFzc05hbWVzLmluY2x1ZGVzKFwiIFwiKSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXMuc3BsaXQoXCIgXCIpLmZpbHRlcihxID0+IHEgIT09IFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjbGFzc05hbWVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBjbGFzc05hbWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQmVjYXVzZSBhZGRJbmxpbmVFdmVudExpc3RlbmVycygpIHNlYXJjaGVzIGFsbCB0aGUgd2F5IGRvd24sIGludG8gbmVzdGVkIGNvbXBvbmVudHMsIGl0IGNhbid0IGJlIGNhbGxlZFxuICAgICAqIGJ5IGRlZmF1bHQuIEl0IGp1c3QgdGhyb3dzIGVycm9ycyBvbiBhbGwgYnV0IHNpbXBsZSB0ZXN0IGNhc2VzLiBCdXQgYmVjYXVzZSB0aGVzZSBldmVudHMgYWxtb3N0IGFsd2F5cyBleGlzdFxuICAgICAqIGludGVybmFsIHRvIHRoZSBjb21wb25lbnQgKGUuZy4gb24gYnV0dG9ucyksIGl0IGNhbid0IGJlIGxpbWl0ZWQuIFRoaXMgY2FuIGJlIGNvbmZ1c2luZyB3aXRob3V0IHNvbWUga2luZCBvZlxuICAgICAqIG1lc3NhZ2UuXG4gICAgICovXG4gICAgX2NoZWNrSW5saW5lRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWxlIG9mIFF1ZXJ5U2VsZWN0b3JOb2RlTGlzdF8xLm5vZGVMaXN0U2VsZWN0b3JBbGwoW3RoaXMuY29udGVudF0sICdbaTVfZXZlbnRdLCBbXFxcXDAwMDAzQWV2ZW50XSwgW2RhdGEtaTVfZXZlbnRdJykpIHtcbiAgICAgICAgICAgIGlmICghd2luZG93Ll9fZXZlbnRfd2FybmluZ19fKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ0lubGluZSBldmVudCBsaXN0ZW5lcnMgYXJlIGNvbmZpZ3VyZWQuIFJlbWVtYmVyIHRvIGNhbGwgYWRkSW5saW5lRXZlbnRMaXN0ZW5lcnMoKS4nKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuX19ldmVudF93YXJuaW5nX18gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWxldGUgd2luZG93Ll9fZXZlbnRfd2FybmluZ19fLCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRoZSBxdWVzdGlvbiBuZWVkcyB0byBiZSBhc2tlZDogaWYgeW91IGNhbiBhZGQgYSBjb21wb25lbnQgdG8gYSBwYWdlIGJ5IGRvaW5nIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY29tcG9uZW50LmNvbnRlbnQpLFxuICogaG93IGRvIHlvdSBkbyBmcm9tIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKSBhbmQgZ2V0IHRvIGNvbXBvbmVudCwgbm90IGNvbXBvbmVudC5jb250ZW50PyBUaGlzIGlzIGhvdy5cbiAqXG4gKiB2YXIgY29tcG9uZW50ID0gQ29tcG9uZW50TWFwLmNvbXBvbmVudHMuZ2V0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKSk7XG4gKlxuICogVGhpcyB3aWxsIHdvcmsgYXMgbG9uZyBhcyBDb21wb25lbnRNYXAuY29tcG9uZW50cy5zZXQoY29udGVudCwgY29tcG9uZW50KSBoYXMgYmVlbiBjYWxsZWQgYXQgc29tZSBwb2ludC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBhcHByb3ZlZCB3YXkgb2YgZG9pbmcgaXQuIEFub3RoZXIgcG9zc2libGUgc29sdXRpb24gd291bGQgYmUgdGhlIHVzZSBvZiBleHBhbmRvIHByb3BlcnRpZXMsXG4gKiBmb3IgZXhhbXBsZSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJykucmVsYXRlZENvbXBvbmVudCA9IGNvbXBvbmVudC4gVGhpcyB3b3JrcyBhbmQgaXQncyBzdXBlciBzaW1wbGUsXG4gKiBidXQgc2VlbXMgdG8gYmUgZnJvd25lZCB1cG9uIC4uLiBpdCBoYXMgYmVlbiBrbm93biB0byBjcmVhdGUgbWVtb3J5IGxlYWtzIGluIHRoZSBwYXN0LiBXZWFrTWFwIGlzIHRoZSBvYmplY3RcbiAqIHNwZWNpZmljYWxseSBjcmVhdGVkIGZvciB0aGlzIHVzZSBjYXNlLCBzbyB0aGF0IGlzIHVzZWQgaGVyZS5cbiAqXG4gKiBJZiBleHRlbnNpb24gbWV0aG9kcyBhcmUgbG9hZGVkLCB5b3UgY2FuIHVzZSB0aGUgZWxlbWVudC5nZXRDb21wb25lbnQoKSBzaG9ydGN1dC5cbiAqL1xuY2xhc3MgQ29tcG9uZW50TWFwIHtcbn1cbkNvbXBvbmVudE1hcC5jb21wb25lbnRzID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydHMuQ29tcG9uZW50TWFwID0gQ29tcG9uZW50TWFwO1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcbiAgICAgICAgaWYgKCFlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hcC5jb21wb25lbnRzLmdldChlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYXAuY29tcG9uZW50cy5nZXQoZWxlbWVudCk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDb21wb25lbnQgPSBnZXRDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlXG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIENvbXBvbmVudEJpbmRpbmdPcHRpb25zIHtcbiAgICBjb25zdHJ1Y3RvcihvcHQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29tcG9uZW50QmluZGluZ09wdGlvbnMgPSBDb21wb25lbnRCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdFbGVtZW50QmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gb3B0LmVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5FeGlzdGluZ0VsZW1lbnRCaW5kaW5nT3B0aW9ucyA9IEV4aXN0aW5nRWxlbWVudEJpbmRpbmdPcHRpb25zO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBvcHQuc2VsZWN0b3I7XG4gICAgfVxufVxuZXhwb3J0cy5FeGlzdGluZ0xvb2t1cEJpbmRpbmdPcHRpb25zID0gRXhpc3RpbmdMb29rdXBCaW5kaW5nT3B0aW9ucztcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgSW5uZXJIdG1sQmluZGluZ09wdGlvbnMgZXh0ZW5kcyBDb21wb25lbnRCaW5kaW5nT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIHN1cGVyKG9wdCk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICB9XG59XG5leHBvcnRzLklubmVySHRtbEJpbmRpbmdPcHRpb25zID0gSW5uZXJIdG1sQmluZGluZ09wdGlvbnM7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIE91dGVySHRtbEJpbmRpbmdPcHRpb25zIGV4dGVuZHMgQ29tcG9uZW50QmluZGluZ09wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBzdXBlcihvcHQpO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMub3V0ZXJIdG1sID0gb3B0Lm91dGVySHRtbDtcbiAgICB9XG59XG5leHBvcnRzLk91dGVySHRtbEJpbmRpbmdPcHRpb25zID0gT3V0ZXJIdG1sQmluZGluZ09wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgRXhpc3RpbmdFbGVtZW50T3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gb3B0LmVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5FeGlzdGluZ0VsZW1lbnRPcHRpb25zID0gRXhpc3RpbmdFbGVtZW50T3B0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBMb29rIHVwIGFuIGV4aXN0aW5nIGVsZW1lbnQgaW4gdGhlIERPTSBhbmQgY29udmVydCBpdCB0byBhIGNvbXBvbmVudC4gVGhpcyBpcyBqdXN0IGEgd2F5IHRvIHNpbXBsaWZ5IHRoZSBsb29rdXAgcHJvY2VzcyB2cyBkb2luZ1xuICogaXQgbWFudWFsbHkgYmVmb3JlIHVzaW5nIElFeGlzdGluZ0VsZW1lbnRPcHRpb25zLlxuICogTm90ZTogVHlwZXNjcmlwdCBjYW4ndCB2ZXJpZnkgeW91ciB0eXBlIGFubm90YXRpb25zIGlmIHlvdSBkbyBpdCB0aGlzIHdheS5cbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUcnkgdG8gcHJvdmlkZSBzb21lIGN1c3RvbSBjbGFzc2VzIHRvIGhlbHAgY2xlYW4gdXAgdGhlIG1lc3MgdGhhdCBUeXBlU2NyaXB0IGFuZCBWU0NvZGUgcHJvdmlkZXMgd2hlbmV2ZXJcbiAqIHRoZSBtZXNzIHRoZXkgY2FsbCBvdmVybG9hZGluZyBleHBsb2Rlcy4gSWYgeW91IG1lc3MgdXAgYSBwcm9wZXJ0eSwgdGhlIGVycm9yIG1lc3NhZ2UgY29tcGxhaW5zIHRoYXRcbiAqIHRoZSBvYmplY3QgeW91IHByb3ZpZGVkIGRvZXNuJ3QgaW5jbHVkZSB0aGUgdmFyaW91cyBwcm9wZXJ0aWVzIG9mIHRoZSBzdHJpbmcgb2JqZWN0LCB3aGljaCBpc24ndCBoZWxwZnVsLlxuICovXG5jbGFzcyBFeGlzdGluZ0xvb2t1cE9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBvcHQuc2VsZWN0b3I7XG4gICAgfVxufVxuZXhwb3J0cy5FeGlzdGluZ0xvb2t1cE9wdGlvbnMgPSBFeGlzdGluZ0xvb2t1cE9wdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVHJ5IHRvIHByb3ZpZGUgc29tZSBjdXN0b20gY2xhc3NlcyB0byBoZWxwIGNsZWFuIHVwIHRoZSBtZXNzIHRoYXQgVHlwZVNjcmlwdCBhbmQgVlNDb2RlIHByb3ZpZGVzIHdoZW5ldmVyXG4gKiB0aGUgbWVzcyB0aGV5IGNhbGwgb3ZlcmxvYWRpbmcgZXhwbG9kZXMuIElmIHlvdSBtZXNzIHVwIGEgcHJvcGVydHksIHRoZSBlcnJvciBtZXNzYWdlIGNvbXBsYWlucyB0aGF0XG4gKiB0aGUgb2JqZWN0IHlvdSBwcm92aWRlZCBkb2Vzbid0IGluY2x1ZGUgdGhlIHZhcmlvdXMgcHJvcGVydGllcyBvZiB0aGUgc3RyaW5nIG9iamVjdCwgd2hpY2ggaXNuJ3QgaGVscGZ1bC5cbiAqL1xuY2xhc3MgSW5uZXJIdG1sT3B0aW9ucyB7XG4gICAgY29uc3RydWN0b3Iob3B0KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0KTtcbiAgICB9XG59XG5leHBvcnRzLklubmVySHRtbE9wdGlvbnMgPSBJbm5lckh0bWxPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRyeSB0byBwcm92aWRlIHNvbWUgY3VzdG9tIGNsYXNzZXMgdG8gaGVscCBjbGVhbiB1cCB0aGUgbWVzcyB0aGF0IFR5cGVTY3JpcHQgYW5kIFZTQ29kZSBwcm92aWRlcyB3aGVuZXZlclxuICogdGhlIG1lc3MgdGhleSBjYWxsIG92ZXJsb2FkaW5nIGV4cGxvZGVzLiBJZiB5b3UgbWVzcyB1cCBhIHByb3BlcnR5LCB0aGUgZXJyb3IgbWVzc2FnZSBjb21wbGFpbnMgdGhhdFxuICogdGhlIG9iamVjdCB5b3UgcHJvdmlkZWQgZG9lc24ndCBpbmNsdWRlIHRoZSB2YXJpb3VzIHByb3BlcnRpZXMgb2YgdGhlIHN0cmluZyBvYmplY3QsIHdoaWNoIGlzbid0IGhlbHBmdWwuXG4gKi9cbmNsYXNzIE91dGVySHRtbE9wdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKG9wdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdCk7XG4gICAgICAgIHRoaXMub3V0ZXJIdG1sID0gb3B0Lm91dGVySHRtbDtcbiAgICB9XG59XG5leHBvcnRzLk91dGVySHRtbE9wdGlvbnMgPSBPdXRlckh0bWxPcHRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmFibGVDaGVjayhvYmopIHtcbiAgICAvLyBOb3QgYW4gZXhoYXVzdGl2ZSB0ZXN0IGJ1dCBpdCdzIHRoZSBpbXBvcnRhbnQgYml0LlxuICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NoYW5nZUhhbmRsZXInIGluIG9iaiAmJiBvYmouY2hhbmdlSGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcjtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUNoZWNrID0gb2JzZXJ2YWJsZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0FycmF5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlQmFzZVwiKTtcbmNsYXNzIFRyYWl0U291cmNlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIHN1cGVyKHsgbmFtZTogJ0FycmF5UHJveHknLCBkaXNhYmxlQXN5bmMgfSk7XG4gICAgfVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBBcnJheU9ic2VydmFibGUgZXh0ZW5kcyBBcnJheSB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG4gICAgc3RhdGljIGdldE1lcmdlZE9ic2VydmFibGUoYXJncywgZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgd2hlcmUgSSByZWFsbHkgbmVlZCBtdWx0aXBsZSBpbmhlcml0YW5jZS4gVGhpcyBuZWVkcyB0byBpbmhlcml0IGZyb20gQXJyYXlcbiAgICAgICAgLy8gYmVjYXVzZSBpdCdzIGV4dGVuZGluZyBhIGJ1aWx0LWluIGNsYXNzLiBJdCBhbHNvIG5lZWRzIHRvIGluaGVyaXQgZnJvbSBPYnNlcnZhYmxlQmFzZS5cbiAgICAgICAgLy8gVGhyZWUgY2hvaWNlczpcbiAgICAgICAgLy8gMSkgNTAgbGluZXMgb2YgY2xpcGJvYXJkIGluaGVyaXRhbmNlLlxuICAgICAgICAvLyAyKSBDaGVhdCBoZWF2aWx5IGJ5IHRha2luZyBhIHRyYWl0IGFwcHJvYWNoLiBUaGlzIG1lYW5zIGhhY2tlcnkgdG8gbWFrZSBUUyBoYXBweS5cbiAgICAgICAgLy8gMykgRG8gdGhlIHNhbWUgYXMgMiB3aXRoIHRoZSBidWlsdC1pbiBBcnJheSBjbGFzcy4gTm90IGEgcHJvYmxlbSBidXQgd2l0aCAjMiB0aGUgY2xhc3MgbmFtZSBhY3RzXG4gICAgICAgIC8vIGFzIGEgaGludCB0aGF0IGl0J3Mgbm90IGEgZGVmYXVsdCBhcnJheSwgd2hpY2ggaXMgYmV0dGVyLlxuICAgICAgICAvLyAjMiB3aW5zLlxuICAgICAgICBjb25zdCBhcnIgPSBuZXcgQXJyYXlPYnNlcnZhYmxlKC4uLmFyZ3MpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbihhcnIsIG5ldyBUcmFpdFNvdXJjZShkaXNhYmxlQXN5bmMpKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwgJ2NoYW5nZUhhbmRsZXInLCB7IGVudW1lcmFibGU6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBPYmplY3RzIGNyZWF0ZWQgdGhyb3VnaCBtYXAsIGZpbHRlciwgZXRjLCBzaG91bGQgYmUgZ2VuZXJpYyBhcnJheXMuXG4gICAgc3RhdGljIGdldCBbU3ltYm9sLnNwZWNpZXNdKCkge1xuICAgICAgICByZXR1cm4gQXJyYXk7XG4gICAgfVxuICAgIC8vIE5lZWRzIHRvIGJlIHB1YmxpYyBzbyB0aGUgcHJveHkgY2FuIGNhbGwgaXQsIGJ1dCBzaG91bGQgbm90IGJlIGNhbGxlZCBvdXRzaWRlIHRoZSBBUEkuIEltYWdpbmUgaXQncyBpbnRlcm5hbC5cbiAgICBwdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBhcmdzLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICAvLyBUaGlzIHJlcXVpcmVzIGEgY2hlYXQuIEl0IHdpbGwgZmFpbCBpZiB0aGUgb2JqZWN0IGlzIGNyZWF0ZWQgd2l0aCBuZXcoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEuQXJyYXlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBhcmdzLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5T2JzZXJ2YWJsZSA9IEFycmF5T2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuY2xhc3MgQXJyYXlQcm94eUhhbmRsZXIge1xuICAgIGdldCh0YXJnZXQsIGtleSwgcHJveHkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZENhbGxlZCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICAvLyBTaWxlbnQgcGFzcy10aHJvdWdoIG9mIG90aGVyIG1ldGhvZHNcbiAgICAgICAgICAgIGlmIChBcnJheVByb3h5SGFuZGxlci5tZXRob2RzVG9XYXRjaC5pbmRleE9mKGtleS50b1N0cmluZygpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kQ2FsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogTmVlZCB0byBldmFsdWF0ZSBwZXJmb3JtYW5jZSBvZiBjb3BpZXNcbiAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbCA9IG1ldGhvZENhbGxlZC5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdjYWxsJywga2V5LCBhcmdzLCBiZWZvcmUsIGFmdGVyLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpIHtcbiAgICAgICAgLy8gUHJvYmxlbTogV2Ugd2FudCB0byBjYXB0dXJlIG9ubHkgbGVuZ3RoIGFuZCBbaW5kZXhlcl0gY2FsbHMsIGJ1dCBKUyBoYXMgbm8gY29uc2lzdGVudFxuICAgICAgICAvLyB3YXkgb2YgZGVmaW5pbmcgW2luZGV4ZXJdLiBXaGF0IG1ha2VzIGl0IHdvcnNlIGlzIHRoYXQgaWYgYSBzdHJpbmcgaXMgYW4gaW50ZWdlciwgaXQgaXNcbiAgICAgICAgLy8gY29udmVydGVkIHRvIGEgbnVtYmVyLiBBbmQgSlMgZG9lcyBub3QgaW5jbHVkZSBhIGJ1aWx0LWluIHdheSB0byB0ZXN0IGlmIGEgbnVtYmVyIGlzIGFuIGludGVnZXIuXG4gICAgICAgIC8vIFNvbHV0aW9uOiBBIHJlZ2V4LWJhc2VkIGNoZWNrLiBJY2suIFdheSB0byByZW1pbmQgbWUgSSdtIHVzaW5nIEpTLlxuICAgICAgICBpZiAoa2V5ICYmIChrZXkudG9TdHJpbmcoKSA9PT0gJ2xlbmd0aCcgfHwgdHlwZW9mIGtleSA9PT0gJ251bWJlcicgfHwgSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoa2V5KSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IE5lZWQgdG8gZXZhbHVhdGUgcGVyZm9ybWFuY2Ugb2YgY29waWVzXG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdzZXQnLCBrZXksIFt2YWx1ZV0sIGJlZm9yZSwgYWZ0ZXIsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAvLyBDYW5ub3QgcmVwb3J0IHByb3h5IGFzIHNlbmRlciBiZWNhdXNlIHByb3h5IG5vdCBzZW50IHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ2RlbGV0ZScsIGtleSwgW10sIGJlZm9yZSwgYWZ0ZXIsIG51bGwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vLyBUaGVzZSBhcmUgYWxsIHRoZSBtZXRob2RzLCBub3QgY291bnRpbmcgY3VzdG9tIHNldHRlcnMsIHRoYXQgbXV0YXRlIGFuIGFycmF5LlxuQXJyYXlQcm94eUhhbmRsZXIubWV0aG9kc1RvV2F0Y2ggPSBbJ2NvcHlXaXRoaW4nLCAnZmlsbCcsICdwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXTtcbmV4cG9ydHMuQXJyYXlQcm94eUhhbmRsZXIgPSBBcnJheVByb3h5SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVCYXNlXCIpO1xuY29uc3QgT2JqZWN0RnVsbEFzc2lnbl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIik7XG5jbGFzcyBPYmplY3RPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgb25seSB3YXkgdG8gcHJvZHVjZSBhbiBvYmplY3Qgb2JzZXJ2YWJsZSwgZm9yIHJlYXNvbnMgb2Ygc2FmZXR5LlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRNZXJnZWRPYnNlcnZhYmxlKGRhdGEsIGRpc2FibGVBc3luYykge1xuICAgICAgICAvLyBXZSBuZWVkIHNvbWV0aGluZyB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgaW5wdXQgb2JqZWN0IG1lcmdlZCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMuXG4gICAgICAgIC8vIEkgZG9uJ3Qgd2FudCB0byBhY3R1YWxseSBtb2RpZnkgdGhlIGlucHV0IG9iamVjdC4gRXZlbiB0aG91Z2ggaXQgU0hPVUxEIGJlIHRocm93YXdheSwgSSBkb24ndCBrbm93LlxuICAgICAgICAvLyBBbmQgSSBkb24ndCB3YW50IHRvIHRha2UgdGhlIHJpc2sgdGhhdCBzb21ldGhpbmcgaW4gdGhlIGlucHV0LCBhbiB1bmtub3duIGZhY3Rvciwgd2lsbCBtYWtlIHRoaXMgYmxvdyB1cC5cbiAgICAgICAgLy8gSSBrbm93IHRoYXQgdGhpcyBjbGFzcyBoYXMgb25seSAyIGxldmVscyBvZiBpbmhlcml0YW5jZSAoY3VycmVudGx5KSBhbmQgY29udGFpbnMgbm90aGluZyB2ZXJ5IGNvbXBsZXggYXQgYW55IGxldmVsLlxuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbihkYXRhLCBuZXcgT2JqZWN0T2JzZXJ2YWJsZShkaXNhYmxlQXN5bmMpLCB0cnVlKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwgJ2NoYW5nZUhhbmRsZXInLCB7IGVudW1lcmFibGU6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgc3VwZXIoeyBuYW1lOiBcIk9iamVjdFByb3h5XCIsIGRpc2FibGVBc3luYyB9KTtcbiAgICB9XG4gICAgLy8gTmVlZHMgdG8gYmUgcHVibGljIHNvIHRoZSBwcm94eSBjYW4gY2FsbCBpdCwgYnV0IHNob3VsZCBub3QgYmUgY2FsbGVkIG91dHNpZGUgdGhlIEFQSS4gSW1hZ2luZSBpdCdzIGludGVybmFsLlxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICAvLyBUaGlzIGZpbHRlcnMgb3V0IHRoZSB0cm91Ymxlc29tZSBjaGFuZ2VIYW5kbGVyIGZpZWxkLlxuICAgICAgICByZXR1cm4gc3VwZXIudG9KU09OKCk7XG4gICAgfVxufVxuZXhwb3J0cy5PYmplY3RPYnNlcnZhYmxlID0gT2JqZWN0T2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgT2JqZWN0UHJveHlIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfbWV0aG9kc1RvV2F0Y2gsIF93YXRjaFNldCwgX3dhdGNoRGVsZXRlLCBfdHJpZ2dlck9ubHlPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9tZXRob2RzVG9XYXRjaCA9IF9tZXRob2RzVG9XYXRjaDtcbiAgICAgICAgdGhpcy5fd2F0Y2hTZXQgPSBfd2F0Y2hTZXQ7XG4gICAgICAgIHRoaXMuX3dhdGNoRGVsZXRlID0gX3dhdGNoRGVsZXRlO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gX3RyaWdnZXJPbmx5T25DaGFuZ2U7XG4gICAgfVxuICAgIGdldCh0YXJnZXQsIGtleSwgcHJveHkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZENhbGxlZCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICAvLyBTaWxlbnQgcGFzcy10aHJvdWdoIG9mIG5vbi13YXRjaGVkIG1ldGhvZHNcbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRob2RzVG9XYXRjaC5pbmRleE9mKGtleS50b1N0cmluZygpKSA9PT0gLTEgfHwgdHlwZW9mIG1ldGhvZENhbGxlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RDYWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSB3cmFwcGVyIGFyb3VuZCB0aGUgbWV0aG9kIHRoYXQgcHVibGlzaGVzIHRoZSBjaGFuZ2VcbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbCA9IG1ldGhvZENhbGxlZC5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywga2V5LCB1bmRlZmluZWQsIGFyZ3MsIHByb3h5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSkge1xuICAgICAgICBpZiAodGhpcy5fd2F0Y2hTZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gSWYgdG8gYmUgdHJpZ2dlcmVkIG9ubHkgb24gY2hhbmdlLCBjaGVjayBvbGRWYWx1ZSBhbmQgbmV3VmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlICYmIG9sZFZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ3NldCcsIGtleSwgb2xkVmFsdWUsIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoRGVsZXRlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgLy8gQ2Fubm90IHJlcG9ydCBwcm94eSBhcyBzZW5kZXIgYmVjYXVzZSBwcm94eSBub3Qgc2VudCB0byB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2RlbGV0ZScsIGtleSwgb2xkVmFsdWUsIHVuZGVmaW5lZCwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk9iamVjdFByb3h5SGFuZGxlciA9IE9iamVjdFByb3h5SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgT2JzZXJ2YWJsZVByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG4vKipcbiAqIFRoaXMgaXMgYSBzaW1wbGUgaW1wbGVtZW50YXRpb24gb2YgT2JqZWN0LmFzc2lnbigpIHRoYXQgdW5kZXJzdGFuZHMgT2JzZXJ2YWJsZVByb3BlcnR5LFxuICogc28gdGhhdCBpdCBjYW4gdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2l0aG91dCB3aXBpbmcgb3V0IHJlZmVyZW5jZXMgdG8gdGhlXG4gKiBleGlzdGluZyBwcm9wZXJ0eSB3aXRoIHRoYXQga2V5ICh3aGljaCBpcyB3aGF0IHdvdWxkIGhhcHBlbiBpZiB5b3UgdXNlZCByZWd1bGFyIE9iamVjdC5hc3NpZ24oKVxuICogb24gYSBub24tcHJveGllZCBvYmplY3QpLiAgSXQgY2FuIGFsc28gYmUgdXNlZCB0byByZWFkIHRoZSB2YWx1ZSBvZiBhbiBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIG9ic2VydmFibGVBc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHt9O1xuICAgIGZvciAoY29uc3Qgc3JjIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3JjKSkge1xuICAgICAgICAgICAgY29uc3Qgc3Byb3AgPSBzcmNba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHRwcm9wID0gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICBsZXQgdmFsO1xuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNwcm9wKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHNwcm9wLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsID0gc3Byb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sodHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdHByb3AudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUFzc2lnbiA9IG9ic2VydmFibGVBc3NpZ247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuLyoqXG4gKiBDb21tb24gbG9naWMgYmV0d2VlbiB0aGUgZGlmZmVyZW50IG9ic2VydmFibGUgY2xhc3Nlcy4gVGhlc2UgaW1wbGVtZW50IElPYnNlcnZhYmxlLiBUaGUgaW52b2NhdGlvbiBpdHNlbGYgdmFyaWVzIGZyb20gY2xhc3MgdG8gY2xhc3MuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGZvcndhcmRUbywgYnViYmxlRnJvbSwgZGlzYWJsZUFzeW5jIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGlmIChkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcndhcmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBidWJibGVGcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWdEZWxlZ2F0ZShuYW1lKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgaGFzIGZvcmdvdHRlbiB0aGF0IEV2ZW50SGFuZGxlciBjYW4gYWNjZXB0IGFuIGFycmF5LlxuICAgICAgICAvLyBJbiBzcGl0ZSBpZiB0aGUgZmFjdCB0aGF0IHRoaXMgc2lnbmF0dXJlIGlzIGlkZW50aWNhbC5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci5zdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhlIGlucHV0J3MgZGVsZWdhdGUgdG8gdGhpcyBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pIHtcbiAgICAgICAgLy8gSm9pbiB0aGUgb3RoZXIgZXZlbnQgaGFuZGxlciB0byB0aGlzLCBzbyB0aGF0IHdoZW4gdGhpcyBpcyBpbnZva2VkLCBzbyBpcyB0aGUgb3RoZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKGZvcndhcmRUby5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoaXMgb2JqZWN0J3MgZGVsZWdhdGUgdG8gdGhlIGlucHV0IG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oYnViYmxlRnJvbSkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gZXZlbnRzIHJhaXNlZCBvbiB0aGUgb3RoZXIgaGFuZGxlciwgc28gdGhhdCB3aGVuIHRoYXQgaXMgaW52b2tlZCwgc28gaXMgdGhpc1xuICAgICAgICAvLyBUaGUgc2FtZSBhcyBmb3J3YXJkQ2hhbmdlRXZlbnRzVG8gZXhjZXB0IHRoYXQgdGhpcyBpcyB0aGUgdGFyZ2V0LCBub3QgdGhlIHNvdXJjZS5cbiAgICAgICAgYnViYmxlRnJvbS5zdWJzY3JpYmUodGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZVNlbmRlcihzZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcik7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwcm9iYWJseSBmcm93bmVkIHVwb24gKHNlZSBob3cgVFMgZG9lc24ndCBsaWtlIGl0KSwgYnV0IGl0J3MgdmFsaWQgSlMuXG4gICAgICogSXQncyBvbmx5IGludGVuZGVkIGZvciB0cm91Ymxlc2hvb3RpbmcsIG5vdCByZWFsIGxvZ2ljLiBUaGVyZSBhcmUgdGltZXMgd2hlbiB5b3UncmVcbiAgICAgKiB0cnlpbmcgdG8gaWRlbnRpZnkgZXhhY3RseSB3aGljaCBkZWxlZ2F0ZXMgYXJlIHN1YnNjcmliZWQsIGFuZCB0aGlzIGlzIHJlYWxseSBoYXJkIHdoZW5cbiAgICAgKiBub3RoaW5nIGhhcyBodW1hbi1yZWFkYWJsZSBuYW1lcy5cbiAgICAgKi9cbiAgICB0YWdEZWxlZ2F0ZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUuX3RhZyA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB4IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBcImNoYW5nZUhhbmRsZXJcIiAmJiB4ICE9PSBcInByaXZhdGVQcm9wZXJ0eTJcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdFt4XSA9IHRoaXNbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVCYXNlID0gT2JzZXJ2YWJsZUJhc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gT2JzZXJ2YWJsZVByb3BlcnR5IGlzIGEgcHJvcGVydHkgdGhhdCBhdXRvbWF0aWNhbGx5IHJhaXNlcyBhIFByb3BlcnR5Q2hhbmdlZCBldmVudCB3aGVuIGl0IGlzIG1vZGlmaWVkLiBUaGlzIGlzIG1vcmVcbiAqIGNvbnZlbmllbnQgdGhhbiBoYXZpbmcgdG8gZG8gaXQgbWFudWFsbHkgZXZlcnkgdGltZSB5b3UgbmVlZCBpdC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVByb3BlcnR5IGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IG9wdGlvbnMub25seVdoZW5DaGFuZ2VkIHx8IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkLCB2YWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgKGlmIGEgc3RyaW5nKSB0aGF0IGhhcyBoYWQgc3BlY2lhbCBIVE1MIGNoYXJhY3RlcnMgZXNjYXBlZC5cbiAgICAgKi9cbiAgICBnZXQgc2FmZVZhbHVlKCkge1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVQcm9wZXJ0eSA9IE9ic2VydmFibGVQcm9wZXJ0eTtcbmZ1bmN0aW9uIG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3QgbGlrZSB0aGlzIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGNoZWNraW5nIGlmIHZhbHVlIGlzIGEgc2V0dGVyLFxuICAgIC8vIGFuZCBpdCBpc24ndCwgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gY2hlY2suXG4gICAgLy8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpIGRvZXNuJ3QgY2F0Y2ggaW5oZXJpdGVkIHByb3BlcnRpZXMsIG9mXG4gICAgLy8gd2hpY2ggdGhpcyBpcyBhbG1vc3QgYWx3YXlzIG9uZS5cbiAgICAvLyBJIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGEgYmFzaWMgaW5zdGFuY2UgY2hlY2suXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlUHJvcGVydHk7XG59XG5leHBvcnRzLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrID0gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5T2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlXCIpO1xuY29uc3QgQXJyYXlQcm94eUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL0FycmF5UHJveHlIYW5kbGVyXCIpO1xuY29uc3QgT2JqZWN0T2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvT2JqZWN0T2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9iamVjdFByb3h5SGFuZGxlcl8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyXCIpO1xuY2xhc3MgT2JzZXJ2YWJsZVByb3h5IHtcbiAgICBzdGF0aWMgcHJveGltYXRlKG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgZG8gZnVuY3Rpb25zLCBub3QgdGhhdCB0aGV5IHdvdWxkIGJlIHZlcnkgdXNlZnVsLlxuICAgICAgICAgICAgLy8gWWVzLCB0ZWNobmljYWxseSB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gZGVmaW5lIHByb3BlcnRpZXMgb24gYSBmdW5jdGlvbi4gVGhleSBhcmUgYWN0dWFsXG4gICAgICAgICAgICAvLyBvYmplY3RzLiAgSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpIHN0aWxsIG1ha2VzIHRoZW0gdW5kZWZpbmVkLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB0eXBlOiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobW9kZWwpKSB7XG4gICAgICAgICAgICAvLyBBbiBhcnJheSBwcm94eSBhbGxvd3MgY2hhbmdlcyB0byBhbiBhcnJheSB0byBiZSBvYnNlcnZlZC4gVGhlIGRvd24tc2lkZSBpcyB0aGF0IHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAvLyBpcyBhbiBvcmRlciBvZiBtYWduaXR1ZGUgc2xvd2VyIHRoYW4gdXNpbmcgYW4gT2JzZXJ2YWJsZUxpc3QuICBUaGUgdXAtc2lkZSBpcyB0aGF0IGl0IHVzZXNcbiAgICAgICAgICAgIC8vIG1vcmUgdGhhbiBhbiBvcmRlciBvZiBtYWduaXR1ZGUgbGVzcyBjb2RlLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlQXJyYXkobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlT2JqZWN0KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgYSBzaW1wbGUgdmFsdWUgaXMgcmV0dXJuZWQsIHJldHVybiBhIHByb3h5IGhhdmluZyBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlT2JqZWN0KHsgdmFsdWU6IG1vZGVsIH0sIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBjb25maWd1cmFibGUgdmVyc2lvbiBvZiBwcm94aW1hdGUoKSBjYWxsZWQgb24gYW4gb2JqZWN0LiBCeSBtYWtpbmcgaXQgZ2VuZXJhbGl6ZWQgYW5kIGNvbmZpZ3VyYWJsZSwgdGhpcyBhbGxvd3MgdGhlIGNhbGxlciB0b1xuICAgICAqIHRyYWNrIG1ldGhvZHMgdGhhdCBhcmUgY2FsbGVkLCBiYXNlZCBvbiBhIGNvbmZpZ3VyYWJsZSBsaXN0LlxuICAgICAqXG4gICAgICogSWYgdGhlIG9iamVjdCBpcyBhIGNvbXBsZXggb2JqZWN0LCB3aGVyZSBjaGlsZCBvYmplY3RzIGFyZSBtb2RpZmllZCwgbm90IHRoZSBtYWluIG9iamVjdCwgY2hhbmdlcyB3b3VsZCBub3QgYmUgY2F1Z2h0LlxuICAgICAqIE9uZSB3YXkgdG8gaGFuZGxlIHRoYXQgaXMgdG8gbWFrZSB0aGUgY2hpbGQgb2JqZWN0IGEgcHJveHkuIEFub3RoZXIgd2F5IGlzIHRvIGFjY2VzcyB0aGUgY2hpbGQgb2JqZWN0IG9ubHkgdGhyb3VnaCBtZXRob2RzXG4gICAgICogYW5kIHVzZSB0aGlzLlxuICAgICAqL1xuICAgIHN0YXRpYyBwcm94aW1hdGVPYmplY3QobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCwgbWV0aG9kc1RvV2F0Y2ggPSBbXSwgd2F0Y2hTZXQgPSB0cnVlLCB3YXRjaERlbGV0ZSA9IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgZG8gZnVuY3Rpb25zLCBub3QgdGhhdCB0aGV5IHdvdWxkIGJlIHZlcnkgdXNlZnVsLlxuICAgICAgICAgICAgLy8gWWVzLCB0ZWNobmljYWxseSB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gZGVmaW5lIHByb3BlcnRpZXMgb24gYSBmdW5jdGlvbi4gVGhleSBhcmUgYWN0dWFsXG4gICAgICAgICAgICAvLyBvYmplY3RzLiAgSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpIHN0aWxsIG1ha2VzIHRoZW0gdW5kZWZpbmVkLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB0eXBlOiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBJT2JzZXJ2YWJsZSBtZXRob2RzIHRvIHRoZSBtb2RlbCBzbyB0aGF0IGl0IGNhbiByYWlzZSBldmVudHMuXG4gICAgICAgIC8vIFdlIG11c3QgZXh0ZW5kIHRoZSBvcmlnaW5hbCBjbGFzcyAob3IgYXQgbGVhc3QgdGhlIG9iamVjdCkuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdE9ic2VydmFibGVfMS5PYmplY3RPYnNlcnZhYmxlLmdldE1lcmdlZE9ic2VydmFibGUobW9kZWwsIGRpc2FibGVBc3luYyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT2JqZWN0UHJveHlIYW5kbGVyXzEuT2JqZWN0UHJveHlIYW5kbGVyKG1ldGhvZHNUb1dhdGNoIHx8IFtdLCB3YXRjaFNldCB8fCBmYWxzZSwgd2F0Y2hEZWxldGUgfHwgZmFsc2UsIG9ubHlJZkNoYW5nZWQgfHwgZmFsc2UpO1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlUHJveHkuX21vZGVscy5zZXQocHJveHksIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJveGltYXRlIGFuIGFycmF5LlxuICAgICAqL1xuICAgIHN0YXRpYyBwcm94aW1hdGVBcnJheShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKSB7XG4gICAgICAgIC8vIEFkZCBJT2JzZXJ2YWJsZSBtZXRob2RzIHRvIHRoZSBtb2RlbCBzbyB0aGF0IGl0IGNhbiByYWlzZSBldmVudHMuXG4gICAgICAgIC8vIFdlIG11c3QgZXh0ZW5kIHRoZSBvcmlnaW5hbCBhcnJheSBjbGFzcyAob3IgYXQgbGVhc3QgdGhlIGFycmF5IG9iamVjdCkuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IEFycmF5T2JzZXJ2YWJsZV8xLkFycmF5T2JzZXJ2YWJsZS5nZXRNZXJnZWRPYnNlcnZhYmxlKG1vZGVsLCBkaXNhYmxlQXN5bmMpO1xuICAgICAgICAvLyBUaGUgdHlwZSBoZXJlIGlzbid0IGFjY3VyYXRlLCBidXQgSSBoYXZlIG5vIGdvb2Qgd2F5IHRvIHBhc3MgdGhlIGtleSB0eXBlIHdpdGhvdXQgbWFraW5nIHRoaXMgY2xhc3Mgb25seSB3b3JrIGZvciBhcnJheXMuXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQXJyYXlQcm94eUhhbmRsZXJfMS5BcnJheVByb3h5SGFuZGxlcigpO1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlUHJveHkuX21vZGVscy5zZXQocHJveHksIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG59XG4vLyBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCBuZWVkcyB0byBiZSBzdG9yZWQgc29tZXdoZXJlIHNvIHRoYXQgdGhlIHByb3h5IGNhbiB3b3JrLlxuLy8gVGhlcmUncyBubyByZWFzb24gdGhhdCB0aGUgdXNlciBjYW4ndCBrZWVwIGEgY29weSBidXQgd2Ugc2hvdWxkbid0IGZvcmNlIHRoYXQuXG5PYnNlcnZhYmxlUHJveHkuX21vZGVscyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLk9ic2VydmFibGVQcm94eSA9IE9ic2VydmFibGVQcm94eTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDbG9uZURlZXBfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBvYnNlcnZhYmxlIHN0YXRlIHRoYXQgc2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgdXNpbmcgdGhlIHJlbGV2YW50IG1ldGhvZHMsIGFsbG93aW5nIGF0b21pYyBjaGFuZ2VzIHRvIG11bHRpcGxlIHByb3BlcnRpZXNcbiAqIGluIG11bHRpcGxlIG9iamVjdHMsIHJhaXNpbmcgYSBzaW5nbGUgZXZlbnQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVTdGF0ZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICdzZXRTdGF0ZSc7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgLy8gSSB3b3VsZCBwcmVmZXIgdGhhdCB0aGlzIHJldHVybiBSZWFkb25seTxUPiBidXQgZ2V0dGVyIGFuZCBzZXR0ZXIgaGF2ZSB0byBiZSB0aGUgc2FtZSB0eXBlLlxuICAgICAgICAvLyBUaGF0IG1lYW5zIHlvdSB3b3VsZCBoYXZlIHRvIGNhc3QgYW55IHZhbHVlIHlvdSBzZXQgYXMgYSByZWFkb25seSwgd2hpY2ggaXMgYSBQSVRBLlxuICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcndyaXRlcyB0aGUgZW50aXJlIHZhbHVlLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0U2FmZVZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodG1wKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0bXApKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRtcCkpO1xuICAgIH1cbiAgICBnZXRWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgIH1cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHNldFN0YXRlKHZhbHVlLCBvdmVyV3JpdGVBbGwgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZTtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlO1xuICAgICAgICAvLyBJZiB0aGUgdHlwZSBpcyBwcmltaXRpdmUsIHRoZW4gYSBmdWxsIG92ZXJ3cml0ZSBpcyBhbGxvd2VkXG4gICAgICAgIGlmIChJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgLy8gRnVuY3Rpb25zIHdpbGwgZXhlY3V0ZSBidXQgdGhleSB3b24ndCBjaGFuZ2UgdGhlIHZhbHVlLiBUaGUgcmVhc29uIGlzIHRoZSBzYW1lIHJlYXNvbiB0aGF0IHRoaXMgbWFrZXMgbm8gcGVybWFuZW50IGNoYW5nZSB0byBiYXI6XG4gICAgICAgICAgICAvLyB2YXIgZm9vID0gZnVuY3Rpb24oc3RyKSB7IHN0ciA9IHN0ci50b1VwcGVyQ2FzZSgpOyB9OyB2YXIgYmFyID0gJ2FiYyc7IGZvbyhiYXIpOyBjb25zb2xlLmxvZyhiYXIgPT09ICdhYmMnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHNldFN0YXRlIHdpdGggYSBmdW5jdGlvbiBpZiBzdGF0ZSBpcyBwcmltaXRpdmUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdmVyV3JpdGVBbGwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdmVyV3JpdGVBbGwpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjFfb3ZlcndyaXRlQWxsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgW25ld1ZhbHVlLCByZXR1cm5WYWx1ZV0gPSBfb3ZyM19mdW5jdGlvbkFyZy5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndmFsdWUgaXMgbm90IGEgcGFydGlhbCBzdGF0ZSBvciBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIyX3BhcnRpYWwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywgdGhpcy5wcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiB7IG9sZFZhbHVlLCBuZXdWYWx1ZSwgcmV0dXJuVmFsdWUgfTtcbiAgICAgICAgZnVuY3Rpb24gX292cjFfb3ZlcndyaXRlQWxsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gT3ZlcndyaXRlIHRoZSBlbnRpcmUgb2JqZWN0LlxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAoX3ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjJfcGFydGlhbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIFBhcnRpYWwgb2JqZWN0OiBPdmVyd3JpdGUgb25seSB0aGUga2V5cyBwcm92aWRlZFxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKF92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0bXBba2V5XSA9IF92YWx1ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiB0bXA7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjNfZnVuY3Rpb25BcmcoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmdW5jdGlvbiBwcm92aWRlZCBhbmQgdXBkYXRlIHRoZSBvYmplY3QgYXMgZGljdGF0ZWRcbiAgICAgICAgICAgIC8vIE1heWJlIHVubmVjZXNzYXJ5IGJ1dCB3ZSB3YW50IHRvIGF2b2lkIHRoZSBjYWxsZXIgZXhmaWx0cmF0aW5nIHRoZSBzdGF0ZSB1c2luZyBhIGZ1bmN0aW9uLFxuICAgICAgICAgICAgLy8gYnkgYWNjaWRlbnQuIE9mIGNvdXJzZSwgdGhleSBjYW4ganVzdCBhY2Nlc3MgX3ZhbHVlIGJ5IGNhc3RpbmcgYXMgYW55LFxuICAgICAgICAgICAgLy8gYnV0IHRoYXQncyBub3QgYWNjaWRlbnRhbC5cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBfcmV0dXJuVmFsdWUgPSBfdmFsdWUuY2FsbCh0bXAsIHRtcCk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIFt0bXAsIF9yZXR1cm5WYWx1ZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVTdGF0ZSA9IE9ic2VydmFibGVTdGF0ZTtcbmZ1bmN0aW9uIG9ic2VydmFibGVTdGF0ZUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3Qga25vdyBpZiBJIHNob3VsZCBjaGVjayBmb3IgdGhpcyBvciBmb3IgZ2V0U3RhdGUoKSBhbmQgc2V0U3RhdGUoKVxuICAgIHJldHVybiBvYmogJiYgb2JqIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlU3RhdGVDaGVjayA9IG9ic2VydmFibGVTdGF0ZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRGVsZXRlTm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0RlbGV0ZU5vZGVDb250ZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBFbHZpc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0VsdmlzXCIpO1xuLyoqXG4gKiBJZiB5b3UgY2xpY2sgYSBsaW5rIGluIGEgcmVhbCB3ZWIgc2l0ZSwgdGhlIGJyb3dzZXIgYXNrcyB0aGUgc2VydmVyIGZvciBhIHBhZ2UgYW5kIGl0IHJvdXRlcyB5b3UgdG8gdGhlIHJlbGV2YW50XG4gKiBwYWdlLiBCdXQgaWYgeW91IGhhdmUgYSBzaW5nbGUgcGFnZSBhcHAgcnVubmluZyBvbiBhIGZpbGUsIHdpdGggbm8gd2ViIHNlcnZlciwgbGlrZSB0aGUgb25lIHRoaXMgZnJhbWV3b3JrXG4gKiB3YXMgYnVpbHQgZm9yLCB5b3UgbmVlZCBzb21ldGhpbmcgdG8gc2ltdWxhdGUgdGhhdC5cbiAqXG4gKiBUaGUgQWR2YW5jZWQgdmVyc2lvbiBvZiB0aGUgcm91dGVyIHdhcyBjcmVhdGVkIHRvIHByb3ZpZGUgdGhlIHJlY3Vyc2l2ZWx5LW5lc3RlZCByb3V0ZXMgdGhhdCB5b3UgY2FuIGdldCB3aXRoIEFuZ3VsYXIuXG4gKiBJdCBmdW5jdGlvbnMuIEJ1dCBJIGhhdGUgaXQuIEkgZG9uJ3QgbGlrZSBzZXR0aW5nIHVwIHJvdXRlcyBpbiBBbmd1bGFyIGJlY2F1c2UgaXQgdGFrZXMgZWRpdGluZyB0b28gbWFueSBmaWxlcyBldmVuXG4gKiBmb3Igc2ltcGxlIHNpdGVzLiBUaGF0IHNhaWQsIGZvciBhIHZlcnkgbGFyZ2UgYW5kIGNvbXBsZXggc2l0ZSBpdCdzIG5pY2UgdG8gaGF2ZSB0aGUgb3JnYW5pemF0aW9uLCBzbyB0aGVyZSdzIHRoYXQuXG4gKlxuICogSSBmb3VuZCB0aGlzIHRvIGJlIGNvbXBsZXggYW5kIGJyaXR0bGUgYW5kIGlmIHlvdSB3YW50IHRvIHVzZSB0aGUgYWR2YW5jZWQgZmVhdHVyZXMgKGl0J3MgcHJldHR5IHRyaXZpYWwgdG8gaGF2ZSB0aHJlZVxuICogY29sdW1ucywgZWFjaCBwb3B1bGF0ZWQgdmlhIHRoZSByb3V0ZSwgZm9yIGV4YW1wbGUpLCBpdCBjYW4gZ2V0IGhhcmQgdG8gc2V0IHVwIGFuZCBlYXN5IHRvIGJyZWFrIChiZSBjYXJlZnVsIG5vdFxuICogdG8gdHJ5IHRvIHBvcHVsYXRlIGEgcm91dGVyLW91dGxldCB5b3UganVzdCByZXBsYWNlZCkuIEluIHRlcm1zIG9mIHJlYWwgdXNlIGNhc2VzLCBJIHdvdWxkIHByZWZlciBzaW1wbGUgcm91dGVzXG4gKiBhbmQgZG8gdGhlIHdvcmsgaW4gY29tcG9uZW50cy5cbiAqXG4gKiBCdXQgdGhpcyBpcyBoZXJlLCBpZiB5b3Ugd2FudCB0byB1c2UgaXQuXG4gKlxuICogVGhpcyBjbGFzcyBjbGVhcnMgdGhlIHJvdXRlIGNvbnRhaW5lciwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gYmUgYSBzdGF0aWMgY29udGFpbmVyIGluIHRoZSB3cmFwcGVyIEhUTUwgcGFnZSwgb3IgdGhlIGJvZHkuXG4gKiBXaGVuIHlvdSBnaXZlIGl0IHRoZSByZWxldmFudCByb3V0ZSwgaXQgZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIG9yIHJldHVybnMgdGhlIHZpZXcvSFRNTCBlbGVtZW50IHlvdSBkZWZpbmVkIGZvciB0aGUgcm91dGUsXG4gKiBhbmQgc3RpY2tzIGl0IGluc2lkZSB0aGUgY29udGFpbmVyLiBUaGVuIGl0IHNlYXJjaGVzIGZvciBjaGlsZCByb3V0ZXMgdG8gcHV0IGludG8gY2hpbGQgcm91dGUgY29udGFpbmVycywgZXRjLFxuICogdW50aWwgaXQgcnVucyBvdXQgb2YgY2hpbGRyZW4uXG4gKi9cbmNsYXNzIEFkdmFuY2VkUGFnZVJvdXRlciB7XG4gICAgc3RhdGljIGdldCBtYXRjaGVkUm91dGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaGVkUm91dGUgfHwgeyByb3V0ZTogJycsIHBhcmFtczogbmV3IE1hcCgpIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgcGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaGVkUm91dGUucGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnlNYXhMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5TWF4TGVuZ3RoO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IGhpc3RvcnlNYXhMZW5ndGgodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hpc3RvcnkubGVuZ3RoID4gdmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkubGVuZ3RoID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGlzdG9yeU1heExlbmd0aCA9IHZhbHVlO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGhpc3RvcnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IG5vdEZvdW5kKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX25vdEZvdW5kID0gdmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBjb25maWd1cmUocm91dGVzKSB7XG4gICAgICAgIHRoaXMuX3JvdXRlcyA9IHJvdXRlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHVwIGEgdG9wLWxldmVsIHJvdXRlLCB3aGljaCBpcyBleHBlY3RlZCB0byByb3V0ZSB0byB0aGUgbWFpbiBhcHAgY29udGFpbmVyLiBUaGlzIGlzIGV4cGVjdGVkIHRvIGNvbnRhaW5cbiAgICAgKiBhIGNoaWxkLWNvbnRhaW5lciBlbGVtZW50LCB3aGljaCBjb250YWlucyBsb3dlciBsZXZlbCByb3V0ZXMgdGhhdCBhcmUgc3RvcmVkIGFzIGNoaWxkcmVuLCBhZGRlZCB1c2luZyB0aGUgYWRkUm91dGUoKVxuICAgICAqIG1ldGhvZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQXBwUm91dGUocGF5bG9hZCwgcm91dGUgPSAnKicsIHVybFJvdXRpbmdFbmFibGVkID0gdHJ1ZSkge1xuICAgICAgICBpZiAodXJsUm91dGluZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGFsbG93cyBnb2luZyB0byBhIG5ldyBwYWdlIGJ5IGNoYW5naW5nIHRoZSBVUkwgaW5zdGVhZCBvZiBoYXZpbmcgdG8gaXNzdWUgcm91dGUoKSBjb21tYW5kcy5cbiAgICAgICAgICAgIHRoaXMudHVybk9uVXJsUm91dGluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQocGF5bG9hZCkgfHwgdHlwZW9mIHBheWxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkUm91dGUoe1xuICAgICAgICAgICAgICAgIHJvdXRlOiByb3V0ZSxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgIHJvdXRlQ29udGFpbmVyOiAncGFnZS1yb3V0ZXInLFxuICAgICAgICAgICAgICAgIHN0YXRpY1JvdXRlckNvbnRhaW5lcjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFJvdXRlKHtcbiAgICAgICAgICAgICAgICByb3V0ZTogcm91dGUsXG4gICAgICAgICAgICAgICAgcGF5bG9hZDogKCkgPT4gcGF5bG9hZCxcbiAgICAgICAgICAgICAgICByb3V0ZUNvbnRhaW5lcjogJ3BhZ2Utcm91dGVyJyxcbiAgICAgICAgICAgICAgICBzdGF0aWNSb3V0ZXJDb250YWluZXI6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBhZGRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBpZiAodGhpcy5fcm91dGVzLmZpbmQocSA9PiBxLnJvdXRlID09PSByb3V0ZS5yb3V0ZSAmJlxuICAgICAgICAgICAgKHEucm91dGVDb250YWluZXIgfHwgJ2NoaWxkLWNvbnRhaW5lcicpID09PSAocm91dGUucm91dGVDb250YWluZXIgfHwgJ2NoaWxkLWNvbnRhaW5lcicpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGUgYW5kIGNvbnRhaW5lciBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcm91dGVzLnB1c2gocm91dGUpO1xuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlUm91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb3V0ZXMuZmluZChxID0+IHEucm91dGUgPT09IHJvdXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm91dGUgbm90IGZvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmluZyBpdGVtcyBpcyBzdWNoIGEgcGFpbi5cbiAgICAgICAgY29uc3Qgcm91dGVzID0gdGhpcy5fcm91dGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHJvdXRlc1tpXS5yb3V0ZSA9PT0gcm91dGUpIHtcbiAgICAgICAgICAgICAgICByb3V0ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyByb3V0ZShyb3V0ZSwgdXBkYXRlVXJsID0gdHJ1ZSkge1xuICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgICAvLyBBbGxvdyBhY3R1YWwgbGlua3MgdmlhIHRoZSBoYXNoLiBIYXNoIGxpbmtzIGRvbid0IGZvcmNlIGEgcGFnZSByZWxvYWQgYW5kIHRoZXkgd29yayB3L28gYSB3ZWIgc2VydmVyLlxuICAgICAgICAgICAgLy8gVG8gYXZvaWQgaGF2aW5nIHRvIGNhbGwgcm91dGUoKSBtYW51YWxseSwgeW91IG11c3QgY2FsbCB0dXJuT25VcmxSb3V0aW5nKCk7XG4gICAgICAgICAgICByb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYSBwcm9ibGVtLCB3aGljaCBpcyB0aGF0IHNldHRpbmcgdGhlIGhhc2ggd2lsbCB0cmlnZ2VyIEFOT1RIRVIgcm91dGUgY2hhaW5nZSB2aWEgdGhlIGhhc2hjaGFuZ2Ugb3BlcmF0aW9uLlxuICAgICAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGhhc2ggY2hhbmdlIGFuZCB0aGVuIHJlc3RvcmluZyBpdCBsYXRlciBkb2VzIG5vdGhpbmcuIEl0J3Mgc3RpbGwgdHJpZ2dlcmVkLlxuICAgICAgICAgICAgLy8gVGhpcyByZXF1aXJlcyBoYWNrd29yay4gU28geW91IHNlZSB3aHkgdGhpcyByb3V0ZXIgaXMgbXkgbGVhc3QgZmF2b3JpdGUgcGFydCBvZiB0aGlzIGZyYW1ld29yay4gSXQncyBhIHBpbGUgb2YgaGFja3M6XG4gICAgICAgICAgICAvLyBJZiB0aGlzIHdhcyB0cmlnZ2VyZWQgYnkgYSBoYXNoIGNoYW5nZSBhbmQgdGhlIHJvdXRlIGlzIHRoZSBzYW1lLCB0aGVuIGRvbid0IGRvIGFueXRoaW5nLlxuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGxhc3Qgcm91dGUgc28gdGhhdCBpdCBkb2Vzbid0IGludGVyZmVyZSB3aXRoIHRoZSBuZXh0IGhhc2ggY2hhbmdlLlxuICAgICAgICAgICAgaWYgKHJvdXRlID09PSB0aGlzLl9sYXN0Um91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZVVybCkge1xuICAgICAgICAgICAgLy8gSWYgYSByb3V0ZSBpcyBzZW50IGluLCB0aGVuIHNldCB0aGUgaGFzaC5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcm91dGU7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCBhIGNvcHkgb2Ygcm91dGVzLCBiZWNhdXNlICgxKSB0aGUgbGlzdCB3aWxsIGJlIG1vZGlmaWVkIGFuZCAoMikgcmVkdWNlIGFjY2Vzc2VzIHRvIHN0YXRpYyBwcm9wZXJ0aWVzLlxuICAgICAgICAvLyBJJ20gbm90IHN1cmUgaWYgYXN5bmMgaGFzaCB1cGRhdGUgZXZlbnRzIHdpbGwgYWxsIGJlIGluIHRoZSBzYW1lIHRocmVhZCwgYnV0IHRoaXMgaXNuJ3QgdGhyZWFkLXNhZmUuXG4gICAgICAgIGNvbnN0IHJvdXRlQ29weSA9IHRoaXMuX3JvdXRlcy5zbGljZSgwKS5tYXAobSA9PiAoeyByb3V0ZTogbSB9KSk7XG4gICAgICAgIC8vIEZpbmQgbWF0Y2hpbmcgcm91dGVzLiBUeXBpY2FsbHkgdGhlcmUgd2lsbCBiZSAwIHRvIDEgYnV0IHRoZSByb3V0ZXIgYWxsb3dzIG11bHRpcGxlcywgb25lIHBlciBjb250YWluZXIuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGZvciAoY29uc3QgciBvZiByb3V0ZUNvcHkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdCA9IHRoaXMuX3NlYXJjaFJvdXRlcyhyb3V0ZSwgci5yb3V0ZSwgcm91dGVDb3B5KTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChzZWFyY2hSZXN1bHQpO1xuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJvdXRlICR7cm91dGV9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgcGFyYW1ldGVycyBhcmUgZm91bmQgaW4gbXVsdGlwbGUgcm91dGVzLCB0aGUgcGFyYW1zIGFyZSBtZXJnZWQsIGJ1dCBPTkxZIFRIRSBGSVJTVCB2YWx1ZSBmb3IgYW55IHBhcmFtIGlzIGtlcHRcbiAgICAgICAgLy8gUGFyYW1zIHdpbGwgYmUgc3RvcmVkIGluIGEgZ2xvYmFsIGNvbGxlY3Rpb24uIEknbSBub3QgZ29pbmcgdG8gc3BsaXQgdGhlbSB1cCBhbmQgbWFrZSB0aGUgcHJvZ3JhbW1lciBodW50IGZvciB0aGVtLlxuICAgICAgICBjb25zdCBtZXJnZWQgPSBuZXcgTWFwKCk7XG4gICAgICAgIGZvciAoY29uc3QgcCBvZiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgcC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1lcmdlZC5oYXMoZW50cnlbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlZC5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogU3RhcnQgd3JpdGluZyBkYXRhICovXG4gICAgICAgIHRoaXMuX21hdGNoZWRSb3V0ZSA9IHsgcm91dGU6IHJvdXRlLCBwYXJhbXM6IG1lcmdlZCB9O1xuICAgICAgICAvLyBBZGQgcm91dGUgdG8gaGlzdG9yeSBpZiBpdCdzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cyBsYXRlc3QgaGlzdG9yeVxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDFdICE9PSByb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKHJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IHRoaXMuaGlzdG9yeU1heExlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJjQ2xvbmUgPSB0aGlzLl9yb3V0ZUNvbnRhaW5lcnMuc2xpY2UoMCk7XG4gICAgICAgIC8vIEFueSBjb250YWluZXJzIGZyb20gdGhlIHByZXZpb3VzIGl0ZXJhdGlvbiB0aGF0IGFyZSBub3QgbWF0Y2hlZCBpbiB0aGlzIG9uZSBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAgICAvLyBPbmx5IGtlZXAgb25lcyB3aGVyZSB0aGUgc3RhdGljUm91dGVyQ29udGFpbmVyIGZsYWcgaXMgc2V0XG4gICAgICAgIGZvciAoY29uc3QgcHJldiBvZiByY0Nsb25lXG4gICAgICAgICAgICAuZmlsdGVyKHJjID0+ICFtYXRjaGVzLmZpbmQobSA9PiBtLnJvdXRlID09PSByYy5yb3V0ZSkgfHwgIXJjLnJvdXRlLnN0YXRpY1JvdXRlckNvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIGlmIChwcmV2LmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHByZXYuY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSByY0Nsb25lLmZpbmRJbmRleChmID0+IGYgPT09IHByZXYpO1xuICAgICAgICAgICAgcmNDbG9uZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCByb3V0ZSBjb250YWluZXJzIHRoYXQgYXJlbid0IHN0aWxsIHRoZXJlIGZyb20gdGhlIGxhc3QgaXRlcmF0aW9uXG4gICAgICAgIHJjQ2xvbmUucHVzaCguLi5tYXRjaGVzXG4gICAgICAgICAgICAuZmlsdGVyKG0gPT4gIXJjQ2xvbmUuZmluZChyYyA9PiByYy5yb3V0ZSA9PT0gbS5yb3V0ZSkpKTtcbiAgICAgICAgLy8gVGhlIGNvbnRhaW5lcnMgbmVlZCB0byBiZSBpbiBvcmRlciBvZiBtYXRjaGVzLCBidXQgcHJldmlvdXMgaXRlcmF0aW9ucyBhcmUgdGhlcmUgZWFybGllci5cbiAgICAgICAgLy8gVGhpcyBpcyB0b28gd2VpcmQgdG8gd29yayBpbiB0aGUgc29ydCBjb21tYW5kLCBhZmFpa1xuICAgICAgICBjb25zdCBzb3VyY2UgPSByY0Nsb25lLnNsaWNlKDApO1xuICAgICAgICBjb25zdCBzb3J0ZWRUYXJnZXQgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCByID0gc291cmNlLmZpbmQocSA9PiBxLnJvdXRlID09PSBtYXRjaC5yb3V0ZSk7XG4gICAgICAgICAgICBpZiAoIXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvdyBkaWQgYSByb3V0ZSBub3QgZ2V0IGFkZGVkIHRvIHJvdXRlQ29udGFpbmVycz8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvcnRlZFRhcmdldC5wdXNoKHIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JvdXRlQ29udGFpbmVycyA9IHNvcnRlZFRhcmdldDtcbiAgICAgICAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSB7XG4gICAgICAgICAgICBsZXQgcm91dGVHdWFyZHMgPSBbXTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoLnJvdXRlLnJvdXRlR3VhcmRzKSkge1xuICAgICAgICAgICAgICAgIHJvdXRlR3VhcmRzID0gbWF0Y2gucm91dGUucm91dGVHdWFyZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtYXRjaC5yb3V0ZS5yb3V0ZUd1YXJkcykge1xuICAgICAgICAgICAgICAgIHJvdXRlR3VhcmRzLnB1c2gobWF0Y2gucm91dGUucm91dGVHdWFyZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCByZyBvZiByb3V0ZUd1YXJkcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSByZy5jaGVja1ZhbGlkKG1hdGNoLnJvdXRlKTtcbiAgICAgICAgICAgICAgICBpZiAodGVzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdSb3V0ZSBwZXJtaXNzaW9uIGRlbmllZCcpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJSb3V0ZShtYXRjaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGJhY2soKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzbid0IGFueSBoaXN0b3J5IHRvIGdvIGJhY2sgdG8sIGRvbid0IGdvIGJhY2suXG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpc3RvcnkucG9wKCk7IC8vIEN1cnJlbnQgcm91dGUgc2l0cyBhdCB0aGUgdG9wIG9mIHRoZSBzdGFja1xuICAgICAgICBjb25zdCByb3V0ZSA9IHRoaXMuX2hpc3RvcnkucG9wKCk7IC8vIHByZXZpb3VzIHJvdXRlXG4gICAgICAgIGlmIChyb3V0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlKHJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgdHVybk9uVXJsUm91dGluZygpIHtcbiAgICAgICAgdGhpcy5faGFzaENoYW5nZSA9IChldnQpID0+IHsgdGhpcy5yb3V0ZSgpOyB9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX2hhc2hDaGFuZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgX3NlYXJjaFJvdXRlcyh1cmwsIHJvdXRlLCByb3V0ZXNUb1NlYXJjaCkge1xuICAgICAgICBsZXQgc2VhcmNoID0gW107XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvdXRlLnJvdXRlKSkge1xuICAgICAgICAgICAgc2VhcmNoID0gcm91dGUucm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWFyY2ggPSBbcm91dGUucm91dGVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNlYXJjaCB0aGUgcm91dGUgc3RyaW5ncyBhbmQgaWYgeW91IGZpbmQgb25lLCByZXR1cm4gdGhlIG1hdGNoLlxuICAgICAgICAvLyBOb3RlIHRoYXQgaWYgeW91IGhhdmUgbXVsdGlwbGUgcm91dGVzIGluIHRoZSBhcnJheSwgd2l0aCBkaWZmZXJlbnQgcGFyYW1zLCB0aGUgcmVzdWx0cyB3aWxsIGJlIG9ubHkgdGhlIGZpcnN0LlxuICAgICAgICAvLyBTZXJpb3VzbHksIGRvbid0IGRvIHRoYXQuIEF0IGxlYXN0IG9uZSBvZiB0aG9zZSByb3V0ZXMgaXMgZ2liYmVyaXNoLlxuICAgICAgICBmb3IgKGNvbnN0IHNjaCBvZiBzZWFyY2gpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gdGhpcy5fdGVzdFJvdXRlKHNjaCwgdXJsIHx8ICcnKTtcbiAgICAgICAgICAgIGlmIChtYXRjaFJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByb3V0ZSBoYXMgY2hpbGRyZW4sIHRoZW4gYWRkIHRoZW0gdG8gdGhlIGVuZCBvZiB0aGUgbWF0Y2ggbGlzdCB0byBiZSB0ZXN0ZWRcbiAgICAgICAgICAgICAgICAvLyBUaGlzIHdvcmtzIGJlY2F1c2UgSlMgaXMgcGVyZmVjdGx5IE9LIHdpdGggbW9kaWZ5aW5nIGFuIGFycmF5IHRoYXQgeW91IGFyZSBpdGVyYXRpbmcsIHVubGlrZSBDI1xuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHJvdXRlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXNUb1NlYXJjaC5wdXNoKHsgcm91dGU6IGNoaWxkLCBwYXJlbnQ6IHJvdXRlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaFJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN0YXRpYyBfdGVzdFJvdXRlKHJvdXRlU3RyaW5nLCB1cmxTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAoIXJvdXRlU3RyaW5nIHx8ICF1cmxTdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChyb3V0ZVN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByb3V0ZVN0cmluZyA9IHJvdXRlU3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsU3RyaW5nLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHVybFN0cmluZyA9IHVybFN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGVBcnJheSA9IHJvdXRlU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIGNvbnN0IHVybEFycmF5ID0gdXJsU3RyaW5nLnNwbGl0KCcvJyk7XG4gICAgICAgIC8vIElmIHJvdXRlIGVuZHMgaW4gKiwgZG9uJ3QgY2hlY2sgYW55dGhpbmcgZnVydGhlciB0aGFuIHRoYXQgaW4gdGhlIFVSTFxuICAgICAgICBpZiAocm91dGVBcnJheVtyb3V0ZUFycmF5Lmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICAgICAgICAgIHJvdXRlQXJyYXkubGVuZ3RoLS07XG4gICAgICAgICAgICBpZiAocm91dGVBcnJheS5sZW5ndGggPD0gdXJsQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdXJsQXJyYXkubGVuZ3RoID0gcm91dGVBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2FtZSBudW1iZXIgb2YgLyBjaGFyYWN0ZXJzIHJlcXVpcmVkLlxuICAgICAgICBpZiAocm91dGVBcnJheS5sZW5ndGggIT09IHVybEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgW3JvdXRlU2VnbWVudCwgdXJsU2VnbWVudF0gb2YgQXJyYXlVdGlsaXRpZXNfMS56aXAocm91dGVBcnJheSwgdXJsQXJyYXkpKSB7XG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzIGFyZSBhbGxvd2VkLiBPcHRpb25hbCBwYXJhbWV0ZXJzIGFyZSBub3QuXG4gICAgICAgICAgICAvLyBUaGUgcmVhc29uIGZvciBubyBvcHRpb25hbCBwYXJhbWV0ZXJzIGlzIHRoYXQgZmluZGluZyBhIG1hdGNoIGJldHdlZW4gL2EvOj9wYXJhbS9iIGFuZCAvYS9iIGlzIHRvbyBjb21wbGV4LlxuICAgICAgICAgICAgLy8gSXMgJ2InIGEgcGFyYW0gdmFsdWUgb3IgcGFydCBvZiB0aGUgcm91dGUuIEJhc2ljYWxseSwgb3B0aW9uYWwgcGFyYW1ldGVycyBvbmx5IHdvcmsgYXQgdGhlIHJvdXRlIGVuZC5cbiAgICAgICAgICAgIC8vIEkgbm90aWNlZCB0aGF0IEFTUC5ORVQgd29ya3MgdGhhdCB3YXksIGFuZCBJIGZvdW5kIGl0IGNvbmZ1c2luZyB0aGF0IG9wdGlvbmFsIHBhcmFtZXRlcnMgb25seSB3b3JrIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAvLyBKdXN0IGNyZWF0ZSBhIG5ldyByb3V0ZSB3aXRoIHRoZSBvcHRpb25hbCBwYXJhbSBsZWZ0IG91dC5cbiAgICAgICAgICAgIGlmIChyb3V0ZVNlZ21lbnQuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXModXJsU2VnbWVudC5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSb3V0ZSAke3JvdXRlU3RyaW5nfSBjb250YWlucyBkdXBsaWNhdGVzIG9mIHRoZSBzYW1lIHBhcmFtZXRlci5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyYW1zLnNldChyb3V0ZVNlZ21lbnQuc2xpY2UoMSksIHVybFNlZ21lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm91dGVTZWdtZW50ICE9PSAnKicgJiYgcm91dGVTZWdtZW50ICE9PSB1cmxTZWdtZW50LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgc3RhdGljIF9yZW5kZXJSb3V0ZSh7IHJvdXRlLCBwYXJlbnQgfSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9wcmVwYXJlUm91dGVyQ29udGFpbmVyKHJvdXRlLCBwYXJlbnQpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2aWV3O1xuICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKHJvdXRlLnBheWxvYWQpKSB7XG4gICAgICAgICAgICB2aWV3ID0gbmV3IHJvdXRlLnBheWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyb3V0ZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICB2aWV3ID0gcm91dGUucGF5bG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGEgdmlldyB3YXMgcmV0dXJuZWRcbiAgICAgICAgaWYgKHZpZXcgJiYgdmlld1R5cGVHdWFyZCh2aWV3KSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcuY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmlldykge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZXcpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHZpZXdUeXBlR3VhcmQodGVzdCkge1xuICAgICAgICAgICAgaWYgKFwiY29udGVudFwiIGluIHRlc3QgJiYgdGVzdC5jb250ZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3JlbmRlck5vdEZvdW5kKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudCgnbm90LWZvdW5kJywgeyBpZDogJ25vdC1mb3VuZCcgfSk7XG4gICAgICAgIERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQoZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKENyZWF0ZUVsZW1lbnRfMS5jcmVhdGVFbGVtZW50KEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIHsgaW5uZXJIVE1MOiB0aGlzLl9ub3RGb3VuZCB8fCBcIlF1b3RoIHRoZSBSYXZlbiwgNDA0XCIgfSkpO1xuICAgIH1cbiAgICBzdGF0aWMgX3ByZXBhcmVSb3V0ZXJDb250YWluZXIocm91dGUsIHBhcmVudFJvdXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5fbWF0Y2hlZFJvdXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2dyYW1taW5nRXJyb3I6IF9wcmVwYXJlUm91dGVyQ29udGFpbmVyIGNhbGxlZCBvdXQgb2Ygb3JkZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTG9vayBmb3IgdGhlIHJvdXRlIGNvbnRhaW5lciBmb3IgdGhlIHJvdXRlLiBJZiBpdCBleGlzdHMsIGV4aXQgZG9pbmcgbm90aGluZy4gV2UnbGwga2VlcCBpdC5cbiAgICAgICAgY29uc3Qgcm91dGVDb250YWluZXIgPSB0aGlzLl9yb3V0ZUNvbnRhaW5lcnMuZmluZChmID0+IGYucm91dGUgPT09IHJvdXRlKTtcbiAgICAgICAgaWYgKCFyb3V0ZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvZ3JhbW1pbmdFcnJvcjogRm9yZ290IHRvIGFkZCByb3V0ZXMgdG8gcm91dGUgY29udGFpbmVycy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcmVudDtcbiAgICAgICAgLy8gU2VlIGlmIHRoaXMgcm91dGUgaGFzIGEgcGFyZW50IHRoYXQgaXMgb24gdGhlIHBhZ2VcbiAgICAgICAgcGFyZW50ID0gRWx2aXNfMS5lXyh0aGlzLl9yb3V0ZUNvbnRhaW5lcnMuZmluZChxID0+IHEucm91dGUgPT09IHBhcmVudFJvdXRlKSkuY29udGFpbmVyO1xuICAgICAgICBpZiAocGFyZW50ICYmICFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgcm91dGUgaGFzIGEgY29udGFpbmVyLCB0aGF0IGNvbnRhaW5lciBleGlzdHMgaW4gdGhlIGRvbSwgYW5kIHRoZSBzdGF0aWNSb3V0ZXJDb250YWluZXIgc2V0dGluZyBpcyB0cnVlLCBleGl0XG4gICAgICAgIGlmIChyb3V0ZS5zdGF0aWNSb3V0ZXJDb250YWluZXIgJiYgcm91dGVDb250YWluZXIuY29udGFpbmVyICYmIChwYXJlbnQgfHwgZG9jdW1lbnQuYm9keSkuY29udGFpbnMocm91dGVDb250YWluZXIuY29udGFpbmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcklkID0gRWx2aXNfMS5lXyhyb3V0ZSkucm91dGVDb250YWluZXIgfHwgJ2NoaWxkLWNvbnRhaW5lcic7XG4gICAgICAgIC8vIElmIHRoZSBwYXJlbnQgY29udGFpbmVyIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIGRvbSwgYWRkIHRvIHRoZSBib2R5LlxuICAgICAgICBpZiAoIXBhcmVudCB8fCAhZG9jdW1lbnQuYm9keS5jb250YWlucyhwYXJlbnQpKSB7XG4gICAgICAgICAgICAvLyBJIHdvdWxkIHRoaW5rIHRoZXJlJ3MgYWx3YXlzIGEgYm9keSBlbGVtZW50LCBidXQgdHlwZXNjcmlwdCBzZWVtcyB0byB0aGluayBpdCBjb3VsZCBiZSB1bmRlZmluZWRcbiAgICAgICAgICAgIC8vIFRoaXMgZGlkbid0IGFjdHVhbGx5IGZpeCB0aGUgVFMgZXJyb3IsIHRob3VnaC5cbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5fcm91dGVDb250YWluZXJzLmZpbmRJbmRleChxID0+IHEucm91dGUgPT09IHJvdXRlKTtcbiAgICAgICAgaWYgKHRoaXMuX3JvdXRlQ29udGFpbmVyc1xuICAgICAgICAgICAgLnNsaWNlKDAsIGN1cnJlbnRJbmRleCkgLy8gT25seSBjaGVjayBlYXJsaWVyIGNvbnRhaW5lcnNcbiAgICAgICAgICAgIC5maW5kKHEgPT4gISFxLmNvbnRhaW5lclxuICAgICAgICAgICAgJiYgcS5jb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBjb250YWluZXJJZC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAmJiAhIXBhcmVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcklkKSkpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUm91dGU6IFske3JvdXRlLnJvdXRlfV0uIENvbnRhaW5lciBbJHtjb250YWluZXJJZH1dIGFkZGVkIHRvIERPTSBieSBhbm90aGVyIHJvdXRlLiBTa2lwcGluZy5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdSb3V0ZXIgPSBDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChjb250YWluZXJJZCk7IC8qIHsgaWQ6IGNvbnRhaW5lcklkIH0gKi9cbiAgICAgICAgY29uc3Qgb2xkUm91dGVyID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVySWQpO1xuICAgICAgICBpZiAob2xkUm91dGVyKSB7XG4gICAgICAgICAgICAob2xkUm91dGVyLnBhcmVudEVsZW1lbnQgfHwgcGFyZW50KS5yZXBsYWNlQ2hpbGQobmV3Um91dGVyLCBvbGRSb3V0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld1JvdXRlcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSByb3V0ZSBjb250YWluZXIgcmVjb3JkIHdpdGggdGhlIHJvdXRpbmcgY29udGFpbmVyIHdlIGNyZWF0ZWQuXG4gICAgICAgIHJvdXRlQ29udGFpbmVyLmNvbnRhaW5lciA9IG5ld1JvdXRlcjtcbiAgICAgICAgcmV0dXJuIG5ld1JvdXRlcjtcbiAgICB9XG59XG5BZHZhbmNlZFBhZ2VSb3V0ZXIuX3JvdXRlcyA9IFtdO1xuQWR2YW5jZWRQYWdlUm91dGVyLl9oaXN0b3J5ID0gW107XG5BZHZhbmNlZFBhZ2VSb3V0ZXIuX2hpc3RvcnlNYXhMZW5ndGggPSA1MDtcbkFkdmFuY2VkUGFnZVJvdXRlci5fcm91dGVDb250YWluZXJzID0gW107XG5leHBvcnRzLkFkdmFuY2VkUGFnZVJvdXRlciA9IEFkdmFuY2VkUGFnZVJvdXRlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ3JlYXRlRWxlbWVudF8xID0gcmVxdWlyZShcIi4uL0h0bWwvQ3JlYXRlRWxlbWVudFwiKTtcbmNvbnN0IERlbGV0ZU5vZGVDb250ZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9EZWxldGVOb2RlQ29udGVudFwiKTtcbmNvbnN0IEVsZW1lbnRUeXBlXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9FbGVtZW50VHlwZVwiKTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgQ29uc3RydWN0YWJsZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Db25zdHJ1Y3RhYmxlXCIpO1xuY29uc3QgS2V5d29yZEFyZ3VtZW50c18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG4vKipcbiAqIElmIHlvdSBjbGljayBhIGxpbmsgaW4gYSByZWFsIHdlYiBzaXRlLCB0aGUgYnJvd3NlciBhc2tzIHRoZSBzZXJ2ZXIgZm9yIGEgcGFnZSBhbmQgaXQgcm91dGVzIHlvdSB0byB0aGUgcmVsZXZhbnRcbiAqIHBhZ2UuIEJ1dCBpZiB5b3UgaGF2ZSBhIHNpbmdsZSBwYWdlIGFwcCBydW5uaW5nIG9uIGEgZmlsZSwgd2l0aCBubyB3ZWIgc2VydmVyLCBsaWtlIHRoZSBvbmUgdGhpcyBmcmFtZXdvcmtcbiAqIHdhcyBidWlsdCBmb3IsIHlvdSBuZWVkIHNvbWV0aGluZyB0byBzaW11bGF0ZSB0aGF0LlxuICpcbiAqIFRoaXMgY2xhc3MgY2xlYXJzIHRoZSByb3V0ZSBjb250YWluZXIsIHdoaWNoIGlzIGV4cGVjdGVkIHRvIGJlIGEgc3RhdGljIGNvbnRhaW5lciBpbiB0aGUgd3JhcHBlciBIVE1MIHBhZ2UsIG9yIHRoZSBib2R5LlxuICogV2hlbiB5b3UgZ2l2ZSBpdCB0aGUgcmVsZXZhbnQgcm91dGUsIGl0IGV4ZWN1dGVzIHRoZSBjYWxsYmFjayBvciByZXR1cm5zIHRoZSB2aWV3L0hUTUwgZWxlbWVudCB5b3UgZGVmaW5lZCBmb3IgdGhlIHJvdXRlLFxuICogYW5kIHN0aWNrcyBpdCBpbnNpZGUgdGhlIGNvbnRhaW5lci4gVGhlIGVsZW1lbnQgcmV0dXJuZWQgY2FuIGJlIHdyYXBwZWQgaW4gYSBsYXlvdXQgdmlldywgbGlrZSBpbiBBU1AuTmV0LlxuICpcbiAqIFRoaXMgaXMgYSBzaW1wbGUgdmVyc2lvbiwgd2l0aG91dCB0aGUgcmVjdXJzaXZlIHJvdXRlcyBmb3VuZCBpbiB0aGUgYWR2YW5jZWQgcm91dGVyLiBJdCB3YXMgYmFzZWQgbW9yZSBvbiBBU1AuTmV0IG9yIG5vZGUuanNcbiAqIHJvdXRpbmcsIHdoZXJlIHlvdSBoYXZlIGEgZmxhdCBzZXQgb2Ygcm91dGVzIGFuZCBvbmNlIHlvdSBmaW5kIGEgcm91dGUsIHlvdSdyZSBkb25lLlxuICovXG5jbGFzcyBQYWdlUm91dGVyIHtcbiAgICBzdGF0aWMgZ2V0IGFsbFJvdXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlcztcbiAgICB9XG4gICAgc3RhdGljIGdldCBtYXRjaGVkUm91dGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaGVkUm91dGUgfHwgeyByb3V0ZTogJycsIHBhcmFtczogbmV3IE1hcCgpLCBjb25maWc6IHsgcm91dGU6ICcnIH0gfTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBwYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoZWRSb3V0ZS5wYXJhbXM7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgaGlzdG9yeU1heExlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpc3RvcnlNYXhMZW5ndGg7XG4gICAgfVxuICAgIHN0YXRpYyBzZXQgaGlzdG9yeU1heExlbmd0aCh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5faGlzdG9yeS5sZW5ndGggPiB2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5sZW5ndGggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oaXN0b3J5TWF4TGVuZ3RoID0gdmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgaGlzdG9yeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XG4gICAgfVxuICAgIHN0YXRpYyBzZXQgbm90Rm91bmQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbm90Rm91bmQgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBtdXN0IGJlIGNhbGxlZCBmaXJzdCBiZWZvcmUgdXNpbmcgaXQsIGJlY2F1c2UgSlMgZG9lc24ndCBoYXZlIHN0YXRpYyBjb25zdHJ1Y3RvcnMgbGlrZSBDIy4gSXQgc2V0cyB1cCB0aGVcbiAgICAgKiByb3V0ZSBjb250YWluZXIsIGN1c3RvbSBlbGVtZW50cywgYW5kIGFsc28gYWxsb3dzIG9uZS1zdGVwIGNvbmZpZ3VyYXRpb24gb2Ygc2V2ZXJhbCBvdGhlciBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQWNjZXB0cyBLZXl3b3JkIEFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBzdGF0aWMgY29uZmlndXJlKHJvdXRlcyA9IFtdLCBkZWZhdWx0TGF5b3V0LCBkZWZhdWx0U3RhdGljTGF5b3V0LCBub3RGb3VuZCwgZGVmYXVsdFJvdXRlLCB1cmxSb3V0aW5nRW5hYmxlZCA9IHRydWUpIHtcbiAgICAgICAgKHsgcm91dGVzLCBkZWZhdWx0TGF5b3V0LCBkZWZhdWx0U3RhdGljTGF5b3V0LCBub3RGb3VuZCwgZGVmYXVsdFJvdXRlLCB1cmxSb3V0aW5nRW5hYmxlZCA9IHRydWUgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyByb3V0ZXMsIGRlZmF1bHRMYXlvdXQsIGRlZmF1bHRTdGF0aWNMYXlvdXQsIG5vdEZvdW5kLCBkZWZhdWx0Um91dGUsIHVybFJvdXRpbmdFbmFibGVkIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgICAgIHRoaXMuX2NvbmZpZ3VyZWQgPSB0cnVlO1xuICAgICAgICBpZiAobm90Rm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuX25vdEZvdW5kID0gbm90Rm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBydGUgb2Ygcm91dGVzKSB7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdExheW91dCkge1xuICAgICAgICAgICAgICAgIHJ0ZS5sYXlvdXQgPSBydGUubGF5b3V0IHx8IGRlZmF1bHRMYXlvdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKGRlZmF1bHRTdGF0aWNMYXlvdXQpICYmIE5vbmVUeXBlXzEuaXNOb25lKHJ0ZS5zdGF0aWNMYXlvdXQpKSB7XG4gICAgICAgICAgICAgICAgcnRlLnN0YXRpY0xheW91dCA9IGRlZmF1bHRTdGF0aWNMYXlvdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZFJvdXRlKHJ0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybFJvdXRpbmdFbmFibGVkKSB7XG4gICAgICAgICAgICAvLyBCeSBkZWZhdWx0LCBhbGxvd3MgZ29pbmcgdG8gYSBuZXcgcGFnZSBieSBjaGFuZ2luZyB0aGUgVVJMIGluc3RlYWQgb2YgaGF2aW5nIHRvIGlzc3VlIHJvdXRlKCkgY29tbWFuZHMuXG4gICAgICAgICAgICB0aGlzLnR1cm5PblVybFJvdXRpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdXRlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncGFnZS1yb3V0ZXInKSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdwYWdlLXJvdXRlcicpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgncGFnZS1yb3V0ZXInLCBEaXZQYWdlLCB7IGV4dGVuZHM6ICdkaXYnIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdsYXlvdXQtYm9keScpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbGF5b3V0LWJvZHknLCBEaXZMYXlvdXQsIHsgZXh0ZW5kczogJ2RpdicgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ25vdC1mb3VuZCcpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbm90LWZvdW5kJywgRGl2Tm90Rm91bmQsIHsgZXh0ZW5kczogJ2RpdicgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gY3VzdG9tRWxlbWVudHMgaXNuJ3Qgb2ZmaWNpYWxseSBwYXJ0IG9mIGFuIEVTIHZlcnNpb24geWV0IHNvIHdvbid0IHdvcmsgZXZlbiBpbiBzb21lIHJlY2VudC1pc2ggYnJvd3NlcnNcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXVsdFJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRSb3V0ZShkZWZhdWx0Um91dGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE5vdGU6IHRoZXJlIGlzIG5vIHJlbW92ZVJvdXRlLiBUaGVyZSBjb3VsZCBiZSwgYnV0IGl0J3MgbmV2ZXIgbmVlZGVkLlxuICAgIHN0YXRpYyBhZGRSb3V0ZShyb3V0ZSkge1xuICAgICAgICBsZXQgcm91dGVzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyb3V0ZS5yb3V0ZSkpIHtcbiAgICAgICAgICAgIHJvdXRlcyA9IHJvdXRlLnJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcm91dGVzID0gW3JvdXRlLnJvdXRlXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJ0ZSBvZiByb3V0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb3V0ZXMuZmluZChxID0+IHEucm91dGUgPT09IHJ0ZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSb3V0ZSBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0bXAgPSBPYmplY3QuYXNzaWduKHt9LCByb3V0ZSk7XG4gICAgICAgICAgICB0bXAucm91dGUgPSBydGU7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMucHVzaCh0bXApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIGxpbmtlZCB0byBhIHBhcnRpY3VsYXIgcGFnZSAob24gdGhlIGhhc2gpLCBnbyB0byBpdC4gRWxzZSwgZ28gdG8gdGhlIHJvdXRlIHNwZWNpZmllZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgZGVmYXVsdFJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgICAgICAgUGFnZVJvdXRlci5yb3V0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUGFnZVJvdXRlci5yb3V0ZShyb3V0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHJvdXRlKHJvdXRlLCB1cGRhdGVVcmwgPSB0cnVlKSB7XG4gICAgICAgIGlmICghdGhpcy5fY29uZmlndXJlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYWdlUm91dGVyIG5vdCBjb25maWd1cmVkLiBDYWxsIGNvbmZpZ3VyZSgpIGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgICAgIC8vIEFsbG93IGFjdHVhbCBsaW5rcyB2aWEgdGhlIGhhc2guIEhhc2ggbGlua3MgZG9uJ3QgZm9yY2UgYSBwYWdlIHJlbG9hZCBhbmQgdGhleSB3b3JrIHcvbyBhIHdlYiBzZXJ2ZXIuXG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBoYXZpbmcgdG8gY2FsbCByb3V0ZSgpIG1hbnVhbGx5LCB5b3UgbXVzdCBjYWxsIHR1cm5PblVybFJvdXRpbmcoKTtcbiAgICAgICAgICAgIHJvdXRlID0gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG4gICAgICAgICAgICAvLyBUaGVyZSBpcyBhIHByb2JsZW0sIHdoaWNoIGlzIHRoYXQgc2V0dGluZyB0aGUgaGFzaCB3aWxsIHRyaWdnZXIgQU5PVEhFUiByb3V0ZSBjaGFpbmdlIHZpYSB0aGUgaGFzaGNoYW5nZSBvcGVyYXRpb24uXG4gICAgICAgICAgICAvLyBSZW1vdmluZyB0aGUgaGFzaCBjaGFuZ2UgYW5kIHRoZW4gcmVzdG9yaW5nIGl0IGxhdGVyIGRvZXMgbm90aGluZy4gSXQncyBzdGlsbCB0cmlnZ2VyZWQuXG4gICAgICAgICAgICAvLyBUaGlzIHJlcXVpcmVzIGhhY2t3b3JrLiBFdmVuIHRoZSBzaW1wbGUgcm91dGVyIGhhcyBtb3JlIGhhY2tzIHRoYW4gSSBsaWtlLlxuICAgICAgICAgICAgLy8gSWYgdGhpcyB3YXMgdHJpZ2dlcmVkIGJ5IGEgaGFzaCBjaGFuZ2UgYW5kIHRoZSByb3V0ZSBpcyB0aGUgc2FtZSwgdGhlbiBkb24ndCBkbyBhbnl0aGluZy5cbiAgICAgICAgICAgIC8vIENsZWFyIHRoZSBsYXN0IHJvdXRlIHNvIHRoYXQgaXQgZG9lc24ndCBpbnRlcmZlcmUgd2l0aCB0aGUgbmV4dCBoYXNoIGNoYW5nZS5cbiAgICAgICAgICAgIGlmIChyb3V0ZSA9PT0gdGhpcy5fbGFzdFJvdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1cGRhdGVVcmwpIHtcbiAgICAgICAgICAgIC8vIElmIGEgcm91dGUgaXMgc2VudCBpbiwgdGhlbiBzZXQgdGhlIGhhc2guXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHJvdXRlO1xuICAgICAgICAgICAgdGhpcy5fbGFzdFJvdXRlID0gcm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWF0Y2g7XG4gICAgICAgIGxldCBzZWFyY2hSZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBydGUgb2YgdGhpcy5fcm91dGVzKSB7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHQgPSB0aGlzLl90ZXN0Um91dGUocnRlLnJvdXRlLCByb3V0ZSB8fCAnJyk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBydGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSb3V0ZSAke3JvdXRlfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJOb3RGb3VuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZpb3VzUm91dGUgPSAodGhpcy5fbWF0Y2hlZFJvdXRlIHx8IHt9KS5jb25maWc7XG4gICAgICAgIHRoaXMuX21hdGNoZWRSb3V0ZSA9IHsgcm91dGUsIHBhcmFtczogc2VhcmNoUmVzdWx0IHx8IG5ldyBNYXAoKSwgY29uZmlnOiBtYXRjaCB9O1xuICAgICAgICAvLyBBZGQgcm91dGUgdG8gaGlzdG9yeSBpZiBpdCdzIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cyBsYXRlc3QgaGlzdG9yeVxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmhpc3RvcnlbdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDFdICE9PSByb3V0ZSkge1xuICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5wdXNoKHJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IHRoaXMuaGlzdG9yeU1heExlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5faGlzdG9yeS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByb3V0ZUd1YXJkcyA9IFtdO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtYXRjaC5yb3V0ZUd1YXJkcykpIHtcbiAgICAgICAgICAgIHJvdXRlR3VhcmRzID0gbWF0Y2gucm91dGVHdWFyZHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWF0Y2gucm91dGVHdWFyZHMpIHtcbiAgICAgICAgICAgIHJvdXRlR3VhcmRzLnB1c2gobWF0Y2gucm91dGVHdWFyZHMpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgcmcgb2Ygcm91dGVHdWFyZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlc3QgPSByZy5jaGVja1ZhbGlkKG1hdGNoKTtcbiAgICAgICAgICAgIGlmICh0ZXN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdSb3V0ZSBwZXJtaXNzaW9uIGRlbmllZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJSb3V0ZShtYXRjaCwgcHJldmlvdXNSb3V0ZSk7XG4gICAgfVxuICAgIHN0YXRpYyBiYWNrKCkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpc24ndCBhbnkgaGlzdG9yeSB0byBnbyBiYWNrIHRvLCBkb24ndCBnbyBiYWNrLlxuICAgICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9oaXN0b3J5LnBvcCgpOyAvLyBDdXJyZW50IHJvdXRlIHNpdHMgYXQgdGhlIHRvcCBvZiB0aGUgc3RhY2tcbiAgICAgICAgY29uc3Qgcm91dGUgPSB0aGlzLl9oaXN0b3J5LnBvcCgpOyAvLyBwcmV2aW91cyByb3V0ZVxuICAgICAgICBpZiAocm91dGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZShyb3V0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHR1cm5PblVybFJvdXRpbmcoKSB7XG4gICAgICAgIHRoaXMuX2hhc2hDaGFuZ2UgPSAoZXZ0KSA9PiB7IHRoaXMucm91dGUoKTsgfTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLl9oYXNoQ2hhbmdlKTtcbiAgICB9XG4gICAgc3RhdGljIF90ZXN0Um91dGUocm91dGVTdHJpbmcsIHVybFN0cmluZykge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGlmICghcm91dGVTdHJpbmcgfHwgIXVybFN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJvdXRlU3RyaW5nID0gcm91dGVTdHJpbmcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKHJvdXRlU3RyaW5nLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIHJvdXRlU3RyaW5nID0gcm91dGVTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmxTdHJpbmcuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgdXJsU3RyaW5nID0gdXJsU3RyaW5nLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3V0ZUFycmF5ID0gcm91dGVTdHJpbmcuc3BsaXQoJy8nKTtcbiAgICAgICAgY29uc3QgdXJsQXJyYXkgPSB1cmxTdHJpbmcuc3BsaXQoJy8nKTtcbiAgICAgICAgLy8gU2FtZSBudW1iZXIgb2YgLyBjaGFyYWN0ZXJzIHJlcXVpcmVkLlxuICAgICAgICBpZiAocm91dGVBcnJheS5sZW5ndGggIT09IHVybEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgW3JvdXRlU2VnbWVudCwgdXJsU2VnbWVudF0gb2YgQXJyYXlVdGlsaXRpZXNfMS56aXAocm91dGVBcnJheSwgdXJsQXJyYXkpKSB7XG4gICAgICAgICAgICAvLyBQYXJhbWV0ZXJzIGFyZSBhbGxvd2VkLiBPcHRpb25hbCBwYXJhbWV0ZXJzIGFyZSBub3QuXG4gICAgICAgICAgICAvLyBUaGUgcmVhc29uIGZvciBubyBvcHRpb25hbCBwYXJhbWV0ZXJzIGlzIHRoYXQgZmluZGluZyBhIG1hdGNoIGJldHdlZW4gL2EvOj9wYXJhbS9iIGFuZCAvYS9iIGlzIHRvbyBjb21wbGV4LlxuICAgICAgICAgICAgLy8gSXMgJ2InIGEgcGFyYW0gdmFsdWUgb3IgcGFydCBvZiB0aGUgcm91dGUuIEJhc2ljYWxseSwgb3B0aW9uYWwgcGFyYW1ldGVycyBvbmx5IHdvcmsgYXQgdGhlIHJvdXRlIGVuZC5cbiAgICAgICAgICAgIC8vIEkgbm90aWNlZCB0aGF0IEFTUC5ORVQgd29ya3MgdGhhdCB3YXkgYW5kIEkgZm91bmQgaXQgY29uZnVzaW5nIHRoYXQgb3B0aW9uYWwgcGFyYW1ldGVycyBvbmx5IHdvcmsgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgIC8vIEp1c3QgY3JlYXRlIGEgbmV3IHJvdXRlIHdpdGggdGhlIG9wdGlvbmFsIHBhcmFtIGxlZnQgb3V0LlxuICAgICAgICAgICAgaWYgKHJvdXRlU2VnbWVudC5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHJvdXRlU2VnbWVudC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWUuaW5jbHVkZXMoJz0nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSb3V0ZSAke3JvdXRlU3RyaW5nfSBjb250YWlucyBkdXBsaWNhdGVzIG9mIHRoZSBzYW1lIHBhcmFtZXRlci5gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc2V0KG5hbWUsIHVybFNlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBtYXBwZWQgc3RhdGljIHBhcmFtIGNhc2UuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IG5hbWUuc3BsaXQoJz0nKVsxXTtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9IG5hbWUuc3BsaXQoJz0nKVswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gdXJsU2VnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJvdXRlICR7cm91dGVTdHJpbmd9IGNvbnRhaW5zIGR1cGxpY2F0ZXMgb2YgdGhlIHNhbWUgcGFyYW1ldGVyLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQobmFtZSwgdXJsU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm91dGVTZWdtZW50ICE9PSB1cmxTZWdtZW50LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgc3RhdGljIF9yZW5kZXJSb3V0ZShyb3V0ZSwgcHJldmlvdXMpIHtcbiAgICAgICAgLy8gQ2FsbGluZyBQYWdlUm91dGVyLnJvdXRlKCd0aGUgc2FtZSB1cmwnKSB3aWxsIHJlbG9hZCB0aGUgY29udGVudHMgZnJvbSBzY3JhdGNoLlxuICAgICAgICAvLyBBZGp1c3Rpbmcgd2luZG93LmxvY2F0aW9uIHdpbGwgZG8gbm90aGluZyBpZiB0aGUgcm91dGUgaXMgdGhlIHNhbWUuXG4gICAgICAgIC8vIEkgdGhpbmsgdGhpcyBpcyBmaW5lLCBhZnRlciBzdHJ1Z2dsaW5nIGluIGFuZ3VsYXIgdG8gcmVsb2FkIHRoZSBwYWdlIGFuZCBmaW5kaW5nXG4gICAgICAgIC8vIGl0IG11Y2ggaGFyZGVyLlxuICAgICAgICAvLyBOb3RlIGlmIHlvdSBjaGFuZ2UgdGhlIGxvY2F0aW9uIGJhciwgQ2hyb21lIGZvcmNlcyBhIHJlbG9hZCBvZiBQcm9ncmFtLnRzLCBub3RoaW5nIHlvdSBjYW4gZG9cbiAgICAgICAgLy8gYWJvdXQgaXQgYmVjYXVzZSBDaHJvbWUgaXMgdGhlIG9uZSB0aGF0IGRpc2NhcmRlZCB5b3VyIHN0YXRlLlxuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5yb3V0ZUNvbnRhaW5lcjtcbiAgICAgICAgY29uc3Qga2VlcExheW91dCA9IHJvdXRlLmxheW91dCAmJiBwcmV2aW91cyAmJiByb3V0ZS5zdGF0aWNMYXlvdXQgJiYgcm91dGUubGF5b3V0ID09PSBwcmV2aW91cy5sYXlvdXQ7XG4gICAgICAgIGlmICgha2VlcExheW91dCkge1xuICAgICAgICAgICAgLy8gRGVsZXRlIGNvbnRlbnRzIG9mIHBhZ2Utcm91dGVyXG4gICAgICAgICAgICBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtlZXBMYXlvdXQpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xheW91dC1ib2R5Jyk7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignPGxheW91dC1ib2R5PiBlbGVtZW50IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvdXRlLmxheW91dCkge1xuICAgICAgICAgICAgbGV0IGxheW91dFZpZXc7XG4gICAgICAgICAgICBpZiAoQ29uc3RydWN0YWJsZV8xLmNvbnN0cnVjdG9yVHlwZUd1YXJkKHJvdXRlLmxheW91dCkpIHtcbiAgICAgICAgICAgICAgICBsYXlvdXRWaWV3ID0gbmV3IHJvdXRlLmxheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocm91dGUucGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIGxheW91dFZpZXcgPSByb3V0ZS5sYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXlvdXRWaWV3ICYmIHZpZXdUeXBlR3VhcmQobGF5b3V0VmlldykpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGF5b3V0Vmlldy5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxheW91dFZpZXcpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGF5b3V0Vmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYXlvdXQtYm9keScpO1xuICAgICAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJzxsYXlvdXQtYm9keT4gZWxlbWVudCBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoa2VlcExheW91dCkge1xuICAgICAgICAgICAgLy8gRGVsZXRlIGNvbnRlbnRzIG9mIGxheW91dC1ib2R5IChidXQga2VlcCBsYXlvdXQpXG4gICAgICAgICAgICBEZWxldGVOb2RlQ29udGVudF8xLmRlbGV0ZU5vZGVDb250ZW50KGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZpZXc7XG4gICAgICAgIGlmIChDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQocm91dGUucGF5bG9hZCkpIHtcbiAgICAgICAgICAgIHZpZXcgPSBuZXcgcm91dGUucGF5bG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByb3V0ZS5wYXlsb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2aWV3ID0gcm91dGUucGF5bG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvdXRlLnBheWxvYWQpIHtcbiAgICAgICAgICAgIHZpZXcgPSByb3V0ZS5wYXlsb2FkLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldyAmJiB2aWV3VHlwZUd1YXJkKHZpZXcpKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodmlldy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aWV3KSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodmlldyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmlld1R5cGVHdWFyZCh0ZXN0KSB7XG4gICAgICAgICAgICBpZiAoXCJjb250ZW50XCIgaW4gdGVzdCAmJiB0ZXN0LmNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfcmVuZGVyTm90Rm91bmQoKSB7XG4gICAgICAgIERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQodGhpcy5yb3V0ZUNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMucm91dGVDb250YWluZXIuYXBwZW5kQ2hpbGQoQ3JlYXRlRWxlbWVudF8xLmNyZWF0ZUVsZW1lbnQoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MRGl2RWxlbWVudCwgeyBpZDogJ25vdC1mb3VuZCcsIGlubmVySFRNTDogdGhpcy5fbm90Rm91bmQgfHwgXCJRdW90aCB0aGUgUmF2ZW4sIDQwNFwiIH0pKTtcbiAgICB9XG59XG5QYWdlUm91dGVyLnJvdXRlQ29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcblBhZ2VSb3V0ZXIuX2NvbmZpZ3VyZWQgPSBmYWxzZTtcblBhZ2VSb3V0ZXIuX3JvdXRlcyA9IFtdO1xuUGFnZVJvdXRlci5faGlzdG9yeSA9IFtdO1xuUGFnZVJvdXRlci5faGlzdG9yeU1heExlbmd0aCA9IDUwO1xuZXhwb3J0cy5QYWdlUm91dGVyID0gUGFnZVJvdXRlcjtcbi8vIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlXG4vLyBBIGNsYXNzIGlzIHJlcXVpcmVkIGJ1dCB5b3UncmUgbm90IGFsbG93ZWQgdG8gdXNlIHRoZSBleGlzdGluZyBjbGFzcyBiZWNhdXNlIGl0IGNhbid0XG4vLyBiZSBjb25zdHJ1Y3RlZCAoaW52YWxpZCBjb25zdHJ1Y3RvcikuIEFuZCB5b3UgYXJlIE9OTFkgYWxsb3dlZCB0byBleHRlbmQgSFRNTEVsZW1lbnQuXG4vLyBBTkQgdGhleSBtdXN0IGJlIHVuaXF1ZS5cbmNsYXNzIERpdlBhZ2UgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuY2xhc3MgRGl2TGF5b3V0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbmNsYXNzIERpdk5vdEZvdW5kIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBBIGRlZmVycmVkIHByb21pc2UgaXMgYSB3cmFwcGVyIGFyb3VuZCBhIHByb21pc2UgdGhhdCBhbGxvd3MgaXQgdG8gYmUgdHJpZ2dlcmVkIGxhdGVyLiBJbiBwdXJlIEpTLCB0aGlzIGlzIGhhcmRlclxuICogdGhhbiBpdCBuZWVkcyB0byBiZSwgYW5kIGl0IHRha2VzIGEgd2VpcmQgaGFjayB0byBtYWtlIGl0IHdvcmsuIFRoaXMgY2xhc3MgaXMgbGl0dGxlIG1vcmUgdGhhbiBhIHdyYXBwZXIgYXJvdW5kXG4gKiBzYWlkIGhhY2suXG4gKlxuICogT3RoZXJ3aXNlLCB0aGlzIHVzZXMgYSByZWFsIHByb21pc2UgaW50ZXJuYWxseSwgc28gYXNpZGUgZnJvbSB0aGUgd3JhcHBpbmcgb2JqZWN0LCBpdCBoYXMgbm8gc3BlY2lhbCBsb2dpYy4gSSBjaG9zZVxuICogbm90IHRvIHJlLWltcGxlbWVudCB0aGUgUHJvbWlzZSBBUEkgc3luY2hyb25vdXNseSwgc28gaXQgdXNlcyB0aGUgc2FtZSBtaWNyb3Rhc2sgcXVldWUuXG4gKlxuICogVGhlIHdyYXBwaW5nIEFQSSBpcyB0d2Vha2VkIGEgbGl0dGxlIHRvIGF2b2lkIHNvbWUgY29tbW9uIHBpdGZhbGxzIHRoYXQgYXJlIGNhdXNlZCBieSBmbGF3cyBpbiB0aGUgUHJvbWlzZVxuICogZGVzaWduLiBGb3IgZXhhbXBsZSwgaGF2aW5nIG9uZnVsZmlsbGVkIGFuZCBvbnJlamVjdGVkIGluIHRoZSBzYW1lIHN0ZXAgbWVhbnMgdGhhdCBlcnJvcnMgaW4gdGhlIGZ1bGZpbGxlZFxuICogaGFsZiB3aWxsIG5vdCBiZSBjYXVnaHQgYnkgdGhlIGVycm9yIGhhbmRsZXIuICBSYXRoZXIgdGhhbiBzYXkgXCJkb24ndCB1c2UgdGhhdCBpbnB1dFwiIGxpa2UgbW9zdCBpbnN0cnVjdG9ycyxcbiAqIEkganVzdCBnb3QgcmlkIG9mIGl0IChpdCdzIHN0aWxsIGFjY2Vzc2libGUgb24gdGhlIG91dHB1dCBwcm9wZXJ0eSwgaWYgeW91IHdhbnQgdG8gdXNlIGl0IC4uLiBidXQgZG9uJ3QpLlxuICovXG5jbGFzcyBEZWZlcnJlZFByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5IFRTIGRvZXNuJ3Qga25vdyB0aGF0IHRoZSBwcm9wZXJ0aWVzIGFyZSByZXBsYWNlZCBpbiB0aGUgcHJvbWlzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gZnVuY3Rpb24gX2R1bW15KCkgeyB9O1xuICAgICAgICAvKiogVXNlIHRoaXMgdG8gcmVqZWN0IHRoZSBwcm9taXNlIHJpZ2h0IG91dC4gV2hpY2ggaXMgcHJvYmFibHkgdXNlbGVzcyBidXQgeW91IG5ldmVyIGtub3cuICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVqZWN0ID0gZnVuY3Rpb24gX2R1bW15KCkgeyB9O1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSB3ZWlyZCBoYWNrIHRoYXQgaXMgdGhlIGJhc2lzIG9mIHRoaXMgY2xhc3MuIEl0J3MgYSBjbG9zdXJlLCBidXQgcmV2ZXJzZWQsIGFzIHRoZVxuICAgICAgICAvLyBlbmNsb3NlZCBwcm9wZXJ0eSBpcyBhbiBpbnRlcm5hbCByZWZlcmVuY2UgYWNjZXNzZWQgb3V0c2lkZSByYXRoZXIgdGhhbiBhbiBvdXRzaWRlIHJlZmVyZW5jZVxuICAgICAgICAvLyBhY2Nlc3NlZCBpbnNpZGUuXG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IF9yZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSBfcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LlxuICAgICAgICAvLyBXZSB3YW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGFsbG93IHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIC8vIGNvbnN0IHdhaXRhYmxlID0gbmV3IERlZmVycmVkUHJvbWlzZSgpOyBldmVudC5zdWJzY3JpYmUod2FpdGFibGUucmVzb2x2ZSk7IGNvbnN0IHIgPSBhd2FpdCB3YWl0YWJsZS5vdXRwdXQ7IGNvbnNvbGUubG9nKHIpO1xuICAgICAgICAvLyBJZiB5b3UgbGVhdmUgb3V0IHRoZSBpbml0aWFsIGNhbGxiYWNrLCB5b3UnbGwgZ2V0IHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHdoYXQgdGhlIGV2ZW50IHNlbmRzLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSBpbiBhc3luYy9hd2FpdCBjb2RlLiBUaGUgZm9sbG93aW5nIHdpbGwgd29yayBpZiBhIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAgICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWZlcnJlZC5vdXRwdXQ7XG4gICAgICogY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgKi9cbiAgICBnZXQgb3V0cHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLiAqL1xuICAgIHRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQncyB1Z2x5LlxuICAgICAgICAvLyBJdCBtZWFucyBhIGxvdCBvZiBleHRyYSBzdGVwcy4gSXQgbWFrZXMgc3VyZSB0aGF0IGJ5IGRlZmF1bHQsIHRoZSBsYXN0IHN0ZXAgaXMgYWx3YXlzIGEgY2F0Y2guXG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgaWYgKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFnYWluIHRoaXMgaXMgYSBtZXNzLCBidXQgdGhlIGNhdGNoIGhhbmRsZXIgYWJvdmUgY291bGQgdGhyb3dcbiAgICAgICAgaWYgKHRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmZXJyZWRQcm9taXNlID0gRGVmZXJyZWRQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBkZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIChyZXN1bHQpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKHJlc3VsdCksIHRpbWUpKTtcbn1cbmV4cG9ydHMuZGVsYXkgPSBkZWxheTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9EZWZlcnJlZFByb21pc2VcIik7XG4vKipcbiAqIENyZWF0ZXMgYSBkZWRpY2F0ZWQgd2ViIHdvcmtlciB0aGF0IGNvbW11bmljYXRlcyB2aWEgZGVmZXJyZWRzLiBJdCBjYW4gZXhlY3V0ZSB3aGF0ZXZlciBmdW5jdGlvblxuICogeW91IGdpdmUgaXQuIFRhc2tTdGFydCgpIGFjdHMga2luZCBvZiBsaWtlIGRvaW5nIG5ldyBUaHJlYWQoKSBhbmQgVGhyZWFkLlN0YXJ0KCkgaW4gb25lIHN0ZXAuXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBkbyBhbGwgdGhpcyBtYW51YWxseSwgYnV0IHRoaXMgaGVscGVyIGNsYXNzIG1ha2VzIGl0IGEgZmFpcmx5IHRyaXZpYWwgb3BlcmF0aW9uLlxuICpcbiAqIEhhY2t3b3JrIGlzIHVzZWQgdG8gYXZvaWQgdGhlIG5lZWQgdG8gY3JlYXRlIGEgc3BlY2lhbGl6ZWQgd2ViIHdvcmtlciBqcyBmaWxlLiBUaGUgd29ya2VyIGNyZWF0ZWQgdGFrZXMgYVxuICogZnVuY3Rpb24gYW5kIGFyZ3VtZW50cywgZXhlY3V0ZXMgdGhlbSBpbiBpdHMgb3duIHRocmVhZCwgYW5kIHJldHVybnMgdGhlIHJlc3VsdC5cbiAqXG4gKiBGdXJ0aGVyIGhhY2t3b3JrIGlzIG5lZWRlZCBiZWNhdXNlIHdlYiB3b3JrcyBoYXZlIG5vIGFjY2VzcyB0byBtb2R1bGVzLCBubyBhY2Nlc3MgdG8gY2xvc3VyZXMsIGFuZCBjYW4gb25seVxuICogY29tbXVuaWF0ZSBpbiBzdHJpbmdzLiBUaGUgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgbmVlZHMgdG8gYmUgcGFzc2VkIGFzIGEgc3RyaW5nIGluIHRoZSBtZXNzYWdlIGJldHdlZW5cbiAqIHRocmVhZHMuXG4gKlxuICogV2hpbGUgaXQgaXMgcG9zc2libGUgdG8gY3JlYXRlIGEgdmVyc2lvbiB0aGF0IGRvZXMgbm90IG5lZWQgdG8gZXZhbCgpIHRoZSBmdW5jdGlvbiBzdHJpbmcgb24gZXZlcnkgZXhlY3V0aW9uLFxuICogdGhpcyByZXF1aXJlcyB0aGUgY2FsbGVyIHRvIG1hbnVhbGx5IGNvZGUgZXZlcnl0aGluZyB0aGF0IHlvdSBzZWUgaW4gaGVyZSB0aGUgY29uc3RydWN0b3IuIE5vIGhlbHBlcnMgYXJlIGFsbG93ZWRcbiAqIChubyBhY2Nlc3MgdG8gb3RoZXIgb2JqZWN0cykuIElmIHlvdSB3YW50ZWQgdG8gZG8gZXZlcnl0aGluZyB5b3Vyc2VsZiwgeW91IGNvdWxkIGp1c3QgbWFrZSBhIHdlYiB3b3JrZXIgdGhlIHJpZ2h0XG4gKiB3YXksIHdpdGhvdXQgdGhlIGhlbHBlci5cbiAqL1xuY2xhc3MgRHluYW1pY1dlYldvcmtlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGVmZXJyZWRJZCA9IDA7XG4gICAgICAgIHRoaXMuZGVmZXJyZWRzID0gbmV3IE1hcCgpO1xuICAgICAgICBmdW5jdGlvbiBzZXR1cEZ1bmMoKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBzZWxmO1xuICAgICAgICAgICAgLy8gU2V0IHVwIHdoYXQgaGFwcGVucyB3aGVuIGEgbWVzc2FnZSBpcyBzZW50IHRvIHRoZSB3b3JrZXIuXG4gICAgICAgICAgICAvLyBJZiB5b3UncmUgd2lsbGluZyB0byB3cml0ZSBhbGwgdGhpcywgYnV0IHJlbWVtYmVyIHRvIGRlZmluZSB5b3VyIGZuIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBiZWZvcmUgb25tZXNzYWdlLCB5b3UgY2FuIHNraXAgdGhlIGV2YWwoKSBzdGVwLlxuICAgICAgICAgICAgY3R4Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlkLCBmbiwgYXJncyB9ID0gZXZ0LmRhdGE7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBoYWNrIGFsbG93cyBhIHNpbmdsZSBkZWRpY2F0ZWQgd2ViIHdvcmtlciB0byBoYW5kbGUgYW55IGZ1bmN0aW9uLiBCZWNhdXNlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSB3b3JrZXIgaGFzIG5vIGFjY2VzcyB0byBjbG9zdXJlcywgaXQgaGFzIG5vIGFjY2VzcyB0byBjb21wbGV4IG9iamVjdHMuIEl0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbiBvbmx5IGdldCB0aGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBpbiB0aGUgbWVzc2FnZSwgd2hpY2ggY29udGFpbnMgc2ltcGxlIG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgLy8gb25seSwgc3RyaW5ncyBhbmQgbnVtYmVycy4gU28gaXQgaGFzIHRvIGJlIHNlcmlhbGl6ZWQgYW5kIHRoZW4gZGVzZXJpYWxpemVkLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gZGVzZXJpYWxpemUgaXQgaXMgdG8gZXZhbCgpIGl0LiBQcmV0dHkgaG9ycmlmZmljLlxuICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dEZ1bmM7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1ldmFsXG4gICAgICAgICAgICAgICAgICAgIGV2YWwoXCJpbnB1dEZ1bmMgPSBcIiArIGZuICsgXCI7XCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmdhcnJheSA9IEpTT04ucGFyc2UoYXJncykgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGlucHV0RnVuYyguLi5hcmdhcnJheSk7IC8vIEV2YWx1YXRlIHRoZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyBTZW5kIHRoZSByZXNwb25zZSBiYWNrLlxuICAgICAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoeyBpZCwgcmVzdWx0OiBKU09OLnN0cmluZ2lmeShyZXN1bHQpIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5wb3N0TWVzc2FnZSh7IGlkLCBlcnJvcjogZXJyIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0VXBXb3JrZXIoc2V0dXBGdW5jKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRpbmcgYSB0YXNrIHJldHVybnMgYSBkZWZlcnJlZCBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgd29ya2VyIHRocmVhZCBoYXMgY29tcGxldGVkIGl0cyB0YXNrLlxuICAgICAqXG4gICAgICogUmVtZW1iZXIgdGhhdCBjbG9zdXJlcyBETyBOT1QgV09SSy4gUGFzcyB5b3VyIGFyZ3VtZW50cyAod2hpY2ggbXVzdCBiZSBKU09OLnN0cmluZ2lmaWFibGUpLlxuICAgICAqL1xuICAgIHRhc2tTdGFydChmbiwgLi4uYXJncykge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZGVmZXJyZWRJZCsrO1xuICAgICAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGZuOiBmbi50b1N0cmluZygpLFxuICAgICAgICAgICAgYXJnczogSlNPTi5zdHJpbmdpZnkoYXJncylcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWRQcm9taXNlXzEuRGVmZXJyZWRQcm9taXNlKCk7XG4gICAgICAgIHRoaXMuZGVmZXJyZWRzLnNldChpZCwgZGVmZXJyZWQpO1xuICAgICAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZShtc2cpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQub3V0cHV0XG4gICAgICAgICAgICAudGhlbihyZXNwID0+IEpTT04ucGFyc2UocmVzcCB8fCAnJykpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVyciB8fCBuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3InKSk7IH0pO1xuICAgIH1cbiAgICBfc2V0VXBXb3JrZXIoY2FsbGJhY2spIHtcbiAgICAgICAgLy8gSGVyZSdzIHRoZSBtYWluIGhhY2sgYW5kIGl0J3MgYSBkb296eS5cbiAgICAgICAgLy8gTm9ybWFsbHksIHlvdSBhcmUgcmVxdWlyZWQgdG8gY3JlYXRlIGEgc3BlY2lhbCB3b3JrZXIuanMgZmlsZSBmb3Igd2ViIHdvcmtlcnMgYW5kIGxpbmtcbiAgICAgICAgLy8gdG8gdGhlbSB3aGVuIGxvYWRpbmcgdGhlIHBhZ2UuIE9idmlvdXNseSB0aGF0IG1ha2VzIGl0IGltcG9zc2libGUgdG8gZGVmaW5lIHRoZW0gYXQgcnVudGltZS5cbiAgICAgICAgLy8gVG8gZ2V0IGFyb3VuZCB0aGUgbGltaXRhdGlvbiwgdGhpcyBlbmNvZGVzIHRoZSB3b3JrZXIgYXMgYW4gb2JqZWN0IFVSTCAod2hpY2ggcmVxdWlyZXMgY29udmVyc2lvblxuICAgICAgICAvLyB0byBhIHN0cmluZykgYW5kIGxvYWRzIHRoYXQuXG4gICAgICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFsnKCcgKyBjYWxsYmFjay50b1N0cmluZygpICsgJykoKTsnXSkpKTtcbiAgICAgICAgdGhpcy53b3JrZXIub25tZXNzYWdlID0gZXZ0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaWQsIHJlc3VsdCwgZXJyb3IgfSA9IGV2dC5kYXRhO1xuICAgICAgICAgICAgY29uc3QgZGVmZXJyZWQgPSB0aGlzLmRlZmVycmVkcy5nZXQoaWQpO1xuICAgICAgICAgICAgaWYgKCFkZWZlcnJlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkRlZmVycmVkIHByb21pc2UgaXMgbWlzc2luZy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWZlcnJlZHMuZGVsZXRlKGlkKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkR5bmFtaWNXZWJXb3JrZXIgPSBEeW5hbWljV2ViV29ya2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBEZWZlcnJlZFByb21pc2VfMSA9IHJlcXVpcmUoXCIuL0RlZmVycmVkUHJvbWlzZVwiKTtcbi8qKlxuICogVGhlIHByb21pc2UgQVBJIGlzIG5pY2UsIG1vc3RseSwgYnV0IHRoZSBtYWluIHRoaW5nIHByZXZlbnRpbmcgdXNlIG9mIGEgcHJvbWlzZSBhcyBhbiBldmVudCBoYW5kbGVyIGlzIHRoYXRcbiAqIGl0IG9ubHkgZXhlY3V0ZXMgb25jZS4gQWZ0ZXIgdGhhdCBwb2ludCwgaXQgaXMgcmVzb2x2ZWQsIGFuZCB0aGVyZSBpcyBubyB3YXkgdG8gZmxpcCBpdCBiYWNrLlxuICpcbiAqIFRoZSByZXBlYXRhYmxlIHByb21pc2Uga2VlcHMgdGhlIHByb21pc2UgQVBJIGFuZCBjcmVhdGVzIHRoZSBpbGx1c2lvbiB0aGF0IHRoZSBwcm9taXNlIGlzIHJlcGVhdGVkIGJ5XG4gKiByZWJ1aWxkaW5nIHRoZSBjaGFpbiBlYWNoIHRpbWUuIEl0J3MgcmVhbGx5IGEgZGVmZXJyZWQgZmFjdG9yeSBidXQgaXQgcHJldGVuZHMgdG8gYmUgYSBkZWZlcnJlZC4gSSdtIHN1cmVcbiAqIHRoaXMgaGFzIGEgcGVyZm9ybWFuY2UgcGVuYWx0eS5cbiAqXG4gKiBZb3Ugc2hvdWxkIG5vdCBhdHRhY2ggYWN0dWFsIHByb21pc2VzIGludG8gdGhlIHRoZW4oKSBjaGFpbiwgYmVjYXVzZSB0aGV5IGNhbid0IGJlIHJlcGVhdGVkLiBUaGUgUHJvbWlzZSB0eXBlIGlzbid0XG4gKiBhbGxvd2VkIGJ1dCB0aGVyZSBhcmUgd2F5cyB0byBnZXQgYXJvdW5kIHRoZSBUUyBjb21waWxlci4gVGhlIFRTIHR5cGUgZGVmaW5pdGlvbiBmb3IgUHJvbWlzZSBhbmQgUHJvbWlzZUxpa2UgaXNuJ3RcbiAqIGNvbXBsZXRlbHkgY29ycmVjdCwgYW55d2F5LCBzbyBpdCdzIGVhc3kgdG8gZ2V0IHVzZWQgdG8gdXNpbmcgdGhlIGFueSB0eXBlIGFuZCBtYWtlIGJyb2tlbiBjb2RlLlxuICpcbiAqIFlvdSBjYW5ub3QgYXN5bmMvYXdhaXQgYSByZXBlYXRhYmxlIHByb21pc2UgaXRzZWxmIGJ1dCB5b3UgY2FuIGF3YWl0IGEgc2luZ2xlIHJlc29sdXRpb24uIEFzeW5jL2F3YWl0IGlzIHN1Z2FyIHRoYXRcbiAqIGNyZWF0ZXMgYSByZWd1bGFyLCBub24tcmVwZWF0YWJsZSwgcHJvbWlzZS5cbiAqL1xuY2xhc3MgUmVwZWF0YWJsZVByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCBvblVuaGFuZGxlZEVycm9yLCAvLyBUaGlzIGFkZHMgYSBjYWxsYmFjayBhdCB0aGUgZW5kIChvciAybmQgZnJvbSB0aGUgZW5kLCBzZWUgbmV4dCBvcHRpb24pXG4gICAgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgKSB7XG4gICAgICAgIHRoaXMub25VbmhhbmRsZWRFcnJvciA9IG9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yOyAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LiBVc2VmdWwgZm9yIGFzeW5jL2F3YWl0IGNvZGUuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGUgZm9sbG93aW5nIHNob3VsZCB3b3JrOlxuICAgIC8vIGNvbnN0IHJlcGVhdGFibGUgPSBuZXcgUmVwZWF0YWJsZVByb21pc2UoKTsgY29uc3QgciA9IGF3YWl0IHJlcGVhdGFibGUucmVzb2x2ZSgpOyBjb25zb2xlLmxvZyhyKTtcbiAgICByZXNvbHZlKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIHJlamVjdChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIC8vIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLlxuICAgIHRoZW4ob25mdWxmaWxsZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9uZnVsZmlsbGVkOiBvbmZ1bGZpbGxlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9ucmVqZWN0ZWQ6IG9ucmVqZWN0ZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBidWlsZCgpIHtcbiAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGtub3cgdGhhdCB0aGUgZmlyc3QgaXMgYWx3YXlzIG9uZnVsZmlsbGVkIGFuZCBpcyBuZXZlciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpZiAoIWNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gRmlyc3Qgb25mdWxmaWxsZWQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgRGVmZXJyZWRQcm9taXNlXzEuRGVmZXJyZWRQcm9taXNlKGNiLm9uZnVsZmlsbGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihjYi5vbmZ1bGZpbGxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbnJlamVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChjYi5vbnJlamVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gTm8gY2FsbGJhY2tzLCBub3QgZXZlbiB0aGUgZGVmYXVsdCBmaXJzdCBvbmZ1bGZpbGxlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuZXhwb3J0cy5SZXBlYXRhYmxlUHJvbWlzZSA9IFJlcGVhdGFibGVQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJldHVybiBlbGVtZW50cyBvZiBhcnJheSBhIGxpbmVkIHVwIHdpdGggZWxlbWVudHMgb2YgYXJyYXkgYi4gQm90aCBhcnJheXMgZG9uJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoID49IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFtlbGVtZW50LCBiW2luZGV4XV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2FbaW5kZXhdLCBiXSk7XG4gICAgfVxufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vKipcbiAqIFJldHVybiBhIGNhcnRlc2lhbiBqb2luIChjcm9zcyBqb2luKSBiZXR3ZWVuIGFycmF5cyBhIGFuZCBiLlxuICovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYikge1xuICAgIC8vLyB0eXBlc2NyaXB0IHByZXZlbnRzIGEgZGlyZWN0IHVzZSBvZiBjb25jYXQsIHNvIGRvIHRoaXMgbWFudWFsbHkgd2l0aCBhIGxvb3BcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGEpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmIubWFwKHEgPT4gW2l0ZW0sIHFdKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5jYXJ0ZXNpYW4gPSBjYXJ0ZXNpYW47XG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZ2Ugb2YgaW50ZWdlcnMsIGNvdW50aW5nIHVwIGJ5IDEsIGZvciB0aGUgZ2l2ZW4gbGVuZ3RoLiBTdG9sZW4gZnJvbSBQeXRob24uXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG59XG5leHBvcnRzLnJhbmdlID0gcmFuZ2U7XG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGl0ZW1zIGFuZCBvdGhlciBhcnJheXMsIGZsYXR0ZW4gdGhlbSBvdXQgaW50byBhIHNpbmdsZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24qIHRyYXZlcnNlKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHlpZWxkIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGFycikge1xuICAgICAgICAgICAgeWllbGQqIHRyYXZlcnNlKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogTWFrZSBpdCBlYXNpZXIgdG8gY3JlYXRlIHNpbXBsZSBjb21wYXJpc29uIGZ1bmN0aW9ucyBvbiAocG9zc2libHkgY29tcGxleCkgb2JqZWN0cy4gVHlwaWNhbCB1c2U6IGFyci5zb3J0KG9yZGVyQnkobyA9PiBvLmlkKSlcbiAqL1xuZnVuY3Rpb24gb3JkZXJCeShwcm9wZXJ0eUZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0VmFsdWUgPSBwcm9wZXJ0eUZuKGZpcnN0KTtcbiAgICAgICAgY29uc3Qgc2Vjb25kVmFsdWUgPSBwcm9wZXJ0eUZuKHNlY29uZCk7XG4gICAgICAgIGlmIChmaXJzdFZhbHVlIDwgc2Vjb25kVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RWYWx1ZSA+IHNlY29uZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xufVxuZXhwb3J0cy5vcmRlckJ5ID0gb3JkZXJCeTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBvZiBvcGVyYXRpb24gKG1ldGhvZCwgc2V0LCBkZWxldGUpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSAnJztcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5hcmdzID0gW107XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5BcnJheUNoYW5nZWRFdmVudEFyZ3MgPSBBcnJheUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFJlcGVhdGFibGVQcm9taXNlXzEgPSByZXF1aXJlKFwiLi4vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIik7XG4vKipcbiAqIEEgZGVsZWdhdGUgb2JqZWN0IGlzIHVzZWQgYnkgdGhlIEV2ZW50SGFuZGxlci4gSXQgY29udGFpbnMgZW5vdWdoIGluZm9ybWF0aW9uIHRvIGV4ZWN1dGUgYSBjYWxsYmFjayBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5XG4gKiAodXNpbmcgYSBwcm9taXNlKS4gSXQgYWxzbyBhZGRzIHNvbWUgc3RyaW5ncyB0byBoZWxwIGluIHRyb3VibGVzaG9vdGluZywgYmVjYXVzZSBzZWFyY2hpbmcgYSByZWN1cnNpdmUgYXJyYXkgb2YgY29tcGxleCBvYmplY3RzIGNhbiBtYWtlXG4gKiBpdCBhIGJlYXIgdG8gZmluZCBvdXQgd2h5IGEgY2FsbGJhY2sgaXNuJ3QgYmVpbmcgZXhlY3V0ZWQuXG4gKi9cbmNsYXNzIERlbGVnYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJbiBtYW55IGNhc2VzIChmb3IgZXhhbXBsZSwgd2hlbiB1c2luZyBmYXQgYXJyb3cgZnVuY3Rpb25zKSwgdGhpc0FyZyBpc1xuICAgICAgICAvLyBub3QgbmVlZGVkLiBCdXQgaW4gbW9zdCBvdGhlcnMsIGl0IGlzIGFuIGFubm95aW5nIGJ1ZyB0aGF0IHJlcXVpcmVzIHRyb3VibGVzaG9vdGluZ1xuICAgICAgICAvLyB0byBmaWd1cmUgb3V0IHdoYXQgdGhlIGNhbGxlciBmb3Jnb3QuIEkndmUgd2F2ZXJlZCBiZXR3ZWVuIG1ha2luZyBpdCByZXF1aXJlZCBhbmQgbm90LlxuICAgICAgICBpZiAoIXRoaXNBcmcpIHtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlbGVnYXRlIGNyZWF0ZWQgd2l0aG91dCB0aGlzQXJnLiBEaWQgeW91IG1lYW4gdG8/Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICAgICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHRoaXNBcmcgPT09ICdvYmplY3QnICYmICdjb25zdHJ1Y3RvcicgaW4gdGhpc0FyZykge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja093bmVyTmFtZSA9IHRoaXNBcmcuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgdHlwZXNjcmlwdCBjb21waWxlciBzaG91bGQgaGFuZGxlIHRoaXMgY2hlY2sgYnV0IGNhbid0IGF0IHJ1bnRpbWUuXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIG11c3QgYmUgYSBjYWxsYmFjayBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tOYW1lID0gY2FsbGJhY2submFtZTtcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUgJiYgdGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGAke3RoaXMuY2FsbGJhY2tPd25lck5hbWV9LiR7dGhpcy5jYWxsYmFja05hbWV9KClgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrTmFtZSArICcoKSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja093bmVyTmFtZSArICcuX19sYW1iZGFfXygpJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUmVwZWF0YWJsZVByb21pc2VfMS5SZXBlYXRhYmxlUHJvbWlzZShjYWxsYmFjay5iaW5kKHRoaXNBcmcpKTtcbiAgICB9XG59XG5leHBvcnRzLkRlbGVnYXRlID0gRGVsZWdhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5VXRpbGl0aWVzXzEgPSByZXF1aXJlKFwiLi4vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBEZWxlZ2F0ZV8xID0gcmVxdWlyZShcIi4vRGVsZWdhdGVcIik7XG4vKipcbiAqIEkgY2hvc2UgdG8gdXNlIEMjIHN0eWxlIGV2ZW50cywgbm90IEpTL1RTLCBiZWNhdXNlIHRoZSBKUy9UUyB3YXkgb2YgZG9pbmcgZGVsZWdhdGVzL2N1c3RvbSBldmVudHMgaXMgYSBOSUdIVE1BUkUuIFN1cmUsXG4gKiBDdXN0b21FdmVudCB3b3JrcywgYnV0IG9uIHRoZSBUUyBzaWRlIHRoZSBjb2RlIHJlcXVpcmVkIHRvIG1ha2UgVFNDIGhhcHB5IHdpdGggdmFsaWQgamF2YXNjcmlwdCBpcyBhd2Z1bCBhbmQgbm9uLWludHVpdGl2ZS5cbiAqIE9uIHRoZSBKUyBzaWRlLCB5b3UgaGF2ZSB0aGUgcHJvYmxlbSB0aGF0IGV2ZXJ5IGhhbmRsZXIgcGlja3MgaXQgdXAsIG5vdCBqdXN0IHRoZSBvbmVzIHRoYXQgYXJlIGJvdW5kIHRvIHRoZSByZWxldmFudCBIVE1MXG4gKiBlbGVtZW50LCBzbyBlbGVtZW50cyBuZWVkIHRvIHBhc3MgdGhlIHNvdXJjZSBhcyBhbiBhcmd1bWVudCBhbmQgY2hlY2sgaXQgKGxpa2UganF1ZXJ5IGFuZCAkKGRvY3VtZW50KS5vbigpKS5cbiAqXG4gKiBBZnRlciBnZXR0aW5nIGl0IHdvcmtpbmcsIGFsbCBJIGNvdWxkIHRoaW5rIGFib3V0IHdhcyBob3cgYmFkIHRoZSBjb2RlIHdhcywgc28gSSByZXdyb3RlIGl0IGF2b2lkaW5nIHRoZSBKUyBwYXR0ZXJuIGVudGlyZWx5LlxuICpcbiAqIFRoaXMgY2FuIGJlIHN5bmNocm9ub3VzIChjYWxsYmFja3MpIG9yIGFzeW5jaHJvbm91cyAocHJvbWlzZXMpLiAgV2hlbiBpdCBpcyBhc3luYywgdGhlIGNvZGUgZXhlY3V0ZXMgYWZ0ZXIgdGhlIGN1cnJlbnQgc3luY2hyb25vdXNcbiAqIGV2ZW50cyBydW4gdG8gY29tcGxldGlvbi4gVGhpcyBjb3VsZCBjcmVhdGUgYnVncyBpbiBzeW5jaHJvbm91cyBjb2RlLCBidXQgaXMgYmVzdCBmb3IgYnJvd3NlciBldmVudHMuIFRoaXMgaGFuZGxlciBpcyBwcmltYXJpbHkgdXNlZCBmb3JcbiAqIGJyb3dzZXIgZXZlbnRzLCBzbyBhc3luYyBpcyBkZWZhdWx0LlxuICpcbiAqIEJ1dCBpZiB5b3UncmUgdHJpZ2dlcmluZyBhc3luYyBldmVudHMgaW4gY29kZSBhbmQgc3RlcHBpbmcgdGhyb3VnaCBpdCBpbiBDaHJvbWUsIHdoYXQgeW91IHNlZSB3b24ndCBtYWtlIHNlbnNlLCBiZWNhdXNlIHRoZSBhc3luY1xuICogZXZlbnRzIHdvbid0IG9jY3VyIHVudGlsIHJpZ2h0IGF3YXkuIEl0IGNhbiBiZSBoYXJkIHRvIHRyb3VibGVzaG9vdC5cbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfZGlzYWJsZUFzeW5jID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZUFzeW5jID0gX2Rpc2FibGVBc3luYztcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IFtdO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSWYgdGhpcyByZWNlaXZlcyBhIGRlbGVnYXRlICh3aGljaCBpcyBhbiBhcnJheSBvZiBkZWxlZ2F0ZXMpLCBhZGQgaXQuXG4gICAgICAgIC8vIFdoZW4gdGhpcyBpcyBpbnZva2VkLCB0aGF0IGRlbGVnYXRlIHdpbGwgYWxzbyBiZSBpbnZva2VkLlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjYWxsYmFjaykpIHtcbiAgICAgICAgICAgIF9vdnIxX2RlbGVnYXRlLmNhbGwodGhpcywgY2FsbGJhY2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdvdCBhIHNpbmdsZSBjYWxsYmFja1xuICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGNhbGxiYWNrLlxuICAgICAgICBpZiAodGhpcy5maW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2g6IHRydWUgfSkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3RGVsZSA9IG5ldyBEZWxlZ2F0ZV8xLkRlbGVnYXRlKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5wdXNoKG5ld0RlbGUpO1xuICAgICAgICAvLyBJRiB0aGlzIGlzIGFzeW5jaHJvbm91cywgcmV0dXJuIHRoZSBwcm9taXNlIHNvIGl0IGNhbiBiZSBjaGFpbmVkLlxuICAgICAgICAvLyBDaGFpbmluZyB3b24ndCB3b3JrIG9uIHN5bmMgY29kZSwgc28gZG8gbm90IGluIHRoYXQgY2FzZS5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdEZWxlLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX292cjFfZGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgZGVsZWdhdGUuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWxlZ2F0ZS5maW5kKHEgPT4gcSA9PT0gZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5wdXNoKGRlbGVnYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGVsZWdhdGUuZmluZEluZGV4KHEgPT4gIUFycmF5LmlzQXJyYXkocSkgJiYgcS5jYWxsYmFjayA9PT0gY2FsbGJhY2spO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKSB7XG4gICAgICAgIC8vIEZpcnN0IHRyeSB0byB1bnN1YnNjcmliZSB0aGUgZGVmYXVsdCBkZWxlZ2F0ZS4gQ2FuJ3QgZG8gYW55dGhpbmcgaWYgaXQgaGFzIGEgZGlmZmVyZW50IG5hbWUsIHRob3VnaC5cbiAgICAgICAgaWYgKFwiZGVsZWdhdGVcIiBpbiBzZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVEZWxlZ2F0ZShzZW5kZXIuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmRlbGVnYXRlLmZpbmRJbmRleChxID0+ICFBcnJheS5pc0FycmF5KHEpICYmIHEudGhpc0FyZyA9PT0gc2VuZGVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5kZWxlZ2F0ZS5maW5kSW5kZXgocSA9PiBxID09PSBkZWxlZ2F0ZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnZva2UoYXJncykge1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UodGhpcy5kZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICAgICAgLy8gQXN5bmMgdmVyc2lvbi4gRG9lcyBub3Qgd29yayB3ZWxsIHdpdGggdGhlIGNocm9tZSBkZWJ1Z2dlci5cbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5wcm9taXNlLnJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnRoaXNBcmcsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIEFycmF5VXRpbGl0aWVzXzEudHJhdmVyc2UodGhpcy5kZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaChsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2gobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiB0aGlzQXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzQXJnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5sZW5ndGggPSAwO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7IC8vIENsZWFycyB0aGUgZGVsZWdhdGVcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHVuZGVmaW5lZDsgLy8gTWFrZXMgc3VyZSB0aGlzIGNhbid0IGJlIHVzZWQgYWdhaW5cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50SGFuZGxlciA9IEV2ZW50SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBFdmVudCBhcmd1bWVudHMgZXhwZWN0ZWQgb24gYW55IENoYW5nZSBldmVudC5cbiAqL1xuY2xhc3MgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihhcmdzKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBvZiBjaGFuZ2Ugb3BlcmF0aW9uIChzZXQsIGRlbGV0ZSkgKHBvdGVudGlhbGx5IG1ldGhvZClcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICcnO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzID0gUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBjb25zdHJ1Y3RvciB0aGF0IGlzIG5ld2FibGUuXG4gKiBUSElTIENBTk5PVCBERVRFQ1QgQU5PTllNT1VTIENMQVNTRVMuIFNvcnJ5LCBidXQgSlMgZG9lc24ndCBoYXZlIGEgbm9uLWRlc3RydWN0aXZlIHdheVxuICogdG8gY2hlY2sgaWYgYW55IGZ1bmN0aW9uIGlzIGEgY29uc3RydWN0b3Igb3RoZXIgdGhhbiB0byB0cnkgdG8gbmV3KCkgaXQgYW5kIGJsb3cgdXAvbm90IGJsb3cgdXAuXG4gKiBUaGlzIGZ1bmN0aW9uIGRlcGVuZHMgb24gdGhlcmUgYmVpbmcgYSBwcm90b3R5cGUgd2l0aCBhIG5hbWVkIGNvbnN0cnVjdG9yLlxuICovXG5mdW5jdGlvbiBjb25zdHJ1Y3RvclR5cGVHdWFyZChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5wcm90b3R5cGUgJiYgb2JqLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuZXhwb3J0cy5jb25zdHJ1Y3RvclR5cGVHdWFyZCA9IGNvbnN0cnVjdG9yVHlwZUd1YXJkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYW4gaW1wbGVtZW50YXRpb24gb2Yga2V5d29yZCBhcmd1bWVudHMsIGFzIHNlZW4gaW4gUHl0aG9uIGFuZCBDIy4gSXQgbWFrZXMgY29uZmlndXJhYmxlXG4gKiBmdW5jdGlvbnMgc28gbXVjaCBxdWlja2VyIGFuZCBlYXNpZXIgdGhhbiBmbGF0IGFyZ3VtZW50cyAoZm9yY2luZyB5b3UgdG8gcHV0IHVuZGVmaW5lZCBtYW51YWxseSBpbiBkaWZmZXJlbnRcbiAqIHNsb3RzKSBvciBvcHRpb25zIG9iamVjdHMgKHRha2VzIG1vcmUgdGltZSB0byBwcm9kdWNlLCBlc3BlY2lhbGx5IGlmIHlvdSBuZWVkIHRvIG5ldyBpdCB1cCkuXG4gKlxuICogQ2FsbCBmdW5jdGlvbnMgaGF2aW5nIGtleXdvcmQgYXJndW1lbnRzIHVzaW5nIHRoaXMgc3ludGF4OlxuICogY2FsbG1lKGFyZzEsIGFyZzIsIGt3KCdzb21ldGhpbmcnLCBrdzEpLCBrdygnc29tZXRoaW5nRWxzZScsIGt3MikpXG4gKlxuICogVG8gbWFrZSB0aGVtIHdvcmssIGluIHRoZSBmdW5jdGlvbiBpdHNlbGYsIHlvdSBuZWVkIHRvIGNvcHkgYW5kIHBhc3RlLiBGb3IgZXhhbXBsZTpcbiAqICh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9ID0gS3dhcmcucGFyc2UoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSkpO1xuICovXG5jbGFzcyBLd2FyZyB7XG4gICAgY29uc3RydWN0b3IoYSwgYikge1xuICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWUgPSBhO1xuICAgICAgICB0aGlzLnZhbHVlID0gYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtZW1iZXIgdGhpcyB0ZW1wbGF0ZTpcbiAgICAgKiAoeyB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSkpO1xuICAgICAqIEluY2x1ZGUgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIGZpcnN0IG9iamVjdCwgbm90IHRoZSBzZWNvbmQuXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCB0byBjYXB0dXJlIHJlc3QgcGFyYW1ldGVycywgdXNlIHRoaXM6XG4gICAgICogKHsgJHJlc3QkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyAsIC4uLnJlc3QgfSkpO1xuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgYWxsb3dVbmtub3duS2V5d29yZCB0byBiZSB0cnVlLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkJGt3JCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0sIHRydWUpKTtcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VBcmdzKGFyZ3MsIGFsbG93VW5rbm93bktleXdvcmQgPSBmYWxzZSkge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHRoaXMgY291bGQgdGFrZSB0aGUgYXJndW1lbnRzIG9iamVjdCwgYnV0IHNhZGx5IGFyZ3VtZW50cyBzdG9yZXMgb25seSBhbiBhcnJheSBvZiB2YWx1ZXMsXG4gICAgICAgIC8vIG5vIGtleXMuIElmIEpTIHdlcmUgc2FuZSwgaXQgd291bGQgYmUgYSBNYXAsIG5vdCBhbiBhcnJheS4gVHdvIHN0ZXBzIGZvcndhcmQsIG9uZSBzdGVwIGJhY2suXG4gICAgICAgIC8vIFBhcnNpbmcgdGhlIHN0cmluZyBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb24gaXMgbm90IG15IGN1cCBvZiB0ZWEsIHNvIGp1c3Qgbm8uXG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpO1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBhcmd1bWVudCBvcmRlclxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrd3ZhciA9IHt9O1xuICAgICAgICBvYmpbJyQka3ckJCddID0ga3d2YXI7XG4gICAgICAgIC8vIENoZWNrIGZvciByZXN0IHBhcmFtZXRlcnMuXG4gICAgICAgIC8vIEkgd2FzIGdvaW5nIHRvIGhhdmUgdGhpcyBvbi9vZmYgY29uZmlndXJhYmxlLCBidXQgaXQgc2hvdWxkbid0IGh1cnQgcGVyZm9ybWFuY2UuXG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBvYmpbJyRyZXN0JCddID0gYXJyO1xuICAgICAgICAvLyBSZXN0IHBhcmFtZXRlcnMgYXJlIHN0b3JlZCBhcyBhcnJheSBrZXlzLCB7ICcwJzogYSwgJzEnOiBiLCAnbm9uUmVzdCc6ICdzb21ldGhpbmcgZWxzZSd9XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpLmZpbHRlcihmID0+IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKGYpKSkge1xuICAgICAgICAgICAgaWYgKCEoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goYXJnc1thcmddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXl3b3Jkc1VzZWQgPSB7fTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkga2V5d29yZCBuYW1lXG4gICAgICAgIC8vIEhhdmUgdG8gaXRlcmF0ZSB0aGUgbGlzdCB0d2ljZSwgdG8gYXZvaWQgd2lwaW5nIG91dCBkYXRhIGlmIHRoZSBvcmRlciBpcyBzd2FwcGVkXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBhcmdzW2FyZ107XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmpbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93VW5rbm93bktleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGt3dmFyW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IGFuIHVuZXhwZWN0ZWQga2V5d29yZCBhcmd1bWVudCAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIGtleXdvcmRzVXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBtdWx0aXBsZSB2YWx1ZXMgZm9yIGtleXdvcmQgYXJndW1lbnQgKyAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleXdvcmRzVXNlZFt0bXAubmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIC8vIFR1cm4gYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5d29yZCBhcmd1bWVudHMuXG4gICAgLy8gTmVlZHMgdG8gcmV0dXJuIGFueVtdIGJlY2F1c2UgaXQncyBnb2luZyB0byBiZSBzaG92ZWQgaW50byBhcmJpdHJhcnkgYXJndW1lbnQgbGlzdHNcbiAgICBzdGF0aWMgdW5wYWNrKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGt3KGFyZywgYXJnc1thcmddKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGlzTWF0Y2goa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IGtleTtcbiAgICB9XG59XG5leHBvcnRzLkt3YXJnID0gS3dhcmc7XG5mdW5jdGlvbiBrdyhhLCBiKSB7XG4gICAgaWYgKCFhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBPdmVybG9hZCAxXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYSwgYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMlxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGFbMF0sIGFbMV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgM1xuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBvbmx5IG9uZSBrZXkvdmFsdWUgcGFpci5cbiAgICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKTtcbiAgICAgICAgaWYgKCFwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1hcCBvYmplY3Q6IG11bHRpcGxlIGtleXMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKHByb3BzWzBdLCBhW3Byb3BzWzBdXSk7XG4gICAgfVxufVxuZXhwb3J0cy5rdyA9IGt3O1xuZnVuY3Rpb24ga3dhcmdzVG9PYmplY3QoYXJyKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgYXJnIG9mIGFycikge1xuICAgICAgICBvcHRpb25zW2FyZy5uYW1lXSA9IG9wdGlvbnNbYXJnLnZhbHVlXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnRzLmt3YXJnc1RvT2JqZWN0ID0ga3dhcmdzVG9PYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGlzTm9uZSh0ZXN0KSB7XG4gICAgcmV0dXJuICh0ZXN0ID09IG51bGwgfHwgdGVzdCA9PT0gdW5kZWZpbmVkKTtcbn1cbmV4cG9ydHMuaXNOb25lID0gaXNOb25lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIERlYWQgc2ltcGxlIGFzc2VydGlvbiB0aGF0J2xsIHdvcmsgYW55d2hlcmUuIFRoaXMgaXMgTk9UIHRoZSBkaWZmaWN1bHQgcGFydCBvZiB1bml0IHRlc3RpbmcuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydCh0ZXN0LCBtZXNzYWdlKSB7XG4gICAgaWYgKCF0ZXN0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQnKTtcbiAgICB9XG59XG5leHBvcnRzLmFzc2VydCA9IGFzc2VydDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY2xvbmVEZWVwKG9iaiwgaGFzaCA9IG5ldyBXZWFrTWFwKCkpIHtcbiAgICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgICAgICByZXR1cm4gb2JqOyAvLyBwcmltaXRpdmUgdHlwZXNcbiAgICB9XG4gICAgaWYgKGhhc2guaGFzKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGhhc2guZ2V0KG9iaik7IC8vIHJlZmVyZW5jZSB0byBvYmplY3QgcHJldmlvdXNseSBzZWVuXG4gICAgfVxuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgU2V0KCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCB2YWwgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IE1hcCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgKFtrZXksIHZhbF0pID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKGtleSwgaGFzaCksIGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBBcnJheS5mcm9tKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgb2JqLmZsYWdzKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBUaGlzIGlzIGF3ZnVsIGNvZGUsIGJ1dCBpdCdzIHRoZSBvbmx5IHdheSB0byBjbG9uZSBhIHN0YW5kYWxvbmUgZnVuY3Rpb24gKHZzIGEgbWV0aG9kIHdoaWNoIGhhcyBhIGRlc2NyaXB0b3IpLlxuICAgICAgICAvLyBJbiBnZW5lcmFsLCB5b3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgY2xvbmVEZWVwIG9uIGZ1bmN0aW9ucy4gWW91J2xsIHNlZSBpdCdzIE5PVCB1c2VkIG9uIGludGVybmFsIG1ldGhvZHMuXG4gICAgICAgIHJlc3VsdCA9IG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBvYmoudG9TdHJpbmcoKSkoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgICBoYXNoLnNldChvYmosIHJlc3VsdCk7IC8vIEtlZXAgdHJhY2sgb2Ygb2JqZWN0cyBwcmV2aW91c2x5IGNsb25lZFxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiAhKGtleSBpbiByZXN1bHQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgbWV0aG9kcyB0aGF0IGFyZW4ndCBpbiB0aGUgcHJvdG90eXBlLlxuICAgICAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHJlY3Vyc2l2ZWx5IGZvbGxvdyBiZWNhdXNlIHRoZXJlJ3Mgbm90aGluZyByZWN1cnNpdmUgdG8gZG8uXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgaGFzaC5zZXQob2JqW2tleV0sIHJlc3VsdFtrZXldKTtcbiAgICAgICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIG1ldGhvZC5cbiAgICAgICAgICAgICAgICAvLyBJZiBleHRyYSBrZXlzIGFyZSB0aHJvd24gb250byBhIGZ1bmN0aW9uLCB0aGV5IHByb2JhYmx5IHdpbGwgbm90IGJlIGNsb25lZC5cbiAgICAgICAgICAgICAgICAvLyBJbiBteSBleHBlcmllbmNlLCBleHRyYSBrZXlzIG9uIGZ1bmN0aW9ucyBkaWRuJ3Qgd29yayByaWdodCwgc28gbm8gYmlnIGxvc3MuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgY3VzdG9tIGdldHRlcnMvc2V0dGVycy4gVGhlc2UgYXJlIGxvY2FsIGFuZCBob3BlZnVsbHkgd29yayBqdXN0IGxpa2UgbWV0aG9kcy5cbiAgICAgICAgICAgIC8vIEluIG1hbnkgY2FzZXMsIHRoaXMgaXMgcmVkdW5kYW50IHdpdGggT2JqZWN0LmNyZWF0ZSgpLCBidXQgaXMgbmVjZXNzYXJ5IHRvIGFsbG93IG9iamVjdHMgd2l0aCBtYW51YWxseS1hZGRlZCBjdXN0b20gZ2V0dGVycy5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAvLyBOT1RFIHRoYXQgY2xvbmVEZWVwIGlzIE5PVCBjYWxsZWQgcmVjdXJzaXZlbHkgaGVyZS4gSXQgYWxsIGVuZHMgYXQgdGhlIGdldHRlci9zZXR0ZXIuXG4gICAgICAgICAgICAvLyBBTFNPIGhhc2ggbm90IHVwZGF0ZWQ7IHRoaXMgaXMgbm90IHBvc3NpYmxlLCBiZWNhdXNlIGl0IHdpbGwgbWFwIHRoZSB2YWx1ZSBpdCBnZXRzLCBub3QgdGhlIGdldHRlci5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gY2xvbmVEZWVwKG9ialtrZXldLCBoYXNoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jbG9uZURlZXAgPSBjbG9uZURlZXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEkgZG9uJ3Qga25vdyBmb3Igc3VyZSBpZiB0aGlzIHdpbGwgd29yayBpbiBhbGwgY2FzZXMuXG4vLyBJdCBnZXRzIGRlZXBlciBpbnRvIHRoZSBndXRzIG9mIEpTIG9iamVjdCB0aGFuIEkgaGF2ZSBleHBlcmllbmNlIHdpdGguXG5mdW5jdGlvbiBjbG9uZU9iamVjdChvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jbG9uZU9iamVjdCA9IGNsb25lT2JqZWN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBSZWNlbnQgVHlwZXNjcmlwdCBoYXMgYWRkZWQgYSBudWxsIGNvYWxlc2Npbmcgb3BlcmF0b3IgKD8uLCBha2EgdGhlIEVsdmlzIG9wZXJhdG9yKSBidXQgTlBNIGlzc3Vlc1xuICogcHJldmVudCBtZSBmcm9tIHVwZ3JhZGluZy4gIEJ1dCB0aGlzIHJldHVybnMgdW5kZWZpbmVkIGlmIHlvdSBhY2Nlc3MgYW55dGhpbmcgdGhhdCBkb2Vzbid0IGV4aXN0LlxuICpcbiAqIE5hdHVyYWxseSB0aGlzIGJyZWFrcyBWU0NvZGUgaW50ZWxsaXNlbnNlLCBiZWNhdXNlIGl0IHJldHVybnMgYW55LiBPbmx5IE1TIGNhbiBkbyBrZWVwIHRoZSByaWdodCB0eXBlLlxuICpcbiAqIElmIHlvdSBkbyByZXR1cm4gYSBwYXJ0aWFsIHZlcnNpb24gb2YgdGhlIHR5cGUsIFRTIHRocm93cyBhbiBlcnJvciBiZWNhdXNlIGl0IGNvdWxkIGJlIG1pc3NpbmcgKHVtbS4uLiB0aGF0J3Mgd2hhdCBQYXJ0aWFsIG1lYW5zLi4uKS5cbiAqXG4gKiBBIHRydWUgZWx2aXMgb3BlcmF0b3Igd291bGQgYWxzbyB3b3JrIG9uIHN0cmluZ3MvbnVtYmVycy9ldGMuIFRoaXMgY2Fubm90IGRvIHRoYXQsIGJlY2F1c2UgSlMgY2FuJ3QgdGVsbCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGFcbiAqIG51bGwgc3RyaW5nIGFuZCBhIG51bGwgb2JqZWN0LiBOdWxsIGlzIG51bGwuXG4gKi9cbmZ1bmN0aW9uIGVfKGl0ZW0pIHtcbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbn1cbmV4cG9ydHMuZV8gPSBlXztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbi8qKlxuICogQSBwc2V1ZG8tcmFuZG9tIHByZWZpeCBwbHVzIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBzaW5jZSB0aGUgdW5peCBlcG9jaC4gVGhlIHJhbmRvbSBwYXJ0IHNob3VsZCBiZSByYW5kb20gZW5vdWdoIHRvIGNvdmVyXG4gKiBtdWx0aXBsZSBpZHMgY3JlYXRlZCBpbiBhIG1pbGxpc2Vjb25kLlxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWVJZCgpIHtcbiAgICBjb25zdCBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWi1fJztcbiAgICBsZXQgcmVzdWx0ID0gJ3UnICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSArICctJztcbiAgICBmb3IgKGNvbnN0IF8gb2YgQXJyYXlVdGlsaXRpZXNfMS5yYW5nZSg4KSkge1xuICAgICAgICByZXN1bHQgKz0gY2hhcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5nZXRVbmlxdWVJZCA9IGdldFVuaXF1ZUlkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFRlbGwgaWYgYSBnaXZlbiBzdHJpbmcgaXMgYSBwb3NpdGl2ZSBpbnRlZ2VyLlxuICogVXNlIGZvciBkZXRlY3RpbmcgYXJyYXkga2V5cy5cbiAqL1xuZnVuY3Rpb24gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoc3RyKSB7XG4gICAgaWYgKCFzdHIgfHwgdHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RyID09PSAnMCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAvXlsxLTldXFxkKiQvLnRlc3Qoc3RyKTtcbn1cbmV4cG9ydHMuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcgPSBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBJIGRvbid0IGtub3cgaG93IGFjY3VyYXRlIHRoaXMgaXMgYnV0IGl0IHNlZW1zIHByZXR0eSBnb29kXG4gKi9cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qob2JqKSAhPT0gb2JqO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDbG9uZU9iamVjdF8xID0gcmVxdWlyZShcIi4vQ2xvbmVPYmplY3RcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1R5cGVzL05vbmVUeXBlXCIpO1xuLyoqXG4gKiBPYmplY3QuYXNzaWduKCkgY2FuIGJlIHVzZWQgZm9yIHNpbXBsZSBjb3BpZXMgb2YgcHJvcGVydGllcywgYnV0IGl0IG1pc3NlcyBnZXR0ZXJzLFxuICogc2V0dGVycywgYW5kIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJdCBvbmx5IGdldHMgdGhlIGxvY2FsIHZhbHVlcy5cbiAqXG4gKiBUaGlzIHNob3VsZCBob3BlZnVsbHkgcmVzb2x2ZSB0aGF0LCBidXQgSSBkb24ndCBrbm93IGZvciBzdXJlLiBUaGlzIGlzIHZlcnkgc2tldGNoeS5cbiAqIFRoZSByZXN1bHRzIGFyZSBjb21wbGV0ZWx5IGZsYXQsIGJlY2F1c2UgeW91IGNhbid0IGhhdmUgbXVsdGlwbGUgaW5oZXJpdGFuY2UgaGllcmFyY2h5XG4gKiBpbiBhIGxhbmd1YWdlIHdpdGhvdXQgbXVsdGlwbGUgaW5oZXJpdGFuY2UuIEJlY2F1c2UgdGhpcyBmbGF0dGVucyBvYmplY3RzLCBpdCBpcyBndWFyYW50ZWVkXG4gKiB0byBicmVhayBhbnl0aGluZyB0aGF0IG1ha2VzIHN1cGVyIGNhbGxzLlxuICpcbiAqIElmIHJldHVybkNsb25lIGlzIHRydWUsIGEgY2xvbmUgb2YgdGhlIHRhcmdldCBvYmplY3Qgd2lsbCBiZSBtb2RpZmllZCBhbmQgcmV0dXJuZWQsIGxlYXZpbmdcbiAqIHRoZSBvcmlnaW5hbCB1bnRvdWNoZWQuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdEZ1bGxBc3NpZ24odGFyZ2V0LCBzb3VyY2UsIHJldHVybkNsb25lID0gZmFsc2UpIHtcbiAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGFyZ2V0KSkge1xuICAgICAgICB0YXJnZXQgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFzb3VyY2UgfHwgdHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgaWYgKHJldHVybkNsb25lKSB7XG4gICAgICAgIHRhcmdldCA9IENsb25lT2JqZWN0XzEuY2xvbmVPYmplY3QodGFyZ2V0KTtcbiAgICB9XG4gICAgY29uc3QgbmFtZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQoZmluZFRoZVByb3BlcnR5TmFtZXMoc291cmNlKSkpO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIG5hbWVzKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgICBmdW5jdGlvbiBmaW5kVGhlUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIHJlc3VsdC5wdXNoKC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKGYgPT4gZiAhPT0gJ2NvbnN0cnVjdG9yJykpO1xuICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLmZpbmRUaGVQcm9wZXJ0eU5hbWVzKHByb3RvKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICBpZiAocHJvdG8gJiYgcHJvdG8uY29uc3RydWN0b3IubmFtZSAhPT0gJ09iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5vYmplY3RGdWxsQXNzaWduID0gb2JqZWN0RnVsbEFzc2lnbjtcbiJdfQ==
