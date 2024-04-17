import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequesterHeaderComponent } from './Component/Requester/requester-header/requester-header.component';
import { RequesterSidebarComponent } from './Component/Requester/requester-sidebar/requester-sidebar.component';
import { RequesterHomeComponent } from './Component/Requester/requester-home/requester-home.component';
import { LoginComponent } from './Component/login/login.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptorProviders } from "./Core/interceptor/auth.interceptor";
import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { TmHomeComponent } from './Component/Technical-Manager/tm-home/tm-home.component';
import { TmHeaderComponent } from './Component/Technical-Manager/tm-header/tm-header.component';
import { TmSidebarComponent } from './Component/Technical-Manager/tm-sidebar/tm-sidebar.component';
import { RegistrationComponent } from "./Component/registration/registration.component";
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { CalenderComponent } from './Component/calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { DatePipe } from '@angular/common';
import { TrainingReqComponent } from './Component/Requester/training-req/training-req.component';
import { NominationReqComponent } from './Component/Requester/nomination-req/nomination-req.component';
import { ViewTrfComponent } from './Component/Requester/view-trf/view-trf.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { UnitMasterComponent } from './Component/Requester/unit-master/unit-master.component';
import { CompetencyMasterComponent } from './Component/Requester/competency-master/competency-master.component';
import { TrainingTypeMasterComponent } from './Component/Requester/training-type-master/training-type-master.component';
import { TechnologyMasterComponent } from './Component/Requester/technology-master/technology-master.component';
import { UploadExcelComponent } from './Component/upload-excel/upload-excel.component';
import { ViewNominationComponent } from './Component/Requester/view-nomination/view-nomination.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DayComponentComponent } from './Component/calender/Calendar Component/day-component/day-component.component';
import { EventFormComponent } from './Component/calender/Calendar Component/event-form/event-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventComponentComponent } from './Component/calender/Calendar Component/event-component/event-component.component';
import { UpdateEventFormComponent } from './Component/calender/Calendar Component/update-event-form/update-event-form.component';
import { DeleteComponent } from './Component/calender/Calendar Component/delete/delete.component';
import { MatTableModule } from '@angular/material/table';
import { DeletePageComponent } from './Component/calender/Delete Page/delete-page/delete-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SummaryComponent } from './Component/calender/Summary Page/summary/summary.component';
import { OptionalHolidayComponent } from './Component/calender/Optional Holiday/optional-holiday/optional-holiday.component';
import { AssociateManagementComponent } from './Component/Technical-Manager/tm-associate-management/associate-management/associate-management.component';
import { AssociateSummaryComponent } from './Component/Requester/associate-summary/associate-summary.component';
import { AgGridModule } from 'ag-grid-angular';
import { ViewAssoicateTrainigDataComponent } from './Component/Requester/view-assoicate-trainig-data/view-assoicate-trainig-data.component';
import { ManageAssociateComponent } from './Component/Requester/manage-associate/manage-associate.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AboutUsComponent } from './Component/about-us/about-us.component';

@NgModule({
  entryComponents: [DayComponentComponent, EventFormComponent, UpdateEventFormComponent, DeleteComponent,OptionalHolidayComponent],
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
    ViewNominationComponent,
    DayComponentComponent,
    EventFormComponent,
    EventComponentComponent,
    UpdateEventFormComponent,
    DeleteComponent,
    DeletePageComponent,
    AssociateSummaryComponent,
    ViewAssoicateTrainigDataComponent,
    SummaryComponent,
    OptionalHolidayComponent,
    AssociateManagementComponent,
    AssociateSummaryComponent,
    ManageAssociateComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModule, NgbModalModule,
    MatDialogModule, MatDatepickerModule,
    FullCalendarModule,
    MatSelectModule, MatInputModule, MatToolbarModule, MatIconModule, MatCheckboxModule, MatTableModule, MatNativeDateModule,
    AgGridModule,MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    }, MatDatepickerModule,
    DatePipe,
    TrainingReqComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
