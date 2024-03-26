import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainerFormComponent } from './view-trainer-form.component';

describe('ViewTrainerFormComponent', () => {
  let component: ViewTrainerFormComponent;
  let fixture: ComponentFixture<ViewTrainerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrainerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
