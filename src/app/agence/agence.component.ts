import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Agence} from '../models/agence';
import {AgenceService} from '../service/agence.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
  providers: [MessageService, ConfirmationService]
})

export class AgenceComponent implements OnInit {

  @ViewChild('pieChart') pieChart: ElementRef;

  listagence: Agence[];
  agence1: Agence = new Agence();
  agence2: Agence = new Agence();
  agence: Agence;
  agenceId: string;
  eventDialog: boolean;
  eventDialogg: boolean;
  submitted: boolean;
  private routeSub: Subscription;
  newAgence = new Agence();
  chart: any;

  constructor( private router: Router, private messageService: MessageService, private service: AgenceService,  private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.routeSub = this.service.getAgences().subscribe(res => {
      console.log(res);
      this.listagence = res;
    });
    this.route.paramMap.subscribe(params => {
      this.agenceId = params.get('id');
      this.loadAgence();
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
      this.router.navigate(['/superadmin/agence']).then(() => {
        window.location.reload();
      });

    });

  }
  loadAgence() {
    this.service.getAgence(this.agenceId).subscribe(agence => {
      this.agence = agence;
    });
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
  updateAgence() {
    this.service.updateAgence(this.agenceId, this.agence).subscribe(agence => {
      this.agence = agence;
      console.log('Agence mise à jour avec succès !');
    });
  }

  hideDialog() {
    this.eventDialogg = false;
    this.submitted = false;
  }

  openNew() {
    this.listagence = [];
    this.submitted = false;
    this.eventDialog = true;
  }

}
