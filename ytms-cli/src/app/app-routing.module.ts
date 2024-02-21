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
import {TrainerGuard} from "./Core/guard/trainer.guard";
import {RequesterHomeComponent} from "./Component/Requester/requester-home/requester-home.component";
import {
  RequesterDashboardComponent
} from "./Component/RequesterModule/requester-dashboard/requester-dashboard.component";

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
    component: RequesterDashboardComponent,
    canActivate: [AuthGuard]
  },
  /*{
    path: "requester/calendar",
    component: RequesterCalendarComponent,
    canActivate: [AuthGuard]
  },*/
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent
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
    path: 'requester',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Component/RequesterModule/requester.module').then(m => m.RequesterModule)
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
