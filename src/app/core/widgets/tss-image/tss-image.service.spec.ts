import { TestBed, inject } from '@angular/core/testing';

import { TssImageService } from './tss-image.service';

describe('TssImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TssImageService]
    });
  });

  it('should be created', inject([TssImageService], (service: TssImageService) => {
    expect(service).toBeTruthy();
  }));
});
