import { anyChar, choice, doParser, fail, manyTill, Parser, State, string } from "ts-parser-combinator"
import * as factory from "../Factory"
import * as ast from "../Ast"

import { whitepsace } from "./Utils"
import { BlockStatement, Statement } from "./Statement"
import { Expression } from "./Expression"


export function HTMLCode():Parser<ast.HTMLCode>{
    return doParser((s,start,end) => {
        let value_array:string[] = manyTill(anyChar(),string("<?")).parse(s)
        let value:string = value_array.join("")

        if(value.length == 0) fail(s,"","").parse(s)

        return factory.createHTMLCode(start(),end(),value)
    })
}

export function PHPCode():Parser<ast.PHPCode>{
    return doParser((s)=>{
        let start_pos = s.position

        string("<?php").parse(s)
        whitepsace().many1().parse(s)
        
        let value = BlockStatement().parse(s)
        whitepsace().many().parse(s)
        if(s.unconsumed.length != 0){
            string("?>").parse(s)
        }

        let end_pos = s.position
        return factory.createPHPCode(start_pos,end_pos,value)
    })
}

export function PHPEcho():Parser<ast.PHPEcho>{
    return doParser((s)=>{
        let start_pos = s.position

        string("<?=").parse(s)
        whitepsace().many().parse(s)

        let value = Expression().parse(s)

        whitepsace().many().parse(s)
        string("?>").parse(s)

        let end_pos = s.position
        return factory.createPhpEcho(start_pos,end_pos,value)
    })
}

export function TemplateElement():Parser<ast.TemplateElement>{
    return choice([
        HTMLCode()  as Parser<ast.TemplateElement>,
        PHPCode()   as Parser<ast.TemplateElement>,
        PHPEcho()   as Parser<ast.TemplateElement>
    ])
}

export function Template():Parser<ast.TemplateElement[]>{
    return TemplateElement().many1()
}