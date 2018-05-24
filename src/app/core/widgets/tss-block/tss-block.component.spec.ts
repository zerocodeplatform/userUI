import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TssBlockComponent } from './tss-block.component';

describe('TssBlockComponent', () => {
  let component: TssBlockComponent;
  let fixture: ComponentFixture<TssBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TssBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TssBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
