import { TestBed } from '@angular/core/testing';

import { AdrProfessionalService } from './adr-professional.service';

describe('AdrProfessionalService', () => {
  let service: AdrProfessionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdrProfessionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
