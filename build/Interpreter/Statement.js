"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = exports.CallStatement = exports.IncludeStatement = exports.ContinueStatement = exports.BreakStatement = exports.ForEachStatement = exports.ForStatement = exports.IfStatement = exports.BlockStatement = void 0;
const fs = __importStar(require("fs"));
const Parser_1 = require("../Parser");
const Document_1 = require("./Document");
const Error_1 = require("./Error");
const Expression_1 = require("./Expression");
const functions_1 = require("./functions");
const Interpreter_1 = require("./Interpreter");
function BlockStatement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elms) => {
        elms.body.forEach(elm => Statement().run(storrage, elm));
        return "";
    });
}
exports.BlockStatement = BlockStatement;
function TemplateInternal() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let break_ = false;
        let continue_ = false;
        let ret = "";
        for (var i = 0; i < elm.length; i++) {
            try {
                ret += (0, Document_1.TemplateElement)().run(storrage, elm[i]);
            }
            catch (error) {
                if (error instanceof Error_1.BreakError) {
                    ret += error.value;
                    break_ = true;
                    break;
                }
                if (error instanceof Error_1.ContinueError) {
                    ret += error.value;
                    continue_ = false;
                    break;
                }
            }
        }
        if (break_)
            throw new Error_1.BreakError(ret);
        if (continue_)
            throw new Error_1.ContinueError(ret);
        return ret;
    });
}
function IfStatement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let test_condition = (0, Expression_1.BooleanExpression)().run(storrage, elm.test);
        if (test_condition) {
            return TemplateInternal().run(storrage, elm.consequent);
        }
        if (elm.alternate != undefined)
            return elm.alternate.map(line => (0, Document_1.TemplateElement)().run(storrage, line)).join("");
        return "";
    });
}
exports.IfStatement = IfStatement;
function ForStatement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        if (elm.init != undefined)
            (0, Expression_1.AssignmentExpression)().run(storrage, elm.init);
        let ret = "";
        while (true) {
            if (elm.test != undefined) {
                let test_condition = (0, Expression_1.BooleanExpression)().run(storrage, elm.test);
                if (!test_condition)
                    break;
            }
            if (elm.update != undefined) {
                (0, Expression_1.UpdateExpression)().run(storrage, elm.update);
            }
            try {
                ret += TemplateInternal().run(storrage, elm.body);
            }
            catch (error) {
                if (error instanceof Error_1.BreakError) {
                    ret += error.value;
                    break;
                }
                if (error instanceof Error_1.ContinueError) {
                    ret += error.value;
                    continue;
                }
            }
        }
        //Clear varaibles
        if (elm.init != undefined)
            storrage.remove(elm.init.left.name);
        return ret;
    });
}
exports.ForStatement = ForStatement;
function ForEachStatement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let obj = (0, Expression_1.Expression)().run(storrage, elm.left);
        if (typeof obj != "object")
            throw new Error_1.RunTimeError("Can only iterate through an object, or an array", elm.start, elm.end);
        let ret = "";
        Object.entries(obj).every((e) => {
            storrage.store(elm.key.name, e[0]);
            storrage.store(elm.value.name, e[1]);
            try {
                ret += TemplateInternal().run(storrage, elm.block);
            }
            catch (error) {
                if (error instanceof Error_1.BreakError) {
                    ret += error.value;
                    return false;
                }
                if (error instanceof Error_1.ContinueError) {
                    ret += error.value;
                    return true;
                }
            }
            return true;
        });
        //Clear varaibles
        storrage.remove(elm.key.name);
        storrage.remove(elm.value.name);
        return ret;
    });
}
exports.ForEachStatement = ForEachStatement;
function BreakStatement() {
    throw new Error_1.BreakError("");
}
exports.BreakStatement = BreakStatement;
function ContinueStatement() {
    throw new Error_1.ContinueError("");
}
exports.ContinueStatement = ContinueStatement;
function IncludeStatement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let file_name = elm.source.value;
        let file;
        try {
            file = fs.readFileSync(file_name, 'utf8');
        }
        catch (error) {
            throw new Error_1.RunTimeError("Could not find file: '" + file_name + "'", elm.start, elm.end, "Import Statement");
        }
        let ast = (0, Parser_1.parse)(file);
        return (0, Document_1.Template)().run(storrage, ast);
    });
}
exports.IncludeStatement = IncludeStatement;
function CallStatement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        let args = elm.arguments.map(x => (0, Expression_1.Expression)().run(storrage, x));
        (0, functions_1.callRoutine)(storrage, elm.callee, args);
        return "";
    });
}
exports.CallStatement = CallStatement;
function Statement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        switch (elm.kind) {
            case "BreakStatement": return BreakStatement().run(storrage, elm);
            case "CallStatement": return CallStatement().run(storrage, elm);
            case "ContinueStatement": return ContinueStatement().run(storrage, elm);
            case "ForEachStatement": return ForEachStatement().run(storrage, elm);
            case "ForStatement": return ForStatement().run(storrage, elm);
            case "IfStatement": return IfStatement().run(storrage, elm);
            case "IncludeStatement": return IncludeStatement().run(storrage, elm);
        }
    });
}
exports.Statement = Statement;
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
