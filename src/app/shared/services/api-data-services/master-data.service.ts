import { Injectable } from '@angular/core';
import { ServiceConfig } from '../../config';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpService } from '../http.service';
import { MasterDataMapService, CommonMapService } from '../mapping-services';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {

  constructor(private httpService: HttpService, private commonMap: CommonMapService, private masterDataMap: MasterDataMapService) { }

  // POST
  public createCity (req) {
    const path = '/city';
    return this.httpService.httpPost(ServiceConfig.MASTER_DATA_MGMT_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // PUT
  public updateCity (req) {
    const path = '/city';
    return this.httpService.httpPut(ServiceConfig.MASTER_DATA_MGMT_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // PUT
  public updateCityStatus (req) {
    const path = '/city/updateStatus';
    return this.httpService.httpPut(ServiceConfig.MASTER_DATA_MGMT_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

  // POST
  public cityFindByCriteria (req) {
    const path = '/cities/findByCriteria';
    const request = this.commonMap.mapFindByCriteriaReq(req);
    return this.httpService.httpPost(ServiceConfig.MASTER_SERVICE, path, request, null).pipe(
      map(
        (res: any) => {
          res.data = res.data.map(item =>
            this.masterDataMap.mapCity(item)
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
  public getApprovedCities () {
    const path = '/cities';
    return this.httpService.httpGet(ServiceConfig.MASTER_SERVICE, path, {}, null).pipe(
      map(
        (res: any) => {
          res = res.map(item =>
            this.masterDataMap.mapCity(item)
          );
          return res;
        }
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

}
