import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyCheckboxComponent } from './checkbox.component';

describe('DyCheckboxComponent', () => {
  let component: DyCheckboxComponent;
  let fixture: ComponentFixture<DyCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
