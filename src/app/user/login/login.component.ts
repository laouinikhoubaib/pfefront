import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loginn',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

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
    if (this.authenticationService.currentUserValue?.userId){
      this.router.navigate(['user/landing']);
      return;
    }
  }

  ngOnDestroy() {
    document.body.removeChild(this.myLinkElement);
  }


  login(){
    this.authenticationService.login(this.user).subscribe( data => {
      this.router.navigate(['user/landing']);
    }, err => {
      this.errorMessage = 'Username or password is incorrect';
      console.log(err);
    });
  }

  redirectTo(){
    this.router.navigate(['/register'])
        .then(() => {
          window.location.reload();
        });
  }

}
