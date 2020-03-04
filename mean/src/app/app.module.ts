import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from "@auth0/angular-jwt";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';
import { AnalyticalpageComponent } from './analyticalpage/analyticalpage.component';
import { JobhistoryComponent } from './jobhistory/jobhistory.component';
import { UsersComponent } from './users/users.component';
import {ToastrModule} from 'ngx-toastr';
import { UserTableComponent } from './users/user-table/user-table.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ConfDialogComponent } from './conf-dialog/conf-dialog.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {AuthInterceptorService} from './AuthInterceptor.server';
import { Ng5SliderModule } from 'ng5-slider';
import { JobSearchListComponent } from './job-search-list/job-search-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AnalyticalpageComponent,
    JobhistoryComponent,
    UsersComponent,
    UserTableComponent,
    NewUserComponent,
    ConfDialogComponent,
    NotfoundComponent,
    JobSearchListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        authScheme: "Your Auth Scheme",
        throwNoTokenError: true,
        skipWhenExpired: true
      }
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
