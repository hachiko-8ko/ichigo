export type None = null | undefined;
export type NotNone = object | string | number | boolean | symbol;
export type Nullable<T> = T | None;

export function isNone(test: any): test is None {
    return (test == null || test === undefined);
}
