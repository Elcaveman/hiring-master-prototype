import { PositiveNumber } from "../types/sign";
import { People } from "./people";
import { Job } from "./job";
import { Office } from "./office";

enum INTERVIEW_MEDIUM {phone,face2face,technical,viseo};
enum INTERVIEW_TYPES {new,screening,technical,hr,validation};
enum REUNION_MEDIUM {phone,technical,viseo};
enum TASK_MEDIUM {phone,email,deadline,coffe,paint,menu};
enum VISIBILITIES {public,participants,private};
enum REMINDER_TYPES {notification,mail};

class ActivityManagement{
    visibility: VISIBILITIES = VISIBILITIES.public;
    reminders:PositiveNumber[] =[];// remind X minutes of the meeting if ==[] it means no reminder
    specialNotification: People[] = [];
    comment:string="";
}

export class Activity extends ActivityManagement{
    title="";
    time:Date = new Date();
    participants:People[] = [];
    description= "";
}
export class Interview extends Activity{
    type:INTERVIEW_TYPES = INTERVIEW_TYPES.technical;
    medium:INTERVIEW_MEDIUM = INTERVIEW_MEDIUM.phone;
    candidates:People[] = [];
    job!:Job;
    adress!:Office;
}
export class Reunion extends Activity{
    medium:REUNION_MEDIUM = REUNION_MEDIUM.phone;
    adress!:Office;
}
export class Task extends Activity{
    medium:TASK_MEDIUM = TASK_MEDIUM.phone;
}
export class Reminder{
    title="";
    date:Date=new Date();
    type: REMINDER_TYPES = REMINDER_TYPES.notification;
    visibility: VISIBILITIES = VISIBILITIES.public;
}