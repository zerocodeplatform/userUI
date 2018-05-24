import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypeRolesComponent } from './usertype-roles.component';

describe('UsertypeRolesComponent', () => {
  let component: UsertypeRolesComponent;
  let fixture: ComponentFixture<UsertypeRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
