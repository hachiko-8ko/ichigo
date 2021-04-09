import { RepeatablePromise } from '../System/Async/RepeatablePromise';
import { Delegate } from '../System/EventHandler/Delegate';
import { EventHandler } from '../System/EventHandler/EventHandler';
import { IAction1 } from '../System/Types/DelegateInterfaces';
import { IDisposable } from '../System/Types/IDisposable';
import { RecursiveArray } from '../System/Types/RecursiveArray';

/**
 * A class that can notify listeners of changes, typically changes to fields and properties, but
 * other changes are allowed. It's a very general type of event, which is why the args are any object.
 */
export interface IObservable extends IDisposable {
    changeHandler: EventHandler<any>;
    sendChangeEventsTo(forwardTo: IObservable): void;
    receiveChangeEventsFrom(bubbleFrom: IObservable): void;
    subscribe(delegate: RecursiveArray<Delegate>): void;
    subscribe(callback: IAction1<any>, thisArg?: any): RepeatablePromise | undefined;
    subscribe(callback: IAction1<any> | RecursiveArray<Delegate>, thisArg?: any): RepeatablePromise | undefined;

    unsubscribeCallback(callback: IAction1<any>): void;

    unsubscribeSender(sender: any): void;

    unsubscribeDelegate(delegate: RecursiveArray<Delegate>): void;
}

export function observableCheck(obj: any): obj is IObservable {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && 'changeHandler' in obj && obj.changeHandler instanceof EventHandler;
}
