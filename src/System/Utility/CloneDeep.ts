import { cloneObject } from './CloneObject';

/**
 * A simple deep clone method taken from stack overflow.
 * It's not as powerful as something like lodash but it should handle date, null, and
 * undefined, unlike JSON serialization.
 */

export function cloneDeep<T>(obj: T): T; // External overload
export function cloneDeep(obj: any, hash?: WeakMap<any, any>): any; // Internal overload ONLY used for recursion
export function cloneDeep(obj: any, hash = new WeakMap()): any {
    if (Object(obj) !== obj) {
        return obj; // primitive types
    }
    if (hash.has(obj)) {
        return hash.get(obj); // reference to object previously seen
    }
    let result: any;
    if (obj instanceof Set) {
        result = new Set();
        Array.from(obj, val => result.add(cloneDeep(val, hash)));
    } else if (obj instanceof Map) {
        result = new Map();
        Array.from(obj, ([key, val]) => result.add(cloneDeep(key, hash), cloneDeep(val, hash)));
    } else if (Array.isArray(obj)) {
        result = Array.from(obj);
    } else if (obj instanceof Date) {
        result = new Date(obj);
    } else if (obj instanceof RegExp) {
        result = new RegExp(obj.source, obj.flags);
    } else if (typeof obj === 'function') {
        // This is awful code, but it's the only way to clone a standalone function (vs a method which has a descriptor).
        // In general, you probably don't want to use cloneDeep on functions. You'll see it's NOT used on internal methods.
        result = new Function('return ' + obj.toString())();

    } else if (Object.getPrototypeOf(obj)) {
        result = Object.create(Object.getPrototypeOf(obj));
    } else {
        result = Object.create(null);
    }

    hash.set(obj, result); // Keep track of objects previously cloned

    for (const key of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor && descriptor.writable === false) {
            continue;
        }

        if (typeof obj[key] === 'function' && !(key in result)) {
            // Handle methods that aren't in the prototype.
            // This doesn't recursively follow because there's nothing recursive to do.
            if (descriptor) {
                Object.defineProperty(result, key, descriptor);
                hash.set(obj[key], result[key]);
                // NOTE that cloneDeep is NOT called recursively here. It all ends at the method.
                // If extra keys are thrown onto a function, they probably will not be cloned.
                // In my experience, extra keys on functions didn't work right, so no big loss.
            }
        } else if (descriptor && (descriptor.get || descriptor.set)) {
            // Handle custom getters/setters. These are local and hopefully work just like methods.
            // In many cases, this is redundant with Object.create(), but is necessary to allow objects with manually-added custom getters.
            Object.defineProperty(result, key, descriptor);
            // NOTE that cloneDeep is NOT called recursively here. It all ends at the getter/setter.
            // ALSO hash not updated; this is not possible, because it will map the value it gets, not the getter.
        } else {
            result[key] = cloneDeep(obj[key], hash);
        }
    }

    return result;
}
