import { observableAssign } from '../../src/Observable/ObservableAssign';
import { ObservableProperty } from '../../src/Observable/ObservableProperty';
import { ObservableProxy } from '../../src/Observable/ObservableProxy';
import { ObservableState } from '../../src/Observable/ObservableState';
import { ArrayChangedEventArgs } from '../../src/System/EventHandler/ArrayChangedEventArgs';
import { EventHandler } from '../../src/System/EventHandler/EventHandler';
import { PropertyChangedEventArgs } from '../../src/System/EventHandler/PropertyChangedEventArgs';

(function main() {
    const plugin: any = {
        EventHandler,
        observableAssign,
        ObservableProperty,
        ObservableProxy,
        ObservableState,
        ArrayChangedEventArgs,
        PropertyChangedEventArgs,
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.observable = Object.assign((window as any).mi5.observable || {}, plugin);
})();
