/**
 * Make it easier to create simple comparison functions on (possibly complex) objects. Typical use: arr.sort(orderBy(o => o.id))
 */
export function orderBy<T>(propertyFn: (value: T) => any): (a: T, b: T) => 1 | 0 | -1 {
    return function (first: T, second: T): 1 | 0 | -1 {
        const firstValue = propertyFn(first);
        const secondValue = propertyFn(second);
        if (firstValue < secondValue) {
            return -1;
        }
        if (firstValue > secondValue) {
            return 1;
        }
        return 0;
    };
}
