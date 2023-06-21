import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {Role} from '../../models/role.enum';
import {Notification} from '../../models/natification.model';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User = new User;
  notificationList: Array<Notification> = [];
  profilPicture!: string;
  allUsers: Array<User> = [];
  allAdmins: Array<User> = [];
  isLoading: boolean = false;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) {
    this.authenticationService.currentUser.subscribe( data => {
      this.currentUser = data;
    });
    if (this.currentUser == null){
      this.currentUser = new User();
      this.currentUser.username = '';
      this.currentUser.userId = 0;
      this.currentUser.userId = 0;
      this.currentUser.password = '';
      this.currentUser.accessToken = '';
      this.currentUser.email = '';
      this.currentUser.refreshToken = '';

    }
  }

  ngOnInit(): void {
    if (this.currentUser?.userId){
      this.userService.getNotifications().subscribe(data => {
        this.notificationList = data;
      });
      this.userService.getUserProfilPicture().subscribe(pic => {
        this.profilPicture = pic.split('\\').pop();
      }, err => {
        this.profilPicture = 'https://res.cloudinary.com/diubo1tzp/image/upload/v1650587140/defaultProfilePicture_drigsj.png';
      });
    }

  }

  markAsRead(notifId: number){
    this.userService.markNotificationAsRead(notifId).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  markAsUnRead(notifId: number){
    this.userService.markNotificationAsUnRead(notifId).subscribe();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  editProfile(){
    this.userService.editProfil(this.currentUser).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser) );
    this.router.navigate(['/user/profil'])
        .then(() => {
          window.location.reload();
        });
  }
  logOut() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.authenticationService.logOut();
      this.router.navigate(['/login']);
    }, 2000);
  }



  redirectTo(){
    this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
  }

  onDeleteNotification(notificationId: number): void {
    this.userService.deleteNotification(notificationId).subscribe(
        response => {
          console.log('Notification supprimée avec succès');
        },
        error => {
          console.log('Erreur lors de la suppression de la notification', error);
        }
    );
    window.location.reload();
  }

}
