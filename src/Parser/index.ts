import { exit } from "process";
import { ParseError, State } from "ts-parser-combinator";
import { TemplateElement } from "../Ast";
import { Template } from "./Document";

export function parse(input:string):TemplateElement[]{
    let state = new State(input)
    let result = Template().unParse(state)
    if(result.isLeft()){
        let error = result.value as ParseError
        console.log(error.toString())
        exit(1)
    }
    return (result.value as [State, TemplateElement[]]) [1]
    
}