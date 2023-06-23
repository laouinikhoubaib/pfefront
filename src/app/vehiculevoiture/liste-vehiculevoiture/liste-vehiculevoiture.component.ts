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


  constructor(private formBuilder: FormBuilder, private service: VehiculeService, private router: Router) { }

  ngOnInit(): void {

    this.getVehiculesByLocationVoiture();

  }
  getVehiculesByLocationVoiture(): void {
    this.service.getVehiculesByLocationVoiture()
        .subscribe(vehicules => {
          this.voitureVehicules = vehicules;
        });
  }

  detail(data: any){
    console.log(data);
    const url = 'listeReservation/' + data.vehiculeId + '/ajout' ;
    this.router.navigateByUrl(url);
  }

  disponile(data: any) {
    console.log(data.vehiculeId);
    this.service.getDisponible(data.vehiculeId).subscribe(
        (isAvailable) => {
          if (isAvailable) {
            alert('Le véhicule est disponible');
          } else {
            alert('Le véhicule n\'est pas disponible');
          }
        },
        (error) => {
          console.log('Erreur de serveur lors de la vérification de disponibilité:', error);
          alert('Erreur de serveur lors de la vérification de disponibilité');
        }
    );
  }

}
