import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ReservationServiceService } from 'src/app/service/reservation-service.service';
import {VehiculeService} from '../../service/vehicule.service';
import {Vehicule} from '../../models/vehicule';
import {User} from '../../models/user.model';
import {UserService} from '../../service/user.service';
import {Reservation} from '../../models/reservation';
import {AuthenticationService} from '../../service/authentication.service';
import Swal from 'sweetalert2';
import {Client} from '../../models/client';
import {ClientService} from '../../service/client.service';


@Component({
  selector: 'app-liste-vehiculeutilitaire',
  templateUrl: './liste-vehiculesutilitaire.component.html',
  styleUrls: ['./liste-vehiculesutilitaire.component.css']
})
export class ListeVehiculeUtilitaireFrontComponent implements OnInit {


  searchText: string;
  utilitaireVehicules: Vehicule[] = [];
  currentUser: User;
  nomAgence: string;
  userId: number;
  displayDialog = false;
  contract = new Reservation();
  vehiculeId: number;
  list: any;
  selectedVehiculeId: number;
  clientNom: string;
  clients: Client[] = [];
  displayClientDialog = false;
  selectedClient: Client;
  displayDialog2 = false;
  searchQuery: string = '';
  filteredClients: Client  [] = [];
  displayDialogclient = false;

    constructor(private formBuilder: FormBuilder, private service: VehiculeService, private router: Router,
                private userService: UserService,
                private route: ActivatedRoute,
                private rentalService: ReservationServiceService,
                private authService: AuthenticationService,
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
            this.getVehiculesByLocationUtilitaire();
        });
        this.findAllClients();
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

        this.findAllClients();
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
    openDialogclient() {
        this.displayDialogclient = true;
    }
}
