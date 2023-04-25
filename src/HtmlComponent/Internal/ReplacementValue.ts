import { BoundComponent } from '../BoundComponent';
import { BaseValue } from './BaseValue';

export class ReplacementValue extends BaseValue {
    static add(component: BoundComponent, clone: DocumentFragment, viewModel: any, current: ReplacementValue[], id?: string): void {

        // Working on a clone here, so we don't see the body being built step by step in the browser.
        for (const repl of clone.querySelectorAll('i-v')) {

            // Allow 3 ways to reference a component, either by #id (for people who like quickness), by component (for people who like
            // compliance), or by data-component (for people who REALLY like compliance)
            let relatedComponentId = '';
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < repl.attributes.length; i++) {
                const tmpName = repl.attributes[i].nodeName;
                if (tmpName.startsWith('#')) {
                    relatedComponentId = tmpName.slice(1);
                    break;
                }
            }
            if (!relatedComponentId && repl.hasAttribute('component')) {
                relatedComponentId = (repl.getAttribute('component') || '');
            }
            if (!relatedComponentId) {
                relatedComponentId = (repl as HTMLElement).dataset.component || '';
            }

            // TODO: Remove this. It's only needed while nested component code is allowed
            // If component is specified, this component must have that as an id
            if (id && relatedComponentId && relatedComponentId.toLowerCase() !== id.toLowerCase()) {
                continue;
            }

            const noescape = repl.hasAttribute('noescape') && repl.getAttribute('noescape') !== 'false';
            const otherComponentId = repl.getAttribute('i5_source') || repl.getAttribute('source') || (repl as HTMLElement).dataset.i5_source || (repl as HTMLElement).dataset.source || repl.getAttribute(':source');
            current.push(new ReplacementValue({ component, viewModel, element: repl as HTMLElement, source: repl.innerHTML, noescape, otherComponentId }));
        }
    }

    private _noescape: boolean;
    private _otherComponentId?: string;
    private _currentContent?: string;

    constructor({ component, viewModel, element, source, noescape, otherComponentId }: { component: BoundComponent, viewModel: any, element: HTMLElement, source: string, noescape: boolean, otherComponentId?: string | null }) {
        super(component, viewModel, element, source);
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
