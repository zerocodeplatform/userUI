import { LanguageConfigComponent } from './language-config/language-config.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, CellEditor } from 'primeng/table';
import { providers } from 'ng2-dnd';
import { LanguageService } from './utils/language.service';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    FlexLayoutModule,
    ButtonModule
  ],
  declarations: [LanguageConfigComponent],
  exports: [LanguageConfigComponent],
  providers: [LanguageService]
})
export class LanguageModule { }
