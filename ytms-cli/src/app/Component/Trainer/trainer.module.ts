import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TrainerRoutingModule} from './trainer-routing.module';
import {TrainerHomeComponent} from './trainer-home/trainer-home.component';
import {TrainerHeaderComponent} from './trainer-header/trainer-header.component';
import {TrainerDashboardComponent} from './trainer-dashboard/trainer-dashboard.component';
import {TrainerSidebarComponent} from './trainer-sidebar/trainer-sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FlatpickrModule} from 'angularx-flatpickr';
import {ToastrModule} from 'ngx-toastr';
import { ViewTrainerFormComponent } from './view-trainer-form/view-trainer-form.component';
import { ViewTraninerComponent } from './view-traniner/view-traniner.component';
import { EditNominationComponent } from './edit-nomination/edit-nomination.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AddTranierAttendanceComponent } from './add-tranier-attendance/add-tranier-attendance.component';
import { NominationReqComponent } from './nomination-req/nomination-req.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { AddScoreComponent } from './add-score/add-score.component';


@NgModule({
  declarations: [
    TrainerHomeComponent,
    TrainerHeaderComponent,
    TrainerDashboardComponent,
    TrainerSidebarComponent,
    ViewTrainerFormComponent,
    ViewTraninerComponent,
    EditNominationComponent,
    AddAttendanceComponent,
    ViewAttendanceComponent,
    AddTranierAttendanceComponent,
    NominationReqComponent,
    AddFeedbackComponent,
    AddScoreComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModule, NgbModalModule,
    AgGridModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatTooltipModule
  ],
  providers:[]
})
export class TrainerModule {
}
