import { ArrayObservable } from './Internal/ArrayObservable';
import { ArrayProxyHandler } from './Internal/ArrayProxyHandler';
import { ObjectObservable } from './Internal/ObjectObservable';
import { ObjectProxyHandler } from './Internal/ObjectProxyHandler';
import { IObservable } from './IObservable';

// Cannot be an interface because an interface can only extend a class or an interface
export type ProxiedObject<T extends object> = T & IObservable;

// This can be an interface, but let's be consistent
export type ProxiedArray<T> = Array<T> & IObservable;

export abstract class ObservableProxy {
    /**
     * Create a proxy for the input object.
     */
    static proximate<T extends object = object>(model: T, disableAsync?: boolean, onlyIfChanged?: boolean): T & IObservable;
    static proximate<T = any>(model: T, disableAsync?: boolean, onlyIfChanged?: boolean): { value: T } & IObservable;
    static proximate<T = any>(model: any, disableAsync?: boolean, onlyIfChanged?: boolean): IObservable {
        if (typeof model === 'function') {
            // We can't do functions, not that they would be very useful.
            // Yes, technically you should be able to define properties on a function. They are actual
            // objects.  In practice, however, Object.defineProperty() still makes them undefined.
            throw new Error('Unsupported type: function');

        } else if (Array.isArray(model)) {
            // An array proxy allows changes to an array to be observed. The down-side is that performance
            // is an order of magnitude slower than using an ObservableList.  The up-side is that it uses
            // more than an order of magnitude less code.
            return this.proximateArray(model, disableAsync, onlyIfChanged);

        } else if (typeof model === 'object') {
            return this.proximateObject(model, disableAsync, onlyIfChanged);

        } else {
            // If a simple value is returned, return a proxy having a value property.
            return this.proximateObject({ value: model }, disableAsync, onlyIfChanged);
        }
    }

    /**
     * A configurable version of proximate() called on an object. By making it generalized and configurable, this allows the caller to
     * track methods that are called, based on a configurable list.
     *
     * If the object is a complex object, where child objects are modified, not the main object, changes would not be caught.
     * One way to handle that is to make the child object a proxy. Another way is to access the child object only through methods
     * and use this.
     */
    static proximateObject<T extends object = object>(model: T, disableAsync?: boolean, onlyIfChanged?: boolean,
        methodsToWatch: string[] = [], watchSet: boolean = true, watchDelete: boolean = true): T & IObservable {

        if (typeof model === 'function') {
            // We can't do functions, not that they would be very useful.
            // Yes, technically you should be able to define properties on a function. They are actual
            // objects.  In practice, however, Object.defineProperty() still makes them undefined.
            throw new Error('Unsupported type: function');

        }

        // Add IObservable methods to the model so that it can raise events.
        // We must extend the original class (or at least the object).
        const target = ObjectObservable.getMergedObservable(model, disableAsync);

        const handler = new ObjectProxyHandler(methodsToWatch || [], watchSet || false, watchDelete || false, onlyIfChanged || false);
        const proxy = new Proxy(target, handler);
        ObservableProxy._models.set(proxy, target);

        return proxy as any;
    }

    /**
     * Proximate an array.
     */
    static proximateArray<T>(model: T[], disableAsync?: boolean, onlyIfChanged?: boolean): T[] & IObservable {
        // Add IObservable methods to the model so that it can raise events.
        // We must extend the original array class (or at least the array object).
        const target = ArrayObservable.getMergedObservable(model, disableAsync);

        // The type here isn't accurate, but I have no good way to pass the key type without making this class only work for arrays.
        const handler = new ArrayProxyHandler();
        const proxy = new Proxy(target, handler);
        ObservableProxy._models.set(proxy, target);

        return proxy as any;
    }

    // The original target object needs to be stored somewhere so that the proxy can work.
    // There's no reason that the user can't keep a copy but we shouldn't force that.
    private static _models: WeakMap<any, any> = new WeakMap();
}
