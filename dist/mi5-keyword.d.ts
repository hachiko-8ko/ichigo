import { Kwarg } from '../src/System/Types/KeywordArguments';

interface IKeyword {
    kw<T>(name: string, b?: T): any;
    kw<T>(arr: [string, T]): any;
    kw<T>(map: Record<string, T>): any;
    Kwarg: Kwarg;
    kwargsToObject<TOutput extends Record<string, any>>(arr: Kwarg<any>[]): TOutput;
}

interface IMi5 {
    util: IKeyword;
}

declare var mi5: IMi5;
declare function using(lib: any, alias: string): void;
