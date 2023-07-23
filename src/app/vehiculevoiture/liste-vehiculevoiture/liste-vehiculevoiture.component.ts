import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationServiceService } from 'src/app/service/reservation-service.service';
import {VehiculeService} from '../../service/vehicule.service';
import {Vehicule} from '../../models/vehicule';
import {Categorie} from '../../models/categorie';
import {User} from '../../models/user.model';
import {UserService} from '../../service/user.service';
import {Reservation} from '../../models/reservation';
import {AuthenticationService} from '../../service/authentication.service';
import Swal from 'sweetalert2';
import {Client} from '../../models/client';
import {Role} from '../../models/role.enum';
import {ClientService} from '../../service/client.service';
import {Agence} from '../../models/agence';
import {AgenceService} from '../../service/agence.service';


@Component({
  selector: 'app-liste-vehiculeutilitaire',
  templateUrl: './liste-vehiculevoiture.component.html',
  styleUrls: ['./liste-vehiculevoiture.component.css']
})
export class ListeVehiculeVoitureFrontComponent implements OnInit {

    searchText!: any;
    voitureVehicules: Vehicule[] = [];
    currentUser: User;
    nomAgence: string;
    userId: number;
    displayDialog = false;
    contract = new Reservation();
    client = new Client();
    vehiculeId: number;
    list: any;
    selectedVehiculeId: number;
    clientNom: string;
    displayDialogclient = false;
    clientParsed: string = '';
    listagence: Agence[];
    agenceNom: string;
    agence: Agence;
    errorMessage: string = '';
    clients: Client[] = [];
    filteredClients: Client  [] = [];
    searchQuery: string = '';
    selectedClient: Client;


  constructor(private formBuilder: FormBuilder,
              private service: VehiculeService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute,
              private rentalService: ReservationServiceService,
              private authService: AuthenticationService,
              private servicea: AgenceService,
              private clientService: ClientService) {
      this.vehiculeId = this.route.snapshot.params['id'];
      this.authService.currentUser.subscribe(data => {
          this.currentUser = data;
      });
  }

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
            this.rentalService.getReservation().subscribe(
                (res) => {
                    this.list = res;
                    console.log(res);
                });

            this.getVehiculesByLocationVoiture();
        });

        this.getAgences();
        this.findAllClients();

    }

    getAgences() {
        this.servicea.getAgences().subscribe(res => {
            console.log(res);
            this.listagence = res;
        });
    }
    openDialogclient() {
        this.displayDialogclient = true;
    }
       getVehiculesByLocationVoiture(): void {
        if (this.currentUser && this.currentUser.agence) {
            this.service.getVoitureVehiculesByCurrentUser().subscribe(vehicules => {
                this.voitureVehicules = vehicules;
            });
        } else if (this.currentUser && this.currentUser.userId) {
            this.service.getVoitureVehiculesByAgence(this.currentUser.userId).subscribe(vehicules => {
                this.voitureVehicules = vehicules;
            });
        }
    }

    openDialog(vehiculeId: number) {
        this.vehiculeId = vehiculeId;
        this.displayDialog = true;
    }
    addRentalContrat() {
        const client: Client = new Client();
        client.nom = this.clientNom;
        this.contract.client = client;

        this.rentalService.addReservations(this.contract, this.vehiculeId, this.userId, this.clientNom).subscribe(
            (res: any) => {
                const contratId = res.contrat;
                this.successNotification(contratId);
            },
            (error) => {
                this.alertError();
            }
        );
    }
    alertError(errorMessage: string = 'Erreur détécté lors de la réservation, veuillez vérifier la disponibilité') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
        });
    }
    successNotification(contratId: number) {
        Swal.fire('Réservation ajouté avec succès!').then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['/listReservationFront']);
            }
        });
    }

    addClient(){
      this.clientParsed = JSON.stringify(this.client);
      this.clientService.addClient(this.clientParsed, this.nomAgence).subscribe(data => {
                this.router.navigate(['/']).then(() => {
                });
                this.successNotificationt(); },
                   );
        this.errorMessage = 'Erreur est survenue  veuillez vérifier';
    }
    successNotificationt() {
        Swal.fire({
            text: 'Client ajouté avec succès!',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    }

    findAllClients() {
        this.clientService.findAllClients().subscribe(
            (clients: Client[]) => {
                this.clients = clients;
                this.filteredClients = clients;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onSearchQueryChanged() {
        this.updateFilteredVehicles();
    }
    updateFilteredVehicles() {
        if (!this.searchQuery) {
            this.filteredClients = this.clients;
            return;
        }

        this.filteredClients = this.clients.filter(client =>
            client.nom?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            client.prenom?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
    selectClient(client: Client) {
        this.selectedClient = client;
        this.clientNom = `${client.nom}`;
        this.displayDialogclient = false;
    }

}
