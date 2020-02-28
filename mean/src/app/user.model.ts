export class UserModel {
  firstName: string;
  lastName: string;
  email: string;
  status?: boolean;
  lastLoginDate?: Date;
  password: string;
  confPassword: string;

  constructor(firstName: string, lastName: string, email: string, password: string, confPassword: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confPassword = confPassword;
  }
}
