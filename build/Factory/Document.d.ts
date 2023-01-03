import * as ast from "../Ast";
export declare function createHTMLCode(start: number, end: number, value: string): ast.HTMLCode;
export declare function createPHPCode(start: number, end: number, value: ast.BlockStatement | ast.Statement): ast.PHPCode;
export declare function createPhpEcho(start: number, end: number, value: ast.Expression): ast.PHPEcho;
