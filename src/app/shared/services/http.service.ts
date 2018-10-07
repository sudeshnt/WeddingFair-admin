import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AppConfig } from '../config';
import { PublicData } from '../data/public-data';
import { ComFunction } from '../class';
import {hasOwnProperty} from 'tslint/lib/utils';

@Injectable()
export class HttpService {

  private WEB_API_URL = AppConfig.API_URL;

  constructor(private httpClient: HttpClient, private publicData: PublicData, private comFunc: ComFunction) { }

  httpGet(sevConfig: any, path: string, body: any, header_value: any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const httpHeaders = this.setHeader(header, header_value);
    const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
    return this.httpClient.get(url, { headers: httpHeaders }).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(
          this.comFunc.httpErrorHandler(error)
        )
      )
    );
  }

  httpPost(sevConfig: any, path: string, body: any, header_value: any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const httpHeaders = this.setHeader(header, header_value);
    const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
    return this.httpClient.post(url, body, { headers: httpHeaders }).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(
          this.comFunc.httpErrorHandler(error)
        )
      )
    );
  }

  httpPut(sevConfig: any, path: string, body: any, header_value: any) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const httpHeaders = this.setHeader(header, header_value);
    const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
    return this.httpClient.put(url, body, { headers: httpHeaders }).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(
          this.comFunc.httpErrorHandler(error)
        )
      )
    );
  }

  httpPostFile(sevConfig: any, path: string, body: any, header_value: any) {
    const header = new HttpHeaders();
    const httpHeaders = this.setHeader(header, header_value);
    const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
    const formData: FormData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }
    return this.httpClient.post(url, formData, { headers: httpHeaders, reportProgress: true, observe: 'events' }).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(
          this.comFunc.httpErrorHandler(error)
        )
      )
    );
  }

  private setHeader (header: any, header_value: any) {
    if (this.publicData.LoginResponse.session) {
      header = header.set('sessionid', this.publicData.LoginResponse.session);
    } else {
      header = header.set('sessionid', 'null');
    }
    if (header_value) {
      for (const key in header_value) {
        header = header.set(key, header_value[key]);
      }
    }
    return header;
  }

}
