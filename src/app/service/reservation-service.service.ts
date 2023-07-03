import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UserService } from './user.service';
import {Reservation} from '../models/reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {
  private BASE_URL_DELETE = 'http://localhost:8080/SpringMVC/api/reservation/deleteReservation';
  private BASE_URL_REVENU_BY_OFFRE = 'http://localhost:8080/SpringMVC/api/reservation/revenueoffer';
  private BASE_URL_IS_VALID = 'http://localhost:8080/SpringMVC/api/reservation/ContractIsValidd';
  private BASE_URL_GET_BY_ID = 'http://localhost:8080/SpringMVC/api/reservation/getRentalContract';
  private BASE_URL_ADD = 'http://localhost:8080/SpringMVC/api/reservation/addReservation/';
  private apiUrl = 'http://localhost:8080/SpringMVC/api/reservation/GetAllReservations';
  private apiUrll = 'http://localhost:8080/SpringMVC/api/reservation';
  readonly delurl = 'http://localhost:8080/SpringMVC/api/reservation/facture';

  constructor(
    private http: HttpClient, private userService: UserService
  ) { }

  getReservation(): Observable<Reservation[]>{
    return this.http.get('http://localhost:8080/SpringMVC/api/reservation/GetAllReservations');
  }


  getContratById(id: any){
    console.log('gg' , id);
    return this.http.get('http://localhost:8080/SpringMVC/api/reservation/getReservation/'+id)
  }
  getUsersFinContrat(){
    return this.http.get('http://localhost:8080/SpringMVC/api/reservation/GetUsersFinContrat')
  }

  addReservation(reservation: Reservation, vehiculeId: number, userId: number): Observable<Reservation> {
    return this.http.post(`${this.BASE_URL_ADD}${vehiculeId}/${userId}`, reservation)
        .pipe(
            catchError((error: any) => {
              return throwError(error);
            })
        );
  }
  deleteReservation(reservationId: number): Observable<any> {
    const url = `${this.BASE_URL_DELETE}/${reservationId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  reservationIsValid(datedebut: any, datefin: any): any {
    return this.http.get(`${this.BASE_URL_IS_VALID}/${datedebut}/${datefin}`);
  }
  calculateRevenueForUser(id: any){
    console.log('gg' , id);
    return this.http.get(' http://localhost:8080/SpringMVC/api/reservation/revenue/' + id);
  }

  telechargerFacturePDF(reservid: number): Observable<any> {
    const url = `${this.delurl}/${reservid}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
