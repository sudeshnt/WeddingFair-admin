import { Component, Input } from '@angular/core';
import { navItemsForXAdmin, navItemsForVendor } from './../../_nav';
import { AuthService } from '../../shared/services';
import { Router } from '@angular/router';
import { Config } from '../../shared/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(private router: Router, private authService: AuthService) {

    if (authService.isAuthenticated()) {
      switch (this.authService.getUserAdminType()) {
        case Config.adminTypes.X_ADMIN:
          this.navItems = navItemsForXAdmin;
          break;
        case Config.adminTypes.SUPER_ADMIN:
          this.navItems = navItemsForVendor;
          break;
        default:
          break;
      }
    }

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

  }

  logout () {
    this.authService.logout();
  }

}
