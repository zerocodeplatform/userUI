import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UserService } from '../../../../services/user.service';
import { UsertypeLayoutComponent } from '../usertype-layout.component';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { UsertypeService } from '../../../../services/usertype.service';
import { CommonService } from '../../../../services/common.service';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usertype-users',
  templateUrl: './usertype-users.component.html',
  styleUrls: ['./usertype-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsertypeUsersComponent implements OnInit {
  totalRecords: number;
  first = 1;
  rows = 10;
  usersData: any = [];
  userData: any = [];
  cols: any[];
  userTypeUserForm: FormGroup = new FormGroup({});
  submitButtonLabel = 'CREATE';
  addUserModule = false;
  saltuations = [];
  genders = [];
  roles = [];
  reportingTos = [];
  departmensts = [];
  dt: any;
  userTypeId: number;

  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    img: <FieldInterface>{ name: 'img', label: 'image', rules: { required: false } },
    firstName: <FieldInterface>{ name: 'firstName', label: 'First Name', rules: { required: true } },
    middleName: <FieldInterface>{ name: 'middleName', label: 'Middle Name', rules: { required: false } },
    lastName: <FieldInterface>{ name: 'lastName', label: 'Last Name', rules: { required: false } },
    salutation: <FieldInterface>{ name: 'salutation', label: 'Salutation', rules: { required: true } },
    dob: <FieldInterface>{ type: 'date', name: 'dob', label: 'Date Of Birth', rules: { required: false } },
    gender: <FieldInterface>{ name: 'gender', label: 'Gender', rules: { required: true } },
    email: <FieldInterface>{ name: 'email', label: 'Email', rules: { required: true } },
    phone: <FieldInterface>{ name: 'phone', label: 'Phone', rules: { required: true } },
    loginUnique: <FieldInterface>{ name: 'loginUnique', label: 'Login Id', rules: { required: true } },
    role: <FieldInterface>{ name: 'role', label: 'Role', rules: { required: false } },
    reportsTo: <FieldInterface>{ name: 'reportsTo', label: 'Reporting To', rules: { required: false } }
  };

  constructor(private commonService: CommonService,
    private userTypeService: UsertypeService,
    private userService: UserService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService) {
    tssFormService.buildFormControl(this.formData, this.userTypeUserForm);
    activatedRoute.paramMap.subscribe(params => {
      if (params['params']) {
        this.userTypeId = params['params']['userTypeId'];
      }
    });
  }
  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'User Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone', class: 'text-align-center' },
      { field: 'gender', header: 'Gender', class: 'text-align-center' },
      { field: 'dob', header: 'DOB', class: 'text-align-center' },
      { field: 'role', header: 'Role' },
      { field: 'reportsTo', header: 'Reports To' },
      { field: 'loginUnique', header: 'Login Id' }
    ];

    // This will calls a method that will populates Role drop down in user create or edit form
    this.getRolesList();
    // This will calls a method that will populates Gender drop down in user create or edit form
    this.getGendersList();
    // This will calls a method that will populates Salutation drop down in user create or edit form
    this.getSalutationList();
  }

  /**
   * This method will loads list of genders
   *
   * @author Mahesh
   * @since 2018-02-26
   */
  getGendersList() {
    this.commonService.getDropDownDataByName('Gender').subscribe((res) => {
      this.genders = res.Gender;
    });
  }

  /**
   * This method will loads list of c
   *
   * @author Mahesh
   * @since 2018-02-26
   */
  getSalutationList() {
    this.commonService.getDropDownDataByName('Salutation').subscribe((res) => {
      this.saltuations = res.Salutation;
    });
  }

  /**
    * This method will loads list of roles
    *
    * @author Mahesh
    * @since 2018-02-26
    */
  getRolesList() {
    this.userTypeService.getRoleList(this.userTypeId, 'options').subscribe((res) => {
      this.roles = res;
    });
  }

  /**
   * This method will loads list of roles
   *
   * @author Mahesh
   * @since 2018-02-26
   */
  getReportingToList(roleId, userId) {
    this.reportingTos = [];
    if (roleId) {
      if(!userId)
        userId = 0;
      this.userService.getReportingToUsersList(this.userTypeId, roleId, userId).subscribe((res) => {
        this.reportingTos = res;
      });
    }
  }

  /**
   * This method will loads list of users
   *
   * @author Mahesh
   * @since 2018-02-22
   */
  getUsersList(event: LazyLoadEvent) {
    const params = { page: (event.first/event.rows) + 1, sidx: event.sortField, sord: event.sortOrder < 0 ? 'DESC' : 'ASC', searchKey: event.globalFilter, rows: event.rows };
    this.userService.getUsersList(this.userTypeId, params, 'grid').subscribe((res) => {
      this.totalRecords = res.size;
      this.usersData = res.rows;
    });
  }

  /**
   * This method will opens create or edit form by passing userData
   *
   * @author Mahesh
   * @since 2018-02-22
   * @param userData
   */
  addEditUser(userId) {
    this.submitButtonLabel = 'Create';
    this.userTypeUserForm.reset();
    if (userId) {
      this.userService.getUserById(this.userTypeId, userId).subscribe((res) => {
        res.dob = new Date(res.dob);
        this.getReportingToList(res.role.value,userId);
        this.userTypeUserForm.patchValue(res);
        this.submitButtonLabel = 'UPDATE';
        this.addUserModule = true;
      });
    } else {
      this.addUserModule = !this.addUserModule;
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  /**
   * This method will crate or updates user by passing userType name and user data
   *
   * @author Mahesh
   * @since 2018-02-22
   * @param formData
   * @see UsertypeService
   */
  createOrUpdateUser(dt, formData) {
    if (this.tssFormService.checkValidation(this.userTypeUserForm)) {
      if (formData.uid) {
        this.userService.updateUser(this.userTypeId, formData).subscribe((res) => {
          if (res) {
            this.addUserModule = false;
            this.reset(dt);
          }
        });
      } else {
        this.userService.createUser(this.userTypeId, formData).subscribe((res) => {
          if (res) {
            this.addUserModule = false;
            this.reset(dt);
          }
        });
      }
    }
  }

  /**
  * This method will deletes user by passing formData
  *
  * @author Mahesh
  * @since 2018-02-22
  * @param formData
  * @see UsertypeService
  */
  deleteUser(dt, formData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the user?',
      header: 'Delete User',
      accept: () => {
        this.userService.deleteUser(this.userTypeId, formData.uid).subscribe((res) => {
          if (res) {
            this.reset(dt);
            this.addUserModule = false;
          }
        });
      }
    });
  }

  /**
   * This method will updates user status by passing user id and status
   *
   * @author Mahesh
   * @since 2018-02-22
   * @param uid
   * @param event
   * @see UsertypeService
   */
  updateUserStatus(data, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the user?',
      header: 'Change User Status',
      accept: () => {
        this.userService.updateUserStatus(this.userTypeId, { uid: data.uid, status: event.checked }).subscribe((res) => {
          if (res) {
            data.status = event.checked;
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

  reset(dt) {
    dt.reset();
  }
}
