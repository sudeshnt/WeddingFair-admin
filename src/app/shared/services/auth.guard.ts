import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class XAdminAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.getUserAdminType() === Config.adminTypes.X_ADMIN) {
        return true;
      } else {
        this.toastr.error('You are not authorized to visit this page.', '');
        this.router.navigate(['/login']).then();
        return false;
      }
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class VendorAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.getUserAdminType() === Config.adminTypes.SUPER_ADMIN) {
        return true;
      } else {
        this.toastr.error('You are not authorized to visit this page.', '');
        this.authService.logout();
        return false;
      }
    } else {
      this.authService.logout();
      return false;
    }
  }

}
