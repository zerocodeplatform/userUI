import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypeUsersComponent } from './usertype-users.component';

describe('UsertypeUsersComponent', () => {
  let component: UsertypeUsersComponent;
  let fixture: ComponentFixture<UsertypeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
