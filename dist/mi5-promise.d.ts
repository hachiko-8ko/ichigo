import { RepeatablePromise } from '../src/System/Async/RepeatablePromise';
import { DeferredPromise } from '../src/System/Async/DeferredPromise';

interface IPromise {
    DeferredPromise: DeferredPromise;
    RepeatablePromise: RepeatablePromise;
}

interface IMi5 {
    promise: IPromise;
}

declare var mi5: IMi5;
declare function using(lib: any, alias: string): void;
