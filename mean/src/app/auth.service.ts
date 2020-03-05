import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.APIEndpoint;
  userLogedIn = new BehaviorSubject(null);
  sharedUsers = new BehaviorSubject<UserModel[]>(null) ;
  private tokenExpirationTimer: any;
  UserGlobalStore;
  users:UserModel[];
  authToken: string;
  user ={};
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService,private router: Router) { }

  loginUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application-json');
    return this.http.post<{success: string, msg: any}>(this.baseUrl+'users/authenticate', user, {headers: headers})
      .pipe(catchError(this.handlError),
        map(
        res => res
        ),
        tap(res => {
          if(res.success){
            this.handleAuthentication(res.msg.user.email, res.msg.user._id, res.msg.user.firstName, res.msg.user.lastName , res.msg.token, +res.msg.expiresIn);
          }else return this.handlError(res);
        })
      )
  }

  storeUser(token,user){
    localStorage.setItem('id_token',token);
    this.authToken = token;
    this.user = user;
    this.userLogedIn.next(this.jwtHelper.isTokenExpired());
  }

  // autoLogin() {
  //   const user: {
  //     firstName: string;
  //     lastName: string;
  //     email: string;
  //     _id: string;
  //     token: string;
  //     tokenExpirationDate: string
  //   } = this.UserGlobalStore;
  //   if(!localStorage.getItem('id_token')){
  //     return;
  //   }
  //
  //   const loadedUser = {email:user.email, id: user._id,token: user.token, expirationTime: new Date(user.tokenExpirationDate)};
  //   if(loadedUser.token){
  //     this.userLogedIn.next(loadedUser);
  //     const expirationDuration = new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
  //     this.autoLogOut(expirationDuration);
  //   }
  // }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('id_token');
    this.userLogedIn.next(null);
    this.router.navigate(['login']);
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    },expirationDuration)
  }

  private handleAuthentication(email: string, userId:string, firstName: string, lastName: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    // @ts-ignore
    const loadedUser = {firstName: firstName, lastName: lastName ,email:email, id: userId,token: token, expirationTime: expiresIn};
    this.userLogedIn.next(loadedUser);
    this.UserGlobalStore = loadedUser;
    this.autoLogOut(expiresIn*1000);
  }
  private handlError(err : {success: string, msg: any}) {
    let error:string = 'An unknown error';
    if(err) {
      error = err.msg;
    }
    return throwError(error);
  }
}
