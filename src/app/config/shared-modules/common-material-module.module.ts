import { providers } from 'ng2-dnd';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule, MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
const materialModuleList = [
  MatTabsModule, MatMenuModule, MatTooltipModule, MatSlideToggleModule
];
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 600,
  hideDelay: 0,
  touchendHideDelay: 1000,
};
@NgModule({
  imports: [
    materialModuleList
  ],
  declarations: [],
  exports: [materialModuleList],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
  ]
})
export class CommonMaterialModuleModule { }
