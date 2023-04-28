import { e_ } from '../../System/Utility/Elvis';
import { observablePropertyCheck } from '../../Observable/ObservableProperty';
import { observableStateCheck } from '../../Observable/ObservableState';
import { FormFieldValue, getFormFieldValue, setFormFieldValue, checkFormFieldEquality } from '../../Html/FormFieldValue';
import { BaseValue } from './BaseValue';
import { BoundComponent } from '../BoundComponent';

export class FormInputValue extends BaseValue {
    static add(component: BoundComponent, content: HTMLElement, viewModel: any, attr: string, attrValue: string, otherComponentId: string | undefined, getterCallback: () => FormInputValue | undefined, setterCallback: (val: FormInputValue) => void): boolean {
        const config = parseAttributeName(attr);
        if (!config) { // Not an input binding
            return false;
        }

        // If we passed the bound component directly, we could just read/update it, but that tight binding makes it hard to do this rewrite.
        // If this were C# I could pass an IHasValue by ref.
        let current = getterCallback();
        if (!current) {
            current = new FormInputValue({ component, content, viewModel, source: attrValue, otherComponentId });
            setterCallback(current);
        }

        // either :value="source" or :input:="sourceAndTarget"
        if (config.value) {
            if (!attrValue && !current.source) {
                throw new Error('Value source is missing.');
            }
            // Only set if not already set to something
            if (!current.source) {
                current.source = attrValue;
            }
        }

        // either :input or :input:="sourceAndTarget" or :target="target"
        if (config.input || config.target) {
            if (config.input) {
                current.addWriteEvent();
            }
            if (config.target && !attrValue) {
                throw new Error('Input target is missing.');
            }
            if (attrValue) {
                current.addWriteTarget(attrValue);
            }
        }

        return true;
    }

    private _writeTargets: string[] = [];
    // TODO: Remove otherComponentId
    private _otherComponentId?: string;

    constructor({ component, content, viewModel, source, otherComponentId }: { component: BoundComponent, content: HTMLElement, viewModel: any, source?: string, otherComponentId?: string }) {
        super(component, viewModel, content, source || '');
        if (otherComponentId) {
            this._otherComponentId = otherComponentId;
        }
    }

    addWriteEvent(): void {
        this.content.addEventListener('input', this._write.bind(this));
    }

    addWriteTarget(target: string): void {
        if (!target) {
            throw new Error('Invalid argument');
        }
        // Don't create dupes; dupe writes hurt performance
        if (!this._writeTargets.find(f => f === target)) {
            this._writeTargets.push(target);
        }
    }

    render(): void {
        // If only one-way writing from form to view model, there won't be a source, and render() will do nothing.
        if (this.source) {
            const newValue = this._getUntypedValue(this.source, this._otherComponentId);
            // in this case, there's definitely outside processes updating the DOM, so we have to check
            const currentValue = getFormFieldValue(this.content);
            if (!checkFormFieldEquality(newValue, currentValue)) {
                setFormFieldValue(this.content, newValue);
            }
        }
    }

    private _write(evt: Event): void {
        if (!this._writeTargets.length) {
            return;
        }
        const element = evt.currentTarget as HTMLElement;
        if (!element) {
            return;
        }
        const value = getFormFieldValue(element);

        // There are two cases where value is undefined. Either the element is not a form element or it's an unnamed radio button
        // that is not selected. In both cases, we don't want to update the model with undefined, which is useless.
        // TODO: Is this justification valid?
        if (value === undefined) {
            return;
        }

        // WARN: Cannot type check this dynamically. TypeScript is build-time checking only. Runtime code can't even see the type.
        // If you want to be precise, all properties in _writeBindings should be FormItemValue, but as _writeBindings is populated
        // via string, there's no way to enforce that. So if you fill a string value from a multiple select, it'll produce bugs.
        // So be careful. It's on you.
        for (const bind of this._writeTargets) {

            // TODO: Add an eval-based analog to eval-based reading. Taking an arrow function? Don't know about scope so may not be possible.

            // TODO: Remove "this." binding
            if (bind.startsWith('this.')) {
                const target = (this as Record<string, any>)[bind.slice(5)];
                writeValue(target, () => (this as Record<string, any>)[bind.slice(5)] = value, this);

            } else if (bind === '.') {
                if (observableStateCheck<any>(this.viewModel)) {
                    this.viewModel.value = value;
                } else {
                    // Assume that the view model is either FormFieldValue or a function that takes one.
                    writeValue(this.viewModel, () => this.viewModel = value as any, this.viewModel);
                }

                // TODO: Remove ^ parent binding
            } else if (bind.startsWith('^') && e_(this.loopParent).viewModel && typeof this.loopParent!.viewModel === 'object') {
                // Note: Not doing a '^' by itself because that's a pretty BS case. If this is the loop child, the parent is probably
                // an object or an iterable, not really something you'll read or write to directly.
                // Might do a shortcut to the parent component's 'this'
                writeToViewModelObject(this.loopParent!, bind.slice(1));

            } else if (typeof this.viewModel === 'object') {
                writeToViewModelObject(this.viewModel, bind);
            }
        }

        // TODO: Once "this." and ^parent are deleted, there'll be no point for this function to remove duplicate code.
        // Because it'll only be called once.
        function writeValue(target: any, writeToPropertyCallback: () => void, thisArg: any) {
            if (typeof target === 'function') {
                target.call(thisArg, value);
                return;
            }
            if (observablePropertyCheck<FormFieldValue>(target)) {
                target.value = value;
                return;
            }
            // This needs to be a function to be flexible, because if target is a value type or immutable, writing
            // it directly replaces only the value without updating the model.
            writeToPropertyCallback();
        }

        function writeToViewModelObject(viewModel: any, property: string) {
            if (observableStateCheck<any>(viewModel)) {
                // With observable state, we need to get the state, update it, and write the whole thing back.
                // While it is possible to update a single property in some cases, it doesn't allow reuse of already-working code.
                const tmp = viewModel.value;
                const target = tmp[property];
                writeValue(target, () => tmp[property] = value, tmp);
                viewModel.value = tmp;

            } else {
                const target = (viewModel as Record<string, any>)[property];
                writeValue(target, () => (viewModel as Record<string, any>)[property] = value, viewModel);
            }
        }
    }
}

function parseAttributeName(attributeName: string): { value?: boolean, input?: boolean, target?: boolean } | undefined {
    if (!attributeName) {
        return;
    }
    if (attributeName === 'i5_value') {
        return { value: true };
    } else if (attributeName === 'i5_input') {
        return { input: true };
    } else if (attributeName === 'i5_input:' || attributeName === 'i5_input_value') {
        return { input: true, value: true };
    } else if (attributeName.startsWith('i5_target')) {
        return { target: true };
    }
}
