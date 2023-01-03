import { expression } from "./types";
export declare class Interpreter<In, Out> {
    run: (storrage: VariableStorrage, elm: In) => Out;
    constructor(run: (storrage: VariableStorrage, elm: In) => Out);
}
export declare function doInterpreter<In, Out>(func: (storrage: VariableStorrage, input: In) => Out): Interpreter<In, Out>;
export declare class VariableStorrage {
    storrage: {
        [index: string]: expression;
    };
    constructor();
    store(name: string, value: expression): void;
    get(name: string): expression | undefined;
    remove(name: string): void;
    clone(): VariableStorrage;
}
