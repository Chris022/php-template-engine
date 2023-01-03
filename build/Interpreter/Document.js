"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.TemplateElement = exports.PHPEcho = exports.PHPCode = exports.HTMLCode = void 0;
const Expression_1 = require("./Expression");
const Interpreter_1 = require("./Interpreter");
const Statement_1 = require("./Statement");
const types_1 = require("./types");
function HTMLCode() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return elm.value;
    });
}
exports.HTMLCode = HTMLCode;
function PHPCode() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        switch (elm.value.kind) {
            case "BlockStatement": return (0, Statement_1.BlockStatement)().run(storrage, elm.value);
            default: return (0, Statement_1.Statement)().run(storrage, elm.value);
        }
    });
}
exports.PHPCode = PHPCode;
function PHPEcho() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return (0, types_1.to_string)((0, Expression_1.Expression)().run(storrage, elm.value));
    });
}
exports.PHPEcho = PHPEcho;
function TemplateElement() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        switch (elm.kind) {
            case "HTMLCode": return HTMLCode().run(storrage, elm);
            case "PHPCode": return PHPCode().run(storrage, elm);
            case "PHPEcho": return PHPEcho().run(storrage, elm);
        }
    });
}
exports.TemplateElement = TemplateElement;
function Template() {
    return (0, Interpreter_1.doInterpreter)((storrage, elm) => {
        return elm.map(line => TemplateElement().run(storrage, line)).join("");
    });
}
exports.Template = Template;
