import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../utils/httpinterceptor';
import { LocalStorageService } from '../utils/local-storage.service';
import { Router } from '@angular/router';

/**
 * This Service will be used to implement commonly using services for the whole application
 * @author Mahesh
 * @since 2018-02-26
*/
@Injectable()
export class CommonService {

  // This constructor
  constructor(private http: HttpInterceptor, private ls: LocalStorageService, private router: Router) { }

  /**
   * This service will get list of drop down values by passing drop down name
   * @author Mahesh
   * @since 2018-02-26
   * @param name
   */
  getDropDownDataByName(name) {
    return this.http.get('picklist/options?names=' + name).map(res => res.data);
  }
}
