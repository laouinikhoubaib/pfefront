import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBackofficeComponent } from './admin-dashboard-backoffice.component';

describe('AdminDashboardBackofficeComponent', () => {
  let component: AdminDashboardBackofficeComponent;
  let fixture: ComponentFixture<AdminDashboardBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardBackofficeComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
