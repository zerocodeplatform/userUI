import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { UsertypeService } from '../../../../services/usertype.service';
import { UsertypeLayoutComponent } from '../usertype-layout.component';
import { ConfirmationService } from 'primeng/api';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usertype-roles',
  templateUrl: './usertype-roles.component.html',
  styleUrls: ['./usertype-roles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsertypeRolesComponent implements OnInit {
  roles: any[];
  languageUrl: string;
  userRoleForm: FormGroup = new FormGroup({});
  submitButtonLabel = 'CREATE';
  reportToDropdown = [];
  showAddEditRoleForm = false;
  rolestatus = true;
  cols: any[];
  userTypeId: number;
  reportToDropdownData: any[];

  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true } },
    reportingTo: <FieldInterface>{ name: 'reportingTo', label: 'Reporting To', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    icon: <FieldInterface>{ name: 'icon', label: 'icon', rules: { required: false } }
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private usertypeService: UsertypeService,
    private tssFormService: TssFormService,
    private confirmationService: ConfirmationService) {
    this.tssFormService.buildFormControl(this.formData, this.userRoleForm);
    activatedRoute.paramMap.subscribe(params => {
      if (params['params']) {
        this.userTypeId = params['params']['userTypeId'];
      }
    });
  }

  ngOnInit() {
    this.getRoleList();
    this.getReportingToRolesList();
    this.cols = [
      { field: 'name', header: 'Role Name' },
      { field: 'reposrtingTo', header: 'Reporting To' },
      { field: 'description', header: 'Description' }
    ];
  }
  /**
   * Get role list
   * @author: Abhilash
   */
  getRoleList() {
    this.usertypeService.getRoleList(this.userTypeId, 'list').subscribe((res) => {
      this.roles = res;
    });
  }

  /**
   * Get role list
   * @author: Abhilash
   */
  getReportingToRolesList() {
    this.usertypeService.getRoleList(this.userTypeId, 'options').subscribe((res) => {
      this.reportToDropdown = res;
      this.reportToDropdownData = res;
    });
  }

  buildRoleDropdown(uid) {
    this.reportToDropdown = this.reportToDropdownData.filter(item => item.value !== uid);
  }

  /**
   * Pre-populate Data to filed
   * @param data - Prepopulate Data
   * @author - Abhilash
   */
  addEditFormShowRole(roleId) {
    this.userRoleForm.reset();
    if (roleId === '') {
      this.buildRoleDropdown('');
      this.formData.reportingTo.rules.required = true;
      if (this.roles.length <= 0) {
        this.tssFormService.removeValidation(this.formData.reportingTo, this.userRoleForm);
      } else {
        this.tssFormService.addValidation(this.formData.reportingTo, this.userRoleForm, Validators.required);
      }
      this.userRoleForm.patchValue({});
      this.submitButtonLabel = 'CREATE';
      this.showAddEditRoleForm = !this.showAddEditRoleForm;
      this.languageUrl = null;
    } else {
      this.usertypeService.getRoleById(this.userTypeId, roleId).subscribe((res) => {
        if (res) {
          this.languageUrl = 'userType/role/' + this.userTypeId + '/' + res.uid + '/language';
          // no validation for first role, since it will always be admin/ or top level
          if (res['reportingTo']) {
            this.tssFormService.addValidation(this.formData.reportingTo, this.userRoleForm, Validators.required);
          } else {
            this.tssFormService.removeValidation(this.formData.reportingTo, this.userRoleForm);
          }
          this.buildRoleDropdown(res.uid);
          this.userRoleForm.patchValue(res);
          this.submitButtonLabel = 'UPDATE';
          this.showAddEditRoleForm = true;
        }
      });
    }
    // scroll top
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  /**
   * Save data to Backend
   * @param valid validity of the form
   * @param value form value send to backend
   * @author - Abhilash
   */
  saveRole(valid, formData) {
    if (this.tssFormService.checkValidation(this.userRoleForm)) {
      // Default value if icon not set
      if (formData.icon === null || formData.icon === '') {
        formData.icon = 'fa-question-circle';
      }
      if (formData.uid) {
        this.usertypeService.updateRole(this.userTypeId, formData).subscribe((res) => {
          if (res) {
            this.getRoleList();
            this.showAddEditRoleForm = false;
          }
        });
      } else {
        this.usertypeService.createRole(this.userTypeId, formData).subscribe((res) => {
          if (res) {
            this.getRoleList();
            this.showAddEditRoleForm = false;
          }
        });
      }
    }
  }

  /**
   * Change status of the user type [Only for Lock icon click which presently not using]
   * @param: Entire data with status
   * @author - Abhilash
   */
  changeStatus(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Status Change',
      icon: 'fa fa-lock',
      accept: () => {
        const params = { uid: data.uid, status: !data.status };
        this.usertypeService.updateRoleStatus(this.userTypeId, params).subscribe((res) => {
          if (res) {
            data.status = !data.status;
          }
        });
      }
    });
  }
  /**
   * Delete Role
   * @param: Entire data with status
   * @author - Abhilash
   */
  deleteRole(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Delete Role',
      accept: () => {
        this.usertypeService.deleteUserTypeRole(this.userTypeId, data.uid).subscribe((res) => {
          if (res) {
            this.getRoleList();
          }
        });
      }
    });
  }

  /**
   * Change status of the user type Only for Slider
   * @param: Entire data with status
   * @author - Abhilash
   */
  updateRoleStatus(data, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the Role?',
      header: 'Change Role Status',
      accept: () => {
        // logic to yes a confirmation
        this.usertypeService.updateRoleStatus(this.userTypeId, { uid: data.uid, status: event.checked }).subscribe((res) => {
          if (res) {
            data.status = event.checked;
          } else {
            event.source.checked = !event.checked;
          }
        });
      },
      reject: () => {
        // logic to cancel a confirmation
        event.source.checked = !event.checked;
      }
    });
  }

}
