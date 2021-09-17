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

    /**
     * This slightly simplifes the process of referencing mini-ichigo components without the full namespace.
     * It requires two arguments, unfortunately, because it's not possible in many cases to determine the
     * class or function name. Often the 'name' property has only the minified name, a random letter.
     */
    (window as any).mi5.using = function using(lib: any, alias: string) {
        if (!lib || !alias) {
            throw new Error('NullArgument');
        }
        (window as any).eval.call(window, '(function (arg) { window.' + alias + ' = arg; })')(lib);
    };

})();
