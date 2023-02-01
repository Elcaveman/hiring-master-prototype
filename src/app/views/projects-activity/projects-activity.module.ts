import { NgModule } from '@angular/core';

import { ProjectsActivityRoutingModule } from './projects-activity-routing.module';
import { ActivityAllComponent } from './components/routes/activity-all/activity-all.component';
import { ActivityIdComponent } from './components/routes/activity-id/activity-id.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
    NzDividerModule,
  ]
})
export class ProjectsActivityModule { }
