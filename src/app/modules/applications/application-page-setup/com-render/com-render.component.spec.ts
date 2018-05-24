import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComRenderComponent } from './com-render.component';

describe('ComRenderComponent', () => {
  let component: ComRenderComponent;
  let fixture: ComponentFixture<ComRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
