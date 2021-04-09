/**
 * Actual handling for the IDisposable using() block doesn't exist. However, it's still useful to have a way to cleanly
 * dispose of an object's resources.
 */
export interface IDisposable {
    dispose(): void;
}
