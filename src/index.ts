import * as fs from 'fs';

import { interpret } from "./Interpreter";
import { parse } from "./Parser";

export function template(file:string):string{
    return interpret(parse(file))
}

export function template_from_file(file_name:string):string{
    let file = fs.readFileSync(file_name,'utf8');
    return interpret(parse(file))
}