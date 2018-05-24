import { Component, Input, OnInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { TssFormService } from '../../services/tss-form.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldInterface } from '../../models/field.interface';

@Component({
  selector: 'app-tss-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss']
})
export class DyInputComponent implements OnInit {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  @Input() type = 'text';
  @Input() keyFilter; // int, email
  @Output()
  blur: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dyFormService: TssFormService) {

  }

  ngOnInit() {
    // const inputSetting = this.params;
    this.dyFormService.buildFormGroup(this.params, this.formGroup);
  }
  onBlur() {
    this.blur.emit(event);
  }
}
