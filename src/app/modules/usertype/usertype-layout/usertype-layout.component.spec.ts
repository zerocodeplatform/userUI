import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypeLayoutComponent } from './usertype-layout.component';

describe('UsertypeLayoutComponent', () => {
  let component: UsertypeLayoutComponent;
  let fixture: ComponentFixture<UsertypeLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
