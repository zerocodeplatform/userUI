import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModulePropertiesComponent } from './app-module-properties.component';

describe('AppModulePropertiesComponent', () => {
  let component: AppModulePropertiesComponent;
  let fixture: ComponentFixture<AppModulePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppModulePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModulePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
