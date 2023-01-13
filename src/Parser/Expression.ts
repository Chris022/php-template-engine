import { anyChar, between, choice, chooseBest, digit, doParser, letter, manyTill, Parser, sepBy, State, string } from "ts-parser-combinator"
import * as factory from "../Factory"
import * as ast from "../Ast"
import { grouped, space, whitepsace } from "./Utils"

export function Identifier(): Parser<ast.Identifier> {
    return doParser((s, start, end) => {

        string("$").parse(s)
        let value = letter().manyc1().parse(s)

        return factory.createIdentifier(start(), end(), value)
    })
}

export function MemberExpression():Parser<ast.MemberExpression>{
    return doParser((s, start, end) => {

        let object = Identifier()
                        .or(ArrayExpression())
                        .or(ObjectExpression())
                        .or(string("(").right(MemberExpression()).left(string(")"))).parse(s)

        let properties = doParser((s2)=>{
            string("[").parse(s2)
            let property = NumberLiteral().or(StringLiteral()).parse(s2)
            string("]").parse(s2)
            return property
        }).many1().parse(s)

        return factory.createMemberExpression(start(), end(), object, properties)
    })
}

export function StringLiteral(): Parser<ast.StringLiteral> {
    return doParser((s, start, end) => {

        let value = between(
            string('"'),
            string('"'),
            manyTill(anyChar(),string('"')),
        ).parse(s)
        let joined = value.join("")

        return factory.createStringLiteral(start(), end(), joined)
    })
}

export function NumberLiteral(): Parser<ast.NumberLiteral> {
    return doParser((s, start, end) => {

        let a = digit().manyc1().parse(s)
        let b = string(".").defaultValue(".").parse(s)
        let c = digit().manyc().defaultValue("0").parse(s)
        let number = parseFloat(a+b+c)

        return factory.createNumberLiteral(start(), end(), number)
    })
}


export function ArrayExpression(): Parser<ast.ArrayExpression> {
    return doParser((s, start, end) => {

        string("[").parse(s)
        whitepsace().many().parse(s)

        let value = sepBy(TrimmedExpression(),string(",")).parse(s)

        whitepsace().many().parse(s)
        string("]").parse(s)

        return factory.createArrayExpression(start(), end(), value)
    })
}

let TrimmedProperty = () => between(space(),space(),Property())
export function Property(): Parser<ast.Property> {
    return doParser((s, start, end) => {

        let key = StringLiteral().or(NumberLiteral()).parse(s)
        space().parse(s)
        string("=>").parse(s)
        space().parse(s)
        let value = Expression().parse(s)

        return factory.createProperty(start(), end(), key, value)
    })
} 

export function ObjectExpression(): Parser<ast.ObjectExpression> {
    return doParser((s, start, end) => {

        string("[").parse(s)
        space().parse(s)

        let value = sepBy(TrimmedProperty(),string(",")).parse(s)

        space().parse(s)
        string("]").parse(s)

        return factory.createObjectExpression(start(), end(), value)
    })
}

let BinaryExpressionArgument = () => NonBinaryExpresstion().or(doParser((s2)=>{
    string("(").parse(s2)
    space().parse(s2)
    let value = Expression().parse(s2);
    space().parse(s2)
    string(")").parse(s2)
    return value
}))

export function BinaryExpression(): Parser<ast.BinaryExpression> {
    return doParser((s, start, end) => {
        let left = BinaryExpressionArgument().parse(s)
        space().parse(s)
        let operator = choice([
            string("=="),
            string("<"),
            string(">"),
            string("<="),
            string(">="),
            string("!="),
            string("!==")
        ]).parse(s)
        space().parse(s)
        let right = BinaryExpressionArgument().parse(s)

        return factory.createBinaryExpression(start(), end(), left, operator, right)
    })
}

export function Keyword(): Parser<ast.Keyword> {
    return doParser((s, start, end) => {

        let value = choice([
            string("True"),
            string("False")
        ]).parse(s)
        let bool = false
        if(value == "True") bool = true
        else if(value == "False") bool = false

        return factory.createKeyword(start(), end(), bool)
    })
}

export function BooleanExpression(): Parser<ast.BooleanExpression> {
    return chooseBest([
        Keyword()           as Parser<ast.Keyword>,
        BinaryExpression()  as Parser<ast.BooleanExpression>,
    ])
}

export function CallExpression():Parser<ast.CallExpression>{
    return doParser((s, start, end) => {

        let callee = letter().manyc1().parse(s)
        string("(").parse(s)
        let args = sepBy(TrimmedExpression(),string(",")).parse(s)
        string(")").parse(s)

        return factory.createCallExpression(start(), end(), callee, args)
    })
}

let TrimmedExpression = () => between(space(),space(),Expression())
//Expression has to try every parser and choose the one that parses the most characters!!
export function Expression(): Parser<ast.Expression> {
    return grouped(
        choice([
            //Start with clearly distinguishable elements
            Identifier()        as Parser<ast.Expression>, //starts with a $
            StringLiteral()     as Parser<ast.Expression>, //starts with a "
            NumberLiteral()     as Parser<ast.Expression>, //starts with a Digit
            ArrayExpression()   as Parser<ast.Expression>, //starts with [
            ObjectExpression()  as Parser<ast.Expression>, //starts with [

            CallExpression()    as Parser<ast.Expression>, //starts with a name followed by (

            MemberExpression()  as Parser<ast.Expression>, //Also starts with an Array, Object or Member
            BooleanExpression() as Parser<ast.Expression>, //Starts with an Expression
        ])
    )
}

export function NonBinaryExpresstion(): Parser<ast.NonBinaryExpresstion> {
    return grouped(
        choice([
            //Start with clearly distinguishable elements
            Identifier()        as Parser<ast.NonBinaryExpresstion>, //starts with a $
            StringLiteral()     as Parser<ast.NonBinaryExpresstion>, //starts with a "
            NumberLiteral()     as Parser<ast.NonBinaryExpresstion>, //starts with a Digit
            ArrayExpression()   as Parser<ast.NonBinaryExpresstion>, //starts with [
            ObjectExpression()  as Parser<ast.NonBinaryExpresstion>, //starts with [

            CallExpression()    as Parser<ast.NonBinaryExpresstion>, //starts with a name followed by (
            Keyword()           as Parser<ast.NonBinaryExpresstion>, //starts with a name followed by (

            MemberExpression()  as Parser<ast.NonBinaryExpresstion> //Also starts with an Array, Object or Member
        ])
    )
}

export function AssignmentExpression():Parser<ast.AssignmentExpression>{
    return doParser((s, start, end) => {

        let to = Identifier().parse(s)
        space().parse(s)
        string("=").parse(s)
        space().parse(s)
        let value = Expression().parse(s)

        return factory.createAssignmentExpression(start(), end(), to, value)
    })
}

export function UpdateExpression():Parser<ast.UpdateExpression>{
    return doParser((s, start, end) => {

        let value = Identifier().parse(s)
        space().parse(s)
        let operator = choice([
            string("++"),
            string("--")
        ]).parse(s)

        return factory.createUpdateExpression(start(), end(), operator, value)
    })
}