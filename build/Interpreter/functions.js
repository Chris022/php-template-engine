"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRoutine = exports.callFunction = void 0;
const Error_1 = require("./Error");
//All these function HAVE to return an expression
function callFunction(storrage, name, args) {
    return "";
}
exports.callFunction = callFunction;
//All these routines don't return anything
function callRoutine(storrage, name, args) {
    if (name === "extract") {
        if (args.length != 1)
            throw new Error_1.RunTimeError("extracts accepts exactly one argumen", 0, 0);
        let arg = args[0];
        if (typeof arg != "object")
            throw new Error_1.RunTimeError("extracts accepts only an object as argument", 0, 0);
        Object.entries(arg).forEach(e => {
            storrage.store(e[0], e[1]);
        });
    }
}
exports.callRoutine = callRoutine;
