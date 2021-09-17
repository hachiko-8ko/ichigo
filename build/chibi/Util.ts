import { anchor, button, createElement, createFragment, createHtml, div, paragraph, span } from '../../src/Html/CreateElement';
import { deleteNodeContent } from '../../src/Html/DeleteNodeContent';
import { escapeHtml } from '../../src/Html/EscapeHtml';
import { extractNodeContent } from '../../src/Html/ExtractNodeContent';
import { findIndexInParent } from '../../src/Html/FindIndexInParent';
import { getFormFieldValue, setFormFieldValue } from '../../src/Html/FormFieldValue';
import { nodeListSelector, nodeListSelectorAll } from '../../src/Html/QuerySelectorNodeList';
import { validateUniqueDomIds } from '../../src/Html/ValidateUniqueDomIds';
import { delay } from '../../src/System/Async/Delay';
import { cartesian, range, traverse, zip } from '../../src/System/Collections/ArrayUtilities';
import { orderBy } from '../../src/System/Collections/OrderBy';
import { kwargsToObject, kw, Kwarg } from '../../src/System/Types/KeywordArguments';
import { isNone } from '../../src/System/Types/NoneType';
import { cloneDeep } from '../../src/System/Utility/CloneDeep';
import { cloneObject } from '../../src/System/Utility/CloneObject';
import { getUniqueId } from '../../src/System/Utility/GetUniqueId';
import { isPositiveIntegerString } from '../../src/System/Utility/IsInteger';
import { objectFullAssign } from '../../src/System/Utility/ObjectFullAssign';

(function main() {
    // The large number of HTML helper means it makes sense to give them their own node.
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
    const plugin: any = {
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
        kwargsToObject,
        objectFullAssign,
        orderBy,
    };

    (window as any).mi5 = (window as any).mi5 || {};
    (window as any).mi5.html = Object.assign((window as any).mi5.html || {}, html);
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
