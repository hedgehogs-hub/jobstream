import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ValidateService} from '../validate.service';
import {AuthService} from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = '';
  constructor(private router: Router, private validateService: ValidateService,  private authService: AuthService, private toastr: ToastrService) { }

  showSpinner: boolean = false;
  ngOnInit() {
  }
  login(f) {
    const user =  { email: f.value.email, password: f.value.password };
    console.log(user);
    if(!this.validateService.validateEmail(user.email)) {
      this.error = 'Please insert valid email';
      this.toastr.error(this.error, 'Oops!!!', {timeOut: 3000});
      return false;
    }
    this.authService.loginUser(user).subscribe(
      data => {
        if(data.success){
          this.authService.storeUser(data.msg.token, data.msg.user);
          this.router.navigate(['users'])
        } else {
          this.error = data.msg;
          this.toastr.error(this.error, 'Oops!!!', {timeOut: 3000});
        }
      }
    ), error => {
        this.error = error;
      }
  }
}
