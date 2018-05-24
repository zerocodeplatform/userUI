import { Component, OnInit } from '@angular/core';
import { UsertypeService } from '../../../services/usertype.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usertype-list',
  templateUrl: './usertype-list.component.html',
  styleUrls: ['./usertype-list.component.scss']
})
export class UsertypeListComponent implements OnInit {
  operations: any[] = [];
  isUserFormActive = false;
  cols: any[];
  userTypeList: any;
  selectedData: any;
  submitButtonLabel = 'CREATE';

  constructor(private usertypeService: UsertypeService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getUserTypeList();
  }
  /**
   * Get List of user types
   * @author - Abhilash
   */
  getUserTypeList() {
    this.usertypeService.getUserTypeList().subscribe((res) => {
      this.userTypeList = res;
    });
  }
  /**
   * Get List of user types
   * @author - Abhilash
   */
  addEditUserType(userTypeId) {
    if (userTypeId) {
      this.usertypeService.getUserTypeById(userTypeId).subscribe((res) => {
        this.selectedData = res;
        this.isUserFormActive = true;
      });
    } else {
      this.selectedData = '';
      this.isUserFormActive = ! this.isUserFormActive;
    }
    // scroll top
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth'});
  }
  /**
   * Save Callback when Add/edit is done
   * @param: event handler
   * @author - Abhilash
   */
  afterSaveCallback(event) {
    if (event) {
      this.getUserTypeList();
      this.isUserFormActive = false;
    }
  }
  /**
   * Change status of the user type
   * @param: Entire data with status
   * @author - Abhilash
   */
  changeStatus(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Status Change',
      accept: () => {
        const params = {uid: data.uid, status: !data.status};
        this.usertypeService.updateStatus(params).subscribe((res) => {
          if (res) {
            // this.getUserTypeList();
            data.status = !data.status;
          }
        });
      }
    });
  }
  /**
   * Delete User type
   * @param: Entire data with status
   * @author - Abhilash
   */
  deleteUserType(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Delete User Type',
      accept: () => {
        this.usertypeService.deleteUserType(data.uid).subscribe((res) => {
          if (res) {
            this.getUserTypeList();
          }
        });
      }
    });
  }
}
