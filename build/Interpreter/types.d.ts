export declare type expression = number | string | boolean | expression[] | {
    [index: string | number]: expression;
};
export declare function cloneExpression(val: expression): expression;
export declare function to_number(inp: expression): number;
export declare function to_string(inp: expression): string;
export declare function to_boolean(inp: expression): boolean;
export declare function to_array(inp: expression): expression[];
