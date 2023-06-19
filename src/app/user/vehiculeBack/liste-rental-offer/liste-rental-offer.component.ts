import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {Vehicule} from '../../../models/vehicule';
import {VehiculeService} from '../../../service/vehicule.service';
import {Agence} from '../../../models/agence';
import {Subscription} from 'rxjs/dist/types';


@Component({
  selector: 'app-liste-rental-offer',
  templateUrl: './liste-rental-offer.component.html',
  styleUrls: ['./liste-rental-offer.component.css']
})
export class ListeVehiculesComponent implements OnInit {
  title = 'Angular Search Using ng2-search-filter';
  offers!: Observable<Vehicule[]>;
  list: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  listAvailableOffers: any;
  nomAgence: string;
  private routeSub: Subscription;
  vehiculeId: any;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  datePickerForm: FormGroup;
  allUsers: Array<Vehicule> = [];
  listagence: Vehicule[];
  displayDialog = false;
  errorMessage: string = '';
  vehicul: Vehicule = new Vehicule();
  newVehicule = new Vehicule();
  userParsed: string = '';
  selectedFile!: File;

  constructor(    private formBuilder: FormBuilder, private service: VehiculeService, private router: Router
    ) { }

  ngOnInit(): void {
    this.routeSub = this.service.getAllVehicules().subscribe(res => {
      console.log(res);
      this.listagence = res;
    });
    this.service.getAllVehicules().subscribe(users => {
      this.allUsers = users;
    });

    this.datePickerForm = this.formBuilder.group({
      startdate: [''],
      enddate: ['']
    });
    this.datePickerForm.valueChanges.subscribe((val) => {
      console.log(val);
    });


  }

  update(i: any) {
    console.log('update', i)
    this.router.navigate(['/superadmin/UpdateVehicule', i.offreid]);
  }

  detail(data: any){
    console.log(data);
    const url = 'listeContrat/' + data.offreid;
    this.router.navigateByUrl(url);
  }

  disponile(data: any){
    console.log(data.offreid);
    this.service.getDisponible(data.offreid).subscribe(res => {
      console.log(res);
      this.successNotification();
    }, err => {
      alert('error de serveur');
    });
  }

  addVehicule(){
    this.service.addVehicule(this.userParsed, this.selectedFile, this.nomAgence).subscribe(comp => {
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
  getAvailableOffers(){
    const date1 = new DatePipe('en-US').transform(this.datePickerForm.value.startdate, 'dd-MM-yyyy');
    console.log('^^^^' + date1);
    const date2 = new DatePipe('en-US').transform(this.datePickerForm.value.enddate, 'dd-MM-yyyy');
    console.log('^^^^' + date2);

    this.service.getAvailableOffers(date1, date2).subscribe(
      (res) => {
        this.list = res;
        console.log(res);
      }

    );
  }

}
