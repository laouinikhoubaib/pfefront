import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../back/app.breadcrumb.service';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-admin-dashboard-backoffice',
  templateUrl: './admin-dashboard-backoffice.component.html',
  styleUrls: ['./admin-dashboard-backoffice.component.scss'],
})
export class AdminDashboardBackofficeComponent implements OnInit {


  lineData: any;
  selectedCustomers1: any;
  userId: number;


  userss: Array<User> = [];
  nomAgence: string;
  admins: Array<User> = [];
    currentUser: User;

    constructor( private breadcrumbService: BreadcrumbService, authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/']}
    ]);
  }
    ngOnInit() {
        this.userService.getCurrentUser().subscribe((user: User) => {
            this.currentUser = user;
            this.userId = user.userId;

            if (user.agence) {
                this.nomAgence = user.agence.nom;
            } else {
                this.userService.getAgencyNameByUserId(user.userId).subscribe((data: any) => {
                    this.nomAgence = data.nom;
                }, err => {
                    console.error(err);
                    this.nomAgence = "";
                });
            }
        });
        this.userService.getCurrentUser().subscribe(
            user => {
                this.userId = user.userId;
                this.userService.getUsersBySameAgence(this.userId).subscribe(
                    userss => {
                        this.userss = userss;
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.userService.getUsersBySameAgence(this.userId).subscribe(users => {
                    this.admins = users.filter(user => user.role === 'ADMIN');
                });
            });
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
  redirectTo(){
    this.router.navigate(['/register'])
        .then(() => {
          window.location.reload();
        });
  }
}
