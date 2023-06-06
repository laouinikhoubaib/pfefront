import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../back/app.breadcrumb.service';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Agence} from '../../models/agence';
import {AgenceService} from '../../service/agence.service';


@Component({
  selector: 'app-admin-dashboard-backoffice',
  templateUrl: './super-admin-dashboard-backoffice.component.html',
  styleUrls: ['./super-admin-dashboard-backoffice.component.scss'],
})
export class SAdminDashboardBackofficeComponent implements OnInit {


  allAdmins: Array<User> = [];
  lineData: any;
  allUsers: Array<User> = [];
  selectedCustomers1: any;
  users: any[];
  userId: number;
  currentUser: User;
  agence: Agence;
  userss: Array<User> = [];
  nomAgence: string;
  admins: Array<User> = [];
  agenceId: number;

    constructor( private breadcrumbService: BreadcrumbService, authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/']}
    ]);
  }

    ngOnInit() {
      this.userService.getAllAdmins().subscribe(allAdmins => {
        this.allAdmins = allAdmins;
      });

      this.userService.getAllUser().subscribe(users => {
        this.allUsers = users;
      });

      this.userId = +this.route.snapshot.paramMap.get('userId');
      this.getNomAgence();
    }

  unlockUser(username: string){
    this.userService.unlockUser(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  lockUser(username: string){
    this.userService.lockUser(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  makeAdmin(username: string){
    this.userService.makeAdmin(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  redirectTo(){
    this.router.navigate(['/register3'])
        .then(() => {
          window.location.reload();
        });
  }
  getNomAgence(): void {
    this.userService.getNomAgence(this.userId)
        .subscribe(nomAgence => this.nomAgence = nomAgence);
  }

}
