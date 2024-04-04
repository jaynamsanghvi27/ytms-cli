import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateManagementComponent } from './associate-management.component';

describe('AssociateManagementComponent', () => {
  let component: AssociateManagementComponent;
  let fixture: ComponentFixture<AssociateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
