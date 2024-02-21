import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequesterCalendarComponent} from './requester-calendar.component';

describe('RequesterCalendarComponent', () => {
  let component: RequesterCalendarComponent;
  let fixture: ComponentFixture<RequesterCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequesterCalendarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequesterCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
