import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TssFormService } from '../../services/tss-form.service';
import { FormGroup } from '@angular/forms';
import { FieldInterface } from '../../models/field.interface';

@Component({
  selector: 'app-tss-date',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DyDatePickerComponent implements OnInit {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;

  constructor(private tssFormService: TssFormService) {

  }
  ngOnInit() {
    this.params.value = null;
    this.tssFormService.buildFormGroup(this.params, this.formGroup);
  }
  onSelect($event) {
    const time = new Date($event);
    // console.log('$event', $event);
    // console.log('time', time);
    // console.log('time.toISOString', time.toISOString());
    // console.log('toUTCString', time.toUTCString());
    // console.log('toLocaleDateString', time.toLocaleDateString());
    // alert(time.getTime());
    //  this.formGroup.controls[this.params.name].setValue($event);
    // console.log('this.formGroup.contains', );
  }
}
