import { Component } from '@angular/core';
import { AdminService } from '../../shared/services/api-data-services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  user: any = {};

  constructor(private adiminService: AdminService) { }

  onRegisterFormSubmit (register_form) {
    console.log(register_form);
    // this.adiminService.
  }

}
