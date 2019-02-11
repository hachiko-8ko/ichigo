import { isNone, None } from './NoneType';

/**
 * Provides a quick way to get the default value for a type.
 * In the case of object, {} is returned. In JS, the default value is probably undefined, but {} is a better default.
 * I wanted the input to be validated by the compiler, but if you do that, then you can't pass a string variable.
 * It says "Argument of type 'string' is not assignable to parameter of type '"object."'" So fuck that.
 *
 * @export
 * @param {*} value
 * @returns {*}
 */
export function def(value: string | None): any {
    switch (value) {
        case "string":
            return "";
        case "number":
            return 0;
        case "boolean":
            return false;
        case "symbol":
            return Symbol();
        case "function":
            // tslint:disable-next-line:no-empty
            return () => { };
        case "object":
            return null; // pretend we're C# and return null for object.
        case "null":    // typeof null will return object. this will only be returned if someone manually passes the string "null", not def(typeof nullObj)
            return null;
        case "undefined":   // I wish JS didn't have two null values, but...
            return undefined;
        default:
            if (isNone(value)) {
                return value;
            }
            break;
    }
}
