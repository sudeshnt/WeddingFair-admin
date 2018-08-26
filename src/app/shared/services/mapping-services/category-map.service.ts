import { Injectable } from '@angular/core';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class CategoryMapService {

  constructor() { }

  public mapCategory(data) {
    const request = {
      'categoryId': data.categoryId || 0,
      'description': data.description || null,
      'imageUrl': data.imageUrl || null,
      'name': data.name || null,
      'status': data.status || 0,
      'statusName': this.getStatusName(data.status)
    };
    return request;
  }

  private getStatusName(statusId) {
    const statusKey = Object.keys(Config.statusList).find(key => Config.statusList[key].id === statusId);
    return Config.statusList[statusKey].name;
  }

}
