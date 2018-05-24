import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyRadioComponent } from './radio.component';

describe('DyRadioComponent', () => {
  let component: DyRadioComponent;
  let fixture: ComponentFixture<DyRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
