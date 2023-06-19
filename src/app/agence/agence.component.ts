import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Agence} from '../models/agence';
import {AgenceService} from '../service/agence.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as Chart from 'chart.js';
import Swal from 'sweetalert2';
import {User} from '../models/user.model';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class AgenceComponent implements OnInit {

  @ViewChild('pieChart') pieChart: ElementRef;

  listagence: Agence[];
  agence: Agence;
  agenceId: number;
  submitted: boolean;
  private routeSub: Subscription;
  newAgence = new Agence();
  chart: any;
  displayDialog = false;
  errorMessage: string = '';
  agencet: Agence = new Agence();
  allUsers: Array<Agence> = [];

  constructor( private router: Router, private messageService: MessageService, private service: AgenceService,  private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.routeSub = this.service.getAgences().subscribe(res => {
      console.log(res);
      this.listagence = res;
    });
    this.service.getAgences().subscribe(users => {
      this.allUsers = users;
    });
    this.getCountByTypeAgence();
  }

  getCountByTypeAgence() {
    this.service.getCountByTypeAgence().subscribe(
        data => {
          this.generateChart(data);
        },
        error => {
          console.log(error);
        }
    );
  }
  generateChart(stats: any) {
    const chartData = {
      labels: Object.keys(stats),
      datasets: [{
        data: Object.values(stats),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ]
      }]
    };

    const canvas = this.pieChart.nativeElement;
    this.chart = new Chart(canvas, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  deleteAgence(id: string) {this.service.DeleteAgence(id).subscribe(p => {
      console.log('delete');
      this.router.navigate(['/superadmin/agence']);
    });
  }
  addAgence(){
    this.service.createAgence(this.newAgence).subscribe(comp => {
      this.router.navigate(['/superadmin']).then(() => {
      });
      this.successNotification();
    });
    this.errorMessage = 'Erreur est survenue  veuillez vérifier';
  }

  openDialog() {
    this.displayDialog = true;
  }

  blockAgence(nom: string){
    this.service.blockAgence(nom).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  deblockAgence(nom: string){
    this.service.deblockAgence(nom).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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

}
