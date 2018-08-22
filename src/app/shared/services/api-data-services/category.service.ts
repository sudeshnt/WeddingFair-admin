import { Injectable } from '@angular/core';
import {ServiceConfig} from '../../config';
import { HttpService } from '../http.service';
import { CommonMapService } from '../mapping-services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService, private commonMap: CommonMapService) { }

  public createCategory (req) {
    const promise = new Promise((resolve, reject) => {
      const path = '';
      this.httpService.httpPost(ServiceConfig.CATEGORY_SERVICE, path, req, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

  public categoryFindByCriteria (req) {
    const promise = new Promise((resolve, reject) => {
      const path = '/findByCriteria';
      const request = this.commonMap.mapFindByCriteriaReq(req);
      this.httpService.httpPost(ServiceConfig.CATEGORY_SERVICE, path, request, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

}
