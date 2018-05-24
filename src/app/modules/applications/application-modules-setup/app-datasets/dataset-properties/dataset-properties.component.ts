import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicationService } from '../../../../../services/application.service';
import { FieldInterface } from '../../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../../core/tss-form/services/tss-form.service';

@Component({
  selector: 'app-dataset-properties',
  templateUrl: './dataset-properties.component.html',
  styleUrls: ['./dataset-properties.component.scss']
})
export class DatasetPropertiesComponent implements OnInit, OnChanges {
  buttonLabel = 'Update';
  datasetDetails: any = [];
  urlParams: any;
  datasetFormGroup: FormGroup = new FormGroup({
    'icon': new FormControl('')
  });
  formData = {
    name: <FieldInterface>{ name: 'name', label: 'Dataset Name', rules: { required: true } },
    entityName: <FieldInterface>{ name: 'entityName', label: 'Entity Name', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
  };

  @Input() applicationName: string;
  @Input() applicationUid: string;
  @Input() module: string;
  @Input() moduleUid: string;
  @Input() datasetType: string;
  @Input() datasetName: string;
  @Input() datasetUid: number;
  @Output() afterSave: EventEmitter<any> = new EventEmitter();

  constructor(private applicationService: ApplicationService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('datasetUid')) {
      if (this.datasetUid !== 0) {
        this.getDatasetDetails();
      }
      if (this.datasetUid === 0) {
        this.buttonLabel = 'Save';
      } else {
        this.buttonLabel = 'Update';
      }
    }
  }

/**
  * Method to get selected dataset details
  * @author Krunal
  * @since 2018-02-26
*/
  getDatasetDetails() {
    this.datasetDetails = [];
    this.applicationService.getDatasetById(this.moduleUid, this.datasetUid).subscribe((res) => {
      if (res) {
        this.datasetDetails = res;
        if (this.datasetType !== '0') {
          this.activatedRoute.routeConfig.data.breadcrumbs = 'data set ( ' + this.datasetDetails.name + ' )';
        }
        this.datasetFormGroup.addControl('uid', new FormControl(this.datasetDetails.uid));
        this.datasetFormGroup.patchValue(this.datasetDetails);
      }
    });
  }

  /**
    * Method to update dataset details
    * @author Krunal
    * @since 2018-02-26
  */
  saveUpdateDataset(value, valid) {
    if (this.tssFormService.checkValidation(this.datasetFormGroup)) {
      this.applicationService.updateDataset(this.applicationUid, value).subscribe((res) => {
        if (res) {
          if (this.datasetType !== '0') {
            this.getDatasetDetails();
          } else {
            this.afterSave.emit('1');
          }
        }
      });
    }
  }

  /**
   * Go to Data set page
   * @author - Abhilash
   */
  gotoDataSet() {
    this.router.navigate(['../../../'], { relativeTo: this.activatedRoute });
  }

  /**
    * Method to save & update dataset
    * @author Abhilash
    * @since 15 March 2018
  */
 createOrUpdateDataset(value, valid) {
  if (this.tssFormService.checkValidation(this.datasetFormGroup)) {
    if (value.icon === null || value.icon === '') {
      value.icon = 'fa-question-circle';
    }
    if (this.datasetUid !== 0) {
      this.applicationService.updateDataset(this.moduleUid, value).subscribe((resUpdate) => {
        // this.getDatasetDetails();
        if (this.datasetType !== '0') {
          this.getDatasetDetails();
        } else {
          this.afterSave.emit('1');
        }
      });
    } else {
      this.applicationService.saveDataset(this.moduleUid, value).subscribe((res) => {
        this.datasetFormGroup.reset();
        // this.getDatasetDetails();
        if (this.datasetType !== '0') {
          this.getDatasetDetails();
        } else {
          this.afterSave.emit('1');
        }
      });
    }
  }
}
}
