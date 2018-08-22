import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DefaultLayoutComponent } from './containers';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import {
  AdminService,
  CategoryService,
  ClientService,
  ImageService,
  MasterDataService,
  VendorService
} from './shared/services/api-data-services';

import {
  CommonMapService
} from './shared/services/mapping-services';


import {
  AuthService,
  EmitterService,
  HttpService,
  LocalDataService,
  ToastNotificationService
} from './shared/services';

import {
  PublicData
} from './shared/data';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ServiceCategoriesComponent } from './views/service-categories/service-categories.component';
import { CitiesComponent } from './views/cities/cities.component';
import { SubCategoriesComponent } from './views/sub-categories/sub-categories.component';

const API_SERVICES = [
  AdminService,
  CategoryService,
  ClientService,
  ImageService,
  MasterDataService,
  VendorService
];

const MAPPING_SERVICES = [
  CommonMapService
];

const SERVICES = [
  AuthService,
  EmitterService,
  HttpService,
  LocalDataService,
  ToastNotificationService
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent,
    ServiceCategoriesComponent,
    CitiesComponent,
    SubCategoriesComponent
  ],
  imports: [
    NgxDatatableModule,
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    TabsModule.forRoot()
  ],
  providers: [
    ...API_SERVICES,
    ...MAPPING_SERVICES,
    ...SERVICES,
    PublicData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
