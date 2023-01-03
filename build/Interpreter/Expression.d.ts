import * as ast from "../Ast";
import { Interpreter } from "./Interpreter";
import { expression } from "./types";
export declare function Identifier(): Interpreter<ast.Identifier, expression>;
export declare function NumberLiteral(): Interpreter<ast.NumberLiteral, number>;
export declare function StringLiteral(): Interpreter<ast.StringLiteral, string>;
export declare function ArrayExpression(): Interpreter<ast.ArrayExpression, expression[]>;
export declare function Property(): Interpreter<ast.Property, [string | number, expression]>;
export declare function ObjectExpression(): Interpreter<ast.ObjectExpression, {
    [index: string | number]: expression;
}>;
export declare function BinaryExpression(): Interpreter<ast.BinaryExpression, boolean>;
export declare function Keyword(): Interpreter<ast.Keyword, boolean>;
export declare function BooleanExpression(): Interpreter<ast.BooleanExpression, boolean>;
export declare function MemberExpression(): Interpreter<ast.MemberExpression, expression>;
export declare function CallExpression(): Interpreter<ast.CallExpression, expression>;
export declare function Expression(): Interpreter<ast.Expression, expression>;
export declare function AssignmentExpression(): Interpreter<ast.AssignmentExpression, expression>;
export declare function UpdateExpression(): Interpreter<ast.UpdateExpression, expression>;
