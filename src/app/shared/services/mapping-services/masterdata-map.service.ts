import { Injectable } from '@angular/core';
import { ComFunction } from '../../class';

@Injectable({
  providedIn: 'root'
})
export class MasterDataMapService {

  constructor(private comFunc: ComFunction) { }

  public mapCity(data) {
    const request = {
      'cityId': data.cityId || 0,
      'name': data.name || 0,
      'postCode': data.postCode || null,
      'statusId': data.status || 0,
      'status': this.comFunc.getStatusName(data.status)
    };
    return request;
  }

}
