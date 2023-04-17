import { IAction1 } from '../System/Types/DelegateInterfaces';
import { EventHandler } from '../System/EventHandler/EventHandler';
import { IEventChannel } from '../System/EventHandler/EventHub';

/**
 * A class that can notify listeners of changes, typically changes to fields and properties, but
 * other changes are allowed. It's a very general type of event, which is why the args are any object.
 */
export interface IObservable<TArgs = any> {
    subscribe(callback: IAction1<TArgs>, thisArg?: any): void;

    unsubscribe(thisArg: any): void;
    unsubscribe(callback: IAction1<TArgs>, thisArg?: any): void;
}

export function observableCheck(obj: any): obj is IObservable {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && '_eventChannel' in obj && "eventHandler" in obj._eventChannel && obj._eventChannel.eventHandler instanceof EventHandler;
}
