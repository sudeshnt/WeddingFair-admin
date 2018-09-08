import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ServiceCategoriesComponent } from './views/service-categories/service-categories.component';
import { SubCategoriesComponent } from './views/sub-categories/sub-categories.component';
import { CitiesComponent } from './views/cities/cities.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    }
  },
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
    path: 'master-data',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'categories',
        component: ServiceCategoriesComponent,
        data: {
          title: 'Cards'
        }
      },
      // {
      //   path: 'sub-categories',
      //   component: SubCategoriesComponent,
      //   data: {
      //     title: 'Cards'
      //   }
      // },
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
