import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationModulesSetupComponent } from './application-modules-setup.component';

describe('ApplicationModulesSetupComponent', () => {
  let component: ApplicationModulesSetupComponent;
  let fixture: ComponentFixture<ApplicationModulesSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationModulesSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationModulesSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
