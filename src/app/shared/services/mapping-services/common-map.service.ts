import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonMapService {

  constructor() { }

  public mapFindByCriteriaReq(data) {
    const request = {
      'PKs': data.PKs || [],
      'offset': data.offset || 0,
      'limit': data.limit || 1,
      'searchKeys': data.searchKeys || [],
      'values': data.values || [],
      'operators': data.operators || [],
      'fromDate': data.fromDate || null,
      'toDate': data.toDate || null,
      'orderByKey': data.orderByKey || null,
      'orderByValue': data.orderByValue || null,
      'groupBy': data.groupBy || [],
      'statuses': data.statuses || []
    };
    return request;
  }
  
}
