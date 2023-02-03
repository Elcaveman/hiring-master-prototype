import { Component, OnInit } from '@angular/core';
import { from,Observable,groupBy,mergeMap,of, toArray, BehaviorSubject, reduce, filter, elementAt, map, finalize, tap } from 'rxjs';
import { Activity, Interview, Reminder, Reunion,Task } from 'src/app/core/models/activity';
import { Person } from 'src/app/core/models/person';
import { PositiveNumber } from 'src/app/core/types/sign';
import { SafeMap } from 'src/app/core/utilities/safeMap';

@Component({
  selector: 'app-activity-all',
  templateUrl: './activity-all.component.html',
  styleUrls: ['./activity-all.component.scss']
})
export class ActivityAllComponent implements OnInit {
    
  private fake_data : (Interview | Reminder | Reunion | Task )[] = [
    new Interview(1,"interview 1"),new Interview(3,"interview 2"),
    new Reunion(4,"Reunion 1"),new Task(5,"Task 1"),new Reminder(6,"Reminder 1")
  ] as (Interview | Reminder | Reunion | Task )[];

  checked = new SafeMap<number,boolean>(false);
  indeterminate = new SafeMap<number,boolean>(false);
  loading = false;
  setOfCheckedId = new Set<number>();
  activitiyStream$:Observable<(Interview | Reminder | Reunion | Task )[]> = of(this.fake_data);
  groupedActivityStream$?:Observable<(Interview | Reminder | Reunion | Task )[][]>;
  ngOnInit(): void {
    
    this.groupedActivityStream$ = this.activitiyStream$.pipe(
      mergeMap(activity=> from(activity)),// flatten activity array! [1,2,3] => 1,2,3
      groupBy(activity => activity.owner.id),// group by the owners id
      mergeMap(group => group.pipe(toArray())), // convert each group to an individual array
      reduce((acc:(Interview | Reminder | Reunion | Task )[][], curr:(Interview | Reminder | Reunion | Task )[]) => [...acc, curr], []), // TODO: figure out how to type acc
      tap(arr=>{
        console.log("this is the groupedActivityStream",arr)
        for (let i=0;i<arr.length;i++){
          this.checked.set(i,false);
          this.indeterminate.set(i,false);
        }
      })
    )
  }
  getUniqueOwners(){

  }
  getCandidate(data : Activity):Person | null{
    return Interview.getCandidate(data);
  }
  getJob(data : Activity){
    return Interview.getJob(data);
  }
  getType(data: Activity){
    return data.getType();
  }
  refreshIndeterminateStatus(groupIndex:PositiveNumber): void {
    this.indeterminate.set(groupIndex,this.setOfCheckedId.size>0);
  }
  onItemChecked(id: number, checked: boolean, groupIndex:PositiveNumber): void {
    this.updateCheckedSet(id, checked);
    this.refreshIndeterminateStatus(groupIndex);
  }
  onGroupAllChecked(checked: boolean,groupIndex:PositiveNumber): void {
    console.log("onGroupAllChecked",checked,groupIndex)
    this.groupedActivityStream$?.pipe(
      map(arr =>{
        for (let activity of arr[groupIndex]){
          if (checked) this.setOfCheckedId.add(activity.id);
          else this.setOfCheckedId.delete(activity.id);
        }
      }),
      finalize(()=>{this.checked.set(groupIndex,true);this.indeterminate.set(groupIndex,false);}
    ))
    .subscribe();


    // .filter(
    //   arr => 
    // )
    //   .filter(({ disabled }) => !disabled)
    //   .forEach(({ id }) => this.updateCheckedSet(id, checked));
    // this.refreshCheckedStatus();
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }


}
