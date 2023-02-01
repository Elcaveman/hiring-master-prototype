import { Component } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Activity, Interview, Reminder, Reunion,Task } from 'src/app/core/models/activity';

@Component({
  selector: 'app-activity-all',
  templateUrl: './activity-all.component.html',
  styleUrls: ['./activity-all.component.scss']
})
export class ActivityAllComponent {
  private fake_data : (Interview | Reminder | Reunion | Task )[] = [
    new Interview("interview 1"),new Interview("interview 2"),
    new Reunion("Reunion 1"),new Task("Task 1"),new Reminder("Reminder 1")
  ]
  activitiyStream$:Observable<(Interview | Reminder | Reunion | Task )[]> = of(this.fake_data);
  getCandidate(data : Activity){
    return Interview.getCandidate(data)
  }
  getType(data: Activity){
    return data.getType()
  }
}
