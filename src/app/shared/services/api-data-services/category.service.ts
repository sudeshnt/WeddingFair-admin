import { Injectable } from '@angular/core';
import {ServiceConfig} from '../../config';
import { HttpService } from '../http.service';
import { CommonMapService } from '../mapping-services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService, private commonMap: CommonMapService) { }

  // POST
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

  // PUT
  public updateCategory (req) {
    const promise = new Promise((resolve, reject) => {
      const path = '';
      this.httpService.httpPut(ServiceConfig.CATEGORY_SERVICE, path, req, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

  // PUT
  public updateCategoryStatus (req) {
    const promise = new Promise((resolve, reject) => {
      const path = '/updateStatus';
      this.httpService.httpPut(ServiceConfig.CATEGORY_SERVICE, path, req, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

  // POST
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

  // GET
  public getApprovedCategories () {
    const promise = new Promise((resolve, reject) => {
      const path = '/categories/approved';
      this.httpService.httpGet(ServiceConfig.CATEGORY_SERVICE, path, {}, null).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
    return promise;
  }

}
