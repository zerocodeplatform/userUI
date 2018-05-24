import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SiteConfigService } from '../../services/site-config.service';
import { TssFormService } from '../../core/tss-form/services/tss-form.service';
import { FieldInterface } from '../../core/tss-form/models/field.interface';
import { Http } from '@angular/http';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.scss']
})

export class AccountSetupComponent implements OnInit {
  account_icon: string;
  accountForm: FormGroup = new FormGroup({ icon: new FormControl('') });
  formData = {
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true, emailValidator: true } },
    url: <FieldInterface>{ name: 'url', label: 'Url', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'description', rules: { required: true } },
    logo: <FieldInterface>{ name: 'logo', label: 'File Upload', rules: { required: false } }
  };
  // dynamic
  form = new FormGroup({});

  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'input_type',
      type: 'select',
      className: 'col-6',
      templateOptions: {
        cols: 2,
        rows: 3,
        label: 'Input Type',
        placeholder: 'Formly is terrific!',
        options: [
          { value: 'email', label: 'Email' },
          { value: 'input', label: 'Input' },
          { value: 'url', label: 'Url' },
        ],
        required: true,
      },
    },
    {
      key: 'pattern',
      type: 'input',
      className: 'ui-g-6',
      templateOptions: {
        label: 'Pattern',
        min: 1,
        max: 4,
        placeholder: 'Formly is terrific!',
        required: false,
      },
      hideExpression: ((model, formState) => {
        if (model.input_type) {
          return false;
        } else {
          return true;
        }
      }),
      expressionProperties: {
        'templateOptions.required': (model, formState) => {
          console.log('templateOptions model.input_type', model.input_type);
          if (model.input_type === 'email') {
            return true;
          } else {
            return false;
          }
        }

      }
    },
    {
      key: 'error_massage',
      type: 'input',
      templateOptions: {
        label: 'Error Massage',
        placeholder: 'Formly is terrific!',
        required: false,
      },
      hideExpression: ((model, formState) => {
        if (model.pattern) {
          return false;
        } else {
          return true;
        }
      }),
      expressionProperties: {
        'templateOptions.focus': 'formState.awesomeIsForced',
      }
    }
  ];

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
  constructor(private siteConfigService: SiteConfigService,
    private tssFormService: TssFormService, private el: ElementRef) { }

  ngOnInit() {
    this.tssFormService.buildFormControl(this.formData, this.accountForm);
    this.siteConfigService.getBasicSetting().subscribe((res) => {
      console.log('res', res);
      this.accountForm.patchValue(res);
    });
  }
  saveBasicConfig(value, valid) {
    // this.accountForm;
    // this.accountForm.su

    if (this.tssFormService.checkValidation(this.accountForm)) {
      this.siteConfigService.updateBasicSetting(this.accountForm.value).subscribe((res) => {
        console.log('res', res);
      });
    }
    console.log(this.accountForm);
  }
}
