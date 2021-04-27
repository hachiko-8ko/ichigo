// See types.d.ts.zip for function/class definitions

import 'types/ExtensionLoader';

import { createElement, anchor, button, createFragment, createHtml, div, paragraph, span } from 'types/Html/CreateElement';
import { deleteNodeContent } from 'types/Html/DeleteNodeContent';
import { escapeHtml } from 'types/Html/EscapeHtml';
import { extractNodeContent } from 'types/Html/ExtractNodeContent';
import { findIndexInParent } from 'types/Html/FindIndexInParent';
import { getFormFieldValue, setFormFieldValue } from 'types/Html/FormFieldValue';
import { nodeListSelector, nodeListSelectorAll } from 'types/Html/QuerySelectorNodeList';
import { validateUniqueDomIds } from 'types/Html/ValidateUniqueDomIds';
import { BoundComponent } from 'types/HtmlComponent/BoundComponent';
import { Component } from 'types/HtmlComponent/Component';
import { ComponentMap, getComponent } from 'types/HtmlComponent/ComponentMap';
import { observableAssign } from 'types/Observable/ObservableAssign';
import { ObservableProperty } from 'types/Observable/ObservableProperty';
import { ObservableProxy } from 'types/Observable/ObservableProxy';
import { ObservableState } from 'types/Observable/ObservableState';
import { PageRouter } from 'types/Router/PageRouter';
import { DeferredPromise } from 'types/System/Async/DeferredPromise';
import { delay } from 'types/System/Async/Delay';
import { RepeatablePromise } from 'types/System/Async/RepeatablePromise';
import { cartesian, range, traverse, zip } from 'types/System/Collections/ArrayUtilities';
import { orderBy } from 'types/System/Collections/OrderBy';
import { ArrayChangedEventArgs } from 'types/System/EventHandler/ArrayChangedEventArgs';
import { EventHandler } from 'types/System/EventHandler/EventHandler';
import { PropertyChangedEventArgs } from 'types/System/EventHandler/PropertyChangedEventArgs';
import { kw, Kwarg } from 'types/System/Types/KeywordArguments';
import { isNone } from 'types/System/Types/NoneType';
import { cloneDeep } from 'types/System/Utility/CloneDeep';
import { cloneObject } from 'types/System/Utility/CloneObject';
import { getUniqueId } from 'types/System/Utility/GetUniqueId';
import { isPositiveIntegerString } from 'types/System/Utility/IsInteger';
import { objectFullAssign } from 'types/System/Utility/ObjectFullAssign';

mi5.component = {
    Component,
    BoundComponent,
    ComponentMap,
    getComponent,
};
mi5.observable = {
    EventHandler,
    observableAssign,
    ObservableProperty,
    ObservableProxy,
    ObservableState,
    ArrayChangedEventArgs,
    PropertyChangedEventArgs,
};
mi5.promise = {
    DeferredPromise,
    RepeatablePromise
};
mi5.router = {
    PageRouter
};
mi5.html = {
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
const plugin = {
    array: {
        cartesian,
        range,
        traverse,
        zip
    },
    cloneDeep,
    cloneObject,
    delay,
    getUniqueId,
    html: mi5.html,
    isNone,
    isPositiveIntegerString,
    kw,
    Kwarg,
    objectFullAssign,
    orderBy,
};