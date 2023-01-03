import { ParseError, State } from "ts-parser-combinator";
import { TemplateElement } from "../Ast";
import { Template } from "./Document";

export function parse(input:string):TemplateElement[]{
    let result = Template().unParse(new State(input))
    if(result.isLeft()){
        let error = result.value as ParseError
        throw Error("An Error occured in code character: "+"0" + "\n"+error.message)
    }
    return (result.value as [State, TemplateElement[]]) [1]
    
}