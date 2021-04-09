/**
 * Get the contents of any html node as a DocumentFragment.
 */
export function extractNodeContent(node: Node): DocumentFragment {
    const range = document.createRange();
    range.selectNodeContents(node);
    return range.extractContents();
}
