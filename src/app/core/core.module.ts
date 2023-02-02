import { NgModule } from '@angular/core';
import { ActivityWriteModalComponent } from './components/activity-write-modal/activity-write-modal.component';
import { SharedModule } from '../shared/shared.module';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ActivityWriteModalComponent,
    TopNavbarComponent,
    SideNavbarComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    NzAutocompleteModule,
    NzInputModule,
    NzAvatarModule,
    NzBadgeModule
  ],
  exports:[
    ActivityWriteModalComponent,
    TopNavbarComponent,
    SideNavbarComponent
    
  ]
})
export class CoreModule { }
