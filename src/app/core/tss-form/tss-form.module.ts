import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DyFormComponent } from './components/form.component';
import { DyInputComponent } from './components/input/input.component';
import { DyCheckboxComponent } from './components/checkbox/checkbox.component';
import { DySelectComponent } from './components/select/select.component';
import { DyRadioComponent } from './components/radio/radio.component';
import { DyDatePickerComponent } from './components/date-picker/date-picker.component';
// primeng & material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormErrorMessagesComponent } from './components/form-error-messages/form-error-messages.component';
import { TssFormService } from './services/tss-form.service';
import { IconPickerModule } from './components/icon-picker/icon-picker.module';
import { TextareaComponent } from './components/textarea/textarea.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileComponent } from './components/file/file.component';
import { TssFormSharedModule } from './tss-form-shared.module';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TssSlideToggleComponent } from './components/tss-slide-toggle/tss-slide-toggle.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MultiSelectModule } from 'primeng/multiselect';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
  declarations: [
    DyFormComponent,
    DyInputComponent,
    DyCheckboxComponent,
    DySelectComponent,
    DyRadioComponent,
    DyDatePickerComponent,
    TextareaComponent,
    FileComponent,
    TssSlideToggleComponent,
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    KeyFilterModule,
    IconPickerModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    TssFormSharedModule,
    CalendarModule,
    FileUploadModule,
    ProgressSpinnerModule,
    ButtonModule,
    MatSlideToggleModule,
    MultiSelectModule,
    MatRadioModule
  ],
  exports: [
    IconPickerModule,
    FormsModule,
    ReactiveFormsModule,
    DyFormComponent,
    DyInputComponent,
    DyCheckboxComponent,
    DySelectComponent,
    DyRadioComponent,
    DyDatePickerComponent,
    TextareaComponent,
    FileComponent,
    TssFormSharedModule,
    CheckboxModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    ButtonModule,
    KeyFilterModule,
    MatSlideToggleModule,
    TssSlideToggleComponent,
    MultiSelectComponent
  ],
  providers: [
    TssFormService
  ],
})
export class TssFormModule { }
