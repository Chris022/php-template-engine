"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = exports.TemplateElement = exports.PHPEcho = exports.PHPCode = exports.HTMLCode = void 0;
const ts_parser_combinator_1 = require("ts-parser-combinator");
const factory = __importStar(require("../Factory"));
const Utils_1 = require("./Utils");
const Statement_1 = require("./Statement");
const Expression_1 = require("./Expression");
function HTMLCode() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let value_array = (0, ts_parser_combinator_1.manyTill)((0, ts_parser_combinator_1.anyChar)(), (0, ts_parser_combinator_1.string)("<?")).parse(s);
        let value = value_array.join("");
        if (value.length == 0)
            (0, ts_parser_combinator_1.fail)().parse(s);
        console.log("HTML did it");
        return factory.createHTMLCode(start(), end(), value);
    });
}
exports.HTMLCode = HTMLCode;
function PHPCode() {
    return (0, ts_parser_combinator_1.doParser)((s) => {
        let start_pos = s.position;
        (0, ts_parser_combinator_1.string)("<?php").parse(s);
        (0, Utils_1.whitepsace)().many1().parse(s);
        let value = (0, Statement_1.Statement)().or((0, Statement_1.BlockStatement)()).parse(s);
        (0, Utils_1.whitepsace)().many().parse(s);
        (0, ts_parser_combinator_1.string)("?>").parse(s);
        let end_pos = s.position;
        console.log("PHP did it");
        return factory.createPHPCode(start_pos, end_pos, value);
    });
}
exports.PHPCode = PHPCode;
function PHPEcho() {
    return (0, ts_parser_combinator_1.doParser)((s) => {
        let start_pos = s.position;
        (0, ts_parser_combinator_1.string)("<?=").parse(s);
        (0, Utils_1.whitepsace)().many().parse(s);
        let value = (0, Expression_1.Expression)().parse(s);
        (0, Utils_1.whitepsace)().many().parse(s);
        (0, ts_parser_combinator_1.string)("?>").parse(s);
        let end_pos = s.position;
        console.log("Echo did it");
        return factory.createPhpEcho(start_pos, end_pos, value);
    });
}
exports.PHPEcho = PHPEcho;
function TemplateElement() {
    return (0, ts_parser_combinator_1.choice)([
        HTMLCode(),
        PHPCode(),
        PHPEcho()
    ]);
}
exports.TemplateElement = TemplateElement;
function Template() {
    return TemplateElement().many1();
}
exports.Template = Template;
