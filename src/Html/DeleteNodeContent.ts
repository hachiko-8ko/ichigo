/**
 * Delete the contents of any html node.
 */
export function deleteNodeContent(node: Node): void {
    const range = document.createRange();
    range.selectNodeContents(node);
    range.deleteContents();
}
