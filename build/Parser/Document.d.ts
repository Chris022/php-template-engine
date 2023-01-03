import { Parser } from "ts-parser-combinator";
import * as ast from "../Ast";
export declare function HTMLCode(): Parser<ast.HTMLCode>;
export declare function PHPCode(): Parser<ast.PHPCode>;
export declare function PHPEcho(): Parser<ast.PHPEcho>;
export declare function TemplateElement(): Parser<ast.TemplateElement>;
export declare function Template(): Parser<ast.TemplateElement[]>;
