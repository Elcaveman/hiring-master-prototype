export class TimeDto{
    id!:number;
    data!:{time:Date};
    constructor(id:number,data:{time:Date}){
        this.id=id;
        this.data=data;
    }
}