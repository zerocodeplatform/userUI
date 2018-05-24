import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SiteConfig } from '../utils/models/site-config';
import { AppConfigService } from '../config/app-config.service';
import { HttpInterceptor } from '../utils/httpinterceptor';
import { FieldInterface } from '../core/tss-form/models/field.interface';

@Injectable()
export class SiteConfigService {

  constructor(private http: HttpInterceptor, private appConfigService: AppConfigService) { }
  /**
   *
   *
   * @returns
   * @memberof SiteConfigService
   */
  getSiteConfig() {
    return new Promise((resolve, reject) => {
      return this.http.get('site/config').map((res) => {
        return <SiteConfig>res.data;
      }).subscribe((res) => {
        this.appConfigService.siteConfig = res;
        resolve(true);
      });
    });
  }
  /**
   *
   *
   * @returns basic details
   * @memberof SiteConfigService
   */
  getBasicSetting() {
    return this.http.get('site/settings/basic').map(res => res.data);
  }
  /**
   *
   *
   * @param {any} data
   * @returns
   * @memberof SiteConfigService
   */
  updateBasicSetting(data) {
    return this.http.put('site/settings/basic', data);
  }
  /**
   * @param null
   * @name rakesh
   * @returns
   * @memberof SiteConfigService
   */
  getAdvancedSetting() {
    return this.http.get('site/settings/advanced').map(res => {
      // const files: FieldInterface[] = [];
      // if (res && res.data && ) {
      //   res.data.advanced.forEach(filed => {
      //     filed.label = filed.displayName;
      //     filed.name = filed.uid;
      //     files.push(filed);
      //   });
      // }
      return res.data.advanced;
    }
    );
  }
  /**
   *
   *
   * @param {any} data
   * @returns
   * @memberof SiteConfigService
   */
  updateAdvancedSetting(data) {
    return this.http.put('site/settings/advanced', data);
  }
}
