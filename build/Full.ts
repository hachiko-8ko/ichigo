import '../src/ExtensionLoader';

import { anchor, button, createElement, createFragment, createHtml, div, paragraph, span } from '../src/Html/CreateElement';
import { deleteNodeContent } from '../src/Html/DeleteNodeContent';
import { escapeHtml } from '../src/Html/EscapeHtml';
import { extractNodeContent } from '../src/Html/ExtractNodeContent';
import { findIndexInParent } from '../src/Html/FindIndexInParent';
import { getFormFieldValue, setFormFieldValue } from '../src/Html/FormFieldValue';
import { nodeListSelector, nodeListSelectorAll } from '../src/Html/QuerySelectorNodeList';
import { validateUniqueDomIds } from '../src/Html/ValidateUniqueDomIds';
import { BoundComponent } from '../src/HtmlComponent/BoundComponent';
import { Component } from '../src/HtmlComponent/Component';
import { ComponentMap, getComponent } from '../src/HtmlComponent/ComponentMap';
import { observableAssign } from '../src/Observable/ObservableAssign';
import { ObservableProperty } from '../src/Observable/ObservableProperty';
import { ObservableProxy } from '../src/Observable/ObservableProxy';
import { ObservableState } from '../src/Observable/ObservableState';
import { PageRouter } from '../src/Router/PageRouter';
import { DeferredPromise } from '../src/System/Async/DeferredPromise';
import { delay } from '../src/System/Async/Delay';
import { RepeatablePromise } from '../src/System/Async/RepeatablePromise';
import { cartesian, range, traverse, zip } from '../src/System/Collections/ArrayUtilities';
import { orderBy } from '../src/System/Collections/OrderBy';
import { ArrayChangedEventArgs } from '../src/System/EventHandler/ArrayChangedEventArgs';
import { EventHandler } from '../src/System/EventHandler/EventHandler';
import { PropertyChangedEventArgs } from '../src/System/EventHandler/PropertyChangedEventArgs';
import { kw, Kwarg } from '../src/System/Types/KeywordArguments';
import { isNone } from '../src/System/Types/NoneType';
import { cloneDeep } from '../src/System/Utility/CloneDeep';
import { cloneObject } from '../src/System/Utility/CloneObject';
import { getUniqueId } from '../src/System/Utility/GetUniqueId';
import { isPositiveIntegerString } from '../src/System/Utility/IsInteger';
import { objectFullAssign } from '../src/System/Utility/ObjectFullAssign';

(function main() {
    // This is not mini, but it is everything that's in any of the mini-ichigo
    // scripts combined into one. Because there is a bit of overlap, the size
    // is less than the size of all the other scripts put together, IF you want
    // everything.

    // This also can be used as an easy template if you want to make your own
    // build. Just delete what you don't want and run the gulp scripts.

    const component: any = {
        Component,
        BoundComponent,
        ComponentMap,
        getComponent,
    };
    const observable: any = {
        EventHandler,
        observableAssign,
        ObservableProperty,
        ObservableProxy,
        ObservableState,
        ArrayChangedEventArgs,
        PropertyChangedEventArgs,
    };
    const promise: any = {
        DeferredPromise,
        RepeatablePromise
    };
    const router: any = {
        PageRouter
    };
    const html: any = {
        anchor,
        button,
        createElement,
        createHtml,
        createFragment,
        deleteNodeContent,
        div,
        escapeHtml,
        extractNodeContent,
        findIndexInParent,
        getFormFieldValue,
        paragraph,
        nodeListSelector,
        nodeListSelectorAll,
        setFormFieldValue,
        span,
        validateUniqueDomIds,
    };
    const array: any = {
        cartesian,
        range,
        traverse,
        zip
    };
    const util: any = {
        array,
        cloneDeep,
        cloneObject,
        delay,
        getUniqueId,
        html,
        isNone,
        isPositiveIntegerString,
        kw,
        Kwarg,
        objectFullAssign,
        orderBy,
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.component = Object.assign((window as any).mi5.component || {}, component);
    (window as any).mi5.observable = Object.assign((window as any).mi5.observable || {}, observable);
    (window as any).mi5.promise = Object.assign((window as any).mi5.promise || {}, promise);
    (window as any).mi5.router = Object.assign((window as any).mi5.router || {}, router);
    (window as any).mi5.html = Object.assign((window as any).mi5.html || {}, html);
    (window as any).mi5.util = Object.assign((window as any).mi5.util || {}, util);
})();
