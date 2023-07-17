import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { Reservation } from '../models/reservation';
import { ReservationServiceService } from '../service/reservation-service.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
    selector: 'app-reservation-calendar',
    templateUrl: './calendrier.component.html',
    styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
    @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;
    @ViewChild('dialogContainer', { static: true }) dialogContainer!: ElementRef;

    eventSettings: EventSettingsModel;
    public selectedDate: Date = new Date();
    public reservations: Reservation[];
    public selectedReservationId: number;
    public isDialogVisible = false;
    public selectedReservation: Reservation | null = null;

    constructor(private reservationService: ReservationServiceService) { }

    ngOnInit(): void {
        this.reservationService.getReservation().subscribe(reservations => {
            this.reservations = reservations;
            this.eventSettings = { dataSource: this.ReservationsCalendar() };
        });
    }

    ReservationsCalendar(): object[] {
        return this.reservations.map(reservation => {
            const endDateTime = reservation.datefin ? new Date(reservation.datefin) : new Date(reservation.datedebut);
            return {
                Id: reservation.reservid,
                Subject: 'reservation ' + reservation.reservid,
                StartTime: new Date(reservation.datedebut),
                EndTime: new Date(endDateTime),
            };
        });
    }

    onReservationClick(args: any): void {
        this.selectedReservationId = args.event.Id;
        this.selectedReservation = this.reservations.find(reservation => reservation.reservid === this.selectedReservationId) || null;
        console.log(this.selectedReservation);
        this.isDialogVisible = true;
    }

    showContractImage(): void {
        const op = {
            background: 'white',
            scale: 3
        };

        html2canvas(document.getElementById('pdff'), op).then(canvas => {
            document.body.appendChild(canvas);
        });
    }

    showContractPDF(reservation: Reservation): void {
        const op = {
            background: 'white',
            scale: 3
        };

        html2canvas(document.getElementById('pdff'), op).then(async canvas => {
            const myImage = await canvas.toDataURL('image/png');
            const myPdf = new jsPDF('p', 'mm', 'a4');
            const width = await myPdf.internal.pageSize.getWidth();
            const height = await canvas.height * width / canvas.width;
            myPdf.addImage(myImage, 'PNG', 0, 0, width, height);
            myPdf.save(`Contrat_${reservation.reservid}.pdf`);
        });
    }
    closeDialog(): void {
        this.isDialogVisible = false;
    }
}
