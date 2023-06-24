import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import {Vehicule} from '../models/vehicule';
import {Agence} from '../models/agence';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';
import {RequestBaseService} from './request-base.service';
import {Categorie} from '../models/categorie';
const API_URL = `${environment.BASE_URL}/api/vehicule/`;
@Injectable({
  providedIn: 'root'
})
export class VehiculeService extends  RequestBaseService{

  constructor(authenticationService: AuthenticationService, http: HttpClient, private userService: UserService) {
    super(authenticationService, http);
  }
  agence: Agence = new Agence();
  agences: Agence[];




  private BASE_URL = 'http://localhost:8080/SpringMVC/api/vehicule/GetAllVehicules';
  private BASE_URL_DELETE = 'http://localhost:8080/SpringMVC/api/vehicule/deleteRentalOffer';
  private BASE_URL_AJOUT = 'http://localhost:8080/SpringMVC/api/vehicule/addVehicule';
  private BASE_URL_UPDATE = 'http://localhost:8080/SpringMVC/api/vehicule/update-RentalOffer';
  private BASE_URL_GETBYID = 'http://localhost:8080/SpringMVC/api/vehicule';
  private BASE_URL_AVAILABLE_OFFERS = 'http://localhost:8080/SpringMVC/api/vehicule/GetAvailableVehicules/';
  private BASE_URL_TRI_DES = 'http://localhost:8080/SpringMVC/api/vehicule/triDesc';
  private BASE_URL_TRI_ASC = 'http://localhost:8080/SpringMVC/api/vehicule/tri';
  private baseUrl = 'http://localhost:8080/SpringMVC/api/vehicule';


  getAllVehicules(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  TriOffersDesc(): Observable<any> {
    return this.http.get(`${this.BASE_URL_TRI_DES}`);
  }
  TriOffersAsc(): Observable<any> {
    return this.http.get(`${this.BASE_URL_TRI_ASC}`);
  }


  deleteVehicule(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL_DELETE}/${id}`, { responseType: 'text' });

  }

  addVehicule(vehicule: string, file: File, nom: string): Observable<any> { //
    const formData: FormData = new FormData();
    formData.append('vehicule', vehicule);
    formData.append('file', file);
    formData.append('agence', nom);
    return this.http.post(API_URL + 'addVehicule', formData);
  }


  getVehicule(id: any){
    console.log('gg' , id);
    return this.http.get('http://localhost:8080/SpringMVC/api/vehicule/' + id);
  }

  calculateRevenueForUser(id: any){
    console.log('gg' , id);
    return this.http.get(' http://localhost:8080/SpringMVC/api/reservation/revenue/'+id)
  }
  getAvailableOffers(date1: any, date2: any){
    return this.http.get(this.BASE_URL_AVAILABLE_OFFERS + date1 + "/" + date2);
  }

  updateVehicule(data:any){
    return this.http.put('http://localhost:8080/SpringMVC/api/vehicule/updateVehicule' , data);
  }

  getDisponible(vehiculeid: any): Observable <boolean> {
    return this.http.get<boolean>('http://localhost:8080/SpringMVC/api/vehicule/Disponibilite/' + vehiculeid);
  }

  blockVehicule(matricule: string){
    return this.http.put('http://localhost:8080/SpringMVC/api/vehicule/block', matricule, {headers: this.getHeaders});
  }

  deblockVehicule(matricule: string){
    return this.http.put('http://localhost:8080/SpringMVC/api/vehicule/deblock', matricule, {headers: this.getHeaders});
  }

  getVehiculesByLocationVoiture(): Observable<Vehicule[]> {
    const url = `${this.baseUrl}/categorie/voiture`;
    return this.http.get<Vehicule[]>(url);
  }

  getVehiculesByLocationUtilitaire(): Observable<Vehicule[]> {
    const url = `${this.baseUrl}/categorie/utilitaire`;
    return this.http.get<Vehicule[]>(url);
  }

  getUtilitaireVehiculesByAgence(vehiculeId: number): Observable<any> {
    const url = `${this.baseUrl}/same-agence/utilitaire?vehiculeId=${vehiculeId}`;
    return this.http.get(url);
  }
  getVoitureVehiculesByAgence(vehiculeId: number): Observable<any> {
    const url = `${this.baseUrl}/same-agence/voiture?vehiculeId=${vehiculeId}`;
    return this.http.get(url);
  }
  getUtilitaireVehiculesByCurrentUser(): Observable<Vehicule[]> {
    const url = `${this.baseUrl}/same-agence/utilitaire?vehiculeId=${this.currentUser.userId}`;
    return this.http.get<Vehicule[]>(url);
  }
  getVoitureVehiculesByCurrentUser(): Observable<Vehicule[]> {
    const agenceId = this.currentUser.agence ? this.currentUser.agence.agenceId : null;
    const url = `${this.baseUrl}/same-agence/voiture?agenceId=${agenceId}`;
    return this.http.get<Vehicule[]>(url);
  }

}
