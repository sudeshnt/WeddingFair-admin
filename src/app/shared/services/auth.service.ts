import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataService } from './local-data.service';
import { Config, AppConfig, ServiceConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private session: any = {
    'id' : null,
    'name' : null,
    'adminType' : null,
    'sessionId' : null,
    'user' : null
  };

  constructor(private httpClient: HttpClient, private localStorage: LocalDataService) { }

  public authenticate (username, password) {
    const promise = new Promise((resolve, reject) => {
      const req = {
        'loginName': username,
        'password': password
      };
      const header = new HttpHeaders();
      const url =  AppConfig.API_URL + ServiceConfig.ADMIN_SERVICE.ROUTE_PATH + '/login';
      return this.httpClient.request('PUT', url, {body: req, headers: header})
        .toPromise()
        .then((response: any) => {
          const user = this.getUserObject(response.adminId,
            response.loginName,
            response.name,
            response.shopName,
            response.categoryId,
            response.serviceProviderId,
            response.superAdmin,
            response.xAdmin,
            response.sessionId,
            response.firstTime,
            response.status);
          const adminType = response.xAdmin ? Config.adminTypes.X_ADMIN : (response.superAdmin ? Config.adminTypes.SUPER_ADMIN : 0 );
          this.createSession(response.adminId, response.name, adminType, response.sessionId, user);
          this.localStorage.setItem( 'user', JSON.stringify(this.session));
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  public logout() {
    this.destroySession();
    this.localStorage.remove('user');
  }

  public updateUserFromLocalData (localData) {
    const user = this.getUserObject(localData.user.adminId,
      localData.user.loginName,
      localData.user.name,
      localData.user.shopName,
      localData.user.categoryId,
      localData.user.serviceProviderId,
      localData.user.superAdmin,
      localData.user.xAdmin,
      localData.user.sessionId,
      localData.user.firstTime,
      localData.user.status);
    const adminType = user.xAdmin ? Config.adminTypes.X_ADMIN : (user.superAdmin ? Config.adminTypes.SUPER_ADMIN : 0 );
    this.createSession(localData.user.adminId, localData.user.name, adminType, localData.user.sessionId, user);
  }

  public isAuthenticated() {
    return !!this.session.id;
  }

  public getUserAdminType () {
    return this.session.adminType;
  }

  public getLoggedInUser() {
    return this.session.user;
  }

  private createSession (id, name, adminType, sessionId, user) {
    this.session.id = id;
    this.session.name = name;
    this.session.adminType = adminType;
    this.session.sessionId = sessionId;
    this.session.user = user;
  }

  private destroySession () {
    this.session.id = null;
    this.session.name = null;
    this.session.adminType = null;
    this.session.sessionId = null;
    this.session.user = null;
  }

  private getUserObject (id, username, name, shopName, categoryId, serviceProviderId, superAdmin, xAdmin, sessionId, firstTime, status) {
    const user: any = {};
    user.adminId = id || 0;
    user.loginName = username || '';
    user.name = name || '';
    user.shopName = shopName || '';
    user.categoryId = categoryId || 0;
    user.serviceProviderId = serviceProviderId || 0;
    user.superAdmin = superAdmin || false;
    user.xAdmin = xAdmin || false;
    user.sessionId = sessionId || '';
    user.firstTime = firstTime || true;
    user.status = status || 0;
    return user;
  }

}
