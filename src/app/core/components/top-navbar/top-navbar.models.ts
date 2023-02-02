export enum STATE_ENUM { ACTIVE, INNACTIVE}

export class TopNavDisplayModel{
    title: string=""; // can change
    state:STATE_ENUM=STATE_ENUM.ACTIVE; // can change
    constructor(title:string,state:string){
        this.title = title;
        (state=="active")?STATE_ENUM.ACTIVE:STATE_ENUM.INNACTIVE
    }
}