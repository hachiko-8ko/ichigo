import { BaseValue } from "./BaseValue";
import { BoundComponent } from "../BoundComponent";
import { Constructable, constructorTypeGuard } from "../../System/Types/Constructable";
import { nodeListSelectorAll, nodeListSelector } from "../../Html/QuerySelectorNodeList";
import { IComponentBindingOptions } from "../Options/IComponentBindingOptions";
import { extractNodeContent } from "../../Html/ExtractNodeContent";

export class LoopValue extends BaseValue {

    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, loopItemClass: Constructable<BoundComponent> | undefined, otherComponentId: string | undefined, getterCallback: () => LoopValue | undefined, setterCallback: (val: LoopValue) => void, postProcessFunction?: (row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment) => void): boolean {
        const config = parseAttributeName(attr);
        if (!config) { // Not an loop binding
            return false;
        }

        // If we passed the bound component directly, we could just read/update it, but that tight binding makes it hard to do this rewrite.
        // If this were C# I could pass an IHasValue by ref.
        let current = getterCallback();
        if (current) {
            return true; // stop processing
        }

        current = new LoopValue({ component, content, viewModel, source: attrValue, otherComponentId, loopItemClass, skipPostProcess: config.skipPostProcess, postProcessFunction });
        setterCallback(current);
        return true;
    }

    private _loopItemClass: Constructable<BoundComponent>;
    private _postProcess: boolean;
    private _loopHtml: DocumentFragment;
    // TODO: Remove this
    private _postProcessFunction?: (row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment) => void;

    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    // TODO: Remove the whole loop + inject concept + skip post process
    constructor({ component, content, viewModel, source, skipPostProcess, loopItemClass, postProcessFunction, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source?: string, skipPostProcess?: boolean, loopItemClass?: Constructable<BoundComponent>, postProcessFunction?: (row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment) => void, otherComponentId?: string }) {
        super(component, viewModel, content, source || '');
        this._loopHtml = extractNodeContent(this.content);
        if (loopItemClass) {
            if (!constructorTypeGuard(loopItemClass)) {
                throw new Error('loopItemClass is not a constructor');
            }
            if (!(loopItemClass instanceof BoundComponent.constructor)) {
                throw new Error('loopItemClass is not an bound component');
            }
        }
        this._loopItemClass = loopItemClass || BoundComponent;
        this._postProcess = !skipPostProcess;
        this._postProcessFunction = postProcessFunction;
        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    render(): void {
        const iterable = this._getUntypedValue(this.source, this._otherComponentId);
        if (iterable && typeof iterable[Symbol.iterator] === 'function') {
            const previousContent = extractNodeContent(this.content);
            for (const row of iterable) {
                const clone = document.importNode(this._loopHtml, true);
                // As soon as we add the clone to content, childNodes loses reference to its child nodes, so copy it.
                const nodes = Array.from(clone.childNodes).slice();
                this.content.appendChild(clone);
                if (this._postProcess) {
                    this._loopPostProcess(row, nodes, iterable, previousContent);
                }
            }
        }
    }

    // TODO: Delete this whole thing
    private _loopPostProcess(row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment): void {
        // This is only temporary until the post-process concept is deleted
        if (this._postProcessFunction) {
            this._postProcessFunction(row, addedContent, allRows, previousContent);
            return;
        }

        if (!addedContent.length) {
            return;
        }

        // If the typescript part of the following were important, this would be a problem
        // if this were a derived class.
        const thisclass = this;
        const nodes = nodeListSelectorAll(addedContent, '[i5_item], [\\00003Aitem], [data-i5_item]');

        // If no i5_item matches, then grab the first element.
        if (!nodes.length) {
            const firstNode = nodeListSelector(addedContent, '*');
            if (firstNode) {
                nodes.push(firstNode);
            }
        }

        if (!nodes.length) {
            return;
        }

        (this._loopItemClass as typeof BoundComponent).injectBind(row, nodes, {
            replace: false,
            loopParent: this,
            asyncStartup: (this._temporaryComponent as any)._asyncStartup
        } as IComponentBindingOptions & ILoopParent<any>);
    }
}

// This is only passed by loopPostProcess(), unless you write your own component class that does differently.
export interface ILoopParent<TParent extends BoundComponent<HTMLElement, any> = BoundComponent<HTMLElement, any>> {
    loopParent?: TParent;
}

function parseAttributeName(attributeName: string): { skipPostProcess: boolean } | undefined {
    if (!attributeName) {
        return;
    }
    if (attributeName.startsWith(':')) {
        attributeName = 'i5_' + attributeName.slice(1);
    }
    if (attributeName === 'i5_loop') {
        return { skipPostProcess: false };
    } else if (attributeName === 'i5_loop:null' || attributeName === 'i5_loop_null') {
        return { skipPostProcess: true };
    }
}
