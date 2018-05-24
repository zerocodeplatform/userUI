import { LanguageService } from '../utils/language.service';
import { Language } from '../utils/language';
import { SimpleChange } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InputTypes } from '../../tss-form/models/inputTypes';

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.scss']
})
export class LanguageConfigComponent implements OnInit, OnChanges {
  @Input() params: any;
  @Input() url: string;
  @Input() lazy = true;
  @Input() layoutStyle = 'horizontal';
  @Input() showSubmitBtn = true;

  // @Input() formGroup: FormGroup;
  // @Output() change: EventEmitter<any>;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  scrollableCols: any[];
  frozenCols: any[];
  rowGroupMetadata: any;
  @Input() languageData: Language = { languages: [], fields: [] };
  showTable = false;
  inputTypes = new InputTypes();
  constructor(private languageService: LanguageService) {
  }
  ngOnInit() {
    if (!this.lazy) {

      this.getLanguage();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((this.url) && changes.hasOwnProperty('url')) {
      if (changes.url.currentValue !== changes.url.previousValue) {
        this.getLanguage();
      }
    }
  }
  getLanguage() {
    if (this.lazy) {
      this.languageService.getLanguage(this.url).subscribe(res => {
        if (res) {
          this.showTable = true;
          this.languageData = res;
          this.scrollableCols = res.languages.filter(item => item.isDefault !== true);
          this.frozenCols = res.languages.filter((item, i) => item.isDefault === true);
        }
      });
    } else {
      this.scrollableCols = this.languageData.languages.filter(item => item.isDefault !== true);
      this.frozenCols = this.languageData.languages.filter((item, i) => item.isDefault === true);
      this.showTable = true;
    }
  }
  saveLanguage() {
    this.languageService.updateLanguage(this.url, { 'fields': this.languageData.fields }).subscribe(res => {
      console.log('res', res);
    });
  }

}
