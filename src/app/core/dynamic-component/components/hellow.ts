import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'hellow',
  template: `
  <div class="panel">
    <div class= "header">
    <h2 *ngIf="options.title">{{options.title}}</h2>
    </div>
    <ng-template></ng-template>
  </div>
 `,
})
export class Hellow implements OnInit {
  @Input() data: any = {};
  options: any = {};
  ngOnInit() {
    this.options = this.data.options;
  }

}
