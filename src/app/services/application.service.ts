import { HttpInterceptor } from '../utils/httpinterceptor';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApplicationService {

  constructor(private http: HttpInterceptor) { }

  // Application

  /**
   * Service to get application list
   * @author Krunal
   * @since 2018-02-22
   */
  getApplicationList() {
    return this.http.get('application').map(res => res.data);
  }
  /**
   *
   *
   * @param {any} applicationId
   * @returns
   * @memberof ApplicationService
   */
  getApplicationById(applicationId) {
    return this.http.get('application/' + applicationId).map(res => res.data);
  }

  /**
   * service to create application
   * @author Krunal
   * @since 2018-02-22
   */
  saveApplication(appData) {
    return this.http.post('application', appData).map(res => res.success);
  }

  /**
     * service to update application
     * @author Krunal
     * @since 2018-02-22
     */
  updateApplication(appData) {
    return this.http.put('application', appData).map(res => res.success);
  }

  /**
    * service to update application status
    * @author Krunal
    * @since 2018-02-22
  */
  updateAppStatus(appData) {
    return this.http.put('application/status', appData).map(res => res.success);
  }

  /**
    * service to update application list
    * @author Krunal
    * @since 2018-02-22
  */
  reorderApplicationList(appData) {
    return this.http.put('application/order', appData).map(res => res.success);
  }

  /**
    * service to delete application
    * @author Krunal
    * @since 2018-02-22
  */
  deleteApplication(uid) {
    return this.http.delete('application?ids=' + uid).map(res => res.success);
  }

  /**
   * Get aplication details by Uid
   * @param - uid - Uid for Application
   * @author - Abhilash
   * @since - 8 March 2018
   */
  getApplicationDetailByUid(uid) {
    return this.http.get('application/' + uid).map(res => res.data);
  }

  /**
   * Get access permision list by application Uid
   * @param uid uid of application
   * @author - Abhilash
   * @since - 8 March 2018
   */
  getAccessUserTypesList(applicationId) {
    return this.http.get('application/' + applicationId + '/accessUserType').map(res => res.data);
  }
  /**
   * This method will loads access roles data
   *
   * @author Mahesh.J
   * @param applicationId
   * @param userTypeId
   * @since 2018-03-21
   * @see ApplicationService
   */
  getAccessRolesList(applicationId, userTypeId) {
    return this.http.get('application/' + applicationId + '/accessUserType/' + userTypeId + '/accessRole').map(res => res.data);
  }

  /**
   * Get filter list by application Uid
   * @param uid uid of application
   * @author - Abhilash
   * @since - 8 March 2018
   */
  getFiltersList(uid) {
    return this.http.get('application/' + uid).map(res => res.data);
  }

  /**
   *
   * This method will updates access role access status
   *
   * @author Mahesh.J
   * @since 2018-03-21
   * @param userTypeId
   * @param data
   */
  updateAccessRoleStatus(applicationId, userTypeId, data) {
    return this.http.put('application/' + applicationId + '/accessUserType/' + userTypeId + '/accessRole/status', data).map(res => res.success);
  }

  // Module
  /**
    * service to get application details
    * @author Krunal
    * @since 2018-02-22
  */
  getApplicationDetails(module) {
    return this.http.get('application/' + module).map(res => res.data);
  }

  /**
    * service to get module details
    * @author Krunal
    * @since 2018-02-23
  */
  getModuleDetailsById(moduleId) {
    return this.http.get('application/module/view/' + moduleId).map(res => res.data);
  }

  /**
    * service to get module list
    * @author Krunal
    * @since 2018-02-23
  */
  getModuleList(appId) {
    return this.http.get('application/module/' + appId).map(res => res.data);
  }

  getModuleById(appId, moduleId) {
    return this.http.get('application/module/' + appId + '/' + moduleId).map(res => res.data);
  }

  /**
    * service to create module
    * @author Krunal
    * @since 2018-02-22
  */
  saveModule(appData, appId) {
    return this.http.post('application/module/' + appId, appData).map(res => res.success);
  }

  /**
    * service to update module
    * @author Krunal
    * @since 2018-02-22
  */
  updateModule(appData, appId) {
    return this.http.put('application/module/' + appId, appData).map(res => res.success);
  }

  /**
    * service to update module status
    * @author Krunal
    * @since 2018-02-22
  */
  updateModuleStatus(appData, appId) {
    return this.http.put('application/module/' + appId + '/status/', appData).map(res => res.success);
  }

  /**
    * service to reorder module list
    * @author Krunal
    * @since 2018-02-22
  */
  reorderModuleList(applicationId, appData) {
    return this.http.put('application/module/' + applicationId + '/order', appData).map(res => res.success);
  }

  /**
    * service to delete module
    * @author Krunal
    * @since 2018-02-22
  */
  deleteModule(appId, uid) {
    return this.http.delete('application/module/' + appId + '?ids=' + uid).map(res => res.success);
  }

  // Dataset
  /**
      * service to get module list
      * @author Krunal
      * @since 2018-02-23
    */
  getDatasetsList(moduleId) {
    return this.http.get('application/module/dataset/' + moduleId).map(res => res.data);
  }

  /**
      * get dataset by uid
      * @author - Abhilash
      * @since 8 March 2018
    */
  getDatasetById(moduleUid, uid) {
    return this.http.get('application/module/dataset/' + moduleUid + '/' + uid).map(res => res.data);
  }

  /**
     * service to create module
     * @author Krunal
     * @since 2018-02-23
   */
  saveDataset(moduleId, appData) {
    return this.http.post('application/module/dataset/' + moduleId, appData).map(res => res.success);
  }

  /**
    * service to update module
    * @author Krunal
    * @since 2018-02-23
  */
  updateDataset(moduleId, appData) {
    return this.http.put('application/module/dataset/' + moduleId, appData).map(res => res.success);
  }

  /**
   * Delete dataset by uid service
   * @param datasetId - datsset uid
   */
  deleteDataSetById(moduleUid, datasetUid) {
    return this.http.delete('application/module/dataset/' + moduleUid + '?ids=' + datasetUid).map(res => res.success);
  }

  /**
   * Update status dataset by uid service
   * @param datasetId - datsset uid
   */
  updateDataSetStatusById(moduleUid, datasetData) {
    return this.http.put('application/module/dataset/' + moduleUid + '/status', datasetData).map(res => res.success);
  }

  // Pages

  /**
      * service to get module list
      * @author Krunal
      * @param moduleId
      * @since 2018-02-23
    */
  getPagesList(moduleId) {
    return this.http.get('application/module/page/' + moduleId).map(res => res.data);
  }

  /**
     * service to create module
     * @author Krunal
     * @param moduleId
     * @since 2018-02-23
   */
  savePage(moduleId, appData) {
    return this.http.post('application/module/page/' + moduleId, appData).map(res => res.success);
  }

  /**
    * service to update module
    * @author Krunal
    * @param moduleId
    * @since 2018-02-23
  */
  updatePage(moduleId, appData) {
    return this.http.put('application/module/page/' + moduleId, appData).map(res => res.success);
  }

  /**
   * This method will deletes page by passing page id
   * @author Mahesh
   * @since 2018-02-28
   * @param pageId
   * @method delete
   */
  deletePage(moduleId, pageId: any) {
    return this.http.delete('application/module/page/' + moduleId + '?ids=' + pageId).map(res => res.success);
  }

  /**
   * This method will updates page status by passing page id and status
   * @author Mahesh
   * @since 2018-02-28
   * @param page
   * @method put
   */
  updatePageStatus(moduleId, page: any) {
    return this.http.put('application/module/page/' + moduleId + '/status', page).map(res => res.success);
  }
  /**
   *
   *
   * @param {any} moduleUid
   * @param {any} uid
   * @returns
   * @memberof ApplicationService
   */
  getPageById(moduleUid, uid) {
    return this.http.get('application/module/page/' + moduleUid + '/' + uid).map(res => res.data);
  }
  savePageBuilder(pageUid, data) {
    return this.http.put('application/module/page/content/' + pageUid, data).map(res => res.data);
  }

  // Dataset - Properties

  /**
   * This method will loads list of themes data
   *
   * @author Mahesh.J
   * @param mode
   * @since 2018-05-07
   * @see ApplicationService
   */
  getThemeOptionsList(mode) {
    return this.http.get('application/theme/' + mode).map((response: any) => response.data);
  }

  /**
   * This method will loads list of layouts data
   *
   * @author Mahesh.J
   * @param mode
   * @since 2018-05-07
   * @see ApplicationService
   */
  getLayoutOptionsList(mode) {
    return this.http.get('application/module/page/masterPage/' + mode).map((response: any) => response.data);
  }
}
