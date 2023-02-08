
interface Person_{
    id:number;
    name:string;
    image:string;//regex validation URL
    email:string;//regex validation X@Y.Z
    phone:string;//regex validation +33 XX
}
export class Person implements Person_{
    static fromArray(participants: any[] ): Person[] {
        const res :Person[] = [];
        for (let participant of participants){
            let person = new Person();
            person.id=participant.id;
            person.name=participant.name;
            person.name=participant.image;
            person.email=participant.email;
            person.phone=participant.phone;
            res.push(person);
        }
        return res;
    }
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