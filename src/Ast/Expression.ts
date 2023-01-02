
//--------------------Basics--------------------//

export interface Identifier{
    kind:   "Identifier"
    start:  number,
    end:    number,
    name:   string,
}

export interface MemberExpression{
    kind:   "MemberExpression"
    start:  number,
    end:    number,
    object: Identifier | ArrayExpression | ObjectExpression | MemberExpression
    properties: (NumberLiteral | StringLiteral)[]
}


//--------------------String--------------------//

export interface StringLiteral{
    kind:   "StringLiteral"
    start:  number,
    end:    number,
    value:  string,
}

//--------------------Number--------------------//

export interface NumberLiteral{
    kind:   "NumberLiteral"
    start:  number,
    end:    number,
    value:  number
}

//--------------------Array--------------------//

export interface ArrayExpression{
    kind:       "ArrayExpression"
    start:      number,
    end:        number,
    elements:   Expression[],
}

//--------------------Object--------------------//

export interface Property{
    kind:       "Property"
    start:      number,
    end:        number,
    key:        StringLiteral|NumberLiteral,
    value:      Expression
}

export interface ObjectExpression{
    kind:       "ObjectExpression"
    start:      number,
    end:        number,
    properties:   Property[],
}


//--------------------Boolean--------------------//

export interface BinaryExpression{
    kind:       "BinaryExpression",
    start:      number,
    end:        number,
    left:       Expression
    operator:   string, // ==,===,!=,!==,<,<=,>,>=
    right:      Expression
}

export interface Keyword{
    kind:       "Keyword",
    start:      number,
    end:        number,
    value:      boolean
}

export type BooleanExpression = BinaryExpression | Keyword


//--------------------FunctionCall--------------------//

export interface CallExpression{
    kind:       "CallExpression",
    start:      number,
    end:        number,
    callee:     string //name of the called func,
    arguments:  Expression[]
}

//--------------------Expression--------------------//

export type NonBinaryExpresstion = StringLiteral
                    | NumberLiteral
                    | ArrayExpression
                    | ObjectExpression
                    | Keyword
                    | MemberExpression
                    | Identifier
                    | CallExpression

export type Expression =   StringLiteral
                    | NumberLiteral
                    | ArrayExpression
                    | ObjectExpression
                    | BooleanExpression
                    | MemberExpression
                    | Identifier
                    | CallExpression

//--------------------Special--------------------//

export interface AssignmentExpression{
    kind:       "AssignmentExpression",
    start:      number,
    end:        number,
    left:       Identifier,
    right:      Expression
}

export interface UpdateExpression{
    kind:       "UpdateExpression",
    start:      number,
    end:        number,
    operator:   string,
    argument:   Identifier
}