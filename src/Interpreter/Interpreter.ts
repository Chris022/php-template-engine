import { RunTimeError } from "./Error";
import { cloneExpression, expression } from "./types";

export class Interpreter<In,Out>{
    constructor(public run:(storrage:VariableStorrage,elm:In)=>Out){}

}

export function doInterpreter<In,Out>(func:(storrage:VariableStorrage,input:In)=>Out):Interpreter<In,Out>{
    return new Interpreter((storrage:VariableStorrage,input:In)=>{
        return func(storrage,input)
    })
}

export class VariableStorrage{
    public storrage:{ [index: string]: expression };
    public constructor(){
        this.storrage = {} 
    }
    public store(name:string,value:expression){
        this.storrage[name] = value
    }
    public get(name:string):expression | undefined{
        if(Object.keys(this.storrage).includes(name)) return this.storrage[name]
        return undefined
    }
    public clone():VariableStorrage{
        let vs = new VariableStorrage()
        Object.keys(this.storrage).forEach(key => {
            let val = this.storrage[key]
            vs.store(key,cloneExpression(val))  
        })
        return vs
    }
}