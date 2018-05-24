import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyDatePickerComponent } from './date-picker.component';

describe('DyDatePickerComponent', () => {
  let component: DyDatePickerComponent;
  let fixture: ComponentFixture<DyDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
