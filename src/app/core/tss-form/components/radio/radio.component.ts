import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldInterface } from '../../models/field.interface';
import { TssFormService } from '../../services/tss-form.service';

@Component({
  selector: 'app-tss-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss']
})
export class DyRadioComponent implements OnInit {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  constructor(private dyFormService: TssFormService) {
  }
  ngOnInit() {
    this.dyFormService.buildFormGroup(this.params, this.formGroup);
  }
  onClick($event) {
    console.log('$event', $event);
  }
}
