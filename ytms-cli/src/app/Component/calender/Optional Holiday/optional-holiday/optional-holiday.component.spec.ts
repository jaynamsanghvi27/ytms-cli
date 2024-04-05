import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalHolidayComponent } from './optional-holiday.component';

describe('OptionalHolidayComponent', () => {
  let component: OptionalHolidayComponent;
  let fixture: ComponentFixture<OptionalHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionalHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionalHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
