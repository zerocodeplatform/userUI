import { ValidationService } from '../../services/validation.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-error-messages',
  templateUrl: './form-error-messages.component.html',
  styleUrls: ['./form-error-messages.component.scss']
})
export class FormErrorMessagesComponent implements OnInit {

  @Input() control: FormControl;
  @Input() formGroup: FormGroup;
  constructor() { }
  ngOnInit() {
    // console.log('control', this.control);
  }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
