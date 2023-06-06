import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../service/authentication.service';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User = new User;
  currentUser: User = new User;
  friendList: Array<User> = [];
  currentUserFriendList: Array<User> = [];
  friendExists!: boolean;
  profilPicture!: string;


  constructor(private authenticationService: AuthenticationService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
  }

  handleUserDetails() {
    const theUserId: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(theUserId).subscribe(data => {
      this.user = data;
      this.userService.getUserProfilPicture2(this.user.userId.toString()).subscribe(pic => {
        this.profilPicture = pic.split('\\').pop();
      }, err => {
        this.profilPicture = "https://res.cloudinary.com/diubo1tzp/image/upload/v1650587140/defaultProfilePicture_drigsj.png";
      });

    });


  }}
