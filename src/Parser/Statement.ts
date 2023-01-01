import { anyChar, choice, doParser, manyTill, Parser, State, string } from "ts-parser-combinator"
import * as factory from "../Factory"
import * as ast from "../Ast"
import { whitepsace } from "./Utils"
import { createIdentifier } from "../Factory"

export function BlockStatement():Parser<ast.BlockStatement>{
    return doParser((s) => {
        let start_pos = s.position

        //TODO IMplement propper parsing!

        let end_pos = s.position
        return factory.createBlockStatement(start_pos,end_pos,[])
    })
}


export function ExpressionStatement():Parser<ast.ExpressionStatement>{
    return doParser((s) => {
        let start_pos = s.position

        //TODO Implement propper parsing!

        let end_pos = s.position
        return factory.createExpressionStatement(start_pos,end_pos,createIdentifier(0,0,"test"))
    })
}