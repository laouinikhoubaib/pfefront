import {Component, OnInit} from '@angular/core';
import {EventSettingsModel} from '@syncfusion/ej2-angular-schedule';
import {Reservation} from '../models/reservation';
import {ReservationServiceService} from '../service/reservation-service.service';

@Component({
    selector: 'app-reservation-calendar',
    templateUrl: './calendrier.component.html',
    styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {


    eventSettings: EventSettingsModel;


    public selectedDate: Date = new Date();


    constructor(private reservationService: ReservationServiceService) {
    }

    ngOnInit(): void {
        this.reservationService.getReservation().subscribe(reservations => {
           this.eventSettings = { dataSource : this.ReservationsCalendar(reservations) };
        });

        console.log(this.selectedDate);
        console.log(this.eventSettings);
    }

    ReservationsCalendar(reservations: Reservation[]): object[] {
        return reservations.map(reservation => {

            const endDateTime = reservation.datefin ? new Date(reservation.datefin) : new Date(reservation.datedebut);
            return {
                Id: reservation.reservid,
                Subject: 'reservation ' + reservation.reservid,
                StartTime: new Date(reservation.datedebut),
                EndTime: new Date(endDateTime),
            };

        });
    }
}
