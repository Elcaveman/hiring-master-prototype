import { PositiveNumber } from "../types/sign";
import { Person } from "./person";
import { Job } from "./job";
import { Office } from "./office";

enum INTERVIEW_MEDIUM {phone,face2face,technical,viseo};
enum INTERVIEW_TYPES {new,screening,technical,hr,validation};
enum REUNION_MEDIUM {phone,technical,viseo};
enum TASK_MEDIUM {phone,email,deadline,coffe,paint,menu};
enum VISIBILITIES {public,participants,private};
enum REMINDER_TYPES {notification,mail};

interface ActivityManagement{
    visibility: VISIBILITIES;
    reminders:PositiveNumber[];// remind X minutes of the meeting if ==[] it means no reminder
    specialNotification: Person[];
    comment:string;
}
// TODO: add builders
export interface Activity extends ActivityManagement{
    title:string;
    time:Date;
    participants:Person[];
    description: string;
    getType() : string;

}
export class Interview implements Activity{
    type:INTERVIEW_TYPES = INTERVIEW_TYPES.technical;
    medium:INTERVIEW_MEDIUM = INTERVIEW_MEDIUM.phone;
    candidate:Person = new Person();
    job!:Job;
    adress!:Office;
    title="";
    time=new Date();
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    constructor(title:string){
        this.title = title;
    }
    getType(): string {
        return "Interview";
    }
    static getCandidate(activity:Activity | Interview) : Person | null{
        if (activity instanceof Interview){
            return activity.candidate
        }
        return null;
    }
}
export class Reunion implements Activity{
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
    constructor(title:string){
        this.title = title;
    }
    getType(): string {
        return "Reunion";
    }
}
export class Task implements Activity{
    medium:TASK_MEDIUM = TASK_MEDIUM.phone;
    title="";
    time=new Date();
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    constructor(title:string){
        this.title = title;
    }
    getType(): string {
        return "Task";
    }
}
export class Reminder implements Activity{
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
    constructor(title:string){
        this.title = title;
    }
    getType(): string {
        return "Reminder";
    }
}