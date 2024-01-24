import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequesterHomeComponent} from './Component/Requester/requester-home/requester-home.component';
import {LoginComponent} from './Component/login/login.component';
import {ForgotPasswordComponent} from './Component/forgot-password/forgot-password.component';
import {AuthGuard} from "./Core/guard/auth.guard";

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
  /*{
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userDashboard',
    component: AssociateDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },*/
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
