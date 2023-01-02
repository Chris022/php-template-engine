import * as ast from "../Ast"
import { BooleanExpression } from "../Ast"

export function createBlockStatement(start:number,end:number,body:(ast.Statement | ast.Declaration)[]):ast.BlockStatement{
    return {
        kind:       "BlockStatement",
        start:      start,
        end:        end,
        body:       body  
    }
}

export function createIfStatement(start:number,end:number,test:ast.BooleanExpression,consequent:ast.TemplateElement[],alternate?:ast.TemplateElement[]):ast.IfStatement{
    return {
        kind:       "IfStatement",
        start:      start,
        end:        end,
        test:       test,
        consequent: consequent,
        alternate: alternate
    }
}

export function createForStatement(start:number,end:number,body:ast.TemplateElement[],init?:ast.AssignmentExpression,test?:ast.BooleanExpression,update?:ast.UpdateExpression):ast.ForStatement{
    return {
        kind:       "ForStatement",
        start:      start,
        end:        end,
        init:       init,
        test:       test,
        update:     update,
        body:       body
    }
}
 
type ForEachLeft = ast.Identifier | ast.ArrayExpression | ast.ObjectExpression
export function createForEachStatement(start:number,end:number,left:ForEachLeft,key:ast.Identifier,value:ast.Identifier,block:ast.TemplateElement[]):ast.ForEachStatement{
    return {
        kind:       "ForEachStatement",
        start:      start,
        end:        end,
        left:       left,
        key:        key,
        value:      value,
        block:      block
    }
}

export function createBreakStatement(start:number,end:number):ast.BreakStatement{
    return {
        kind:       "BreakStatement",
        start:      start,
        end:        end
    }
}

export function createContinueStatement(start:number,end:number):ast.ContinueStatement{
    return {
        kind:       "ContinueStatement",
        start:      start,
        end:        end
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

