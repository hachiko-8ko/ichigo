import { IPublishPropertyChange } from './IPublishPropertyChange';

export class ObjectProxyHandler<T extends Record<string, any> = any> implements ProxyHandler<T & IPublishPropertyChange>  {
    constructor(
        private _methodsToWatch: string[],
        private _watchSet: boolean,
        private _watchDelete: boolean,
        private _triggerOnlyOnChange?: boolean) { }

    get(target: T & IPublishPropertyChange, key: PropertyKey, proxy: T): any {
        if (key in target) {
            const methodCalled = Reflect.get(target, key, proxy);

            // Silent pass-through of non-watched methods
            if (this._methodsToWatch.indexOf(key.toString()) === -1 || typeof methodCalled !== 'function') {
                return methodCalled;
            }

            // Return a wrapper around the method that publishes the change
            return (...args: any[]) => {
                const returnVal = methodCalled.apply(target, args);
                target.publishPropertyChanged('call', key, undefined, args, proxy);
                return returnVal;
            };
        }
    }

    set(target: T & IPublishPropertyChange, key: PropertyKey, value: any, proxy: T): boolean {
        if (this._watchSet) {
            const oldValue = Reflect.get(target, key, proxy);
            Reflect.set(target, key, value, proxy);

            // If to be triggered only on change, check oldValue and newValue
            if (this._triggerOnlyOnChange && oldValue === value) {
                return true;
            }

            target.publishPropertyChanged('set', key, oldValue, value, proxy);
            return true;

        } else {
            Reflect.set(target, key, value, proxy);
            return true;
        }
    }

    deleteProperty(target: T & IPublishPropertyChange, key: PropertyKey): boolean {
        if (this._watchDelete) {
            const oldValue = Reflect.get(target, key);
            Reflect.deleteProperty(target, key);
            // Cannot report proxy as sender because proxy not sent to this method
            target.publishPropertyChanged('delete', key, oldValue, undefined, null);
            return true;

        } else {
            Reflect.deleteProperty(target, key);
            return true;
        }
    }
}
