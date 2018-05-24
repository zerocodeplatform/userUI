import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationService } from '../../../../services/application.service';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-datasets',
  templateUrl: './app-datasets.component.html',
  styleUrls: ['./app-datasets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppDatasetsComponent implements OnInit, OnChanges {
  @Input() moduleUid: string;
  datasetsList: any = [];
  urlParams: any;
  urlQueryParams: any;
  flagAddDataset = false;
  buttonLabel = 'Create';
  datasetsOrderList: any = { list: [] };
  datasetFormGroup: FormGroup = new FormGroup({
    'icon': new FormControl('')
  });
  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Dataset Name', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    entityName: <FieldInterface>{ name: 'entityName', label: 'Table Name', rules: { required: true } },
  };
  cols = [];
  datasetUid = 0;

  constructor(private applicationService: ApplicationService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService) {
    this.cols = [
      { field: 'name', header: 'Dataset Name' },
      { field: 'description', header: 'Description' }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getDatasetList();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.urlQueryParams = params;
      if (this.urlQueryParams['add']) {
        this.flagAddDataset = true;
        this.datasetUid = 0;
      }
    });
    this.tssFormService.buildFormControl(this.formData, this.datasetFormGroup);
  }

  /**
    * Method to get datalist list
    * @author Krunal
    * @since 2018-02-23
  */
  getDatasetList() {
    this.datasetsList = [];
    this.applicationService.getDatasetsList(this.moduleUid).subscribe((res) => {
      this.datasetsList = res;
      if (this.datasetsList.length === 0) {
        this.flagAddDataset = true;
        this.datasetFormGroup.reset();
      }
    });
  }

  /**
    * Method to create dataset
    * @author Krunal
    * @since 2018-02-23
  */
  addEditDataset(dataSetUid) {
    this.buttonLabel = 'Create';
    this.datasetFormGroup.reset();
    if (dataSetUid) {
      /* this.applicationService.getDatasetById(this.moduleUid, dataSetUid).subscribe((res) => {
        this.datasetFormGroup.patchValue(res);
        this.buttonLabel = 'UPDATE';
        this.flagAddDataset = true;
      }); */
      this.flagAddDataset = false;
      this.datasetUid = dataSetUid;
      // this.buttonLabel = 'UPDATE';
      setTimeout(() => { this.flagAddDataset = true; }, 50);
    } else {
      this.datasetUid = 0;
      this.flagAddDataset = !this.flagAddDataset;
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  /**
    * Method to save & update dataset
    * @author Krunal
    * @since 2018-02-22
  */
  createOrUpdateDataset(value, valid) {
    if (this.tssFormService.checkValidation(this.datasetFormGroup)) {
      if (value.icon === null || value.icon === '') {
        value.icon = 'fa-question-circle';
      }
      if (value.uid) {
        this.applicationService.updateDataset(this.moduleUid, value).subscribe((resUpdate) => {
          this.getDatasetList();
          this.flagAddDataset = false;
        });
      } else {
        this.applicationService.saveDataset(this.moduleUid, value).subscribe((res) => {
          this.flagAddDataset = false;
          this.datasetFormGroup.reset();
          this.getDatasetList();
        });
      }
    }
  }

  /**
   * When row selected navigate to properties page
   * @param event Row selection event
   * @author Abhilash
   */
  onRowSelect(event) {
    this.router.navigate(['properties/' + event.uid + '/' + event.name], { relativeTo: this.activatedRoute.parent });
  }

  /**
   * Delete DataSet
   * @param data - row data which is selected
   */
  deleteDataSet(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Delete Dataset',
      accept: () => {
        this.flagAddDataset = false;
        this.applicationService.deleteDataSetById(this.moduleUid, data.uid).subscribe((res) => {
          if (res) {
            this.getDatasetList();
          }
        });
      }
    });
  }

  /**
   * Change status of Data Set
   * @param data selected row data
   * @param event event passed during change
   */
  updateDataSetStatus(data, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the Dataset?',
      header: 'Change Dataset Status',
      accept: () => {
        // logic to yes a confirmation
        this.applicationService.updateDataSetStatusById(this.urlParams.module, { uid: data.uid, status: event.checked }).subscribe((res) => {
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

  afterSaveCallback(event) {
    this.flagAddDataset = false;
    this.getDatasetList();
  }

}
