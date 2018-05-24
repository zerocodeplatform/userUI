import { SiteConfigService } from '../../../services/site-config.service';
import { FieldInterface } from '../../../core/tss-form/models/field.interface';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-advanced-setup',
  templateUrl: './account-advanced-setup.component.html',
  styleUrls: ['./account-advanced-setup.component.scss']
})
export class AccountAdvancedSetupComponent implements OnInit {
  formData: FieldInterface[];
  constructor(private siteConfigService: SiteConfigService) { }

  ngOnInit() {
    this.siteConfigService.getAdvancedSetting().subscribe((res) => {
      this.formData = res;
    });
  }
  submit(data) {
    this.siteConfigService.updateAdvancedSetting(data).subscribe((res) => {
      console.log('res', res);
    });
  }


}
