/**
 * Use to define a CSS custom property.
 */
export class CssVariable {
    name: string;
    value: string;
    scope = ':root';
    constructor(name: string, value: string, scope: string = ':root') {
        this.name = name;
        this.value = value;
        this.scope = scope;
    }
}
