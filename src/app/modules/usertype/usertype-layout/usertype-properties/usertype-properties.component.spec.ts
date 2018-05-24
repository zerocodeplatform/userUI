import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypePropertiesComponent } from './usertype-properties.component';

describe('UsertypePropertiesComponent', () => {
  let component: UsertypePropertiesComponent;
  let fixture: ComponentFixture<UsertypePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
