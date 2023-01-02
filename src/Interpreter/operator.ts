import { RunTimeError } from "./Error";
import { expression, to_boolean, to_number } from "./types";

export function Equal(elm1: expression, elm2: expression):boolean{
    if(typeof elm1 == "string" && typeof elm2 == "string") return elm1 === elm2
    if(typeof elm1 == "boolean" || typeof elm2 == "boolean") return to_boolean(elm1) === to_boolean(elm2)
    if((typeof elm1 == "string" || typeof elm1 == "number") && (typeof elm2 == "string" || typeof elm2 == "number"))
        return to_number(elm1) == to_number(elm2)
    if(typeof elm1 == "object" && typeof elm2 == "object"){
        if(Object.keys(elm1).toString() != Object.keys(elm2).toString()) return false
        let res = true;
        for(var i = 0; i< elm1.length;i++){
            res = res && Equal(elm1[i],elm2[i])
        }
        return res
    }
    return false
}

export function Identical(elm1: expression, elm2: expression):boolean{
    return elm1 === elm2
}

export function NumberComparision(operator:string,elm1: expression, elm2: expression):boolean | undefined{
    if(typeof elm1 != "number" || typeof elm2 != "number") return undefined
    switch(operator){
        case "<": return elm1 < elm2
        case "<=": return elm1 <= elm2
        case ">": return elm1 > elm2
        case ">=": return elm1 >= elm2
    }
    return false
}