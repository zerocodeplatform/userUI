import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {AccordionModule} from 'primeng/accordion';
import { TssFormModule } from '../../core/tss-form/tss-form.module';
import { LanguageModule } from '../../core/language/language.module';
const moduleList = [
  PanelModule,
  InputTextareaModule,
  TssFormModule,
  TableModule,
  AccordionModule,
  LanguageModule
];
@NgModule({
  imports: [
    moduleList
  ],
  declarations: [],
  exports: [moduleList]
})
export class CommonFormModuleModule { }
