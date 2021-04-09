import { PropertyChangedEventArgs } from '../../System/EventHandler/PropertyChangedEventArgs';
import { Nullable } from '../../System/Types/NoneType';
import { IObservable } from '../IObservable';
import { ObservableBase } from '../ObservableBase';
import { IPublishPropertyChange } from './IPublishPropertyChange';
import { objectFullAssign } from '../../System/Utility/ObjectFullAssign';
import { cloneObject } from '../../System/Utility/CloneObject';

export class ObjectObservable extends ObservableBase<PropertyChangedEventArgs> implements IObservable, IPublishPropertyChange {
    /**
     * This is the only way to produce an object observable, for reasons of safety.
     */
    static getMergedObservable<T extends Record<string, any>>(data: T, disableAsync?: boolean): ObjectObservable & T {
        // We need something with all the properties of the input object merged with the properties of this.
        // I don't want to actually modify the input object. Even though it SHOULD be throwaway, I don't know.
        // And I don't want to take the risk that something in the input, an unknown factor, will make this blow up.
        // I know that this class has only 2 levels of inheritance (currently) and contains nothing very complex at any level.
        const result = objectFullAssign<ObjectObservable & T>(data, new ObjectObservable(disableAsync), true);
        Object.defineProperty(result, 'changeHandler', { enumerable: false });
        return result;
    }

    private constructor(disableAsync?: boolean) {
        super({ name: "ObjectProxy", disableAsync });
    }

    // Needs to be public so the proxy can call it, but should not be called outside the API. Imagine it's internal.
    publishPropertyChanged<T>(type: string, propertyName: PropertyKey, oldValue: Nullable<T>, newValue: Nullable<T>, sender?: any): void {
        this.changeHandler.invoke(new PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }

    toJSON(): any {
        // This filters out the troublesome changeHandler field.
        return super.toJSON();
    }
}
