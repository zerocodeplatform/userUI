import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {
  }
  canLoad() {
    return this.checkLogin();
  }
  canActivate() {
    return this.checkLogin();
  }
  checkLogin() {
    if (this.sessionService.checkSession()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
