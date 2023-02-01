import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityAllComponent } from './components/routes/activity-all/activity-all.component';

const routes: Routes = [
  {path:'',component:ActivityAllComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsActivityRoutingModule { }
