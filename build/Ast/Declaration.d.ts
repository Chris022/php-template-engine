import { StringLiteral } from "./Expression";
export interface IncludeDeclaration {
    kind: "ImportDeclaration";
    start: number;
    end: number;
    source: StringLiteral;
}
export declare type Declaration = IncludeDeclaration;
