// See types.d.ts.zip for function/class definitions

import { BoundComponent } from 'types/HtmlComponent/BoundComponent';
import { ComponentMap, getComponent } from 'types/HtmlComponent/ComponentMap';
import {
    ExistingElementBindingOptions,
    ExistingLookupBindingOptions,
    InnerHtmlBindingOptions,
    OuterHtmlBindingOptions,
} from 'types/HtmlComponent/Options/IComponentBindingOptions';
import { ExistingElementOptions } from 'types/HtmlComponent/Options/IExistingElementOptions';
import { ExistingLookupOptions } from 'types/HtmlComponent/Options/IExistingLookupOptions';
import { InnerHtmlOptions } from 'types/HtmlComponent/Options/IInnerHtmlOptions';
import { OuterHtmlOptions } from 'types/HtmlComponent/Options/IOuterHtmlOptions';

mi5.component = {
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