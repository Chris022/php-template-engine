import { Declaration } from "./Declaration";
import { TemplateElement } from "./Document";
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
    consequent: TemplateElement[],
    alternate?: TemplateElement[]
}

export interface ForStatement{
    kind:       "ForStatement",
    start:      number,
    end:        number,
    init?:       AssignmentExpression,
    test?:       BooleanExpression ,
    update?:     UpdateExpression,
    body:        TemplateElement[]
}

export interface ForEachStatement{
    kind:       "ForEachStatement",
    start:      number,
    end:        number,
    left:       Identifier | ArrayExpression | ObjectExpression,
    key:        Identifier,
    value:      Identifier,
    block:      TemplateElement[]
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