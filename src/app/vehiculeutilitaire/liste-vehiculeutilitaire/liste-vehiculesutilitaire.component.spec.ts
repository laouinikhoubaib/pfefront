import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVehiculeUtilitaireFrontComponent } from './liste-vehiculesutilitaire.component';

describe('ListeVehiculeUtilitaireFrontComponent', () => {
  let component: ListeVehiculeUtilitaireFrontComponent;
  let fixture: ComponentFixture<ListeVehiculeUtilitaireFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVehiculeUtilitaireFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeVehiculeUtilitaireFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
