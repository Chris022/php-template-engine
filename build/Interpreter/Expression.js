"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpression = exports.AssignmentExpression = exports.Expression = exports.CallExpression = exports.MemberExpression = exports.BooleanExpression = exports.Keyword = exports.BinaryExpression = exports.ObjectExpression = exports.Property = exports.ArrayExpression = exports.StringLiteral = exports.NumberLiteral = exports.Identifier = void 0;
const Error_1 = require("./Error");
const functions_1 = require("./functions");
const Interpreter_1 = require("./Interpreter");
const operator_1 = require("./operator");
function Identifier() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let value = storrage.get(elm.name);
        if (value == undefined)
            throw new Error_1.RunTimeError("Undefined Varaible: " + elm.name, elm.start, elm.end);
        return value;
    });
}
exports.Identifier = Identifier;
function NumberLiteral() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return elm.value;
    });
}
exports.NumberLiteral = NumberLiteral;
function StringLiteral() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return elm.value;
    });
}
exports.StringLiteral = StringLiteral;
function ArrayExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return elm.elements.map(x => Expression().run(storrage, x));
    });
}
exports.ArrayExpression = ArrayExpression;
function Property() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let key = null;
        let value = null;
        switch (elm.key.kind) {
            case "NumberLiteral":
                key = NumberLiteral().run(storrage, elm.key);
                break;
            case "StringLiteral":
                key = StringLiteral().run(storrage, elm.key);
                break;
        }
        value = Expression().run(storrage, elm.value);
        return [key, value];
    });
}
exports.Property = Property;
function ObjectExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let object = {};
        elm.properties.forEach(property => {
            let property_value = Property().run(storrage, property);
            object[property_value[0]] = property_value[1];
        });
        return object;
    });
}
exports.ObjectExpression = ObjectExpression;
function BinaryExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let operant1 = Expression().run(storrage, elm.left);
        let operant2 = Expression().run(storrage, elm.right);
        let operator = elm.operator;
        switch (operator) {
            case "==": return (0, operator_1.Equal)(operant1, operant2);
            case "!=": return (0, operator_1.Equal)(operant1, operant2);
            case "===": return (0, operator_1.Identical)(operant1, operant2);
            case "!==": return !(0, operator_1.Identical)(operant1, operant2);
        }
        let val = (0, operator_1.NumberComparision)(operator, operant1, operant2);
        if (val == undefined)
            throw new Error_1.RunTimeError("Can only compare Numbers with Operators: <,<=,>,>=", elm.start, elm.end);
        return val;
    });
}
exports.BinaryExpression = BinaryExpression;
function Keyword() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return elm.value;
    });
}
exports.Keyword = Keyword;
function BooleanExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        switch (elm.kind) {
            case "Keyword": return Keyword().run(storrage, elm);
            case "BinaryExpression": return BinaryExpression().run(storrage, elm);
        }
    });
}
exports.BooleanExpression = BooleanExpression;
function MemberExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let obj;
        switch (elm.object.kind) {
            case "ArrayExpression":
                obj = ArrayExpression().run(storrage, elm.object);
                break;
            case "ObjectExpression":
                obj = ObjectExpression().run(storrage, elm.object);
                break;
            case "Identifier":
                obj = Identifier().run(storrage, elm.object);
                break;
            case "MemberExpression":
                obj = MemberExpression().run(storrage, elm.object);
                break;
        }
        let value = obj;
        elm.properties.forEach(property => {
            if (typeof value != "object")
                throw new Error_1.RunTimeError("Can only access value of an object, or an array", elm.start, elm.end);
            let key = "";
            switch (property.kind) {
                case "NumberLiteral":
                    key = NumberLiteral().run(storrage, property);
                    break;
                case "StringLiteral":
                    key = StringLiteral().run(storrage, property);
                    break;
            }
            if (Array.isArray(value)) {
                if (typeof key != "number")
                    throw new Error();
                if (!Object.keys(value).includes(key + "")) {
                    throw new Error_1.RunTimeError("Index: '" + key + "' not defined", elm.start, elm.end);
                }
                value = value[key];
            }
            else {
                if (!Object.keys(value).includes(key + "")) {
                    throw new Error_1.RunTimeError("Index: '" + key + "' not defined", elm.start, elm.end);
                }
                value = value[key];
            }
        });
        return value;
    });
}
exports.MemberExpression = MemberExpression;
function CallExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let args = elm.arguments.map(x => Expression().run(storrage, x));
        try {
            return (0, functions_1.callFunction)(storrage, elm.callee, args);
        }
        catch (error) {
            if (error instanceof Error_1.RunTimeError) {
                throw new Error_1.RunTimeError(error.message, elm.start, elm.end);
            }
            throw error;
        }
    });
}
exports.CallExpression = CallExpression;
function Expression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        switch (elm.kind) {
            case "StringLiteral": return StringLiteral().run(storrage, elm);
            case "NumberLiteral": return NumberLiteral().run(storrage, elm);
            case "ArrayExpression": return ArrayExpression().run(storrage, elm);
            case "ObjectExpression": return ObjectExpression().run(storrage, elm);
            case "BinaryExpression": return BinaryExpression().run(storrage, elm);
            case "Keyword": return Keyword().run(storrage, elm);
            case "Identifier": return Identifier().run(storrage, elm);
            case "MemberExpression": return MemberExpression().run(storrage, elm);
            case "CallExpression": return CallExpression().run(storrage, elm);
        }
    });
}
exports.Expression = Expression;
function AssignmentExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let value = Expression().run(storrage, elm.right);
        storrage.store(elm.left.name, value);
        return value;
    });
}
exports.AssignmentExpression = AssignmentExpression;
function UpdateExpression() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let value = Identifier().run(storrage, elm.argument);
        if (typeof value != "number")
            throw new Error_1.RunTimeError("Can only update number values", elm.start, elm.end);
        switch (elm.operator) {
            case "++":
                value++;
                break;
            case "--":
                value--;
                break;
        }
        storrage.store(elm.argument.name, value);
        return value;
    });
}
exports.UpdateExpression = UpdateExpression;
