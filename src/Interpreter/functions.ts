import { RunTimeError } from "./Error";
import { VariableStorrage } from "./Interpreter";
import { expression } from "./types";

//All these function HAVE to return an expression
export function callFunction(storrage:VariableStorrage,name:string,args:expression[]):expression{
    return ""
}

//All these routines don't return anything
export function callRoutine(storrage:VariableStorrage,name:string,args:expression[]):void{
    if(name === "extract"){
        if(args.length != 1) throw new RunTimeError("extracts accepts exactly one argumen",0,0)
        let arg = args[0]
        if(typeof arg != "object") throw new RunTimeError("extracts accepts only an object as argument",0,0)
        Object.entries(arg).forEach(e => {
            storrage.store(e[0],e[1])
        })
    }
}