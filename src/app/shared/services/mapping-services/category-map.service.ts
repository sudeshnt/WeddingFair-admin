import { Injectable } from '@angular/core';
import { Config } from '../../config';
import { ComFunction } from '../../class';

@Injectable({
  providedIn: 'root'
})
export class CategoryMapService {

  constructor(private comFunc: ComFunction) { }

  public mapCategory(data) {
    console.log(data);

    const request = {
      'categoryId': data.categoryId || 0,
      'description': data.description || null,
      'imageUrl': data.imageUrl || null,
      'name': data.name || null,
      'status': data.status || 0,
      'statusName': this.comFunc.getStatusName(data.status)
    };
    return request;
  }

}
