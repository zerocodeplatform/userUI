import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-data-grid',
  templateUrl: './default-data-grid.component.html',
  styleUrls: ['./default-data-grid.component.scss']
})
export class DefaultDataGridComponent implements OnInit {

  @Input() options: any;
  cols: any[];
  rows = [];
  btnLabel: string;
  styling: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.options);
    this.cols = this.options.col;
    this.rows = this.options.rows;
    this.btnLabel = this.options.btnLabel;
    this.styling = this.options.styling;
  }
  btnClick() {
    console.log(this.options.navigateTo);
    this.router.navigate(['/page/' + this.options.navigateTo]);
  }

}
