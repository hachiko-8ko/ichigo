import { Constructable, constructorTypeGuard } from '../System/Types/Constructable';
import { CssRule } from "./CssRule";

export class CssStyleSheet {
    rules: CssRule[] = [];
    constructor(rules?: Array<CssRule | Constructable<CssRule>>, parent?: HTMLElement) {
        if (rules) {
            for (const rule of rules) {
                if (constructorTypeGuard(rule)) {
                    this.rules.push(new rule(parent));
                } else {
                    rule.styleSheetParent$ = parent || rule.styleSheetParent$;
                    this.rules.push(rule);
                }
            }
        }
    }
    render() {
        for (const rule of this.rules) {
            rule.render$();
        }
    }
    remove() {
        for (const rule of this.rules) {
            rule.remove$();
        }
    }
}
