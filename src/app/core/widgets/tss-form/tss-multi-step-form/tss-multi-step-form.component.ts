import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-tss-multi-step-form',
  templateUrl: './tss-multi-step-form.component.html',
  styleUrls: ['./tss-multi-step-form.component.scss']
})
export class TssMultiStepFormComponent implements OnInit {
  @Input() options: any;
  activedStep = 0;
  model = {};
  steps: StepType[] = [];

  form = new FormArray(this.steps.map(() => new FormGroup({})));
  formOptions = this.steps.map(() => <FormlyFormOptions>{});

  constructor(private router: Router) { }

  ngOnInit() {
    this.steps = this.options.fields;
    this.form = new FormArray(this.steps.map(() => new FormGroup({})));
  }

  prevStep(step) {
    this.activedStep = step - 1;
  }

  nextStep(step) {
    this.activedStep = step + 1;
  }

  submit() {
    if (this.form.valid) {
      this.router.navigate(['/page/' + this.options.navigateTo]);
    }
  }

}
