import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-com-render',
  templateUrl: './com-render.component.html',
  styleUrls: ['./com-render.component.scss']
})
export class ComRenderComponent implements OnInit, OnChanges {

  @Input() data: any = {};
  template: string;
  options: any;
  lazyModules: any = [];
  constructor() { }

  ngOnInit() {
    this.setData();
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log('changes', changes);
    if (changes.hasOwnProperty('data')) {
      // this.setData();
    }

  }
  setData() {
    this.options = this.data.options;
    switch (this.data.type) {
      case 'multi-form':
        this.lazyModules = ['tss-multi-step-form'];
        this.template = '<app-tss-multi-step-form [options]="options"></app-tss-multi-step-form>';
        break;
      case 'login':
        this.lazyModules = ['login'];
        this.template = '<app-login [options]="options"></app-login>';
        break;
      case 'grid':
        this.lazyModules = ['data-grid'];
        this.template = '<app-default-data-grid [options]="options"></app-default-data-grid>';

        break;
      case 'form':
        this.lazyModules = ['tss-form'];
        this.template = '<app-tss-form [options]="options"></app-tss-form>';
        break;
      case 'html':
        this.lazyModules = [];
        this.template = this.options.template;
        break;
      case 'menu':
        this.lazyModules = ['tss-menu'];
        this.template = '<app-tss-menu [options]="options"></app-tss-menu>';
        break;
      case 'image':
        this.lazyModules = ['tss-image'];
        this.template = '<app-tss-image [options]="options"></app-tss-image>';
        break;
      default:
        break;
    }
  }

}
