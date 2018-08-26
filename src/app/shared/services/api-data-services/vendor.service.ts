import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ServiceConfig } from '../../config';
import { VendorMapService } from '../mapping-services';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpService: HttpService, private vendorMap: VendorMapService) { }

  public registerVendor (req) {
    const promise = new Promise((resolve, reject) => {
      const path = '';
      const request = this.vendorMap.mapVendorRegisterReq(req);
      this.httpService.httpPost(ServiceConfig.VENDOR_SERVICE, path, request, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

}
