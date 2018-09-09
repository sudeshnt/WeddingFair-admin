import { Config } from '../config';

export class ComFunction {

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

