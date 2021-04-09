/**
 * Dead simple assertion that'll work anywhere. This is NOT the difficult part of unit testing.
 */
export function assert(test: boolean, message?: string): void {
    if (!test) {
        throw new Error(message || 'Failed');
    }
}
