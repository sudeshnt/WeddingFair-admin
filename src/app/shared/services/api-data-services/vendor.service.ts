import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ServiceConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpService: HttpService) { }

  public registerVendor (req) {
    const promise = new Promise((resolve, reject) => {
      const path = '';
      this.httpService.httpPost(ServiceConfig.VENDOR_SERVICE, path, req, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

}
