import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModulePagesComponent } from './app-module-pages.component';

describe('AppModulePagesComponent', () => {
  let component: AppModulePagesComponent;
  let fixture: ComponentFixture<AppModulePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppModulePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModulePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
