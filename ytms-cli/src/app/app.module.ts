import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RequesterHeaderComponent} from './Component/Requester/requester-header/requester-header.component';
import {RequesterSidebarComponent} from './Component/Requester/requester-sidebar/requester-sidebar.component';
import {RequesterHomeComponent} from './Component/Requester/requester-home/requester-home.component';
import {LoginComponent} from './Component/login/login.component';
import {ForgotPasswordComponent} from './Component/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {authInterceptorProviders} from "./Core/interceptor/auth.interceptor";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {TmHomeComponent} from './Component/Technical-Manager/tm-home/tm-home.component';
import {TmHeaderComponent} from './Component/Technical-Manager/tm-header/tm-header.component';
import {TmSidebarComponent} from './Component/Technical-Manager/tm-sidebar/tm-sidebar.component';
import {RegistrationComponent} from "./Component/registration/registration.component";
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { CalenderComponent } from './Component/calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { DatePipe } from '@angular/common';
import { TrainingReqComponent } from './Component/Requester/training-req/training-req.component';
import { NominationReqComponent } from './Component/Requester/nomination-req/nomination-req.component';
import { ViewTrfComponent } from './Component/Requester/view-trf/view-trf.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UnitMasterComponent } from './Component/Requester/unit-master/unit-master.component';
import { CompetencyMasterComponent } from './Component/Requester/competency-master/competency-master.component';
import { TrainingTypeMasterComponent } from './Component/Requester/training-type-master/training-type-master.component';
import { TechnologyMasterComponent } from './Component/Requester/technology-master/technology-master.component';
import { UploadExcelComponent } from './Component/upload-excel/upload-excel.component';
import { ViewNominationComponent } from './Component/Requester/view-nomination/view-nomination.component';

@NgModule({
  declarations: [
    AppComponent,
    RequesterHeaderComponent,
    RequesterSidebarComponent,
    RequesterHomeComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    TmHomeComponent,
    TmHeaderComponent,
    TmSidebarComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    CalenderComponent,
    DateFormatPipe,
    TrainingReqComponent,
    NominationReqComponent,
    ViewTrfComponent,
    UnitMasterComponent,
    CompetencyMasterComponent,
    TrainingTypeMasterComponent,
    TechnologyMasterComponent,
    UploadExcelComponent,
    ViewNominationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModule,NgbModalModule,
    MatDialogModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    },
    DatePipe,
    TrainingReqComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
