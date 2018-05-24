import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TssMenuComponent } from './tss-menu.component';

describe('TssMenuComponent', () => {
  let component: TssMenuComponent;
  let fixture: ComponentFixture<TssMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TssMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TssMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
