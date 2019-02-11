import { isNone, Nullable } from '../Types/NoneType';

/**
 * Typescript doesn't have a null coalescing operator (?., aka the Elvis operator).
 * But I'm getting frelling sick of object is possibly undefined/null errors on things that aren't null.
 * Not to mention things that can actually be null. So this is a partial Elvis operator.
 *
 * A true elvis operator would return undefined for all methods called on the object. This does that.
 * 
 * VSCode intellisense would also keep using the stated type. This does not do that, because it returns any. Only MS can do that.
 * 
 * If you do return a partial version of the type, TS throws an error because it could be null (umm... that's what Partial means...).
 * 
 * A true elvis operator would also work on strings/numbers/etc. This cannot do that, because JS can't tell the difference between a 
 * null string and a null object. JS has no types, so this can never be done.
 *
 *
 * @export
 * @template T
 * @param {object} item
 * @returns {*}
 */
export function e_(item: Nullable<object>): any {
    if (isNone(item)) {
        return {};
    }
    return item;
}
