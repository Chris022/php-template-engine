"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinueError = exports.BreakError = exports.RunTimeError = void 0;
class RunTimeError extends Error {
    constructor(message, from, to, in_) {
        if (in_ == undefined)
            super("At " + from + "-" + to + ": " + message);
        else
            super("In: " + in_ + " at " + from + "-" + to + ": " + message);
    }
}
exports.RunTimeError = RunTimeError;
class BreakError extends Error {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.BreakError = BreakError;
class ContinueError extends Error {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.ContinueError = ContinueError;
