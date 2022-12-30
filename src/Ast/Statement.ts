import { Declaration } from "./Declaration";
import { ArrayExpression, AssignmentExpression, BooleanExpression, Identifier, MemberExpression, ObjectExpression, UpdateExpression } from "./Expression";

export interface BlockStatement{
    kind:       "BlockStatement",
    start:      number,
    end:        number,
    body:       (Statement | Declaration)[]
}

export interface IfStatement{
    kind:       "IfStatement",
    start:      number,
    end:        number,
    test:       BooleanExpression,
    consequent: BlockStatement,
    alternate?: BlockStatement
}

export interface ForStatement{
    kind:       "ForStatement",
    start:      number,
    end:        number,
    init:       AssignmentExpression | null,
    test:       BooleanExpression  | null,
    update:     UpdateExpression | null,
    body:       BlockStatement
}

export interface ForEachStatement{
    kind:       "ForEachStatement",
    start:      number,
    end:        number,
    left:       Identifier | ArrayExpression | ObjectExpression,
    key:        Identifier,
    value:      Identifier,
    block:      BlockStatement
}

export interface BreakStatement{
    kind:       "BreakStatement",
    start:      number,
    end:        number,
}

export interface ContinueStatement{
    kind:       "ContinueStatement",
    start:      number,
    end:        number,
}

export type Statement = ContinueStatement | BreakStatement | ForEachStatement | ForStatement | IfStatement

export interface ExpressionStatement{
    kind:       "ExpressionStatement",
    start:      number,
    end:        number,
    expression: Identifier | MemberExpression
}