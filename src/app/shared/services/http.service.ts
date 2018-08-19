import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmitterService } from './emitter.service';
import { AppConfig } from './../config';
import { PublicData } from './../data/public-data';

@Injectable()
export class HttpService {

  private WEB_API_URL = AppConfig.API_URL;

  constructor(private httpClient: HttpClient, private onEmit: EmitterService, private publicData: PublicData) { }

  httpGet(sevConfig: any, path: string, body: any, header_value: any) {
    const promise = new Promise((resolve, reject) => {
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      return this.httpClient.get(url, { headers: httpHeaders })
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          error = this.httpErrorHandler(error);
          this.onEmit.broadcastHttpErrorEventEmitter(error);
          reject(error);
        });
    });
    return promise;
  }

  httpPost(sevConfig: any, path: string, body: any, header_value: any) {
    const promise = new Promise((resolve, reject) => {
      const req_body = JSON.stringify(body);
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      return this.httpClient.request( 'POST', url, {body: body, headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          error = this.httpErrorHandler(error);
          this.onEmit.broadcastHttpErrorEventEmitter(error);
          reject(error);
        });
    });
    return promise;
  }

  httpPut(sevConfig: any, path: string, body: any, header_value: any) {
    const promise = new Promise((resolve, reject) => {
      const req_body = JSON.stringify(body);
      const header = new HttpHeaders().set('Content-Type', 'application/json');
      const httpHeaders = this.setHeader(header, header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      return this.httpClient.request( 'PUT', url, {body: req_body, headers: httpHeaders})
        .toPromise()
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          error = this.httpErrorHandler(error);
          this.onEmit.broadcastHttpErrorEventEmitter(error);
          reject(error);
        });
    });
    return promise;
  }

  httpPostFile(sevConfig: any, path: string, body: any, header_value: any) {
    const promise = new Promise((resolve, reject) => {
      const header = new HttpHeaders();
      const httpHeaders = this.setHeader(header, header_value);
      const url = this.WEB_API_URL + sevConfig.ROUTE_PATH + path;
      const formData: FormData = new FormData();
      for (const key in body) {
          formData.append(key, body[key]);
      }
      return this.httpClient.request( 'POST', url, {body: formData, headers: httpHeaders})
        .toPromise()
        .then(response => {
            resolve(response);
        })
        .catch(error => {
            this.onEmit.broadcastHttpErrorEventEmitter(error);
            reject(error);
        });
    });
    return promise;
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
        error.errorMessage = 'Connection Error';
        break;
      default:
        break;
    }
    return error;
  }


}
