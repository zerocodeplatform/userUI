import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FieldInterface } from '../models/field.interface';
import { TssFormService } from '../services/tss-form.service';
import { InputTypes } from '../models/inputTypes';


@Component({
  selector: 'app-dy-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class DyFormComponent implements OnInit {
  @Input() formData: FieldInterface[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() FieldWidth = 50;
  @Input() submitBtn = true;
  @Input() model: any;
  @Output() output: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  inputTypes = new InputTypes();

  constructor(private tssFormService: TssFormService) {
  }
  ngOnInit() {
    if (this.formData) {
      this.formData.forEach(field => {
        this.tssFormService.buildFormGroup(field, this.formGroup);
      });
      if (this.model) {
        console.log('this.model', this.model);
        this.formGroup.patchValue(this.model);
      }

    }
    this.formGroup.valueChanges
      .subscribe(value => {
        this.change.emit(this.formGroup.value);
      });
  }
  /**
   *
   *
   * @author T Rakesh
   * @param {string} type
   * @returns {string}
   * @memberof DyFormComponent
   */
  getType(type: string): string {
    return type ? type : 'input';
  }
  /**
   *
   * @author T Rakesh
   * @param {*} e form values
   * @memberof DyFormComponent
   */
  onSubmit(e: any) {
    this.output.emit(e);
  }
}
