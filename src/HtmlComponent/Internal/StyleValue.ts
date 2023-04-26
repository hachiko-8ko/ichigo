import { BaseValue } from './BaseValue';
import { BoundComponent } from '../BoundComponent';

export class StyleValue extends BaseValue {

    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, otherComponentId: string | undefined, getterCallback: () => StyleValue | undefined, setterCallback: (val: StyleValue) => void): boolean {
        const isStyleTag = parseAttributeName(attr);
        if (!isStyleTag) { // Not a style binding
            return false;
        }

        if (!attrValue) {
            throw new Error('Style source is missing.');
        }

        // If we passed the bound component directly, we could just read/update it, but that tight binding makes it hard to do this rewrite.
        // If this were C# I could pass an IHasValue by ref.
        let current = getterCallback();
        if (current) {
            return true; // stop processing
        }

        current = new StyleValue({ component, content, viewModel, source: attrValue, otherComponentId });
        setterCallback(current);
        return true;
    }

    private _currentStyle?: string;
    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, source, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source: string, otherComponentId?: string }) {
        super(component, viewModel, content, source);
        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    render(): void {
        const newValue = this._getStringValue(this.source, false, this._otherComponentId) || '';
        // change detection depends on no outside processes updating the DOM
        if (newValue !== this._currentStyle) {
            this._currentStyle = newValue; // save a copy
            this.content.style.cssText = newValue;
            if (newValue && !this.content.style.cssText) {
                // tslint:disable-next-line:no-console
                console.warn(`Invalid style text in component: ${newValue}`);
            }
        }
    }
}

function parseAttributeName(attributeName: string): boolean {
    if (!attributeName) {
        return false;
    }
    if (attributeName.startsWith(':')) {
        attributeName = 'i5_' + attributeName.slice(1);
    }

    if (attributeName !== 'i5_style') {
        return false;
    }
    return true;
}
