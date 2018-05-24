import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyInputComponent } from './input.component';

describe('DyInputComponent', () => {
  let component: DyInputComponent;
  let fixture: ComponentFixture<DyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
