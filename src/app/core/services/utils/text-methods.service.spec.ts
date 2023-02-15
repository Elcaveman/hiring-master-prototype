import { TestBed } from '@angular/core/testing';

import { TextMethodsService } from './text-methods.service';

describe('TextMethodsService', () => {
  let service: TextMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
