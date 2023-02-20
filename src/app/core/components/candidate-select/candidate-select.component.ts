import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../models/activity';
import { Observable, of, take } from 'rxjs';
import { Person } from '../../models/person';
import { FakeDataService } from '../../services/fake-data.service';
import { TextMethodsService } from '../../services/utils/text-methods.service';

@Component({
  selector: 'core-candidate-select',
  template: `
    <ng-container *ngIf="!inline;else inlineMode">
      <div nz-tooltip nzTooltipTrigger="click" nzTooltipPlacement="bottomLeft" 
        [nzTooltipColor] = "'#ffffff'" nzTooltipOverlayClassName="border-rounded min-width-400"
        [nzTooltipTitle]="inlineMode" 
        (nzTooltipVisibleChange)="clear($event)">
        <nz-input-group [nzPrefix]="prefixCandidateIcon">
          <input id="candidate-input"
           nz-input placeholder="Selectionnez un candidat" [(ngModel)]="candidateName" readonly>
            <!--TODO: check if the activity-->
          <ng-template #prefixCandidateIcon>
            <nz-avatar nzIcon="user" [nzSize]="'small'" class="dotted-avatar"></nz-avatar>
          </ng-template>
        </nz-input-group>
      </div>
    </ng-container>
    <ng-template #inlineMode>
      <div class="dropdown-search">
        <div class="seach-bar">
            <input nz-input type="text" placeholder="Chercher par nom ou email">
        </div>
        <br />
        <div *ngFor="let candidate of candidatesStream$ | async;let i = index;">
            <div class="candidate" (click)="selectCandidate($event,candidate)">
                <nz-avatar [nzShape]="'circle'" *ngIf="textMethodsService.getInitials(candidate.name)!=null"
                    [class]="bgColorClasses[i%3]" [nzText]="textMethodsService.getInitials(candidate.name)!" [nzSize]="'small'" class="avatar">
                </nz-avatar>
                <nz-avatar [nzShape]="'circle'" *ngIf="textMethodsService.getInitials(candidate.name)==null"
                    [class]="bgColorClasses[i%3]" [nzIcon]="'user'" [nzSize]="'small'" class="avatar">
                </nz-avatar>
                <div class="name">{{candidate.name}}</div>
                <div class="email">{{candidate.email}}</div>
            </div>
        </div>
        <nz-divider style="margin:0 0 15px 0;"></nz-divider>
        <div class="add">
            <span nz-icon nzType="plus" nzTheme="outline" ></span> Ajouter des candidats par email.
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./candidate-select.component.scss']
})
export class CandidateSelectComponent {
  @Input() activity?:Activity;
  @Input() inline = false;
  @Output() refresh = new EventEmitter<null>();
  @Output() selected = new EventEmitter<Person>();
  candidateName = "";
  candidatesStream$?:Observable<Person[]>;
  bgColorClasses = ["bg-megenta-3","bg-cyan-3","bg-deepPurple-3"];// TODO: add default color for user to customise
  open: boolean = false;

  constructor(private fakeDataService:FakeDataService,public textMethodsService:TextMethodsService){}
  ngOnInit(): void {
    this.getOtherCandidatesByActivityId();
  }
  getOtherCandidatesByActivityId(){
    if (this.activity)
      this.candidatesStream$ = this.fakeDataService.getOtherCandidatesByActivityId({id:this.activity.id});
    else
    this.candidatesStream$ = this.fakeDataService.getProfileAll();//TODO distinguish between profiles, candidates and participants
  }
  selectCandidate($event:any,candidate:Person){
    let updateStream$
    if(this.activity){
      updateStream$ = this.fakeDataService.addCandidateToActivity(this.activity,candidate);
      if (updateStream$!=null)
        updateStream$.pipe(take(1))
        .subscribe({
          next:(res)=>{console.log(res)},
          complete:()=>{this.refresh.emit();}
        })
    }
    else{
      this.selected.emit(candidate);
    }
    
  }
  clear($event:boolean){
    this.open = $event;
  }
}

