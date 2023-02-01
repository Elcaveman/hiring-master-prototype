import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/projects/activity' },
  { path: 'projects/activity', loadChildren: () => import('./views/projects-activity/projects-activity.module').then(m => m.ProjectsActivityModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
