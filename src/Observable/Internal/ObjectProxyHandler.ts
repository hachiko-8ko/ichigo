import { PropertyChangedEventArgs } from '../../System/EventHandler/PropertyChangedEventArgs';
import { IAction1 } from '../../System/Types/DelegateInterfaces';
import { Nullable } from '../../System/Types/NoneType';
import { ObservableBase } from '../ObservableBase';
import { ObservableProxy } from '../ObservableProxy';

export class ObjectProxyHandler<T extends Record<string, any> = any> extends ObservableBase<PropertyChangedEventArgs> implements ProxyHandler<T>  {

    static observableMethods = ['_eventChannel', '_eventChannelName', 'publishPropertyChanged', 'subscribe', 'unsubscribe', 'toJSON', 'invoke'];

    private _deepProxyCache = new WeakMap();

    constructor(
        eventChannel?: string,
        private _deep: boolean = true) {
        super(eventChannel);
    }

    get(target: T, key: PropertyKey, proxy: T): any {
        // We can't put the eventChannel on the actual proxy. If you update after proxying it, then updates go to this get method right here.
        // If you update before proxying it, it will sometimes cause methods on built-in objects to fail. So we have to fake it and provide
        // virtual methods from the handler, that pretend to be from the observable. DO NOT reuse instances of handlers on multiple proxies.
        if (key === "__isProxy__") {
            return true;
        }

        if (ObjectProxyHandler.observableMethods.indexOf(key.toString()) > -1) {
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
                // Once it's already been deep proxied, we want to pull from cache
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
                return result.bind(target);
            }

            return result;
        }
    }

    set(target: T, key: PropertyKey, value: any, proxy: T): boolean {
        // Again, we need virtual setters that direct to this handler, not the actual observable.
        if (key === '_eventChannel' || key === '_eventChannelName') {
            Reflect.set(this, key, value);
            return true;
        }

        const oldValue = Reflect.get(target, key, proxy);
        Reflect.set(target, key, value, proxy);
        this.publishPropertyChanged('set', key, oldValue, value, proxy);
        return true;
    }

    deleteProperty(target: T, key: PropertyKey): boolean {
        const oldValue = Reflect.get(target, key);
        Reflect.deleteProperty(target, key);
        // Cannot report proxy as sender because proxy not sent to this method
        this.publishPropertyChanged('delete', key, oldValue, undefined, null);
        return true;
    }

    publishPropertyChanged(type: string, propertyName: PropertyKey, oldValue: Nullable<T>, newValue: Nullable<T>, sender?: any): void {
        super.invoke(new PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }), "ObjectProxy");
    }

    subscribe(callback: IAction1<PropertyChangedEventArgs>, thisArg?: any): void {
        super.subscribe(callback, thisArg);
    }

    unsubscribe(callback: IAction1<any>, thisArg?: any): void {
        super.unsubscribe(callback, thisArg);
    }

    toJSON(): any {
        // This filters out the troublesome eventChannel fields.
        return super.toJSON();
    }
}
