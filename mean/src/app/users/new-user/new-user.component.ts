import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersComponent} from '../users.component';
import {ValidateService} from '../../validate.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserModel} from '../../user.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UserService} from '../../core/services/user.service';

export interface DialogData {
  id? : string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confPassword: string
}
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [UserService]
})
export class NewUserComponent implements OnInit {

  hidepsw = true;
  hidepswconf = true;
  namereq = true;
  user: DialogData;
  users: UserModel[];
  button = 'Create';
  url = 'register';
  id = null;
  constructor(public dialogRef: MatDialogRef<UsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private toastr: ToastrService) {
    if(this.data && this.data.user) {
      this.id = this.data.user._id;
      this.button = "Update";
      this.url = 'edit';
    }
  }

  onSave(f) {
    let id = this.data && this.data.user ? this.data.user._id : '';
      // this.user = { id: this.id, firstName: f.value.firstName, lastName: f.value.lastName, email: f.value.email, password: f.value.password, confPassword : f.value.confirmPassword};
      this.user = {id, firstName: f.value.firstName, lastName: f.value.lastName, email: f.value.email, password: f.value.password, confPassword : f.value.confirmPassword};
    console.log(this.user);
    if (!this.validateService.validateRegister(this.user)) {
      console.log('Please insert all fields') ;
      return false;
    }
    if (!this.validateService.validateEmail(this.user.email)) {
      console.log('Please insert valid email') ;
      return false;
    }

    if (this.data && this.data.user) {
      this.userService.editUser(this.user).subscribe(res =>{
        // @ts-ignore
        if(res.success){
          // @ts-ignore
          this.toastr.success(res.msg);
          this.dialogRef.close(res)
        } else {
          // @ts-ignore
          this.toastr.error(res.msg);
        }
      }, err => console.log(err))
    } else {
      this.userService.registerUser(this.user).subscribe(res =>{
        // @ts-ignore
        if(res.success){
          // @ts-ignore
          this.toastr.success(res.msg);
          this.dialogRef.close(res)
        } else {
          // @ts-ignore
          this.toastr.error(res.msg);
        }
      }, err => console.log(err))
    }
  }

  onClose(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
