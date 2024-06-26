import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrainerHomeComponent} from './trainer-home/trainer-home.component';
import {TrainerDashboardComponent} from './trainer-dashboard/trainer-dashboard.component';
import { ViewTrfComponent } from '../Requester/view-trf/view-trf.component';
import { TrainingReqComponent } from '../Requester/training-req/training-req.component';
import { ViewTrainerFormComponent } from './view-trainer-form/view-trainer-form.component';
import { CalenderComponent } from '../calender/calender.component';
import { ViewTraninerComponent } from './view-traniner/view-traniner.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: TrainerHomeComponent,
    children: [
      {
        path: 'dashboard',
        component: TrainerDashboardComponent
      },
      {
        path: 'trainer-calendar',
        component:CalenderComponent
      },
      { 
        path: "view-trf",
        component: ViewTrfComponent
      },
      {
        path:'training-req',
        component: TrainingReqComponent
      },
      {
        path:'training-req/:id',
        component: TrainingReqComponent
      },
      {
        path:'view-trainer-form',
        component: ViewTrainerFormComponent
      },
      {
        path:'add-attendance',
        component: AddAttendanceComponent
      },
          ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule {
}
