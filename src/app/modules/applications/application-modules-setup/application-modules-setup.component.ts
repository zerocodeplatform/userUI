import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-application-modules-setup',
  templateUrl: './application-modules-setup.component.html',
  styleUrls: ['./application-modules-setup.component.scss']
})
export class ApplicationModulesSetupComponent implements OnInit {
  activeTabIndex = 0;
  activeTabName = '';
  urlParams: any = [];
  languageUrl: string;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
      this.languageUrl = 'application/module/' + this.urlParams.applicationUid + '/' + this.urlParams.moduleUid + '/language';
      this.activatedRoute.parent.routeConfig.data.breadcrumbs = this.urlParams.module;
      if (this.urlParams.tabName === 'Properties') {
        this.activeTabIndex = 0;
      } else if (this.urlParams.tabName === 'Datasets') {
        this.activeTabIndex = 1;
      } else if (this.urlParams.tabName === 'Pages') {
        this.activeTabIndex = 2;
      } else if (this.urlParams.tabName === 'Language') {
        this.activeTabIndex = 3;
      }
    });
  }

  ngOnInit() { }

  /**
    * Method for changing tabs and updating URL
    * @author Krunal
    * @since 2018-02-23
  */
  onTabChange(event) {
    this.activeTabIndex = event.index;
    if (this.activeTabIndex === 0) {
      this.activeTabName = 'Properties';
    } else if (this.activeTabIndex === 1) {
      this.activeTabName = 'Datasets';
    } else if (this.activeTabIndex === 2) {
      this.activeTabName = 'Pages';
    } else if (this.activeTabIndex === 3) {
      this.activeTabName = 'Language';
    }
    this.router.navigate([this.urlParams.module + '/' + this.urlParams.moduleUid + '/' + this.activeTabName], { relativeTo: this.activatedRoute.parent.parent });
  }

  /*   gotoLink() {
      console.log('sdf');
      this.router.navigate(['../../../'], { relativeTo: this.activatedRoute });
      console.log('adasd');
    } */
}
