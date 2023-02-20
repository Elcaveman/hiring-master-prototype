import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'core-minutepicker',
  template: `
    <nz-select [(ngModel)]="selectedOption" (ngModelChange)="selectedMinutesChange.emit($event)" nzPlaceHolder="15 minutes">
      <ng-container *ngFor="let option of minutesOptions;">
        <nz-option [nzValue]="option" [nzLabel]="option"></nz-option>
      </ng-container>
    </nz-select>
    
  `,
  styles: [
  ]
})
export class MinutepickerComponent {
  MINUTES_STEP = 15;
  minutesOptions:string[] = ["15 minutes","30 minutes","45 minutes","60 minutes",
  "90 minutes","2 hours","3 hours","Personaliser"];
  selectedOption:string = this.minutesOptions[0];
  @Output() selectedMinutesChange = new EventEmitter<string>();
}
