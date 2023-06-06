import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Vehicule} from '../../../models/vehicule';
import {VehiculeService} from '../../../service/vehicule.service';
import {Agence} from '../../../models/agence';


@Component({
  selector: 'app-update-rental-offer',
  templateUrl: './update-rental-offer.component.html',
  styleUrls: ['./update-rental-offer.component.css']
})
export class UpdateVehiculeComponent implements OnInit {

  id: any;
  obj: any = {};
  vehicule: Vehicule = new Vehicule();
  agence: Agence = new Agence();
  agences: Agence[];
  nomAgence: string = '';
  selectedFile!: File;
  myLinkElement: HTMLLinkElement;
  constructor(private service: VehiculeService, private route: ActivatedRoute, private routerNav: Router
  ) {
    this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = 'assets/css/material-kit-pro.min3294.css?v=3.0.1';
    this.myLinkElement.rel = 'stylesheet';
    this.myLinkElement.id = 'pagestyle';
    document.body.appendChild(this.myLinkElement);

    this.id = this.route.snapshot.params['vehiculeId'];
    this.service.getVehicule(this.id).subscribe(res => {
      console.log(res);
      this.obj = res;
      this.vehicule = this.obj;
      console.log('-----------', this.vehicule);

    })
  }

  ngOnInit(
  ): void {
    console.log(this.vehicule);

  }

  UpdateVehicule() {

    console.log(this.vehicule);
    this.service.updateVehicule(this.vehicule).subscribe(res => {
      console.log(res);
      this.routerNav.navigate(['/listVehicules']);
    }, err => {
      this.routerNav.navigate(['/listVehicules']);

    });
  }

  onFileSelcted(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

}
