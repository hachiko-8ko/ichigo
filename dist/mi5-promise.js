(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepeatablePromise_1 = require("../../src/System/Async/RepeatablePromise");
const DeferredPromise_1 = require("../../src/System/Async/DeferredPromise");
(function main() {
    const plugin = {
        DeferredPromise: DeferredPromise_1.DeferredPromise,
        RepeatablePromise: RepeatablePromise_1.RepeatablePromise
    };
    window.mi5 = window.mi5 || {};
    window.mi5.promise = Object.assign(window.mi5.promise || {}, plugin);
    /**
     * This slightly simplifes the process of referencing mini-ichigo components without the full namespace.
     * It requires two arguments, unfortunately, because it's not possible in many cases to determine the
     * class or function name. Often the 'name' property has only the minified name, a random letter.
     */
    window.mi5.using = function using(lib, alias) {
        if (!lib || !alias) {
            throw new Error('NullArgument');
        }
        window.eval.call(window, '(function (arg) { window.' + alias + ' = arg; })')(lib);
    };
})();

},{"../../src/System/Async/DeferredPromise":2,"../../src/System/Async/RepeatablePromise":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class DeferredPromise {
    constructor(onfulfilled, throwOnUnhandledError = false) {
        this.throwOnUnhandledError = throwOnUnhandledError;
        /** Use this to invoke the callback */
        // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
        this.resolve = function _dummy() { };
        /** Use this to reject the promise right out. Which is probably useless but you never know. */
        // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
        this.reject = function _dummy() { };
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
        }
        else {
            this.then(res => res, throwOnUnhandledError);
        }
    }
    /**
     * Use in async/await code. The following will work if a result is returned.
     * const result = await deferred.output;
     * console.log(result);
     */
    get output() {
        return this._promise;
    }
    /** Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback. */
    then(onfulfilled, throwOnUnhandledError = this.throwOnUnhandledError) {
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
    catch(onrejected, throwOnUnhandledError = this.throwOnUnhandledError) {
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
exports.DeferredPromise = DeferredPromise;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeferredPromise_1 = require("./DeferredPromise");
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
class RepeatablePromise {
    constructor(onfulfilled, onUnhandledError, // This adds a callback at the end (or 2nd from the end, see next option)
    throwOnUnhandledError = false // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
    ) {
        this.onUnhandledError = onUnhandledError;
        this.throwOnUnhandledError = throwOnUnhandledError; // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
        this.callbacks = [];
        // Make sure that there is always something at the first level, even if it's just returning the result. Useful for async/await code.
        if (onfulfilled) {
            this.then(onfulfilled);
        }
        else {
            this.then(res => res);
        }
    }
    // The following should work:
    // const repeatable = new RepeatablePromise(); const r = await repeatable.resolve(); console.log(r);
    resolve(args) {
        const promise = this.build();
        promise.resolve(args);
        return promise.output;
    }
    reject(args) {
        const promise = this.build();
        promise.reject(args);
        return promise.output;
    }
    // Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback.
    then(onfulfilled) {
        this.callbacks.push({ onfulfilled: onfulfilled });
        return this;
    }
    catch(onrejected) {
        this.callbacks.push({ onrejected: onrejected });
        return this;
    }
    build() {
        let promise;
        for (const cb of this.callbacks) {
            if (!promise) {
                // We know that the first is always onfulfilled and is never undefined
                if (!cb.onfulfilled) {
                    throw new Error("Bug in RepeatablePromise constructor. First onfulfilled is null.");
                }
                promise = new DeferredPromise_1.DeferredPromise(cb.onfulfilled, false);
            }
            else if (cb.onfulfilled) {
                promise.then(cb.onfulfilled);
            }
            else if (cb.onrejected) {
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
exports.RepeatablePromise = RepeatablePromise;

},{"./DeferredPromise":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9Qcm9taXNlLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vQXN5bmMvUmVwZWF0YWJsZVByb21pc2VcIik7XG5jb25zdCBEZWZlcnJlZFByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL0FzeW5jL0RlZmVycmVkUHJvbWlzZVwiKTtcbihmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IHBsdWdpbiA9IHtcbiAgICAgICAgRGVmZXJyZWRQcm9taXNlOiBEZWZlcnJlZFByb21pc2VfMS5EZWZlcnJlZFByb21pc2UsXG4gICAgICAgIFJlcGVhdGFibGVQcm9taXNlOiBSZXBlYXRhYmxlUHJvbWlzZV8xLlJlcGVhdGFibGVQcm9taXNlXG4gICAgfTtcbiAgICB3aW5kb3cubWk1ID0gd2luZG93Lm1pNSB8fCB7fTtcbiAgICB3aW5kb3cubWk1LnByb21pc2UgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUucHJvbWlzZSB8fCB7fSwgcGx1Z2luKTtcbiAgICAvKipcbiAgICAgKiBUaGlzIHNsaWdodGx5IHNpbXBsaWZlcyB0aGUgcHJvY2VzcyBvZiByZWZlcmVuY2luZyBtaW5pLWljaGlnbyBjb21wb25lbnRzIHdpdGhvdXQgdGhlIGZ1bGwgbmFtZXNwYWNlLlxuICAgICAqIEl0IHJlcXVpcmVzIHR3byBhcmd1bWVudHMsIHVuZm9ydHVuYXRlbHksIGJlY2F1c2UgaXQncyBub3QgcG9zc2libGUgaW4gbWFueSBjYXNlcyB0byBkZXRlcm1pbmUgdGhlXG4gICAgICogY2xhc3Mgb3IgZnVuY3Rpb24gbmFtZS4gT2Z0ZW4gdGhlICduYW1lJyBwcm9wZXJ0eSBoYXMgb25seSB0aGUgbWluaWZpZWQgbmFtZSwgYSByYW5kb20gbGV0dGVyLlxuICAgICAqL1xuICAgIHdpbmRvdy5taTUudXNpbmcgPSBmdW5jdGlvbiB1c2luZyhsaWIsIGFsaWFzKSB7XG4gICAgICAgIGlmICghbGliIHx8ICFhbGlhcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOdWxsQXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuZXZhbC5jYWxsKHdpbmRvdywgJyhmdW5jdGlvbiAoYXJnKSB7IHdpbmRvdy4nICsgYWxpYXMgKyAnID0gYXJnOyB9KScpKGxpYik7XG4gICAgfTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9EZWZlcnJlZFByb21pc2VcIik7XG4vKipcbiAqIFRoZSBwcm9taXNlIEFQSSBpcyBuaWNlLCBtb3N0bHksIGJ1dCB0aGUgbWFpbiB0aGluZyBwcmV2ZW50aW5nIHVzZSBvZiBhIHByb21pc2UgYXMgYW4gZXZlbnQgaGFuZGxlciBpcyB0aGF0XG4gKiBpdCBvbmx5IGV4ZWN1dGVzIG9uY2UuIEFmdGVyIHRoYXQgcG9pbnQsIGl0IGlzIHJlc29sdmVkLCBhbmQgdGhlcmUgaXMgbm8gd2F5IHRvIGZsaXAgaXQgYmFjay5cbiAqXG4gKiBUaGUgcmVwZWF0YWJsZSBwcm9taXNlIGtlZXBzIHRoZSBwcm9taXNlIEFQSSBhbmQgY3JlYXRlcyB0aGUgaWxsdXNpb24gdGhhdCB0aGUgcHJvbWlzZSBpcyByZXBlYXRlZCBieVxuICogcmVidWlsZGluZyB0aGUgY2hhaW4gZWFjaCB0aW1lLiBJdCdzIHJlYWxseSBhIGRlZmVycmVkIGZhY3RvcnkgYnV0IGl0IHByZXRlbmRzIHRvIGJlIGEgZGVmZXJyZWQuIEknbSBzdXJlXG4gKiB0aGlzIGhhcyBhIHBlcmZvcm1hbmNlIHBlbmFsdHkuXG4gKlxuICogWW91IHNob3VsZCBub3QgYXR0YWNoIGFjdHVhbCBwcm9taXNlcyBpbnRvIHRoZSB0aGVuKCkgY2hhaW4sIGJlY2F1c2UgdGhleSBjYW4ndCBiZSByZXBlYXRlZC4gVGhlIFByb21pc2UgdHlwZSBpc24ndFxuICogYWxsb3dlZCBidXQgdGhlcmUgYXJlIHdheXMgdG8gZ2V0IGFyb3VuZCB0aGUgVFMgY29tcGlsZXIuIFRoZSBUUyB0eXBlIGRlZmluaXRpb24gZm9yIFByb21pc2UgYW5kIFByb21pc2VMaWtlIGlzbid0XG4gKiBjb21wbGV0ZWx5IGNvcnJlY3QsIGFueXdheSwgc28gaXQncyBlYXN5IHRvIGdldCB1c2VkIHRvIHVzaW5nIHRoZSBhbnkgdHlwZSBhbmQgbWFrZSBicm9rZW4gY29kZS5cbiAqXG4gKiBZb3UgY2Fubm90IGFzeW5jL2F3YWl0IGEgcmVwZWF0YWJsZSBwcm9taXNlIGl0c2VsZiBidXQgeW91IGNhbiBhd2FpdCBhIHNpbmdsZSByZXNvbHV0aW9uLiBBc3luYy9hd2FpdCBpcyBzdWdhciB0aGF0XG4gKiBjcmVhdGVzIGEgcmVndWxhciwgbm9uLXJlcGVhdGFibGUsIHByb21pc2UuXG4gKi9cbmNsYXNzIFJlcGVhdGFibGVQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgb25VbmhhbmRsZWRFcnJvciwgLy8gVGhpcyBhZGRzIGEgY2FsbGJhY2sgYXQgdGhlIGVuZCAob3IgMm5kIGZyb20gdGhlIGVuZCwgc2VlIG5leHQgb3B0aW9uKVxuICAgIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlIC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICkge1xuICAgICAgICB0aGlzLm9uVW5oYW5kbGVkRXJyb3IgPSBvblVuaGFuZGxlZEVycm9yO1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjsgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC4gVXNlZnVsIGZvciBhc3luYy9hd2FpdCBjb2RlLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlIGZvbGxvd2luZyBzaG91bGQgd29yazpcbiAgICAvLyBjb25zdCByZXBlYXRhYmxlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlKCk7IGNvbnN0IHIgPSBhd2FpdCByZXBlYXRhYmxlLnJlc29sdmUoKTsgY29uc29sZS5sb2cocik7XG4gICAgcmVzb2x2ZShhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICByZWplY3QoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlamVjdChhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICAvLyBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay5cbiAgICB0aGVuKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbmZ1bGZpbGxlZDogb25mdWxmaWxsZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbnJlamVjdGVkOiBvbnJlamVjdGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhlIGZpcnN0IGlzIGFsd2F5cyBvbmZ1bGZpbGxlZCBhbmQgaXMgbmV2ZXIgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKCFjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIEZpcnN0IG9uZnVsZmlsbGVkIGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlID0gbmV3IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZShjYi5vbmZ1bGZpbGxlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oY2Iub25mdWxmaWxsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25yZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goY2Iub25yZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIE5vIGNhbGxiYWNrcywgbm90IGV2ZW4gdGhlIGRlZmF1bHQgZmlyc3Qgb25mdWxmaWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2godGhpcy5vblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVwZWF0YWJsZVByb21pc2UgPSBSZXBlYXRhYmxlUHJvbWlzZTtcbiJdfQ==
