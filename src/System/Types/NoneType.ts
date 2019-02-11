export type None = null | undefined;
export type NotNone = object | string | number | boolean | symbol;
export type Nullable<T> = T | None;
export function isNone(test: any): test is None {
    return (test == null || test === undefined);
}

// I wanted to do an isNotNone, that could be used as a typeguard.
// TS won't let you do that. Supposedly 2.8 is supposed to offer a NonNullable type
// but the latest version that will install on this version of Ubuntu is 2.7.2.