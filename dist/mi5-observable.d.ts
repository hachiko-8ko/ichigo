import { Nullable } from '../src/System/Types/NoneType';
import { ObservableBase } from '../src/Observable/ObservableBase';
import { ObservableProperty } from '../src/Observable/ObservableProperty';
import { ObservableProxy } from '../src/Observable/ObservableProxy';
import { ObservableState } from '../src/Observable/ObservableState';
import { ArrayChangedEventArgs } from '../src/System/EventHandler/ArrayChangedEventArgs';
import { EventHandler } from '../src/System/EventHandler/EventHandler';
import { PropertyChangedEventArgs } from '../src/System/EventHandler/PropertyChangedEventArgs';

interface IObservable {
    EventHandler: EventHandler;
    observableAssign(target: any, ...sources: any[]): any;
    ObservableProxy: ObservableProxy;
    ObservableProperty: ObservableProperty<PropertyChangedEventArgs>;
    ObservableState: ObservableState;
    ArrayChangedEventArgs: ArrayChangedEventArgs;
    PropertyChangedEventArgs: PropertyChangedEventArgs;
}

interface IMi5 {
    observable: IObservable;
}

declare var mi5: IMi5;
declare function using(lib: any, alias: string): void;
