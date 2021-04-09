import { escapeHtml } from '../Html/EscapeHtml';
import { PropertyChangedEventArgs } from '../System/EventHandler/PropertyChangedEventArgs';
import { isNone, Nullable } from '../System/Types/NoneType';
import { isPrimitive } from '../System/Utility/IsPrimitive';
import { IObservable, observableCheck } from './IObservable';
import { IObservableOptions, ObservableBase } from './ObservableBase';

/**
 * An ObservableProperty is a property that automatically raises a PropertyChanged event when it is modified. This is more
 * convenient than having to do it manually every time you need it.
 */
export class ObservableProperty<T> extends ObservableBase<PropertyChangedEventArgs> {
    propertyName: string = "";

    protected _value: T;
    protected _triggerOnlyOnChange = false;

    constructor(value: T, options: IObservableOptions & { onlyWhenChanged?: boolean } = {}) {
        super(options);

        options = options || {};
        this._value = value;
        this.propertyName = options.name || '';
        this._triggerOnlyOnChange = options.onlyWhenChanged || false;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        const old: T = this._value;
        this._value = value;
        if (this._triggerOnlyOnChange && old === value) {
            return;
        }
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

    protected publishPropertyChanged(type: string, propertyName: PropertyKey, oldValue: Nullable<T>, newValue: Nullable<T>, sender?: any): void {
        this.changeHandler.invoke(new PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
}

export function observablePropertyCheck<T extends any>(obj: any): obj is ObservableProperty<T> {
    if (!observableCheck(obj)) {
        return false;
    }
    // I don't like this because it should be checking if value is a setter,
    // and it isn't, because there is no way to check.
    // Object.getOwnPropertyDescriptor() doesn't catch inherited properties, of
    // which this is almost always one.
    // I have to fall back to a basic instance check.
    return obj && obj instanceof ObservableProperty;
}
