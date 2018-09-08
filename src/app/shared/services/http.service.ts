import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AppConfig } from '../config';
import { PublicData } from '../data/public-data';

@Injectable()
export class HttpService {

  private WEB_API_URL = AppConfig.API_URL;

  constructor(private httpClient: HttpClient, private publicData: PublicData) { }

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
          this.httpErrorHandler(error)
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
          this.httpErrorHandler(error)
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
          this.httpErrorHandler(error)
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

  private httpErrorHandler(error) {
    switch (error.status) {
      case 401:
        error.errorMessage = 'user not authorized';
        break;
      case 304:
        const eTag = error.headers.get('ETag');
        if (eTag) {
          const res = eTag.replace(/'/g, '');
          error.errorMessage = res;
        }
        break;
      case 500:
        error.errorMessage = 'Server Error';
        break;
      default:
        error.errorMessage = 'Connection Error';
        break;
    }
    return error;
  }


}
