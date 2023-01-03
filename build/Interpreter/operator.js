"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberComparision = exports.Identical = exports.Equal = void 0;
const types_1 = require("./types");
function Equal(elm1, elm2) {
    if (typeof elm1 == "string" && typeof elm2 == "string")
        return elm1 === elm2;
    if (typeof elm1 == "boolean" || typeof elm2 == "boolean")
        return (0, types_1.to_boolean)(elm1) === (0, types_1.to_boolean)(elm2);
    if ((typeof elm1 == "string" || typeof elm1 == "number") && (typeof elm2 == "string" || typeof elm2 == "number"))
        return (0, types_1.to_number)(elm1) == (0, types_1.to_number)(elm2);
    if (typeof elm1 == "object" && typeof elm2 == "object") {
        if (Object.keys(elm1).toString() != Object.keys(elm2).toString())
            return false;
        let res = true;
        for (var i = 0; i < elm1.length; i++) {
            res = res && Equal(elm1[i], elm2[i]);
        }
        return res;
    }
    return false;
}
exports.Equal = Equal;
function Identical(elm1, elm2) {
    return elm1 === elm2;
}
exports.Identical = Identical;
function NumberComparision(operator, elm1, elm2) {
    if (typeof elm1 != "number" || typeof elm2 != "number")
        return undefined;
    switch (operator) {
        case "<": return elm1 < elm2;
        case "<=": return elm1 <= elm2;
        case ">": return elm1 > elm2;
        case ">=": return elm1 >= elm2;
    }
    return false;
}
exports.NumberComparision = NumberComparision;
