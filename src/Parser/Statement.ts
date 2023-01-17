import { anyChar, between, choice, doParser, letter, manyTill, Parser, sepBy, State, string } from "ts-parser-combinator"
import * as factory from "../Factory"
import * as ast from "../Ast"
import { createIdentifier } from "../Factory"
import { space } from "./Utils"
import { ArrayExpression, AssignmentExpression, BooleanExpression, Expression, Identifier, ObjectExpression, StringLiteral, UpdateExpression } from "./Expression"
import { TemplateElement } from "./Document"

export function IfStatement():Parser<ast.IfStatement>{
    return doParser((s,start,end) => {

        string("if")
            .right(space())
            .right(string("("))
            .right(space()).parse(s)

        let test_condition = BooleanExpression().parse(s)

        space()
            .right(string(")"))
            .right(space())
            .right(string(":"))
            .right(space())
            .right(string("?>")).parse(s)

        let consequent = TemplateElement().many().parse(s)

        let alternate = string("<?php")
                            .right(space())
                            .right(string("else"))
                            .right(space())
                            .right(string(":"))
                            .right(space())
                            .right(string("?>"))
                            .right(TemplateElement().many())
                            .optional().parse(s)

        string("<?php").parse(s)
        space().parse(s)
        string("endif").parse(s)
        string(";").optional().parse(s)

        if(alternate == undefined) return factory.createIfStatement(start(),end(),test_condition,consequent)
        return factory.createIfStatement(start(),end(),test_condition,consequent,alternate)
    })
}

export function ForStatement():Parser<ast.ForStatement>{
    return doParser((s,start,end) => {

        string("for")
            .right(space())
            .right(string("("))
            .right(space()).parse(s)

        let init = AssignmentExpression().optional().parse(s)
        space().right(string(";")).right(space()).parse(s)
        console.log("got to boolean")
        let test = BooleanExpression().optional().parse(s)
        console.log("got after boolean")
        space().right(string(";")).right(space()).parse(s)

        let update = UpdateExpression().optional().parse(s)

        space()
            .right(string(")"))
            .right(space())
            .right(string(":"))
            .right(space())
            .right(string("?>")).parse(s)

        let body = TemplateElement().many().parse(s)

        string("<?php").parse(s)
        space().parse(s)
        string("endfor").parse(s)
        string(";").optional().parse(s)

        return factory.createForStatement(start(),end(),
            body,
            init!=undefined?init:undefined,
            test!=undefined?test:undefined,
            update!=undefined?update:undefined,
        )
    })
}

export function ForEachStatement():Parser<ast.ForEachStatement>{
    return doParser((s,start,end) => {

        string("foreach")
            .right(space())
            .right(string("("))
            .right(space()).parse(s)

        let left = Identifier()
                    .or(ArrayExpression())
                    .or(ObjectExpression()).parse(s)

        space()
            .right(string("as"))
            .right(space()).parse(s)

        let key = Identifier().parse(s)

        space()
            .right(string("=>"))
            .right(space()).parse(s)

        let value = Identifier().parse(s)

        space()
            .right(string(")"))
            .right(space())
            .right(string(":"))
            .right(space())
            .right(string("?>")).parse(s)

        let body = TemplateElement().many().parse(s)

        string("<?php").parse(s)
        space().parse(s)
        string("endforeach").parse(s)
        string(";").optional().parse(s)

        return factory.createForEachStatement(start(),end(),left,key,value,body)
    })
}

export function BreakStatement():Parser<ast.BreakStatement>{
    return doParser((s,start,end) => {
        string("break").parse(s)
        string(";").optional().parse(s)
        return factory.createBreakStatement(start(),end())
    })
}

export function ContinueStatement():Parser<ast.ContinueStatement>{
    return doParser((s,start,end) => {
        string("continue").parse(s)
        string(";").optional().parse(s)
        return factory.createContinueStatement(start(),end())
    })
}

export function IncludeStatement():Parser<ast.IncludeStatement>{
    return doParser((s,start,end) => {
        
        string("include").parse(s)
        space().parse(s)
        let file = StringLiteral().parse(s)

        return factory.createIncludeStatement(start(),end(),file)
    })
}

export function CallStatement():Parser<ast.CallStatement>{
    return doParser((s, start, end) => {

        let callee = letter().or(string("_")).manyc1().parse(s)
        string("(").parse(s)
        let args = sepBy(between(space(),space(),Expression()),string(",")).parse(s)
        string(")").parse(s)
        string(";").optional().parse(s)

        return factory.createCallStatement(start(), end(), callee, args)
    })
}

export function Statement():Parser<ast.Statement>{
    return choice([
        IfStatement()       as Parser<ast.Statement>,
        ForEachStatement()  as Parser<ast.Statement>,
        ForStatement()      as Parser<ast.Statement>,
        ContinueStatement() as Parser<ast.Statement>,
        BreakStatement()    as Parser<ast.Statement>,
        IncludeStatement()  as Parser<ast.Statement>,
        CallStatement()     as Parser<ast.Statement>
    ])
}

export function BlockStatement():Parser<ast.BlockStatement>{
    return doParser((s,start,end) => {
        
        let statements = Statement().left(string(";")).many().parse(s)

        return factory.createBlockStatement(start(),end(),statements)
    })
}

