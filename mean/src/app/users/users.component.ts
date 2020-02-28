import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewUserComponent} from './new-user/new-user.component';
import {UserService} from '../core/services/user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserModel[] = [];
  activate: { key: number, value: boolean }[];

  constructor(public dialog: MatDialog, private userService: UserService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: 'auto',
      data: {
        action: 'Create New'
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.success) {
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res.msg.user;
      this.activate = [];
      res.msg.user && res.msg.user.map((el => {
        let a: any = {};
        a[this.activate && this.activate.length+1 ? this.activate.length+1 : 0] = el.status;
        //this.activate = [...this.activate, ...a]  ;
        this.activate.push(a);
      }));
      console.log(this.activate);
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}

