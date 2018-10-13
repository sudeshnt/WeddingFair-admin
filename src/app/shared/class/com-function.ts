import { Config } from '../config';

export class ComFunction {

  devideArrayIntoColumns (theArr: String[], columns: number): String[][] {
    const arrOfarrays = [];
    for (let i = 0; i < theArr.length ; i += columns) {
      const row = [];
      for (let x = 0; x < columns; x++) {
        const value = theArr[i + x];
        if (!value) {
          break;
        }
        row.push(value);
      }
      arrOfarrays.push(row);
    }
    return arrOfarrays;
  }

  public getStatusName (statusId) {
    const statusKey = Object.keys(Config.statusList).find(key => Config.statusList[key].id === statusId);
    return Config.statusList[statusKey].name;
  }

  public httpErrorHandler(error) {
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

