import { observablePropertyCheck } from './ObservableProperty';

/**
 * This is a simple implementation of Object.assign() that understands ObservableProperty,
 * so that it can update the value of the property without wiping out references to the
 * existing property with that key (which is what would happen if you used regular Object.assign()
 * on a non-proxied object).  It can also be used to read the value of an ObservableProperty.
 */
export function observableAssign(target: any, ...sources: any[]): any {
    target = target || {};
    for (const src of sources) {
        for (const key of Object.getOwnPropertyNames(src)) {
            const sprop = src[key];
            const tprop = target[key];
            let val: any;
            if (observablePropertyCheck(sprop)) {
                val = sprop.value;
            } else {
                val = sprop;
            }
            if (observablePropertyCheck(tprop)) {
                tprop.value = val;
            } else {
                target[key] = val;
            }
        }
    }
}
