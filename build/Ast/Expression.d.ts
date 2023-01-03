export interface Identifier {
    kind: "Identifier";
    start: number;
    end: number;
    name: string;
}
export interface MemberExpression {
    kind: "MemberExpression";
    start: number;
    end: number;
    object: Identifier | ArrayExpression | ObjectExpression | MemberExpression;
    properties: (NumberLiteral | StringLiteral)[];
}
export interface StringLiteral {
    kind: "StringLiteral";
    start: number;
    end: number;
    value: string;
}
export interface NumberLiteral {
    kind: "NumberLiteral";
    start: number;
    end: number;
    value: number;
}
export interface ArrayExpression {
    kind: "ArrayExpression";
    start: number;
    end: number;
    elements: Expression[];
}
export interface Property {
    kind: "Property";
    start: number;
    end: number;
    key: StringLiteral | NumberLiteral;
    value: Expression;
}
export interface ObjectExpression {
    kind: "ObjectExpression";
    start: number;
    end: number;
    properties: Property[];
}
export interface BinaryExpression {
    kind: "BinaryExpression";
    start: number;
    end: number;
    left: Expression;
    operator: string;
    right: Expression;
}
export interface Keyword {
    kind: "Keyword";
    start: number;
    end: number;
    value: boolean;
}
export declare type BooleanExpression = BinaryExpression | Keyword;
export interface CallExpression {
    kind: "CallExpression";
    start: number;
    end: number;
    callee: string;
    arguments: Expression[];
}
export declare type NonBinaryExpresstion = StringLiteral | NumberLiteral | ArrayExpression | ObjectExpression | Keyword | MemberExpression | Identifier | CallExpression;
export declare type Expression = StringLiteral | NumberLiteral | ArrayExpression | ObjectExpression | BooleanExpression | MemberExpression | Identifier | CallExpression;
export interface AssignmentExpression {
    kind: "AssignmentExpression";
    start: number;
    end: number;
    left: Identifier;
    right: Expression;
}
export interface UpdateExpression {
    kind: "UpdateExpression";
    start: number;
    end: number;
    operator: string;
    argument: Identifier;
}
