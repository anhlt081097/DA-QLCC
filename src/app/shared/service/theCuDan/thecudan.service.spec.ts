import { TestBed } from '@angular/core/testing';

import { ThecudanService } from './thecudan.service';

describe('ThecudanService', () => {
  let service: ThecudanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThecudanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
