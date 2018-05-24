import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpInterceptor } from './utils/httpinterceptor';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AppRoutingModule } from './config/routes/app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from './utils/http.factory';
import { GlobalErrorHandler } from './utils/global-error-handler';
import { LoadingIndicatorService } from './utils/loading-indicator.service';
import { AuthGuard } from './config/router-guards/auth.guard';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PagesComponent } from './modules/pages/pages.component';
import { SiteConfigService } from './services/site-config.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { SiteConfig } from './utils/models/site-config';
import { AppConfigService } from './config/app-config.service';
import { CommonLayoutModuleModule } from './config/shared-modules/common-layout-module.module';
import { SessionService } from './services/session.service';
import { LocalStorageService } from './utils/local-storage.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginGuard } from './config/router-guards/login.guard';
import { ToasterService } from './utils/toaster.service';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export function initialConfigLoad(config: SiteConfigService) {
  return () => config.getSiteConfig();
}
@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    PagesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    GrowlModule,
    CommonLayoutModuleModule,
    ProgressSpinnerModule
  ],
  providers: [
    LoadingIndicatorService,
    AuthGuard,
    LoginGuard,
    AppConfigService,
    SessionService,
    LocalStorageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    SiteConfigService,
    { provide: APP_INITIALIZER, useFactory: initialConfigLoad, deps: [SiteConfigService], multi: true },
    MessageService,
    ToasterService,
    {
      provide: HttpInterceptor,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, LoadingIndicatorService, ToasterService, AppConfigService, Injector]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
