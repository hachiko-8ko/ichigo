import { RepeatablePromise } from '../../Async/RepeatablePromise';
import { IAction1 } from '../../Types/DelegateInterfaces';

/**
 * A delegate object is used by the EventHandler. It contains enough information to execute a callback synchronously or asynchronously
 * (using a promise). It also adds some strings to help in troubleshooting.
 */
export class Delegate {
    name?: string;

    // "Callback" in the object exists for sync code and for purpose of unsubscribing.
    // For async code, "promise" is actually used.
    callback: IAction1<any>;
    promise: RepeatablePromise;
    thisArg?: any;

    callbackName?: string;
    callbackOwnerName?: string;

    constructor(callback: IAction1<any>, thisArg?: any) {
        // In many cases (for example, when using fat arrow functions), thisArg is
        // not needed. But in most others, it is an annoying bug that requires troubleshooting
        // to figure out what the caller forgot. I've wavered between making it required and not.
        if (!thisArg) {
            // tslint:disable-next-line:no-console
            console.warn('Delegate created without thisArg. Did you mean to?');
        }
        this.thisArg = thisArg;
        if (thisArg && typeof thisArg === 'object' && 'constructor' in thisArg) {
            this.callbackOwnerName = thisArg.constructor.name;
        }

        if (!callback) {
            throw new Error("callback is required");
        }

        // The typescript compiler should handle this check but can't at runtime.
        if (typeof callback !== 'function') {
            throw new Error("callback must be a callback function");
        }
        this.callback = callback;
        this.callbackName = callback.name;

        if (this.callbackOwnerName && this.callbackName) {
            this.name = `${this.callbackOwnerName}.${this.callbackName}()`;
        } else if (this.callbackName) {
            this.name = this.callbackName + '()';
        } else if (this.callbackOwnerName) {
            this.name = this.callbackOwnerName + '.__lambda__()';
        }

        this.promise = new RepeatablePromise(callback.bind(thisArg));
    }
}

export function delegateGuard(obj: any): obj is Delegate {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    return "callback" in obj && "promise" in obj;
}
