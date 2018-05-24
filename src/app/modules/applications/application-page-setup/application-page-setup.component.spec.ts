import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPageSetupComponent } from './application-page-setup.component';

describe('ApplicationPageSetupComponent', () => {
  let component: ApplicationPageSetupComponent;
  let fixture: ComponentFixture<ApplicationPageSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationPageSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationPageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
