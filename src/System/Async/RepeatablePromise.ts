import { DeferredPromise } from "./DeferredPromise";

/**
 * The promise API is nice, mostly, but the main thing preventing use of a promise as an event handler is that
 * it only executes once. After that point, it is resolved, and there is no way to flip it back.
 *
 * The repeatable promise keeps the promise API and creates the illusion that the promise is repeated by
 * rebuilding the chain each time. It's really a deferred factory but it pretends to be a deferred. I'm sure
 * this has a performance penalty.
 *
 * You should not attach actual promises into the then() chain, because they can't be repeated. The Promise type isn't
 * allowed but there are ways to get around the TS compiler. The TS type definition for Promise and PromiseLike isn't
 * completely correct, anyway, so it's easy to get used to using the any type and make broken code.
 *
 * You cannot async/await a repeatable promise itself but you can await a single resolution. Async/await is sugar that
 * creates a regular, non-repeatable, promise.
 */
export class RepeatablePromise {
    [Symbol.toStringTag]: "RepeatablePromise";

    private callbacks: Array<{ onfulfilled?: (value: any) => any | PromiseLike<any>, onrejected?: (reason: any) => any | PromiseLike<any> }> = [];

    constructor(
        onfulfilled?: (value: any) => any | PromiseLike<any>,
        private onUnhandledError?: ((value: any) => any | PromiseLike<any>) | null, // This adds a callback at the end (or 2nd from the end, see next option)
        private throwOnUnhandledError: boolean = false // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
    ) {
        // Make sure that there is always something at the first level, even if it's just returning the result. Useful for async/await code.
        if (onfulfilled) {
            this.then(onfulfilled);
        } else {
            this.then(res => res);
        }
    }

    // The following should work:
    // const repeatable = new RepeatablePromise(); const r = await repeatable.resolve(); console.log(r);
    resolve(args?: any): Promise<any> {
        const promise = this.build();
        promise.resolve(args);
        return promise.output;
    }

    reject(args?: any): Promise<any> {
        const promise = this.build();
        promise.reject(args);
        return promise.output;
    }

    // Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback.
    then<TResult1 = any>(
        onfulfilled?: (value: any) => TResult1 | PromiseLike<TResult1>): this {
        this.callbacks.push({ onfulfilled: onfulfilled });
        return this;
    }

    catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): this {
        this.callbacks.push({ onrejected: onrejected });
        return this;
    }

    build(): DeferredPromise {
        let promise: DeferredPromise | undefined;
        for (const cb of this.callbacks) {
            if (!promise) {
                // We know that the first is always onfulfilled and is never undefined
                if (!cb.onfulfilled) {
                    throw new Error("Bug in RepeatablePromise constructor. First onfulfilled is null.");
                }
                promise = new DeferredPromise(cb.onfulfilled, false);
            } else if (cb.onfulfilled) {
                promise.then(cb.onfulfilled);
            } else if (cb.onrejected) {
                promise.catch(cb.onrejected);
            }
        }

        if (!promise) {
            throw new Error("Bug in RepeatablePromise constructor. No callbacks, not even the default first onfulfilled.");
        }

        if (this.onUnhandledError) {
            promise.catch(this.onUnhandledError);
        }
        if (this.throwOnUnhandledError) {
            promise.catch(err => { throw (err); });
        }
        return promise;
    }
}
