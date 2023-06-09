import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAdminDashboardBackofficeComponent } from './franchise-admin-dashboard-backoffice.component';

describe('AdminDashboardBackofficeComponent', () => {
  let component: FAdminDashboardBackofficeComponent;
  let fixture: ComponentFixture<FAdminDashboardBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAdminDashboardBackofficeComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAdminDashboardBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
