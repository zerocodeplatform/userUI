import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TssFormComponent } from './tss-form.component';

describe('TssFormComponent', () => {
  let component: TssFormComponent;
  let fixture: ComponentFixture<TssFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TssFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TssFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
