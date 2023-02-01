import { Component, OnInit } from '@angular/core';
import { BehaviorSubject,of } from 'rxjs';
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
  activitiyStream$:BehaviorSubject<(Interview | Reminder | Reunion | Task )[]> = new BehaviorSubject<(Interview | Reminder | Reunion | Task )[]>(this.fake_data);

  ngOnInit(): void {
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
