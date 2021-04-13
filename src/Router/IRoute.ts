import { IContent } from "../HtmlComponent/Contract/IContent";
import { Constructable } from "../System/Types/Constructable";
import { IRouteGuard } from "./IRouteGuard";

export interface IRoute {
    /**
     * The string that must match the route or URL hash.
     * Variable parameters can be specified using :param.
     *
     * Static parameters that are loaded into a parameter variable can be specified using :param=value.
     * For example, (/view/:blogId=4 routes the same as /view/4 except that the matched parameter list looks like { blogId: 4 }).
     *
     * Multiple matching routes can be configured at once.
     */
    route: string | string[];
    /**
     * A callback that should build and return a view or a container, or a parameterless
     * constructor that returns a view (browsers don't let you new up an HTMLElement), or
     * an HTML element itself (which is cloned).
     * No automatic injection like angular, currently.
     */
    payload?: (() => HTMLElement | IContent) | Constructable<IContent> | HTMLElement;

    /**
     * If a layout is defined, this view is constructed first and then the body-content element
     * is found. Payload is put into body-content. This is similar to ASP.Net except that in
     * ASP.Net it's defined in the code before the view while here it's defined in the route.
     */
    layout?: (() => HTMLElement | IContent) | Constructable<IContent>;

    /**
     * If true, then if the same layout is returned on a new route, then it won't be deleted.
     * I think angular acts this way (layout code not re-executed on page change). ASP.Net doesn't.
     */
    staticLayout?: boolean;

    /**
     * One or more route guard objects that must be checked before navigation is allowed.
     */
    routeGuards?: IRouteGuard | IRouteGuard[];
}
