import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from '../../config/routes/admin-layout-routing.module';
import { NAV_DROPDOWN_DIRECTIVES } from '../dropdown-toggle.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../sidebar-toggle.directive';
import { CommonFormModuleModule } from '../../config/shared-modules/common-form-module.module';
import { CommonLayoutModuleModule } from '../../config/shared-modules/common-layout-module.module';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../utils/local-storage.service';
import { CommonMaterialModuleModule } from '../../config/shared-modules/common-material-module.module';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    CommonFormModuleModule,
    CommonLayoutModuleModule,
    CommonMaterialModuleModule,
    McBreadcrumbsModule.forRoot()
  ],
  declarations: [AdminLayoutComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES],
  providers: [UserService, LocalStorageService]
})
export class AdminLayoutModule { }
