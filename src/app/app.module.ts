import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
