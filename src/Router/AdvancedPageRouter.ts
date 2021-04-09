import { createElement } from '../Html/CreateElement';
import { deleteNodeContent } from '../Html/DeleteNodeContent';
import { elementType } from '../Html/ElementType';
import { IContent } from '../HtmlComponent/Contract/IContent';
import { zip } from '../System/Collections/ArrayUtilities';
import { Constructable, constructorTypeGuard } from '../System/Types/Constructable';
import { e_ } from '../System/Utility/Elvis';
import { IAdvancedRoute } from './IAdvancedRoute';

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
export class AdvancedPageRouter {
    static get matchedRoute(): Readonly<{ route: string, params: ReadonlyMap<string, string> }> {
        return this._matchedRoute || { route: '', params: new Map() };
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

    static configure(routes: IAdvancedRoute[]): void {
        this._routes = routes;
    }

    /**
     * Set up a top-level route, which is expected to route to the main app container. This is expected to contain
     * a child-container element, which contains lower level routes that are stored as children, added using the addRoute()
     * method.
     */
    static addAppRoute(payload: (HTMLElement | IContent) | (() => HTMLElement | IContent) | Constructable<IContent>,
        route: string = '*',
        urlRoutingEnabled: boolean = true
    ): void {
        if (urlRoutingEnabled) {
            // By default, allows going to a new page by changing the URL instead of having to issue route() commands.
            this.turnOnUrlRouting();
        }

        if (constructorTypeGuard(payload) || typeof payload === 'function') {
            this.addRoute({
                route: route,
                payload: payload,
                routeContainer: 'page-router',
                staticRouterContainer: true
            });
        } else {
            this.addRoute({
                route: route,
                payload: () => payload,
                routeContainer: 'page-router',
                staticRouterContainer: true
            });
        }
    }

    static addRoute(route: IAdvancedRoute): void {
        if (this._routes.find(q =>
            q.route === route.route &&
            (q.routeContainer || 'child-container') === (route.routeContainer || 'child-container'))) {
            throw new Error("Route and container already exists.");
        }
        this._routes.push(route);
    }

    static deleteRoute(route: string): void {
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

    static route(route?: string, updateUrl: boolean = true): void {
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

        } else if (updateUrl) {
            // If a route is sent in, then set the hash.
            window.location.hash = route;
            this._lastRoute = route;
        } else {
            this._lastRoute = route;
        }

        // Get a copy of routes, because (1) the list will be modified and (2) reduce accesses to static properties.
        // I'm not sure if async hash update events will all be in the same thread, but this isn't thread-safe.
        const routeCopy = this._routes.slice(0).map(m => ({ route: m }));

        // Find matching routes. Typically there will be 0 to 1 but the router allows multiples, one per container.
        const matches: Array<{ route: IAdvancedRoute, parent?: IAdvancedRoute }> = [];
        const params: Array<Map<string, string>> = [];

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
        const merged: Map<string, string> = new Map();
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
            .filter(rc => !matches.find(m => m.route === rc.route) || !rc.route.staticRouterContainer)
        ) {
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
            } else if (match.route.routeGuards) {
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
    private static _routes: IAdvancedRoute[] = [];
    private static _matchedRoute?: { route: string, params: Map<string, string> };
    private static _history: string[] = [];
    private static _historyMaxLength: number = 50;
    private static _routeContainers: Array<{ route: IAdvancedRoute, container?: HTMLElement, parentRoute?: IAdvancedRoute }> = [];
    private static _hashChange?: (evt: any) => void;
    private static _lastRoute?: string;
    private static _notFound?: string;

    private static _searchRoutes(url: string, route: IAdvancedRoute, routesToSearch: Array<{ route: IAdvancedRoute, parent?: IAdvancedRoute }>): Map<string, string> | false {
        let search: string[] = [];
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
        for (const [routeSegment, urlSegment] of zip(routeArray, urlArray)) {
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
    private static _renderRoute({ route, parent }: { route: IAdvancedRoute, parent?: IAdvancedRoute }): void {
        const container = this._prepareRouterContainer(route, parent);
        if (!container) {
            return;
        }

        let view: HTMLElement | IContent | undefined;
        if (constructorTypeGuard(route.payload)) {
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

        function viewTypeGuard(test: any): test is IContent {
            if ("content" in test && test.content instanceof HTMLElement) {
                return true;
            }
            return false;
        }
    }
    private static _renderNotFound(): void {
        const container = createElement<HTMLElement>('not-found', { id: 'not-found' });
        deleteNodeContent(document.body);
        document.body.appendChild(container);
        container.appendChild(createElement(elementType.HTMLDivElement, { innerHTML: this._notFound || "Quoth the Raven, 404" }));
    }
    private static _prepareRouterContainer(route: IAdvancedRoute, parentRoute?: IAdvancedRoute): HTMLElement | undefined {
        if (!this._matchedRoute) {
            throw new Error('ProgrammingError: _prepareRouterContainer called out of order.');
        }

        // Look for the route container for the route. If it exists, exit doing nothing. We'll keep it.
        const routeContainer = this._routeContainers.find(f => f.route === route);
        if (!routeContainer) {
            throw new Error("ProgrammingError: Forgot to add routes to route containers.");
        }

        let parent: HTMLElement | undefined;
        // See if this route has a parent that is on the page
        parent = e_(this._routeContainers.find(q => q.route === parentRoute)).container;
        if (parent && !document.body.contains(parent)) {
            parent = undefined;
        }

        // If the route has a container, that container exists in the dom, and the staticRouterContainer setting is true, exit
        if (route.staticRouterContainer && routeContainer.container && (parent || document.body).contains(routeContainer.container)) {
            return;
        }

        const containerId: string = e_(route).routeContainer || 'child-container';

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
                && q.container.tagName.toLowerCase() === (containerId as any).toLowerCase()
                && !!(parent as any).querySelector(containerId as any))) {
            // tslint:disable-next-line:no-console
            console.log(`Route: [${route.route}]. Container [${containerId}] added to DOM by another route. Skipping.`);
            return;
        }

        const newRouter = createElement<HTMLElement>(containerId); /* { id: containerId } */
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
