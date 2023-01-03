import { TemplateElement } from "../Ast";
import { Template } from "./Document";
import { VariableStorrage } from "./Interpreter";

export function interpret(elm:TemplateElement[]):string{
    return Template().run(new VariableStorrage(),elm)
}