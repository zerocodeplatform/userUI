import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class ToasterService {

  constructor(private messageService: MessageService) { }
  /**
   * @param {string} [type]
   * @param {string} [title]
   * @param {string} [message]
   * @memberof ToasterService
   */
  show(type?: string, title?: string, message?: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }
  /**
   *
   *
   * @memberof ToasterService
   */
  clearAll() {
    this.messageService.clear();
  }

}
