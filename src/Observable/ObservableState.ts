import { escapeHtml } from '../Html/EscapeHtml';
import { PropertyChangedEventArgs } from '../System/EventHandler/PropertyChangedEventArgs';
import { isNone, Nullable } from '../System/Types/NoneType';
import { cloneDeep } from '../System/Utility/CloneDeep';
import { isPrimitive } from '../System/Utility/IsPrimitive';
import { observableCheck } from './IObservable';
import { IObservableOptions, ObservableBase } from './ObservableBase';

/**
 * An observable state that should only be accessed using the relevant methods, allowing atomic changes to multiple properties
 * in multiple objects, raising a single event.
 */
export class ObservableState<T = any> extends ObservableBase<PropertyChangedEventArgs> {
    propertyName: string = "";

    private _value: T;

    /**
     * Pass the initial value for the state.
     * To clone another observable's state, pass an ObservableState.
     */
    constructor(value: ObservableState<T>, options?: IObservableOptions);
    constructor(value: T, options?: IObservableOptions);
    constructor(value: ObservableState<T> | T, options: IObservableOptions = {}) {
        super(options);

        if (value instanceof ObservableState) {
            this._value = cloneDeep(value.value);
        } else {
            this._value = cloneDeep(value);
        }

        options = options || {};
        this.propertyName = options.name || 'setState';
    }

    get value(): T {
        // I would prefer that this return Readonly<T> but getter and setter have to be the same type.
        // That means you would have to cast any value you set as a readonly, which is a PITA.
        return cloneDeep(this._value);
    }

    /**
     * Overwrites the entire value.
     */
    set value(value: T) {
        this.setState(value, true);
    }

    getSafeValue(property?: keyof T): string {
        // If value is primitive, then call this with no arguments.
        // That is the only case where it is allowed.
        if (!property) {
            if (!isNone(this._value) && isPrimitive(this._value)) {
                return escapeHtml(String(this._value));
            }
            return "";
        }

        const tmp = this.value[property];

        if (isNone(tmp) || !isPrimitive(tmp)) {
            return "";
        }

        return escapeHtml(String(tmp));
    }

    getValue(property?: keyof T): T[keyof T] | T {
        // If value is primitive, then call this with no arguments.
        // That is the only case where it is allowed.
        if (!property) {
            if (!isNone(this._value) && isPrimitive(this._value)) {
                return cloneDeep(this._value);
            }
            return undefined as any;
        }

        return this.value[property];
    }

    getState(): Readonly<T> {
        // The Readonly type works fine and it's fast ... in typescript.
        // In javascript, if you just return the value, nothing prevents it from being edited.
        return cloneDeep(this.value);
    }

    /**
     * SetState() updates the value of the observable state, raising an event on the changeHandler and returning the object
     * {oldValue, newValue, returnValue}.
     */

    setState(value: T, overWriteAll: true): { oldValue: T, newValue: T };
    setState(value: Partial<T>): { oldValue: T, newValue: T };
    setState(value: (prev: T) => any): { oldValue: T, newValue: T, returnValue?: any };
    setState(value: T | Partial<T> | ((prev: T) => any), overWriteAll: boolean = false): { oldValue: T, newValue: T, returnValue?: any } {
        const oldValue = cloneDeep<T>(this._value);
        let newValue: T;
        let returnValue: any;

        // If the type is primitive, then a full overwrite is allowed
        if (isPrimitive(this._value)) {
            // Functions will execute but they won't change the value. The reason is the same reason that this makes no permanent change to bar:
            // var foo = function(str) { str = str.toUpperCase(); }; var bar = 'abc'; foo(bar); console.log(bar === 'abc');
            if (typeof value === 'function') {
                throw new Error('Cannot call setState with a function if state is primitive.');
            }
            overWriteAll = true;
        }

        if (overWriteAll) {
            newValue = _ovr1_overwriteAll.call(this, value);
        } else if (typeof value === 'function') {
            [newValue, returnValue] = _ovr3_functionArg.call(this, value);
        } else {
            if (!value || typeof value !== 'object') {
                throw new Error('value is not a partial state or a function');
            }
            newValue = _ovr2_partial.call(this, value);
        }

        this.publishPropertyChanged('call', this.propertyName, oldValue, newValue, this);
        return { oldValue, newValue, returnValue };

        function _ovr1_overwriteAll(this: ObservableState, _value: T): T {
            // Overwrite the entire object.
            this._value = cloneDeep<T>(_value);
            return _value as T;
        }
        function _ovr2_partial(this: ObservableState, _value: Partial<T>): T {
            // Partial object: Overwrite only the keys provided
            const tmp = cloneDeep(this._value) as any;
            for (const key of Object.getOwnPropertyNames(_value)) {
                tmp[key] = (_value as Record<string, any>)[key];
            }
            this._value = cloneDeep(tmp);
            return tmp;
        }
        function _ovr3_functionArg(this: ObservableState, _value: (prev: T) => any): [T, any] {
            // Execute the function provided and update the object as dictated
            // Maybe unnecessary but we want to avoid the caller exfiltrating the state using a function,
            // by accident. Of course, they can just access _value by casting as any,
            // but that's not accidental.
            const tmp = cloneDeep(this._value);
            const _returnValue = _value.call(tmp, tmp);

            this._value = cloneDeep(tmp);
            return [tmp, _returnValue];
        }
    }

    toString(): string {
        return JSON.stringify(this._value);
    }

    toJSON(): any {
        return this.value;
    }

    protected publishPropertyChanged(type: string, propertyName: PropertyKey, oldValue: Nullable<T>, newValue: Nullable<T>, sender?: any): void {
        this.changeHandler.invoke(new PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
}

export function observableStateCheck<T extends any>(obj: any): obj is ObservableState<T> {
    if (!observableCheck(obj)) {
        return false;
    }
    // I don't know if I should check for this or for getState() and setState()
    return obj && obj instanceof ObservableState;
}
