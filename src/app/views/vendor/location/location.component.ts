import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  zoom = 10;
  lat: number;
  lng: number;
  marker_lat: number;
  marker_lng: number;

  constructor(private authService: AuthService, private vendorService: VendorService, private chRef: ChangeDetectorRef) { }

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
      this.geoCoder.geocode({
        address: location,
        componentRestrictions: {
          country: 'LK'
        }
       }, (result, status) => {
        if (status === 'OK') {
          const geometry = result[0].geometry.location;
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  private initVendorDetails () {
    this.vendorService.getVendorById(this.authService.getLoggedInUser().serviceProviderId).subscribe((response: any) => {
      if (response) {
        this.vendor = response[0];
        const address = `${this.vendor.addressLine1}, ${this.vendor.cityName}, Sri Lanka`;
        this.geocodeLocation(address).subscribe(data => {
          this.lat = data.lat;
          this.lng = data.lng;
          this.marker_lat = data.lat;
          this.marker_lng = data.lng;
          this.zoom = 15;
          this.chRef.detectChanges();
        });
      }
    }, error => {

    });
  }

  clickMap (event) {
    this.marker_lat = event.coords.lat;
    this.marker_lng = event.coords.lng;
    this.chRef.detectChanges();
  }

}
