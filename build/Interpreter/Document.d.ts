import * as ast from "../Ast";
import { Interpreter } from "./Interpreter";
export declare function HTMLCode(): Interpreter<ast.HTMLCode, string>;
export declare function PHPCode(): Interpreter<ast.PHPCode, string>;
export declare function PHPEcho(): Interpreter<ast.PHPEcho, string>;
export declare function TemplateElement(): Interpreter<ast.TemplateElement, string>;
export declare function Template(): Interpreter<ast.TemplateElement[], string>;
