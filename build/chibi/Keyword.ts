import { kwargsToObject, kw, Kwarg } from '../../src/System/Types/KeywordArguments';

// Just the two keyword argument objects, if you want to use them but nothing else.

(function main() {
    const plugin: any = {
        kw,
        Kwarg,
        kwargsToObject
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.util = Object.assign((window as any).mi5.util || {}, plugin);
})();
