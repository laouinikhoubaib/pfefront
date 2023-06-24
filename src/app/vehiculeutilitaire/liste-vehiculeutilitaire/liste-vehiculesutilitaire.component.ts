import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationServiceService } from 'src/app/service/reservation-service.service';
import {VehiculeService} from '../../service/vehicule.service';
import {Vehicule} from '../../models/vehicule';
import {Categorie} from '../../models/categorie';
import {User} from '../../models/user.model';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-liste-vehiculeutilitaire',
  templateUrl: './liste-vehiculesutilitaire.component.html',
  styleUrls: ['./liste-vehiculesutilitaire.component.css']
})
export class ListeVehiculeUtilitaireFrontComponent implements OnInit {

  title = 'Angular Search Using ng2-search-filter';
  searchText: string;
  utilitaireVehicules: Vehicule[] = [];
  currentUser: User;
  nomAgence: string;
  userId: number;


  constructor(private formBuilder: FormBuilder, private service: VehiculeService, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((user: User) => {
            this.currentUser = user;
            this.userId = user.userId;

            if (user.agence) {
                this.nomAgence = user.agence.nom;
            } else {
                this.userService.getAgencyNameByUserId(user.userId).subscribe((data: any) => {
                    this.nomAgence = data.nom;
                }, err => {
                    console.error(err);
                    this.nomAgence = '';
                });
            }

            this.getVehiculesByLocationUtilitaire();
        });
    }
    getVehiculesByLocationUtilitaire(): void {
        if (this.currentUser) {
            if (this.currentUser.agence) {
                this.service.getVoitureVehiculesByCurrentUser().subscribe(vehicules => {
                    this.utilitaireVehicules = vehicules;
                });
            } else {
                this.service.getUtilitaireVehiculesByAgence(this.currentUser.userId).subscribe(vehicules => {
                    this.utilitaireVehicules = vehicules;
                });
            }
        }
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
