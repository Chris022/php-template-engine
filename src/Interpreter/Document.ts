import * as ast from "../Ast"
import { Expression } from "./Expression";
import { doInterpreter, Interpreter } from "./Interpreter";
import { BlockStatement, Statement } from "./Statement";
import { to_string } from "./types";

export function HTMLCode():Interpreter<ast.HTMLCode,string>{
    return doInterpreter((storrage,elm) => {
        return elm.value
    })
}

export function PHPCode():Interpreter<ast.PHPCode,string>{
    return doInterpreter((storrage,elm) => {
        switch(elm.value.kind){
            case "BlockStatement":  return BlockStatement().run(storrage,elm.value)
            default:                return Statement().run(storrage,elm.value)
        }
    })
}

export function PHPEcho():Interpreter<ast.PHPEcho,string>{
    return doInterpreter((storrage,elm) => {
        return to_string(Expression().run(storrage,elm.value))
    })
}

export function TemplateElement():Interpreter<ast.TemplateElement,string>{
    return doInterpreter((storrage,elm) => {
        switch(elm.kind){
            case "HTMLCode":    return HTMLCode().run(storrage,elm)
            case "PHPCode":     return PHPCode().run(storrage,elm)
            case "PHPEcho":     return PHPEcho().run(storrage,elm)
        }
    })
}

export function Template():Interpreter<ast.TemplateElement[],string>{
    return doInterpreter((storrage,elm) => {
        return elm.map(line => TemplateElement().run(storrage,line)).join("")
    })
}