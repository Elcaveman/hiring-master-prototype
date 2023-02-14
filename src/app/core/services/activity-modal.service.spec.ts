import { TestBed } from '@angular/core/testing';

import { ActivityModalService } from './activity-modal.service';

describe('ActivityModalService', () => {
  let service: ActivityModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
