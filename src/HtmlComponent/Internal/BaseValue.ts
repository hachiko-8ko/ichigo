import { escapeHtml } from '../../Html/EscapeHtml';
import { FormFieldValue } from '../../Html/FormFieldValue';
import { observablePropertyCheck } from '../../Observable/ObservableProperty';
import { observableStateCheck } from '../../Observable/ObservableState';
import { isNone, None } from '../../System/Types/NoneType';
import { e_ } from '../../System/Utility/Elvis';
import { BoundComponent } from '../BoundComponent';
import { getComponent } from '../ComponentMap';
import { IView } from '../Contract/IView';
import { IRenderable } from './IRenderable';

export abstract class BaseValue implements IView<HTMLElement, any>, IRenderable {
    // TODO: Remove loopParent
    // Until I have removed the "this" source, we need a reference to the component itself
    // Until I have eliminated the parent (^) source, we need a reference to the loop parent
    get loopParent(): BoundComponent | undefined {
        return this._temporaryComponent.loopParent;
    }

    // TODO: Remove _temporaryComponent
    constructor(protected _temporaryComponent: BoundComponent, public viewModel: any, public content: HTMLElement, public source: string) {
        // TODO: Provide an option to disable change tracking, for components where there are outside DOM updates.
        // It should be component-wide. No need for overkill.
    }

    abstract render(): void;

    protected _getStringValue(name: string, skipEscape: boolean = false, sourceComponentId?: string): string | None {
        const value = this._getUntypedValue(name, sourceComponentId);
        if (isNone(value)) {
            return value;
        } else if (value === false) {
            return undefined;
        } else if (typeof value === 'string') {
            return skipEscape ? value : escapeHtml(value);
        } else {
            return skipEscape ? value.toString() : escapeHtml(value.toString());
        }
    }

    protected _getUntypedValue(name: string, sourceComponentId?: string): any {
        let component: any = this._temporaryComponent; // TODO: Remove this line
        let source: any;

        // TODO: Get rid of other component sources, parents, "this"
        // TODO: We probably need an string eval() based source like angular, etc. Even though that makes me cringe.

        if (sourceComponentId) {
            component = getComponent(sourceComponentId) || component;
        }

        if (!name) {
            return;
        }

        let thisArg: any = component.viewModel;

        // If VM is a state, get the current state value.
        if (observableStateCheck<any>(thisArg)) {
            thisArg = thisArg.value;
        }

        if (name.startsWith('this.')) {
            thisArg = component;
            name = name.slice(5);
            if (!(name in component)) {
                // tslint:disable-next-line:no-console
                console.warn(`this.${name} does not exist on view.`);
                return;
            }
            source = (component as Record<string, any>)[name];

        } else if (name.startsWith('^') && e_(component.loopParent).viewModel && typeof e_(component.loopParent).viewModel === 'object') {
            // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
            // an object or an iterable, not really something you'll read or write to directly.
            // Might do a shortcut to the parent component's 'this'

            thisArg = component.loopParent!.viewModel;

            if (!(name.slice(1) in thisArg)) {
                // tslint:disable-next-line:no-console
                console.warn(`${name} does not exist on viewModel parent view model.`);
                return {};
            }
            source = thisArg[name.slice(1)];

        } else if (name === '.') {
            source = thisArg;

        } else if (typeof thisArg === 'object') {
            if (!(name in thisArg)) {
                // tslint:disable-next-line:no-console
                console.warn(`this.${name} does not exist on viewModel.`);
                return {};
            }
            source = thisArg[name];

        }

        // CONSIDER: Consider adding custom attributes to allow executing method with string parameters. i5_param01="val 1", i5_param02="val 2"
        if (typeof source === 'function') {
            return source.call(thisArg);
        } else if (observablePropertyCheck<FormFieldValue>(source)) {
            return source.value;
        } else {
            return source;
        }
    }
}
