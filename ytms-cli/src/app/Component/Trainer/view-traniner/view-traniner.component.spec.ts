import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraninerComponent } from './view-traniner.component';

describe('ViewTraninerComponent', () => {
  let component: ViewTraninerComponent;
  let fixture: ComponentFixture<ViewTraninerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTraninerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTraninerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
