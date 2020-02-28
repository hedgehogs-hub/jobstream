import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ValidateService} from '../validate.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hidepsw = true;
  hidepswconf = true;
  namereq = true;
  constructor( private validateService: ValidateService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSave(f){
    const user = {name: f.value.name, username: f.value.username, email: f.value.email, password: f.value.password };
    console.log(user);

    if(!this.validateService.validateRegister(user)){
      console.log('Please insert all fields') ;
      return false;
    }
    if(!this.validateService.validateEmail(user.email)) {
      console.log('Please insert valid email') ;
      return false;
    }
    this.authService.registerUser(user).subscribe(
      data => {
        if(data.success){
          console.log(data.msg) ;
          this.router.navigate(['login']);
        } else {
          console.log('No Registered') ;
        }
      }
    )
  }
}
