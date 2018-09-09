import { Component } from '@angular/core';
import { AuthService, LocalDataService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeddingFair-admin';

  constructor (private authService: AuthService, private localStorage: LocalDataService) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      authService.updateUserFromLocalData(user);
    }
  }

}
