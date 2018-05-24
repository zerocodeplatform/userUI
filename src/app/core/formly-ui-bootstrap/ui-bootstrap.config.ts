import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperAddons } from './wrappers/addons';
import { TemplateDescription } from './run/description';
import { TemplateValidation } from './run/validation';
import { TemplateAddons } from './run/addon';
import {
  FormlyFieldInput,
  FormlyFieldCheckbox,
  FormlyFieldRadio,
  FormlyFieldSelect,
  FormlyFieldTextArea,
  FormlyFieldMultiCheckbox,
  FormlyFieldBoolean
} from './types/types';
import {
  FormlyWrapperLabel,
  FormlyHorizontalWrapper,
  FormlyWrapperDescription,
  FormlyWrapperValidationMessages,
  FormlyWrapperFieldset,
} from './wrappers/wrappers';



export const FIELD_TYPE_COMPONENTS = [
  // types
  FormlyFieldInput,
  FormlyFieldCheckbox,
  FormlyFieldRadio,
  FormlyFieldSelect,
  FormlyFieldTextArea,
  FormlyFieldMultiCheckbox,
  FormlyFieldBoolean,

  // wrappers
  FormlyWrapperLabel,
  FormlyHorizontalWrapper,
  FormlyWrapperDescription,
  FormlyWrapperValidationMessages,
  FormlyWrapperFieldset,
  FormlyWrapperAddons,
];
export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}
export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  validationMessages: [
    { name: 'required', message: 'This field is required' },
    { name: 'minlength', message: minlengthValidationMessage },
    { name: 'maxlength', message: maxlengthValidationMessage },
    { name: 'min', message: minValidationMessage },
    { name: 'max', message: maxValidationMessage },
  ],
  types: [
    {
      name: 'input',
      component: FormlyFieldInput,
      wrappers: ['form-field-horizontal'],
    },
    {
      name: 'Text',
      component: FormlyFieldInput,
      wrappers: ['form-field-horizontal'],
    },
    {
      name: 'Number',
      component: FormlyFieldInput,
      wrappers: ['form-field-horizontal'],
    },
    {
      name: 'boolean',
      component: FormlyFieldBoolean,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          indeterminate: true,
        },
      },
    },
    {
      name: 'Boolean',
      component: FormlyFieldBoolean,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          indeterminate: true,
        },
      },
    },
    {
      name: 'checkbox',
      component: FormlyFieldCheckbox,
      wrappers: ['fieldset'],
      defaultOptions: {
        templateOptions: {
          indeterminate: true,
        },
      },
    },
    {
      name: 'radio',
      component: FormlyFieldRadio,
      wrappers: ['fieldset', 'label'],
      defaultOptions: {
        templateOptions: {
          options: [],
        },
      },
    },
    {
      name: 'Choose',
      component: FormlyFieldSelect,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          options: [],
        },
      },
    },
    {
      name: 'select',
      component: FormlyFieldSelect,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          options: [],
        },
      },
    },
    {
      name: 'textarea',
      component: FormlyFieldTextArea,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          cols: 1,
          rows: 1,
        },
      },
    },
    {
      name: 'Text Area',
      component: FormlyFieldTextArea,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          cols: 1,
          rows: 1,
        },
      },
    },
    {
      name: 'multicheckbox',
      component: FormlyFieldMultiCheckbox,
      wrappers: ['form-field-horizontal'],
      defaultOptions: {
        templateOptions: {
          options: [],
        },
      },
    },
  ],
  wrappers: [
    { name: 'label', component: FormlyWrapperLabel },
    { name: 'form-field-horizontal', component: FormlyHorizontalWrapper },
    { name: 'description', component: FormlyWrapperDescription },
    { name: 'validation-message', component: FormlyWrapperValidationMessages },
    { name: 'fieldset', component: FormlyWrapperFieldset },
    { name: 'addons', component: FormlyWrapperAddons },
  ],
  manipulators: [
    { class: TemplateDescription, method: 'run' },
    { class: TemplateValidation, method: 'run' },
    { class: TemplateAddons, method: 'run' },
  ],
};
