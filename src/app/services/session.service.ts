import { LocalStorageService } from '../utils/local-storage.service';
import { SessionModel } from '../utils/models/session-model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  sessionObj: SessionModel;
  constructor(private ls: LocalStorageService, private router: Router) { }
  /**
   *
   *
   * @returns {boolean}
   * @memberof SessionService
   */
  checkSession(): boolean {
    this.sessionObj = this.ls.getItem('session', true);
    if (this.sessionObj) {
      return true;
    }
    return false;
  }
  /**
   *
   * creat a cookies when login true
   * @param {any} sessionObj
   * @memberof SessionService
   */
  setSession(sessionObj) {
    this.ls.setItem('session', sessionObj, true);
    // this.sessionObj
  }
  /**
   *
   *
   * @returns sessionObj (logged in user details)
   * @memberof SessionService
   */
  getSession() {
    this.sessionObj = this.ls.getItem('session', true);
    return this.sessionObj;
  }
  /**
   *
   * Remove session cookies
   * @memberof SessionService
   */
  clearSession() {
    this.ls.removeItem('session');
  }
  /**
   *
   * Clear cookies and redirect to login page when session expired
   * @memberof SessionService
   */
  sessionExpired() {
    this.clearSession();
    this.router.navigate(['/login']);
  }
}
