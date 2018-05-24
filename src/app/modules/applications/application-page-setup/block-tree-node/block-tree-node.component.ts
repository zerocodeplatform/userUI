import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageSetupService } from '../services/page-setup.service';

@Component({
  selector: 'app-block-tree-node',
  templateUrl: './block-tree-node.component.html',
  styleUrls: ['./block-tree-node.component.scss']
})
export class BlockTreeNodeComponent implements OnInit {

  @Input() pageBlocks: any = [];
  @Output() widgetClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(private pss: PageSetupService) { }
  ngOnInit() {
  }
  onDropSuccess(event, data) {
    // this.template = event.dragData.html;
    // this.selectedTemplate = event.dragData.id;
  }
  onBlockDropSuccess($event, block) {
    console.log('dropsuc', block, $event);
    const dragData = Object.assign({}, $event.dragData);
    if (dragData.type === 'groupBlock') {
      dragData.data.forEach(b => {
        const newBlock = {
          type: 'block', data:
            [{
              child: [],
              type: 'block',
              options: Object.assign({}, b.options)
            }]
        };
        block.child.push(newBlock);
      });
    } else if (dragData.type === 'block') {
      const newBlock = {
        type: 'block', data: [{
          child: [],
          type: 'block',
          options: Object.assign({}, dragData.data.options)
        }]
      };

      block.child.push(newBlock);

    } else {
      const newBlock = {
        type: dragData.type,
        widgetName: dragData.widgetName,
        options: Object.assign({}, dragData.options)
      }
      block.child.push(newBlock);
      // block.child.push(dragData);
    }
    // console.log('event.dragData', $event.dragData);

  }
  blockClik(block) {
    // this.blockData = block;
    // this.visibleSidebar1 = true;
    this.widgetClick.emit(block);
    this.pss.setClickedBlock(block);
    console.log('block', block);
    // op.toggle(event);
  }
  delete(c, indx) {
    console.log('index', c, indx);
    c.splice(indx, 1);
  }

}
