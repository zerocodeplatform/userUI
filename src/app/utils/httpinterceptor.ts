import { Injectable, Injector } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';
import { LoadingIndicatorService } from './loading-indicator.service';
import { environment } from '../../environments/environment';
import { AppConfigService } from '../config/app-config.service';
import { SiteConfig } from './models/site-config';
import { SessionService } from '../services/session.service';
import { ToasterService } from './toaster.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptor extends Http {
    private router;
    private sessionService;
    url = environment.apiUrl;
    constructor(backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private loadingIndicatorService: LoadingIndicatorService,
        private toasterService: ToasterService,
        private appConfigService: AppConfigService, private injector: Injector) {
        super(backend, defaultOptions);
    }

    /**
     * @param {Request} request
     * @param {RequestOptionsArgs} [options]
     * @returns {Observable<Response>}
     * @memberof HttpInterceptor
     */
    request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
        this.loadingIndicatorService.onStarted(request);
        return super.request(request, options).map((res) => {
            return this.decryptionResponse(res);
            // console.log('res', res.json());

        }).finally(() => this.loadingIndicatorService.onFinished(request)).catch(this.handleError.bind(this));
    }
    public handleError = (e: Response) => {
        let error: any;
        error = e;
        const res = e.json();
        console.log('res -e', e.json());
        const errMsg = (res.message) ? res.message : error.status ? `${error.status} - ${error.statusText}-${error.url}` : 'Web Server error';

        // Do messaging and error handling here
        this.toasterService.clearAll();
        if (e.status === 401) {
            this.toasterService.show('error', errMsg);
            return this.unauthorised(e);
        } else if (e.status === 403) {
            return this.forbidden(e);
        } else {
            return Observable.throw(e);
        }
        // return Observable.throw(error);
    }
    public handleResponse = (response: Response) => {
        // console.log('responseError :response', response);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        url = this.updateUrl(url);
        body = this.encryptionRequest(body);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        url = this.updateUrl(url);
        body = this.encryptionRequest(body);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }
    public getJson(url: string, options?: RequestOptionsArgs): Observable<Response> {
        // url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }
    /**
     * @private
     * @param {string} req
     * @returns
     * @memberof HttpInterceptor
     */
    private updateUrl(req: string) {
        return environment.apiUrl + req;
    }
    /**
     * @private
     * @param {RequestOptionsArgs} [options]
     * @returns {RequestOptionsArgs}
     * @memberof HttpInterceptor
     */
    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = {};
        }
        if (!options.headers) {
            options.headers = new Headers({ 'User-Type': 'Application Manager' });
        }
        // options.headers.append('Accept', 'application/json, text/plain, */*');
        options.withCredentials = true;
        return options;
    }
    /**
     * @private
     * @param {any} reqBody
     * @returns
     * @memberof HttpInterceptor
     */
    private encryptionRequest(reqBody) {
        const siteConfig = this.appConfigService.siteConfig;
        const key = siteConfig.APP_ENCRYPTION_SECRET;
        const keyEnyDec: any = CryptoJS.enc.Base64.parse(btoa(key));
        const enycOptions: any = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
        const param: any = reqBody;
        if (siteConfig && (siteConfig && siteConfig.APPLY_ENCRYPTION)) {
            param.requestParams = CryptoJS.AES.encrypt(JSON.stringify(reqBody), keyEnyDec, enycOptions).toString();
        }
        return param;
    }
    /**
     * @private
     * @param {any} res
     * @returns json object
     * @memberof HttpInterceptor
     */
    private decryptionResponse(res) {
        let resJson = res.json();
        const siteConfig = this.appConfigService.siteConfig;
        // console.log('siteConfig', siteConfig);
        // checking encryptionKey
        let key;
        if (!siteConfig) {
            key = environment.encryptionKey;
        } else {
            key = siteConfig.APP_ENCRYPTION_SECRET;
        }
        // if not set siteconfig
        // console.log('siteConfig', siteConfig);
        if (!siteConfig || (siteConfig && siteConfig.APPLY_ENCRYPTION)) {
            const keyEnyDec = CryptoJS.enc.Base64.parse(btoa(key));
            const enycOptions: any = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 };
            resJson = JSON.parse(CryptoJS.AES.decrypt(resJson.resData, keyEnyDec, enycOptions).toString(CryptoJS.enc.Utf8));
            // console.log('resJson', resJson);
        }

        if (resJson.success) {
            if (resJson.message) {
                this.toasterService.show('success', resJson.message, '');
            }
        } else {
            this.toasterService.show('error', resJson.message, ' ');
        }
        return resJson;
    }
    /**
     * @param {any} error
     * @returns {Observable<any>}
     * @memberof HttpInterceptor
     */
    unauthorised(e): Observable<any> {
        if (this.sessionService == null) {
            this.sessionService = this.injector.get(SessionService);
        }
        this.sessionService.sessionExpired();
        // this.router.navigate(['/login']);
        //  this.router.navigate(['/login']);
        return Observable.throw(e);
    }
    /**
     * @param {any} e
     * @returns {Observable<any>}
     * @memberof HttpInterceptor
     */
    forbidden(e): Observable<any> {
        // this.router.navigate(['/']);
        return Observable.throw(e);
    }

}
