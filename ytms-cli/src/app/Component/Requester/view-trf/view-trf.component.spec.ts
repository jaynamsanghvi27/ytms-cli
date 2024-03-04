import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrfComponent } from './view-trf.component';

describe('ViewTrfComponent', () => {
  let component: ViewTrfComponent;
  let fixture: ComponentFixture<ViewTrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
