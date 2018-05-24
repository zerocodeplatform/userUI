import { TestBed, inject } from '@angular/core/testing';

import { PageSetupService } from './page-setup.service';

describe('PageSetupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageSetupService]
    });
  });

  it('should be created', inject([PageSetupService], (service: PageSetupService) => {
    expect(service).toBeTruthy();
  }));
});
