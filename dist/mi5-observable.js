(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableAssign_1 = require("../../src/Observable/ObservableAssign");
const ObservableProperty_1 = require("../../src/Observable/ObservableProperty");
const ObservableProxy_1 = require("../../src/Observable/ObservableProxy");
const ObservableState_1 = require("../../src/Observable/ObservableState");
const ArrayChangedEventArgs_1 = require("../../src/System/EventHandler/ArrayChangedEventArgs");
const EventHandler_1 = require("../../src/System/EventHandler/EventHandler");
const PropertyChangedEventArgs_1 = require("../../src/System/EventHandler/PropertyChangedEventArgs");
(function main() {
    const plugin = {
        EventHandler: EventHandler_1.EventHandler,
        observableAssign: ObservableAssign_1.observableAssign,
        ObservableProperty: ObservableProperty_1.ObservableProperty,
        ObservableProxy: ObservableProxy_1.ObservableProxy,
        ObservableState: ObservableState_1.ObservableState,
        ArrayChangedEventArgs: ArrayChangedEventArgs_1.ArrayChangedEventArgs,
        PropertyChangedEventArgs: PropertyChangedEventArgs_1.PropertyChangedEventArgs,
    };
    window.mi5 = window.mi5 || {};
    window.mi5.observable = Object.assign(window.mi5.observable || {}, plugin);
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

},{"../../src/Observable/ObservableAssign":8,"../../src/Observable/ObservableProperty":10,"../../src/Observable/ObservableProxy":11,"../../src/Observable/ObservableState":12,"../../src/System/EventHandler/ArrayChangedEventArgs":16,"../../src/System/EventHandler/EventHandler":18,"../../src/System/EventHandler/PropertyChangedEventArgs":19}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escapeHtml(input) {
    // There isn't a built-in way to do this, still, so we need a helper function.
    // The article "You are probably misusing DOM text methods" convinced me to do it this way,
    // vs. createTextNode. Though createTextNode would probably work fine for setting innerHTML.
    if (!input) {
        return input;
    }
    const escapes = {
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
exports.escapeHtml = escapeHtml;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
function observableCheck(obj) {
    // Not an exhaustive test but it's the important bit.
    return obj && typeof obj === 'object' && 'changeHandler' in obj && obj.changeHandler instanceof EventHandler_1.EventHandler;
}
exports.observableCheck = observableCheck;

},{"../System/EventHandler/EventHandler":18}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayChangedEventArgs_1 = require("../../System/EventHandler/ArrayChangedEventArgs");
const ObjectFullAssign_1 = require("../../System/Utility/ObjectFullAssign");
const ObservableBase_1 = require("../ObservableBase");
class TraitSource extends ObservableBase_1.ObservableBase {
    constructor(disableAsync) {
        super({ name: 'ArrayProxy', disableAsync });
    }
}
// tslint:disable-next-line:max-classes-per-file
class ArrayObservable extends Array {
    constructor(...args) {
        super(...args);
    }
    static getMergedObservable(args, disableAsync) {
        // This is where I really need multiple inheritance. This needs to inherit from Array
        // because it's extending a built-in class. It also needs to inherit from ObservableBase.
        // Three choices:
        // 1) 50 lines of clipboard inheritance.
        // 2) Cheat heavily by taking a trait approach. This means hackery to make TS happy.
        // 3) Do the same as 2 with the built-in Array class. Not a problem but with #2 the class name acts
        // as a hint that it's not a default array, which is better.
        // #2 wins.
        const arr = new ArrayObservable(...args);
        const result = ObjectFullAssign_1.objectFullAssign(arr, new TraitSource(disableAsync));
        Object.defineProperty(result, 'changeHandler', { enumerable: false });
        return result;
    }
    // Objects created through map, filter, etc, should be generic arrays.
    static get [Symbol.species]() {
        return Array;
    }
    // Needs to be public so the proxy can call it, but should not be called outside the API. Imagine it's internal.
    publishCollectionChanged(type, propertyName, args, oldValue, newValue, sender) {
        // This requires a cheat. It will fail if the object is created with new();
        this.changeHandler.invoke(new ArrayChangedEventArgs_1.ArrayChangedEventArgs({ type, propertyName, args, oldValue, newValue, sender }));
    }
    toJSON() {
        return this.slice();
    }
}
exports.ArrayObservable = ArrayObservable;

},{"../../System/EventHandler/ArrayChangedEventArgs":16,"../../System/Utility/ObjectFullAssign":25,"../ObservableBase":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IsInteger_1 = require("../../System/Utility/IsInteger");
class ArrayProxyHandler {
    get(target, key, proxy) {
        if (key in target) {
            const methodCalled = Reflect.get(target, key, proxy);
            // Silent pass-through of other methods
            if (ArrayProxyHandler.methodsToWatch.indexOf(key.toString()) === -1) {
                return methodCalled;
            }
            return (...args) => {
                // TODO: Need to evaluate performance of copies
                const before = target.slice(); // This could be useful but it could also be a performance problem.
                const returnVal = methodCalled.apply(target, args);
                const after = target.slice(); // This could be useful but it could also be a performance problem.
                target.publishCollectionChanged('call', key, args, before, after, proxy);
                return returnVal;
            };
        }
    }
    set(target, key, value, proxy) {
        // Problem: We want to capture only length and [indexer] calls, but JS has no consistent
        // way of defining [indexer]. What makes it worse is that if a string is an integer, it is
        // converted to a number. And JS does not include a built-in way to test if a number is an integer.
        // Solution: A regex-based check. Ick. Way to remind me I'm using JS.
        if (key && (key.toString() === 'length' || typeof key === 'number' || IsInteger_1.isPositiveIntegerString(key))) {
            // TODO: Need to evaluate performance of copies
            const before = target.slice(); // This could be useful but it could also be a performance problem.
            Reflect.set(target, key, value, proxy);
            const after = target.slice(); // This could be useful but it could also be a performance problem.
            target.publishCollectionChanged('set', key, [value], before, after, proxy);
            return true;
        }
        else {
            Reflect.set(target, key, value, proxy);
            return true;
        }
    }
    deleteProperty(target, key) {
        const before = target.slice(); // This could be useful but it could also be a performance problem.
        Reflect.deleteProperty(target, key);
        const after = target.slice(); // This could be useful but it could also be a performance problem.
        // Cannot report proxy as sender because proxy not sent to this method
        target.publishCollectionChanged('delete', key, [], before, after, null);
        return true;
    }
}
// These are all the methods, not counting custom setters, that mutate an array.
ArrayProxyHandler.methodsToWatch = ['copyWithin', 'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
exports.ArrayProxyHandler = ArrayProxyHandler;

},{"../../System/Utility/IsInteger":23}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PropertyChangedEventArgs_1 = require("../../System/EventHandler/PropertyChangedEventArgs");
const ObservableBase_1 = require("../ObservableBase");
const ObjectFullAssign_1 = require("../../System/Utility/ObjectFullAssign");
class ObjectObservable extends ObservableBase_1.ObservableBase {
    /**
     * This is the only way to produce an object observable, for reasons of safety.
     */
    static getMergedObservable(data, disableAsync) {
        // We need something with all the properties of the input object merged with the properties of this.
        // I don't want to actually modify the input object. Even though it SHOULD be throwaway, I don't know.
        // And I don't want to take the risk that something in the input, an unknown factor, will make this blow up.
        // I know that this class has only 2 levels of inheritance (currently) and contains nothing very complex at any level.
        const result = ObjectFullAssign_1.objectFullAssign(data, new ObjectObservable(disableAsync), true);
        Object.defineProperty(result, 'changeHandler', { enumerable: false });
        return result;
    }
    constructor(disableAsync) {
        super({ name: "ObjectProxy", disableAsync });
    }
    // Needs to be public so the proxy can call it, but should not be called outside the API. Imagine it's internal.
    publishPropertyChanged(type, propertyName, oldValue, newValue, sender) {
        this.changeHandler.invoke(new PropertyChangedEventArgs_1.PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
    toJSON() {
        // This filters out the troublesome changeHandler field.
        return super.toJSON();
    }
}
exports.ObjectObservable = ObjectObservable;

},{"../../System/EventHandler/PropertyChangedEventArgs":19,"../../System/Utility/ObjectFullAssign":25,"../ObservableBase":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectProxyHandler {
    constructor(_methodsToWatch, _watchSet, _watchDelete, _triggerOnlyOnChange) {
        this._methodsToWatch = _methodsToWatch;
        this._watchSet = _watchSet;
        this._watchDelete = _watchDelete;
        this._triggerOnlyOnChange = _triggerOnlyOnChange;
    }
    get(target, key, proxy) {
        if (key in target) {
            const methodCalled = Reflect.get(target, key, proxy);
            // Silent pass-through of non-watched methods
            if (this._methodsToWatch.indexOf(key.toString()) === -1 || typeof methodCalled !== 'function') {
                return methodCalled;
            }
            // Return a wrapper around the method that publishes the change
            return (...args) => {
                const returnVal = methodCalled.apply(target, args);
                target.publishPropertyChanged('call', key, undefined, args, proxy);
                return returnVal;
            };
        }
    }
    set(target, key, value, proxy) {
        if (this._watchSet) {
            const oldValue = Reflect.get(target, key, proxy);
            Reflect.set(target, key, value, proxy);
            // If to be triggered only on change, check oldValue and newValue
            if (this._triggerOnlyOnChange && oldValue === value) {
                return true;
            }
            target.publishPropertyChanged('set', key, oldValue, value, proxy);
            return true;
        }
        else {
            Reflect.set(target, key, value, proxy);
            return true;
        }
    }
    deleteProperty(target, key) {
        if (this._watchDelete) {
            const oldValue = Reflect.get(target, key);
            Reflect.deleteProperty(target, key);
            // Cannot report proxy as sender because proxy not sent to this method
            target.publishPropertyChanged('delete', key, oldValue, undefined, null);
            return true;
        }
        else {
            Reflect.deleteProperty(target, key);
            return true;
        }
    }
}
exports.ObjectProxyHandler = ObjectProxyHandler;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableProperty_1 = require("./ObservableProperty");
/**
 * This is a simple implementation of Object.assign() that understands ObservableProperty,
 * so that it can update the value of the property without wiping out references to the
 * existing property with that key (which is what would happen if you used regular Object.assign()
 * on a non-proxied object).  It can also be used to read the value of an ObservableProperty.
 */
function observableAssign(target, ...sources) {
    target = target || {};
    for (const src of sources) {
        for (const key of Object.getOwnPropertyNames(src)) {
            const sprop = src[key];
            const tprop = target[key];
            let val;
            if (ObservableProperty_1.observablePropertyCheck(sprop)) {
                val = sprop.value;
            }
            else {
                val = sprop;
            }
            if (ObservableProperty_1.observablePropertyCheck(tprop)) {
                tprop.value = val;
            }
            else {
                target[key] = val;
            }
        }
    }
}
exports.observableAssign = observableAssign;

},{"./ObservableProperty":10}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventHandler_1 = require("../System/EventHandler/EventHandler");
/**
 * Common logic between the different observable classes. These implement IObservable. The invocation itself varies from class to class.
 */
class ObservableBase {
    constructor({ name, forwardTo, bubbleFrom, disableAsync } = {}) {
        this.changeHandler = new EventHandler_1.EventHandler();
        if (disableAsync) {
            this.changeHandler = new EventHandler_1.EventHandler(true);
        }
        if (forwardTo) {
            this.sendChangeEventsTo(forwardTo);
        }
        if (bubbleFrom) {
            for (const child of bubbleFrom) {
                this.receiveChangeEventsFrom(child);
            }
        }
        this.tagDelegate(name);
    }
    subscribe(callback, thisArg) {
        // Typescript has forgotten that EventHandler can accept an array.
        // In spite if the fact that this signature is identical.
        return this.changeHandler.subscribe(callback, thisArg);
    }
    /**
     * Subscribe the input's delegate to this object's changes.
     */
    sendChangeEventsTo(forwardTo) {
        // Join the other event handler to this, so that when this is invoked, so is the other.
        this.subscribe(forwardTo.changeHandler.delegate);
    }
    /**
     * Subscribe this object's delegate to the input object's changes.
     */
    receiveChangeEventsFrom(bubbleFrom) {
        // Subscribe to events raised on the other handler, so that when that is invoked, so is this
        // The same as forwardChangeEventsTo except that this is the target, not the source.
        bubbleFrom.subscribe(this.changeHandler.delegate);
    }
    unsubscribeCallback(callback) {
        return this.changeHandler.unsubscribeCallback(callback);
    }
    unsubscribeSender(sender) {
        return this.changeHandler.unsubscribeListener(sender);
    }
    unsubscribeDelegate(delegate) {
        return this.changeHandler.unsubscribeDelegate(delegate);
    }
    /**
     * This is probably frowned upon (see how TS doesn't like it), but it's valid JS.
     * It's only intended for troubleshooting, not real logic. There are times when you're
     * trying to identify exactly which delegates are subscribed, and this is really hard when
     * nothing has human-readable names.
     */
    tagDelegate(name) {
        if (name) {
            this.changeHandler.delegate._tag = name;
        }
    }
    dispose() {
        this.changeHandler.dispose();
    }
    toJSON() {
        const result = {};
        for (const x in this) {
            if (x !== "changeHandler" && x !== "privateProperty2") {
                result[x] = this[x];
            }
        }
        return result;
    }
}
exports.ObservableBase = ObservableBase;

},{"../System/EventHandler/EventHandler":18}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EscapeHtml_1 = require("../Html/EscapeHtml");
const PropertyChangedEventArgs_1 = require("../System/EventHandler/PropertyChangedEventArgs");
const NoneType_1 = require("../System/Types/NoneType");
const IsPrimitive_1 = require("../System/Utility/IsPrimitive");
const IObservable_1 = require("./IObservable");
const ObservableBase_1 = require("./ObservableBase");
/**
 * An ObservableProperty is a property that automatically raises a PropertyChanged event when it is modified. This is more
 * convenient than having to do it manually every time you need it.
 */
class ObservableProperty extends ObservableBase_1.ObservableBase {
    constructor(value, options = {}) {
        super(options);
        this.propertyName = "";
        this._triggerOnlyOnChange = false;
        options = options || {};
        this._value = value;
        this.propertyName = options.name || '';
        this._triggerOnlyOnChange = options.onlyWhenChanged || false;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const old = this._value;
        this._value = value;
        if (this._triggerOnlyOnChange && old === value) {
            return;
        }
        this.publishPropertyChanged('set', this.propertyName, old, value, this);
    }
    /**
     * Get the value (if a string) that has had special HTML characters escaped.
     */
    get safeValue() {
        if (NoneType_1.isNone(this._value) || !IsPrimitive_1.isPrimitive(this._value)) {
            return "";
        }
        return EscapeHtml_1.escapeHtml(String(this._value));
    }
    toString() {
        return JSON.stringify(this._value);
    }
    toJSON() {
        return this._value;
    }
    publishPropertyChanged(type, propertyName, oldValue, newValue, sender) {
        this.changeHandler.invoke(new PropertyChangedEventArgs_1.PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
}
exports.ObservableProperty = ObservableProperty;
function observablePropertyCheck(obj) {
    if (!IObservable_1.observableCheck(obj)) {
        return false;
    }
    // I don't like this because it should be checking if value is a setter,
    // and it isn't, because there is no way to check.
    // Object.getOwnPropertyDescriptor() doesn't catch inherited properties, of
    // which this is almost always one.
    // I have to fall back to a basic instance check.
    return obj && obj instanceof ObservableProperty;
}
exports.observablePropertyCheck = observablePropertyCheck;

},{"../Html/EscapeHtml":2,"../System/EventHandler/PropertyChangedEventArgs":19,"../System/Types/NoneType":20,"../System/Utility/IsPrimitive":24,"./IObservable":3,"./ObservableBase":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayObservable_1 = require("./Internal/ArrayObservable");
const ArrayProxyHandler_1 = require("./Internal/ArrayProxyHandler");
const ObjectObservable_1 = require("./Internal/ObjectObservable");
const ObjectProxyHandler_1 = require("./Internal/ObjectProxyHandler");
class ObservableProxy {
    static proximate(model, disableAsync, onlyIfChanged) {
        if (typeof model === 'function') {
            // We can't do functions, not that they would be very useful.
            // Yes, technically you should be able to define properties on a function. They are actual
            // objects.  In practice, however, Object.defineProperty() still makes them undefined.
            throw new Error('Unsupported type: function');
        }
        else if (Array.isArray(model)) {
            // An array proxy allows changes to an array to be observed. The down-side is that performance
            // is an order of magnitude slower than using an ObservableList.  The up-side is that it uses
            // more than an order of magnitude less code.
            return this.proximateArray(model, disableAsync, onlyIfChanged);
        }
        else if (typeof model === 'object') {
            return this.proximateObject(model, disableAsync, onlyIfChanged);
        }
        else {
            // If a simple value is returned, return a proxy having a value property.
            return this.proximateObject({ value: model }, disableAsync, onlyIfChanged);
        }
    }
    /**
     * A configurable version of proximate() called on an object. By making it generalized and configurable, this allows the caller to
     * track methods that are called, based on a configurable list.
     *
     * If the object is a complex object, where child objects are modified, not the main object, changes would not be caught.
     * One way to handle that is to make the child object a proxy. Another way is to access the child object only through methods
     * and use this.
     */
    static proximateObject(model, disableAsync, onlyIfChanged, methodsToWatch = [], watchSet = true, watchDelete = true) {
        if (typeof model === 'function') {
            // We can't do functions, not that they would be very useful.
            // Yes, technically you should be able to define properties on a function. They are actual
            // objects.  In practice, however, Object.defineProperty() still makes them undefined.
            throw new Error('Unsupported type: function');
        }
        // Add IObservable methods to the model so that it can raise events.
        // We must extend the original class (or at least the object).
        const target = ObjectObservable_1.ObjectObservable.getMergedObservable(model, disableAsync);
        const handler = new ObjectProxyHandler_1.ObjectProxyHandler(methodsToWatch || [], watchSet || false, watchDelete || false, onlyIfChanged || false);
        const proxy = new Proxy(target, handler);
        ObservableProxy._models.set(proxy, target);
        return proxy;
    }
    /**
     * Proximate an array.
     */
    static proximateArray(model, disableAsync, onlyIfChanged) {
        // Add IObservable methods to the model so that it can raise events.
        // We must extend the original array class (or at least the array object).
        const target = ArrayObservable_1.ArrayObservable.getMergedObservable(model, disableAsync);
        // The type here isn't accurate, but I have no good way to pass the key type without making this class only work for arrays.
        const handler = new ArrayProxyHandler_1.ArrayProxyHandler();
        const proxy = new Proxy(target, handler);
        ObservableProxy._models.set(proxy, target);
        return proxy;
    }
}
// The original target object needs to be stored somewhere so that the proxy can work.
// There's no reason that the user can't keep a copy but we shouldn't force that.
ObservableProxy._models = new WeakMap();
exports.ObservableProxy = ObservableProxy;

},{"./Internal/ArrayObservable":4,"./Internal/ArrayProxyHandler":5,"./Internal/ObjectObservable":6,"./Internal/ObjectProxyHandler":7}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EscapeHtml_1 = require("../Html/EscapeHtml");
const PropertyChangedEventArgs_1 = require("../System/EventHandler/PropertyChangedEventArgs");
const NoneType_1 = require("../System/Types/NoneType");
const CloneDeep_1 = require("../System/Utility/CloneDeep");
const IsPrimitive_1 = require("../System/Utility/IsPrimitive");
const IObservable_1 = require("./IObservable");
const ObservableBase_1 = require("./ObservableBase");
/**
 * An observable state that should only be accessed using the relevant methods, allowing atomic changes to multiple properties
 * in multiple objects, raising a single event.
 */
class ObservableState extends ObservableBase_1.ObservableBase {
    constructor(value, options = {}) {
        super(options);
        this.propertyName = "";
        if (value instanceof ObservableState) {
            this._value = CloneDeep_1.cloneDeep(value.value);
        }
        else {
            this._value = CloneDeep_1.cloneDeep(value);
        }
        options = options || {};
        this.propertyName = options.name || 'setState';
    }
    get value() {
        // I would prefer that this return Readonly<T> but getter and setter have to be the same type.
        // That means you would have to cast any value you set as a readonly, which is a PITA.
        return CloneDeep_1.cloneDeep(this._value);
    }
    /**
     * Overwrites the entire value.
     */
    set value(value) {
        this.setState(value, true);
    }
    getSafeValue(property) {
        // If value is primitive, then call this with no arguments.
        // That is the only case where it is allowed.
        if (!property) {
            if (!NoneType_1.isNone(this._value) && IsPrimitive_1.isPrimitive(this._value)) {
                return EscapeHtml_1.escapeHtml(String(this._value));
            }
            return "";
        }
        const tmp = this.value[property];
        if (NoneType_1.isNone(tmp) || !IsPrimitive_1.isPrimitive(tmp)) {
            return "";
        }
        return EscapeHtml_1.escapeHtml(String(tmp));
    }
    getValue(property) {
        // If value is primitive, then call this with no arguments.
        // That is the only case where it is allowed.
        if (!property) {
            if (!NoneType_1.isNone(this._value) && IsPrimitive_1.isPrimitive(this._value)) {
                return CloneDeep_1.cloneDeep(this._value);
            }
            return undefined;
        }
        return this.value[property];
    }
    getState() {
        // The Readonly type works fine and it's fast ... in typescript.
        // In javascript, if you just return the value, nothing prevents it from being edited.
        return CloneDeep_1.cloneDeep(this.value);
    }
    setState(value, overWriteAll = false) {
        const oldValue = CloneDeep_1.cloneDeep(this._value);
        let newValue;
        let returnValue;
        // If the type is primitive, then a full overwrite is allowed
        if (IsPrimitive_1.isPrimitive(this._value)) {
            // Functions will execute but they won't change the value. The reason is the same reason that this makes no permanent change to bar:
            // var foo = function(str) { str = str.toUpperCase(); }; var bar = 'abc'; foo(bar); console.log(bar === 'abc');
            if (typeof value === 'function') {
                throw new Error('Cannot call setState with a function if state is primitive.');
            }
            overWriteAll = true;
        }
        if (overWriteAll) {
            newValue = _ovr1_overwriteAll.call(this, value);
        }
        else if (typeof value === 'function') {
            [newValue, returnValue] = _ovr3_functionArg.call(this, value);
        }
        else {
            if (!value || typeof value !== 'object') {
                throw new Error('value is not a partial state or a function');
            }
            newValue = _ovr2_partial.call(this, value);
        }
        this.publishPropertyChanged('call', this.propertyName, oldValue, newValue, this);
        return { oldValue, newValue, returnValue };
        function _ovr1_overwriteAll(_value) {
            // Overwrite the entire object.
            this._value = CloneDeep_1.cloneDeep(_value);
            return _value;
        }
        function _ovr2_partial(_value) {
            // Partial object: Overwrite only the keys provided
            const tmp = CloneDeep_1.cloneDeep(this._value);
            for (const key of Object.getOwnPropertyNames(_value)) {
                tmp[key] = _value[key];
            }
            this._value = CloneDeep_1.cloneDeep(tmp);
            return tmp;
        }
        function _ovr3_functionArg(_value) {
            // Execute the function provided and update the object as dictated
            // Maybe unnecessary but we want to avoid the caller exfiltrating the state using a function,
            // by accident. Of course, they can just access _value by casting as any,
            // but that's not accidental.
            const tmp = CloneDeep_1.cloneDeep(this._value);
            const _returnValue = _value.call(tmp, tmp);
            this._value = CloneDeep_1.cloneDeep(tmp);
            return [tmp, _returnValue];
        }
    }
    toString() {
        return JSON.stringify(this._value);
    }
    toJSON() {
        return this.value;
    }
    publishPropertyChanged(type, propertyName, oldValue, newValue, sender) {
        this.changeHandler.invoke(new PropertyChangedEventArgs_1.PropertyChangedEventArgs({ type, propertyName, oldValue, newValue, sender }));
    }
}
exports.ObservableState = ObservableState;
function observableStateCheck(obj) {
    if (!IObservable_1.observableCheck(obj)) {
        return false;
    }
    // I don't know if I should check for this or for getState() and setState()
    return obj && obj instanceof ObservableState;
}
exports.observableStateCheck = observableStateCheck;

},{"../Html/EscapeHtml":2,"../System/EventHandler/PropertyChangedEventArgs":19,"../System/Types/NoneType":20,"../System/Utility/CloneDeep":21,"../System/Utility/IsPrimitive":24,"./IObservable":3,"./ObservableBase":9}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A deferred promise is a wrapper around a promise that allows it to be triggered later. In pure JS, this is harder
 * than it needs to be, and it takes a weird hack to make it work. This class is little more than a wrapper around
 * said hack.
 *
 * Otherwise, this uses a real promise internally, so aside from the wrapping object, it has no special logic. I chose
 * not to re-implement the Promise API synchronously, so it uses the same microtask queue.
 *
 * The wrapping API is tweaked a little to avoid some common pitfalls that are caused by flaws in the Promise
 * design. For example, having onfulfilled and onrejected in the same step means that errors in the fulfilled
 * half will not be caught by the error handler.  Rather than say "don't use that input" like most instructors,
 * I just got rid of it (it's still accessible on the output property, if you want to use it ... but don't).
 */
class DeferredPromise {
    constructor(onfulfilled, throwOnUnhandledError = false) {
        this.throwOnUnhandledError = throwOnUnhandledError;
        /** Use this to invoke the callback */
        // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
        this.resolve = function _dummy() { };
        /** Use this to reject the promise right out. Which is probably useless but you never know. */
        // tslint:disable-next-line:no-empty TS doesn't know that the properties are replaced in the promise in the constructor
        this.reject = function _dummy() { };
        // This is the weird hack that is the basis of this class. It's a closure, but reversed, as the
        // enclosed property is an internal reference accessed outside rather than an outside reference
        // accessed inside.
        this._promise = new Promise((_resolve, _reject) => {
            this.resolve = _resolve;
            this.reject = _reject;
        });
        // Make sure that there is always something at the first level, even if it's just returning the result.
        // We want the default behavior to allow the following:
        // const waitable = new DeferredPromise(); event.subscribe(waitable.resolve); const r = await waitable.output; console.log(r);
        // If you leave out the initial callback, you'll get undefined instead of what the event sends.
        if (onfulfilled) {
            this.then(onfulfilled, throwOnUnhandledError);
        }
        else {
            this.then(res => res, throwOnUnhandledError);
        }
    }
    /**
     * Use in async/await code. The following will work if a result is returned.
     * const result = await deferred.output;
     * console.log(result);
     */
    get output() {
        return this._promise;
    }
    /** Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback. */
    then(onfulfilled, throwOnUnhandledError = this.throwOnUnhandledError) {
        if (onfulfilled) {
            this._promise = this._promise.then(onfulfilled);
        }
        // This is to keep a promise from, by default, eating up all errors. It's ugly.
        // It means a lot of extra steps. It makes sure that by default, the last step is always a catch.
        if (throwOnUnhandledError) {
            this._promise = this._promise.catch(err => { throw (err); });
        }
        return this;
    }
    catch(onrejected, throwOnUnhandledError = this.throwOnUnhandledError) {
        if (onrejected) {
            this._promise = this._promise.catch(onrejected);
        }
        // Again this is a mess, but the catch handler above could throw
        if (throwOnUnhandledError) {
            this._promise = this._promise.catch(err => { throw (err); });
        }
        return this;
    }
}
exports.DeferredPromise = DeferredPromise;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeferredPromise_1 = require("./DeferredPromise");
/**
 * The promise API is nice, mostly, but the main thing preventing use of a promise as an event handler is that
 * it only executes once. After that point, it is resolved, and there is no way to flip it back.
 *
 * The repeatable promise keeps the promise API and creates the illusion that the promise is repeated by
 * rebuilding the chain each time. It's really a deferred factory but it pretends to be a deferred. I'm sure
 * this has a performance penalty.
 *
 * You should not attach actual promises into the then() chain, because they can't be repeated. The Promise type isn't
 * allowed but there are ways to get around the TS compiler. The TS type definition for Promise and PromiseLike isn't
 * completely correct, anyway, so it's easy to get used to using the any type and make broken code.
 *
 * You cannot async/await a repeatable promise itself but you can await a single resolution. Async/await is sugar that
 * creates a regular, non-repeatable, promise.
 */
class RepeatablePromise {
    constructor(onfulfilled, onUnhandledError, // This adds a callback at the end (or 2nd from the end, see next option)
    throwOnUnhandledError = false // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
    ) {
        this.onUnhandledError = onUnhandledError;
        this.throwOnUnhandledError = throwOnUnhandledError; // This keeps a promise from, by default, eating up all errors. It adds a final catch that throws if hit.
        this.callbacks = [];
        // Make sure that there is always something at the first level, even if it's just returning the result. Useful for async/await code.
        if (onfulfilled) {
            this.then(onfulfilled);
        }
        else {
            this.then(res => res);
        }
    }
    // The following should work:
    // const repeatable = new RepeatablePromise(); const r = await repeatable.resolve(); console.log(r);
    resolve(args) {
        const promise = this.build();
        promise.resolve(args);
        return promise.output;
    }
    reject(args) {
        const promise = this.build();
        promise.reject(args);
        return promise.output;
    }
    // Then() only has one option, because it's too easy to forget that the onrejected callback doesn't handle the onfulled callback.
    then(onfulfilled) {
        this.callbacks.push({ onfulfilled: onfulfilled });
        return this;
    }
    catch(onrejected) {
        this.callbacks.push({ onrejected: onrejected });
        return this;
    }
    build() {
        let promise;
        for (const cb of this.callbacks) {
            if (!promise) {
                // We know that the first is always onfulfilled and is never undefined
                if (!cb.onfulfilled) {
                    throw new Error("Bug in RepeatablePromise constructor. First onfulfilled is null.");
                }
                promise = new DeferredPromise_1.DeferredPromise(cb.onfulfilled, false);
            }
            else if (cb.onfulfilled) {
                promise.then(cb.onfulfilled);
            }
            else if (cb.onrejected) {
                promise.catch(cb.onrejected);
            }
        }
        if (!promise) {
            throw new Error("Bug in RepeatablePromise constructor. No callbacks, not even the default first onfulfilled.");
        }
        if (this.onUnhandledError) {
            promise.catch(this.onUnhandledError);
        }
        if (this.throwOnUnhandledError) {
            promise.catch(err => { throw (err); });
        }
        return promise;
    }
}
exports.RepeatablePromise = RepeatablePromise;

},{"./DeferredPromise":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return elements of array a lined up with elements of array b. Both arrays don't have to be the same length.
 */
function zip(a, b) {
    if (a.length >= b.length) {
        return a.map((element, index) => [element, b[index]]);
    }
    else {
        return b.map((element, index) => [a[index], b]);
    }
}
exports.zip = zip;
/**
 * Return a cartesian join (cross join) between arrays a and b.
 */
function cartesian(a, b) {
    /// typescript prevents a direct use of concat, so do this manually with a loop
    const results = [];
    for (const item of a) {
        results.push(...b.map(q => [item, q]));
    }
    return results;
}
exports.cartesian = cartesian;
/**
 * Generate a range of integers, counting up by 1, for the given length. Stolen from Python.
 */
function range(length) {
    return Array.from({ length: length }, (value, key) => key);
}
exports.range = range;
/**
 * Given an array of items and other arrays, flatten them out into a single array.
 */
function* traverse(arr) {
    if (!Array.isArray(arr)) {
        yield arr;
    }
    else {
        for (const row of arr) {
            yield* traverse(row);
        }
    }
}
exports.traverse = traverse;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayChangedEventArgs {
    constructor(args) {
        /**
         * The type of operation (method, set, delete)
         */
        this.type = '';
        this.propertyName = '';
        this.args = [];
        Object.assign(this, args);
    }
}
exports.ArrayChangedEventArgs = ArrayChangedEventArgs;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepeatablePromise_1 = require("../Async/RepeatablePromise");
/**
 * A delegate object is used by the EventHandler. It contains enough information to execute a callback synchronously or asynchronously
 * (using a promise). It also adds some strings to help in troubleshooting, because searching a recursive array of complex objects can make
 * it a bear to find out why a callback isn't being executed.
 */
class Delegate {
    constructor(callback, thisArg) {
        // In many cases (for example, when using fat arrow functions), thisArg is
        // not needed. But in most others, it is an annoying bug that requires troubleshooting
        // to figure out what the caller forgot. I've wavered between making it required and not.
        if (!thisArg) {
            // tslint:disable-next-line:no-console
            console.warn('Delegate created without thisArg. Did you mean to?');
        }
        this.thisArg = thisArg;
        if (thisArg && typeof thisArg === 'object' && 'constructor' in thisArg) {
            this.callbackOwnerName = thisArg.constructor.name;
        }
        if (!callback) {
            throw new Error("callback is required");
        }
        // The typescript compiler should handle this check but can't at runtime.
        if (typeof callback !== 'function') {
            throw new Error("callback must be a callback function");
        }
        this.callback = callback;
        this.callbackName = callback.name;
        if (this.callbackOwnerName && this.callbackName) {
            this.name = `${this.callbackOwnerName}.${this.callbackName}()`;
        }
        else if (this.callbackName) {
            this.name = this.callbackName + '()';
        }
        else if (this.callbackOwnerName) {
            this.name = this.callbackOwnerName + '.__lambda__()';
        }
        this.promise = new RepeatablePromise_1.RepeatablePromise(callback.bind(thisArg));
    }
}
exports.Delegate = Delegate;

},{"../Async/RepeatablePromise":14}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtilities_1 = require("../Collections/ArrayUtilities");
const Delegate_1 = require("./Delegate");
/**
 * I chose to use C# style events, not JS/TS, because the JS/TS way of doing delegates/custom events is a NIGHTMARE. Sure,
 * CustomEvent works, but on the TS side the code required to make TSC happy with valid javascript is awful and non-intuitive.
 * On the JS side, you have the problem that every handler picks it up, not just the ones that are bound to the relevant HTML
 * element, so elements need to pass the source as an argument and check it (like jquery and $(document).on()).
 *
 * After getting it working, all I could think about was how bad the code was, so I rewrote it avoiding the JS pattern entirely.
 *
 * This can be synchronous (callbacks) or asynchronous (promises).  When it is async, the code executes after the current synchronous
 * events run to completion. This could create bugs in synchronous code, but is best for browser events. This handler is primarily used for
 * browser events, so async is default.
 *
 * But if you're triggering async events in code and stepping through it in Chrome, what you see won't make sense, because the async
 * events won't occur until right away. It can be hard to troubleshoot.
 */
// tslint:disable-next-line:ban-types
class EventHandler {
    constructor(_disableAsync = false) {
        this._disableAsync = _disableAsync;
        this.delegate = [];
    }
    subscribe(callback, thisArg) {
        // If this receives a delegate (which is an array of delegates), add it.
        // When this is invoked, that delegate will also be invoked.
        if (Array.isArray(callback)) {
            _ovr1_delegate.call(this, callback);
            return;
        }
        // Got a single callback
        // Only allow a single instance of the same callback.
        if (this.find({ callback, thisArg, firstMatch: true }).length) {
            return;
        }
        const newDele = new Delegate_1.Delegate(callback, thisArg);
        this.delegate.push(newDele);
        // IF this is asynchronous, return the promise so it can be chained.
        // Chaining won't work on sync code, so do not in that case.
        if (!this._disableAsync) {
            return newDele.promise;
        }
        function _ovr1_delegate(delegate) {
            // Only allow a single instance of the same delegate.
            if (this.delegate.find(q => q === delegate)) {
                return;
            }
            this.delegate.push(delegate);
            return;
        }
    }
    unsubscribeCallback(callback) {
        // Only searches non-delegates
        let i = 0;
        while (i < this.delegate.length) {
            const q = this.delegate[i];
            if (!Array.isArray(q) && q.callback === callback) {
                this.delegate.splice(i, 1);
                continue;
            }
            i++;
        }
    }
    unsubscribeListener(sender) {
        // First try to unsubscribe the default delegate. Can't do anything if it has a different name, though.
        if ("delegate" in sender) {
            this.unsubscribeDelegate(sender.delegate);
        }
        // Only searches non-delegates
        let i = 0;
        while (i < this.delegate.length) {
            const q = this.delegate[i];
            if (!Array.isArray(q) && q.thisArg === sender) {
                this.delegate.splice(i, 1);
                continue;
            }
            i++;
        }
    }
    unsubscribeDelegate(delegate) {
        let i = 0;
        while (i < this.delegate.length) {
            const q = this.delegate[i];
            if (q === delegate) {
                this.delegate.splice(i, 1);
                continue;
            }
            i++;
        }
    }
    invoke(args) {
        for (const listener of ArrayUtilities_1.traverse(this.delegate)) {
            if (!this._disableAsync) {
                // Async version. Does not work well with the chrome debugger.
                listener.promise.resolve(args);
            }
            else {
                listener.callback.call(listener.thisArg, args);
            }
        }
    }
    find({ callback, thisArg, firstMatch } = {}) {
        const results = [];
        for (const listener of ArrayUtilities_1.traverse(this.delegate)) {
            if (match(listener)) {
                results.push(listener);
                if (firstMatch) {
                    break;
                }
            }
        }
        return results;
        function match(listener) {
            if (callback && thisArg) {
                return listener.callback === callback && listener.thisArg === thisArg;
            }
            if (callback) {
                return listener.callback === callback;
            }
            if (thisArg) {
                return listener.thisArg === thisArg;
            }
            return true;
        }
    }
    clear() {
        this.delegate.length = 0;
    }
    dispose() {
        this.clear(); // Clears the delegate
        this.delegate = undefined; // Makes sure this can't be used again
    }
}
exports.EventHandler = EventHandler;

},{"../Collections/ArrayUtilities":15,"./Delegate":17}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Event arguments expected on any Change event.
 */
class PropertyChangedEventArgs {
    constructor(args) {
        /**
         * The type of change operation (set, delete) (potentially method)
         */
        this.type = '';
        Object.assign(this, args);
    }
}
exports.PropertyChangedEventArgs = PropertyChangedEventArgs;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNone(test) {
    return (test == null || test === undefined);
}
exports.isNone = isNone;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneDeep(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) {
        return obj; // primitive types
    }
    if (hash.has(obj)) {
        return hash.get(obj); // reference to object previously seen
    }
    let result;
    if (obj instanceof Set) {
        result = new Set();
        Array.from(obj, val => result.add(cloneDeep(val, hash)));
    }
    else if (obj instanceof Map) {
        result = new Map();
        Array.from(obj, ([key, val]) => result.add(cloneDeep(key, hash), cloneDeep(val, hash)));
    }
    else if (Array.isArray(obj)) {
        result = Array.from(obj);
    }
    else if (obj instanceof Date) {
        result = new Date(obj);
    }
    else if (obj instanceof RegExp) {
        result = new RegExp(obj.source, obj.flags);
    }
    else if (typeof obj === 'function') {
        // This is awful code, but it's the only way to clone a standalone function (vs a method which has a descriptor).
        // In general, you probably don't want to use cloneDeep on functions. You'll see it's NOT used on internal methods.
        result = new Function('return ' + obj.toString())();
    }
    else if (Object.getPrototypeOf(obj)) {
        result = Object.create(Object.getPrototypeOf(obj));
    }
    else {
        result = Object.create(null);
    }
    hash.set(obj, result); // Keep track of objects previously cloned
    for (const key of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor && descriptor.writable === false) {
            continue;
        }
        if (typeof obj[key] === 'function' && !(key in result)) {
            // Handle methods that aren't in the prototype.
            // This doesn't recursively follow because there's nothing recursive to do.
            if (descriptor) {
                Object.defineProperty(result, key, descriptor);
                hash.set(obj[key], result[key]);
                // NOTE that cloneDeep is NOT called recursively here. It all ends at the method.
                // If extra keys are thrown onto a function, they probably will not be cloned.
                // In my experience, extra keys on functions didn't work right, so no big loss.
            }
        }
        else if (descriptor && (descriptor.get || descriptor.set)) {
            // Handle custom getters/setters. These are local and hopefully work just like methods.
            // In many cases, this is redundant with Object.create(), but is necessary to allow objects with manually-added custom getters.
            Object.defineProperty(result, key, descriptor);
            // NOTE that cloneDeep is NOT called recursively here. It all ends at the getter/setter.
            // ALSO hash not updated; this is not possible, because it will map the value it gets, not the getter.
        }
        else {
            result[key] = cloneDeep(obj[key], hash);
        }
    }
    return result;
}
exports.cloneDeep = cloneDeep;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// I don't know for sure if this will work in all cases.
// It gets deeper into the guts of JS object than I have experience with.
function cloneObject(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    const result = Object.create(Object.getPrototypeOf(obj));
    for (const key of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
            Object.defineProperty(result, key, descriptor);
        }
    }
    return result;
}
exports.cloneObject = cloneObject;

},{}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I don't know how accurate this is but it seems pretty good
 */
function isPrimitive(obj) {
    return Object(obj) !== obj;
}
exports.isPrimitive = isPrimitive;

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CloneObject_1 = require("./CloneObject");
const NoneType_1 = require("../Types/NoneType");
/**
 * Object.assign() can be used for simple copies of properties, but it misses getters,
 * setters, and inherited properties. It only gets the local values.
 *
 * This should hopefully resolve that, but I don't know for sure. This is very sketchy.
 * The results are completely flat, because you can't have multiple inheritance hierarchy
 * in a language without multiple inheritance. Because this flattens objects, it is guaranteed
 * to break anything that makes super calls.
 *
 * If returnClone is true, a clone of the target object will be modified and returned, leaving
 * the original untouched.
 */
function objectFullAssign(target, source, returnClone = false) {
    if (NoneType_1.isNone(target)) {
        target = {};
    }
    if (!source || typeof source !== 'object' || typeof target !== 'object') {
        return target;
    }
    if (returnClone) {
        target = CloneObject_1.cloneObject(target);
    }
    const names = Array.from(new Set(findThePropertyNames(source)));
    for (const key of names) {
        const descriptor = findThePropertyDescriptor(source, key);
        if (descriptor) {
            Object.defineProperty(target, key, descriptor);
        }
    }
    return target;
    function findThePropertyNames(obj) {
        const result = [];
        result.push(...Object.getOwnPropertyNames(obj).filter(f => f !== 'constructor'));
        const proto = Object.getPrototypeOf(obj);
        if (proto && proto.constructor.name !== 'Object') {
            result.push(...findThePropertyNames(proto));
        }
        return result;
    }
    function findThePropertyDescriptor(obj, key) {
        const result = Object.getOwnPropertyDescriptor(obj, key);
        if (result) {
            return result;
        }
        const proto = Object.getPrototypeOf(obj);
        if (proto && proto.constructor.name !== 'Object') {
            return findThePropertyDescriptor(proto, key);
        }
    }
}
exports.objectFullAssign = objectFullAssign;

},{"../Types/NoneType":20,"./CloneObject":22}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9PYnNlcnZhYmxlLmpzIiwic3JjL0h0bWwvRXNjYXBlSHRtbC5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXIuanMiLCJzcmMvT2JzZXJ2YWJsZS9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnbi5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVCYXNlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3h5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlLmpzIiwic3JjL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllcy5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0FycmF5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0RlbGVnYXRlLmpzIiwic3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyLmpzIiwic3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzLmpzIiwic3JjL1N5c3RlbS9UeXBlcy9Ob25lVHlwZS5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXAuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVPYmplY3QuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgT2JzZXJ2YWJsZUFzc2lnbl8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVBc3NpZ25cIik7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG5jb25zdCBPYnNlcnZhYmxlUHJveHlfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlUHJveHlcIik7XG5jb25zdCBPYnNlcnZhYmxlU3RhdGVfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvT2JzZXJ2YWJsZS9PYnNlcnZhYmxlU3RhdGVcIik7XG5jb25zdCBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9BcnJheUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9zcmMvU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG4oZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBwbHVnaW4gPSB7XG4gICAgICAgIEV2ZW50SGFuZGxlcjogRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyLFxuICAgICAgICBvYnNlcnZhYmxlQXNzaWduOiBPYnNlcnZhYmxlQXNzaWduXzEub2JzZXJ2YWJsZUFzc2lnbixcbiAgICAgICAgT2JzZXJ2YWJsZVByb3BlcnR5OiBPYnNlcnZhYmxlUHJvcGVydHlfMS5PYnNlcnZhYmxlUHJvcGVydHksXG4gICAgICAgIE9ic2VydmFibGVQcm94eTogT2JzZXJ2YWJsZVByb3h5XzEuT2JzZXJ2YWJsZVByb3h5LFxuICAgICAgICBPYnNlcnZhYmxlU3RhdGU6IE9ic2VydmFibGVTdGF0ZV8xLk9ic2VydmFibGVTdGF0ZSxcbiAgICAgICAgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzOiBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMS5BcnJheUNoYW5nZWRFdmVudEFyZ3MsXG4gICAgICAgIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnczogUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzLFxuICAgIH07XG4gICAgd2luZG93Lm1pNSA9IHdpbmRvdy5taTUgfHwge307XG4gICAgd2luZG93Lm1pNS5vYnNlcnZhYmxlID0gT2JqZWN0LmFzc2lnbih3aW5kb3cubWk1Lm9ic2VydmFibGUgfHwge30sIHBsdWdpbik7XG4gICAgLyoqXG4gICAgICogVGhpcyBzbGlnaHRseSBzaW1wbGlmZXMgdGhlIHByb2Nlc3Mgb2YgcmVmZXJlbmNpbmcgbWluaS1pY2hpZ28gY29tcG9uZW50cyB3aXRob3V0IHRoZSBmdWxsIG5hbWVzcGFjZS5cbiAgICAgKiBJdCByZXF1aXJlcyB0d28gYXJndW1lbnRzLCB1bmZvcnR1bmF0ZWx5LCBiZWNhdXNlIGl0J3Mgbm90IHBvc3NpYmxlIGluIG1hbnkgY2FzZXMgdG8gZGV0ZXJtaW5lIHRoZVxuICAgICAqIGNsYXNzIG9yIGZ1bmN0aW9uIG5hbWUuIE9mdGVuIHRoZSAnbmFtZScgcHJvcGVydHkgaGFzIG9ubHkgdGhlIG1pbmlmaWVkIG5hbWUsIGEgcmFuZG9tIGxldHRlci5cbiAgICAgKi9cbiAgICB3aW5kb3cubWk1LnVzaW5nID0gZnVuY3Rpb24gdXNpbmcobGliLCBhbGlhcykge1xuICAgICAgICBpZiAoIWxpYiB8fCAhYWxpYXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTnVsbEFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmV2YWwuY2FsbCh3aW5kb3csICcoZnVuY3Rpb24gKGFyZykgeyB3aW5kb3cuJyArIGFsaWFzICsgJyA9IGFyZzsgfSknKShsaWIpO1xuICAgIH07XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBlc2NhcGVIdG1sKGlucHV0KSB7XG4gICAgLy8gVGhlcmUgaXNuJ3QgYSBidWlsdC1pbiB3YXkgdG8gZG8gdGhpcywgc3RpbGwsIHNvIHdlIG5lZWQgYSBoZWxwZXIgZnVuY3Rpb24uXG4gICAgLy8gVGhlIGFydGljbGUgXCJZb3UgYXJlIHByb2JhYmx5IG1pc3VzaW5nIERPTSB0ZXh0IG1ldGhvZHNcIiBjb252aW5jZWQgbWUgdG8gZG8gaXQgdGhpcyB3YXksXG4gICAgLy8gdnMuIGNyZWF0ZVRleHROb2RlLiBUaG91Z2ggY3JlYXRlVGV4dE5vZGUgd291bGQgcHJvYmFibHkgd29yayBmaW5lIGZvciBzZXR0aW5nIGlubmVySFRNTC5cbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgXCI8XCI6IFwiJmx0O1wiLFxuICAgICAgICBcIj5cIjogXCImZ3Q7XCIsXG4gICAgICAgIFwiJlwiOiBcIiZhbXA7XCIsXG4gICAgICAgIFwiL1wiOiBcIiYjeDJGO1wiLFxuICAgICAgICBcIj1cIjogXCImI3gzRDtcIixcbiAgICAgICAgJ1wiJzogXCImcXVvdDtcIixcbiAgICAgICAgXCInXCI6IFwiJiMzOTtcIixcbiAgICAgICAgXCJgXCI6IFwiJiN4NjA7XCJcbiAgICB9O1xuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIHMgPT4gZXNjYXBlc1tzXSk7XG59XG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFdmVudEhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbmZ1bmN0aW9uIG9ic2VydmFibGVDaGVjayhvYmopIHtcbiAgICAvLyBOb3QgYW4gZXhoYXVzdGl2ZSB0ZXN0IGJ1dCBpdCdzIHRoZSBpbXBvcnRhbnQgYml0LlxuICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NoYW5nZUhhbmRsZXInIGluIG9iaiAmJiBvYmouY2hhbmdlSGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcjtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUNoZWNrID0gb2JzZXJ2YWJsZUNoZWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL0FycmF5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE9iamVjdEZ1bGxBc3NpZ25fMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9PYmplY3RGdWxsQXNzaWduXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuLi9PYnNlcnZhYmxlQmFzZVwiKTtcbmNsYXNzIFRyYWl0U291cmNlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIHN1cGVyKHsgbmFtZTogJ0FycmF5UHJveHknLCBkaXNhYmxlQXN5bmMgfSk7XG4gICAgfVxufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1jbGFzc2VzLXBlci1maWxlXG5jbGFzcyBBcnJheU9ic2VydmFibGUgZXh0ZW5kcyBBcnJheSB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICB9XG4gICAgc3RhdGljIGdldE1lcmdlZE9ic2VydmFibGUoYXJncywgZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgd2hlcmUgSSByZWFsbHkgbmVlZCBtdWx0aXBsZSBpbmhlcml0YW5jZS4gVGhpcyBuZWVkcyB0byBpbmhlcml0IGZyb20gQXJyYXlcbiAgICAgICAgLy8gYmVjYXVzZSBpdCdzIGV4dGVuZGluZyBhIGJ1aWx0LWluIGNsYXNzLiBJdCBhbHNvIG5lZWRzIHRvIGluaGVyaXQgZnJvbSBPYnNlcnZhYmxlQmFzZS5cbiAgICAgICAgLy8gVGhyZWUgY2hvaWNlczpcbiAgICAgICAgLy8gMSkgNTAgbGluZXMgb2YgY2xpcGJvYXJkIGluaGVyaXRhbmNlLlxuICAgICAgICAvLyAyKSBDaGVhdCBoZWF2aWx5IGJ5IHRha2luZyBhIHRyYWl0IGFwcHJvYWNoLiBUaGlzIG1lYW5zIGhhY2tlcnkgdG8gbWFrZSBUUyBoYXBweS5cbiAgICAgICAgLy8gMykgRG8gdGhlIHNhbWUgYXMgMiB3aXRoIHRoZSBidWlsdC1pbiBBcnJheSBjbGFzcy4gTm90IGEgcHJvYmxlbSBidXQgd2l0aCAjMiB0aGUgY2xhc3MgbmFtZSBhY3RzXG4gICAgICAgIC8vIGFzIGEgaGludCB0aGF0IGl0J3Mgbm90IGEgZGVmYXVsdCBhcnJheSwgd2hpY2ggaXMgYmV0dGVyLlxuICAgICAgICAvLyAjMiB3aW5zLlxuICAgICAgICBjb25zdCBhcnIgPSBuZXcgQXJyYXlPYnNlcnZhYmxlKC4uLmFyZ3MpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbihhcnIsIG5ldyBUcmFpdFNvdXJjZShkaXNhYmxlQXN5bmMpKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwgJ2NoYW5nZUhhbmRsZXInLCB7IGVudW1lcmFibGU6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBPYmplY3RzIGNyZWF0ZWQgdGhyb3VnaCBtYXAsIGZpbHRlciwgZXRjLCBzaG91bGQgYmUgZ2VuZXJpYyBhcnJheXMuXG4gICAgc3RhdGljIGdldCBbU3ltYm9sLnNwZWNpZXNdKCkge1xuICAgICAgICByZXR1cm4gQXJyYXk7XG4gICAgfVxuICAgIC8vIE5lZWRzIHRvIGJlIHB1YmxpYyBzbyB0aGUgcHJveHkgY2FuIGNhbGwgaXQsIGJ1dCBzaG91bGQgbm90IGJlIGNhbGxlZCBvdXRzaWRlIHRoZSBBUEkuIEltYWdpbmUgaXQncyBpbnRlcm5hbC5cbiAgICBwdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBhcmdzLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICAvLyBUaGlzIHJlcXVpcmVzIGEgY2hlYXQuIEl0IHdpbGwgZmFpbCBpZiB0aGUgb2JqZWN0IGlzIGNyZWF0ZWQgd2l0aCBuZXcoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXzEuQXJyYXlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBhcmdzLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5T2JzZXJ2YWJsZSA9IEFycmF5T2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSXNJbnRlZ2VyXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyXCIpO1xuY2xhc3MgQXJyYXlQcm94eUhhbmRsZXIge1xuICAgIGdldCh0YXJnZXQsIGtleSwgcHJveHkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZENhbGxlZCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICAvLyBTaWxlbnQgcGFzcy10aHJvdWdoIG9mIG90aGVyIG1ldGhvZHNcbiAgICAgICAgICAgIGlmIChBcnJheVByb3h5SGFuZGxlci5tZXRob2RzVG9XYXRjaC5pbmRleE9mKGtleS50b1N0cmluZygpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWV0aG9kQ2FsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogTmVlZCB0byBldmFsdWF0ZSBwZXJmb3JtYW5jZSBvZiBjb3BpZXNcbiAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbCA9IG1ldGhvZENhbGxlZC5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdjYWxsJywga2V5LCBhcmdzLCBiZWZvcmUsIGFmdGVyLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpIHtcbiAgICAgICAgLy8gUHJvYmxlbTogV2Ugd2FudCB0byBjYXB0dXJlIG9ubHkgbGVuZ3RoIGFuZCBbaW5kZXhlcl0gY2FsbHMsIGJ1dCBKUyBoYXMgbm8gY29uc2lzdGVudFxuICAgICAgICAvLyB3YXkgb2YgZGVmaW5pbmcgW2luZGV4ZXJdLiBXaGF0IG1ha2VzIGl0IHdvcnNlIGlzIHRoYXQgaWYgYSBzdHJpbmcgaXMgYW4gaW50ZWdlciwgaXQgaXNcbiAgICAgICAgLy8gY29udmVydGVkIHRvIGEgbnVtYmVyLiBBbmQgSlMgZG9lcyBub3QgaW5jbHVkZSBhIGJ1aWx0LWluIHdheSB0byB0ZXN0IGlmIGEgbnVtYmVyIGlzIGFuIGludGVnZXIuXG4gICAgICAgIC8vIFNvbHV0aW9uOiBBIHJlZ2V4LWJhc2VkIGNoZWNrLiBJY2suIFdheSB0byByZW1pbmQgbWUgSSdtIHVzaW5nIEpTLlxuICAgICAgICBpZiAoa2V5ICYmIChrZXkudG9TdHJpbmcoKSA9PT0gJ2xlbmd0aCcgfHwgdHlwZW9mIGtleSA9PT0gJ251bWJlcicgfHwgSXNJbnRlZ2VyXzEuaXNQb3NpdGl2ZUludGVnZXJTdHJpbmcoa2V5KSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IE5lZWQgdG8gZXZhbHVhdGUgcGVyZm9ybWFuY2Ugb2YgY29waWVzXG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaENvbGxlY3Rpb25DaGFuZ2VkKCdzZXQnLCBrZXksIFt2YWx1ZV0sIGJlZm9yZSwgYWZ0ZXIsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICAgICAgICBjb25zdCBiZWZvcmUgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAvLyBDYW5ub3QgcmVwb3J0IHByb3h5IGFzIHNlbmRlciBiZWNhdXNlIHByb3h5IG5vdCBzZW50IHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ2RlbGV0ZScsIGtleSwgW10sIGJlZm9yZSwgYWZ0ZXIsIG51bGwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vLyBUaGVzZSBhcmUgYWxsIHRoZSBtZXRob2RzLCBub3QgY291bnRpbmcgY3VzdG9tIHNldHRlcnMsIHRoYXQgbXV0YXRlIGFuIGFycmF5LlxuQXJyYXlQcm94eUhhbmRsZXIubWV0aG9kc1RvV2F0Y2ggPSBbJ2NvcHlXaXRoaW4nLCAnZmlsbCcsICdwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXTtcbmV4cG9ydHMuQXJyYXlQcm94eUhhbmRsZXIgPSBBcnJheVByb3h5SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVCYXNlXCIpO1xuY29uc3QgT2JqZWN0RnVsbEFzc2lnbl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIik7XG5jbGFzcyBPYmplY3RPYnNlcnZhYmxlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgb25seSB3YXkgdG8gcHJvZHVjZSBhbiBvYmplY3Qgb2JzZXJ2YWJsZSwgZm9yIHJlYXNvbnMgb2Ygc2FmZXR5LlxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRNZXJnZWRPYnNlcnZhYmxlKGRhdGEsIGRpc2FibGVBc3luYykge1xuICAgICAgICAvLyBXZSBuZWVkIHNvbWV0aGluZyB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgaW5wdXQgb2JqZWN0IG1lcmdlZCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMuXG4gICAgICAgIC8vIEkgZG9uJ3Qgd2FudCB0byBhY3R1YWxseSBtb2RpZnkgdGhlIGlucHV0IG9iamVjdC4gRXZlbiB0aG91Z2ggaXQgU0hPVUxEIGJlIHRocm93YXdheSwgSSBkb24ndCBrbm93LlxuICAgICAgICAvLyBBbmQgSSBkb24ndCB3YW50IHRvIHRha2UgdGhlIHJpc2sgdGhhdCBzb21ldGhpbmcgaW4gdGhlIGlucHV0LCBhbiB1bmtub3duIGZhY3Rvciwgd2lsbCBtYWtlIHRoaXMgYmxvdyB1cC5cbiAgICAgICAgLy8gSSBrbm93IHRoYXQgdGhpcyBjbGFzcyBoYXMgb25seSAyIGxldmVscyBvZiBpbmhlcml0YW5jZSAoY3VycmVudGx5KSBhbmQgY29udGFpbnMgbm90aGluZyB2ZXJ5IGNvbXBsZXggYXQgYW55IGxldmVsLlxuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RGdWxsQXNzaWduXzEub2JqZWN0RnVsbEFzc2lnbihkYXRhLCBuZXcgT2JqZWN0T2JzZXJ2YWJsZShkaXNhYmxlQXN5bmMpLCB0cnVlKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwgJ2NoYW5nZUhhbmRsZXInLCB7IGVudW1lcmFibGU6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgc3VwZXIoeyBuYW1lOiBcIk9iamVjdFByb3h5XCIsIGRpc2FibGVBc3luYyB9KTtcbiAgICB9XG4gICAgLy8gTmVlZHMgdG8gYmUgcHVibGljIHNvIHRoZSBwcm94eSBjYW4gY2FsbCBpdCwgYnV0IHNob3VsZCBub3QgYmUgY2FsbGVkIG91dHNpZGUgdGhlIEFQSS4gSW1hZ2luZSBpdCdzIGludGVybmFsLlxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICAvLyBUaGlzIGZpbHRlcnMgb3V0IHRoZSB0cm91Ymxlc29tZSBjaGFuZ2VIYW5kbGVyIGZpZWxkLlxuICAgICAgICByZXR1cm4gc3VwZXIudG9KU09OKCk7XG4gICAgfVxufVxuZXhwb3J0cy5PYmplY3RPYnNlcnZhYmxlID0gT2JqZWN0T2JzZXJ2YWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgT2JqZWN0UHJveHlIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfbWV0aG9kc1RvV2F0Y2gsIF93YXRjaFNldCwgX3dhdGNoRGVsZXRlLCBfdHJpZ2dlck9ubHlPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9tZXRob2RzVG9XYXRjaCA9IF9tZXRob2RzVG9XYXRjaDtcbiAgICAgICAgdGhpcy5fd2F0Y2hTZXQgPSBfd2F0Y2hTZXQ7XG4gICAgICAgIHRoaXMuX3dhdGNoRGVsZXRlID0gX3dhdGNoRGVsZXRlO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gX3RyaWdnZXJPbmx5T25DaGFuZ2U7XG4gICAgfVxuICAgIGdldCh0YXJnZXQsIGtleSwgcHJveHkpIHtcbiAgICAgICAgaWYgKGtleSBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZENhbGxlZCA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5LCBwcm94eSk7XG4gICAgICAgICAgICAvLyBTaWxlbnQgcGFzcy10aHJvdWdoIG9mIG5vbi13YXRjaGVkIG1ldGhvZHNcbiAgICAgICAgICAgIGlmICh0aGlzLl9tZXRob2RzVG9XYXRjaC5pbmRleE9mKGtleS50b1N0cmluZygpKSA9PT0gLTEgfHwgdHlwZW9mIG1ldGhvZENhbGxlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RDYWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSB3cmFwcGVyIGFyb3VuZCB0aGUgbWV0aG9kIHRoYXQgcHVibGlzaGVzIHRoZSBjaGFuZ2VcbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbCA9IG1ldGhvZENhbGxlZC5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdjYWxsJywga2V5LCB1bmRlZmluZWQsIGFyZ3MsIHByb3h5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSkge1xuICAgICAgICBpZiAodGhpcy5fd2F0Y2hTZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgLy8gSWYgdG8gYmUgdHJpZ2dlcmVkIG9ubHkgb24gY2hhbmdlLCBjaGVjayBvbGRWYWx1ZSBhbmQgbmV3VmFsdWVcbiAgICAgICAgICAgIGlmICh0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlICYmIG9sZFZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ3NldCcsIGtleSwgb2xkVmFsdWUsIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3dhdGNoRGVsZXRlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IFJlZmxlY3QuZ2V0KHRhcmdldCwga2V5KTtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgLy8gQ2Fubm90IHJlcG9ydCBwcm94eSBhcyBzZW5kZXIgYmVjYXVzZSBwcm94eSBub3Qgc2VudCB0byB0aGlzIG1ldGhvZFxuICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2RlbGV0ZScsIGtleSwgb2xkVmFsdWUsIHVuZGVmaW5lZCwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLk9iamVjdFByb3h5SGFuZGxlciA9IE9iamVjdFByb3h5SGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgT2JzZXJ2YWJsZVByb3BlcnR5XzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlUHJvcGVydHlcIik7XG4vKipcbiAqIFRoaXMgaXMgYSBzaW1wbGUgaW1wbGVtZW50YXRpb24gb2YgT2JqZWN0LmFzc2lnbigpIHRoYXQgdW5kZXJzdGFuZHMgT2JzZXJ2YWJsZVByb3BlcnR5LFxuICogc28gdGhhdCBpdCBjYW4gdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2l0aG91dCB3aXBpbmcgb3V0IHJlZmVyZW5jZXMgdG8gdGhlXG4gKiBleGlzdGluZyBwcm9wZXJ0eSB3aXRoIHRoYXQga2V5ICh3aGljaCBpcyB3aGF0IHdvdWxkIGhhcHBlbiBpZiB5b3UgdXNlZCByZWd1bGFyIE9iamVjdC5hc3NpZ24oKVxuICogb24gYSBub24tcHJveGllZCBvYmplY3QpLiAgSXQgY2FuIGFsc28gYmUgdXNlZCB0byByZWFkIHRoZSB2YWx1ZSBvZiBhbiBPYnNlcnZhYmxlUHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIG9ic2VydmFibGVBc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG4gICAgdGFyZ2V0ID0gdGFyZ2V0IHx8IHt9O1xuICAgIGZvciAoY29uc3Qgc3JjIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3JjKSkge1xuICAgICAgICAgICAgY29uc3Qgc3Byb3AgPSBzcmNba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IHRwcm9wID0gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICBsZXQgdmFsO1xuICAgICAgICAgICAgaWYgKE9ic2VydmFibGVQcm9wZXJ0eV8xLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKHNwcm9wKSkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHNwcm9wLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsID0gc3Byb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sodHByb3ApKSB7XG4gICAgICAgICAgICAgICAgdHByb3AudmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JzZXJ2YWJsZUFzc2lnbiA9IG9ic2VydmFibGVBc3NpZ247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuLyoqXG4gKiBDb21tb24gbG9naWMgYmV0d2VlbiB0aGUgZGlmZmVyZW50IG9ic2VydmFibGUgY2xhc3Nlcy4gVGhlc2UgaW1wbGVtZW50IElPYnNlcnZhYmxlLiBUaGUgaW52b2NhdGlvbiBpdHNlbGYgdmFyaWVzIGZyb20gY2xhc3MgdG8gY2xhc3MuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWUsIGZvcndhcmRUbywgYnViYmxlRnJvbSwgZGlzYWJsZUFzeW5jIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGlmIChkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvcndhcmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZW5kQ2hhbmdlRXZlbnRzVG8oZm9yd2FyZFRvKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnViYmxlRnJvbSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBidWJibGVGcm9tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWdEZWxlZ2F0ZShuYW1lKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIFR5cGVzY3JpcHQgaGFzIGZvcmdvdHRlbiB0aGF0IEV2ZW50SGFuZGxlciBjYW4gYWNjZXB0IGFuIGFycmF5LlxuICAgICAgICAvLyBJbiBzcGl0ZSBpZiB0aGUgZmFjdCB0aGF0IHRoaXMgc2lnbmF0dXJlIGlzIGlkZW50aWNhbC5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci5zdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhlIGlucHV0J3MgZGVsZWdhdGUgdG8gdGhpcyBvYmplY3QncyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pIHtcbiAgICAgICAgLy8gSm9pbiB0aGUgb3RoZXIgZXZlbnQgaGFuZGxlciB0byB0aGlzLCBzbyB0aGF0IHdoZW4gdGhpcyBpcyBpbnZva2VkLCBzbyBpcyB0aGUgb3RoZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlKGZvcndhcmRUby5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRoaXMgb2JqZWN0J3MgZGVsZWdhdGUgdG8gdGhlIGlucHV0IG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVjZWl2ZUNoYW5nZUV2ZW50c0Zyb20oYnViYmxlRnJvbSkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gZXZlbnRzIHJhaXNlZCBvbiB0aGUgb3RoZXIgaGFuZGxlciwgc28gdGhhdCB3aGVuIHRoYXQgaXMgaW52b2tlZCwgc28gaXMgdGhpc1xuICAgICAgICAvLyBUaGUgc2FtZSBhcyBmb3J3YXJkQ2hhbmdlRXZlbnRzVG8gZXhjZXB0IHRoYXQgdGhpcyBpcyB0aGUgdGFyZ2V0LCBub3QgdGhlIHNvdXJjZS5cbiAgICAgICAgYnViYmxlRnJvbS5zdWJzY3JpYmUodGhpcy5jaGFuZ2VIYW5kbGVyLmRlbGVnYXRlKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZVNlbmRlcihzZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcik7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlSGFuZGxlci51bnN1YnNjcmliZURlbGVnYXRlKGRlbGVnYXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBwcm9iYWJseSBmcm93bmVkIHVwb24gKHNlZSBob3cgVFMgZG9lc24ndCBsaWtlIGl0KSwgYnV0IGl0J3MgdmFsaWQgSlMuXG4gICAgICogSXQncyBvbmx5IGludGVuZGVkIGZvciB0cm91Ymxlc2hvb3RpbmcsIG5vdCByZWFsIGxvZ2ljLiBUaGVyZSBhcmUgdGltZXMgd2hlbiB5b3UncmVcbiAgICAgKiB0cnlpbmcgdG8gaWRlbnRpZnkgZXhhY3RseSB3aGljaCBkZWxlZ2F0ZXMgYXJlIHN1YnNjcmliZWQsIGFuZCB0aGlzIGlzIHJlYWxseSBoYXJkIHdoZW5cbiAgICAgKiBub3RoaW5nIGhhcyBodW1hbi1yZWFkYWJsZSBuYW1lcy5cbiAgICAgKi9cbiAgICB0YWdEZWxlZ2F0ZShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUuX3RhZyA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCB4IGluIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBcImNoYW5nZUhhbmRsZXJcIiAmJiB4ICE9PSBcInByaXZhdGVQcm9wZXJ0eTJcIikge1xuICAgICAgICAgICAgICAgIHJlc3VsdFt4XSA9IHRoaXNbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVCYXNlID0gT2JzZXJ2YWJsZUJhc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEVzY2FwZUh0bWxfMSA9IHJlcXVpcmUoXCIuLi9IdG1sL0VzY2FwZUh0bWxcIik7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1R5cGVzL05vbmVUeXBlXCIpO1xuY29uc3QgSXNQcmltaXRpdmVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9Jc1ByaW1pdGl2ZVwiKTtcbmNvbnN0IElPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JT2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZhYmxlQmFzZVwiKTtcbi8qKlxuICogQW4gT2JzZXJ2YWJsZVByb3BlcnR5IGlzIGEgcHJvcGVydHkgdGhhdCBhdXRvbWF0aWNhbGx5IHJhaXNlcyBhIFByb3BlcnR5Q2hhbmdlZCBldmVudCB3aGVuIGl0IGlzIG1vZGlmaWVkLiBUaGlzIGlzIG1vcmVcbiAqIGNvbnZlbmllbnQgdGhhbiBoYXZpbmcgdG8gZG8gaXQgbWFudWFsbHkgZXZlcnkgdGltZSB5b3UgbmVlZCBpdC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVByb3BlcnR5IGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSA9IG9wdGlvbnMub25seVdoZW5DaGFuZ2VkIHx8IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5fdHJpZ2dlck9ubHlPbkNoYW5nZSAmJiBvbGQgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wdWJsaXNoUHJvcGVydHlDaGFuZ2VkKCdzZXQnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkLCB2YWx1ZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgKGlmIGEgc3RyaW5nKSB0aGF0IGhhcyBoYWQgc3BlY2lhbCBIVE1MIGNoYXJhY3RlcnMgZXNjYXBlZC5cbiAgICAgKi9cbiAgICBnZXQgc2FmZVZhbHVlKCkge1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQodHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlcikge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLk9ic2VydmFibGVQcm9wZXJ0eSA9IE9ic2VydmFibGVQcm9wZXJ0eTtcbmZ1bmN0aW9uIG9ic2VydmFibGVQcm9wZXJ0eUNoZWNrKG9iaikge1xuICAgIGlmICghSU9ic2VydmFibGVfMS5vYnNlcnZhYmxlQ2hlY2sob2JqKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEkgZG9uJ3QgbGlrZSB0aGlzIGJlY2F1c2UgaXQgc2hvdWxkIGJlIGNoZWNraW5nIGlmIHZhbHVlIGlzIGEgc2V0dGVyLFxuICAgIC8vIGFuZCBpdCBpc24ndCwgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgdG8gY2hlY2suXG4gICAgLy8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcigpIGRvZXNuJ3QgY2F0Y2ggaW5oZXJpdGVkIHByb3BlcnRpZXMsIG9mXG4gICAgLy8gd2hpY2ggdGhpcyBpcyBhbG1vc3QgYWx3YXlzIG9uZS5cbiAgICAvLyBJIGhhdmUgdG8gZmFsbCBiYWNrIHRvIGEgYmFzaWMgaW5zdGFuY2UgY2hlY2suXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlUHJvcGVydHk7XG59XG5leHBvcnRzLm9ic2VydmFibGVQcm9wZXJ0eUNoZWNrID0gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5T2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlXCIpO1xuY29uc3QgQXJyYXlQcm94eUhhbmRsZXJfMSA9IHJlcXVpcmUoXCIuL0ludGVybmFsL0FycmF5UHJveHlIYW5kbGVyXCIpO1xuY29uc3QgT2JqZWN0T2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvT2JqZWN0T2JzZXJ2YWJsZVwiKTtcbmNvbnN0IE9iamVjdFByb3h5SGFuZGxlcl8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyXCIpO1xuY2xhc3MgT2JzZXJ2YWJsZVByb3h5IHtcbiAgICBzdGF0aWMgcHJveGltYXRlKG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgZG8gZnVuY3Rpb25zLCBub3QgdGhhdCB0aGV5IHdvdWxkIGJlIHZlcnkgdXNlZnVsLlxuICAgICAgICAgICAgLy8gWWVzLCB0ZWNobmljYWxseSB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gZGVmaW5lIHByb3BlcnRpZXMgb24gYSBmdW5jdGlvbi4gVGhleSBhcmUgYWN0dWFsXG4gICAgICAgICAgICAvLyBvYmplY3RzLiAgSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpIHN0aWxsIG1ha2VzIHRoZW0gdW5kZWZpbmVkLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB0eXBlOiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobW9kZWwpKSB7XG4gICAgICAgICAgICAvLyBBbiBhcnJheSBwcm94eSBhbGxvd3MgY2hhbmdlcyB0byBhbiBhcnJheSB0byBiZSBvYnNlcnZlZC4gVGhlIGRvd24tc2lkZSBpcyB0aGF0IHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAvLyBpcyBhbiBvcmRlciBvZiBtYWduaXR1ZGUgc2xvd2VyIHRoYW4gdXNpbmcgYW4gT2JzZXJ2YWJsZUxpc3QuICBUaGUgdXAtc2lkZSBpcyB0aGF0IGl0IHVzZXNcbiAgICAgICAgICAgIC8vIG1vcmUgdGhhbiBhbiBvcmRlciBvZiBtYWduaXR1ZGUgbGVzcyBjb2RlLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlQXJyYXkobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG1vZGVsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlT2JqZWN0KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgYSBzaW1wbGUgdmFsdWUgaXMgcmV0dXJuZWQsIHJldHVybiBhIHByb3h5IGhhdmluZyBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGltYXRlT2JqZWN0KHsgdmFsdWU6IG1vZGVsIH0sIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBjb25maWd1cmFibGUgdmVyc2lvbiBvZiBwcm94aW1hdGUoKSBjYWxsZWQgb24gYW4gb2JqZWN0LiBCeSBtYWtpbmcgaXQgZ2VuZXJhbGl6ZWQgYW5kIGNvbmZpZ3VyYWJsZSwgdGhpcyBhbGxvd3MgdGhlIGNhbGxlciB0b1xuICAgICAqIHRyYWNrIG1ldGhvZHMgdGhhdCBhcmUgY2FsbGVkLCBiYXNlZCBvbiBhIGNvbmZpZ3VyYWJsZSBsaXN0LlxuICAgICAqXG4gICAgICogSWYgdGhlIG9iamVjdCBpcyBhIGNvbXBsZXggb2JqZWN0LCB3aGVyZSBjaGlsZCBvYmplY3RzIGFyZSBtb2RpZmllZCwgbm90IHRoZSBtYWluIG9iamVjdCwgY2hhbmdlcyB3b3VsZCBub3QgYmUgY2F1Z2h0LlxuICAgICAqIE9uZSB3YXkgdG8gaGFuZGxlIHRoYXQgaXMgdG8gbWFrZSB0aGUgY2hpbGQgb2JqZWN0IGEgcHJveHkuIEFub3RoZXIgd2F5IGlzIHRvIGFjY2VzcyB0aGUgY2hpbGQgb2JqZWN0IG9ubHkgdGhyb3VnaCBtZXRob2RzXG4gICAgICogYW5kIHVzZSB0aGlzLlxuICAgICAqL1xuICAgIHN0YXRpYyBwcm94aW1hdGVPYmplY3QobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCwgbWV0aG9kc1RvV2F0Y2ggPSBbXSwgd2F0Y2hTZXQgPSB0cnVlLCB3YXRjaERlbGV0ZSA9IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gV2UgY2FuJ3QgZG8gZnVuY3Rpb25zLCBub3QgdGhhdCB0aGV5IHdvdWxkIGJlIHZlcnkgdXNlZnVsLlxuICAgICAgICAgICAgLy8gWWVzLCB0ZWNobmljYWxseSB5b3Ugc2hvdWxkIGJlIGFibGUgdG8gZGVmaW5lIHByb3BlcnRpZXMgb24gYSBmdW5jdGlvbi4gVGhleSBhcmUgYWN0dWFsXG4gICAgICAgICAgICAvLyBvYmplY3RzLiAgSW4gcHJhY3RpY2UsIGhvd2V2ZXIsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSgpIHN0aWxsIG1ha2VzIHRoZW0gdW5kZWZpbmVkLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB0eXBlOiBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBJT2JzZXJ2YWJsZSBtZXRob2RzIHRvIHRoZSBtb2RlbCBzbyB0aGF0IGl0IGNhbiByYWlzZSBldmVudHMuXG4gICAgICAgIC8vIFdlIG11c3QgZXh0ZW5kIHRoZSBvcmlnaW5hbCBjbGFzcyAob3IgYXQgbGVhc3QgdGhlIG9iamVjdCkuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IE9iamVjdE9ic2VydmFibGVfMS5PYmplY3RPYnNlcnZhYmxlLmdldE1lcmdlZE9ic2VydmFibGUobW9kZWwsIGRpc2FibGVBc3luYyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgT2JqZWN0UHJveHlIYW5kbGVyXzEuT2JqZWN0UHJveHlIYW5kbGVyKG1ldGhvZHNUb1dhdGNoIHx8IFtdLCB3YXRjaFNldCB8fCBmYWxzZSwgd2F0Y2hEZWxldGUgfHwgZmFsc2UsIG9ubHlJZkNoYW5nZWQgfHwgZmFsc2UpO1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlUHJveHkuX21vZGVscy5zZXQocHJveHksIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJveGltYXRlIGFuIGFycmF5LlxuICAgICAqL1xuICAgIHN0YXRpYyBwcm94aW1hdGVBcnJheShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKSB7XG4gICAgICAgIC8vIEFkZCBJT2JzZXJ2YWJsZSBtZXRob2RzIHRvIHRoZSBtb2RlbCBzbyB0aGF0IGl0IGNhbiByYWlzZSBldmVudHMuXG4gICAgICAgIC8vIFdlIG11c3QgZXh0ZW5kIHRoZSBvcmlnaW5hbCBhcnJheSBjbGFzcyAob3IgYXQgbGVhc3QgdGhlIGFycmF5IG9iamVjdCkuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IEFycmF5T2JzZXJ2YWJsZV8xLkFycmF5T2JzZXJ2YWJsZS5nZXRNZXJnZWRPYnNlcnZhYmxlKG1vZGVsLCBkaXNhYmxlQXN5bmMpO1xuICAgICAgICAvLyBUaGUgdHlwZSBoZXJlIGlzbid0IGFjY3VyYXRlLCBidXQgSSBoYXZlIG5vIGdvb2Qgd2F5IHRvIHBhc3MgdGhlIGtleSB0eXBlIHdpdGhvdXQgbWFraW5nIHRoaXMgY2xhc3Mgb25seSB3b3JrIGZvciBhcnJheXMuXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgQXJyYXlQcm94eUhhbmRsZXJfMS5BcnJheVByb3h5SGFuZGxlcigpO1xuICAgICAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIGhhbmRsZXIpO1xuICAgICAgICBPYnNlcnZhYmxlUHJveHkuX21vZGVscy5zZXQocHJveHksIHRhcmdldCk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG59XG4vLyBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCBuZWVkcyB0byBiZSBzdG9yZWQgc29tZXdoZXJlIHNvIHRoYXQgdGhlIHByb3h5IGNhbiB3b3JrLlxuLy8gVGhlcmUncyBubyByZWFzb24gdGhhdCB0aGUgdXNlciBjYW4ndCBrZWVwIGEgY29weSBidXQgd2Ugc2hvdWxkbid0IGZvcmNlIHRoYXQuXG5PYnNlcnZhYmxlUHJveHkuX21vZGVscyA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnRzLk9ic2VydmFibGVQcm94eSA9IE9ic2VydmFibGVQcm94eTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBDbG9uZURlZXBfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXBcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBvYnNlcnZhYmxlIHN0YXRlIHRoYXQgc2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgdXNpbmcgdGhlIHJlbGV2YW50IG1ldGhvZHMsIGFsbG93aW5nIGF0b21pYyBjaGFuZ2VzIHRvIG11bHRpcGxlIHByb3BlcnRpZXNcbiAqIGluIG11bHRpcGxlIG9iamVjdHMsIHJhaXNpbmcgYSBzaW5nbGUgZXZlbnQuXG4gKi9cbmNsYXNzIE9ic2VydmFibGVTdGF0ZSBleHRlbmRzIE9ic2VydmFibGVCYXNlXzEuT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gXCJcIjtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICdzZXRTdGF0ZSc7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgLy8gSSB3b3VsZCBwcmVmZXIgdGhhdCB0aGlzIHJldHVybiBSZWFkb25seTxUPiBidXQgZ2V0dGVyIGFuZCBzZXR0ZXIgaGF2ZSB0byBiZSB0aGUgc2FtZSB0eXBlLlxuICAgICAgICAvLyBUaGF0IG1lYW5zIHlvdSB3b3VsZCBoYXZlIHRvIGNhc3QgYW55IHZhbHVlIHlvdSBzZXQgYXMgYSByZWFkb25seSwgd2hpY2ggaXMgYSBQSVRBLlxuICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcndyaXRlcyB0aGUgZW50aXJlIHZhbHVlLlxuICAgICAqL1xuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHZhbHVlLCB0cnVlKTtcbiAgICB9XG4gICAgZ2V0U2FmZVZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodGhpcy5fdmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRtcCA9IHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgICAgICBpZiAoTm9uZVR5cGVfMS5pc05vbmUodG1wKSB8fCAhSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0bXApKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRtcCkpO1xuICAgIH1cbiAgICBnZXRWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICAvLyBJZiB2YWx1ZSBpcyBwcmltaXRpdmUsIHRoZW4gY2FsbCB0aGlzIHdpdGggbm8gYXJndW1lbnRzLlxuICAgICAgICAvLyBUaGF0IGlzIHRoZSBvbmx5IGNhc2Ugd2hlcmUgaXQgaXMgYWxsb3dlZC5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKCFOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgJiYgSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVbcHJvcGVydHldO1xuICAgIH1cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgLy8gVGhlIFJlYWRvbmx5IHR5cGUgd29ya3MgZmluZSBhbmQgaXQncyBmYXN0IC4uLiBpbiB0eXBlc2NyaXB0LlxuICAgICAgICAvLyBJbiBqYXZhc2NyaXB0LCBpZiB5b3UganVzdCByZXR1cm4gdGhlIHZhbHVlLCBub3RoaW5nIHByZXZlbnRzIGl0IGZyb20gYmVpbmcgZWRpdGVkLlxuICAgICAgICByZXR1cm4gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMudmFsdWUpO1xuICAgIH1cbiAgICBzZXRTdGF0ZSh2YWx1ZSwgb3ZlcldyaXRlQWxsID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICBsZXQgbmV3VmFsdWU7XG4gICAgICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICAgICAgLy8gSWYgdGhlIHR5cGUgaXMgcHJpbWl0aXZlLCB0aGVuIGEgZnVsbCBvdmVyd3JpdGUgaXMgYWxsb3dlZFxuICAgICAgICBpZiAoSXNQcmltaXRpdmVfMS5pc1ByaW1pdGl2ZSh0aGlzLl92YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIEZ1bmN0aW9ucyB3aWxsIGV4ZWN1dGUgYnV0IHRoZXkgd29uJ3QgY2hhbmdlIHRoZSB2YWx1ZS4gVGhlIHJlYXNvbiBpcyB0aGUgc2FtZSByZWFzb24gdGhhdCB0aGlzIG1ha2VzIG5vIHBlcm1hbmVudCBjaGFuZ2UgdG8gYmFyOlxuICAgICAgICAgICAgLy8gdmFyIGZvbyA9IGZ1bmN0aW9uKHN0cikgeyBzdHIgPSBzdHIudG9VcHBlckNhc2UoKTsgfTsgdmFyIGJhciA9ICdhYmMnOyBmb28oYmFyKTsgY29uc29sZS5sb2coYmFyID09PSAnYWJjJyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FsbCBzZXRTdGF0ZSB3aXRoIGEgZnVuY3Rpb24gaWYgc3RhdGUgaXMgcHJpbWl0aXZlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3ZlcldyaXRlQWxsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3ZlcldyaXRlQWxsKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IF9vdnIxX292ZXJ3cml0ZUFsbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIFtuZXdWYWx1ZSwgcmV0dXJuVmFsdWVdID0gX292cjNfZnVuY3Rpb25BcmcuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlIGlzIG5vdCBhIHBhcnRpYWwgc3RhdGUgb3IgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMl9wYXJ0aWFsLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnY2FsbCcsIHRoaXMucHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHRoaXMpO1xuICAgICAgICByZXR1cm4geyBvbGRWYWx1ZSwgbmV3VmFsdWUsIHJldHVyblZhbHVlIH07XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX292ZXJ3cml0ZUFsbChfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIE92ZXJ3cml0ZSB0aGUgZW50aXJlIG9iamVjdC5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKF92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIyX3BhcnRpYWwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBQYXJ0aWFsIG9iamVjdDogT3ZlcndyaXRlIG9ubHkgdGhlIGtleXMgcHJvdmlkZWRcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0aGlzLl92YWx1ZSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhfdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdG1wW2tleV0gPSBfdmFsdWVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gdG1wO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIzX2Z1bmN0aW9uQXJnKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgZnVuY3Rpb24gcHJvdmlkZWQgYW5kIHVwZGF0ZSB0aGUgb2JqZWN0IGFzIGRpY3RhdGVkXG4gICAgICAgICAgICAvLyBNYXliZSB1bm5lY2Vzc2FyeSBidXQgd2Ugd2FudCB0byBhdm9pZCB0aGUgY2FsbGVyIGV4ZmlsdHJhdGluZyB0aGUgc3RhdGUgdXNpbmcgYSBmdW5jdGlvbixcbiAgICAgICAgICAgIC8vIGJ5IGFjY2lkZW50LiBPZiBjb3Vyc2UsIHRoZXkgY2FuIGp1c3QgYWNjZXNzIF92YWx1ZSBieSBjYXN0aW5nIGFzIGFueSxcbiAgICAgICAgICAgIC8vIGJ1dCB0aGF0J3Mgbm90IGFjY2lkZW50YWwuXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgX3JldHVyblZhbHVlID0gX3ZhbHVlLmNhbGwodG1wLCB0bXApO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodG1wKTtcbiAgICAgICAgICAgIHJldHVybiBbdG1wLCBfcmV0dXJuVmFsdWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBwdWJsaXNoUHJvcGVydHlDaGFuZ2VkKHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyLmludm9rZShuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzKHsgdHlwZSwgcHJvcGVydHlOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIHNlbmRlciB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5PYnNlcnZhYmxlU3RhdGUgPSBPYnNlcnZhYmxlU3RhdGU7XG5mdW5jdGlvbiBvYnNlcnZhYmxlU3RhdGVDaGVjayhvYmopIHtcbiAgICBpZiAoIUlPYnNlcnZhYmxlXzEub2JzZXJ2YWJsZUNoZWNrKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBJIGRvbid0IGtub3cgaWYgSSBzaG91bGQgY2hlY2sgZm9yIHRoaXMgb3IgZm9yIGdldFN0YXRlKCkgYW5kIHNldFN0YXRlKClcbiAgICByZXR1cm4gb2JqICYmIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGVTdGF0ZTtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZVN0YXRlQ2hlY2sgPSBvYnNlcnZhYmxlU3RhdGVDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBBIGRlZmVycmVkIHByb21pc2UgaXMgYSB3cmFwcGVyIGFyb3VuZCBhIHByb21pc2UgdGhhdCBhbGxvd3MgaXQgdG8gYmUgdHJpZ2dlcmVkIGxhdGVyLiBJbiBwdXJlIEpTLCB0aGlzIGlzIGhhcmRlclxuICogdGhhbiBpdCBuZWVkcyB0byBiZSwgYW5kIGl0IHRha2VzIGEgd2VpcmQgaGFjayB0byBtYWtlIGl0IHdvcmsuIFRoaXMgY2xhc3MgaXMgbGl0dGxlIG1vcmUgdGhhbiBhIHdyYXBwZXIgYXJvdW5kXG4gKiBzYWlkIGhhY2suXG4gKlxuICogT3RoZXJ3aXNlLCB0aGlzIHVzZXMgYSByZWFsIHByb21pc2UgaW50ZXJuYWxseSwgc28gYXNpZGUgZnJvbSB0aGUgd3JhcHBpbmcgb2JqZWN0LCBpdCBoYXMgbm8gc3BlY2lhbCBsb2dpYy4gSSBjaG9zZVxuICogbm90IHRvIHJlLWltcGxlbWVudCB0aGUgUHJvbWlzZSBBUEkgc3luY2hyb25vdXNseSwgc28gaXQgdXNlcyB0aGUgc2FtZSBtaWNyb3Rhc2sgcXVldWUuXG4gKlxuICogVGhlIHdyYXBwaW5nIEFQSSBpcyB0d2Vha2VkIGEgbGl0dGxlIHRvIGF2b2lkIHNvbWUgY29tbW9uIHBpdGZhbGxzIHRoYXQgYXJlIGNhdXNlZCBieSBmbGF3cyBpbiB0aGUgUHJvbWlzZVxuICogZGVzaWduLiBGb3IgZXhhbXBsZSwgaGF2aW5nIG9uZnVsZmlsbGVkIGFuZCBvbnJlamVjdGVkIGluIHRoZSBzYW1lIHN0ZXAgbWVhbnMgdGhhdCBlcnJvcnMgaW4gdGhlIGZ1bGZpbGxlZFxuICogaGFsZiB3aWxsIG5vdCBiZSBjYXVnaHQgYnkgdGhlIGVycm9yIGhhbmRsZXIuICBSYXRoZXIgdGhhbiBzYXkgXCJkb24ndCB1c2UgdGhhdCBpbnB1dFwiIGxpa2UgbW9zdCBpbnN0cnVjdG9ycyxcbiAqIEkganVzdCBnb3QgcmlkIG9mIGl0IChpdCdzIHN0aWxsIGFjY2Vzc2libGUgb24gdGhlIG91dHB1dCBwcm9wZXJ0eSwgaWYgeW91IHdhbnQgdG8gdXNlIGl0IC4uLiBidXQgZG9uJ3QpLlxuICovXG5jbGFzcyBEZWZlcnJlZFByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIGludm9rZSB0aGUgY2FsbGJhY2sgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5IFRTIGRvZXNuJ3Qga25vdyB0aGF0IHRoZSBwcm9wZXJ0aWVzIGFyZSByZXBsYWNlZCBpbiB0aGUgcHJvbWlzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gZnVuY3Rpb24gX2R1bW15KCkgeyB9O1xuICAgICAgICAvKiogVXNlIHRoaXMgdG8gcmVqZWN0IHRoZSBwcm9taXNlIHJpZ2h0IG91dC4gV2hpY2ggaXMgcHJvYmFibHkgdXNlbGVzcyBidXQgeW91IG5ldmVyIGtub3cuICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVqZWN0ID0gZnVuY3Rpb24gX2R1bW15KCkgeyB9O1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSB3ZWlyZCBoYWNrIHRoYXQgaXMgdGhlIGJhc2lzIG9mIHRoaXMgY2xhc3MuIEl0J3MgYSBjbG9zdXJlLCBidXQgcmV2ZXJzZWQsIGFzIHRoZVxuICAgICAgICAvLyBlbmNsb3NlZCBwcm9wZXJ0eSBpcyBhbiBpbnRlcm5hbCByZWZlcmVuY2UgYWNjZXNzZWQgb3V0c2lkZSByYXRoZXIgdGhhbiBhbiBvdXRzaWRlIHJlZmVyZW5jZVxuICAgICAgICAvLyBhY2Nlc3NlZCBpbnNpZGUuXG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IF9yZXNvbHZlO1xuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSBfcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LlxuICAgICAgICAvLyBXZSB3YW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGFsbG93IHRoZSBmb2xsb3dpbmc6XG4gICAgICAgIC8vIGNvbnN0IHdhaXRhYmxlID0gbmV3IERlZmVycmVkUHJvbWlzZSgpOyBldmVudC5zdWJzY3JpYmUod2FpdGFibGUucmVzb2x2ZSk7IGNvbnN0IHIgPSBhd2FpdCB3YWl0YWJsZS5vdXRwdXQ7IGNvbnNvbGUubG9nKHIpO1xuICAgICAgICAvLyBJZiB5b3UgbGVhdmUgb3V0IHRoZSBpbml0aWFsIGNhbGxiYWNrLCB5b3UnbGwgZ2V0IHVuZGVmaW5lZCBpbnN0ZWFkIG9mIHdoYXQgdGhlIGV2ZW50IHNlbmRzLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSBpbiBhc3luYy9hd2FpdCBjb2RlLiBUaGUgZm9sbG93aW5nIHdpbGwgd29yayBpZiBhIHJlc3VsdCBpcyByZXR1cm5lZC5cbiAgICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWZlcnJlZC5vdXRwdXQ7XG4gICAgICogY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgKi9cbiAgICBnZXQgb3V0cHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLiAqL1xuICAgIHRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhpcyBpcyB0byBrZWVwIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQncyB1Z2x5LlxuICAgICAgICAvLyBJdCBtZWFucyBhIGxvdCBvZiBleHRyYSBzdGVwcy4gSXQgbWFrZXMgc3VyZSB0aGF0IGJ5IGRlZmF1bHQsIHRoZSBsYXN0IHN0ZXAgaXMgYWx3YXlzIGEgY2F0Y2guXG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2F0Y2gob25yZWplY3RlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgaWYgKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFnYWluIHRoaXMgaXMgYSBtZXNzLCBidXQgdGhlIGNhdGNoIGhhbmRsZXIgYWJvdmUgY291bGQgdGhyb3dcbiAgICAgICAgaWYgKHRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMuX3Byb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVmZXJyZWRQcm9taXNlID0gRGVmZXJyZWRQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBEZWZlcnJlZFByb21pc2VfMSA9IHJlcXVpcmUoXCIuL0RlZmVycmVkUHJvbWlzZVwiKTtcbi8qKlxuICogVGhlIHByb21pc2UgQVBJIGlzIG5pY2UsIG1vc3RseSwgYnV0IHRoZSBtYWluIHRoaW5nIHByZXZlbnRpbmcgdXNlIG9mIGEgcHJvbWlzZSBhcyBhbiBldmVudCBoYW5kbGVyIGlzIHRoYXRcbiAqIGl0IG9ubHkgZXhlY3V0ZXMgb25jZS4gQWZ0ZXIgdGhhdCBwb2ludCwgaXQgaXMgcmVzb2x2ZWQsIGFuZCB0aGVyZSBpcyBubyB3YXkgdG8gZmxpcCBpdCBiYWNrLlxuICpcbiAqIFRoZSByZXBlYXRhYmxlIHByb21pc2Uga2VlcHMgdGhlIHByb21pc2UgQVBJIGFuZCBjcmVhdGVzIHRoZSBpbGx1c2lvbiB0aGF0IHRoZSBwcm9taXNlIGlzIHJlcGVhdGVkIGJ5XG4gKiByZWJ1aWxkaW5nIHRoZSBjaGFpbiBlYWNoIHRpbWUuIEl0J3MgcmVhbGx5IGEgZGVmZXJyZWQgZmFjdG9yeSBidXQgaXQgcHJldGVuZHMgdG8gYmUgYSBkZWZlcnJlZC4gSSdtIHN1cmVcbiAqIHRoaXMgaGFzIGEgcGVyZm9ybWFuY2UgcGVuYWx0eS5cbiAqXG4gKiBZb3Ugc2hvdWxkIG5vdCBhdHRhY2ggYWN0dWFsIHByb21pc2VzIGludG8gdGhlIHRoZW4oKSBjaGFpbiwgYmVjYXVzZSB0aGV5IGNhbid0IGJlIHJlcGVhdGVkLiBUaGUgUHJvbWlzZSB0eXBlIGlzbid0XG4gKiBhbGxvd2VkIGJ1dCB0aGVyZSBhcmUgd2F5cyB0byBnZXQgYXJvdW5kIHRoZSBUUyBjb21waWxlci4gVGhlIFRTIHR5cGUgZGVmaW5pdGlvbiBmb3IgUHJvbWlzZSBhbmQgUHJvbWlzZUxpa2UgaXNuJ3RcbiAqIGNvbXBsZXRlbHkgY29ycmVjdCwgYW55d2F5LCBzbyBpdCdzIGVhc3kgdG8gZ2V0IHVzZWQgdG8gdXNpbmcgdGhlIGFueSB0eXBlIGFuZCBtYWtlIGJyb2tlbiBjb2RlLlxuICpcbiAqIFlvdSBjYW5ub3QgYXN5bmMvYXdhaXQgYSByZXBlYXRhYmxlIHByb21pc2UgaXRzZWxmIGJ1dCB5b3UgY2FuIGF3YWl0IGEgc2luZ2xlIHJlc29sdXRpb24uIEFzeW5jL2F3YWl0IGlzIHN1Z2FyIHRoYXRcbiAqIGNyZWF0ZXMgYSByZWd1bGFyLCBub24tcmVwZWF0YWJsZSwgcHJvbWlzZS5cbiAqL1xuY2xhc3MgUmVwZWF0YWJsZVByb21pc2Uge1xuICAgIGNvbnN0cnVjdG9yKG9uZnVsZmlsbGVkLCBvblVuaGFuZGxlZEVycm9yLCAvLyBUaGlzIGFkZHMgYSBjYWxsYmFjayBhdCB0aGUgZW5kIChvciAybmQgZnJvbSB0aGUgZW5kLCBzZWUgbmV4dCBvcHRpb24pXG4gICAgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgKSB7XG4gICAgICAgIHRoaXMub25VbmhhbmRsZWRFcnJvciA9IG9uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yID0gdGhyb3dPblVuaGFuZGxlZEVycm9yOyAvLyBUaGlzIGtlZXBzIGEgcHJvbWlzZSBmcm9tLCBieSBkZWZhdWx0LCBlYXRpbmcgdXAgYWxsIGVycm9ycy4gSXQgYWRkcyBhIGZpbmFsIGNhdGNoIHRoYXQgdGhyb3dzIGlmIGhpdC5cbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoYXQgdGhlcmUgaXMgYWx3YXlzIHNvbWV0aGluZyBhdCB0aGUgZmlyc3QgbGV2ZWwsIGV2ZW4gaWYgaXQncyBqdXN0IHJldHVybmluZyB0aGUgcmVzdWx0LiBVc2VmdWwgZm9yIGFzeW5jL2F3YWl0IGNvZGUuXG4gICAgICAgIGlmIChvbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgdGhpcy50aGVuKG9uZnVsZmlsbGVkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihyZXMgPT4gcmVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBUaGUgZm9sbG93aW5nIHNob3VsZCB3b3JrOlxuICAgIC8vIGNvbnN0IHJlcGVhdGFibGUgPSBuZXcgUmVwZWF0YWJsZVByb21pc2UoKTsgY29uc3QgciA9IGF3YWl0IHJlcGVhdGFibGUucmVzb2x2ZSgpOyBjb25zb2xlLmxvZyhyKTtcbiAgICByZXNvbHZlKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuYnVpbGQoKTtcbiAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIHJlamVjdChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGFyZ3MpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS5vdXRwdXQ7XG4gICAgfVxuICAgIC8vIFRoZW4oKSBvbmx5IGhhcyBvbmUgb3B0aW9uLCBiZWNhdXNlIGl0J3MgdG9vIGVhc3kgdG8gZm9yZ2V0IHRoYXQgdGhlIG9ucmVqZWN0ZWQgY2FsbGJhY2sgZG9lc24ndCBoYW5kbGUgdGhlIG9uZnVsbGVkIGNhbGxiYWNrLlxuICAgIHRoZW4ob25mdWxmaWxsZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9uZnVsZmlsbGVkOiBvbmZ1bGZpbGxlZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaCh7IG9ucmVqZWN0ZWQ6IG9ucmVqZWN0ZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBidWlsZCgpIHtcbiAgICAgICAgbGV0IHByb21pc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGtub3cgdGhhdCB0aGUgZmlyc3QgaXMgYWx3YXlzIG9uZnVsZmlsbGVkIGFuZCBpcyBuZXZlciB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpZiAoIWNiLm9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gRmlyc3Qgb25mdWxmaWxsZWQgaXMgbnVsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgRGVmZXJyZWRQcm9taXNlXzEuRGVmZXJyZWRQcm9taXNlKGNiLm9uZnVsZmlsbGVkLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihjYi5vbmZ1bGZpbGxlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjYi5vbnJlamVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChjYi5vbnJlamVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZyBpbiBSZXBlYXRhYmxlUHJvbWlzZSBjb25zdHJ1Y3Rvci4gTm8gY2FsbGJhY2tzLCBub3QgZXZlbiB0aGUgZGVmYXVsdCBmaXJzdCBvbmZ1bGZpbGxlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufVxuZXhwb3J0cy5SZXBlYXRhYmxlUHJvbWlzZSA9IFJlcGVhdGFibGVQcm9taXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIFJldHVybiBlbGVtZW50cyBvZiBhcnJheSBhIGxpbmVkIHVwIHdpdGggZWxlbWVudHMgb2YgYXJyYXkgYi4gQm90aCBhcnJheXMgZG9uJ3QgaGF2ZSB0byBiZSB0aGUgc2FtZSBsZW5ndGguXG4gKi9cbmZ1bmN0aW9uIHppcChhLCBiKSB7XG4gICAgaWYgKGEubGVuZ3RoID49IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBhLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFtlbGVtZW50LCBiW2luZGV4XV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIubWFwKChlbGVtZW50LCBpbmRleCkgPT4gW2FbaW5kZXhdLCBiXSk7XG4gICAgfVxufVxuZXhwb3J0cy56aXAgPSB6aXA7XG4vKipcbiAqIFJldHVybiBhIGNhcnRlc2lhbiBqb2luIChjcm9zcyBqb2luKSBiZXR3ZWVuIGFycmF5cyBhIGFuZCBiLlxuICovXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oYSwgYikge1xuICAgIC8vLyB0eXBlc2NyaXB0IHByZXZlbnRzIGEgZGlyZWN0IHVzZSBvZiBjb25jYXQsIHNvIGRvIHRoaXMgbWFudWFsbHkgd2l0aCBhIGxvb3BcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGEpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmIubWFwKHEgPT4gW2l0ZW0sIHFdKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxuZXhwb3J0cy5jYXJ0ZXNpYW4gPSBjYXJ0ZXNpYW47XG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZ2Ugb2YgaW50ZWdlcnMsIGNvdW50aW5nIHVwIGJ5IDEsIGZvciB0aGUgZ2l2ZW4gbGVuZ3RoLiBTdG9sZW4gZnJvbSBQeXRob24uXG4gKi9cbmZ1bmN0aW9uIHJhbmdlKGxlbmd0aCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW5ndGggfSwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG59XG5leHBvcnRzLnJhbmdlID0gcmFuZ2U7XG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIGl0ZW1zIGFuZCBvdGhlciBhcnJheXMsIGZsYXR0ZW4gdGhlbSBvdXQgaW50byBhIHNpbmdsZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24qIHRyYXZlcnNlKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHlpZWxkIGFycjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm93IG9mIGFycikge1xuICAgICAgICAgICAgeWllbGQqIHRyYXZlcnNlKHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnRyYXZlcnNlID0gdHJhdmVyc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEFycmF5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2Ygb3BlcmF0aW9uIChtZXRob2QsIHNldCwgZGVsZXRlKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gJyc7XG4gICAgICAgIHRoaXMuYXJncyA9IFtdO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXJyYXlDaGFuZ2VkRXZlbnRBcmdzID0gQXJyYXlDaGFuZ2VkRXZlbnRBcmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZXBlYXRhYmxlUHJvbWlzZV8xID0gcmVxdWlyZShcIi4uL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlXCIpO1xuLyoqXG4gKiBBIGRlbGVnYXRlIG9iamVjdCBpcyB1c2VkIGJ5IHRoZSBFdmVudEhhbmRsZXIuIEl0IGNvbnRhaW5zIGVub3VnaCBpbmZvcm1hdGlvbiB0byBleGVjdXRlIGEgY2FsbGJhY2sgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25vdXNseVxuICogKHVzaW5nIGEgcHJvbWlzZSkuIEl0IGFsc28gYWRkcyBzb21lIHN0cmluZ3MgdG8gaGVscCBpbiB0cm91Ymxlc2hvb3RpbmcsIGJlY2F1c2Ugc2VhcmNoaW5nIGEgcmVjdXJzaXZlIGFycmF5IG9mIGNvbXBsZXggb2JqZWN0cyBjYW4gbWFrZVxuICogaXQgYSBiZWFyIHRvIGZpbmQgb3V0IHdoeSBhIGNhbGxiYWNrIGlzbid0IGJlaW5nIGV4ZWN1dGVkLlxuICovXG5jbGFzcyBEZWxlZ2F0ZSB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gSW4gbWFueSBjYXNlcyAoZm9yIGV4YW1wbGUsIHdoZW4gdXNpbmcgZmF0IGFycm93IGZ1bmN0aW9ucyksIHRoaXNBcmcgaXNcbiAgICAgICAgLy8gbm90IG5lZWRlZC4gQnV0IGluIG1vc3Qgb3RoZXJzLCBpdCBpcyBhbiBhbm5veWluZyBidWcgdGhhdCByZXF1aXJlcyB0cm91Ymxlc2hvb3RpbmdcbiAgICAgICAgLy8gdG8gZmlndXJlIG91dCB3aGF0IHRoZSBjYWxsZXIgZm9yZ290LiBJJ3ZlIHdhdmVyZWQgYmV0d2VlbiBtYWtpbmcgaXQgcmVxdWlyZWQgYW5kIG5vdC5cbiAgICAgICAgaWYgKCF0aGlzQXJnKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZWxlZ2F0ZSBjcmVhdGVkIHdpdGhvdXQgdGhpc0FyZy4gRGlkIHlvdSBtZWFuIHRvPycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB0aGlzQXJnID09PSAnb2JqZWN0JyAmJiAnY29uc3RydWN0b3InIGluIHRoaXNBcmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tPd25lck5hbWUgPSB0aGlzQXJnLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHR5cGVzY3JpcHQgY29tcGlsZXIgc2hvdWxkIGhhbmRsZSB0aGlzIGNoZWNrIGJ1dCBjYW4ndCBhdCBydW50aW1lLlxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBtdXN0IGJlIGEgY2FsbGJhY2sgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLmNhbGxiYWNrTmFtZSA9IGNhbGxiYWNrLm5hbWU7XG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lICYmIHRoaXMuY2FsbGJhY2tOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLmNhbGxiYWNrT3duZXJOYW1lfS4ke3RoaXMuY2FsbGJhY2tOYW1lfSgpYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jYWxsYmFja05hbWUgKyAnKCknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tPd25lck5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tPd25lck5hbWUgKyAnLl9fbGFtYmRhX18oKSc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlXzEuUmVwZWF0YWJsZVByb21pc2UoY2FsbGJhY2suYmluZCh0aGlzQXJnKSk7XG4gICAgfVxufVxuZXhwb3J0cy5EZWxlZ2F0ZSA9IERlbGVnYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBcnJheVV0aWxpdGllc18xID0gcmVxdWlyZShcIi4uL0NvbGxlY3Rpb25zL0FycmF5VXRpbGl0aWVzXCIpO1xuY29uc3QgRGVsZWdhdGVfMSA9IHJlcXVpcmUoXCIuL0RlbGVnYXRlXCIpO1xuLyoqXG4gKiBJIGNob3NlIHRvIHVzZSBDIyBzdHlsZSBldmVudHMsIG5vdCBKUy9UUywgYmVjYXVzZSB0aGUgSlMvVFMgd2F5IG9mIGRvaW5nIGRlbGVnYXRlcy9jdXN0b20gZXZlbnRzIGlzIGEgTklHSFRNQVJFLiBTdXJlLFxuICogQ3VzdG9tRXZlbnQgd29ya3MsIGJ1dCBvbiB0aGUgVFMgc2lkZSB0aGUgY29kZSByZXF1aXJlZCB0byBtYWtlIFRTQyBoYXBweSB3aXRoIHZhbGlkIGphdmFzY3JpcHQgaXMgYXdmdWwgYW5kIG5vbi1pbnR1aXRpdmUuXG4gKiBPbiB0aGUgSlMgc2lkZSwgeW91IGhhdmUgdGhlIHByb2JsZW0gdGhhdCBldmVyeSBoYW5kbGVyIHBpY2tzIGl0IHVwLCBub3QganVzdCB0aGUgb25lcyB0aGF0IGFyZSBib3VuZCB0byB0aGUgcmVsZXZhbnQgSFRNTFxuICogZWxlbWVudCwgc28gZWxlbWVudHMgbmVlZCB0byBwYXNzIHRoZSBzb3VyY2UgYXMgYW4gYXJndW1lbnQgYW5kIGNoZWNrIGl0IChsaWtlIGpxdWVyeSBhbmQgJChkb2N1bWVudCkub24oKSkuXG4gKlxuICogQWZ0ZXIgZ2V0dGluZyBpdCB3b3JraW5nLCBhbGwgSSBjb3VsZCB0aGluayBhYm91dCB3YXMgaG93IGJhZCB0aGUgY29kZSB3YXMsIHNvIEkgcmV3cm90ZSBpdCBhdm9pZGluZyB0aGUgSlMgcGF0dGVybiBlbnRpcmVseS5cbiAqXG4gKiBUaGlzIGNhbiBiZSBzeW5jaHJvbm91cyAoY2FsbGJhY2tzKSBvciBhc3luY2hyb25vdXMgKHByb21pc2VzKS4gIFdoZW4gaXQgaXMgYXN5bmMsIHRoZSBjb2RlIGV4ZWN1dGVzIGFmdGVyIHRoZSBjdXJyZW50IHN5bmNocm9ub3VzXG4gKiBldmVudHMgcnVuIHRvIGNvbXBsZXRpb24uIFRoaXMgY291bGQgY3JlYXRlIGJ1Z3MgaW4gc3luY2hyb25vdXMgY29kZSwgYnV0IGlzIGJlc3QgZm9yIGJyb3dzZXIgZXZlbnRzLiBUaGlzIGhhbmRsZXIgaXMgcHJpbWFyaWx5IHVzZWQgZm9yXG4gKiBicm93c2VyIGV2ZW50cywgc28gYXN5bmMgaXMgZGVmYXVsdC5cbiAqXG4gKiBCdXQgaWYgeW91J3JlIHRyaWdnZXJpbmcgYXN5bmMgZXZlbnRzIGluIGNvZGUgYW5kIHN0ZXBwaW5nIHRocm91Z2ggaXQgaW4gQ2hyb21lLCB3aGF0IHlvdSBzZWUgd29uJ3QgbWFrZSBzZW5zZSwgYmVjYXVzZSB0aGUgYXN5bmNcbiAqIGV2ZW50cyB3b24ndCBvY2N1ciB1bnRpbCByaWdodCBhd2F5LiBJdCBjYW4gYmUgaGFyZCB0byB0cm91Ymxlc2hvb3QuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbmNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoX2Rpc2FibGVBc3luYyA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVBc3luYyA9IF9kaXNhYmxlQXN5bmM7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSBbXTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIElmIHRoaXMgcmVjZWl2ZXMgYSBkZWxlZ2F0ZSAod2hpY2ggaXMgYW4gYXJyYXkgb2YgZGVsZWdhdGVzKSwgYWRkIGl0LlxuICAgICAgICAvLyBXaGVuIHRoaXMgaXMgaW52b2tlZCwgdGhhdCBkZWxlZ2F0ZSB3aWxsIGFsc28gYmUgaW52b2tlZC5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICBfb3ZyMV9kZWxlZ2F0ZS5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBHb3QgYSBzaW5nbGUgY2FsbGJhY2tcbiAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBjYWxsYmFjay5cbiAgICAgICAgaWYgKHRoaXMuZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoOiB0cnVlIH0pLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0RlbGUgPSBuZXcgRGVsZWdhdGVfMS5EZWxlZ2F0ZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChuZXdEZWxlKTtcbiAgICAgICAgLy8gSUYgdGhpcyBpcyBhc3luY2hyb25vdXMsIHJldHVybiB0aGUgcHJvbWlzZSBzbyBpdCBjYW4gYmUgY2hhaW5lZC5cbiAgICAgICAgLy8gQ2hhaW5pbmcgd29uJ3Qgd29yayBvbiBzeW5jIGNvZGUsIHNvIGRvIG5vdCBpbiB0aGF0IGNhc2UuXG4gICAgICAgIGlmICghdGhpcy5fZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3RGVsZS5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIF9vdnIxX2RlbGVnYXRlKGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFsbG93IGEgc2luZ2xlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGRlbGVnYXRlLlxuICAgICAgICAgICAgaWYgKHRoaXMuZGVsZWdhdGUuZmluZChxID0+IHEgPT09IGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUucHVzaChkZWxlZ2F0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxKSAmJiBxLmNhbGxiYWNrID09PSBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKSB7XG4gICAgICAgIC8vIEZpcnN0IHRyeSB0byB1bnN1YnNjcmliZSB0aGUgZGVmYXVsdCBkZWxlZ2F0ZS4gQ2FuJ3QgZG8gYW55dGhpbmcgaWYgaXQgaGFzIGEgZGlmZmVyZW50IG5hbWUsIHRob3VnaC5cbiAgICAgICAgaWYgKFwiZGVsZWdhdGVcIiBpbiBzZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVEZWxlZ2F0ZShzZW5kZXIuZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE9ubHkgc2VhcmNoZXMgbm9uLWRlbGVnYXRlc1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5kZWxlZ2F0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSB0aGlzLmRlbGVnYXRlW2ldO1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHEpICYmIHEudGhpc0FyZyA9PT0gc2VuZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5kZWxlZ2F0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHEgPSB0aGlzLmRlbGVnYXRlW2ldO1xuICAgICAgICAgICAgaWYgKHEgPT09IGRlbGVnYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW52b2tlKGFyZ3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgICAgIC8vIEFzeW5jIHZlcnNpb24uIERvZXMgbm90IHdvcmsgd2VsbCB3aXRoIHRoZSBjaHJvbWUgZGVidWdnZXIuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucHJvbWlzZS5yZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suY2FsbChsaXN0ZW5lci50aGlzQXJnLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5kKHsgY2FsbGJhY2ssIHRoaXNBcmcsIGZpcnN0TWF0Y2ggfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBBcnJheVV0aWxpdGllc18xLnRyYXZlcnNlKHRoaXMuZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2gobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlyc3RNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgdGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpc0FyZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci50aGlzQXJnID09PSB0aGlzQXJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpOyAvLyBDbGVhcnMgdGhlIGRlbGVnYXRlXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB1bmRlZmluZWQ7IC8vIE1ha2VzIHN1cmUgdGhpcyBjYW4ndCBiZSB1c2VkIGFnYWluXG4gICAgfVxufVxuZXhwb3J0cy5FdmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRXZlbnQgYXJndW1lbnRzIGV4cGVjdGVkIG9uIGFueSBDaGFuZ2UgZXZlbnQuXG4gKi9cbmNsYXNzIFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyB7XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHR5cGUgb2YgY2hhbmdlIG9wZXJhdGlvbiAoc2V0LCBkZWxldGUpIChwb3RlbnRpYWxseSBtZXRob2QpXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnR5cGUgPSAnJztcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNOb25lKHRlc3QpIHtcbiAgICByZXR1cm4gKHRlc3QgPT0gbnVsbCB8fCB0ZXN0ID09PSB1bmRlZmluZWQpO1xufVxuZXhwb3J0cy5pc05vbmUgPSBpc05vbmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGNsb25lRGVlcChvYmosIGhhc2ggPSBuZXcgV2Vha01hcCgpKSB7XG4gICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iajsgLy8gcHJpbWl0aXZlIHR5cGVzXG4gICAgfVxuICAgIGlmIChoYXNoLmhhcyhvYmopKSB7XG4gICAgICAgIHJldHVybiBoYXNoLmdldChvYmopOyAvLyByZWZlcmVuY2UgdG8gb2JqZWN0IHByZXZpb3VzbHkgc2VlblxuICAgIH1cbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFNldCgpO1xuICAgICAgICBBcnJheS5mcm9tKG9iaiwgdmFsID0+IHJlc3VsdC5hZGQoY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIChba2V5LCB2YWxdKSA9PiByZXN1bHQuYWRkKGNsb25lRGVlcChrZXksIGhhc2gpLCBjbG9uZURlZXAodmFsLCBoYXNoKSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkuZnJvbShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKG9iaik7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhd2Z1bCBjb2RlLCBidXQgaXQncyB0aGUgb25seSB3YXkgdG8gY2xvbmUgYSBzdGFuZGFsb25lIGZ1bmN0aW9uICh2cyBhIG1ldGhvZCB3aGljaCBoYXMgYSBkZXNjcmlwdG9yKS5cbiAgICAgICAgLy8gSW4gZ2VuZXJhbCwgeW91IHByb2JhYmx5IGRvbid0IHdhbnQgdG8gdXNlIGNsb25lRGVlcCBvbiBmdW5jdGlvbnMuIFlvdSdsbCBzZWUgaXQncyBOT1QgdXNlZCBvbiBpbnRlcm5hbCBtZXRob2RzLlxuICAgICAgICByZXN1bHQgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgb2JqLnRvU3RyaW5nKCkpKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gICAgaGFzaC5zZXQob2JqLCByZXN1bHQpOyAvLyBLZWVwIHRyYWNrIG9mIG9iamVjdHMgcHJldmlvdXNseSBjbG9uZWRcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIShrZXkgaW4gcmVzdWx0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIG1ldGhvZHMgdGhhdCBhcmVuJ3QgaW4gdGhlIHByb3RvdHlwZS5cbiAgICAgICAgICAgIC8vIFRoaXMgZG9lc24ndCByZWN1cnNpdmVseSBmb2xsb3cgYmVjYXVzZSB0aGVyZSdzIG5vdGhpbmcgcmVjdXJzaXZlIHRvIGRvLlxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGhhc2guc2V0KG9ialtrZXldLCByZXN1bHRba2V5XSk7XG4gICAgICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBtZXRob2QuXG4gICAgICAgICAgICAgICAgLy8gSWYgZXh0cmEga2V5cyBhcmUgdGhyb3duIG9udG8gYSBmdW5jdGlvbiwgdGhleSBwcm9iYWJseSB3aWxsIG5vdCBiZSBjbG9uZWQuXG4gICAgICAgICAgICAgICAgLy8gSW4gbXkgZXhwZXJpZW5jZSwgZXh0cmEga2V5cyBvbiBmdW5jdGlvbnMgZGlkbid0IHdvcmsgcmlnaHQsIHNvIG5vIGJpZyBsb3NzLlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGN1c3RvbSBnZXR0ZXJzL3NldHRlcnMuIFRoZXNlIGFyZSBsb2NhbCBhbmQgaG9wZWZ1bGx5IHdvcmsganVzdCBsaWtlIG1ldGhvZHMuXG4gICAgICAgICAgICAvLyBJbiBtYW55IGNhc2VzLCB0aGlzIGlzIHJlZHVuZGFudCB3aXRoIE9iamVjdC5jcmVhdGUoKSwgYnV0IGlzIG5lY2Vzc2FyeSB0byBhbGxvdyBvYmplY3RzIHdpdGggbWFudWFsbHktYWRkZWQgY3VzdG9tIGdldHRlcnMuXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgLy8gTk9URSB0aGF0IGNsb25lRGVlcCBpcyBOT1QgY2FsbGVkIHJlY3Vyc2l2ZWx5IGhlcmUuIEl0IGFsbCBlbmRzIGF0IHRoZSBnZXR0ZXIvc2V0dGVyLlxuICAgICAgICAgICAgLy8gQUxTTyBoYXNoIG5vdCB1cGRhdGVkOyB0aGlzIGlzIG5vdCBwb3NzaWJsZSwgYmVjYXVzZSBpdCB3aWxsIG1hcCB0aGUgdmFsdWUgaXQgZ2V0cywgbm90IHRoZSBnZXR0ZXIuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGNsb25lRGVlcChvYmpba2V5XSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBJIGRvbid0IGtub3cgZm9yIHN1cmUgaWYgdGhpcyB3aWxsIHdvcmsgaW4gYWxsIGNhc2VzLlxuLy8gSXQgZ2V0cyBkZWVwZXIgaW50byB0aGUgZ3V0cyBvZiBKUyBvYmplY3QgdGhhbiBJIGhhdmUgZXhwZXJpZW5jZSB3aXRoLlxuZnVuY3Rpb24gY2xvbmVPYmplY3Qob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopKSB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXN1bHQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY2xvbmVPYmplY3QgPSBjbG9uZU9iamVjdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBUZWxsIGlmIGEgZ2l2ZW4gc3RyaW5nIGlzIGEgcG9zaXRpdmUgaW50ZWdlci5cbiAqIFVzZSBmb3IgZGV0ZWN0aW5nIGFycmF5IGtleXMuXG4gKi9cbmZ1bmN0aW9uIGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nKHN0cikge1xuICAgIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0ciA9PT0gJzAnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gL15bMS05XVxcZCokLy50ZXN0KHN0cik7XG59XG5leHBvcnRzLmlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nID0gaXNQb3NpdGl2ZUludGVnZXJTdHJpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSSBkb24ndCBrbm93IGhvdyBhY2N1cmF0ZSB0aGlzIGlzIGJ1dCBpdCBzZWVtcyBwcmV0dHkgZ29vZFxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iajtcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQ2xvbmVPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Nsb25lT2JqZWN0XCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9UeXBlcy9Ob25lVHlwZVwiKTtcbi8qKlxuICogT2JqZWN0LmFzc2lnbigpIGNhbiBiZSB1c2VkIGZvciBzaW1wbGUgY29waWVzIG9mIHByb3BlcnRpZXMsIGJ1dCBpdCBtaXNzZXMgZ2V0dGVycyxcbiAqIHNldHRlcnMsIGFuZCBpbmhlcml0ZWQgcHJvcGVydGllcy4gSXQgb25seSBnZXRzIHRoZSBsb2NhbCB2YWx1ZXMuXG4gKlxuICogVGhpcyBzaG91bGQgaG9wZWZ1bGx5IHJlc29sdmUgdGhhdCwgYnV0IEkgZG9uJ3Qga25vdyBmb3Igc3VyZS4gVGhpcyBpcyB2ZXJ5IHNrZXRjaHkuXG4gKiBUaGUgcmVzdWx0cyBhcmUgY29tcGxldGVseSBmbGF0LCBiZWNhdXNlIHlvdSBjYW4ndCBoYXZlIG11bHRpcGxlIGluaGVyaXRhbmNlIGhpZXJhcmNoeVxuICogaW4gYSBsYW5ndWFnZSB3aXRob3V0IG11bHRpcGxlIGluaGVyaXRhbmNlLiBCZWNhdXNlIHRoaXMgZmxhdHRlbnMgb2JqZWN0cywgaXQgaXMgZ3VhcmFudGVlZFxuICogdG8gYnJlYWsgYW55dGhpbmcgdGhhdCBtYWtlcyBzdXBlciBjYWxscy5cbiAqXG4gKiBJZiByZXR1cm5DbG9uZSBpcyB0cnVlLCBhIGNsb25lIG9mIHRoZSB0YXJnZXQgb2JqZWN0IHdpbGwgYmUgbW9kaWZpZWQgYW5kIHJldHVybmVkLCBsZWF2aW5nXG4gKiB0aGUgb3JpZ2luYWwgdW50b3VjaGVkLlxuICovXG5mdW5jdGlvbiBvYmplY3RGdWxsQXNzaWduKHRhcmdldCwgc291cmNlLCByZXR1cm5DbG9uZSA9IGZhbHNlKSB7XG4gICAgaWYgKE5vbmVUeXBlXzEuaXNOb25lKHRhcmdldCkpIHtcbiAgICAgICAgdGFyZ2V0ID0ge307XG4gICAgfVxuICAgIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIGlmIChyZXR1cm5DbG9uZSkge1xuICAgICAgICB0YXJnZXQgPSBDbG9uZU9iamVjdF8xLmNsb25lT2JqZWN0KHRhcmdldCk7XG4gICAgfVxuICAgIGNvbnN0IG5hbWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KGZpbmRUaGVQcm9wZXJ0eU5hbWVzKHNvdXJjZSkpKTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBuYW1lcykge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gICAgZnVuY3Rpb24gZmluZFRoZVByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICByZXN1bHQucHVzaCguLi5PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihmID0+IGYgIT09ICdjb25zdHJ1Y3RvcicpKTtcbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi5maW5kVGhlUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmRUaGVQcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICAgICAgaWYgKHByb3RvICYmIHByb3RvLmNvbnN0cnVjdG9yLm5hbWUgIT09ICdPYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmluZFRoZVByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMub2JqZWN0RnVsbEFzc2lnbiA9IG9iamVjdEZ1bGxBc3NpZ247XG4iXX0=
