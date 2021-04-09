import { RecursiveArray } from "../Types/RecursiveArray";

/**
 * Return elements of array a lined up with elements of array b. Both arrays don't have to be the same length.
 */
export function zip<T1, T2>(a: T1[], b: T2[]): Array<[T1, T2]> {
    if (a.length >= b.length) {
        return a.map((element, index) => [element, b[index]]) as Array<[T1, T2]>;
    }
    else {
        return b.map((element, index) => [a[index], b]) as Array<[T1, T2]>;
    }
}

/**
 * Return a cartesian join (cross join) between arrays a and b.
 */
export function cartesian<T1, T2>(a: T1[], b: T2[]): Array<[T1, T2]> {
    /// typescript prevents a direct use of concat, so do this manually with a loop
    const results = [];
    for (const item of a) {
        results.push(...b.map(q => [item, q]));
    }
    return results as Array<[T1, T2]>;
}

/**
 * Generate a range of integers, counting up by 1, for the given length. Stolen from Python.
 */
export function range(length: number): number[] {
    return Array.from({ length: length }, (value, key) => key);
}

/**
 * Given an array of items and other arrays, flatten them out into a single array.
 */
export function* traverse<T>(arr: T | T[] | RecursiveArray<T>): IterableIterator<T> {
    if (!Array.isArray(arr)) {
        yield arr;
    } else {
        for (const row of arr) {
            yield* traverse<T>(row);
        }
    }
}
