import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.APIEndpoint;
  headers;
  authToken;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application-json'
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  get(path) {
    this.loadToken();
    const headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application-json'
    });

    return this.http.get<{success: boolean, msg: any}>(this.baseUrl + path, {headers})
      .pipe(
        catchError(this.handlError),
        map(res => res),
      );
  }

  create(path, payload) {
    return this.http.post<{success: boolean, msg: any}>(this.baseUrl + path, payload, this.headers)
      .pipe(
        catchError(this.handlError),
        map(res => res),
      );
  }

  edit(path, payload) {
    return this.http.put<{success: boolean, msg: any}>(this.baseUrl + path, payload, this.headers)
      .pipe(
        catchError(this.handlError),
        map(res => res),
      );
  }

  delete(path,payload) {
    return this.http.delete<{success: boolean, msg: any}>(this.baseUrl + path, { params: payload, headers: this.headers })
      .pipe(
        catchError(this.handlError),
        map(res => res),
      );
  }

  private handlError(err : {success: string, msg: any}) {
    let error:string = 'An unknown error';
    if(err) {
      error = err.msg;
    }
    return throwError(error);
  }
}
