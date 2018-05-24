import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TssFormService } from '../../services/tss-form.service';
import { FormGroup } from '@angular/forms';
import { FieldInterface } from '../../models/field.interface';
import { InputTypes } from '../../models/inputTypes';

@Component({
  selector: 'app-tss-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss']
})
export class DySelectComponent implements OnInit {
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
    console.log('eventst', this.formGroup);
    this.change.emit(event);
  }

}
