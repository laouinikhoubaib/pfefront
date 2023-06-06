import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    email: string;
    myLinkElement: HTMLLinkElement;
    user: User = new User();
    errorMessage: string = "";

    constructor(public app: AppComponent, private authenticationService: AuthenticationService, private router: Router) {
        this.myLinkElement = document.createElement('link');
        this.myLinkElement.href = "assets/css/material-kit-pro.min3294.css?v=3.0.1";
        this.myLinkElement.rel = "stylesheet";
        this.myLinkElement.id = "pagestyle";
        document.body.appendChild(this.myLinkElement);

    }

  ngOnInit(): void {
  }

  forgotPassword(){
    this.authenticationService.forgotPassword(this.email).subscribe( data => {
    }, err => {
      this.errorMessage = 'Could not find any account binded to this email. Please verify the entred information ...';
        }
    );
  }

}
