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

    /**
     * This slightly simplifes the process of referencing mini-ichigo components without the full namespace.
     * It requires two arguments, unfortunately, because it's not possible in many cases to determine the
     * class or function name. Often the 'name' property has only the minified name, a random letter.
     */
    (window as any).mi5.using = function using(lib: any, alias: string) {
        if (!lib || !alias) {
            throw new Error('NullArgument');
        }
        (window as any).eval.call(window, '(function (arg) { window.' + alias + ' = arg; })')(lib);
    };

})();
