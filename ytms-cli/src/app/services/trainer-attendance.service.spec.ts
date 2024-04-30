import { TestBed } from '@angular/core/testing';

import { TrainerAttendanceService } from './trainer-attendance.service';

describe('TrainerAttendanceService', () => {
  let service: TrainerAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
