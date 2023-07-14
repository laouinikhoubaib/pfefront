import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Agence} from '../models/agence';


@Injectable({
    providedIn: 'root'
})
export class ClientService {

    client: Client = new Client();
    agence: Agence = new Agence();
    agences: Agence[];

    private baseUrl = 'http://localhost:8080/SpringMVC/api/client/';

    constructor(private http: HttpClient) {}


    addClient(client: string, nom: string): Observable<any> { //
        const formData: FormData = new FormData();
        formData.append('client', client);
        formData.append('agence', nom);
        return this.http.post(this.baseUrl + 'addClient', formData);
    }


    getAgences(): Observable<Agence[]> {
        return this.http.get<Agence[]>('http://localhost:8080/SpringMVC/api/agence/all');
    }
    findAllClients() {
        return this.http.get('http://localhost:8080/SpringMVC/api/client/clients/all');
    }
}
