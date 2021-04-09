import { PageRouter } from '../../src/Router/PageRouter';

(function main() {
    const plugin: any = {
        PageRouter
    };

    // This one's so simple I want to set mi5.router = PageRouter, but I have a convention to stick with.
    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.router = Object.assign((window as any).mi5.router || {}, plugin);
})();
