import { TestBed } from '@angular/core/testing';

import { BoPhanService } from './bo-phan.service';

describe('BoPhanService', () => {
  let service: BoPhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoPhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
