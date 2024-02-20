import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReqComponent } from './training-req.component';

describe('TrainingReqComponent', () => {
  let component: TrainingReqComponent;
  let fixture: ComponentFixture<TrainingReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
