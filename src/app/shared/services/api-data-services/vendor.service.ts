import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ServiceConfig } from '../../config';
import { VendorMapService } from '../mapping-services';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpService: HttpService, private vendorMap: VendorMapService) { }

  public registerVendor (req) {
    // loadUserRequestEffect$: Observable<Action> = this.actions$.pipe(
    //   ofType<storeActions.GetUsers>(storeActions.ActionTypes.GET_USERS),
    //   switchMap(action =>
    //     this.accountService.getUsers(action.payload).pipe(
    //       map(data => new storeActions.GetUsersSuccess({data})),
    //       catchError(error =>
    //         observableOf(new storeActions.GetUsersFailure(error))
    //       )
    //     )
    //   )
    // );


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

}
