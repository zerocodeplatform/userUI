import { Injectable } from '@angular/core';
import { ValidationService } from './validation.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { FieldInterface } from '../models/field.interface';

@Injectable()
export class TssFormService {

  constructor() { }

  buildFormGroup(inputsSettings: FieldInterface, formGroup: FormGroup) {
    const group: any = {};
    const validators = [];
    // if Required
    if (inputsSettings.rules) {
      if (inputsSettings.rules.required) {
        validators.push(Validators.required);
      }
      if (inputsSettings.rules.pattern) {
        validators.push(Validators.pattern(inputsSettings.rules.pattern));
      }

    }

    // if value null, set default value
    if (!inputsSettings.value || inputsSettings.value === ' ' || inputsSettings.value === null) {
      if (inputsSettings.defaultValue) {
        inputsSettings.value = inputsSettings.defaultValue;
      }

    }

    // if max length
    formGroup.addControl(inputsSettings.name, new FormControl(inputsSettings.value, validators));
    // formGroup.controls['inputsSettings.name'];
    // inputsSettings.forEach(inputSetting => {
    //   group[inputSetting.attr] = inputSetting.required ?
    //     new FormControl(inputSetting.value || '', Validators.required) :
    //     new FormControl(inputSetting.value || '');
    // });

    // return new FormGroup(group);
  }
  buildFormControl(FormData: any, formGroup: FormGroup) {
    for (const key in FormData) {
      if (FormData.hasOwnProperty(key)) {
        const element: FieldInterface = FormData[key];
        this.buildFormGroup(element, formGroup);
      }
    }
  }
  checkValidation(formGroup: FormGroup) {
    if (formGroup.invalid) {
      for (const key in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(key)) {
          formGroup.controls[key].markAsTouched();
        }
      }
    }
    return formGroup.valid;
  }
  updateFormControl(element: any, formGroup: FormGroup) {
    this.removeValidation(element, formGroup);
  }
  /**
   * Function will remove validation dynamically for the given html elemnt
   * @param inputsSettings - html form element
   * @param formGroup - the form group for the form is defined for
   */
  removeValidation(inputsSettings: FieldInterface, formGroup: FormGroup) {
    // formGroup.get(inputsSettings.name).clearValidators();
    formGroup.controls[inputsSettings.name].setValidators(null);
    formGroup.controls[inputsSettings.name].updateValueAndValidity();
  }
  /**
   * Function will add validation dynamically  for the given html elemnt
   * @param inputsSettings - html form element
   * @param formGroup - the form group for the form is defined for
   * @param validation - validation
   */
  addValidation(inputsSettings: FieldInterface, formGroup: FormGroup, validation: any) {
    /* formGroup.get(inputsSettings.name).setValidators([validation]);
    formGroup.get(inputsSettings.name).updateValueAndValidity(); */
    formGroup.controls[inputsSettings.name].setValidators([validation]);
    formGroup.controls[inputsSettings.name].updateValueAndValidity();
  }
}
