import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { FieldInterface } from '../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../core/tss-form/services/tss-form.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
  addAppFlag = false;
  carateAppSubmittForm = false;
  activeClassIndex = null;
  applicationList: any = [];
  createApp: FormGroup = new FormGroup({});
  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true } },
    icon: <FieldInterface>{ name: 'icon', label: 'Icon', value: 'fa-question-circle', rules: { required: false } },
    url: <FieldInterface>{ name: 'url', label: 'Application Url', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    setting: <FieldInterface>{ name: 'setting', label: 'setting', value: '{}', rules: { required: false } },
  };
  buttonLabel = 'Create';
  orderList: any = { list: [] };
  constructor(private applicationService: ApplicationService,
    private confirmationService: ConfirmationService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getApplicationList();
    this.tssFormService.buildFormControl(this.formData, this.createApp);
  }

  /**
    * Method to get module details
    * @author Krunal
    * @since 2018-02-22
  */
  getApplicationList() {
    this.applicationList = [];
    this.applicationService.getApplicationList().subscribe((res) => {
      if (res) {
        this.applicationList = res;
        if (this.applicationList.length === 0) {
          this.addAppFlag = true;
        }
      }
    });
  }

  /**
    * Method to get add / update application form
    * @author Krunal
    * @since 2018-02-22
    * @modifiedBy - Abhilash
    * @modifiedDate - 8 Mar 2018
    * @description - Change routing using required uid
  */
  addEditApplication(applicationId) {
    // this.buttonLabel = 'Create';
    // this.createApp.reset();
    // if (applicationId) {
    //   this.applicationService.getApplicationById(applicationId).subscribe((res) => {
    //     this.buttonLabel = 'Update';
    //     this.createApp.patchValue(res);
    //     this.addAppFlag = true;
    //   });
    // } else {
    //   this.addAppFlag = !this.addAppFlag;
    // }
    this.router.navigate(['../application-setup', applicationId], { relativeTo: this.activatedRoute } );
  }

  /**
    * Method to save & update application
    * @author Krunal
    * @since 2018-02-22
  */
  saveUpdateApp(value, valid) {
    if (this.tssFormService.checkValidation(this.createApp)) {
      if (value.icon === null || value.icon === '') {
        value.icon = 'fa-question-circle';
      }
      if (value.uid) {
        this.applicationService.updateApplication(value).subscribe((resUpdate) => {
          if (resUpdate) {
            this.getApplicationList();
            this.addAppFlag = false;
          }
        });
      } else {
        this.applicationService.saveApplication(value).subscribe((res) => {
          if (res) {
            this.addAppFlag = false;
            this.createApp.reset();
            this.getApplicationList();
          }
        });
      }
    }
  }

  /**
    * Method to delete application
    * @author Krunal
    * @since 2018-02-22
  */
  onDelete(value): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Delete Application',
      accept: () => {
        const result = this.applicationService.deleteApplication(value.uid).subscribe((res) => {
          if (res) {
            this.getApplicationList();
          }
        });
      }
    });
  }

  /**
    * Method to update application status
    * @author Krunal
    * @since 2018-02-22
  */
  updateAppStatus(app, index): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Update Status',
      accept: () => {
        const params = {
          uid: app.uid,
          status: (app.status) ? false : true
        };
        this.applicationService.updateAppStatus(params).subscribe((res) => {
          if (res) {
            this.applicationList[index]['status'] = params.status;
          }
        });
      }
    });
  }

  /**
    * Method to reorder application list
    * @author Krunal
    * @since 2018-02-22
  */
  reOrder(index) {
    this.activeClassIndex = index;
    this.applicationList.forEach((field, key) => {
      field['seqOrder'] = key + 1;
      this.orderList.list.push({ uid: field.uid, seqOrder: field.seqOrder });
    });
    this.applicationService.reorderApplicationList(this.orderList).subscribe((res) => {
      if (res) {

      }
    });
  }
}
