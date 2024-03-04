import { TestBed } from '@angular/core/testing';

import { TrainingRequestService } from './training-request.service';

describe('TrainingRequestService', () => {
  let service: TrainingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
