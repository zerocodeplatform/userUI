import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-router-outlet',
  template: `<router-outlet></router-outlet>`,
})
export class RouterOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

