import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm, NgModel } from '@angular/forms';
import { UsertypeService } from '../../../../services/usertype.service';
import { FieldInterface } from '../../../../core/tss-form/models/field.interface';
import { TssFormService } from '../../../../core/tss-form/services/tss-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usertype-properties',
  templateUrl: './usertype-properties.component.html',
  styleUrls: ['./usertype-properties.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsertypePropertiesComponent implements OnInit, OnChanges {
  usertypeForm: FormGroup = new FormGroup({});
  regions: any[] = [];
  permissions: any[] = [];
  formData = {
    uid: <FieldInterface>{ name: 'uid', label: 'uid', rules: { required: false } },
    name: <FieldInterface>{ name: 'name', label: 'Name', rules: { required: true } },
    entityName: <FieldInterface>{ name: 'entityName', label: 'Table Name', rules: { required: true } },
    description: <FieldInterface>{ name: 'description', label: 'Description', rules: { required: false } },
    icon: <FieldInterface>{ name: 'icon', label: 'icon', rules: { required: false } },
  };

  @Input() userdata: any;
  @Input() submitButtonLabel = 'UPDATE';
  @Input() hideCancelButton: boolean;
  @Output() cancelCallBack = new EventEmitter();
  @Output() afterSave = new EventEmitter();

  constructor(private _fb: FormBuilder,
    private userTypeService: UsertypeService,
    private activatedRoute: ActivatedRoute, private tssFormService: TssFormService) {
    tssFormService.buildFormControl(this.formData, this.usertypeForm);

  }

  /**
   * Detect change of variable/s belonging to component
   * @param changes Angular object to detect change
   * @author-Abhilash
   */
  ngOnChanges(changes: SimpleChanges) {
    if ((this.userdata && this.userdata !== undefined && this.userdata !== null) && changes.hasOwnProperty('userdata')) {
      this.usertypeForm.patchValue(this.userdata);
    }
  }

  ngOnInit() {
    if (this.userdata !== '') {
      this.submitButtonLabel = 'UPDATE';
      if (this.userdata && this.userdata !== undefined && this.userdata !== null) {
        this.usertypeForm.patchValue(this.userdata);
      }
      // remove validation for entityName/table name
      this.tssFormService.removeValidation(this.formData.entityName, this.usertypeForm);
    } else {
      this.submitButtonLabel = 'CREATE';
      // add validation for entityName/table name
      this.tssFormService.addValidation(this.formData.entityName, this.usertypeForm, Validators.required);
      this.usertypeForm.patchValue({});
    }
  }

  /**
   * Save user type for list add/edit or properties page
   * @param valid form validation
   * @param value Form value
   * @author-Abhilash
   */
  saveUserType(valid, value) {
    if (this.tssFormService.checkValidation(this.usertypeForm)) {
      // default icon if no icon is set
      if (value.icon === null || value.icon === '') {
        value.icon = 'fa-question-circle';
      }
      if (this.userdata) {
        this.userTypeService.updateUserType(value).subscribe((res) => {
          if (res) {
            this.afterSave.emit(value);
            this.cancelCallBack.emit(false);
          }
        });
      } else {
        this.userTypeService.addUserType(value).subscribe((res) => {
          if (res) {
            this.afterSave.emit(value);
            this.cancelCallBack.emit(false);
          }
        });
      }
    }
  }
  /**
   * Cancel call back when cancel or close is clicked
   * @author-Abhilash
   */
  cancelCallbackFunction() {
    this.cancelCallBack.emit(false);
  }
}
