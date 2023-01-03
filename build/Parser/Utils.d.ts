import { Parser } from "ts-parser-combinator";
export declare function whitepsace(): Parser<string>;
export declare function space(): Parser<string[]>;
export declare function grouped<T>(p: Parser<T>): Parser<T>;
