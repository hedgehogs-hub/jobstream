import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NewUserComponent} from '../new-user/new-user.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserModel} from '../../user.model';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../core/services/user.service';
import {ConfDialogComponent} from '../../conf-dialog/conf-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit,AfterViewInit {
  _users;
  dataSource = new MatTableDataSource<UserModel>([]);
  @Input() activate;
  displayedColumns: string[] = ['id', 'userName', 'userLogin', 'status', 'lastLoginDate', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public popUp: MatDialog,
              private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private userService: UserService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
  }

  @Input() set users(user) {
    if (user && user.length) {
      this.setUsers(user);
    }
  }

  get users() {
    return this._users;
  }

  setUsers(users) {
    users.map((user, i) => {
      return user.id = i + 1;
    });
    users.map((user) => {
      return user.userName = user.firstName+ ' ' + user.lastName;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this._users = users;
    this.dataSource.data = users;
    this.cdr.detectChanges();
  }

  active(index) {
    let stat = this.dataSource.data[index];
    stat.status = !this.dataSource.data[index].status;
    this.userService.editUser(stat).subscribe(
      data => {
        // @ts-ignore
        if(data.success){
          // @ts-ignore
          console.log(data.msg) ;
          this.getUsers()
        }
      }
    )
  }
  editUser(i): void {

    const dialogRef1 = this.popUp.open(NewUserComponent, {
      width: 'auto',
      data: {
        user: this.users[i],
        action: 'Edit'
      }
    });

    dialogRef1.afterClosed().subscribe(value => {
      if(value && value.success) {
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => this.setUsers(res.msg.user));
  }

  onDelete(i){
    const dialogRef = this.popUp.open(ConfDialogComponent, {
      width: 'auto',
      data: {
        user: this.dataSource.data[i].email,
        action: 'Delete'
      }
    });
    dialogRef.afterClosed().subscribe(value => {
      if(value) {
        // @ts-ignore
        this.userService.deleteUser(this.dataSource.data[i]._id).subscribe(
          data => {
            if (data.success) {
              console.log(data.msg);
              this.getUsers()
            }
          }
        );
      }
    });
  }
}
