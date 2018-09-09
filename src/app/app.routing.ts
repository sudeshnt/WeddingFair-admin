import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XAdminAuthGuard, VendorAuthGuard } from './shared/services';
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ServiceCategoriesComponent } from './views/service-categories/service-categories.component';
import { CitiesComponent } from './views/cities/cities.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [ XAdminAuthGuard ]
  },
  {
    path: 'master-data',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [ XAdminAuthGuard ],
    children: [
      {
        path: 'categories',
        component: ServiceCategoriesComponent,
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'cities',
        component: CitiesComponent,
        data: {
          title: 'Cards'
        }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
