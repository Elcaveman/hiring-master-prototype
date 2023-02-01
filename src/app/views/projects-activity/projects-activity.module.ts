import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsActivityRoutingModule } from './projects-activity-routing.module';
import { ActivityAllComponent } from './components/routes/activity-all/activity-all.component';


@NgModule({
  declarations: [
    ActivityAllComponent
  ],
  imports: [
    CommonModule,
    ProjectsActivityRoutingModule
  ]
})
export class ProjectsActivityModule { }
