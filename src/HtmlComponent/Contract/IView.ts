import { IContent } from "./IContent";

/**
 * A view is content that contains a view model.  The view should contain all the logic relating to the appearance
 * of the page and modifications to that appearance.  The view model should contain all the logic relating to
 * the data.
 *
 * Ideally I think the viewModel should not be modified by objects outside their related views, but TypeScript
 * doesn't allow protected/private on interface members. So the programmer just needs to use discipline.
 */
export interface IView<TElement extends HTMLElement = HTMLDivElement, TViewModel = any> extends IContent<TElement> {
    viewModel: TViewModel;
}
