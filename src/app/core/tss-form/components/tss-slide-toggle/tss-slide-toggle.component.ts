import { FieldInterface } from '../../models/field.interface';
import { TssFormService } from '../../services/tss-form.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tss-slide-toggle',
  templateUrl: './tss-slide-toggle.component.html',
  styleUrls: ['./tss-slide-toggle.component.scss']
})
export class TssSlideToggleComponent implements OnInit {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  constructor(private tssFormService: TssFormService) { }

  ngOnInit() {
    this.tssFormService.buildFormGroup(this.params, this.formGroup);
  }

}
