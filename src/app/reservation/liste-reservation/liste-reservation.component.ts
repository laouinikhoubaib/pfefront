import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ReservationServiceService} from '../../service/reservation-service.service';
import {Reservation} from '../../models/reservation';


@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent implements OnInit {


  title = 'Angular Search Using ng2-search-filter';
  searchText!:any;
  offers!: Observable<Reservation[]>;
  list: any;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];


  constructor(
    private service: ReservationServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.service.getReservation().subscribe(
        (res) => {
          this.list = res;
          console.log(res);
        }

    );
  }
  reloadData() {
    this.list = this.service.getReservation();
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


  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
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



}
