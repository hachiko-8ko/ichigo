(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageRouter_1 = require("../../src/Router/PageRouter");
(function main() {
    const plugin = {
        PageRouter: PageRouter_1.PageRouter
    };
    // This one's so simple I want to set mi5.router = PageRouter, but I have a convention to stick with.
    window.mi5 = window.mi5 || {};
    window.mi5.router = Object.assign(window.mi5.router || {}, plugin);
})();

},{"../../src/Router/PageRouter":6}],2:[function(require,module,exports){
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

},{"../System/Types/KeywordArguments":9,"./ElementType":4,"./ExtractNodeContent":5}],3:[function(require,module,exports){
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

},{"../Html/CreateElement":2,"../Html/DeleteNodeContent":3,"../Html/ElementType":4,"../System/Collections/ArrayUtilities":7,"../System/Types/Constructable":8,"../System/Types/KeywordArguments":9,"../System/Types/NoneType":10}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"../Utility/IsInteger":11}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],11:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Sb3V0ZXIuanMiLCJzcmMvSHRtbC9DcmVhdGVFbGVtZW50LmpzIiwic3JjL0h0bWwvRGVsZXRlTm9kZUNvbnRlbnQuanMiLCJzcmMvSHRtbC9FbGVtZW50VHlwZS5qcyIsInNyYy9IdG1sL0V4dHJhY3ROb2RlQ29udGVudC5qcyIsInNyYy9Sb3V0ZXIvUGFnZVJvdXRlci5qcyIsInNyYy9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXMuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGUuanMiLCJzcmMvU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHMuanMiLCJzcmMvU3lzdGVtL1R5cGVzL05vbmVUeXBlLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQYWdlUm91dGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL1JvdXRlci9QYWdlUm91dGVyXCIpO1xuKGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgcGx1Z2luID0ge1xuICAgICAgICBQYWdlUm91dGVyOiBQYWdlUm91dGVyXzEuUGFnZVJvdXRlclxuICAgIH07XG4gICAgLy8gVGhpcyBvbmUncyBzbyBzaW1wbGUgSSB3YW50IHRvIHNldCBtaTUucm91dGVyID0gUGFnZVJvdXRlciwgYnV0IEkgaGF2ZSBhIGNvbnZlbnRpb24gdG8gc3RpY2sgd2l0aC5cbiAgICB3aW5kb3cubWk1ID0gd2luZG93Lm1pNSB8fCB7fTtcbiAgICB3aW5kb3cubWk1LnJvdXRlciA9IE9iamVjdC5hc3NpZ24od2luZG93Lm1pNS5yb3V0ZXIgfHwge30sIHBsdWdpbik7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBFbGVtZW50VHlwZV8xID0gcmVxdWlyZShcIi4vRWxlbWVudFR5cGVcIik7XG5jb25zdCBFeHRyYWN0Tm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuL0V4dHJhY3ROb2RlQ29udGVudFwiKTtcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgdGFnTmFtZSwgcHJvcGVydGllcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgdGFnTmFtZSwgcHJvcGVydGllcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIC8vIEFsbG93IGF0dHJpYnV0ZXMgdG8gYmUgc2VudCBvbiBwcm9wZXJ0aWVzLCBwcm92aWRpbmcgYSBjbGVhbmVyIGludGVyZmFjZS5cbiAgICAvLyBJdCBhbGxvd3MgeW91IHRvIHNlbmQgY3JlYXRlRWxlbWVudCgnZGl2Jywge2F0dHJpYnV0ZXM6IHsgY2xhc3M6ICdmb28nIH19KSBpbnN0ZWFkIG9mIGNyZWF0ZUVsZW1lbnQoJ2RpdicsIG51bGwsIHsgY2xhc3M6ICdmb28nIH0pO1xuICAgIC8vIEFub3RoZXIgb3B0aW9uIGlzIHRvIHVzZSBLd2FyZ3MsIGJ1dCBub3QgZXZlcnlvbmUgd2FudHMgdG8uXG4gICAgaWYgKHByb3BlcnRpZXMgJiYgJ2F0dHJpYnV0ZXMnIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcyB8fCB7fSwgcHJvcGVydGllcy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgZGVsZXRlIHByb3BlcnRpZXMuYXR0cmlidXRlcztcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh0YWdOYW1lLCBwcm9wZXJ0aWVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG5mdW5jdGlvbiBjcmVhdGUodGFnLCBwcm9wZXJ0aWVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSk7XG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBET00gcHJvcGVydGllcyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBhdHRyaWJ1dGVzLCBiZWNhdXNlIGluIHNvbWUgY2FzZXMsIHRoZXkgb3ZlcnJpZGUgdGhlIGluaXRpYWwgdmFsdWUuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbi8qKlxuICogUXVpY2sgaGVscGVyIHRvIGNyZWF0ZSBIVE1MIGZyb20gYW55IEhUTUwgZWxlbWVudCBwcm92aWRlZC5cbiAqIFVzZSBsaWtlIGNvbnN0IGRpdiA9IGNyZWF0ZUh0bWw8SFRNTERpdkVsZW1lbnQ+KFwiPGRpdj5Tb21ldGhpbmc8L2Rpdj5cIikgb3IgY29uc3QgY3VzdG9tID0gY3JlYXRlSHRtbChcIjxzb21lLXRhZz48L3NvbWUtdGFnPlwiKS5cbiAqIElmIG11bHRpcGxlIGVsZW1lbnRzIG9yIGEgcGxhaW4gdGV4dCBzdHJpbmcgd2l0aCBubyBIVE1MIGlzIHByb3ZpZGVkLCB0aGVuIGl0IHdpbGwgYmUgd3JhcHBlZCBpbiBhIGRpdiwgc28gaXQgY2FuIGtlZXBcbiAqIHJldHVybmluZyBhbiBIVE1MRWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVIdG1sKGh0bWwsIGlubGluZSA9IGZhbHNlKSB7XG4gICAgbGV0IHdyYXBwZXI7XG4gICAgaWYgKGlubGluZSkge1xuICAgICAgICB3cmFwcGVyID0gc3BhbigoaHRtbCB8fCAnJykudHJpbSgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVzID0gd3JhcHBlci5jaGlsZE5vZGVzO1xuICAgIC8vIE11bHRpcGxlIG5vZGVzLCByZXR1cm4gdGhlIHdyYXBwaW5nIGRpdlxuICAgIC8vIGUuZy4gXCJUaGlzIGlzIGEgPGVtPnRlc3Q8L2VtPlwiIG9yIFwiPGRpdj5IZWxsbzwvZGl2PjxkaXY+V29ybGQ8L2Rpdj5cIlxuICAgIGlmIChub2Rlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIC8vIElmIGp1c3QgYSB0ZXh0bm9kZSAob3IgZW1wdHkpLCByZXR1cm4gYSBzcGFuLiBUZXh0IGlzIGluY29tcGF0aWJsZSB3aXRoIEhUTUxFbGVtZW50IHNvIGNhbid0IHJldHVybiB0aGF0XG4gICAgLy8gZS5nLiBcIkhlbGxvIHdvcmxkXCJcbiAgICBpZiAoIXdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgaWYgKGlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXI7IC8vIFRoaXMgaXMgYSBzcGFuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Bhbih3cmFwcGVyLmlubmVySFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRWxzZSByZXR1cm4gdGhlIHNpbmdsZSBjaGlsZC5cbiAgICAvLyBlLmcuIFwiPGRpdj48ZGl2PkhlbGxvPC9kaXY+PGRpdj5Xb3JsZDwvZGl2PjwvZGl2PlwiXG4gICAgcmV0dXJuIHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5leHBvcnRzLmNyZWF0ZUh0bWwgPSBjcmVhdGVIdG1sO1xuLyoqXG4gKiBRdWljayBoZWxwZXIgdG8gY3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnQgd2l0aCBhbnkgaHRtbC5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQoaHRtbCkge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkaXYoKGh0bWwgfHwgJycpLnRyaW0oKSk7XG4gICAgcmV0dXJuIEV4dHJhY3ROb2RlQ29udGVudF8xLmV4dHJhY3ROb2RlQ29udGVudCh3cmFwcGVyKTtcbn1cbmV4cG9ydHMuY3JlYXRlRnJhZ21lbnQgPSBjcmVhdGVGcmFnbWVudDtcbmZ1bmN0aW9uIGRpdihodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTERpdkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5kaXYgPSBkaXY7XG5mdW5jdGlvbiBzcGFuKGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMpIHtcbiAgICAoeyBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIHJldHVybiBfaW50ZXJuYWwoRWxlbWVudFR5cGVfMS5lbGVtZW50VHlwZS5IVE1MU3BhbkVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5zcGFuID0gc3BhbjtcbmZ1bmN0aW9uIHBhcmFncmFwaChodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcyB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICByZXR1cm4gX2ludGVybmFsKEVsZW1lbnRUeXBlXzEuZWxlbWVudFR5cGUuSFRNTFBhcmFncmFwaEVsZW1lbnQsIGh0bWxPclByb3BlcnRpZXMsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xufVxuZXhwb3J0cy5wYXJhZ3JhcGggPSBwYXJhZ3JhcGg7XG5mdW5jdGlvbiBhbmNob3IoaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgKHsgaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIGhyZWZPclByb3BlcnRpZXMgPSB7fSwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzIH0gPSBLZXl3b3JkQXJndW1lbnRzXzEuS3dhcmcucGFyc2VBcmdzKHsgaHRtbE9yUHJvcGVydGllcywgaHJlZk9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyB9KSk7IC8vIGt3YXJnbGluZVxuICAgIGNvbnN0IHRtcCA9IF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxBbmNob3JFbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICBpZiAodHlwZW9mIGhyZWZPclByb3BlcnRpZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRtcC5ocmVmID0gU3RyaW5nKGhyZWZPclByb3BlcnRpZXMgfHwgJycpO1xuICAgIH1cbiAgICByZXR1cm4gdG1wO1xufVxuZXhwb3J0cy5hbmNob3IgPSBhbmNob3I7XG5mdW5jdGlvbiBidXR0b24oaHRtbE9yUHJvcGVydGllcyA9IFwiXCIsIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMgPSB7fSwgYXR0cmlidXRlcykge1xuICAgICh7IGh0bWxPclByb3BlcnRpZXMgPSBcIlwiLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzID0ge30sIGF0dHJpYnV0ZXMgfSA9IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZy5wYXJzZUFyZ3MoeyBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzIH0pKTsgLy8ga3dhcmdsaW5lXG4gICAgcmV0dXJuIF9pbnRlcm5hbChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxCdXR0b25FbGVtZW50LCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbn1cbmV4cG9ydHMuYnV0dG9uID0gYnV0dG9uO1xuLy8gQ29tbW9uIHByaXZhdGUgZnVuY3Rpb25zIGZvciBvdmVybG9hZHMuIFByZXZlbnRzIGxvdHMgb2YgY29weXBhc3RhLlxuLy8gVGhpcyB3b3JrcyBmb3IgZXZlcnl0aGluZyBiZWNhdXNlIFR5cGVTY3JpcHQgaXMga2VlcGluZyB0aGUgdHlwZXMgdmFsaWQuIEluIHB1cmUgSlMsIGJ1Z3MgY291bGQgYmUgY3JlYXRlZCAoZm9yIGV4YW1wbGUsIHBhc3NpbmcgYW4gaW5uZXJcbi8vIGVsZW1lbnQgdG8gYSBwYXJhZ3JhcGggLi4uIGRpc2FsbG93ZWQgYnkgVFMgYnV0IHRoZSBjb2RlIGlzIHRoZXJlIGluIHRoZSBKUylcbmZ1bmN0aW9uIF9pbnRlcm5hbCh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzID0gXCJcIiwgcHJvcGVydGllc09yQXR0cmlidXRlcyA9IHt9LCBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKGh0bWxPclByb3BlcnRpZXMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX292cjEodHlwZSwgaHRtbE9yUHJvcGVydGllcywgcHJvcGVydGllc09yQXR0cmlidXRlcywgYXR0cmlidXRlcyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBodG1sT3JQcm9wZXJ0aWVzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBfb3ZyMyh0eXBlLCBodG1sT3JQcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzT3JBdHRyaWJ1dGVzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBfb3ZyMih0eXBlLCBTdHJpbmcoaHRtbE9yUHJvcGVydGllcyB8fCAnJyksIHByb3BlcnRpZXNPckF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9vdnIxKHR5cGUsIGlubmVyRWxlbWVudCwgcHJvcHMsIGF0dHJzKSB7XG4gICAgY29uc3QgZSA9IGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIGF0dHJzKTtcbiAgICBlLmFwcGVuZENoaWxkKGlubmVyRWxlbWVudCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBfb3ZyMih0eXBlLCBpbm5lckh0bWwsIHByb3BzLCBhdHRycykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcHJvcHMuaW5uZXJIVE1MID0gaW5uZXJIdG1sO1xuICAgIHJldHVybiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCBhdHRycyk7XG59XG5mdW5jdGlvbiBfb3ZyMyh0eXBlLCBwcm9wcywgYXR0cnMpIHtcbiAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgIHByb3BzLmlubmVySFRNTCA9IHByb3BzLmlubmVySFRNTCB8fCAnJztcbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgYXR0cnMpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIERlbGV0ZSB0aGUgY29udGVudHMgb2YgYW55IGh0bWwgbm9kZS5cbiAqL1xuZnVuY3Rpb24gZGVsZXRlTm9kZUNvbnRlbnQobm9kZSkge1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XG4gICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbn1cbmV4cG9ydHMuZGVsZXRlTm9kZUNvbnRlbnQgPSBkZWxldGVOb2RlQ29udGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBBIGhlbHBlciBmb3IgQ3JlYXRlRWxlbWVudCwgcm91Z2hseSBtYXBwaW5nIHRvIEh0bWxFbGVtZW50IHR5cGVzLCBidXQgbm90IHBlcmZlY3RseSBiZWNhdXNlIGl0J3MgaW1wb3NzaWJsZVxuICogKHRoZXJlJ3Mgbm8gcGVyZmVjdCAxOjEgcmVsYXRpb25zaGlwKS5cbiAqL1xudmFyIGVsZW1lbnRUeXBlO1xuKGZ1bmN0aW9uIChlbGVtZW50VHlwZSkge1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEFuY2hvckVsZW1lbnRcIl0gPSBcImFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxBcmVhRWxlbWVudFwiXSA9IFwiYXJlYVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEF1ZGlvRWxlbWVudFwiXSA9IFwiYXVkaW9cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxCUkVsZW1lbnRcIl0gPSBcImJyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQmFzZUZvbnRFbGVtZW50XCJdID0gXCJiYXNlZm9udFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEJsb2NrUXVvdGVFbGVtZW50XCJdID0gXCJibG9ja3F1b3RlXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQnV0dG9uRWxlbWVudFwiXSA9IFwiYnV0dG9uXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MQ2FudmFzRWxlbWVudFwiXSA9IFwiY2FudmFzXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGF0YUVsZW1lbnRcIl0gPSBcImRhdGFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxEYXRhTGlzdEVsZW1lbnRcIl0gPSBcImRhdGFsaXN0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGlhbG9nRWxlbWVudFwiXSA9IFwiZGlhbG9nXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRGl2RWxlbWVudFwiXSA9IFwiZGl2XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRExpc3RFbGVtZW50XCJdID0gXCJkbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEVtYmVkRWxlbWVudFwiXSA9IFwiZW1iZWRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxGaWVsZFNldEVsZW1lbnRcIl0gPSBcImZpZWxkc2V0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MRm9ybUVsZW1lbnRcIl0gPSBcImZvcm1cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nMUVsZW1lbnRcIl0gPSBcImgxXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzJFbGVtZW50XCJdID0gXCJoMlwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmczRWxlbWVudFwiXSA9IFwiaDNcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIZWFkaW5nNEVsZW1lbnRcIl0gPSBcImg0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSGVhZGluZzVFbGVtZW50XCJdID0gXCJoNVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTEhlYWRpbmc2RWxlbWVudFwiXSA9IFwiaDZcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxIUkVsZW1lbnRcIl0gPSBcImhyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MSW1hZ2VFbGVtZW50XCJdID0gXCJpbWFnZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTElucHV0RWxlbWVudFwiXSA9IFwiaW5wdXRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxMYWJlbEVsZW1lbnRcIl0gPSBcImxhYmVsXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTGVnZW5kRWxlbWVudFwiXSA9IFwibGVnZW5kXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTElFbGVtZW50XCJdID0gXCJsaVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTExpbmtFbGVtZW50XCJdID0gXCJsaW5rXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTWFwRWxlbWVudFwiXSA9IFwibWFwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MTWV0ZXJFbGVtZW50XCJdID0gXCJtZXRlclwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1vZERlbEVsZW1lbnRcIl0gPSBcImRlbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE1vZEluc0VsZW1lbnRcIl0gPSBcImluc1wiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTE9MaXN0RWxlbWVudFwiXSA9IFwib2xcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPYmplY3RFbGVtZW50XCJdID0gXCJvYmplY3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxPcHRHcm91cEVsZW1lbnRcIl0gPSBcIm9wdGdyb3VwXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3B0aW9uRWxlbWVudFwiXSA9IFwib3B0aW9uXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MT3V0cHV0RWxlbWVudFwiXSA9IFwib3V0cHV0XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MUGFyYWdyYXBoRWxlbWVudFwiXSA9IFwicFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFBhcmFtRWxlbWVudFwiXSA9IFwicGFyYW1cIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxQaWN0dXJlRWxlbWVudFwiXSA9IFwicGljdHVyZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFByZUVsZW1lbnRcIl0gPSBcInByZVwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFByb2dyZXNzRWxlbWVudFwiXSA9IFwicHJvZ3Jlc3NcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxRdW90ZUVsZW1lbnRcIl0gPSBcInFcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTY3JpcHRFbGVtZW50XCJdID0gXCJzY3JpcHRcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTZWxlY3RFbGVtZW50XCJdID0gXCJzZWxlY3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTb3VyY2VFbGVtZW50XCJdID0gXCJzb3VyY2VcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxTcGFuRWxlbWVudFwiXSA9IFwic3BhblwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFN0eWxlRWxlbWVudFwiXSA9IFwic3R5bGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNhcHRpb25FbGVtZW50XCJdID0gXCJjYXB0aW9uXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVEYXRhQ2VsbEVsZW1lbnRcIl0gPSBcInRkXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVIZWFkZXJDZWxsRWxlbWVudFwiXSA9IFwidGhcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZUNvbEVsZW1lbnRcIl0gPSBcImNvbFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlQ29sR3JvdXBFbGVtZW50XCJdID0gXCJjb2xncm91cFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRhYmxlRWxlbWVudFwiXSA9IFwidGFibGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVJvd0VsZW1lbnRcIl0gPSBcInRyXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uQm9keUVsZW1lbnRcIl0gPSBcInRib2R5XCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGFibGVTZWN0aW9uRm9vdGVyRWxlbWVudFwiXSA9IFwidGZvb3RcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUYWJsZVNlY3Rpb25IZWFkZXJFbGVtZW50XCJdID0gXCJ0aGVhZFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFRlbXBsYXRlRWxlbWVudFwiXSA9IFwidGVtcGxhdGVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUZXh0QXJlYUVsZW1lbnRcIl0gPSBcInRleHRhcmVhXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVGltZUVsZW1lbnRcIl0gPSBcInRpbWVcIjtcbiAgICBlbGVtZW50VHlwZVtcIkhUTUxUcmFja0VsZW1lbnRcIl0gPSBcInRyYWNrXCI7XG4gICAgZWxlbWVudFR5cGVbXCJIVE1MVUxpc3RFbGVtZW50XCJdID0gXCJ1bFwiO1xuICAgIGVsZW1lbnRUeXBlW1wiSFRNTFZpZGVvRWxlbWVudFwiXSA9IFwidmlkZW9cIjtcbn0pKGVsZW1lbnRUeXBlID0gZXhwb3J0cy5lbGVtZW50VHlwZSB8fCAoZXhwb3J0cy5lbGVtZW50VHlwZSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogR2V0IHRoZSBjb250ZW50cyBvZiBhbnkgaHRtbCBub2RlIGFzIGEgRG9jdW1lbnRGcmFnbWVudC5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdE5vZGVDb250ZW50KG5vZGUpIHtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xuICAgIHJldHVybiByYW5nZS5leHRyYWN0Q29udGVudHMoKTtcbn1cbmV4cG9ydHMuZXh0cmFjdE5vZGVDb250ZW50ID0gZXh0cmFjdE5vZGVDb250ZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBDcmVhdGVFbGVtZW50XzEgPSByZXF1aXJlKFwiLi4vSHRtbC9DcmVhdGVFbGVtZW50XCIpO1xuY29uc3QgRGVsZXRlTm9kZUNvbnRlbnRfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0RlbGV0ZU5vZGVDb250ZW50XCIpO1xuY29uc3QgRWxlbWVudFR5cGVfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VsZW1lbnRUeXBlXCIpO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vQ29sbGVjdGlvbnMvQXJyYXlVdGlsaXRpZXNcIik7XG5jb25zdCBDb25zdHJ1Y3RhYmxlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0NvbnN0cnVjdGFibGVcIik7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL0tleXdvcmRBcmd1bWVudHNcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogSWYgeW91IGNsaWNrIGEgbGluayBpbiBhIHJlYWwgd2ViIHNpdGUsIHRoZSBicm93c2VyIGFza3MgdGhlIHNlcnZlciBmb3IgYSBwYWdlIGFuZCBpdCByb3V0ZXMgeW91IHRvIHRoZSByZWxldmFudFxuICogcGFnZS4gQnV0IGlmIHlvdSBoYXZlIGEgc2luZ2xlIHBhZ2UgYXBwIHJ1bm5pbmcgb24gYSBmaWxlLCB3aXRoIG5vIHdlYiBzZXJ2ZXIsIGxpa2UgdGhlIG9uZSB0aGlzIGZyYW1ld29ya1xuICogd2FzIGJ1aWx0IGZvciwgeW91IG5lZWQgc29tZXRoaW5nIHRvIHNpbXVsYXRlIHRoYXQuXG4gKlxuICogVGhpcyBjbGFzcyBjbGVhcnMgdGhlIHJvdXRlIGNvbnRhaW5lciwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gYmUgYSBzdGF0aWMgY29udGFpbmVyIGluIHRoZSB3cmFwcGVyIEhUTUwgcGFnZSwgb3IgdGhlIGJvZHkuXG4gKiBXaGVuIHlvdSBnaXZlIGl0IHRoZSByZWxldmFudCByb3V0ZSwgaXQgZXhlY3V0ZXMgdGhlIGNhbGxiYWNrIG9yIHJldHVybnMgdGhlIHZpZXcvSFRNTCBlbGVtZW50IHlvdSBkZWZpbmVkIGZvciB0aGUgcm91dGUsXG4gKiBhbmQgc3RpY2tzIGl0IGluc2lkZSB0aGUgY29udGFpbmVyLiBUaGUgZWxlbWVudCByZXR1cm5lZCBjYW4gYmUgd3JhcHBlZCBpbiBhIGxheW91dCB2aWV3LCBsaWtlIGluIEFTUC5OZXQuXG4gKlxuICogVGhpcyBpcyBhIHNpbXBsZSB2ZXJzaW9uLCB3aXRob3V0IHRoZSByZWN1cnNpdmUgcm91dGVzIGZvdW5kIGluIHRoZSBhZHZhbmNlZCByb3V0ZXIuIEl0IHdhcyBiYXNlZCBtb3JlIG9uIEFTUC5OZXQgb3Igbm9kZS5qc1xuICogcm91dGluZywgd2hlcmUgeW91IGhhdmUgYSBmbGF0IHNldCBvZiByb3V0ZXMgYW5kIG9uY2UgeW91IGZpbmQgYSByb3V0ZSwgeW91J3JlIGRvbmUuXG4gKi9cbmNsYXNzIFBhZ2VSb3V0ZXIge1xuICAgIHN0YXRpYyBnZXQgYWxsUm91dGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IG1hdGNoZWRSb3V0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoZWRSb3V0ZSB8fCB7IHJvdXRlOiAnJywgcGFyYW1zOiBuZXcgTWFwKCksIGNvbmZpZzogeyByb3V0ZTogJycgfSB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF0Y2hlZFJvdXRlLnBhcmFtcztcbiAgICB9XG4gICAgc3RhdGljIGdldCBoaXN0b3J5TWF4TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeU1heExlbmd0aDtcbiAgICB9XG4gICAgc3RhdGljIHNldCBoaXN0b3J5TWF4TGVuZ3RoKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9oaXN0b3J5Lmxlbmd0aCA+IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5Lmxlbmd0aCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpc3RvcnlNYXhMZW5ndGggPSB2YWx1ZTtcbiAgICB9XG4gICAgc3RhdGljIGdldCBoaXN0b3J5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcbiAgICB9XG4gICAgc3RhdGljIHNldCBub3RGb3VuZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ub3RGb3VuZCA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIG11c3QgYmUgY2FsbGVkIGZpcnN0IGJlZm9yZSB1c2luZyBpdCwgYmVjYXVzZSBKUyBkb2Vzbid0IGhhdmUgc3RhdGljIGNvbnN0cnVjdG9ycyBsaWtlIEMjLiBJdCBzZXRzIHVwIHRoZVxuICAgICAqIHJvdXRlIGNvbnRhaW5lciwgY3VzdG9tIGVsZW1lbnRzLCBhbmQgYWxzbyBhbGxvd3Mgb25lLXN0ZXAgY29uZmlndXJhdGlvbiBvZiBzZXZlcmFsIG90aGVyIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBBY2NlcHRzIEtleXdvcmQgQXJndW1lbnRzLlxuICAgICAqL1xuICAgIHN0YXRpYyBjb25maWd1cmUocm91dGVzID0gW10sIGRlZmF1bHRMYXlvdXQsIGRlZmF1bHRTdGF0aWNMYXlvdXQsIG5vdEZvdW5kLCBkZWZhdWx0Um91dGUsIHVybFJvdXRpbmdFbmFibGVkID0gdHJ1ZSkge1xuICAgICAgICAoeyByb3V0ZXMsIGRlZmF1bHRMYXlvdXQsIGRlZmF1bHRTdGF0aWNMYXlvdXQsIG5vdEZvdW5kLCBkZWZhdWx0Um91dGUsIHVybFJvdXRpbmdFbmFibGVkID0gdHJ1ZSB9ID0gS2V5d29yZEFyZ3VtZW50c18xLkt3YXJnLnBhcnNlQXJncyh7IHJvdXRlcywgZGVmYXVsdExheW91dCwgZGVmYXVsdFN0YXRpY0xheW91dCwgbm90Rm91bmQsIGRlZmF1bHRSb3V0ZSwgdXJsUm91dGluZ0VuYWJsZWQgfSkpOyAvLyBrd2FyZ2xpbmVcbiAgICAgICAgdGhpcy5fY29uZmlndXJlZCA9IHRydWU7XG4gICAgICAgIGlmIChub3RGb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5fbm90Rm91bmQgPSBub3RGb3VuZDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHJ0ZSBvZiByb3V0ZXMpIHtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0TGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgcnRlLmxheW91dCA9IHJ0ZS5sYXlvdXQgfHwgZGVmYXVsdExheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUoZGVmYXVsdFN0YXRpY0xheW91dCkgJiYgTm9uZVR5cGVfMS5pc05vbmUocnRlLnN0YXRpY0xheW91dCkpIHtcbiAgICAgICAgICAgICAgICBydGUuc3RhdGljTGF5b3V0ID0gZGVmYXVsdFN0YXRpY0xheW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkUm91dGUocnRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsUm91dGluZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIEJ5IGRlZmF1bHQsIGFsbG93cyBnb2luZyB0byBhIG5ldyBwYWdlIGJ5IGNoYW5naW5nIHRoZSBVUkwgaW5zdGVhZCBvZiBoYXZpbmcgdG8gaXNzdWUgcm91dGUoKSBjb21tYW5kcy5cbiAgICAgICAgICAgIHRoaXMudHVybk9uVXJsUm91dGluZygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm91dGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwYWdlLXJvdXRlcicpIHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ3BhZ2Utcm91dGVyJykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdwYWdlLXJvdXRlcicsIERpdlBhZ2UsIHsgZXh0ZW5kczogJ2RpdicgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2xheW91dC1ib2R5JykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdsYXlvdXQtYm9keScsIERpdkxheW91dCwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbm90LWZvdW5kJykpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdub3QtZm91bmQnLCBEaXZOb3RGb3VuZCwgeyBleHRlbmRzOiAnZGl2JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBjdXN0b21FbGVtZW50cyBpc24ndCBvZmZpY2lhbGx5IHBhcnQgb2YgYW4gRVMgdmVyc2lvbiB5ZXQgc28gd29uJ3Qgd29yayBldmVuIGluIHNvbWUgcmVjZW50LWlzaCBicm93c2Vyc1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdWx0Um91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFJvdXRlKGRlZmF1bHRSb3V0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gTm90ZTogdGhlcmUgaXMgbm8gcmVtb3ZlUm91dGUuIFRoZXJlIGNvdWxkIGJlLCBidXQgaXQncyBuZXZlciBuZWVkZWQuXG4gICAgc3RhdGljIGFkZFJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGxldCByb3V0ZXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJvdXRlLnJvdXRlKSkge1xuICAgICAgICAgICAgcm91dGVzID0gcm91dGUucm91dGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByb3V0ZXMgPSBbcm91dGUucm91dGVdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcnRlIG9mIHJvdXRlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JvdXRlcy5maW5kKHEgPT4gcS5yb3V0ZSA9PT0gcnRlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvdXRlIGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IE9iamVjdC5hc3NpZ24oe30sIHJvdXRlKTtcbiAgICAgICAgICAgIHRtcC5yb3V0ZSA9IHJ0ZTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcy5wdXNoKHRtcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgbGlua2VkIHRvIGEgcGFydGljdWxhciBwYWdlIChvbiB0aGUgaGFzaCksIGdvIHRvIGl0LiBFbHNlLCBnbyB0byB0aGUgcm91dGUgc3BlY2lmaWVkLlxuICAgICAqL1xuICAgIHN0YXRpYyBkZWZhdWx0Um91dGUocm91dGUpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICAgICAgICBQYWdlUm91dGVyLnJvdXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBQYWdlUm91dGVyLnJvdXRlKHJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcm91dGUocm91dGUsIHVwZGF0ZVVybCA9IHRydWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb25maWd1cmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhZ2VSb3V0ZXIgbm90IGNvbmZpZ3VyZWQuIENhbGwgY29uZmlndXJlKCkgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgICAgLy8gQWxsb3cgYWN0dWFsIGxpbmtzIHZpYSB0aGUgaGFzaC4gSGFzaCBsaW5rcyBkb24ndCBmb3JjZSBhIHBhZ2UgcmVsb2FkIGFuZCB0aGV5IHdvcmsgdy9vIGEgd2ViIHNlcnZlci5cbiAgICAgICAgICAgIC8vIFRvIGF2b2lkIGhhdmluZyB0byBjYWxsIHJvdXRlKCkgbWFudWFsbHksIHlvdSBtdXN0IGNhbGwgdHVybk9uVXJsUm91dGluZygpO1xuICAgICAgICAgICAgcm91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zbGljZSgxKTtcbiAgICAgICAgICAgIC8vIFRoZXJlIGlzIGEgcHJvYmxlbSwgd2hpY2ggaXMgdGhhdCBzZXR0aW5nIHRoZSBoYXNoIHdpbGwgdHJpZ2dlciBBTk9USEVSIHJvdXRlIGNoYWluZ2UgdmlhIHRoZSBoYXNoY2hhbmdlIG9wZXJhdGlvbi5cbiAgICAgICAgICAgIC8vIFJlbW92aW5nIHRoZSBoYXNoIGNoYW5nZSBhbmQgdGhlbiByZXN0b3JpbmcgaXQgbGF0ZXIgZG9lcyBub3RoaW5nLiBJdCdzIHN0aWxsIHRyaWdnZXJlZC5cbiAgICAgICAgICAgIC8vIFRoaXMgcmVxdWlyZXMgaGFja3dvcmsuIEV2ZW4gdGhlIHNpbXBsZSByb3V0ZXIgaGFzIG1vcmUgaGFja3MgdGhhbiBJIGxpa2UuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIHdhcyB0cmlnZ2VyZWQgYnkgYSBoYXNoIGNoYW5nZSBhbmQgdGhlIHJvdXRlIGlzIHRoZSBzYW1lLCB0aGVuIGRvbid0IGRvIGFueXRoaW5nLlxuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGxhc3Qgcm91dGUgc28gdGhhdCBpdCBkb2Vzbid0IGludGVyZmVyZSB3aXRoIHRoZSBuZXh0IGhhc2ggY2hhbmdlLlxuICAgICAgICAgICAgaWYgKHJvdXRlID09PSB0aGlzLl9sYXN0Um91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVwZGF0ZVVybCkge1xuICAgICAgICAgICAgLy8gSWYgYSByb3V0ZSBpcyBzZW50IGluLCB0aGVuIHNldCB0aGUgaGFzaC5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcm91dGU7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Um91dGUgPSByb3V0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RSb3V0ZSA9IHJvdXRlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtYXRjaDtcbiAgICAgICAgbGV0IHNlYXJjaFJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IHJ0ZSBvZiB0aGlzLl9yb3V0ZXMpIHtcbiAgICAgICAgICAgIHNlYXJjaFJlc3VsdCA9IHRoaXMuX3Rlc3RSb3V0ZShydGUucm91dGUsIHJvdXRlIHx8ICcnKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHJ0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFJvdXRlICR7cm91dGV9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlck5vdEZvdW5kKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldmlvdXNSb3V0ZSA9ICh0aGlzLl9tYXRjaGVkUm91dGUgfHwge30pLmNvbmZpZztcbiAgICAgICAgdGhpcy5fbWF0Y2hlZFJvdXRlID0geyByb3V0ZSwgcGFyYW1zOiBzZWFyY2hSZXN1bHQgfHwgbmV3IE1hcCgpLCBjb25maWc6IG1hdGNoIH07XG4gICAgICAgIC8vIEFkZCByb3V0ZSB0byBoaXN0b3J5IGlmIGl0J3MgZGlmZmVyZW50IGZyb20gdGhlIHByZXZpb3VzIGxhdGVzdCBoaXN0b3J5XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID09PSAwIHx8IHRoaXMuaGlzdG9yeVt0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMV0gIT09IHJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2gocm91dGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gdGhpcy5oaXN0b3J5TWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvdXRlR3VhcmRzID0gW107XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoLnJvdXRlR3VhcmRzKSkge1xuICAgICAgICAgICAgcm91dGVHdWFyZHMgPSBtYXRjaC5yb3V0ZUd1YXJkcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXRjaC5yb3V0ZUd1YXJkcykge1xuICAgICAgICAgICAgcm91dGVHdWFyZHMucHVzaChtYXRjaC5yb3V0ZUd1YXJkcyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCByZyBvZiByb3V0ZUd1YXJkcykge1xuICAgICAgICAgICAgY29uc3QgdGVzdCA9IHJnLmNoZWNrVmFsaWQobWF0Y2gpO1xuICAgICAgICAgICAgaWYgKHRlc3QgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JvdXRlIHBlcm1pc3Npb24gZGVuaWVkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlclJvdXRlKG1hdGNoLCBwcmV2aW91c1JvdXRlKTtcbiAgICB9XG4gICAgc3RhdGljIGJhY2soKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzbid0IGFueSBoaXN0b3J5IHRvIGdvIGJhY2sgdG8sIGRvbid0IGdvIGJhY2suXG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpc3RvcnkucG9wKCk7IC8vIEN1cnJlbnQgcm91dGUgc2l0cyBhdCB0aGUgdG9wIG9mIHRoZSBzdGFja1xuICAgICAgICBjb25zdCByb3V0ZSA9IHRoaXMuX2hpc3RvcnkucG9wKCk7IC8vIHByZXZpb3VzIHJvdXRlXG4gICAgICAgIGlmIChyb3V0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlKHJvdXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgdHVybk9uVXJsUm91dGluZygpIHtcbiAgICAgICAgdGhpcy5faGFzaENoYW5nZSA9IChldnQpID0+IHsgdGhpcy5yb3V0ZSgpOyB9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX2hhc2hDaGFuZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgX3Rlc3RSb3V0ZShyb3V0ZVN0cmluZywgdXJsU3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgaWYgKCFyb3V0ZVN0cmluZyB8fCAhdXJsU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcm91dGVTdHJpbmcgPSByb3V0ZVN0cmluZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAocm91dGVTdHJpbmcuZW5kc1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgcm91dGVTdHJpbmcgPSByb3V0ZVN0cmluZy5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybFN0cmluZy5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlQXJyYXkgPSByb3V0ZVN0cmluZy5zcGxpdCgnLycpO1xuICAgICAgICBjb25zdCB1cmxBcnJheSA9IHVybFN0cmluZy5zcGxpdCgnLycpO1xuICAgICAgICAvLyBTYW1lIG51bWJlciBvZiAvIGNoYXJhY3RlcnMgcmVxdWlyZWQuXG4gICAgICAgIGlmIChyb3V0ZUFycmF5Lmxlbmd0aCAhPT0gdXJsQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBbcm91dGVTZWdtZW50LCB1cmxTZWdtZW50XSBvZiBBcnJheVV0aWxpdGllc18xLnppcChyb3V0ZUFycmF5LCB1cmxBcnJheSkpIHtcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnMgYXJlIGFsbG93ZWQuIE9wdGlvbmFsIHBhcmFtZXRlcnMgYXJlIG5vdC5cbiAgICAgICAgICAgIC8vIFRoZSByZWFzb24gZm9yIG5vIG9wdGlvbmFsIHBhcmFtZXRlcnMgaXMgdGhhdCBmaW5kaW5nIGEgbWF0Y2ggYmV0d2VlbiAvYS86P3BhcmFtL2IgYW5kIC9hL2IgaXMgdG9vIGNvbXBsZXguXG4gICAgICAgICAgICAvLyBJcyAnYicgYSBwYXJhbSB2YWx1ZSBvciBwYXJ0IG9mIHRoZSByb3V0ZS4gQmFzaWNhbGx5LCBvcHRpb25hbCBwYXJhbWV0ZXJzIG9ubHkgd29yayBhdCB0aGUgcm91dGUgZW5kLlxuICAgICAgICAgICAgLy8gSSBub3RpY2VkIHRoYXQgQVNQLk5FVCB3b3JrcyB0aGF0IHdheSBhbmQgSSBmb3VuZCBpdCBjb25mdXNpbmcgdGhhdCBvcHRpb25hbCBwYXJhbWV0ZXJzIG9ubHkgd29yayBhdCB0aGUgZW5kLlxuICAgICAgICAgICAgLy8gSnVzdCBjcmVhdGUgYSBuZXcgcm91dGUgd2l0aCB0aGUgb3B0aW9uYWwgcGFyYW0gbGVmdCBvdXQuXG4gICAgICAgICAgICBpZiAocm91dGVTZWdtZW50LnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gcm91dGVTZWdtZW50LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGlmICghbmFtZS5pbmNsdWRlcygnPScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJvdXRlICR7cm91dGVTdHJpbmd9IGNvbnRhaW5zIGR1cGxpY2F0ZXMgb2YgdGhlIHNhbWUgcGFyYW1ldGVyLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQobmFtZSwgdXJsU2VnbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdGhlIG1hcHBlZCBzdGF0aWMgcGFyYW0gY2FzZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gbmFtZS5zcGxpdCgnPScpWzFdO1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gbmFtZS5zcGxpdCgnPScpWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSB1cmxTZWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUm91dGUgJHtyb3V0ZVN0cmluZ30gY29udGFpbnMgZHVwbGljYXRlcyBvZiB0aGUgc2FtZSBwYXJhbWV0ZXIuYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldChuYW1lLCB1cmxTZWdtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb3V0ZVNlZ21lbnQgIT09IHVybFNlZ21lbnQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlbmRlclJvdXRlKHJvdXRlLCBwcmV2aW91cykge1xuICAgICAgICAvLyBDYWxsaW5nIFBhZ2VSb3V0ZXIucm91dGUoJ3RoZSBzYW1lIHVybCcpIHdpbGwgcmVsb2FkIHRoZSBjb250ZW50cyBmcm9tIHNjcmF0Y2guXG4gICAgICAgIC8vIEFkanVzdGluZyB3aW5kb3cubG9jYXRpb24gd2lsbCBkbyBub3RoaW5nIGlmIHRoZSByb3V0ZSBpcyB0aGUgc2FtZS5cbiAgICAgICAgLy8gSSB0aGluayB0aGlzIGlzIGZpbmUsIGFmdGVyIHN0cnVnZ2xpbmcgaW4gYW5ndWxhciB0byByZWxvYWQgdGhlIHBhZ2UgYW5kIGZpbmRpbmdcbiAgICAgICAgLy8gaXQgbXVjaCBoYXJkZXIuXG4gICAgICAgIC8vIE5vdGUgaWYgeW91IGNoYW5nZSB0aGUgbG9jYXRpb24gYmFyLCBDaHJvbWUgZm9yY2VzIGEgcmVsb2FkIG9mIFByb2dyYW0udHMsIG5vdGhpbmcgeW91IGNhbiBkb1xuICAgICAgICAvLyBhYm91dCBpdCBiZWNhdXNlIENocm9tZSBpcyB0aGUgb25lIHRoYXQgZGlzY2FyZGVkIHlvdXIgc3RhdGUuXG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLnJvdXRlQ29udGFpbmVyO1xuICAgICAgICBjb25zdCBrZWVwTGF5b3V0ID0gcm91dGUubGF5b3V0ICYmIHByZXZpb3VzICYmIHJvdXRlLnN0YXRpY0xheW91dCAmJiByb3V0ZS5sYXlvdXQgPT09IHByZXZpb3VzLmxheW91dDtcbiAgICAgICAgaWYgKCFrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgY29udGVudHMgb2YgcGFnZS1yb3V0ZXJcbiAgICAgICAgICAgIERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2VlcExheW91dCkge1xuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGF5b3V0LWJvZHknKTtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCc8bGF5b3V0LWJvZHk+IGVsZW1lbnQgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm91dGUubGF5b3V0KSB7XG4gICAgICAgICAgICBsZXQgbGF5b3V0VmlldztcbiAgICAgICAgICAgIGlmIChDb25zdHJ1Y3RhYmxlXzEuY29uc3RydWN0b3JUeXBlR3VhcmQocm91dGUubGF5b3V0KSkge1xuICAgICAgICAgICAgICAgIGxheW91dFZpZXcgPSBuZXcgcm91dGUubGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyb3V0ZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0VmlldyA9IHJvdXRlLmxheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxheW91dFZpZXcgJiYgdmlld1R5cGVHdWFyZChsYXlvdXRWaWV3KSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYXlvdXRWaWV3LmNvbnRlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobGF5b3V0Vmlldykge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYXlvdXRWaWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xheW91dC1ib2R5Jyk7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignPGxheW91dC1ib2R5PiBlbGVtZW50IG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZWVwTGF5b3V0KSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgY29udGVudHMgb2YgbGF5b3V0LWJvZHkgKGJ1dCBrZWVwIGxheW91dClcbiAgICAgICAgICAgIERlbGV0ZU5vZGVDb250ZW50XzEuZGVsZXRlTm9kZUNvbnRlbnQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlldztcbiAgICAgICAgaWYgKENvbnN0cnVjdGFibGVfMS5jb25zdHJ1Y3RvclR5cGVHdWFyZChyb3V0ZS5wYXlsb2FkKSkge1xuICAgICAgICAgICAgdmlldyA9IG5ldyByb3V0ZS5wYXlsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJvdXRlLnBheWxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZpZXcgPSByb3V0ZS5wYXlsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocm91dGUucGF5bG9hZCkge1xuICAgICAgICAgICAgdmlldyA9IHJvdXRlLnBheWxvYWQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3ICYmIHZpZXdUeXBlR3VhcmQodmlldykpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWV3LmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWV3KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2aWV3VHlwZUd1YXJkKHRlc3QpIHtcbiAgICAgICAgICAgIGlmIChcImNvbnRlbnRcIiBpbiB0ZXN0ICYmIHRlc3QuY29udGVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9yZW5kZXJOb3RGb3VuZCgpIHtcbiAgICAgICAgRGVsZXRlTm9kZUNvbnRlbnRfMS5kZWxldGVOb2RlQ29udGVudCh0aGlzLnJvdXRlQ29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5yb3V0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChDcmVhdGVFbGVtZW50XzEuY3JlYXRlRWxlbWVudChFbGVtZW50VHlwZV8xLmVsZW1lbnRUeXBlLkhUTUxEaXZFbGVtZW50LCB7IGlkOiAnbm90LWZvdW5kJywgaW5uZXJIVE1MOiB0aGlzLl9ub3RGb3VuZCB8fCBcIlF1b3RoIHRoZSBSYXZlbiwgNDA0XCIgfSkpO1xuICAgIH1cbn1cblBhZ2VSb3V0ZXIucm91dGVDb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xuUGFnZVJvdXRlci5fY29uZmlndXJlZCA9IGZhbHNlO1xuUGFnZVJvdXRlci5fcm91dGVzID0gW107XG5QYWdlUm91dGVyLl9oaXN0b3J5ID0gW107XG5QYWdlUm91dGVyLl9oaXN0b3J5TWF4TGVuZ3RoID0gNTA7XG5leHBvcnRzLlBhZ2VSb3V0ZXIgPSBQYWdlUm91dGVyO1xuLy8gdHNsaW50OmRpc2FibGU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbi8vIEEgY2xhc3MgaXMgcmVxdWlyZWQgYnV0IHlvdSdyZSBub3QgYWxsb3dlZCB0byB1c2UgdGhlIGV4aXN0aW5nIGNsYXNzIGJlY2F1c2UgaXQgY2FuJ3Rcbi8vIGJlIGNvbnN0cnVjdGVkIChpbnZhbGlkIGNvbnN0cnVjdG9yKS4gQW5kIHlvdSBhcmUgT05MWSBhbGxvd2VkIHRvIGV4dGVuZCBIVE1MRWxlbWVudC5cbi8vIEFORCB0aGV5IG11c3QgYmUgdW5pcXVlLlxuY2xhc3MgRGl2UGFnZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG59XG5jbGFzcyBEaXZMYXlvdXQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuY2xhc3MgRGl2Tm90Rm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJldHVybiBlbGVtZW50cyBvZiBhcnJheSBhIGxpbmVkIHVwIHdpdGggZWxlbWVudHMgb2YgYXJyYXkgYi4gQm90aCBhcnJheXMgZG9uJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoID49IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFtlbGVtZW50LCBiW2luZGV4XV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2FbaW5kZXhdLCBiXSk7XG4gICAgfVxufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vKipcbiAqIFJldHVybiBhIGNhcnRlc2lhbiBqb2luIChjcm9zcyBqb2luKSBiZXR3ZWVuIGFycmF5cyBhIGFuZCBiLlxuICovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYikge1xuICAgIC8vLyB0eXBlc2NyaXB0IHByZXZlbnRzIGEgZGlyZWN0IHVzZSBvZiBjb25jYXQsIHNvIGRvIHRoaXMgbWFudWFsbHkgd2l0aCBhIGxvb3BcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGEpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmIubWFwKHEgPT4gW2l0ZW0sIHFdKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5jYXJ0ZXNpYW4gPSBjYXJ0ZXNpYW47XG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZ2Ugb2YgaW50ZWdlcnMsIGNvdW50aW5nIHVwIGJ5IDEsIGZvciB0aGUgZ2l2ZW4gbGVuZ3RoLiBTdG9sZW4gZnJvbSBQeXRob24uXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG59XG5leHBvcnRzLnJhbmdlID0gcmFuZ2U7XG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGl0ZW1zIGFuZCBvdGhlciBhcnJheXMsIGZsYXR0ZW4gdGhlbSBvdXQgaW50byBhIHNpbmdsZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24qIHRyYXZlcnNlKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHlpZWxkIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGFycikge1xuICAgICAgICAgICAgeWllbGQqIHRyYXZlcnNlKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIGNvbnN0cnVjdG9yIHRoYXQgaXMgbmV3YWJsZS5cbiAqIFRISVMgQ0FOTk9UIERFVEVDVCBBTk9OWU1PVVMgQ0xBU1NFUy4gU29ycnksIGJ1dCBKUyBkb2Vzbid0IGhhdmUgYSBub24tZGVzdHJ1Y3RpdmUgd2F5XG4gKiB0byBjaGVjayBpZiBhbnkgZnVuY3Rpb24gaXMgYSBjb25zdHJ1Y3RvciBvdGhlciB0aGFuIHRvIHRyeSB0byBuZXcoKSBpdCBhbmQgYmxvdyB1cC9ub3QgYmxvdyB1cC5cbiAqIFRoaXMgZnVuY3Rpb24gZGVwZW5kcyBvbiB0aGVyZSBiZWluZyBhIHByb3RvdHlwZSB3aXRoIGEgbmFtZWQgY29uc3RydWN0b3IuXG4gKi9cbmZ1bmN0aW9uIGNvbnN0cnVjdG9yVHlwZUd1YXJkKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLnByb3RvdHlwZSAmJiBvYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5leHBvcnRzLmNvbnN0cnVjdG9yVHlwZUd1YXJkID0gY29uc3RydWN0b3JUeXBlR3VhcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IElzSW50ZWdlcl8xID0gcmVxdWlyZShcIi4uL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuLyoqXG4gKiBUaGlzIG1vZHVsZSBwcm92aWRlcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBrZXl3b3JkIGFyZ3VtZW50cywgYXMgc2VlbiBpbiBQeXRob24gYW5kIEMjLiBJdCBtYWtlcyBjb25maWd1cmFibGVcbiAqIGZ1bmN0aW9ucyBzbyBtdWNoIHF1aWNrZXIgYW5kIGVhc2llciB0aGFuIGZsYXQgYXJndW1lbnRzIChmb3JjaW5nIHlvdSB0byBwdXQgdW5kZWZpbmVkIG1hbnVhbGx5IGluIGRpZmZlcmVudFxuICogc2xvdHMpIG9yIG9wdGlvbnMgb2JqZWN0cyAodGFrZXMgbW9yZSB0aW1lIHRvIHByb2R1Y2UsIGVzcGVjaWFsbHkgaWYgeW91IG5lZWQgdG8gbmV3IGl0IHVwKS5cbiAqXG4gKiBDYWxsIGZ1bmN0aW9ucyBoYXZpbmcga2V5d29yZCBhcmd1bWVudHMgdXNpbmcgdGhpcyBzeW50YXg6XG4gKiBjYWxsbWUoYXJnMSwgYXJnMiwga3coJ3NvbWV0aGluZycsIGt3MSksIGt3KCdzb21ldGhpbmdFbHNlJywga3cyKSlcbiAqXG4gKiBUbyBtYWtlIHRoZW0gd29yaywgaW4gdGhlIGZ1bmN0aW9uIGl0c2VsZiwgeW91IG5lZWQgdG8gY29weSBhbmQgcGFzdGUuIEZvciBleGFtcGxlOlxuICogKHsgYXJnMSwgYXJnMiwgc29tZXRoaW5nLCBzb21ldGhpbmdFbHNlIH0gPSBLd2FyZy5wYXJzZSh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9KSk7XG4gKi9cbmNsYXNzIEt3YXJnIHtcbiAgICBjb25zdHJ1Y3RvcihhLCBiKSB7XG4gICAgICAgIGlmICghYSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IGE7XG4gICAgICAgIHRoaXMudmFsdWUgPSBiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1lbWJlciB0aGlzIHRlbXBsYXRlOlxuICAgICAqICh7IH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyB9KSk7XG4gICAgICogSW5jbHVkZSBkZWZhdWx0IHZhbHVlcyBpbiB0aGUgZmlyc3Qgb2JqZWN0LCBub3QgdGhlIHNlY29uZC5cbiAgICAgKlxuICAgICAqIElmIHlvdSB3YW50IHRvIGNhcHR1cmUgcmVzdCBwYXJhbWV0ZXJzLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkcmVzdCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7ICwgLi4ucmVzdCB9KSk7XG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCBhbGxvd1Vua25vd25LZXl3b3JkIHRvIGJlIHRydWUsIHVzZSB0aGlzOlxuICAgICAqICh7ICQka3ckJCB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSwgdHJ1ZSkpO1xuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUFyZ3MoYXJncywgYWxsb3dVbmtub3duS2V5d29yZCA9IGZhbHNlKSB7XG4gICAgICAgIC8vIEl0IHdvdWxkIGJlIG5pY2UgaWYgdGhpcyBjb3VsZCB0YWtlIHRoZSBhcmd1bWVudHMgb2JqZWN0LCBidXQgc2FkbHkgYXJndW1lbnRzIHN0b3JlcyBvbmx5IGFuIGFycmF5IG9mIHZhbHVlcyxcbiAgICAgICAgLy8gbm8ga2V5cy4gSWYgSlMgd2VyZSBzYW5lLCBpdCB3b3VsZCBiZSBhIE1hcCwgbm90IGFuIGFycmF5LiBUd28gc3RlcHMgZm9yd2FyZCwgb25lIHN0ZXAgYmFjay5cbiAgICAgICAgLy8gUGFyc2luZyB0aGUgc3RyaW5nIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvbiBpcyBub3QgbXkgY3VwIG9mIHRlYSwgc28ganVzdCBuby5cbiAgICAgICAgY29uc3Qgb2JqID0ge307XG4gICAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncyk7XG4gICAgICAgIC8vIEdldCBkYXRhIGJ5IGFyZ3VtZW50IG9yZGVyXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialthcmddID0gYXJnc1thcmddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGt3dmFyID0ge307XG4gICAgICAgIG9ialsnJCRrdyQkJ10gPSBrd3ZhcjtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHJlc3QgcGFyYW1ldGVycy5cbiAgICAgICAgLy8gSSB3YXMgZ29pbmcgdG8gaGF2ZSB0aGlzIG9uL29mZiBjb25maWd1cmFibGUsIGJ1dCBpdCBzaG91bGRuJ3QgaHVydCBwZXJmb3JtYW5jZS5cbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIG9ialsnJHJlc3QkJ10gPSBhcnI7XG4gICAgICAgIC8vIFJlc3QgcGFyYW1ldGVycyBhcmUgc3RvcmVkIGFzIGFycmF5IGtleXMsIHsgJzAnOiBhLCAnMSc6IGIsICdub25SZXN0JzogJ3NvbWV0aGluZyBlbHNlJ31cbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJncykuZmlsdGVyKGYgPT4gSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoZikpKSB7XG4gICAgICAgICAgICBpZiAoIShhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChhcmdzW2FyZ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXdvcmRzVXNlZCA9IHt9O1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBrZXl3b3JkIG5hbWVcbiAgICAgICAgLy8gSGF2ZSB0byBpdGVyYXRlIHRoZSBsaXN0IHR3aWNlLCB0byBhdm9pZCB3aXBpbmcgb3V0IGRhdGEgaWYgdGhlIG9yZGVyIGlzIHN3YXBwZWRcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmdzW2FyZ10gaW5zdGFuY2VvZiBLd2FyZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ialt0bXAubmFtZV0gPSB0bXAudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsb3dVbmtub3duS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAga3d2YXJbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBHb3QgYW4gdW5leHBlY3RlZCBrZXl3b3JkIGFyZ3VtZW50ICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG1wLm5hbWUgaW4ga2V5d29yZHNVc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IG11bHRpcGxlIHZhbHVlcyBmb3Iga2V5d29yZCBhcmd1bWVudCArICcke3RtcC5uYW1lfSdgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5d29yZHNVc2VkW3RtcC5uYW1lXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgLy8gVHVybiBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXl3b3JkIGFyZ3VtZW50cy5cbiAgICAvLyBOZWVkcyB0byByZXR1cm4gYW55W10gYmVjYXVzZSBpdCdzIGdvaW5nIHRvIGJlIHNob3ZlZCBpbnRvIGFyYml0cmFyeSBhcmd1bWVudCBsaXN0c1xuICAgIHN0YXRpYyB1bnBhY2soYXJncykge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goa3coYXJnLCBhcmdzW2FyZ10pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgaXNNYXRjaChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSA9PT0ga2V5O1xuICAgIH1cbn1cbmV4cG9ydHMuS3dhcmcgPSBLd2FyZztcbmZ1bmN0aW9uIGt3KGEsIGIpIHtcbiAgICBpZiAoIWEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIE92ZXJsb2FkIDFcbiAgICAgICAgcmV0dXJuIG5ldyBLd2FyZyhhLCBiKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgICAvLyBPdmVybG9hZCAyXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYVswXSwgYVsxXSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBPdmVybG9hZCAzXG4gICAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyLlxuICAgICAgICBjb25zdCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGEpO1xuICAgICAgICBpZiAoIXByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmd1bWVudCBudWxsIGV4Y2VwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwIG9iamVjdDogbXVsdGlwbGUga2V5cycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcocHJvcHNbMF0sIGFbcHJvcHNbMF1dKTtcbiAgICB9XG59XG5leHBvcnRzLmt3ID0ga3c7XG5mdW5jdGlvbiBrd2FyZ3NUb09iamVjdChhcnIpIHtcbiAgICBjb25zdCBvcHRpb25zID0ge307XG4gICAgZm9yIChjb25zdCBhcmcgb2YgYXJyKSB7XG4gICAgICAgIG9wdGlvbnNbYXJnLm5hbWVdID0gb3B0aW9uc1thcmcudmFsdWVdO1xuICAgIH1cbiAgICByZXR1cm4gb3B0aW9ucztcbn1cbmV4cG9ydHMua3dhcmdzVG9PYmplY3QgPSBrd2FyZ3NUb09iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNOb25lKHRlc3QpIHtcbiAgICByZXR1cm4gKHRlc3QgPT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5pc05vbmUgPSBpc05vbmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGVsbCBpZiBhIGdpdmVuIHN0cmluZyBpcyBhIHBvc2l0aXZlIGludGVnZXIuXG4gKiBVc2UgZm9yIGRldGVjdGluZyBhcnJheSBrZXlzLlxuICovXG5mdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHIgPT09ICcwJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC9eWzEtOV1cXGQqJC8udGVzdChzdHIpO1xufVxuZXhwb3J0cy5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyA9IGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nO1xuIl19
