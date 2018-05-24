import { UserTypeModel } from '../utils/models/usertype-model';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from '../utils/httpinterceptor';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsertypeService {

  constructor(private http: HttpInterceptor) { }
  /**
   * Get user type list
   * @author - Abhilash
   */
  getUserTypeList(): Observable<UserTypeModel[]> {
    return this.http.get('userType')
      .map((response: any) => {
        return <UserTypeModel[]>response.data;
      });
  }
  /**
   * Get user Type By Name
   * @param name - User type name
   * @author - Abhilash
   */
  getUserTypeById(id) {
    return this.http.get('userType/' + id).map((response: any) => response.data);
  }

  /**
   * Add
   * @param usertype User type data
   */
  addUserType(usertype: UserTypeModel) {
    return this.http.post('userType', usertype).map((response: any) => response.success);
  }

  /**
   * Update User type
   * @param usertype user type data
   */
  updateUserType(usertype: UserTypeModel) {
    return this.http.put('userType', usertype).map((response: any) => response.success);
  }

  /**
   * Update status  of user type
   * @param data user type params for change
   */
  updateStatus(data) {
    return this.http.put('userType/status', data).map((response: any) => response.success);
  }

  /**
   * Delete User type by ID
   * @param id - User type UID
   */
  deleteUserType(id) {
    return this.http.delete('userType?ids=' + id).map((response: any) => response.success);
  }

  // Role
  /**
   * Get role list
   * @param name - User type name
   */
  getRoleList(id, mode) {
    return this.http.get('userType/role/' + id + '/' + mode).map((response: any) => response.data);
  }

  /**
  * Get role by id
  * @author Mahesh J
  * @param name - userTypeId
  * @param name - roleId
  */
  getRoleById(userTypeId, roleId) {
    return this.http.get('userType/role/' + userTypeId + '/' + roleId).map((response: any) => response.data);
  }

  /**
   * Add role for specified user
   * @param id - User type uid
   * @param usertype - User role form data
   */
  createRole(id: any, usertype: any) {
    return this.http.post('userType/role/' + id, usertype).map((response: any) => response.success);
  }

  updateRole(id: any, usertype: any) {
    return this.http.put('userType/role/' + id, usertype).map((response: any) => response.success);
  }

  /**
   * Update Role status  of user type role
   * @param data user type params for change
   */
  updateRoleStatus(userTypeId, data) {
    return this.http.put('userType/role/' + userTypeId + '/status', data).map((response: any) => response.success);
  }

  /**
   * Delete User type by ID
   * @param id - User type UID
   */
  deleteUserTypeRole(userTypeId, id) {
    return this.http.delete('userType/role/' + userTypeId + '?ids=' + id).map((response: any) => response.success);
  }

  /**
   * This method will get list of departments by passing user type name
   * @author Mahesh
   * @param userType Uid
   * @since 2018-02-22
   * @returns departments list
   * @method post
   */
  getDepartmentList(userTypeId, mode) {
    return this.http.get('userType/department/' + userTypeId + '/' + mode).map(res => res.data);
  }

  getDepartmentById(userTypeId, departmentId) {
    return this.http.get('userType/department/' + userTypeId + '/' + departmentId).map(res => res.data);
  }

  /**
   * This method will carete department by passing userType name and department data
   * @author Mahesh
   * @since 2018-02-22
   * @param name
   * @param department
   * @method post
   * @returns creted or updated department id
   */
  createDepartment(userTypeName: any, department: any) {
    return this.http.post('userType/department/' + userTypeName, department).map(res => res.success);
  }

  /**
   * This method will updates department by passing userType name and department data
   * @author Mahesh
   * @since 2018-02-22
   * @param name
   * @param department
   * @method put
   * @returns creted or updated department id
   */
  updateDepartment(userTypeName: any, department: any) {
    return this.http.put('userType/department/' + userTypeName, department).map(res => res.success);
  }

  /**
   * This method will deletes department by passing department id
   * @author Mahesh
   * @since 2018-02-22
   * @param departmentId
   * @method delete
   */
  deleteDepartment(userTypeId, departmentId: any) {
    return this.http.delete('userType/department/' + userTypeId + '?ids=' + departmentId).map(res => res.success);
  }

  /**
   * This method will updates department status by passing department id and status
   * @author Mahesh
   * @since 2018-02-22
   * @param department
   * @method put
   */
  updateDepartmentStatus(userTypeId, department: any) {
    return this.http.put('userType/department/' + userTypeId + '/status', department).map(res => res.success);
  }
}
