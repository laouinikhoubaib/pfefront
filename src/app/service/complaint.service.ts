import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Complaint } from '../models/complaint';
import {Agence} from '../models/agence';
import {AuthenticationService} from './authentication.service';
import {RequestBaseService} from './request-base.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService extends  RequestBaseService{
  private baseUrl = 'http://localhost:8080/SpringMVC/api/complaint';
  coursesUrl = 'http://localhost:8080/SpringMVC/api/complaint/retrieveAllComplaints';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  getComplaintById(complaintId: string): Observable<Complaint> {
    return this.http.get<Complaint>(`/api/complaints/${complaintId}`);
  }
  addComplaint(complaint: Complaint, userId: number): Observable<Complaint> {
    const url = `${this.baseUrl}/AddComplaint/${userId}`;
    return this.http.post<Complaint>(url, complaint).pipe(
        catchError(this.handleError)
    );
  }

  deleteComplaint(complaintId: string): Observable<any> {
    return this.http.delete<Complaint>('http://localhost:8080/SpringMVC/api/complaint/deleteComplaint/' + complaintId , {headers: this.getHeaders});
  }

  retrieveAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.coursesUrl);
  }


  updateComplaint(complaintId: string): Observable<any> {
    const url = `${this.baseUrl}/updateUntreatedComplaint/${complaintId}`;
    return this.http.put(url, {});
  }

  getComplaintStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  getComplaintsByType(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/count-by-type`);
  }

  getComplaintsByDayInMonth() {
    const url = `${this.baseUrl}/stats`;
    return this.http.get(url);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
