import { BlockStatement, ExpressionStatement } from "./Statement"

export interface HTMLCode{
    kind:       "HTMLCode",
    start:      number,
    end:        number,
    value:      string
}

export interface PHPCode{
    kind:       "PHPCode",
    start:      number,
    end:        number,
    value:      BlockStatement
}

export interface PHPEcho{
    kind:       "PHPEcho",
    start:      number,
    end:        number,
    value:      ExpressionStatement
}