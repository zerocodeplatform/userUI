import '../../pages/pages.component.css';
import { ApplicationService } from '../../../services/application.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageSetupService } from './services/page-setup.service';

@Component({
  selector: 'app-application-page-setup',
  templateUrl: './application-page-setup.component.html',
  styleUrls: ['./application-page-setup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationPageSetupComponent implements OnInit {
  blocks: any;
  datasets: any;
  formElements: any;
  gridTables: any;
  chartsGraphs: any;
  navigations: any;
  headerFooters: any;
  others: any;
  template: string;
  selectedTemplate: any;
  pageBlocks: any = [];
  visibleSidebar = false;
  blockData: any;
  widgets = [
    {
      id: 1,
      type: 'image',
      widgetName: 'image',
      options: { 'width':'100','height':'100' }
    },{
    id: 2,
    type: 'html',
    widgetName: 'html',
    options: { 'template': 'Html Editor' }
  }, {
    id: 4,
    type: 'login',
    widgetName: 'login',
    options: {}
  }];
  pageUid: any;
  moduleUid: any;
  constructor(private pss: PageSetupService, private http: HttpClient, private ar: ActivatedRoute, private as: ApplicationService) {
    this.ar.params.subscribe((params: Params) => {
      this.pageUid = params['pageUid'];
      this.moduleUid = params['moduleUid'];
    });
    pss.blockClickSubject.subscribe(res => {
      this.widgetClick(res);
    })
  }
  ngOnInit() {
    this.pageBlocks = [];
    this.as.getPageById(this.moduleUid, this.pageUid).subscribe(res => {
      if (res.setting && res.setting.data) {
        this.pageBlocks = res.setting.data;
      }
    });
    // this.http.get('https://jsonblob.com/api/bada8ec7-4e91-11e8-8766-2fc4700740f9').subscribe(res => {
    //   console.log('res', res);
    //   this.pageBlocks = [];
    //   // this.blocks = res;
    // });

    this.blocks = [
      {
        id: 1, image: 'blank', type: 'block', data: {
          'type': 'block',
          'options': {
            'blockName': 'Block-0',
            'isBackgroundColor': true,
            'backgroundColor': '#B2B2B2',
            'image': '',
            'isBorder': true,
            'borderWidth': '1px',
            'borderStyle': 'solid',
            'width': '1px',
            'class': 'ui-g-12',
            'blockHeight': {
              'lg': 1000,
              'sm': 500,
              'md': 300
            },
            'blockWidth': {
              'lg': 'ui-g-12',
              'sm': 'ui-sm-12',
              'md': 'ui-md-12'
            },
            'padding': '10px'
          },
          'child': []
        }
      },
      {
        id: 2, image: 'block1', type: 'groupBlock', data: [
          {
            'type': 'block',
            'options': {
              'blockName': 'Block1',
              'isBackgroundColor': true,
              'backgroundColor': '#ccc',
              'image': '',
              'isBorder': true,
              'borderWidth': '1px',
              'borderStyle': 'solid',
              'width': '1px',
              'class': 'ui-g-6',
              'blockHeight': {
                'lg': 1000,
                'sm': 500,
                'md': 300
              },
              'blockWidth': {
                'lg': 'ui-g-6',
                'sm': 'ui-sm-6',
                'md': 'ui-md-6'
              },
              'padding': '10px'
            },
            'child': []
          },
          {
            'type': 'block',
            'options': {
              'blockName': 'Block2',
              'isBackgroundColor': true,
              'backgroundColor': '#ccc',
              'image': '',
              'isBorder': true,
              'borderWidth': '1px',
              'borderStyle': 'solid',
              'width': '1px',
              'class': 'ui-g-6',
              'blockHeight': {
                'lg': 1000,
                'sm': 500,
                'md': 300
              },
              'blockWidth': {
                'lg': 'ui-g-6',
                'sm': 'ui-sm-6',
                'md': 'ui-md-6'
              },
              'padding': '10px'
            },
            'child': []
          }
        ]
      },
      {
        id: 3, image: 'block2', type: 'groupBlock', data: [
          {
            'type': 'block',
            'options': {
              'blockName': 'Block1',
              'isBackgroundColor': true,
              'backgroundColor': '#B2B2B2',
              'image': '',
              'isBorder': true,
              'borderWidth': '1px',
              'borderStyle': 'solid',
              'width': '1px',
              'class': 'ui-g-12',
              'blockHeight': {
                'lg': 1000,
                'sm': 500,
                'md': 300
              },
              'blockWidth': {
                'lg': 'ui-g-12',
                'sm': 'ui-sm-12',
                'md': 'ui-md-12'
              },
              'padding': '10px'
            },
            'child': []
          },
          {
            'type': 'block',
            'options': {
              'blockName': 'Block2',
              'isBackgroundColor': true,
              'backgroundColor': '#B2B2B2',
              'image': '',
              'isBorder': true,
              'borderWidth': '1px',
              'borderStyle': 'solid',
              'width': '1px',
              'class': 'ui-g-12',
              'blockHeight': {
                'lg': 1000,
                'sm': 500,
                'md': 300
              },
              'blockWidth': {
                'lg': 'ui-g-12',
                'sm': 'ui-sm-12',
                'md': 'ui-md-12'
              },
              'padding': '10px'
            },
            'child': []
          }
        ]
      },
      // { id: 4, image: 'block3' },
      // { id: 5, image: 'block4' },
      // { id: 6, image: 'block5' },
      // { id: 7, image: 'block6' },
      // { id: 8, image: 'block7' },
      // { id: 9, image: 'block8' },
      // { id: 10, image: 'block9' },
    ];
    this.datasets = [
      { id: 1, image: 'blank-form' }
    ];
    this.formElements = [
      { id: 1, image: 'blank-form', html: 'Empty' },
      { id: 2, image: 'vertical-form', html: 'vertical form' },
      { id: 3, image: 'block9', html: 'block9' }
    ];
    this.gridTables = [
      { id: 10, icon: 'blank', html: 'Blank' },
      { id: 1, icon: 'grid1', html: 'grid1' },
      { id: 2, icon: 'grid2', html: 'grid2' },
      { id: 3, icon: 'grid3', html: 'grid3' },
      { id: 4, icon: 'grid4', html: 'grid4' },
      { id: 5, icon: 'grid5', html: 'grid5' },
      { id: 6, icon: 'grid6', html: 'grid6' },
      { id: 7, icon: 'grid7', html: 'grid7' },
      { id: 8, icon: 'grid8', html: 'grid8' },
      { id: 9, icon: 'grid9', html: 'grid9' }
    ];
    this.chartsGraphs = [
      { id: 1, image: 'blank-form' }
    ];
    this.navigations = [
      { id: 1, image: 'blank-form' }
    ];
    this.headerFooters = [
      { id: 1, image: 'blank-form' }
    ];
    this.others = [
      { id: 1, image: 'blank-form' }
    ];
  }
  widgetClick(block) {
    this.blockData = block;
    this.visibleSidebar = true;
    console.log('block', block);
    // op.toggle(event);
  }
  onDropSuccess($event) {
    const dragData = Object.assign({}, $event.dragData);
    if (dragData.type === 'groupBlock') {
      dragData.data.forEach(block => {
        const newBlock = {
          child: [],
          type: 'block',
          options: Object.assign({}, block.options)
        };
        this.pageBlocks.push(newBlock);
      });
    } else if (dragData.type === 'block') {
      const newBlock = {
        child: [],
        type: 'block',
        options: Object.assign({}, dragData.data.options)
      };

      this.pageBlocks.push(newBlock);
    }

    console.log(this.pageBlocks);
  }
  pageSave() {
    this.as.savePageBuilder(this.pageUid, { content: { data: this.pageBlocks } }).subscribe(res => {
      console.log('res', res);
    });
  }

}
