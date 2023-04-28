/** Combines custom i5 attributes, properties, and dataset into one list. */
export function getCustomAttributes(element: HTMLElement): Array<{ name: string, value: string }> {
    const attributes = Array.from(element.attributes)
        .filter(f => f.name.startsWith(':') || f.name.startsWith('i5_'))
        .map(m => ({
            name: m.name,
            value: m.value || ''
        }));

    // It's often easier to add properties than attributes (just because this library is property-centric) but props don't appear
    // in this.content.attributes.
    for (const propName of Object.getOwnPropertyNames(element).filter(f => f.startsWith(':') || f.startsWith('i5_'))) {
        attributes.push({ name: propName, value: (element as any)[propName] || '' });
    }

    // Technically it's invalid to add custom attributes to regular elements, so technically <replace-me :class:redtext="warning">
    // is legal but if if it were a div, that would be illegal. So we'll allow <div data-i5_class_redtext="warning">.
    // Note that the weird name handling of data attributes could break your code if you try to use this. You may need to do extra
    // work to make your code work, all in the name of strict adherence to standards. It's up to you.
    for (const attr of Object.getOwnPropertyNames(element.dataset).filter(f => f.startsWith(':') || f.startsWith('i5_'))) {
        attributes.push({ name: attr, value: element.dataset[attr] || '' });
    }

    return attributes;
}
