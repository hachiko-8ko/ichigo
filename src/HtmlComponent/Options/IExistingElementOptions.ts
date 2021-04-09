/**
 * Take an existing element and convert it to a component
 */
export interface IExistingElementOptions<TElement = HTMLElement> {
    element: TElement;
    properties?: Record<string, any>; // allow modification of existing element
    attributes?: Record<string, any>; // allow modification of existing element
}

/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
export class ExistingElementOptions<TElement = HTMLElement> implements IExistingElementOptions<TElement> {
    element: TElement;
    properties?: Record<string, any>;
    attributes?: Record<string, any>;
    replace?: boolean;

    constructor(opt: IExistingElementOptions<TElement>) {
        Object.assign(this, opt);
        this.element = opt.element;
    }
}
