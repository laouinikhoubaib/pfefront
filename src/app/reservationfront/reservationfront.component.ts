import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservationServiceService} from '../service/reservation-service.service';
import {Observable, Subscription} from 'rxjs/dist/types';
import {Reservation} from '../models/reservation';
import Swal from 'sweetalert2';
import {Vehicule} from '../models/vehicule';


@Component({
  selector: 'app-reservationfront',
  templateUrl: './reservationfront.component.html',
  styleUrls: ['./reservationfront.component.scss']
})
export class ReservationfrontComponent implements OnInit {


  reservations: Reservation[];
  reservation: Reservation;
  reservationId: number;
  newStartHour: number = 0;
  newStartMinute: number = 0;
  displayDialog = false;
  contrats: any;
  idVehicule: any;
  displayDialog2 = false;
  newEndHour: number = 0;
  newEndMinute: number = 0;
  searchQuery: string = '';
  filteredReservations: Reservation  [] = [];
  public reservationss: Reservation[];
  private routeSub: Subscription;


  constructor(
      private route: ActivatedRoute,
      private service: ReservationServiceService,
      private reservationService: ReservationServiceService
  ) { }

  ngOnInit(): void {
   this.getContrat();
    this.service.getReservation().subscribe(
        (reservations: Reservation[]) => {
          this.reservations = reservations;
          this.filteredReservations = reservations;
        },
        error => {
          console.log('Erreur de trouver vehicles:', error);
        }
    );
  }

  onSearchQueryChanged() {
    this.updateFilteredVehicles();
  }
  updateFilteredVehicles() {
    if (!this.searchQuery) {
      this.filteredReservations = this.reservations;
      return;
    }

    this.filteredReservations = this.reservations.filter(reservation =>
        reservation.matricule?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.categorie?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getContrat() {
    this.reservationService.getReservation().subscribe(res => {
      this.contrats = res;
      this.contrats = this.contrats.filter((i: any) => {
        return i.reservationVehicule == this.idVehicule;
      });
      console.log(this.contrats);
    });
  }

  openDialog(reservationId: number) {
    this.reservationId = reservationId;
    this.newStartHour = 0;
    this.newStartMinute = 0;
    this.displayDialog = true;
  }
  updateReservationTime() {
    const newStartHour = this.newStartHour;
    const newStartMinute = this.newStartMinute;

    this.reservationService.updateReservationTime(this.reservationId, newStartHour, newStartMinute)
        .subscribe(
            () => {
              this.getContrat();
              this.successNotification();
            },
        );
  }
  successNotification() {
    Swal.fire({
      text: 'Modification faites  avec succès!',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
  openDialog2(reservationId: number) {
    this.reservationId = reservationId;
    this.newEndHour = 0;
    this.newEndMinute = 0;
    this.displayDialog2 = true;
  }
  updateReservationTimeTermine() {
    const newEndHour = this.newEndHour;
    const newEndMinute = this.newEndMinute;

    this.reservationService.updateReservationTimeTermine(this.reservationId, newEndHour, newEndMinute)
        .subscribe(
            () => {
              this.getContrat();
              this.successNotification();
            },
        );
  }

  onClickTelechargerContratPDF(reservid: number) {
    this.reservations.forEach((reservation) => {
      this.reservationService.telechargerContratPDF(reservation.reservid).subscribe(response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        window.open(url);
      });
    });
  }
  onClickTelechargerFacturePDF(reservid: number) {
    this.reservations.forEach((reservation) => {
      this.reservationService.telechargerFacturePDF(reservation.reservid).subscribe(response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        window.open(url);
      });
    });
  }
}
