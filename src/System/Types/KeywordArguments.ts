import { isPositiveIntegerString } from '../Utility/IsInteger';

/**
 * This module provides an implementation of keyword arguments, as seen in Python and C#. It makes configurable
 * functions so much quicker and easier than flat arguments (forcing you to put undefined manually in different
 * slots) or options objects (takes more time to produce, especially if you need to new it up).
 *
 * Call functions having keyword arguments using this syntax:
 * callme(arg1, arg2, kw('something', kw1), kw('somethingElse', kw2))
 *
 * To make them work, in the function itself, you need to copy and paste. For example:
 * ({ arg1, arg2, something, somethingElse } = Kwarg.parse({ arg1, arg2, something, somethingElse }));
 */
export class Kwarg<T = any> {
    /**
     * Remember this template:
     * ({ } = Kwarg.parseArgs({ }));
     * Include default values in the first object, not the second.
     *
     * If you want to capture rest parameters, use this:
     * ({ $rest$ } = Kwarg.parseArgs({ , ...rest }));
     *
     * If you want allowUnknownKeyword to be true, use this:
     * ({ $$kw$$ } = Kwarg.parseArgs({ }, true));
     */
    static parseArgs(args: Record<string, any>, allowUnknownKeyword: boolean = false): any {

        // It would be nice if this could take the arguments object, but sadly arguments stores only an array of values,
        // no keys. If JS were sane, it would be a Map, not an array. Two steps forward, one step back.
        // Parsing the string definition for the function is not my cup of tea, so just no.
        const obj: any = {};
        const names = Object.getOwnPropertyNames(args);

        // Get data by argument order
        for (const arg of names) {
            if (args[arg] instanceof Kwarg) {
                obj[arg] = undefined;
            } else {
                obj[arg] = args[arg];
            }
        }

        const kwvar: Record<string, any> = {};
        obj['$$kw$$'] = kwvar;

        // Check for rest parameters.
        // I was going to have this on/off configurable, but it shouldn't hurt performance.
        const arr: any[] = [];
        obj['$rest$'] = arr;
        // Rest parameters are stored as array keys, { '0': a, '1': b, 'nonRest': 'something else'}
        for (const arg of Object.getOwnPropertyNames(args).filter(f => isPositiveIntegerString(f))) {
            if (!(args[arg] instanceof Kwarg)) {
                arr.push(args[arg]);
            }
        }

        const keywordsUsed: any = {};
        // Get data by keyword name
        // Have to iterate the list twice, to avoid wiping out data if the order is swapped
        for (const arg of names) {
            if (args[arg] instanceof Kwarg) {
                const tmp = args[arg];

                if (tmp.name in obj) {
                    obj[tmp.name] = tmp.value;
                } else {
                    if (allowUnknownKeyword) {
                        kwvar[tmp.name] = tmp.value;
                    } else {
                        throw new Error(`Got an unexpected keyword argument '${tmp.name}'`);
                    }
                }

                if (tmp.name in keywordsUsed) {
                    throw new Error(`Got multiple values for keyword argument + '${tmp.name}'`);
                }
                keywordsUsed[tmp.name] = true;
            }
        }

        return obj;
    }

    // Turn an object into an array of keyword arguments.
    // Needs to return any[] because it's going to be shoved into arbitrary argument lists
    static unpack(args: Record<string, any>): any[] {
        const results = [];
        for (const arg of Object.getOwnPropertyNames(args)) {
            results.push(kw(arg, args[arg]));
        }
        return results;
    }

    name: string;
    value?: T;

    constructor(a: string, b?: T) {
        if (!a) {
            throw new Error('Argument null exception');
        }
        this.name = a;
        this.value = b;
    }

    isMatch(key: string): boolean {
        return this.name === key;
    }
}

/**
 * Create a keyword argument, either kw('name', value), kw(['name', value]), or kw({name: value});
 * I really would like something like "kw(name) = value" but that's not valid JS.
 */
export function kw<T>(name: string, b?: T): any;
export function kw<T>(arr: [string, T]): any;
export function kw<T>(map: Record<string, T>): any;
export function kw<T>(a: string | [string, T] | Record<string, T>, b?: T): any {
    if (!a) {
        throw new Error('Argument null exception');
    }
    if (typeof a === 'string') {
        // Overload 1
        return new Kwarg(a, b);
    } else if (Array.isArray(a)) {
        // Overload 2
        return new Kwarg(a[0], a[1]);
    } else {
        // Overload 3
        // This should be an object with only one key/value pair.
        const props = Object.getOwnPropertyNames(a);
        if (!props.length) {
            throw new Error('Argument null exception');
        }
        if (props.length > 1) {
            throw new Error('Invalid map object: multiple keys');
        }
        return new Kwarg(props[0], a[props[0]]);
    }
}

export function kwargsToObject<TOutput extends Record<string, any>>(arr: Kwarg<any>[]): TOutput {
    const options: Record<string, any> = {};
    for (const arg of arr) {
        options[arg.name] = options[arg.value];
    }
    return options as TOutput;
}
