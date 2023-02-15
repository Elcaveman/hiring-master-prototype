import { TestBed } from '@angular/core/testing';

import { TimeMethodsService } from './time-methods.service';

describe('TimeMethodsService', () => {
  let service: TimeMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
