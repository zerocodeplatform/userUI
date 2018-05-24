import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyFormComponent } from './form.component';

describe('InputsComponent', () => {
  let component: DyFormComponent;
  let fixture: ComponentFixture<DyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
