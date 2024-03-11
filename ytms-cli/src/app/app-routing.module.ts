import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Component/login/login.component';
import {ForgotPasswordComponent} from './Component/forgot-password/forgot-password.component';
import {AuthGuard} from "./Core/guard/auth.guard";
import {TmHomeComponent} from "./Component/Technical-Manager/tm-home/tm-home.component";
import {AdminGuard} from "./Core/guard/admin.guard";
import {RegistrationComponent} from "./Component/registration/registration.component";
import {ResetPasswordComponent} from './Component/reset-password/reset-password.component';
import {ChangePasswordComponent} from './Component/change-password/change-password.component';
import {CalenderComponent} from './Component/calender/calender.component';
import { TrainingReqComponent } from './Component/Requester/training-req/training-req.component';
import { NominationReqComponent } from './Component/Requester/nomination-req/nomination-req.component';
import { ViewTrfComponent } from './Component/Requester/view-trf/view-trf.component';
import {TrainerGuard} from "./Core/guard/trainer.guard";
import {RequesterHomeComponent} from "./Component/Requester/requester-home/requester-home.component";
import {
  RequesterDashboardComponent
} from "./Component/RequesterModule/requester-dashboard/requester-dashboard.component";
import { UploadExcelComponent } from './Component/upload-excel/upload-excel.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "book-calendar",
    component: CalenderComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'tm-dashboard',
    component: TmHomeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "requester/home",
    component: RequesterHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "requester/dashboard",
    component: RequesterHomeComponent,
    canActivate: [AuthGuard]
  },
 {
    path: "requester/calendar",pathMatch:'full',
    component: CalenderComponent,
    canActivate: [AdminGuard,AuthGuard,TrainerGuard]
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-pwd",
    component: ResetPasswordComponent
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent
  },
  {
    path: "change-password",
    component: ChangePasswordComponent
  },

  //#################### TRAINER ROLE ROUTES ###########################
  {
    path: 'trainer',
    canActivate: [TrainerGuard],
    loadChildren: () => import('./Component/Trainer/trainer.module').then(m => m.TrainerModule)
  },

//#################### REQUESTER ROLE ROUTES ###########################
  {
    path:'training-req',
    canActivate: [AdminGuard,AuthGuard],
    component: TrainingReqComponent
  },
  {
    path:'training-req/:id',
    canActivate: [AuthGuard],
    component: TrainingReqComponent
  },
  {
    path:'tm-training-req/:id',
    canActivate: [AdminGuard],
    component: TrainingReqComponent
  },
  {
    path:'re-training-req',
    canActivate: [AuthGuard],
    component: TrainingReqComponent
  },
  {
    path:'re-training-req/:id',
    canActivate: [AuthGuard],
    component: TrainingReqComponent
  },
  {
    path:'nomination-req',
    component: NominationReqComponent
  },
  {
    path: "view-trf",
    canActivate: [AdminGuard,AuthGuard],
    component: ViewTrfComponent
  },
  {
    path: "re-view-trf",
    canActivate: [AuthGuard],
    component: ViewTrfComponent
  },
  {
    path: "tm-view-trf",
    canActivate: [AdminGuard],
    component: ViewTrfComponent
  },
  {
    path:'tm-training-req',
    canActivate: [AdminGuard],
    component: TrainingReqComponent
  },
  {
    path: 'requester',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Component/RequesterModule/requester.module').then(m => m.RequesterModule)
  },

  {
    path:'upload',
    canActivate: [AdminGuard],
    component: UploadExcelComponent
  },
  /*{
    path: '**',
    component: LoginComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
