import { ParseError, State } from "ts-parser-combinator";
import { TemplateElement } from "../Ast";
import { Template } from "./Document";

export function parse(input:string):TemplateElement[]{
    let state = new State(input)
    let result = Template().unParse(state)
    if(result.isLeft()){
        let error = result.value as ParseError
        throw Error("An Error occured in code character: "+state.position + "\n"+error.message)
    }
    return (result.value as [State, TemplateElement[]]) [1]
    
}