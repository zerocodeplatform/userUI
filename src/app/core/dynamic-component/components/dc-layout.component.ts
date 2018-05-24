import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dc-layout',
  template: `
   <dc-render [data]='c' *ngFor="let c of componentList"  [ngClass]="c.className"></dc-render>
    <ng-content></ng-content>
    `
})
export class DcLayoutComponent implements OnInit {
  @Input() componentList = [];
  @Input() options: any = {};
  constructor() { }
  ngOnInit() {
    console.log('componentList', this.componentList);
  }

}
