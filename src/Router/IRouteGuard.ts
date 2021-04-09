import { IRoute } from "./IRoute";

export interface IRouteGuard {
    /**
     * Return true if navigation to this route should be allowed, else false.
     * Other logic can be included (such as navigation to a permission denied page).
     */
    checkValid(route: IRoute): boolean;
}
