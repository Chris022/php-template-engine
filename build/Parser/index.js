"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const process_1 = require("process");
const ts_parser_combinator_1 = require("ts-parser-combinator");
const Document_1 = require("./Document");
function parse(input) {
    let state = new ts_parser_combinator_1.State(input);
    let result = (0, Document_1.Template)().unParse(state);
    if (result.isLeft()) {
        let error = result.value;
        console.log(error.toString());
        (0, process_1.exit)(1);
    }
    return result.value[1];
}
exports.parse = parse;
