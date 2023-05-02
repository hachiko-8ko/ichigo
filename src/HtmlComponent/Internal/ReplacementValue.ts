import { elementType } from '../../Html/ElementType';
import { createElement } from '../../Html/CreateElement';
import { BoundComponent } from '../BoundComponent';
import { BaseValue } from './BaseValue';
import { LoopValue } from './LoopValue';

export class ReplacementValue extends BaseValue {
    static addHtmlTemplate(component: BoundComponent, content: HTMLElement, viewModel: any, current: ReplacementValue[], id?: string): void {
        try {
            if (!window.customElements.get('i-v')) {
                window.customElements.define('i-v', TemplateReplacementValue);
            }
        } catch (err) {
            // customElements isn't officially part of an ES version yet so won't work even in some recent-ish browsers
        }

        for (const repl of content.querySelectorAll('i-v')) {
            // TODO: Remove related components. The replacement tags will exist ONLY under the component they relate to. No nesting.
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

            // TODO: Remove this
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
        // change detection depends on no outside processes updating the DOM
        if (newValue !== this._currentContent) {
            this._currentContent = newValue; // save a copy
            this.content.innerHTML = newValue;
        }
    }
}

// Use a custom element to create a replacement tag that is not limited, as span is, to containing no block elements.
// No logic, no special display details.
// tslint:disable-next-line:max-classes-per-file
export class TemplateReplacementValue extends HTMLElement {
    constructor() {
        super();
    }
}
