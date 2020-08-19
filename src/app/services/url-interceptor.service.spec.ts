import { TestBed } from '@angular/core/testing';

import { UrlInterceptorService } from './url-interceptor.service';

describe('UrlInterceptorService', () => {
  let service: UrlInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
