import { PageRouter } from '../../src/Router/PageRouter';

(function main() {
    const plugin: any = {
        PageRouter
    };

    // This one's so simple I want to set mi5.router = PageRouter, but I have a convention to stick with.
    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.router = Object.assign((window as any).mi5.router || {}, plugin);

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
