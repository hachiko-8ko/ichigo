import { IPublishArrayChange } from './IPublishArrayChange';
import { isPositiveIntegerString } from '../../System/Utility/IsInteger';

export class ArrayProxyHandler<T = any> implements ProxyHandler<Array<T> & IPublishArrayChange<T>>  {
    // These are all the methods, not counting custom setters, that mutate an array.
    static methodsToWatch = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

    get(target: T[] & IPublishArrayChange<T>, key: PropertyKey, proxy: T[]): any {
        if (key in target) {
            const methodCalled = Reflect.get(target, key, proxy);

            // Silent pass-through of other methods
            if (ArrayProxyHandler.methodsToWatch.indexOf(key.toString()) === -1) {
                return methodCalled;
            }

            return (...args: any[]) => {
                // TODO: Need to evaluate performance of copies
                const before = target.slice(); // This could be useful but it could also be a performance problem.
                const returnVal = methodCalled.apply(target, args);
                const after = target.slice(); // This could be useful but it could also be a performance problem.

                target.publishCollectionChanged('call', key, args, before, after, proxy);

                return returnVal;
            };
        }
    }

    set(target: T[] & IPublishArrayChange<T>, key: PropertyKey, value: T, proxy: T[]): boolean {
        // Problem: We want to capture only length and [indexer] calls, but JS has no consistent
        // way of defining [indexer]. What makes it worse is that if a string is an integer, it is
        // converted to a number. And JS does not include a built-in way to test if a number is an integer.
        // Solution: A regex-based check. Ick. Way to remind me I'm using JS.
        if (key && (key.toString() === 'length' || typeof key === 'number' || isPositiveIntegerString(key))) {
            // TODO: Need to evaluate performance of copies
            const before = target.slice(); // This could be useful but it could also be a performance problem.
            Reflect.set(target, key, value, proxy);
            const after = target.slice(); // This could be useful but it could also be a performance problem.

            target.publishCollectionChanged('set', key, [value], before, after, proxy);

            return true;
        } else {
            Reflect.set(target, key, value, proxy);
            return true;
        }
    }

    deleteProperty(target: T[] & IPublishArrayChange<T>, key: PropertyKey): boolean {
        const before = target.slice(); // This could be useful but it could also be a performance problem.
        Reflect.deleteProperty(target, key);
        const after = target.slice(); // This could be useful but it could also be a performance problem.
        // Cannot report proxy as sender because proxy not sent to this method
        target.publishCollectionChanged('delete', key, [], before, after, null);
        return true;
    }
}
