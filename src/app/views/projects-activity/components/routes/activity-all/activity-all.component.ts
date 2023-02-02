import { Component, OnInit } from '@angular/core';
import { from,Observable,groupBy,mergeMap,of, toArray, BehaviorSubject, reduce } from 'rxjs';
import { Activity, Interview, Reminder, Reunion,Task } from 'src/app/core/models/activity';

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


  loading = false;
  setOfCheckedId = new Set<number>();
  activitiyStream$:Observable<(Interview | Reminder | Reunion | Task )[]> = of(this.fake_data);
  groupedActivityStream$?:Observable<(Interview | Reminder | Reunion | Task )[][]>;
  ngOnInit(): void {
    
    this.groupedActivityStream$ = this.activitiyStream$.pipe(
      mergeMap(activity=> from(activity)),// flatten activity array! [1,2,3] => 1,2,3
      groupBy(activity => activity.owner.id),// group by the owners id
      mergeMap(group => group.pipe(toArray())), // convert each group to an individual array
      reduce((acc:(Interview | Reminder | Reunion | Task )[][], curr:(Interview | Reminder | Reunion | Task )[]) => [...acc, curr], []) // TODO: figure out how to type acc
    )
  }
  getUniqueOwners(){

  }
  getCandidate(data : Activity){
    return Interview.getCandidate(data);
  }
  getJob(data : Activity){
    return Interview.getJob(data);
  }
  getType(data: Activity){
    return data.getType();
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }


}
