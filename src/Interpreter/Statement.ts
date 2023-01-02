import * as ast from "../Ast"
import { createAssignmentExpression, createBinaryExpression, createBreakStatement, createForStatement, createIdentifier, createNumberLiteral, createPHPCode, createStringLiteral, createUpdateExpression } from "../Factory";
import { TemplateElement } from "./Document";
import { BreakError, ContinueError, RunTimeError } from "./Error";
import { AssignmentExpression, BooleanExpression, Expression, UpdateExpression } from "./Expression";
import { doInterpreter, Interpreter, VariableStorrage } from "./Interpreter";

type emptystring = string

export function BlockStatement():Interpreter<ast.BlockStatement,emptystring>{
    return doInterpreter((storrage,elms) => {
        elms.body.forEach(elm => Statement().run(storrage,elm))
        return ""
    })
}

export function IfStatement():Interpreter<ast.IfStatement,string>{
    return doInterpreter((storrage,elm) => {
        let test_condition = BooleanExpression().run(storrage,elm.test)
        if(test_condition){
            return elm.consequent.map(line => TemplateElement().run(storrage,line)).join("")
        }
        if(elm.alternate != undefined) return elm.alternate.map(line => TemplateElement().run(storrage,line)).join("")
        return ""
    })
}

export function ForStatement():Interpreter<ast.ForStatement,string>{
    return doInterpreter((storrage,elm) => {
        if(elm.init != undefined) AssignmentExpression().run(storrage,elm.init)
        let ret = ""
        while(true){
            if(elm.test != undefined){
                let test_condition = BooleanExpression().run(storrage,elm.test)
                if(!test_condition) break;
            }
            if(elm.update != undefined){
                UpdateExpression().run(storrage,elm.update)
            }
            let break_ = false;
            for(var i = 0; i< elm.body.length;i++){
                try {
                    ret+= TemplateElement().run(storrage,elm.body[i])
                } catch (error) {
                    if(error instanceof BreakError){
                        break_ = true;
                        break;
                    }
                    if(error instanceof ContinueError){
                        break;
                    }
                }
            }
            if(break_) break;
        }
        return ret
    })
}

export function ForEachStatement():Interpreter<ast.ForEachStatement,string>{
    return doInterpreter((storrage,elm) => {
        let obj = Expression().run(storrage,elm.left)
        if(typeof obj != "object") throw new RunTimeError("Can only iterate through an object, or an array", elm.start, elm.end)
        let ret = ""
        Object.entries(obj).every((e,key) => {
            storrage.store(elm.key.name,key)
            storrage.store(elm.value.name,e)

            let break_ = false;
            for(var i = 0; i< elm.block.length;i++){
                try {
                    ret+= TemplateElement().run(storrage,elm.block[i])
                } catch (error) {
                    if(error instanceof BreakError){
                        break_ = true;
                        break;
                    }
                    if(error instanceof ContinueError){
                        break;
                    }
                }
            }
            if(break_) return false;
            return true;
        })
        
        return ret
    })
}

export function BreakStatement():Interpreter<ast.BreakStatement,emptystring>{
    throw new BreakError();
}

export function ContinueStatement():Interpreter<ast.ContinueStatement,emptystring>{
    throw new ContinueError();
}

export function IncludeStatement():Interpreter<ast.IncludeStatement,string>{
    return doInterpreter((storrage,elm) => {
        /*TODO*/
        return ""
    })
}

export function CallStatement():Interpreter<ast.CallStatement,emptystring>{
    return doInterpreter((storrage,elm) => {
        /*TODO*/
        return ""
    })
}

export function Statement():Interpreter<ast.Statement,string>{
    return doInterpreter((storrage, elm) => {
        switch (elm.kind) {
            case "BreakStatement":      return BreakStatement().run(storrage, elm)
            case "CallStatement":       return CallStatement().run(storrage, elm)
            case "ContinueStatement":   return ContinueStatement().run(storrage, elm)
            case "ForEachStatement":    return ForEachStatement().run(storrage, elm)
            case "ForStatement":        return ForStatement().run(storrage, elm)
            case "IfStatement":         return IfStatement().run(storrage, elm)
            case "IncludeStatement":    return IncludeStatement().run(storrage, elm)
        }
    })
}
/*
console.log(JSON.stringify(ForStatement().run(new VariableStorrage(),
    createForStatement(0,0,
        [createPHPCode(0,0,createBreakStatement(0,0))],
        createAssignmentExpression(0,0,createIdentifier(0,0,"i"),createNumberLiteral(0,0,0)),
        createBinaryExpression(0,0,createIdentifier(0,0,"i"),"<=",createNumberLiteral(0,0,4)),
        createUpdateExpression(0,0,"++",createIdentifier(0,0,"i"))
    )

),null,2))
*/