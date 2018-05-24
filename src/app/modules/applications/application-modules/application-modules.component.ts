import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { ActivatedRoute, Params, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { FieldInterface } from '../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../core/tss-form/services/tss-form.service';

@Component({
  selector: 'app-application-modules',
  templateUrl: './application-modules.component.html',
  styleUrls: ['./application-modules.component.scss']
})
export class ApplicationModulesComponent implements OnInit {
  moduleList: any = [];
  urlParams: any;
  flagAddModule = false;
  buttonLabel = 'Create';
  moduleOrderList: any = { list: [] };
  activeClassIndex = 0;
  activeTabIndex = 0;
  activeTabName = '';
  module: string;
  uid: string;
  applicationName: string;
  applicationUid: string;
  datasetsList = [];
  pagesList = [];
  filterargs = '';
  selectedModuleId: Number;
  moduleFormGroup: FormGroup = new FormGroup({});
  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    icon: <FieldInterface>{ name: 'icon', label: 'icon', rules: { required: false } }
  };

  constructor(private applicationService: ApplicationService,
    private confirmationService: ConfirmationService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
      this.activatedRoute.parent.routeConfig.data.breadcrumbs = this.urlParams.applicationName;
    });
  }

  ngOnInit() {
    this.tssFormService.buildFormControl(this.formData, this.moduleFormGroup);
    if (this.activeTabIndex === 0) {
      this.activeTabName = 'Datasets';
    } else if (this.activeTabIndex === 1) {
      this.activeTabName = 'Pages';
    }
    this.getModuleList();
  }

  /**
    * Method to get datalist list
    * @author Abhilash
    * @since 28-02-2018
  */
  getDatasetList(moduleId) {
    this.datasetsList = [];
    this.applicationService.getDatasetsList(moduleId).subscribe((res) => {
      if (res) {
        this.datasetsList = res;
      }
    });
  }

  /**
    * Method to get modules list
    * @author Krunal
    * @since 2018-02-22
  */
  getModuleList() {
    this.moduleList = [];
    this.applicationService.getModuleList(this.urlParams.applicationUid).subscribe((res) => {
      this.moduleList = res;
      if (this.moduleList.length === 0) {
        this.flagAddModule = true;
      } else {
        this.onModuleSelect(this.moduleList[0], 0);
      }
    });
  }

  /**
    * Method to create module
    * @author Krunal
    * @since 2018-02-22
  */
  createEditModule(moduleId) {
    this.buttonLabel = 'Create';
    this.moduleFormGroup.reset();
    if (moduleId) {
      this.applicationService.getModuleById(this.urlParams.applicationUid, moduleId).subscribe((res) => {
        this.buttonLabel = 'Update';
        this.moduleFormGroup.patchValue(res);
        this.flagAddModule = true;
      });
    } else {
      this.flagAddModule = !this.flagAddModule;
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  /**
    * Method to save & update module
    * @author Krunal
    * @since 2018-02-22
  */
  saveUpdateModule(value) {
    if (this.tssFormService.checkValidation(this.moduleFormGroup)) {
      if (value.icon === null || value.icon === '') {
        value.icon = 'fa-question-circle';
      }
      if (value.uid) {
        this.applicationService.updateModule(value, this.urlParams.applicationUid).subscribe((resUpdate) => {
          if (resUpdate) {
            this.getModuleList();
            this.flagAddModule = false;
          }
        });
      } else {
        this.applicationService.saveModule(value, this.urlParams.applicationUid).subscribe((res) => {
          if (res) {
            this.flagAddModule = false;
            this.getModuleList();
          }
        });
      }
    }
  }

  /**
    * Method to delete module
    * @author Krunal
    * @since 2018-02-22
  */
  deleteModule(value) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Delete Module',
      accept: () => {
        const result = this.applicationService.deleteModule(this.urlParams.applicationUid, value.uid).subscribe((res) => {
          if (res) {
            this.getModuleList();
          }
        });
      }
    });
  }

  /**
    * Method to update module status
    * @author Krunal
    * @since 2018-02-22
  */
  updateModuleStatus(app, index): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Update Status',
      accept: () => {
        const params = {
          uid: app.uid,
          status: (app.status) ? false : true
        };
        this.applicationService.updateModuleStatus(params, this.urlParams.applicationUid).subscribe((res) => {
          if (res) {
            this.moduleList[index]['status'] = params.status;
          }
        });
      }
    });
  }

  /**
    * Method to reorder module list
    * @author Krunal
    * @since 2018-02-22
  */
  reOrder(index) {
    this.activeClassIndex = index;
    this.moduleList.forEach((field, key) => {
      field['seqOrder'] = key + 1;
      this.moduleOrderList.list.push({ uid: field.uid, seqOrder: field.seqOrder });
    });
    this.applicationService.reorderModuleList(this.urlParams.applicationUid, this.moduleOrderList).subscribe((res) => {
      if (res) {

      }
    });
  }

  /**
    * Method for changing tabs and updaitng URL
    * @author Krunal
    * @since 2018-02-23
  */
  onTabChange(event) {
    this.activeTabIndex = event.index;
    if (this.activeTabIndex === 0) {
      this.activeTabName = 'Datasets';
      this.getDatasetList(this.selectedModuleId);
    } else if (this.activeTabIndex === 1) {
      this.activeTabName = 'Pages';
      this.getPagesList(this.selectedModuleId);
    }
  }

  /**
      * This method get called on selecting the Module to get related Datatsets & Pages
      * @author Krunal
      * @since 2018-02-23
    */
  onModuleSelect(row, index) {
    this.module = row.name;
    this.uid = row.uid;
    this.applicationName = row.name;
    this.applicationUid = row.uid;
    this.activeClassIndex = index;
    this.selectedModuleId = row.uid;
    if (this.activeTabIndex === 0) {
      this.activeTabName = 'Datasets';
      this.getDatasetList(this.selectedModuleId);
    } else if (this.activeTabIndex === 1) {
      this.activeTabName = 'Pages';
      this.getPagesList(this.selectedModuleId);
    }
  }

  /**
   * Delete DataSet
   * @param data - row data which is selected
   * @author - Abhilash
   */
  deleteDataSet(data) {
    console.log('this.urlParams', this.urlParams);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Delete Dataset',
      accept: () => {
        this.applicationService.deleteDataSetById(this.selectedModuleId, data.uid).subscribe((res) => {
          if (res) {
            this.getDatasetList(this.selectedModuleId);
          }
        });
      }
    });
  }

  /**
   * Change status of Data Set
   * @param data selected row data
   * @param event event passed during change
   * @author - Abhilash
   */
  updateDataSetStatus(data, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the dataset?',
      header: 'Change Dataset Status',
      accept: () => {
        // logic to yes a confirmation
        this.applicationService.updateDataSetStatusById(this.selectedModuleId, { uid: data.uid, status: event.checked }).subscribe((res) => {
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

  /**
    * Method to get pages list
    * @author Krunal
    * @since 2018-02-23
  */
  getPagesList(moduleId) {
    this.pagesList = [];
    this.applicationService.getPagesList(moduleId).subscribe((res) => {
      this.pagesList = res;
    });
  }

  /**
   * This method will deletes department by passing formData
   * @author Mahesh
   * @since 2018-03-02
   * @param formData
   * @see ApplicationService
   */
  deletePage(formData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the page?',
      header: 'Delete Page',
      accept: () => {
        this.applicationService.deletePage(this.selectedModuleId, formData.uid).subscribe((res) => {
          if (res) {
            this.getPagesList(this.selectedModuleId);
          }
        });
      }
    });
  }

  /**
   * This method will updates page status by passing page id and status
   * @author Mahesh
   * @since 2018-03-02
   * @param page
   * @param event
   * @see ApplicationService
   */
  updatePageStatus(formData, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the page?',
      header: 'Change Page Status',
      accept: () => {
        this.applicationService.updatePageStatus(this.selectedModuleId, { uid: formData.uid, status: event.checked }).subscribe((res) => {
          if (res) {
            formData.status = event.checked;
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
