import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RequesterDashboardComponent} from "./requester-dashboard/requester-dashboard.component";
import {RequesterCalendarComponent} from "./requester-calendar/requester-calendar.component";
import {RequesterHomeComponent} from "./requester-home/requester-home.component";

/**
 * Project Name - ytms-cli
 * IDE Used - WebStorm
 * @author - yash.raj
 * @since - 21-02-2024
 */
const routes: Routes = [
  {
    path: '',
    component: RequesterHomeComponent,
    children: [
      {
        path: 'dashboard',
        component: RequesterDashboardComponent
      },
      {
        path: 'requester-calendar',
        component: RequesterCalendarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RequesterRoutingModule {
}
