import { Component } from '@angular/core';
import { VendorService } from '../../shared/services/api-data-services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  user: any = {};

  constructor(private vendorService: VendorService) { }

  onRegisterFormSubmit (register_form) {
    console.log(register_form);
    this.vendorService.registerVendor({}).then((response: any) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

}
