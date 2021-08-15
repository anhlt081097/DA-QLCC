import { TestBed } from '@angular/core/testing';

import { TaikhoanService } from './taikhoan.service';

describe('TaikhoanService', () => {
  let service: TaikhoanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaikhoanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
