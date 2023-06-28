import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  readonly delurl = 'hhttp://localhost:8080/SpringMVC/api/reservation/factures/';
  private apiUrl1 = 'http://localhost:8080/SpringMVC/api/reservation/getpayement';

  constructor(private http: HttpClient, private userService: UserService) { }
 

  createCharge(token: string, currency: string, reservid: number): Observable<any> {
    const url = 'hhttp://localhost:8080/SpringMVC/api/charge?token=' + token + '&currency=' + currency + '&idReservation=' + reservid;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(url, options);
  }

  telechargerFacturePDF(id: number) {
    const url = '${this.delurl}${id}';
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getAllPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl1}`);
  }

}
