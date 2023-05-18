import { BaseValue } from './BaseValue';
import { BoundComponent } from '../BoundComponent';
import { ChangeTracker } from './ChangeTracker';

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

    private _changeTracker: ChangeTracker;
    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, source, baseStyle, styleName, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source: string, baseStyle?: boolean, styleName?: string, otherComponentId?: string }) {
        super(component, viewModel, content, source);
        this.baseStyle = baseStyle || false;
        if (styleName) {
            this.styleName = toCamelCase(styleName);
            this._changeTracker = new ChangeTracker(content, { ['style.cssList']: { [this.styleName]: (this.content.style as any)[this.styleName] } });
        } else {
            this._changeTracker = new ChangeTracker(content, { ['style.cssText']: content.style.cssText || '' });
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
            this._changeTracker.apply({ ['style.cssText']: newValue });
            return;
        }

        /* Style switch case */

        // If truthy, set style with the value given, else clear it.
        const val = this._getStringValue(this.source, true, this._otherComponentId);
        this._changeTracker.apply({ ['style.cssList']: { [this.styleName!]: val } });
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
