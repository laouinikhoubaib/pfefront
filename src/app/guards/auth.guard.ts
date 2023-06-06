import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../models/user.model';
import {AuthenticationService} from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private currentUser: User =  new User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) {
      if (route.data.roles?.indexOf(this.currentUser.role) === -1) {
        this.router.navigate(['/access']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return true;
  }
}
