import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCustomFormComponent } from './ui-custom-form.component';

describe('UiCustomFormComponent', () => {
  let component: UiCustomFormComponent;
  let fixture: ComponentFixture<UiCustomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiCustomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
