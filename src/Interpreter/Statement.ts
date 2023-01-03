import * as fs from 'fs';
import { interpret } from '.';

import * as ast from "../Ast"
import { parse } from '../Parser';
import { Template, TemplateElement } from "./Document";
import { BreakError, ContinueError, RunTimeError } from "./Error";
import { AssignmentExpression, BooleanExpression, Expression, UpdateExpression } from "./Expression";
import { callRoutine } from "./functions";
import { doInterpreter, Interpreter } from "./Interpreter";

type emptystring = string

export function BlockStatement():Interpreter<ast.BlockStatement,emptystring>{
    return doInterpreter((storrage,elms) => {
        elms.body.forEach(elm => Statement().run(storrage,elm))
        return ""
    })
}

function TemplateInternal():Interpreter<ast.TemplateElement[],string>{
    return doInterpreter((storrage,elm)=>{
        let break_ = false;
        let continue_ = false;
        let ret = ""
        for(var i = 0; i< elm.length;i++){
            try {
                ret+= TemplateElement().run(storrage,elm[i])
            } catch (error) {
                if(error instanceof BreakError){
                    ret += error.value
                    break_ = true;
                    break;
                }
                if(error instanceof ContinueError){
                    ret += error.value
                    continue_ = false;
                    break;
                }
            }
        }
        if(break_)      throw new BreakError(ret)
        if(continue_)   throw new ContinueError(ret)

        return ret
    })
}

export function IfStatement():Interpreter<ast.IfStatement,string>{
    return doInterpreter((storrage,elm) => {
        let test_condition = BooleanExpression().run(storrage,elm.test)
        if(test_condition){
            return TemplateInternal().run(storrage,elm.consequent)
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
            try {
                ret += TemplateInternal().run(storrage,elm.body)
            } catch (error) {
                if(error instanceof BreakError){
                    ret += error.value
                    break;
                }
                if(error instanceof ContinueError){
                    ret += error.value
                    continue;
                }
            }
        }
        //Clear varaibles
        if(elm.init != undefined) storrage.remove(elm.init.left.name)
        
        return ret
    })
}

export function ForEachStatement():Interpreter<ast.ForEachStatement,string>{
    return doInterpreter((storrage,elm) => {
        let obj = Expression().run(storrage,elm.left)
        if(typeof obj != "object") throw new RunTimeError("Can only iterate through an object, or an array", elm.start, elm.end)
        let ret = ""
        Object.entries(obj).every((e) => {
            storrage.store(elm.key.name,e[0])
            storrage.store(elm.value.name,e[1])

            try {
                ret += TemplateInternal().run(storrage,elm.block)
            } catch (error) {
                if(error instanceof BreakError){
                    ret += error.value
                    return false;
                }
                if(error instanceof ContinueError){
                    ret += error.value
                    return true;
                }
            }
            return true;
        })
        //Clear varaibles
        storrage.remove(elm.key.name)
        storrage.remove(elm.value.name)
        return ret
    })
}

export function BreakStatement():Interpreter<ast.BreakStatement,emptystring>{
    throw new BreakError("");
}

export function ContinueStatement():Interpreter<ast.ContinueStatement,emptystring>{
    throw new ContinueError("");
}

export function IncludeStatement():Interpreter<ast.IncludeStatement,string>{
    return doInterpreter((storrage,elm) => {
        let file_name = elm.source.value
        let file;
        try {
            file = fs.readFileSync(file_name,'utf8');

        } catch (error) {
            throw new RunTimeError("Could not find file: '"+file_name+"'",elm.start,elm.end,"Import Statement")
        }
        let ast = parse(file)
        return Template().run(storrage,ast)
    })
}

export function CallStatement():Interpreter<ast.CallStatement,emptystring>{
    return doInterpreter((storrage, elm) => {
        let args = elm.arguments.map(x=>Expression().run(storrage,x))
        callRoutine(storrage,elm.callee,args)
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