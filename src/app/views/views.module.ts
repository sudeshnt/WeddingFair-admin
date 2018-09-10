import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';

import { ServiceCategoriesComponent } from './xadmin/master-data/service-categories/service-categories.component';
import { CitiesComponent } from './xadmin/master-data/cities/cities.component';
import { SubCategoriesComponent } from './xadmin/master-data/sub-categories/sub-categories.component';
import { VendorsComponent } from './xadmin/vendors/vendors.component';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { MyProfileComponent } from './vendor/my-profile/my-profile.component';
import { MediaComponent } from './vendor/media/media.component';
import { LocationComponent } from './vendor/location/location.component';

@NgModule({
    declarations: [
      ViewsComponent,
      ServiceCategoriesComponent,
      CitiesComponent,
      SubCategoriesComponent,
      DataTableComponent,
      VendorsComponent,
      MyProfileComponent,
      MediaComponent,
      LocationComponent
    ],
  imports: [
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAju8NqvoQwZrbzEEOKDue91SlPe7M9lmc'
    }),
    NgxDatatableModule,
    FormsModule,
    CommonModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
