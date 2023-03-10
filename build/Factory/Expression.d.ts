import * as ast from "../Ast";
export declare function createIdentifier(start: number, end: number, name: string): ast.Identifier;
declare type objectArgument = ast.Identifier | ast.ArrayExpression | ast.ObjectExpression | ast.MemberExpression;
declare type propertyArgument = (ast.NumberLiteral | ast.StringLiteral)[];
export declare function createMemberExpression(start: number, end: number, object: objectArgument, properties: propertyArgument): ast.MemberExpression;
export declare function createStringLiteral(start: number, end: number, value: string): ast.StringLiteral;
export declare function createNumberLiteral(start: number, end: number, value: number): ast.NumberLiteral;
export declare function createArrayExpression(start: number, end: number, elements: ast.Expression[]): ast.ArrayExpression;
export declare function createProperty(start: number, end: number, key: ast.StringLiteral | ast.NumberLiteral, value: ast.Expression): ast.Property;
export declare function createObjectExpression(start: number, end: number, properties: ast.Property[]): ast.ObjectExpression;
export declare function createBinaryExpression(start: number, end: number, left: ast.Expression, operator: string, right: ast.Expression): ast.BinaryExpression;
export declare function createKeyword(start: number, end: number, value: boolean): ast.Keyword;
export declare function createCallExpression(start: number, end: number, callee: string, args: ast.Expression[]): ast.CallExpression;
export declare function createAssignmentExpression(start: number, end: number, left: ast.Identifier, right: ast.Expression): ast.AssignmentExpression;
export declare function createUpdateExpression(start: number, end: number, operator: string, argument: ast.Identifier): ast.UpdateExpression;
export {};
