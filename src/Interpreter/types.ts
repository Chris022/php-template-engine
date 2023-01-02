export type expression = number | string | boolean | expression[] |  { [index: string|number]: expression }

export function cloneExpression(val:expression):expression{
    return JSON.parse(JSON.stringify(val))
}

//converstion functions
export function to_number(inp:expression):number{
    if(typeof inp == "number") return inp
    if(typeof inp == "string"){
        try {
            return parseFloat(inp)
        } catch (error) {
            return 0
        }
    }
    if(typeof inp == "boolean") return inp===true ? 1 : 0
    if(typeof inp == "object") return inp.length == 0 ? 0 :1
    return inp
}

export function to_string(inp:expression):string{
    if(typeof inp == "number") return inp + ""
    if(typeof inp == "string") return inp
    if(typeof inp == "boolean") return inp===true ? "1" :""
    if(typeof inp == "object") return "Array"
    return inp
}

export function to_boolean(inp:expression):boolean{
    if(typeof inp == "number") return inp==0.0 ? false :true
    if(typeof inp == "string") return inp==="0"||inp==="" ? false :true
    if(typeof inp == "boolean") return inp
    if(typeof inp == "object") return inp.length == 0 ? false :true
    return inp
}

export function to_array(inp:expression):expression[]{
    if(typeof inp == "number") return [inp]
    if(typeof inp == "string") return [inp]
    if(typeof inp == "boolean") return [inp]
    if(typeof inp == "object") return Object.values(inp)
    return inp
}