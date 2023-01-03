"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const ts_parser_combinator_1 = require("ts-parser-combinator");
const Document_1 = require("./Document");
function parse(input) {
    let result = (0, Document_1.Template)().unParse(new ts_parser_combinator_1.State(input));
    if (result.isLeft()) {
        let error = result.value;
        throw Error("An Error occured in code character: " + "0" + "\n" + error.message);
    }
    return result.value[1];
}
exports.parse = parse;
