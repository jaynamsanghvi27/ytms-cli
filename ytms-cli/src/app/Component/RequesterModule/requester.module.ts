import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequesterCalendarComponent} from './requester-calendar/requester-calendar.component';
import {RequesterDashboardComponent} from './requester-dashboard/requester-dashboard.component';
import {RequesterHeaderComponent} from './requester-header/requester-header.component';
import {RequesterSidebarComponent} from './requester-sidebar/requester-sidebar.component';
import {RequesterHomeComponent} from './requester-home/requester-home.component';
import {RouterLink, RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [
    RequesterCalendarComponent,
    RequesterDashboardComponent,
    RequesterHeaderComponent,
    RequesterSidebarComponent,
    RequesterHomeComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
  ]
})
export class RequesterModule {
}
