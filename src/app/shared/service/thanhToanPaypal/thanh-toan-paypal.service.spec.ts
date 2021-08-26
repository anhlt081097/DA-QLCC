import { TestBed } from '@angular/core/testing';

import { ThanhToanPaypalService } from './thanh-toan-paypal.service';

describe('ThanhToanPaypalService', () => {
  let service: ThanhToanPaypalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThanhToanPaypalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
