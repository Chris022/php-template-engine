export declare class RunTimeError extends Error {
    constructor(message: string, from: number, to: number, in_?: string);
}
export declare class BreakError extends Error {
    value: string;
    constructor(value: string);
}
export declare class ContinueError extends Error {
    value: string;
    constructor(value: string);
}
