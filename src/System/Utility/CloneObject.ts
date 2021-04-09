// I don't know for sure if this will work in all cases.
// It gets deeper into the guts of JS object than I have experience with.
export function cloneObject<T extends Record<string, any>>(obj: T): T | undefined {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    const result = Object.create(Object.getPrototypeOf(obj));
    for (const key of Object.getOwnPropertyNames(obj)) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor) {
            Object.defineProperty(result, key, descriptor);
        }
    }
    return result;
}
