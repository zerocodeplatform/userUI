import { HttpInterceptor } from '../../../utils/httpinterceptor';
import { Language } from './language';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {

  constructor(private http: HttpInterceptor) { }
  getLanguage(url) {
    return this.http.get(url).map(res => (res.success) ? <Language>res.data : false);
  }
  updateLanguage(url, data) {
    return this.http.put(url, data).map(res => res.data);
  }

}
