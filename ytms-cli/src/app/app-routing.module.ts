import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequesterHomeComponent } from './Component/Requester/requester-home/requester-home.component';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: "login", component: LoginComponent },
  { path: "requester-home", component: RequesterHomeComponent },
  { path: "reset-pwd", component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
