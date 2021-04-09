/**
 * Look up an existing element in the DOM and convert it to a component. This is just a way to simplify the lookup process vs doing
 * it manually before using IExistingElementOptions.
 * Note: Typescript can't verify your type annotations if you do it this way.
 */

export interface IExistingLookupOptions {
    parent?: Element;
    selector: string;
    properties?: Record<string, any>; // allow modification of existing element
    attributes?: Record<string, any>; // allow modification
}

/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
export class ExistingLookupOptions implements IExistingLookupOptions {
    parent?: Element;
    selector: string;
    properties?: Record<string, any>;
    attributes?: Record<string, any>;
    replace?: boolean;

    constructor(opt: IExistingLookupOptions) {
        Object.assign(this, opt);
        this.selector = opt.selector;
    }
}
