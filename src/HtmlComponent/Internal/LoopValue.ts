import { BaseValue } from "./BaseValue";
import { BoundComponent } from "../BoundComponent";
import { Constructable, constructorTypeGuard } from "../../System/Types/Constructable";
import { nodeListSelectorAll, nodeListSelector } from "../../Html/QuerySelectorNodeList";
import { IComponentBindingOptions } from "../Options/IComponentBindingOptions";
import { extractNodeContent } from "../../Html/ExtractNodeContent";

export class LoopValue extends BaseValue {

    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, loopItemClass: Constructable<BoundComponent> | undefined, otherComponentId: string | undefined, getterCallback: () => LoopValue | undefined, setterCallback: (val: LoopValue) => void, postProcessFunction?: (row: any, addedContent: HTMLElement, allRows: Iterable<any>, previousContent: DocumentFragment) => void): boolean {
        try {
            if (!window.customElements.get('i5-loop-row')) {
                window.customElements.define('i5-loop-row', LoopRow);
            }
        } catch (err) {
            // customElements isn't officially part of an ES version yet so won't work even in some recent-ish browsers
        }

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

        current = new LoopValue({ component, content, viewModel, source: attrValue, uniqueId: config.uniqueId, otherComponentId, loopItemClass, skipPostProcess: config.skipPostProcess, postProcessFunction });
        setterCallback(current);
        return true;
    }

    private _loopHtml: DocumentFragment;

    private _currentLoop: Map<any, { element: HTMLElement, currentIndex: number }> = new Map();
    private _uniqueId?: string;

    // TODO: Remove these 2 properties
    private _loopItemClass: Constructable<BoundComponent>;
    private _postProcess: boolean;
    private _postProcessFunction?: (row: any, addedContent: HTMLElement, allRows: Iterable<any>, previousContent: DocumentFragment) => void;

    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    // TODO: Remove the whole loop + inject concept + skip post process
    constructor({ component, content, viewModel, source, skipPostProcess, loopItemClass, postProcessFunction, uniqueId, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source?: string, uniqueId?: string, skipPostProcess?: boolean, loopItemClass?: Constructable<BoundComponent>, postProcessFunction?: (row: any, addedContent: HTMLElement, allRows: Iterable<any>, previousContent: DocumentFragment) => void, otherComponentId?: string }) {
        super(component, viewModel, content, source || '');

        const template = this.content.querySelector('template[i5loop=content]') as HTMLTemplateElement;
        if (!template) {
            throw new Error('Something went wrong. Loop content not converted to template.');
        }
        this._loopHtml = template.content;
        template.parentElement!.removeChild(template);

        this._uniqueId = uniqueId;
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
        if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
            return;
        }
        if (this._uniqueId) {
            this._replaceSome(iterable);
        } else {
            this._replaceAll(iterable);
        }
    }

    /**
     * If there are a lot of changes (e.g. reversing a list), this would peform much better than going one by one.
     * This also doesn't depend on every item being unique.
     * @param iterable
     * @param previousContent
     */
    private _replaceAll(iterable: IterableIterator<any>): void {
        const previousContent = extractNodeContent(this.content);
        this._currentLoop.clear();
        let i = 0;
        for (const row of iterable) {
            const newRow = this._createNewItem(row, iterable, previousContent);
            this.content.appendChild(newRow);
            this._currentLoop.set(row, { element: newRow, currentIndex: i });
            i++;
        }
    }

    /**
     * If there are a small number of changes (e.g. adding an item to the end), this would perform better than replacing
     * the full list. But it depends on every item being unique. Because the iterable might not be (could be a list of strings),
     * we have to impose a restriction. Some languages, like vue, handle this is by requiring an unique id property (or else the
     * library developer is not responsible for issues). I like that. It's faster than checking the data for uniqueness (doesn't 
     * take long for small lists, but...).
     * @param iterable
     * @param previousContent
     */
    private _replaceSome(iterable: IterableIterator<any>): void {
        if (!this._uniqueId) {
            throw new Error("Programming error: Called replaceSome without id defined");
        }

        const temp = new Map(this._currentLoop); // temp holding place
        this._currentLoop.clear();

        let i = 0;
        let offset = 0;
        let previous: HTMLElement | undefined;
        for (const row of iterable) {
            const key = row[this._uniqueId];
            if (key === undefined) {
                throw new Error("Unique Id not found in iterable object");
            }
            let current = temp.get(key);
            if (current) {
                // Move it from temp to current
                temp.delete(key);
                this._currentLoop.set(key, current);

                // The item exists. But it might or might not be in the right position.
                if (i !== current.currentIndex + offset) {
                    appendAfter(this.content, current.element, previous);
                    offset++;
                }
                current.currentIndex = i;
            } else {
                const newRow = this._createNewItem(row, iterable, document.createDocumentFragment());
                current = { element: newRow, currentIndex: i };
                appendAfter(this.content, current.element, previous);
                this._currentLoop.set(key, current);
                offset++;
            }
            previous = current.element;
            i++;
        }

        // anything still in temp wasn't in the source iterable
        for (const dead of temp) {
            remove(this.content, dead[1].element);
        }

        function appendAfter(content: Node, next: Node, prev?: Node): void {
            if (prev) {
                content.insertBefore(next, prev.nextSibling);
            } else {
                content.insertBefore(next, content.firstChild);
            }
        }

        function remove(content: Node, item: Node): void {
            content.removeChild(item);
        }
    }

    private _createNewItem(row: any, allRows: Iterable<any>, previousContent: DocumentFragment): HTMLElement {
        const clone = document.importNode(this._loopHtml, true);

        // Wrap all loop rows in a i5-loop-row element, which allows us to track the row.
        // If there is exactly 1 child node, this will be discarded shortly. We can track the single child element.
        // But if it is made up of several elements, or is a text node, this forces a single element per row.
        const newRow = document.createElement('i5-loop-row');
        newRow.appendChild(clone);
        
        if (this._postProcess) {
            this._loopPostProcess(row, newRow, allRows, previousContent);
        }
        if (newRow.childNodes.length !== 1) {
            return newRow;
        }
        // This is a textnode or empty
        if (!newRow.firstElementChild) {
            return newRow;
        }
        return newRow.firstElementChild as HTMLElement;
    }

    // TODO: Delete this whole thing
    private _loopPostProcess(row: any, addedContent: HTMLElement, allRows: Iterable<any>, previousContent: DocumentFragment): void {
        // This is only temporary until the post-process concept is deleted
        if (this._postProcessFunction) {
            this._postProcessFunction(row, addedContent, allRows, previousContent);
            return;
        }

        if (!addedContent || !addedContent.childNodes || !addedContent.childNodes.length) {
            return;
        }

        // TODO: There's no need for i5_item without post processing
        // If the typescript part of the following were important, this would be a problem
        // if this were a derived class.
        const thisclass = this;
        const nodes: Node[] = [];

        for (const node of addedContent.querySelectorAll('[i5_item], [\\00003Aitem], [data-i5_item]')) {
            nodes.push(node);
        }

        // If no i5_item matches, then grab the first element.
        if (!nodes.length) {
            const firstNode = addedContent.firstElementChild;
            if (firstNode) {
                nodes.push(firstNode);
            }
        }

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            (this._loopItemClass as typeof BoundComponent).injectBind(row, node as HTMLElement, {
                replace: false,
                loopParent: this,
                asyncStartup: (this._temporaryComponent as any)._asyncStartup
            } as IComponentBindingOptions & ILoopParent<any>);
        }
    }
}

// This is only passed by loopPostProcess(), unless you write your own component class that does differently.
export interface ILoopParent<TParent extends BoundComponent<HTMLElement, any> = BoundComponent<HTMLElement, any>> {
    loopParent?: TParent;
}

// tslint:disable-next-line:max-classes-per-file
export class LoopRow extends HTMLElement {
    constructor() {
        super();
    }
}

function parseAttributeName(attributeName: string): { skipPostProcess: boolean, uniqueId?: string } | undefined {
    if (!attributeName) {
        return;
    }
    if (attributeName === 'i5_loop') {
        return { skipPostProcess: false };
    } else if (attributeName === 'i5_loop:null' || attributeName === 'i5_loop_null') {
        return { skipPostProcess: true };
    } else if (attributeName.startsWith('i5_loop:') || attributeName.startsWith('i5_loop_')) {
        return { skipPostProcess: false, uniqueId: attributeName.slice(8) };
    }
}
