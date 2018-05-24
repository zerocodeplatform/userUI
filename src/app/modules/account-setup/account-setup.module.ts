import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSetupRoutingModule } from './account-setup-routing.module';
import { AccountSetupComponent } from './account-setup.component';
import { TestService } from '../../services/test.service';
import { CommonFormModuleModule } from '../../config/shared-modules/common-form-module.module';
import { CommonLayoutModuleModule } from '../../config/shared-modules/common-layout-module.module';
import { CommonMaterialModuleModule } from './../../config/shared-modules/common-material-module.module';
import { SiteConfigService } from '../../services/site-config.service';
import { AccountAdvancedSetupComponent } from './account-advanced-setup/account-advanced-setup.component';
import {FormlyModule} from '@ngx-formly/core';
@NgModule({
  imports: [
    CommonModule,
    AccountSetupRoutingModule,
    CommonFormModuleModule,
    CommonLayoutModuleModule,
    CommonMaterialModuleModule,
  ],
  declarations: [AccountSetupComponent, AccountAdvancedSetupComponent],
  providers: [SiteConfigService]
})
export class AccountSetupModule { }
