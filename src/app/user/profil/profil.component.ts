import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ComplaintService } from '../../service/complaint.service';
import { Complaint } from '../../models/complaint';
import { NgForm } from '@angular/forms';
import { AgenceService } from '../../service/agence.service';
import { Agence } from '../../models/agence';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  currentUser: User;
  allUsers: Array<User> = [];
  profilPicture!: string;
  agence: Agence;
  complaint: Complaint = new Complaint();
  userId: number;
  nomAgence: string;

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router: Router,
      private complaintService: ComplaintService,
      private agenceService: AgenceService
  ) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
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

      this.userService.getUserProfilPicture().subscribe(xx => {
        this.profilPicture = xx.split('\\').pop();
      }, err => {
        this.profilPicture = "https://res.cloudinary.com/diubo1tzp/image/upload/v1650587140/defaultProfilePicture_drigsj.png";
      });

      this.userService.getAllUser().subscribe((users: User[]) => {
        this.allUsers = users;
      });
    });
  }

  redirectTo(){
    this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
  }

  addComplaint() {
    this.complaintService.addComplaint(this.complaint, this.userId).subscribe(
        complaint => {
        },
        error => {
          console.error(error);
        }
    );
    this.successNotification();
  }

  successNotification() {
    Swal.fire({
      text: 'Réclamation ajoutée avec succès!',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
}
