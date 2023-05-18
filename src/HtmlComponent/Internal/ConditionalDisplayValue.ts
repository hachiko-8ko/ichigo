import { BaseValue } from './BaseValue';
import { BoundComponent } from '../BoundComponent';
import { ChangeTracker } from './ChangeTracker';

/**
 * Unlike more serious languages like Angular or Vue, which don't even render the component if ng-if is false, this just hides it
 * in CSS. It's still rendered. That may affect your code (for example, you need to worry about null references).
 */
export class ConditionalDisplayValue extends BaseValue {

    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, otherComponentId: string | undefined, getterCallback: () => ConditionalDisplayValue | undefined, setterCallback: (val: ConditionalDisplayValue) => void): boolean {
        const config = parseAttributeName(attr);
        if (!config) { // Not a display binding
            return false;
        }

        if (!attrValue) {
            throw new Error('Display source is missing.');
        }

        // If we passed the bound component directly, we could just read/update it, but that tight binding makes it hard to do this rewrite.
        // If this were C# I could pass an IHasValue by ref.
        let current = getterCallback();
        if (current) {
            return true; // stop processing
        }

        current = new ConditionalDisplayValue({ component, content, viewModel, source: attrValue, negative: config.negative, otherComponentId });
        setterCallback(current);
        return true;
    }

    private _negative: boolean;
    private _changeTracker: ChangeTracker;

    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, source, negative, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source?: string, negative?: boolean, otherComponentId?: string }) {
        super(component, viewModel, content, source || '');
        this._negative = negative || false;

        this._changeTracker = new ChangeTracker(content, { ['style.display']: this.content.style.display, ['previousStyle.display']: '' });

        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    render(): void {
        // If falsy, set display: none (saving previous value). If truthy, restore previous value (if block, flex, but not if 'none')
        let val = this._getUntypedValue(this.source, this._otherComponentId);
        if (this._negative) {
            val = !val;
        }
        this._changeTracker.apply({ ['style.display']: val ? '' : 'none' });
    }
}

function parseAttributeName(attributeName: string): { negative?: boolean } | undefined {
    if (!attributeName) {
        return;
    }
    if (attributeName === 'i5_if') {
        return {};
    }
    if (attributeName === 'i5_if-' || attributeName === 'i5_if0') {
        return { negative: true };
    }
}
