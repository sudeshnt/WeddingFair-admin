import { Config } from '../config';

export class ComFunction {

  public getStatusName (statusId) {
    const statusKey = Object.keys(Config.statusList).find(key => Config.statusList[key].id === statusId);
    return Config.statusList[statusKey].name;
  }

}

