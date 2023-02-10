import { Component, OnDestroy, OnInit } from '@angular/core';
import { from,Observable,groupBy,mergeMap,of, toArray, BehaviorSubject, reduce, filter, elementAt, map, finalize, tap, take, Subject, takeUntil, throwError, switchMap, min } from 'rxjs';
import { RawActivity,Activity, Interview, Reminder, Reunion,Task, ACTIVITY_MEDIUM,INTERVIEW_MEDIUM,REUNION_MEDIUM,TASK_MEDIUM } from 'src/app/core/models/activity';
import { Person } from 'src/app/core/models/person';
import { FakeDataService } from 'src/app/core/services/fake-data.service';
import { PositiveNumber } from 'src/app/core/types/sign';
import { SafeMap } from 'src/app/core/utilities/safeMap';


@Component({
  selector: 'app-activity-all',
  templateUrl: './activity-all.component.html',
  styleUrls: ['./activity-all.component.scss']
})
export class ActivityAllComponent implements OnInit,OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  START_TIME = 8;
  END_TIME = 22;
  MINUTES_STEP = 15;
  timeOptions:{time:number[],display:string}[] = this.timeRange(this.START_TIME,this.END_TIME,this.MINUTES_STEP);
  selectedTime:Map<number,{time:number[],display:string}>=new Map();
  // private fake_data : (Interview | Reminder | Reunion | Task )[] = [
  //   new Interview(1,"interview 1"),new Interview(2,"interview 2"),
  //   new Interview(3,"interview 1"),new Reunion(4,"Reunion 2"),
  //   new Reunion(5,"Reunion 1"),new Interview(6,"interview 2"),
  //   new Interview(7,"interview 1"),new Interview(8,"interview 2"),
  //   new Reunion(9,"Reunion 1"),new Task(10,"Task 1"),new Reminder(11,"Reminder 1")
  // ] as (Interview | Reminder | Reunion | Task )[];
  
  bgColorClasses = ["bg-megenta-3","bg-cyan-3","bg-deepPurple-3"];// TODO: add default color for user to customise
  checked = new SafeMap<number,boolean>(false);
  indeterminate = new SafeMap<number,boolean>(false);
  loading = false;
  setOfCheckedId = new Set<number>();
  setOfExpandedId = new Set<number>();

  activatedFilters = {
      // TODO: generate this in the filters object in the constructor
     'Interview':{
        activated:true,
        mediums:{
          'phone':false,
          'face2face':false,
          'technical':false,
          'viseo':false,
          'other':false
        }
     },
    'Reunion':{
      activated:false,
      mediums:{
        'phone':false,
        'technical':false,
        'viseo':false,
        'other':false
      }
    },
    'Task':{
      activated:false,
      mediums:{
        'phone':false,
        'email':false,
        'deadline':false,
        'coffee':false,
        'paint':false,
        'menu':false,
        'other':false
      }
    },
    'Reminder':{activated:false,mediums:{
      //only here to avoid field access issues
    }}
  }

  activitiyStream$?:Observable<(Interview | Reminder | Reunion | Task )[]>;
  groupedActivityStream_$?:Observable<(Interview | Reminder | Reunion | Task )[][]>;
  groupedActivityStream$?:Observable<(Interview | Reminder | Reunion | Task )[][]>;
  private readonly refreshToken$ = new BehaviorSubject(undefined);


  now = new Date(); // this is saved and won't update it's value untill the user refreshes the page
  ACTIVITY_MEDIUM = ACTIVITY_MEDIUM;
  INTERVIEW_MEDIUM = INTERVIEW_MEDIUM;
  REUNION_MEDIUM = REUNION_MEDIUM;
  TASK_MEDIUM = TASK_MEDIUM;

  timeRange(start:PositiveNumber,end:PositiveNumber,minutes_step:PositiveNumber):{time:number[],display:string}[]{
    const range:{time:number[],display:string}[]= []
    if (start<end){
      
      for (let hour=start;hour<end;hour++){
        for (let minutes=0;minutes<60;minutes+=minutes_step){
          range.push({
            time:[hour,minutes],
            display:`${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`
          })
        }
      }
      range.push({
        time:[end,0],
        display:`${end>=10?end:'0'+end}:00`
      })
    }
    console.log("timeRange",range);
    return range
  }
  constructor(private fakeDataService:FakeDataService){}
  getActivites(){
    this.activitiyStream$ = this.fakeDataService.getActivityAll().pipe(
      map(activitylist => from(activitylist)),
      mergeMap((activitylist)=>{
        return activitylist.pipe(
          map((rawActivity : RawActivity)=>{
            // TODO: fix the casting operation
            return RawActivity.generateActivity(rawActivity);
          })
        )
      }), 
      reduce((acc:(Interview | Reminder | Reunion | Task )[], curr:(Interview | Reminder | Reunion | Task )) => [...acc, curr], [])
    )
    this.groupedActivityStream_$ = this.activitiyStream$.pipe(
      mergeMap(activity=> from(activity)),// flatten activity array! [1,2,3] => 1,2,3
      groupBy(activity => activity.owner.id),// group by the owners id
      mergeMap(group => group.pipe(toArray())), // convert each group to an individual array
      reduce((acc:(Interview | Reminder | Reunion | Task )[][], curr:(Interview | Reminder | Reunion | Task )[]) => [...acc, curr], []), 
    )
  }
  reloadActivities(){
    this.refreshToken$.next(undefined);
  }
  ngOnInit(): void {
    this.getActivites();
    /*
    * This code initialises the checked & indeterminate maps but
    * this is a one time execution meaning we need to subscribe
    */

    this.groupedActivityStream_$?.pipe(
      take(1),
      tap(arr=>{
        for (let i=0;i<arr.length;i++){
          const filter = arr[i].filter((activity)=>activity.finished == true);
          if (filter.length == arr[i].length){
            this.checked.set(i,true);
            this.indeterminate.set(i,false);
          }
          else{
            this.indeterminate.set(i,filter.length!=0);
          }
          for (let j=0;j<arr[i].length;j++){
            const option = this.approximate(arr[i][j].time,this.START_TIME,this.END_TIME)
            this.selectedTime.set(arr[i][j].id,option);
          }
        }
        console.log("this.selectedTime",this.selectedTime);
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe()

    this.groupedActivityStream$ = this.refreshToken$.pipe(
      switchMap(()=> {
        this.getActivites();
        return this.groupedActivityStream_$!;
      })
    )
  }
  approximate(
    origin_date:Date,
    START_TIME: PositiveNumber,END_TIME: PositiveNumber
    ) :{time:number[],display:string}{

      const [hours,minutes] = [origin_date.getHours(),origin_date.getMinutes()]
      if (hours<START_TIME) return {time:[START_TIME,0],display:`${START_TIME>=10?START_TIME:'0'+START_TIME}:00`}
      else if (hours>END_TIME) return {time:[END_TIME,0],display:`${END_TIME>=10?END_TIME:'0'+END_TIME}:00`}
      else{
        const rounded_minutes = minutes - minutes%15;
        return {
          time:[hours,rounded_minutes],
          display:`${hours>=10?hours:'0'+hours}:${rounded_minutes>=10?rounded_minutes:'0'+rounded_minutes}`
        }
      } 
  }
  compareSelectedTime(o1: any, o2: any):boolean {
    if(o1!=null && o2!=null)
      return (o1.time[0] == o2.time[0] && o1.time[1] == o2.time[1]);
    return false;
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  getInitials(name:string):string|null{
    if(name){
      return name.split(" ").map((t=>t[0]?t[0]:"")).join("");
    }
    else return null;
  }
  onExpandChange( $event:any,id:number){
    if (this.setOfExpandedId.has(id)){
      this.setOfCheckedId.delete(id);
    }
    else{
      this.setOfExpandedId.add(id);
      
    }
  }
  onTimeChange($event:any,id:number){
    console.log("onTimeChange",$event,id)
  }
  onTimeInput($event:any,id:number){
    console.log("onTimeInput",$event,id)
  }
  getCandidate(data : Activity):Person | null{
    return Interview.getCandidate(data);
  }
  getJob(data : Activity){
    return Interview.getJob(data);
  }
  getMedium(data:Activity){
    const medium = (data as any).medium
    if (medium!=undefined){
      return medium.toString();
    }
    else{
      return null;
    }
  }
  getType(data: Activity){
    return data.getType();
  }
  onActivateFilter($event:MouseEvent,activity_type:'Interview' | 'Task' | 'Reunion' | 'Reminder',medium?: ACTIVITY_MEDIUM){
    console.log("onActivateFilter",activity_type,medium);
    if (medium!=undefined && (this.activatedFilters[activity_type].mediums as any)[medium]!=undefined){
      // No need for type check here since we check if medium is part of our base object
      (this.activatedFilters[activity_type].mediums as any)[medium] = !(this.activatedFilters[activity_type].mediums as any)[medium];
      if ((this.activatedFilters[activity_type].mediums as any)[medium] == false){
        // turning off a single filter means the parent is not active ( either totaly active or not)
        this.activatedFilters[activity_type].activated = false;
      }
    }
    else{
      this.activatedFilters[activity_type].activated= !this.activatedFilters[activity_type].activated;
      // activate every thing inside the tree
      for (let key of Object.keys(this.activatedFilters[activity_type].mediums as any)){
        (this.activatedFilters[activity_type].mediums as any)[key] = this.activatedFilters[activity_type].activated;
      }
    }
  }
  refreshStatus(groupIndex:PositiveNumber,count:PositiveNumber): void {
    if (this.setOfCheckedId.size == count && count !=0){
      this.checked.set(groupIndex,this.setOfCheckedId.size == count);
      this.indeterminate.set(groupIndex,false);
    }
    else{
      this.indeterminate.set(groupIndex,this.setOfCheckedId.size!=0);
    }
  }
  onItemChecked(data: any, groupIndex:PositiveNumber,count:PositiveNumber): void {
    data.finished = !data.finished; // TODO: make an endpoint to select data as finished & send request
    this.updateCheckedSet(data.id, data.finished);//only used for underterminate & check logic to avoid looping through data
    this.refreshStatus(groupIndex,count);
  }
  onGroupAllChecked(checked: boolean,groupIndex:PositiveNumber): void {
    // TODO: fix issue
    this.groupedActivityStream$?.pipe(
      map(arr =>{
        for (let activity of arr[groupIndex]){
          if (checked) this.setOfCheckedId.add(activity.id);
          else this.setOfCheckedId.delete(activity.id);
        }
      }),
      finalize(()=>{
        this.checked.set(groupIndex,true);
        this.indeterminate.set(groupIndex,false);
      }
    ))
    .subscribe();


    // .filter(
    //   arr => 
    // )
    //   .filter(({ disabled }) => !disabled)
    //   .forEach(({ id }) => this.updateCheckedSet(id, checked));
    // this.refreshCheckedStatus();
  }
  onDeleteActivity(id:number){
    this.fakeDataService.deleteActivityById(id).subscribe(
      {
        next:(res)=>{console.log("next",res)},
        complete:()=>{
          console.log("delete done");
          this.reloadActivities();
        },
        error:(err)=>{console.warn(err)
      }
      }
    );
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

}
