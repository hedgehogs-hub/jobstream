import {DataService} from './data.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {

  getUsers() {
    return this.get('users/userslist');
  }

  registerUser(user) {
    return this.create('users/register', user);
  }
  editUser(user) {
    return this.edit('users/edit', user);
  }
  deleteUser(userId) {
    return this.delete(`users/delete/${userId}`);
  }
}
