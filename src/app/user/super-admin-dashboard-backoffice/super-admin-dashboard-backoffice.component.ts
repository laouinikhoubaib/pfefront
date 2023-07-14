import {Component, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from '../../back/app.breadcrumb.service';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {User} from '../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Agence} from '../../models/agence';
import {AgenceService} from '../../service/agence.service';
import {Role} from '../../models/role.enum';
import Swal from 'sweetalert2';
import {Client} from '../../models/client';


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
  user: User = new User();
  users: any[];
  userId: number;
  currentUser: User;
  agence: Agence;
  userss: Array<User> = [];
  nomAgence: string;
  admins: Array<User> = [];
  selectedFile!: File;
  roles: Role[] = [];
  middleRole: string = '';
  errorMessage: string = '';
  userParsed: string = '';
  displayDialog = false;
  listagence: Agence[];
  agenceNom: string;

    constructor( private breadcrumbService: BreadcrumbService, private authenticationService: AuthenticationService, private userService: UserService, private router: Router) {
    this.breadcrumbService.setItems([
      {label: 'Dashboard', routerLink: ['/']}
    ]);
    this.authenticationService.currentUser.subscribe( data => {
        this.currentUser = data;
      });
  }

    ngOnInit() {
      this.userService.getAllAdmins().subscribe(allAdmins => {
        this.allAdmins = allAdmins;
      });

      this.userService.getAllUser().subscribe(users => {
        this.allUsers = users;

      });
      this.roles = [Role.USER, Role.ADMIN, Role.USER_FRANCHISE, Role.ADMIN_FRANCHISE, Role.SUPERADMIN];
      this.middleRole = Role.SUPERADMIN;

      const agence: Agence = new Agence();
      agence.nom = this.agenceNom;
      this.user.agencel = agence;
    }


  openDialog() {
    this.displayDialog = true;
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
      this.router.navigate(['/superadmin']).then(() => {
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

  makeAdmin(username: string){
    this.userService.makeAdmin(username).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


}
