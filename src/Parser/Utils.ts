import { choice, Parser, string } from "ts-parser-combinator";

export function whitepsace():Parser<string>{
    return choice([
        string(" "),
        string("\n"),
        string("\t")
    ])
}