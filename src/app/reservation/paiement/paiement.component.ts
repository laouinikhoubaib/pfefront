import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../service/payment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Paiement} from '../../models/paiement.modele';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  constructor(private chargeService: PaymentService, private router: ActivatedRoute, private routerNav: Router, private route: Router) {
    this.reservid = this.router.snapshot.params['id']

  }

  paiement: Paiement = new Paiement();
  token!: string;
  currency!: string;
  reservid!: number;

  ngOnInit(): void {
  }

  onSubmit() {
    this.chargeService.createCharge(this.token, this.currency, this.reservid).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
    );
    this.gotoList();
  }

  gotoList() {
    this.route.navigate(['listReservation']);
  }

  onClickTelechargerFacturePDF(id: number) {
    this.chargeService.telechargerFacturePDF(id).subscribe(response => {
      const blob = new Blob([response], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
