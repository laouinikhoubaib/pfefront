import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {RequestBaseService} from './request-base.service';
import {Agence} from '../models/agence';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AgenceService  extends  RequestBaseService {
  coursesUrl = 'http://localhost:8080/SpringMVC/api/agence/all';
  apiUrl = 'http://localhost:8080/SpringMVC/api/agence';

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  getAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>(this.coursesUrl);
  }

  getAgence(agenceId: string): Observable<Agence> {
    return this.http.get<Agence>('http://localhost:8080/SpringMVC/api/agence/getAgence/' + agenceId);
  }

  getAgenceById(agenceId: number): Observable<Agence> {
    return this.http.get<Agence>('http://localhost:8080/SpringMVC/api/agence/getAgence/' + agenceId.toString());
  }

  createAgence(agence: Agence) {
    return this.http.post<Agence>('http://localhost:8080/SpringMVC/api/agence/addAgence/', agence, {headers: this.getHeaders});
  }

  DeleteAgence(agenceId: string) {
    return this.http.delete<Agence>('http://localhost:8080/SpringMVC/api/agence/deleteAgence/' + agenceId , {headers: this.getHeaders});

  }

  updateAgence(agenceId: string , c: Agence) {
    return this.http.put<Agence>('http://localhost:8080/SpringMVC/api/agence/updateAgence' + agenceId + '/' , c , {headers: this.getHeaders});

  }
  getAgenceByNom(nom: string): Observable<Agence> {
    return this.http.get<Agence>('http://localhost:8080/SpringMVC/api/agence/{nom}' + nom);
  }

  getUsersBySameAgence(userId: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/SpringMVC/api/agence/same-agence' + userId);
  }
  getCountByTypeAgence(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countByType`);
  }

  blockAgence(nom: string){
    return this.http.put('http://localhost:8080/SpringMVC/api/agence/block', nom, {headers: this.getHeaders});
  }

  deblockAgence(nom: string){
    return this.http.put('http://localhost:8080/SpringMVC/api/agence/deblock', nom, {headers: this.getHeaders});
  }
}
