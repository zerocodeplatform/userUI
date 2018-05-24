import { DcConfig, ConfigOption } from '../services/dc.config';
import { ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'dc-render',
  template: `
  <ng-template #renderComponentTemplate></ng-template>
  <div *ngIf="data.template" [innerHtml]="data.template | safehtml" appRunScripts></div>
  <ng-content></ng-content>
  `
})
export class DcRenderComponent implements OnInit {
  @Input() data: any = {};
  @Input() readerComponent: any;
  @Input() componentSetting: any;
  @ViewChild('renderComponentTemplate', { read: ViewContainerRef }) renderComponentTemplate: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dcConfig: DcConfig) { }
  ngOnInit() {
    const type = this.dcConfig.getType(this.data.type);
    const renderComponentTemplate = this.renderComponentTemplate;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type.component);
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    // this.renderComponentTemplate.createComponent(componentFactory);
    const componentRef = renderComponentTemplate.createComponent(componentFactory);
    (<any>componentRef.instance).data = this.data;
  }
}

