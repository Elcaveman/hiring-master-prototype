
interface Person_{
    id:number;
    image:string;//regex validation URL
    name:string;
    email:string;//regex validation X@Y.Z
    phone:string;//regex validation +33 XX
}
export class Person implements Person_{
    id=0;
    image="";
    name="";
    email="";
    phone="";
}
export class User implements Person_{
    id=0;
    image="";
    name="";
    email="";
    phone="";
    constructor(id?:number,name?:string){
        id?this.id=id:0
        name?this.name=name:0
    }
}