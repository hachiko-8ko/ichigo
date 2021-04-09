import { Nullable } from '../System/Types/NoneType';

/**
 * Escape an HTML string to protect against XSS and similar vulnerabilities.
 * For example, if you are displaying a text box, you don't want it to melt down as soon as "<"" appears in the box.
 */

export function escapeHtml(input: string): string;
export function escapeHtml(input: Nullable<string>): Nullable<string>;
export function escapeHtml(input: Nullable<string>): Nullable<string> {
    // There isn't a built-in way to do this, still, so we need a helper function.
    // The article "You are probably misusing DOM text methods" convinced me to do it this way,
    // vs. createTextNode. Though createTextNode would probably work fine for setting innerHTML.
    if (!input) {
        return input;
    }
    const escapes: { [index: string]: string } = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "/": "&#x2F;",
        "=": "&#x3D;",
        '"': "&quot;",
        "'": "&#39;",
        "`": "&#x60;"
    };
    return input.replace(/[&<>"'`=\/]/g, s => escapes[s]);
}
