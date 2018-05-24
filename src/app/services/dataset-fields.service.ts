import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpInterceptor } from './../utils/httpinterceptor';
import { FieldInterface } from '../core/tss-form/models/field.interface';

@Injectable()
export class DatasetFieldsService {

  constructor(private http: HttpInterceptor) { }
  /**
   *
   *
   * @param {any} datasetUid
   * @returns
   * @memberof DatasetFieldsService
   */
  getFieldTypes(datasetUid) {
    return this.http.get('application/module/dataset/' + datasetUid + '/field/fieldTypes').map(res => res.data);
  }
  /**
   * @param {string} fieldType // text,textarea
   * @returns Fields
   * @memberof DatasetFieldsService
   */
  getFieldStructure(datasetUid, fieldType: string) {
    return this.http.get('application/module/dataset/' + datasetUid + '/field/fieldStructure/' + fieldType).map(res => <any>res.data);
  }
  /**
   * @param {any} datasetUid
   * @param {any} fieldId
   * @returns
   * @memberof DatasetFieldsService
   */
  getFieldDetails(datasetUid, fieldId) {
    return this.http.get('application/module/dataset/' + datasetUid + '/field/' + fieldId).map(res => <FieldInterface[]>res.data.fields);
  }
  /**
   *
   *
   * @param {any} datasetUid
   * @returns
   * @memberof DatasetFieldsService
   */
  getFieldList(datasetUid) {
    return this.http.get('application/module/dataset/' + datasetUid + '/field').map(res => <any>res.data);
  }
  /**
   *
   *
   * @param {any} datasetUid
   * @param {any} type
   * @param {any} data
   * @returns
   * @memberof DatasetFieldsService
   */
  saveFieldStructure(datasetUid, type, data) {
    return this.http.post('application/module/dataset/' + datasetUid + '/field/' + type, data);
  }
  /**
   *
   *
   * @param {any} datasetUid
   * @param {any} type
   * @param {any} data
   * @returns
   * @memberof DatasetFieldsService
   */
  updateFieldStructure(datasetUid, type, data) {
    return this.http.put('application/module/dataset/' + datasetUid + '/field/' + type, data);
  }

}
