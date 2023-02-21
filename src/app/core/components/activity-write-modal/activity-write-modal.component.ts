import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeMethodsService } from '../../services/utils/time-methods.service';
import { Interview, RAW_ACTIVITY_TYPES, INTERVIEW_MEDIUM, TASK_MEDIUM, REUNION_MEDIUM, ACTIVITY_MEDIUM } from '../../models/activity';
import { SafeMap } from '../../utilities/safeMap';
/*
 * Activity : 
 * Write : meaning it's capable of doing create, update or delete operations 
 */
@Component({
  selector: 'app-activity-write-modal',
  templateUrl: './activity-write-modal.component.html',
  styleUrls: ['./activity-write-modal.component.scss']
})
export class ActivityWriteModalComponent {
  @Input() isVisible =false;
  @Output() isVisibleChange = new EventEmitter<boolean>;
  activityTypeList = RAW_ACTIVITY_TYPES;
  activityMediumMap = new SafeMap<string,any>([],[
    ["INTERVIEW",INTERVIEW_MEDIUM],
    ["REUNION",REUNION_MEDIUM],
    ["TASK",TASK_MEDIUM],
  ]);
  ACTIVITY_MEDIUM = ACTIVITY_MEDIUM;
  selectedActivityType: typeof RAW_ACTIVITY_TYPES[number] = RAW_ACTIVITY_TYPES[0];
  finished = false;
  data = new Interview(); // needs to change when selecteActivity type changes
  constructor(private timeMethodsService:TimeMethodsService){}
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleChange.emit(false);
  }
  onSelectedCandidate($event:any){
    console.log($event);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleChange.emit(false);
  }
  selectedMinutesChange($event:string){
    console.log($event)
  }
  timeChange($event:any){
    console.log($event)
  }
  onSelectActivityType(activityType:typeof RAW_ACTIVITY_TYPES[number]){
    this.selectedActivityType = activityType;
  }
}
