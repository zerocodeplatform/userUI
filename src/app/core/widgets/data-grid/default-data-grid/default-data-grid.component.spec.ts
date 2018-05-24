import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDataGridComponent } from './default-data-grid.component';

describe('DefaultDataGridComponent', () => {
  let component: DefaultDataGridComponent;
  let fixture: ComponentFixture<DefaultDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
