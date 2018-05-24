import { TssFormService } from '../../services/tss-form.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldInterface } from '../../models/field.interface';

@Component({
  selector: 'app-tss-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['checkbox.component.scss']
})
export class DyCheckboxComponent implements OnInit {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  // @Output() change: EventEmitter<any>;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dyFormService: TssFormService) {

  }
  ngOnInit() {
    // const inputSetting = this.params;
    this.dyFormService.buildFormGroup(this.params, this.formGroup);
  }
  onChange(event) {
    // console.log('eventst', event);
    this.change.emit(event);
  }
}
