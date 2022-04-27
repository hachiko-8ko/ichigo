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
        return this.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25wbV9nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9jaGliaS9PYnNlcnZhYmxlLmpzIiwic3JjL0h0bWwvRXNjYXBlSHRtbC5qcyIsInNyYy9PYnNlcnZhYmxlL0lPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXIuanMiLCJzcmMvT2JzZXJ2YWJsZS9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlLmpzIiwic3JjL09ic2VydmFibGUvSW50ZXJuYWwvT2JqZWN0UHJveHlIYW5kbGVyLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnbi5qcyIsInNyYy9PYnNlcnZhYmxlL09ic2VydmFibGVCYXNlLmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3BlcnR5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVByb3h5LmpzIiwic3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZVN0YXRlLmpzIiwic3JjL1N5c3RlbS9Bc3luYy9EZWZlcnJlZFByb21pc2UuanMiLCJzcmMvU3lzdGVtL0FzeW5jL1JlcGVhdGFibGVQcm9taXNlLmpzIiwic3JjL1N5c3RlbS9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllcy5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0FycmF5Q2hhbmdlZEV2ZW50QXJncy5qcyIsInNyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0RlbGVnYXRlLmpzIiwic3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyLmpzIiwic3JjL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzLmpzIiwic3JjL1N5c3RlbS9UeXBlcy9Ob25lVHlwZS5qcyIsInNyYy9TeXN0ZW0vVXRpbGl0eS9DbG9uZURlZXAuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvQ2xvbmVPYmplY3QuanMiLCJzcmMvU3lzdGVtL1V0aWxpdHkvSXNJbnRlZ2VyLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlLmpzIiwic3JjL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBPYnNlcnZhYmxlQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vLi4vc3JjL09ic2VydmFibGUvT2JzZXJ2YWJsZUFzc2lnblwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm9wZXJ0eV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbmNvbnN0IE9ic2VydmFibGVQcm94eV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVQcm94eVwiKTtcbmNvbnN0IE9ic2VydmFibGVTdGF0ZV8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9PYnNlcnZhYmxlL09ic2VydmFibGVTdGF0ZVwiKTtcbmNvbnN0IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0FycmF5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL0V2ZW50SGFuZGxlclwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uLy4uL3NyYy9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbihmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IHBsdWdpbiA9IHtcbiAgICAgICAgRXZlbnRIYW5kbGVyOiBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIsXG4gICAgICAgIG9ic2VydmFibGVBc3NpZ246IE9ic2VydmFibGVBc3NpZ25fMS5vYnNlcnZhYmxlQXNzaWduLFxuICAgICAgICBPYnNlcnZhYmxlUHJvcGVydHk6IE9ic2VydmFibGVQcm9wZXJ0eV8xLk9ic2VydmFibGVQcm9wZXJ0eSxcbiAgICAgICAgT2JzZXJ2YWJsZVByb3h5OiBPYnNlcnZhYmxlUHJveHlfMS5PYnNlcnZhYmxlUHJveHksXG4gICAgICAgIE9ic2VydmFibGVTdGF0ZTogT2JzZXJ2YWJsZVN0YXRlXzEuT2JzZXJ2YWJsZVN0YXRlLFxuICAgICAgICBBcnJheUNoYW5nZWRFdmVudEFyZ3M6IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xLkFycmF5Q2hhbmdlZEV2ZW50QXJncyxcbiAgICAgICAgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzOiBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MsXG4gICAgfTtcbiAgICB3aW5kb3cubWk1ID0gd2luZG93Lm1pNSB8fCB7fTtcbiAgICB3aW5kb3cubWk1Lm9ic2VydmFibGUgPSBPYmplY3QuYXNzaWduKHdpbmRvdy5taTUub2JzZXJ2YWJsZSB8fCB7fSwgcGx1Z2luKTtcbiAgICAvKipcbiAgICAgKiBUaGlzIHNsaWdodGx5IHNpbXBsaWZlcyB0aGUgcHJvY2VzcyBvZiByZWZlcmVuY2luZyBtaW5pLWljaGlnbyBjb21wb25lbnRzIHdpdGhvdXQgdGhlIGZ1bGwgbmFtZXNwYWNlLlxuICAgICAqIEl0IHJlcXVpcmVzIHR3byBhcmd1bWVudHMsIHVuZm9ydHVuYXRlbHksIGJlY2F1c2UgaXQncyBub3QgcG9zc2libGUgaW4gbWFueSBjYXNlcyB0byBkZXRlcm1pbmUgdGhlXG4gICAgICogY2xhc3Mgb3IgZnVuY3Rpb24gbmFtZS4gT2Z0ZW4gdGhlICduYW1lJyBwcm9wZXJ0eSBoYXMgb25seSB0aGUgbWluaWZpZWQgbmFtZSwgYSByYW5kb20gbGV0dGVyLlxuICAgICAqL1xuICAgIHdpbmRvdy5taTUudXNpbmcgPSBmdW5jdGlvbiB1c2luZyhsaWIsIGFsaWFzKSB7XG4gICAgICAgIGlmICghbGliIHx8ICFhbGlhcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOdWxsQXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuZXZhbC5jYWxsKHdpbmRvdywgJyhmdW5jdGlvbiAoYXJnKSB7IHdpbmRvdy4nICsgYWxpYXMgKyAnID0gYXJnOyB9KScpKGxpYik7XG4gICAgfTtcbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoaW5wdXQpIHtcbiAgICAvLyBUaGVyZSBpc24ndCBhIGJ1aWx0LWluIHdheSB0byBkbyB0aGlzLCBzdGlsbCwgc28gd2UgbmVlZCBhIGhlbHBlciBmdW5jdGlvbi5cbiAgICAvLyBUaGUgYXJ0aWNsZSBcIllvdSBhcmUgcHJvYmFibHkgbWlzdXNpbmcgRE9NIHRleHQgbWV0aG9kc1wiIGNvbnZpbmNlZCBtZSB0byBkbyBpdCB0aGlzIHdheSxcbiAgICAvLyB2cy4gY3JlYXRlVGV4dE5vZGUuIFRob3VnaCBjcmVhdGVUZXh0Tm9kZSB3b3VsZCBwcm9iYWJseSB3b3JrIGZpbmUgZm9yIHNldHRpbmcgaW5uZXJIVE1MLlxuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBjb25zdCBlc2NhcGVzID0ge1xuICAgICAgICBcIjxcIjogXCImbHQ7XCIsXG4gICAgICAgIFwiPlwiOiBcIiZndDtcIixcbiAgICAgICAgXCImXCI6IFwiJmFtcDtcIixcbiAgICAgICAgXCIvXCI6IFwiJiN4MkY7XCIsXG4gICAgICAgIFwiPVwiOiBcIiYjeDNEO1wiLFxuICAgICAgICAnXCInOiBcIiZxdW90O1wiLFxuICAgICAgICBcIidcIjogXCImIzM5O1wiLFxuICAgICAgICBcImBcIjogXCImI3g2MDtcIlxuICAgIH07XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgcyA9PiBlc2NhcGVzW3NdKTtcbn1cbmV4cG9ydHMuZXNjYXBlSHRtbCA9IGVzY2FwZUh0bWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50SGFuZGxlcl8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvRXZlbnRIYW5kbGVyXCIpO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZUNoZWNrKG9iaikge1xuICAgIC8vIE5vdCBhbiBleGhhdXN0aXZlIHRlc3QgYnV0IGl0J3MgdGhlIGltcG9ydGFudCBiaXQuXG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAnY2hhbmdlSGFuZGxlcicgaW4gb2JqICYmIG9iai5jaGFuZ2VIYW5kbGVyIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyXzEuRXZlbnRIYW5kbGVyO1xufVxuZXhwb3J0cy5vYnNlcnZhYmxlQ2hlY2sgPSBvYnNlcnZhYmxlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEFycmF5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9FdmVudEhhbmRsZXIvQXJyYXlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgT2JqZWN0RnVsbEFzc2lnbl8xID0gcmVxdWlyZShcIi4uLy4uL1N5c3RlbS9VdGlsaXR5L09iamVjdEZ1bGxBc3NpZ25cIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4uL09ic2VydmFibGVCYXNlXCIpO1xuY2xhc3MgVHJhaXRTb3VyY2UgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgc3VwZXIoeyBuYW1lOiAnQXJyYXlQcm94eScsIGRpc2FibGVBc3luYyB9KTtcbiAgICB9XG59XG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWNsYXNzZXMtcGVyLWZpbGVcbmNsYXNzIEFycmF5T2JzZXJ2YWJsZSBleHRlbmRzIEFycmF5IHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0TWVyZ2VkT2JzZXJ2YWJsZShhcmdzLCBkaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB3aGVyZSBJIHJlYWxseSBuZWVkIG11bHRpcGxlIGluaGVyaXRhbmNlLiBUaGlzIG5lZWRzIHRvIGluaGVyaXQgZnJvbSBBcnJheVxuICAgICAgICAvLyBiZWNhdXNlIGl0J3MgZXh0ZW5kaW5nIGEgYnVpbHQtaW4gY2xhc3MuIEl0IGFsc28gbmVlZHMgdG8gaW5oZXJpdCBmcm9tIE9ic2VydmFibGVCYXNlLlxuICAgICAgICAvLyBUaHJlZSBjaG9pY2VzOlxuICAgICAgICAvLyAxKSA1MCBsaW5lcyBvZiBjbGlwYm9hcmQgaW5oZXJpdGFuY2UuXG4gICAgICAgIC8vIDIpIENoZWF0IGhlYXZpbHkgYnkgdGFraW5nIGEgdHJhaXQgYXBwcm9hY2guIFRoaXMgbWVhbnMgaGFja2VyeSB0byBtYWtlIFRTIGhhcHB5LlxuICAgICAgICAvLyAzKSBEbyB0aGUgc2FtZSBhcyAyIHdpdGggdGhlIGJ1aWx0LWluIEFycmF5IGNsYXNzLiBOb3QgYSBwcm9ibGVtIGJ1dCB3aXRoICMyIHRoZSBjbGFzcyBuYW1lIGFjdHNcbiAgICAgICAgLy8gYXMgYSBoaW50IHRoYXQgaXQncyBub3QgYSBkZWZhdWx0IGFycmF5LCB3aGljaCBpcyBiZXR0ZXIuXG4gICAgICAgIC8vICMyIHdpbnMuXG4gICAgICAgIGNvbnN0IGFyciA9IG5ldyBBcnJheU9ic2VydmFibGUoLi4uYXJncyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdEZ1bGxBc3NpZ25fMS5vYmplY3RGdWxsQXNzaWduKGFyciwgbmV3IFRyYWl0U291cmNlKGRpc2FibGVBc3luYykpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCAnY2hhbmdlSGFuZGxlcicsIHsgZW51bWVyYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vIE9iamVjdHMgY3JlYXRlZCB0aHJvdWdoIG1hcCwgZmlsdGVyLCBldGMsIHNob3VsZCBiZSBnZW5lcmljIGFycmF5cy5cbiAgICBzdGF0aWMgZ2V0IFtTeW1ib2wuc3BlY2llc10oKSB7XG4gICAgICAgIHJldHVybiBBcnJheTtcbiAgICB9XG4gICAgLy8gTmVlZHMgdG8gYmUgcHVibGljIHNvIHRoZSBwcm94eSBjYW4gY2FsbCBpdCwgYnV0IHNob3VsZCBub3QgYmUgY2FsbGVkIG91dHNpZGUgdGhlIEFQSS4gSW1hZ2luZSBpdCdzIGludGVybmFsLlxuICAgIHB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIGFyZ3MsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIC8vIFRoaXMgcmVxdWlyZXMgYSBjaGVhdC4gSXQgd2lsbCBmYWlsIGlmIHRoZSBvYmplY3QgaXMgY3JlYXRlZCB3aXRoIG5ldygpO1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuaW52b2tlKG5ldyBBcnJheUNoYW5nZWRFdmVudEFyZ3NfMS5BcnJheUNoYW5nZWRFdmVudEFyZ3MoeyB0eXBlLCBwcm9wZXJ0eU5hbWUsIGFyZ3MsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyIH0pKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgpO1xuICAgIH1cbn1cbmV4cG9ydHMuQXJyYXlPYnNlcnZhYmxlID0gQXJyYXlPYnNlcnZhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBJc0ludGVnZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vVXRpbGl0eS9Jc0ludGVnZXJcIik7XG5jbGFzcyBBcnJheVByb3h5SGFuZGxlciB7XG4gICAgZ2V0KHRhcmdldCwga2V5LCBwcm94eSkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kQ2FsbGVkID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIC8vIFNpbGVudCBwYXNzLXRocm91Z2ggb2Ygb3RoZXIgbWV0aG9kc1xuICAgICAgICAgICAgaWYgKEFycmF5UHJveHlIYW5kbGVyLm1ldGhvZHNUb1dhdGNoLmluZGV4T2Yoa2V5LnRvU3RyaW5nKCkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2RDYWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBOZWVkIHRvIGV2YWx1YXRlIHBlcmZvcm1hbmNlIG9mIGNvcGllc1xuICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gbWV0aG9kQ2FsbGVkLmFwcGx5KHRhcmdldCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWZ0ZXIgPSB0YXJnZXQuc2xpY2UoKTsgLy8gVGhpcyBjb3VsZCBiZSB1c2VmdWwgYnV0IGl0IGNvdWxkIGFsc28gYmUgYSBwZXJmb3JtYW5jZSBwcm9ibGVtLlxuICAgICAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ2NhbGwnLCBrZXksIGFyZ3MsIGJlZm9yZSwgYWZ0ZXIsIHByb3h5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSkge1xuICAgICAgICAvLyBQcm9ibGVtOiBXZSB3YW50IHRvIGNhcHR1cmUgb25seSBsZW5ndGggYW5kIFtpbmRleGVyXSBjYWxscywgYnV0IEpTIGhhcyBubyBjb25zaXN0ZW50XG4gICAgICAgIC8vIHdheSBvZiBkZWZpbmluZyBbaW5kZXhlcl0uIFdoYXQgbWFrZXMgaXQgd29yc2UgaXMgdGhhdCBpZiBhIHN0cmluZyBpcyBhbiBpbnRlZ2VyLCBpdCBpc1xuICAgICAgICAvLyBjb252ZXJ0ZWQgdG8gYSBudW1iZXIuIEFuZCBKUyBkb2VzIG5vdCBpbmNsdWRlIGEgYnVpbHQtaW4gd2F5IHRvIHRlc3QgaWYgYSBudW1iZXIgaXMgYW4gaW50ZWdlci5cbiAgICAgICAgLy8gU29sdXRpb246IEEgcmVnZXgtYmFzZWQgY2hlY2suIEljay4gV2F5IHRvIHJlbWluZCBtZSBJJ20gdXNpbmcgSlMuXG4gICAgICAgIGlmIChrZXkgJiYgKGtleS50b1N0cmluZygpID09PSAnbGVuZ3RoJyB8fCB0eXBlb2Yga2V5ID09PSAnbnVtYmVyJyB8fCBJc0ludGVnZXJfMS5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhrZXkpKSkge1xuICAgICAgICAgICAgLy8gVE9ETzogTmVlZCB0byBldmFsdWF0ZSBwZXJmb3JtYW5jZSBvZiBjb3BpZXNcbiAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gdGFyZ2V0LnNsaWNlKCk7IC8vIFRoaXMgY291bGQgYmUgdXNlZnVsIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGEgcGVyZm9ybWFuY2UgcHJvYmxlbS5cbiAgICAgICAgICAgIHRhcmdldC5wdWJsaXNoQ29sbGVjdGlvbkNoYW5nZWQoJ3NldCcsIGtleSwgW3ZhbHVlXSwgYmVmb3JlLCBhZnRlciwgcHJveHkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZSA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBrZXkpO1xuICAgICAgICBjb25zdCBhZnRlciA9IHRhcmdldC5zbGljZSgpOyAvLyBUaGlzIGNvdWxkIGJlIHVzZWZ1bCBidXQgaXQgY291bGQgYWxzbyBiZSBhIHBlcmZvcm1hbmNlIHByb2JsZW0uXG4gICAgICAgIC8vIENhbm5vdCByZXBvcnQgcHJveHkgYXMgc2VuZGVyIGJlY2F1c2UgcHJveHkgbm90IHNlbnQgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgdGFyZ2V0LnB1Ymxpc2hDb2xsZWN0aW9uQ2hhbmdlZCgnZGVsZXRlJywga2V5LCBbXSwgYmVmb3JlLCBhZnRlciwgbnVsbCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbi8vIFRoZXNlIGFyZSBhbGwgdGhlIG1ldGhvZHMsIG5vdCBjb3VudGluZyBjdXN0b20gc2V0dGVycywgdGhhdCBtdXRhdGUgYW4gYXJyYXkuXG5BcnJheVByb3h5SGFuZGxlci5tZXRob2RzVG9XYXRjaCA9IFsnY29weVdpdGhpbicsICdmaWxsJywgJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddO1xuZXhwb3J0cy5BcnJheVByb3h5SGFuZGxlciA9IEFycmF5UHJveHlIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NfMSA9IHJlcXVpcmUoXCIuLi8uLi9TeXN0ZW0vRXZlbnRIYW5kbGVyL1Byb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc1wiKTtcbmNvbnN0IE9ic2VydmFibGVCYXNlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZUJhc2VcIik7XG5jb25zdCBPYmplY3RGdWxsQXNzaWduXzEgPSByZXF1aXJlKFwiLi4vLi4vU3lzdGVtL1V0aWxpdHkvT2JqZWN0RnVsbEFzc2lnblwiKTtcbmNsYXNzIE9iamVjdE9ic2VydmFibGUgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBvbmx5IHdheSB0byBwcm9kdWNlIGFuIG9iamVjdCBvYnNlcnZhYmxlLCBmb3IgcmVhc29ucyBvZiBzYWZldHkuXG4gICAgICovXG4gICAgc3RhdGljIGdldE1lcmdlZE9ic2VydmFibGUoZGF0YSwgZGlzYWJsZUFzeW5jKSB7XG4gICAgICAgIC8vIFdlIG5lZWQgc29tZXRoaW5nIHdpdGggYWxsIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBpbnB1dCBvYmplY3QgbWVyZ2VkIHdpdGggdGhlIHByb3BlcnRpZXMgb2YgdGhpcy5cbiAgICAgICAgLy8gSSBkb24ndCB3YW50IHRvIGFjdHVhbGx5IG1vZGlmeSB0aGUgaW5wdXQgb2JqZWN0LiBFdmVuIHRob3VnaCBpdCBTSE9VTEQgYmUgdGhyb3dhd2F5LCBJIGRvbid0IGtub3cuXG4gICAgICAgIC8vIEFuZCBJIGRvbid0IHdhbnQgdG8gdGFrZSB0aGUgcmlzayB0aGF0IHNvbWV0aGluZyBpbiB0aGUgaW5wdXQsIGFuIHVua25vd24gZmFjdG9yLCB3aWxsIG1ha2UgdGhpcyBibG93IHVwLlxuICAgICAgICAvLyBJIGtub3cgdGhhdCB0aGlzIGNsYXNzIGhhcyBvbmx5IDIgbGV2ZWxzIG9mIGluaGVyaXRhbmNlIChjdXJyZW50bHkpIGFuZCBjb250YWlucyBub3RoaW5nIHZlcnkgY29tcGxleCBhdCBhbnkgbGV2ZWwuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdEZ1bGxBc3NpZ25fMS5vYmplY3RGdWxsQXNzaWduKGRhdGEsIG5ldyBPYmplY3RPYnNlcnZhYmxlKGRpc2FibGVBc3luYyksIHRydWUpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCAnY2hhbmdlSGFuZGxlcicsIHsgZW51bWVyYWJsZTogZmFsc2UgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGRpc2FibGVBc3luYykge1xuICAgICAgICBzdXBlcih7IG5hbWU6IFwiT2JqZWN0UHJveHlcIiwgZGlzYWJsZUFzeW5jIH0pO1xuICAgIH1cbiAgICAvLyBOZWVkcyB0byBiZSBwdWJsaWMgc28gdGhlIHByb3h5IGNhbiBjYWxsIGl0LCBidXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgb3V0c2lkZSB0aGUgQVBJLiBJbWFnaW5lIGl0J3MgaW50ZXJuYWwuXG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIC8vIFRoaXMgZmlsdGVycyBvdXQgdGhlIHRyb3VibGVzb21lIGNoYW5nZUhhbmRsZXIgZmllbGQuXG4gICAgICAgIHJldHVybiBzdXBlci50b0pTT04oKTtcbiAgICB9XG59XG5leHBvcnRzLk9iamVjdE9ic2VydmFibGUgPSBPYmplY3RPYnNlcnZhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBPYmplY3RQcm94eUhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9tZXRob2RzVG9XYXRjaCwgX3dhdGNoU2V0LCBfd2F0Y2hEZWxldGUsIF90cmlnZ2VyT25seU9uQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX21ldGhvZHNUb1dhdGNoID0gX21ldGhvZHNUb1dhdGNoO1xuICAgICAgICB0aGlzLl93YXRjaFNldCA9IF93YXRjaFNldDtcbiAgICAgICAgdGhpcy5fd2F0Y2hEZWxldGUgPSBfd2F0Y2hEZWxldGU7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBfdHJpZ2dlck9ubHlPbkNoYW5nZTtcbiAgICB9XG4gICAgZ2V0KHRhcmdldCwga2V5LCBwcm94eSkge1xuICAgICAgICBpZiAoa2V5IGluIHRhcmdldCkge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kQ2FsbGVkID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXksIHByb3h5KTtcbiAgICAgICAgICAgIC8vIFNpbGVudCBwYXNzLXRocm91Z2ggb2Ygbm9uLXdhdGNoZWQgbWV0aG9kc1xuICAgICAgICAgICAgaWYgKHRoaXMuX21ldGhvZHNUb1dhdGNoLmluZGV4T2Yoa2V5LnRvU3RyaW5nKCkpID09PSAtMSB8fCB0eXBlb2YgbWV0aG9kQ2FsbGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ldGhvZENhbGxlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJldHVybiBhIHdyYXBwZXIgYXJvdW5kIHRoZSBtZXRob2QgdGhhdCBwdWJsaXNoZXMgdGhlIGNoYW5nZVxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gbWV0aG9kQ2FsbGVkLmFwcGx5KHRhcmdldCwgYXJncyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCBrZXksIHVuZGVmaW5lZCwgYXJncywgcHJveHkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KSB7XG4gICAgICAgIGlmICh0aGlzLl93YXRjaFNldCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcHJveHkpO1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICAvLyBJZiB0byBiZSB0cmlnZ2VyZWQgb25seSBvbiBjaGFuZ2UsIGNoZWNrIG9sZFZhbHVlIGFuZCBuZXdWYWx1ZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgJiYgb2xkVmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnc2V0Jywga2V5LCBvbGRWYWx1ZSwgdmFsdWUsIHByb3h5KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlLCBwcm94eSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICAgICAgICBpZiAodGhpcy5fd2F0Y2hEZWxldGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gUmVmbGVjdC5nZXQodGFyZ2V0LCBrZXkpO1xuICAgICAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgICAgICAgICAvLyBDYW5ub3QgcmVwb3J0IHByb3h5IGFzIHNlbmRlciBiZWNhdXNlIHByb3h5IG5vdCBzZW50IHRvIHRoaXMgbWV0aG9kXG4gICAgICAgICAgICB0YXJnZXQucHVibGlzaFByb3BlcnR5Q2hhbmdlZCgnZGVsZXRlJywga2V5LCBvbGRWYWx1ZSwgdW5kZWZpbmVkLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuT2JqZWN0UHJveHlIYW5kbGVyID0gT2JqZWN0UHJveHlIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBPYnNlcnZhYmxlUHJvcGVydHlfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVQcm9wZXJ0eVwiKTtcbi8qKlxuICogVGhpcyBpcyBhIHNpbXBsZSBpbXBsZW1lbnRhdGlvbiBvZiBPYmplY3QuYXNzaWduKCkgdGhhdCB1bmRlcnN0YW5kcyBPYnNlcnZhYmxlUHJvcGVydHksXG4gKiBzbyB0aGF0IGl0IGNhbiB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB3aXRob3V0IHdpcGluZyBvdXQgcmVmZXJlbmNlcyB0byB0aGVcbiAqIGV4aXN0aW5nIHByb3BlcnR5IHdpdGggdGhhdCBrZXkgKHdoaWNoIGlzIHdoYXQgd291bGQgaGFwcGVuIGlmIHlvdSB1c2VkIHJlZ3VsYXIgT2JqZWN0LmFzc2lnbigpXG4gKiBvbiBhIG5vbi1wcm94aWVkIG9iamVjdCkuICBJdCBjYW4gYWxzbyBiZSB1c2VkIHRvIHJlYWQgdGhlIHZhbHVlIG9mIGFuIE9ic2VydmFibGVQcm9wZXJ0eS5cbiAqL1xuZnVuY3Rpb24gb2JzZXJ2YWJsZUFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgfHwge307XG4gICAgZm9yIChjb25zdCBzcmMgb2Ygc291cmNlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzcmMpKSB7XG4gICAgICAgICAgICBjb25zdCBzcHJvcCA9IHNyY1trZXldO1xuICAgICAgICAgICAgY29uc3QgdHByb3AgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgICAgIGxldCB2YWw7XG4gICAgICAgICAgICBpZiAoT2JzZXJ2YWJsZVByb3BlcnR5XzEub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2soc3Byb3ApKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gc3Byb3AudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBzcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChPYnNlcnZhYmxlUHJvcGVydHlfMS5vYnNlcnZhYmxlUHJvcGVydHlDaGVjayh0cHJvcCkpIHtcbiAgICAgICAgICAgICAgICB0cHJvcC52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5vYnNlcnZhYmxlQXNzaWduID0gb2JzZXJ2YWJsZUFzc2lnbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXZlbnRIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9FdmVudEhhbmRsZXJcIik7XG4vKipcbiAqIENvbW1vbiBsb2dpYyBiZXR3ZWVuIHRoZSBkaWZmZXJlbnQgb2JzZXJ2YWJsZSBjbGFzc2VzLiBUaGVzZSBpbXBsZW1lbnQgSU9ic2VydmFibGUuIFRoZSBpbnZvY2F0aW9uIGl0c2VsZiB2YXJpZXMgZnJvbSBjbGFzcyB0byBjbGFzcy5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKHsgbmFtZSwgZm9yd2FyZFRvLCBidWJibGVGcm9tLCBkaXNhYmxlQXN5bmMgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXJfMS5FdmVudEhhbmRsZXIoKTtcbiAgICAgICAgaWYgKGRpc2FibGVBc3luYykge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcl8xLkV2ZW50SGFuZGxlcih0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9yd2FyZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRDaGFuZ2VFdmVudHNUbyhmb3J3YXJkVG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWJibGVGcm9tKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGJ1YmJsZUZyb20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVDaGFuZ2VFdmVudHNGcm9tKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhZ0RlbGVnYXRlKG5hbWUpO1xuICAgIH1cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgLy8gVHlwZXNjcmlwdCBoYXMgZm9yZ290dGVuIHRoYXQgRXZlbnRIYW5kbGVyIGNhbiBhY2NlcHQgYW4gYXJyYXkuXG4gICAgICAgIC8vIEluIHNwaXRlIGlmIHRoZSBmYWN0IHRoYXQgdGhpcyBzaWduYXR1cmUgaXMgaWRlbnRpY2FsLlxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0aGUgaW5wdXQncyBkZWxlZ2F0ZSB0byB0aGlzIG9iamVjdCdzIGNoYW5nZXMuXG4gICAgICovXG4gICAgc2VuZENoYW5nZUV2ZW50c1RvKGZvcndhcmRUbykge1xuICAgICAgICAvLyBKb2luIHRoZSBvdGhlciBldmVudCBoYW5kbGVyIHRvIHRoaXMsIHNvIHRoYXQgd2hlbiB0aGlzIGlzIGludm9rZWQsIHNvIGlzIHRoZSBvdGhlci5cbiAgICAgICAgdGhpcy5zdWJzY3JpYmUoZm9yd2FyZFRvLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdGhpcyBvYmplY3QncyBkZWxlZ2F0ZSB0byB0aGUgaW5wdXQgb2JqZWN0J3MgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWNlaXZlQ2hhbmdlRXZlbnRzRnJvbShidWJibGVGcm9tKSB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBldmVudHMgcmFpc2VkIG9uIHRoZSBvdGhlciBoYW5kbGVyLCBzbyB0aGF0IHdoZW4gdGhhdCBpcyBpbnZva2VkLCBzbyBpcyB0aGlzXG4gICAgICAgIC8vIFRoZSBzYW1lIGFzIGZvcndhcmRDaGFuZ2VFdmVudHNUbyBleGNlcHQgdGhhdCB0aGlzIGlzIHRoZSB0YXJnZXQsIG5vdCB0aGUgc291cmNlLlxuICAgICAgICBidWJibGVGcm9tLnN1YnNjcmliZSh0aGlzLmNoYW5nZUhhbmRsZXIuZGVsZWdhdGUpO1xuICAgIH1cbiAgICB1bnN1YnNjcmliZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUhhbmRsZXIudW5zdWJzY3JpYmVDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlU2VuZGVyKHNlbmRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlTGlzdGVuZXIoc2VuZGVyKTtcbiAgICB9XG4gICAgdW5zdWJzY3JpYmVEZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VIYW5kbGVyLnVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHByb2JhYmx5IGZyb3duZWQgdXBvbiAoc2VlIGhvdyBUUyBkb2Vzbid0IGxpa2UgaXQpLCBidXQgaXQncyB2YWxpZCBKUy5cbiAgICAgKiBJdCdzIG9ubHkgaW50ZW5kZWQgZm9yIHRyb3VibGVzaG9vdGluZywgbm90IHJlYWwgbG9naWMuIFRoZXJlIGFyZSB0aW1lcyB3aGVuIHlvdSdyZVxuICAgICAqIHRyeWluZyB0byBpZGVudGlmeSBleGFjdGx5IHdoaWNoIGRlbGVnYXRlcyBhcmUgc3Vic2NyaWJlZCwgYW5kIHRoaXMgaXMgcmVhbGx5IGhhcmQgd2hlblxuICAgICAqIG5vdGhpbmcgaGFzIGh1bWFuLXJlYWRhYmxlIG5hbWVzLlxuICAgICAqL1xuICAgIHRhZ0RlbGVnYXRlKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5kZWxlZ2F0ZS5fdGFnID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IHggaW4gdGhpcykge1xuICAgICAgICAgICAgaWYgKHggIT09IFwiY2hhbmdlSGFuZGxlclwiICYmIHggIT09IFwicHJpdmF0ZVByb3BlcnR5MlwiKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3hdID0gdGhpc1t4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZUJhc2UgPSBPYnNlcnZhYmxlQmFzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRXNjYXBlSHRtbF8xID0gcmVxdWlyZShcIi4uL0h0bWwvRXNjYXBlSHRtbFwiKTtcbmNvbnN0IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9FdmVudEhhbmRsZXIvUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXCIpO1xuY29uc3QgTm9uZVR5cGVfMSA9IHJlcXVpcmUoXCIuLi9TeXN0ZW0vVHlwZXMvTm9uZVR5cGVcIik7XG5jb25zdCBJc1ByaW1pdGl2ZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0lzUHJpbWl0aXZlXCIpO1xuY29uc3QgSU9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL0lPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JzZXJ2YWJsZUJhc2VfMSA9IHJlcXVpcmUoXCIuL09ic2VydmFibGVCYXNlXCIpO1xuLyoqXG4gKiBBbiBPYnNlcnZhYmxlUHJvcGVydHkgaXMgYSBwcm9wZXJ0eSB0aGF0IGF1dG9tYXRpY2FsbHkgcmFpc2VzIGEgUHJvcGVydHlDaGFuZ2VkIGV2ZW50IHdoZW4gaXQgaXMgbW9kaWZpZWQuIFRoaXMgaXMgbW9yZVxuICogY29udmVuaWVudCB0aGFuIGhhdmluZyB0byBkbyBpdCBtYW51YWxseSBldmVyeSB0aW1lIHlvdSBuZWVkIGl0LlxuICovXG5jbGFzcyBPYnNlcnZhYmxlUHJvcGVydHkgZXh0ZW5kcyBPYnNlcnZhYmxlQmFzZV8xLk9ic2VydmFibGVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJPbmx5T25DaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcGVydHlOYW1lID0gb3B0aW9ucy5uYW1lIHx8ICcnO1xuICAgICAgICB0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlID0gb3B0aW9ucy5vbmx5V2hlbkNoYW5nZWQgfHwgZmFsc2U7XG4gICAgfVxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5fdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLl90cmlnZ2VyT25seU9uQ2hhbmdlICYmIG9sZCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ3NldCcsIHRoaXMucHJvcGVydHlOYW1lLCBvbGQsIHZhbHVlLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSAoaWYgYSBzdHJpbmcpIHRoYXQgaGFzIGhhZCBzcGVjaWFsIEhUTUwgY2hhcmFjdGVycyBlc2NhcGVkLlxuICAgICAqL1xuICAgIGdldCBzYWZlVmFsdWUoKSB7XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0aGlzLl92YWx1ZSkgfHwgIUlzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXNjYXBlSHRtbF8xLmVzY2FwZUh0bWwoU3RyaW5nKHRoaXMuX3ZhbHVlKSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVByb3BlcnR5ID0gT2JzZXJ2YWJsZVByb3BlcnR5O1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBsaWtlIHRoaXMgYmVjYXVzZSBpdCBzaG91bGQgYmUgY2hlY2tpbmcgaWYgdmFsdWUgaXMgYSBzZXR0ZXIsXG4gICAgLy8gYW5kIGl0IGlzbid0LCBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSB0byBjaGVjay5cbiAgICAvLyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKCkgZG9lc24ndCBjYXRjaCBpbmhlcml0ZWQgcHJvcGVydGllcywgb2ZcbiAgICAvLyB3aGljaCB0aGlzIGlzIGFsbW9zdCBhbHdheXMgb25lLlxuICAgIC8vIEkgaGF2ZSB0byBmYWxsIGJhY2sgdG8gYSBiYXNpYyBpbnN0YW5jZSBjaGVjay5cbiAgICByZXR1cm4gb2JqICYmIG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGVQcm9wZXJ0eTtcbn1cbmV4cG9ydHMub2JzZXJ2YWJsZVByb3BlcnR5Q2hlY2sgPSBvYnNlcnZhYmxlUHJvcGVydHlDaGVjaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9BcnJheU9ic2VydmFibGVcIik7XG5jb25zdCBBcnJheVByb3h5SGFuZGxlcl8xID0gcmVxdWlyZShcIi4vSW50ZXJuYWwvQXJyYXlQcm94eUhhbmRsZXJcIik7XG5jb25zdCBPYmplY3RPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9PYmplY3RPYnNlcnZhYmxlXCIpO1xuY29uc3QgT2JqZWN0UHJveHlIYW5kbGVyXzEgPSByZXF1aXJlKFwiLi9JbnRlcm5hbC9PYmplY3RQcm94eUhhbmRsZXJcIik7XG5jbGFzcyBPYnNlcnZhYmxlUHJveHkge1xuICAgIHN0YXRpYyBwcm94aW1hdGUobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCkge1xuICAgICAgICBpZiAodHlwZW9mIG1vZGVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBXZSBjYW4ndCBkbyBmdW5jdGlvbnMsIG5vdCB0aGF0IHRoZXkgd291bGQgYmUgdmVyeSB1c2VmdWwuXG4gICAgICAgICAgICAvLyBZZXMsIHRlY2huaWNhbGx5IHlvdSBzaG91bGQgYmUgYWJsZSB0byBkZWZpbmUgcHJvcGVydGllcyBvbiBhIGZ1bmN0aW9uLiBUaGV5IGFyZSBhY3R1YWxcbiAgICAgICAgICAgIC8vIG9iamVjdHMuICBJbiBwcmFjdGljZSwgaG93ZXZlciwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCkgc3RpbGwgbWFrZXMgdGhlbSB1bmRlZmluZWQuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHR5cGU6IGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShtb2RlbCkpIHtcbiAgICAgICAgICAgIC8vIEFuIGFycmF5IHByb3h5IGFsbG93cyBjaGFuZ2VzIHRvIGFuIGFycmF5IHRvIGJlIG9ic2VydmVkLiBUaGUgZG93bi1zaWRlIGlzIHRoYXQgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIC8vIGlzIGFuIG9yZGVyIG9mIG1hZ25pdHVkZSBzbG93ZXIgdGhhbiB1c2luZyBhbiBPYnNlcnZhYmxlTGlzdC4gIFRoZSB1cC1zaWRlIGlzIHRoYXQgaXQgdXNlc1xuICAgICAgICAgICAgLy8gbW9yZSB0aGFuIGFuIG9yZGVyIG9mIG1hZ25pdHVkZSBsZXNzIGNvZGUuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aW1hdGVBcnJheShtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgbW9kZWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aW1hdGVPYmplY3QobW9kZWwsIGRpc2FibGVBc3luYywgb25seUlmQ2hhbmdlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiBhIHNpbXBsZSB2YWx1ZSBpcyByZXR1cm5lZCwgcmV0dXJuIGEgcHJveHkgaGF2aW5nIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aW1hdGVPYmplY3QoeyB2YWx1ZTogbW9kZWwgfSwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIGNvbmZpZ3VyYWJsZSB2ZXJzaW9uIG9mIHByb3hpbWF0ZSgpIGNhbGxlZCBvbiBhbiBvYmplY3QuIEJ5IG1ha2luZyBpdCBnZW5lcmFsaXplZCBhbmQgY29uZmlndXJhYmxlLCB0aGlzIGFsbG93cyB0aGUgY2FsbGVyIHRvXG4gICAgICogdHJhY2sgbWV0aG9kcyB0aGF0IGFyZSBjYWxsZWQsIGJhc2VkIG9uIGEgY29uZmlndXJhYmxlIGxpc3QuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgb2JqZWN0IGlzIGEgY29tcGxleCBvYmplY3QsIHdoZXJlIGNoaWxkIG9iamVjdHMgYXJlIG1vZGlmaWVkLCBub3QgdGhlIG1haW4gb2JqZWN0LCBjaGFuZ2VzIHdvdWxkIG5vdCBiZSBjYXVnaHQuXG4gICAgICogT25lIHdheSB0byBoYW5kbGUgdGhhdCBpcyB0byBtYWtlIHRoZSBjaGlsZCBvYmplY3QgYSBwcm94eS4gQW5vdGhlciB3YXkgaXMgdG8gYWNjZXNzIHRoZSBjaGlsZCBvYmplY3Qgb25seSB0aHJvdWdoIG1ldGhvZHNcbiAgICAgKiBhbmQgdXNlIHRoaXMuXG4gICAgICovXG4gICAgc3RhdGljIHByb3hpbWF0ZU9iamVjdChtb2RlbCwgZGlzYWJsZUFzeW5jLCBvbmx5SWZDaGFuZ2VkLCBtZXRob2RzVG9XYXRjaCA9IFtdLCB3YXRjaFNldCA9IHRydWUsIHdhdGNoRGVsZXRlID0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1vZGVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBXZSBjYW4ndCBkbyBmdW5jdGlvbnMsIG5vdCB0aGF0IHRoZXkgd291bGQgYmUgdmVyeSB1c2VmdWwuXG4gICAgICAgICAgICAvLyBZZXMsIHRlY2huaWNhbGx5IHlvdSBzaG91bGQgYmUgYWJsZSB0byBkZWZpbmUgcHJvcGVydGllcyBvbiBhIGZ1bmN0aW9uLiBUaGV5IGFyZSBhY3R1YWxcbiAgICAgICAgICAgIC8vIG9iamVjdHMuICBJbiBwcmFjdGljZSwgaG93ZXZlciwgT2JqZWN0LmRlZmluZVByb3BlcnR5KCkgc3RpbGwgbWFrZXMgdGhlbSB1bmRlZmluZWQuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHR5cGU6IGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIElPYnNlcnZhYmxlIG1ldGhvZHMgdG8gdGhlIG1vZGVsIHNvIHRoYXQgaXQgY2FuIHJhaXNlIGV2ZW50cy5cbiAgICAgICAgLy8gV2UgbXVzdCBleHRlbmQgdGhlIG9yaWdpbmFsIGNsYXNzIChvciBhdCBsZWFzdCB0aGUgb2JqZWN0KS5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gT2JqZWN0T2JzZXJ2YWJsZV8xLk9iamVjdE9ic2VydmFibGUuZ2V0TWVyZ2VkT2JzZXJ2YWJsZShtb2RlbCwgZGlzYWJsZUFzeW5jKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBPYmplY3RQcm94eUhhbmRsZXJfMS5PYmplY3RQcm94eUhhbmRsZXIobWV0aG9kc1RvV2F0Y2ggfHwgW10sIHdhdGNoU2V0IHx8IGZhbHNlLCB3YXRjaERlbGV0ZSB8fCBmYWxzZSwgb25seUlmQ2hhbmdlZCB8fCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHRhcmdldCwgaGFuZGxlcik7XG4gICAgICAgIE9ic2VydmFibGVQcm94eS5fbW9kZWxzLnNldChwcm94eSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm94aW1hdGUgYW4gYXJyYXkuXG4gICAgICovXG4gICAgc3RhdGljIHByb3hpbWF0ZUFycmF5KG1vZGVsLCBkaXNhYmxlQXN5bmMsIG9ubHlJZkNoYW5nZWQpIHtcbiAgICAgICAgLy8gQWRkIElPYnNlcnZhYmxlIG1ldGhvZHMgdG8gdGhlIG1vZGVsIHNvIHRoYXQgaXQgY2FuIHJhaXNlIGV2ZW50cy5cbiAgICAgICAgLy8gV2UgbXVzdCBleHRlbmQgdGhlIG9yaWdpbmFsIGFycmF5IGNsYXNzIChvciBhdCBsZWFzdCB0aGUgYXJyYXkgb2JqZWN0KS5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gQXJyYXlPYnNlcnZhYmxlXzEuQXJyYXlPYnNlcnZhYmxlLmdldE1lcmdlZE9ic2VydmFibGUobW9kZWwsIGRpc2FibGVBc3luYyk7XG4gICAgICAgIC8vIFRoZSB0eXBlIGhlcmUgaXNuJ3QgYWNjdXJhdGUsIGJ1dCBJIGhhdmUgbm8gZ29vZCB3YXkgdG8gcGFzcyB0aGUga2V5IHR5cGUgd2l0aG91dCBtYWtpbmcgdGhpcyBjbGFzcyBvbmx5IHdvcmsgZm9yIGFycmF5cy5cbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBBcnJheVByb3h5SGFuZGxlcl8xLkFycmF5UHJveHlIYW5kbGVyKCk7XG4gICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KHRhcmdldCwgaGFuZGxlcik7XG4gICAgICAgIE9ic2VydmFibGVQcm94eS5fbW9kZWxzLnNldChwcm94eSwgdGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgIH1cbn1cbi8vIFRoZSBvcmlnaW5hbCB0YXJnZXQgb2JqZWN0IG5lZWRzIHRvIGJlIHN0b3JlZCBzb21ld2hlcmUgc28gdGhhdCB0aGUgcHJveHkgY2FuIHdvcmsuXG4vLyBUaGVyZSdzIG5vIHJlYXNvbiB0aGF0IHRoZSB1c2VyIGNhbid0IGtlZXAgYSBjb3B5IGJ1dCB3ZSBzaG91bGRuJ3QgZm9yY2UgdGhhdC5cbk9ic2VydmFibGVQcm94eS5fbW9kZWxzID0gbmV3IFdlYWtNYXAoKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZVByb3h5ID0gT2JzZXJ2YWJsZVByb3h5O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFc2NhcGVIdG1sXzEgPSByZXF1aXJlKFwiLi4vSHRtbC9Fc2NhcGVIdG1sXCIpO1xuY29uc3QgUHJvcGVydHlDaGFuZ2VkRXZlbnRBcmdzXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL0V2ZW50SGFuZGxlci9Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3NcIik7XG5jb25zdCBOb25lVHlwZV8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9UeXBlcy9Ob25lVHlwZVwiKTtcbmNvbnN0IENsb25lRGVlcF8xID0gcmVxdWlyZShcIi4uL1N5c3RlbS9VdGlsaXR5L0Nsb25lRGVlcFwiKTtcbmNvbnN0IElzUHJpbWl0aXZlXzEgPSByZXF1aXJlKFwiLi4vU3lzdGVtL1V0aWxpdHkvSXNQcmltaXRpdmVcIik7XG5jb25zdCBJT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcIi4vSU9ic2VydmFibGVcIik7XG5jb25zdCBPYnNlcnZhYmxlQmFzZV8xID0gcmVxdWlyZShcIi4vT2JzZXJ2YWJsZUJhc2VcIik7XG4vKipcbiAqIEFuIG9ic2VydmFibGUgc3RhdGUgdGhhdCBzaG91bGQgb25seSBiZSBhY2Nlc3NlZCB1c2luZyB0aGUgcmVsZXZhbnQgbWV0aG9kcywgYWxsb3dpbmcgYXRvbWljIGNoYW5nZXMgdG8gbXVsdGlwbGUgcHJvcGVydGllc1xuICogaW4gbXVsdGlwbGUgb2JqZWN0cywgcmFpc2luZyBhIHNpbmdsZSBldmVudC5cbiAqL1xuY2xhc3MgT2JzZXJ2YWJsZVN0YXRlIGV4dGVuZHMgT2JzZXJ2YWJsZUJhc2VfMS5PYnNlcnZhYmxlQmFzZSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBcIlwiO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eU5hbWUgPSBvcHRpb25zLm5hbWUgfHwgJ3NldFN0YXRlJztcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICAvLyBJIHdvdWxkIHByZWZlciB0aGF0IHRoaXMgcmV0dXJuIFJlYWRvbmx5PFQ+IGJ1dCBnZXR0ZXIgYW5kIHNldHRlciBoYXZlIHRvIGJlIHRoZSBzYW1lIHR5cGUuXG4gICAgICAgIC8vIFRoYXQgbWVhbnMgeW91IHdvdWxkIGhhdmUgdG8gY2FzdCBhbnkgdmFsdWUgeW91IHNldCBhcyBhIHJlYWRvbmx5LCB3aGljaCBpcyBhIFBJVEEuXG4gICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVyd3JpdGVzIHRoZSBlbnRpcmUgdmFsdWUuXG4gICAgICovXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodmFsdWUsIHRydWUpO1xuICAgIH1cbiAgICBnZXRTYWZlVmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgcHJpbWl0aXZlLCB0aGVuIGNhbGwgdGhpcyB3aXRoIG5vIGFyZ3VtZW50cy5cbiAgICAgICAgLy8gVGhhdCBpcyB0aGUgb25seSBjYXNlIHdoZXJlIGl0IGlzIGFsbG93ZWQuXG4gICAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICghTm9uZVR5cGVfMS5pc05vbmUodGhpcy5fdmFsdWUpICYmIElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVzY2FwZUh0bWxfMS5lc2NhcGVIdG1sKFN0cmluZyh0aGlzLl92YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG1wID0gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0bXApIHx8ICFJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRtcCkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFc2NhcGVIdG1sXzEuZXNjYXBlSHRtbChTdHJpbmcodG1wKSk7XG4gICAgfVxuICAgIGdldFZhbHVlKHByb3BlcnR5KSB7XG4gICAgICAgIC8vIElmIHZhbHVlIGlzIHByaW1pdGl2ZSwgdGhlbiBjYWxsIHRoaXMgd2l0aCBubyBhcmd1bWVudHMuXG4gICAgICAgIC8vIFRoYXQgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSBpdCBpcyBhbGxvd2VkLlxuICAgICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgICAgICBpZiAoIU5vbmVUeXBlXzEuaXNOb25lKHRoaXMuX3ZhbHVlKSAmJiBJc1ByaW1pdGl2ZV8xLmlzUHJpbWl0aXZlKHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIGdldFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgc2V0U3RhdGUodmFsdWUsIG92ZXJXcml0ZUFsbCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlO1xuICAgICAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgICAgIC8vIElmIHRoZSB0eXBlIGlzIHByaW1pdGl2ZSwgdGhlbiBhIGZ1bGwgb3ZlcndyaXRlIGlzIGFsbG93ZWRcbiAgICAgICAgaWYgKElzUHJpbWl0aXZlXzEuaXNQcmltaXRpdmUodGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbnMgd2lsbCBleGVjdXRlIGJ1dCB0aGV5IHdvbid0IGNoYW5nZSB0aGUgdmFsdWUuIFRoZSByZWFzb24gaXMgdGhlIHNhbWUgcmVhc29uIHRoYXQgdGhpcyBtYWtlcyBubyBwZXJtYW5lbnQgY2hhbmdlIHRvIGJhcjpcbiAgICAgICAgICAgIC8vIHZhciBmb28gPSBmdW5jdGlvbihzdHIpIHsgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7IH07IHZhciBiYXIgPSAnYWJjJzsgZm9vKGJhcik7IGNvbnNvbGUubG9nKGJhciA9PT0gJ2FiYycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgc2V0U3RhdGUgd2l0aCBhIGZ1bmN0aW9uIGlmIHN0YXRlIGlzIHByaW1pdGl2ZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG92ZXJXcml0ZUFsbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG92ZXJXcml0ZUFsbCkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBfb3ZyMV9vdmVyd3JpdGVBbGwuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBbbmV3VmFsdWUsIHJldHVyblZhbHVlXSA9IF9vdnIzX2Z1bmN0aW9uQXJnLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBpcyBub3QgYSBwYXJ0aWFsIHN0YXRlIG9yIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZhbHVlID0gX292cjJfcGFydGlhbC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1Ymxpc2hQcm9wZXJ0eUNoYW5nZWQoJ2NhbGwnLCB0aGlzLnByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIHsgb2xkVmFsdWUsIG5ld1ZhbHVlLCByZXR1cm5WYWx1ZSB9O1xuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9vdmVyd3JpdGVBbGwoX3ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBPdmVyd3JpdGUgdGhlIGVudGlyZSBvYmplY3QuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcChfdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMl9wYXJ0aWFsKF92YWx1ZSkge1xuICAgICAgICAgICAgLy8gUGFydGlhbCBvYmplY3Q6IE92ZXJ3cml0ZSBvbmx5IHRoZSBrZXlzIHByb3ZpZGVkXG4gICAgICAgICAgICBjb25zdCB0bXAgPSBDbG9uZURlZXBfMS5jbG9uZURlZXAodGhpcy5fdmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRtcFtrZXldID0gX3ZhbHVlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IENsb25lRGVlcF8xLmNsb25lRGVlcCh0bXApO1xuICAgICAgICAgICAgcmV0dXJuIHRtcDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyM19mdW5jdGlvbkFyZyhfdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGZ1bmN0aW9uIHByb3ZpZGVkIGFuZCB1cGRhdGUgdGhlIG9iamVjdCBhcyBkaWN0YXRlZFxuICAgICAgICAgICAgLy8gTWF5YmUgdW5uZWNlc3NhcnkgYnV0IHdlIHdhbnQgdG8gYXZvaWQgdGhlIGNhbGxlciBleGZpbHRyYXRpbmcgdGhlIHN0YXRlIHVzaW5nIGEgZnVuY3Rpb24sXG4gICAgICAgICAgICAvLyBieSBhY2NpZGVudC4gT2YgY291cnNlLCB0aGV5IGNhbiBqdXN0IGFjY2VzcyBfdmFsdWUgYnkgY2FzdGluZyBhcyBhbnksXG4gICAgICAgICAgICAvLyBidXQgdGhhdCdzIG5vdCBhY2NpZGVudGFsLlxuICAgICAgICAgICAgY29uc3QgdG1wID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRoaXMuX3ZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IF9yZXR1cm5WYWx1ZSA9IF92YWx1ZS5jYWxsKHRtcCwgdG1wKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gQ2xvbmVEZWVwXzEuY2xvbmVEZWVwKHRtcCk7XG4gICAgICAgICAgICByZXR1cm4gW3RtcCwgX3JldHVyblZhbHVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgcHVibGlzaFByb3BlcnR5Q2hhbmdlZCh0eXBlLCBwcm9wZXJ0eU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgc2VuZGVyKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlci5pbnZva2UobmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50QXJnc18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50QXJncyh7IHR5cGUsIHByb3BlcnR5TmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBzZW5kZXIgfSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuT2JzZXJ2YWJsZVN0YXRlID0gT2JzZXJ2YWJsZVN0YXRlO1xuZnVuY3Rpb24gb2JzZXJ2YWJsZVN0YXRlQ2hlY2sob2JqKSB7XG4gICAgaWYgKCFJT2JzZXJ2YWJsZV8xLm9ic2VydmFibGVDaGVjayhvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gSSBkb24ndCBrbm93IGlmIEkgc2hvdWxkIGNoZWNrIGZvciB0aGlzIG9yIGZvciBnZXRTdGF0ZSgpIGFuZCBzZXRTdGF0ZSgpXG4gICAgcmV0dXJuIG9iaiAmJiBvYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlU3RhdGU7XG59XG5leHBvcnRzLm9ic2VydmFibGVTdGF0ZUNoZWNrID0gb2JzZXJ2YWJsZVN0YXRlQ2hlY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogQSBkZWZlcnJlZCBwcm9taXNlIGlzIGEgd3JhcHBlciBhcm91bmQgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGl0IHRvIGJlIHRyaWdnZXJlZCBsYXRlci4gSW4gcHVyZSBKUywgdGhpcyBpcyBoYXJkZXJcbiAqIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGFuZCBpdCB0YWtlcyBhIHdlaXJkIGhhY2sgdG8gbWFrZSBpdCB3b3JrLiBUaGlzIGNsYXNzIGlzIGxpdHRsZSBtb3JlIHRoYW4gYSB3cmFwcGVyIGFyb3VuZFxuICogc2FpZCBoYWNrLlxuICpcbiAqIE90aGVyd2lzZSwgdGhpcyB1c2VzIGEgcmVhbCBwcm9taXNlIGludGVybmFsbHksIHNvIGFzaWRlIGZyb20gdGhlIHdyYXBwaW5nIG9iamVjdCwgaXQgaGFzIG5vIHNwZWNpYWwgbG9naWMuIEkgY2hvc2VcbiAqIG5vdCB0byByZS1pbXBsZW1lbnQgdGhlIFByb21pc2UgQVBJIHN5bmNocm9ub3VzbHksIHNvIGl0IHVzZXMgdGhlIHNhbWUgbWljcm90YXNrIHF1ZXVlLlxuICpcbiAqIFRoZSB3cmFwcGluZyBBUEkgaXMgdHdlYWtlZCBhIGxpdHRsZSB0byBhdm9pZCBzb21lIGNvbW1vbiBwaXRmYWxscyB0aGF0IGFyZSBjYXVzZWQgYnkgZmxhd3MgaW4gdGhlIFByb21pc2VcbiAqIGRlc2lnbi4gRm9yIGV4YW1wbGUsIGhhdmluZyBvbmZ1bGZpbGxlZCBhbmQgb25yZWplY3RlZCBpbiB0aGUgc2FtZSBzdGVwIG1lYW5zIHRoYXQgZXJyb3JzIGluIHRoZSBmdWxmaWxsZWRcbiAqIGhhbGYgd2lsbCBub3QgYmUgY2F1Z2h0IGJ5IHRoZSBlcnJvciBoYW5kbGVyLiAgUmF0aGVyIHRoYW4gc2F5IFwiZG9uJ3QgdXNlIHRoYXQgaW5wdXRcIiBsaWtlIG1vc3QgaW5zdHJ1Y3RvcnMsXG4gKiBJIGp1c3QgZ290IHJpZCBvZiBpdCAoaXQncyBzdGlsbCBhY2Nlc3NpYmxlIG9uIHRoZSBvdXRwdXQgcHJvcGVydHksIGlmIHlvdSB3YW50IHRvIHVzZSBpdCAuLi4gYnV0IGRvbid0KS5cbiAqL1xuY2xhc3MgRGVmZXJyZWRQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgdGhyb3dPblVuaGFuZGxlZEVycm9yID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aHJvd09uVW5oYW5kbGVkRXJyb3I7XG4gICAgICAgIC8qKiBVc2UgdGhpcyB0byBpbnZva2UgdGhlIGNhbGxiYWNrICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eSBUUyBkb2Vzbid0IGtub3cgdGhhdCB0aGUgcHJvcGVydGllcyBhcmUgcmVwbGFjZWQgaW4gdGhlIHByb21pc2UgaW4gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLyoqIFVzZSB0aGlzIHRvIHJlamVjdCB0aGUgcHJvbWlzZSByaWdodCBvdXQuIFdoaWNoIGlzIHByb2JhYmx5IHVzZWxlc3MgYnV0IHlvdSBuZXZlciBrbm93LiAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHkgVFMgZG9lc24ndCBrbm93IHRoYXQgdGhlIHByb3BlcnRpZXMgYXJlIHJlcGxhY2VkIGluIHRoZSBwcm9taXNlIGluIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICB0aGlzLnJlamVjdCA9IGZ1bmN0aW9uIF9kdW1teSgpIHsgfTtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgd2VpcmQgaGFjayB0aGF0IGlzIHRoZSBiYXNpcyBvZiB0aGlzIGNsYXNzLiBJdCdzIGEgY2xvc3VyZSwgYnV0IHJldmVyc2VkLCBhcyB0aGVcbiAgICAgICAgLy8gZW5jbG9zZWQgcHJvcGVydHkgaXMgYW4gaW50ZXJuYWwgcmVmZXJlbmNlIGFjY2Vzc2VkIG91dHNpZGUgcmF0aGVyIHRoYW4gYW4gb3V0c2lkZSByZWZlcmVuY2VcbiAgICAgICAgLy8gYWNjZXNzZWQgaW5zaWRlLlxuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gX3JlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC5cbiAgICAgICAgLy8gV2Ugd2FudCB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBhbGxvdyB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBjb25zdCB3YWl0YWJsZSA9IG5ldyBEZWZlcnJlZFByb21pc2UoKTsgZXZlbnQuc3Vic2NyaWJlKHdhaXRhYmxlLnJlc29sdmUpOyBjb25zdCByID0gYXdhaXQgd2FpdGFibGUub3V0cHV0OyBjb25zb2xlLmxvZyhyKTtcbiAgICAgICAgLy8gSWYgeW91IGxlYXZlIG91dCB0aGUgaW5pdGlhbCBjYWxsYmFjaywgeW91J2xsIGdldCB1bmRlZmluZWQgaW5zdGVhZCBvZiB3aGF0IHRoZSBldmVudCBzZW5kcy5cbiAgICAgICAgaWYgKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ob25mdWxmaWxsZWQsIHRocm93T25VbmhhbmRsZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcywgdGhyb3dPblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW4gYXN5bmMvYXdhaXQgY29kZS4gVGhlIGZvbGxvd2luZyB3aWxsIHdvcmsgaWYgYSByZXN1bHQgaXMgcmV0dXJuZWQuXG4gICAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgZGVmZXJyZWQub3V0cHV0O1xuICAgICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICovXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICAgIC8qKiBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay4gKi9cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCB0aHJvd09uVW5oYW5kbGVkRXJyb3IgPSB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvcikge1xuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLnRoZW4ob25mdWxmaWxsZWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgaXMgdG8ga2VlcCBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0J3MgdWdseS5cbiAgICAgICAgLy8gSXQgbWVhbnMgYSBsb3Qgb2YgZXh0cmEgc3RlcHMuIEl0IG1ha2VzIHN1cmUgdGhhdCBieSBkZWZhdWx0LCB0aGUgbGFzdCBzdGVwIGlzIGFsd2F5cyBhIGNhdGNoLlxuICAgICAgICBpZiAodGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChlcnIgPT4geyB0aHJvdyAoZXJyKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhdGNoKG9ucmVqZWN0ZWQsIHRocm93T25VbmhhbmRsZWRFcnJvciA9IHRoaXMudGhyb3dPblVuaGFuZGxlZEVycm9yKSB7XG4gICAgICAgIGlmIChvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5fcHJvbWlzZS5jYXRjaChvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZ2FpbiB0aGlzIGlzIGEgbWVzcywgYnV0IHRoZSBjYXRjaCBoYW5kbGVyIGFib3ZlIGNvdWxkIHRocm93XG4gICAgICAgIGlmICh0aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSB0aGlzLl9wcm9taXNlLmNhdGNoKGVyciA9PiB7IHRocm93IChlcnIpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLkRlZmVycmVkUHJvbWlzZSA9IERlZmVycmVkUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgRGVmZXJyZWRQcm9taXNlXzEgPSByZXF1aXJlKFwiLi9EZWZlcnJlZFByb21pc2VcIik7XG4vKipcbiAqIFRoZSBwcm9taXNlIEFQSSBpcyBuaWNlLCBtb3N0bHksIGJ1dCB0aGUgbWFpbiB0aGluZyBwcmV2ZW50aW5nIHVzZSBvZiBhIHByb21pc2UgYXMgYW4gZXZlbnQgaGFuZGxlciBpcyB0aGF0XG4gKiBpdCBvbmx5IGV4ZWN1dGVzIG9uY2UuIEFmdGVyIHRoYXQgcG9pbnQsIGl0IGlzIHJlc29sdmVkLCBhbmQgdGhlcmUgaXMgbm8gd2F5IHRvIGZsaXAgaXQgYmFjay5cbiAqXG4gKiBUaGUgcmVwZWF0YWJsZSBwcm9taXNlIGtlZXBzIHRoZSBwcm9taXNlIEFQSSBhbmQgY3JlYXRlcyB0aGUgaWxsdXNpb24gdGhhdCB0aGUgcHJvbWlzZSBpcyByZXBlYXRlZCBieVxuICogcmVidWlsZGluZyB0aGUgY2hhaW4gZWFjaCB0aW1lLiBJdCdzIHJlYWxseSBhIGRlZmVycmVkIGZhY3RvcnkgYnV0IGl0IHByZXRlbmRzIHRvIGJlIGEgZGVmZXJyZWQuIEknbSBzdXJlXG4gKiB0aGlzIGhhcyBhIHBlcmZvcm1hbmNlIHBlbmFsdHkuXG4gKlxuICogWW91IHNob3VsZCBub3QgYXR0YWNoIGFjdHVhbCBwcm9taXNlcyBpbnRvIHRoZSB0aGVuKCkgY2hhaW4sIGJlY2F1c2UgdGhleSBjYW4ndCBiZSByZXBlYXRlZC4gVGhlIFByb21pc2UgdHlwZSBpc24ndFxuICogYWxsb3dlZCBidXQgdGhlcmUgYXJlIHdheXMgdG8gZ2V0IGFyb3VuZCB0aGUgVFMgY29tcGlsZXIuIFRoZSBUUyB0eXBlIGRlZmluaXRpb24gZm9yIFByb21pc2UgYW5kIFByb21pc2VMaWtlIGlzbid0XG4gKiBjb21wbGV0ZWx5IGNvcnJlY3QsIGFueXdheSwgc28gaXQncyBlYXN5IHRvIGdldCB1c2VkIHRvIHVzaW5nIHRoZSBhbnkgdHlwZSBhbmQgbWFrZSBicm9rZW4gY29kZS5cbiAqXG4gKiBZb3UgY2Fubm90IGFzeW5jL2F3YWl0IGEgcmVwZWF0YWJsZSBwcm9taXNlIGl0c2VsZiBidXQgeW91IGNhbiBhd2FpdCBhIHNpbmdsZSByZXNvbHV0aW9uLiBBc3luYy9hd2FpdCBpcyBzdWdhciB0aGF0XG4gKiBjcmVhdGVzIGEgcmVndWxhciwgbm9uLXJlcGVhdGFibGUsIHByb21pc2UuXG4gKi9cbmNsYXNzIFJlcGVhdGFibGVQcm9taXNlIHtcbiAgICBjb25zdHJ1Y3RvcihvbmZ1bGZpbGxlZCwgb25VbmhhbmRsZWRFcnJvciwgLy8gVGhpcyBhZGRzIGEgY2FsbGJhY2sgYXQgdGhlIGVuZCAob3IgMm5kIGZyb20gdGhlIGVuZCwgc2VlIG5leHQgb3B0aW9uKVxuICAgIHRocm93T25VbmhhbmRsZWRFcnJvciA9IGZhbHNlIC8vIFRoaXMga2VlcHMgYSBwcm9taXNlIGZyb20sIGJ5IGRlZmF1bHQsIGVhdGluZyB1cCBhbGwgZXJyb3JzLiBJdCBhZGRzIGEgZmluYWwgY2F0Y2ggdGhhdCB0aHJvd3MgaWYgaGl0LlxuICAgICkge1xuICAgICAgICB0aGlzLm9uVW5oYW5kbGVkRXJyb3IgPSBvblVuaGFuZGxlZEVycm9yO1xuICAgICAgICB0aGlzLnRocm93T25VbmhhbmRsZWRFcnJvciA9IHRocm93T25VbmhhbmRsZWRFcnJvcjsgLy8gVGhpcyBrZWVwcyBhIHByb21pc2UgZnJvbSwgYnkgZGVmYXVsdCwgZWF0aW5nIHVwIGFsbCBlcnJvcnMuIEl0IGFkZHMgYSBmaW5hbCBjYXRjaCB0aGF0IHRocm93cyBpZiBoaXQuXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgYXQgdGhlIGZpcnN0IGxldmVsLCBldmVuIGlmIGl0J3MganVzdCByZXR1cm5pbmcgdGhlIHJlc3VsdC4gVXNlZnVsIGZvciBhc3luYy9hd2FpdCBjb2RlLlxuICAgICAgICBpZiAob25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbihvbmZ1bGZpbGxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4ocmVzID0+IHJlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVGhlIGZvbGxvd2luZyBzaG91bGQgd29yazpcbiAgICAvLyBjb25zdCByZXBlYXRhYmxlID0gbmV3IFJlcGVhdGFibGVQcm9taXNlKCk7IGNvbnN0IHIgPSBhd2FpdCByZXBlYXRhYmxlLnJlc29sdmUoKTsgY29uc29sZS5sb2cocik7XG4gICAgcmVzb2x2ZShhcmdzKSB7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmJ1aWxkKCk7XG4gICAgICAgIHByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICByZWplY3QoYXJncykge1xuICAgICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5idWlsZCgpO1xuICAgICAgICBwcm9taXNlLnJlamVjdChhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2Uub3V0cHV0O1xuICAgIH1cbiAgICAvLyBUaGVuKCkgb25seSBoYXMgb25lIG9wdGlvbiwgYmVjYXVzZSBpdCdzIHRvbyBlYXN5IHRvIGZvcmdldCB0aGF0IHRoZSBvbnJlamVjdGVkIGNhbGxiYWNrIGRvZXNuJ3QgaGFuZGxlIHRoZSBvbmZ1bGxlZCBjYWxsYmFjay5cbiAgICB0aGVuKG9uZnVsZmlsbGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbmZ1bGZpbGxlZDogb25mdWxmaWxsZWQgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYXRjaChvbnJlamVjdGVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goeyBvbnJlamVjdGVkOiBvbnJlamVjdGVkIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBpZiAoIXByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhlIGZpcnN0IGlzIGFsd2F5cyBvbmZ1bGZpbGxlZCBhbmQgaXMgbmV2ZXIgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKCFjYi5vbmZ1bGZpbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIEZpcnN0IG9uZnVsZmlsbGVkIGlzIG51bGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlID0gbmV3IERlZmVycmVkUHJvbWlzZV8xLkRlZmVycmVkUHJvbWlzZShjYi5vbmZ1bGZpbGxlZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25mdWxmaWxsZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oY2Iub25mdWxmaWxsZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Iub25yZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goY2Iub25yZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCdWcgaW4gUmVwZWF0YWJsZVByb21pc2UgY29uc3RydWN0b3IuIE5vIGNhbGxiYWNrcywgbm90IGV2ZW4gdGhlIGRlZmF1bHQgZmlyc3Qgb25mdWxmaWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2godGhpcy5vblVuaGFuZGxlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aHJvd09uVW5oYW5kbGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZXJyID0+IHsgdGhyb3cgKGVycik7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVwZWF0YWJsZVByb21pc2UgPSBSZXBlYXRhYmxlUHJvbWlzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBSZXR1cm4gZWxlbWVudHMgb2YgYXJyYXkgYSBsaW5lZCB1cCB3aXRoIGVsZW1lbnRzIG9mIGFycmF5IGIuIEJvdGggYXJyYXlzIGRvbid0IGhhdmUgdG8gYmUgdGhlIHNhbWUgbGVuZ3RoLlxuICovXG5mdW5jdGlvbiB6aXAoYSwgYikge1xuICAgIGlmIChhLmxlbmd0aCA+PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYS5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiBbZWxlbWVudCwgYltpbmRleF1dKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm1hcCgoZWxlbWVudCwgaW5kZXgpID0+IFthW2luZGV4XSwgYl0pO1xuICAgIH1cbn1cbmV4cG9ydHMuemlwID0gemlwO1xuLyoqXG4gKiBSZXR1cm4gYSBjYXJ0ZXNpYW4gam9pbiAoY3Jvc3Mgam9pbikgYmV0d2VlbiBhcnJheXMgYSBhbmQgYi5cbiAqL1xuZnVuY3Rpb24gY2FydGVzaWFuKGEsIGIpIHtcbiAgICAvLy8gdHlwZXNjcmlwdCBwcmV2ZW50cyBhIGRpcmVjdCB1c2Ugb2YgY29uY2F0LCBzbyBkbyB0aGlzIG1hbnVhbGx5IHdpdGggYSBsb29wXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCguLi5iLm1hcChxID0+IFtpdGVtLCBxXSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbn1cbmV4cG9ydHMuY2FydGVzaWFuID0gY2FydGVzaWFuO1xuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhbmdlIG9mIGludGVnZXJzLCBjb3VudGluZyB1cCBieSAxLCBmb3IgdGhlIGdpdmVuIGxlbmd0aC4gU3RvbGVuIGZyb20gUHl0aG9uLlxuICovXG5mdW5jdGlvbiByYW5nZShsZW5ndGgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuZ3RoIH0sICh2YWx1ZSwga2V5KSA9PiBrZXkpO1xufVxuZXhwb3J0cy5yYW5nZSA9IHJhbmdlO1xuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiBpdGVtcyBhbmQgb3RoZXIgYXJyYXlzLCBmbGF0dGVuIHRoZW0gb3V0IGludG8gYSBzaW5nbGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uKiB0cmF2ZXJzZShhcnIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICB5aWVsZCBhcnI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IHJvdyBvZiBhcnIpIHtcbiAgICAgICAgICAgIHlpZWxkKiB0cmF2ZXJzZShyb3cpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy50cmF2ZXJzZSA9IHRyYXZlcnNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBBcnJheUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIG9wZXJhdGlvbiAobWV0aG9kLCBzZXQsIGRlbGV0ZSlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICcnO1xuICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmFyZ3MgPSBbXTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnRzLkFycmF5Q2hhbmdlZEV2ZW50QXJncyA9IEFycmF5Q2hhbmdlZEV2ZW50QXJncztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUmVwZWF0YWJsZVByb21pc2VfMSA9IHJlcXVpcmUoXCIuLi9Bc3luYy9SZXBlYXRhYmxlUHJvbWlzZVwiKTtcbi8qKlxuICogQSBkZWxlZ2F0ZSBvYmplY3QgaXMgdXNlZCBieSB0aGUgRXZlbnRIYW5kbGVyLiBJdCBjb250YWlucyBlbm91Z2ggaW5mb3JtYXRpb24gdG8gZXhlY3V0ZSBhIGNhbGxiYWNrIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3VzbHlcbiAqICh1c2luZyBhIHByb21pc2UpLiBJdCBhbHNvIGFkZHMgc29tZSBzdHJpbmdzIHRvIGhlbHAgaW4gdHJvdWJsZXNob290aW5nLCBiZWNhdXNlIHNlYXJjaGluZyBhIHJlY3Vyc2l2ZSBhcnJheSBvZiBjb21wbGV4IG9iamVjdHMgY2FuIG1ha2VcbiAqIGl0IGEgYmVhciB0byBmaW5kIG91dCB3aHkgYSBjYWxsYmFjayBpc24ndCBiZWluZyBleGVjdXRlZC5cbiAqL1xuY2xhc3MgRGVsZWdhdGUge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIC8vIEluIG1hbnkgY2FzZXMgKGZvciBleGFtcGxlLCB3aGVuIHVzaW5nIGZhdCBhcnJvdyBmdW5jdGlvbnMpLCB0aGlzQXJnIGlzXG4gICAgICAgIC8vIG5vdCBuZWVkZWQuIEJ1dCBpbiBtb3N0IG90aGVycywgaXQgaXMgYW4gYW5ub3lpbmcgYnVnIHRoYXQgcmVxdWlyZXMgdHJvdWJsZXNob290aW5nXG4gICAgICAgIC8vIHRvIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY2FsbGVyIGZvcmdvdC4gSSd2ZSB3YXZlcmVkIGJldHdlZW4gbWFraW5nIGl0IHJlcXVpcmVkIGFuZCBub3QuXG4gICAgICAgIGlmICghdGhpc0FyZykge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGVsZWdhdGUgY3JlYXRlZCB3aXRob3V0IHRoaXNBcmcuIERpZCB5b3UgbWVhbiB0bz8nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgICAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdGhpc0FyZyA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiB0aGlzQXJnKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrT3duZXJOYW1lID0gdGhpc0FyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSB0eXBlc2NyaXB0IGNvbXBpbGVyIHNob3VsZCBoYW5kbGUgdGhpcyBjaGVjayBidXQgY2FuJ3QgYXQgcnVudGltZS5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5jYWxsYmFja05hbWUgPSBjYWxsYmFjay5uYW1lO1xuICAgICAgICBpZiAodGhpcy5jYWxsYmFja093bmVyTmFtZSAmJiB0aGlzLmNhbGxiYWNrTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5jYWxsYmFja093bmVyTmFtZX0uJHt0aGlzLmNhbGxiYWNrTmFtZX0oKWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jYWxsYmFja05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY2FsbGJhY2tOYW1lICsgJygpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrT3duZXJOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNhbGxiYWNrT3duZXJOYW1lICsgJy5fX2xhbWJkYV9fKCknO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBSZXBlYXRhYmxlUHJvbWlzZV8xLlJlcGVhdGFibGVQcm9taXNlKGNhbGxiYWNrLmJpbmQodGhpc0FyZykpO1xuICAgIH1cbn1cbmV4cG9ydHMuRGVsZWdhdGUgPSBEZWxlZ2F0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQXJyYXlVdGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuLi9Db2xsZWN0aW9ucy9BcnJheVV0aWxpdGllc1wiKTtcbmNvbnN0IERlbGVnYXRlXzEgPSByZXF1aXJlKFwiLi9EZWxlZ2F0ZVwiKTtcbi8qKlxuICogSSBjaG9zZSB0byB1c2UgQyMgc3R5bGUgZXZlbnRzLCBub3QgSlMvVFMsIGJlY2F1c2UgdGhlIEpTL1RTIHdheSBvZiBkb2luZyBkZWxlZ2F0ZXMvY3VzdG9tIGV2ZW50cyBpcyBhIE5JR0hUTUFSRS4gU3VyZSxcbiAqIEN1c3RvbUV2ZW50IHdvcmtzLCBidXQgb24gdGhlIFRTIHNpZGUgdGhlIGNvZGUgcmVxdWlyZWQgdG8gbWFrZSBUU0MgaGFwcHkgd2l0aCB2YWxpZCBqYXZhc2NyaXB0IGlzIGF3ZnVsIGFuZCBub24taW50dWl0aXZlLlxuICogT24gdGhlIEpTIHNpZGUsIHlvdSBoYXZlIHRoZSBwcm9ibGVtIHRoYXQgZXZlcnkgaGFuZGxlciBwaWNrcyBpdCB1cCwgbm90IGp1c3QgdGhlIG9uZXMgdGhhdCBhcmUgYm91bmQgdG8gdGhlIHJlbGV2YW50IEhUTUxcbiAqIGVsZW1lbnQsIHNvIGVsZW1lbnRzIG5lZWQgdG8gcGFzcyB0aGUgc291cmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBjaGVjayBpdCAobGlrZSBqcXVlcnkgYW5kICQoZG9jdW1lbnQpLm9uKCkpLlxuICpcbiAqIEFmdGVyIGdldHRpbmcgaXQgd29ya2luZywgYWxsIEkgY291bGQgdGhpbmsgYWJvdXQgd2FzIGhvdyBiYWQgdGhlIGNvZGUgd2FzLCBzbyBJIHJld3JvdGUgaXQgYXZvaWRpbmcgdGhlIEpTIHBhdHRlcm4gZW50aXJlbHkuXG4gKlxuICogVGhpcyBjYW4gYmUgc3luY2hyb25vdXMgKGNhbGxiYWNrcykgb3IgYXN5bmNocm9ub3VzIChwcm9taXNlcykuICBXaGVuIGl0IGlzIGFzeW5jLCB0aGUgY29kZSBleGVjdXRlcyBhZnRlciB0aGUgY3VycmVudCBzeW5jaHJvbm91c1xuICogZXZlbnRzIHJ1biB0byBjb21wbGV0aW9uLiBUaGlzIGNvdWxkIGNyZWF0ZSBidWdzIGluIHN5bmNocm9ub3VzIGNvZGUsIGJ1dCBpcyBiZXN0IGZvciBicm93c2VyIGV2ZW50cy4gVGhpcyBoYW5kbGVyIGlzIHByaW1hcmlseSB1c2VkIGZvclxuICogYnJvd3NlciBldmVudHMsIHNvIGFzeW5jIGlzIGRlZmF1bHQuXG4gKlxuICogQnV0IGlmIHlvdSdyZSB0cmlnZ2VyaW5nIGFzeW5jIGV2ZW50cyBpbiBjb2RlIGFuZCBzdGVwcGluZyB0aHJvdWdoIGl0IGluIENocm9tZSwgd2hhdCB5b3Ugc2VlIHdvbid0IG1ha2Ugc2Vuc2UsIGJlY2F1c2UgdGhlIGFzeW5jXG4gKiBldmVudHMgd29uJ3Qgb2NjdXIgdW50aWwgcmlnaHQgYXdheS4gSXQgY2FuIGJlIGhhcmQgdG8gdHJvdWJsZXNob290LlxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKF9kaXNhYmxlQXN5bmMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlQXN5bmMgPSBfZGlzYWJsZUFzeW5jO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gW107XG4gICAgfVxuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICAvLyBJZiB0aGlzIHJlY2VpdmVzIGEgZGVsZWdhdGUgKHdoaWNoIGlzIGFuIGFycmF5IG9mIGRlbGVnYXRlcyksIGFkZCBpdC5cbiAgICAgICAgLy8gV2hlbiB0aGlzIGlzIGludm9rZWQsIHRoYXQgZGVsZWdhdGUgd2lsbCBhbHNvIGJlIGludm9rZWQuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgX292cjFfZGVsZWdhdGUuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gR290IGEgc2luZ2xlIGNhbGxiYWNrXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIHNhbWUgY2FsbGJhY2suXG4gICAgICAgIGlmICh0aGlzLmZpbmQoeyBjYWxsYmFjaywgdGhpc0FyZywgZmlyc3RNYXRjaDogdHJ1ZSB9KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEZWxlID0gbmV3IERlbGVnYXRlXzEuRGVsZWdhdGUoY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2gobmV3RGVsZSk7XG4gICAgICAgIC8vIElGIHRoaXMgaXMgYXN5bmNocm9ub3VzLCByZXR1cm4gdGhlIHByb21pc2Ugc28gaXQgY2FuIGJlIGNoYWluZWQuXG4gICAgICAgIC8vIENoYWluaW5nIHdvbid0IHdvcmsgb24gc3luYyBjb2RlLCBzbyBkbyBub3QgaW4gdGhhdCBjYXNlLlxuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVBc3luYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ld0RlbGUucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBfb3ZyMV9kZWxlZ2F0ZShkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgLy8gT25seSBhbGxvdyBhIHNpbmdsZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBkZWxlZ2F0ZS5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGVnYXRlLmZpbmQocSA9PiBxID09PSBkZWxlZ2F0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgLy8gT25seSBzZWFyY2hlcyBub24tZGVsZWdhdGVzXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmRlbGVnYXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcSA9IHRoaXMuZGVsZWdhdGVbaV07XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocSkgJiYgcS5jYWxsYmFjayA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGVnYXRlLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICB1bnN1YnNjcmliZUxpc3RlbmVyKHNlbmRlcikge1xuICAgICAgICAvLyBGaXJzdCB0cnkgdG8gdW5zdWJzY3JpYmUgdGhlIGRlZmF1bHQgZGVsZWdhdGUuIENhbid0IGRvIGFueXRoaW5nIGlmIGl0IGhhcyBhIGRpZmZlcmVudCBuYW1lLCB0aG91Z2guXG4gICAgICAgIGlmIChcImRlbGVnYXRlXCIgaW4gc2VuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlRGVsZWdhdGUoc2VuZGVyLmRlbGVnYXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPbmx5IHNlYXJjaGVzIG5vbi1kZWxlZ2F0ZXNcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShxKSAmJiBxLnRoaXNBcmcgPT09IHNlbmRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVuc3Vic2NyaWJlRGVsZWdhdGUoZGVsZWdhdGUpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuZGVsZWdhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBxID0gdGhpcy5kZWxlZ2F0ZVtpXTtcbiAgICAgICAgICAgIGlmIChxID09PSBkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGludm9rZShhcmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlQXN5bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBBc3luYyB2ZXJzaW9uLiBEb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCB0aGUgY2hyb21lIGRlYnVnZ2VyLlxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLnByb21pc2UucmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIudGhpc0FyZywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluZCh7IGNhbGxiYWNrLCB0aGlzQXJnLCBmaXJzdE1hdGNoIH0gPSB7fSkge1xuICAgICAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgQXJyYXlVdGlsaXRpZXNfMS50cmF2ZXJzZSh0aGlzLmRlbGVnYXRlKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoKGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgaWYgKGZpcnN0TWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICBmdW5jdGlvbiBtYXRjaChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnRoaXNBcmcgPT09IHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXNBcmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuZXIudGhpc0FyZyA9PT0gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLmRlbGVnYXRlLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTsgLy8gQ2xlYXJzIHRoZSBkZWxlZ2F0ZVxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdW5kZWZpbmVkOyAvLyBNYWtlcyBzdXJlIHRoaXMgY2FuJ3QgYmUgdXNlZCBhZ2FpblxuICAgIH1cbn1cbmV4cG9ydHMuRXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEV2ZW50IGFyZ3VtZW50cyBleHBlY3RlZCBvbiBhbnkgQ2hhbmdlIGV2ZW50LlxuICovXG5jbGFzcyBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0eXBlIG9mIGNoYW5nZSBvcGVyYXRpb24gKHNldCwgZGVsZXRlKSAocG90ZW50aWFsbHkgbWV0aG9kKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gJyc7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3MgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudEFyZ3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGlzTm9uZSh0ZXN0KSB7XG4gICAgcmV0dXJuICh0ZXN0ID09IG51bGwgfHwgdGVzdCA9PT0gdW5kZWZpbmVkKTtcbn1cbmV4cG9ydHMuaXNOb25lID0gaXNOb25lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjbG9uZURlZXAob2JqLCBoYXNoID0gbmV3IFdlYWtNYXAoKSkge1xuICAgIGlmIChPYmplY3Qob2JqKSAhPT0gb2JqKSB7XG4gICAgICAgIHJldHVybiBvYmo7IC8vIHByaW1pdGl2ZSB0eXBlc1xuICAgIH1cbiAgICBpZiAoaGFzaC5oYXMob2JqKSkge1xuICAgICAgICByZXR1cm4gaGFzaC5nZXQob2JqKTsgLy8gcmVmZXJlbmNlIHRvIG9iamVjdCBwcmV2aW91c2x5IHNlZW5cbiAgICB9XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgU2V0KSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBTZXQoKTtcbiAgICAgICAgQXJyYXkuZnJvbShvYmosIHZhbCA9PiByZXN1bHQuYWRkKGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgTWFwKCk7XG4gICAgICAgIEFycmF5LmZyb20ob2JqLCAoW2tleSwgdmFsXSkgPT4gcmVzdWx0LmFkZChjbG9uZURlZXAoa2V5LCBoYXNoKSwgY2xvbmVEZWVwKHZhbCwgaGFzaCkpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJlc3VsdCA9IEFycmF5LmZyb20ob2JqKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShvYmopO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IFJlZ0V4cChvYmouc291cmNlLCBvYmouZmxhZ3MpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYXdmdWwgY29kZSwgYnV0IGl0J3MgdGhlIG9ubHkgd2F5IHRvIGNsb25lIGEgc3RhbmRhbG9uZSBmdW5jdGlvbiAodnMgYSBtZXRob2Qgd2hpY2ggaGFzIGEgZGVzY3JpcHRvcikuXG4gICAgICAgIC8vIEluIGdlbmVyYWwsIHlvdSBwcm9iYWJseSBkb24ndCB3YW50IHRvIHVzZSBjbG9uZURlZXAgb24gZnVuY3Rpb25zLiBZb3UnbGwgc2VlIGl0J3MgTk9UIHVzZWQgb24gaW50ZXJuYWwgbWV0aG9kcy5cbiAgICAgICAgcmVzdWx0ID0gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIG9iai50b1N0cmluZygpKSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkge1xuICAgICAgICByZXN1bHQgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIGhhc2guc2V0KG9iaiwgcmVzdWx0KTsgLy8gS2VlcCB0cmFjayBvZiBvYmplY3RzIHByZXZpb3VzbHkgY2xvbmVkXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnZnVuY3Rpb24nICYmICEoa2V5IGluIHJlc3VsdCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBtZXRob2RzIHRoYXQgYXJlbid0IGluIHRoZSBwcm90b3R5cGUuXG4gICAgICAgICAgICAvLyBUaGlzIGRvZXNuJ3QgcmVjdXJzaXZlbHkgZm9sbG93IGJlY2F1c2UgdGhlcmUncyBub3RoaW5nIHJlY3Vyc2l2ZSB0byBkby5cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICBoYXNoLnNldChvYmpba2V5XSwgcmVzdWx0W2tleV0pO1xuICAgICAgICAgICAgICAgIC8vIE5PVEUgdGhhdCBjbG9uZURlZXAgaXMgTk9UIGNhbGxlZCByZWN1cnNpdmVseSBoZXJlLiBJdCBhbGwgZW5kcyBhdCB0aGUgbWV0aG9kLlxuICAgICAgICAgICAgICAgIC8vIElmIGV4dHJhIGtleXMgYXJlIHRocm93biBvbnRvIGEgZnVuY3Rpb24sIHRoZXkgcHJvYmFibHkgd2lsbCBub3QgYmUgY2xvbmVkLlxuICAgICAgICAgICAgICAgIC8vIEluIG15IGV4cGVyaWVuY2UsIGV4dHJhIGtleXMgb24gZnVuY3Rpb25zIGRpZG4ndCB3b3JrIHJpZ2h0LCBzbyBubyBiaWcgbG9zcy5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBjdXN0b20gZ2V0dGVycy9zZXR0ZXJzLiBUaGVzZSBhcmUgbG9jYWwgYW5kIGhvcGVmdWxseSB3b3JrIGp1c3QgbGlrZSBtZXRob2RzLlxuICAgICAgICAgICAgLy8gSW4gbWFueSBjYXNlcywgdGhpcyBpcyByZWR1bmRhbnQgd2l0aCBPYmplY3QuY3JlYXRlKCksIGJ1dCBpcyBuZWNlc3NhcnkgdG8gYWxsb3cgb2JqZWN0cyB3aXRoIG1hbnVhbGx5LWFkZGVkIGN1c3RvbSBnZXR0ZXJzLlxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIC8vIE5PVEUgdGhhdCBjbG9uZURlZXAgaXMgTk9UIGNhbGxlZCByZWN1cnNpdmVseSBoZXJlLiBJdCBhbGwgZW5kcyBhdCB0aGUgZ2V0dGVyL3NldHRlci5cbiAgICAgICAgICAgIC8vIEFMU08gaGFzaCBub3QgdXBkYXRlZDsgdGhpcyBpcyBub3QgcG9zc2libGUsIGJlY2F1c2UgaXQgd2lsbCBtYXAgdGhlIHZhbHVlIGl0IGdldHMsIG5vdCB0aGUgZ2V0dGVyLlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZURlZXAob2JqW2tleV0sIGhhc2gpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNsb25lRGVlcCA9IGNsb25lRGVlcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gSSBkb24ndCBrbm93IGZvciBzdXJlIGlmIHRoaXMgd2lsbCB3b3JrIGluIGFsbCBjYXNlcy5cbi8vIEl0IGdldHMgZGVlcGVyIGludG8gdGhlIGd1dHMgb2YgSlMgb2JqZWN0IHRoYW4gSSBoYXZlIGV4cGVyaWVuY2Ugd2l0aC5cbmZ1bmN0aW9uIGNsb25lT2JqZWN0KG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSkge1xuICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNsb25lT2JqZWN0ID0gY2xvbmVPYmplY3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVGVsbCBpZiBhIGdpdmVuIHN0cmluZyBpcyBhIHBvc2l0aXZlIGludGVnZXIuXG4gKiBVc2UgZm9yIGRldGVjdGluZyBhcnJheSBrZXlzLlxuICovXG5mdW5jdGlvbiBpc1Bvc2l0aXZlSW50ZWdlclN0cmluZyhzdHIpIHtcbiAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdHIgPT09ICcwJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIC9eWzEtOV1cXGQqJC8udGVzdChzdHIpO1xufVxuZXhwb3J0cy5pc1Bvc2l0aXZlSW50ZWdlclN0cmluZyA9IGlzUG9zaXRpdmVJbnRlZ2VyU3RyaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEkgZG9uJ3Qga25vdyBob3cgYWNjdXJhdGUgdGhpcyBpcyBidXQgaXQgc2VlbXMgcHJldHR5IGdvb2RcbiAqL1xuZnVuY3Rpb24gaXNQcmltaXRpdmUob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdChvYmopICE9PSBvYmo7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IENsb25lT2JqZWN0XzEgPSByZXF1aXJlKFwiLi9DbG9uZU9iamVjdFwiKTtcbmNvbnN0IE5vbmVUeXBlXzEgPSByZXF1aXJlKFwiLi4vVHlwZXMvTm9uZVR5cGVcIik7XG4vKipcbiAqIE9iamVjdC5hc3NpZ24oKSBjYW4gYmUgdXNlZCBmb3Igc2ltcGxlIGNvcGllcyBvZiBwcm9wZXJ0aWVzLCBidXQgaXQgbWlzc2VzIGdldHRlcnMsXG4gKiBzZXR0ZXJzLCBhbmQgaW5oZXJpdGVkIHByb3BlcnRpZXMuIEl0IG9ubHkgZ2V0cyB0aGUgbG9jYWwgdmFsdWVzLlxuICpcbiAqIFRoaXMgc2hvdWxkIGhvcGVmdWxseSByZXNvbHZlIHRoYXQsIGJ1dCBJIGRvbid0IGtub3cgZm9yIHN1cmUuIFRoaXMgaXMgdmVyeSBza2V0Y2h5LlxuICogVGhlIHJlc3VsdHMgYXJlIGNvbXBsZXRlbHkgZmxhdCwgYmVjYXVzZSB5b3UgY2FuJ3QgaGF2ZSBtdWx0aXBsZSBpbmhlcml0YW5jZSBoaWVyYXJjaHlcbiAqIGluIGEgbGFuZ3VhZ2Ugd2l0aG91dCBtdWx0aXBsZSBpbmhlcml0YW5jZS4gQmVjYXVzZSB0aGlzIGZsYXR0ZW5zIG9iamVjdHMsIGl0IGlzIGd1YXJhbnRlZWRcbiAqIHRvIGJyZWFrIGFueXRoaW5nIHRoYXQgbWFrZXMgc3VwZXIgY2FsbHMuXG4gKlxuICogSWYgcmV0dXJuQ2xvbmUgaXMgdHJ1ZSwgYSBjbG9uZSBvZiB0aGUgdGFyZ2V0IG9iamVjdCB3aWxsIGJlIG1vZGlmaWVkIGFuZCByZXR1cm5lZCwgbGVhdmluZ1xuICogdGhlIG9yaWdpbmFsIHVudG91Y2hlZC5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0RnVsbEFzc2lnbih0YXJnZXQsIHNvdXJjZSwgcmV0dXJuQ2xvbmUgPSBmYWxzZSkge1xuICAgIGlmIChOb25lVHlwZV8xLmlzTm9uZSh0YXJnZXQpKSB7XG4gICAgICAgIHRhcmdldCA9IHt9O1xuICAgIH1cbiAgICBpZiAoIXNvdXJjZSB8fCB0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICBpZiAocmV0dXJuQ2xvbmUpIHtcbiAgICAgICAgdGFyZ2V0ID0gQ2xvbmVPYmplY3RfMS5jbG9uZU9iamVjdCh0YXJnZXQpO1xuICAgIH1cbiAgICBjb25zdCBuYW1lcyA9IEFycmF5LmZyb20obmV3IFNldChmaW5kVGhlUHJvcGVydHlOYW1lcyhzb3VyY2UpKSk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgbmFtZXMpIHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IGZpbmRUaGVQcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICAgIGZ1bmN0aW9uIGZpbmRUaGVQcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgcmVzdWx0LnB1c2goLi4uT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5maWx0ZXIoZiA9PiBmICE9PSAnY29uc3RydWN0b3InKSk7XG4gICAgICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgICAgIGlmIChwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnT2JqZWN0Jykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goLi4uZmluZFRoZVByb3BlcnR5TmFtZXMocHJvdG8pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kVGhlUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgICAgIGlmIChwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnT2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRUaGVQcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLm9iamVjdEZ1bGxBc3NpZ24gPSBvYmplY3RGdWxsQXNzaWduO1xuIl19
