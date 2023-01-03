import { BlockStatement, Statement } from "./Statement";
import { Expression } from "./Expression";
export interface HTMLCode {
    kind: "HTMLCode";
    start: number;
    end: number;
    value: string;
}
export interface PHPCode {
    kind: "PHPCode";
    start: number;
    end: number;
    value: BlockStatement | Statement;
}
export interface PHPEcho {
    kind: "PHPEcho";
    start: number;
    end: number;
    value: Expression;
}
export declare type TemplateElement = PHPCode | PHPEcho | HTMLCode;
