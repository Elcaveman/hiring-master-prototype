import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityAllComponent } from './components/routes/activity-all/activity-all.component';
import { ActivityIdComponent } from './components/routes/activity-id/activity-id.component';

const routes: Routes = [
  {path:'',component:ActivityAllComponent},
  {path:':id',component:ActivityIdComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsActivityRoutingModule { }
