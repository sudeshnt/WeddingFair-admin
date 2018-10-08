import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService, VendorService} from '../../../shared/services';
import {Observable} from 'rxjs';
import { google } from 'google-maps';
declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, AfterViewInit {
  title = 'My first AGM project';
  vendor: any = {};
  lat = 51.678418;
  lng = 7.809007;

  constructor(private authService: AuthService, private vendorService: VendorService) { }

  geoCoder;
  ngOnInit() {
    this.initVendorDetails();


  }

  ngAfterViewInit(): void {

  }

  private geocodeLocation(location: string): Observable<any> {
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    return new Observable((observer) => {
      this.geoCoder.geocode({address: location}, (result, status) => {
        if (status === 'OK') {

          const geometry = result[0].geometry.location;
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};

          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }

  private initVendorDetails () {
    this.vendorService.getVendorById(this.authService.getLoggedInUser().serviceProviderId).subscribe((response: any) => {
      if (response) {
        this.vendor = response[0];
        const address =  'Hikkaduwa, Galle, Sri Lanka';
        // const address =  'Ferrol, Galicia, Spain';
        // const address = this.vendor.cityName + ', Sri Lanka';
        // const address = `${this.vendor.addressLine1},${this.vendor.cityName}`;
        this.geocodeLocation(address).subscribe(data => {
          console.log(data);
        });
      }
    }, error => {

    });
  }

  clickMap (event) {
    console.log(event);
  }

}
