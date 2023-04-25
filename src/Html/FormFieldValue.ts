import { FormFieldValue } from './FormFieldValue';
import { isNone } from '../System/Types/NoneType';

/**
 * Form elements by default return strings.
 * In the case of inputs of type number, a number is returned, or undefined if blank.
 * But in the case of checkboxes, boolean is returned (the fact that "false" is truthy is just too problematic).
 * In the case of selects with the multiple property set, a string array is returned.
 * In the case of inputs of type date, datetime, or datetime-local, a string is returned. Date types are just too much of a trainwreck
 * in JS.
 */
export type FormFieldValue = string | string[] | boolean | number | undefined;

/**
 * HTML is inconsistent. Getting the value of form fields is a bit complicated, not always element.value,
 * so here's a helper to make it easier.
 */
export function getFormFieldValue(element: HTMLElement): FormFieldValue {

    // It would be really nice at this point if JS could see generic parameters.
    // If it could, then the code could say "if (input.type === 'checkbox' && TOutput !== boolean) throw new Error()"

    if (element.tagName.toLowerCase() === 'input') {
        const input = element as HTMLInputElement;
        if (input.type.toLowerCase() === 'checkbox') {
            return getCheckboxValue(input);
        } if (input.type.toLowerCase() === 'number') {
            return getNumberInputValue(input);
        } else if (input.type.toLowerCase() === 'radio') {
            return getRadioValue(input);
        } else {
            return input.value;
        }
    } else if (element.tagName.toLowerCase() === 'select') {
        return getSelectValue(element as HTMLSelectElement);
    } else if (element.tagName.toLowerCase() === 'textarea') {
        return (element as HTMLTextAreaElement).value;
    }
}

export function getCheckboxValue(input: HTMLInputElement): boolean {
    return !!input.checked;
}

export function getNumberInputValue(input: HTMLInputElement): number | undefined {
    if (input.value) { return Number(input.value); }
}

export function getRadioValue(input: HTMLInputElement): string | undefined {
    // Radio buttons are weird. We want them to appear to be more normal.
    if (input.name) {
        return (document.querySelector(`input[name="${input.name}"]:checked`) || {} as any).value;
    }
    // If no name, fall back to this
    if (input.checked) {
        return input.value;
    }
}

export function getSelectValue(select: HTMLSelectElement): string | string[] {
    if (select.multiple) {
        return getMultiSelectValue(select);
    } else {
        return select.value;
    }
}

export function getMultiSelectValue(select: HTMLSelectElement): string[] {
    return Array.from(select.selectedOptions).filter(f => f.value).map(m => m.value);
}

// This is almost pointless. Just here for consistency.
export function getSimpleFormValue(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
    if (input.tagName.toLowerCase() === 'select') {
        if ((input as HTMLSelectElement).multiple) {
            throw new Error('Not valid for multi-selects');
        }
    }
    return input.value;
}

/**
 * Setting values is just as complicated as getting them, because HTML is inconsistent. You can't just say element.value = foo.
 * Here's a helper to make it easier.
 */
export function setFormFieldValue(element: HTMLElement, value: FormFieldValue): void {
    // Here you can validate the type before setting or do some kind of conversion.
    // For multi-selects, can auto-wrap value in string.

    if (isNone(value)) {
        value = '';
    }

    const stringValue = value.toString(); // used in most of the cases

    if (element.tagName.toLowerCase() === 'input') {
        const input = element as HTMLInputElement;
        const type = input.type.toLowerCase();

        if (type === 'checkbox') {
            input.checked = value === true || stringValue.toLowerCase() === 'true';
        } else if (type === 'radio') {
            input.checked = stringValue === input.value;
        } else if (type === 'date') {
            if (!value) { return; }
            input.value = toDateString(new Date(stringValue));
        } else if (type === 'datetime' || type === 'datetime-local') {
            if (!value) { return; }
            const date = new Date(stringValue);
            if (isNaN(date.valueOf())) { return; }
            input.value = `${toDateString(date)}T${toTimeString(date)}`;
        } else {
            input.value = stringValue;
        }

    } else if (element.tagName.toLowerCase() === 'select') {
        const select = element as HTMLSelectElement;
        const options = Array.from(select.options);
        if (select.multiple) {
            if (!Array.isArray(value)) {
                checkOption(options, value);
                select.value = stringValue; // treating it like a non-multiple works
                return;
            }
            // Nonexistent options cannot be set. We should let the programmer know. Even though this takes CPU cycles.
            value.map(m => {
                checkOption(options, m);
            });
            for (const opt of options) {
                opt.selected = value.map(m => m.toString()).indexOf(opt.value) > -1;
            }
        } else {
            checkOption(options, value);
            select.value = stringValue;
        }
    } else if (element.tagName.toLowerCase() === 'textarea') {
        (element as HTMLTextAreaElement).value = stringValue;

    } else {
        // tslint:disable-next-line:no-console
        console.warn(`Called setFormFieldValue on non-form field ${element.tagName} ${element.id || ''}`);
    }

    function checkOption(options: HTMLOptionElement[], val: any) {
        // If you set the value of a select to something that is not an available option, nothing will happen.
        const hasOption = options.map(m => m.value).indexOf(val.toString()) > -1;
        if (!hasOption) {
            // tslint:disable-next-line:no-console
            console.warn(`Called setFormFieldValue with nonexistent option ${val.toString()} on select ${element.id}`);
        }
    }

    // These could be readable oneliners if we had padStart() but it's not worth bumping to ES2017 for one method
    function toDateString(date: Date): string {
        if (!isNaN(date.valueOf())) { return ''; }
        const month = ('0' + (date.getUTCMonth() + 1).toString()).slice(-2);
        const day = ('0' + date.getUTCDate().toString()).slice(-2);
        return `${date.getUTCFullYear()}-${month}-${day}`;
    }
    function toTimeString(date: Date): string {
        if (!isNaN(date.valueOf())) { return ''; }
        const hour = ('0' + date.getHours()).slice(-2);
        const minute = ('0' + date.getMinutes()).slice(-2);
        return `${hour}:${minute}`;
    }
}

export function checkFormFieldEquality(val1: FormFieldValue, val2: FormFieldValue): boolean {
    // almost every case
    if (val1 === val2) {
        return true;
    }
    // but there's one tricky case, which is multi-selects, which are string[]
    if (Array.isArray(val1) && Array.isArray(val2)) {
        return val1.length === val2.length && val1.every((v: string, i: number) => v === val2[i]);
    }
    return false;
}
