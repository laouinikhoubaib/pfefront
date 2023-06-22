import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationServiceService } from 'src/app/service/reservation-service.service';
import {VehiculeService} from '../../service/vehicule.service';
import {Vehicule} from '../../models/vehicule';
import {Categorie} from '../../models/categorie';


@Component({
  selector: 'app-liste-vehiculeutilitaire',
  templateUrl: './liste-vehiculevoiture.component.html',
  styleUrls: ['./liste-vehiculevoiture.component.css']
})
export class ListeVehiculeVoitureFrontComponent implements OnInit {

  title = 'Angular Search Using ng2-search-filter';
  searchText!: any;
  voitureVehicules: Vehicule[] = [];


  constructor(private formBuilder: FormBuilder, private service: VehiculeService) { }

  ngOnInit(): void {

    this.getVehiculesByLocationVoiture();

  }
  getVehiculesByLocationVoiture(): void {
    this.service.getVehiculesByLocationVoiture()
        .subscribe(vehicules => {
          this.voitureVehicules = vehicules;
        });
  }

}
