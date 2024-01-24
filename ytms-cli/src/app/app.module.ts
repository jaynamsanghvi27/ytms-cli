import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RequesterHeaderComponent} from './Component/Requester/requester-header/requester-header.component';
import {RequesterSidebarComponent} from './Component/Requester/requester-sidebar/requester-sidebar.component';
import {RequesterHomeComponent} from './Component/Requester/requester-home/requester-home.component';
import {LoginComponent} from './Component/login/login.component';
import {RegistrationComponent} from './Component/registration/registration.component';
import {ForgotPasswordComponent} from './Component/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {authInterceptorProviders} from "./Core/interceptor/auth.interceptor";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    RequesterHeaderComponent,
    RequesterSidebarComponent,
    RequesterHomeComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
