import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDatasetsComponent } from './app-datasets.component';

describe('AppDatasetsComponent', () => {
  let component: AppDatasetsComponent;
  let fixture: ComponentFixture<AppDatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDatasetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
