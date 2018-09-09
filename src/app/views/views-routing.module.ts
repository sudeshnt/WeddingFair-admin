import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoriesComponent } from './xadmin/master-data/sub-categories/sub-categories.component';
import { XAdminAuthGuard, VendorAuthGuard } from '../shared/services';
import { ServiceCategoriesComponent } from './xadmin/master-data/service-categories/service-categories.component';
import { CitiesComponent } from './xadmin/master-data/cities/cities.component';
import { VendorsComponent } from './xadmin/vendors/vendors.component';

import { MyProfileComponent } from './vendor/my-profile/my-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: SubCategoriesComponent,
    data: {
      title: 'Home'
    },
    canActivate: [ XAdminAuthGuard ]
  },
  {
    path: 'master-data',
    data: {
      title: 'Home'
    },
    canActivate: [ XAdminAuthGuard ],
    children: [
      {
        path: 'categories',
        component: ServiceCategoriesComponent,
        data: {
          title: 'Categories'
        }
      },
      {
        path: 'cities',
        component: CitiesComponent,
        data: {
          title: 'Cities'
        }
      }
    ]
  },
  {
    path: 'vendors',
    component: VendorsComponent,
    data: {
      title: 'Vendors'
    },
    canActivate: [ XAdminAuthGuard ]
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    data: {
      title: 'My Profile'
    },
    canActivate: [ VendorAuthGuard ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ViewsRoutingModule { }
