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
exports.UpdateExpression = exports.AssignmentExpression = exports.NonBinaryExpresstion = exports.Expression = exports.CallExpression = exports.BooleanExpression = exports.Keyword = exports.BinaryExpression = exports.ObjectExpression = exports.Property = exports.ArrayExpression = exports.NumberLiteral = exports.StringLiteral = exports.MemberExpression = exports.Identifier = void 0;
const ts_parser_combinator_1 = require("ts-parser-combinator");
const factory = __importStar(require("../Factory"));
const Utils_1 = require("./Utils");
function Identifier() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("$").parse(s);
        let value = (0, ts_parser_combinator_1.letter)().or((0, ts_parser_combinator_1.string)("_")).manyc1().parse(s);
        return factory.createIdentifier(start(), end(), value);
    });
}
exports.Identifier = Identifier;
function MemberExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let object = Identifier()
            .or(ArrayExpression())
            .or(ObjectExpression())
            .or((0, ts_parser_combinator_1.string)("(").right(MemberExpression()).left((0, ts_parser_combinator_1.string)(")"))).parse(s);
        let properties = (0, ts_parser_combinator_1.doParser)((s2) => {
            (0, ts_parser_combinator_1.string)("[").parse(s2);
            let property = NumberLiteral().or(StringLiteral()).parse(s2);
            (0, ts_parser_combinator_1.string)("]").parse(s2);
            return property;
        }).many1().parse(s);
        return factory.createMemberExpression(start(), end(), object, properties);
    });
}
exports.MemberExpression = MemberExpression;
function StringLiteral() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let value = (0, ts_parser_combinator_1.between)((0, ts_parser_combinator_1.string)('"'), (0, ts_parser_combinator_1.string)('"'), (0, ts_parser_combinator_1.manyTill)((0, ts_parser_combinator_1.anyChar)(), (0, ts_parser_combinator_1.string)('"'))).parse(s);
        let joined = value.join("");
        return factory.createStringLiteral(start(), end(), joined);
    });
}
exports.StringLiteral = StringLiteral;
function NumberLiteral() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let a = (0, ts_parser_combinator_1.digit)().manyc1().parse(s);
        let b = (0, ts_parser_combinator_1.string)(".").defaultValue(".").parse(s);
        let c = (0, ts_parser_combinator_1.digit)().manyc().defaultValue("0").parse(s);
        let number = parseFloat(a + b + c);
        return factory.createNumberLiteral(start(), end(), number);
    });
}
exports.NumberLiteral = NumberLiteral;
function ArrayExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("[").parse(s);
        (0, Utils_1.whitepsace)().many().parse(s);
        let value = (0, ts_parser_combinator_1.sepBy)(TrimmedExpression(), (0, ts_parser_combinator_1.string)(",")).parse(s);
        (0, Utils_1.whitepsace)().many().parse(s);
        (0, ts_parser_combinator_1.string)("]").parse(s);
        return factory.createArrayExpression(start(), end(), value);
    });
}
exports.ArrayExpression = ArrayExpression;
let TrimmedProperty = () => (0, ts_parser_combinator_1.between)((0, Utils_1.space)(), (0, Utils_1.space)(), Property());
function Property() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let key = StringLiteral().or(NumberLiteral()).parse(s);
        (0, Utils_1.space)().parse(s);
        (0, ts_parser_combinator_1.string)("=>").parse(s);
        (0, Utils_1.space)().parse(s);
        let value = Expression().parse(s);
        return factory.createProperty(start(), end(), key, value);
    });
}
exports.Property = Property;
function ObjectExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        (0, ts_parser_combinator_1.string)("[").parse(s);
        (0, Utils_1.space)().parse(s);
        let value = (0, ts_parser_combinator_1.sepBy)(TrimmedProperty(), (0, ts_parser_combinator_1.string)(",")).parse(s);
        (0, Utils_1.space)().parse(s);
        (0, ts_parser_combinator_1.string)("]").parse(s);
        return factory.createObjectExpression(start(), end(), value);
    });
}
exports.ObjectExpression = ObjectExpression;
let BinaryExpressionArgument = () => NonBinaryExpresstion().or((0, ts_parser_combinator_1.doParser)((s2) => {
    (0, ts_parser_combinator_1.string)("(").parse(s2);
    (0, Utils_1.space)().parse(s2);
    let value = Expression().parse(s2);
    (0, Utils_1.space)().parse(s2);
    (0, ts_parser_combinator_1.string)(")").parse(s2);
    return value;
}));
function BinaryExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let left = BinaryExpressionArgument().parse(s);
        (0, Utils_1.space)().parse(s);
        let operator = (0, ts_parser_combinator_1.choice)([
            (0, ts_parser_combinator_1.string)("=="),
            (0, ts_parser_combinator_1.string)("<"),
            (0, ts_parser_combinator_1.string)(">"),
            (0, ts_parser_combinator_1.string)("<="),
            (0, ts_parser_combinator_1.string)(">="),
            (0, ts_parser_combinator_1.string)("!="),
            (0, ts_parser_combinator_1.string)("!==")
        ]).parse(s);
        (0, Utils_1.space)().parse(s);
        let right = BinaryExpressionArgument().parse(s);
        return factory.createBinaryExpression(start(), end(), left, operator, right);
    });
}
exports.BinaryExpression = BinaryExpression;
function Keyword() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let value = (0, ts_parser_combinator_1.choice)([
            (0, ts_parser_combinator_1.string)("True"),
            (0, ts_parser_combinator_1.string)("False")
        ]).parse(s);
        let bool = false;
        if (value == "True")
            bool = true;
        else if (value == "False")
            bool = false;
        return factory.createKeyword(start(), end(), bool);
    });
}
exports.Keyword = Keyword;
function BooleanExpression() {
    return (0, ts_parser_combinator_1.chooseBest)([
        Keyword(),
        BinaryExpression(),
    ]);
}
exports.BooleanExpression = BooleanExpression;
function CallExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let callee = (0, ts_parser_combinator_1.letter)().or((0, ts_parser_combinator_1.string)("_")).manyc1().parse(s);
        (0, ts_parser_combinator_1.string)("(").parse(s);
        let args = (0, ts_parser_combinator_1.sepBy)(TrimmedExpression(), (0, ts_parser_combinator_1.string)(",")).parse(s);
        (0, ts_parser_combinator_1.string)(")").parse(s);
        return factory.createCallExpression(start(), end(), callee, args);
    });
}
exports.CallExpression = CallExpression;
let TrimmedExpression = () => (0, ts_parser_combinator_1.between)((0, Utils_1.space)(), (0, Utils_1.space)(), Expression());
//Expression has to try every parser and choose the one that parses the most characters!!
function Expression() {
    return (0, Utils_1.grouped)((0, ts_parser_combinator_1.choice)([
        //Start with clearly distinguishable elements
        Identifier(),
        StringLiteral(),
        NumberLiteral(),
        ArrayExpression(),
        ObjectExpression(),
        CallExpression(),
        MemberExpression(),
        BooleanExpression(),
    ]));
}
exports.Expression = Expression;
function NonBinaryExpresstion() {
    return (0, Utils_1.grouped)((0, ts_parser_combinator_1.choice)([
        //Start with clearly distinguishable elements
        Identifier(),
        StringLiteral(),
        NumberLiteral(),
        ArrayExpression(),
        ObjectExpression(),
        CallExpression(),
        Keyword(),
        MemberExpression() //Also starts with an Array, Object or Member
    ]));
}
exports.NonBinaryExpresstion = NonBinaryExpresstion;
function AssignmentExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let to = Identifier().parse(s);
        (0, Utils_1.space)().parse(s);
        (0, ts_parser_combinator_1.string)("=").parse(s);
        (0, Utils_1.space)().parse(s);
        let value = Expression().parse(s);
        return factory.createAssignmentExpression(start(), end(), to, value);
    });
}
exports.AssignmentExpression = AssignmentExpression;
function UpdateExpression() {
    return (0, ts_parser_combinator_1.doParser)((s, start, end) => {
        let value = Identifier().parse(s);
        (0, Utils_1.space)().parse(s);
        let operator = (0, ts_parser_combinator_1.choice)([
            (0, ts_parser_combinator_1.string)("++"),
            (0, ts_parser_combinator_1.string)("--")
        ]).parse(s);
        return factory.createUpdateExpression(start(), end(), operator, value);
    });
}
exports.UpdateExpression = UpdateExpression;
