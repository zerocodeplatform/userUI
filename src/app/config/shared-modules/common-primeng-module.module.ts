import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DndModule } from 'ng2-dnd';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DragDropModule} from 'primeng/dragdrop';
import {CarouselModule} from 'primeng/carousel';
@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    DragDropModule,
    CarouselModule,
    DndModule.forRoot()
  ],
  exports: [ConfirmDialogModule, CommonModule, DndModule, OverlayPanelModule, DragDropModule, CarouselModule],
  declarations: [],
  providers: [ConfirmationService]
})
export class CommonPrimengModuleModule { }
