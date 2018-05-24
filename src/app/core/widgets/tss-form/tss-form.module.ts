import { FormlyBootstrapModule } from './formly-ui-bootstrap/ui-bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TssFormComponent } from './tss-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ],
  declarations: [TssFormComponent],
  exports: [TssFormComponent]
})
export class TssFormModule { }
