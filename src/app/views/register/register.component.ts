import {Component, OnInit} from '@angular/core';
import { VendorService, CategoryService } from '../../shared/services/api-data-services';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  user: any = {};
  serviceCategories: Array<any> = [];

  constructor(private vendorService: VendorService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getApprovedCategories();
  }

  onRegisterFormSubmit (register_form) {
    console.log(register_form);

    const req = {
      'name': register_form.value.shopName,
      'loginName': register_form.value.email,
      'ownerName': register_form.value.ownerName,
      'regNumber': register_form.value.regNumber,
      'cityId': register_form.value.city,
      'addressLine1': register_form.value.address,
      'mobile': register_form.value.mobile,
      'email': register_form.value.email,
      'categoryId': register_form.value.category,
      'password': Md5.hashStr(register_form.value.password),
      'addressLine2': '',
      'telephone': '',
      'instagram': '',
      'facebook': '',
      'logoUrl': ''
    };
    this.vendorService.registerVendor(req).then((response: any) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  private getApprovedCategories() {
    this.categoryService.getApprovedCategories().then((response: any) => {
      if (response) {
        this.serviceCategories = response.data;
        this.user.category = this.serviceCategories[0].categoryId;
      }
      console.log(response);
    });
  }

}
