import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'core-minutepicker',
  template: `
    <nz-select [ngModel]="selectedOption" nzDisabled (ngModelChange)="selectedMinutesChange.emit($event)">
      <ng-container *ngFor="let option of selectedOption;">
        <nz-option [nzValue]="option"></nz-option>
      </ng-container>
    </nz-select>
    
  `,
  styles: [
  ]
})
export class MinutepickerComponent {
  MINUTES_STEP = 15;
  minutesOptions:string[] = ["15 minutes","30 minutes","45 minutes","60 minutes",
  "90 minutes","2 hours","2 hours","Personaliser"];
  selectedOption = this.minutesOptions[0];
  @Output() selectedMinutesChange = new EventEmitter<string>();
}
