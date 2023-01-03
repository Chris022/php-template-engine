import { VariableStorrage } from "./Interpreter";
import { expression } from "./types";
export declare function callFunction(storrage: VariableStorrage, name: string, args: expression[]): expression;
export declare function callRoutine(storrage: VariableStorrage, name: string, args: expression[]): void;
