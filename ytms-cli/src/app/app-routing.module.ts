import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequesterHomeComponent} from './Component/Requester/requester-home/requester-home.component';
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
    path: "book-calendar", component: CalenderComponent,
    canActivate: [AuthGuard]

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
    path: "requester-home",
    component: RequesterHomeComponent,
    canActivate: [AuthGuard]
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
    loadChildren: () => import('./Component/Trainer/trainer.module').then(m => m.TrainerModule)
  },

  {
    path:'training-req',
    component: TrainingReqComponent
  },
  {
    path:'nomination-req',
    component: NominationReqComponent
  },

  {
    path: '**',
    component: LoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
