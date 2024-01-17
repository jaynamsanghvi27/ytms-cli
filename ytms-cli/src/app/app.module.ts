import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequesterHeaderComponent } from './Component/Requester/requester-header/requester-header.component';
import { RequesterSidebarComponent } from './Component/Requester/requester-sidebar/requester-sidebar.component';
import { RequesterHomeComponent } from './Component/Requester/requester-home/requester-home.component';
import { LoginComponent } from './Component/login/login.component';
import { RegistrationComponent } from './Component/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    RequesterHeaderComponent,
    RequesterSidebarComponent,
    RequesterHomeComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
