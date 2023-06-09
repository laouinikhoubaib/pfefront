import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAdminDashboardBackofficeComponent } from './super-admin-dashboard-backoffice.component';

describe('AdminDashboardBackofficeComponent', () => {
  let component: SAdminDashboardBackofficeComponent;
  let fixture: ComponentFixture<SAdminDashboardBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAdminDashboardBackofficeComponent ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAdminDashboardBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
