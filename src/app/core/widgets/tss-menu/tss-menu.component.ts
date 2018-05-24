import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tss-menu',
  templateUrl: './tss-menu.component.html',
  styleUrls: ['./tss-menu.component.scss']
})
export class TssMenuComponent implements OnInit {
  @Input() options: any;
  items: any[];
  styling: string;
  constructor() { }
  // routerLink: ['/page/login'],
  ngOnInit() {
    this.styling = (this.options.styling) ? this.options.styling : 'vertical';
    this.items = this.options.items;
  }

}
