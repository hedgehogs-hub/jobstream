import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navLinks = [
    {path:'/', label: 'Home'},
    {path:'job_history', label: 'Job History'},
    {path:'analytical_page', label: 'Analytical Page'},
    {path:'users', label: 'User'},
  ];
  userLogedIn;
  sub: Subscription;
  authToken: string;
  user: {};
  constructor(private router: Router,public authService: AuthService) {
    this.authToken = localStorage.getItem('id_token');
    this.user = JSON.parse(localStorage.getItem('user')) ;
    console.log(this.authToken);
  }

  ngOnInit() {
  }
  onSign() {
    if(this.authService.userLogedIn.value) {
      this.authService.logout();
      this.router.navigate(['login']);
    }

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
