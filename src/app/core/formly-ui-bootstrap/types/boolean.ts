import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-boolean',
  template: `
  <mat-slide-toggle class="slide-toggle" [formControl]="formControl"   [attr.invalid]="showError"
        [formlyAttributes]="field" class="custom-control-input">
        </mat-slide-toggle>`,
})
export class FormlyFieldBoolean extends FieldType { }
