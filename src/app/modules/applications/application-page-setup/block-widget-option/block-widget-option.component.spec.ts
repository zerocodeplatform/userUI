import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockWidgetOptionComponent } from './block-widget-option.component';

describe('BlockWidgetOptionComponent', () => {
  let component: BlockWidgetOptionComponent;
  let fixture: ComponentFixture<BlockWidgetOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockWidgetOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockWidgetOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
