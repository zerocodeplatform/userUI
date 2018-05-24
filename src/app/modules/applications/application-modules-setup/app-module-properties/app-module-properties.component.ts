import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../../services/application.service';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-module-properties',
  templateUrl: './app-module-properties.component.html',
  styleUrls: ['./app-module-properties.component.scss']
})
export class AppModulePropertiesComponent implements OnInit {
  roles = [
    { name: 'Personal Details', switch: 'red' },
    { name: 'Land Details', color: 'yellow' },
    { name: 'Survey Details', color: 'yellow' },
    { name: 'Personal Details', color: 'yellow' },
    { name: 'Livestock Details', color: 'yellow' },
    { name: 'Personal Details', color: 'yellow' },
    { name: 'Financial Details', color: 'yellow' },
  ];
  buttonLabel = 'Update';
  moduleDetails: any = [];
  urlParams: any;
  moduleFormGroup: FormGroup = new FormGroup({
    'icon': new FormControl('')
  });
  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Module Name', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
  };
  constructor(private applicationService: ApplicationService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
    });
    this.getModuleDetails();
  }

  /**
    * Method to get module details
    * @author Krunal
    * @since 2018-02-22
  */
  getModuleDetails() {
    this.moduleDetails = [];
    this.applicationService.getModuleDetailsById(this.urlParams.moduleUid).subscribe((res) => {
      if (res) {
        this.moduleDetails = res;
        this.moduleFormGroup.patchValue(this.moduleDetails);
      }
    });
  }

  /**
    * Method to update module details
    * @author Krunal
    * @since 2018-02-22
  */
  updateModule(value) {
    if (this.tssFormService.checkValidation(this.moduleFormGroup)) {
      this.applicationService.updateModule(value, this.moduleDetails.applicationUid).subscribe((res) => {
      });
    }
  }

  /**
   * Go to module list page
   */
  gotoModulePage() {
    this.router.navigate(['./'], { relativeTo: this.activatedRoute });
  }
}
