import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
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
  VendorMapService,
  MasterDataMapService
} from './shared/services/mapping-services';


import {
  XAdminAuthGuard,
  VendorAuthGuard,
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
import { DefaultLayoutComponent } from './containers';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

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
  VendorMapService,
  MasterDataMapService
];

const SERVICES = [
  XAdminAuthGuard,
  VendorAuthGuard,
  HttpService,
  AuthService,
  EmitterService,
  LocalDataService,
  ToastNotificationService
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ...APP_CONTAINERS
  ],
  imports: [
    FormsModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    DialogModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
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
