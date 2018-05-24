import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TssImageComponent } from './tss-image.component';

describe('TssImageComponent', () => {
  let component: TssImageComponent;
  let fixture: ComponentFixture<TssImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TssImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TssImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
