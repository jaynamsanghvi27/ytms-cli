import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNominationComponent } from './view-nomination.component';

describe('ViewNominationComponent', () => {
  let component: ViewNominationComponent;
  let fixture: ComponentFixture<ViewNominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNominationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
