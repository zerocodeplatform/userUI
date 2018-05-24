import { SiteConfig } from '../utils/models/site-config';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

  siteConfig: SiteConfig;
  constructor() { }

}
