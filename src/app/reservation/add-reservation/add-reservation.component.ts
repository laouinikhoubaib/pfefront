import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Reservation} from '../../models/reservation';
import {ReservationServiceService} from '../../service/reservation-service.service';
import {VehiculeService} from '../../service/vehicule.service';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../models/user.model';
import {UserService} from '../../service/user.service';


@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

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
  userId: number;
  currentUser: User;

  constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private rentalService: ReservationServiceService,
      private router: Router,
      private service: VehiculeService,
      private userService: UserService,
      private authService: AuthenticationService
  ) {
    this.vehiculeId = this.route.snapshot.params['id'];
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }


  ngOnInit(): void {

    this.userService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
      this.userId = user.userId;

    });
    this.rentalService.getReservation().subscribe(
        (res) => {
          this.list = res;
          console.log(res);
        });
  }
  addRentalContrat() {
            this.rentalService.addReservation(this.contract, this.vehiculeId, this.userId).subscribe(
                (res) => {
                  console.log('++++++++++++++', res);
                  this.successNotification();
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
  successNotification() {
    Swal.fire('Contrat ajouté avec succés!');
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
  validationnbMonth(event: any) {
    var nbjour = event.target.value;
    this.nbjour = event.target.value;
    console.log(this.nbjour);
    this.dateIsValid();
  console.log(this.DateValidStartdateAndEnddate);
  }
  disponile(data: any) {
    console.log(data.vehiculeId);
    this.service.getDisponible(data.vehiculeId).subscribe(res => {
      console.log(res);
      alert(res);
    }, err => {
      alert('error de serveur');
    });
  }


  addDaysToDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  dateIsValid(): boolean{
  this.datefin = this.addDaysToDate(this.datedebut, this.nbjour);
  console.log( '*****' + this.datefin);
  this.DateValidStartdateAndEnddate = this.rentalService.reservationIsValid(this.datedebut, this.datefin)
  console.log(this.DateValidStartdateAndEnddate);
  return this.rentalService.reservationIsValid(this.datedebut, this.datefin);

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
}
