(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeywordArguments_1 = require("../../src/System/Types/KeywordArguments");
// Just the two keyword argument objects, if you want to use them but nothing else.
(function main() {
    const plugin = {
        kw: KeywordArguments_1.kw,
        Kwarg: KeywordArguments_1.Kwarg,
        kwargsToObject: KeywordArguments_1.kwargsToObject
    };
    window.mi5 = window.mi5 || {};
    window.mi5.util = Object.assign(window.mi5.util || {}, plugin);
    /**
     * This slightly simplifes the process of referencing mini-ichigo components without the full namespace.
     * It requires two arguments, unfortunately, because it's not possible in many cases to determine the
     * class or function name. Often the 'name' property has only the minified name, a random letter.
     */
    window.mi5.using = function using(lib, alias) {
        if (!lib || !alias) {
            throw new Error('NullArgument');
        }
        window.eval.call(window, '(function (arg) { window.' + alias + ' = arg; })')(lib);
    };
})();

},{"../../src/System/Types/KeywordArguments":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsInteger_1 = require("../Utility/IsInteger");
/**
 * This module provides an implementation of keyword arguments, as seen in Python and C#. It makes configurable
 * functions so much quicker and easier than flat arguments (forcing you to put undefined manually in different
 * slots) or options objects (takes more time to produce, especially if you need to new it up).
 *
 * Call functions having keyword arguments using this syntax:
 * callme(arg1, arg2, kw('something', kw1), kw('somethingElse', kw2))
 *
 * To make them work, in the function itself, you need to copy and paste. For example:
 * ({ arg1, arg2, something, somethingElse } = Kwarg.parse({ arg1, arg2, something, somethingElse }));
 */
class Kwarg {
    constructor(a, b) {
        if (!a) {
            throw new Error('Argument null exception');
        }
        this.name = a;
        this.value = b;
    }
    /**
     * Remember this template:
     * ({ } = Kwarg.parseArgs({ }));
     * Include default values in the first object, not the second.
     *
     * If you want to capture rest parameters, use this:
     * ({ $rest$ } = Kwarg.parseArgs({ , ...rest }));
     *
     * If you want allowUnknownKeyword to be true, use this:
     * ({ $$kw$$ } = Kwarg.parseArgs({ }, true));
     */
    static parseArgs(args, allowUnknownKeyword = false) {
        // It would be nice if this could take the arguments object, but sadly arguments stores only an array of values,
        // no keys. If JS were sane, it would be a Map, not an array. Two steps forward, one step back.
        // Parsing the string definition for the function is not my cup of tea, so just no.
        const obj = {};
        const names = Object.getOwnPropertyNames(args);
        // Get data by argument order
        for (const arg of names) {
            if (args[arg] instanceof Kwarg) {
                obj[arg] = undefined;
            }
            else {
                obj[arg] = args[arg];
            }
        }
        const kwvar = {};
        obj['$$kw$$'] = kwvar;
        // Check for rest parameters.
        // I was going to have this on/off configurable, but it shouldn't hurt performance.
        const arr = [];
        obj['$rest$'] = arr;
        // Rest parameters are stored as array keys, { '0': a, '1': b, 'nonRest': 'something else'}
        for (const arg of Object.getOwnPropertyNames(args).filter(f => IsInteger_1.isPositiveIntegerString(f))) {
            if (!(args[arg] instanceof Kwarg)) {
                arr.push(args[arg]);
            }
        }
        const keywordsUsed = {};
        // Get data by keyword name
        // Have to iterate the list twice, to avoid wiping out data if the order is swapped
        for (const arg of names) {
            if (args[arg] instanceof Kwarg) {
                const tmp = args[arg];
                if (tmp.name in obj) {
                    obj[tmp.name] = tmp.value;
                }
                else {
                    if (allowUnknownKeyword) {
                        kwvar[tmp.name] = tmp.value;
                    }
                    else {
                        throw new Error(`Got an unexpected keyword argument '${tmp.name}'`);
                    }
                }
                if (tmp.name in keywordsUsed) {
                    throw new Error(`Got multiple values for keyword argument + '${tmp.name}'`);
                }
                keywordsUsed[tmp.name] = true;
            }
        }
        return obj;
    }
    // Turn an object into an array of keyword arguments.
    // Needs to return any[] because it's going to be shoved into arbitrary argument lists
    static unpack(args) {
        const results = [];
        for (const arg of Object.getOwnPropertyNames(args)) {
            results.push(kw(arg, args[arg]));
        }
        return results;
    }
    isMatch(key) {
        return this.name === key;
    }
}
exports.Kwarg = Kwarg;
function kw(a, b) {
    if (!a) {
        throw new Error('Argument null exception');
    }
    if (typeof a === 'string') {
        // Overload 1
        return new Kwarg(a, b);
    }
    else if (Array.isArray(a)) {
        // Overload 2
        return new Kwarg(a[0], a[1]);
    }
    else {
        // Overload 3
        // This should be an object with only one key/value pair.
        const props = Object.getOwnPropertyNames(a);
        if (!props.length) {
            throw new Error('Argument null exception');
        }
        if (props.length > 1) {
            throw new Error('Invalid map object: multiple keys');
        }
        return new Kwarg(props[0], a[props[0]]);
    }
}
exports.kw = kw;
function kwargsToObject(arr) {
    const options = {};
    for (const arg of arr) {
        options[arg.name] = options[arg.value];
    }
    return options;
}
exports.kwargsToObject = kwargsToObject;

},{"../Utility/IsInteger":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tell if a given string is a positive integer.
 * Use for detecting array keys.
 */
function isPositiveIntegerString(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    if (str === '0') {
        return true;
    }
    return /^[1-9]\d*$/.test(str);
}
exports.isPositiveIntegerString = isPositiveIntegerString;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9LZXl3b3JkLmpzIiwic3JjL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzSW50ZWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBLZXl3b3JkQXJndW1lbnRzXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL1N5c3RlbS9UeXBlcy9LZXl3b3JkQXJndW1lbnRzXCIpO1xuLy8gSnVzdCB0aGUgdHdvIGtleXdvcmQgYXJndW1lbnQgb2JqZWN0cywgaWYgeW91IHdhbnQgdG8gdXNlIHRoZW0gYnV0IG5vdGhpbmcgZWxzZS5cbihmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IHBsdWdpbiA9IHtcbiAgICAgICAga3c6IEtleXdvcmRBcmd1bWVudHNfMS5rdyxcbiAgICAgICAgS3dhcmc6IEtleXdvcmRBcmd1bWVudHNfMS5Ld2FyZyxcbiAgICAgICAga3dhcmdzVG9PYmplY3Q6IEtleXdvcmRBcmd1bWVudHNfMS5rd2FyZ3NUb09iamVjdFxuICAgIH07XG4gICAgd2luZG93Lm1pNSA9IHdpbmRvdy5taTUgfHwge307XG4gICAgd2luZG93Lm1pNS51dGlsID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1LnV0aWwgfHwge30sIHBsdWdpbik7XG4gICAgLyoqXG4gICAgICogVGhpcyBzbGlnaHRseSBzaW1wbGlmZXMgdGhlIHByb2Nlc3Mgb2YgcmVmZXJlbmNpbmcgbWluaS1pY2hpZ28gY29tcG9uZW50cyB3aXRob3V0IHRoZSBmdWxsIG5hbWVzcGFjZS5cbiAgICAgKiBJdCByZXF1aXJlcyB0d28gYXJndW1lbnRzLCB1bmZvcnR1bmF0ZWx5LCBiZWNhdXNlIGl0J3Mgbm90IHBvc3NpYmxlIGluIG1hbnkgY2FzZXMgdG8gZGV0ZXJtaW5lIHRoZVxuICAgICAqIGNsYXNzIG9yIGZ1bmN0aW9uIG5hbWUuIE9mdGVuIHRoZSAnbmFtZScgcHJvcGVydHkgaGFzIG9ubHkgdGhlIG1pbmlmaWVkIG5hbWUsIGEgcmFuZG9tIGxldHRlci5cbiAgICAgKi9cbiAgICB3aW5kb3cubWk1LnVzaW5nID0gZnVuY3Rpb24gdXNpbmcobGliLCBhbGlhcykge1xuICAgICAgICBpZiAoIWxpYiB8fCAhYWxpYXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTnVsbEFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmV2YWwuY2FsbCh3aW5kb3csICcoZnVuY3Rpb24gKGFyZykgeyB3aW5kb3cuJyArIGFsaWFzICsgJyA9IGFyZzsgfSknKShsaWIpO1xuICAgIH07XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi9VdGlsaXR5L0lzSW50ZWdlclwiKTtcbi8qKlxuICogVGhpcyBtb2R1bGUgcHJvdmlkZXMgYW4gaW1wbGVtZW50YXRpb24gb2Yga2V5d29yZCBhcmd1bWVudHMsIGFzIHNlZW4gaW4gUHl0aG9uIGFuZCBDIy4gSXQgbWFrZXMgY29uZmlndXJhYmxlXG4gKiBmdW5jdGlvbnMgc28gbXVjaCBxdWlja2VyIGFuZCBlYXNpZXIgdGhhbiBmbGF0IGFyZ3VtZW50cyAoZm9yY2luZyB5b3UgdG8gcHV0IHVuZGVmaW5lZCBtYW51YWxseSBpbiBkaWZmZXJlbnRcbiAqIHNsb3RzKSBvciBvcHRpb25zIG9iamVjdHMgKHRha2VzIG1vcmUgdGltZSB0byBwcm9kdWNlLCBlc3BlY2lhbGx5IGlmIHlvdSBuZWVkIHRvIG5ldyBpdCB1cCkuXG4gKlxuICogQ2FsbCBmdW5jdGlvbnMgaGF2aW5nIGtleXdvcmQgYXJndW1lbnRzIHVzaW5nIHRoaXMgc3ludGF4OlxuICogY2FsbG1lKGFyZzEsIGFyZzIsIGt3KCdzb21ldGhpbmcnLCBrdzEpLCBrdygnc29tZXRoaW5nRWxzZScsIGt3MikpXG4gKlxuICogVG8gbWFrZSB0aGVtIHdvcmssIGluIHRoZSBmdW5jdGlvbiBpdHNlbGYsIHlvdSBuZWVkIHRvIGNvcHkgYW5kIHBhc3RlLiBGb3IgZXhhbXBsZTpcbiAqICh7IGFyZzEsIGFyZzIsIHNvbWV0aGluZywgc29tZXRoaW5nRWxzZSB9ID0gS3dhcmcucGFyc2UoeyBhcmcxLCBhcmcyLCBzb21ldGhpbmcsIHNvbWV0aGluZ0Vsc2UgfSkpO1xuICovXG5jbGFzcyBLd2FyZyB7XG4gICAgY29uc3RydWN0b3IoYSwgYikge1xuICAgICAgICBpZiAoIWEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWUgPSBhO1xuICAgICAgICB0aGlzLnZhbHVlID0gYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtZW1iZXIgdGhpcyB0ZW1wbGF0ZTpcbiAgICAgKiAoeyB9ID0gS3dhcmcucGFyc2VBcmdzKHsgfSkpO1xuICAgICAqIEluY2x1ZGUgZGVmYXVsdCB2YWx1ZXMgaW4gdGhlIGZpcnN0IG9iamVjdCwgbm90IHRoZSBzZWNvbmQuXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugd2FudCB0byBjYXB0dXJlIHJlc3QgcGFyYW1ldGVycywgdXNlIHRoaXM6XG4gICAgICogKHsgJHJlc3QkIH0gPSBLd2FyZy5wYXJzZUFyZ3MoeyAsIC4uLnJlc3QgfSkpO1xuICAgICAqXG4gICAgICogSWYgeW91IHdhbnQgYWxsb3dVbmtub3duS2V5d29yZCB0byBiZSB0cnVlLCB1c2UgdGhpczpcbiAgICAgKiAoeyAkJGt3JCQgfSA9IEt3YXJnLnBhcnNlQXJncyh7IH0sIHRydWUpKTtcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VBcmdzKGFyZ3MsIGFsbG93VW5rbm93bktleXdvcmQgPSBmYWxzZSkge1xuICAgICAgICAvLyBJdCB3b3VsZCBiZSBuaWNlIGlmIHRoaXMgY291bGQgdGFrZSB0aGUgYXJndW1lbnRzIG9iamVjdCwgYnV0IHNhZGx5IGFyZ3VtZW50cyBzdG9yZXMgb25seSBhbiBhcnJheSBvZiB2YWx1ZXMsXG4gICAgICAgIC8vIG5vIGtleXMuIElmIEpTIHdlcmUgc2FuZSwgaXQgd291bGQgYmUgYSBNYXAsIG5vdCBhbiBhcnJheS4gVHdvIHN0ZXBzIGZvcndhcmQsIG9uZSBzdGVwIGJhY2suXG4gICAgICAgIC8vIFBhcnNpbmcgdGhlIHN0cmluZyBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb24gaXMgbm90IG15IGN1cCBvZiB0ZWEsIHNvIGp1c3Qgbm8uXG4gICAgICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpO1xuICAgICAgICAvLyBHZXQgZGF0YSBieSBhcmd1bWVudCBvcmRlclxuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWYgKGFyZ3NbYXJnXSBpbnN0YW5jZW9mIEt3YXJnKSB7XG4gICAgICAgICAgICAgICAgb2JqW2FyZ10gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbYXJnXSA9IGFyZ3NbYXJnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrd3ZhciA9IHt9O1xuICAgICAgICBvYmpbJyQka3ckJCddID0ga3d2YXI7XG4gICAgICAgIC8vIENoZWNrIGZvciByZXN0IHBhcmFtZXRlcnMuXG4gICAgICAgIC8vIEkgd2FzIGdvaW5nIHRvIGhhdmUgdGhpcyBvbi9vZmYgY29uZmlndXJhYmxlLCBidXQgaXQgc2hvdWxkbid0IGh1cnQgcGVyZm9ybWFuY2UuXG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBvYmpbJyRyZXN0JCddID0gYXJyO1xuICAgICAgICAvLyBSZXN0IHBhcmFtZXRlcnMgYXJlIHN0b3JlZCBhcyBhcnJheSBrZXlzLCB7ICcwJzogYSwgJzEnOiBiLCAnbm9uUmVzdCc6ICdzb21ldGhpbmcgZWxzZSd9XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZ3MpLmZpbHRlcihmID0+IElzSW50ZWdlcl8xLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKGYpKSkge1xuICAgICAgICAgICAgaWYgKCEoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goYXJnc1thcmddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXl3b3Jkc1VzZWQgPSB7fTtcbiAgICAgICAgLy8gR2V0IGRhdGEgYnkga2V5d29yZCBuYW1lXG4gICAgICAgIC8vIEhhdmUgdG8gaXRlcmF0ZSB0aGUgbGlzdCB0d2ljZSwgdG8gYXZvaWQgd2lwaW5nIG91dCBkYXRhIGlmIHRoZSBvcmRlciBpcyBzd2FwcGVkXG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIG5hbWVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnc1thcmddIGluc3RhbmNlb2YgS3dhcmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBhcmdzW2FyZ107XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmpbdG1wLm5hbWVdID0gdG1wLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbG93VW5rbm93bktleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGt3dmFyW3RtcC5uYW1lXSA9IHRtcC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR290IGFuIHVuZXhwZWN0ZWQga2V5d29yZCBhcmd1bWVudCAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRtcC5uYW1lIGluIGtleXdvcmRzVXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEdvdCBtdWx0aXBsZSB2YWx1ZXMgZm9yIGtleXdvcmQgYXJndW1lbnQgKyAnJHt0bXAubmFtZX0nYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGtleXdvcmRzVXNlZFt0bXAubmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIC8vIFR1cm4gYW4gb2JqZWN0IGludG8gYW4gYXJyYXkgb2Yga2V5d29yZCBhcmd1bWVudHMuXG4gICAgLy8gTmVlZHMgdG8gcmV0dXJuIGFueVtdIGJlY2F1c2UgaXQncyBnb2luZyB0byBiZSBzaG92ZWQgaW50byBhcmJpdHJhcnkgYXJndW1lbnQgbGlzdHNcbiAgICBzdGF0aWMgdW5wYWNrKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmdzKSkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGt3KGFyZywgYXJnc1thcmddKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGlzTWF0Y2goa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IGtleTtcbiAgICB9XG59XG5leHBvcnRzLkt3YXJnID0gS3dhcmc7XG5mdW5jdGlvbiBrdyhhLCBiKSB7XG4gICAgaWYgKCFhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBPdmVybG9hZCAxXG4gICAgICAgIHJldHVybiBuZXcgS3dhcmcoYSwgYik7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgMlxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKGFbMF0sIGFbMV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gT3ZlcmxvYWQgM1xuICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBhbiBvYmplY3Qgd2l0aCBvbmx5IG9uZSBrZXkvdmFsdWUgcGFpci5cbiAgICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhKTtcbiAgICAgICAgaWYgKCFwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXJndW1lbnQgbnVsbCBleGNlcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1hcCBvYmplY3Q6IG11bHRpcGxlIGtleXMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEt3YXJnKHByb3BzWzBdLCBhW3Byb3BzWzBdXSk7XG4gICAgfVxufVxuZXhwb3J0cy5rdyA9IGt3O1xuZnVuY3Rpb24ga3dhcmdzVG9PYmplY3QoYXJyKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIGZvciAoY29uc3QgYXJnIG9mIGFycikge1xuICAgICAgICBvcHRpb25zW2FyZy5uYW1lXSA9IG9wdGlvbnNbYXJnLnZhbHVlXTtcbiAgICB9XG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5leHBvcnRzLmt3YXJnc1RvT2JqZWN0ID0ga3dhcmdzVG9PYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGVsbCBpZiBhIGdpdmVuIHN0cmluZyBpcyBhIHBvc2l0aXZlIGludGVnZXIuXG4gKiBVc2UgZm9yIGRldGVjdGluZyBhcnJheSBrZXlzLlxuICovXG5mdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHIgPT09ICcwJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC9eWzEtOV1cXGQqJC8udGVzdChzdHIpO1xufVxuZXhwb3J0cy5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyA9IGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nO1xuIl19
