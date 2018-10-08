import { Component, OnInit } from '@angular/core';
import {VendorService} from '../../../shared/services/api-data-services';
import {AuthService} from '../../../shared/services';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public fileUploadConfig: any = {};
  public vendor: any = {};

  constructor(private authService: AuthService, private vendorService: VendorService) { }

  ngOnInit() {
    this.initVendorDetails();
  }

  private initVendorDetails () {
    this.vendorService.getVendorById(this.authService.getLoggedInUser().serviceProviderId).subscribe((response: any) => {
      if (response) {
        this.vendor = response[0];
      }
    }, error => {

    });
  }

  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
      console.log($event.data);
    }
  }

}
