import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDataGridComponent } from './default-data-grid/default-data-grid.component';
import { TableModule } from 'primeng/table';
import { DataListModule } from 'primeng/datalist';
import { DataTableComponent } from './data-table/data-table.component';
import { DataViewComponent } from './data-view/data-view.component';
@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DataListModule
  ],
  declarations: [DefaultDataGridComponent, DataTableComponent, DataViewComponent],
  exports: [DefaultDataGridComponent]
})
export class DataGridModule { }
