import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {
  FormErrorMessagesComponent
} from './components/form-error-messages/form-error-messages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [FormErrorMessagesComponent],
  declarations: [FormErrorMessagesComponent],
  providers: []
})
export class TssFormSharedModule { }
