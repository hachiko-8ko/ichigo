export function zip<T1, T2>(a: T1[], b: T2[]): Array<[T1, T2]> {
    if (a.length >= b.length) {
        return a.map((element, index) => [element, b[index]]) as Array<[T1, T2]>;
    }
    else {
        return b.map((element, index) => [a[index], b]) as Array<[T1, T2]>;
    }
}
export function cartesian<T1, T2>(a: T1[], b: T2[]): Array<[T1, T2]> {
    /// typescript prevents a direct use of concat, so do this manually with a loop
    const results = [];
    for (const item of a) {
        results.push(...b.map(q => [item, q]));
    }
    return results as Array<[T1, T2]>;
}

// TODO: Add other parts of python range, like start and step
export function range(length: number): number[] {
    return Array.from({ length: length }, (value, key) => key);
}

/**
 * Given an array of items and other arrays, flatten them out into a single array.
 * 
 * This is written in a tail recursive style, even though (1) TCO was deleted from almost
 * all browsers even though it's still in ES2015 and (2) generators were never supported.
 * Why? Why not.
 * 
 * @export
 * @template T 
 * @param {(T | T[])} arr 
 * @returns {IterableIterator<T>} 
 */
export function* traverse<T>(arr: T | T[]): IterableIterator<T> {
    if (!Array.isArray(arr)) {
        yield arr;
    } else {
        for (const row of arr) {
            yield* traverse<T>(row);
        }
    }
}
