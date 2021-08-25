import { TestBed } from '@angular/core/testing';

import { ThongBaoService } from './thong-bao.service';

describe('ThongBaoService', () => {
  let service: ThongBaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongBaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
