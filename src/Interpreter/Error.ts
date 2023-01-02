
export class RunTimeError extends Error{
    constructor(message:string,from:number,to:number,in_?:string,){
        if(in_ == undefined) super("At " + from + "-" + to +": "+message)
        else super("In: " + in_ +" at " + from + "-" + to +": "+message)
    }
}

export class BreakError extends Error{
    constructor(public value:string){super()}
}

export class ContinueError extends Error{
    constructor(public value:string){super()}
}