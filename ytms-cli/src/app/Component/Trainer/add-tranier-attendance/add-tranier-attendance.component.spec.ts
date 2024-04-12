import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTranierAttendanceComponent } from './add-tranier-attendance.component';

describe('AddTranierAttendanceComponent', () => {
  let component: AddTranierAttendanceComponent;
  let fixture: ComponentFixture<AddTranierAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTranierAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTranierAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
