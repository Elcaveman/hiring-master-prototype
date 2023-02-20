import { NgModule } from '@angular/core';
import { ActivityWriteModalComponent } from './components/activity-write-modal/activity-write-modal.component';
import { SharedModule } from '../shared/shared.module';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {RouterModule} from '@angular/router';
import { CustomDatepickerMenuDirective } from './directives/custom-datepicker-menu.directive';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MinutepickerComponent } from './components/datetime/minutepicker/minutepicker.component';
import { DatepickerComponent } from './components/datetime/datepicker/datepicker.component';
import { TimepickerComponent } from './components/datetime/timepicker/timepicker.component';
import { CandidateSelectComponent } from './components/candidate-select/candidate-select.component';
import { ParticipantSelectComponent } from './components/participant-select/participant-select.component';

@NgModule({
  declarations: [
    ActivityWriteModalComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    CustomDatepickerMenuDirective,
    TimepickerComponent,
    DatepickerComponent,
    MinutepickerComponent,
    CandidateSelectComponent,
    ParticipantSelectComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    NzAutocompleteModule,
    NzAvatarModule,
    NzBadgeModule,
    NzCheckboxModule
  ],
  exports:[
    ActivityWriteModalComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    CustomDatepickerMenuDirective,
    DatepickerComponent,
    TimepickerComponent,
    MinutepickerComponent,
  ]
})
export class CoreModule { }
