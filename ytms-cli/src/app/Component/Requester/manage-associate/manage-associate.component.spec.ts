import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssociateComponent } from './manage-associate.component';

describe('ManageAssociateComponent', () => {
  let component: ManageAssociateComponent;
  let fixture: ComponentFixture<ManageAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAssociateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
