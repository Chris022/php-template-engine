"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grouped = exports.space = exports.whitepsace = void 0;
const ts_parser_combinator_1 = require("ts-parser-combinator");
function whitepsace() {
    return (0, ts_parser_combinator_1.choice)([
        (0, ts_parser_combinator_1.string)(" "),
        (0, ts_parser_combinator_1.string)("\n"),
        (0, ts_parser_combinator_1.string)("\t")
    ]);
}
exports.whitepsace = whitepsace;
function space() {
    return whitepsace().many();
}
exports.space = space;
function grouped(p) {
    return (0, ts_parser_combinator_1.doParser)((s) => {
        let bracket = (0, ts_parser_combinator_1.string)("(").optional().parse(s);
        let ret = p.parse(s);
        if (bracket != undefined)
            (0, ts_parser_combinator_1.string)(")").parse(s);
        return ret;
    });
}
exports.grouped = grouped;
