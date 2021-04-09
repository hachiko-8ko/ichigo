import { IContent } from '../HtmlComponent/Contract/IContent';
import { Constructable } from '../System/Types/Constructable';
import { IRouteGuard } from './IRouteGuard';

export interface IAdvancedRoute {
    /**
     * The string that must match the route or URL hash.
     * Variable parameters can be specified using :param.
     * "*" acts like a wildcard if by itself at the end. At the end, it will match multiple /segments/
     * A possibility I'm thinking of: type matching, like some python routers (:id=string different from :id=number).
     */
    route: string | string[];
    /**
     * A callback that should build and return a view or a container, or a parameterless
     * constructor that returns a view (browsers don't let you new up an HTMLElement)
     * No automatic injection like angular, currently.
     */
    payload?: (() => HTMLElement | IContent) | Constructable<IContent>;
    /**
     * An optional router target container, to use instead of the default, page-router
     * This can be used to have a single route update multiple areas of the page.
     */
    routeContainer?: string;
    /**
     * Allow nested views. This ensures that the parent is matched and created before the children.
     * routeContainer is required, because the behavior without it is to replace all content in the parent
     */
    // tslint:disable-next-line:no-unused-expression
    children?: IAdvancedRoute[];
    /**
     * If this is false, the container will be regenerated even if it already exists in the DOM.
     * At the moment, false is the default, because it can easily break functionality.
     * Going back to the same page is a regular way to refresh in the Web world.
     * If you want to keep an item on the screen (for example, if you have a menu bar and don't want
     * it jumping to the top when you change pages), set this to true.
     */
    staticRouterContainer?: boolean;

    /**
     * One or more route guard objects that must be checked before navigation is allowed.
     */
    routeGuards?: IRouteGuard | IRouteGuard[];
}
