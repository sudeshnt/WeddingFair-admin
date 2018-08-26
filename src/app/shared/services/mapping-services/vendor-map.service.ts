import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorMapService {

  constructor() { }

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

}
