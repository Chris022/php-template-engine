"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateExpression = exports.createAssignmentExpression = exports.createCallExpression = exports.createKeyword = exports.createBinaryExpression = exports.createObjectExpression = exports.createProperty = exports.createArrayExpression = exports.createNumberLiteral = exports.createStringLiteral = exports.createMemberExpression = exports.createIdentifier = void 0;
function createIdentifier(start, end, name) {
    return {
        kind: "Identifier",
        start: start,
        end: end,
        name: name,
    };
}
exports.createIdentifier = createIdentifier;
function createMemberExpression(start, end, object, properties) {
    return {
        kind: "MemberExpression",
        start: start,
        end: end,
        object: object,
        properties: properties
    };
}
exports.createMemberExpression = createMemberExpression;
function createStringLiteral(start, end, value) {
    return {
        kind: "StringLiteral",
        start: start,
        end: end,
        value: value
    };
}
exports.createStringLiteral = createStringLiteral;
function createNumberLiteral(start, end, value) {
    return {
        kind: "NumberLiteral",
        start: start,
        end: end,
        value: value
    };
}
exports.createNumberLiteral = createNumberLiteral;
function createArrayExpression(start, end, elements) {
    return {
        kind: "ArrayExpression",
        start: start,
        end: end,
        elements: elements
    };
}
exports.createArrayExpression = createArrayExpression;
function createProperty(start, end, key, value) {
    return {
        kind: "Property",
        start: start,
        end: end,
        key: key,
        value: value
    };
}
exports.createProperty = createProperty;
function createObjectExpression(start, end, properties) {
    return {
        kind: "ObjectExpression",
        start: start,
        end: end,
        properties: properties
    };
}
exports.createObjectExpression = createObjectExpression;
function createBinaryExpression(start, end, left, operator, right) {
    return {
        kind: "BinaryExpression",
        start: start,
        end: end,
        left: left,
        operator: operator,
        right: right
    };
}
exports.createBinaryExpression = createBinaryExpression;
function createKeyword(start, end, value) {
    return {
        kind: "Keyword",
        start: start,
        end: end,
        value: value,
    };
}
exports.createKeyword = createKeyword;
function createCallExpression(start, end, callee, args) {
    return {
        kind: "CallExpression",
        start: start,
        end: end,
        callee: callee,
        arguments: args
    };
}
exports.createCallExpression = createCallExpression;
function createAssignmentExpression(start, end, left, right) {
    return {
        kind: "AssignmentExpression",
        start: start,
        end: end,
        left: left,
        right: right
    };
}
exports.createAssignmentExpression = createAssignmentExpression;
function createUpdateExpression(start, end, operator, argument) {
    return {
        kind: "UpdateExpression",
        start: start,
        end: end,
        operator: operator,
        argument: argument
    };
}
exports.createUpdateExpression = createUpdateExpression;
