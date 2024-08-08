import { TestBed } from '@angular/core/testing';

import { ArbitrationServiceService } from './arbitration-service.service';

describe('ArbitrationServiceService', () => {
  let service: ArbitrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArbitrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
