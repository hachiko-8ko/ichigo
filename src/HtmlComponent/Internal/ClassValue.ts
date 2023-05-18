import { BaseValue } from './BaseValue';
import { BoundComponent } from '../BoundComponent';
import { ChangeTracker } from './ChangeTracker';

export class ClassValue extends BaseValue {

    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, otherComponentId: string | undefined, current: ClassValue[]): boolean {
        const config = parseAttributeName(attr);
        if (!config) { // Not a class binding
            return false;
        }

        if (!attrValue) {
            throw new Error('Class source is missing.');
        }

        // Don't bind a single class to multiple things
        if (config.baseClass) {
            if (current.findIndex(f => f.baseClass) > -1) {
                return true; // stop processing
            }
            current.push(new ClassValue({ component, content, viewModel, source: attrValue, baseClass: true, otherComponentId }));
        } else {
            if (current.find(f => f.className === config.className)) {
                return true; // stop processing
            }
            current.push(new ClassValue({ component, content, viewModel, source: attrValue, className: config.className, negative: config.negative, otherComponentId }));
        }

        return true;
    }

    baseClass: boolean;
    className?: string;

    private _negative: boolean;
    private _changeTracker: ChangeTracker;
    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, source, baseClass, className, negative, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source: string, baseClass?: boolean, className?: string, negative?: boolean, otherComponentId?: string }) {
        super(component, viewModel, content, source);
        this.baseClass = baseClass || false;
        this.className = className;
        if (!this.baseClass && !this.className) {
            throw new Error('If switched class binding, class name must be provided');
        }
        this._negative = negative || false;

        if (this.baseClass) {
            this._changeTracker = new ChangeTracker(content, { className: content.className });
        } else {
            // { classList: { red: true } } (could be expanded to take complex types, but parsing the HTML would be ugly)
            this._changeTracker = new ChangeTracker(content, { classList: { [className!]: content.classList.contains(this.className!) } });
        }

        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    render(): void {
        if (this.baseClass) {
            const newValue = this._getStringValue(this.source, false, this._otherComponentId) || '';
            this._changeTracker.apply({ className: newValue });
            return;
        }

        /* Class switch case */

        // If truthy, add class, else delete it.
        let val = !!this._getUntypedValue(this.source, this._otherComponentId);
        if (this._negative) {
            val = !val;
        }
        this._changeTracker.apply({ classList: { [this.className!]: val } });
    }
}

function parseAttributeName(attributeName: string): { baseClass?: boolean, className?: string, negative?: boolean } | undefined {
    if (!attributeName) {
        return;
    }
    if (!attributeName.startsWith('i5_class')) {
        return;
    }
    if (attributeName === 'i5_class') {
        return { baseClass: true };
    }

    let negative = false;
    let className = '';

    if (attributeName[8] !== ':' && attributeName[8] !== '_' && attributeName[8] !== '-' && attributeName[8] !== '0') {
        throw new Error('Invalid switch binding syntax');
    }

    if (attributeName[8] === '-' || attributeName[8] === '0') {
        if (attributeName[9] !== ':' && attributeName[9] !== '_') {
            throw new Error('Invalid negative switch binding syntax');
        }
        negative = true;
        className = attributeName.slice(10);
    } else {
        className = attributeName.slice(9);
    }

    if (!className) {
        throw new Error("Class switch name is missing.");
    }
    return { className, negative };
}
