import { pageUtils } from '../page.utils';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-block-widget-option',
  templateUrl: './block-widget-option.component.html',
  styleUrls: ['./block-widget-option.component.scss']
})
export class BlockWidgetOptionComponent implements OnInit {
  @Input() data: any = {};
  fields: FormlyFieldConfig[];
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  constructor() { }

  ngOnInit() {
    this.fields = [];

    if (this.data) {
      this.model = this.data.options;
      console.log('data', this.data.type);
      switch (this.data.type) {
        case 'block':
          this.fields = pageUtils.blockFieldConfig;
          console.log('data', this.data.type);
          break;
        case 'login':
          this.fields = pageUtils.widgetLoginFieldConfig;
          break;
        case 'html':
          this.fields = pageUtils.widgetHtmlFieldConfig;
          break;
        case 'image':
          this.fields = pageUtils.widgetImageFieldConfig;
          break;

        default:
          break;
      }
    }

  }
  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }

}
