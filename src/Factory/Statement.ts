import * as ast from "../Ast"

export function createBlockStatement(start:number,end:number,body:(ast.Statement | ast.Declaration)[]):ast.BlockStatement{
    return {
        kind:       "BlockStatement",
        start:      start,
        end:        end,
        body:       body  
    }
}

export function createExpressionStatement(start:number,end:number,expression:ast.Identifier | ast.MemberExpression):ast.ExpressionStatement{
    return {
        kind:       "ExpressionStatement",
        start:      start,
        end:        end,
        expression: expression  
    }
}

