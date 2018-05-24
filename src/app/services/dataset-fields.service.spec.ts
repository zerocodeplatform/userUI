import { TestBed, inject } from '@angular/core/testing';

import { DatasetFieldsService } from './dataset-fields.service';

describe('DatasetFieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasetFieldsService]
    });
  });

  it('should be created', inject([DatasetFieldsService], (service: DatasetFieldsService) => {
    expect(service).toBeTruthy();
  }));
});
