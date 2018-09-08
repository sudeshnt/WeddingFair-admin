import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DefaultLayoutComponent } from './containers';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { DialogModule } from 'primeng/dialog';

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

import { ComFunction } from './shared/class';

import {
  AdminService,
  CategoryService,
  ClientService,
  ImageService,
  MasterDataService,
  VendorService
} from './shared/services/api-data-services';

import {
  CommonMapService,
  CategoryMapService,
  VendorMapService
} from './shared/services/mapping-services';


import {
  HttpService,
  AuthService,
  EmitterService,
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
import { DataTableComponent } from './components/data-table/data-table.component';

const API_SERVICES = [
  AdminService,
  CategoryService,
  ClientService,
  ImageService,
  MasterDataService,
  VendorService
];

const MAPPING_SERVICES = [
  CommonMapService,
  CategoryMapService,
  VendorMapService
];

const SERVICES = [
  HttpService,
  AuthService,
  EmitterService,
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
    SubCategoriesComponent,
    DataTableComponent
  ],
  imports: [
    NgxDatatableModule,
    ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    DialogModule,
    TabsModule.forRoot()
  ],
  providers: [
    ComFunction,
    ...API_SERVICES,
    ...MAPPING_SERVICES,
    ...SERVICES,
    PublicData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
