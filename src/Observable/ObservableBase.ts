import { IAction1 } from '../System/Types/DelegateInterfaces';
import { EventHub, IEventChannel } from '../System/EventHandler/EventHub';
import { IObservable } from './IObservable';

/**
 * Common logic between the different observable classes. These implement IObservable. The invocation itself varies from class to class.
 */
export abstract class ObservableBase<TArgs = any> implements IObservable {
    private _eventChannelName?: string;
    protected get _eventChannel(): IEventChannel | null {
        // This is always pulled live, so we have as few references to the static eventChannel objects as possible (possible memory leaks)
        if (!this._eventChannelName) {
            return null;
        }
        return EventHub.getChannel(this._eventChannelName);
    }

    /**
     * Send either a channel name, nothing (to subscribe to the current channel), or "true" for doNotSubscribe to not set a channel.
     * You can always set a channel later by calling setChannel().
     */
    constructor();
    constructor(eventChannel?: string);
    constructor(doNotSubscribe: true);
    constructor(eventChannel?: string | true) {
        if (eventChannel === true) {
            this._eventChannelName = undefined;
        } else {
            this._eventChannelName = eventChannel || EventHub.currentChannel;
        }
    }

    subscribe(callback: IAction1<any>, thisArg?: any): void;
    subscribe(callback: any, thisArg?: any) {
        if (this._eventChannel) {
            EventHub.subscribe(this._eventChannel.name, callback, thisArg);
        }
    }
    unsubscribe(thisArg: any): void;
    unsubscribe(callback: IAction1<any>, thisArg?: any): void;
    unsubscribe(callback: any, thisArg?: any) {
        if (this._eventChannel) {
            EventHub.unsubscribe(this._eventChannel.name, callback, thisArg);
        }
    }

    toJSON(): any {
        const result: Record<string, any> = {};
        for (const x in this) {
            if (x !== "_eventChannel" && x !== "_eventChannelName" && x !== "__isProxy__") {
                result[x] = this[x];
            }
        }
        return result;
    }

    protected invoke(args: TArgs, name?: string): void {
        // Remember, someone could create an observable without subscribing to a channel.
        // This is pointless, but I'm not sure we should throw on it.
        if (!this._eventChannel) {
            // tslint:disable-next-line:no-console
            console.warn(`Observable ${name} not subscribed to an event channel`);
            return;
        }
        this._eventChannel.invoke(args);
    }
}
