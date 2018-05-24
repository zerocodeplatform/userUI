import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTreeNodeComponent } from './block-tree-node.component';

describe('BlockTreeNodeComponent', () => {
  let component: BlockTreeNodeComponent;
  let fixture: ComponentFixture<BlockTreeNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTreeNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
