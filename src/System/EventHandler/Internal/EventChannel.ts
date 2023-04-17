import { EventHandler } from '../EventHandler';
import { IEventChannel } from "../EventHub";

/**
 * The event channel class is a simple wrapper around an event handler, along with a name.
 * Observables should reference it using only IEventChannel. If this were C# I'd probably mark this as internal.
 */
export class EventChannel<TArgs = any> implements IEventChannel<TArgs> {
    eventHandler: EventHandler<TArgs> = new EventHandler<TArgs>();

    constructor(public name: string, public asyncSetting?: boolean) {
    }

    invoke(args: TArgs): void {
        this.eventHandler.invoke(args, this.asyncSetting);
    }
}
