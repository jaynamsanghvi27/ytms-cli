import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNominationComponent } from './edit-nomination.component';

describe('EditNominationComponent', () => {
  let component: EditNominationComponent;
  let fixture: ComponentFixture<EditNominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNominationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
