"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpret = void 0;
const Document_1 = require("./Document");
const Interpreter_1 = require("./Interpreter");
function interpret(elm) {
    return (0, Document_1.Template)().run(new Interpreter_1.VariableStorrage(), elm);
}
exports.interpret = interpret;
