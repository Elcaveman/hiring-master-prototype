import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Activity } from 'src/app/core/models/activity';
import { Person } from 'src/app/core/models/person';
import { FakeDataService } from 'src/app/core/services/fake-data.service';
import { TextMethodsService } from 'src/app/core/services/utils/text-methods.service';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss']
})
export class DropdownSearchComponent implements OnInit {
  @Input() activity!:Activity;
  @Output() refresh = new EventEmitter<null>();
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
}
