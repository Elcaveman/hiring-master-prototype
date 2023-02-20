import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../models/activity';
import { Observable, take } from 'rxjs';
import { Person } from '../../models/person';
import { FakeDataService } from '../../services/fake-data.service';
import { TextMethodsService } from '../../services/utils/text-methods.service';

@Component({
  selector: 'core-participant-select',
  template: `
  <ng-container *ngIf="!inline;else inlineMode;">
    <div nz-tooltip nzTooltipTrigger="click" nzTooltipPlacement="bottomLeft" 
          [nzTooltipColor] = "'#ffffff'" nzTooltipOverlayClassName="border-rounded min-width-400"
          [nzTooltipTitle]="inlineMode" 
          (nzTooltipVisibleChange)="clear($event)">
              <nz-avatar class="hover-avatar" [ngClass]="{'toogle':open}" nzIcon="user" [nzSize]="'small'"
              nzTooltipTitle="Ajouter des participants" nzTooltipPlacement="bottom"
              nz-tooltip></nz-avatar> <!--TODO: check if the activity-->
    </div>
  </ng-container>
  <ng-template #inlineMode>
    <div class="dropdown-search">
      <div class="seach-bar">
          <input nz-input type="text" placeholder="Chercher par nom ou email">
      </div>
      <br />
      <div *ngFor="let participant of participantsStream$ | async;let i = index;">
          <div class="participant" (click)="selectParticipant($event,participant)">
              <nz-avatar [nzShape]="'circle'" *ngIf="textMethodsService.getInitials(participant.name)!=null"
                  [class]="bgColorClasses[i%3]" [nzText]="textMethodsService.getInitials(participant.name)!" [nzSize]="'small'" class="avatar">
              </nz-avatar>
              <nz-avatar [nzShape]="'circle'" *ngIf="textMethodsService.getInitials(participant.name)==null"
                  [class]="bgColorClasses[i%3]" [nzIcon]="'user'" [nzSize]="'small'" class="avatar">
              </nz-avatar>
              <div class="name">{{participant.name}}</div>
              <div class="email">{{participant.email}}</div>
          </div>
      </div>
      <nz-divider style="margin:0 0 15px 0;"></nz-divider>
      <div class="add">
          <span nz-icon nzType="plus" nzTheme="outline" ></span> Ajouter des participants par email.
      </div>
    </div>
    </ng-template>
  `,
  styleUrls: ['./participant-select.component.scss']
})
export class ParticipantSelectComponent {
  @Input() activity!:Activity;
  @Output() refresh = new EventEmitter<null>();
  @Input() inline = false;
  open: boolean = false;
  participantsStream$?:Observable<Person[]>;
  bgColorClasses = ["bg-megenta-3","bg-cyan-3","bg-deepPurple-3"];// TODO: add default color for user to customise
  constructor(private fakeDataService:FakeDataService,public textMethodsService:TextMethodsService){}
  ngOnInit(): void {
    this.getOtherParticipantsByActivityId();
  }
  getOtherParticipantsByActivityId(){
    this.participantsStream$ = this.fakeDataService.getOtherParticipantsByActivityId({id:this.activity.id});
  }
  selectParticipant($event:any,participant:Person){
    this.fakeDataService.addParticipantsToActivity(this.activity,[participant])
    .pipe(take(1))
    .subscribe({
      next:(res)=>{console.log(res)},
      complete:()=>{this.refresh.emit();}
    })
  }
  clear($event:boolean){
    this.open = $event;
  }
}
