/**
 * Given an element (such as document, body, or something smaller) and a selector, find that element in the document (the first match) and 
 * convert it in-place to a template.
 *
 * If I wanted to offer options, I'd check to see if there is a template first (to allow devs to use the vue-style in-html style where the
 * template tag is used in the original code. But no, make it simple, there's no reason for that option.
 */
export function convertElementToTemplate(element: Element): HTMLTemplateElement | undefined {
    const template = document.createElement('template');
    // Move all inner content to the template
    while (element.firstChild) {
        template.content.appendChild(element.firstChild!);
    }

    // Put the new template inside the original element
    element.appendChild(template);

    element.setAttribute('i5', 'loop'); // mark it as converted (will no longer match selector i5=loop_convert)
    template.setAttribute('i5loop', 'content'); // mark it as content (will match selector i5loop=content)

    return template;
}
