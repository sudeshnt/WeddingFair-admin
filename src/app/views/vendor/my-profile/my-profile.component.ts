import { Component, OnInit } from '@angular/core';
import {MasterDataService, VendorService} from '../../../shared/services/api-data-services';
import {AuthService} from '../../../shared/services';
import {AppConfig} from '../../../shared/config';
import {Md5} from 'ts-md5';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  AppConfig = AppConfig;
  public fileUploadConfig: any = {};
  vendor: any = {};
  cities: Array<any> = [];

  constructor(private authService: AuthService, private vendorService: VendorService, private masterDataService: MasterDataService) { }

  ngOnInit() {
    this.initCities();
    this.initVendorDetails();
  }

  private initCities () {
    this.masterDataService.getApprovedCities().subscribe((response: any) => {
      if (response) {
        this.cities = response;
      }
    });
  }

  private initVendorDetails () {
    this.vendorService.getVendorById(this.authService.getLoggedInUser().serviceProviderId).subscribe((response: any) => {
      if (response) {
        this.vendor = response[0];
        console.log(this.vendor);
      }
    }, error => {

    });
  }

  onVendorFormSubmit(vendor_form) {
    if (vendor_form.valid) {
      const req = {
        'serviceProviderId': this.vendor.serviceProviderId,
        'name': vendor_form.value.name,
        'ownerName': this.vendor.ownerName,
        'regNumber': vendor_form.value.regNumber,
        // 'cityId': vendor_form.value.cityId,
        'addressLine1': vendor_form.value.addressLine1,
        'addressLine2': '',
        'email': vendor_form.value.email,
        'mobile': vendor_form.value.mobile,
        'telephone': vendor_form.value.telephone,
        'website': vendor_form.value.website,
        'facebook': vendor_form.value.facebook,
        'instagram': vendor_form.value.instagram,
        'logoUrl': this.vendor.logoUrl,
        'displaySequence': 0,
      };
      console.log(req);
      this.vendorService.updateVendor(req).subscribe(
        (res: any) => console.log(res),
        (error: any) => console.log(error)
      );
    }
    console.log(vendor_form);
  }

  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
      this.vendor.logoUrl = $event.data.fileName;
    }
  }

}
