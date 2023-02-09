import { Component, OnDestroy, OnInit } from '@angular/core';
import { from,Observable,groupBy,mergeMap,of, toArray, BehaviorSubject, reduce, filter, elementAt, map, finalize, tap, take, Subject, takeUntil, throwError, switchMap } from 'rxjs';
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

  // private fake_data : (Interview | Reminder | Reunion | Task )[] = [
  //   new Interview(1,"interview 1"),new Interview(2,"interview 2"),
  //   new Interview(3,"interview 1"),new Reunion(4,"Reunion 2"),
  //   new Reunion(5,"Reunion 1"),new Interview(6,"interview 2"),
  //   new Interview(7,"interview 1"),new Interview(8,"interview 2"),
  //   new Reunion(9,"Reunion 1"),new Task(10,"Task 1"),new Reminder(11,"Reminder 1")
  // ] as (Interview | Reminder | Reunion | Task )[];


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
          this.checked.set(i,false);
          this.indeterminate.set(i,false);
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
  onExpandChange( $event:any,id:number){
    if (this.setOfExpandedId.has(id)){
      this.setOfCheckedId.delete(id);
    }
    else{
      this.setOfExpandedId.add(id);
      
    }
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
  refreshIndeterminateStatus(groupIndex:PositiveNumber): void {
    this.indeterminate.set(groupIndex,this.setOfCheckedId.size>0);
  }
  onItemChecked(id: number, checked: boolean, groupIndex:PositiveNumber): void {
    this.updateCheckedSet(id, checked);
    this.refreshIndeterminateStatus(groupIndex);
  }
  onGroupAllChecked(checked: boolean,groupIndex:PositiveNumber): void {
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
