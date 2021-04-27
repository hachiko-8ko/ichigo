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
})();
