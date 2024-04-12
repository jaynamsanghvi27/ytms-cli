import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationReqComponent } from './nomination-req.component';

describe('NominationReqComponent', () => {
  let component: NominationReqComponent;
  let fixture: ComponentFixture<NominationReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominationReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
