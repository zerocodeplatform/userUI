import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-ui-bootstrap',
  templateUrl: './ui-bootstrap.component.html',
  styleUrls: ['./ui-bootstrap.component.scss']
})
export class UiBootstrapComponent implements OnInit {
  form = new FormGroup({});

  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'uid',
      type: 'input',
      templateOptions: {
        label: 'UID',
        placeholder: 'UID',
        required: true
      },
      hideExpression: true
    },
    {
      key: 'Name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter field name',
        required: true,
      }
    },
    {
      key: 'dbFieldName',
      type: 'input',
      templateOptions: {
        label: 'Data Base Field Name',
        min: 1,
        max: 50,
        placeholder: 'Enter field name',
        required: false,
      }
    },
    {
      key: 'property',
      type: 'radio',
      defaultValue: 'text',
      templateOptions: {
        label: 'Property',
        placeholder: '',
        required: true,
        options: [
          {
            'label': 'Text',
            'value': 'text',
            'icon': null
          },
          {
            'label': 'Email',
            'value': 'email',
            'icon': null
          },
          {
            'label': 'Phone',
            'value': 'phone',
            'icon': null
          },
          {
            'label': 'Url',
            'value': 'url',
            'icon': null
          },
          {
            'label': 'Skype',
            'value': 'skype',
            'icon': null
          },
          {
            'label': 'Password',
            'value': 'password',
            'icon': null
          }
        ]
      }
    },
    {
      key: 'pattern',
      type: 'input',
      templateOptions: {
        label: 'Pattern',
        min: 1,
        max: 4,
        placeholder: 'Enter a pattern',
        required: false,
      },
      hideExpression: ((model, formState) => {
        if (model.property) {
          return false;
        } else {
          return true;
        }
      }),
      expressionProperties: {
        'templateOptions.required': (model, formState) => {
          if (model.property === 'email') {
            return true;
          } else {
            return false;
          }
        }

      }
    },
    {
      key: 'error_message',
      type: 'input',
      templateOptions: {
        label: 'Error Message',
        placeholder: 'Enter a Error Message',
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
      }
    },
    {
      key: 'Size',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Enter size (1-255)',
        min: 1,
        max: 255,
        placeholder: 'Enter size (1-255)',
        required: false,
      }
    },
    {
      key: 'required',
      type: 'boolean',
      templateOptions: {
        label: 'Required',
        placeholder: 'Required',
        required: false,
      }
    },
    {
      key: 'defaultValue',
      type: 'input',
      templateOptions: {
        label: 'Default Value',
        placeholder: '',
        required: false,
      }
    },
    {
      key: 'index',
      type: 'boolean',
      templateOptions: {
        label: 'Index',
        placeholder: '',
        required: false,
      }
    },
    {
      key: 'unique',
      type: 'boolean',
      templateOptions: {
        label: 'Unique',
        placeholder: '',
        required: false
      }
    },
    {
      key: 'language',
      type: 'boolean',
      templateOptions: {
        label: 'Language',
        placeholder: '',
        required: false,
      }
    },
    {
      key: 'comment',
      type: 'textarea',
      templateOptions: {
        label: 'Comment/Description',
        placeholder: 'Enter comment/description',
        required: false,
      }
    }
  ];


  constructor() { }

  ngOnInit() {
    console.log('fields', this.fields);
  }

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
