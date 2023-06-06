import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import {ReservationServiceService} from '../service/reservation-service.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  idVehicule: any;
  contrats: any;
  contratDetail: any;
  show: boolean = false;
  revenu: any;
  @ViewChild('pdf') pdf!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationServiceService,
    private router: Router
    ) {
    this.idVehicule = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    console.log('*****************************' + this.idVehicule);
    this.getContrat();
    this.reservationService.calculRevenu(this.idVehicule).subscribe(
      (response) => {
        this.revenu = response;
        console.log('**********************' + this.revenu);
      },
      (error) => {
        console.error(error);
      }
    );
   }
  goToAdd(){
    const url = 'listeReservation/' + this.idVehicule + '/ajout';
    this.router.navigateByUrl(url);

  }
  getContrat(){
    this.reservationService.getReservation().subscribe(res => {
      this.contrats = res
      this.contrats = this.contrats.filter((i: any) => {
        return i.reservationVehicule == this.idVehicule;
      });
      console.log(this.contrats);
    });
  }
  generatePDF(item: any){
    console.log(item);
    this.show = true;
    this.contratDetail = item;
  }

  loadPdfff(){
    const op = {
      backgroud : 'white',
      scale : 3
    };
    var div = document.getElementById('pdff');
    setTimeout(() =>{
      if(this.pdf){
        html2canvas(this.pdf.nativeElement , op).then(async canvas => {
          const myImage = await canvas.toDataURL('image/png');
          let myPdf = new jsPDF('p' , 'mm' , 'a4');
          var width = await myPdf.internal.pageSize.getWidth();
          var heigth = await canvas.height * width / canvas.width;
          myPdf.addImage(myImage , 'PNG' , 0 , 0 , width , heigth);
          myPdf.save('MasterclassContrat.pdf');
        });
      }
    });
  }
}
