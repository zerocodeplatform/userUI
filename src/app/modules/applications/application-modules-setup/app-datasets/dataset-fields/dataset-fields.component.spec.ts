import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetFieldsComponent } from './dataset-fields.component';

describe('DatasetFieldsComponent', () => {
  let component: DatasetFieldsComponent;
  let fixture: ComponentFixture<DatasetFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
