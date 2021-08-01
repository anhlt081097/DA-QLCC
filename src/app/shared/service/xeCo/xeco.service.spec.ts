import { TestBed } from '@angular/core/testing';

import { XecoService } from './xeco.service';

describe('XecoService', () => {
  let service: XecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
