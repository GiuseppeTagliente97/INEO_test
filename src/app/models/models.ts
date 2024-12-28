export interface Task{
    id?:string,
    title:string;
    description:string;
    status?:string;
}

export interface HeaderData{
    title:string;
    router:string;
}

export interface Task_Form{
    title: string,
    name: string,
    placeholder: string,
    type: string,
    value?:string,
    required?:boolean
}

