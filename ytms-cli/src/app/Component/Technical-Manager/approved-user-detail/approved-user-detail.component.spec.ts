import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedUserDetailComponent } from './approved-user-detail.component';

describe('ApprovedUserDetailComponent', () => {
  let component: ApprovedUserDetailComponent;
  let fixture: ComponentFixture<ApprovedUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedUserDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
