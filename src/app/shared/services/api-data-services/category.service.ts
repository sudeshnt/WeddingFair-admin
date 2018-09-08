import { Injectable } from '@angular/core';
import { ServiceConfig } from '../../config';
import { HttpService } from '../http.service';
import { CommonMapService, CategoryMapService } from '../mapping-services';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpService, private commonMap: CommonMapService, private categoryMap: CategoryMapService) { }

  // POST
  public createCategory (req) {
    const path = '';
    return this.httpService.httpPost(ServiceConfig.CATEGORY_SERVICE, path, req, null).pipe(
      map(
      (res: any) => res
      ),
      catchError(
      (error: any) => throwError(error)
    ));
  }

  // PUT
  public updateCategory (req) {
    const path = '';
    return this.httpService.httpPut(ServiceConfig.CATEGORY_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // PUT
  public updateCategoryStatus (req) {
    const path = '/updateStatus';
    return this.httpService.httpPut(ServiceConfig.CATEGORY_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // POST
  public categoryFindByCriteria (req) {
    const path = '/findByCriteria';
    const request = this.commonMap.mapFindByCriteriaReq(req);
    return this.httpService.httpPost(ServiceConfig.CATEGORY_SERVICE, path, request, null).pipe(
      map(
        (res: any) => {
          res.data = res.data.map(item =>
             this.categoryMap.mapCategory(item)
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
  public getApprovedCategories () {
    const path = '/categories/approved';
    return this.httpService.httpGet(ServiceConfig.CATEGORY_SERVICE, path, {}, null).pipe(
      map(
        (res: any) => {
          res.data = res.data.map(item =>
            this.categoryMap.mapCategory(item)
          );
          return res;
        }
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

}
