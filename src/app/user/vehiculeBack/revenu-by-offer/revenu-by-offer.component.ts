import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservationServiceService} from '../../../service/reservation-service.service';


@Component({
  selector: 'app-revenu-by-offer',
  templateUrl: './revenu-by-offer.component.html',
  styleUrls: ['./revenu-by-offer.component.css']
})
export class RevenuByOfferComponent implements OnInit {
  idOffre : any
revenu!:any
  constructor( private route : ActivatedRoute,
    private rentalContratService : ReservationServiceService,
    private router : Router,) {     this.idOffre = this.route.snapshot.params['id']
}

  ngOnInit(): void { 
    this.rentalContratService.calculRevenu(this.idOffre).subscribe(
      (response) => {
        this.revenu= response;
        console.log("**********************"+this.revenu)
      },
      (error) => {
        console.error(error);
      }
    ); 
  }

}
