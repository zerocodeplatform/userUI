import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsertypeService } from '../../../services/usertype.service';

@Component({
  selector: 'app-usertype-layout',
  templateUrl: './usertype-layout.component.html',
  styleUrls: ['./usertype-layout.component.scss']
})
export class UsertypeLayoutComponent implements OnInit {
  selectedData: any;
  submitButtonLabelText = 'CREATE';
  sectionName = '';
  selectedUserTypeName = '';
  userTypeId = '';
  activeTab = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private usertypeService: UsertypeService) {
      // position changed to get breadcrumbs while loading
      this.activatedRoute.paramMap.subscribe(params => {
        if (params['params']) {
          this.sectionName = params['params']['tabName'];
          this.userTypeId = params['params']['userTypeId'];
          this.selectedUserTypeName = params['params']['name'];
          this.activatedRoute.routeConfig.data.breadcrumbs = this.selectedUserTypeName;
          if (this.sectionName === 'Properties') {
            this.usertypeService.getUserTypeById(this.userTypeId).subscribe((res) => {
              if (res) {
                this.selectedData = res;
              }
            });
            this.activeTab = 0;
          } else if (this.sectionName === 'Roles') {
            this.activeTab = 1;
          } else if (this.sectionName === 'Departments') {
            this.activeTab = 2;
          } else if (this.sectionName === 'Users') {
            this.activeTab = 3;
          }
        }
      });
  }

  ngOnInit() {  }
  /**
   * Funciton for changing tabs and updaitng URL
   * @param event - Event handler for tab change
   * @author - Abhilash
   */
  tabChanged(event) {
    this.activeTab = event.index;
    this.router.navigate([this.userTypeId + '/' + this.selectedUserTypeName + '/' + event.tab.textLabel], { relativeTo: this.activatedRoute.parent });
  }

  afterSaveCallback(event) {
    if (event.name) {
      this.router.navigate([event.uid + '/' + event.name + '/properties'], { relativeTo: this.activatedRoute.parent });
    }
  }

}
