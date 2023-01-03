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
exports.BlockStatement = exports.Statement = exports.CallStatement = exports.IncludeStatement = exports.ContinueStatement = exports.BreakStatement = exports.ForEachStatement = exports.ForStatement = exports.IfStatement = void 0;
const ts_parser_combinator_1 = require("ts-parser-combinator");
const factory = __importStar(require("../Factory"));
const Utils_1 = require("./Utils");
const Expression_1 = require("./Expression");
const Document_1 = require("./Document");
function IfStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("if")
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("("))
            .right((0, Utils_1.space)()).parse(s);
        let test_condition = (0, Expression_1.BooleanExpression)().parse(s);
        (0, Utils_1.space)()
            .right((0, ts_parser_combinator_1.string)(")"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)(":"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("?>")).parse(s);
        let consequent = (0, Document_1.TemplateElement)().many().parse(s);
        let alternate = (0, ts_parser_combinator_1.string)("<?php")
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("else"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)(":"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("?>"))
            .right((0, Document_1.TemplateElement)().many())
            .optional().parse(s);
        (0, ts_parser_combinator_1.string)("<?php").parse(s);
        (0, Utils_1.space)().parse(s);
        (0, ts_parser_combinator_1.string)("endif").parse(s);
        (0, ts_parser_combinator_1.string)(";").optional().parse(s);
        if (alternate == undefined)
            return factory.createIfStatement(start(), end(), test_condition, consequent);
        return factory.createIfStatement(start(), end(), test_condition, consequent, alternate);
    });
}
exports.IfStatement = IfStatement;
function ForStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("for")
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("("))
            .right((0, Utils_1.space)()).parse(s);
        let init = (0, Expression_1.AssignmentExpression)().optional().parse(s);
        (0, Utils_1.space)().right((0, ts_parser_combinator_1.string)(";")).right((0, Utils_1.space)()).parse(s);
        console.log("got to boolean");
        let test = (0, Expression_1.BooleanExpression)().optional().parse(s);
        console.log("got after boolean");
        (0, Utils_1.space)().right((0, ts_parser_combinator_1.string)(";")).right((0, Utils_1.space)()).parse(s);
        let update = (0, Expression_1.UpdateExpression)().optional().parse(s);
        (0, Utils_1.space)()
            .right((0, ts_parser_combinator_1.string)(")"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)(":"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("?>")).parse(s);
        let body = (0, Document_1.TemplateElement)().many().parse(s);
        (0, ts_parser_combinator_1.string)("<?php").parse(s);
        (0, Utils_1.space)().parse(s);
        (0, ts_parser_combinator_1.string)("endfor").parse(s);
        (0, ts_parser_combinator_1.string)(";").optional().parse(s);
        return factory.createForStatement(start(), end(), body, init != undefined ? init : undefined, test != undefined ? test : undefined, update != undefined ? update : undefined);
    });
}
exports.ForStatement = ForStatement;
function ForEachStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("foreach")
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("("))
            .right((0, Utils_1.space)()).parse(s);
        let left = (0, Expression_1.Identifier)()
            .or((0, Expression_1.ArrayExpression)())
            .or((0, Expression_1.ObjectExpression)()).parse(s);
        (0, Utils_1.space)()
            .right((0, ts_parser_combinator_1.string)("as"))
            .right((0, Utils_1.space)()).parse(s);
        let key = (0, Expression_1.Identifier)().parse(s);
        (0, Utils_1.space)()
            .right((0, ts_parser_combinator_1.string)("=>"))
            .right((0, Utils_1.space)()).parse(s);
        let value = (0, Expression_1.Identifier)().parse(s);
        (0, Utils_1.space)()
            .right((0, ts_parser_combinator_1.string)(")"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)(":"))
            .right((0, Utils_1.space)())
            .right((0, ts_parser_combinator_1.string)("?>")).parse(s);
        let body = (0, Document_1.TemplateElement)().many().parse(s);
        (0, ts_parser_combinator_1.string)("<?php").parse(s);
        (0, Utils_1.space)().parse(s);
        (0, ts_parser_combinator_1.string)("endforeach").parse(s);
        (0, ts_parser_combinator_1.string)(";").optional().parse(s);
        return factory.createForEachStatement(start(), end(), left, key, value, body);
    });
}
exports.ForEachStatement = ForEachStatement;
function BreakStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("break").parse(s);
        (0, ts_parser_combinator_1.string)(";").optional().parse(s);
        return factory.createBreakStatement(start(), end());
    });
}
exports.BreakStatement = BreakStatement;
function ContinueStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("continue").parse(s);
        (0, ts_parser_combinator_1.string)(";").optional().parse(s);
        return factory.createContinueStatement(start(), end());
    });
}
exports.ContinueStatement = ContinueStatement;
function IncludeStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("include").parse(s);
        (0, Utils_1.space)().parse(s);
        let file = (0, Expression_1.StringLiteral)().parse(s);
        return factory.createIncludeStatement(start(), end(), file);
    });
}
exports.IncludeStatement = IncludeStatement;
function CallStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let callee = (0, ts_parser_combinator_1.letter)().manyc1().parse(s);
        (0, ts_parser_combinator_1.string)("(").parse(s);
        let args = (0, ts_parser_combinator_1.sepBy)((0, ts_parser_combinator_1.between)((0, Utils_1.space)(), (0, Utils_1.space)(), (0, Expression_1.Expression)()), (0, ts_parser_combinator_1.string)(",")).parse(s);
        (0, ts_parser_combinator_1.string)(")").parse(s);
        return factory.createCallStatement(start(), end(), callee, args);
    });
}
exports.CallStatement = CallStatement;
function Statement() {
    return (0, ts_parser_combinator_1.choice)([
        IfStatement(),
        ForEachStatement(),
        ForStatement(),
        ContinueStatement(),
        BreakStatement(),
        IncludeStatement(),
        CallStatement()
    ]);
}
exports.Statement = Statement;
function BlockStatement() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let statements = Statement().left((0, ts_parser_combinator_1.string)(";")).many().parse(s);
        return factory.createBlockStatement(start(), end(), statements);
    });
}
exports.BlockStatement = BlockStatement;
