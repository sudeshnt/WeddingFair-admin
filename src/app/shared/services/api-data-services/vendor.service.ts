import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ServiceConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpService: HttpService) { }

}
