import { ObservableProperty } from '../Observable/ObservableProperty';

/**
 * This script contains extensions to make it faster to make properties into ObservableProperty.
 *
 * In your main process, import this script (import '/path/to/Ichigo/Extensions/ObservableExtensions') to add
 * these extensions to the prototypes.
 */

// I wanted to have separate d.ts files, but that breaks VSCode. Though I have an identical project (old version of this project)
// where d.ts files work fine. If I explicitly import the d.ts file, fine, but browserify doesn't understand that syntax, so can't use it.
// Only in this, not the old version. FML Microsoft.
declare global {
    // tslint:disable-next-line:interface-name
    interface Object {
        toObservable<T>(name?: string): ObservableProperty<T>;
    }
    // tslint:disable-next-line:interface-name
    interface String {
        toObservable(name?: string): ObservableProperty<string>;
    }
    // tslint:disable-next-line:interface-name
    interface Number {
        toObservable(name?: string): ObservableProperty<number>;
    }
    // tslint:disable-next-line:interface-name
    interface Boolean {
        toObservable(name?: string): ObservableProperty<boolean>;
    }
}

/**
 * Quickly convert an object to a ObservableProperty.
 */
Object.prototype.toObservable = function <T>(this: any, eventChannel?: string, name?: string): ObservableProperty<T> {
    return new ObservableProperty<T>(this, { eventChannel, name });
};
/**
 * Quickly convert a string to an ObservableProperty.
 */
String.prototype.toObservable = function (this: string, eventChannel?: string, name?: string): ObservableProperty<string> {
    return new ObservableProperty<string>(this, { eventChannel, name });
};
/**
 * Quickly convert a number to a ObservableProperty.
 */
Number.prototype.toObservable = function (this: number, eventChannel?: string, name?: string): ObservableProperty<number> {
    return new ObservableProperty<number>(this as number, { eventChannel, name });
};
/**
 * Quickly convert a bool to a ObservableProperty.
 */
Boolean.prototype.toObservable = function (this: boolean, eventChannel?: string, name?: string): ObservableProperty<boolean> {
    return new ObservableProperty<boolean>(this, { eventChannel, name });
};
