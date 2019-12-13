import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import {MatSnackBarModule} from '@angular/material';

describe('HttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatSnackBarModule]
  }));

  it('should be created', () => {
    const service: HttpInterceptorService = TestBed.get(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
