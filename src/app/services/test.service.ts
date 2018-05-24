import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpInterceptor } from '../utils/httpinterceptor';
import { HttpClient } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class TestService {

  constructor(private http: HttpInterceptor, private httpClient: HttpClient) { }

  getTestList(): Observable<any> {
    return this.http.get('servicename')
      .map(res => res.json());
  }
  get(url) {
    return this.http.get('json/' + url)
      .map(res => res.data);
  }
  post(url, data) {
    return this.http.post('json/' + url, data)
      .map(res => res);
  }
}
