import { escapeHtml } from '../Html/EscapeHtml';
import { PropertyChangedEventArgs } from '../System/EventHandler/PropertyChangedEventArgs';
import { IAction1 } from '../System/Types/DelegateInterfaces';
import { isNone, Nullable } from '../System/Types/NoneType';
import { isPrimitive } from '../System/Utility/IsPrimitive';
import { observableCheck } from './IObservable';
import { ObservableBase } from './ObservableBase';

/**
 * An ObservableProperty is a property that automatically raises a PropertyChanged event when it is modified. This is more
 * convenient than having to do it manually every time you need it.
 */
export class ObservableProperty<T> extends ObservableBase<PropertyChangedEventArgs> {
    propertyName: string = "";

    protected _value: T;

    constructor(value: T, options?: string);
    constructor(value: T, options: IObservableOptions);
    constructor(value: T, options: IObservableOptions | string | undefined) {
        // There's a nasty 'feature' where you can't call any other code before the super() call. So this function exists.
        // There's another icky typescript feature where it only checks the public "fake" overloads and and not the final "real" one.
        // This method, because it has to pipe into the super call, has to match the real one. You can't double-up on dupe super calls
        // surrounded by type guards because no other code before super. So this has to be cast as any.
        super(handleWackyOverloads(options) as any);

        this._value = value;

        if (typeof options === "object") {
            this.propertyName = options.name || '';
        }

        function handleWackyOverloads(obj: IObservableOptions | string | undefined): string | true | undefined {
            let o2: IObservableOptions;
            if (typeof obj === "string") {
                o2 = { eventChannel: obj };
            } else {
                o2 = obj || {};
            }
            return o2.doNotSubscribe || o2.eventChannel;
        }
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        const old: T = this._value;
        this._value = value;
        this.publishPropertyChanged('set', this.propertyName, old, value, this);
    }

    /**
     * Get the value (if a string) that has had special HTML characters escaped.
     */
    get safeValue(): string {
        if (isNone(this._value) || !isPrimitive(this._value)) {
            return "";
        }
        return escapeHtml(String(this._value));
    }

    toString(): string {
        return JSON.stringify(this._value);
    }

    toJSON(): any {
        return this._value;
    }

    subscribe(callback: IAction1<PropertyChangedEventArgs>, thisArg?: any): void {
        return super.subscribe(callback, thisArg);
    }

    unsubscribe(callback: IAction1<PropertyChangedEventArgs>, thisArg?: any): void {
        super.unsubscribe(callback, thisArg);
    }

    protected publishPropertyChanged(type: string, propertyName: PropertyKey, oldValue: Nullable<T>, newValue: Nullable<T>, sender?: any): void {
        this.invoke(new PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }), this.propertyName);
    }
}

export function observablePropertyCheck<T extends any>(obj: any): obj is ObservableProperty<T> {
    if (!observableCheck(obj)) {
        return false;
    }
    // I don't like this because it should be checking if value is a setter, and it isn't, because there is no way to check.
    // Object.getOwnPropertyDescriptor() doesn't catch inherited properties, of which this is almost always one.
    // I have to fall back to a basic instance check.
    return obj && obj instanceof ObservableProperty;
}

interface IObservableOptions {
    name?: string;
    eventChannel?: string;
    doNotSubscribe?: true;
}
