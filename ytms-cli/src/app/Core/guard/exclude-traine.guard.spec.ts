import { TestBed } from '@angular/core/testing';
import { ExcludeTrainerGuard } from './exclude-trainer.guard';


describe('AssociateManagementGuard', () => {
  let guard: ExcludeTrainerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExcludeTrainerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
