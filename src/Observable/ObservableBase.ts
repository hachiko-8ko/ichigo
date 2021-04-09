import { RepeatablePromise } from '../System/Async/RepeatablePromise';
import { IObservable } from './IObservable';
import { PropertyChangedEventArgs } from '../System/EventHandler/PropertyChangedEventArgs';
import { EventHandler } from '../System/EventHandler/EventHandler';
import { IAction1 } from '../System/Types/DelegateInterfaces';
import { Nullable } from '../System/Types/NoneType';
import { RecursiveArray } from '../System/Types/RecursiveArray';
import { Delegate } from '../System/EventHandler/Delegate';

/**
 * Common logic between the different observable classes. These implement IObservable. The invocation itself varies from class to class.
 */
export abstract class ObservableBase<T = any> implements IObservable {
    changeHandler: EventHandler<T> = new EventHandler();

    constructor(options?: IObservableOptions);
    constructor({ name, forwardTo, bubbleFrom, disableAsync }: IObservableOptions = {}) {
        if (disableAsync) {
            this.changeHandler = new EventHandler(true);
        }
        if (forwardTo) {
            this.sendChangeEventsTo(forwardTo);
        }
        if (bubbleFrom) {
            for (const child of bubbleFrom) {
                this.receiveChangeEventsFrom(child);
            }
        }
        this.tagDelegate(name);
    }

    subscribe(delegate: RecursiveArray<Delegate>): void;
    subscribe(callback: IAction1<PropertyChangedEventArgs>, thisArg?: any): RepeatablePromise | undefined;
    subscribe(callback: IAction1<PropertyChangedEventArgs> | RecursiveArray<Delegate>, thisArg?: any): RepeatablePromise | undefined {
        // Typescript has forgotten that EventHandler can accept an array.
        // In spite if the fact that this signature is identical.
        return this.changeHandler.subscribe(callback as any, thisArg);
    }

    /**
     * Subscribe the input's delegate to this object's changes.
     */
    sendChangeEventsTo(forwardTo: IObservable): void {
        // Join the other event handler to this, so that when this is invoked, so is the other.
        this.subscribe(forwardTo.changeHandler.delegate);
    }

    /**
     * Subscribe this object's delegate to the input object's changes.
     */
    receiveChangeEventsFrom(bubbleFrom: IObservable): void {
        // Subscribe to events raised on the other handler, so that when that is invoked, so is this
        // The same as forwardChangeEventsTo except that this is the target, not the source.
        bubbleFrom.subscribe(this.changeHandler.delegate);
    }

    unsubscribeCallback(callback: IAction1<T>): void {
        return this.changeHandler.unsubscribeCallback(callback);
    }

    unsubscribeSender(sender: any): void {
        return this.changeHandler.unsubscribeListener(sender);
    }

    unsubscribeDelegate(delegate: RecursiveArray<Delegate>): void {
        return this.changeHandler.unsubscribeDelegate(delegate);
    }

    /**
     * This is probably frowned upon (see how TS doesn't like it), but it's valid JS.
     * It's only intended for troubleshooting, not real logic. There are times when you're
     * trying to identify exactly which delegates are subscribed, and this is really hard when
     * nothing has human-readable names.
     */
    tagDelegate(name: string): void {
        if (name) {
            (this.changeHandler.delegate as any)._tag = name;
        }
    }

    dispose(): void {
        this.changeHandler.dispose();
    }

    toJSON(): any {
        const result: Record<string, any> = {};
        for (const x in this) {
            if (x !== "changeHandler" && x !== "privateProperty2") {
                result[x] = this[x];
            }
        }
        return result;
    }
}

export interface IObservableOptions {
    name?: string;
    /**
     * This observable is a child of a different observable. Any events in this should be forwarded.
     */
    forwardTo?: IObservable;
    /**
     * This observable contains other observables. Any events in them should be received.
     */
    bubbleFrom?: IObservable[];
    /**
     * Execute delegates synchronously.
     */
    disableAsync?: boolean;
}
