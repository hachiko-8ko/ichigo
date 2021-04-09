export interface IPublishArrayChange<T = any> {
    publishCollectionChanged(
        type: string,
        propertyName: PropertyKey,
        args: any[],
        previousValue?: T[],
        newValue?: T[],
        sender?: any
    ): void;
}
