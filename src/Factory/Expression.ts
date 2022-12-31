import * as ast from "../Ast"

export function createIdentifier(start:number,end:number,name:string):ast.Identifier{
    return {
        kind:   "Identifier",
        start:  start,
        end:    end,
        name:   name,
    }
}

type objectArgument = ast.Identifier | ast.ArrayExpression | ast.ObjectExpression | ast.MemberExpression
type propertyArgument = ast.NumberLiteral | ast.StringLiteral
export function createMemberExpression(start:number,end:number,object:objectArgument,property:propertyArgument):ast.MemberExpression{
    return {
        kind:       "MemberExpression",
        start:      start,
        end:        end,
        object:     object,
        property:   property
    }
}

export function createStringLiteral(start:number,end:number,value:string):ast.StringLiteral{
    return {
        kind:       "StringLiteral",
        start:      start,
        end:        end,
        value:      value
    }
}

export function createNumberLiteral(start:number,end:number,value:number):ast.NumberLiteral{
    return {
        kind:       "NumberLiteral",
        start:      start,
        end:        end,
        value:      value
    }
}

export function createArrayExpression(start:number,end:number,elements:ast.Expression[]):ast.ArrayExpression{
    return {
        kind:       "ArrayExpression",
        start:      start,
        end:        end,
        elements:   elements
    }
}

export function createProperty(start:number,end:number,key:ast.Identifier,value:ast.Expression):ast.Property{
    return {
        kind:       "Property",
        start:      start,
        end:        end,
        key:        key,
        value:      value
    }
}

export function createObjectExpression(start:number,end:number,properties:ast.Property[]):ast.ObjectExpression{
    return {
        kind:       "ObjectExpression",
        start:      start,
        end:        end,
        properties: properties
    }
}

export function createBinaryExpression(start:number,end:number,left:ast.Expression,operator:string,right:ast.Expression):ast.BinaryExpression{
    return {
        kind:       "BinaryExpression",
        start:      start,
        end:        end,
        left:       left,
        operator:   operator,
        right:      right
    }
}

export function createKeyword(start:number,end:number,value:boolean):ast.Keyword{
    return {
        kind:       "Keyword",
        start:      start,
        end:        end,
        value:      value,
    }
}

export function createCallExpression(start:number,end:number,callee:ast.Identifier,args:ast.Expression[]):ast.CallExpression{
    return {
        kind:       "CallExpression",
        start:      start,
        end:        end,
        callee:     callee,
        arguments:  args
    }
}

export function createAssignmentExpression(start:number,end:number,left:ast.Identifier,right:ast.Identifier):ast.AssignmentExpression{
    return {
        kind:       "AssignmentExpression",
        start:      start,
        end:        end,
        left:       left,
        right:      right
    }
}

export function createUpdateExpression(start:number,end:number,operator:string,argument:ast.Identifier):ast.UpdateExpression{
    return {
        kind:       "UpdateExpression",
        start:      start,
        end:        end,
        operator:   operator,
        argument:   argument
    }
}
