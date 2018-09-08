import {Component, OnInit} from '@angular/core';
import { VendorService, CategoryService } from '../../shared/services/api-data-services';
import { Md5 } from 'ts-md5';
import { MasterDataService } from '../../shared/services/api-data-services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  user: any = {
    category : '',
    city : ''
  };
  serviceCategories: Array<any> = [];
  cities: Array<any> = [];

  constructor(private vendorService: VendorService, private categoryService: CategoryService,
              private masterDataService: MasterDataService) { }

  ngOnInit() {
    this.getApprovedCategories();
    this.getApprovedCities();
  }

  onRegisterFormSubmit (register_form) {
    if (register_form.valid) {
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
      this.vendorService.registerVendor(req).subscribe(
        (res: any) => console.log(res),
        (error: any) => console.log(error)
      );
    }
  }

  private getApprovedCategories() {
    this.categoryService.getApprovedCategories().subscribe((response: any) => {
      if (response) {
        this.serviceCategories = response.data;
      }
    });
  }

  private getApprovedCities() {
    this.masterDataService.getApprovedCities().subscribe((response: any) => {
      if (response) {
        this.cities = response;
      }
    });
  }

}
