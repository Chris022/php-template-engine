"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhpEcho = exports.createPHPCode = exports.createHTMLCode = void 0;
function createHTMLCode(start, end, value) {
    return {
        kind: "HTMLCode",
        start: start,
        end: end,
        value: value
    };
}
exports.createHTMLCode = createHTMLCode;
function createPHPCode(start, end, value) {
    return {
        kind: "PHPCode",
        start: start,
        end: end,
        value: value
    };
}
exports.createPHPCode = createPHPCode;
function createPhpEcho(start, end, value) {
    return {
        kind: "PHPEcho",
        start: start,
        end: end,
        value: value
    };
}
exports.createPhpEcho = createPhpEcho;
