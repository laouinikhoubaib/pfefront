import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVehiculeVoitureFrontComponent } from './liste-vehiculevoiture.component';

describe('ListeVehiculeVoitureFrontComponent', () => {
  let component: ListeVehiculeVoitureFrontComponent;
  let fixture: ComponentFixture<ListeVehiculeVoitureFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVehiculeVoitureFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeVehiculeVoitureFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
