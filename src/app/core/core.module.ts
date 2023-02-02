import { NgModule } from '@angular/core';
import { ActivityWriteModalComponent } from './components/activity-write-modal/activity-write-modal.component';
import { SharedModule } from '../shared/shared.module';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';

@NgModule({
  declarations: [
    ActivityWriteModalComponent,
    TopNavbarComponent,
    SideNavbarComponent
  ],
  imports: [
    SharedModule,
    NzAutocompleteModule,
    NzInputModule,
    NzAvatarModule
  ],
  exports:[
    ActivityWriteModalComponent,
    TopNavbarComponent,
    SideNavbarComponent
    
  ]
})
export class CoreModule { }
