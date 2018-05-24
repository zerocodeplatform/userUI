import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TssMenuComponent } from './tss-menu.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  imports: [
    CommonModule,
    TieredMenuModule,
    MenubarModule
  ],
  declarations: [TssMenuComponent],
  exports: [TssMenuComponent]
})
export class TssMenuModule { }
