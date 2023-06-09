import {HttpClient, HttpEventType} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {Vehicule} from '../../../models/vehicule';
import {VehiculeService} from '../../../service/vehicule.service';
import {Agence} from '../../../models/agence';
import {AgenceService} from '../../../service/agence.service';

@Component({
  selector: 'app-ajout-rental-offer',
  templateUrl: './ajout-rental-offer.component.html',
  styleUrls: ['./ajout-rental-offer.component.css']
})
export class AjoutVehiculeComponent implements OnInit {

  myLinkElement: HTMLLinkElement;

  constructor(private service: VehiculeService , private httpClient: HttpClient, private routerNav: Router, private router: Router
      ,private servicea: AgenceService)  {


    this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = 'assets/css/material-kit-pro.min3294.css?v=3.0.1';
    this.myLinkElement.rel = 'stylesheet';
    this.myLinkElement.id = 'pagestyle';
    document.body.appendChild(this.myLinkElement);
  }

  ngOnInit(): void {
    this.getAgences();
  }

  message: any;
  id!: number;
  vehicule: Vehicule = new Vehicule();
  agence: Agence = new Agence();
  agences: Agence[];
  nomAgence: string = '';
  listagence: Agence[];
  userVehicule: string = '';
  selectedFile!: File;


  getAgences() {
    this.servicea.getAgences().subscribe(res => {
      console.log(res);
      this.listagence = res;
    });
  }
  addVehicule() {

    this.userVehicule = JSON.stringify(this.vehicule);
    console.log(this.userVehicule);
    this.service.addVehicule(this.userVehicule, this.selectedFile, this.nomAgence).subscribe(
        response => {
          console.log('Véhicule ajouté avec succès:', response);
        },
        error => {
          console.error('Erreur lors de l\'ajout du véhicule:', error);
        }
    );
  }
  gotoList() {
    this.router.navigate(['/listVehicules']);
  }

  onFileSelcted(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }



}
