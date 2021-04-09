/**
 * A deferred promise is a wrapper around a promise that allows it to be triggered later. In pure JS, this is harder
 * than it needs to be, and it takes a weird hack to make it work. This class is little more than a wrapper around
 * said hack.
 *
 * Otherwise, this uses a real promise internally, so aside from the wrapping object, it has no special logic. I chose
 * not to re-implement the Promise API synchronously, so it uses the same microtask queue.
 *
 * The wrapping API is tweaked a little to avoid some common pitfalls that are caused by flaws in the Promise
 * design. For example, having onfulfilled and onrejected in the same step means that errors in the fulfilled
 * half will not be caught by the error handler.  Rather than say "don't use that input" like most instructors,
 * I just got rid of it (it's still accessible on the output property, if you want to use it ... but don't).
 */
export class DeferredPromise {
    [Symbol.toStringTag]: "DeferredPromise";

    private _promise: Promise<any>;
    constructor(
        onfulfilled?: (value: any) => any | PromiseLike<any>,
        private throwOnUnhandledError: boolean = false
    ) {
        // This is the weird hack that is the basis of this class. It's a closure, but reversed, as the
        // enclosed property is an internal reference accessed outside rather than an outside reference
        // accessed inside.
        this._promise = new Promise((_resolve, _reject) => {
            this.resolve = _resolve;
            this.reject = _reject;
        });

        // Make sure that there is always something at the first level, even if it's just returning the result.
        // We want the default behavior to allow the following:
        // const waitable = new DeferredPromise(); event.subscribe(waitable.resolve); const r = await waitable.output; console.log(r);
        // If you leave out the initial callback, you'll get undefined instead of what the event sends.
        if (onfulfilled) {
            this.then(onfulfilled, throwOnUnhandledError);
        } else {
            this.then(res => res, throwOnUnhandledError);
        }
    }

    /**
     * Use in async/await code. The following will work if a result is returned.
     * const result = await deferred.output;
     * console.log(result);
     */
    get output(): Promise<any> {
        return this._promise;
    }

    /** Use this to invoke the callback */
    // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
    resolve: (args?: any) => void = function _dummy() { };

    /** Use this to reject the promise right out. Which is probably useless but you never know. */
    // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
    reject: (args?: any) => void = function _dummy() { };

    /** Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback. */
    then<TResult1 = any>(
        onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>,
        throwOnUnhandledError: boolean = this.throwOnUnhandledError): this {

        if (onfulfilled) {
            this._promise = this._promise.then(onfulfilled);
        }
        // This is to keep a promise from, by default, eating up all errors. It's ugly.
        // It means a lot of extra steps. It makes sure that by default, the last step is always a catch.
        if (throwOnUnhandledError) {
            this._promise = this._promise.catch(err => { throw (err); });
        }
        return this;
    }

    catch<TResult = never>(onrejected?: (err: any) => TResult | PromiseLike<TResult>,
        throwOnUnhandledError: boolean = this.throwOnUnhandledError): this {
        if (onrejected) {
            this._promise = this._promise.catch(onrejected);
        }
        // Again this is a mess, but the catch handler above could throw
        if (throwOnUnhandledError) {
            this._promise = this._promise.catch(err => { throw (err); });
        }
        return this;
    }
}
