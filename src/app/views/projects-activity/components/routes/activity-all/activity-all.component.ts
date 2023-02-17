import { Component, OnDestroy, OnInit } from '@angular/core';
import { from,Observable,groupBy,mergeMap,of, toArray, BehaviorSubject, reduce, filter, elementAt, map, finalize, tap, take, Subject, takeUntil, throwError, switchMap, min } from 'rxjs';
import { RawActivity,Activity, Interview, Reminder, Reunion,Task, ACTIVITY_MEDIUM,INTERVIEW_MEDIUM,REUNION_MEDIUM,TASK_MEDIUM } from 'src/app/core/models/activity';
import { Person } from 'src/app/core/models/person';
import { FakeDataService } from 'src/app/core/services/fake-data.service';
import { PositiveNumber } from 'src/app/core/types/sign';
import { SafeMap } from 'src/app/core/utilities/safeMap';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { ActivityModalService } from 'src/app/core/services/activity-modal.service';
import { TextMethodsService } from 'src/app/core/services/utils/text-methods.service';
import { TimeMethodsService } from 'src/app/core/services/utils/time-methods.service';


@Component({
  selector: 'app-activity-all',
  templateUrl: './activity-all.component.html',
  styleUrls: ['./activity-all.component.scss']
})
export class ActivityAllComponent implements OnInit,OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  HOURS_MINUTES_REGEX = /[0-2][0-9]\:[0-5][0-9]/
  START_TIME = 8;
  END_TIME = 22;
  MINUTES_STEP = 15;
  timeOptions:string[] = this.timeMethodsService.timeRange(this.START_TIME,this.END_TIME,this.MINUTES_STEP);
  filteredTimeOptions:string[] = [...this.timeOptions];
  selectedTime:Map<number,{time:[number,number],display:string}>=new Map();
  
  bgColorClasses = ["bg-megenta-3","bg-cyan-3","bg-deepPurple-3"];// TODO: add default color for user to customise
  checked = new SafeMap<number,boolean>(false);
  indeterminate = new SafeMap<number,boolean>(false);
  timeModelMap = new SafeMap<number,string>("08:00");
  creationAvatar = 0; // activityId
  loading = false;
  setOfCheckedId = new Set<number>();
  setOfExpandedId = new Set<number>();
  timeInput = "";
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

  constructor(
    private fakeDataService:FakeDataService,
    private nzContextMenuService:NzContextMenuService,
    private activityModalService_:ActivityModalService,
    public textMethodsService:TextMethodsService,
    public timeMethodsService:TimeMethodsService,
    ){}
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
      tap(groups=>{
        this.setCheckStatus(groups);
      })
    )
  }
  reloadActivities(){
    this.toogleCreationAvatar(false,0);
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
      tap(groups=>{
        this.setCheckStatus(groups);
      }),
      tap(arr=>{
        for (let i=0;i<arr.length;i++){
          for (let j=0;j<arr[i].length;j++){
            const option = this.timeMethodsService.getTime(arr[i][j].time)
            this.selectedTime.set(arr[i][j].id,{display:this.timeMethodsService.timeToString(option),time:option});
          }
        }
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
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  toogleCreationAvatar($event:boolean,activityId:number){
    ($event)?(this.creationAvatar=activityId):(this.creationAvatar=0);
  }
  onDateChange(date: Date,activityId:number): void {
    this.fakeDataService.updateActivityById(activityId,{time:date}).subscribe()
  }
  onExpandChange( $event:any,id:number){
    if (this.setOfExpandedId.has(id)){
      this.setOfExpandedId.delete(id);
    }
    else{
      this.setOfExpandedId.add(id);
    }
  }
  onTimeChange($event:{time:[number,number],display:string},data:Activity){
    const originalDate = data.time;
    originalDate.setHours(...$event.time);
    this.fakeDataService.updateActivityById(data.id,{time:data.time}).subscribe()
  }
  onTimeInput($event:any){
    //single input at a time
    this.timeInput = $event.target.value;
    this.filteredTimeOptions = this.filteredTimeOptions.filter((time)=>{
      return this.timeMethodsService.compareSelectedTimeString(this.timeInput,time);
    })
  }
  onTimeClick($event:any){
    this.resetTimeInput()
  }
  resetTimeInput(){
    this.timeInput = "";
    this.filteredTimeOptions = [...this.timeOptions];
  }
  onTimeSelect($event:any,data:Activity){
    this.timeInput = $event;
    if (this.timeInput.match(this.HOURS_MINUTES_REGEX)){
      const [ h, m ] = this.timeInput.split(":").map(s=>parseInt(s));
      const date = data.time;
      date.setHours(h,m);
      this.fakeDataService.updateActivityById(data.id,{time:date}).subscribe(
        {next:(res)=>{this.reloadActivities()}}
      )
    }
    else{
      //maybe error event
    }
    this.resetTimeInput();
  }
  onTimeEnter($event:any,data:Activity){
    //validate timeInput
    if (this.timeInput.match(this.HOURS_MINUTES_REGEX)){
      const [ h, m ] = this.timeInput.split(":").map(s=>parseInt(s));
      const date = data.time;
      date.setHours(h,m);
      this.fakeDataService.updateActivityById(data.id,{time:date}).subscribe(
        {next:(res)=>{this.reloadActivities()}}
      )
    }
    else{
      //maybe error event
    }
    this.resetTimeInput();
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
  setCheckStatus(groupList:(Interview | Reminder | Reunion | Task )[][]): void {
    groupList.forEach(
      (group,groupIndex)=>{
        let checked = true;
        let indeterminate = false;
        for (let activity of group){
          if (!indeterminate && activity.finished == true){
            indeterminate = true;// means at least one activity is finished
          }
          if (checked && activity.finished == false){
            checked = false;// means at least one activity is NOT finished
          }
        }
        if (checked) indeterminate = false;// means all activities are finished
        this.checked.set(groupIndex,checked);
        this.indeterminate.set(groupIndex,indeterminate);
      }
    )
  }
  onItemChecked(data: (Activity | Interview | Reminder | Reunion | Task )): void {
    this.updateCheckedSet(data.id, !data.finished);
    this.fakeDataService.finishActivities([{id:data.id,finished:!data.finished}]).pipe(take(1))
    .subscribe(
      { next:(res:{id:number,finished:boolean}[])=>{
        this.updateCheckedSetWithList(res);
        
      },complete:()=>{
        this.reloadActivities();
      }
    })
  }
  onGroupAllChecked(checked: boolean,groupIndex:PositiveNumber): void {
    console.log("checked",checked)
    this.groupedActivityStream$?.pipe(
      take(1),
      map(arr =>{
        // due to take(1) the rest of the map is ignored
        const data = arr[groupIndex].map(activity=>({id:activity.id,finished:checked}));
        return this.fakeDataService.finishActivities(data); 
      }),
      tap(obs=>console.log(obs)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
        next:(update_observable : Observable<{id:number,finished:boolean}[]>)=>{
          update_observable.subscribe(
              {next:(res:{id:number,finished:boolean}[])=>{
                this.updateCheckedSetWithList(res);
                
              },
              complete:()=>{
                this.reloadActivities();
              }
            }
            )
        },
        error:(err)=>console.warn(err)
      })
  }
  onTitleChange($event:any,data:any){
    // change event only triggers when we do an action outside of the input ( enter key ...) 
    this.fakeDataService.updateActivityById(data.id,{title:$event.target.value}).pipe(
      take(1),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      {
        next:(res)=>{console.log("update title",res)},
        complete:()=>{this.reloadActivities()},
        error:(err)=>{console.warn(err)}
      }
    );
  }
  onDeleteActivity(id:number){
    this.fakeDataService.deleteActivityById(id)
    .pipe(
      take(1),
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe(
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
  updateCheckedSetWithList(dataList:{id:number,finished:boolean}[]){
    dataList.forEach(element => {
      this.updateCheckedSet(element.id,element.finished);
    });

  }
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }
  addActivity($event:any){
    console.log("addActivity")
    this.activityModalService_.showModal();
  }
}
