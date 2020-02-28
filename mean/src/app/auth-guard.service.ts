import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{
  constructor(private authService: AuthService,private router: Router,private _location: Location) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(state.url === '/login'){
      if(this.authService.userLogedIn.value){
        this._location.back();
        return false;
      } else return true;
    }else if(this.authService.userLogedIn.value ){
        return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }

}
