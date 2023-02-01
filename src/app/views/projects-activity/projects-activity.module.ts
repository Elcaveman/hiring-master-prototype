import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsActivityRoutingModule } from './projects-activity-routing.module';
import { ActivityAllComponent } from './components/routes/activity-all/activity-all.component';
import { ActivityIdComponent } from './components/routes/activity-id/activity-id.component';


@NgModule({
  declarations: [
    ActivityAllComponent,
    ActivityIdComponent
  ],
  imports: [
    CommonModule,
    ProjectsActivityRoutingModule
  ]
})
export class ProjectsActivityModule { }
