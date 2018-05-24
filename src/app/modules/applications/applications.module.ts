import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationModulesComponent } from './application-modules/application-modules.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { CommonLayoutModuleModule } from './../../config/shared-modules/common-layout-module.module';
import { CommonFormModuleModule } from './../../config/shared-modules/common-form-module.module';
import { CommonMaterialModuleModule } from '../../config/shared-modules/common-material-module.module';
import { ApplicationService } from '../../services/application.service';
import { CommonPrimengModuleModule } from '../../config/shared-modules/common-primeng-module.module';
import { ApplicationModulesSetupComponent } from './application-modules-setup/application-modules-setup.component';
import { AppModulePropertiesComponent } from './application-modules-setup/app-module-properties/app-module-properties.component';
import { AppModulePagesComponent } from './application-modules-setup/app-module-pages/app-module-pages.component';
import { AppDatasetsComponent } from './application-modules-setup/app-datasets/app-datasets.component';
import { DatasetLayoutComponent } from './application-modules-setup/app-datasets/dataset-layout/dataset-layout.component';
import { DatasetPropertiesComponent } from './application-modules-setup/app-datasets/dataset-properties/dataset-properties.component';
import { DatasetFieldsComponent } from './application-modules-setup/app-datasets/dataset-fields/dataset-fields.component';
import { ApplicationSetupComponent } from './application-setup/application-setup.component';
import { DatasetFieldsService } from './../../services/dataset-fields.service';
import { FormlyBootstrapModule } from '../../core/formly-ui-bootstrap/ui-bootstrap';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    CommonLayoutModuleModule,
    CommonFormModuleModule,
    CommonMaterialModuleModule,
    CommonPrimengModuleModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  declarations: [ApplicationsListComponent,
    ApplicationModulesComponent,
    ApplicationModulesSetupComponent,
    AppModulePropertiesComponent, AppModulePagesComponent,
    AppDatasetsComponent, DatasetLayoutComponent, DatasetPropertiesComponent,
    DatasetFieldsComponent,
    ApplicationSetupComponent],
  providers: [ApplicationService, DatasetFieldsService],
  exports: [AppModulePropertiesComponent]
})
export class ApplicationsModule { }
