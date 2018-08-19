import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
  EmitterService,
  HttpService,
  ToastNotificationService
} from './shared/services';

import {
  PublicData
} from './shared/data';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { TabsModule } from 'ngx-bootstrap/tabs';

const API_SERVICES = [
  AdminService,
  CategoryService,
  ClientService,
  ImageService,
  MasterDataService,
  VendorService
];

const SERVICES = [
  EmitterService,
  HttpService,
  ToastNotificationService
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
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
    ...SERVICES,
    PublicData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
