import { BoundComponent } from '../../src/HtmlComponent/BoundComponent';
import { ComponentMap, getComponent } from '../../src/HtmlComponent/ComponentMap';
import {
    ExistingElementBindingOptions,
    ExistingLookupBindingOptions,
    InnerHtmlBindingOptions,
    OuterHtmlBindingOptions,
} from '../../src/HtmlComponent/Options/IComponentBindingOptions';
import { ExistingElementOptions } from '../../src/HtmlComponent/Options/IExistingElementOptions';
import { ExistingLookupOptions } from '../../src/HtmlComponent/Options/IExistingLookupOptions';
import { InnerHtmlOptions } from '../../src/HtmlComponent/Options/IInnerHtmlOptions';
import { OuterHtmlOptions } from '../../src/HtmlComponent/Options/IOuterHtmlOptions';

(function main() {
    const plugin: any = {
        BoundComponent,
        ComponentMap,
        ExistingElementBindingOptions,
        ExistingElementOptions,
        ExistingLookupOptions,
        ExistingLookupBindingOptions,
        getComponent,
        InnerHtmlBindingOptions,
        InnerHtmlOptions,
        OuterHtmlBindingOptions,
        OuterHtmlOptions,
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.component = Object.assign((window as any).mi5.component || {}, plugin);
})();
