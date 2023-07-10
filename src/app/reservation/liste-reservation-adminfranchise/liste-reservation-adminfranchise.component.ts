import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {ReservationServiceService} from '../../service/reservation-service.service';
import {Reservation} from '../../models/reservation';
import {Complaint} from '../../models/complaint';
import {Subscription} from 'rxjs/dist/types';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {Vehicule} from '../../models/vehicule';
import {VehiculeService} from '../../service/vehicule.service';
import Swal from 'sweetalert2';
import {User} from '../../models/user.model';
import {UserService} from '../../service/user.service';
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation-adminfranchise.component.html',
  styleUrls: ['./liste-reservation-adminfranchise.component.css']
})
  export class ListeReservationFranchiseAdminComponent implements OnInit {


  title = 'Angular Search Using ng2-search-filter';
  searchText!:any;
  idVehicule: any;
  reservationId: any;
  offers!: Observable<Reservation[]>;
  list: any;
  POSTS: any;
  vehiculeId: number;
  contract = new Reservation();
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  reservations: Reservation[];
  reservation: Reservation;
  private routeSub: Subscription;
  displayDialog = false;
  displayDialogg = false;
  contrats: any;
  revenu: any;
  contratDetail: any;
  show: boolean = false;
  selectedVehiculeId: number;
  revenus: { [reservationId: number]: number } = {};
  userId: number;
  datedebut!: any;
  datefin!: any;
  datenow = new Date();
  dateValid: boolean = true;
  nbjour!: any;
  DisabledBouton!: boolean;
  DateValidStartdateAndEnddate: boolean = true;
  currentUser: User;

  @ViewChild('pdf') pdf!: ElementRef;
  constructor(
      private route: ActivatedRoute,
      private service: ReservationServiceService,
      private servicev: VehiculeService,
      private userService: UserService,
      private authService: AuthenticationService,
      private router: Router
    ) { this.idVehicule = this.route.snapshot.params['id'];
        this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });

  }

  ngOnInit(): void {
    this.getContrat();
    this.servicev.calculateRevenueForUser(this.idVehicule).subscribe(
        (response) => {
          this.revenu = response;
        },
        (error) => {
          console.error(error);
        }
    );
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
      this.userId = user.userId;

      this.service.getReservation().subscribe(
          (res) => {
            this.list = res;
            console.log(res);
          });

    });
    this.getContrat();
    this.routeSub = this.service.getReservation().subscribe(res => {
      console.log(res);
      this.reservations = res;
    });

    this.service.getReservation().subscribe(res => {
      this.contrats = res;
      this.contrats = this.contrats.filter((i: any) => {
        return i.vehiculeReservation == this.idVehicule;
      });
      console.log(this.contrats);
    });
  }

  getContrat(){
    this.service.getReservation().subscribe(res => {
      this.contrats = res
      this.contrats = this.contrats.filter((i: any) => {
        return i.reservationVehicule == this.idVehicule;
      });
      console.log(this.contrats);
    });
  }

  generatePDF(item: any){
    console.log(item);
    this.show = true;
    this.contratDetail = item;
  }
  reloadData() {
    this.list = this.service.getReservation();
  }
  goToAdd(){
    const url = 'listeReservation/' + this.idVehicule + '/ajout';
    this.router.navigateByUrl(url);

  }
  loadPdfff(){
    const op = {
      backgroud : 'white',
      scale : 3
    };
    var div = document.getElementById('pdff');
    setTimeout(() =>{
      if(this.pdf){
        html2canvas(this.pdf.nativeElement , op).then(async canvas => {
          const myImage = await canvas.toDataURL('image/png');
          let myPdf = new jsPDF('p' , 'mm' , 'a4');
          var width = await myPdf.internal.pageSize.getWidth();
          var heigth = await canvas.height * width / canvas.width;
          myPdf.addImage(myImage , 'PNG' , 0 , 0 , width , heigth);
          myPdf.save('MasterclassContrat.pdf');
        });
      }
    });
  }
  addpayement(idReservation: any) {
    console.log('update', idReservation);
    this.router.navigate(['/addpayment', idReservation]);
  }

  deleteReservation(reservationId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) {
      this.service.deleteReservation(reservationId).subscribe(
          () => {
            window.location.reload();
          },
          (error) => {
            console.log('Erreur lors de la suppression de la réservation :', error);
          }
      );
    }
  }


  update(i: any) {
    console.log('update', i)
    this.router.navigate(['/UpdateRentalOffer', i.vehiculeId]);
  }

  detail(data: any){
    console.log(data);
    const url = 'listeContrat/' + data.vehiculeId;
    this.router.navigateByUrl(url);
  }
  openDialog(vehiculeReservation: number) {
    this.selectedVehiculeId = vehiculeReservation;
    setTimeout(() => {
      const url = 'adminfranchise/listReservation/' + this.selectedVehiculeId + '/ajout';
      this.router.navigateByUrl(url);
    }, 0);
    this.displayDialog = true;
  }
  openDialogg(vehiculeReservation: number) {
    this.selectedVehiculeId = vehiculeReservation;
    setTimeout(() => {
      const url = 'adminfranchise/listReservation/' + this.selectedVehiculeId + '/ajout';
      this.router.navigateByUrl(url);
    }, 0);
    this.displayDialogg = true;
  }

  disponile(data: any) {
    console.log(data.vehiculeId);
    this.servicev.getDisponible(data.vehiculeId).subscribe(
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
  addRentalContrat() {
    this.service.addReservation(this.contract, this.idVehicule, this.userId).subscribe(
        (res: any) => {
          const contratId = res.contrat;
          this.successNotification(contratId);
        },
        (error) => {
          console.log('Erreur:', error);
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
    var datefi = this.datedebut.addDaysToDate(this.nbjour);
    console.log(datefi);
    var dateStatique = '2043-06-15';
    console.log(this.datedebut);
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
    this.service.reservationIsValid(startdatee, enddatee).subscribe((res: any) => {
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
    this.DateValidStartdateAndEnddate = this.service.reservationIsValid(this.datedebut, this.datefin)
    console.log(this.DateValidStartdateAndEnddate);
    return this.service.reservationIsValid(this.datedebut, this.datefin);

  }

  addDaysToDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  validationnbMonth(event: any) {
    var nbjour = event.target.value;
    this.nbjour = event.target.value;
    console.log(this.nbjour);
    this.dateIsValid();
    console.log(this.DateValidStartdateAndEnddate);
  }
  onClickTelechargerFacturePDF(reservid: number) {
    this.reservations.forEach((reservation) => {
      this.service.telechargerFacturePDF(reservation.reservid).subscribe(response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        window.open(url);
      });
    });
  }
}
