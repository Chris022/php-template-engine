import * as ast from "../Ast"
import { createArrayExpression, createMemberExpression, createNumberLiteral, createObjectExpression, createProperty, createStringLiteral } from "../Factory";
import { RunTimeError } from "./Error";
import { callFunction } from "./functions";
import { doInterpreter, Interpreter, VariableStorrage } from "./Interpreter";
import { Equal, Identical, NumberComparision } from "./operator";
import { expression } from "./types";

export function Identifier(): Interpreter<ast.Identifier, expression> {
    return doInterpreter((storrage, elm) => {
        let value = storrage.get(elm.name)
        if (value == undefined) throw new RunTimeError("Undefined Varaible: " + elm.name, elm.start, elm.end)
        return value
    })
}

export function NumberLiteral(): Interpreter<ast.NumberLiteral, number> {
    return doInterpreter((storrage, elm) => {
        return elm.value;
    })
}

export function StringLiteral(): Interpreter<ast.StringLiteral, string> {
    return doInterpreter((storrage, elm) => {
        return elm.value;
    })
}

export function ArrayExpression(): Interpreter<ast.ArrayExpression, expression[]> {
    return doInterpreter((storrage, elm) => {
        return elm.elements.map(x => Expression().run(storrage, x))
    })
}

export function Property(): Interpreter<ast.Property, [string | number, expression]> {
    return doInterpreter((storrage, elm) => {
        let key = null;
        let value = null;
        switch (elm.key.kind) {
            case "NumberLiteral": key = NumberLiteral().run(storrage, elm.key as ast.NumberLiteral); break
            case "StringLiteral": key = StringLiteral().run(storrage, elm.key as ast.StringLiteral); break
        }
        value = Expression().run(storrage, elm.value)
        return [key, value]
    })
}

export function ObjectExpression(): Interpreter<ast.ObjectExpression, { [index: string | number]: expression }> {
    return doInterpreter((storrage, elm) => {
        let object = {} as { [index: string | number]: expression }
        elm.properties.forEach(property => {
            let property_value = Property().run(storrage, property)
            object[property_value[0]] = property_value[1]
        })
        return object
    })
}

export function BinaryExpression(): Interpreter<ast.BinaryExpression, boolean> {
    return doInterpreter((storrage, elm) => {
        let operant1 = Expression().run(storrage, elm.left)
        let operant2 = Expression().run(storrage, elm.right)
        let operator: string = elm.operator
        switch (operator) {
            case "==": return Equal(operant1, operant2)
            case "!=": return Equal(operant1, operant2)
            case "===": return Identical(operant1, operant2)
            case "!==": return !Identical(operant1, operant2)
        }
        let val = NumberComparision(operator, operant1, operant2)
        if (val == undefined) throw new RunTimeError(
            "Can only compare Numbers with Operators: <,<=,>,>=",
            elm.start, elm.end
        )
        return val
    })

}

export function Keyword(): Interpreter<ast.Keyword, boolean> {
    return doInterpreter((storrage, elm) => {
        return elm.value
    })
}

export function BooleanExpression(): Interpreter<ast.BooleanExpression, boolean> {
    return doInterpreter((storrage, elm) => {
        switch (elm.kind) {
            case "Keyword": return Keyword().run(storrage, elm)
            case "BinaryExpression": return BinaryExpression().run(storrage, elm)
        }
    })
}

export function MemberExpression(): Interpreter<ast.MemberExpression, expression> {
    return doInterpreter((storrage, elm) => {
        let obj;
        switch (elm.object.kind) {
            case "ArrayExpression": obj = ArrayExpression().run(storrage, elm.object); break;
            case "ObjectExpression": obj = ObjectExpression().run(storrage, elm.object); break;
            case "Identifier": obj = Identifier().run(storrage, elm.object); break;
            case "MemberExpression": obj = MemberExpression().run(storrage, elm.object); break;
        }
        let value: expression = obj
        elm.properties.forEach(property => {
            if (typeof value != "object") throw new RunTimeError("Can only access value of an object, or an array", elm.start, elm.end)
            let key: string | number = ""
            switch (property.kind) {
                case "NumberLiteral": key = NumberLiteral().run(storrage, property); break;
                case "StringLiteral": key = StringLiteral().run(storrage, property); break;
            }


            if (Array.isArray(value)) {
                if (typeof key != "number") throw new Error()
                if (!Object.keys(value).includes(key+"")) {
                    throw new RunTimeError("Index: '" + key + "' not defined", elm.start, elm.end)
                }
                value = value[key];
            } else {
                if (!Object.keys(value).includes(key+"")) {
                    throw new RunTimeError("Index: '" + key + "' not defined", elm.start, elm.end)
                }
                value = value[key];
            }

        })

        return value
    })
}


export function CallExpression(): Interpreter<ast.CallExpression,expression> {
    return doInterpreter((storrage, elm) => {
        let args = elm.arguments.map(x=>Expression().run(storrage,x))
        return callFunction(elm.callee,args)
    })
}

export function Expression(): Interpreter<ast.Expression, expression> {
    return doInterpreter((storrage, elm) => {
        switch (elm.kind) {
            case "StringLiteral": return StringLiteral().run(storrage, elm)
            case "NumberLiteral": return NumberLiteral().run(storrage, elm)
            case "ArrayExpression": return ArrayExpression().run(storrage, elm)
            case "ObjectExpression": return ObjectExpression().run(storrage, elm)
            case "BinaryExpression": return BinaryExpression().run(storrage, elm)
            case "Keyword": return Keyword().run(storrage, elm)
            case "Identifier": return Identifier().run(storrage, elm)
            case "MemberExpression": return MemberExpression().run(storrage, elm)
            case "CallExpression": return CallExpression().run(storrage, elm) 
        }
    })
}

export function AssignmentExpression(): Interpreter<ast.AssignmentExpression, expression> {
    return doInterpreter((storrage, elm) => {
        let value = Expression().run(storrage, elm.right)
        storrage.store(elm.left.name, value)
        return value
    })
}

export function UpdateExpression(): Interpreter<ast.UpdateExpression, expression> {
    return doInterpreter((storrage, elm) => {
        let value = Identifier().run(storrage, elm.argument)
        if (typeof value != "number") throw new RunTimeError("Can only update number values", elm.start, elm.end)
        switch (elm.operator) {
            case "++": value++; break;
            case "--": value--; break;
        }
        storrage.store(elm.argument.name, value)
        return value
    })
}