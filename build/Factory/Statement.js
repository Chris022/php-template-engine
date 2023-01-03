"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCallStatement = exports.createIncludeStatement = exports.createContinueStatement = exports.createBreakStatement = exports.createForEachStatement = exports.createForStatement = exports.createIfStatement = exports.createBlockStatement = void 0;
function createBlockStatement(start, end, body) {
    return {
        kind: "BlockStatement",
        start: start,
        end: end,
        body: body
    };
}
exports.createBlockStatement = createBlockStatement;
function createIfStatement(start, end, test, consequent, alternate) {
    return {
        kind: "IfStatement",
        start: start,
        end: end,
        test: test,
        consequent: consequent,
        alternate: alternate
    };
}
exports.createIfStatement = createIfStatement;
function createForStatement(start, end, body, init, test, update) {
    return {
        kind: "ForStatement",
        start: start,
        end: end,
        init: init,
        test: test,
        update: update,
        body: body
    };
}
exports.createForStatement = createForStatement;
function createForEachStatement(start, end, left, key, value, block) {
    return {
        kind: "ForEachStatement",
        start: start,
        end: end,
        left: left,
        key: key,
        value: value,
        block: block
    };
}
exports.createForEachStatement = createForEachStatement;
function createBreakStatement(start, end) {
    return {
        kind: "BreakStatement",
        start: start,
        end: end
    };
}
exports.createBreakStatement = createBreakStatement;
function createContinueStatement(start, end) {
    return {
        kind: "ContinueStatement",
        start: start,
        end: end
    };
}
exports.createContinueStatement = createContinueStatement;
function createIncludeStatement(start, end, source) {
    return {
        kind: "IncludeStatement",
        start: start,
        end: end,
        source: source
    };
}
exports.createIncludeStatement = createIncludeStatement;
function createCallStatement(start, end, callee, args) {
    return {
        kind: "CallStatement",
        start: start,
        end: end,
        callee: callee,
        arguments: args
    };
}
exports.createCallStatement = createCallStatement;
