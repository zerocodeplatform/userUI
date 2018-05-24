import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TssMultiStepFormComponent } from './tss-multi-step-form.component';
import { FormlyBootstrapModule } from '../formly-ui-bootstrap/ui-bootstrap';
import { MatStepperModule } from '@angular/material';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  declarations: [TssMultiStepFormComponent],
  exports: [TssMultiStepFormComponent]
})
export class TssMultiStepFormModule { }
