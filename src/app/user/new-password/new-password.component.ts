import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  password: string;
  confirmPassword: string;
  errorMessage: string = "";
  myLinkElement: HTMLLinkElement;

    constructor(public app: AppComponent, private authenticationService: AuthenticationService, private router: Router) {
        this.myLinkElement = document.createElement('link');
        this.myLinkElement.href = "assets/css/material-kit-pro.min3294.css?v=3.0.1";
        this.myLinkElement.rel = "stylesheet";
        this.myLinkElement.id = "pagestyle";
        document.body.appendChild(this.myLinkElement);

    }

  ngOnInit(): void {


  }



  updatePassword(){
    let token = this.router.url.substring(20);
    this.authenticationService.updatePassword(this.password, token).subscribe( data => {
            this.router.navigate(['/login']).then(() => {
                window.location.reload();
            });
    }, err => {
        if (err?.status === 406){
            this.errorMessage = 'Password must:\n\tHave 8 or more characters' +
                '\n\tContain 1 or more uppercase characters' +
                '\n\tContain 1 or more digit characters\n\tContain 1 or more special characters';
          }
        }
        );
  }

}
