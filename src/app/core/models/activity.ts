import { PositiveNumber } from "../types/sign";
import { Person,User } from "./person";
import { Job } from "./job";
import { Office } from "./office";

// export enum INTERVIEW_MEDIUM {phone,face2face,technical,viseo};
// export enum REUNION_MEDIUM {phone,technical,viseo};
// export enum TASK_MEDIUM {phone,email,deadline,coffe,paint,menu};

export const INTERVIEW_MEDIUM = ['phone','face2face','technical','viseo','other'] as const;
export const REUNION_MEDIUM = ['phone','technical','viseo','other'] as const;
export const TASK_MEDIUM = ['phone','email','deadline','coffee','paint','menu','other'] as const;
type INTERVIEW_MEDIUM_TYPE = typeof INTERVIEW_MEDIUM[number];
type REUNION_MEDIUM_TYPE = typeof REUNION_MEDIUM[number];
type TASK_MEDIUM_TYPE = typeof TASK_MEDIUM[number];

enum VISIBILITIES {public,participants,private};
enum INTERVIEW_TYPES {new,screening,technical,hr,validation};
namespace INTERVIEW_TYPES{
    export function fromString(option:string):INTERVIEW_TYPES{
        switch(option){
            case "new":
                return INTERVIEW_TYPES.new;
            case "screening":
                return INTERVIEW_TYPES.screening;
            case "technical":
                return INTERVIEW_TYPES.technical;
            case "hr":
                return INTERVIEW_TYPES.hr;
            case "validation":
                return INTERVIEW_TYPES.validation;
            default:
                return INTERVIEW_TYPES.hr;
        }
    }
}
enum REMINDER_TYPES {notification,mail};

export type ACTIVITY_MEDIUM = INTERVIEW_MEDIUM_TYPE | REUNION_MEDIUM_TYPE | TASK_MEDIUM_TYPE
export namespace ACTIVITY_MEDIUM{
    export function getIcon(medium:ACTIVITY_MEDIUM){    
        switch (medium) {
            case "phone":
                return 'phone';
            case "face2face":
                return 'swap';
            case "technical":
                return 'experiment';
            case "viseo":
                return 'video-camera';
            case "email":
                return 'mail';
            case "deadline":
                return 'field-time';
            case "coffee":
                return 'coffee';
            case "paint":
                return 'format-painter';
            case "menu":
                return 'appstore';  
            default:
                return "question";
        }
    }
}
export const RAW_ACTIVITY_TYPES=["INTERVIEW","REUNION","TASK","REMINDER"] as const;
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
    deadline:Date;
    participants:Person[];
    description: string;
    owner:User;
    finished:boolean;
    subActivities: Activity[];
    getType() : string;
    // fromRawActivity(rawActivity:RawActivity):(Interview | Reminder | Reunion | Task); static factory
}
export class RawActivity{
    id:number = 0;
    visibility:string = "public";
    comment:string = "";
    title:string = "";
    time:Date = new Date();
    deadline:Date = new Date();
    participants:Person[] = [];
    description:string = "";
    owner:Person=new Person();
    candidate?:Person= new Person();
    subActivities = [];
    job:string="";
    address:string="";
    medium:ACTIVITY_MEDIUM="phone";
    type:string="";
    activityType:typeof RAW_ACTIVITY_TYPES[number]="REMINDER";
    finished:boolean=true;

    static generateActivity(rawActivity:any):(Interview | Reminder | Reunion | Task){
        if (rawActivity.activityType=="INTERVIEW"){
            return Interview.fromRawActivity(rawActivity);
        }
        if (rawActivity.activityType=="REUNION"){
            return Reunion.fromRawActivity(rawActivity);
        }
        if (rawActivity.activityType=="TASK"){
            return Task.fromRawActivity(rawActivity);
        }
        if (rawActivity.activityType=="REMINDER"){
            return Reminder.fromRawActivity(rawActivity);
        }
        throw Error("BAD DATA")
    }
}
export class Interview implements Activity{
    id= 0;
    owner= new User(1,"Victorine Goethiers");
    type:INTERVIEW_TYPES = INTERVIEW_TYPES.technical;
    medium:INTERVIEW_MEDIUM_TYPE = 'technical';
    candidate:Person = new Person();
    job!:Job;
    address!:Office;
    title="";
    finished=false;
    time=new Date();
    deadline=new Date();
    participants:Person[]= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    subActivities : Activity[]=[];
    constructor(){
    }
    static fromRawActivity(rawActivity: RawActivity): Interview{
        const interview = new Interview();
        interview.id = rawActivity.id
        interview.owner = rawActivity.owner
        interview.type = INTERVIEW_TYPES.fromString(rawActivity.type);
        interview.medium = "phone";// TODO: fetch and garenty return the correct string
        console.log("rawActivity.candidate",rawActivity)
        interview.candidate = (rawActivity.candidate)?rawActivity.candidate:new Person();

        interview.job = new Job();
        interview.job.title = rawActivity.job;

        interview.address = new Office();
        interview.address.address= rawActivity.address;

        interview.title = rawActivity.title
        interview.finished = rawActivity.finished
        interview.time = new Date(rawActivity.time);
        interview.deadline = new Date(rawActivity.deadline);
        interview.participants = [...Person.fromArray(rawActivity.participants)];
        interview.description = rawActivity.description
        interview.visibility = VISIBILITIES.public;// TODO: fetch and garenty return the correct string
        // interview.reminders = rawActivity.reminders
        // interview.specialNotification = rawActivity.specialNotification
        interview.comment = rawActivity.comment;
        interview.finished = rawActivity.finished;
        return interview;
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
    medium:REUNION_MEDIUM_TYPE = 'phone';
    address!:Office;
    title="";
    time=new Date();
    deadline=new Date();
    participants:Person[]= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    subActivities:Activity[]=[];
    finished=false;
    constructor(){
    }
    static fromRawActivity(rawActivity: RawActivity): Reunion{
        const reunion = new Reunion();
        reunion.id = rawActivity.id
        reunion.owner = rawActivity.owner
        reunion.medium = "phone";// TODO: fetch and garenty return the correct string

        reunion.address = new Office();
        reunion.address.address= rawActivity.address;

        reunion.title = rawActivity.title
        reunion.finished = rawActivity.finished
        reunion.time = new Date(rawActivity.time);
        reunion.deadline = new Date(rawActivity.deadline);
        reunion.participants = [...Person.fromArray(rawActivity.participants)];

        reunion.description = rawActivity.description
        reunion.visibility = VISIBILITIES.public;// TODO: fetch and garenty return the correct string
        // interview.reminders = rawActivity.reminders
        // interview.specialNotification = rawActivity.specialNotification
        reunion.comment = rawActivity.comment;
        reunion.finished = rawActivity.finished;
        return reunion;
    }
    getType(): string {
        return "Reunion";
    }
}
export class Task implements Activity{
    id= 0;
    owner= new User(15,"Abdelali senhadji");
    medium:TASK_MEDIUM_TYPE = 'coffee';
    title="";
    time=new Date();
    deadline=new Date();
    participants:Person[]= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    finished=false;
    subActivities:Activity[]=[];
    constructor(){
    }
    static fromRawActivity(rawActivity: RawActivity): Task{
        const task = new Task();
        task.id = rawActivity.id
        task.owner = rawActivity.owner
        task.medium = "phone";// TODO: fetch and garenty return the correct string

        task.title = rawActivity.title
        task.finished = rawActivity.finished
        task.time = new Date(rawActivity.time);
        task.deadline = new Date(rawActivity.deadline);
        task.participants = [...Person.fromArray(rawActivity.participants)];
        task.description = rawActivity.description
        task.visibility = VISIBILITIES.public;// TODO: fetch and garenty return the correct string
        // interview.reminders = rawActivity.reminders
        // interview.specialNotification = rawActivity.specialNotification
        task.comment = rawActivity.comment
        task.finished = rawActivity.finished;
        return task;
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
    deadline=new Date();
    participants= [];
    description = "";
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders = [];
    specialNotification = [];
    comment = "";
    finished=false;
    subActivities:Activity[]=[];
    constructor(){
    }
    static fromRawActivity(rawActivity: RawActivity): Reminder{
        const reminder = new Reminder();
        reminder.id = rawActivity.id
        reminder.owner = rawActivity.owner

        reminder.title = rawActivity.title
        reminder.finished = rawActivity.finished
        reminder.time = new Date(rawActivity.time);
        reminder.deadline = new Date(rawActivity.deadline);
        reminder.description = rawActivity.description
        reminder.visibility = VISIBILITIES.public;// TODO: fetch and garenty return the correct string
        // interview.reminders = rawActivity.reminders
        // interview.specialNotification = rawActivity.specialNotification
        reminder.comment = rawActivity.comment
        reminder.finished = rawActivity.finished;
        return reminder;
    }
    getType(): string {
        return "Reminder";
    }
}
