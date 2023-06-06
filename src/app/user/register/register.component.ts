import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {Role} from '../../models/role.enum';
import {AppComponent} from '../../app.component';
import {Agence} from '../../models/agence';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  myLinkElement: HTMLLinkElement;

  user: User = new User();
  errorMessage: string = '';
  middleRole: string = '';
  roles: Role[] = [];
  step: number = 1;
  userParsed: string = '';
  nomAgence: string = '';
  selectedFile!: File;
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  agence: Agence = new Agence();
  agences: Agence[];

  constructor(public app: AppComponent, private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.myLinkElement = document.createElement('link');
    this.myLinkElement.href = 'assets/css/material-kit-pro.min3294.css?v=3.0.1';
    this.myLinkElement.rel = 'stylesheet';
    this.myLinkElement.id = 'pagestyle';
    document.body.appendChild(this.myLinkElement);

  }

  ngOnInit(): void {
    this.roles = [Role.USER, Role.ADMIN, Role.SUPERADMIN];
    this.middleRole = Role.USER;
    this.authenticationService.getAgences().subscribe(agences => {
      this.agences = agences;
    });
  }
  ngOnDestroy() {
    document.body.removeChild(this.myLinkElement);
  }

  register(){
    if (this.middleRole == 'USER'){
      this.user.role = Role.USER;
   }
    this.userParsed = JSON.stringify(this.user);
    console.log(this.userParsed);

    this.authenticationService.register(this.userParsed, this.selectedFile, this.nomAgence).subscribe(data => {
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          }); },
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
  onFileSelcted(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  next(){
    this.step = this.step + 1 ;
  }

  previous(){
    this.step = this.step - 1 ;
  }

  redirectTo(){
    this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
  }




}
