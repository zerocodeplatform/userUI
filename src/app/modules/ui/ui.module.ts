import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { CommonFormModuleModule } from '../../config/shared-modules/common-form-module.module';
import { CommonLayoutModuleModule } from '../../config/shared-modules/common-layout-module.module';
import { CommonMaterialModuleModule } from '../../config/shared-modules/common-material-module.module';
import { UiComponent } from './ui.component';
import { CommonPrimengModuleModule } from '../../config/shared-modules/common-primeng-module.module';
import { TssFormModule } from '../../core/tss-form/tss-form.module';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { UiBootstrapComponent } from './dynamic-form/ui-bootstrap/ui-bootstrap.component';
import { UiMaterialComponent } from './dynamic-form/ui-material/ui-material.component';
import { FormlyMaterialModule, FormlyFieldInput } from '../../core/formly-ui-material/ui-material';
import { FormlyBootstrapModule } from '../../core/formly-ui-bootstrap/ui-bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { DynamicComponentComponent } from './dynamic-form/dynamic-component/dynamic-component.component';
import { DcModule } from '../../core/dynamic-component/Dc.module';
import { DcConfigModule } from '../../core/dynamic-component/dc-config.module';
import { providers } from 'ng2-dnd';
import { TestService } from '../../services/test.service';
import { UiCustomFormComponent } from './dynamic-form/ui-custom-form/ui-custom-form.component';

@NgModule({
  imports: [
    CommonModule,
    UiRoutingModule,
    CommonFormModuleModule,
    CommonLayoutModuleModule,
    CommonMaterialModuleModule,
    CommonPrimengModuleModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    DcModule,
    DcConfigModule
  ],
  declarations: [
    UiComponent,
    DynamicFormComponent,
    UiBootstrapComponent,
    UiMaterialComponent,
    DynamicComponentComponent,
    UiCustomFormComponent
  ],
  providers: [TestService]
})
export class UiModule { }
