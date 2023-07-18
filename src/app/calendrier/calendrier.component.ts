import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { Reservation } from '../models/reservation';
import { ReservationServiceService } from '../service/reservation-service.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';

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
    newStartHour: number = 0;
    newStartMinute: number = 0;
    newEndHour: number = 0;
    newEndMinute: number = 0;
    reservationId: number;
    contrats: any;
    idVehicule: any;
    displayDialog = false;
    displayDialog2 = false;

    constructor(private reservationService: ReservationServiceService) { }

    ngOnInit(): void {
        this.reservationService.getReservation().subscribe(reservations => {
            this.reservations = reservations;
            this.eventSettings = { dataSource: this.ReservationsCalendar() };
        });
        this.getContrat();
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
        args.cancel = true;
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

    getContrat() {
        this.reservationService.getReservation().subscribe(res => {
            this.contrats = res;
            this.contrats = this.contrats.filter((i: any) => {
                return i.reservationVehicule == this.idVehicule;
            });
            console.log(this.contrats);
        });
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

    openDialog(reservationId: number) {
        this.reservationId = reservationId;
        this.newStartHour = 0;
        this.newStartMinute = 0;
        this.displayDialog = true;
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

    openDialog2(reservationId: number) {
        this.reservationId = reservationId;
        this.newEndHour = 0;
        this.newEndMinute = 0;
        this.displayDialog2 = true;
    }

    generatePDFFromDiv(): void {
        const dialogContainerElement = this.dialogContainer.nativeElement;
        const options = {
            scale: 3,
            useCORS: true,
        };

        html2canvas(dialogContainerElement, options).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png', 1.0);
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Contrat_${this.selectedReservation?.reservid}.pdf`);
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

    deleteReservation(reservationId: number): void {
        if (confirm('Êtes-vous sûr de vouloir annuler cette réservation?')) {
            this.reservationService.deleteReservation(reservationId).subscribe(
                () => {
                    window.location.reload();
                },
                (error) => {
                    console.log('Erreur lors de l annulation de la réservation :', error);
                }
            );
        }
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
}
