import { Constructable } from '../../System/Types/Constructable';

/**
 * Create a new component setting the inner HTML
 */

export interface IInnerHtmlOptions {
    type?: string;
    innerHtml?: string;
    id?: string;
    properties?: Record<string, any>;
    attributes?: Record<string, any>;
    customElement?: Constructable<HTMLElement>;
}

/**
 * Try to provide some custom classes to help clean up the mess that TypeScript and VSCode provides whenever
 * the mess they call overloading explodes. If you mess up a property, the error message complains that
 * the object you provided doesn't include the various properties of the string object, which isn't helpful.
 */
export class InnerHtmlOptions implements IInnerHtmlOptions {
    type?: string;
    innerHtml?: string;
    id?: string;
    properties?: Record<string, any>;
    attributes?: Record<string, any>;
    customElement?: Constructable<HTMLElement>;
    replace?: boolean;
    constructor(opt: IInnerHtmlOptions) {
        Object.assign(this, opt);
    }
}
