import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {
  @Input() options: any;
  rows: any[];
  constructor() { }

  ngOnInit() {
    this.rows = this.options.rows;
  }

}
