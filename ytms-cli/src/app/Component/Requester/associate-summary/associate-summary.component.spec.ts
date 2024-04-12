import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateSummaryComponent } from './associate-summary.component';

describe('AssociateSummaryComponent', () => {
  let component: AssociateSummaryComponent;
  let fixture: ComponentFixture<AssociateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
