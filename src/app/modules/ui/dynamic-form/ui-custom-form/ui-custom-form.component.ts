import { Component, OnInit } from '@angular/core';
import { TestService } from '../../../../services/test.service';
import { HttpClient } from '@angular/common/http';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-custom-form',
  templateUrl: './ui-custom-form.component.html',
  styleUrls: ['./ui-custom-form.component.scss']
})
export class UiCustomFormComponent implements OnInit {
  formFields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  showForm = false;
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };

  constructor(private testService: TestService,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getFormFields();
  }

  /**
    * Method to get json object from test_json table
    * @author Krunal
    * @since 09-04-2018
  */
  getFormFields() {
    this.formFields = [];
    this.showForm = false;
    /* this.httpClient.get('https://jsonblob.com/api/8e9bb3d9-3bb8-11e8-98f5-7367eed2c328').toPromise()
      .then((res) => {
        if (res) {
          this.formFields = this.mapToFormlyFieds(res['data']);
          console.log('formFields', this.formFields);
          this.showForm = true;
        }
      }); */
    this.testService.get('sampleForm').subscribe((res) => {
      if (res) {
        console.log('res', res);
        this.formFields = this.mapToFormlyFieds(res['data']);
        this.showForm = true;
      }
    });
  }
  mapToFormlyFieds(resFields): FormlyFieldConfig[] {
    const fields: FormlyFieldConfig[] = [];
    resFields.forEach(field => {
      const fField: FormlyFieldConfig = {};
      fField.key = field.name;
      fField.type = field.type;
      fField.templateOptions = {
        label: field.label,
        placeholder: field.placeHolder,
        options: field.options,
        required: false
      };
      if (field.settings && field.settings.type === 'Multiple') {
        fField.type = 'multicheckbox';
      }
      if (field.rules && field.rules.required) {
        fField.templateOptions.required = (field.rules.required) ? true : false;
      }
      if (field.rules && field.rules.maxLength) {
        fField.templateOptions.max = field.rules.maxLength;
      }
      if (field.rules && field.rules.minLength) {
        fField.templateOptions.minLength = field.rules.maxLength;
      }
      if (field.type === 'Number') {
        fField.templateOptions.type = 'number';
      }
      if (field.hidden) {
        fField.templateOptions.label = '';
        fField.templateOptions.type = 'hidden';
      }

      fields.push(fField);
    });
    return fields;
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }

}
