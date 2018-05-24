import { RouterOutletComponent } from '../../layouts/router-outlet.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchFilterPipe } from '../../core/pipes/search-filter';

export const ROUTES: Routes = [
  {
    path: 'dcModule',
    loadChildren: 'app/core/dynamic-component/Dc.module#DcModule'
  },
  { path: 'login', loadChildren: 'app/core/widgets/login/login.module#LoginModule' },
  { path: 'data-grid', loadChildren: 'app/core/widgets/data-grid/data-grid.module#DataGridModule' },
  { path: 'tss-form', loadChildren: 'app/core/widgets/tss-form/tss-form.module#TssFormModule' },
  { path: 'tss-multi-step-form', loadChildren: 'app/core/widgets/tss-form/tss-multi-step-form/tss-multi-step-form.module#TssMultiStepFormModule' },
  { path: 'tss-menu', loadChildren: 'app/core/widgets/tss-menu/tss-menu.module#TssMenuModule' }
];

// const DynamicTemplateModule = NgxDynamicTemplateModule.forRoot({ routes: ROUTES });
@NgModule({
  imports: [
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [RouterOutletComponent, SearchFilterPipe],
  exports: [RouterOutletComponent, FlexLayoutModule, RouterModule]
})
export class CommonLayoutModuleModule { }
