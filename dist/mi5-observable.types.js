// See types.d.ts.zip for function/class definitions

import { observableAssign } from 'types/Observable/ObservableAssign';
import { ObservableProperty } from 'types/Observable/ObservableProperty';
import { ObservableProxy } from 'types/Observable/ObservableProxy';
import { ObservableState } from 'types/Observable/ObservableState';
import { ArrayChangedEventArgs } from 'types/System/EventHandler/ArrayChangedEventArgs';
import { EventHandler } from 'types/System/EventHandler/EventHandler';
import { PropertyChangedEventArgs } from 'types/System/EventHandler/PropertyChangedEventArgs';

mi5.observable = {
    EventHandler,
    observableAssign,
    ObservableProperty,
    ObservableProxy,
    ObservableState,
    ArrayChangedEventArgs,
    PropertyChangedEventArgs,
};