import { IAction1, IPredicate1 } from '../Types/DelegateInterfaces';
import { RepeatablePromise } from '../Async/RepeatablePromise';
import { Delegate } from './Internal/Delegate';

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
export class EventHandler<TArgs = any> {
    protected _delegates: Delegate[] = [];

    subscribe(callback: IAction1<TArgs>, thisArg?: any): void {
        // Only allow a single instance of the same callback.
        if (this.find({ callback, thisArg, firstMatch: true }).length) {
            return;
        }
        this._delegates.push(new Delegate(callback, thisArg));
    }

    unsubscribe(thisArg: any): void;
    unsubscribe(callback: IAction1<TArgs>, thisArg?: any): void;
    unsubscribe(sender: any, thisArg?: any): void {
        // This check assumes that thisArg isn't a function. Technically in JS, that's legal but awful.
        // var foo = function() {}; foo.someMethod = function() { chan.unsubscribe('terrible'); }
        if (typeof sender === "function") { // Overload 2
            this._unsubscribe(q => this._match(q, sender, thisArg));
        } else if (sender) { // Overload 1
            // Can't safely unsubscribe null or undefined, sorry
            this._unsubscribe(q => q.thisArg === sender);
        }
    }

    invoke(args: TArgs, asyncSetting?: boolean): void {
        for (const listener of this._delegates) {
            if (asyncSetting === false) {
                listener.callback.call(listener.thisArg, args);
            } else {
                // Async version. Does not work well with the chrome debugger.
                listener.promise.resolve(args);
            }
        }
    }

    find({ callback, thisArg, firstMatch }: { callback: IAction1<any>, thisArg?: any, firstMatch?: boolean }): Delegate[] {
        const results: Delegate[] = [];
        for (const listener of this._delegates) {
            if (this._match(listener, callback, thisArg)) {
                results.push(listener);
                if (firstMatch) {
                    break;
                }
            }
        }
        return results;
    }

    clear(): void {
        this._delegates.length = 0;
    }

    private _unsubscribe(test: IPredicate1<Delegate>): void {
        // This modifies the array it's iterating so can't use a normal iterable
        let i = 0;
        while (i < this._delegates.length) {
            if (test(this._delegates[i])) {
                this._delegates.splice(i, 1);
                continue;
            }
            i++;
        }
    }

    private _match(listener: Delegate, callback: IAction1<TArgs>, thisArg?: any): boolean {
        if (callback && thisArg) {
            return listener.callback === callback && listener.thisArg === thisArg;
        }
        if (callback) {
            return listener.callback === callback;
        }
        return false;
    }
}
