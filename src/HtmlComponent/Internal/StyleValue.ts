import { BaseValue } from './BaseValue';
import { BoundComponent } from '../BoundComponent';

export class StyleValue extends BaseValue {

    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, otherComponentId: string | undefined, current: StyleValue[]): boolean {
        const config = parseAttributeName(attr);
        if (!config) { // Not a style binding
            return false;
        }

        if (!attrValue) {
            throw new Error('Style source is missing.');
        }

        // Don't bind a single style to multiple things (though if)
        // the same style is set in the 'base' and modified later, oh well.
        if (config.baseStyle) {
            if (current.findIndex(f => f.baseStyle) > -1) {
                return true; // stop processing
            }
            current.push(new StyleValue({ component, content, viewModel, source: attrValue, baseStyle: true, otherComponentId }));
        } else {
            if (current.find(f => f.styleName === config.styleName)) {
                return true; // stop processing
            }
            current.push(new StyleValue({ component, content, viewModel, source: attrValue, styleName: config.styleName, otherComponentId }));
        }

        return true;
    }

    baseStyle: boolean;
    styleName?: string;

    private _currentValue?: string;
    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, source, baseStyle, styleName, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source: string, baseStyle?: boolean, styleName?: string, otherComponentId?: string }) {
        super(component, viewModel, content, source);
        this.baseStyle = baseStyle || false;
        if (styleName) {
            this.styleName = toCamelCase(styleName);
            this._currentValue = (this.content.style as any)[this.styleName];
        } else {
            this._currentValue = this.content.style.cssText;
        }

        if (!this.baseStyle && !this.styleName) {
            throw new Error('If switched style binding, style name must be provided');
        }

        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }

        // The style name is probably in camel case (because uppercase attribute names are lowercased in the DOM)
        // but the javascript style setting requires camelCase. Dash-case styles do nothing (style['backgroundColor'] is something,
        // style['background-color'] is nothing at all)
        function toCamelCase(str: string): string {
            return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        }
    }

    render(): void {
        if (this.baseStyle) {
            const newValue = this._getStringValue(this.source, false, this._otherComponentId) || '';
            // change detection depends on no outside processes updating the DOM
            if (newValue !== this._currentValue) {
                this._currentValue = newValue; // save a copy
                this.content.style.cssText = newValue;
                if (newValue && !this.content.style.cssText) {
                    // tslint:disable-next-line:no-console
                    console.warn(`Invalid style text in component: ${newValue}`);
                }
            }
            return;
        }

        /* Style switch case */

        // If truthy, set style with the value given, else clear it.
        const val = this._getStringValue(this.source, true, this._otherComponentId);
        if (val) {
            // change detection depends on no outside processes updating the DOM
            if (val !== this._currentValue) {
                this._currentValue = val; // save a copy
                (this.content.style as any)[this.styleName!] = val;
            }
        } else {
            if (this._currentValue) {
                this._currentValue = ''; // update the copy
                this.content.style.removeProperty(this.styleName!);
            }
        }
    }
}

function parseAttributeName(attributeName: string): { baseStyle?: boolean, styleName?: string } | undefined {
    if (!attributeName) {
        return;
    }
    if (!attributeName.startsWith('i5_style')) {
        return;
    }
    if (attributeName === 'i5_style') {
        return { baseStyle: true };
    }

    let styleName = '';

    if (attributeName[8] !== ':' && attributeName[8] !== '_' && attributeName[8] !== '-' && attributeName[8] !== '0') {
        throw new Error('Invalid switch binding syntax');
    }

    styleName = attributeName.slice(9);
    if (!styleName) {
        throw new Error("Style switch name is missing.");
    }

    return { styleName };
}
