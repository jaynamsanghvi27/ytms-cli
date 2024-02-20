import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerHomeComponent } from './trainer-home/trainer-home.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { TrainerCalendarComponent } from './trainer-calendar/trainer-calendar.component';

const routes: Routes = [
  {
    path: '', component: TrainerHomeComponent, children: [
      { path: 'dashboard', component: TrainerDashboardComponent },
      { path: 'trainer-calendar', component: TrainerCalendarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
