import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Agence} from '../models/agence';

const API_URL = `${environment.BASE_URL}/api/authentication/`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  helper = new JwtHelperService();
  user: User = new User();
  agence: Agence = new Agence();
  agences: Agence[];


  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any>{
    return this.http.post<any>(API_URL + 'sign-in', user).pipe(
        map(response => {
              if (response) {
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
              }
              return response;
            }
        )
    );
  }

  register(user: string, file: File, nom: string): Observable<any> { //
    const formData: FormData = new FormData();
    formData.append('user', user);
    formData.append('file', file);
    formData.append('agence', nom);
    return this.http.post(API_URL + 'sign-up', formData);
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }

  forgotPassword(email: string){
    let queryParams = {'email': email};
    return this.http.post(API_URL + 'reset-password', email, {params: queryParams});

  }

  updatePassword(password: string, token: string){
    let queryParams = {'token': token};
    return this.http.post(API_URL + 'reset-password/new', password, {params: queryParams});
  }

  tokenValid(){
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr){
      storageUser = JSON.parse(storageUserAsStr);
      this.user = storageUser;
      console.log(this.helper.isTokenExpired(this.user.accessToken));
      return this.helper.isTokenExpired(this.user.accessToken);
    }
  }

  NotLoggedIn(){
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (!storageUserAsStr){
      return true;
    }
    return false;
  }
  getAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>('http://localhost:8080/SpringMVC/api/agence/all');
  }


  public getCurrentUser(): Observable<User> {
    return this.currentUser;
  }
  getCurrentUserId(): number {
    const currentUser = this.currentUserValue;
    const decodedToken = this.helper.decodeToken(currentUser.accessToken);
    return decodedToken.id;
  }


}
