import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Vehicule} from '../../../models/vehicule';
import {VehiculeService} from '../../../service/vehicule.service';
import {Subscription} from 'rxjs/dist/types';
import {UserService} from '../../../service/user.service';
import {Agence} from '../../../models/agence';
import {AgenceService} from '../../../service/agence.service';
import {User} from '../../../models/user.model';


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
  userParsed: string = '';
  selectedFile!: File;
  userId: number;
  listagence: Agence[];

  constructor(private formBuilder: FormBuilder, private service: VehiculeService, private router: Router, private userService: UserService, private route: ActivatedRoute, private servicea: AgenceService) { }

  ngOnInit(): void {
    this.routeSub = this.service.getAllVehicules().subscribe(res => {
      console.log(res);
      this.listvehicule = res;
    });
    this.service.getAllVehicules().subscribe(users => {
      this.allAgences = users;
    });
    this.userId = +this.route.snapshot.paramMap.get('userId');
    this.getNomAgence();

    this.getAgences();

  }

  getAgences() {
    this.servicea.getAgences().subscribe(res => {
      console.log(res);
      this.listagence = res;
    });
  }
  addVehicule() {
    this.userParsed = JSON.stringify(this.newVehicule);
    this.service.addVehicule(this.userParsed, this.selectedFile, this.nomAgence).subscribe(data => {
      this.router.navigate(['/superadmin']).then(() => {
      });
      this.successNotification(); });
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
  getNomAgence(): void {
    this.userService.getNomAgence(this.userId)
        .subscribe(nomAgence => this.nomAgence = nomAgence);
  }
  openDialog() {
    this.displayDialog = true;
  }
  onFileSelcted(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

}
