import { isNone, Nullable } from '../Types/NoneType';

/**
 * Recent Typescript has added a null coalescing operator (?., aka the Elvis operator) but NPM issues
 * prevent me from upgrading.  But this returns undefined if you access anything that doesn't exist.
 *
 * Naturally this breaks VSCode intellisense, because it returns any. Only MS can do keep the right type.
 *
 * If you do return a partial version of the type, TS throws an error because it could be missing (umm... that's what Partial means...).
 *
 * A true elvis operator would also work on strings/numbers/etc. This cannot do that, because JS can't tell the difference between a 
 * null string and a null object. Null is null.
 */
export function e_(item: Nullable<object>): any {
    if (isNone(item)) {
        return {};
    }
    return item;
}
