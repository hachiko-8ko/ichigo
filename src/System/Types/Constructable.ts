export type Constructable<T> = new (...args: any[]) => T;

/**
 * Determine if an object is a constructor that is newable.
 * THIS CANNOT DETECT ANONYMOUS CLASSES. Sorry, but JS doesn't have a non-destructive way
 * to check if any function is a constructor other than to try to new() it and blow up/not blow up.
 * This function depends on there being a prototype with a named constructor.
 */
export function constructorTypeGuard(obj: any): obj is Constructable<any> {
    return obj && obj.prototype && obj.prototype.constructor.name;
}
