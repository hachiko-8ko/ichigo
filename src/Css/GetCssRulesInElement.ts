export function getCssRulesInElement(element: HTMLElement): string {
    const result: string[] = [];
    for (const style of element.querySelectorAll('style')) {
        for (const rule of (style.sheet as any).cssRules) {
            // A very minimum of pretty printing. I may beef it up later.
            result.push(rule.cssText.replace(/\{/g, '\n    {\n   ').replace(/;/g, ';\n    '));
        }
    }
    return result.join('\n');
}
