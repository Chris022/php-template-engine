import { between, choice, doParser, Parser, string } from "ts-parser-combinator";

export function whitepsace():Parser<string>{
    return choice([
        string(" "),
        string("\n"),
        string("\t")
    ])
}

export function space():Parser<string[]>{
    return whitepsace().many()
}

export function grouped<T>(p:Parser<T>):Parser<T>{
    return doParser((s)=>{

        let bracket = string("(").optional().parse(s)
        let ret = p.parse(s)
        if(bracket != undefined) string(")").parse(s)
        return ret
    })
}