import { ArrayChangedEventArgs } from '../../System/EventHandler/ArrayChangedEventArgs';
import { objectFullAssign } from '../../System/Utility/ObjectFullAssign';
import { IObservable } from '../IObservable';
import { ObservableBase } from '../ObservableBase';
import { ProxiedArray } from '../ObservableProxy';

class TraitSource extends ObservableBase<ArrayChangedEventArgs> {
    constructor(disableAsync?: boolean) {
        super({ name: 'ArrayProxy', disableAsync });
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ArrayObservable<T = any> extends Array<T> {
    static getMergedObservable<TRow>(args: TRow[], disableAsync?: boolean): ArrayObservable<TRow> & ProxiedArray<TRow> {
        // This is where I really need multiple inheritance. This needs to inherit from Array
        // because it's extending a built-in class. It also needs to inherit from ObservableBase.
        // Three choices:
        // 1) 50 lines of clipboard inheritance.
        // 2) Cheat heavily by taking a trait approach. This means hackery to make TS happy.
        // 3) Do the same as 2 with the built-in Array class. Not a problem but with #2 the class name acts
        // as a hint that it's not a default array, which is better.
        // #2 wins.
        const arr = new ArrayObservable(...args);
        const result = objectFullAssign<ArrayObservable<TRow> & ProxiedArray<TRow>>(arr, new TraitSource(disableAsync));
        Object.defineProperty(result, 'changeHandler', { enumerable: false });
        return result;
    }

    // Objects created through map, filter, etc, should be generic arrays.
    static get [Symbol.species](): ArrayConstructor {
        return Array;
    }

    private constructor(...args: T[]) {
        super(...args);
    }

    // Needs to be public so the proxy can call it, but should not be called outside the API. Imagine it's internal.
    publishCollectionChanged(
        type: string,
        propertyName: string,
        args: any[],
        oldValue?: T[],
        newValue?: T[],
        sender?: any
    ): void {
        // This requires a cheat. It will fail if the object is created with new();
        (this as any as IObservable).changeHandler.invoke(new ArrayChangedEventArgs<T>({ type, propertyName, args, oldValue, newValue, sender }));
    }

    toJSON(): any {
        return this.slice();
    }
}
