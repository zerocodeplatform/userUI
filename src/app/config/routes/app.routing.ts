import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';
// Layouts
import { AuthGuard } from '../router-guards/auth.guard';
import { LoginGuard } from '../router-guards/login.guard';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { PreloadAllModules } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '',
        canLoad: [LoginGuard],
        canActivate: [LoginGuard],
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: 'app/modules/pages/pages.module#PagesModule',
            }
        ]
    },
    {
        path: 'admin',
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        loadChildren: 'app/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    {
        path: 'dcModule',
        loadChildren: 'app/core/dynamic-component/dc-config.module#DcConfigModule'
    },
    { path: 'login', loadChildren: 'app/core/widgets/login/login.module#LoginModule' },
    { path: 'data-grid', loadChildren: 'app/core/widgets/data-grid/data-grid.module#DataGridModule' },
    { path: 'tss-form', loadChildren: 'app/core/widgets/tss-form/tss-form.module#TssFormModule' },
    { path: 'tss-multi-step-form', loadChildren: 'app/core/widgets/tss-form/tss-multi-step-form/tss-multi-step-form.module#TssMultiStepFormModule' },
    { path: 'tss-menu', loadChildren: 'app/core/widgets/tss-menu/tss-menu.module#TssMenuModule' },
    { path: 'tss-image', loadChildren: 'app/core/widgets/tss-image/tss-image.module#TssImageModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgxDynamicTemplateModule.forRoot({ routes: routes })],
    exports: [RouterModule, NgxDynamicTemplateModule]
})
export class AppRoutingModule {

}
