import { PositiveNumber } from "../types/sign";
import { Person,User } from "./person";
import { Job } from "./job";
import { Office } from "./office";

enum INTERVIEW_MEDIUM {phone,face2face,technical,viseo};
enum REUNION_MEDIUM {phone,technical,viseo};
enum TASK_MEDIUM {phone,email,deadline,coffe,paint,menu};

enum VISIBILITIES {public,participants,private};
enum INTERVIEW_TYPES {new,screening,technical,hr,validation};
enum REMINDER_TYPES {notification,mail};

export enum ACTIVITY_MEDIUM {
    phone,face2face,technical,viseo,email,deadline,coffe,paint,menu,
}
export namespace ACTIVITY_MEDIUM{
    export function getIcon(medium:string){
        console.log("medium",medium);
        switch (medium) {
            case ACTIVITY_MEDIUM.phone.toString():
                return 'phone';
            case ACTIVITY_MEDIUM.face2face.toString():
                return 'swap';
            case ACTIVITY_MEDIUM.technical.toString():
                return 'experiment';
            case ACTIVITY_MEDIUM.viseo.toString():
                return 'video-camera';
            case ACTIVITY_MEDIUM.email.toString():
                return 'mail';
            case ACTIVITY_MEDIUM.deadline.toString():
                return 'field-time';
            case ACTIVITY_MEDIUM.coffe.toString():
                return 'coffe';
            case ACTIVITY_MEDIUM.paint.toString():
                return 'format-painter';
            case ACTIVITY_MEDIUM.menu.toString():
                return 'appstore';  
            default:
                return null;
        }
    }
}

interface ActivityManagement{
    visibility: VISIBILITIES;
    reminders:PositiveNumber[];// remind X minutes of the meeting if ==[] it means no reminder
    specialNotification: Person[];
    comment:string;
}
// TODO: add builders
export interface Activity extends ActivityManagement{
    id:number;
    title:string;
    time:Date;
    participants:Person[];
    description: string;
    owner:User;
    getType() : string;
}
export class Interview implements Activity{
    id= 0;
    owner= new User(1,"Victorine Goethiers");
    type:INTERVIEW_TYPES = INTERVIEW_TYPES.technical;
    medium:INTERVIEW_MEDIUM = INTERVIEW_MEDIUM.phone;
    candidate:Person = new Person();
    job!:Job;
    adress!:Office;
    title="";
    time=new Date("01/01/2024");
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    constructor(id:number,title:string){
        this.id = id;
        this.title = title;
    }
    getType() {
        return "Interview";
    }
    static getJob(activity:Activity | Interview): Job | null {
        if (activity instanceof Interview){
            return activity.job;
        }
        return null;
    }
    static getCandidate(activity:Activity | Interview) : Person | null{
        if (activity instanceof Interview){
            return activity.candidate;
        }
        return null;
    }
}
export class Reunion implements Activity{
    id= 0;
    owner= new User(10,"John Jack Rousseau");
    medium:REUNION_MEDIUM = REUNION_MEDIUM.phone;
    adress!:Office;
    title="";
    time=new Date();
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    constructor(id:number,title:string){
        this.id = id;
        this.title = title;
    }
    getType(): string {
        return "Reunion";
    }
}
export class Task implements Activity{
    id= 0;
    owner= new User(15,"Abdel kader yaboualam");
    medium:TASK_MEDIUM = TASK_MEDIUM.phone;
    title="";
    time=new Date();
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    constructor(id:number,title:string){
        this.id = id;
        this.title = title;
    }
    getType(): string {
        return "Task";
    }
}
export class Reminder implements Activity{
    id= 0;
    owner= new User(1,"Victorine Goethiers");
    date:Date=new Date();
    type: REMINDER_TYPES = REMINDER_TYPES.notification;
    title="";
    time=new Date();
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    constructor(id:number,title:string){
        this.id = id;
        this.title = title;
    }
    getType(): string {
        return "Reminder";
    }
}
