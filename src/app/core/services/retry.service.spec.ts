import { TestBed } from '@angular/core/testing';

import { RetryService } from './retry.service';

describe('RetryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetryService = TestBed.inject(RetryService);
    expect(service).toBeTruthy();
  });
});
