import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthService } from '../../shared';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Config } from '../../shared/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  user: any = {};

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  onLoginFormSubmit(login_form) {
    if (login_form.valid) {
      const userame = login_form.value.username;
      const password = Md5.hashStr(login_form.value.password);
      this.authService.authenticate(userame, password).subscribe((response: any) => {
        if (this.authService.isAuthenticated()) {
          switch (this.authService.getUserAdminType()) {
            case Config.adminTypes.X_ADMIN:
              this.router.navigate(['/']).then();
              break;
            case Config.adminTypes.SUPER_ADMIN:
              this.router.navigate(['/my-profile']).then();
              break;
            default:
              break;
          }
        }
      }, (error) => {
        this.toastr.error('', error.errorMessage);
      });
    }
  }

  registerPage () {
    this.router.navigate(['/register']).then();
  }

}
