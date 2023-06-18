import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {Vehicule} from '../../../models/vehicule';
import {VehiculeService} from '../../../service/vehicule.service';


@Component({
  selector: 'app-liste-rental-offer',
  templateUrl: './liste-rental-offer.component.html',
  styleUrls: ['./liste-rental-offer.component.css']
})
export class ListeVehiculesComponent implements OnInit {
  title = 'Angular Search Using ng2-search-filter';
  searchText!:any;
  offers!: Observable<Vehicule[]>;
  list: any;
  date1:any
  date2:any
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  listAvailableOffers: any;
  nomAgence: string;
  vehiculeId: any;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  datePickerForm: FormGroup;

  constructor(    private formBuilder: FormBuilder,
    private service: VehiculeService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.service.getAllVehicules().subscribe(
      (res) => {
        this.list = res;
        console.log("!!!!"+this.list);
      }

    )

    this.datePickerForm = this.formBuilder.group({
      startdate: [''],
      enddate: ['']
    });
    this.datePickerForm.valueChanges.subscribe((val) => {
      console.log(val)
    });


  }
  reloadData() {
    this.list = this.service.getAllVehicules();
  }



  // deleteOffer = (id: number) => {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer ctte véhicule?')) {
  //     this.service.deleteVehicule(id).subscribe(() => {
  //       window.location.reload();
  //     });
  //   }
  // }

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
    this.router.navigate(['/superadmin/UpdateVehicule', i.offreid]);
  }

  detail(data:any){
    console.log(data)
    const url = 'listeContrat/'+data.offreid
    this.router.navigateByUrl(url)
  }

  disponile(data:any){
    console.log(data.offreid)
    this.service.getDisponible(data.offreid).subscribe(res=>{
      console.log(res);
      this.successNotification(res);
    },err=>{
      alert('error de serveur');
    });
  }

  successNotification(data:any) {
    Swal.fire({
      text: data,
      icon: "success",
    });
  }

  getAvailableOffers(){
    const date1 = new DatePipe('en-US').transform(this.datePickerForm.value.startdate, 'dd-MM-yyyy');
    console.log("^^^^"+date1);
    const date2 = new DatePipe('en-US').transform(this.datePickerForm.value.enddate, 'dd-MM-yyyy');
    console.log("^^^^"+date2);

    this.service.getAvailableOffers(date1, date2).subscribe(
      (res) => {
        this.list = res;
        console.log(res);
      }

    )
  }


  filterD(){
    this.list = this.list.sort(function(a:any, b:any){
      return b.monthlyrent - a.monthlyrent
    })
  }
  filterA(){
    this.list = this.list.sort(function(a:any, b:any){
      return a.monthlyrent - b.monthlyrent
    })
  }

}
