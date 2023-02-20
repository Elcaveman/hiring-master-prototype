import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextMethodsService } from '../../services/utils/text-methods.service';
import { TimeMethodsService } from '../../services/utils/time-methods.service';
import { Activity, Interview, Reminder, Reunion, Task } from '../../models/activity';
import { TimeDto } from '../time';

@Component({
  selector: 'core-timepicker',
  template: `
    <!-- <nz-time-picker [(ngModel)]="data.time" nzFormat="HH:mm" class="p-0 m-0 no-suffix-icon"
    (ngModelChange)="onChange($event)" nzBorderless
    [ngClass]="{'overdue':data.time.getTime() >= data.deadline.getTime()}"
    ></nz-time-picker> -->
    <ng-container *ngIf="data">
      <input placeholder="08:00"
      nz-input
      [nzBorderless]="true"
      [(ngModel)]="data.hours"
      (ngModelChange)="onTimeSelect($event,data)"
      (input)="onTimeInput($event)"
      (click)="onTimeClick($event)"
      (keyup.enter)="onTimeEnter($event,data)"
      [nzAutocomplete]="auto">
      <nz-autocomplete #auto [compareWith]="timeMethodsService.compareSelectedTimeString">
          <ng-container *ngFor="let option of filteredTimeOptions">
              <nz-auto-option [nzValue]="option">{{option}}</nz-auto-option>
          </ng-container>
          
      </nz-autocomplete>
    </ng-container>
  `,
  styles: [
  ]
})
export class TimepickerComponent {
  HOURS_MINUTES_REGEX = /[0-2][0-9]\:[0-5][0-9]/;
  START_TIME = 8;
  END_TIME = 22;
  MINUTES_STEP = 15;
  timeOptions:string[] = this.timeMethodsService.timeRange(this.START_TIME,this.END_TIME,this.MINUTES_STEP);
  filteredTimeOptions:string[] = [...this.timeOptions];
  @Input() data? : Interview | Reminder | Reunion | Task;
  // @Input() timeInput:string = "";
  // @Output() timeInputChange = new EventEmitter<string>();
  timeInput:string = "";
  @Output() timeChange = new EventEmitter<TimeDto>();

  constructor(public textMethodsService:TextMethodsService,public timeMethodsService:TimeMethodsService){

  }

  onTimeChange($event:{time:[number,number],display:string},data:Activity){
    const originalDate = data.time;
    originalDate.setHours(...$event.time);
    this.timeChange.emit(new TimeDto(data.id,{time:data.time}));
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
      this.timeChange.emit(new TimeDto(data.id,{time:date}));
      
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
      this.timeChange.emit(new TimeDto(data.id,{time:date}));
    }
    else{
      //maybe error event
    }
    this.resetTimeInput();
  }
}
