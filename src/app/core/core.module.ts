import { NgModule } from '@angular/core';
import { ActivityWriteModalComponent } from './components/activity-write-modal/activity-write-modal.component';
import { SharedModule } from '../shared/shared.module';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    ActivityWriteModalComponent,
    TopNavbarComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    ActivityWriteModalComponent,
    TopNavbarComponent
  ]
})
export class CoreModule { }
