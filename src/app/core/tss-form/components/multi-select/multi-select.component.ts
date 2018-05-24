import { Component, Input, OnInit, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TssFormService } from '../../services/tss-form.service';
import { FormGroup } from '@angular/forms';
import { FieldInterface } from '../../models/field.interface';
import { InputTypes } from '../../models/inputTypes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  @Input() options: any[];
  @Input() optionLabel = 'label';
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  inputTypes = new InputTypes();

  constructor(private tssFormService: TssFormService) {
  }
  ngOnInit() {
    // const inputSetting = this.params;
    this.tssFormService.buildFormGroup(this.params, this.formGroup);
  }
  onChange(event) {
    console.log('this.formGroup.controls', this.formGroup);
    // this.formGroup.controls['comment'];
    console.log('eventst', this.formGroup.controls['comment'].disable());
    this.change.emit(event);
  }

}
