import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { FieldType } from './field';

@Component({
  selector: 'formly-field-mat-radio',
  template: `
    <mat-radio-group [formControl]="formControl" [formlyAttributes]="field" (change)="to.change && to.change(field, formControl)">
      <mat-radio-button *ngFor="let option of to.options; let i = index;" [id]="id + '_' + i" [value]="option.value">
        {{ option.label }}
      </mat-radio-button>
    </mat-radio-group>
  `,
})
export class FormlyFieldRadio extends FieldType implements AfterViewInit {
  constructor(private renderer?: Renderer2) {
    super();
  }

  ngAfterViewInit() {
    if (this.formField) {
      // temporary fix for https://github.com/angular/material2/issues/7891
      if (this.formField.underlineRef && this.renderer) {
        this.renderer.removeClass(this.formField.underlineRef.nativeElement, 'mat-form-field-underline');
      }
    }
    super.ngAfterViewInit();
  }
}
