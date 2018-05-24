import { TestService } from '../../../../services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {
  componentList = [];
  constructor(private ts: TestService) { }

  ngOnInit() {
    this.ts.get('components').subscribe(res => {
      this.componentList = res;
      console.log('res', res);
    });
  }

}
