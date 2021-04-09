/**
 * I don't know how accurate this is but it seems pretty good
 */
export function isPrimitive(obj: any): boolean {
    return Object(obj) !== obj;
}
