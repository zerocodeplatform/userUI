import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TssMultiStepFormComponent } from './tss-multi-step-form.component';

describe('TssMultiStepFormComponent', () => {
  let component: TssMultiStepFormComponent;
  let fixture: ComponentFixture<TssMultiStepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TssMultiStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TssMultiStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
