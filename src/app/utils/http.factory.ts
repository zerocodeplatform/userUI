import { XHRBackend, Http, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './httpinterceptor';
import { LoadingIndicatorService } from './loading-indicator.service';
import { AppConfigService } from '../config/app-config.service';
import { ToasterService } from './toaster.service';
import { Injector } from '@angular/core';

export function httpFactory(xhrBackend: XHRBackend,
    requestOptions: RequestOptions,
    loadingIndicatorService: LoadingIndicatorService,
    toasterService: ToasterService, appConfigService: AppConfigService, injector: Injector): Http {
    return new HttpInterceptor(xhrBackend, requestOptions,
        loadingIndicatorService, toasterService, appConfigService, injector);
}
