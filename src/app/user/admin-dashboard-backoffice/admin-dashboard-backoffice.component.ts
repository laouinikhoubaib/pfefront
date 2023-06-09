import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../back/app.breadcrumb.service';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Agence} from '../../models/agence';
import {Role} from '../../models/role.enum';
import {AgenceService} from '../../service/agence.service';
import Swal from 'sweetalert2';


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
  listagence: Agence[];
  displayDialog = false;
  userParsed: string = '';
  errorMessage: string = '';
  roles: Role[] = [];
  middleRole: string = '';
  selectedFile!: File;
  user: User = new User();

    constructor( private breadcrumbService: BreadcrumbService, private authenticationService: AuthenticationService, private userService: UserService, private router: Router, private route: ActivatedRoute, private servicea: AgenceService) {
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
                    this.nomAgence = '';
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
        this.roles = [Role.USER, Role.ADMIN, Role.USER_FRANCHISE, Role.ADMIN_FRANCHISE, Role.SUPERADMIN];
        this.middleRole = Role.ADMIN_FRANCHISE;

        this.getAgences();
    }

    openDialog() {
        this.displayDialog = true;
    }

    getAgences() {
        this.servicea.getAgences().subscribe(res => {
            console.log(res);
            this.listagence = res;
        });
    }

    onFileSelcted(event: any){
        console.log(event);
        this.selectedFile = event.target.files[0];
    }

    register(){
        if ( this.middleRole == 'USER')
            this.user.role = Role.USER;
        else if (this.middleRole == 'USER_FRANCHISE')
            this.user.role = Role.USER_FRANCHISE;
        else if (this.middleRole == 'ADMIN')
            this.user.role = Role.ADMIN;
        else if (this.middleRole == 'ADMIN_FRANCHISE')
            this.user.role = Role.ADMIN_FRANCHISE;
        else if (this.middleRole == 'SUPERADMIN'){
            this.user.role = Role.SUPERADMIN;
        }
        this.userParsed = JSON.stringify(this.user);

        this.authenticationService.register(this.userParsed, this.selectedFile, this.nomAgence).subscribe(data => {
                this.router.navigate(['/admin']).then(() => {
                });
                this.successNotification(); },
            err => {
                if (err?.status === 409){
                    this.errorMessage = 'Username existe dèja';
                }
                else if (err?.status === 400){
                    this.errorMessage = 'Email existe dèja';
                }
                else if (err?.status === 406){
                    this.errorMessage = 'Password doit avoir 8 caractères ou plus' +
                        'Contient un ou plusieurs caractères majuscules' +
                        'Contient au moins un chiffre\n' +
                        '\tContient 1 ou plusieurs caractères spéciaux';
                }
                else{
                    this.errorMessage = 'Erreur est survenue : ' + err?.errorMessage;
                    console.log(err);
                }
            }
        );
    }
    successNotification() {
        Swal.fire({
            text: 'Utilisateur ajouté avec succès!',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
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

}
