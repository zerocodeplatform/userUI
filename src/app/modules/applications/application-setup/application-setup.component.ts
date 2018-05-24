import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FieldInterface } from '../../../core/tss-form/models/field.interface';
import { ApplicationService } from '../../../services/application.service';
import { TssFormService } from '../../../core/tss-form/services/tss-form.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-application-setup',
  templateUrl: './application-setup.component.html',
  styleUrls: ['./application-setup.component.scss']
})
export class ApplicationSetupComponent implements OnInit {
  datasetDropdown = [];
  dataSetForm: FormGroup = new FormGroup({});  
  moduleDetails: any;
  urlParams: any;
  applicationDetails: any;
  appCreateForm: FormGroup = new FormGroup({});  
  buttonLabel = 'Create';
  activeTabIndex = 0;
  accessUserTypes= [];
  accessRoles = [];
  filterDatas: any;
  languageDatas: any;
  languageUrl: string;
  userTypeId: any;
  activeClassIndex = 0;
  addEditFlag = false;
  refreshAccessRoles = true;
  themeOptions = [];
  themeOptionsData = [];
  formData2 = {
    dataset: <FieldInterface>{ name: 'name', label: 'Dataset', rules: { required: true } },
    dvalue: <FieldInterface>{ name: 'dvalue', label: 'value', rules: { required: true } },
    include: <FieldInterface>{ name: 'include', label: 'include', rules: { required: true } },
  };
  formData = {
    name: <FieldInterface>{ name: 'name', label: 'Application Name', rules: { required: true } },
    icon: <FieldInterface>{ name: 'icon', label: 'Icon', value: 'fa-question-circle', rules: { required: false } },
    url: <FieldInterface>{ name: 'url', label: 'Application Url', rules: { required: true } },
    applicationTheme: <FieldInterface>{ name: 'applicationTheme', label: 'Theme', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    setting: <FieldInterface>{ name: 'setting', label: 'setting', value: '{}', rules: { required: false } },
  };

  constructor(private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tssFormService: TssFormService,
    private confirmationService: ConfirmationService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
    });
    this.tssFormService.buildFormControl(this.formData, this.appCreateForm);
  }

  ngOnInit() {
    this.datasetDropdown = [
      { label: 'Contact', value: 'Manager' },
      { label: 'Company', value: 'Manager' },
      { label: 'Project', value: 'Manager' }
    ];
    if (this.urlParams.applicationUid !== '0') {
      this.getApplicationDetailByUid();
      this.languageUrl = 'application/' + this.urlParams.applicationUid + '/language';      
    }
    this.getThemeOptions();
  }

  /**
   * Get aplication details by Uid from URL params
   * @author - Abhilash
   * @since - 8 March 2018
   */
  getApplicationDetailByUid() {
    this.applicationService.getApplicationDetailByUid(this.urlParams.applicationUid).subscribe((res) => {
      if (res) {
        this.addEditFlag=true;
        this.applicationDetails = res;
        this.activatedRoute.parent.routeConfig.data.breadcrumbs = this.applicationDetails.name;
        this.appCreateForm.addControl('uid', new FormControl(''));
        this.buttonLabel = 'Update';
        this.appCreateForm.patchValue(this.applicationDetails);
        this.getAccessUserTypesList(); // Default loading of Access Permission           
        this.buildThemeOptionsEdit(res);
      }
    });
  }

  /**
   * Get theme options list
   * @author: Mahesh.J
   */
  getThemeOptions() {
    this.applicationService.getThemeOptionsList('options').subscribe((res) => {
      this.themeOptions = res;
      this.themeOptionsData = res;
    });
  }

  buildThemeOptionsEdit(uid) {
    this.themeOptions = this.themeOptionsData.filter(item => item.value !== uid);
  }

  /**
   * Navigate back to listing page
   * @author - Abhilash
   * @since - 8 March 2018
   */
  gotoApplicationList() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

  /**
   * This method will loads access roles data
   * 
   * @author Mahesh.J
   * @since 2018-03-21
   * @see ApplicationService
   */
  getAccessUserTypesList() {
    this.applicationService.getAccessUserTypesList(this.urlParams.applicationUid).subscribe((res) => {
      if (res) {
        this.accessUserTypes = res;
        // If it is updating we are not allowing to refresh access roles
        if(this.refreshAccessRoles) {
          this.onUserTypeSelect(this.accessUserTypes[this.activeClassIndex], this.activeClassIndex);
        } else {
          /* If it is not updating but clicking on user types then we are allowing to refresh access roles
            This active class index will loads current updating roles user type tab, instead of loading default first*/
          this.userTypeId = this.accessUserTypes[this.activeClassIndex].uid;
          this.activeClassIndex = this.activeClassIndex;
        }
      }
    });
  }

  /**
    * Method for changing tabs
    * @author Abhilash
    * @since 2018-02-26
  */
 onTabChange(event) {
  this.activeTabIndex = event.index;
  if (this.activeTabIndex === 0) {
    this.getAccessUserTypesList();
  } else if (this.activeTabIndex === 1) {
    this.getFiltersList();
  } else if (this.activeTabIndex === 3) {
    this.getLanguageList();
  }
}

  /**
   * This method will loads access roles data based on selected user type id and activates selected tab
   * 
   * @param data 
   * @param index 
   * @since 2018-03-21
   */
  onUserTypeSelect(data, index) {
    this.userTypeId = data.uid;
    this.activeClassIndex = index;
    this.getRolesList(data.uid);
  }
  
  /**
   * This method will loads access roles data
   * 
   * @author Mahesh.J
   * @param userTypeId 
   * @since 2018-03-21
   * @see ApplicationService
   */
  getRolesList(userTypeId) {
    this.accessRoles = [];
    this.applicationService.getAccessRolesList(this.urlParams.applicationUid,userTypeId).subscribe((res) => {
      if (res) {
        this.accessRoles = res;
      }
    });
  }

  /**
   * This method will updates access role access status and loads access user types data
   * 
   * @author Mahesh.J
   * @since 2018-03-21
   * @see ApplicationService
   */
  updateAccessRole(){
    this.applicationService.updateAccessRoleStatus(this.urlParams.applicationUid,this.userTypeId, {'list':this.accessRoles}).subscribe((res) => {
      this.refreshAccessRoles = false;//Stop allowing to refresh when it is access role udpate
      this.getAccessUserTypesList();
    });
  }

  /**
    * Method to save & update application
    * @author Abhilash
    * @since 8 March 2018
  */
  saveUpdateApp(value, valid) {
    if (this.tssFormService.checkValidation(this.appCreateForm)) {
      if (value.icon === null || value.icon === '') {
        value.icon = 'fa-question-circle';
      }
      if (value.uid) {
        this.applicationService.updateApplication(value).subscribe((resUpdate) => {
          if (resUpdate) {
            this.gotoApplicationList();
          }
        });
      } else {
        this.applicationService.saveApplication(value).subscribe((res) => {
          if (res) {
            this.gotoApplicationList();
          }
        });
      }
    }
  }

  /**
   * Get Filters list by application Uid
   * @author - Abhilash
   * @since - 8 March 2018
   */
  getFiltersList() {
    /* this.applicationService.getFiltersList(this.urlParams.applicationUid).subscribe((res) => {
      if (res) {
        this.filterDatas = res;
      }
    }); */
  }

  /**
   * Get Language list
   * @author - Abhilash
   * @since - 8 March 2018
   */
  getLanguageList() {
    /* this.applicationService.getFiltersList(this.urlParams.applicationUid).subscribe((res) => {
      if (res) {
        this.languageDatas = res;
      }
    }); */
  }

  /**
   * This method will updates access flag to TRUE/FALSE based on status change 
   * 
   * @author Mahesh.J
   * @param data 
   * @param event 
   * @since 2018-03-21
   */
  updateAccessRoleStatus(data, event) {
    // const msg = event.checked ? 'activate' : 'in-activate';
    // this.confirmationService.confirm({
    //   message: 'Are you sure that you want to ' + msg + ' the role?',
    //   header: 'Change Status',
    //   accept: () => {
    //     this.applicationService.updateAccessRoleStatus(this.urlParams.applicationUid,this.userTypeId, { uid: data.uid, status: event.checked }).subscribe((res) => {
    //       if (res) {
    //         data.status = event.checked;
    //       } else {
    //         event.source.checked = !event.checked;
    //       }
    //     });
    //   },
    //   reject: () => {
    //     event.source.checked = !event.checked;
    //   }
    //});
    data.access = event.checked;
  }
}
