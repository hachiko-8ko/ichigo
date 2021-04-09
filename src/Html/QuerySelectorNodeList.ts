/**
 * Here's a helper for one of the places where HTML5 falls over. If you get some html like <div id="1"></div><div id="2"></div>, it becomes
 * a NodeList. HTML5 by default does not provide a way to search this for a selector.
 */
export function nodeListSelector(nodes: NodeList | Node[], selector: string): HTMLElement | undefined {
    for (const node of nodes) {
        if (!('matches' in node)) {
            // Filter out text nodes
            continue;
        }
        if ((node as Element).matches(selector)) {
            return node as HTMLElement;
        }
        const search = (node as Element).querySelector(selector);
        if (search) {
            return search as HTMLElement;
        }
    }
}

/**
 * Here's a helper for one of the places where HTML5 falls over. If you get some html like <div id="1"></div><div id="2"></div>, it becomes
 * a NodeList. HTML5 by default does not provide a way to search this for a selector.
 */
export function nodeListSelectorAll(nodes: NodeList | Node[], selector: string): HTMLElement[] {
    // Because the browser can lose references when moving nodes, this can also take a regular array.
    // Because HTML5 has totally fallen over, it's not possible for the fixed nodeListSelectorAll
    // to match the output signature of querySelectorAll (NodeListOf<Element> instead of array).

    const results: HTMLElement[] = [];
    for (const node of nodes) {
        if (!('matches' in node)) {
            // Filter out text nodes
            continue;
        }
        if ((node as Element).matches(selector)) {
            results.push(node as HTMLElement);
        }
        const search = (node as Element).querySelectorAll(selector);
        results.push(...Array.from(search as NodeListOf<HTMLElement>));
    }
    return results;
}
