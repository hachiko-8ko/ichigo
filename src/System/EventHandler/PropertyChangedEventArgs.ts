/**
 * Event arguments expected on any Change event.
 */
export class PropertyChangedEventArgs {
    /**
     * The type of change operation (set, delete) (potentially method)
     */
    type: string = '';
    /**
     * The name of the property being changed.
     */
    propertyName?: PropertyKey;
    /**
     * The value of the property, before change. Type is any because it could be forwarded from an object with incompatible type.
     */
    oldValue?: any;
    /**
     * The new value of the property, after change. Type is any because it could be forwarded from an object with incompatible type.
     */
    newValue?: any;
    /**
     * The observable sender of the event.
     */
    sender?: any;

    constructor(args?: PropertyChangedEventArgs) {
        Object.assign(this, args);
    }
}
