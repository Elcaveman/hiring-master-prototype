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
    new Interview("interview 1"),new Interview("interview 2"),
    new Reunion("Reunion 1"),new Task("Task 1"),new Reminder("Reminder 1")
  ] as (Interview | Reminder | Reunion | Task )[];

  activitiyStream$:BehaviorSubject<(Interview | Reminder | Reunion | Task )[]> = new BehaviorSubject<(Interview | Reminder | Reunion | Task )[]>(this.fake_data);

  ngOnInit(): void {
  }

  getCandidate(data : Activity){
    return Interview.getCandidate(data)
  }
  getType(data: Activity){
    return data.getType()
  }
}
