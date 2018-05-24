import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TssFormService } from '../../services/tss-form.service';
import { FieldInterface } from '../../models/field.interface';
import { HttpInterceptor } from '../../../../utils/httpinterceptor';
import { environment } from '../../../../../environments/environment';
import { SimpleChange } from '@angular/core';


@Component({
  selector: 'app-tss-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnChanges {
  @Input() params: FieldInterface;
  @Input() formGroup: FormGroup;
  fileUploadUrl: string;
  imagePath: any = {};
  logoSpinner = false;
  constructor(private tssFormService: TssFormService) {
    this.fileUploadUrl = environment.apiUrl + 'uploadRawFiles';
  }

  ngOnInit() {
    this.tssFormService.buildFormGroup(this.params, this.formGroup);
    this.formGroup.valueChanges
      .subscribe(value => {
        if (value[this.params.name] && value[this.params.name]['src']) {
          this.imagePath = value[this.params.name]['src'];
        } else if (!value[this.params.name]) {
          this.imagePath = '';
        }
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    const change: SimpleChange = this.formGroup.value;
    if (changes.hasOwnProperty('formGroup')) {
    }
  }
  onBeforeUpload(ev) {
    this.logoSpinner = true;
    ev.formData.append('reqData', new Blob([JSON.stringify({})], {
      type: 'application/json'
    }));
    // ev.formData.append('field', JSON.stringify(field));
    ev.xhr.withCredentials = true;
    ev['Content-Type'] = undefined;
  }
  onUpload(ev) {
    const res = JSON.parse(ev.xhr.response);
    if (ev.files && ev.files.length > 0) {
      this.imagePath = ev.files[0]['objectURL'];
    }
    if (res.success) {
      const key = this.params.name;
      this.formGroup.controls[key].setValue(res.data);
      this.logoSpinner = false;
      if (res.data) {
      }
    } else {
    }
  }
  deleteLogo(url) {
    this.imagePath = '';
    const key = this.params.name;
    this.formGroup.controls[key].setValue(null);
  }
}
