import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationServiceService } from 'src/app/service/reservation-service.service';
import {VehiculeService} from '../../service/vehicule.service';
import {Vehicule} from '../../models/vehicule';
import {Categorie} from '../../models/categorie';


@Component({
  selector: 'app-liste-vehiculeutilitaire',
  templateUrl: './liste-vehicules.component.html',
  styleUrls: ['./liste-vehicules.component.css']
})
export class ListeVehiculeFrontComponent implements OnInit {

  title = 'Angular Search Using ng2-search-filter';
  searchText!: any;
  offers!: Observable<Vehicule[]>;
  list: any;
  date1: any;
  date2: any;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  listAvailableVehiculess: any;
  contratYoufewBaadTroisJours!: any;
  idvehicule: any;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  datePickerForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private service: VehiculeService,    private serviceContrat: ReservationServiceService, private router: Router) { }

  ngOnInit(): void {

    this.service.getAllVehicules().subscribe(
      (res) => {
        this.list = res;
        console.log(res);
      })

    this.datePickerForm = this.formBuilder.group({
      startdate: [''],
      enddate: ['']
    });
    this.datePickerForm.valueChanges.subscribe((val) => {
      console.log(val);
    });

  }
  reloadData() {
    this.list = this.service.getAllVehicules();
  }

  deleteOffer = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) {
      this.service.deleteVehicule(id).subscribe(() => {
        window.location.reload();
      });
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
    console.log('update', i);
    this.router.navigate(['/UpdateVehicule', i.vehiculeId]);
  }

  detail(data: any){
    console.log(data);
    const url = 'listeReservation/' + data.vehiculeId + '/ajout' ;
    this.router.navigateByUrl(url);
  }

  disponile(data: any) {
    console.log(data.vehiculeId);
    this.service.getDisponible(data.vehiculeId).subscribe(
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

  getAvailableOffers(){
    const date1 = new DatePipe('en-US').transform(this.datePickerForm.value.startdate, 'dd-MM-yyyy');
    console.log(date1)
    const date2 = new DatePipe('en-US').transform(this.datePickerForm.value.enddate, 'dd-MM-yyyy');
    console.log(date2);

    this.service.getAvailableOffers(date1, date2).subscribe(
      (res) => {
        this.list = res;
        console.log(res);
      }

    );
  }

  filterD(){
    this.list = this.list.sort(function(a: any, b: any){
      return b.price - a.price;
    })
  }
  filterA(){
    this.list = this.list.sort(function(a:any, b:any){
      return a.price - b.price;
    });
  }

}
