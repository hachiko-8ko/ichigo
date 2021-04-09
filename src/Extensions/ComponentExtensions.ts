import { ExistingElementBindingOptions } from '../HtmlComponent/Options/IComponentBindingOptions';
import { BoundComponent } from '../HtmlComponent/BoundComponent';
import { IContent } from '../HtmlComponent/Contract/IContent';
import { ComponentMap } from '../HtmlComponent/ComponentMap';

/**
 * This script contains extensions to make manipulation of element components easier.
 *
 * In your main process, import this script (import '/path/to/Ichigo/Extensions/ComponentExtensions') to add
 * these extensions to the prototypes.
 */

// I wanted to have separate d.ts files, but that breaks VSCode. Though I have an identical project (old version of this project)
// where d.ts files work fine. If I explicitly import the d.ts file, fine, but browserify doesn't understand that syntax, so can't use it.
// Only in this, not the old version. FML Microsoft.
declare global {
    // tslint:disable-next-line:interface-name
    interface HTMLElement {
        getComponent(this: HTMLElement): IContent | undefined;
        bindComponent<TElement extends HTMLElement = HTMLElement, TModel = any>(this: TElement, viewModel: TModel): BoundComponent<TElement, TModel>;
        deleteComponent(): void;
    }
}

HTMLElement.prototype.getComponent = function _getComponent(): IContent | undefined {
    return ComponentMap.components.get(this);
};

HTMLElement.prototype.bindComponent = function _bind<TElement extends HTMLElement = HTMLElement, TModel = any>(this: TElement, viewModel: TModel): BoundComponent<TElement, TModel> {
    return new BoundComponent(viewModel, new ExistingElementBindingOptions({ element: this }));
};

HTMLElement.prototype.deleteComponent = function _deleteComponent(): void {
    const component = ComponentMap.components.get(this);
    if (!component) {
        // tslint:disable-next-line:no-console
        console.error('Not a component');
        return;
    }
    if (component instanceof BoundComponent) {
        component.dispose();
    }
    const parent = this.parentNode || document;
    parent.removeChild(this);
};
