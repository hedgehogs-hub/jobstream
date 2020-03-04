
import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {JobhistoryComponent} from './jobhistory/jobhistory.component';
import {AnalyticalpageComponent} from './analyticalpage/analyticalpage.component';
import {UsersComponent} from './users/users.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuardService} from './auth-guard.service';
import {NotfoundComponent} from './notfound/notfound.component';
const routes: Routes = [
  {path : '', component : HomeComponent , canActivate: [AuthGuardService]},
  {path : 'login', component : LoginComponent, canActivate: [AuthGuardService]},
  {path : 'register', component: RegisterComponent},
  {path : 'job_history', component : JobhistoryComponent, canActivate: [AuthGuardService]},
  {path : 'analytical_page', component : AnalyticalpageComponent, canActivate: [AuthGuardService]},
  {path : 'users', component : UsersComponent, canActivate: [AuthGuardService]},
  {path : '**', component : NotfoundComponent,  canActivate: [AuthGuardService]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
