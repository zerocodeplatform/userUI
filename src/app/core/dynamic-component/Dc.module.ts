import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigOption, DcConfig } from './services/dc.config';
import { DcLayoutComponent } from './components/dc-layout.component';
import { DcRenderComponent } from './components/dc-render.component';
import { SafeHtmlPipe } from '../pipes/safe-html-pipe';
import { RunScriptsDirective } from '../directives/run-scripts.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [DcLayoutComponent],
  declarations: [DcLayoutComponent, DcRenderComponent, SafeHtmlPipe, RunScriptsDirective],
  exports: [DcLayoutComponent]
})
export class DcModule {
  static forRoot(config: ConfigOption): ModuleWithProviders {
    return {
      ngModule: DcModule,
      providers: [
        DcConfig,
        { provide: 'config', useValue: config }
      ],
    };
  }
}
