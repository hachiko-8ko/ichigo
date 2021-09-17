import { Component } from '../../src/Api';
import { BoundComponent } from '../../src/HtmlComponent/BoundComponent';
import { ComponentMap, getComponent } from '../../src/HtmlComponent/ComponentMap';

(function main() {
    const plugin: any = {
        Component,
        BoundComponent,
        ComponentMap,
        getComponent,
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.component = Object.assign((window as any).mi5.component || {}, plugin);

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
