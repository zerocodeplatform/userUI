import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsertypeRoutingModule } from './usertype-routing.module';
import { UsertypeComponent } from './usertype.component';
import { CommonLayoutModuleModule } from '../../config/shared-modules/common-layout-module.module';
import { CommonFormModuleModule } from '../../config/shared-modules/common-form-module.module';
import { UsertypeLayoutComponent } from './usertype-layout/usertype-layout.component';
import { CommonMaterialModuleModule } from './../../config/shared-modules/common-material-module.module';
import { UsertypePropertiesComponent } from './usertype-layout/usertype-properties/usertype-properties.component';
import { UsertypeRolesComponent } from './usertype-layout/usertype-roles/usertype-roles.component';
import { UsertypeUsersComponent } from './usertype-layout/usertype-users/usertype-users.component';
import { UsertypeService } from '../../services/usertype.service';
import { UsertypeListComponent } from './usertype-list/usertype-list.component';
import { CommonPrimengModuleModule } from '../../config/shared-modules/common-primeng-module.module';
import { UsertypeDepartmentComponent } from './usertype-layout/usertype-department/usertype-department.component';
import { CommonService } from '../../services/common.service';
@NgModule({
  imports: [
    CommonModule,
    UsertypeRoutingModule,
    CommonLayoutModuleModule,
    CommonFormModuleModule,
    CommonMaterialModuleModule,
    CommonPrimengModuleModule
  ],
  declarations: [UsertypeComponent, UsertypeLayoutComponent, UsertypePropertiesComponent, UsertypeRolesComponent, UsertypeUsersComponent, UsertypeListComponent, UsertypeDepartmentComponent],
  providers: [UsertypeService, CommonService]
})
export class UsertypeModule { }
