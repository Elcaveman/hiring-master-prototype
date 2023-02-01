import { NgModule } from '@angular/core';
import { ActivityWriteModalComponent } from './components/activity-write-modal/activity-write-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ActivityWriteModalComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    ActivityWriteModalComponent
  ]
})
export class CoreModule { }
