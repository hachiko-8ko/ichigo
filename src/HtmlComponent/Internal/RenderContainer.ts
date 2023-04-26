import { Nullable } from '../../System/Types/NoneType';
import { Constructable } from '../../System/Types/Constructable';
import { e_ } from '../../System/Utility/Elvis';
import { BoundComponent } from '../BoundComponent';
import { IView } from '../Contract/IView';
import { AttributeValue } from './AttributeValue';
import { ClassValue } from './ClassValue';
import { ConditionalDisplayValue } from './ConditionalDisplayValue';
import { FormInputValue } from './FormInputValue';
import { LoopValue } from './LoopValue';
import { ReplacementValue } from './ReplacementValue';
import { StyleValue } from './StyleValue';
import { IRenderable } from './IRenderable';

/**
 * This class contains everything that can be rendered on a page, tied to a specific content element per container.
 * This allows multiple containers on a page tied to the same component and view model.
 */
export class RenderContainer implements IView<HTMLElement, any> {
    private _rootRenderer: boolean;
    private _attributeBindings: AttributeValue[] = [];
    private _cssClasses: ClassValue[] = [];
    private _cssStyle?: StyleValue;
    private _conditionalDisplay?: ConditionalDisplayValue;
    private _formInputValue?: FormInputValue;
    private _loop?: LoopValue;
    private _replacements: ReplacementValue[] = [];
    private _templateSet = false;

    // TODO: Remove this. It only exists while components can be nested
    private _temporaryId?: string;

    private get _defer(): boolean {
        return (this._temporaryComponent as any)._defer;
    }
    private set _defer(value: boolean) {
        (this._temporaryComponent as any)._defer = value;
    }

    // TODO: Remove _temporaryComponent
    constructor(private _temporaryComponent: BoundComponent, public viewModel: any, public content: HTMLElement, id?: string, loopItemClass?: Constructable<BoundComponent>, loopPostProcess?: (row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment) => void, rootRenderer: boolean = false) {
        this._rootRenderer = rootRenderer;
        if (id) {
            this._temporaryId = id;
        }
        this._configure(loopItemClass, loopPostProcess);
    }

    render(): void {
        for (const item of this._renderers()) {
            item.render();
        }
    }

    // TODO: Remove loopParent. Use eval-based logic to refer to parent data
    // TODO: Remove the whole loop + inject concept
    // TODO: Remove TParent
    private _configure(loopItemClass?: Constructable<BoundComponent>, loopPostProcess?: (row: any, addedContent: Node[], allRows: Iterable<any>, previousContent: DocumentFragment) => void) {
        const currentAttributes = Array.from(this.content.attributes)
            .filter(f => f.name.startsWith(':') || f.name.startsWith('i5_'))
            .filter(f => f.value || f.name === ':input' || f.name === 'i5_input')
            .map(m => ({
                name: m.name,
                value: m.value || ''
            }));

        // It's often easier to add properties than attributes (just because this library is property-centric) but props don't appear
        // in this.content.attributes.
        for (const propName of Object.getOwnPropertyNames(this.content).filter(f => f.startsWith(':') || f.startsWith('i5_'))) {
            const value = (this.content as any)[propName];
            if (value || propName === ':input' || propName === 'i5_input') {
                currentAttributes.push({ name: propName, value: value || '' });
            }
        }

        // Technically it's invalid to add custom attributes to regular elements, so technically <replace-me :class:redtext="warning">
        // is legal but if if it were a div, that would be illegal. So we'll allow <div data-i5_class_redtext="warning">.
        // Note that the weird name handling of data attributes could break your code if you try to use this. You may need to do extra
        // work to make your code work, all in the name of strict adherence to standards. It's up to you.
        for (const attr of Object.getOwnPropertyNames(this.content.dataset).filter(f => f.startsWith(':') || f.startsWith('i5_'))) {
            const value = this.content.dataset[attr];
            if (value || attr === 'i5_input') {
                currentAttributes.push({ name: attr, value: value || '' });
            }
        }

        // Get the alternate source Id
        const otherComponentId: string = e_(currentAttributes.find(f => f.name === 'i5_source' || f.name === ':source')).value;

        for (const prop of currentAttributes) {
            // As soon as one of these returns true, it short-circuits
            const _ = AttributeValue.add(this._temporaryComponent, this.content, this.viewModel, prop.name, prop.value, otherComponentId, this._attributeBindings) ||
                ClassValue.add(this._temporaryComponent, this.content, this.viewModel, prop.name, prop.value, otherComponentId, this._cssClasses) ||
                StyleValue.add(this._temporaryComponent, this.content, this.viewModel, prop.name, prop.value, otherComponentId, () => this._cssStyle, (val: StyleValue) => this._cssStyle = val) ||
                ConditionalDisplayValue.add(this._temporaryComponent, this.content, this.viewModel, prop.name, prop.value, otherComponentId, () => this._conditionalDisplay, (val: ConditionalDisplayValue) => this._conditionalDisplay = val) ||
                FormInputValue.add(this._temporaryComponent, this.content, this.viewModel, prop.name, prop.value, otherComponentId, () => this._formInputValue, (val: FormInputValue) => this._formInputValue = val) ||
                LoopValue.add(this._temporaryComponent, this.content, this.viewModel, prop.name, prop.value, loopItemClass, otherComponentId, () => this._loop, (val: LoopValue) => this._loop = val, loopPostProcess);

            if (prop.name.startsWith(':')) {
                prop.name = 'i5_' + prop.name.slice(1);
            }

            if (prop.name === 'i5_text') {
                this._setTemplate(`<i-v>${prop.value}</i-v>`);
            } else if (prop.name === 'i5_html') {
                this._setTemplate(`<i-v noescape>${prop.value}</i-v>`);
            }

            // TODO: Remove "this." bindings
            this._defer = this._defer || prop.value.startsWith('this.');
        }

        this._setTemplate();
    }

    private *_renderers(): IterableIterator<IRenderable> {
        // To let className string and boolean switches to play together, set the className first and then modify using switches
        const classBindings = this._cssClasses.filter(f => f.baseClass).concat(this._cssClasses.filter(f => !f.baseClass));

        // Only return at the root level. If we returned at every level, they'd be processed over and over.
        if (this._rootRenderer) {
            yield* this._replacements;
        }

        yield* this._attributeBindings;
        yield* classBindings;
        yield* concatIfExists(this._formInputValue, this._cssStyle, this._conditionalDisplay, this._loop);

        function* concatIfExists(...objects: Nullable<IRenderable>[]): IterableIterator<IRenderable> {
            for (const obj of objects) {
                if (obj) {
                    yield obj;
                }
            }
        }
    }

    private _setTemplate(overrideContent?: string): void {
        // Only do something if this is the root (top-level) renderer, not one of the sub-renderers.
        // Only do something if the template hasn't been set already.
        if (!this._rootRenderer || this._templateSet) {
            return;
        }

        this._templateSet = true;
        if (overrideContent) {
            this.content.innerHTML = overrideContent;
        }
        ReplacementValue.addHtmlTemplate(this._temporaryComponent, this.content, this.viewModel, this._replacements, this._temporaryId);

        // In the original build of the object, if any replacements start with "this." we need to defer.
        // TODO: Remove this when "this." is removed. Probably can get rid of the whole _defer idea
        this._defer = this._defer || !!this._replacements.find(f => f.source.startsWith('this.'));

        // See if we need to defer rendering until after initialization.
        // Note that this will lead to a FOUC, maybe milliseconds, maybe longer.
        if (!this._defer) {
            // Replace the completed values before adding to the visible page. This is slightly redundant, because this happens in the render()
            // step, but I hate it when I see a flash of unreplaced content on sites.
            // It's my hope that because of change tracking, this doesn't perform too badly.
            for (const repl of this._replacements) {
                repl.render();
            }
        }
    }
}
