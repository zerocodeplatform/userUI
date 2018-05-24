import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TssFormService } from '../../services/tss-form.service';
import { FieldInterface } from '../../models/field.interface';

@Component({
  selector: 'app-tss-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  @Input() cols: number;
  @Input() rows = 3;

  constructor(private dyFormService: TssFormService) {

  }
  ngOnInit() {
    this.dyFormService.buildFormGroup(this.params, this.formGroup);
  }

}
