import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReservationAdminComponent } from './liste-reservation-admin.component';

describe('ListeReservationComponent', () => {
  let component: ListeReservationAdminComponent;
  let fixture: ComponentFixture<ListeReservationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeReservationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReservationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
