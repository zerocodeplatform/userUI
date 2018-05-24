import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

@Injectable()
export class PageSetupService {
  blockClickSubject = new Subject<any>();
  constructor() { }
  setClickedBlock(block){
    this.blockClickSubject.next(block);
  }
  getClickedBlock(): Observable<any> {
    return this.blockClickSubject.asObservable();
  }

}
