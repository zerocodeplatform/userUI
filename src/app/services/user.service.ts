import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../utils/models/user';
import { LocalStorageService } from '../utils/local-storage.service';
import { HttpInterceptor } from '../utils/httpinterceptor';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(private http: HttpInterceptor, private ls: LocalStorageService, private router: Router) { }

  /**
   *
   *
   * @param {User} user
   * @returns
   * @memberof UserService
   */
  login(user: User) {
    return this.http.post('user/login', user).map(res => res.success);
  }
  /**
   *
   *
   * @memberof UserService
   */
  logout() {
    this.http.get('user/logout').subscribe((res) => {
      this.ls.removeItem('session');
      this.router.navigate(['/login']);
    });
  }
  /**
   *
   *
   * @memberof UserService
   */
  sessionExpire() {
    this.ls.removeItem('session');
    this.router.navigate(['/login']);
  }
/**
 *
 *
 * @param {User} user
 * @returns
 * @memberof UserService
 */
forgotPassword(user: User) {
    return this.http.post('user/forgotPassword', user).map(res => res.success);
  }

  /**
   * This method will get list of users by passing user type name
   * @author Mahesh
   * @param userTypeId
   * @since 2018-02-22
   * @returns users list
   * @method post
   */
  getUsersList(userTypeId, params, mode) {
    return this.http.post('userType/user/' + userTypeId + '/' + mode, params).map(res => res.jqGridData);
  }

  /**
   * This method will get list of users by passing user type name
   * @author Mahesh
   * @param userTypeId
   * @since 2018-02-22
   * @returns users list
   * @method post
   */
  getUserById(userTypeId, userId) {
    return this.http.get('userType/user/' + userTypeId + '/' + userId, {}).map(res => res.data);
  }

  /**
   * This method will get list of users by passing role id
   * @author Mahesh
   * @param roleId
   * @since 2018-02-22
   * @returns users list
   * @method post
   */
  getReportingToUsersList(userTypeId, roleId, userId) {
    return this.http.get('userType/user/' + userTypeId + '/role/users/' + roleId + '/' + userId).map(res => res.data);
  }

  /**
   * This method will carete user by passing userType name and user data
   * @author Mahesh
   * @since 2018-02-22
   * @param userTypeUID
   * @param user
   * @method post
   * @returns creted or updated user id
   */
  createUser(userTypeId: any, user: any) {
    return this.http.post('userType/user/' + userTypeId, user).map(res => res.success);
  }

  /**
   * This method will updates user by passing userType name and user data
   * @author Mahesh
   * @since 2018-02-22
   * @param userTypeUID
   * @param user
   * @method put
   * @returns creted or updated user id
   */
  updateUser(userTypeId: any, user: any) {
    return this.http.put('userType/user/' + userTypeId, user).map(res => res.success);
  }

  /**
   * This method will deletes user by passing user id
   * @author Mahesh
   * @since 2018-02-22
   * @param userId
   * @method delete
   */
  deleteUser(userTypeId: any, userId: any) {
    return this.http.delete('userType/user/' + userTypeId + '?ids=' + userId).map(res => res.success);
  }

  /** --- Incomplete ----
   * This method will updates user status by passing user id and status
   * @author Mahesh
   * @since 2018-02-22
   * @param user
   * @method put
   */
  updateUserStatus(userTypeId: any, user: any) {
    return this.http.put('userType/user/' + userTypeId + '/status', user).map(res => res.success);
  }
}
