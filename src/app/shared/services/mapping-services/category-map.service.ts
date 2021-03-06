import { Injectable } from '@angular/core';
import { ComFunction } from '../../class';

@Injectable({
  providedIn: 'root'
})
export class CategoryMapService {

  constructor(private comFunc: ComFunction) { }

  public mapCategory(data) {
    const response = {
      'categoryId': data.categoryId || 0,
      'description': data.description || null,
      'imageUrl': data.imageUrl || null,
      'name': data.name || null,
      'statusId': data.status || 0,
      'status': this.comFunc.getStatusName(data.status)
    };
    return response;
  }

}
