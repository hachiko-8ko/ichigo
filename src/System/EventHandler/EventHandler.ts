import { traverse } from '../Collections/ArrayUtilities';
import { IAction1 } from '../Types/DelegateInterfaces';
import { IDisposable } from '../Types/IDisposable';
import { RepeatablePromise } from '../Async/RepeatablePromise';
import { Delegate } from './Delegate';
import { RecursiveArray } from '../Types/RecursiveArray';

/**
 * I chose to use C# style events, not JS/TS, because the JS/TS way of doing delegates/custom events is a NIGHTMARE. Sure,
 * CustomEvent works, but on the TS side the code required to make TSC happy with valid javascript is awful and non-intuitive.
 * On the JS side, you have the problem that every handler picks it up, not just the ones that are bound to the relevant HTML
 * element, so elements need to pass the source as an argument and check it (like jquery and $(document).on()).
 *
 * After getting it working, all I could think about was how bad the code was, so I rewrote it avoiding the JS pattern entirely.
 *
 * This can be synchronous (callbacks) or asynchronous (promises).  When it is async, the code executes after the current synchronous
 * events run to completion. This could create bugs in synchronous code, but is best for browser events. This handler is primarily used for
 * browser events, so async is default.
 *
 * But if you're triggering async events in code and stepping through it in Chrome, what you see won't make sense, because the async
 * events won't occur until right away. It can be hard to troubleshoot.
 */
// tslint:disable-next-line:ban-types
export class EventHandler<TArgs = any> implements IDisposable {
    delegate: RecursiveArray<Delegate> = [];

    constructor(private _disableAsync: boolean = false) { }

    subscribe(delegate: RecursiveArray<Delegate>): void;
    subscribe(callback: IAction1<TArgs>, thisArg?: any): RepeatablePromise | undefined;
    subscribe(callback: IAction1<TArgs> | RecursiveArray<Delegate>, thisArg?: any): RepeatablePromise | undefined {
        // If this receives a delegate (which is an array of delegates), add it.
        // When this is invoked, that delegate will also be invoked.
        if (Array.isArray(callback)) {
            _ovr1_delegate.call(this, callback);
            return;
        }

        // Got a single callback

        // Only allow a single instance of the same callback.
        if (this.find({ callback, thisArg, firstMatch: true }).length) {
            return;
        }

        const newDele = new Delegate(callback, thisArg);
        this.delegate.push(newDele);

        // IF this is asynchronous, return the promise so it can be chained.
        // Chaining won't work on sync code, so do not in that case.
        if (!this._disableAsync) {
            return newDele.promise;
        }

        function _ovr1_delegate(this: EventHandler, delegate: RecursiveArray<Delegate>): void {
            // Only allow a single instance of the same delegate.
            if (this.delegate.find(q => q === delegate)) {
                return;
            }
            this.delegate.push(delegate);
            return;
        }
    }

    unsubscribeCallback(callback: IAction1<TArgs>): void {
        // Only searches non-delegates
        const index = this.delegate.findIndex(q => !Array.isArray(q) && q.callback === callback);
        if (index >= 0) {
            this.delegate.splice(index, 1);
        }
    }

    unsubscribeListener(sender: any): void {
        // First try to unsubscribe the default delegate. Can't do anything if it has a different name, though.
        if ("delegate" in sender) {
            this.unsubscribeDelegate(sender.delegate);
        }

        // Only searches non-delegates
        let index = 0;
        while (index >= 0) {
            index = this.delegate.findIndex(q => !Array.isArray(q) && q.thisArg === sender);
            if (index >= 0) {
                this.delegate.splice(index, 1);
            }
        }
    }

    unsubscribeDelegate(delegate: RecursiveArray<Delegate>): void {
        let index = 0;
        while (index >= 0) {
            index = this.delegate.findIndex(q => q === delegate);
            if (index >= 0) {
                this.delegate.splice(index, 1);
            }
        }
    }

    invoke(args: TArgs): void {
        for (const listener of traverse<Delegate>(this.delegate)) {
            if (!this._disableAsync) {
                // Async version. Does not work well with the chrome debugger.
                listener.promise.resolve(args);
            } else {
                listener.callback.call(listener.thisArg, args);
            }
        }
    }

    find({ callback, thisArg, firstMatch }: { callback?: IAction1<any>, thisArg?: any, firstMatch?: boolean } = {}): Delegate[] {
        const results: Delegate[] = [];
        for (const listener of traverse<Delegate>(this.delegate)) {
            if (match(listener)) {
                results.push(listener);
                if (firstMatch) {
                    break;
                }
            }
        }
        return results;

        function match(listener: Delegate): boolean {
            if (callback && thisArg) {
                return listener.callback === callback && listener.thisArg === thisArg;
            }
            if (callback) {
                return listener.callback === callback;
            }
            if (thisArg) {
                return listener.thisArg === thisArg;
            }
            return true;
        }
    }

    clear(): void {
        this.delegate.length = 0;
    }

    dispose(): void {
        this.clear();       // Clears the delegate
        (this.delegate as any) = undefined; // Makes sure this can't be used again
    }
}
