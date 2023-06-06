import { Component, OnInit } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { Reservation } from '../models/reservation';
import {ReservationServiceService} from '../service/reservation-service.service';

@Component({
    selector: 'app-reservation-calendar',
    templateUrl: './calendrier.component.html',
    styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {

    reservations: Reservation[] = [];

    eventSettings: EventSettingsModel = { dataSource: [] };

    constructor(private reservationService: ReservationServiceService) { }

    ngOnInit(): void {
        this.reservationService.getReservation().subscribe(reservations => {
            this.reservations = reservations;
            this.eventSettings.dataSource = this.mapReservationsToEvents(reservations);
        });
    }

    mapReservationsToEvents(reservations: Reservation[]): Object[] {
        return reservations.map(reservation => {
            const endDateTime = reservation.datefin ? new Date(reservation.datefin) : new Date(reservation.datedebut);
            return {
                Id: reservation.reservid,
                Subject: `Reservation ${reservation.reservid}`,
                StartTime: new Date(reservation.datedebut),
                EndTime: endDateTime,
            };
        });
    }
}
