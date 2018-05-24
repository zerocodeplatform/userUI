import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPickerComponent } from './icon-picker.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormErrorMessagesComponent } from '../form-error-messages/form-error-messages.component';
import { TssFormSharedModule } from '../../tss-form-shared.module';
import { TssFormService } from '../../services/tss-form.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonMaterialModuleModule } from '../../../../config/shared-modules/common-material-module.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TabViewModule,
    ButtonModule,
    OverlayPanelModule,
    InputTextModule,
    TssFormSharedModule,
    CommonMaterialModuleModule
  ],
  declarations: [IconPickerComponent],
  exports: [
    IconPickerComponent
  ],
  providers: [TssFormService]
})
export class IconPickerModule { }
