import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  finished = false;
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleChange.emit(false);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleChange.emit(false);
  }
}
