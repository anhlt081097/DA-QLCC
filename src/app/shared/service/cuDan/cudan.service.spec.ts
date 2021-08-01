import { TestBed } from '@angular/core/testing';

import { CudanService } from './cudan.service';

describe('CudanService', () => {
  let service: CudanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CudanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
