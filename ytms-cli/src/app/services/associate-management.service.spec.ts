import { TestBed } from '@angular/core/testing';

import { AssociateManagementService } from './associate-management.service';

describe('AssociateManagementService', () => {
  let service: AssociateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
