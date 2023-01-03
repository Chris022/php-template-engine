"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableStorrage = exports.doInterpreter = exports.Interpreter = void 0;
const types_1 = require("./types");
class Interpreter {
    run;
    constructor(run) {
        this.run = run;
    }
}
exports.Interpreter = Interpreter;
function doInterpreter(func) {
    return new Interpreter((storrage, input) => {
        return func(storrage, input);
    });
}
exports.doInterpreter = doInterpreter;
class VariableStorrage {
    storrage;
    constructor() {
        this.storrage = {};
    }
    store(name, value) {
        this.storrage[name] = value;
    }
    get(name) {
        if (Object.keys(this.storrage).includes(name))
            return this.storrage[name];
        return undefined;
    }
    remove(name) {
        delete this.storrage[name];
    }
    clone() {
        let vs = new VariableStorrage();
        Object.keys(this.storrage).forEach(key => {
            let val = this.storrage[key];
            vs.store(key, (0, types_1.cloneExpression)(val));
        });
        return vs;
    }
}
exports.VariableStorrage = VariableStorrage;
