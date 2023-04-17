import { ArrayProxyHandler } from './Internal/ArrayProxyHandler';
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
    static proximate<T extends object = object>(model: T, eventChannel?: string, shallow?: boolean): T & IObservable;
    static proximate<T = any>(model: T, eventChannel?: string, shallow?: boolean): { value: T } & IObservable;
    static proximate<T = any>(model: any, eventChannel?: string, shallow?: boolean): IObservable {
        if (Array.isArray(model)) {
            // An array proxy allows changes to an array to be observed. The down-side is that performance
            // is an order of magnitude slower than using an ObservableList.  The up-side is that it uses
            // more than an order of magnitude less code.
            const handler = new ArrayProxyHandler(eventChannel, !shallow);
            return new Proxy(model, handler) as any;

        } else if (typeof model === 'object') {
            const handler = new ObjectProxyHandler(eventChannel, !shallow);
            return new Proxy(model, handler) as any;

        } else {
            // If a simple value is returned, return a proxy having a value property.
            const handler = new ObjectProxyHandler(eventChannel, !shallow);
            return new Proxy({ value: model }, handler) as any;
        }
    }
}

export function proximate<T extends object = object>(model: T, eventChannel?: string, shallow?: boolean): T & IObservable;
export function proximate<T = any>(model: T, eventChannel?: string, shallow?: boolean): { value: T } & IObservable;
export function proximate<T = any>(model: any, eventChannel?: string, shallow?: boolean): IObservable {
    return ObservableProxy.proximate(model, eventChannel, shallow);
}
