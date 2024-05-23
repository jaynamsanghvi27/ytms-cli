import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentDeatilsComponent } from './absent-deatils.component';

describe('AbsentDeatilsComponent', () => {
  let component: AbsentDeatilsComponent;
  let fixture: ComponentFixture<AbsentDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsentDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
