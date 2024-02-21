import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrainerRoutingModule} from './trainer-routing.module';
import {TrainerHomeComponent} from './trainer-home/trainer-home.component';
import {TrainerHeaderComponent} from './trainer-header/trainer-header.component';
import {TrainerCalendarComponent} from './trainer-calendar/trainer-calendar.component';
import {TrainerDashboardComponent} from './trainer-dashboard/trainer-dashboard.component';
import {TrainerSidebarComponent} from './trainer-sidebar/trainer-sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrModule} from 'angularx-flatpickr';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [
    TrainerHomeComponent,
    TrainerHeaderComponent,
    TrainerCalendarComponent,
    TrainerDashboardComponent,
    TrainerSidebarComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModule, NgbModalModule
  ]
})
export class TrainerModule {
}
