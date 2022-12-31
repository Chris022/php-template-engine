import * as ast from "../Ast"

export function createHTMLCode(start:number,end:number,value:string):ast.HTMLCode{
    return {
        kind:       "HTMLCode",
        start:      start,
        end:        end,
        value:      value
    }
}

export function createPHPCode(start:number,end:number,value:ast.BlockStatement):ast.PHPCode{
    return {
        kind:       "PHPCode",
        start:      start,
        end:        end,
        value:      value
    }
}

export function createPhpEcho(start:number,end:number,value:ast.ExpressionStatement):ast.PHPEcho{
    return {
        kind:       "PHPEcho",
        start:      start,
        end:        end,
        value:      value
    }
}