import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ServiceConfig } from '../../config';
import { CommonMapService, VendorMapService } from '../mapping-services';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpService: HttpService, private vendorMap: VendorMapService, private commonMap: CommonMapService) { }

  // POST
  public registerVendor (req) {
    const path = '';
    const request = this.vendorMap.mapVendorRegisterReq(req);
    return this.httpService.httpPost(ServiceConfig.VENDOR_SERVICE, path, request, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // PUT
  public updateVendorStatus (req) {
    const path = '/updateStatus';
    return this.httpService.httpPut(ServiceConfig.VENDOR_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // PUT
  public updateVendor (req) {
    const path = '';
    return this.httpService.httpPut(ServiceConfig.VENDOR_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // POST
  public vendorFindByCriteria (req) {
    const path = '/findByCriteria';
    const request = this.commonMap.mapFindByCriteriaReq(req);
    return this.httpService.httpPost(ServiceConfig.VENDOR_SERVICE, path, request, null).pipe(
      map(
        (res: any) => {
          res.data = res.data.map(item =>
            this.vendorMap.mapVendor(item)
          );
          return res;
        }
      ),
      catchError(
        (error: any) =>
          throwError(error)
      ));
  }

  // GET
  public getVendorById (vendorId) {
    const path = `/details/${vendorId}`;
    return this.httpService.httpGet(ServiceConfig.VENDOR_SERVICE, path, {}, null).pipe(
      map(
        (res: any) => {
          res = res.map(item =>
            this.vendorMap.mapVendor(item)
          );
          return res;
        }
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // GET
  public getApprovedCategories () {
    const path = '/categories/approved';
    return this.httpService.httpGet(ServiceConfig.VENDOR_SERVICE, path, {}, null).pipe(
      map(
        (res: any) => {
          res.data = res.data.map(item =>
            this.vendorMap.mapVendor(item)
          );
          return res;
        }
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

}
