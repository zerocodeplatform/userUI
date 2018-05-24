import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicationService } from '../../../../services/application.service';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-module-pages',
  templateUrl: './app-module-pages.component.html',
  styleUrls: ['./app-module-pages.component.scss']
})
export class AppModulePagesComponent implements OnInit, OnChanges {
  @Input() moduleUid: string;
  pagesList: any = [];
  urlQueryParams: any;
  flagAddpage = false;
  buttonLabel = 'Create';
  pagesOrderList: any = { list: [] };
  // moduleLInk = 'admin/applications/';
  pageFormGroup: FormGroup = new FormGroup({});
  cols: any[];
  layoutOptions: any = [];
  layoutOptionData: any = [];
  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Page Name', rules: { required: true } },
    masterPage: <FieldInterface>{ name: 'masterPage', label: 'Layout', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    icon: <FieldInterface>{ name: 'icon', label: 'icon', rules: { required: false } }
  };

  constructor(private applicationService: ApplicationService,
    private tssFormService: TssFormService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router) {
    tssFormService.buildFormControl(this.formData, this.pageFormGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPagesList();
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Page Name' },
      { field: 'description', header: 'Description' }
    ];

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.urlQueryParams = params;
      if (this.urlQueryParams['add']) {
        this.flagAddpage = true;
      }
    });
    this.getThemeOptions();
  }

  /**
   * Get theme options list
   * @author: Mahesh.J
   */
  getThemeOptions() {
    this.applicationService.getLayoutOptionsList('options').subscribe((res) => {
      this.layoutOptions = res;
      this.layoutOptionData = res;
    });
  }

  buildLayoutOptionsEdit(uid) {
    this.layoutOptions = this.layoutOptionData.filter(item => item.value !== uid);
  }

  /**
    * Method to get pages list
    * @author Krunal
    * @since 2018-02-23
  */
  getPagesList() {
    this.pagesList = [];
    this.applicationService.getPagesList(this.moduleUid).subscribe((res) => {
      this.pagesList = res;
      if (res.length === 0) {
        this.pageFormGroup.reset();
        this.flagAddpage = true;
      }
    });
  }

  /**
    * Method to create page
    * @author Krunal
    * @since 2018-02-23
  */
  addEditPage(pageId) {
    this.buttonLabel = 'Create';
    this.pageFormGroup.reset();
    if (pageId) {
      this.applicationService.getPageById(this.moduleUid, pageId).subscribe((res) => {
        this.pageFormGroup.patchValue(res);
        this.buttonLabel = 'UPDATE';
        this.flagAddpage = true;
        this.buildLayoutOptionsEdit(res.id);
      });
    } else {
      this.flagAddpage = !this.flagAddpage;
      this.buildLayoutOptionsEdit('');
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  /**
    * Method to save & update page
    * @author Krunal
    * @since 2018-02-22
  */
  createUdpatePage(value, valid) {
    if (this.tssFormService.checkValidation(this.pageFormGroup)) {
      if (value.icon === null || value.icon === '') {
        value.icon = 'fa-question-circle';
      }
      value.isGroup = false;
      if (value.uid) {
        this.applicationService.updatePage(this.moduleUid, value).subscribe((resUpdate) => {
          if (resUpdate) {
            this.getPagesList();
            this.flagAddpage = false;
          }
        });
      } else {
        this.applicationService.savePage(this.moduleUid, value).subscribe((res) => {
          if (res) {
            this.flagAddpage = false;
            this.pageFormGroup.reset();
            this.getPagesList();
          }
        });
      }
    }
  }

  /**
   * This method will deletes page by passing formData
   * @author Mahesh
   * @since 2018-02-22
   * @param formData
   * @see ApplicationService
   */
  deletePage(formData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the page?',
      header: 'Delete Page',
      icon: 'fa fa-trash',
      accept: () => {
        this.applicationService.deletePage(this.moduleUid, formData.uid).subscribe((res) => {
          if (res) {
            this.flagAddpage = false;
            this.getPagesList();
          }
        });
      }
    });
  }

  /**
   * This method will updates page status by passing page id and status
   * @author Mahesh
   * @since 2018-02-22
   * @param page
   * @param event
   * @see ApplicationService
   */
  updatePageStatus(formData, event) {
    const msg = event.checked ? 'activate' : 'in-activate';
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + msg + ' the page?',
      header: 'Change Page Status',
      icon: 'fa fa-trash',
      accept: () => {
        this.applicationService.updatePageStatus(this.moduleUid, { uid: formData.uid, status: event.checked }).subscribe((res) => {
          if (res) {
            formData.status = event.checked;
          } else {
            event.source.checked = !event.checked;
          }
        });
      },
      reject: () => {
        event.source.checked = !event.checked;
      }
    });
  }

  onRowSelect(page) {
    this.router.navigate(['page/' + page.uid], { relativeTo: this.activatedRoute.parent });
  }
}
