import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssoicateTrainigDataComponent } from './view-assoicate-trainig-data.component';

describe('ViewAssoicateTrainigDataComponent', () => {
  let component: ViewAssoicateTrainigDataComponent;
  let fixture: ComponentFixture<ViewAssoicateTrainigDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssoicateTrainigDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssoicateTrainigDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
