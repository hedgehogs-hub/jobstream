import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) {
    this.authService.userLogedIn.next(localStorage.getItem('id_token'));
console.log(this.authService.userLogedIn.value);
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  // posts:PostModel[] = [];
  // onPostAdded(post) {
  //   this.posts.push(post);
  // }
}
