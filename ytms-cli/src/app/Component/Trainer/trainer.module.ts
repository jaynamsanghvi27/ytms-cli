import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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


@NgModule({
  declarations: [
    TrainerHomeComponent,
    TrainerHeaderComponent,
    TrainerDashboardComponent,
    TrainerSidebarComponent,
    ViewTrainerFormComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModule, NgbModalModule
  ]
})
export class TrainerModule {
}
