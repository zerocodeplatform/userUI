import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../../utils/httpinterceptor';

@Injectable()
export class TssImageService {

  constructor(private http:HttpInterceptor) { }
  getImages(){
    return this.http.get('imglib').map(res=>res.data);
  }

}
