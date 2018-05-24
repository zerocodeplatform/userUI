import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-dataset-layout',
  templateUrl: './dataset-layout.component.html',
  styleUrls: ['./dataset-layout.component.scss']
})
export class DatasetLayoutComponent implements OnInit {
  activeTabIndex = 0;
  activeTabName = '';
  languageUrl: string;
  urlParams: any = [];
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.urlParams = params;
      this.languageUrl = 'application/module/dataset/' + this.urlParams.moduleUid + '/' + this.urlParams.datasetUid + '/language';
      // this.activatedRoute.routeConfig.data.breadcrumbs = 'data set ( ' + this.urlParams.datasetType + ' )';
    });

  }

  ngOnInit() {

    if (this.urlParams.datasetType === 'properties') {
      this.activeTabIndex = 0;
    } else if (this.urlParams.datasetType === 'fields') {
      this.activeTabIndex = 1;
    } else if (this.urlParams.datasetType === 'language') {
      this.activeTabIndex = 2;
    }
  }

  /**
    * Method for changing tabs and updaitng URL
    * @author Krunal
    * @since 2018-02-26
  */
  onTabChange(event) {
    this.activeTabIndex = event.index;
    if (this.activeTabIndex === 0) {
      this.activeTabName = 'properties';
    } else if (this.activeTabIndex === 1) {
      this.activeTabName = 'fields';
    } else if (this.activeTabIndex === 2) {
      this.activeTabName = 'language';
    }
    // modified by Abhilash; Date - 28 Feb 2018
    this.router.navigate([this.activeTabName + '/' + this.urlParams.datasetUid + '/' + this.urlParams.datasetName], { relativeTo: this.activatedRoute.parent });
  }

}
