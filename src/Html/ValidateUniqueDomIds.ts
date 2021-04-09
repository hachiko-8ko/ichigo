/**
 * If the document contains any duplicate IDs, throw an exception.
 */
export function validateUniqueDomIds(): void {
    const ids: Set<string> = new Set();
    let i: number = 0;
    for (const foo of document.querySelectorAll('*[id]')) {
        ids.add(foo.id);
        i++;
        if (ids.size !== i) {
            throw new Error(`Duplicate DOM IDs found. The first duplicate id is ${foo}.`);
        }
    }
}
