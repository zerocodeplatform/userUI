import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FieldInterface } from './../../../../../core/tss-form/models/field.interface';
import { DatasetFieldsService } from '../../../../../services/dataset-fields.service';
import { Language } from '../../../../../core/language/utils/language';
import { ActivatedRoute, Params } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
// import { Language } from '../../../../../core/language/utils/language';
@Component({
  selector: 'app-dataset-fields',
  templateUrl: './dataset-fields.component.html',
  styleUrls: ['./dataset-fields.component.scss']
})
export class DatasetFieldsComponent implements OnInit {
  availableFieldTypes: any = [];
  showForm = false;
  selectedFieldTypes: any = [];
  fieldTypeOptions: FieldInterface[];
  fields: FormlyFieldConfig[] = [];
  activeFieldType: any = { model: {} };
  form = new FormGroup({});
  draggedFieldType: string;
  urlParams: Params;
  datasetUid: string;
  fieldFormGroup = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  languageData: Language;
  constructor(private datasetFieldService: DatasetFieldsService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
      this.datasetUid = this.urlParams.datasetUid;
    });
  }
  createBasicForm: FormGroup = new FormGroup({});
  formBasic = {
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true } },
    entity: <FieldInterface>{ name: 'entity', label: 'Entity Name', rules: { required: true } },
    // gender: <FieldInterface>{ name: 'gender', label: 'Gender', rules: { required: true } },
    size: <FieldInterface>{ name: 'size', label: 'Size', rules: { required: true } },
    patterns: <FieldInterface>{ name: 'patterns', label: 'Patterns', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: true } },
    defaultvalue: <FieldInterface>{ name: 'defaultvalue', label: 'Default Value', rules: { required: true } },
    multilanguage: <FieldInterface>{ name: 'multilanguage', label: 'Multi-language', rules: { required: true } },
    // setting: <FieldInterface>{ attr: 'setting', alias: 'setting', value: ' ', Validators: { required: false } },
    // icon: <FieldInterface>{ attr: 'icon', alias: 'icon', value: ' ', Validators: { required: false } }
  };
  ngOnInit() {
    this.getFieldTypes();
    this.getfieldList();
  }
  /**
   *
   *
   * @author T Rakesh
   * @memberof DatasetFieldsComponent
   */
  getFieldTypes() {
    this.availableFieldTypes = [];
    this.datasetFieldService.getFieldTypes(this.datasetUid).subscribe((res) => {
      if (res) {
        this.availableFieldTypes = res;
      }
    });
  }
  /**
   *
   * @author T Rakesh
   * @param {any} event
   * @param {*} fieldType
   * @memberof DatasetFieldsComponent
   */
  dragStart(event, fieldType: any) {
    this.draggedFieldType = fieldType;
  }
  /**
   * when drop field
   * @author T Rakesh
   * @param {any} event
   * @memberof DatasetFieldsComponent
   */
  drop(event) {
    console.log('event', event);
    if (this.draggedFieldType) {

      const fieldTypeOptions: FieldInterface[] = [];
      const form = new FormGroup({});
      const model: any = {};
      const newFieldType: any = {
        type: this.draggedFieldType,
        model: {},
        uid: null,
        fieldTypeFields: this.fields,
        fieldTypeFormGroup: form,
        formValid: true,
        languageData: {},
        index: this.selectedFieldTypes.length
      };
      this.activeFieldType = newFieldType;
      this.selectedFieldTypes = [...this.selectedFieldTypes, newFieldType];
      console.log('this.selectedFieldTypes', this.selectedFieldTypes);
      this.clickFieldType(newFieldType);
    }
  }
  /**
   * clear dreagged field type property
   * @author T Rakesh
   * @param {any} event
   * @memberof DatasetFieldsComponent
   */
  dragEnd(event) {
    console.log('end event', event);
    this.draggedFieldType = null;
  }
  /**
   * when click the field Input
   * @author T Rakesh
   * @param {any} event
   * @memberof DatasetFieldsComponent
   */
  clickFieldType(event, newField = true) {
    this.activeFieldType = event;
    // this.fieldTypeOptions: FieldInterface[];
    if (newField) {
      this.showForm = false;
      if (event.uid) {
        this.datasetFieldService.getFieldDetails(this.datasetUid, event.uid).subscribe(fields => {
          this.activeFieldType.fieldTypeFields = this.fields;
          this.showForm = true;
        });
      } else {
        this.datasetFieldService.getFieldStructure(this.datasetUid, event.type.label).subscribe(resData => {
          this.activeFieldType.fieldTypeFields = this.mapToFormlyFieds(<FieldInterface[]>resData.fields);
          this.activeFieldType.languageData = <Language>resData.lang;
          // this.activeFieldType.formValid = this.activeFieldType.fieldTypeFormGroup.valid;
          this.showForm = true;
        });
      }
    }
  }
  /**
   *
   * @author T Rakesh
   * @param {any} event
   * @memberof DatasetFieldsComponent
   */
  submitFieldType(event) {
    console.log('this.activeFieldType', this.activeFieldType);
    if (this.activeFieldType.uid) {
      this.datasetFieldService.updateFieldStructure(this.datasetUid, this.activeFieldType.type.label, event).subscribe(res => {
        if (res.success) {
          this.getfieldList();
          this.showForm = false;
          this.activeFieldType = {};
        }
      });
    } else {
      this.datasetFieldService.saveFieldStructure(this.datasetUid, this.activeFieldType.type.label, event).subscribe(res => {
        if (res.success) {
          this.getfieldList();
          this.showForm = false;
          this.activeFieldType = {};
        }
      });
    }
  }
  /**
   *
   * @author T Rakesh
   * @memberof DatasetFieldsComponent
   */
  getfieldList() {
    this.datasetFieldService.getFieldList(this.datasetUid).subscribe(res => {
      // this.selectedFieldTypes = res;
    });
  }
  /**
   * Wrappers for response field to Formly fields
   * @author T Rakesh
   * @param {any} resFields
   * @returns {FormlyFieldConfig[]}
   * @memberof DatasetFieldsComponent
   */
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
      fField.validation = {
        show: false,
      };
      if (field.settings && field.settings.type === 'Multiple') {
        fField.type = 'multicheckbox';
      }
      if (field.rules && field.rules.required) {
        fField.templateOptions.required = (field.rules.required) ? true : false;
      }
      if (field.rules && field.rules.max) {
        fField.templateOptions.max = field.rules.max;
      }
      if (field.rules && field.rules.min) {
        fField.templateOptions.min = field.rules.min;
      }
      if (field.rules && field.rules.maxLength) {
        fField.templateOptions.maxLength = field.rules.maxLength;
      }
      if (field.rules && field.rules.minLength) {
        fField.templateOptions.minLength = field.rules.minLength;
      }
      if (field.type === 'Number') {
        fField.templateOptions.type = 'number';
      }
      if (field.hidden) {
        fField.templateOptions.label = '';
        fField.templateOptions.type = 'hidden';
      }
      if (fField.key === 'name' || fField.key === 'entityName') {
        fField.validators = {
          uniqueUsername: {
            expression: (control: FormControl) => {
              let isUser = true;
              this.selectedFieldTypes.forEach(fildModel => {
                if (fildModel.index !== this.activeFieldType.index && fildModel.model[fField.key] === control.value) {
                  console.log(fildModel.model[fField.key], fildModel.index, this.activeFieldType.index, fildModel.model[fField.key], control.value);
                  isUser = false;
                }
              });
              console.log('isUser', isUser);
              return isUser;
            },
            message: `This ${fField.templateOptions.label} is already taken.`,
          },
        };
      }

      fields.push(fField);
    });
    return fields;
  }
  /**
   * Form Field on changes
   * @author T Rakesh
   * @memberof DatasetFieldsComponent
   */
  modelChange() {
    setTimeout(() => {
      this.selectedFieldTypes.forEach(filedType => {
        console.log('filedType.fieldTypeFormGroup', filedType.fieldTypeFormGroup);
        filedType.formValid = filedType.fieldTypeFormGroup.valid;
      });
    });
  }
  /**
   * save the fields
   * @author T Rakesh
   * @memberof DatasetFieldsComponent
   */
  saveFields() {
    const formData = [];
    this.selectedFieldTypes.forEach(filedType => {
      filedType.formValid = filedType.fieldTypeFormGroup.valid;
      console.log('filedType.fieldTypeFormGroup.valid', filedType.fieldTypeFormGroup.valid);
      if (filedType.formValid) {
        formData.push({ data: filedType.model, type: filedType.type, uid: filedType.uid });
      } else {
        // alert('Invalid Form Data');
        this.clickFieldType(filedType);
        return false;
      }
    });
    // alert(JSON.stringify(formData));
    // console.log(this.selectedFieldTypes);
  }

}
