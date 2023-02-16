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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DropdownSearchComponent } from './components/data/dropdown-search/dropdown-search.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@NgModule({
  declarations: [
    ActivityAllComponent,
    ActivityIdComponent,
    DropdownSearchComponent,
  ],
  imports: [
    ProjectsActivityRoutingModule,
    SharedModule,
    CoreModule,
    NzTableModule,
    NzDividerModule,NzMenuModule,
    NzCollapseModule,
    NzAvatarModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzSelectModule,
    NzDropDownModule,
    NzModalModule,
    NzAutocompleteModule
  ]
})
export class ProjectsActivityModule { }
