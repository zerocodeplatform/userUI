import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit {
  state: any;
  menuState = 'out';
  windowHeight: any;
  menu = [
    {
      'name': 'Product Setup',
      'link': 'account',
      'icon': 'fa-th-large',
    },
    {
      'name': 'Applications',
      'link': 'applications',
      'icon': 'fa-dropbox',
    },
    {
      'name': 'User Type',
      'link': 'usertype',
      'icon': 'fa-user',
    },
  ];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.windowHeight = window.innerHeight;
  }
  logout() {
    this.userService.logout();
  }
  /**
   * @memberof AdminLayoutComponent
   */
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
