import { FieldInterface } from '../../core/tss-form/models/field.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {
  cars: any[] = [];
  rowGroupMetadata: any;
  constructor() { }
  createBasicForm: FormGroup = new FormGroup({ });
  formBasic = {
    name: <FieldInterface>{ name: 'name', label: 'Person Name', rules: { required: true } },
    age: <FieldInterface>{ name: 'age', label: 'Age', rules: { required: true } },
    // gender: <FieldInterface>{ name: 'gender', label: 'Gender', rules: { required: true } },
    url: <FieldInterface>{ name: 'url', label: 'Url', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: true } },
    // setting: <FieldInterface>{ attr: 'setting', alias: 'setting', value: ' ', Validators: { required: false } },
    // icon: <FieldInterface>{ attr: 'icon', alias: 'icon', value: ' ', Validators: { required: false } }
  };
  ngOnInit() {
    this.cars = [
      {name: 'name', lang: 'English', description: 'Display name in english'},
      {name: 'name', lang: 'Hindi', description: 'हिंदी में प्रदर्शित नाम'},
      {name: 'name', lang: 'Telugu', description: 'తెలుగులో పేరు'},
      {name: 'descrption', lang: 'English', description: 'About the field in english'},
      {name: 'descrption', lang: 'Hindi', description: 'हिंदी में फ़ील्ड के बारे में'},
      {name: 'descrption', lang: 'Telugu', description: 'తెలుగులో వివరణ'},
      {name: 'validation message 1', lang: 'English', description: 'this is english'},
      {name: 'validation message 1', lang: 'hindi', description: 'हिंदी में फ़ील्ड के बारे में'},
      {name: 'validation message 1', lang: 'hindi', description: 'తెలుగులో వివరణ'}
    ];
    this.updateRowGroupMetaData();
  }
  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
      this.rowGroupMetadata = {};
      if (this.cars) {
          for (let i = 0; i < this.cars.length; i++) {
              const rowData = this.cars[i];
              const name = rowData.name;
              if (i === 0) {
                  this.rowGroupMetadata[name] = { index: 0, size: 1 };
              } else {
                const previousRowData = this.cars[i - 1];
                const previousRowGroup = previousRowData.name;
                  if (name === previousRowGroup) {
                    this.rowGroupMetadata[name].size++;
                  } else {
                    this.rowGroupMetadata[name] = { index: i, size: 1 };
                  }
              }
          }
      }
  }
}
