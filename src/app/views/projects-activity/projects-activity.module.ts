import { NgModule } from '@angular/core';

import { ProjectsActivityRoutingModule } from './projects-activity-routing.module';
import { ActivityAllComponent } from './components/routes/activity-all/activity-all.component';
import { ActivityIdComponent } from './components/routes/activity-id/activity-id.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
  declarations: [
    ActivityAllComponent,
    ActivityIdComponent,
  ],
  imports: [
    ProjectsActivityRoutingModule,
    SharedModule,
    CoreModule,
    NzTableModule,
    NzDividerModule,NzMenuModule,
    NzCollapseModule,
    NzAvatarModule
  ]
})
export class ProjectsActivityModule { }
