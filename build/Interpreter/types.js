"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_array = exports.to_boolean = exports.to_string = exports.to_number = exports.cloneExpression = void 0;
function cloneExpression(val) {
    return JSON.parse(JSON.stringify(val));
}
exports.cloneExpression = cloneExpression;
//converstion functions
function to_number(inp) {
    if (typeof inp == "number")
        return inp;
    if (typeof inp == "string") {
        try {
            return parseFloat(inp);
        }
        catch (error) {
            return 0;
        }
    }
    if (typeof inp == "boolean")
        return inp === true ? 1 : 0;
    if (typeof inp == "object")
        return inp.length == 0 ? 0 : 1;
    return inp;
}
exports.to_number = to_number;
function to_string(inp) {
    if (typeof inp == "number")
        return inp + "";
    if (typeof inp == "string")
        return inp;
    if (typeof inp == "boolean")
        return inp === true ? "1" : "";
    if (typeof inp == "object")
        return "Array";
    return inp;
}
exports.to_string = to_string;
function to_boolean(inp) {
    if (typeof inp == "number")
        return inp == 0.0 ? false : true;
    if (typeof inp == "string")
        return inp === "0" || inp === "" ? false : true;
    if (typeof inp == "boolean")
        return inp;
    if (typeof inp == "object")
        return inp.length == 0 ? false : true;
    return inp;
}
exports.to_boolean = to_boolean;
function to_array(inp) {
    if (typeof inp == "number")
        return [inp];
    if (typeof inp == "string")
        return [inp];
    if (typeof inp == "boolean")
        return [inp];
    if (typeof inp == "object")
        return Object.values(inp);
    return inp;
}
exports.to_array = to_array;
