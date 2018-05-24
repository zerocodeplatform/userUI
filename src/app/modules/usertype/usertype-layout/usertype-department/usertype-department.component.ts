import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UsertypeLayoutComponent } from '../usertype-layout.component';
import { UsertypeService } from '../../../../services/usertype.service';
import { ConfirmationService } from 'primeng/api';
import { DepartentModel } from '../../../../utils/models/department-model';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usertype-department',
  templateUrl: './usertype-department.component.html',
  styleUrls: ['./usertype-department.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsertypeDepartmentComponent implements OnInit {
  departments: any[];
  userTypeDepartmentForm: FormGroup = new FormGroup({});
  submitButtonLabel = 'CREATE';
  addDepartmentModule = false;
  departmentStatus = true;
  cols: any[];
  userTypeId: number;
  languageUrl: string;

  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    icon: <FieldInterface>{ name: 'icon', label: 'icon', rules: { required: false } }
  };

  constructor(private activatedRoute: ActivatedRoute,
    private usertypeService: UsertypeService,
    private tssFormService: TssFormService,
    private confirmationService: ConfirmationService) {
    tssFormService.buildFormControl(this.formData, this.userTypeDepartmentForm);
    activatedRoute.paramMap.subscribe(params => {
      if (params['params']) {
        this.userTypeId = params['params']['userTypeId'];
      }
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Department Name' },
      { field: 'description', header: 'Description' }
    ];

    /*This will calls to load list of departments method */
    this.getDepartmentList();
  }

  /**
   * This method will loads list of departments
   * @author Mahesh
   * @since 2018-02-22
   */
  getDepartmentList() {
    this.usertypeService.getDepartmentList(this.userTypeId, 'list').subscribe((res) => {
      this.departments = res;
    });
  }

  /**
   * This method will opens create or edit form by passing departmentData
   * @author Mahesh
   * @since 2018-02-22
   * @param departmentData
   */
  addEditDepartment(departmentId) {
    this.submitButtonLabel = 'Create';
    this.userTypeDepartmentForm.reset();
    if (departmentId) {
      this.languageUrl = 'userType/department/' + this.userTypeId + '/' + departmentId + '/language';
      this.usertypeService.getDepartmentById(this.userTypeId, departmentId).subscribe((res) => {
        this.userTypeDepartmentForm.patchValue(res);
        this.submitButtonLabel = 'UPDATE';
        this.addDepartmentModule = true;
      });
    } else {
      this.languageUrl = null;
      this.addDepartmentModule = !this.addDepartmentModule;
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  /**
   * This method will crate or updates department by passing userType name and department data
   * @author Mahesh
   * @since 2018-02-22
   * @param formData
   * @see UsertypeService
   */
  createOrUpdateDepartment(formData) {
    if (this.tssFormService.checkValidation(this.userTypeDepartmentForm)) {
      if (formData.icon === null || formData.icon === '') {
        formData.icon = 'fa-question-circle';
      }
      if (formData.uid) {
        this.usertypeService.updateDepartment(this.userTypeId, formData).subscribe((res) => {
          if (res) {
            this.addDepartmentModule = false;
            this.getDepartmentList();
          }
        });
      } else {
        this.usertypeService.createDepartment(this.userTypeId, formData).subscribe((res) => {
          if (res) {
            this.addDepartmentModule = false;
            this.getDepartmentList();
          }
        });
      }
    }
  }

  /**
  * This method will deletes department by passing formData
  * @author Mahesh
  * @since 2018-02-22
  * @param formData
  * @see UsertypeService
  */
  deleteDepartment(formData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the department?',
      header: 'Delete Department',
      accept: () => {
        this.usertypeService.deleteDepartment(this.userTypeId, formData.uid).subscribe((res) => {
          if (res) {
            this.getDepartmentList();
            this.addDepartmentModule = false;
          }
        });
      }
    });
  }

  /**
   * This method will updates department status by passing department id and status
   * @author Mahesh
   * @since 2018-02-22
   * @param department
   * @param event
   * @see UsertypeService
   */
  updateDepartmentStatus(department, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the department?',
      header: 'Change Department Status',
      accept: () => {
        this.usertypeService.updateDepartmentStatus(this.userTypeId, { uid: department.uid, status: event.checked }).subscribe((res) => {
          if (res) {
            department.status = event.checked;
          } else {
            event.source.checked = !event.checked;
          }
        });
      },
      reject: () => {
        event.source.checked = !event.checked;
      }
    });
  }
}
