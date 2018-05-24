import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationPageSetupRoutingModule } from './application-page-setup-routing.module';
import { ApplicationPageSetupComponent } from './application-page-setup.component';
import { CommonLayoutModuleModule } from '../../../config/shared-modules/common-layout-module.module';
import { CommonMaterialModuleModule } from '../../../config/shared-modules/common-material-module.module';
import { CommonPrimengModuleModule } from '../../../config/shared-modules/common-primeng-module.module';
import { CommonFormModuleModule } from '../../../config/shared-modules/common-form-module.module';
import { DndModule } from 'ng2-dnd';
import { BlockWidgetOptionComponent } from './block-widget-option/block-widget-option.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { FormlyBootstrapModule } from '../../../core/formly-ui-bootstrap/ui-bootstrap.module';
import { ComRenderComponent } from './com-render/com-render.component';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { FormlyModule } from '@ngx-formly/core';
import { BlockTreeNodeComponent } from './block-tree-node/block-tree-node.component';
import { PageSetupService } from './services/page-setup.service';
@NgModule({
  imports: [
    CommonModule,
    ApplicationPageSetupRoutingModule,
    CommonLayoutModuleModule,
    CommonMaterialModuleModule,
    CommonPrimengModuleModule,
    CommonFormModuleModule,
    SidebarModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    DndModule,
    NgxDynamicTemplateModule
  ],
  declarations: [ApplicationPageSetupComponent, BlockWidgetOptionComponent, ComRenderComponent, BlockTreeNodeComponent],
  providers:[PageSetupService]
})
export class ApplicationPageSetupModule { }
