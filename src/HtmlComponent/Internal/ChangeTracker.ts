import { setFormFieldValue, checkFormFieldEquality, getFormFieldValue } from '../../Html/FormFieldValue';
/**
 * Encapsulates all the change tracking logic (primitive as it is) not including loops, which have no commonality with other directives.
 * Pass in the properties you want. If any of those are different from what's tracked, do them and update what's tracked.
 * 
 * For now, it uses its cache of the previous values rather than diffing against the actual DOM, because it'll be faster.
 * This means that changes must all come through this process, not any external DOM updates.
 * This is possibly why angular makes it impossible to do anything useful with the DOM directly.
 * If DOM mutation events hadn't been removed, I'd refresh on dom mutation.
 */
export class ChangeTracker {
    constructor(private _element: HTMLElement, private _properties: Record<string, any> = {}) {
    }

    apply(newProperties: Record<string, any>): void {

        for (const propName of Object.getOwnPropertyNames(newProperties)) {
            const newValue = newProperties[propName];
            switch (propName) {
                case 'classList':
                    this._handleCssClassList(newValue);
                    break;
                case 'className':
                    this._handleCssClassName(newValue);
                    break;
                case 'style.cssText':
                    this._handleCssStyleText(newValue);
                    break;
                case 'style.cssList':
                    this._handleCssStyleList(newValue);
                    break;
                case 'innerHTML':
                    this._handleInnerHtml(newValue);
                    break;
                case 'style.display':
                    this._handleCssDisplay(newValue);
                    break;
                case 'input.value':
                    this._handleInputValue(newValue);
                    break;
                default:
                    this._handleAttribute(propName, newValue);
            }
        }
    }

    /**
     * Special handling for classList array values { classList: { red: true, green: false }}
     * @param value
     */
    private _handleCssClassList(value: any): void {
        const currentValue = this._properties["classList"];
        // right now, this has only one class, but it could have more
        for (const className of Object.getOwnPropertyNames(value)) {
            if (!currentValue[className] && value[className]) {
                this._element.classList.add(className);
                currentValue[className] = true;
            } else if (currentValue[className] && !value[className]) {
                this._element.classList.remove(className);
                currentValue[className] = false;
            }
        }
    }

    /**
     * Special handling for CSS className, which cannot be set with setAttribute.
     * @param propValue 
     */
    private _handleCssClassName(value: any): void {
        if (this._properties['className'] !== value) {
            this._element.className = value;
            this._properties["className"] = value;
        }
    }

    /**
     * Special handling for style array values { ['style.cssList']: { backgroundColor: 'white', display: '' } }
     * To remove a style, set it to something falsy.
     * style can be set using setAttribute, but the syntax is different. setAttribute('style', cssText) sets style.cssText
     * @param value
     */
    private _handleCssStyleList(value: any): void {
        const currentValue = this._properties["style.cssList"];
        // right now, this has only one style, but it could have more
        for (const styleName of Object.getOwnPropertyNames(value)) {
            const newValue = value[styleName] || '';
            if (newValue && currentValue[styleName] !== newValue) {
                // needs to be set to something different from what it is
                (this._element.style as any)[styleName] = newValue;
                currentValue[styleName] = newValue;
            } else if (!newValue && currentValue[styleName]) {
                // needs to be cleared and it's currently set to something
                this._element.style.removeProperty(styleName);
                currentValue[styleName] = '';
            }
        }
    }

    /**
     * Special handling for style.cssText
     * @param propValue 
     */
    private _handleCssStyleText(value: any): void {
        if (this._properties['style.cssText'] !== value) {
            this._element.style.cssText = value;
            // When you set the CSS to something invalid, it comes back empty
            if (value && !this._element.style.cssText) {
                // tslint:disable-next-line:no-console
                console.warn(`Invalid style text in component: ${value}`);
            }
            this._properties["style.cssText"] = value;
        }
    }

    /**
     * Conditional CSS display: none
     * @param value 
     */
    private _handleCssDisplay(value: any): void {
        const currentValue = this._properties['style.display'];

        if (value === 'none' && currentValue !== 'none') {
            const currentStyle = this._element.style.display || '';
            if (currentStyle !== 'none') {
                this._properties['previousStyle.display'] = currentStyle;
            }
            this._element.style.display = 'none'; // hide it
            this._properties['style.display'] = 'none';

        } else if (value !== 'none' && currentValue === 'none') {
            let previousStyle = this._properties['previousStyle.display'];
            if (previousStyle === 'none') {
                previousStyle = '';
            }
            this._element.style.display = previousStyle; // show it
            this._properties['style.display'] = previousStyle;

        }
    }

    private _handleInputValue(value: any): void {
        // This is the value of an input field, so there is almost definitely going to be changes outside component code.
        // So there's no point in caching the value. We have to check the DOM every time.
        const currentValue = getFormFieldValue(this._element);
        if (!checkFormFieldEquality(value, currentValue)) {
            setFormFieldValue(this._element, value);
        }
    }

    /** Set innerHTML, which isn't an attribute and can't be set like one. */
    private _handleInnerHtml(value: string | undefined) {
        if (value !== this._properties['innerHTML'] || '') {
            this._element.innerHTML = value || '';
            this._properties['innerHTML'] = value || '';
        }
    }

    /**
     * Catch-all handler for generic HTML attributes. If value is null, attribute is removed.
     * @param name 
     * @param value 
     */
    private _handleAttribute(name: string, value: any): void {
        if (this._properties[name] !== value) {
            // Don't save literal null attributes but remove it
            if (value === null) {
                this._element.removeAttribute(name);
            } else {
                this._element.setAttribute(name, value);
            }
            this._properties[name] = value;
        }
    }
}
