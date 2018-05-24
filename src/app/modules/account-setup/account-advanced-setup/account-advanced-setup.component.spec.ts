import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdvancedSetupComponent } from './account-advanced-setup.component';

describe('AccountAdvancedSetupComponent', () => {
  let component: AccountAdvancedSetupComponent;
  let fixture: ComponentFixture<AccountAdvancedSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAdvancedSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAdvancedSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
