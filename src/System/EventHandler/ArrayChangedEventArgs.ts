export class ArrayChangedEventArgs<T = any> {
    /**
     * The type of operation (method, set, delete)
     */
    type: string = '';
    propertyName: PropertyKey = '';
    args: any[] = [];

    oldValue?: T[]; // This could be bad for memory. Keep?
    newValue?: T[]; // This could be bad for memory. Keep?
    sender?: any;

    constructor(args?: ArrayChangedEventArgs<T>) {
        Object.assign(this, args);
    }
}
