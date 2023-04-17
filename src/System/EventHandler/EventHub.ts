import { IAction1 } from '../Types/DelegateInterfaces';
import { EventChannel } from './Internal/EventChannel';

/**
 * Event channels provide static global access to all the event handlers, using a unique name. It's little more than an array of
 * event handlers. This makes it easy to access the relevant handler.
 *
 * For example, in regular operation all event listeners might listen to the main rendering channel. Any view model change would
 * publish 'main' and this would trigger logic (perhaps even change detection if I can figure out a clean way to do that with
 * complex objects) for everyone subscribing to 'main.'
 *
 * Be warned when subscribing to the 'main' channel. If different objects are sending different args, you have to be careful about
 * using the args property. If you're just using the event itself, there's no issue, but it could make change detection difficult.
 *
 * In pretty much every front-end javascript framework I've ever used, all observables that affected rendering affected anything on 
 * the page. It's not normal to have more than one channel. I use it in one place (heavily): making unit tests for this framework.
 * And that's it.
 *
 * This means that it's no longer necessary to follow nested delegate links to observables inside observables. Everyone can access
 * the channel hub. If you want everything in a certain area of the screen to act together, put them on the same channel.
 *
 * What this means is that no longer will you subscribe to the event handler on a particular observable. Instead, you'll subscribe
 * to the channel, probably main. And this in turn makes it possible to use deeply nested proxies without asking the difficult question, 
 * "ok, now what do I subscribe to so that changes are handled?"
 *
 * The one down-side to this is that the channels are no longer automatically destroyed when you destroy components, because they live
 * in the EventHub. So changing a route clears the hub.
 *
 * The EventHandler class is still there if you want to use it, but observables will go through channels.
 */
export class EventHub {
    /** The current channel is used when subscribing. By default, it's "main" but with this, you can do:
     *
     * EventHub.currentChannel = "login";
     * // Lots of subscribes
     * EventHub.currentChannel = "something else";
     *
     */
    static currentChannel: string = "main";
    static defaultAsyncSetting: boolean = true;

    static getChannel(eventChannel?: string): IEventChannel {
        eventChannel = eventChannel || this.currentChannel;
        let chan = EventHub._channels.get(eventChannel);
        if (!chan) {
            chan = new EventChannel(eventChannel, EventHub.defaultAsyncSetting);
            this._channels.set(eventChannel, chan);
        }
        return chan;
    }

    static subscribe<TArgs>(eventChannel: string, callback: IAction1<TArgs>, thisArg?: any): void;
    static subscribe<TArgs>(callback: IAction1<TArgs>, thisArg?: any): void;
    static subscribe<TArgs>(callbackOrName: IAction1<TArgs> | string, callbackOrThis?: any, thisArg?: any): void {
        if (typeof callbackOrName === "string") {
            // first param was the channel name
            _sub(callbackOrName, callbackOrThis, thisArg);
            return;
        }

        // first param was not the channel name
        _sub(this.currentChannel, callbackOrName, callbackOrThis);

        function _sub(name: string, callback2: IAction1<TArgs>, thisArg2: any): void {
            let chan = EventHub._channels.get(name);
            if (!chan) {
                chan = new EventChannel(name, EventHub.defaultAsyncSetting);
                EventHub._channels.set(name, chan);
            }
            chan.eventHandler.subscribe(callback2, thisArg2);
        }
    }

    // The current channel idea works less well for unsubscribing, because you aren't going to unsubscribe in
    // related groups (usually)
    static unsubscribe(eventChannel: string, thisArg: any): void;
    static unsubscribe(eventChannel: string, callback: IAction1<any>, thisArg?: any): void;
    static unsubscribe(eventChannel: string, sender: any, thisArg?: any): void {
        const chan = this._channels.get(eventChannel);
        if (!chan) {
            throw Error("Channel does not exist");
        }
        chan.eventHandler.unsubscribe(sender, thisArg);
    }

    static invoke<TArgs>(eventChannel: string, args: TArgs): void {
        const chan = this._channels.get(eventChannel);
        if (!chan) {
            throw Error("Channel does not exist");
        }
        chan.invoke(args);
    }

    static clear(eventChannel?: string) {
        if (eventChannel) {
            const ch = this._channels.get(eventChannel);
            if (!ch) {
                throw Error("Channel does not exist");
            }
            _clearChannel(ch);
            return;
        }

        // Clear all channels
        for (const ch of this._channels.values()) {
            _clearChannel(ch);
        }
        this._channels = new Map();
        this._channels.set("main", new EventChannel("main", this.defaultAsyncSetting));

        function _clearChannel(chan: EventChannel): void {
            chan.eventHandler.clear();
            EventHub._channels.delete(chan.name);
            delete chan.eventHandler;
        }
    }

    /**
     * Toggle async setting for one or all channels. Note that the static constructor always sets "main" as async by default.
     *
     * @param eventChannel 
     * @param asyncSetting 
     */
    static setAsync(asyncSetting: boolean): void;
    static setAsync(eventChannel: string, asyncSetting: boolean): void;
    static setAsync(eventChannel: string | boolean, asyncSetting: boolean = false): void {
        if (typeof eventChannel === 'boolean') { // overload 1
            asyncSetting = eventChannel;
            // Set all channels
            for (const chan of this._channels.values()) {
                chan.asyncSetting = asyncSetting;
            }
            return;
        }

        // overload 2
        const chan2 = this._channels.get(eventChannel);
        if (!chan2) {
            throw Error("Channel does not exist");
        }
        chan2.asyncSetting = asyncSetting;
    }

    // TODO: Make this change, once the opinionated rewrite is really underway
    // By default, store channels in a weakmap tied to an element of type i5-channel-hub
    // That way, the browser should delete the map, and the channels, and their arrays, as long as there is other no direct reference to them
    // Make it an option to use a real map, however, so this can be used outside browser context

    private static _channels: Map<string, EventChannel> = new Map([["main", new EventChannel("main")]]);
}

export interface IEventChannel {
    name: string;
    invoke(args: any): void;
}
