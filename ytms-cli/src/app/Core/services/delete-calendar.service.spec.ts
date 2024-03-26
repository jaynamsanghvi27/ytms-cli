import { TestBed } from '@angular/core/testing';

import { DeleteCalendarService } from './delete-calendar.service';

describe('DeleteCalendarService', () => {
  let service: DeleteCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
