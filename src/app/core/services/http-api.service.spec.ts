import { TestBed } from '@angular/core/testing';
import { HttpAPIService } from './http-api.service';

describe('HttpAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpAPIService = TestBed.inject(HttpAPIService);
    expect(service).toBeTruthy();
  });
});
