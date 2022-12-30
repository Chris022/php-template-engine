import { StringLiteral } from "./Expression";

export interface ImportDeclaration{
    kind:       "ImportDeclaration",
    start:      number,
    end:        number,
    source:     StringLiteral
}

export type Declaration = ImportDeclaration