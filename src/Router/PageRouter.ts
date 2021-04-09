import { createElement } from '../Html/CreateElement';
import { deleteNodeContent } from '../Html/DeleteNodeContent';
import { elementType } from '../Html/ElementType';
import { IContent } from '../HtmlComponent/Contract/IContent';
import { zip } from '../System/Collections/ArrayUtilities';
import { Constructable, constructorTypeGuard } from '../System/Types/Constructable';
import { Kwarg } from '../System/Types/KeywordArguments';
import { isNone, Nullable } from '../System/Types/NoneType';
import { IRoute } from './IRoute';

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
export class PageRouter {
    static routeContainer: HTMLElement = document.body;

    static get allRoutes(): Readonly<Array<IRoute>> {
        return this._routes;
    }

    static get matchedRoute(): Readonly<{ route: string, params: ReadonlyMap<string, string>, config: IRoute }> {
        return this._matchedRoute || { route: '', params: new Map(), config: { route: '' } };
    }

    static get params(): ReadonlyMap<string, string> {
        return this.matchedRoute.params;
    }

    static get historyMaxLength(): number {
        return this._historyMaxLength;
    }

    static set historyMaxLength(value: number) {
        if (this._history.length > value) {
            this._history.length = value;
        }
        this._historyMaxLength = value;
    }

    static get history(): ReadonlyArray<string> {
        return this._history;
    }

    static set notFound(value: string) {
        this._notFound = value;
    }

    /**
     * This must be called first before using it, because JS doesn't have static constructors like C#. It sets up the
     * route container, custom elements, and also allows one-step configuration of several other properties.
     *
     * Accepts Keyword Arguments.
     */

    static configure(routes: IRoute[] = [], defaultLayout?: (() => HTMLElement | IContent) | Constructable<IContent>, defaultStaticLayout?: boolean, notFound?: string, defaultRoute?: string, urlRoutingEnabled = true): void {

        ({ routes, defaultLayout, defaultStaticLayout, notFound, defaultRoute, urlRoutingEnabled = true } = Kwarg.parseArgs({ routes, defaultLayout, defaultStaticLayout, notFound, defaultRoute, urlRoutingEnabled })); // kwargline

        this._configured = true;

        if (notFound) {
            this._notFound = notFound;
        }

        for (const rte of routes) {
            if (defaultLayout) {
                rte.layout = rte.layout || defaultLayout;
            }
            if (!isNone(defaultStaticLayout) && isNone(rte.staticLayout)) {
                rte.staticLayout = defaultStaticLayout;
            }

            this.addRoute(rte);
        }

        if (urlRoutingEnabled) {
            // By default, allows going to a new page by changing the URL instead of having to issue route() commands.
            this.turnOnUrlRouting();
        }

        this.routeContainer = document.querySelector('page-router') || document.body;

        if (!window.customElements.get('page-router')) {
            window.customElements.define('page-router', DivPage, { extends: 'div' });
        }
        if (!window.customElements.get('layout-body')) {
            window.customElements.define('layout-body', DivLayout, { extends: 'div' });
        }
        if (!window.customElements.get('not-found')) {
            window.customElements.define('not-found', DivNotFound, { extends: 'div' });
        }

        if (defaultRoute) {
            this.defaultRoute(defaultRoute);
        }
    }

    // Note: there is no removeRoute. There could be, but it's never needed.
    static addRoute(route: IRoute): void {
        let routes: string[];
        if (Array.isArray(route.route)) {
            routes = route.route;
        } else {
            routes = [route.route];
        }
        for (const rte of routes) {
            if (this._routes.find(q => q.route === rte)) {
                throw new Error("Route already exists.");
            }
            const tmp = Object.assign({}, route) as ISimpleRoute;
            tmp.route = rte;
            this._routes.push(tmp);
        }
    }

    /**
     * If linked to a particular page (on the hash), go to it. Else, go to the route specified.
     */
    static defaultRoute(route: string): void {
        if (window.location.hash) {
            PageRouter.route();
        } else {
            PageRouter.route(route);
        }
    }

    static route(route?: string, updateUrl: boolean = true): void {
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

        } else if (updateUrl) {
            // If a route is sent in, then set the hash.
            window.location.hash = route;
            this._lastRoute = route;

        } else {
            this._lastRoute = route;
        }

        let match: Nullable<IRoute>;
        let searchResult: Map<string, string> | false = false;

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

        const previousRoute = (this._matchedRoute || {} as any).config;
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
        } else if (match.routeGuards) {
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

    static back(): void {
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

    static turnOnUrlRouting(): void {
        this._hashChange = (evt: any) => { this.route(); };
        window.addEventListener('hashchange', this._hashChange);
    }

    private static _configured = false;
    private static _routes: ISimpleRoute[] = [];
    private static _matchedRoute?: { route: string, params: Map<string, string>, config: IRoute };
    private static _history: string[] = [];
    private static _historyMaxLength: number = 50;
    private static _hashChange?: (evt: any) => void;
    private static _lastRoute?: string;
    private static _notFound?: string;

    private static _testRoute(routeString: string, urlString: string): Map<string, string> | false {
        const params: Map<string, string> = new Map();
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

        for (const [routeSegment, urlSegment] of zip(routeArray, urlArray)) {
            // Parameters are allowed. Optional parameters are not.
            // The reason for no optional parameters is that finding a match between /a/:?param/b and /a/b is too complex.
            // Is 'b' a param value or part of the route. Basically, optional parameters only work at the route end.
            // I noticed that ASP.NET works that way and I found it confusing that optional parameters only work at the end.
            // Just create a new route with the optional param left out.
            if (routeSegment.startsWith(':')) {
                let name = routeSegment.slice(1);
                if (!name.includes('=')) {
                    params.set(name, urlSegment);
                } else {
                    // Handle the mapped static param case.
                    const val = name.split('=')[1];
                    name = name.split('=')[0];
                    if (val !== urlSegment) {
                        return false;
                    }
                }

                if (params.has(name)) {
                    throw new Error(`Route ${routeString} contains duplicates of the same parameter.`);
                }

                params.set(name, urlSegment);
            }
            else if (routeSegment !== urlSegment.toLowerCase()) {
                return false;
            }
        }
        return params;
    }

    private static _renderRoute(route: IRoute, previous?: IRoute): void {
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
            deleteNodeContent(container);
        }

        if (keepLayout) {
            container = document.querySelector('layout-body') as any;
            if (!container) {
                throw new Error('<layout-body> element not found');
            }
        } else if (route.layout) {
            let layoutView: HTMLElement | IContent | undefined;
            if (constructorTypeGuard(route.layout)) {
                layoutView = new route.layout();
            } else if (route.payload) {
                layoutView = route.layout();
            }
            if (layoutView && viewTypeGuard(layoutView)) {
                container.appendChild(layoutView.content);
            } else if (layoutView) {
                container.appendChild(layoutView);
            }
            container = document.querySelector('layout-body') as any;
            if (!container) {
                throw new Error('<layout-body> element not found');
            }
        }

        if (keepLayout) {
            // Delete contents of layout-body (but keep layout)
            deleteNodeContent(container);
        }

        let view: HTMLElement | IContent | undefined;
        if (constructorTypeGuard(route.payload)) {
            view = new route.payload();
        } else if (route.payload) {
            view = route.payload();
        }

        if (view && viewTypeGuard(view)) {
            container.appendChild(view.content);
        } else if (view) {
            container.appendChild(view);
        }

        function viewTypeGuard(test: any): test is IContent {
            if ("content" in test && test.content instanceof HTMLElement) {
                return true;
            }
            return false;
        }
    }

    private static _renderNotFound(): void {
        deleteNodeContent(this.routeContainer);
        this.routeContainer.appendChild(createElement(elementType.HTMLDivElement, { id: 'not-found', innerHTML: this._notFound || "Quoth the Raven, 404" }));
    }
}

/**
 * ISimpleRoute is an IRoute where the route is only a string, never a string array. That's all.
 */
// In this version of TypeScript, there's no way to say Omit<IRoute, "route">, nor is there the "new" property descriptor, so this is wordy.
interface ISimpleRoute extends Pick<IRoute, "payload" | "layout" | "staticLayout" | "routeGuards"> {
    route: string;
}

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
