import { BoundComponent } from '../BoundComponent';
import { BaseValue } from './BaseValue';

export class ReplacementValue extends BaseValue {
    // TODO: Make this private (after "this." source is deleted)
    source: string;
    private _noescape: boolean;
    private _otherComponentId?: string;
    private _currentContent?: string;

    constructor({ component, viewModel, element, source, noescape, otherComponentId }: { component: BoundComponent, viewModel: any, element: HTMLElement, source: string, noescape: boolean, otherComponentId?: string | null }) {
        super(component, viewModel, element);
        this.source = source;
        this._noescape = noescape;
        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    render(): void {
        const newValue = this._getStringValue(this.source, this._noescape, this._otherComponentId) || '';
        // only update if changed
        if (newValue !== this._currentContent) {
            this._currentContent = newValue; // save a copy so we can get it without reading DOM
            this.content.innerHTML = newValue;
        }
    }
}
