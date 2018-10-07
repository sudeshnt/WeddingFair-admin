import { Injectable } from '@angular/core';
import {ServiceConfig} from '../../config';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpService: HttpService) { }

  // POST
  public uploadImage (req) {
    const path = '/upload';
    return this.httpService.httpPostFile(ServiceConfig.IMAGE_SERVICE, path, req, null).pipe(
      map(
        (res: any) => res
      ),
      catchError(
        (error: any) => throwError(error)
      ));
  }

}
