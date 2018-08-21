import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ServiceConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService) { }


}
