import { elementType } from '../Html/ElementType';
import { createElement } from '../Html/CreateElement';
import { constructorTypeGuard } from '../System/Types/Constructable';
import { getUniqueId } from '../System/Utility/GetUniqueId';
import { __DO_NOT_USE__, CssSimpleRule, ICssRule, RulesCanExtend, RulesCanNest, RuleValue } from './CssRuleContract';
import { CssVariable } from './CssVariable';

/**
 * A Javascript CSS rule. Note the capitalization. This isn't the same as CSSRule. I'm considering renaming this to
 * CssJsRule but I'm hoping I think up something better. It has to be more generic than CssClass because, well, there's
 * more to CSS than class selectors.
 */
export abstract class CssRule implements ICssRule {
    [x: string]: RuleValue | undefined | __DO_NOT_USE__;

    media$?: string;
    abstract selector$: string;

    /** Storing this somewhere other than the HEAD would make it easy to drop the sheet on page change. */
    styleSheetParent$: HTMLElement = document.head;
    styleSheetId$ = getUniqueId();

    /**
     * Fake selector scoping.
     */
    scopeElement$?: HTMLElement;

    extends$?: RulesCanExtend | RulesCanExtend[] = [];
    nested$?: RulesCanNest | RulesCanNest[] = [];

    revert$ = false;

    private _constructed$ = false;
    private _selectors$: string[] = [];
    private _fakeScopeClass$?: string;

    constructor(parent?: HTMLElement) {
        if (parent) {
            this.styleSheetParent$ = parent;
        }
    }

    render$(parentSelector?: string): this {
        if (!this._constructed$) {
            // Remember, we cannot read properties of this in the constructor, because their population is emitted
            // after the super() call. But we don't want to clone this object and repeat this every time it's rendered.
            this._constructed$ = true;

            if (this.revert$) {
                this.all = "initial";
            }

            this._extendClass$();

            if (this.nested$) {
                if (!Array.isArray(this.nested$)) {
                    this.nested$ = [this.nested$];
                }
                for (const [idx, nest] of this.nested$.entries()) {
                    if (constructorTypeGuard(nest)) {
                        this.nested$[idx] = new nest(this.styleSheetParent$);
                    }
                }
            }

            this._buildSelectors$(parentSelector);
        }

        // This creates a separate style element for each rule. That might seem pretty excessive, but it's the only way
        // to make it easy to update rules. The API for dealing with CSS in HTML5 is NAAAAAAASTY.
        let styleElement = this.styleSheetParent$.querySelector<HTMLStyleElement>('#' + this.styleSheetId$);
        if (styleElement) {
            this.styleSheetParent$.removeChild(styleElement);
        }

        styleElement = this.styleSheetParent$.appendChild(createElement(elementType.HTMLStyleElement, { id: this.styleSheetId$ }));
        const sheet = styleElement.sheet as any as CSSStyleSheet;

        this._buildRule$(sheet);

        if (this.nested$) {
            // We previously made this an array of constructed types.
            for (const nest of this.nested$ as CssRule[]) {
                nest.styleSheetParent$ = this.styleSheetParent$;
                for (const sel of this._selectors$) {
                    nest.render$(sel);
                }
            }
        }

        return this;
    }

    remove$(): void {
        const styleElement = this.styleSheetParent$.querySelector<HTMLStyleElement>('#' + this.styleSheetId$);
        if (styleElement) {
            this.styleSheetParent$.removeChild(styleElement);
        }
    }

    /**
     * Implement "multiple inheritance".
     * 
     * This checks only CSS properties. If you inherit from other CssRule classes that
     * themselves have extends$ set, those are not checked. I don't think there's enough
     * justification to bring recursion into this.
     * 
     * Note that priority is in the opposite direction of normal inheritance priority.
     * Normally, when looking for a property, the runtime traverses the inheritance tree
     * and uses the first occurrence. In CSS, the LAST occurance takes priority.
     */
    private _extendClass$(): void {
        if (!this.extends$) {
            return;
        }
        if (!Array.isArray(this.extends$)) {
            this.extends$ = [this.extends$];
        }
        for (const ex of this.extends$) {
            let traitSource: CssRule | CssSimpleRule;
            if (constructorTypeGuard(ex)) {
                traitSource = new ex();
            } else {
                traitSource = ex;
            }
            const names = Array.from(new Set(findPropertyNames(traitSource)));
            for (const key of names) {
                // Filter out names with special meaning
                if (key.endsWith('$')) {
                    continue;
                }
                this[key] = traitSource[key];
            }
        }
    }

    private _buildSelectors$(parentSelector?: string): void {
        parentSelector = (parentSelector || '');

        // If scopeElement$ is set, <style scoped> is simulated in a hacky way. It generates an random class name and adds
        // that to both the selector and the element. This similar to the way CSS Modules and Angular do it, except the
        // random selector comes during runtime instead of a custom build process.
        if (this.scopeElement$ && !this._fakeScopeClass$) {
            this._fakeScopeClass$ = this._fakeScopeClass$ || 'scope-' + getUniqueId();
            this.scopeElement$.classList.add(this._fakeScopeClass$);
        }

        for (let sel of this.selector$.split(',').map(m => m.trim())) {
            sel = (sel || '').replace('&', ''); // Ampersand tells us where to start (allows a space) but it's invalid CSS
            if (this._fakeScopeClass$) {
                if (!sel) {
                    this._selectors$.push(parentSelector + '.' + this._fakeScopeClass$);
                } else {
                    // produce an id like "div.autogen .otherclass, .autogen div .otherclass"
                    const words = sel.split(' ');
                    words[0] = parentSelector + words[0] + '.' + this._fakeScopeClass$;
                    this._selectors$.push(words.join(' ').trim());

                    // There is no CSS selector that matches an item and its children. It takes 2 rules.
                    this._selectors$.push((parentSelector + '.' + this._fakeScopeClass$ + ' ' + sel).trim());
                }
            } else if (!sel) {
                // A blank selector will fail
                if (parentSelector) {
                    this._selectors$.push(parentSelector);
                } else {
                    this._selectors$.push('body');
                }
            } else {
                this._selectors$.push(parentSelector + sel);
            }
        }
    }

    private _buildRule$(sheet: CSSStyleSheet): void {
        const ruleText: string[] = [];
        const variables: CssVariable[] = [];

        const names = Array.from(new Set(findPropertyNames(this)));
        for (const key of names) {
            // Filter out names with special meaning
            if (key.endsWith('$') || !this[key] || typeof this[key] === 'function') {
                continue;
            }

            // If Typescript was working correctly, we know that all properties that don't end in $ are RuleValue type.
            const val: RuleValue = this[key] as any;

            if (typeof val === 'string') {
                ruleText.push(`${key}: ${val}`);
            } else if (val instanceof CssVariable) {
                variables.push(val);
                ruleText.push(`${key}: var(--${val.name})`);
            } else {
                // Nested properties, which extend the key and add more rules
                for (const np of Object.getOwnPropertyNames(val)) {
                    // Should never happen
                    if (np.endsWith('$')) {
                        continue;
                    }
                    const vp = val[np];
                    if (typeof vp === 'string') {
                        ruleText.push(`${key}-${np}: ${vp}`);
                    } else {
                        variables.push(vp);
                        ruleText.push(`${key}-${np}: var(--${val.name})`);
                    }
                }
            }
        }

        const fullSelector = this._selectors$.join(', ');
        const fullText = ruleText.join('; \n');
        if (!fullText) {
            // tslint:disable-next-line:no-console
            console.warn(`No CSS properties defined for rule: ${this.constructor.name} on ${fullSelector}.`);
        }
        let fullRule = `${fullSelector} { \n${fullText}; \n}`;
        if (this.media$) {
            fullRule = `@media ${this.media$} { \n${fullRule}\n}`;
        }
        sheet.insertRule(fullRule, 0);

        // Add all the variable values
        let i = 1;
        for (const v of variables) {
            const varText = `${v.scope} { --${v.name}: ${v.value}; }`;
            sheet.insertRule(varText, i);
            i++;
        }
    }
}

function findPropertyNames(obj: any): string[] {
    const result: string[] = [];
    result.push(...Object.getOwnPropertyNames(obj).filter(f => f !== 'constructor'));
    const proto = Object.getPrototypeOf(obj);
    if (proto && proto.constructor.name !== 'Object') {
        result.push(...findPropertyNames(proto));
    }
    return result;
}
