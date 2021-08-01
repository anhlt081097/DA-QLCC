import { TestBed } from '@angular/core/testing';

import { CanhoService } from './canho.service';

describe('CanhoService', () => {
  let service: CanhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
