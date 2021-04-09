import { Constructable } from '../System/Types/Constructable';
import { CssRule } from './CssRule';
import { CssVariable } from './CssVariable';

export type NestedProperty = Record<string, string | CssVariable>;
export type RulesCanNest = CssRule | Constructable<CssRule>;
export type RulesCanExtend = CssRule | CssSimpleRule | Constructable<CssRule> | Constructable<CssSimpleRule>;

// This is a partial workaround for the intersection bug (https://github.com/microsoft/TypeScript/issues/17867).
// It introduces possible user bugs. Users should NOT use this. ONLY VALID FOR ICssRequiredProperties, nothing else.
export type __PRIVATE_PROPERTIES_DO_NOT_USE__ = boolean | string[] | ((sheet: CSSStyleSheet, parent?: string) => void);
export type __DO_NOT_USE__ = RulesCanExtend | RulesCanExtend[] | RulesCanNest | RulesCanNest[] | NestedProperty | HTMLElement | (() => void) | boolean | __PRIVATE_PROPERTIES_DO_NOT_USE__;

export interface ICssRequiredProperties {
    selector$: string;
    media$?: string;
    styleSheetParent$: HTMLElement;
    styleSheetId$: string;
    scopeElement$?: HTMLElement;
    extends$?: RulesCanExtend | RulesCanExtend[];
    nested$?: RulesCanNest | RulesCanNest[];
    revert$: boolean;
    render$(): void;
    remove$(): void;
}

// CSS variables take instances, not constructables. Because variables are always instances.
export type RuleValue = string | CssVariable | NestedProperty;

export type ICssRule = Record<string, RuleValue | undefined | __DO_NOT_USE__> & ICssRequiredProperties;

/**
 * This type is here for a bullshit reason, which is that if you want to require values to be all strings, this copypasta
 * must be included in the definition of the class. That's going far beyond time checking.
 * https://github.com/microsoft/TypeScript/issues/15300 (not just interfaces)
 */
export abstract class CssSimpleRule {
    [index: string]: RuleValue;
    constructor(initial?: Record<string, RuleValue>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
