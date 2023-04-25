import { BoundComponent } from '../BoundComponent';
import { BaseValue } from './BaseValue';

export class AttributeValue extends BaseValue {
    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, otherComponentId: string | undefined, current: AttributeValue[]): boolean {
        const config = parseAttributeName(attr);
        if (!config) { // Not a attribute binding
            return false;
        }

        if (!attrValue) {
            throw new Error('Attribute source is missing.');
        }

        // Don't bind a single property to multiple things
        if (current.find(f => f.attribute === config.attribute)) {
            return true; // stop processing
        }

        current.push(new AttributeValue({ component, content, viewModel, attribute: config.attribute, source: attrValue, bool: config.bool, negative: config.negative, otherComponentId }));

        return true;
    }

    attribute: string;
    private _source: string;
    private _bool: boolean;
    private _negative?: boolean;
    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, attribute, source, bool, negative, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, attribute: string, source: string, bool?: boolean, negative?: boolean, otherComponentId?: string }) {
        super(component, viewModel, content);
        this.attribute = attribute;
        this._source = source;
        this._bool = bool || false;
        this._negative = negative;
        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    render(): void {
        if (this._bool) {
            // For boolean attributes, the very existence of the attribute means it is considered to be true.
            let val = this._getUntypedValue(this._source, this._otherComponentId);
            if (this._negative) {
                val = !val;
            } else {
                val = !!val;
            }
            if (val) {
                this.content.setAttribute(this.attribute, val);
            } else {
                this.content.removeAttribute(this.attribute);
            }

        } else {
            this.content.setAttribute(this.attribute, this._getStringValue(this._source, false, this._otherComponentId) || '');
        }
    }
}

function parseAttributeName(attributeName: string): { attribute: string, bool?: boolean, negative?: boolean } | undefined {
    if (!attributeName) {
        return;
    }
    if (attributeName.startsWith(':')) {
        attributeName = 'i5_' + attributeName.slice(1);
    }

    if (attributeName.startsWith('i5_attr')) {
        if (attributeName[7] !== ':' && attributeName[7] !== '_') {
            throw new Error('Invalid attribute binding syntax');
        }
        if (attributeName.length < 9) {
            throw new Error("Binding attribute name is missing.");
        }
        return { attribute: attributeName.slice(8) };

    } else if (attributeName.startsWith('i5_bool')) {
        let negative = false;
        if (attributeName[7] !== ':' && attributeName[7] !== '_' && attributeName[7] !== '-' && attributeName[7] !== '0') {
            throw new Error('Invalid attribute binding syntax');
        }
        if (attributeName[7] === '-' || attributeName[7] === '0') {
            negative = true;
            attributeName = attributeName.slice(0, 7) + attributeName.slice(8);
        }
        if (attributeName.length < 9) {
            throw new Error("Binding attribute name is missing.");
        }

        const attribute = attributeName.slice(8);
        if (!attribute) {
            throw new Error("Attribute name is missing.");
        }
        return { attribute, bool: true, negative };
    }
}