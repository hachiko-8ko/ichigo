/**
 * Tell if a given string is a positive integer.
 * Use for detecting array keys.
 */
export function isPositiveIntegerString(str: any): boolean {
    if (!str || typeof str !== 'string') {
        return false;
    }
    if (str === '0') {
        return true;
    }
    return /^[1-9]\d*$/.test(str);
}
