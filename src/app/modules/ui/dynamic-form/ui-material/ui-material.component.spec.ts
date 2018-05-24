import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMaterialComponent } from './ui-material.component';

describe('UiMaterialComponent', () => {
  let component: UiMaterialComponent;
  let fixture: ComponentFixture<UiMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
