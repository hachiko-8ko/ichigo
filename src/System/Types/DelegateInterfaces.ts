/**
 * Overloaded types aren't allowed in typescript and MS has no plans to support them. But I still want to have
 * standard interfaces for Func, Action, and Predicate. So to get something close, we'll have to hack up the names
 * a bit. It's still cleaner than saying "(t1: string, t2: number) => boolean" everywhere.
 *
 * Now something that took an array of types (I saw a spread being suggested) would actually be better than C#'s interfaces.
 * But it doesn't exist yet.
 *
 * You could always create a single interface using never as a default for the types, but if you do, TS doesn't validate
 * the number of arguments on a parameter or variable. The only restriction is that you don't do more than 9 (forex).
 * But not that you specify all that are required.
 *
 * Limits on interfaces extending interfaces keeps us from re-using code. Clipboard inheritance all the way.
 */
// tslint:disable:callable-types
export interface IAction0 {
    (): void;
}
export interface IAction1<T1> {
    (t1: T1): void;
}
export interface IAction2<T1, T2> {
    (t1: T1, t2: T2): void;
}
export interface IAction3<T1, T2, T3> {
    (t1: T1, t2: T2, t3: T3): void;
}
export interface IAction4<T1, T2, T3, T4> {
    (t1: T1, t2: T2, t3: T3, t4: T4): void;
}
export interface IAction5<T1, T2, T3, T4, T5> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): void;
}
export interface IAction6<T1, T2, T3, T4, T5, T6> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): void;
}
export interface IAction7<T1, T2, T3, T4, T5, T6, T7> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): void;
}
export interface IAction8<T1, T2, T3, T4, T5, T6, T7, T8> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): void;
}
export interface IAction9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9): void;
}

export interface IPredicate0 {
    (): boolean;
}
export interface IPredicate1<T1> {
    (t1: T1): boolean;
}
export interface IPredicate2<T1, T2> {
    (t1: T1, t2: T2): boolean;
}
export interface IPredicate3<T1, T2, T3> {
    (t1: T1, t2: T2, t3: T3): boolean;
}
export interface IPredicate4<T1, T2, T3, T4> {
    (t1: T1, t2: T2, t3: T3, t4: T4): boolean;
}
export interface IPredicate5<T1, T2, T3, T4, T5> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): boolean;
}
export interface IPredicate6<T1, T2, T3, T4, T5, T6> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): boolean;
}
export interface IPredicate7<T1, T2, T3, T4, T5, T6, T7> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): boolean;
}
export interface IPredicate8<T1, T2, T3, T4, T5, T6, T7, T8> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): boolean;
}
export interface IPredicate9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9): boolean;
}

export interface IFunc0<R> {
    (): R;
}
export interface IFunc1<T1, R> {
    (t1: T1): R;
}
export interface IFunc2<T1, T2, R> {
    (t1: T1, t2: T2): R;
}
export interface IFunc3<T1, T2, T3, R> {
    (t1: T1, t2: T2, t3: T3): R;
}
export interface IFunc4<T1, T2, T3, T4, R> {
    (t1: T1, t2: T2, t3: T3, t4: T4): R;
}
export interface IFunc5<T1, T2, T3, T4, T5, R> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}
export interface IFunc6<T1, T2, T3, T4, T5, T6, R> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
}
export interface IFunc7<T1, T2, T3, T4, T5, T6, T7, R> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7): R;
}
export interface IFunc8<T1, T2, T3, T4, T5, T6, T7, T8, R> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8): R;
}
export interface IFunc9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> {
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8, t9: T9): R;
}
