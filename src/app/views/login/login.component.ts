import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from '../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  user: any = {};

  constructor(private authService: AuthService) {

  }

  onLoginFormSubmit(login_form) {
    if (login_form.valid) {
      const userame = login_form.value.username;
      const password = Md5.hashStr(login_form.value.password);
      this.authService.authenticate(userame, password).then((response: any) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
  }


}
