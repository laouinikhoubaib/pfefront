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
import {ClientService} from '../../service/client.service';


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
    displayDialog = false;
    contract = new Reservation();
    vehiculeId: number;
    today = new Date();
    month = this.today.getMonth();
    year = this.today.getFullYear();
    isValidd: any;
    list: any;
    datenow = new Date();
    dateValid: boolean = true;
    datedebut!: any;
    datefi!: any;
    datefin!: any;
    DateValidStartdateAndEnddate: boolean = true;
    DisabledBouton!: boolean;
    nbjour!: any;
    selectedVehiculeId: number;
    clientNom: string;
    clients: Client[] = [];

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
        this.selectedVehiculeId = vehiculeId;
        setTimeout(() => {
            const url = 'listVehiculesUtilitaires/' + this.selectedVehiculeId + '/ajout';
            this.router.navigateByUrl(url);
        }, 0);
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
                this.router.navigate(['listeReservation', contratId]);
            }
        });
    }

    validationDate(event: any) {
        var dateAtt = new Date(event.target.value);
        this.datedebut = new Date(event.target.value);
        var datefi = new Date(event.target.value);
        var dateStatique = '2043-06-15';
        var a = this.datenow.getTime();
        var b = dateAtt.getTime();
        var x = event.target.value;
        var y = dateStatique;
        this.validation(x, dateStatique);
        console.log(a);
        console.log(b);
        if (b > a) {
            this.dateValid = false;
        } else {
            this.dateValid = true;
        }
    }
    validation(startdatee: any, enddatee: any){
        this.rentalService.reservationIsValid(startdatee, enddatee).subscribe((res: any) => {
            console.log('*******' + res);
            if (res == true){
                this.DisabledBouton = false;
            }else {
                this.DisabledBouton = true;
            }
        });
    }
    dateIsValid(): boolean{
        this.datefin = this.addDaysToDate(this.datedebut, this.nbjour);
        console.log( '*****' + this.datefin);
        this.DateValidStartdateAndEnddate = this.rentalService.reservationIsValid(this.datedebut, this.datefin)
        console.log(this.DateValidStartdateAndEnddate);
        return this.rentalService.reservationIsValid(this.datedebut, this.datefin);

    }

    addDaysToDate(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }

    findAllClients() {
        this.clientService.findAllClients().subscribe(
            (clients: Client[]) => {
                this.clients = clients;
            },
            (error) => {
                console.error(error);
            }
        );
    }

}
