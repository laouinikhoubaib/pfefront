import { Component, OnInit } from '@angular/core';
import {Client} from '../models/client';
import {Agence} from '../models/agence';
import {AgenceService} from '../service/agence.service';
import {ClientService} from '../service/client.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  client = new Client();
  displayDialogclient = false;
  clientParsed: string = '';
  listagence: Agence[];
  agenceNom: string;
  agence: Agence;
  errorMessage: string = '';
  nomAgence: string;
  clients: Client[] = [];

  constructor(private servicea: AgenceService,
              private clientService: ClientService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.getAgences();
    this.findAllClients();
  }
  getAgences() {
    this.servicea.getAgences().subscribe(res => {
      console.log(res);
      this.listagence = res;
    });
  }
  openDialogclient() {
    this.displayDialogclient = true;
  }
  addClient(){
    this.clientParsed = JSON.stringify(this.client);
    this.clientService.addClient(this.clientParsed, this.nomAgence).subscribe(data => {
      this.router.navigate(['/client']).then(() => {
      });
      this.successNotificationt(); },
    );
    this.errorMessage = 'Erreur est survenue  veuillez vérifier';
  }
  successNotificationt() {
    Swal.fire({
      text: 'Client ajouté avec succès!',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
  findAllClients() {
    this.clientService.findAllClients().subscribe(
        (clients: Client[]) => {
          this.clients = clients;
        },
        (error) => {
          console.error(error);
        }
    );
  }
}
