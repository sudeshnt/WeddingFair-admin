import { Injectable } from '@angular/core';
import {ComFunction} from '../../class';

@Injectable({
  providedIn: 'root'
})
export class VendorMapService {

  constructor(private comFunc: ComFunction) { }

  public mapVendorRegisterReq(data) {
    const request = {
      'name': data.name || null,
      'loginName': data.loginName || null,
      'password': data.password || null,
      'ownerName': data.ownerName || null,
      'regNumber': data.regNumber || null,
      'cityId': data.cityId || 0,
      'addressLine1': data.addressLine1 || null,
      'addressLine2': data.addressLine2 || null,
      'mobile': data.mobile || null,
      'telephone': data.telephone || null,
      'email': data.email || null,
      'instagram': data.instagram || null,
      'facebook': data.facebook || null,
      'logoUrl': data.logoUrl || null,
      'categoryId': data.categoryId || 0
    };
    return request;
  }
  
  public mapVendor(data) {
    const response =  {
      'serviceProviderId': data.serviceProviderId || 0,
      'name': data.name || null,
      'ownerName': data.ownerName || null,
      'regNumber': data.regNumber || null,
      'createdDate': data.createdDate || null,
      'cityId': data.cityId || 0,
      'mobile': data.mobile || null,
      'email': data.email || null,
      'rating': data.rating || 0,
      'categoryId': data.categoryId || 0,
      'statusId': data.status || 0,
      'status': this.comFunc.getStatusName(data.status)
    };
    return response;
  }

}
