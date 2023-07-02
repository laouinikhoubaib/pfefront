import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReservationFranchiseAdminComponent } from './liste-reservation.component';

describe('ListeReservationFranchiseAdminComponent', () => {
  let component: ListeReservationFranchiseAdminComponent;
  let fixture: ComponentFixture<ListeReservationFranchiseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeReservationFranchiseAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReservationFranchiseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
