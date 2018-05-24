import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TssImageComponent } from './tss-image.component';
import { DialogModule } from 'primeng/dialog';
import { TssImageService } from './tss-image.service';

@NgModule({
  imports: [
    CommonModule,
    DialogModule
  ],
  declarations: [TssImageComponent],
  providers: [TssImageService],
  exports: [TssImageComponent]
})
export class TssImageModule { }
