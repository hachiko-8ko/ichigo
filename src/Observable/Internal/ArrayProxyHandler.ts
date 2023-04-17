import { ArrayChangedEventArgs } from '../../System/EventHandler/ArrayChangedEventArgs';
import { PropertyChangedEventArgs } from '../../System/EventHandler/PropertyChangedEventArgs';
import { IAction1 } from '../../System/Types/DelegateInterfaces';
import { isPositiveIntegerString } from '../../System/Utility/IsInteger';
import { ObservableBase } from '../ObservableBase';
import { ObservableProxy } from '../ObservableProxy';

export class ArrayProxyHandler<T = any> extends ObservableBase<PropertyChangedEventArgs> implements ProxyHandler<Array<T>>  {

    static observableMethods = ['_eventChannel', '_eventChannelName', 'publishPropertyChanged', 'subscribe', 'unsubscribe', 'toJSON', 'invoke'];

    // These are all the methods, not counting custom setters, that mutate an array.
    static methodsToWatch = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];

    private _deepProxyCache = new WeakMap();

    constructor(
        eventChannel?: string,
        private _deep: boolean = true
    ) {
        super(eventChannel);
    }

    get(target: T[], key: PropertyKey, proxy: T[]): any {
        // We can't put the channel on the actual proxy. If you update after proxying it, then updates go to this get method right here.
        // If you update before proxying it, it will sometimes cause methods on built-in objects to fail. So we have to fake it and provide
        // virtual methods from the handler. DO NOT re-use instances of handlers on multiple proxies.
        if (key === "__isProxy__") {
            return true;
        }

        if (ArrayProxyHandler.observableMethods.indexOf(key.toString()) > -1) {
            if (key === '_eventChannel' || key === '_eventChannelName') {
                return Reflect.get(this, key);
            }
            // Everything but those two is a method
            return (this as any)[key].bind(this);
        }

        if (key in target) {
            const result = Reflect.get(target, key, proxy);

            // If an object is returned and instructions are proxy sub-properties (deep observability), then it's necessary to
            // proximate the child object. This isn't done for simple objects because that would turn 123 into { value: 123 }.
            // That would be too weird in practice, and JS doesn't have a way to make an object that transparently acts as a simple type.
            if (this._deep && result && typeof result === "object") {
                if (this._deepProxyCache.has(result)) {
                    return this._deepProxyCache.get(result);
                }
                // If it's a top-level proxy, don't proxy it again
                if (result.__isProxy__) {
                    return result;
                }
                const newProxy = ObservableProxy.proximate(result, (this._eventChannel || {} as any).name);
                this._deepProxyCache.set(result, newProxy);
                return newProxy;
            }

            if (typeof result === 'function') {
                if (ArrayProxyHandler.methodsToWatch.indexOf(key.toString()) > -1) {
                    // Return a wrapper around the method that publishes the change
                    // This could just as easy publish the change and return it immediately, but that makes the assumption that the user is
                    // calling the method right now. If the user is getting the method in a variable and calling it later, problem.
                    // Though this is also problematic.
                    return (...args: any[]) => {
                        const returnVal = (target as any)[key].apply(target, args);
                        this.publishCollectionChanged('call', key.toString(), args, proxy);
                        return returnVal;
                    };
                }

                return (target as any)[key].bind(target);
            }

            return result;
        }
    }

    set(target: T[], key: PropertyKey, value: T, proxy: T[]): boolean {
        // Again, we need virtual setters that direct to this handler, not the actual observable.
        if (key === '_eventChannel' || key === '_eventChannelName') {
            Reflect.set(this, key, value);
            return true;
        }

        Reflect.set(target, key, value, proxy);

        // Problem: We want to capture only length and [indexer] calls, but JS has no consistent
        // way of defining [indexer]. What makes it worse is that if a string is an integer, it is
        // converted to a number. And JS does not include a built-in way to test if a number is an integer.
        // Solution: A regex-based check. Ick. Way to remind me I'm using JS.
        if (key && (key.toString() === 'length' || typeof key === 'number' || isPositiveIntegerString(key))) {
            this.publishCollectionChanged('set', key.toString(), [value], proxy);
        }
        return true;
    }

    deleteProperty(target: T[], key: PropertyKey): boolean {
        const before = target.slice(); // This could be useful but it could also be a performance problem.
        Reflect.deleteProperty(target, key);
        const after = target.slice(); // This could be useful but it could also be a performance problem.
        // Cannot report proxy as sender because proxy not sent to this method
        this.publishCollectionChanged('delete', key.toString(), [], null);
        return true;
    }

    publishCollectionChanged(type: string, propertyName: string, args: any[], sender?: any): void {
        // We could send old value and new value here, but if the array is big (and it sometimes is) this could get pretty large.
        super.invoke(new ArrayChangedEventArgs<T>({ type, propertyName, args, sender }));
    }

    subscribe(callback: IAction1<ArrayChangedEventArgs>, thisArg?: any): void;
    subscribe(callback: IAction1<ArrayChangedEventArgs>, thisArg?: any): void {
        super.subscribe(callback, thisArg);
    }

    unsubscribe(thisArg: any): void;
    unsubscribe(callback: IAction1<any>, thisArg?: any): void;
    unsubscribe(callback: IAction1<any>, thisArg?: any): void {
        super.unsubscribe(callback, thisArg);
    }

    toJSON(): any {
        // This filters out the troublesome eventChannel fields.
        return super.toJSON();
    }
}
