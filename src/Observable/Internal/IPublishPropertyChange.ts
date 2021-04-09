import { Nullable } from '../../System/Types/NoneType';

export interface IPublishPropertyChange {
    publishPropertyChanged<T = any>(
        type: string,
        propertyName: PropertyKey,
        oldValue?: Nullable<T>,
        newValue?: Nullable<T>,
        sender?: any
    ): void;
}
