import { RepeatablePromise } from '../../src/System/Async/RepeatablePromise';
import { DeferredPromise } from '../../src/System/Async/DeferredPromise';

(function main() {
    const plugin: any = {
        DeferredPromise,
        RepeatablePromise
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.promise = Object.assign((window as any).mi5.promise || {}, plugin);
})();
