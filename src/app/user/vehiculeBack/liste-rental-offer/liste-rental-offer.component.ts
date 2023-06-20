import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Vehicule} from '../../../models/vehicule';
import {VehiculeService} from '../../../service/vehicule.service';
import {Subscription} from 'rxjs/dist/types';


@Component({
  selector: 'app-liste-rental-offer',
  templateUrl: './liste-rental-offer.component.html',
  styleUrls: ['./liste-rental-offer.component.css']
})
export class ListeVehiculesComponent implements OnInit {



  nomAgence: string;
  private routeSub: Subscription;
  vehiculeId: any;
  allAgences: Array<Vehicule> = [];
  newVehicule = new Vehicule();
  listvehicule: Vehicule[];
  displayDialog = false;
  errorMessage: string = '';
  agenceParsed: string = '';
  selectedFile!: File;

  constructor(private formBuilder: FormBuilder, private service: VehiculeService, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.service.getAllVehicules().subscribe(res => {
      console.log(res);
      this.listvehicule = res;
    });
    this.service.getAllVehicules().subscribe(users => {
      this.allAgences = users;
    });

  }
  addVehicule() {
    this.service.addVehicule(this.agenceParsed, this.selectedFile, this.nomAgence).subscribe(comp => {
      this.listvehicule.push(this.newVehicule);
      this.newVehicule = new Vehicule();
      this.router.navigate(['/superadmin']).then(() => {
      });
      this.successNotification();
    });
    this.errorMessage = 'Erreur est survenue  veuillez vérifier';
  }
  successNotification() {
    Swal.fire({
      text: 'Agence ajoutée avec succès!',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
  openDialog() {
    this.displayDialog = true;
  }


}
