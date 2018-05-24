import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TssSlideToggleComponent } from './tss-slide-toggle.component';

describe('TssSlideToggleComponent', () => {
  let component: TssSlideToggleComponent;
  let fixture: ComponentFixture<TssSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TssSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TssSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
