import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeMethodsService } from '../../services/utils/time-methods.service';
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
  selectedActivityType: "Interview" | "Task" | "Reunion" | "Reminder" = "Interview";
  finished = false;
  constructor(private timeMethodsService:TimeMethodsService){}
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleChange.emit(false);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleChange.emit(false);
  }
}
